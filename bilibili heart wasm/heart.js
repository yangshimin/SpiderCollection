(self.webpackChunklive_room = self.webpackChunklive_room || []).push([[6741], {
    96741: function(e, r, _) {
        "use strict";
        _.r(r),
            _.d(r, {
                default: function() {
                    return T
                }
            });
        var t = _(86902)
            , n = _.n(t)
            , a = _(52424)
            , E = _.n(a)
            , c = _(39392)
            , o = _.n(c);
        function T() {
            var e = {
                STDWEB_PRIVATE: {}
            };
            e.STDWEB_PRIVATE.to_utf8 = function(r, _) {
                for (var t = e.HEAPU8, n = 0; n < r.length; ++n) {
                    var a = r.charCodeAt(n);
                    a >= 55296 && a <= 57343 && (a = 65536 + ((1023 & a) << 10) | 1023 & r.charCodeAt(++n)),
                        a <= 127 ? t[_++] = a : a <= 2047 ? (t[_++] = 192 | a >> 6,
                            t[_++] = 128 | 63 & a) : a <= 65535 ? (t[_++] = 224 | a >> 12,
                            t[_++] = 128 | a >> 6 & 63,
                            t[_++] = 128 | 63 & a) : a <= 2097151 ? (t[_++] = 240 | a >> 18,
                            t[_++] = 128 | a >> 12 & 63,
                            t[_++] = 128 | a >> 6 & 63,
                            t[_++] = 128 | 63 & a) : a <= 67108863 ? (t[_++] = 248 | a >> 24,
                            t[_++] = 128 | a >> 18 & 63,
                            t[_++] = 128 | a >> 12 & 63,
                            t[_++] = 128 | a >> 6 & 63,
                            t[_++] = 128 | 63 & a) : (t[_++] = 252 | a >> 30,
                            t[_++] = 128 | a >> 24 & 63,
                            t[_++] = 128 | a >> 18 & 63,
                            t[_++] = 128 | a >> 12 & 63,
                            t[_++] = 128 | a >> 6 & 63,
                            t[_++] = 128 | 63 & a)
                }
            }
                ,
                e.STDWEB_PRIVATE.noop = function() {}
                ,
                e.STDWEB_PRIVATE.to_js = function(r) {
                    var _ = e.HEAPU8[r + 12];
                    if (0 !== _) {
                        if (1 === _)
                            return null;
                        if (2 === _)
                            return e.HEAP32[r / 4];
                        if (3 === _)
                            return e.HEAPF64[r / 8];
                        if (4 === _) {
                            var t = e.HEAPU32[r / 4]
                                , n = e.HEAPU32[(r + 4) / 4];
                            return e.STDWEB_PRIVATE.to_js_string(t, n)
                        }
                        if (5 === _)
                            return !1;
                        if (6 === _)
                            return !0;
                        if (7 === _) {
                            t = e.STDWEB_PRIVATE.arena + e.HEAPU32[r / 4],
                                n = e.HEAPU32[(r + 4) / 4];
                            for (var a = [], E = 0; E < n; ++E)
                                a.push(e.STDWEB_PRIVATE.to_js(t + 16 * E));
                            return a
                        }
                        if (8 === _) {
                            var c = e.STDWEB_PRIVATE.arena
                                , o = c + e.HEAPU32[r / 4]
                                , T = (n = e.HEAPU32[(r + 4) / 4],
                            c + e.HEAPU32[(r + 8) / 4]);
                            for (a = {},
                                     E = 0; E < n; ++E) {
                                var f = e.HEAPU32[(T + 8 * E) / 4]
                                    , u = e.HEAPU32[(T + 4 + 8 * E) / 4]
                                    , i = e.STDWEB_PRIVATE.to_js_string(f, u)
                                    , A = e.STDWEB_PRIVATE.to_js(o + 16 * E);
                                a[i] = A
                            }
                            return a
                        }
                        if (9 === _)
                            return e.STDWEB_PRIVATE.acquire_js_reference(e.HEAP32[r / 4]);
                        if (10 === _ || 12 === _ || 13 === _) {
                            var s = e.HEAPU32[r / 4]
                                , P = (t = e.HEAPU32[(r + 4) / 4],
                                e.HEAPU32[(r + 8) / 4])
                                , l = 0
                                , d = !1;
                            a = function() {
                                if (0 === t || !0 === d)
                                    throw 10 === _ ? new ReferenceError("Already dropped Rust function called!") : 12 === _ ? new ReferenceError("Already dropped FnMut function called!") : new ReferenceError("Already called or dropped FnOnce function called!");
                                var r = t;
                                if (13 === _ && (a.drop = e.STDWEB_PRIVATE.noop,
                                    t = 0),
                                0 !== l && (12 === _ || 13 === _))
                                    throw new ReferenceError("FnMut function called multiple times concurrently!");
                                var n = e.STDWEB_PRIVATE.alloc(16);
                                e.STDWEB_PRIVATE.serialize_array(n, arguments);
                                try {
                                    l += 1,
                                        e.STDWEB_PRIVATE.dyncall("vii", s, [r, n]);
                                    var E = e.STDWEB_PRIVATE.tmp;
                                    e.STDWEB_PRIVATE.tmp = null
                                } finally {
                                    l -= 1
                                }
                                return !0 === d && 0 === l && a.drop(),
                                    E
                            }
                            ;
                            return a.drop = function() {
                                if (0 === l) {
                                    a.drop = e.STDWEB_PRIVATE.noop;
                                    var r = t;
                                    t = 0,
                                    0 != r && e.STDWEB_PRIVATE.dyncall("vi", P, [r])
                                } else
                                    d = !0
                            }
                                ,
                                a
                        }
                        if (14 === _) {
                            t = e.HEAPU32[r / 4],
                                n = e.HEAPU32[(r + 4) / 4];
                            var S = e.HEAPU32[(r + 8) / 4]
                                , D = t + n;
                            switch (S) {
                                case 0:
                                    return e.HEAPU8.subarray(t, D);
                                case 1:
                                    return e.HEAP8.subarray(t, D);
                                case 2:
                                    return e.HEAPU16.subarray(t, D);
                                case 3:
                                    return e.HEAP16.subarray(t, D);
                                case 4:
                                    return e.HEAPU32.subarray(t, D);
                                case 5:
                                    return e.HEAP32.subarray(t, D);
                                case 6:
                                    return e.HEAPF32.subarray(t, D);
                                case 7:
                                    return e.HEAPF64.subarray(t, D)
                            }
                        } else if (15 === _)
                            return e.STDWEB_PRIVATE.get_raw_value(e.HEAPU32[r / 4])
                    }
                }
                ,
                e.STDWEB_PRIVATE.serialize_object = function(r, _) {
                    var t = n()(_)
                        , a = t.length
                        , E = e.STDWEB_PRIVATE.alloc(8 * a)
                        , c = e.STDWEB_PRIVATE.alloc(16 * a);
                    e.HEAPU8[r + 12] = 8,
                        e.HEAPU32[r / 4] = c,
                        e.HEAPU32[(r + 4) / 4] = a,
                        e.HEAPU32[(r + 8) / 4] = E;
                    for (var o = 0; o < a; ++o) {
                        var T = t[o]
                            , f = E + 8 * o;
                        e.STDWEB_PRIVATE.to_utf8_string(f, T),
                            e.STDWEB_PRIVATE.from_js(c + 16 * o, _[T])
                    }
                }
                ,
                e.STDWEB_PRIVATE.serialize_array = function(r, _) {
                    var t = _.length
                        , n = e.STDWEB_PRIVATE.alloc(16 * t);
                    e.HEAPU8[r + 12] = 7,
                        e.HEAPU32[r / 4] = n,
                        e.HEAPU32[(r + 4) / 4] = t;
                    for (var a = 0; a < t; ++a)
                        e.STDWEB_PRIVATE.from_js(n + 16 * a, _[a])
                }
            ;
            var r = "function" == typeof TextEncoder ? new TextEncoder("utf-8") : "object" == typeof util && util && "function" == typeof util.TextEncoder ? new util.TextEncoder("utf-8") : null;
            e.STDWEB_PRIVATE.to_utf8_string = null != r ? function(_, t) {
                    var n = r.encode(t)
                        , a = n.length
                        , E = 0;
                    a > 0 && (E = e.STDWEB_PRIVATE.alloc(a),
                        e.HEAPU8.set(n, E)),
                        e.HEAPU32[_ / 4] = E,
                        e.HEAPU32[(_ + 4) / 4] = a
                }
                : function(r, _) {
                    var t = e.STDWEB_PRIVATE.utf8_len(_)
                        , n = 0;
                    t > 0 && (n = e.STDWEB_PRIVATE.alloc(t),
                        e.STDWEB_PRIVATE.to_utf8(_, n)),
                        e.HEAPU32[r / 4] = n,
                        e.HEAPU32[(r + 4) / 4] = t
                }
                ,
                e.STDWEB_PRIVATE.from_js = function(r, _) {
                    var t = Object.prototype.toString.call(_);
                    if ("[object String]" === t)
                        e.HEAPU8[r + 12] = 4,
                            e.STDWEB_PRIVATE.to_utf8_string(r, _);
                    else if ("[object Number]" === t)
                        _ === (0 | _) ? (e.HEAPU8[r + 12] = 2,
                            e.HEAP32[r / 4] = _) : (e.HEAPU8[r + 12] = 3,
                            e.HEAPF64[r / 8] = _);
                    else if (null === _)
                        e.HEAPU8[r + 12] = 1;
                    else if (void 0 === _)
                        e.HEAPU8[r + 12] = 0;
                    else if (!1 === _)
                        e.HEAPU8[r + 12] = 5;
                    else if (!0 === _)
                        e.HEAPU8[r + 12] = 6;
                    else if ("[object Symbol]" === t) {
                        var n = e.STDWEB_PRIVATE.register_raw_value(_);
                        e.HEAPU8[r + 12] = 15,
                            e.HEAP32[r / 4] = n
                    } else {
                        var a = e.STDWEB_PRIVATE.acquire_rust_reference(_);
                        e.HEAPU8[r + 12] = 9,
                            e.HEAP32[r / 4] = a
                    }
                }
            ;
            var _ = "function" == typeof TextDecoder ? new TextDecoder("utf-8") : "object" == typeof util && util && "function" == typeof util.TextDecoder ? new util.TextDecoder("utf-8") : null;
            e.STDWEB_PRIVATE.to_js_string = null != _ ? function(r, t) {
                    return _.decode(e.HEAPU8.subarray(r, r + t))
                }
                : function(r, _) {
                    for (var t = e.HEAPU8, n = (0 | (r |= 0)) + (0 | (_ |= 0)), a = ""; r < n; ) {
                        var E = t[r++];
                        if (E < 128)
                            a += String.fromCharCode(E);
                        else {
                            var c = 31 & E
                                , o = 0;
                            r < n && (o = t[r++]);
                            var T = c << 6 | 63 & o;
                            if (E >= 224) {
                                var f = 0;
                                r < n && (f = t[r++]);
                                var u = (63 & o) << 6 | 63 & f;
                                if (T = c << 12 | u,
                                E >= 240) {
                                    var i = 0;
                                    r < n && (i = t[r++]),
                                        T = (7 & c) << 18 | u << 6 | 63 & i,
                                        a += String.fromCharCode(55232 + (T >> 10)),
                                        T = 56320 + (1023 & T)
                                }
                            }
                            a += String.fromCharCode(T)
                        }
                    }
                    return a
                }
                ,
                e.STDWEB_PRIVATE.id_to_ref_map = {},
                e.STDWEB_PRIVATE.id_to_refcount_map = {},
                e.STDWEB_PRIVATE.ref_to_id_map = new (E()),
                e.STDWEB_PRIVATE.ref_to_id_map_fallback = new (o()),
                e.STDWEB_PRIVATE.last_refid = 1,
                e.STDWEB_PRIVATE.id_to_raw_value_map = {},
                e.STDWEB_PRIVATE.last_raw_value_id = 1,
                e.STDWEB_PRIVATE.acquire_rust_reference = function(r) {
                    if (null == r)
                        return 0;
                    var _ = e.STDWEB_PRIVATE.id_to_refcount_map
                        , t = e.STDWEB_PRIVATE.id_to_ref_map
                        , n = e.STDWEB_PRIVATE.ref_to_id_map
                        , a = e.STDWEB_PRIVATE.ref_to_id_map_fallback
                        , E = n.get(r);
                    if (void 0 === E && (E = a.get(r)),
                    void 0 === E) {
                        E = e.STDWEB_PRIVATE.last_refid++;
                        try {
                            n.set(r, E)
                        } catch (e) {
                            a.set(r, E)
                        }
                    }
                    return E in t ? _[E]++ : (t[E] = r,
                        _[E] = 1),
                        E
                }
                ,
                e.STDWEB_PRIVATE.acquire_js_reference = function(r) {
                    return e.STDWEB_PRIVATE.id_to_ref_map[r]
                }
                ,
                e.STDWEB_PRIVATE.increment_refcount = function(r) {
                    e.STDWEB_PRIVATE.id_to_refcount_map[r]++
                }
                ,
                e.STDWEB_PRIVATE.decrement_refcount = function(r) {
                    var _ = e.STDWEB_PRIVATE.id_to_refcount_map;
                    if (0 == --_[r]) {
                        var t = e.STDWEB_PRIVATE.id_to_ref_map
                            , n = e.STDWEB_PRIVATE.ref_to_id_map_fallback
                            , a = t[r];
                        delete t[r],
                            delete _[r],
                            n.delete(a)
                    }
                }
                ,
                e.STDWEB_PRIVATE.register_raw_value = function(r) {
                    var _ = e.STDWEB_PRIVATE.last_raw_value_id++;
                    return e.STDWEB_PRIVATE.id_to_raw_value_map[_] = r,
                        _
                }
                ,
                e.STDWEB_PRIVATE.unregister_raw_value = function(r) {
                    delete e.STDWEB_PRIVATE.id_to_raw_value_map[r]
                }
                ,
                e.STDWEB_PRIVATE.get_raw_value = function(r) {
                    return e.STDWEB_PRIVATE.id_to_raw_value_map[r]
                }
                ,
                e.STDWEB_PRIVATE.alloc = function(r) {
                    return e.web_malloc(r)
                }
                ,
                e.STDWEB_PRIVATE.dyncall = function(r, _, t) {
                    return e.web_table.get(_).apply(null, t)
                }
                ,
                e.STDWEB_PRIVATE.utf8_len = function(e) {
                    for (var r = 0, _ = 0; _ < e.length; ++_) {
                        var t = e.charCodeAt(_);
                        t >= 55296 && t <= 57343 && (t = 65536 + ((1023 & t) << 10) | 1023 & e.charCodeAt(++_)),
                            t <= 127 ? ++r : r += t <= 2047 ? 2 : t <= 65535 ? 3 : t <= 2097151 ? 4 : t <= 67108863 ? 5 : 6
                    }
                    return r
                }
                ,
                e.STDWEB_PRIVATE.prepare_any_arg = function(r) {
                    var _ = e.STDWEB_PRIVATE.alloc(16);
                    return e.STDWEB_PRIVATE.from_js(_, r),
                        _
                }
                ,
                e.STDWEB_PRIVATE.acquire_tmp = function(r) {
                    var _ = e.STDWEB_PRIVATE.tmp;
                    return e.STDWEB_PRIVATE.tmp = null,
                        _
                }
            ;
            var t = null
                , a = null
                , c = null
                , T = null
                , f = null
                , u = null
                , i = null
                , A = null;
            function s() {
                var r = e.instance.exports.memory.buffer;
                t = new Int8Array(r),
                    a = new Int16Array(r),
                    c = new Int32Array(r),
                    T = new Uint8Array(r),
                    f = new Uint16Array(r),
                    u = new Uint32Array(r),
                    i = new Float32Array(r),
                    A = new Float64Array(r),
                    e.HEAP8 = t,
                    e.HEAP16 = a,
                    e.HEAP32 = c,
                    e.HEAPU8 = T,
                    e.HEAPU16 = f,
                    e.HEAPU32 = u,
                    e.HEAPF32 = i,
                    e.HEAPF64 = A
            }
            return Object.defineProperty(e, "exports", {
                value: {}
            }),
                {
                    imports: {
                        env: {
                            __cargo_web_snippet_0d39c013e2144171d64e2fac849140a7e54c939a: function(r, _) {
                                _ = e.STDWEB_PRIVATE.to_js(_),
                                    e.STDWEB_PRIVATE.from_js(r, _.location)
                            },
                            __cargo_web_snippet_0f503de1d61309643e0e13a7871406891e3691c9: function(r) {
                                e.STDWEB_PRIVATE.from_js(r, window)
                            },
                            __cargo_web_snippet_10f5aa3985855124ab83b21d4e9f7297eb496508: function(r) {
                                return e.STDWEB_PRIVATE.acquire_js_reference(r)instanceof Array | 0
                            },
                            __cargo_web_snippet_2b0b92aee0d0de6a955f8e5540d7923636d951ae: function(r, _) {
                                _ = e.STDWEB_PRIVATE.to_js(_),
                                    e.STDWEB_PRIVATE.from_js(r, function() {
                                        try {
                                            return {
                                                value: _.origin,
                                                success: !0
                                            }
                                        } catch (e) {
                                            return {
                                                error: e,
                                                success: !1
                                            }
                                        }
                                    }())
                            },
                            __cargo_web_snippet_461d4581925d5b0bf583a3b445ed676af8701ca6: function(r, _) {
                                _ = e.STDWEB_PRIVATE.to_js(_),
                                    e.STDWEB_PRIVATE.from_js(r, function() {
                                        try {
                                            return {
                                                value: _.host,
                                                success: !0
                                            }
                                        } catch (e) {
                                            return {
                                                error: e,
                                                success: !1
                                            }
                                        }
                                    }())
                            },
                            __cargo_web_snippet_4c895ac2b754e5559c1415b6546d672c58e29da6: function(r, _) {
                                _ = e.STDWEB_PRIVATE.to_js(_),
                                    e.STDWEB_PRIVATE.from_js(r, function() {
                                        try {
                                            return {
                                                value: _.protocol,
                                                success: !0
                                            }
                                        } catch (e) {
                                            return {
                                                error: e,
                                                success: !1
                                            }
                                        }
                                    }())
                            },
                            __cargo_web_snippet_614a3dd2adb7e9eac4a0ec6e59d37f87e0521c3b: function(r, _) {
                                _ = e.STDWEB_PRIVATE.to_js(_),
                                    e.STDWEB_PRIVATE.from_js(r, _.error)
                            },
                            __cargo_web_snippet_62ef43cf95b12a9b5cdec1639439c972d6373280: function(r, _) {
                                _ = e.STDWEB_PRIVATE.to_js(_),
                                    e.STDWEB_PRIVATE.from_js(r, _.childNodes)
                            },
                            __cargo_web_snippet_6fcce0aae651e2d748e085ff1f800f87625ff8c8: function(r) {
                                e.STDWEB_PRIVATE.from_js(r, document)
                            },
                            __cargo_web_snippet_7ba9f102925446c90affc984f921f414615e07dd: function(r, _) {
                                _ = e.STDWEB_PRIVATE.to_js(_),
                                    e.STDWEB_PRIVATE.from_js(r, _.body)
                            },
                            __cargo_web_snippet_80d6d56760c65e49b7be8b6b01c1ea861b046bf0: function(r) {
                                e.STDWEB_PRIVATE.decrement_refcount(r)
                            },
                            __cargo_web_snippet_897ff2d0160606ea98961935acb125d1ddbf4688: function(r) {
                                var _ = e.STDWEB_PRIVATE.acquire_js_reference(r);
                                return _ instanceof DOMException && "SecurityError" === _.name
                            },
                            __cargo_web_snippet_8c32019649bb581b1b742eeedfc410e2bedd56a6: function(r, _) {
                                var t = e.STDWEB_PRIVATE.acquire_js_reference(r);
                                e.STDWEB_PRIVATE.serialize_array(_, t)
                            },
                            __cargo_web_snippet_a466a2ab96cd77e1a77dcdb39f4f031701c195fc: function(r, _) {
                                _ = e.STDWEB_PRIVATE.to_js(_),
                                    e.STDWEB_PRIVATE.from_js(r, function() {
                                        try {
                                            return {
                                                value: _.pathname,
                                                success: !0
                                            }
                                        } catch (e) {
                                            return {
                                                error: e,
                                                success: !1
                                            }
                                        }
                                    }())
                            },
                            __cargo_web_snippet_ab05f53189dacccf2d365ad26daa407d4f7abea9: function(r, _) {
                                _ = e.STDWEB_PRIVATE.to_js(_),
                                    e.STDWEB_PRIVATE.from_js(r, _.value)
                            },
                            __cargo_web_snippet_b06dde4acf09433b5190a4b001259fe5d4abcbc2: function(r, _) {
                                _ = e.STDWEB_PRIVATE.to_js(_),
                                    e.STDWEB_PRIVATE.from_js(r, _.success)
                            },
                            __cargo_web_snippet_b33a39de4ca954888e26fe9caa277138e808eeba: function(r, _) {
                                _ = e.STDWEB_PRIVATE.to_js(_),
                                    e.STDWEB_PRIVATE.from_js(r, _.length)
                            },
                            __cargo_web_snippet_cdf2859151791ce4cad80688b200564fb08a8613: function(r, _) {
                                _ = e.STDWEB_PRIVATE.to_js(_),
                                    e.STDWEB_PRIVATE.from_js(r, function() {
                                        try {
                                            return {
                                                value: _.href,
                                                success: !0
                                            }
                                        } catch (e) {
                                            return {
                                                error: e,
                                                success: !1
                                            }
                                        }
                                    }())
                            },
                            __cargo_web_snippet_e8ef87c41ded1c10f8de3c70dea31a053e19747c: function(r, _) {
                                _ = e.STDWEB_PRIVATE.to_js(_),
                                    e.STDWEB_PRIVATE.from_js(r, function() {
                                        try {
                                            return {
                                                value: _.hostname,
                                                success: !0
                                            }
                                        } catch (e) {
                                            return {
                                                error: e,
                                                success: !1
                                            }
                                        }
                                    }())
                            },
                            __cargo_web_snippet_e9638d6405ab65f78daf4a5af9c9de14ecf1e2ec: function(r) {
                                r = e.STDWEB_PRIVATE.to_js(r),
                                    e.STDWEB_PRIVATE.unregister_raw_value(r)
                            },
                            __cargo_web_snippet_ff5103e6cc179d13b4c7a785bdce2708fd559fc0: function(r) {
                                e.STDWEB_PRIVATE.tmp = e.STDWEB_PRIVATE.to_js(r)
                            },
                            __web_on_grow: s
                        }
                    },
                    initialize: function(r) {
                        return Object.defineProperty(e, "instance", {
                            value: r
                        }),
                            Object.defineProperty(e, "web_malloc", {
                                value: e.instance.exports.__web_malloc
                            }),
                            Object.defineProperty(e, "web_free", {
                                value: e.instance.exports.__web_free
                            }),
                            Object.defineProperty(e, "web_table", {
                                value: e.instance.exports.__indirect_function_table
                            }),
                            e.exports.spyder = function(r, _) {
                                return e.STDWEB_PRIVATE.acquire_tmp(e.instance.exports.spyder(e.STDWEB_PRIVATE.prepare_any_arg(r), e.STDWEB_PRIVATE.prepare_any_arg(_)))
                            }
                            ,
                            s(),
                            e.exports
                    }
                }
        }
    }
}]);
