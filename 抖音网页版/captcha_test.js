encrypt = function () {
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    };

    function getRandomValues(buf) {
        var min = 0,
            max = 255;
        if (buf.length > 65536) {
            var e = new Error();
            e.code = 22;
            e.message = 'Failed to execute \'getRandomValues\' : The ' + 'ArrayBufferView\'s byte length (' + buf.length + ') exceeds the ' + 'number of bytes of entropy available via this API (65536).';
            e.name = 'QuotaExceededError';
            throw e;
        }
        if (buf instanceof Uint16Array) {
            max = 65535;
        } else if (buf instanceof Uint32Array) {
            max = 4294967295;
        }
        for (var element in buf) {
            buf[element] = random(min, max);
        }
        return buf;
    }

    let core = function (e, r) {
        var i = function () {
                try {
                    return getRandomValues(new Uint32Array(1))[0]
                } catch (e) {
                    throw new Error("Native crypto module could not be used to get secure random number.")
                }
            },
            a = Object.create || function () {
                function e() {
                }

                return function (t) {
                    var n;
                    return e.prototype = t, n = new e, e.prototype = null, n
                }
            }(),
            c = {},
            s = c.lib = {},
            u = s.Base = {
                extend: function (e) {
                    var t = a(this);
                    return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {
                        t.$super.init.apply(this, arguments)
                    }), t.init.prototype = t, t.$super = this, t
                }, create: function () {
                    var e = this.extend();
                    return e.init.apply(e, arguments), e
                }, init: function () {
                }, mixIn: function (e) {
                    for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                    e.hasOwnProperty("toString") && (this.toString = e.toString)
                }, clone: function () {
                    return this.init.prototype.extend(this)
                }
            },
            l = s.WordArray = u.extend({
                init: function (e, t) {
                    e = this.words = e || [], this.sigBytes = null != t ? t : 4 * e.length
                }, toString: function (e) {
                    return (e || d).stringify(this)
                }, concat: function (e) {
                    var t = this.words,
                        n = e.words,
                        r = this.sigBytes,
                        o = e.sigBytes;
                    if (this.clamp(), r % 4)
                        for (var i = 0; i < o; i++) {
                            var a = n[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                            t[r + i >>> 2] |= a << 24 - (r + i) % 4 * 8
                        } else
                        for (i = 0; i < o; i += 4) t[r + i >>> 2] = n[i >>> 2];
                    return this.sigBytes += o, this
                }, clamp: function () {
                    var t = this.words,
                        n = this.sigBytes;
                    t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4)
                }, clone: function () {
                    var e = u.clone.call(this);
                    return e.words = this.words.slice(0), e
                }, random: function (e) {
                    for (var t = [], n = 0; n < e; n += 4) t.push(i());
                    return new l.init(t, e)
                }
            }),
            f = c.enc = {},
            d = f.Hex = {
                stringify: function (e) {
                    for (var t = e.words, n = e.sigBytes, r = [], o = 0; o < n; o++) {
                        var i = t[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                        r.push((i >>> 4).toString(16)), r.push((15 & i).toString(16))
                    }
                    return r.join("")
                }, parse: function (e) {
                    for (var t = e.length, n = [], r = 0; r < t; r += 2) n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - r % 8 * 4;
                    return new l.init(n, t / 2)
                }
            },
            p = f.Latin1 = {
                stringify: function (e) {
                    for (var t = e.words, n = e.sigBytes, r = [], o = 0; o < n; o++) {
                        var i = t[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                        r.push(String.fromCharCode(i))
                    }
                    return r.join("")
                }, parse: function (e) {
                    for (var t = e.length, n = [], r = 0; r < t; r++) n[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - r % 4 * 8;
                    return new l.init(n, t)
                }
            },
            h = f.Utf8 = {
                stringify: function (e) {
                    try {
                        return decodeURIComponent(escape(p.stringify(e)))
                    } catch (e) {
                        throw new Error("Malformed UTF-8 data")
                    }
                }, parse: function (e) {
                    return p.parse(unescape(encodeURIComponent(e)))
                }
            },
            y = s.BufferedBlockAlgorithm = u.extend({
                reset: function () {
                    this._data = new l.init, this._nDataBytes = 0
                }, _append: function (e) {
                    "string" == typeof e && (e = h.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes
                }, _process: function (t) {
                    var n, r = this._data,
                        o = r.words,
                        i = r.sigBytes,
                        a = this.blockSize,
                        c = i / (4 * a),
                        s = (c = t ? e.ceil(c) : e.max((0 | c) - this._minBufferSize, 0)) * a,
                        u = e.min(4 * s, i);
                    if (s) {
                        for (var f = 0; f < s; f += a) this._doProcessBlock(o, f);
                        n = o.splice(0, s), r.sigBytes -= u
                    }
                    return new l.init(n, u)
                }, clone: function () {
                    var e = u.clone.call(this);
                    return e._data = this._data.clone(), e
                }, _minBufferSize: 0
            }),
            v = (s.Hasher = y.extend({
                cfg: u.extend(),
                init: function (e) {
                    this.cfg = this.cfg.extend(e), this.reset()
                }, reset: function () {
                    y.reset.call(this), this._doReset()
                }, update: function (e) {
                    return this._append(e), this._process(), this
                }, finalize: function (e) {
                    return e && this._append(e), this._doFinalize()
                }, blockSize: 16,
                _createHelper: function (e) {
                    return function (t, n) {
                        return new e.init(n).finalize(t)
                    }
                }, _createHmacHelper: function (e) {
                    return function (t, n) {
                        return new v.HMAC.init(e, n).finalize(t)
                    }
                }
            }), c.algo = {});

        return c
    }(Math)

    let setBase64 = function () {
        var r, o, i;
        i = core, o = (r = i).lib.WordArray, r.enc.Base64 = {
            stringify: function (e) {
                var t = e.words,
                    n = e.sigBytes,
                    r = this._map;
                e.clamp();
                for (var o = [], i = 0; i < n; i += 3)
                    for (var a = (t[i >>> 2] >>> 24 - i % 4 * 8 & 255) << 16 | (t[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255) << 8 | t[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255, c = 0; c < 4 && i + .75 * c < n; c++) o.push(r.charAt(a >>> 6 * (3 - c) & 63));
                var s = r.charAt(64);
                if (s)
                    for (; o.length % 4;) o.push(s);
                return o.join("")
            }, parse: function (e) {
                var t = e.length,
                    n = this._map,
                    r = this._reverseMap;
                if (!r) {
                    r = this._reverseMap = [];
                    for (var i = 0; i < n.length; i++) r[n.charCodeAt(i)] = i
                }
                var a = n.charAt(64);
                if (a) {
                    var c = e.indexOf(a); - 1 !== c && (t = c)
                }
                return function (e, t, n) {
                    for (var r = [], i = 0, a = 0; a < t; a++)
                        if (a % 4) {
                            var c = n[e.charCodeAt(a - 1)] << a % 4 * 2,
                                s = n[e.charCodeAt(a)] >>> 6 - a % 4 * 2,
                                u = c | s;
                            r[i >>> 2] |= u << 24 - i % 4 * 8, i++
                        }
                    return o.create(r, i)
                }(e, t, r)
            }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        }
    }
    let setMD5 = function () {
        var r;
        r = core, function (e) {
            var t = r,
                n = t.lib,
                o = n.WordArray,
                i = n.Hasher,
                a = t.algo,
                c = [];
            ! function () {
                for (var t = 0; t < 64; t++) c[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0
            }();
            var s = a.MD5 = i.extend({
                _doReset: function () {
                    this._hash = new o.init([1732584193, 4023233417, 2562383102, 271733878])
                }, _doProcessBlock: function (e, t) {
                    for (var n = 0; n < 16; n++) {
                        var r = t + n,
                            o = e[r];
                        e[r] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8)
                    }
                    var i = this._hash.words,
                        a = e[t + 0],
                        s = e[t + 1],
                        p = e[t + 2],
                        h = e[t + 3],
                        y = e[t + 4],
                        v = e[t + 5],
                        b = e[t + 6],
                        m = e[t + 7],
                        g = e[t + 8],
                        w = e[t + 9],
                        x = e[t + 10],
                        _ = e[t + 11],
                        k = e[t + 12],
                        S = e[t + 13],
                        O = e[t + 14],
                        C = e[t + 15],
                        E = i[0],
                        j = i[1],
                        T = i[2],
                        A = i[3];
                    E = u(E, j, T, A, a, 7, c[0]), A = u(A, E, j, T, s, 12, c[1]), T = u(T, A, E, j, p, 17, c[2]), j = u(j, T, A, E, h, 22, c[3]), E = u(E, j, T, A, y, 7, c[4]), A = u(A, E, j, T, v, 12, c[5]), T = u(T, A, E, j, b, 17, c[6]), j = u(j, T, A, E, m, 22, c[7]), E = u(E, j, T, A, g, 7, c[8]), A = u(A, E, j, T, w, 12, c[9]), T = u(T, A, E, j, x, 17, c[10]), j = u(j, T, A, E, _, 22, c[11]), E = u(E, j, T, A, k, 7, c[12]), A = u(A, E, j, T, S, 12, c[13]), T = u(T, A, E, j, O, 17, c[14]), E = l(E, j = u(j, T, A, E, C, 22, c[15]), T, A, s, 5, c[16]), A = l(A, E, j, T, b, 9, c[17]), T = l(T, A, E, j, _, 14, c[18]), j = l(j, T, A, E, a, 20, c[19]), E = l(E, j, T, A, v, 5, c[20]), A = l(A, E, j, T, x, 9, c[21]), T = l(T, A, E, j, C, 14, c[22]), j = l(j, T, A, E, y, 20, c[23]), E = l(E, j, T, A, w, 5, c[24]), A = l(A, E, j, T, O, 9, c[25]), T = l(T, A, E, j, h, 14, c[26]), j = l(j, T, A, E, g, 20, c[27]), E = l(E, j, T, A, S, 5, c[28]), A = l(A, E, j, T, p, 9, c[29]), T = l(T, A, E, j, m, 14, c[30]), E = f(E, j = l(j, T, A, E, k, 20, c[31]), T, A, v, 4, c[32]), A = f(A, E, j, T, g, 11, c[33]), T = f(T, A, E, j, _, 16, c[34]), j = f(j, T, A, E, O, 23, c[35]), E = f(E, j, T, A, s, 4, c[36]), A = f(A, E, j, T, y, 11, c[37]), T = f(T, A, E, j, m, 16, c[38]), j = f(j, T, A, E, x, 23, c[39]), E = f(E, j, T, A, S, 4, c[40]), A = f(A, E, j, T, a, 11, c[41]), T = f(T, A, E, j, h, 16, c[42]), j = f(j, T, A, E, b, 23, c[43]), E = f(E, j, T, A, w, 4, c[44]), A = f(A, E, j, T, k, 11, c[45]), T = f(T, A, E, j, C, 16, c[46]), E = d(E, j = f(j, T, A, E, p, 23, c[47]), T, A, a, 6, c[48]), A = d(A, E, j, T, m, 10, c[49]), T = d(T, A, E, j, O, 15, c[50]), j = d(j, T, A, E, v, 21, c[51]), E = d(E, j, T, A, k, 6, c[52]), A = d(A, E, j, T, h, 10, c[53]), T = d(T, A, E, j, x, 15, c[54]), j = d(j, T, A, E, s, 21, c[55]), E = d(E, j, T, A, g, 6, c[56]), A = d(A, E, j, T, C, 10, c[57]), T = d(T, A, E, j, b, 15, c[58]), j = d(j, T, A, E, S, 21, c[59]), E = d(E, j, T, A, y, 6, c[60]), A = d(A, E, j, T, _, 10, c[61]), T = d(T, A, E, j, p, 15, c[62]), j = d(j, T, A, E, w, 21, c[63]), i[0] = i[0] + E | 0, i[1] = i[1] + j | 0, i[2] = i[2] + T | 0, i[3] = i[3] + A | 0
                }, _doFinalize: function () {
                    var t = this._data,
                        n = t.words,
                        r = 8 * this._nDataBytes,
                        o = 8 * t.sigBytes;
                    n[o >>> 5] |= 128 << 24 - o % 32;
                    var i = e.floor(r / 4294967296),
                        a = r;
                    n[15 + (o + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), n[14 + (o + 64 >>> 9 << 4)] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8), t.sigBytes = 4 * (n.length + 1), this._process();
                    for (var c = this._hash, s = c.words, u = 0; u < 4; u++) {
                        var l = s[u];
                        s[u] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8)
                    }
                    return c
                }, clone: function () {
                    var e = i.clone.call(this);
                    return e._hash = this._hash.clone(), e
                }
            });

            function u(e, t, n, r, o, i, a) {
                var c = e + (t & n | ~t & r) + o + a;
                return (c << i | c >>> 32 - i) + t
            }

            function l(e, t, n, r, o, i, a) {
                var c = e + (t & r | n & ~r) + o + a;
                return (c << i | c >>> 32 - i) + t
            }

            function f(e, t, n, r, o, i, a) {
                var c = e + (t ^ n ^ r) + o + a;
                return (c << i | c >>> 32 - i) + t
            }

            function d(e, t, n, r, o, i, a) {
                var c = e + (n ^ (t | ~r)) + o + a;
                return (c << i | c >>> 32 - i) + t
            }
            t.MD5 = i._createHelper(s), t.HmacMD5 = i._createHmacHelper(s)
        }(Math)
    }
    let setSHA1 = function () {
        var r, o, i, a, c, s, u, l;
        l = core,
            o = (r = l).lib,
            i = o.WordArray,
            a = o.Hasher,
            c = r.algo,
            s = [],
            u = c.SHA1 = a.extend({
            _doReset: function () {
                this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
            }, _doProcessBlock: function (e, t) {
                for (var n = this._hash.words, r = n[0], o = n[1], i = n[2], a = n[3], c = n[4], u = 0; u < 80; u++) {
                    if (u < 16) s[u] = 0 | e[t + u];
                    else {
                        var l = s[u - 3] ^ s[u - 8] ^ s[u - 14] ^ s[u - 16];
                        s[u] = l << 1 | l >>> 31
                    }
                    var f = (r << 5 | r >>> 27) + c + s[u];
                    f += u < 20 ? 1518500249 + (o & i | ~o & a) : u < 40 ? 1859775393 + (o ^ i ^ a) : u < 60 ? (o & i | o & a | i & a) - 1894007588 : (o ^ i ^ a) - 899497514, c = a, a = i, i = o << 30 | o >>> 2, o = r, r = f
                }
                n[0] = n[0] + r | 0, n[1] = n[1] + o | 0, n[2] = n[2] + i | 0, n[3] = n[3] + a | 0, n[4] = n[4] + c | 0
            }, _doFinalize: function () {
                var e = this._data,
                    t = e.words,
                    n = 8 * this._nDataBytes,
                    r = 8 * e.sigBytes;
                return t[r >>> 5] |= 128 << 24 - r % 32, t[14 + (r + 64 >>> 9 << 4)] = Math.floor(n / 4294967296), t[15 + (r + 64 >>> 9 << 4)] = n, e.sigBytes = 4 * t.length, this._process(), this._hash
            }, clone: function () {
                var e = a.clone.call(this);
                return e._hash = this._hash.clone(), e
            }
        }),
            r.SHA1 = a._createHelper(u),
            r.HmacSHA1 = a._createHmacHelper(u)
    }
    let set_HMAC = function () {
        var r, o, i, a;
        r = core, i = (o = r).lib.Base, a = o.enc.Utf8,
            void(o.algo.HMAC = i.extend({
            init: function (e, t) {
                e = this._hasher = new e.init, "string" == typeof t && (t = a.parse(t));
                var n = e.blockSize,
                    r = 4 * n;
                t.sigBytes > r && (t = e.finalize(t)), t.clamp();
                for (var o = this._oKey = t.clone(), i = this._iKey = t.clone(), c = o.words, s = i.words, u = 0; u < n; u++) c[u] ^= 1549556828, s[u] ^= 909522486;
                o.sigBytes = i.sigBytes = r, this.reset()
            }, reset: function () {
                var e = this._hasher;
                e.reset(), e.update(this._iKey)
            }, update: function (e) {
                return this._hasher.update(e), this
            }, finalize: function (e) {
                var t = this._hasher,
                    n = t.finalize(e);
                return t.reset(), t.finalize(this._oKey.clone().concat(n))
            }
        }))
    }
    let setEvpKDF = function () {
        var r, o, i, a, c, s, u, l;
        l = core,
            setSHA1(),
            set_HMAC(),
            o = (r = l).lib,
            i = o.Base,
            a = o.WordArray,
            c = r.algo,
            s = c.MD5,
            u = c.EvpKDF = i.extend({
            cfg: i.extend({
                keySize: 4,
                hasher: s,
                iterations: 1
            }),
            init: function (e) {
                this.cfg = this.cfg.extend(e)
            }, compute: function (e, t) {
                for (var n, r = this.cfg, o = r.hasher.create(), i = a.create(), c = i.words, s = r.keySize, u = r.iterations; c.length < s;) {
                    n && o.update(n), n = o.update(e).finalize(t), o.reset();
                    for (var l = 1; l < u; l++) n = o.finalize(n), o.reset();
                    i.concat(n)
                }
                return i.sigBytes = 4 * s, i
            }
        }),
            r.EvpKDF = function (e, t, n) {
            return u.create(n).compute(e, t)
        }
    }
    let setCipher = function() {
        var r, o, i, a, c, s, u, l, f, d, p, h, y, v, b, m, g, w, x;
        r = core,
            void (r.lib.Cipher || (o = r,
                i = o.lib,
                a = i.Base,
                c = i.WordArray,
                s = i.BufferedBlockAlgorithm,
                u = o.enc,
                u.Utf8,
                l = u.Base64,
                f = o.algo.EvpKDF,
                d = i.Cipher = s.extend({
                    cfg: a.extend(),
                    createEncryptor: function(e, t) {
                        return this.create(this._ENC_XFORM_MODE, e, t)
                    },
                    createDecryptor: function(e, t) {
                        return this.create(this._DEC_XFORM_MODE, e, t)
                    },
                    init: function(e, t, n) {
                        this.cfg = this.cfg.extend(n),
                            this._xformMode = e,
                            this._key = t,
                            this.reset()
                    },
                    reset: function() {
                        s.reset.call(this),
                            this._doReset()
                    },
                    process: function(e) {
                        return this._append(e),
                            this._process()
                    },
                    finalize: function(e) {
                        return e && this._append(e),
                            this._doFinalize()
                    },
                    keySize: 4,
                    ivSize: 4,
                    _ENC_XFORM_MODE: 1,
                    _DEC_XFORM_MODE: 2,
                    _createHelper: function() {
                        function e(e) {
                            return "string" == typeof e ? x : g
                        }
                        return function(t) {
                            return {
                                encrypt: function(n, r, o) {
                                    return e(r).encrypt(t, n, r, o)
                                },
                                decrypt: function(n, r, o) {
                                    return e(r).decrypt(t, n, r, o)
                                }
                            }
                        }
                    }()
                }),
                i.StreamCipher = d.extend({
                    _doFinalize: function() {
                        return this._process(!0)
                    },
                    blockSize: 1
                }),
                p = o.mode = {},
                h = i.BlockCipherMode = a.extend({
                    createEncryptor: function(e, t) {
                        return this.Encryptor.create(e, t)
                    },
                    createDecryptor: function(e, t) {
                        return this.Decryptor.create(e, t)
                    },
                    init: function(e, t) {
                        this._cipher = e,
                            this._iv = t
                    }
                }),
                y = p.CBC = function() {
                    var e = h.extend();
                    function t(e, t, n) {
                        var r, o = this._iv;
                        o ? (r = o,
                            this._iv = void 0) : r = this._prevBlock;
                        for (var i = 0; i < n; i++)
                            e[t + i] ^= r[i]
                    }
                    return e.Encryptor = e.extend({
                        processBlock: function(e, n) {
                            var r = this._cipher
                                , o = r.blockSize;
                            t.call(this, e, n, o),
                                r.encryptBlock(e, n),
                                this._prevBlock = e.slice(n, n + o)
                        }
                    }),
                        e.Decryptor = e.extend({
                            processBlock: function(e, n) {
                                var r = this._cipher
                                    , o = r.blockSize
                                    , i = e.slice(n, n + o);
                                r.decryptBlock(e, n),
                                    t.call(this, e, n, o),
                                    this._prevBlock = i
                            }
                        }),
                        e
                }(),
                v = (o.pad = {}).Pkcs7 = {
                    pad: function(e, t) {
                        for (var n = 4 * t, r = n - e.sigBytes % n, o = r << 24 | r << 16 | r << 8 | r, i = [], a = 0; a < r; a += 4)
                            i.push(o);
                        var s = c.create(i, r);
                        e.concat(s)
                    },
                    unpad: function(e) {
                        var t = 255 & e.words[e.sigBytes - 1 >>> 2];
                        e.sigBytes -= t
                    }
                },
                i.BlockCipher = d.extend({
                    cfg: d.cfg.extend({
                        mode: y,
                        padding: v
                    }),
                    reset: function() {
                        var e;
                        d.reset.call(this);
                        var t = this.cfg
                            , n = t.iv
                            , r = t.mode;
                        this._xformMode == this._ENC_XFORM_MODE ? e = r.createEncryptor : (e = r.createDecryptor,
                            this._minBufferSize = 1),
                            this._mode && this._mode.__creator == e ? this._mode.init(this, n && n.words) : (this._mode = e.call(r, this, n && n.words),
                                this._mode.__creator = e)
                    },
                    _doProcessBlock: function(e, t) {
                        this._mode.processBlock(e, t)
                    },
                    _doFinalize: function() {
                        var e, t = this.cfg.padding;
                        return this._xformMode == this._ENC_XFORM_MODE ? (t.pad(this._data, this.blockSize),
                            e = this._process(!0)) : (e = this._process(!0),
                            t.unpad(e)),
                            e
                    },
                    blockSize: 4
                }),
                b = i.CipherParams = a.extend({
                    init: function(e) {
                        this.mixIn(e)
                    },
                    toString: function(e) {
                        return (e || this.formatter).stringify(this)
                    }
                }),
                m = (o.format = {}).OpenSSL = {
                    stringify: function(e) {
                        var t = e.ciphertext
                            , n = e.salt;
                        return (n ? c.create([1398893684, 1701076831]).concat(n).concat(t) : t).toString(l)
                    },
                    parse: function(e) {
                        var t, n = l.parse(e), r = n.words;
                        return 1398893684 == r[0] && 1701076831 == r[1] && (t = c.create(r.slice(2, 4)),
                            r.splice(0, 4),
                            n.sigBytes -= 16),
                            b.create({
                                ciphertext: n,
                                salt: t
                            })
                    }
                },
                g = i.SerializableCipher = a.extend({
                    cfg: a.extend({
                        format: m
                    }),
                    encrypt: function(e, t, n, r) {
                        r = this.cfg.extend(r);
                        var o = e.createEncryptor(n, r)
                            , i = o.finalize(t)
                            , a = o.cfg;
                        return b.create({
                            ciphertext: i,
                            key: n,
                            iv: a.iv,
                            algorithm: e,
                            mode: a.mode,
                            padding: a.padding,
                            blockSize: e.blockSize,
                            formatter: r.format
                        })
                    },
                    decrypt: function(e, t, n, r) {
                        return r = this.cfg.extend(r),
                            t = this._parse(t, r.format),
                            e.createDecryptor(n, r).finalize(t.ciphertext)
                    },
                    _parse: function(e, t) {
                        return "string" == typeof e ? t.parse(e, this) : e
                    }
                }),
                w = (o.kdf = {}).OpenSSL = {
                    execute: function(e, t, n, r) {
                        r || (r = c.random(8));
                        var o = f.create({
                            keySize: t + n
                        }).compute(e, r)
                            , i = c.create(o.words.slice(t), 4 * n);
                        return o.sigBytes = 4 * t,
                            b.create({
                                key: o,
                                iv: i,
                                salt: r
                            })
                    }
                },
                x = i.PasswordBasedCipher = g.extend({
                    cfg: g.cfg.extend({
                        kdf: w
                    }),
                    encrypt: function(e, t, n, r) {
                        var o = (r = this.cfg.extend(r)).kdf.execute(n, e.keySize, e.ivSize);
                        r.iv = o.iv;
                        var i = g.encrypt.call(this, e, t, o.key, r);
                        return i.mixIn(o),
                            i
                    },
                    decrypt: function(e, t, n, r) {
                        r = this.cfg.extend(r),
                            t = this._parse(t, r.format);
                        var o = r.kdf.execute(n, e.keySize, e.ivSize, t.salt);
                        return r.iv = o.iv,
                            g.decrypt.call(this, e, t, o.key, r)
                    }
                })))
    }
    let setAES = function() {
        var r;
        r = core,
            function() {
                var e = r
                    , t = e.lib.BlockCipher
                    , n = e.algo
                    , o = []
                    , i = []
                    , a = []
                    , c = []
                    , s = []
                    , u = []
                    , l = []
                    , f = []
                    , d = []
                    , p = [];
                !function() {
                    for (var e = [], t = 0; t < 256; t++)
                        e[t] = t < 128 ? t << 1 : t << 1 ^ 283;
                    var n = 0
                        , r = 0;
                    for (t = 0; t < 256; t++) {
                        var h = r ^ r << 1 ^ r << 2 ^ r << 3 ^ r << 4;
                        h = h >>> 8 ^ 255 & h ^ 99,
                            o[n] = h,
                            i[h] = n;
                        var y = e[n]
                            , v = e[y]
                            , b = e[v]
                            , m = 257 * e[h] ^ 16843008 * h;
                        a[n] = m << 24 | m >>> 8,
                            c[n] = m << 16 | m >>> 16,
                            s[n] = m << 8 | m >>> 24,
                            u[n] = m,
                            m = 16843009 * b ^ 65537 * v ^ 257 * y ^ 16843008 * n,
                            l[h] = m << 24 | m >>> 8,
                            f[h] = m << 16 | m >>> 16,
                            d[h] = m << 8 | m >>> 24,
                            p[h] = m,
                            n ? (n = y ^ e[e[e[b ^ y]]],
                                r ^= e[e[r]]) : n = r = 1
                    }
                }();
                var h = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54]
                    , y = n.AES = t.extend({
                    _doReset: function() {
                        if (!this._nRounds || this._keyPriorReset !== this._key) {
                            for (var e = this._keyPriorReset = this._key, t = e.words, n = e.sigBytes / 4, r = 4 * ((this._nRounds = n + 6) + 1), i = this._keySchedule = [], a = 0; a < r; a++)
                                a < n ? i[a] = t[a] : (u = i[a - 1],
                                    a % n ? n > 6 && a % n == 4 && (u = o[u >>> 24] << 24 | o[u >>> 16 & 255] << 16 | o[u >>> 8 & 255] << 8 | o[255 & u]) : (u = o[(u = u << 8 | u >>> 24) >>> 24] << 24 | o[u >>> 16 & 255] << 16 | o[u >>> 8 & 255] << 8 | o[255 & u],
                                        u ^= h[a / n | 0] << 24),
                                    i[a] = i[a - n] ^ u);
                            for (var c = this._invKeySchedule = [], s = 0; s < r; s++) {
                                if (a = r - s,
                                s % 4)
                                    var u = i[a];
                                else
                                    u = i[a - 4];
                                c[s] = s < 4 || a <= 4 ? u : l[o[u >>> 24]] ^ f[o[u >>> 16 & 255]] ^ d[o[u >>> 8 & 255]] ^ p[o[255 & u]]
                            }
                        }
                    },
                    encryptBlock: function(e, t) {
                        this._doCryptBlock(e, t, this._keySchedule, a, c, s, u, o)
                    },
                    decryptBlock: function(e, t) {
                        var n = e[t + 1];
                        e[t + 1] = e[t + 3],
                            e[t + 3] = n,
                            this._doCryptBlock(e, t, this._invKeySchedule, l, f, d, p, i),
                            n = e[t + 1],
                            e[t + 1] = e[t + 3],
                            e[t + 3] = n
                    },
                    _doCryptBlock: function(e, t, n, r, o, i, a, c) {
                        for (var s = this._nRounds, u = e[t] ^ n[0], l = e[t + 1] ^ n[1], f = e[t + 2] ^ n[2], d = e[t + 3] ^ n[3], p = 4, h = 1; h < s; h++) {
                            var y = r[u >>> 24] ^ o[l >>> 16 & 255] ^ i[f >>> 8 & 255] ^ a[255 & d] ^ n[p++]
                                , v = r[l >>> 24] ^ o[f >>> 16 & 255] ^ i[d >>> 8 & 255] ^ a[255 & u] ^ n[p++]
                                , b = r[f >>> 24] ^ o[d >>> 16 & 255] ^ i[u >>> 8 & 255] ^ a[255 & l] ^ n[p++]
                                , m = r[d >>> 24] ^ o[u >>> 16 & 255] ^ i[l >>> 8 & 255] ^ a[255 & f] ^ n[p++];
                            u = y,
                                l = v,
                                f = b,
                                d = m
                        }
                        y = (c[u >>> 24] << 24 | c[l >>> 16 & 255] << 16 | c[f >>> 8 & 255] << 8 | c[255 & d]) ^ n[p++],
                            v = (c[l >>> 24] << 24 | c[f >>> 16 & 255] << 16 | c[d >>> 8 & 255] << 8 | c[255 & u]) ^ n[p++],
                            b = (c[f >>> 24] << 24 | c[d >>> 16 & 255] << 16 | c[u >>> 8 & 255] << 8 | c[255 & l]) ^ n[p++],
                            m = (c[d >>> 24] << 24 | c[u >>> 16 & 255] << 16 | c[l >>> 8 & 255] << 8 | c[255 & f]) ^ n[p++],
                            e[t] = y,
                            e[t + 1] = v,
                            e[t + 2] = b,
                            e[t + 3] = m
                    },
                    keySize: 8
                });
                e.AES = t._createHelper(y)
            }()
    }
    let setWordArray = function() {
        var r, o, i, a, c, s;
        s = core,
            o = (r = s).lib,
            i = o.Base,
            a = o.WordArray,
            (c = r.x64 = {}).Word = i.extend({
                init: function(e, t) {
                    this.high = e,
                        this.low = t
                }
            }),
            c.WordArray = i.extend({
                init: function(e, t) {
                    e = this.words = e || [],
                        this.sigBytes = null != t ? t : 8 * e.length
                },
                toX32: function() {
                    for (var e = this.words, t = e.length, n = [], r = 0; r < t; r++) {
                        var o = e[r];
                        n.push(o.high),
                            n.push(o.low)
                    }
                    return a.create(n, this.sigBytes)
                },
                clone: function() {
                    for (var e = i.clone.call(this), t = e.words = this.words.slice(0), n = t.length, r = 0; r < n; r++)
                        t[r] = t[r].clone();
                    return e
                }
            })
    }
    let setSHA512 = function() {
        var r;
        r = core,
            setWordArray(),
            function() {
                var e = r
                    , t = e.lib.Hasher
                    , n = e.x64
                    , o = n.Word
                    , i = n.WordArray
                    , a = e.algo;
                function c() {
                    return o.create.apply(o, arguments)
                }
                var s = [c(1116352408, 3609767458), c(1899447441, 602891725), c(3049323471, 3964484399), c(3921009573, 2173295548), c(961987163, 4081628472), c(1508970993, 3053834265), c(2453635748, 2937671579), c(2870763221, 3664609560), c(3624381080, 2734883394), c(310598401, 1164996542), c(607225278, 1323610764), c(1426881987, 3590304994), c(1925078388, 4068182383), c(2162078206, 991336113), c(2614888103, 633803317), c(3248222580, 3479774868), c(3835390401, 2666613458), c(4022224774, 944711139), c(264347078, 2341262773), c(604807628, 2007800933), c(770255983, 1495990901), c(1249150122, 1856431235), c(1555081692, 3175218132), c(1996064986, 2198950837), c(2554220882, 3999719339), c(2821834349, 766784016), c(2952996808, 2566594879), c(3210313671, 3203337956), c(3336571891, 1034457026), c(3584528711, 2466948901), c(113926993, 3758326383), c(338241895, 168717936), c(666307205, 1188179964), c(773529912, 1546045734), c(1294757372, 1522805485), c(1396182291, 2643833823), c(1695183700, 2343527390), c(1986661051, 1014477480), c(2177026350, 1206759142), c(2456956037, 344077627), c(2730485921, 1290863460), c(2820302411, 3158454273), c(3259730800, 3505952657), c(3345764771, 106217008), c(3516065817, 3606008344), c(3600352804, 1432725776), c(4094571909, 1467031594), c(275423344, 851169720), c(430227734, 3100823752), c(506948616, 1363258195), c(659060556, 3750685593), c(883997877, 3785050280), c(958139571, 3318307427), c(1322822218, 3812723403), c(1537002063, 2003034995), c(1747873779, 3602036899), c(1955562222, 1575990012), c(2024104815, 1125592928), c(2227730452, 2716904306), c(2361852424, 442776044), c(2428436474, 593698344), c(2756734187, 3733110249), c(3204031479, 2999351573), c(3329325298, 3815920427), c(3391569614, 3928383900), c(3515267271, 566280711), c(3940187606, 3454069534), c(4118630271, 4000239992), c(116418474, 1914138554), c(174292421, 2731055270), c(289380356, 3203993006), c(460393269, 320620315), c(685471733, 587496836), c(852142971, 1086792851), c(1017036298, 365543100), c(1126000580, 2618297676), c(1288033470, 3409855158), c(1501505948, 4234509866), c(1607167915, 987167468), c(1816402316, 1246189591)]
                    , u = [];
                !function() {
                    for (var e = 0; e < 80; e++)
                        u[e] = c()
                }();
                var l = a.SHA512 = t.extend({
                    _doReset: function() {
                        this._hash = new i.init([new o.init(1779033703,4089235720), new o.init(3144134277,2227873595), new o.init(1013904242,4271175723), new o.init(2773480762,1595750129), new o.init(1359893119,2917565137), new o.init(2600822924,725511199), new o.init(528734635,4215389547), new o.init(1541459225,327033209)])
                    },
                    _doProcessBlock: function(e, t) {
                        for (var n = this._hash.words, r = n[0], o = n[1], i = n[2], a = n[3], c = n[4], l = n[5], f = n[6], d = n[7], p = r.high, h = r.low, y = o.high, v = o.low, b = i.high, m = i.low, g = a.high, w = a.low, x = c.high, _ = c.low, k = l.high, S = l.low, O = f.high, C = f.low, E = d.high, j = d.low, T = p, A = h, P = y, I = v, N = b, R = m, M = g, B = w, D = x, L = _, z = k, F = S, U = O, W = C, q = E, H = j, V = 0; V < 80; V++) {
                            var G, J, X = u[V];
                            if (V < 16)
                                J = X.high = 0 | e[t + 2 * V],
                                    G = X.low = 0 | e[t + 2 * V + 1];
                            else {
                                var K = u[V - 15]
                                    , Y = K.high
                                    , Q = K.low
                                    , Z = (Y >>> 1 | Q << 31) ^ (Y >>> 8 | Q << 24) ^ Y >>> 7
                                    , $ = (Q >>> 1 | Y << 31) ^ (Q >>> 8 | Y << 24) ^ (Q >>> 7 | Y << 25)
                                    , ee = u[V - 2]
                                    , te = ee.high
                                    , ne = ee.low
                                    , re = (te >>> 19 | ne << 13) ^ (te << 3 | ne >>> 29) ^ te >>> 6
                                    , oe = (ne >>> 19 | te << 13) ^ (ne << 3 | te >>> 29) ^ (ne >>> 6 | te << 26)
                                    , ie = u[V - 7]
                                    , ae = ie.high
                                    , ce = ie.low
                                    , se = u[V - 16]
                                    , ue = se.high
                                    , le = se.low;
                                J = (J = (J = Z + ae + ((G = $ + ce) >>> 0 < $ >>> 0 ? 1 : 0)) + re + ((G += oe) >>> 0 < oe >>> 0 ? 1 : 0)) + ue + ((G += le) >>> 0 < le >>> 0 ? 1 : 0),
                                    X.high = J,
                                    X.low = G
                            }
                            var fe, de = D & z ^ ~D & U, pe = L & F ^ ~L & W, he = T & P ^ T & N ^ P & N, ye = A & I ^ A & R ^ I & R, ve = (T >>> 28 | A << 4) ^ (T << 30 | A >>> 2) ^ (T << 25 | A >>> 7), be = (A >>> 28 | T << 4) ^ (A << 30 | T >>> 2) ^ (A << 25 | T >>> 7), me = (D >>> 14 | L << 18) ^ (D >>> 18 | L << 14) ^ (D << 23 | L >>> 9), ge = (L >>> 14 | D << 18) ^ (L >>> 18 | D << 14) ^ (L << 23 | D >>> 9), we = s[V], xe = we.high, _e = we.low, ke = q + me + ((fe = H + ge) >>> 0 < H >>> 0 ? 1 : 0), Se = be + ye;
                            q = U,
                                H = W,
                                U = z,
                                W = F,
                                z = D,
                                F = L,
                                D = M + (ke = (ke = (ke = ke + de + ((fe += pe) >>> 0 < pe >>> 0 ? 1 : 0)) + xe + ((fe += _e) >>> 0 < _e >>> 0 ? 1 : 0)) + J + ((fe += G) >>> 0 < G >>> 0 ? 1 : 0)) + ((L = B + fe | 0) >>> 0 < B >>> 0 ? 1 : 0) | 0,
                                M = N,
                                B = R,
                                N = P,
                                R = I,
                                P = T,
                                I = A,
                                T = ke + (ve + he + (Se >>> 0 < be >>> 0 ? 1 : 0)) + ((A = fe + Se | 0) >>> 0 < fe >>> 0 ? 1 : 0) | 0
                        }
                        h = r.low = h + A,
                            r.high = p + T + (h >>> 0 < A >>> 0 ? 1 : 0),
                            v = o.low = v + I,
                            o.high = y + P + (v >>> 0 < I >>> 0 ? 1 : 0),
                            m = i.low = m + R,
                            i.high = b + N + (m >>> 0 < R >>> 0 ? 1 : 0),
                            w = a.low = w + B,
                            a.high = g + M + (w >>> 0 < B >>> 0 ? 1 : 0),
                            _ = c.low = _ + L,
                            c.high = x + D + (_ >>> 0 < L >>> 0 ? 1 : 0),
                            S = l.low = S + F,
                            l.high = k + z + (S >>> 0 < F >>> 0 ? 1 : 0),
                            C = f.low = C + W,
                            f.high = O + U + (C >>> 0 < W >>> 0 ? 1 : 0),
                            j = d.low = j + H,
                            d.high = E + q + (j >>> 0 < H >>> 0 ? 1 : 0)
                    },
                    _doFinalize: function() {
                        var e = this._data
                            , t = e.words
                            , n = 8 * this._nDataBytes
                            , r = 8 * e.sigBytes;
                        return t[r >>> 5] |= 128 << 24 - r % 32,
                            t[30 + (r + 128 >>> 10 << 5)] = Math.floor(n / 4294967296),
                            t[31 + (r + 128 >>> 10 << 5)] = n,
                            e.sigBytes = 4 * t.length,
                            this._process(),
                            this._hash.toX32()
                    },
                    clone: function() {
                        var e = t.clone.call(this);
                        return e._hash = this._hash.clone(),
                            e
                    },
                    blockSize: 32
                });
                e.SHA512 = t._createHelper(l),
                    e.HmacSHA512 = t._createHmacHelper(l)
            }()
    }

    setBase64()
    setMD5()
    setEvpKDF()
    setCipher()
    setAES()
    setSHA512()

    console.log(core)

    aaaa = {"modified_img_width":340,"id":"c37abf53c7135733b17da3f5d0522e96178ccebe","mode":"slide","reply":[{"x":157,"y":58,"relative_time":554},{"x":221,"y":58,"relative_time":992},{"x":223,"y":58,"relative_time":1418},{"x":227,"y":58,"relative_time":1837}],"models":{"x":{"time":1626688261454,"x":374,"y":368.5},"y":{"x":74,"y":316.5,"time":1626688261621},"z":[],"t":[],"m":[{"x":210,"y":309.5,"time":1626688262896},{"x":274,"y":309.5,"time":1626688263334},{"x":276,"y":309.5,"time":1626688263760},{"x":280,"y":309.5,"time":1626688264179}]},"log_params":"{\"flag\":0,\"key\":\"h5_action\",\"webdriver\":\"false\",\"drag_type\":\"btn\",\"challenge_code\":99999,\"challenge_id\":\"c37abf53c7135733b17da3f5d0522e96178ccebe\",\"mode\":\"slide\",\"moveArr\":\"[{\\\"x\\\":210,\\\"y\\\":309.5,\\\"time\\\":1626688262896},{\\\"x\\\":274,\\\"y\\\":309.5,\\\"time\\\":1626688263334},{\\\"x\\\":276,\\\"y\\\":309.5,\\\"time\\\":1626688263760},{\\\"x\\\":280,\\\"y\\\":309.5,\\\"time\\\":1626688264179}]\",\"models\":\"{\\\"x\\\":{\\\"time\\\":1626688261454,\\\"x\\\":374,\\\"y\\\":368.5},\\\"y\\\":{\\\"x\\\":74,\\\"y\\\":316.5,\\\"time\\\":1626688261621},\\\"z\\\":[],\\\"t\\\":[]}\",\"moveArr2\":\"[{\\\"x\\\":210,\\\"y\\\":309.5,\\\"time\\\":1626688262896},{\\\"x\\\":274,\\\"y\\\":309.5,\\\"time\\\":1626688263334},{\\\"x\\\":276,\\\"y\\\":309.5,\\\"time\\\":1626688263760},{\\\"x\\\":280,\\\"y\\\":309.5,\\\"time\\\":1626688264179}]\",\"models2\":\"{\\\"x\\\":{\\\"time\\\":1626688261454,\\\"x\\\":374,\\\"y\\\":368.5},\\\"y\\\":{\\\"x\\\":74,\\\"y\\\":316.5,\\\"time\\\":1626688261621},\\\"z\\\":[{\\\"x\\\":369,\\\"y\\\":327.5,\\\"time\\\":1626685944772},{\\\"x\\\":97,\\\"y\\\":320.5,\\\"time\\\":1626685944900},{\\\"x\\\":205,\\\"y\\\":319.5,\\\"time\\\":1626685946240},{\\\"x\\\":290,\\\"y\\\":321.5,\\\"time\\\":1626685946648},{\\\"x\\\":317,\\\"y\\\":318.5,\\\"time\\\":1626685947073},{\\\"x\\\":374,\\\"y\\\":368.5,\\\"time\\\":1626688261619},{\\\"x\\\":210,\\\"y\\\":309.5,\\\"time\\\":1626688263331},{\\\"x\\\":274,\\\"y\\\":309.5,\\\"time\\\":1626688263758}],\\\"t\\\":[]}\",\"time\":1626688265751}","reply2":[{"x":157,"y":58,"relative_time":554},{"x":221,"y":58,"relative_time":992},{"x":223,"y":58,"relative_time":1418},{"x":227,"y":58,"relative_time":1837}],"models2":{"x":{"time":1626688261454,"x":374,"y":368.5},"y":{"x":74,"y":316.5,"time":1626688261621},"z":[{"x":369,"y":327.5,"time":1626685944772},{"x":97,"y":320.5,"time":1626685944900},{"x":205,"y":319.5,"time":1626685946240},{"x":290,"y":321.5,"time":1626685946648},{"x":317,"y":318.5,"time":1626685947073},{"x":374,"y":368.5,"time":1626688261619},{"x":210,"y":309.5,"time":1626688263331},{"x":274,"y":309.5,"time":1626688263758}],"t":[],"m":[{"x":210,"y":309.5,"time":1626688262896},{"x":274,"y":309.5,"time":1626688263334},{"x":276,"y":309.5,"time":1626688263760},{"x":280,"y":309.5,"time":1626688264179}]}}
    bbbb = core.enc.Utf8.parse(JSON.stringify(aaaa))
    cccc = new core.algo.SHA512.init().finalize(bbbb)
    dddd = core.enc.Hex.stringify(cccc)
    core.enc.Hex.parse(cccc)
    eeee = cccc.concat(bbbb)
    console.log(cccc)
}
encrypt()