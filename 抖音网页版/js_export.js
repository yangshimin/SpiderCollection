const {window, navigator, screen, location, String, Image, document, history,
    Headers,Request,WebSocket,DOMException,indexedDB,PluginArray} = require('./myProxy')

var __tea_iife_export__ = function(e) {
    "use strict";
    var t = function() {
        return (t = Object.assign || function(e) {
                for (var t, i = 1, n = arguments.length; i < n; i++)
                    for (var r in t = arguments[i])
                        Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                return e
            }
        ).apply(this, arguments)
    };
    function i(e, t) {
        var i = "function" == typeof Symbol && e[Symbol.iterator];
        if (!i)
            return e;
        var n, r, o = i.call(e), s = [];
        try {
            for (; (void 0 === t || t-- > 0) && !(n = o.next()).done; )
                s.push(n.value)
        } catch (e) {
            r = {
                error: e
            }
        } finally {
            try {
                n && !n.done && (i = o.return) && i.call(o)
            } finally {
                if (r)
                    throw r.error
            }
        }
        return s
    }
    function n() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e = e.concat(i(arguments[t]));
        return e
    }
    var r, o = (function(e, t) {
        var i;
        i = function() {
            function e() {
                for (var e = 0, t = {}; e < arguments.length; e++) {
                    var i = arguments[e];
                    for (var n in i)
                        t[n] = i[n]
                }
                return t
            }
            function t(e) {
                return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent)
            }
            return function i(n) {
                function r() {}
                function o(t, i, o) {
                    if ("undefined" != typeof document) {
                        "number" == typeof (o = e({
                            path: "/"
                        }, r.defaults, o)).expires && (o.expires = new Date(1 * new Date + 864e5 * o.expires)),
                            o.expires = o.expires ? o.expires.toUTCString() : "";
                        try {
                            var s = JSON.stringify(i);
                            /^[\{\[]/.test(s) && (i = s)
                        } catch (e) {}
                        i = n.write ? n.write(i, t) : encodeURIComponent(String(i)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                            t = encodeURIComponent(String(t)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
                        var a = "";
                        for (var c in o)
                            o[c] && (a += "; " + c,
                            !0 !== o[c] && (a += "=" + o[c].split(";")[0]));
                        return document.cookie = t + "=" + i + a
                    }
                }
                function s(e, i) {
                    if ("undefined" != typeof document) {
                        for (var r = {}, o = document.cookie ? document.cookie.split("; ") : [], s = 0; s < o.length; s++) {
                            var a = o[s].split("=")
                                , c = a.slice(1).join("=");
                            i || '"' !== c.charAt(0) || (c = c.slice(1, -1));
                            try {
                                var h = t(a[0]);
                                if (c = (n.read || n)(c, h) || t(c),
                                    i)
                                    try {
                                        c = JSON.parse(c)
                                    } catch (e) {}
                                if (r[h] = c,
                                e === h)
                                    break
                            } catch (e) {}
                        }
                        return e ? r[e] : r
                    }
                }
                return r.set = o,
                    r.get = function(e) {
                        return s(e, !1)
                    }
                    ,
                    r.getJSON = function(e) {
                        return s(e, !0)
                    }
                    ,
                    r.remove = function(t, i) {
                        o(t, "", e(i, {
                            expires: -1
                        }))
                    }
                    ,
                    r.defaults = {},
                    r.withConverter = i,
                    r
            }(function() {})
        }
            ,
            e.exports = i()
    }(r = {
        exports: {}
    }, r.exports),
        r.exports), s = function() {
        function e() {
            this.cache = {}
        }
        return e.prototype.setItem = function(e, t) {
            this.cache[e] = t
        }
            ,
            e.prototype.getItem = function(e) {
                return this.cache[e]
            }
            ,
            e.prototype.removeItem = function(e) {
                this.cache[e] = void 0
            }
            ,
            e
    }();
    var a = {
        getItem: function(e) {
            try {
                var t = localStorage.getItem(e)
                    , i = t;
                try {
                    t && "string" == typeof t && (i = JSON.parse(t))
                } catch (e) {}
                return i || void 0
            } catch (e) {}
        },
        setItem: function(e, t) {
            try {
                var i = "string" == typeof t ? t : JSON.stringify(t);
                localStorage.setItem(e, i)
            } catch (e) {}
        },
        removeItem: function(e) {
            try {
                localStorage.removeItem(e)
            } catch (e) {}
        },
        getCookie: function(e, t) {
            try {
                return o.get(e, {
                    domain: t || document.domain
                })
            } catch (e) {
                return ""
            }
        },
        setCookie: function(e, t, i, n) {
            try {
                var r = n || document.domain
                    , s = +new Date + i;
                o.set(e, t, {
                    expires: new Date(s),
                    path: "/",
                    domain: r
                })
            } catch (e) {}
        },
        isSupportLS: function() {
            try {
                return localStorage.setItem("_ranger-test-key", "hi"),
                    localStorage.getItem("_ranger-test-key"),
                    localStorage.removeItem("_ranger-test-key"),
                    !0
            } catch (e) {
                return !1
            }
        }()
    }
        , c = {
        getItem: function(e) {
            try {
                var t = sessionStorage.getItem(e)
                    , i = t;
                try {
                    t && "string" == typeof t && (i = JSON.parse(t))
                } catch (e) {}
                return i || void 0
            } catch (e) {}
        },
        setItem: function(e, t) {
            try {
                var i = "string" == typeof t ? t : JSON.stringify(t);
                sessionStorage.setItem(e, i)
            } catch (e) {}
        },
        removeItem: function(e) {
            try {
                sessionStorage.removeItem(e)
            } catch (e) {}
        },
        isSupportSession: function() {
            try {
                return sessionStorage.setItem("_ranger-test-key", "hi"),
                    sessionStorage.getItem("_ranger-test-key"),
                    sessionStorage.removeItem("_ranger-test-key"),
                    !0
            } catch (e) {
                return !1
            }
        }()
    }
        , h = function() {
        function e(e, t) {
            this._storage = t && "session" === t ? c : !e && a.isSupportLS ? a : new s
        }
        return e.prototype.getItem = function(e) {
            return this._storage.getItem(e)
        }
            ,
            e.prototype.setItem = function(e, t) {
                this._storage.setItem(e, t)
            }
            ,
            e.prototype.getCookie = function(e, t) {
                return this._storage.getCookie(e, t)
            }
            ,
            e.prototype.setCookie = function(e, t, i, n) {
                this._storage.setCookie(e, t, i, n)
            }
            ,
            e.prototype.removeItem = function(e) {
                this._storage.removeItem(e)
            }
            ,
            e
    }()
        , u = {
        cn: "1fz22z22z1nz21z4mz4bz4bz1kz1az21z4az21z1lz21z21z1bz1iz4az1az1mz1k",
        sg: "1fz22z22z1nz21z4mz4bz4bz21z1ez18z1jz1gz49z1kz1az21z4az19z27z22z1cz1mz24z1cz20z21z1cz18z4az1az1mz1k",
        va: "1fz22z22z1nz21z4mz4bz4bz1kz18z1jz1gz24z18z49z1kz1az21z4az19z27z22z1cz1mz24z1cz20z21z1cz18z4az1az1mz1k"
    }
        , l = "/v1/user/webid"
        , d = "/v1/list"
        , p = "4.1.54"
        , f = {
        NO_URL: 4001,
        IMG_ON: 4e3,
        IMG_CATCH: 4002,
        BEACON_FALSE: 4003,
        XHR_ON: 500,
        RESPONSE: 5001,
        TIMEOUT: 5005
    }
        , _ = function(e, t) {
        return t ? "__tea_cache_tokens_" + e : "__tea_cache_events_" + e
    }
        , g = function(e) {
        return "__tea_cache_config_" + e
    }
        , m = function(e) {
        return "__tea_session_id_" + e
    }
        , v = function() {
        if ("undefined" != typeof window)
            return window.TeaAnalyticsObject
    }
        , z = {
        autotrack: {
            src: {
                cn: "1fz22z22z1nz21z4mz4bz4bz1jz1dz4dz49z1az1bz1lz49z22z1mz21z4az19z27z22z1cz21z1az1kz4az1az1mz1kz4bz1mz19z1hz4bz21z22z18z22z1gz1az4bz1jz1mz1ez49z21z1bz1iz4bz1az1mz1jz1jz1cz1az22z4bz18z23z22z1mz22z20z18z1az1iz4az1hz21",
                va: "1fz22z22z1nz21z4mz4bz4bz21z1dz4dz4iz49z21z1az1kz1az1bz1lz49z24z18z4az1gz19z27z22z1cz1bz22z1mz21z4az1az1mz1kz4bz1mz19z1hz4bz21z22z18z22z1gz1az49z23z21z4bz1jz1mz1ez49z21z1bz1iz4bz1az1mz1jz1jz1cz1az22z4bz18z23z22z1mz22z20z18z1az1iz4az1hz21",
                sg: "1fz22z22z1nz21z4mz4bz4bz21z1dz4dz4iz49z21z1az1kz1az1bz1lz49z21z1ez4az1gz19z27z22z1cz1bz22z1mz21z4az1az1mz1kz4bz1mz19z1hz4bz21z22z18z22z1gz1az49z21z1ez4bz1jz1mz1ez49z21z1bz1iz4bz1az1mz1jz1jz1cz1az22z4bz18z23z22z1mz22z20z18z1az1iz4az1hz21"
            },
            object: "TeaAutoTrack"
        }
    }
        , y = {
        cn: "1fz22z22z1nz21z4mz4bz4bz22z1mz19z1jz1mz1ez4az1az22z1mz19z21z1lz21z21z1bz1iz4az1az1mz1k",
        va: "1fz22z22z1nz21z4mz4bz4bz22z1mz19z1jz1mz1ez4az1gz22z1mz19z21z1lz21z21z1bz1iz4az1az1mz1k",
        sg: "1fz22z22z1nz21z4mz4bz4bz22z1mz19z1jz1mz1ez4az22z1mz19z21z1lz21z21z1bz1iz4az1az1mz1k"
    }
        , b = "__rangers_ab_style__"
        , k = "v1/list_test"
        , w = "1fz22z22z1nz21z4mz4bz4bz1jz1dz49z1az1bz1lz49z22z1mz21z4az19z27z22z1cz21z1az1kz4az1az1mz1kz4bz1mz19z1hz4bz21z22z18z22z1gz1az4bz1jz1mz1ez49z21z1bz1iz4bz1az1mz1jz1jz1cz1az22z4bz24z1gz21z23z18z1jz49z18z19z49z1az1mz20z1cz4az1hz21";
    function S(e, t, i, n, r, o, s) {
        try {
            var a = new XMLHttpRequest
                , c = s || "POST";
            a.open(c, "" + e, !0),
                a.setRequestHeader("Content-Type", "application/json; charset=utf-8"),
            r && a.setRequestHeader("X-MCS-AppKey", "" + r),
                a.onload = function() {
                    if (i) {
                        var e = null;
                        if (a.responseText) {
                            try {
                                e = JSON.parse(a.responseText)
                            } catch (t) {
                                e = {}
                            }
                            i(e, t)
                        }
                    }
                }
            ;
            try {
                o && (a.timeout = o),
                o && (a.ontimeout = function() {
                        n && n(t, f.TIMEOUT)
                    }
                ),
                    a.onerror = function() {
                        a.abort(),
                        n && n(t, f.XHR_ON)
                    }
                    ,
                    a.send(JSON.stringify(t))
            } catch (e) {}
        } catch (e) {}
    }
    var I = function(e, t, i, n) {
        try {
            var r = e.match(/\/v\d\//)
                , o = "";
            o = r ? r[0] : -1 !== e.indexOf("/v1/") ? "/v1/" : "/v2/";
            var s = e.split(o)[0];
            if (!s)
                return void n(e, t, f.NO_URL);
            t.forEach(function(r) {
                var o = function(e) {
                    var t = "";
                    for (var i in e)
                        e.hasOwnProperty(i) && void 0 !== e[i] && (t += "&" + i + "=" + encodeURIComponent(JSON.stringify(e[i])));
                    return t = "&" === t[0] ? t.slice(1) : t
                }(r)
                    , a = new Image(1,1);
                a.onload = function() {
                    a = null,
                    i && i()
                }
                    ,
                    a.onerror = function() {
                        a = null,
                        n && n(e, t, f.IMG_ON)
                    }
                    ,
                    a.src = s + "/v1/gif?" + o
            })
        } catch (i) {
            n && n(e, t, f.IMG_CATCH, i.message)
        }
    }
        , O = function(e, t, i, n, r, o, s, a, c) {
        var h = window.navigator.userAgent
            , u = -1 !== window.navigator.appName.indexOf("Microsoft Internet Explorer") && (-1 !== h.indexOf("MSIE 8.0") || -1 !== h.indexOf("MSIE 9.0"))
            , l = !!n;
        if (!l && u)
            I(e, i, r, o);
        else if (!l && a)
            return window.navigator && window.navigator.sendBeacon ? (c && c(),
                void (window.navigator.sendBeacon(e, JSON.stringify(i)) ? r() : o(e, i, f.BEACON_FALSE))) : void I(e, i, r, o);
        s && delete i.app_key,
            S(e, i, r, o, n, t)
    };
    function x(e) {
        return e ? (e ^ 16 * Math.random() >> e / 4).toString(10) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, x)
    }
    var E = function() {
        return x().replace(/-/g, "").slice(0, 19)
    };
    var T = function(e) {
        return function(e, t, i) {
            if ("string" == typeof e && "number" == typeof t && "number" == typeof i) {
                var n, r = [];
                i = i <= 25 ? i : i % 25;
                var o = String.fromCharCode(i + 97);
                n = e.split(o);
                for (var s = 0; s < n.length; s++) {
                    var a = parseInt(n[s], i);
                    a = 1 * a ^ t;
                    var c = String.fromCharCode(a);
                    r.push(c)
                }
                return r.join("")
            }
        }(e, 64, 25)
    }
        , C = function() {
        function e(e, t, i, n) {
            this.config = e,
                this.cfg = t,
                this.storage = new h(!1),
                this.appInfo = e.app_key || e.app_id,
                this.isNoWebid = e.disable_webid,
                this.isNoSsid = e.disable_webid || e.disable_ssid,
                this.domain = e.channel_domain || T(u[e.channel]),
                this.tokenReady = !1,
                this.checkExp = e.checkExp || !1,
                this.enableCookie = e.cross_subdomain || !1,
                this.expiresTime = this.enableCookie ? 94608e6 : 0,
                this.fetchUrl = "" + this.domain + l,
                this.uuidQueue = [],
                this.sendQueue = [],
                this.hook = i,
                this.cookieDomain = e.cookie_domain || "",
                this.session = n
        }
        return e.prototype._getToken = function() {
            this.tokensKey = _(this.appInfo, !0),
                this.cookieKey = "__tea_cookie_tokens_" + this.appInfo;
            try {
                var e = this.storage.getItem(this.tokensKey);
                if (this.enableCookie) {
                    var t = this.storage.getCookie(this.cookieKey, this.cookieDomain);
                    if (t) {
                        t = decodeURIComponent(t);
                        var i = (t = JSON.parse(t)).user_unique_id
                            , n = t.web_id
                            , r = t.timestamp
                            , o = t.ssid;
                        this._setToken(n, i, o, r)
                    } else {
                        if (!e)
                            return void this._requestWebId();
                        this.storage.setCookie(this.cookieKey, encodeURIComponent(JSON.stringify(e)), this.expiresTime, this.cookieDomain),
                            this._checkLocal(e)
                    }
                } else {
                    if (!e)
                        return void this._requestWebId();
                    this._checkLocal(e)
                }
            } catch (e) {}
        }
            ,
            e.prototype._checkLocal = function(e) {
                if (!e.web_id) {
                    var t = this.storage.getCookie("tt_webid")
                        , i = this.storage.getCookie("__tea_sdk__ssid")
                        , n = this.storage.getCookie("__tea_sdk__user_unique_id");
                    if (t && i && n) {
                        var r = {
                            web_id: t,
                            ssid: i,
                            user_unique_id: n,
                            timestamp: Date.now()
                        };
                        this.storage.setItem(this.tokensKey, r)
                    }
                }
                var o = this.storage.getItem(this.tokensKey)
                    , s = (n = o.user_unique_id,
                    t = o.web_id,
                    o.timestamp);
                i = o.ssid;
                t && n ? this._setToken(t, n, i, s) : this._requestWebId()
            }
            ,
            e.prototype._setToken = function(e, t, i, n) {
                if (this.uuid = t,
                    this.web_id = e,
                    this.ssid = i,
                    this.checkExp) {
                    var r = Date.now() - parseFloat(n);
                    if (r > 7344e6)
                        return void this._requestWebId();
                    if (r > 432e7)
                        return void this._updateWebId(e)
                }
                this._complete(e, t, i)
            }
            ,
            e.prototype._complete = function(e, t, i) {
                this.cfg.envInfo.user.ssid = i,
                    this.cfg.envInfo.user.web_id = e,
                    this.cfg.envInfo.user.user_unique_id = t,
                    this.tokenReady = !0
            }
            ,
            e.prototype._requestWebId = function() {
                this.isNoWebid ? this._setTokenId(E(), "", "", !0) : this._fetchWebId(this.fetchUrl, !1)
            }
            ,
            e.prototype._updateWebId = function(e) {
                var t = "" + this.domain + l + "/" + e + "/update";
                this._fetchWebId(t, !0)
            }
            ,
            e.prototype._fetchWebId = function(e, t) {
                var i = this;
                this.isGetWebId = !0,
                    O(e, 5e3, {
                        app_key: this.config.app_key,
                        app_id: this.config.app_id,
                        url: location.href,
                        user_agent: window.navigator.userAgent,
                        referer: document.referrer,
                        user_unique_id: ""
                    }, this.config.app_key, function(e) {
                        i.isGetWebId = !1,
                            e && 0 === e.e ? (i.web_id = e.web_id,
                                i.uuidQueue.length ? i._requestSsId(i.uuidQueue[0]) : i._setTokenId(e.web_id, "", t ? i.ssid : e.ssid, !0)) : (i.hook.emit("token-error"),
                                console.warn("[]appid: " + i.config.app_id + ", get webid error, init error~"))
                    }, function() {
                        i.isGetWebId = !1,
                            i.hook.emit("token-error"),
                            console.warn("[]appid: " + i.config.app_id + ", get webid error, init error~")
                    }, !0)
            }
            ,
            e.prototype._setTokenId = function(e, t, i, n) {
                var r = this.cfg.envInfo.user.web_id || e
                    , o = {
                    web_id: r,
                    ssid: i,
                    user_unique_id: t || r,
                    timestamp: Date.now()
                };
                this.enableCookie && this.storage.setCookie(this.cookieKey, encodeURIComponent(JSON.stringify(o)), this.expiresTime, this.cookieDomain),
                    this.storage.setItem(this.tokensKey, o),
                    this.cfg.envInfo.user.ssid = i,
                    this.cfg.envInfo.user.web_id = r,
                    this.cfg.envInfo.user.user_unique_id = t || r,
                    this.uuid = t || r,
                    this.web_id = r,
                    this.ssid = i,
                n && (this.tokenReady = !0,
                    this.hook.emit("token-ready"))
            }
            ,
            e.prototype._getSsid = function(e) {
                e && -1 === ["0", "Null", "None", "", "undefined"].indexOf(e) && this.uuid !== e && (this.uuidQueue.push(e),
                    this.uuid = e,
                    this.cfg.envInfo.user.user_unique_id = e,
                -1 === this.uuidQueue.indexOf(e) && this.uuidQueue.push(e),
                this.isNoSsid || this.isGetWebId || (this.tokenReady = !1,
                    this._requestSsId(e),
                    this.sendQueue.push(e)),
                    this.session._resetSessionId())
            }
            ,
            e.prototype._requestSsId = function(e) {
                var t = this;
                if (!this.sendQueue.length) {
                    var i = this.domain + "/v1/user/ssid";
                    O(i, 5e3, {
                        app_key: this.config.app_key,
                        app_id: this.config.app_id,
                        web_id: this.web_id,
                        user_unique_id: e
                    }, this.config.app_key, function(i) {
                        t.sendQueue = [],
                        t.uuidQueue.length && t.uuidQueue.splice(t.uuidQueue.indexOf(e), 1),
                            i && 0 === i.e ? (t._setTokenId(t.web_id, e, i.ssid, 0 === t.uuidQueue.length),
                            t.uuidQueue.length && t._requestSsId(t.uuidQueue[0])) : (t.tokenReady = !0,
                                t.hook.emit("token-ready"),
                                console.warn("[]appid: " + t.config.app_id + ", get ssid error"))
                    }, function() {
                        t.tokenReady = !0,
                            t.hook.emit("token-ready")
                    }, !0)
                }
            }
            ,
            e.prototype.isTokenReady = function() {
                return this.tokenReady
            }
            ,
            e
    }()
        , A = function(e) {
        !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? window.addEventListener("pagehide", e, !1) : window.addEventListener("beforeunload", e, !1)
    }
        , N = function(e, t, i) {
        void 0 === e && (e = []),
        void 0 === t && (t = function(e) {
                return e
            }
        ),
        void 0 === i && (i = 20);
        var n, r = [], o = 0;
        return e.forEach(function(e) {
            var s = t(e);
            void 0 === n ? n = s : (s !== n || r[o].length >= i) && (o += 1,
                n = s),
                r[o] = r[o] || [],
                r[o].push(e)
        }),
            r
    }
        , V = function() {
        function e(e, t, i, n, r, o, s) {
            this.collect = e,
                this.cfg = i,
                this.config = t,
                this._token = n,
                this.appInfo = t.app_id || t.app_key,
                this.debugMode = !!t.log,
                this.evtDataKey = _(this.appInfo, !1);
            var a = t.channel_domain || T(u[t.channel]);
            if (this.reportUrl = t.report_url ? t.report_url : "" + a + d,
                this.storage = new h(!0),
                this.EventStorage = new h(!1),
                this.maxStorage = t.max_storage_num || -1,
                this.maxReport = t.max_report || 10,
                this.reportTime = t.reportTime || 30,
                this.timeout = t.timeout || 1e5,
                this.closeStorage = !0,
                this.plugin = r,
                this.session = o,
                this.filter = s,
                this.plugin) {
                var c = t.enable_storage
                    , l = t.disable_storage;
                (c || !1 === l) && (this.closeStorage = !1)
            }
            this.addListener()
        }
        return e.prototype.addListener = function() {
            var e = this;
            window.addEventListener("unload", function() {
                e.report(!0)
            }, !1),
                A(function() {
                    e.report(!0)
                }),
                document.addEventListener("visibilitychange", function() {
                    "hidden" === document.visibilityState && e.report(!0)
                }, !1)
        }
            ,
            e.prototype.setReady = function() {
                this.isReady = !0,
                this.closeStorage || this.checkStorageEvent(),
                    this.report()
            }
            ,
            e.prototype.event = function(e) {
                var t = this;
                void 0 === e && (e = []);
                try {
                    var i = n(e, this.storage.getItem(this.evtDataKey) || []);
                    this.storage.setItem(this.evtDataKey, i),
                    this.reportTimer && clearTimeout(this.reportTimer),
                        i.length >= this.maxReport ? this.report(!1) : this.reportTimer = setTimeout(function() {
                            t.report(!1),
                                t.reportTimer = null
                        }, this.reportTime)
                } catch (e) {}
            }
            ,
            e.prototype.beconEvent = function(e) {
                void 0 === e && (e = []);
                var t = this._mergeEvents(e);
                this._dealData(t, !0)
            }
            ,
            e.prototype.report = function(e) {
                if (void 0 === e && (e = !1),
                !this.collect.destroyInstance && this._token.isTokenReady() && this.isReady) {
                    var t = this.storage.getItem(this.evtDataKey) || []
                        , i = this._mergeEvents(t);
                    this.storage.removeItem(this.evtDataKey),
                        this._dealData(i, e)
                }
            }
            ,
            e.prototype._mergeEvents = function(e) {
                var i = this;
                if (!e.length)
                    return e;
                var n = this.cfg.get();
                n.header.custom = JSON.stringify(n.header.custom);
                return N(e, function(e) {
                    return !i.closeStorage && !!e.params.__disable_storage__
                }, this.maxReport).map(function(e) {
                    return t({
                        events: e.map(function(e) {
                            try {
                                if (e.event && "applog_trace" !== e.event) {
                                    var n = t({}, i.cfg.get("evtParams"), e.params);
                                    delete n.__disable_storage__;
                                    var r = [];
                                    if (i.plugin && i.plugin.ab && i.plugin.ab.versions && i.plugin.ab.extVersions) {
                                        r = [];
                                        r = i.config.enable_multilink || -1 !== window.location.href.indexOf("multilink=true") ? i.plugin.ab.mulilinkVersions.concat(i.plugin.ab.extVersions) : i.plugin.ab.versions.concat(i.plugin.ab.extVersions)
                                    }
                                    return t({}, e, {
                                        params: JSON.stringify(n),
                                        ab_sdk_version: r.join(","),
                                        session_id: i.session._getSessionId()
                                    })
                                }
                                return t({}, e, {
                                    params: JSON.stringify(e.params)
                                })
                            } catch (i) {
                                return t({}, e, {
                                    params: JSON.stringify(e.params)
                                })
                            }
                        }),
                        user: n.user,
                        header: n.header
                    }, i.closeStorage ? {} : {
                        __disable_storage__: e[0].params.__disable_storage__
                    }, {
                        verbose: i.debugMode ? 1 : void 0,
                        local_time: parseInt("" + (new Date).getTime() / 1e3)
                    })
                })
            }
            ,
            e.prototype._dealData = function(e, t) {
                var i = this;
                if (!e.length)
                    return e;
                var n = [];
                n = N(e, function(e) {
                    return !!e.__disable_storage__
                }, this.maxReport),
                !this.closeStorage && this.plugin.maxStorage && this.plugin.maxStorage(n, this.maxStorage, this.evtDataKey, this.storage);
                var r = {};
                n.forEach(function(e) {
                    var n = E()
                        , o = e;
                    try {
                        i.filter && (o = i.filter(e))
                    } catch (e) {}
                    if (!i.closeStorage && !e[0].__disable_storage__) {
                        var s = JSON.parse(JSON.stringify(e));
                        s && s[0] && (s[0].header.__storage_index__ = Date.now()),
                            r[n] = s,
                            i.EventStorage.setItem(i.evtDataKey, r)
                    }
                    i._send(n, o, t)
                })
            }
            ,
            e.prototype._send = function(e, t, i) {
                var n = this;
                this.isSending = !0;
                var r = function() {
                    n.isSending = !1
                };
                if (!this.closeStorage)
                    try {
                        t && t[0] && t[0].header.__storage_index__ && delete (t = JSON.parse(JSON.stringify(t)))[0].header.__storage_index__
                    } catch (e) {}
                this.plugin && this.plugin.et_test && this.plugin.et_test.send(t),
                    O(this.reportUrl, this.timeout, t, this.config.app_key, function(t, i) {
                        if (r(),
                        n.plugin && !n.closeStorage) {
                            var o = n.EventStorage.getItem(n.evtDataKey) || {};
                            Object.keys(o).length ? (delete o[e],
                                n.EventStorage.setItem(n.evtDataKey, o)) : n.EventStorage.removeItem(n.evtDataKey)
                        }
                        t && 0 !== t.e && n.collect && n.collect.tracer && 1 !== n.cfg.staging && n.collect.tracer.addErrorCount(i, "f_data", t.e, t)
                    }, function(e, t) {
                        r(),
                            n.cfg.get("reportErrorCallback")(e, t),
                        n.collect && n.collect.tracer && 1 !== n.cfg.staging && n.collect.tracer.addErrorCount(e, "f_net", t),
                        n.plugin && n.plugin.monitor && n.plugin.monitor.sdkError(n.config.app_key, n.reportUrl, e, t)
                    }, !1, i, r),
                this.plugin && this.plugin.monitor && this.plugin.monitor.sdkOnload(this.config.app_key, this.reportUrl, t)
            }
            ,
            e.prototype.checkStorageEvent = function() {
                var e = this;
                try {
                    var t = this.EventStorage.getItem(this.evtDataKey) || {}
                        , i = Object.keys(t);
                    if (i.length > 0) {
                        setTimeout(function n() {
                            for (var r = [], o = 0; o < e.maxReport; o++)
                                i.length > 0 && r.push(i.shift());
                            r.length > 0 && r.forEach(function(i) {
                                e._send(i, t[i], !1)
                            }),
                                setTimeout(n, 5)
                        }, 5)
                    }
                } catch (e) {}
            }
            ,
            e
    }()
        , j = function(e, t) {
        var i, n, r = function(e) {
            var t = document.createElement("a");
            return t.href = e,
                t
        }, o = window.screen.width, s = window.screen.height, a = window.navigator.appVersion, c = window.navigator.userAgent, u = window.navigator.language, l = document.referrer, d = l ? r(l).hostname : "",
            p = function(e) {
            var t = r(e).search;
            t = t.slice(1);
            var i = {};
            return t.split("&").forEach(function(e) {
                var t, n, r = e.split("=");
                r.length && (t = r[0],
                    n = r[1]);
                try {
                    i[t] = decodeURIComponent(void 0 === n ? "" : n)
                } catch (e) {
                    i[t] = n
                }
            }),
                i
        }(window.location.href), f = "", _ = "", g = "", m = "" + parseFloat(a);
        -1 !== (i = c.indexOf("Opera")) && (g = "Opera",
            m = c.substring(i + 6),
        -1 !== (i = c.indexOf("Version")) && (m = c.substring(i + 8))),
            -1 !== (i = c.indexOf("Edge")) ? (g = "Microsoft Edge",
                m = c.substring(i + 5)) : -1 !== (i = c.indexOf("MSIE")) ? (g = "Microsoft Internet Explorer",
                m = c.substring(i + 5)) : -1 !== (i = c.indexOf("Lark")) ? (g = "Lark",
                m = c.substring(i + 5, i + 11)) : -1 !== c.indexOf("Chrome") ? -1 !== (i = c.indexOf("MicroMessenger")) ? (g = "weixin",
                m = c.substring(i + 15, i + 20)) : -1 !== (i = c.indexOf("MQQBrowser")) ? (g = "qqbrowser",
                m = c.substring(i + 11, i + 15)) : -1 !== (i = c.indexOf("360")) ? (g = "360browser",
                m = c.substring(c.indexOf("Chrome") + 7)) : -1 !== c.indexOf("baidubrowser") || -1 !== c.indexOf("BIDUBrowser") ? (-1 !== c.indexOf("baidubrowser") ? (i = c.indexOf("baidubrowser"),
                m = c.substring(i + 13, i + 16)) : -1 !== c.indexOf("BIDUBrowser") && (i = c.indexOf("BIDUBrowser"),
                m = c.substring(i + 12, i + 15)),
                g = "baidubrowser") : -1 !== (i = c.indexOf("xiaomi")) ? -1 !== c.indexOf("openlanguagexiaomi") ? (g = "openlanguage xiaomi",
                m = c.substring(i + 7, i + 13)) : (g = "xiaomi",
                m = c.substring(i - 7, i - 1)) : -1 !== (i = c.indexOf("TTWebView")) ? (g = "TTWebView",
                m = c.substring(i + 10, i + 23)) : -1 !== (i = c.indexOf("Chrome")) && (g = "Chrome",
                m = c.substring(i + 7)) : -1 !== c.indexOf("Safari") ? -1 !== (i = c.indexOf("QQ")) ? (g = "qqbrowser",
                m = c.substring(i + 10, i + 16)) : -1 !== (i = c.indexOf("Safari")) && (g = "Safari",
                m = c.substring(i + 7),
            -1 !== (i = c.indexOf("Version")) && (m = c.substring(i + 8))) : -1 !== (i = c.indexOf("Firefox")) ? (g = "Firefox",
                m = c.substring(i + 8)) : -1 !== (i = c.indexOf("MicroMessenger")) ? (g = "weixin",
                m = c.substring(i + 15, i + 20)) : -1 !== (i = c.indexOf("QQ")) && (g = "qqbrowser",
                m = c.substring(i + 3, i + 8)),
        -1 !== (n = m.indexOf(";")) && (m = m.substring(0, n)),
        -1 !== (n = m.indexOf(" ")) && (m = m.substring(0, n)),
        -1 !== (n = m.indexOf(")")) && (m = m.substring(0, n));
        for (var v, z, y = /Mobile|htc|mini|Android|iP(ad|od|hone)/.test(a) ? "wap" : "web", b = [{
            s: "Windows 10",
            r: /(Windows 10.0|Windows NT 10.0|Windows NT 10.1)/
        }, {
            s: "Windows 8.1",
            r: /(Windows 8.1|Windows NT 6.3)/
        }, {
            s: "Windows 8",
            r: /(Windows 8|Windows NT 6.2)/
        }, {
            s: "Windows 7",
            r: /(Windows 7|Windows NT 6.1)/
        }, {
            s: "Android",
            r: /Android/
        }, {
            s: "Sun OS",
            r: /SunOS/
        }, {
            s: "Linux",
            r: /(Linux|X11)/
        }, {
            s: "iOS",
            r: /(iPhone|iPad|iPod)/
        }, {
            s: "Mac OS X",
            r: /Mac OS X/
        }, {
            s: "Mac OS",
            r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
        }], k = 0; k < b.length; k++) {
            var w = b[k];
            if (w.r.test(c)) {
                f = w.s;
                break
            }
        }
        function S(e, t) {
            var i = e.exec(t);
            return i && i[1] ? i[1] : ""
        }
        switch (/Windows/.test(f) && (_ = S(/Windows (.*)/, f),
            f = "windows"),
            f) {
            case "Mac OS X":
                v = c,
                    _ = (z = RegExp("(?:^|[^A-Z0-9-_]|[^A-Z0-9-]_|sprd-)(?:" + "Mac[ +]OS[ +]X(?:[ /](?:Version )?(\\d+(?:[_\\.]\\d+)+))?" + ")", "i").exec(v)) ? z.slice(1)[0] : "",
                    f = "mac";
                break;
            case "Android":
                _ = function(e) {
                    var t = S(/Android ([\.\_\d]+)/, e);
                    return t || (t = S(/Android\/([\.\_\d]+)/, e)),
                        t
                }(c),
                    f = "android";
                break;
            case "iOS":
                _ = (_ = /OS (\d+)_(\d+)_?(\d+)?/.exec(a)) ? _[1] + "." + _[2] + "." + (0 | _[3]) : "",
                    f = "ios"
        }
        var I = function(e, t, i) {
            var n = new h(!1)
                , r = new h(!1,"session")
                , o = e ? "_tea_utm_cache_" + e : "_tea_utm_cache"
                , s = e ? "_$utm_from_url_" + e : "_$utm_from_url"
                , a = {}
                , c = ["tr_shareuser", "tr_admaster", "tr_param1", "tr_param2", "tr_param3", "tr_param4", "$utm_from_url"]
                , u = {
                utm_source: t.utm_source,
                utm_medium: t.utm_medium,
                utm_campaign: t.utm_campaign,
                utm_term: t.utm_term,
                utm_content: t.utm_content,
                tr_shareuser: t.tr_shareuser,
                tr_admaster: t.tr_admaster,
                tr_param1: t.tr_param1,
                tr_param2: t.tr_param2,
                tr_param3: t.tr_param3,
                tr_param4: t.tr_param4
            };
            try {
                var l = !1;
                for (var d in u)
                    u[d] && (-1 !== c.indexOf(d) ? (a.hasOwnProperty("tracer_data") || (a.tracer_data = {}),
                        a.tracer_data[d] = u[d]) : a[d] = u[d],
                        l = !0);
                if (l)
                    r.setItem(s, "1"),
                        n.setCookie(o, JSON.stringify(a), 7776e6, i);
                else {
                    var p = n.getCookie(o, i);
                    p && (a = JSON.parse(p))
                }
                r.getItem(s) && (a.hasOwnProperty("tracer_data") || (a.tracer_data = {}),
                    a.tracer_data.$utm_from_url = 1)
            } catch (e) {
                return u
            }
            return a
        }(e, p, t);
        return {
            browser: g,
            browser_version: m,
            platform: y,
            os_name: f,
            os_version: _,
            userAgent: c,
            screen_width: o,
            screen_height: s,
            device_model: function(e) {
                var t = "";
                try {
                    if ("android" === e)
                        navigator.userAgent.split(";").forEach(function(e) {
                            e.indexOf("Build/") > -1 && (t = e.slice(0, e.indexOf("Build/")))
                        });
                    else if ("ios" === e || "mac" === e || "windows" === e) {
                        var i = navigator.userAgent.replace("Mozilla/5.0 (", "")
                            , n = i.indexOf(";");
                        t = i.slice(0, n)
                    }
                } catch (e) {}
                return t.trim()
            }(f),
            language: u,
            referrer: l,
            referrer_host: d,
            utm_source: I.utm_source,
            utm_medium: I.utm_medium,
            utm_campaign: I.utm_campaign,
            utm_term: I.utm_term,
            utm_content: I.utm_content,
            tracer_data: I.tracer_data
        }
    }
        , D = void 0
        , B = (new Date).getTimezoneOffset()
        , P = parseInt("" + -B / 60, 10)
        , q = 60 * B
        , U = function() {
        function e(e, t, i) {
            this.cookieDomain = t.cookie_domain || "",
                this.initConfig = t;
            var n = j(e, this.cookieDomain);
            this.configKey = g("" + e),
                this.sessionStorage = new h(!1,"session"),
                this.localStorage = new h(!1,"local"),
            i && (this.storage = 1 === i ? this.sessionStorage : this.localStorage),
                this.envInfo = {
                    user: {
                        user_unique_id: D,
                        user_type: D,
                        user_id: D,
                        user_is_auth: D,
                        user_is_login: D,
                        device_id: D,
                        web_id: D,
                        ip_addr_id: D,
                        ssid: D
                    },
                    header: {
                        app_id: D,
                        app_name: D,
                        app_install_id: D,
                        install_id: D,
                        app_package: D,
                        app_channel: D,
                        app_version: D,
                        os_name: n.os_name,
                        os_version: n.os_version,
                        device_model: n.device_model,
                        ab_client: D,
                        ab_version: D,
                        ab_sdk_version: D,
                        traffic_type: D,
                        client_ip: D,
                        device_brand: D,
                        os_api: D,
                        access: D,
                        language: n.language,
                        region: D,
                        app_language: D,
                        app_region: D,
                        creative_id: D,
                        ad_id: D,
                        campaign_id: D,
                        log_type: D,
                        rnd: D,
                        platform: n.platform,
                        sdk_version: p,
                        sdk_lib: "js",
                        province: D,
                        city: D,
                        timezone: P,
                        tz_offset: q,
                        tz_name: D,
                        sim_region: D,
                        carrier: D,
                        resolution: n.screen_width + "x" + n.screen_height,
                        browser: n.browser,
                        browser_version: n.browser_version,
                        referrer: n.referrer,
                        referrer_host: n.referrer_host,
                        width: n.screen_width,
                        height: n.screen_height,
                        screen_width: n.screen_width,
                        screen_height: n.screen_height,
                        utm_term: n.utm_term,
                        utm_content: n.utm_content,
                        utm_source: n.utm_source,
                        utm_medium: n.utm_medium,
                        utm_campaign: n.utm_campaign,
                        tracer_data: JSON.stringify(n.tracer_data),
                        custom: {}
                    }
                },
                this.evtParams = {},
                this.reportErrorCallback = function() {}
        }
        return e.prototype.set = function(e, i) {
            var n = this;
            if (null == i && (this.delete(e),
                i = void 0),
            "evtParams" === e || "_staging_flag" === e) {
                var r;
                r = "evtParams" === e ? i : {
                    _staging_flag: Number(i)
                };
                var o = t({}, r);
                Object.keys(o).forEach(function(e) {
                    n.evtParams[e] = o[e]
                })
            } else if ("reportErrorCallback" === e && "function" == typeof i)
                this.reportErrorCallback = i;
            else {
                var s = "";
                if (e.indexOf(".") > -1) {
                    var a = e.split(".");
                    s = a[0],
                        e = a[1]
                }
                if ("user_unique_id" === e) {
                    if (!i)
                        return;
                    if (-1 !== ["0", "Null", "None", "", "undefined"].indexOf(i))
                        return
                }
                if ("os_version" === e && (e = "" + i),
                "web_id" === e) {
                    if (!i)
                        return;
                    (!this.envInfo.user.user_unique_id || this.envInfo.user.user_unique_id && this.envInfo.user.user_unique_id === this.envInfo.user.web_id) && (this.envInfo.user.user_unique_id = i)
                }
                s ? "user" === s || "header" === s ? this.envInfo[s][e] = i : this.envInfo.header.custom[e] = i : this.envInfo.user.hasOwnProperty(e) ? ["user_type", "ip_addr_id"].indexOf(e) > -1 ? this.envInfo.user[e] = i ? Number(i) : i : ["user_id", "web_id", "user_unique_id", "ssid"].indexOf(e) > -1 ? this.envInfo.user[e] = i ? String(i) : i : ["user_is_auth", "user_is_login"].indexOf(e) > -1 ? this.envInfo.user[e] = Boolean(i) : "device_id" === e && (this.envInfo.user[e] = i) : this.envInfo.header.hasOwnProperty(e) ? this.envInfo.header[e] = i : this.envInfo.header.custom[e] = i
            }
        }
            ,
            e.prototype.get = function(e) {
                try {
                    return e ? "evtParams" === e ? this.evtParams : "reportErrorCallback" === e ? this[e] : JSON.parse(JSON.stringify(this.envInfo[e])) : JSON.parse(JSON.stringify(this.envInfo))
                } catch (e) {
                    console.log("get config stringify error ")
                }
            }
            ,
            e.prototype.setStore = function(e) {
                try {
                    var t = this.storage.getItem(this.configKey);
                    if (Object.keys(e).length) {
                        var i = Object.assign(e, t);
                        this.storage.setItem(this.configKey, i)
                    }
                } catch (e) {}
            }
            ,
            e.prototype.getStore = function() {
                try {
                    var e = this.storage.getItem(this.configKey);
                    return Object.keys(e).length ? e : null
                } catch (e) {
                    return null
                }
            }
            ,
            e.prototype.delete = function(e) {
                try {
                    var t = this.storage.getItem(this.configKey);
                    t && t.hasOwnProperty(e) && (delete t[e],
                        this.storage.setItem(this.configKey, t))
                } catch (e) {}
            }
            ,
            e
    }()
        , J = function() {
        function e(e, t) {
            this.isLog = t || !1,
                this.name = e || ""
        }
        var t = e.prototype;
        return t.info = function(e) {
            this.isLog && console.log("[" + this.name + "] " + e)
        }
            ,
            t.warn = function(e) {
                this.isLog && console.warn("[" + this.name + "] " + e)
            }
            ,
            t.error = function(e) {
                this.isLog && console.error("[" + this.name + "] " + e)
            }
            ,
            t.throw = function(e) {
                throw this.error(this.name),
                    new Error(e)
            }
            ,
            e
    }()
        , L = function() {
        function e() {
            this._hooks = {}
        }
        return e.prototype.on = function(e, t) {
            e && t && "function" == typeof t && (this._hooks[e] || (this._hooks[e] = []),
                this._hooks[e].push(t))
        }
            ,
            e.prototype.once = function(e, t) {
                var i = this;
                if (e && t && "function" == typeof t) {
                    this.on(e, function n(r) {
                        t(r),
                            i.off(e, n)
                    })
                }
            }
            ,
            e.prototype.off = function(e, t) {
                if (e && this._hooks[e] && this._hooks[e].length)
                    if (t) {
                        var i = this._hooks[e].indexOf(t);
                        -1 !== i && this._hooks[e].splice(i, 1)
                    } else
                        this._hooks[e] = []
            }
            ,
            e.prototype.emit = function(e, t) {
                e && this._hooks[e] && this._hooks[e].length && n(this._hooks[e]).forEach(function(e) {
                    try {
                        e(t)
                    } catch (e) {}
                })
            }
            ,
            e
    }()
        , R = function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
            var t = 16 * Math.random() | 0;
            return ("x" === e ? t : 3 & t | 8).toString(16)
        })
    }
        , M = function() {
        function e(e, t) {
            this.storage = new h(!1,"session"),
                this.sessionKey = m(e),
                this.expireTime = t.expireTime || 18e5,
                this.disableSession = t.disable_session,
            this.disableSession || this._setSessionId()
        }
        return e.prototype._updateSessionId = function() {
            var e = this.storage.getItem(this.sessionKey);
            if (e && e.sessionId) {
                var t = e.timestamp;
                Date.now() - t > this.expireTime ? e = {
                    sessionId: R(),
                    timestamp: Date.now()
                } : e.timestamp = Date.now(),
                    this.storage.setItem(this.sessionKey, e),
                    this._resetExpTime()
            }
        }
            ,
            e.prototype._setSessionId = function() {
                var e = this
                    , t = this.storage.getItem(this.sessionKey);
                t && t.sessionId ? t.timestamp = Date.now() : t = {
                    sessionId: R(),
                    timestamp: Date.now()
                },
                    this.storage.setItem(this.sessionKey, t),
                    this.sessionExp = setInterval(function() {
                        e._checkEXp()
                    }, this.expireTime)
            }
            ,
            e.prototype._getSessionId = function() {
                var e = this.storage.getItem(this.sessionKey);
                return this.disableSession ? "" : e && e.sessionId ? e.sessionId : ""
            }
            ,
            e.prototype._resetExpTime = function() {
                var e = this;
                this.sessionExp && (clearInterval(this.sessionExp),
                    this.sessionExp = setInterval(function() {
                        e._checkEXp()
                    }, this.expireTime))
            }
            ,
            e.prototype._resetSessionId = function() {
                var e = {
                    sessionId: R(),
                    timestamp: Date.now()
                };
                this.storage.setItem(this.sessionKey, e)
            }
            ,
            e.prototype._checkEXp = function() {
                var e = this.storage.getItem(this.sessionKey);
                e && e.sessionId && (Date.now() - e.timestamp + 30 >= this.expireTime && (e = {
                    sessionId: R(),
                    timestamp: Date.now()
                },
                    this.storage.setItem(this.sessionKey, e)))
            }
            ,
            e
    }()
        , K = {
        pv: ["predefine_pageview"],
        sdk: ["_be_active", "predefine_page_alive", "predefine_page_close", "__profile_set", "__profile_set_once", "__profile_increment", "__profile_unset", "__profile_append"],
        autotrack: ["bav2b_click", "bav2b_page", "bav2b_beat", "bav2b_page_statistics", "__bav_click", "__bav_page", "__bav_beat", "__bav_page_statistics"]
    }
        , W = function() {
        function e(e, t, i, n) {
            this.count = {
                pv: 0,
                sdk: 0,
                autotrack: 0,
                log: 0
            },
                this.limit = {
                    pv: 1,
                    sdk: 10,
                    autotrack: 10,
                    log: 3
                },
                this.errorCode = {
                    f_net: 0,
                    f_data: 0
                },
                this.errorInfo = {
                    pv: {
                        f_net: 0,
                        f_data: 0
                    },
                    sdk: {
                        f_net: 0,
                        f_data: 0
                    },
                    autotrack: {
                        f_net: 0,
                        f_data: 0
                    },
                    log: {
                        f_net: 0,
                        f_data: 0
                    }
                },
                this.collect = e,
                this.disable_tracer = t.disable_tracer || t.channel_domain,
                this.ready = !(!t.app_id || this.disable_tracer),
                this.appid = t.app_id,
                this.process = i,
                this.event = n;
            var r = t.channel_domain || T(u[t.channel]);
            this.reportUrl = t.report_url ? t.report_url : "" + r + d,
                this.listener()
        }
        return e.prototype.addCount = function(e) {
            try {
                if (!this.ready)
                    return;
                if (this.count[e]++,
                this.count[e] >= this.limit[e]) {
                    var t = [];
                    for (var i in t = n(t, this.processTracer(this.count[e], e, "net")),
                        this.errorInfo[e])
                        this.errorInfo[i] && (t = n(t, this.processTracer(this.errorInfo[e][i], e, i)));
                    t.length && this.sendTracer(t, !0, e, !1)
                }
            } catch (e) {}
        }
            ,
            e.prototype.addErrorCount = function(e, t, i, n) {
                var r = this;
                try {
                    if (!this.ready)
                        return;
                    if (e && e.length) {
                        var o = e[0].events;
                        o && o.length && ("f_data" === t ? (n && n.hasOwnProperty("sc") ? this.errorInfo.log.f_data = o.length - n.sc : this.errorInfo.log.f_data = o.length,
                            this.errorCode.f_data = i) : o.forEach(function(e) {
                            var t = "log";
                            for (var n in K)
                                if (-1 !== K[n].indexOf(e.event)) {
                                    t = n;
                                    break
                                }
                            r.errorInfo[t].f_net++,
                                r.errorCode.f_net = i
                        }))
                    }
                } catch (e) {}
            }
            ,
            e.prototype.clearCount = function(e) {
                try {
                    e ? (this.count[e] = 0,
                        this.errorInfo[e] = {
                            f_net: 0,
                            f_data: 0
                        }) : (this.count = {
                        pv: 0,
                        sdk: 0,
                        autotrack: 0,
                        log: 0
                    },
                        this.errorInfo = {
                            pv: {
                                f_net: 0,
                                f_data: 0
                            },
                            sdk: {
                                f_net: 0,
                                f_data: 0
                            },
                            autotrack: {
                                f_net: 0,
                                f_data: 0
                            },
                            log: {
                                f_net: 0,
                                f_data: 0
                            }
                        })
                } catch (e) {}
            }
            ,
            e.prototype.sendTracer = function(e, t, i, n) {
                try {
                    if (!this.ready)
                        return;
                    if (this.collect.staging)
                        return;
                    var r = this.event._mergeEvents(e);
                    n && window.navigator.sendBeacon ? window.navigator.sendBeacon(this.reportUrl, JSON.stringify(r)) : O(this.reportUrl, 3e5, r, ""),
                        t ? this.clearCount(i) : this.clearCount()
                } catch (e) {}
            }
            ,
            e.prototype.processTracer = function(e, t, i) {
                try {
                    var n = {
                        count: e,
                        state: i,
                        key: t,
                        params_for_special: "applog_trace",
                        aid: this.appid,
                        platform: "web",
                        _staging_flag: 1,
                        sdk_version: p
                    };
                    "f_net" !== i && "f_data" !== i || (n.errorCode = this.errorCode[i]);
                    var r = [];
                    if (r.push(this.process("applog_trace", n, !0)),
                    r && r.length)
                        return delete r[0].is_bav,
                            r
                } catch (e) {}
            }
            ,
            e.prototype.listener = function() {
                var e = this;
                this.ready && (document.addEventListener("visibilitychange", function() {
                    e.leavePage()
                }),
                    A(function() {
                        e.leavePage()
                    }))
            }
            ,
            e.prototype.leavePage = function() {
                if (this.ready)
                    try {
                        var e = [];
                        for (var t in this.count)
                            if (this.count[t]) {
                                var i = this.errorInfo[t];
                                for (var r in e = n(e, this.processTracer(this.count[t], t, "net")),
                                    i)
                                    i[r] && (e = n(e, this.processTracer(i[r], t, r)))
                            }
                        e && e.length && this.sendTracer(e, !1, "", !0)
                    } catch (e) {}
            }
            ,
            e
    }()
        , H = function() {
        function e(e) {
            this.logger = e
        }
        var t = e.prototype;
        return t.bridgeInject = function() {
            try {
                return AppLogBridge ? (this.logger.info("AppLogBridge is injected"),
                    !0) : (this.logger.info("AppLogBridge is not inject"),
                    !1)
            } catch (e) {
                return this.logger.info("AppLogBridge is not inject"),
                    !1
            }
        }
            ,
            t.hasStarted = function(e) {
                var t = this;
                try {
                    this.bridgeInject() ? AppLogBridge.hasStarted(function(i) {
                        t.logger.info("AppLogBridge is started? : " + i),
                            e(i)
                    }) : e(0)
                } catch (t) {
                    this.logger.info("AppLogBridge, error:" + JSON.stringify(t.stack)),
                        e(0)
                }
            }
            ,
            t.setUserUniqueId = function(e) {
                try {
                    AppLogBridge.setUserUniqueId(e)
                } catch (e) {
                    this.logger.error("setUserUniqueId error")
                }
            }
            ,
            t.addHeaderInfo = function(e, t) {
                try {
                    AppLogBridge.addHeaderInfo(e, t)
                } catch (e) {
                    this.logger.error("addHeaderInfo error")
                }
            }
            ,
            t.setHeaderInfo = function(e) {
                try {
                    AppLogBridge.setHeaderInfo(JSON.stringify(e))
                } catch (e) {
                    this.logger.error("setHeaderInfo error")
                }
            }
            ,
            t.removeHeaderInfo = function(e) {
                try {
                    AppLogBridge.removeHeaderInfo(e)
                } catch (e) {
                    this.logger.error("removeHeaderInfo error")
                }
            }
            ,
            t.onEventV3 = function(e, t) {
                try {
                    AppLogBridge.onEventV3(e, t)
                } catch (e) {
                    this.logger.error("onEventV3 error")
                }
            }
            ,
            t.profileSet = function(e) {
                try {
                    AppLogBridge.profileSet(e)
                } catch (e) {
                    this.logger.error("profileSet error")
                }
            }
            ,
            t.profileSetOnce = function(e) {
                try {
                    AppLogBridge.profileSetOnce(e)
                } catch (e) {
                    this.logger.error("profileSetOnce error")
                }
            }
            ,
            t.profileIncrement = function(e) {
                try {
                    AppLogBridge.profileIncrement(e)
                } catch (e) {
                    this.logger.error("profileIncrement error")
                }
            }
            ,
            t.profileUnset = function(e) {
                try {
                    AppLogBridge.profileUnset(e)
                } catch (e) {
                    this.logger.error("profileUnset error")
                }
            }
            ,
            t.profileAppend = function(e) {
                try {
                    AppLogBridge.profileAppend(e)
                } catch (e) {
                    this.logger.error("profileAppend error")
                }
            }
            ,
            e
    }()
        , Q = function() {
        function e(e, t, i) {
            this.processEvent = e,
                this._event = t,
                this.cache = {},
                this.duration = 6e4,
                this.profileReady = !1,
                this.reportUrl = (i.channel_domain || T(u[i.channel])) + "/profile/list"
        }
        return e.prototype.start = function() {
            this.profileReady = !0
        }
            ,
            e.prototype.report = function(e, t) {
                void 0 === t && (t = {});
                try {
                    var i = [];
                    i.push(this.processEvent(e, t));
                    var n = this._event._mergeEvents(i);
                    O(this.reportUrl, 3e5, n)
                } catch (e) {}
            }
            ,
            e.prototype.setProfile = function(e) {
                var i = this._formatParams(e);
                i && Object.keys(i).length && (this._pushCache(i),
                    this.report("__profile_set", t({}, i, {
                        profile: !0
                    })))
            }
            ,
            e.prototype.setOnceProfile = function(e) {
                var i = this._formatParams(e, !0);
                i && Object.keys(i).length && (this._pushCache(i),
                    this.report("__profile_set_once", t({}, i, {
                        profile: !0
                    })))
            }
            ,
            e.prototype.incrementProfile = function(e) {
                e ? this.report("__profile_increment", t({}, e, {
                    profile: !0
                })) : console.warn("please check the params, must be object!!!")
            }
            ,
            e.prototype.unsetProfile = function(e) {
                if (e) {
                    var i = {};
                    i[e] = "1",
                        this.report("__profile_unset", t({}, i, {
                            profile: !0
                        }))
                } else
                    console.warn("please check the key, must be string!!!")
            }
            ,
            e.prototype.appendProfile = function(e) {
                if (e) {
                    var i = {};
                    for (var n in e)
                        "string" == typeof e[n] || "Array" === Object.prototype.toString.call(e[n]).slice(8, -1) ? i[n] = e[n] : console.warn("please check the value of param: " + n + ", must be string or array !!!");
                    Object.keys(i).length && this.report("__profile_append", t({}, i, {
                        profile: !0
                    }))
                } else
                    console.warn("please check the params, must be object!!!")
            }
            ,
            e.prototype._pushCache = function(e) {
                var t = this;
                Object.keys(e).forEach(function(i) {
                    t.cache[i] = {
                        val: t._clone(e[i]),
                        timestamp: Date.now()
                    }
                })
            }
            ,
            e.prototype._formatParams = function(e, t) {
                var i = this;
                void 0 === t && (t = !1);
                try {
                    if (!e || "[object Object]" !== Object.prototype.toString.call(e))
                        return void console.warn("please check the params type, must be object !!!");
                    var n = {};
                    for (var r in e)
                        "string" == typeof e[r] || "number" == typeof e[r] || "Array" === Object.prototype.toString.call(e[r]).slice(8, -1) ? n[r] = e[r] : console.warn("please check the value of params:" + r + ", must be string,number,Array !!!");
                    var o = Object.keys(n);
                    if (!o.length)
                        return;
                    var s = Date.now();
                    return o.filter(function(n) {
                        var r = i.cache[n];
                        return t ? !r : !(r && i._compare(r.val, e[n]) && s - r.timestamp < i.duration)
                    }).reduce(function(e, t) {
                        return e[t] = n[t],
                            e
                    }, {})
                } catch (e) {}
            }
            ,
            e.prototype._compare = function(e, t) {
                try {
                    return JSON.stringify(e) === JSON.stringify(t)
                } catch (e) {
                    return !1
                }
            }
            ,
            e.prototype._clone = function(e) {
                try {
                    return JSON.parse(JSON.stringify(e))
                } catch (t) {
                    return e
                }
            }
            ,
            e.prototype._unReady = function() {
                console.warn("sdk is not ready, please use this api after start")
            }
            ,
            e
    }()
        , F = "undefined" != typeof window ? (window.TeaPluginObject || (window.TeaPluginObject = {}),
        window.TeaPluginObject) : null
        , X = function() {
        function e(e, t, i, n) {
            this._plugin = {},
                this.config = e,
                this.event = t,
                this.beconEvent = i,
                this.hook = n,
                this.channel = e.channel || "cn"
        }
        return e.prototype.loadExtend = function(e) {
            var t = this;
            try {
                e && e.length && e.forEach(function(e) {
                    if (z.hasOwnProperty(e)) {
                        var i = T(z[e].src[t.channel]) + "?query=" + Date.now();
                        t.loadPlugin(e, i, function() {
                            try {
                                var i = z[e].object;
                                F[i] && F[i](t.config, t.event.bind(t), t.beconEvent.bind(t), t.hook)
                            } catch (e) {}
                            console.log("load " + e + " success")
                        }, function() {
                            console.log("load " + e + " error")
                        })
                    }
                })
            } catch (e) {}
        }
            ,
            e.prototype.loadPlugin = function(e, t, i, n) {
                var r = this;
                try {
                    var o = document.createElement("script");
                    o.src = t,
                    this._plugin[e] || (this._plugin[e] = []),
                        this._plugin[e].push(i),
                        o.onerror = function() {
                            n(t)
                        }
                        ,
                        o.onload = function() {
                            r._plugin[e].forEach(function(e) {
                                e()
                            })
                        }
                        ,
                        document.getElementsByTagName("head")[0].appendChild(o)
                } catch (e) {}
            }
            ,
            e
    }();
    function $(e, t, i) {
        return {
            title: t || document.title || location.pathname,
            url: i || location.href,
            url_path: e || location.pathname
        }
    }
    function G() {
        return Date.now()
    }
    function Z() {
        var e = v();
        return window[e] ? window[e].l : G()
    }
    function Y() {
        var e = !1;
        return ["hidden", "msHidden", "webkitHidden"].forEach(function(t) {
            void 0 !== document[t] && (e = !0)
        }),
            e
    }
    var ee = function() {
        function e(e, i) {
            var n = this;
            this._sendEvent = function(e) {
                void 0 === e && (e = !1);
                var i = e ? n.options.aliveDTime : G() - n.sessionStartTime;
                i < 0 || G() - n.pageStartTime > n.options.maxDuration || (n.event("predefine_page_alive", t({}, $(n.url_path, n.title, n.url), {
                    duration: i,
                    is_support_visibility_change: n.options.sup_vis_change ? 1 : 0,
                    startTime: n.sessionStartTime
                }), "sdk"),
                    n.sessionStartTime = G())
            }
                ,
                this._setUpTimer = function() {
                    return n.timerHandler && clearInterval(n.timerHandler),
                        setInterval(function() {
                            G() - n.sessionStartTime > n.options.aliveDTime && n._sendEvent(!0)
                        }, 1e3)
                }
                ,
                this._visibilitychange = function() {
                    "hidden" === document.visibilityState ? n.timerHandler && (clearInterval(n.timerHandler),
                        n._sendEvent()) : "visible" === document.visibilityState && (n.sessionStartTime = G(),
                        n.timerHandler = n._setUpTimer())
                }
                ,
                this._beforeunload = function() {
                    document.hidden || n._sendEvent()
                }
                ,
                this._wtest = function() {
                    document.getElementById("wtest").innerHTML = "visibilitychange"
                }
                ,
                this._dtest = function() {
                    document.getElementById("dtest").innerHTML = "dvisibilitychange"
                }
                ,
                this.event = e,
                this.config = i,
                this.isSupVisChange = Y(),
                this.options = {
                    maxDuration: 432e5,
                    aliveDTime: 6e4,
                    sup_vis_change: Y()
                },
                this.pageStartTime = Z(),
                this.sessionStartTime = this.pageStartTime,
                this.timerHandler = null,
                this.disableCallback = function() {}
        }
        return e.prototype.enable = function(e, t, i) {
            this.url_path = e,
                this.url = i,
                this.title = t,
                this.disableCallback = this._enablePageAlive()
        }
            ,
            e.prototype.disable = function() {
                this.disableCallback(),
                    this.pageStartTime = Date.now()
            }
            ,
            e.prototype._enablePageAlive = function() {
                var e = this;
                return this.timerHandler = this._setUpTimer(),
                    document.addEventListener("visibilitychange", this._visibilitychange),
                    A(this._beforeunload),
                    function() {
                        e._beforeunload(),
                            document.removeEventListener("visibilitychange", e._visibilitychange),
                            window.removeEventListener("beforeunload", e._beforeunload),
                            window.removeEventListener("pagehide", e._beforeunload)
                    }
            }
            ,
            e
    }()
        , te = function() {
        function e(e, t) {
            var i = this;
            this._visibilitychange = function() {
                "hidden" === document.visibilityState ? i.activeEndTime = G() : "visible" === document.visibilityState && (i.activeEndTime && (i.totalTime += i.activeEndTime - i.activeStartTime,
                    i.activeTimes += 1),
                    i.activeEndTime = void 0,
                    i.activeStartTime = G())
            }
                ,
                this._beforeunload = function() {
                    if (i.totalTime += (i.activeEndTime || G()) - i.activeStartTime,
                        i.config.autotrack) {
                        try {
                            window.sessionStorage.setItem("_tea_cache_duration", JSON.stringify({
                                duration: i.totalTime,
                                page_title: document.title || location.pathname
                            }))
                        } catch (e) {}
                    }
                    i._sendEventPageClose()
                }
                ,
                this.event = e,
                this.config = t,
                this.isSupVisChange = Y(),
                this.options = {
                    sup_vis_change: this.isSupVisChange
                },
                this.maxDuration = t.maxDuration || 864e5,
                this.disableCallback = function() {}
                ,
                this.pageStartTime = Z(),
                this._resetData()
        }
        return e.prototype.enable = function(e, t, i) {
            this.url_path = e,
                this.url = i,
                this.title = t,
                this.disableCallback = this._enablePageClose()
        }
            ,
            e.prototype.disable = function() {
                this.disableCallback()
            }
            ,
            e.prototype._resetData = function() {
                this.activeStartTime = void 0 === this.activeStartTime ? Z() : Date.now(),
                    this.activeEndTime = void 0,
                    this.activeTimes = 1,
                    this.totalTime = 0
            }
            ,
            e.prototype._sendEventPageClose = function() {
                var e = G() - this.pageStartTime;
                this.totalTime < 0 || e < 0 || this.totalTime >= this.maxDuration || (this.event("predefine_page_close", t({}, $(this.url_path, this.title, this.url), {
                    active_times: this.activeTimes,
                    duration: this.totalTime,
                    total_duration: e,
                    is_support_visibility_change: this.options.sup_vis_change ? 1 : 0
                }), "sdk"),
                    this.pageStartTime = Date.now(),
                    this._resetData())
            }
            ,
            e.prototype._enablePageClose = function() {
                var e = this;
                return document.addEventListener("visibilitychange", this._visibilitychange),
                    A(this._beforeunload),
                    function() {
                        e._beforeunload(),
                            document.removeEventListener("visibilitychange", e._visibilitychange),
                            window.removeEventListener("beforeunload", e._beforeunload),
                            window.removeEventListener("pagehide", e._beforeunload)
                    }
            }
            ,
            e
    }()
        , ie = function() {
        function e(e, t) {
            this.pageAlive = new ee(e,t),
                this.pageClose = new te(e,t),
                this.title = document.title || location.pathname,
                this.url = location.href,
                this.url_path = location.pathname,
                this._enable(this.url_path, this.title, this.url)
        }
        return e.prototype._enable = function(e, t, i) {
            this.pageAlive.enable(e, t, i),
                this.pageClose.enable(e, t, i)
        }
            ,
            e.prototype._disable = function() {
                this.pageAlive.disable(),
                    this.pageClose.disable()
            }
            ,
            e.prototype.reset = function(e, t, i) {
                this._disable(),
                    this._enable(e, t, i)
            }
            ,
            e
    }();
    var ne = function() {
        function e(e) {
            var t = this;
            this._setInterval = function() {
                t._clearIntervalFunc = function(e, t) {
                    void 0 === e && (e = function() {}
                    ),
                    void 0 === t && (t = 1e3);
                    var i, n = Date.now() + t;
                    return i = window.setTimeout(function r() {
                        var o = Date.now() - n;
                        e(),
                            n += t,
                            i = window.setTimeout(r, Math.max(0, t - o))
                    }, t),
                        function() {
                            window.clearTimeout(i)
                        }
                }(function() {
                    t._isSessionhasEvent && t._endCurrentSession()
                }, t.sessionInterval)
            }
                ,
                this._clearInterval = function() {
                    t._clearIntervalFunc && t._clearIntervalFunc()
                }
                ,
                this.sessionInterval = 6e4,
                this._eventSenderFunc = e,
                this._startTime = 0,
                this._lastTime = 0,
                this._setInterval()
        }
        return e.prototype._endCurrentSession = function() {
            this._eventSenderFunc("_be_active", {
                start_time: this._startTime,
                end_time: this._lastTime,
                url: window.location.href,
                referrer: window.document.referrer
            }, "sdk"),
                this._isSessionhasEvent = !1,
                this._startTime = 0
        }
            ,
            e.prototype.process = function() {
                this._isSessionhasEvent || (this._isSessionhasEvent = !0,
                    this._startTime = +new Date);
                var e = this._lastTime || +new Date;
                this._lastTime = +new Date,
                this._lastTime - e > this.sessionInterval && (this._clearInterval(),
                    this._endCurrentSession(),
                    this._setInterval())
            }
            ,
            e
    }();
    var re = function() {
        function e(e) {
            this.config = e
        }
        return e.prototype.sdkOnload = function(e, t, i) {
            if (!this.sdkReady) {
                this.sdkReady = !0;
                try {
                    if (0 === i.length)
                        return;
                    var n = i[0]
                        , r = n.header
                        , o = n.user
                        , s = r.app_id
                        , a = r.app_name
                        , c = r.sdk_version
                        , h = o.web_id
                        , u = {
                        events: [{
                            event: "onload",
                            params: JSON.stringify({
                                app_key: e,
                                app_id: s,
                                app_name: a || "",
                                sdk_version: c,
                                sdk_type: "script",
                                sdk_config: this.config
                            }),
                            local_time_ms: Date.now()
                        }],
                        user: {
                            user_unique_id: h
                        },
                        header: {}
                    };
                    setTimeout(function() {
                        O(t, 3e4, [u], "566f58151b0ed37e")
                    }, 16)
                } catch (e) {}
            }
        }
            ,
            e.prototype.sdkError = function(e, t, i, n) {
                try {
                    var r = i[0]
                        , o = r.user
                        , s = r.header
                        , a = [];
                    i.forEach(function(e) {
                        e.events.forEach(function(e) {
                            a.push(e)
                        })
                    });
                    var c = {
                        events: a.map(function(t) {
                            return {
                                event: "on_error",
                                params: JSON.stringify({
                                    error_code: n,
                                    app_key: e,
                                    app_id: s.app_id,
                                    app_name: s.app_name || "",
                                    error_event: t.event,
                                    sdk_version: s.sdk_version,
                                    local_time_ms: t.local_time_ms,
                                    tea_event_index: Date.now(),
                                    params: t.params,
                                    header: JSON.stringify(s),
                                    user: JSON.stringify(o)
                                }),
                                local_time_ms: Date.now()
                            }
                        }),
                        user: {
                            user_unique_id: o.user_unique_id
                        },
                        header: {}
                    };
                    setTimeout(function() {
                        O(t, 3e4, [c], "566f58151b0ed37e")
                    }, 16)
                } catch (e) {}
            }
            ,
            e
    }()
        , oe = function() {
        try {
            var e = JSON.parse(atob(window.name));
            return e && e.href ? e.href : ""
        } catch (e) {
            return ""
        }
    };
    var se = new h(!1)
        , ae = function(e) {
        return "__tea_sdk_ab_version_" + e
    }
        , ce = function(e) {
        var t = {
            ab_version: [],
            ab_ext_version: [],
            ab_version_multilink: [],
            data: null,
            timestamp: +new Date
        };
        try {
            t = se.getItem(ae(e)) || t
        } catch (e) {}
        return t
    }
        , he = function(e, i) {
        try {
            var n = ce(e);
            se.setItem(ae(e), t({}, n, i))
        } catch (e) {}
    }
        , ue = function(e, t, i) {
        void 0 === i && (i = !1);
        var n = i ? {
            ab_ext_version: t,
            timestamp: Date.now()
        } : {
            ab_version: t,
            timestamp: Date.now()
        };
        he(e, n)
    }
        , le = {}
        , de = []
        , pe = function(e) {
        e.length && e.forEach(function(e) {
            de.push(e)
        })
    };
    function fe(e, t, i, n) {
        var r = e && e.source || window.opener || window.parent
            , o = e && e.origin || n || "*"
            , s = {
            type: t,
            payload: i
        };
        r.postMessage(JSON.stringify(s), o)
    }
    function _e(e, t) {
        le[e] = le[e] || [],
            le[e].push(t)
    }
    function ge(e) {
        if (de.some(function(e) {
            return "*" === e
        }) || de.some(function(t) {
            return e.origin.indexOf(t) > -1
        })) {
            var t = e.data;
            if ("string" == typeof e.data)
                try {
                    t = JSON.parse(e.data)
                } catch (e) {
                    t = void 0
                }
            if (!t)
                return;
            var i = t.type
                , n = t.payload;
            le[i] && le[i].forEach(function(t) {
                "function" == typeof t && t(e, n)
            })
        }
    }
    function me(e, t, i) {
        var n = document.createElement("script");
        n.src = e,
            n.onerror = function() {
                i(e)
            }
            ,
            n.onload = function() {
                t()
            }
            ,
            document.getElementsByTagName("head")[0].appendChild(n)
    }
    window.TEAVisualEditor = window.TEAVisualEditor || {};
    var ve = ""
        , ze = !1;
    function ye(e) {
        var t = e.event
            , i = e.editorUrl;
        e.collectInstance,
            e.fromSession;
        ze || (ze = !0,
            me(i, function() {
                fe(t, "abEditorScriptloadSuccess")
            }, function() {
                t && fe(t, "abEditorScriptloadError"),
                    ze = !1
            }))
    }
    function be(e, t, i, n) {
        pe(["*"]);
        var r, o, s, a = "";
        r = n,
            o = p,
            (window.opener || window.parent).postMessage("[tea-sdk]ready", "*"),
            (window.opener || window.parent).postMessage({
                type: "tea:sdk:info",
                config: r,
                version: o
            }, "*"),
            window.addEventListener("message", ge, !1);
        var c = "";
        try {
            var h = window.performance.getEntriesByType("resource");
            if (h && h.length && (h.forEach(function(e) {
                "script" === e.initiatorType && e.name && -1 !== e.name.indexOf("collect") && (c = e.name)
            }),
            c || document.currentScript && (c = document.currentScript.src),
            c && (s = c.split("/")) && s.length)) {
                a = "https:/";
                for (var u = 2; u < s.length && u !== s.length - 1; u++)
                    a = a + "/" + s[u];
                a += "/visual-ab-core"
            }
        } catch (e) {}
        _e("tea:openVisualABEditor", function(n) {
            var r = n.data;
            if ("string" == typeof n.data)
                try {
                    r = JSON.parse(n.data)
                } catch (e) {
                    r = void 0
                }
            if (r) {
                var o = r.lang;
                if (r.appId !== t)
                    return fe(n, "appIdError"),
                        void console.error("abtest appid is not belong the page appid please check");
                var s = r.version;
                if (s)
                    ve = a ? "" + a + (s ? "." + s : ".1.0.1") + ".js?query=" + Date.now() : T(w) + "?query=" + Date.now();
                else
                    ve = T(w) + "?query=" + Date.now();
                window.TEAVisualEditor.lang = o,
                i && (window.TEAVisualEditor.__ab_domin = i),
                    ye({
                        event: n,
                        editorUrl: ve,
                        collectInstance: e
                    })
            }
        })
    }
    var ke, we, Se = function(e, t, i, n) {
        window.TEAVisualEditor.appId = t,
            _e("tea:openTesterEventInspector", function(t) {
                var i = t.data;
                if ("string" == typeof t.data)
                    try {
                        i = JSON.parse(t.data)
                    } catch (e) {
                        i = void 0
                    }
                if (i) {
                    var n = i.referrer
                        , r = i.lang
                        , o = i.appId;
                    window.TEAVisualEditor.__editor_ajax_domain = n || "",
                        window.TEAVisualEditor.__ab_appId = o || "",
                        window.TEAVisualEditor.lang = r || "",
                        ye({
                            event: t,
                            editorUrl: T("1fz22z22z1nz21z4mz4bz4bz1jz1dz4fz49z1bz18z22z18z4az24z1mz1jz1az1az1bz1lz4az1az1mz1kz4bz1mz19z1hz4bz1bz18z22z18z49z21z22z18z22z1gz1az4bz22z1cz21z22z1cz20z4bz21z1bz1iz4bz22z1cz21z22z1cz20z49z1cz24z1cz1lz22z49z1gz1lz21z1nz1cz1az22z1mz20z4az1hz21") + "?query=" + Date.now(),
                            collectInstance: e
                        })
                }
            })
    }, Ie = T("1fz22z22z1nz21z4mz4bz4bz1jz1dz49z1az1bz1lz49z22z1mz21z4az19z27z22z1cz21z1az1kz4az1az1mz1kz4bz1mz19z1hz4bz21z22z18z22z1gz1az4bz1jz1mz1ez49z21z1bz1iz4bz1az1mz1jz1jz1cz1az22z4bz24z1gz21z23z18z1jz49z18z19z49z1jz1mz18z1bz1cz20z4az1hz21") + "?query=" + Date.now();
    !function(e) {
        e[e.No = 0] = "No",
            e[e.Ing = 1] = "Ing",
            e[e.Complete = 2] = "Complete"
    }(ke || (ke = {})),
        function(e) {
            e[e.Var = 0] = "Var",
                e[e.All = 1] = "All"
        }(we || (we = {}));
    var Oe, xe = function() {
        function e(e, t, i) {
            this.appId = 0,
                this.user = {},
                this.header = {},
                this.domain = "",
                this.protocal = location.protocol,
                this.fetchStatus = ke.No,
                this.callbacks = [],
                this.data = null,
                this.versions = [],
                this.extVersions = [],
                this.mulilinkVersions = [],
                this.collector = e;
            var n = this.collector._initConfig
                , r = n.app_id
                , o = n.channel
                , s = n.enable_multilink
                , a = n.multilink_timeout_ms
                , c = n.ab_channel_domain
                , h = n.channel_domain
                , l = n.enable_ab_visual
                , p = n.ab_timeout;
            if (this.appId = r,
                this.timeout = p || 3e3,
                this.domain = c || T(y[o || "cn"]),
                this.domain) {
                this.needOverlay = s || l || !1,
                    this.enable_ab_visual = l,
                    this.enable_multilink = s,
                    this.closeTime = a || 500,
                    this.Hook = t;
                var f = h || T(u[o]);
                if (this.reportUrl = "" + f + d,
                    l) {
                    be(e, this.appId, c || "", i);
                    var _ = oe();
                    if (_ && (-1 !== _.indexOf("datatester") || -1 !== _.indexOf("visual-editor")))
                        return console.log("edit mode"),
                            void this.collector.destroy()
                }
                s && Se(e, this.appId, c || "", i),
                    this._check(),
                    this.wait()
            } else
                console.warn("sorry you env is not support abtest yet~")
        }
        return e.prototype.init = function(e, i) {
            if (!this.collector.destroyInstance)
                if (this.domain) {
                    this.config = e;
                    var n = e.user
                        , r = e.header
                        , o = function(e, t) {
                        var i = {};
                        for (var n in e)
                            Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (i[n] = e[n]);
                        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                            var r = 0;
                            for (n = Object.getOwnPropertySymbols(e); r < n.length; r++)
                                t.indexOf(n[r]) < 0 && (i[n[r]] = e[n[r]])
                        }
                        return i
                    }(r, []);
                    this.user = t({}, n),
                        this.header = t({}, r),
                        this._fetch(t({}, o), {
                            success: i,
                            fail: i
                        })
                } else
                    console.warn("sorry you env is not support abtest yet~")
        }
            ,
            e.prototype._check = function() {
                var e = this
                    , t = function(e) {
                    var t = ce(e)
                        , i = t.timestamp;
                    if (Date.now() - i >= 2592e6) {
                        try {
                            se.removeItem("__tea_sdk_ab_version")
                        } catch (e) {}
                        return null
                    }
                    return t
                }(this.appId);
                if (t) {
                    var i = t.ab_version
                        , n = t.data
                        , r = t.ab_ext_version
                        , o = t.ab_version_multilink;
                    this.mulilinkVersions = o || [],
                        this.extVersions = r,
                    i && i.length && (this.versions = i,
                        this.data = n,
                        setTimeout(function() {
                            e._configVersions()
                        }))
                }
            }
            ,
            e.prototype.wait = function() {
                var e = this;
                this.needOverlay && (this.isWait || (this.openOverlayer(),
                    this.isWait = !0),
                    setTimeout(function() {
                        e.closeOverlayer()
                    }, this.closeTime))
            }
            ,
            e.prototype.getAllVars = function(e) {
                if ("function" != typeof e)
                    throw new Error("callback must be a function");
                var t = {
                    callback: e,
                    type: we.All
                };
                this.fetchStatus === ke.Complete ? this._getAllVars(t) : this.callbacks.push(t)
            }
            ,
            e.prototype._getAllVars = function(e) {
                (0,
                    e.callback)(this.data ? JSON.parse(JSON.stringify(this.data)) : {})
            }
            ,
            e.prototype.getVids = function() {
                try {
                    var e = ce(this.appId).ab_version
                        , t = "";
                    return e && e.length && (t = e.join(",")),
                        t
                } catch (e) {
                    return ""
                }
            }
            ,
            e.prototype.getAbSdkVersion = function(e) {
                e(this.getVids())
            }
            ,
            e.prototype.getVar = function(e, t, i) {
                if (!e)
                    throw new Error("variable must not be empty");
                if (void 0 === t)
                    throw new Error("variable no default value");
                if ("function" != typeof i)
                    throw new Error("callback must be a function");
                var n = {
                    name: e,
                    defaultValue: t,
                    callback: i,
                    type: we.Var
                };
                if (this.fetchStatus === ke.Complete) {
                    this._getVar(n, e);
                    try {
                        this.Hook.emit("onAbSdkVersionChange", this.getVids())
                    } catch (e) {}
                } else
                    this.callbacks.push(n)
            }
            ,
            e.prototype._getVar = function(e, t) {
                var i = e.name
                    , n = e.defaultValue
                    , r = e.callback
                    , o = this.data;
                if (o) {
                    if ("object" == typeof o[i] && void 0 !== o[i].val) {
                        var s = o[i].vid;
                        return "$ab_url" === t ? (-1 === this.mulilinkVersions.indexOf(s) && this.mulilinkVersions.push(s),
                            this._updateMultilinkVersions()) : (-1 === this.versions.indexOf(s) && this.versions.push(s),
                            this._updateVersions()),
                            this._abEvent(s, t, n),
                            void r(o[i].val)
                    }
                    r(n)
                } else
                    r(n)
            }
            ,
            e.prototype._abEvent = function(e, t, i) {
                var n = this;
                try {
                    if (e) {
                        var r = {
                            event: "abtest_exposure",
                            ab_sdk_version: "" + e,
                            params: JSON.stringify({
                                app_id: this.appId,
                                ab_url: "$ab_url" === t ? i : window.location.href
                            }),
                            local_time_ms: Date.now()
                        }
                            , o = this.collector._config.get()
                            , s = o.header
                            , a = o.user;
                        s.ab_sdk_version = "" + e,
                            s.custom = JSON.stringify(s.custom);
                        var c = {
                            events: [r],
                            user: a,
                            header: s
                        };
                        "$ab_url" === t ? window.navigator.sendBeacon ? window.navigator.sendBeacon(this.reportUrl, JSON.stringify([c])) : O(this.reportUrl, 2e4, [c], "") : setTimeout(function() {
                            O(n.reportUrl, 2e4, [c], "")
                        }, 16)
                    }
                } catch (e) {}
            }
            ,
            e.prototype.openOverlayer = function() {
                !function() {
                    if (!document.getElementById(b)) {
                        var e = "body { opacity: 0 !important; }"
                            , t = document.head || document.getElementsByTagName("head")[0]
                            , i = document.createElement("style");
                        i.id = b,
                            i.type = "text/css",
                            i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(document.createTextNode(e)),
                            t.appendChild(i)
                    }
                }()
            }
            ,
            e.prototype.closeOverlayer = function() {
                var e;
                (e = document.getElementById(b)) && e.parentElement.removeChild(e)
            }
            ,
            e.prototype._setAbVersion = function(e) {
                this.extVersions = [e],
                    ue(this.appId, this.extVersions, !0)
            }
            ,
            e.prototype._updateVersions = function() {
                ue(this.appId, this.versions),
                    this._configVersions()
            }
            ,
            e.prototype._updateMultilinkVersions = function() {
                var e, t, i;
                e = this.appId,
                    t = this.mulilinkVersions,
                    i = {
                        ab_version_multilink: t,
                        timestamp: Date.now()
                    },
                    he(e, i)
            }
            ,
            e.prototype._configVersions = function() {
                var e = this.versions.join(",");
                e && this.collector.config({
                    ab_sdk_version: e
                })
            }
            ,
            e.prototype._getABconfig = function(e, t) {
                var i = Object.keys(e);
                i && i.length && this.collector.config(e),
                    this.init(this.collector._config.get(), t)
            }
            ,
            e.prototype._fetchComplete = function(e) {
                var t = this;
                if (e) {
                    !function(e, t) {
                        he(e, {
                            data: t
                        })
                    }(this.appId, e),
                        this.data = e;
                    var i = [];
                    Object.keys(e).forEach(function(t) {
                        var n = e[t].vid;
                        n && i.push(n)
                    }),
                    -1 !== window.location.href.indexOf("multilink=true") || (this.versions = this.versions.filter(function(e) {
                        return -1 !== i.indexOf(e)
                    }));
                    var n = e.$ab_url
                        , r = e.$ab_modification;
                    if (r && r.val && this.enable_ab_visual) {
                        if (this.collector.destroyInstance)
                            return;
                        this.getVar("$ab_modification", window.location.href, function() {
                            var e;
                            e = r.val,
                                window.TEAVisualEditor.__ab_config = e,
                                me(Ie, function() {
                                    console.log("load visual render success")
                                }, function() {
                                    console.log("load visual render fail")
                                })
                        })
                    } else if (n && this.enable_multilink) {
                        var o = n.val
                            , s = n.vid;
                        o && s && this.getVar("$ab_url", o, function() {
                            var e = window.location.href;
                            -1 !== e.indexOf("multilink=true") && (e = t.filterUrl(e)),
                                o !== e ? setTimeout(function() {
                                    if (!t.collector.destroyInstance) {
                                        var e = "" + o;
                                        -1 !== (e = -1 === e.indexOf("http") ? "https://" + e : e).indexOf("?") ? e += "&multilink=true" : e += "?multilink=true",
                                            window.location.href = e
                                    }
                                }, 50) : t.closeOverlayer()
                        })
                    } else
                        this.closeOverlayer()
                }
                this.callbacks.forEach(function(e) {
                    t[e.type === we.Var ? "_getVar" : "_getAllVars"](e, "")
                }),
                    this.callbacks = [],
                    this._updateVersions();
                try {
                    this.Hook.emit("onAbSdkVersionChange", this.getVids())
                } catch (e) {}
                this.isWait || this.closeOverlayer()
            }
            ,
            e.prototype._fetch = function(e, i) {
                var n = this
                    , r = void 0 === i ? {} : i
                    , o = r.success
                    , s = void 0 === o ? function() {}
                    : o
                    , a = r.fail
                    , c = void 0 === a ? function() {}
                    : a;
                this.fetchStatus = ke.Ing;
                var h = this.domain + "/service/2/abtest_config/"
                    , u = window.location.href
                    , l = !1;
                -1 !== u.indexOf("multilink=true") && (u = this.filterUrl(u),
                    l = !0);
                var d = l ? this.mulilinkVersions : this.versions;
                S(h, {
                    header: t({
                        aid: this.appId
                    }, this.user || {}, e || {}, {
                        ab_sdk_version: d.join(","),
                        ab_url: u
                    })
                }, function(e) {
                    n.fetchStatus = ke.Complete;
                    var t = e.data;
                    "success" === e.message ? (n._fetchComplete(t),
                        s(t)) : (n._fetchComplete(null),
                        c())
                }, function() {
                    n.fetchStatus = ke.Complete,
                        c(),
                        n._fetchComplete(null)
                }, "", this.timeout)
            }
            ,
            e.prototype.filterUrl = function(e) {
                try {
                    var t = "";
                    -1 !== e.indexOf("&multilink=true") ? t = "&multilink=true" : -1 !== e.indexOf("?multilink=true") && (t = "\\?multilink=true");
                    var i = new RegExp(t,"g");
                    e = e.replace(i, "")
                } catch (e) {}
                return e
            }
            ,
            e
    }(), Ee = function(e, t, i, n) {
        if (t) {
            var r = e.filter(function(e) {
                return !e[0].__disable_storage__
            }).length;
            if (r > 0)
                try {
                    var o = n.getItem(i);
                    if (o) {
                        var s = Object.keys(o)
                            , a = s.length + r - t;
                        if (a > 0) {
                            for (var c = s.map(function(e) {
                                var t = o[e];
                                return {
                                    id: e,
                                    index: t && t[0] ? t[0].header.__storage_index__ : +new Date
                                }
                            }).sort(function(e, t) {
                                return e.index - t.index
                            }), h = 0; h < a; h++) {
                                var u = c.shift();
                                u && u.id && o[u.id] && delete o[u.id]
                            }
                            n.setItem(i, o)
                        }
                    }
                } catch (e) {}
        }
    }, Te = function() {
        function e(e) {
            "string" == typeof e.event_verify_url ? this.url = e.event_verify_url + "/" + k : console.log("please use correct et_test url")
        }
        return e.prototype.send = function(e) {
            this.url && O(this.url, 3e4, e)
        }
            ,
            e
    }(), Ce = function() {
        return function(e, t, i, n, r) {
            t && (t.enable_stay_duration && (this.stay = new ie(n,t)),
            t.disable_session || (this.session = new ne(i)),
            t.channel_domain || t.disable_sdk_monitor || (this.monitor = new re(t)),
            t.event_verify_url && (this.et_test = new Te(t)),
            t.enable_ab_test && (this.ab = new xe(e,r,t)),
            t.max_storage_num && (this.maxStorage = Ee))
        }
    }(), Ae = n(["init", "config", "send", "start", "predefinePageView", "beconEvent", "on", "resetStayDuration", "autoInitializationRangers"], ["profileSet", "profileSetOnce", "profileIncrement", "profileUnset", "profileAppend", "getVar", "getAbSdkVersion", "onAbSdkVersionChange", "offAbSdkVersionChange", "getABconfig", "openOverlayer", "closeOverlayer", "getAllVars", "setExternalAbVersion", "getToken", "destroy"]), Ne = (Oe = +Date.now() + Number(("" + Math.random()).slice(2, 8)),
            function() {
                return Oe += 1
            }
    ), Ve = function() {
        function e(e) {
            var i = this;
            this.is_first_time = !1,
                this.Native = !1,
                this.staging = !1,
                this.sdkload = !1,
                this._getToken = !1,
                this.predefinePageView = function(e) {
                    if (void 0 === e && (e = {}),
                        i.sdkload) {
                        var n = {
                            title: document.title || location.pathname,
                            url: location.href,
                            url_path: location.pathname,
                            time: Date.now(),
                            referrer: window.document.referrer,
                            $is_first_time: "" + i.is_first_time
                        }
                            , r = t({}, n, e);
                        i.event("predefine_pageview", r, "pv")
                    } else
                        i.logger.warn("sdk init error, api can not call")
                }
                ,
                this.getToken = function(e, n) {
                    if (!i.sdkload)
                        return i.logger.warn("sdk init error, api can not call, getToken will return {}"),
                            void e({});
                    var r = !1
                        , o = function() {
                        if (!r) {
                            r = !0;
                            var n = i._config.get().user;
                            return e(t({}, n))
                        }
                    };
                    n && setTimeout(function() {
                        o()
                    }, n),
                        i._token.isTokenReady() ? o() : (i.hook.on("get-token", function() {
                            o()
                        }),
                            i._getToken = !0)
                }
                ,
                this.name = e,
                this._isSend = !1,
                this.hook = new L,
                this.storage = new h(!1)
        }
        return e.prototype.autoInitializationRangers = function(e) {}
            ,
            e.prototype.init = function(e) {
                var t = this;
                if (!this._inited) {
                    if (this._inited = !0,
                    !e || "object" != typeof e)
                        throw new Error("init params is error,please check");
                    this.logger = new J(this.name,e.log);
                    var i = e.app_id
                        , n = e.app_key;
                    n || i ? i && "number" != typeof i ? this.logger.throw("app_id param is error, must be number, please check !!!") : n && "string" != typeof n ? this.logger.warn("app_key is empty, please check!") : e.channel_domain || -1 !== ["cn", "sg", "va"].indexOf(e.channel) ? (this.Native = e.Native,
                        this.appBridge = new H(this.logger),
                        this.storage.getItem("__tea_cache_first_" + i) ? this.is_first_time = !1 : (this.is_first_time = !0,
                            this.storage.setItem("__tea_cache_first_" + i, "1")),
                        this.sdkload = !0,
                        e.Native && this.appBridge.bridgeInject() ? this.appBridge.hasStarted(function(i) {
                            i || t._init(e)
                        }) : this._init(e)) : this.logger.throw("channel must be `cn`, `sg`,`va` !!!") : this.logger.throw("no app_key or app_id please check !!!")
                }
            }
            ,
            e.prototype._init = function(e) {
                var t = this;
                this.autoPV = !0,
                    this.sdkload = !0,
                    this._initConfig = e,
                    this._config = new U(e.app_id,e,e.configPersist || 0),
                    this.configPersist = e.configPersist || 0,
                    this._config.set("app_id", e.app_id),
                    this.hook.on("token-ready", function() {
                        t.callbackSend ? t._isSend ? t._event && t._event.report() : t.start() : t._event && t._event.report()
                    }),
                    this._session = new M(e.app_key || e.app_id,e),
                    this._token = new C(e,this._config,this.hook,this._session),
                    this.plugin = new Ce(this,e,this.event.bind(this),this.beconEvent.bind(this),this.hook),
                    this._event = new V(this,e,this._config,this._token,this.plugin,this._session,e.filter),
                    this.tracer = new W(this,e,this._processEvent.bind(this),this._event),
                    this._token._getToken();
                try {
                    if (e.pluginExtend)
                        new X(e,this.event.bind(this),this.beconEvent.bind(this),this.hook).loadExtend(e.pluginExtend)
                } catch (e) {}
            }
            ,
            e.prototype.config = function(e) {
                var t = this;
                this.sdkload ? this.Native && this.appBridge.bridgeInject() ? this.appBridge.hasStarted(function(i) {
                    if (i)
                        for (var n in e)
                            "user_unique_id" === n ? t.appBridge.setUserUniqueId(e[n]) : e[n] ? t.appBridge.addHeaderInfo(n, e[n]) : t.appBridge.removeHeaderInfo(n);
                    else
                        t._setConfig(e)
                }) : this._setConfig(e) : this.logger.warn("sdk init error, api can not call")
            }
            ,
            e.prototype._setConfig = function(e) {
                if (this._inited)
                    if (e && "object" == typeof e) {
                        e.disable_auto_pv && (this.autoPV = !1,
                            delete e.disable_auto_pv),
                        e._staging_flag && 1 === e._staging_flag && (this.staging = !0);
                        var i = t({}, e);
                        if (this.configPersist) {
                            var n = this._config.getStore();
                            n && (i = Object.assign(n, e)),
                                this._config.setStore(e)
                        }
                        for (var r in i) {
                            if (i.user_unique_id) {
                                "string" != typeof i.user_unique_id && this.logger.warn("user_unique_id must be string!!! please check");
                                try {
                                    var o = String(i.user_unique_id);
                                    this._token._getSsid(o)
                                } catch (e) {}
                            }
                            this._config.set(r, i[r])
                        }
                    } else
                        this.logger.warn("config params is error, please check");
                else
                    this.logger.warn("config must be use after function init")
            }
            ,
            e.prototype.on = function(e, t) {
                try {
                    e && "string" == typeof e && "function" == typeof t && this.hook.on(e, t)
                } catch (e) {}
            }
            ,
            e.prototype.send = function() {
                this.start()
            }
            ,
            e.prototype.start = function() {
                var e = this;
                this.sdkload ? this.Native && this.appBridge.bridgeInject() ? this.appBridge.hasStarted(function(t) {
                    t ? (e.logger.info("jsbrige开启，事件将由原生 sdk进行上报"),
                        e.predefinePageView()) : e._start()
                }) : this._start() : this.logger.warn("sdk init error, api can not call")
            }
            ,
            e.prototype._start = function() {
                if (this._token.isTokenReady()) {
                    if (this._isSend)
                        return void this.logger.warn("method start can not be use over one time , please check !!");
                    this._isSend = !0,
                        this.logger.info("userInfo:" + JSON.stringify(this._config.get("user"))),
                        this.logger.info("sdk is ready,version is " + p + ". you can report now !!!"),
                        this._event.setReady(),
                    this.autoPV && this.predefinePageView(),
                    this._getToken && this.hook.emit("get-token"),
                        this.profile = new Q(this._processEvent.bind(this),this._event,this._initConfig),
                    this.plugin && this.plugin.ab && this.plugin.ab.init(this._config.get())
                } else
                    this.callbackSend = !0
            }
            ,
            e.prototype.beconEvent = function(e, t, i) {
                var n = this;
                void 0 === t && (t = {});
                var r = i || "log"
                    , o = [];
                o.push([e, t]),
                    o = o.map(function(e) {
                        return n._processEvent(e[0], e[1])
                    }),
                    this._dealEvent(!0, o, r),
                    this._addTracerCount(r)
            }
            ,
            e.prototype.event = function() {
                for (var e = this, t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                if (this.sdkload) {
                    var r = i(t, 1)[0]
                        , o = [];
                    "Array" !== Object.prototype.toString.call(r).slice(8, -1) ? o[0] = t : o = t,
                        o = o.map(function(t) {
                            return e._processEvent(t[0], t[1])
                        }),
                        this._dealEvent(!1, o, "log"),
                        this._addTracerCount("log")
                } else
                    this.logger.warn("sdk init error, api can not call")
            }
            ,
            e.prototype._dealEvent = function(e, t, i) {
                var n = this;
                if (this.sdkload)
                    if (this.Native && this.appBridge.bridgeInject()) {
                        if ("autotrack" === i || "sdk" === i)
                            return;
                        this.appBridge.hasStarted(function(i) {
                            i ? t && t.length && t.forEach(function(e) {
                                var t = e.event
                                    , i = e.params;
                                n.appBridge.onEventV3(t, JSON.stringify(i))
                            }) : n._commonEvent(e, t)
                        })
                    } else
                        this._commonEvent(e, t);
                else
                    this.logger.warn("sdk init error, api can not call")
            }
            ,
            e.prototype._commonEvent = function(e, t) {
                e ? this._event.beconEvent(t) : this._event.event(t),
                    this._session._updateSessionId(),
                this.plugin && this.plugin.session && this.plugin.session.process()
            }
            ,
            e.prototype._addTracerCount = function(e) {
                this.sdkload ? this.Native || this.staging || this.tracer.addCount(e) : this.logger.warn("sdk init error, api can not call")
            }
            ,
            e.prototype._processEvent = function(e, t) {
                try {
                    var i = e;
                    /^event\./.test(e) && (i = e.slice(6));
                    var n, r = t;
                    return "object" != typeof r && (r = {}),
                        r.profile ? delete r.profile : r.event_index = Ne(),
                        r.local_ms ? (n = r.local_ms,
                            delete r.local_ms) : n = +new Date,
                        {
                            event: i,
                            params: r,
                            local_time_ms: n,
                            is_bav: this._initConfig.autotrack ? 1 : 0
                        }
                } catch (i) {
                    return {
                        _event: e,
                        params: t
                    }
                }
            }
            ,
            e.prototype.resetStayDuration = function(e, t, i) {
                this.sdkload ? this.plugin.stay ? this.plugin.stay && this.plugin.stay.reset(e, t, i) : this.logger.info("stayDuration is not init") : this.logger.warn("sdk init error, api can not call")
            }
            ,
            e.prototype.profileSet = function(e) {
                var t = this;
                this.sdkload ? this.Native && this.appBridge.bridgeInject() ? this.appBridge.hasStarted(function(i) {
                    i ? t.appBridge.profileSet(JSON.stringify(e)) : t.profile && t.profile.setProfile(e)
                }) : this.profile && this.profile.setProfile(e) : this.logger.warn("sdk init error, api can not call")
            }
            ,
            e.prototype.profileSetOnce = function(e) {
                var t = this;
                this.sdkload ? this.Native && this.appBridge.bridgeInject() ? this.appBridge.hasStarted(function(i) {
                    i ? t.appBridge.profileSetOnce(JSON.stringify(e)) : t.profile && t.profile.setOnceProfile(e)
                }) : this.profile && this.profile.setOnceProfile(e) : this.logger.warn("sdk init error, api can not call")
            }
            ,
            e.prototype.profileIncrement = function(e) {
                var t = this;
                this.sdkload ? this.Native && this.appBridge.bridgeInject() ? this.appBridge.hasStarted(function(i) {
                    i ? t.appBridge.profileIncrement(JSON.stringify(e)) : t.profile && t.profile.incrementProfile(e)
                }) : this.profile && this.profile.incrementProfile(e) : this.logger.warn("sdk init error, api can not call")
            }
            ,
            e.prototype.profileUnset = function(e) {
                var t = this;
                this.sdkload ? this.Native && this.appBridge.bridgeInject() ? this.appBridge.hasStarted(function(i) {
                    i ? t.appBridge.profileUnset(e) : t.profile && t.profile.unsetProfile(e)
                }) : this.profile && this.profile.unsetProfile(e) : this.logger.warn("sdk init error, api can not call")
            }
            ,
            e.prototype.profileAppend = function(e) {
                var t = this;
                this.sdkload ? this.Native && this.appBridge.bridgeInject() ? this.appBridge.hasStarted(function(i) {
                    i ? t.appBridge.profileAppend(JSON.stringify(e)) : t.profile && t.profile.appendProfile(e)
                }) : this.profile && this.profile.appendProfile(e) : this.logger.warn("sdk init error, api can not call")
            }
            ,
            e.prototype.setExternalAbVersion = function(e) {
                this.sdkload ? e && this.plugin.ab && this.plugin.ab._setAbVersion(e) : this.logger.warn("sdk init error, api can not call")
            }
            ,
            e.prototype.getVar = function(e, t, i) {
                var n = this;
                if (!this.sdkload)
                    return this.logger.warn("sdk init error, api can not call, getVar return default value"),
                        void i(t);
                this.hook.on("token-error", function() {
                    n.logger.warn("sdk init error, getVar return default value"),
                        i(t)
                }),
                this.plugin.ab && this.plugin.ab.getVar(e, t, i)
            }
            ,
            e.prototype.getABconfig = function(e, t) {
                if (!this.sdkload)
                    return this.logger.warn("sdk init error, api can not call, getABconfig return null"),
                        void t(null);
                this.plugin.ab && this.plugin.ab._getABconfig(e, t)
            }
            ,
            e.prototype.getAbSdkVersion = function(e) {
                if (!this.sdkload)
                    return this.logger.warn("sdk init error, api can not call, getAbSdkVersion return null"),
                        void e(null);
                this.plugin.ab && this.plugin.ab.getAbSdkVersion(e)
            }
            ,
            e.prototype.onAbSdkVersionChange = function(e) {
                this.sdkload ? this.hook.on("onAbSdkVersionChange", e) : this.logger.warn("sdk init error, api can not call")
            }
            ,
            e.prototype.offAbSdkVersionChange = function(e) {
                this.sdkload ? e ? this.hook.off("onAbSdkVersionChange", e) : this.hook.off("onAbSdkVersionChange") : this.logger.warn("sdk init error, api can not call")
            }
            ,
            e.prototype.openOverlayer = function() {
                this.sdkload ? this.plugin.ab && this.plugin.ab.openOverlayer() : this.logger.warn("sdk init error, api can not call")
            }
            ,
            e.prototype.closeOverlayer = function() {
                this.sdkload ? this.plugin.ab && this.plugin.ab.closeOverlayer() : this.logger.warn("sdk init error, api can not call")
            }
            ,
            e.prototype.getAllVars = function(e) {
                var t = this;
                if (!this.sdkload)
                    return this.logger.warn("sdk init error, api can not call, getAllVars return null"),
                        void e(null);
                this.hook.on("token-error", function() {
                    t.logger.warn("sdk init error, getallVar return null"),
                        e(null)
                }),
                this.plugin.ab && this.plugin.ab.getAllVars(e)
            }
            ,
            e.prototype.destroy = function() {
                this.destroyInstance || (this.destroyInstance = !0,
                    this.hook.off("token-ready"))
            }
            ,
            e
    }();
    function je(e, t, i) {
        return t in e ? Object.defineProperty(e, t, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = i,
            e
    }
    var De = function(e) {
        var t = this;
        return je(this, "_exportCollect", function() {
            for (var e = arguments.length, i = new Array(e), n = 0; n < e; n++)
                i[n] = arguments[n];
            t._isProcess ? t._executeCmd.apply(t, i) : (t.cmdQueue.push(i),
                t._processCmd())
        }),
            je(this, "_processCmd", function() {
                if (0 !== t.cmdQueue.length) {
                    var e, i, n, r, o;
                    i = t.cmdQueue,
                        n = "init",
                        r = "0",
                        o = -1,
                        i.forEach(function(e, t) {
                            (void 0 !== r ? e[r] : e) === n && (o = t)
                        }),
                    -1 !== (e = o) && (t._isProcess = !0,
                        t._executeCmd.apply(t, t.cmdQueue[e]),
                        t.cmdQueue.forEach(function(i, n) {
                            n !== e && t._executeCmd.apply(t, i)
                        }),
                        t.cmdQueue = [])
                }
            }),
            je(this, "_executeCmd", function() {
                for (var e = arguments.length, i = new Array(e), n = 0; n < e; n++)
                    i[n] = arguments[n];
                var r, o, s = i[0];
                Ae.indexOf(s) > -1 ? (r = t.colloctor)[s].apply(r, i.slice(1)) : (o = t.colloctor).event.apply(o, i)
            }),
            this.cmdQueue = [],
            this.name = e,
            this.colloctor = new Ve(e),
            this._isProcess = !1,
            this._alias = {},
            this._processCmd(),
            Ae.forEach(function(e) {
                t._exportCollect[e] = t._exportCollect.bind(t, e)
            }),
            this._exportCollect
    }
        , Be = {}
        , Pe = {}
        , qe = function(e) {
        return Pe[e] || (Pe[e] = []),
            Pe[e]
    }
        , Ue = function(e) {
        try {
            var t = i(e)
                , r = t[0]
                , o = t.slice(1);
            if (!r)
                return void console.error("the eventName is: " + r + ", error, stop report, please check");
            var s = r.split(".");
            if (1 === s.length)
                qe("default").push(n([r], o));
            else if (2 === s.length)
                "event" === s[0] ? qe("default").push(n([r], o)) : qe(s[0]).push(n([s[1]], o));
            else {
                var a = s[0]
                    , c = [s[1], s[2]].join(".");
                qe(a).push(n([c], o))
            }
        } catch (e) {
            console.log(e)
        }
    }
        , Je = function() {
        Le.q.forEach(function(e) {
            var t = [].slice.call(e);
            "Array" === Object.prototype.toString.call(t[0]).slice(8, -1) ? t.forEach(function(e) {
                Ue(e)
            }) : Ue(t)
        }),
            Object.keys(Pe).forEach(function(e) {
                Pe[e].forEach(function(t) {
                    (function(e) {
                            return Be[e] || (Be[e] = new De(e)),
                                Be[e]
                        }
                    )(e).apply(void 0, n(t))
                }),
                    Pe[e] = []
            }),
            Le.q = []
    }
        , Le = function e() {
        for (var t = [], i = 0; i < arguments.length; i++)
            t[i] = arguments[i];
        e.q.push(t),
            Je()
    };
    Le.q = [],
        Le.l = Date.now(),
        Le._instanceMap = Be,
        Le._instanceCmdMap = Pe,
        Ae.forEach(function(e) {
            Le[e] = Le.bind(null, e)
        }),
        function(e) {
            if ("undefined" != typeof window) {
                var t = v();
                if (t && window[t]) {
                    var i = window[t];
                    i.init || (e.q = i.q || [],
                        e.l = i.l || Date.now(),
                        window[t] = e)
                }
            }
        }(Le),
        Je();
    var Re = De;
    // Le.call(window, 'init', {
    //     "app_id": 6383,
    //     "channel": "cn",
    //     "enable_ab_test": true,
    //     "ab_channel_domain": "https://www.douyin.com"
    // })
    return e.Collector = Re,
        e.default = Le,
        e
}({});

console.log(__tea_iife_export__)