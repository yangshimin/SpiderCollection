(self.webpackChunklive_room = self.webpackChunklive_room || []).push([[9698], {
    39698: function(e, r, t) {
        "use strict";
        t.r(r),
            t.d(r, {
                default: function() {
                    return u
                }
            });
        var n = t(86902)
            , _ = t.n(n)
            , E = t(52424)
            , a = t.n(E)
            , o = t(39392)
            , T = t.n(o);
        function u() {
            var e = {
                STDWEB_PRIVATE: {}
            };
            e.STDWEB_PRIVATE.to_utf8 = function(r, t) {
                for (var n = e.HEAPU8, _ = 0; _ < r.length; ++_) {
                    var E = r.charCodeAt(_);
                    E >= 55296 && E <= 57343 && (E = 65536 + ((1023 & E) << 10) | 1023 & r.charCodeAt(++_)),
                        E <= 127 ? n[t++] = E : E <= 2047 ? (n[t++] = 192 | E >> 6,
                            n[t++] = 128 | 63 & E) : E <= 65535 ? (n[t++] = 224 | E >> 12,
                            n[t++] = 128 | E >> 6 & 63,
                            n[t++] = 128 | 63 & E) : E <= 2097151 ? (n[t++] = 240 | E >> 18,
                            n[t++] = 128 | E >> 12 & 63,
                            n[t++] = 128 | E >> 6 & 63,
                            n[t++] = 128 | 63 & E) : E <= 67108863 ? (n[t++] = 248 | E >> 24,
                            n[t++] = 128 | E >> 18 & 63,
                            n[t++] = 128 | E >> 12 & 63,
                            n[t++] = 128 | E >> 6 & 63,
                            n[t++] = 128 | 63 & E) : (n[t++] = 252 | E >> 30,
                            n[t++] = 128 | E >> 24 & 63,
                            n[t++] = 128 | E >> 18 & 63,
                            n[t++] = 128 | E >> 12 & 63,
                            n[t++] = 128 | E >> 6 & 63,
                            n[t++] = 128 | 63 & E)
                }
            }
                ,
                e.STDWEB_PRIVATE.noop = function() {}
                ,
                e.STDWEB_PRIVATE.to_js = function(r) {
                    var t = e.HEAPU8[r + 12];
                    if (0 !== t) {
                        if (1 === t)
                            return null;
                        if (2 === t)
                            return e.HEAP32[r / 4];
                        if (3 === t)
                            return e.HEAPF64[r / 8];
                        if (4 === t) {
                            var n = e.HEAPU32[r / 4]
                                , _ = e.HEAPU32[(r + 4) / 4];
                            return e.STDWEB_PRIVATE.to_js_string(n, _)
                        }
                        if (5 === t)
                            return !1;
                        if (6 === t)
                            return !0;
                        if (7 === t) {
                            n = e.STDWEB_PRIVATE.arena + e.HEAPU32[r / 4],
                                _ = e.HEAPU32[(r + 4) / 4];
                            for (var E = [], a = 0; a < _; ++a)
                                E.push(e.STDWEB_PRIVATE.to_js(n + 16 * a));
                            return E
                        }
                        if (8 === t) {
                            var o = e.STDWEB_PRIVATE.arena
                                , T = o + e.HEAPU32[r / 4]
                                , u = (_ = e.HEAPU32[(r + 4) / 4],
                            o + e.HEAPU32[(r + 8) / 4]);
                            for (E = {},
                                     a = 0; a < _; ++a) {
                                var i = e.HEAPU32[(u + 8 * a) / 4]
                                    , A = e.HEAPU32[(u + 4 + 8 * a) / 4]
                                    , l = e.STDWEB_PRIVATE.to_js_string(i, A)
                                    , f = e.STDWEB_PRIVATE.to_js(T + 16 * a);
                                E[l] = f
                            }
                            return E
                        }
                        if (9 === t)
                            return e.STDWEB_PRIVATE.acquire_js_reference(e.HEAP32[r / 4]);
                        if (10 === t || 12 === t || 13 === t) {
                            var c = e.HEAPU32[r / 4]
                                , P = (n = e.HEAPU32[(r + 4) / 4],
                                e.HEAPU32[(r + 8) / 4])
                                , s = 0
                                , S = !1;
                            E = function() {
                                if (0 === n || !0 === S)
                                    throw 10 === t ? new ReferenceError("Already dropped Rust function called!") : 12 === t ? new ReferenceError("Already dropped FnMut function called!") : new ReferenceError("Already called or dropped FnOnce function called!");
                                var r = n;
                                if (13 === t && (E.drop = e.STDWEB_PRIVATE.noop,
                                    n = 0),
                                0 !== s && (12 === t || 13 === t))
                                    throw new ReferenceError("FnMut function called multiple times concurrently!");
                                var _ = e.STDWEB_PRIVATE.alloc(16);
                                e.STDWEB_PRIVATE.serialize_array(_, arguments);
                                try {
                                    s += 1,
                                        e.STDWEB_PRIVATE.dyncall("vii", c, [r, _]);
                                    var a = e.STDWEB_PRIVATE.tmp;
                                    e.STDWEB_PRIVATE.tmp = null
                                } finally {
                                    s -= 1
                                }
                                return !0 === S && 0 === s && E.drop(),
                                    a
                            }
                            ;
                            return E.drop = function() {
                                if (0 === s) {
                                    E.drop = e.STDWEB_PRIVATE.noop;
                                    var r = n;
                                    n = 0,
                                    0 != r && e.STDWEB_PRIVATE.dyncall("vi", P, [r])
                                } else
                                    S = !0
                            }
                                ,
                                E
                        }
                        if (14 === t) {
                            n = e.HEAPU32[r / 4],
                                _ = e.HEAPU32[(r + 4) / 4];
                            var R = e.HEAPU32[(r + 8) / 4]
                                , D = n + _;
                            switch (R) {
                                case 0:
                                    return e.HEAPU8.subarray(n, D);
                                case 1:
                                    return e.HEAP8.subarray(n, D);
                                case 2:
                                    return e.HEAPU16.subarray(n, D);
                                case 3:
                                    return e.HEAP16.subarray(n, D);
                                case 4:
                                    return e.HEAPU32.subarray(n, D);
                                case 5:
                                    return e.HEAP32.subarray(n, D);
                                case 6:
                                    return e.HEAPF32.subarray(n, D);
                                case 7:
                                    return e.HEAPF64.subarray(n, D)
                            }
                        } else if (15 === t)
                            return e.STDWEB_PRIVATE.get_raw_value(e.HEAPU32[r / 4])
                    }
                }
                ,
                e.STDWEB_PRIVATE.serialize_object = function(r, t) {
                    var n = _()(t)
                        , E = n.length
                        , a = e.STDWEB_PRIVATE.alloc(8 * E)
                        , o = e.STDWEB_PRIVATE.alloc(16 * E);
                    e.HEAPU8[r + 12] = 8,
                        e.HEAPU32[r / 4] = o,
                        e.HEAPU32[(r + 4) / 4] = E,
                        e.HEAPU32[(r + 8) / 4] = a;
                    for (var T = 0; T < E; ++T) {
                        var u = n[T]
                            , i = a + 8 * T;
                        e.STDWEB_PRIVATE.to_utf8_string(i, u),
                            e.STDWEB_PRIVATE.from_js(o + 16 * T, t[u])
                    }
                }
                ,
                e.STDWEB_PRIVATE.serialize_array = function(r, t) {
                    var n = t.length
                        , _ = e.STDWEB_PRIVATE.alloc(16 * n);
                    e.HEAPU8[r + 12] = 7,
                        e.HEAPU32[r / 4] = _,
                        e.HEAPU32[(r + 4) / 4] = n;
                    for (var E = 0; E < n; ++E)
                        e.STDWEB_PRIVATE.from_js(_ + 16 * E, t[E])
                }
            ;
            var r = "function" == typeof TextEncoder ? new TextEncoder("utf-8") : "object" == typeof util && util && "function" == typeof util.TextEncoder ? new util.TextEncoder("utf-8") : null;
            e.STDWEB_PRIVATE.to_utf8_string = null != r ? function(t, n) {
                    var _ = r.encode(n)
                        , E = _.length
                        , a = 0;
                    E > 0 && (a = e.STDWEB_PRIVATE.alloc(E),
                        e.HEAPU8.set(_, a)),
                        e.HEAPU32[t / 4] = a,
                        e.HEAPU32[(t + 4) / 4] = E
                }
                : function(r, t) {
                    var n = e.STDWEB_PRIVATE.utf8_len(t)
                        , _ = 0;
                    n > 0 && (_ = e.STDWEB_PRIVATE.alloc(n),
                        e.STDWEB_PRIVATE.to_utf8(t, _)),
                        e.HEAPU32[r / 4] = _,
                        e.HEAPU32[(r + 4) / 4] = n
                }
                ,
                e.STDWEB_PRIVATE.from_js = function(r, t) {
                    var n = Object.prototype.toString.call(t);
                    if ("[object String]" === n)
                        e.HEAPU8[r + 12] = 4,
                            e.STDWEB_PRIVATE.to_utf8_string(r, t);
                    else if ("[object Number]" === n)
                        t === (0 | t) ? (e.HEAPU8[r + 12] = 2,
                            e.HEAP32[r / 4] = t) : (e.HEAPU8[r + 12] = 3,
                            e.HEAPF64[r / 8] = t);
                    else if (null === t)
                        e.HEAPU8[r + 12] = 1;
                    else if (void 0 === t)
                        e.HEAPU8[r + 12] = 0;
                    else if (!1 === t)
                        e.HEAPU8[r + 12] = 5;
                    else if (!0 === t)
                        e.HEAPU8[r + 12] = 6;
                    else if ("[object Symbol]" === n) {
                        var _ = e.STDWEB_PRIVATE.register_raw_value(t);
                        e.HEAPU8[r + 12] = 15,
                            e.HEAP32[r / 4] = _
                    } else {
                        var E = e.STDWEB_PRIVATE.acquire_rust_reference(t);
                        e.HEAPU8[r + 12] = 9,
                            e.HEAP32[r / 4] = E
                    }
                }
            ;
            var t = "function" == typeof TextDecoder ? new TextDecoder("utf-8") : "object" == typeof util && util && "function" == typeof util.TextDecoder ? new util.TextDecoder("utf-8") : null;
            e.STDWEB_PRIVATE.to_js_string = null != t ? function(r, n) {
                    return t.decode(e.HEAPU8.subarray(r, r + n))
                }
                : function(r, t) {
                    for (var n = e.HEAPU8, _ = (0 | (r |= 0)) + (0 | (t |= 0)), E = ""; r < _; ) {
                        var a = n[r++];
                        if (a < 128)
                            E += String.fromCharCode(a);
                        else {
                            var o = 31 & a
                                , T = 0;
                            r < _ && (T = n[r++]);
                            var u = o << 6 | 63 & T;
                            if (a >= 224) {
                                var i = 0;
                                r < _ && (i = n[r++]);
                                var A = (63 & T) << 6 | 63 & i;
                                if (u = o << 12 | A,
                                a >= 240) {
                                    var l = 0;
                                    r < _ && (l = n[r++]),
                                        u = (7 & o) << 18 | A << 6 | 63 & l,
                                        E += String.fromCharCode(55232 + (u >> 10)),
                                        u = 56320 + (1023 & u)
                                }
                            }
                            E += String.fromCharCode(u)
                        }
                    }
                    return E
                }
                ,
                e.STDWEB_PRIVATE.id_to_ref_map = {},
                e.STDWEB_PRIVATE.id_to_refcount_map = {},
                e.STDWEB_PRIVATE.ref_to_id_map = new (a()),
                e.STDWEB_PRIVATE.ref_to_id_map_fallback = new (T()),
                e.STDWEB_PRIVATE.last_refid = 1,
                e.STDWEB_PRIVATE.id_to_raw_value_map = {},
                e.STDWEB_PRIVATE.last_raw_value_id = 1,
                e.STDWEB_PRIVATE.acquire_rust_reference = function(r) {
                    if (null == r)
                        return 0;
                    var t = e.STDWEB_PRIVATE.id_to_refcount_map
                        , n = e.STDWEB_PRIVATE.id_to_ref_map
                        , _ = e.STDWEB_PRIVATE.ref_to_id_map
                        , E = e.STDWEB_PRIVATE.ref_to_id_map_fallback
                        , a = _.get(r);
                    if (void 0 === a && (a = E.get(r)),
                    void 0 === a) {
                        a = e.STDWEB_PRIVATE.last_refid++;
                        try {
                            _.set(r, a)
                        } catch (e) {
                            E.set(r, a)
                        }
                    }
                    return a in n ? t[a]++ : (n[a] = r,
                        t[a] = 1),
                        a
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
                    var t = e.STDWEB_PRIVATE.id_to_refcount_map;
                    if (0 == --t[r]) {
                        var n = e.STDWEB_PRIVATE.id_to_ref_map
                            , _ = e.STDWEB_PRIVATE.ref_to_id_map_fallback
                            , E = n[r];
                        delete n[r],
                            delete t[r],
                            _.delete(E)
                    }
                }
                ,
                e.STDWEB_PRIVATE.register_raw_value = function(r) {
                    var t = e.STDWEB_PRIVATE.last_raw_value_id++;
                    return e.STDWEB_PRIVATE.id_to_raw_value_map[t] = r,
                        t
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
                e.STDWEB_PRIVATE.dyncall = function(r, t, n) {
                    return e.web_table.get(t).apply(null, n)
                }
                ,
                e.STDWEB_PRIVATE.utf8_len = function(e) {
                    for (var r = 0, t = 0; t < e.length; ++t) {
                        var n = e.charCodeAt(t);
                        n >= 55296 && n <= 57343 && (n = 65536 + ((1023 & n) << 10) | 1023 & e.charCodeAt(++t)),
                            n <= 127 ? ++r : r += n <= 2047 ? 2 : n <= 65535 ? 3 : n <= 2097151 ? 4 : n <= 67108863 ? 5 : 6
                    }
                    return r
                }
                ,
                e.STDWEB_PRIVATE.prepare_any_arg = function(r) {
                    var t = e.STDWEB_PRIVATE.alloc(16);
                    return e.STDWEB_PRIVATE.from_js(t, r),
                        t
                }
                ,
                e.STDWEB_PRIVATE.acquire_tmp = function(r) {
                    var t = e.STDWEB_PRIVATE.tmp;
                    return e.STDWEB_PRIVATE.tmp = null,
                        t
                }
            ;
            var n = null
                , E = null
                , o = null
                , u = null
                , i = null
                , A = null
                , l = null
                , f = null;
            function c() {
                var r = e.instance.exports.memory.buffer;
                n = new Int8Array(r),
                    E = new Int16Array(r),
                    o = new Int32Array(r),
                    u = new Uint8Array(r),
                    i = new Uint16Array(r),
                    A = new Uint32Array(r),
                    l = new Float32Array(r),
                    f = new Float64Array(r),
                    e.HEAP8 = n,
                    e.HEAP16 = E,
                    e.HEAP32 = o,
                    e.HEAPU8 = u,
                    e.HEAPU16 = i,
                    e.HEAPU32 = A,
                    e.HEAPF32 = l,
                    e.HEAPF64 = f
            }
            return Object.defineProperty(e, "exports", {
                value: {}
            }),
                {
                    imports: {
                        env: {
                            __cargo_web_snippet_80d6d56760c65e49b7be8b6b01c1ea861b046bf0: function(r) {
                                e.STDWEB_PRIVATE.decrement_refcount(r)
                            },
                            __cargo_web_snippet_e9638d6405ab65f78daf4a5af9c9de14ecf1e2ec: function(r) {
                                r = e.STDWEB_PRIVATE.to_js(r),
                                    e.STDWEB_PRIVATE.unregister_raw_value(r)
                            },
                            __cargo_web_snippet_ff5103e6cc179d13b4c7a785bdce2708fd559fc0: function(r) {
                                e.STDWEB_PRIVATE.tmp = e.STDWEB_PRIVATE.to_js(r)
                            },
                            __web_on_grow: c
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
                            e.exports.skynet = function(r) {
                                return e.STDWEB_PRIVATE.acquire_tmp(e.instance.exports.skynet(e.STDWEB_PRIVATE.prepare_any_arg(r)))
                            }
                            ,
                            c(),
                            e.exports
                    }
                }
        }
    }
}]);
