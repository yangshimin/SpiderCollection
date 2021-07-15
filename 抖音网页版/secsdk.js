function secsdk(window){
    var e = window.secsdk = {}
    !(function(e) {
        "use strict";
        var t = window
        function n(e, t) {
            return e(t = {
                exports: {}
            }, t.exports),
                t.exports
        }
        var r = n((function(e) {
                function t(n) {
                    return "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? e.exports = t = function(e) {
                            return typeof e
                        }
                        : e.exports = t = function(e) {
                            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                        }
                        ,
                        t(n)
                }
                e.exports = t
            }
        ))
            , o = function(e) {
            return e && e.Math == Math && e
        }
            , i = o(window)
            , a = function(e) {
            try {
                return !!e()
            } catch (t) {
                return !0
            }
        }
            , u = !a((function() {
                return 7 != Object.defineProperty({}, 1, {
                    get: function() {
                        return 7
                    }
                })[1]
            }
        ))
            , c = {}.propertyIsEnumerable
            , s = Object.getOwnPropertyDescriptor
            , f = {
            f: s && !c.call({
                1: 2
            }, 1) ? function(e) {
                    var t = s(this, e);
                    return !!t && t.enumerable
                }
                : c
        }
            , l = function(e, t) {
            return {
                enumerable: !(1 & e),
                configurable: !(2 & e),
                writable: !(4 & e),
                value: t
            }
        }
            , h = {}.toString
            , p = function(e) {
            return h.call(e).slice(8, -1)
        }
            , v = "".split
            , d = a((function() {
                return !Object("z").propertyIsEnumerable(0)
            }
        )) ? function(e) {
                return "String" == p(e) ? v.call(e, "") : Object(e)
            }
            : Object
            , y = function(e) {
            if (null == e)
                throw TypeError("Can't call method on " + e);
            return e
        }
            , g = function(e) {
            return d(y(e))
        }
            , m = function(e) {
            return "object" === r(e) ? null !== e : "function" == typeof e
        }
            , w = function(e, t) {
            if (!m(e))
                return e;
            var n, r;
            if (t && "function" == typeof (n = e.toString) && !m(r = n.call(e)))
                return r;
            if ("function" == typeof (n = e.valueOf) && !m(r = n.call(e)))
                return r;
            if (!t && "function" == typeof (n = e.toString) && !m(r = n.call(e)))
                return r;
            throw TypeError("Can't convert object to primitive value")
        }
            , b = {}.hasOwnProperty
            , S = function(e, t) {
            return b.call(e, t)
        }
            , k = i.document
            , R = m(k) && m(k.createElement)
            , L = function(e) {
            return R ? k.createElement(e) : {}
        }
            , A = !u && !a((function() {
                return 7 != Object.defineProperty(L("div"), "a", {
                    get: function() {
                        return 7
                    }
                }).a
            }
        ))
            , j = Object.getOwnPropertyDescriptor
            , E = {
            f: u ? j : function(e, t) {
                if (e = g(e),
                    t = w(t, !0),
                    A)
                    try {
                        return j(e, t)
                    } catch (n) {}
                if (S(e, t))
                    return l(!f.f.call(e, t), e[t])
            }
        }
            , O = function(e) {
            if (!m(e))
                throw TypeError(String(e) + " is not an object");
            return e
        }
            , P = Object.defineProperty
            , T = {
            f: u ? P : function(e, t, n) {
                if (O(e),
                    t = w(t, !0),
                    O(n),
                    A)
                    try {
                        return P(e, t, n)
                    } catch (r) {}
                if ("get"in n || "set"in n)
                    throw TypeError("Accessors not supported");
                return "value"in n && (e[t] = n.value),
                    e
            }
        }
            , q = u ? function(e, t, n) {
                return T.f(e, t, l(1, n))
            }
            : function(e, t, n) {
                return e[t] = n,
                    e
            }
            , U = function(e, t) {
            try {
                q(i, e, t)
            } catch (n) {
                i[e] = t
            }
            return t
        }
            , x = i["__core-js_shared__"] || U("__core-js_shared__", {})
            , M = Function.toString;
        "function" != typeof x.inspectSource && (x.inspectSource = function(e) {
                return M.call(e)
            }
        );
        var I, C, H, F = x.inspectSource, _ = i.WeakMap, N = "function" == typeof _ && /native code/.test(F(_)), B = n((function(e) {
                (e.exports = function(e, t) {
                        return x[e] || (x[e] = void 0 !== t ? t : {})
                    }
                )("versions", []).push({
                    version: "3.8.2",
                    mode: "global",
                    copyright: "© 2021 Denis Pushkarev (zloirock.ru)"
                })
            }
        )), D = 0, X = Math.random(), G = function(e) {
            return "Symbol(" + String(void 0 === e ? "" : e) + ")_" + (++D + X).toString(36)
        }, V = B("keys"), W = function(e) {
            return V[e] || (V[e] = G(e))
        }, z = {}, $ = i.WeakMap;
        if (N) {
            var Y = x.state || (x.state = new $)
                , J = Y.get
                , K = Y.has
                , Z = Y.set;
            I = function(e, t) {
                return t.facade = e,
                    Z.call(Y, e, t),
                    t
            }
                ,
                C = function(e) {
                    return J.call(Y, e) || {}
                }
                ,
                H = function(e) {
                    return K.call(Y, e)
                }
        } else {
            var Q = W("state");
            z[Q] = !0,
                I = function(e, t) {
                    return t.facade = e,
                        q(e, Q, t),
                        t
                }
                ,
                C = function(e) {
                    return S(e, Q) ? e[Q] : {}
                }
                ,
                H = function(e) {
                    return S(e, Q)
                }
        }
        var ee = {
                set: I,
                get: C,
                has: H,
                enforce: function(e) {
                    return H(e) ? C(e) : I(e, {})
                },
                getterFor: function(e) {
                    return function(t) {
                        var n;
                        if (!m(t) || (n = C(t)).type !== e)
                            throw TypeError("Incompatible receiver, " + e + " required");
                        return n
                    }
                }
            }
            , te = n((function(e) {
                    var t = ee.get
                        , n = ee.enforce
                        , r = String(String).split("String");
                    (e.exports = function(e, t, o, a) {
                            var u, c = !!a && !!a.unsafe, s = !!a && !!a.enumerable, f = !!a && !!a.noTargetGet;
                            "function" == typeof o && ("string" != typeof t || S(o, "name") || q(o, "name", t),
                            (u = n(o)).source || (u.source = r.join("string" == typeof t ? t : ""))),
                                e !== i ? (c ? !f && e[t] && (s = !0) : delete e[t],
                                    s ? e[t] = o : q(e, t, o)) : s ? e[t] = o : U(t, o)
                        }
                    )(Function.prototype, "toString", (function() {
                            return "function" == typeof this && t(this).source || F(this)
                        }
                    ))
                }
            ))
            , ne = i
            , re = function(e) {
                return "function" == typeof e ? e : void 0
            }
            , oe = function(e, t) {
                return arguments.length < 2 ? re(ne[e]) || re(i[e]) : ne[e] && ne[e][t] || i[e] && i[e][t]
            }
            , ie = Math.ceil
            , ae = Math.floor
            , ue = function(e) {
                return isNaN(e = +e) ? 0 : (e > 0 ? ae : ie)(e)
            }
            , ce = Math.min
            , se = function(e) {
                return e > 0 ? ce(ue(e), 9007199254740991) : 0
            }
            , fe = Math.max
            , le = Math.min
            , he = function(e) {
                return function(t, n, r) {
                    var o, i = g(t), a = se(i.length), u = function(e, t) {
                        var n = ue(e);
                        return n < 0 ? fe(n + t, 0) : le(n, t)
                    }(r, a);
                    if (e && n != n) {
                        for (; a > u; )
                            if ((o = i[u++]) != o)
                                return !0
                    } else
                        for (; a > u; u++)
                            if ((e || u in i) && i[u] === n)
                                return e || u || 0;
                    return !e && -1
                }
            }
            , pe = {
                includes: he(!0),
                indexOf: he(!1)
            }
            , ve = pe.indexOf
            , de = function(e, t) {
                var n, r = g(e), o = 0, i = [];
                for (n in r)
                    !S(z, n) && S(r, n) && i.push(n);
                for (; t.length > o; )
                    S(r, n = t[o++]) && (~ve(i, n) || i.push(n));
                return i
            }
            , ye = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"]
            , ge = ye.concat("length", "prototype")
            , me = {
                f: Object.getOwnPropertyNames || function(e) {
                    return de(e, ge)
                }
            }
            , we = {
                f: Object.getOwnPropertySymbols
            }
            , be = oe("Reflect", "ownKeys") || function(e) {
                var t = me.f(O(e))
                    , n = we.f;
                return n ? t.concat(n(e)) : t
            }
            , Se = function(e, t) {
                for (var n = be(t), r = T.f, o = E.f, i = 0; i < n.length; i++) {
                    var a = n[i];
                    S(e, a) || r(e, a, o(t, a))
                }
            }
            , ke = /#|\.prototype\./
            , Re = function(e, t) {
                var n = Ae[Le(e)];
                return n == Ee || n != je && ("function" == typeof t ? a(t) : !!t)
            }
            , Le = Re.normalize = function(e) {
                return String(e).replace(ke, ".").toLowerCase()
            }
            , Ae = Re.data = {}
            , je = Re.NATIVE = "N"
            , Ee = Re.POLYFILL = "P"
            , Oe = Re
            , Pe = E.f
            , Te = function(e, t) {
                var n, o, a, u, c, s = e.target, f = e.global, l = e.stat;
                if (n = f ? i : l ? i[s] || U(s, {}) : (i[s] || {}).prototype)
                    for (o in t) {
                        if (u = t[o],
                            a = e.noTargetGet ? (c = Pe(n, o)) && c.value : n[o],
                        !Oe(f ? o : s + (l ? "." : "#") + o, e.forced) && void 0 !== a) {
                            if (r(u) === r(a))
                                continue;
                            Se(u, a)
                        }
                        (e.sham || a && a.sham) && q(u, "sham", !0),
                            te(n, o, u, e)
                    }
            }
            , qe = function(e) {
                if ("function" != typeof e)
                    throw TypeError(String(e) + " is not a function");
                return e
            }
            , Ue = function(e, t, n) {
                if (qe(e),
                void 0 === t)
                    return e;
                switch (n) {
                    case 0:
                        return function() {
                            return e.call(t)
                        }
                            ;
                    case 1:
                        return function(n) {
                            return e.call(t, n)
                        }
                            ;
                    case 2:
                        return function(n, r) {
                            return e.call(t, n, r)
                        }
                            ;
                    case 3:
                        return function(n, r, o) {
                            return e.call(t, n, r, o)
                        }
                }
                return function() {
                    return e.apply(t, arguments)
                }
            }
            , xe = function(e) {
                return Object(y(e))
            }
            , Me = Array.isArray || function(e) {
                return "Array" == p(e)
            }
            , Ie = !!Object.getOwnPropertySymbols && !a((function() {
                    return !String(Symbol())
                }
            ))
            , Ce = Ie && !Symbol.sham && "symbol" == r(Symbol.iterator)
            , He = B("wks")
            , Fe = i.Symbol
            , _e = Ce ? Fe : Fe && Fe.withoutSetter || G
            , Ne = function(e) {
                return S(He, e) || (Ie && S(Fe, e) ? He[e] = Fe[e] : He[e] = _e("Symbol." + e)),
                    He[e]
            }
            , Be = Ne("species")
            , De = function(e, t) {
                var n;
                return Me(e) && ("function" != typeof (n = e.constructor) || n !== Array && !Me(n.prototype) ? m(n) && null === (n = n[Be]) && (n = void 0) : n = void 0),
                    new (void 0 === n ? Array : n)(0 === t ? 0 : t)
            }
            , Xe = [].push
            , Ge = function(e) {
                var t = 1 == e
                    , n = 2 == e
                    , r = 3 == e
                    , o = 4 == e
                    , i = 6 == e
                    , a = 7 == e
                    , u = 5 == e || i;
                return function(c, s, f, l) {
                    for (var h, p, v = xe(c), y = d(v), g = Ue(s, f, 3), m = se(y.length), w = 0, b = l || De, S = t ? b(c, m) : n || a ? b(c, 0) : void 0; m > w; w++)
                        if ((u || w in y) && (p = g(h = y[w], w, v),
                            e))
                            if (t)
                                S[w] = p;
                            else if (p)
                                switch (e) {
                                    case 3:
                                        return !0;
                                    case 5:
                                        return h;
                                    case 6:
                                        return w;
                                    case 2:
                                        Xe.call(S, h)
                                }
                            else
                                switch (e) {
                                    case 4:
                                        return !1;
                                    case 7:
                                        Xe.call(S, h)
                                }
                    return i ? -1 : r || o ? o : S
                }
            }
            , Ve = {
                forEach: Ge(0),
                map: Ge(1),
                filter: Ge(2),
                some: Ge(3),
                every: Ge(4),
                find: Ge(5),
                findIndex: Ge(6),
                filterOut: Ge(7)
            }
            , We = function(e, t) {
                var n = [][e];
                return !!n && a((function() {
                        n.call(null, t || function() {
                            throw 1
                        }
                            , 1)
                    }
                ))
            }
            , ze = Object.defineProperty
            , $e = {}
            , Ye = function(e) {
                throw e
            }
            , Je = function(e, t) {
                if (S($e, e))
                    return $e[e];
                t || (t = {});
                var n = [][e]
                    , r = !!S(t, "ACCESSORS") && t.ACCESSORS
                    , o = S(t, 0) ? t[0] : Ye
                    , i = S(t, 1) ? t[1] : void 0;
                return $e[e] = !!n && !a((function() {
                        if (r && !u)
                            return !0;
                        var e = {
                            length: -1
                        };
                        r ? ze(e, 1, {
                            enumerable: !0,
                            get: Ye
                        }) : e[1] = 1,
                            n.call(e, o, i)
                    }
                ))
            }
            , Ke = Ve.forEach
            , Ze = We("forEach")
            , Qe = Je("forEach")
            , et = Ze && Qe ? [].forEach : function(e) {
                return Ke(this, e, arguments.length > 1 ? arguments[1] : void 0)
            }
        ;
        Te({
            target: "Array",
            proto: !0,
            forced: [].forEach != et
        }, {
            forEach: et
        });
        var tt, nt = Object.keys || function(e) {
            return de(e, ye)
        }
            , rt = u ? Object.defineProperties : function(e, t) {
            O(e);
            for (var n, r = nt(t), o = r.length, i = 0; o > i; )
                T.f(e, n = r[i++], t[n]);
            return e
        }
            , ot = oe("document", "documentElement"), it = W("IE_PROTO"), at = function() {}, ut = function(e) {
            return "<script>" + e + "<\/script>"
        }, ct = function() {
            try {
                tt = document.domain && new ActiveXObject("htmlfile")
            } catch (r) {}
            var e, t;
            ct = tt ? function(e) {
                e.write(ut("")),
                    e.close();
                var t = e.parentWindow.Object;
                return e = null,
                    t
            }(tt) : ((t = L("iframe")).style.display = "none",
                ot.appendChild(t),
                t.src = String("javascript:"),
                (e = t.contentWindow.document).open(),
                e.write(ut("document.F=Object")),
                e.close(),
                e.F);
            for (var n = ye.length; n--; )
                delete ct.prototype[ye[n]];
            return ct()
        };
        z[it] = !0;
        var st = Object.create || function(e, t) {
            var n;
            return null !== e ? (at.prototype = O(e),
                n = new at,
                at.prototype = null,
                n[it] = e) : n = ct(),
                void 0 === t ? n : rt(n, t)
        }
            , ft = Ne("unscopables")
            , lt = Array.prototype;
        null == lt[ft] && T.f(lt, ft, {
            configurable: !0,
            value: st(null)
        });
        var ht = function(e) {
            lt[ft][e] = !0
        }
            , pt = pe.includes
            , vt = Je("indexOf", {
            ACCESSORS: !0,
            1: 0
        });
        Te({
            target: "Array",
            proto: !0,
            forced: !vt
        }, {
            includes: function(e) {
                return pt(this, e, arguments.length > 1 ? arguments[1] : void 0)
            }
        }),
            ht("includes");
        var dt, yt, gt = oe("navigator", "userAgent") || "", mt = i.process, wt = mt && mt.versions, bt = wt && wt.v8;
        bt ? yt = (dt = bt.split("."))[0] + dt[1] : gt && (!(dt = gt.match(/Edge\/(\d+)/)) || dt[1] >= 74) && (dt = gt.match(/Chrome\/(\d+)/)) && (yt = dt[1]);
        var St = yt && +yt
            , kt = Ne("species")
            , Rt = Ve.map
            , Lt = function(e) {
            return St >= 51 || !a((function() {
                    var t = [];
                    return (t.constructor = {})[kt] = function() {
                        return {
                            foo: 1
                        }
                    }
                        ,
                    1 !== t[e](Boolean).foo
                }
            ))
        }("map")
            , At = Je("map");
        Te({
            target: "Array",
            proto: !0,
            forced: !Lt || !At
        }, {
            map: function(e) {
                return Rt(this, e, arguments.length > 1 ? arguments[1] : void 0)
            }
        });
        var jt = Ve.some
            , Et = We("some")
            , Ot = Je("some");
        Te({
            target: "Array",
            proto: !0,
            forced: !Et || !Ot
        }, {
            some: function(e) {
                return jt(this, e, arguments.length > 1 ? arguments[1] : void 0)
            }
        });
        var Pt = Object.assign
            , Tt = Object.defineProperty
            , qt = !Pt || a((function() {
                if (u && 1 !== Pt({
                    b: 1
                }, Pt(Tt({}, "a", {
                    enumerable: !0,
                    get: function() {
                        Tt(this, "b", {
                            value: 3,
                            enumerable: !1
                        })
                    }
                }), {
                    b: 2
                })).b)
                    return !0;
                var e = {}
                    , t = {}
                    , n = Symbol();
                return e[n] = 7,
                    "abcdefghijklmnopqrst".split("").forEach((function(e) {
                            t[e] = e
                        }
                    )),
                7 != Pt({}, e)[n] || "abcdefghijklmnopqrst" != nt(Pt({}, t)).join("")
            }
        )) ? function(e, t) {
                for (var n = xe(e), r = arguments.length, o = 1, i = we.f, a = f.f; r > o; )
                    for (var c, s = d(arguments[o++]), l = i ? nt(s).concat(i(s)) : nt(s), h = l.length, p = 0; h > p; )
                        c = l[p++],
                        u && !a.call(s, c) || (n[c] = s[c]);
                return n
            }
            : Pt;
        Te({
            target: "Object",
            stat: !0,
            forced: Object.assign !== qt
        }, {
            assign: qt
        });
        var Ut = {};
        Ut[Ne("toStringTag")] = "z";
        var xt = "[object z]" === String(Ut)
            , Mt = Ne("toStringTag")
            , It = "Arguments" == p(function() {
                return arguments
            }())
            , Ct = xt ? p : function(e) {
                var t, n, r;
                return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = function(e, t) {
                    try {
                        return e[t]
                    } catch (n) {}
                }(t = Object(e), Mt)) ? n : It ? p(t) : "Object" == (r = p(t)) && "function" == typeof t.callee ? "Arguments" : r
            }
            , Ht = xt ? {}.toString : function() {
                return "[object " + Ct(this) + "]"
            }
        ;
        xt || te(Object.prototype, "toString", Ht, {
            unsafe: !0
        });
        var Ft = i.Promise
            , _t = function(e, t, n) {
            for (var r in t)
                te(e, r, t[r], n);
            return e
        }
            , Nt = T.f
            , Bt = Ne("toStringTag")
            , Dt = function(e, t, n) {
            e && !S(e = n ? e : e.prototype, Bt) && Nt(e, Bt, {
                configurable: !0,
                value: t
            })
        }
            , Xt = Ne("species")
            , Gt = function(e, t, n) {
            if (!(e instanceof t))
                throw TypeError("Incorrect " + (n ? n + " " : "") + "invocation");
            return e
        }
            , Vt = {}
            , Wt = Ne("iterator")
            , zt = Array.prototype
            , $t = function(e) {
            return void 0 !== e && (Vt.Array === e || zt[Wt] === e)
        }
            , Yt = Ne("iterator")
            , Jt = function(e) {
            if (null != e)
                return e[Yt] || e["@@iterator"] || Vt[Ct(e)]
        }
            , Kt = function(e) {
            var t = e.return;
            if (void 0 !== t)
                return O(t.call(e)).value
        }
            , Zt = function(e, t) {
            this.stopped = e,
                this.result = t
        }
            , Qt = function(e, t, n) {
            var o, i, a, u, c, s, f, l = n && n.that, h = !(!n || !n.AS_ENTRIES), p = !(!n || !n.IS_ITERATOR), v = !(!n || !n.INTERRUPTED), d = Ue(t, l, 1 + h + v), y = function(e) {
                return o && Kt(o),
                    new Zt(!0,e)
            }, g = function(e) {
                return h ? (O(e),
                    v ? d(e[0], e[1], y) : d(e[0], e[1])) : v ? d(e, y) : d(e)
            };
            if (p)
                o = e;
            else {
                if ("function" != typeof (i = Jt(e)))
                    throw TypeError("Target is not iterable");
                if ($t(i)) {
                    for (a = 0,
                             u = se(e.length); u > a; a++)
                        if ((c = g(e[a])) && c instanceof Zt)
                            return c;
                    return new Zt(!1)
                }
                o = i.call(e)
            }
            for (s = o.next; !(f = s.call(o)).done; ) {
                try {
                    c = g(f.value)
                } catch (m) {
                    throw Kt(o),
                        m
                }
                if ("object" == r(c) && c && c instanceof Zt)
                    return c
            }
            return new Zt(!1)
        }
            , en = Ne("iterator")
            , tn = !1;
        try {
            var nn = 0
                , rn = {
                next: function() {
                    return {
                        done: !!nn++
                    }
                },
                return: function() {
                    tn = !0
                }
            };
            rn[en] = function() {
                return this
            }
                ,
                Array.from(rn, (function() {
                        throw 2
                    }
                ))
        } catch (wa) {
        }
        var on, an, un, cn = Ne("species"), sn = function(e, t) {
            var n, r = O(e).constructor;
            return void 0 === r || null == (n = O(r)[cn]) ? t : qe(n)
        }, fn = /(iphone|ipod|ipad).*applewebkit/i.test(gt), ln = "process" == p(i.process), hn = i.location, pn = i.setImmediate, vn = i.clearImmediate, dn = i.process, yn = i.MessageChannel, gn = i.Dispatch, mn = 0, wn = {}, bn = function(e) {
            if (wn.hasOwnProperty(e)) {
                var t = wn[e];
                delete wn[e],
                    t()
            }
        }, Sn = function(e) {
            return function() {
                bn(e)
            }
        }, kn = function(e) {
            bn(e.data)
        }, Rn = function(e) {
            i.postMessage(e + "", hn.protocol + "//" + hn.host)
        };
        pn && vn || (pn = function(e) {
                for (var t = [], n = 1; arguments.length > n; )
                    t.push(arguments[n++]);
                return wn[++mn] = function() {
                    ("function" == typeof e ? e : Function(e)).apply(void 0, t)
                }
                    ,
                    on(mn),
                    mn
            }
                ,
                vn = function(e) {
                    delete wn[e]
                }
                ,
                ln ? on = function(e) {
                        dn.nextTick(Sn(e))
                    }
                    : gn && gn.now ? on = function(e) {
                        gn.now(Sn(e))
                    }
                    : yn && !fn ? (un = (an = new yn).port2,
                        an.port1.onmessage = kn,
                        on = Ue(un.postMessage, un, 1)) : i.addEventListener && "function" == typeof postMessage && !i.importScripts && hn && "file:" !== hn.protocol && !a(Rn) ? (on = Rn,
                        i.addEventListener("message", kn, !1)) : on = "onreadystatechange"in L("script") ? function(e) {
                            ot.appendChild(L("script")).onreadystatechange = function() {
                                ot.removeChild(this),
                                    bn(e)
                            }
                        }
                        : function(e) {
                            setTimeout(Sn(e), 0)
                        }
        );
        var Ln, An, jn, En, On, Pn, Tn, qn, Un = {
            set: pn,
            clear: vn
        }, xn = /web0s(?!.*chrome)/i.test(gt), Mn = E.f, In = Un.set, Cn = i.MutationObserver || i.WebKitMutationObserver, Hn = i.document, Fn = i.process, _n = i.Promise, Nn = Mn(i, "queueMicrotask"), Bn = Nn && Nn.value;
        Bn || (Ln = function() {
            var e, t;
            for (ln && (e = Fn.domain) && e.exit(); An; ) {
                t = An.fn,
                    An = An.next;
                try {
                    t()
                } catch (wa) {
                    throw An ? En() : jn = void 0,
                        wa
                }
            }
            jn = void 0,
            e && e.enter()
        }
            ,
            fn || ln || xn || !Cn || !Hn ? _n && _n.resolve ? (Tn = _n.resolve(void 0),
                        qn = Tn.then,
                        En = function() {
                            qn.call(Tn, Ln)
                        }
                ) : En = ln ? function() {
                    Fn.nextTick(Ln)
                }
                : function() {
                    In.call(i, Ln)
                }
                : (On = !0,
                        Pn = Hn.createTextNode(""),
                        new Cn(Ln).observe(Pn, {
                            characterData: !0
                        }),
                        En = function() {
                            Pn.data = On = !On
                        }
                ));
        var Dn, Xn, Gn, Vn, Wn = Bn || function(e) {
            var t = {
                fn: e,
                next: void 0
            };
            jn && (jn.next = t),
            An || (An = t,
                En()),
                jn = t
        }
            , zn = function(e) {
            var t, n;
            this.promise = new e((function(e, r) {
                    if (void 0 !== t || void 0 !== n)
                        throw TypeError("Bad Promise constructor");
                    t = e,
                        n = r
                }
            )),
                this.resolve = qe(t),
                this.reject = qe(n)
        }, $n = {
            f: function(e) {
                return new zn(e)
            }
        }, Yn = function(e, t) {
            if (O(e),
            m(t) && t.constructor === e)
                return t;
            var n = $n.f(e);
            return (0,
                n.resolve)(t),
                n.promise
        }, Jn = function(e) {
            try {
                return {
                    error: !1,
                    value: e()
                }
            } catch (wa) {
                return {
                    error: !0,
                    value: wa
                }
            }
        }, Kn = Un.set, Zn = Ne("species"), Qn = "Promise", er = ee.get, tr = ee.set, nr = ee.getterFor(Qn), rr = Ft, or = i.TypeError, ir = i.document, ar = i.process, ur = oe("fetch"), cr = $n.f, sr = cr, fr = !!(ir && ir.createEvent && i.dispatchEvent), lr = "function" == typeof PromiseRejectionEvent, hr = Oe(Qn, (function() {
                if (!(F(rr) !== String(rr))) {
                    if (66 === St)
                        return !0;
                    if (!ln && !lr)
                        return !0
                }
                if (St >= 51 && /native code/.test(rr))
                    return !1;
                var e = rr.resolve(1)
                    , t = function(e) {
                    e((function() {}
                    ), (function() {}
                    ))
                };
                return (e.constructor = {})[Zn] = t,
                    !(e.then((function() {}
                    ))instanceof t)
            }
        )), pr = hr || !function(e, t) {
            if (!t && !tn)
                return !1;
            var n = !1;
            try {
                var r = {};
                r[en] = function() {
                    return {
                        next: function() {
                            return {
                                done: n = !0
                            }
                        }
                    }
                }
                    ,
                    e(r)
            } catch (wa) {}
            return n
        }((function(e) {
                rr.all(e).catch((function() {}
                ))
            }
        )), vr = function(e) {
            var t;
            return !(!m(e) || "function" != typeof (t = e.then)) && t
        }, dr = function(e, t) {
            if (!e.notified) {
                e.notified = !0;
                var n = e.reactions;
                Wn((function() {
                        for (var r = e.value, o = 1 == e.state, i = 0; n.length > i; ) {
                            var a, u, c, s = n[i++], f = o ? s.ok : s.fail, l = s.resolve, h = s.reject, p = s.domain;
                            try {
                                f ? (o || (2 === e.rejection && wr(e),
                                    e.rejection = 1),
                                    !0 === f ? a = r : (p && p.enter(),
                                        a = f(r),
                                    p && (p.exit(),
                                        c = !0)),
                                    a === s.promise ? h(or("Promise-chain cycle")) : (u = vr(a)) ? u.call(a, l, h) : l(a)) : h(r)
                            } catch (wa) {
                                p && !c && p.exit(),
                                    h(wa)
                            }
                        }
                        e.reactions = [],
                            e.notified = !1,
                        t && !e.rejection && gr(e)
                    }
                ))
            }
        }, yr = function(e, t, n) {
            var r, o;
            fr ? ((r = ir.createEvent("Event")).promise = t,
                r.reason = n,
                r.initEvent(e, !1, !0),
                i.dispatchEvent(r)) : r = {
                promise: t,
                reason: n
            },
                !lr && (o = i["on" + e]) ? o(r) : "unhandledrejection" === e && function(e, t) {
                    var n = i.console;
                    n && n.error && (1 === arguments.length ? n.error(e) : n.error(e, t))
                }("Unhandled promise rejection", n)
        }, gr = function(e) {
            Kn.call(i, (function() {
                    var t, n = e.facade, r = e.value;
                    if (mr(e) && (t = Jn((function() {
                            ln ? ar.emit("unhandledRejection", r, n) : yr("unhandledrejection", n, r)
                        }
                    )),
                        e.rejection = ln || mr(e) ? 2 : 1,
                        t.error))
                        throw t.value
                }
            ))
        }, mr = function(e) {
            return 1 !== e.rejection && !e.parent
        }, wr = function(e) {
            Kn.call(i, (function() {
                    var t = e.facade;
                    ln ? ar.emit("rejectionHandled", t) : yr("rejectionhandled", t, e.value)
                }
            ))
        }, br = function(e, t, n) {
            return function(r) {
                e(t, r, n)
            }
        }, Sr = function(e, t, n) {
            e.done || (e.done = !0,
            n && (e = n),
                e.value = t,
                e.state = 2,
                dr(e, !0))
        }, kr = function e(t, n, r) {
            if (!t.done) {
                t.done = !0,
                r && (t = r);
                try {
                    if (t.facade === n)
                        throw or("Promise can't be resolved itself");
                    var o = vr(n);
                    o ? Wn((function() {
                            var r = {
                                done: !1
                            };
                            try {
                                o.call(n, br(e, r, t), br(Sr, r, t))
                            } catch (wa) {
                                Sr(r, wa, t)
                            }
                        }
                    )) : (t.value = n,
                        t.state = 1,
                        dr(t, !1))
                } catch (wa) {
                    Sr({
                        done: !1
                    }, wa, t)
                }
            }
        };
        hr && (rr = function(e) {
            Gt(this, rr, Qn),
                qe(e),
                Dn.call(this);
            var t = er(this);
            try {
                e(br(kr, t), br(Sr, t))
            } catch (wa) {
                Sr(t, wa)
            }
        }
            ,
            (Dn = function(e) {
                    tr(this, {
                        type: Qn,
                        done: !1,
                        notified: !1,
                        parent: !1,
                        reactions: [],
                        rejection: !1,
                        state: 0,
                        value: void 0
                    })
                }
            ).prototype = _t(rr.prototype, {
                then: function(e, t) {
                    var n = nr(this)
                        , r = cr(sn(this, rr));
                    return r.ok = "function" != typeof e || e,
                        r.fail = "function" == typeof t && t,
                        r.domain = ln ? ar.domain : void 0,
                        n.parent = !0,
                        n.reactions.push(r),
                    0 != n.state && dr(n, !1),
                        r.promise
                },
                catch: function(e) {
                    return this.then(void 0, e)
                }
            }),
            Xn = function() {
                var e = new Dn
                    , t = er(e);
                this.promise = e,
                    this.resolve = br(kr, t),
                    this.reject = br(Sr, t)
            }
            ,
            $n.f = cr = function(e) {
                return e === rr || e === Gn ? new Xn(e) : sr(e)
            }
            ,
        "function" == typeof Ft && (Vn = Ft.prototype.then,
            te(Ft.prototype, "then", (function(e, t) {
                    var n = this;
                    return new rr((function(e, t) {
                            Vn.call(n, e, t)
                        }
                    )).then(e, t)
                }
            ), {
                unsafe: !0
            }),
        "function" == typeof ur && Te({
            global: !0,
            enumerable: !0,
            forced: !0
        }, {
            fetch: function(e) {
                return Yn(rr, ur.apply(i, arguments))
            }
        }))),
            Te({
                global: !0,
                wrap: !0,
                forced: hr
            }, {
                Promise: rr
            }),
            Dt(rr, Qn, !1),
            function(e) {
                var t = oe(e)
                    , n = T.f;
                u && t && !t[Xt] && n(t, Xt, {
                    configurable: !0,
                    get: function() {
                        return this
                    }
                })
            }(Qn),
            Gn = oe(Qn),
            Te({
                target: Qn,
                stat: !0,
                forced: hr
            }, {
                reject: function(e) {
                    var t = cr(this);
                    return t.reject.call(void 0, e),
                        t.promise
                }
            }),
            Te({
                target: Qn,
                stat: !0,
                forced: hr
            }, {
                resolve: function(e) {
                    return Yn(this, e)
                }
            }),
            Te({
                target: Qn,
                stat: !0,
                forced: pr
            }, {
                all: function(e) {
                    var t = this
                        , n = cr(t)
                        , r = n.resolve
                        , o = n.reject
                        , i = Jn((function() {
                            var n = qe(t.resolve)
                                , i = []
                                , a = 0
                                , u = 1;
                            Qt(e, (function(e) {
                                    var c = a++
                                        , s = !1;
                                    i.push(void 0),
                                        u++,
                                        n.call(t, e).then((function(e) {
                                                s || (s = !0,
                                                    i[c] = e,
                                                --u || r(i))
                                            }
                                        ), o)
                                }
                            )),
                            --u || r(i)
                        }
                    ));
                    return i.error && o(i.value),
                        n.promise
                },
                race: function(e) {
                    var t = this
                        , n = cr(t)
                        , r = n.reject
                        , o = Jn((function() {
                            var o = qe(t.resolve);
                            Qt(e, (function(e) {
                                    o.call(t, e).then(n.resolve, r)
                                }
                            ))
                        }
                    ));
                    return o.error && r(o.value),
                        n.promise
                }
            });
        var Rr = !!Ft && a((function() {
                Ft.prototype.finally.call({
                    then: function() {}
                }, (function() {}
                ))
            }
        ));
        Te({
            target: "Promise",
            proto: !0,
            real: !0,
            forced: Rr
        }, {
            finally: function(e) {
                var t = sn(this, oe("Promise"))
                    , n = "function" == typeof e;
                return this.then(n ? function(n) {
                        return Yn(t, e()).then((function() {
                                return n
                            }
                        ))
                    }
                    : e, n ? function(n) {
                        return Yn(t, e()).then((function() {
                                throw n
                            }
                        ))
                    }
                    : e)
            }
        }),
        "function" != typeof Ft || Ft.prototype.finally || te(Ft.prototype, "finally", oe("Promise").prototype.finally);
        var Lr, Ar, jr, Er = function(e) {
            return function(t, n) {
                var r, o, i = String(y(t)), a = ue(n), u = i.length;
                return a < 0 || a >= u ? e ? "" : void 0 : (r = i.charCodeAt(a)) < 55296 || r > 56319 || a + 1 === u || (o = i.charCodeAt(a + 1)) < 56320 || o > 57343 ? e ? i.charAt(a) : r : e ? i.slice(a, a + 2) : o - 56320 + (r - 55296 << 10) + 65536
            }
        }, Or = {
            codeAt: Er(!1),
            charAt: Er(!0)
        }, Pr = !a((function() {
                function e() {}
                return e.prototype.constructor = null,
                Object.getPrototypeOf(new e) !== e.prototype
            }
        )), Tr = W("IE_PROTO"), qr = Object.prototype, Ur = Pr ? Object.getPrototypeOf : function(e) {
            return e = xe(e),
                S(e, Tr) ? e[Tr] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? qr : null
        }
            , xr = Ne("iterator"), Mr = !1;
        [].keys && ("next"in (jr = [].keys()) ? (Ar = Ur(Ur(jr))) !== Object.prototype && (Lr = Ar) : Mr = !0),
        null == Lr && (Lr = {}),
        S(Lr, xr) || q(Lr, xr, (function() {
                return this
            }
        ));
        var Ir = {
            IteratorPrototype: Lr,
            BUGGY_SAFARI_ITERATORS: Mr
        }
            , Cr = Ir.IteratorPrototype
            , Hr = function() {
            return this
        }
            , Fr = function(e, t, n) {
            var r = t + " Iterator";
            return e.prototype = st(Cr, {
                next: l(1, n)
            }),
                Dt(e, r, !1),
                Vt[r] = Hr,
                e
        }
            , _r = Object.setPrototypeOf || ("__proto__"in {} ? function() {
            var e, t = !1, n = {};
            try {
                (e = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(n, []),
                    t = n instanceof Array
            } catch (wa) {}
            return function(n, r) {
                return O(n),
                    function(e) {
                        if (!m(e) && null !== e)
                            throw TypeError("Can't set " + String(e) + " as a prototype")
                    }(r),
                    t ? e.call(n, r) : n.__proto__ = r,
                    n
            }
        }() : void 0)
            , Nr = Ir.IteratorPrototype
            , Br = Ir.BUGGY_SAFARI_ITERATORS
            , Dr = Ne("iterator")
            , Xr = function() {
            return this
        }
            , Gr = function(e, t, n, r, o, i, a) {
            Fr(n, t, r);
            var u, c, s, f = function(e) {
                if (e === o && d)
                    return d;
                if (!Br && e in p)
                    return p[e];
                switch (e) {
                    case "keys":
                    case "values":
                    case "entries":
                        return function() {
                            return new n(this,e)
                        }
                }
                return function() {
                    return new n(this)
                }
            }, l = t + " Iterator", h = !1, p = e.prototype, v = p[Dr] || p["@@iterator"] || o && p[o], d = !Br && v || f(o), y = "Array" == t && p.entries || v;
            if (y && (u = Ur(y.call(new e)),
            Nr !== Object.prototype && u.next && (Ur(u) !== Nr && (_r ? _r(u, Nr) : "function" != typeof u[Dr] && q(u, Dr, Xr)),
                Dt(u, l, !0))),
            "values" == o && v && "values" !== v.name && (h = !0,
                    d = function() {
                        return v.call(this)
                    }
            ),
            p[Dr] !== d && q(p, Dr, d),
                Vt[t] = d,
                o)
                if (c = {
                    values: f("values"),
                    keys: i ? d : f("keys"),
                    entries: f("entries")
                },
                    a)
                    for (s in c)
                        (Br || h || !(s in p)) && te(p, s, c[s]);
                else
                    Te({
                        target: t,
                        proto: !0,
                        forced: Br || h
                    }, c);
            return c
        }
            , Vr = Or.charAt
            , Wr = ee.set
            , zr = ee.getterFor("String Iterator");
        Gr(String, "String", (function(e) {
                Wr(this, {
                    type: "String Iterator",
                    string: String(e),
                    index: 0
                })
            }
        ), (function() {
                var e, t = zr(this), n = t.string, r = t.index;
                return r >= n.length ? {
                    value: void 0,
                    done: !0
                } : (e = Vr(n, r),
                    t.index += e.length,
                    {
                        value: e,
                        done: !1
                    })
            }
        ));
        var $r = function(e, t) {
            var n = this;
            if (!(n instanceof $r))
                return new $r(e,t);
            _r && (n = _r(new Error(void 0), Ur(n))),
            void 0 !== t && q(n, "message", String(t));
            var r = [];
            return Qt(e, r.push, {
                that: r
            }),
                q(n, "errors", r),
                n
        };
        $r.prototype = st(Error.prototype, {
            constructor: l(5, $r),
            message: l(5, ""),
            name: l(5, "AggregateError")
        }),
            Te({
                global: !0
            }, {
                AggregateError: $r
            }),
            Te({
                target: "Promise",
                stat: !0
            }, {
                allSettled: function(e) {
                    var t = this
                        , n = $n.f(t)
                        , r = n.resolve
                        , o = n.reject
                        , i = Jn((function() {
                            var n = qe(t.resolve)
                                , o = []
                                , i = 0
                                , a = 1;
                            Qt(e, (function(e) {
                                    var u = i++
                                        , c = !1;
                                    o.push(void 0),
                                        a++,
                                        n.call(t, e).then((function(e) {
                                                c || (c = !0,
                                                    o[u] = {
                                                        status: "fulfilled",
                                                        value: e
                                                    },
                                                --a || r(o))
                                            }
                                        ), (function(e) {
                                                c || (c = !0,
                                                    o[u] = {
                                                        status: "rejected",
                                                        reason: e
                                                    },
                                                --a || r(o))
                                            }
                                        ))
                                }
                            )),
                            --a || r(o)
                        }
                    ));
                    return i.error && o(i.value),
                        n.promise
                }
            });
        Te({
            target: "Promise",
            stat: !0
        }, {
            any: function(e) {
                var t = this
                    , n = $n.f(t)
                    , r = n.resolve
                    , o = n.reject
                    , i = Jn((function() {
                        var n = qe(t.resolve)
                            , i = []
                            , a = 0
                            , u = 1
                            , c = !1;
                        Qt(e, (function(e) {
                                var s = a++
                                    , f = !1;
                                i.push(void 0),
                                    u++,
                                    n.call(t, e).then((function(e) {
                                            f || c || (c = !0,
                                                r(e))
                                        }
                                    ), (function(e) {
                                            f || c || (f = !0,
                                                i[s] = e,
                                            --u || o(new (oe("AggregateError"))(i,"No one promise resolved")))
                                        }
                                    ))
                            }
                        )),
                        --u || o(new (oe("AggregateError"))(i,"No one promise resolved"))
                    }
                ));
                return i.error && o(i.value),
                    n.promise
            }
        }),
            Te({
                target: "Promise",
                stat: !0
            }, {
                try: function(e) {
                    var t = $n.f(this)
                        , n = Jn(e);
                    return (n.error ? t.reject : t.resolve)(n.value),
                        t.promise
                }
            });
        var Yr = {
            CSSRuleList: 0,
            CSSStyleDeclaration: 0,
            CSSValueList: 0,
            ClientRectList: 0,
            DOMRectList: 0,
            DOMStringList: 0,
            DOMTokenList: 1,
            DataTransferItemList: 0,
            FileList: 0,
            HTMLAllCollection: 0,
            HTMLCollection: 0,
            HTMLFormElement: 0,
            HTMLSelectElement: 0,
            MediaList: 0,
            MimeTypeArray: 0,
            NamedNodeMap: 0,
            NodeList: 1,
            PaintRequestList: 0,
            Plugin: 0,
            PluginArray: 0,
            SVGLengthList: 0,
            SVGNumberList: 0,
            SVGPathSegList: 0,
            SVGPointList: 0,
            SVGStringList: 0,
            SVGTransformList: 0,
            SourceBufferList: 0,
            StyleSheetList: 0,
            TextTrackCueList: 0,
            TextTrackList: 0,
            TouchList: 0
        }
            , Jr = ee.set
            , Kr = ee.getterFor("Array Iterator")
            , Zr = Gr(Array, "Array", (function(e, t) {
                Jr(this, {
                    type: "Array Iterator",
                    target: g(e),
                    index: 0,
                    kind: t
                })
            }
        ), (function() {
                var e = Kr(this)
                    , t = e.target
                    , n = e.kind
                    , r = e.index++;
                return !t || r >= t.length ? (e.target = void 0,
                    {
                        value: void 0,
                        done: !0
                    }) : "keys" == n ? {
                    value: r,
                    done: !1
                } : "values" == n ? {
                    value: t[r],
                    done: !1
                } : {
                    value: [r, t[r]],
                    done: !1
                }
            }
        ), "values");
        Vt.Arguments = Vt.Array,
            ht("keys"),
            ht("values"),
            ht("entries");
        var Qr = Ne("iterator")
            , eo = Ne("toStringTag")
            , to = Zr.values;
        for (var no in Yr) {
            var ro = i[no]
                , oo = ro && ro.prototype;
            if (oo) {
                if (oo[Qr] !== to)
                    try {
                        q(oo, Qr, to)
                    } catch (wa) {
                        oo[Qr] = to
                    }
                if (oo[eo] || q(oo, eo, no),
                    Yr[no])
                    for (var io in Zr)
                        if (oo[io] !== Zr[io])
                            try {
                                q(oo, io, Zr[io])
                            } catch (wa) {
                                oo[io] = Zr[io]
                            }
            }
        }
        var ao = Ne("iterator")
            , uo = !a((function() {
                var e = new URL("b?a=1&b=2&c=3","http://a")
                    , t = e.searchParams
                    , n = "";
                return e.pathname = "c%20d",
                    t.forEach((function(e, r) {
                            t.delete("b"),
                                n += r + e
                        }
                    )),
                !t.sort || "http://a/c%20d?a=1&c=3" !== e.href || "3" !== t.get("c") || "a=1" !== String(new URLSearchParams("?a=1")) || !t[ao] || "a" !== new URL("https://a@b").username || "b" !== new URLSearchParams(new URLSearchParams("a=b")).get("a") || "xn--e1aybc" !== new URL("http://тест").host || "#%D0%B1" !== new URL("http://a#б").hash || "a1c3" !== n || "x" !== new URL("http://x",void 0).host
            }
        ))
            , co = function(e, t, n, r) {
            try {
                return r ? t(O(n)[0], n[1]) : t(n)
            } catch (wa) {
                throw Kt(e),
                    wa
            }
        }
            , so = function(e, t, n) {
            var r = w(t);
            r in e ? T.f(e, r, l(0, n)) : e[r] = n
        }
            , fo = function(e) {
            var t, n, r, o, i, a, u = xe(e), c = "function" == typeof this ? this : Array, s = arguments.length, f = s > 1 ? arguments[1] : void 0, l = void 0 !== f, h = Jt(u), p = 0;
            if (l && (f = Ue(f, s > 2 ? arguments[2] : void 0, 2)),
            null == h || c == Array && $t(h))
                for (n = new c(t = se(u.length)); t > p; p++)
                    a = l ? f(u[p], p) : u[p],
                        so(n, p, a);
            else
                for (i = (o = h.call(u)).next,
                         n = new c; !(r = i.call(o)).done; p++)
                    a = l ? co(o, f, [r.value, p], !0) : r.value,
                        so(n, p, a);
            return n.length = p,
                n
        }
            , lo = /[^\0-\u007E]/
            , ho = /[.\u3002\uFF0E\uFF61]/g
            , po = "Overflow: input needs wider integers to process"
            , vo = Math.floor
            , yo = String.fromCharCode
            , go = function(e) {
            return e + 22 + 75 * (e < 26)
        }
            , mo = function(e, t, n) {
            var r = 0;
            for (e = n ? vo(e / 700) : e >> 1,
                     e += vo(e / t); e > 455; r += 36)
                e = vo(e / 35);
            return vo(r + 36 * e / (e + 38))
        }
            , wo = function(e) {
            var t, n, r = [], o = (e = function(e) {
                for (var t = [], n = 0, r = e.length; n < r; ) {
                    var o = e.charCodeAt(n++);
                    if (o >= 55296 && o <= 56319 && n < r) {
                        var i = e.charCodeAt(n++);
                        56320 == (64512 & i) ? t.push(((1023 & o) << 10) + (1023 & i) + 65536) : (t.push(o),
                            n--)
                    } else
                        t.push(o)
                }
                return t
            }(e)).length, i = 128, a = 0, u = 72;
            for (t = 0; t < e.length; t++)
                (n = e[t]) < 128 && r.push(yo(n));
            var c = r.length
                , s = c;
            for (c && r.push("-"); s < o; ) {
                var f = 2147483647;
                for (t = 0; t < e.length; t++)
                    (n = e[t]) >= i && n < f && (f = n);
                var l = s + 1;
                if (f - i > vo((2147483647 - a) / l))
                    throw RangeError(po);
                for (a += (f - i) * l,
                         i = f,
                         t = 0; t < e.length; t++) {
                    if ((n = e[t]) < i && ++a > 2147483647)
                        throw RangeError(po);
                    if (n == i) {
                        for (var h = a, p = 36; ; p += 36) {
                            var v = p <= u ? 1 : p >= u + 26 ? 26 : p - u;
                            if (h < v)
                                break;
                            var d = h - v
                                , y = 36 - v;
                            r.push(yo(go(v + d % y))),
                                h = vo(d / y)
                        }
                        r.push(yo(go(h))),
                            u = mo(a, l, s == c),
                            a = 0,
                            ++s
                    }
                }
                ++a,
                    ++i
            }
            return r.join("")
        }
            , bo = function(e) {
            var t = Jt(e);
            if ("function" != typeof t)
                throw TypeError(String(e) + " is not iterable");
            return O(t.call(e))
        }
            , So = oe("fetch")
            , ko = oe("Headers")
            , Ro = Ne("iterator")
            , Lo = ee.set
            , Ao = ee.getterFor("URLSearchParams")
            , jo = ee.getterFor("URLSearchParamsIterator")
            , Eo = /\+/g
            , Oo = Array(4)
            , Po = function(e) {
            return Oo[e - 1] || (Oo[e - 1] = RegExp("((?:%[\\da-f]{2}){" + e + "})", "gi"))
        }
            , To = function(e) {
            try {
                return decodeURIComponent(e)
            } catch (wa) {
                return e
            }
        }
            , qo = function(e) {
            var t = e.replace(Eo, " ")
                , n = 4;
            try {
                return decodeURIComponent(t)
            } catch (wa) {
                for (; n; )
                    t = t.replace(Po(n--), To);
                return t
            }
        }
            , Uo = /[!'()~]|%20/g
            , xo = {
            "!": "%21",
            "'": "%27",
            "(": "%28",
            ")": "%29",
            "~": "%7E",
            "%20": "+"
        }
            , Mo = function(e) {
            return xo[e]
        }
            , Io = function(e) {
            return encodeURIComponent(e).replace(Uo, Mo)
        }
            , Co = function(e, t) {
            if (t)
                for (var n, r, o = t.split("&"), i = 0; i < o.length; )
                    (n = o[i++]).length && (r = n.split("="),
                        e.push({
                            key: qo(r.shift()),
                            value: qo(r.join("="))
                        }))
        }
            , Ho = function(e) {
            this.entries.length = 0,
                Co(this.entries, e)
        }
            , Fo = function(e, t) {
            if (e < t)
                throw TypeError("Not enough arguments")
        }
            , _o = Fr((function(e, t) {
                Lo(this, {
                    type: "URLSearchParamsIterator",
                    iterator: bo(Ao(e).entries),
                    kind: t
                })
            }
        ), "Iterator", (function() {
                var e = jo(this)
                    , t = e.kind
                    , n = e.iterator.next()
                    , r = n.value;
                return n.done || (n.value = "keys" === t ? r.key : "values" === t ? r.value : [r.key, r.value]),
                    n
            }
        ))
            , No = function() {
            Gt(this, No, "URLSearchParams");
            var e, t, n, r, o, i, a, u, c, s = arguments.length > 0 ? arguments[0] : void 0, f = this, l = [];
            if (Lo(f, {
                type: "URLSearchParams",
                entries: l,
                updateURL: function() {},
                updateSearchParams: Ho
            }),
            void 0 !== s)
                if (m(s))
                    if ("function" == typeof (e = Jt(s)))
                        for (n = (t = e.call(s)).next; !(r = n.call(t)).done; ) {
                            if ((a = (i = (o = bo(O(r.value))).next).call(o)).done || (u = i.call(o)).done || !i.call(o).done)
                                throw TypeError("Expected sequence with length 2");
                            l.push({
                                key: a.value + "",
                                value: u.value + ""
                            })
                        }
                    else
                        for (c in s)
                            S(s, c) && l.push({
                                key: c,
                                value: s[c] + ""
                            });
                else
                    Co(l, "string" == typeof s ? "?" === s.charAt(0) ? s.slice(1) : s : s + "")
        }
            , Bo = No.prototype;
        _t(Bo, {
            append: function(e, t) {
                Fo(arguments.length, 2);
                var n = Ao(this);
                n.entries.push({
                    key: e + "",
                    value: t + ""
                }),
                    n.updateURL()
            },
            delete: function(e) {
                Fo(arguments.length, 1);
                for (var t = Ao(this), n = t.entries, r = e + "", o = 0; o < n.length; )
                    n[o].key === r ? n.splice(o, 1) : o++;
                t.updateURL()
            },
            get: function(e) {
                Fo(arguments.length, 1);
                for (var t = Ao(this).entries, n = e + "", r = 0; r < t.length; r++)
                    if (t[r].key === n)
                        return t[r].value;
                return null
            },
            getAll: function(e) {
                Fo(arguments.length, 1);
                for (var t = Ao(this).entries, n = e + "", r = [], o = 0; o < t.length; o++)
                    t[o].key === n && r.push(t[o].value);
                return r
            },
            has: function(e) {
                Fo(arguments.length, 1);
                for (var t = Ao(this).entries, n = e + "", r = 0; r < t.length; )
                    if (t[r++].key === n)
                        return !0;
                return !1
            },
            set: function(e, t) {
                Fo(arguments.length, 1);
                for (var n, r = Ao(this), o = r.entries, i = !1, a = e + "", u = t + "", c = 0; c < o.length; c++)
                    (n = o[c]).key === a && (i ? o.splice(c--, 1) : (i = !0,
                        n.value = u));
                i || o.push({
                    key: a,
                    value: u
                }),
                    r.updateURL()
            },
            sort: function() {
                var e, t, n, r = Ao(this), o = r.entries, i = o.slice();
                for (o.length = 0,
                         n = 0; n < i.length; n++) {
                    for (e = i[n],
                             t = 0; t < n; t++)
                        if (o[t].key > e.key) {
                            o.splice(t, 0, e);
                            break
                        }
                    t === n && o.push(e)
                }
                r.updateURL()
            },
            forEach: function(e) {
                for (var t, n = Ao(this).entries, r = Ue(e, arguments.length > 1 ? arguments[1] : void 0, 3), o = 0; o < n.length; )
                    r((t = n[o++]).value, t.key, this)
            },
            keys: function() {
                return new _o(this,"keys")
            },
            values: function() {
                return new _o(this,"values")
            },
            entries: function() {
                return new _o(this,"entries")
            }
        }, {
            enumerable: !0
        }),
            te(Bo, Ro, Bo.entries),
            te(Bo, "toString", (function() {
                    for (var e, t = Ao(this).entries, n = [], r = 0; r < t.length; )
                        e = t[r++],
                            n.push(Io(e.key) + "=" + Io(e.value));
                    return n.join("&")
                }
            ), {
                enumerable: !0
            }),
            Dt(No, "URLSearchParams"),
            Te({
                global: !0,
                forced: !uo
            }, {
                URLSearchParams: No
            }),
        uo || "function" != typeof So || "function" != typeof ko || Te({
            global: !0,
            enumerable: !0,
            forced: !0
        }, {
            fetch: function(e) {
                var t, n, r, o = [e];
                return arguments.length > 1 && (m(t = arguments[1]) && (n = t.body,
                "URLSearchParams" === Ct(n) && ((r = t.headers ? new ko(t.headers) : new ko).has("content-type") || r.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"),
                    t = st(t, {
                        body: l(0, String(n)),
                        headers: l(0, r)
                    }))),
                    o.push(t)),
                    So.apply(this, o)
            }
        });
        var Do, Xo = {
            URLSearchParams: No,
            getState: Ao
        }, Go = Or.codeAt, Vo = i.URL, Wo = Xo.URLSearchParams, zo = Xo.getState, $o = ee.set, Yo = ee.getterFor("URL"), Jo = Math.floor, Ko = Math.pow, Zo = /[A-Za-z]/, Qo = /[\d+-.A-Za-z]/, ei = /\d/, ti = /^(0x|0X)/, ni = /^[0-7]+$/, ri = /^\d+$/, oi = /^[\dA-Fa-f]+$/, ii = /[\u0000\u0009\u000A\u000D #%/:?@[\\]]/, ai = /[\u0000\u0009\u000A\u000D #/:?@[\\]]/, ui = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g, ci = /[\u0009\u000A\u000D]/g, si = function(e, t) {
            var n, r, o;
            if ("[" == t.charAt(0)) {
                if ("]" != t.charAt(t.length - 1))
                    return "Invalid host";
                if (!(n = li(t.slice(1, -1))))
                    return "Invalid host";
                e.host = n
            } else if (wi(e)) {
                if (t = function(e) {
                    var t, n, r = [], o = e.toLowerCase().replace(ho, ".").split(".");
                    for (t = 0; t < o.length; t++)
                        n = o[t],
                            r.push(lo.test(n) ? "xn--" + wo(n) : n);
                    return r.join(".")
                }(t),
                    ii.test(t))
                    return "Invalid host";
                if (null === (n = fi(t)))
                    return "Invalid host";
                e.host = n
            } else {
                if (ai.test(t))
                    return "Invalid host";
                for (n = "",
                         r = fo(t),
                         o = 0; o < r.length; o++)
                    n += gi(r[o], pi);
                e.host = n
            }
        }, fi = function(e) {
            var t, n, r, o, i, a, u, c = e.split(".");
            if (c.length && "" == c[c.length - 1] && c.pop(),
            (t = c.length) > 4)
                return e;
            for (n = [],
                     r = 0; r < t; r++) {
                if ("" == (o = c[r]))
                    return e;
                if (i = 10,
                o.length > 1 && "0" == o.charAt(0) && (i = ti.test(o) ? 16 : 8,
                    o = o.slice(8 == i ? 1 : 2)),
                "" === o)
                    a = 0;
                else {
                    if (!(10 == i ? ri : 8 == i ? ni : oi).test(o))
                        return e;
                    a = parseInt(o, i)
                }
                n.push(a)
            }
            for (r = 0; r < t; r++)
                if (a = n[r],
                r == t - 1) {
                    if (a >= Ko(256, 5 - t))
                        return null
                } else if (a > 255)
                    return null;
            for (u = n.pop(),
                     r = 0; r < n.length; r++)
                u += n[r] * Ko(256, 3 - r);
            return u
        }, li = function(e) {
            var t, n, r, o, i, a, u, c = [0, 0, 0, 0, 0, 0, 0, 0], s = 0, f = null, l = 0, h = function() {
                return e.charAt(l)
            };
            if (":" == h()) {
                if (":" != e.charAt(1))
                    return;
                l += 2,
                    f = ++s
            }
            for (; h(); ) {
                if (8 == s)
                    return;
                if (":" != h()) {
                    for (t = n = 0; n < 4 && oi.test(h()); )
                        t = 16 * t + parseInt(h(), 16),
                            l++,
                            n++;
                    if ("." == h()) {
                        if (0 == n)
                            return;
                        if (l -= n,
                        s > 6)
                            return;
                        for (r = 0; h(); ) {
                            if (o = null,
                            r > 0) {
                                if (!("." == h() && r < 4))
                                    return;
                                l++
                            }
                            if (!ei.test(h()))
                                return;
                            for (; ei.test(h()); ) {
                                if (i = parseInt(h(), 10),
                                null === o)
                                    o = i;
                                else {
                                    if (0 == o)
                                        return;
                                    o = 10 * o + i
                                }
                                if (o > 255)
                                    return;
                                l++
                            }
                            c[s] = 256 * c[s] + o,
                            2 != ++r && 4 != r || s++
                        }
                        if (4 != r)
                            return;
                        break
                    }
                    if (":" == h()) {
                        if (l++,
                            !h())
                            return
                    } else if (h())
                        return;
                    c[s++] = t
                } else {
                    if (null !== f)
                        return;
                    l++,
                        f = ++s
                }
            }
            if (null !== f)
                for (a = s - f,
                         s = 7; 0 != s && a > 0; )
                    u = c[s],
                        c[s--] = c[f + a - 1],
                        c[f + --a] = u;
            else if (8 != s)
                return;
            return c
        }, hi = function(e) {
            var t, n, o, i;
            if ("number" == typeof e) {
                for (t = [],
                         n = 0; n < 4; n++)
                    t.unshift(e % 256),
                        e = Jo(e / 256);
                return t.join(".")
            }
            if ("object" == r(e)) {
                for (t = "",
                         o = function(e) {
                             for (var t = null, n = 1, r = null, o = 0, i = 0; i < 8; i++)
                                 0 !== e[i] ? (o > n && (t = r,
                                     n = o),
                                     r = null,
                                     o = 0) : (null === r && (r = i),
                                     ++o);
                             return o > n && (t = r,
                                 n = o),
                                 t
                         }(e),
                         n = 0; n < 8; n++)
                    i && 0 === e[n] || (i && (i = !1),
                        o === n ? (t += n ? ":" : "::",
                            i = !0) : (t += e[n].toString(16),
                        n < 7 && (t += ":")));
                return "[" + t + "]"
            }
            return e
        }, pi = {}, vi = qt({}, pi, {
            " ": 1,
            '"': 1,
            "<": 1,
            ">": 1,
            "`": 1
        }), di = qt({}, vi, {
            "#": 1,
            "?": 1,
            "{": 1,
            "}": 1
        }), yi = qt({}, di, {
            "/": 1,
            ":": 1,
            ";": 1,
            "=": 1,
            "@": 1,
            "[": 1,
            "\\": 1,
            "]": 1,
            "^": 1,
            "|": 1
        }), gi = function(e, t) {
            var n = Go(e, 0);
            return n > 32 && n < 127 && !S(t, e) ? e : encodeURIComponent(e)
        }, mi = {
            ftp: 21,
            file: null,
            http: 80,
            https: 443,
            ws: 80,
            wss: 443
        }, wi = function(e) {
            return S(mi, e.scheme)
        }, bi = function(e) {
            return "" != e.username || "" != e.password
        }, Si = function(e) {
            return !e.host || e.cannotBeABaseURL || "file" == e.scheme
        }, ki = function(e, t) {
            var n;
            return 2 == e.length && Zo.test(e.charAt(0)) && (":" == (n = e.charAt(1)) || !t && "|" == n)
        }, Ri = function(e) {
            var t;
            return e.length > 1 && ki(e.slice(0, 2)) && (2 == e.length || "/" === (t = e.charAt(2)) || "\\" === t || "?" === t || "#" === t)
        }, Li = function(e) {
            var t = e.path
                , n = t.length;
            !n || "file" == e.scheme && 1 == n && ki(t[0], !0) || t.pop()
        }, Ai = function(e) {
            return "." === e || "%2e" === e.toLowerCase()
        }, ji = {}, Ei = {}, Oi = {}, Pi = {}, Ti = {}, qi = {}, Ui = {}, xi = {}, Mi = {}, Ii = {}, Ci = {}, Hi = {}, Fi = {}, _i = {}, Ni = {}, Bi = {}, Di = {}, Xi = {}, Gi = {}, Vi = {}, Wi = {}, zi = function(e, t, n, r) {
            var o, i, a, u, c, s = n || ji, f = 0, l = "", h = !1, p = !1, v = !1;
            for (n || (e.scheme = "",
                e.username = "",
                e.password = "",
                e.host = null,
                e.port = null,
                e.path = [],
                e.query = null,
                e.fragment = null,
                e.cannotBeABaseURL = !1,
                t = t.replace(ui, "")),
                     t = t.replace(ci, ""),
                     o = fo(t); f <= o.length; ) {
                switch (i = o[f],
                    s) {
                    case ji:
                        if (!i || !Zo.test(i)) {
                            if (n)
                                return "Invalid scheme";
                            s = Oi;
                            continue
                        }
                        l += i.toLowerCase(),
                            s = Ei;
                        break;
                    case Ei:
                        if (i && (Qo.test(i) || "+" == i || "-" == i || "." == i))
                            l += i.toLowerCase();
                        else {
                            if (":" != i) {
                                if (n)
                                    return "Invalid scheme";
                                l = "",
                                    s = Oi,
                                    f = 0;
                                continue
                            }
                            if (n && (wi(e) != S(mi, l) || "file" == l && (bi(e) || null !== e.port) || "file" == e.scheme && !e.host))
                                return;
                            if (e.scheme = l,
                                n)
                                return void (wi(e) && mi[e.scheme] == e.port && (e.port = null));
                            l = "",
                                "file" == e.scheme ? s = _i : wi(e) && r && r.scheme == e.scheme ? s = Pi : wi(e) ? s = xi : "/" == o[f + 1] ? (s = Ti,
                                    f++) : (e.cannotBeABaseURL = !0,
                                    e.path.push(""),
                                    s = Gi)
                        }
                        break;
                    case Oi:
                        if (!r || r.cannotBeABaseURL && "#" != i)
                            return "Invalid scheme";
                        if (r.cannotBeABaseURL && "#" == i) {
                            e.scheme = r.scheme,
                                e.path = r.path.slice(),
                                e.query = r.query,
                                e.fragment = "",
                                e.cannotBeABaseURL = !0,
                                s = Wi;
                            break
                        }
                        s = "file" == r.scheme ? _i : qi;
                        continue;
                    case Pi:
                        if ("/" != i || "/" != o[f + 1]) {
                            s = qi;
                            continue
                        }
                        s = Mi,
                            f++;
                        break;
                    case Ti:
                        if ("/" == i) {
                            s = Ii;
                            break
                        }
                        s = Xi;
                        continue;
                    case qi:
                        if (e.scheme = r.scheme,
                        i == Do)
                            e.username = r.username,
                                e.password = r.password,
                                e.host = r.host,
                                e.port = r.port,
                                e.path = r.path.slice(),
                                e.query = r.query;
                        else if ("/" == i || "\\" == i && wi(e))
                            s = Ui;
                        else if ("?" == i)
                            e.username = r.username,
                                e.password = r.password,
                                e.host = r.host,
                                e.port = r.port,
                                e.path = r.path.slice(),
                                e.query = "",
                                s = Vi;
                        else {
                            if ("#" != i) {
                                e.username = r.username,
                                    e.password = r.password,
                                    e.host = r.host,
                                    e.port = r.port,
                                    e.path = r.path.slice(),
                                    e.path.pop(),
                                    s = Xi;
                                continue
                            }
                            e.username = r.username,
                                e.password = r.password,
                                e.host = r.host,
                                e.port = r.port,
                                e.path = r.path.slice(),
                                e.query = r.query,
                                e.fragment = "",
                                s = Wi
                        }
                        break;
                    case Ui:
                        if (!wi(e) || "/" != i && "\\" != i) {
                            if ("/" != i) {
                                e.username = r.username,
                                    e.password = r.password,
                                    e.host = r.host,
                                    e.port = r.port,
                                    s = Xi;
                                continue
                            }
                            s = Ii
                        } else
                            s = Mi;
                        break;
                    case xi:
                        if (s = Mi,
                        "/" != i || "/" != l.charAt(f + 1))
                            continue;
                        f++;
                        break;
                    case Mi:
                        if ("/" != i && "\\" != i) {
                            s = Ii;
                            continue
                        }
                        break;
                    case Ii:
                        if ("@" == i) {
                            h && (l = "%40" + l),
                                h = !0,
                                a = fo(l);
                            for (var d = 0; d < a.length; d++) {
                                var y = a[d];
                                if (":" != y || v) {
                                    var g = gi(y, yi);
                                    v ? e.password += g : e.username += g
                                } else
                                    v = !0
                            }
                            l = ""
                        } else if (i == Do || "/" == i || "?" == i || "#" == i || "\\" == i && wi(e)) {
                            if (h && "" == l)
                                return "Invalid authority";
                            f -= fo(l).length + 1,
                                l = "",
                                s = Ci
                        } else
                            l += i;
                        break;
                    case Ci:
                    case Hi:
                        if (n && "file" == e.scheme) {
                            s = Bi;
                            continue
                        }
                        if (":" != i || p) {
                            if (i == Do || "/" == i || "?" == i || "#" == i || "\\" == i && wi(e)) {
                                if (wi(e) && "" == l)
                                    return "Invalid host";
                                if (n && "" == l && (bi(e) || null !== e.port))
                                    return;
                                if (u = si(e, l))
                                    return u;
                                if (l = "",
                                    s = Di,
                                    n)
                                    return;
                                continue
                            }
                            "[" == i ? p = !0 : "]" == i && (p = !1),
                                l += i
                        } else {
                            if ("" == l)
                                return "Invalid host";
                            if (u = si(e, l))
                                return u;
                            if (l = "",
                                s = Fi,
                            n == Hi)
                                return
                        }
                        break;
                    case Fi:
                        if (!ei.test(i)) {
                            if (i == Do || "/" == i || "?" == i || "#" == i || "\\" == i && wi(e) || n) {
                                if ("" != l) {
                                    var m = parseInt(l, 10);
                                    if (m > 65535)
                                        return "Invalid port";
                                    e.port = wi(e) && m === mi[e.scheme] ? null : m,
                                        l = ""
                                }
                                if (n)
                                    return;
                                s = Di;
                                continue
                            }
                            return "Invalid port"
                        }
                        l += i;
                        break;
                    case _i:
                        if (e.scheme = "file",
                        "/" == i || "\\" == i)
                            s = Ni;
                        else {
                            if (!r || "file" != r.scheme) {
                                s = Xi;
                                continue
                            }
                            if (i == Do)
                                e.host = r.host,
                                    e.path = r.path.slice(),
                                    e.query = r.query;
                            else if ("?" == i)
                                e.host = r.host,
                                    e.path = r.path.slice(),
                                    e.query = "",
                                    s = Vi;
                            else {
                                if ("#" != i) {
                                    Ri(o.slice(f).join("")) || (e.host = r.host,
                                        e.path = r.path.slice(),
                                        Li(e)),
                                        s = Xi;
                                    continue
                                }
                                e.host = r.host,
                                    e.path = r.path.slice(),
                                    e.query = r.query,
                                    e.fragment = "",
                                    s = Wi
                            }
                        }
                        break;
                    case Ni:
                        if ("/" == i || "\\" == i) {
                            s = Bi;
                            break
                        }
                        r && "file" == r.scheme && !Ri(o.slice(f).join("")) && (ki(r.path[0], !0) ? e.path.push(r.path[0]) : e.host = r.host),
                            s = Xi;
                        continue;
                    case Bi:
                        if (i == Do || "/" == i || "\\" == i || "?" == i || "#" == i) {
                            if (!n && ki(l))
                                s = Xi;
                            else if ("" == l) {
                                if (e.host = "",
                                    n)
                                    return;
                                s = Di
                            } else {
                                if (u = si(e, l))
                                    return u;
                                if ("localhost" == e.host && (e.host = ""),
                                    n)
                                    return;
                                l = "",
                                    s = Di
                            }
                            continue
                        }
                        l += i;
                        break;
                    case Di:
                        if (wi(e)) {
                            if (s = Xi,
                            "/" != i && "\\" != i)
                                continue
                        } else if (n || "?" != i)
                            if (n || "#" != i) {
                                if (i != Do && (s = Xi,
                                "/" != i))
                                    continue
                            } else
                                e.fragment = "",
                                    s = Wi;
                        else
                            e.query = "",
                                s = Vi;
                        break;
                    case Xi:
                        if (i == Do || "/" == i || "\\" == i && wi(e) || !n && ("?" == i || "#" == i)) {
                            if (".." === (c = (c = l).toLowerCase()) || "%2e." === c || ".%2e" === c || "%2e%2e" === c ? (Li(e),
                            "/" == i || "\\" == i && wi(e) || e.path.push("")) : Ai(l) ? "/" == i || "\\" == i && wi(e) || e.path.push("") : ("file" == e.scheme && !e.path.length && ki(l) && (e.host && (e.host = ""),
                                l = l.charAt(0) + ":"),
                                e.path.push(l)),
                                l = "",
                            "file" == e.scheme && (i == Do || "?" == i || "#" == i))
                                for (; e.path.length > 1 && "" === e.path[0]; )
                                    e.path.shift();
                            "?" == i ? (e.query = "",
                                s = Vi) : "#" == i && (e.fragment = "",
                                s = Wi)
                        } else
                            l += gi(i, di);
                        break;
                    case Gi:
                        "?" == i ? (e.query = "",
                            s = Vi) : "#" == i ? (e.fragment = "",
                            s = Wi) : i != Do && (e.path[0] += gi(i, pi));
                        break;
                    case Vi:
                        n || "#" != i ? i != Do && ("'" == i && wi(e) ? e.query += "%27" : e.query += "#" == i ? "%23" : gi(i, pi)) : (e.fragment = "",
                            s = Wi);
                        break;
                    case Wi:
                        i != Do && (e.fragment += gi(i, vi))
                }
                f++
            }
        }, $i = function(e) {
            var t, n, r = Gt(this, $i, "URL"), o = arguments.length > 1 ? arguments[1] : void 0, i = String(e), a = $o(r, {
                type: "URL"
            });
            if (void 0 !== o)
                if (o instanceof $i)
                    t = Yo(o);
                else if (n = zi(t = {}, String(o)))
                    throw TypeError(n);
            if (n = zi(a, i, null, t))
                throw TypeError(n);
            var c = a.searchParams = new Wo
                , s = zo(c);
            s.updateSearchParams(a.query),
                s.updateURL = function() {
                    a.query = String(c) || null
                }
                ,
            u || (r.href = Ji.call(r),
                r.origin = Ki.call(r),
                r.protocol = Zi.call(r),
                r.username = Qi.call(r),
                r.password = ea.call(r),
                r.host = ta.call(r),
                r.hostname = na.call(r),
                r.port = ra.call(r),
                r.pathname = oa.call(r),
                r.search = ia.call(r),
                r.searchParams = aa.call(r),
                r.hash = ua.call(r))
        }, Yi = $i.prototype, Ji = function() {
            var e = Yo(this)
                , t = e.scheme
                , n = e.username
                , r = e.password
                , o = e.host
                , i = e.port
                , a = e.path
                , u = e.query
                , c = e.fragment
                , s = t + ":";
            return null !== o ? (s += "//",
            bi(e) && (s += n + (r ? ":" + r : "") + "@"),
                s += hi(o),
            null !== i && (s += ":" + i)) : "file" == t && (s += "//"),
                s += e.cannotBeABaseURL ? a[0] : a.length ? "/" + a.join("/") : "",
            null !== u && (s += "?" + u),
            null !== c && (s += "#" + c),
                s
        }, Ki = function() {
            var e = Yo(this)
                , t = e.scheme
                , n = e.port;
            if ("blob" == t)
                try {
                    return new URL(t.path[0]).origin
                } catch (wa) {
                    return "null"
                }
            return "file" != t && wi(e) ? t + "://" + hi(e.host) + (null !== n ? ":" + n : "") : "null"
        }, Zi = function() {
            return Yo(this).scheme + ":"
        }, Qi = function() {
            return Yo(this).username
        }, ea = function() {
            return Yo(this).password
        }, ta = function() {
            var e = Yo(this)
                , t = e.host
                , n = e.port;
            return null === t ? "" : null === n ? hi(t) : hi(t) + ":" + n
        }, na = function() {
            var e = Yo(this).host;
            return null === e ? "" : hi(e)
        }, ra = function() {
            var e = Yo(this).port;
            return null === e ? "" : String(e)
        }, oa = function() {
            var e = Yo(this)
                , t = e.path;
            return e.cannotBeABaseURL ? t[0] : t.length ? "/" + t.join("/") : ""
        }, ia = function() {
            var e = Yo(this).query;
            return e ? "?" + e : ""
        }, aa = function() {
            return Yo(this).searchParams
        }, ua = function() {
            var e = Yo(this).fragment;
            return e ? "#" + e : ""
        }, ca = function(e, t) {
            return {
                get: e,
                set: t,
                configurable: !0,
                enumerable: !0
            }
        };
        if (u && rt(Yi, {
            href: ca(Ji, (function(e) {
                    var t = Yo(this)
                        , n = String(e)
                        , r = zi(t, n);
                    if (r)
                        throw TypeError(r);
                    zo(t.searchParams).updateSearchParams(t.query)
                }
            )),
            origin: ca(Ki),
            protocol: ca(Zi, (function(e) {
                    var t = Yo(this);
                    zi(t, String(e) + ":", ji)
                }
            )),
            username: ca(Qi, (function(e) {
                    var t = Yo(this)
                        , n = fo(String(e));
                    if (!Si(t)) {
                        t.username = "";
                        for (var r = 0; r < n.length; r++)
                            t.username += gi(n[r], yi)
                    }
                }
            )),
            password: ca(ea, (function(e) {
                    var t = Yo(this)
                        , n = fo(String(e));
                    if (!Si(t)) {
                        t.password = "";
                        for (var r = 0; r < n.length; r++)
                            t.password += gi(n[r], yi)
                    }
                }
            )),
            host: ca(ta, (function(e) {
                    var t = Yo(this);
                    t.cannotBeABaseURL || zi(t, String(e), Ci)
                }
            )),
            hostname: ca(na, (function(e) {
                    var t = Yo(this);
                    t.cannotBeABaseURL || zi(t, String(e), Hi)
                }
            )),
            port: ca(ra, (function(e) {
                    var t = Yo(this);
                    Si(t) || ("" == (e = String(e)) ? t.port = null : zi(t, e, Fi))
                }
            )),
            pathname: ca(oa, (function(e) {
                    var t = Yo(this);
                    t.cannotBeABaseURL || (t.path = [],
                        zi(t, e + "", Di))
                }
            )),
            search: ca(ia, (function(e) {
                    var t = Yo(this);
                    "" == (e = String(e)) ? t.query = null : ("?" == e.charAt(0) && (e = e.slice(1)),
                        t.query = "",
                        zi(t, e, Vi)),
                        zo(t.searchParams).updateSearchParams(t.query)
                }
            )),
            searchParams: ca(aa),
            hash: ca(ua, (function(e) {
                    var t = Yo(this);
                    "" != (e = String(e)) ? ("#" == e.charAt(0) && (e = e.slice(1)),
                        t.fragment = "",
                        zi(t, e, Wi)) : t.fragment = null
                }
            ))
        }),
            te(Yi, "toJSON", (function() {
                    return Ji.call(this)
                }
            ), {
                enumerable: !0
            }),
            te(Yi, "toString", (function() {
                    return Ji.call(this)
                }
            ), {
                enumerable: !0
            }),
            Vo) {
            var sa = Vo.createObjectURL
                , fa = Vo.revokeObjectURL;
            sa && te($i, "createObjectURL", (function(e) {
                    return sa.apply(Vo, arguments)
                }
            )),
            fa && te($i, "revokeObjectURL", (function(e) {
                    return fa.apply(Vo, arguments)
                }
            ))
        }
        Dt($i, "URL"),
            Te({
                global: !0,
                forced: !uo,
                sham: !u
            }, {
                URL: $i
            }),
            Te({
                target: "URL",
                proto: !0,
                enumerable: !0
            }, {
                toJSON: function() {
                    return URL.prototype.toString.call(this)
                }
            });
        var la = function(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        };
        function ha(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
            }
        }
        var pa = function(e, t, n) {
            return t && ha(e.prototype, t),
            n && ha(e, n),
                e
        }
            , va = "fetch"in window
            , da = "Request"in window
            , ya = "Headers"in window
            , ga = {
            POST: "*",
            PUT: "*",
            PATCH: "*",
            DELETE: "*"
        }
            , ma = new (function() {
            function e() {
                la(this, e),
                    this.tokenHeaderName = "x-secsdk-csrf-token",
                    this.tokenFetchTimeout = 1e4,
                    this.secsdkVersionHeaderName = "x-secsdk-csrf-version",
                    this.nativeXMLHttpRequestOpen = window.XMLHttpRequest.prototype.open,
                    this.nativeXMLHttpRequestSend = window.XMLHttpRequest.prototype.send,
                    this.nativeXMLHttpRequestSetRequestHeader = window.XMLHttpRequest.prototype.setRequestHeader,
                    this.nativeFetch = window.fetch,
                    this.tokenMap = {},
                    this.protectionConfig = {},
                    this.secsdkVersion = "1.2.7",
                    this.monkeyPatchXMLHttpRequest(),
                    this.monkeyPatchFetch()
            }
            return pa(e, [{
                key: "setProtectedHost",
                value: function() {
                    var e = this
                        , t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.location.host;
                    this.protectionConfig = {},
                        "string" == typeof t ? this.protectionConfig[t] = Object.assign({}, ga) : Array.isArray(t) ? t.forEach((function(t) {
                                e.protectionConfig[t] = Object.assign({}, ga)
                            }
                        )) : "[object Object]" === Object.prototype.toString.call(t) && Object.keys(t).forEach((function(n) {
                                e.protectionConfig[n] = Object.assign({}, ga);
                                var r = t[n];
                                "[object Object]" === Object.prototype.toString.call(r) && Object.keys(r).forEach((function(t) {
                                        e.protectionConfig[n][t.toUpperCase()] = r[t]
                                    }
                                ))
                            }
                        ))
                }
            }, {
                key: "fetchToken",
                value: function() {
                    var e = this
                        , t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.location.host
                        , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.location.pathname;
                    return Array.isArray(t) ? Promise.all(t.map((function(t) {
                            return e.fetchToken(t)
                        }
                    ))) : (this.tokenMap[t] || (this.tokenMap[t] = this.fetchTokenFromServer(t, n).then((function(n) {
                            return e.tokenMap[t] = n,
                                n
                        }
                    ))),
                        Promise.resolve(this.tokenMap[t]).then((function(r) {
                                return r.expiredAt < Date.now() ? (delete e.tokenMap[t],
                                    e.fetchToken(t, n)) : r
                            }
                        )))
                }
            }, {
                key: "fetchTokenFromLocal",
                value: function(e) {
                    var t = this.tokenMap[e];
                    return !t || t instanceof Promise ? "DOWNGRADE" : t.value
                }
            }, {
                key: "fetchTokenFromServer",
                value: function(e, t) {
                    var n = this;
                    return new Promise((function(r) {
                            var o = new XMLHttpRequest
                                , i = {
                                value: "DOWNGRADE",
                                expiredAt: Date.now() + 1e3
                            };
                            o.addEventListener("load", (function() {
                                    if (200 !== o.status)
                                        return console.error(new Error("Failed to fetch csrf token: host=".concat(e, " status=").concat(o.status, " statusText=").concat(o.statusText))),
                                            void r(i);
                                    var t = []
                                        , n = o.getResponseHeader("x-ware-csrf-token");
                                    if (!n)
                                        return console.warn("Failed to get csrf token: host=".concat(e, " xWareCsrfToken=").concat(n)),
                                            void r(i);
                                    if ("0" !== (t = n.split(","))[0])
                                        return console.warn("Failed to fetch csrf token: host=".concat(e, " status_code=").concat(t[0], " message=").concat(t[3])),
                                            void r(i);
                                    if (!t[1])
                                        return console.warn("Failed to fetch csrf token, empty token: host=".concat(e, " data=").concat(t)),
                                            void r(i);
                                    var a = parseInt(t[2], 10) || 864e5;
                                    r({
                                        value: t[1],
                                        expiredAt: Date.now() + a
                                    })
                                }
                            )),
                                o.addEventListener("error", (function() {
                                        console.error(new Error("Failed to fetch csrf token: host=".concat(e, " error=network request failed"))),
                                            r(i)
                                    }
                                )),
                                o.addEventListener("abort", (function() {
                                        console.error(new Error("Failed to fetch csrf token: host=".concat(e, " error=network request aborted"))),
                                            r(i)
                                    }
                                )),
                                o.addEventListener("timeout", (function() {
                                        console.error(new Error("Failed to fetch csrf token: host=".concat(e, " error=timeout"))),
                                            r(i)
                                    }
                                ));
                            var a = ["http:", "https:"].includes(window.location.protocol) ? window.location.protocol : "https:";
                            n.nativeXMLHttpRequestOpen.call(o, "HEAD", "".concat(a, "//").concat(e).concat(t)),
                                n.nativeXMLHttpRequestSetRequestHeader.call(o, "x-secsdk-csrf-request", "1"),
                                n.nativeXMLHttpRequestSetRequestHeader.call(o, n.secsdkVersionHeaderName, n.secsdkVersion),
                                o.withCredentials = !0,
                                o.timeout = n.tokenFetchTimeout,
                                n.nativeXMLHttpRequestSend.call(o)
                        }
                    ))
                }
            }, {
                key: "shouldProtectRequest",
                value: function(e, t, n) {
                    t = t.toUpperCase();
                    var r = this.protectionConfig;
                    if (!r[e])
                        return !1;
                    if (!r[e][t])
                        return !1;
                    var o = r[e][t];
                    return o instanceof RegExp ? o.test(n) : Array.isArray(o) ? o.some((function(e) {
                            return e instanceof RegExp ? e.test(n) : e === n
                        }
                    )) : "*" === o || o === n
                }
            }, {
                key: "monkeyPatchXMLHttpRequest",
                value: function() {
                    var e = this;
                    XMLHttpRequest.prototype.open = function() {
                        this.openArgs = arguments,
                            e.nativeXMLHttpRequestOpen.apply(this, arguments)
                    }
                        ,
                        XMLHttpRequest.prototype.send = function() {
                            var t = this
                                , n = this.openArgs
                                , r = arguments
                                , o = n[0] || "GET"
                                , i = new URL(n[1],window.location.href);
                            if (!e.shouldProtectRequest(i.host, o, i.pathname))
                                return e.nativeXMLHttpRequestSend.apply(this, r);
                            if (n.length >= 3 && !n[2]) {
                                var a = e.fetchTokenFromLocal(i.host);
                                return this.setRequestHeader(e.tokenHeaderName, a),
                                    e.nativeXMLHttpRequestSend.apply(this, r)
                            }
                            e.fetchToken(i.host, i.pathname).then((function(n) {
                                    t.setRequestHeader(e.tokenHeaderName, n.value),
                                        e.nativeXMLHttpRequestSend.apply(t, r)
                                }
                            ))
                        }
                }
            }, {
                key: "monkeyPatchFetch",
                value: function() {
                    if (va) {
                        var e = this;
                        window.fetch = function(t, n) {
                            var r, o, i = this;
                            da && t instanceof Request ? (r = t.url,
                                o = t.method) : (r = t,
                                o = n && n.method ? n.method : "GET");
                            var a = new URL(r,window.location.href);
                            return e.shouldProtectRequest(a.host, o, a.pathname) ? e.fetchToken(a.host, a.pathname).then((function(r) {
                                    if (da && t instanceof Request)
                                        t.headers.set(e.tokenHeaderName, r.value);
                                    else if ((n = n || {}).headers = n.headers || {},
                                    ya && n.headers instanceof Headers)
                                        n.headers.set(e.tokenHeaderName, r.value);
                                    else if (Array.isArray(n.headers)) {
                                        var o = !1;
                                        n.headers.forEach((function(t) {
                                                t[0] === e.tokenHeaderName && (t[1] = r.value,
                                                    o = !0)
                                            }
                                        )),
                                        o || n.headers.push([e.tokenHeaderName, r.value])
                                    } else
                                        n.headers[e.tokenHeaderName] = r.value;
                                    return e.nativeFetch.apply(i, [t, n])
                                }
                            )) : e.nativeFetch.apply(this, [t, n])
                        }
                    }
                }
            }]),
                e
        }());
        e.csrf = ma,
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        window.byted_acrawler.init({
            aid: 6383,
            dfp: false,
            boe: false,
            intercept: true,
            enablePathList: ["/aweme/v1/*", "/aweme/v2/*"]
        })

        function tttt(e) {
            function isArray(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            }

            function isDate(e) {
                return "[object Date]" === Object.prototype.toString.call(e)
            }

            function isObject(e) {
                return null !== e && "object" == typeof e
            }

            function forEach(e, t) {
                if (null != e)
                    if ("object" != typeof e && (e = [e]),
                        isArray(e))
                        for (var n = 0, r = e.length; n < r; n++)
                            t.call(null, e[n], n, e);
                    else
                        for (var o in e)
                            Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e)
            }

            function isString(val) {
                return typeof val === 'string';
            }

            function isURLSearchParams(e) {
                return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams
            }

            function urlEncodeReplace(e) {
                return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
            }

            function isURLSameOrigin(requestURL){
                var msie = /(msie|trident)/i.test(navigator.userAgent);
                var urlParsingNode = document.createElement('a');
                var originURL = resolveURL(window.location.href);

                function resolveURL(url) {
                    var href = url;

                    if (msie) {
                        urlParsingNode.setAttribute('href', href);
                        href = urlParsingNode.href;
                    }

                    urlParsingNode.setAttribute('href', href);
                    return {
                        href: urlParsingNode.href,
                        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
                        host: urlParsingNode.host,
                        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
                        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
                        hostname: urlParsingNode.hostname,
                        port: urlParsingNode.port,
                        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                            urlParsingNode.pathname :
                            '/' + urlParsingNode.pathname
                    };
                }

                var parsed = (isString(requestURL)) ? resolveURL(requestURL) : requestURL;
                return (parsed.protocol === originURL.protocol &&
                    parsed.host === originURL.host);
            }

            function urlJOIN(e, t, n) {
                if (!t)
                    return e;
                var i;
                if (n)
                    i = n(t);
                else if (isURLSearchParams(t))
                    i = t.toString();
                else {
                    var a = [];
                    forEach(t, (function(e, t) {
                            null != e && (isArray(e) ? t += "[]" : e = [e],
                                forEach(e, (function(e) {
                                        isDate(e) ? e = e.toISOString() : isObject(e) && (e = JSON.stringify(e)),
                                            a.push(urlEncodeReplace(t) + "=" + urlEncodeReplace(e))
                                    }
                                )))
                        }
                    )),
                        i = a.join("&")
                }
                if (i) {
                    var s = e.indexOf("#");
                    -1 !== s && (e = e.slice(0, s)),
                        e += (-1 === e.indexOf("?") ? "?" : "&") + i
                }
                return e
            }
            function isUndefined(e) {
                return void 0 === e
            }

            function u(e) {
                var t, n, i, a = {};
                return e ? (r.forEach(e.split("\n"), (function(e) {
                        if (i = e.indexOf(":"),
                            t = r.trim(e.substr(0, i)).toLowerCase(),
                            n = r.trim(e.substr(i + 1)),
                            t) {
                            if (a[t] && o.indexOf(t) >= 0)
                                return;
                            a[t] = "set-cookie" === t ? (a[t] ? a[t] : []).concat([n]) : a[t] ? a[t] + ", " + n : n
                        }
                    }
                )),
                    a) : a
            }

            return new Promise((function(t, n) {
                    var f = e.data
                        , d = e.headers;
                    try{
                        if (f && JSON.parse(f)){
                            delete d["Content-Type"];
                        }
                    }catch (w){}
                    var h = new XMLHttpRequest;
                    h.open.y = 1;
                    h.send.y = 1;
                    h.setRequestHeader.y = 1;

                    if (e.auth) {
                        var p = e.auth.username || ""
                            , m = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
                        d.Authorization = "Basic " + btoa(p + ":" + m)
                    }
                    var v = "/aweme/v1/web/channel/feed/";
                    if (h.open(e.method.toUpperCase(), urlJOIN(v, e.params, e.paramsSerializer), !0),
                        h.timeout = e.timeout,
                        h.onreadystatechange = function() {
                            if (h && 4 === h.readyState && (0 !== h.status || h.responseURL && 0 === h.responseURL.indexOf("file:"))) {
                                var r = "getAllResponseHeaders"in h ? u(h.getAllResponseHeaders()) : null
                                    , i = {
                                    data: e.responseType && "text" !== e.responseType ? h.response : h.responseText,
                                    status: h.status,
                                    statusText: h.statusText,
                                    headers: r,
                                    config: e,
                                    request: h
                                };
                                h = null
                            }
                        }
                        ,
                        h.onabort = function() {
                            h = null
                            console.log("error: onabort")
                        }
                        ,
                        h.onerror = function() {
                            h = null
                            console.log("Network Error")
                        }
                        ,
                        h.ontimeout = function() {
                            h = null
                            console.log("ECONNABORTED")
                        }) {
                        var g = (e.withCredentials || isURLSameOrigin(v)) && e.xsrfCookieName ? i.read(e.xsrfCookieName) : void 0;
                        g && (d[e.xsrfHeaderName] = g)
                    }
                    if ("setRequestHeader"in h && forEach(d, (function(e, t) {
                            void 0 === f && "content-type" === t.toLowerCase() ? delete d[t] : h.setRequestHeader(t, e)
                        }
                    )),
                    isUndefined(e.withCredentials) || (h.withCredentials = !!e.withCredentials),
                        e.responseType)
                        try {
                            h.responseType = e.responseType
                        } catch (t) {
                            if ("json" !== e.responseType)
                                throw t
                        }
                    "function" == typeof e.onDownloadProgress && h.addEventListener("progress", e.onDownloadProgress),
                    "function" == typeof e.onUploadProgress && h.upload && h.upload.addEventListener("progress", e.onUploadProgress),
                    e.cancelToken && e.cancelToken.promise.then((function(e) {
                            h && (h.abort(),
                                n(e),
                                h = null)
                        }
                    )),
                    f || (f = null),
                        h.send(f)
                }
            ))
        }

        let dddd = {
            "url": "/aweme/v1/web/channel/feed/",
            "method": "get",
            "headers": {
                "Accept": "application/json, text/plain, */*",
                "withCredentials": true
            },
            "params": {
                "device_platform": "webapp",
                "aid": 6383,
                "channel": "channel_pc_web",
                "tag_id": "",
                "count": 10,
                "version_code": "160100",
                "version_name": "16.1.0",
                "cookie_enabled": true,
                "screen_width": 1920,
                "screen_height": 1080,
                "browser_language": "zh-CN",
                "browser_platform": "Win32",
                "browser_name": "Mozilla",
                "browser_version": "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "browser_online": true
            },
            "baseURL": "",
            "timeout": 0,
            "xsrfCookieName": "XSRF-TOKEN",
            "xsrfHeaderName": "X-XSRF-TOKEN",
            "maxContentLength": -1,
            "maxBodyLength": -1
        }
        tttt(dddd)




    })(e)
}

module.exports = {
    secsdk
}