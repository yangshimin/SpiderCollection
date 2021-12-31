require("fake-indexeddb/auto");
const fs = require('fs');
var xml_http_request = require('xhr2');
var XMLHttpRequest = xml_http_request.XMLHttpRequest;
var openDatabase = require('websql');
var navigator = require("./navigator").navigator;
var deprecated_color = require("./deprecated_system_color").color;
var mock_cookie = require("./cookie").mock;
var localStorage = require('./localStorage');
var sessionStorage = require('./sessionStorage');
var canvas = require('canvas');
const jsdom = require("jsdom");

const {JSDOM} = jsdom;
let index_code = fs.readFileSync("E:\\个人\\SpiderCollection\\易盾\\static\\index.html", {
    encoding: "utf-8"
});
const dom = new JSDOM(index_code, {
    url: "https://dun.163.com/trial/jigsaw",
    referrer: "https://www.baidu.com/",
    contentType: "text/html",
    includeNodeLocations: true,
    pretendToBeVisual: true,
    resources: "usable",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0",
});

global.window = global;
var Window = function () {
};
global.Window = Window

history = new Object();
history.length = 4;
history.scrollRestoration = "auto";
history.state = null;
window.history = history;

screen = new Object();
screen.availHeight = 1040;
screen.availLeft = 1920;
screen.availTop = 0;
screen.availWidth = 1920;
screen.colorDepth = 24;
screen.height = 1080;
screen.width = 1920;
screen.pixelDepth = 24;
screen.orientation = {"angle": 0, "onchange": null, "type": "landscape-primary"};
window.screen = screen;

parent = window;
top = window;
self = window;


document = new Object();
document.body = {
    "id": "",
    "innerHTML": "",
    "innerText": "",
    appendChild: function (node) {
        var ele = dom.window.document.body.appendChild(node)
        var sourceStyle = ele.style;

        function getProperty(name) {
            if (!sourceStyle._values.hasOwnProperty(name)) {
                return '';
            }
            return sourceStyle._values[name].toString();
        }

        sourceStyle.getPropertyValue = function (property) {
            if (property.toLowerCase() === 'color') {
                var colorRes = !sourceStyle._values.hasOwnProperty(property) ? "" : color[sourceStyle._values[property].toString()];
                return colorRes;
            }
            return !sourceStyle._values.hasOwnProperty(property) ? "" : sourceStyle._values[property].toString();
            ;
        }
        return ele;
    },
    removeChild: function (node) {
        return dom.window.document.body.removeChild(node);
    },
}
document.documentElement = {
    "innerText": "",
    "innerHTML": "",
};
document.getElementsByTagName = function (tag) {
    return dom.window.document.getElementsByTagName(tag)
}
document.createElement = function (tag) {
    console.log("createElement ele: ", tag)
    if (tag.toLowerCase() === "canvas") {
        // return canvas.createCanvas(300, 150)
        return dom.window.document.createElement(tag);
    } else {
        return dom.window.document.createElement(tag);
    }
}
document.addEventListener = dom.window.document.addEventListener;
Object.defineProperty(document, 'cookie', {
    get: function () {
        return mock_cookie.cookie;
    },
    set: function (value) {
        mock_cookie.cookie = value;
    }
});
window.document = document;

let location = new Object();
location.port = "";
location.protocol = "https:",
    location.href = "https://dun.163.com/trial/jigsaw",
    location.pathname = "/trial/jigsaw",
    location.host = "dun.163.com",
    location.hostname = "dun.163.com",
    location.origin = "https://www.nmpa.gov.cn";
location.replace = String.prototype.replace;
window.location = location;

window.WebGLRenderingContext = function () {
    debugger
};
window.devicePixelRatio = 1;
window.navigator = navigator;
window.sessionStorage = sessionStorage;
window.localStorage = localStorage;
window.indexedDB = indexedDB;
window.openDatabase = openDatabase;
window.XMLHttpRequest = XMLHttpRequest;
window.getComputedStyle = function (ele) {
    return ele.style;
};
window.clientInformation = Object.assign(navigator, {})

consoleAble = true

function getPrintShow(key) {
    let type = typeof key;
    if (type === 'object') {
        try {
            return `${JSON.stringify(key)}`
        } catch {
            return key.toString()
        }
    } else if (type === 'symbol') {
        return key.toString
    } else {
        return key
    }

}

function getMethodHandler(WatchName) {
    let methodhandler = {
        apply(target, thisArg, argArray) {
            let result = Reflect.apply(target, thisArg, argArray)
            if (consoleAble) {
                console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [${argArray}], result is [${getPrintShow(result)}].`)
            }
            return result
        },
        construct(target, argArray, newTarget) {
            var result = Reflect.construct(target, argArray, newTarget)
            return result;
        }
    }
    return methodhandler
}

function getObjhandler(WatchName) {
    let handler = {
        get(target, propKey, receiver) {
            let result = Reflect.get(target, propKey, receiver)
            if (result instanceof Object) {
                if (typeof result === "function") {
                    if (consoleAble) {
                        console.log(`[${WatchName}] getting propKey is [${getPrintShow(propKey)}] , it is function`)
                    }
                    return new Proxy(result, getMethodHandler(WatchName))
                }
                // 不注释的话，会遍历对象的所有key
                // return new Proxy(result, getObjhandler(`${WatchName}.${getPrintShow(result)}`))
            }
            return result;
        },
        set(target, propKey, value, receiver) {
            if (value instanceof Object) {
                if (consoleAble) {
                    console.log(`[${WatchName}] setting propKey is [${propKey}], value is [${getPrintShow(value)}]`);
                }
            } else {
                if (consoleAble) {
                    console.log(`[${WatchName}] setting propKey is [${propKey}], value is [${value}]`);
                }
            }
            return Reflect.set(target, propKey, value, receiver);
        },
        has(target, propKey) {
            var result = Reflect.has(target, propKey);
            if (consoleAble) {
                console.log(`[${WatchName}] has propKey [${propKey}], result is [${getPrintShow(result)}]`)
            }
            return result;
        },
        deleteProperty(target, propKey) {
            var result = Reflect.deleteProperty(target, propKey);
            if (consoleAble) {
                console.log(`[${WatchName}] delete propKey [${propKey}], result is [${getPrintShow(result)}]`)
            }
            return result;
        },
        getOwnPropertyDescriptor(target, propKey) {
            var result = Reflect.getOwnPropertyDescriptor(target, propKey);
            if (consoleAble) {
                console.log(`[${WatchName}] getOwnPropertyDescriptor  propKey [${propKey.toString()}] result is [${getPrintShow(result)}]`)
            }
            return result;
        },
        defineProperty(target, propKey, attributes) {
            var result = Reflect.defineProperty(target, propKey, attributes);
            if (consoleAble) {
                console.log(`[${WatchName}] defineProperty propKey [${propKey}] attributes is [${getPrintShow(attributes)}], result is [${getPrintShow(result)}]`)
            }
            return result
        },
        getPrototypeOf(target) {
            var result = Reflect.getPrototypeOf(target)
            if (consoleAble) {
                console.log(`[${WatchName}] getPrototypeOf result is [${getPrintShow(result)}]`)
            }
            return result;
        },
        setPrototypeOf(target, proto) {
            if (consoleAble) {
                console.log(`[${WatchName}] setPrototypeOf proto is [${getPrintShow(proto)}]`)
            }
            return Reflect.setPrototypeOf(target, proto);
        },
        preventExtensions(target) {
            if (consoleAble) {
                console.log(`[${WatchName}] preventExtensions`)
            }
            return Reflect.preventExtensions(target);
        },
        isExtensible(target) {
            var result = Reflect.isExtensible(target)
            if (consoleAble) {
                console.log(`[${WatchName}] isExtensible, result is [${result}]`)
            }
            return result;
        },
        ownKeys(target) {
            var result = Reflect.ownKeys(target)
            if (consoleAble) {
                console.log(`[${WatchName}] invoke ownkeys, result is [${getPrintShow(result)}]`)
            }
            return result
        },
        apply(target, thisArg, argArray) {
            let result = Reflect.apply(target, thisArg, argArray)
            if (consoleAble) {
                console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [${argArray}], result is [${getPrintShow(result)}].`)
            }
            return result
        },
        construct(target, argArray, newTarget) {
            var result = Reflect.construct(target, argArray, newTarget)
            if (consoleAble) {
                console.log(`[${WatchName}] construct function name is [${target.name}], argArray is [${argArray}], result is [${getPrintShow(result)}].`)
            }
            return result;
        }
    }
    return handler;
}

navigator = new Proxy(Object.create(navigator), getObjhandler("navigator"));
location = new Proxy(location, getObjhandler("location"));
document = new Proxy(document, getObjhandler("document"));
window = new Proxy(Object.assign(global, window), getObjhandler("window"));

(function () {
    function f(b) {
        void 0 === b && (b = {});
        this.aa = ja(this.aa, 0, this);
        this.ma = [];
        this.aa(b);
    }

    function h(e, c) {
        function d(a) {
            var e = {},
                c = null,
                d = null;
            n.concat(p).forEach(function (a) {
                window[a] && (e[a] = window[a]);
            });
            var r = Da(q, yc);
            k(r, {
                charset: "gbk"
            }, function (r, q) {
                if (r) return "", null;
                q && q.parentElement["removeChild"](q);
                c = n.map(function (a) {
                    return window[a];
                }).join("/");
                d = p.map(function (a) {
                    return window[a];
                }).join("/");
                "";
                "";
                a(c, d);

                for (var g in e) window[g] = e[g];
            });
        }

        var r = A["state"]["options"],
            q = r["protocol"],
            Ea = r.apiServer,
            m = r["productNumber"];
        void 0 === m && (m = "");
        var I = r.la;
        void 0 === I && (I = "");
        r = r.C;
        void 0 === r && (r = "");
        var f = W().k(Fa),
            yc = "nstool.netease.com/info.js",
            n = ["ip", "ip_isp", "ip_province", "ip_city"],
            p = ["dns", "dns_isp", "dns_province", "dns_city", "res", "msg"];

        (function (a) {
            d(function (e, c) {
                a.ip = e;
                a.dns = c;
                var d = Da(q, Ea, "/v2/collect");
                Ab(d, {
                    J: a
                });
            });
        })({
            tid: f,
            referrer: Bb.href || "",
            pn: m,
            bid: I,
            tid2: r,
            type: e.code,
            message: e.toString(),
            target: e.data.url || "",
            requestCount: c ? 2 : 1,
            osv: u["platform"] || "",
            sdkv: "2.7.1_a02527b8"
        });
    }

    function k(a, c, d) {
        var r = document.head || document["getElementsByTagName"]("head")[0],
            q = document["createElement"]("script");
        typeof c === "function" && (d = c, c = {});
        c = c || {};

        d = d || function () {
        };

        q.type = c.type || "text/javascript";
        q.charset = c.charset || "utf8";
        q.async = "async" in c ? !!c.async : !0;
        q["src"] = a;
        c.cc && zc(q, c.cc);
        c.text && (q.text = "" + c.text);
        ("onload" in q ? Cb : Ac)(q, d);
        q["onload"] || Cb(q, d);
        r["appendChild"](q);
    }

    function n(e) {
        function c(b, e) {
            return b || b === 0 ? b : e;
        }

        function d(a, b) {
            return typeof a === "boolean" ? a : b;
        }

        var r = e.buildVersion,
            q = e.lastUsedVersion,
            Ea = e.staticServer,
            m = e.apiServer,
            I = e["auto"];
        void 0 === I && (I = !0);
        var f = e.valid,
            h = e.sConfig,
            k = e.configHash,
            t = e["protocol"],
            x = e.pn,
            u = e["productNumber"],
            v = e["onload"],
            w = e["onerror"],
            y = e.merged;
        e = e.__serverConfig__;
        void 0 === e && (e = {});
        var z = {};
        if (k || h) try {
            var A = ja(Bc, 2, void 0)(k || h),
                z = JSON["parse"](A);
        } catch (C) {
            "";
        }
        var A = M(z.bl) === "string" ? z.bl.split(",") : [],
            B = M(z.dl) === "string" ? z.dl.split(",") : [],
            D = p(B),
            E = 1000 * 60 * 60;
        return {
            auto: I,
            onload: v,
            onerror: w,
            staticServer: Ea,
            apiServer: m,
            productNumber: u || x,
            protocol: t,
            domain: D,
            Ec: B,
            dc: A,
            buildVersion: r,
            lastUsedVersion: q,
            sConfig: h,
            configHash: k,
            valid: f,
            merged: y,
            hc: d(z.ejcd, !1),
            ic: d(z.ews, !1),
            oa: d(z.edc, !0),
            oc: c(z.ivp, E * 24),
            gc: c(z.dtvp, E),
            Ac: c(z.tto, 2000),
            va: c(z.ret, 1),
            moveMax: z.mem,
            moveInterval: z.mei,
            keydownMax: z.kem,
            keydownInterval: z.kei,
            clickMax: z.cem,
            clickInterval: z.cei,
            upMax: z.cem,
            upInterval: z.cei,
            downMax: z.cem,
            downInterval: z.cei,
            focusMax: z.fem,
            focusInterval: z.fei,
            blurMax: z.fem,
            blurInterval: z.fei,
            scrollMax: z.sem,
            scrollInterval: z.sei,
            orientationMax: z.otem,
            orientationInterval: z.otei,
            motionMax: z.mtem,
            motionInterval: z.mtei,
            __serverConfig__: e
        };
    }

    function p(e) {
        void 0 === e && (e = []);
        var c = Bb["hostname"];
        if (!c || !e.length) return "";

        try {
            for (var d = 0; d < e.length; d++) {
                var r = e[d];

                if (null === r || void 0 === r ? 0 : null !== /^[a-zA-Z0-9_.-]+$/.exec(r)) {
                    var q = new Db(e[d].replace(/\./g, "\\.") + "$");
                    if (null !== c.match(q)) return e[d];
                }
            }
        } catch (Ea) {
            "";
        }

        return "";
    }

    function Q() {
        if (Ta) return Ta;
        Ta = this;
        var e = Ua(A["state"]["options"]),
            c = {
                moveMax: R ? 50 : 3,
                moveInterval: 300,
                downMax: R ? 20 : 3,
                downInterval: 300,
                upMax: R ? 20 : 3,
                upInterval: 300,
                clickMax: R ? 20 : 1,
                clickInterval: 300,
                focusMax: R ? 20 : 1,
                focusInterval: 300,
                blurMax: R ? 20 : 1,
                blurInterval: 300,
                keydownMax: R ? 10 : 2,
                keydownInterval: 300,
                scrollMax: R ? 20 : 2,
                scrollInterval: 300,
                orientationMax: R ? 50 : 2,
                orientationInterval: 3000,
                motionMax: R ? 50 : 2,
                motionInterval: 3000,
                batteryMax: R ? 100 : 3,
                batteryInterval: 10
            };
        Object.keys(c).forEach(function (d) {
            e[d] = e[d] > 0 ? ~d.indexOf("Max") ? Math["min"](e[d], c[d]) : Math["max"](e[d], c[d]) : c[d];
        });
        A.j(na, e);
        this.P = new U(e);
        ta && (this.L = new oa(e));
    }

    function oa(a) {
        void 0 === a && (a = {});
        var c = this;
        this.F = ["chargingchange", "chargingtimechange", "dischargingtimechange", "levelchange"];
        this.Y = [a["batteryMax"], a["batteryInterval"]];
        this.ja = a;
        this.g = [];
        this.l = !1;
        this.D = null;
        this._battery = {};

        this.da = function (a) {
            return c.N(a);
        };
    }

    function U(a) {
        var b = this;
        void 0 === a && (a = {});
        this.F = Object.keys(Ga);
        this.Z = {};
        this.ja = a;
        this.g = {};
        this.l = !1;

        this.pa = function () {
            for (var a = [], e = arguments.length; e--;) a[e] = arguments[e];

            b.lc.apply(b, a);
        };
    }

    function Eb(a) {
        var c = a ? Fb : Ha(Fb, Cc),
            d = [];

        try {
            ua(Object.keys(c)).forEach(function (a) {
                var e = c[a].f();
                "";
                d.push.apply(d, va(e, ba[a]));
            });
        } catch (r) {
        }

        return d;
    }

    function Dc(e) {
        function c() {
            Gb >= Va.length && (Hb = !0, Wa = ua(d).reduce(function (a, b) {
                a.push.apply(a, b);
                return a;
            }, []),
                e(Wa));
        }

        var d = [];
        if (Hb) return e(Wa);
        var r = A["state"]["options"],
            q = r.hc;
        void 0 === q && (q = !1);
        var g = r.Fc;
        void 0 === g && (g = !0);
        var m = r.ic;
        void 0 === m && (m = !1);
        Object.keys(Xa).forEach(function (a) {
            var e = Xa[a],
                c = e.T,
                d = Xa[a].Fa;
            e.jc = a;
            ba[a].a !== e.a || M(e) !== "object" || c && (c === Ib && !g || c === Ya && !q || c === Jb && !m) || (e.Ga = d ? e.f : function (a) {
                return a(e.f());
            },
                Va.push(e));
        });
        Va.forEach(function (e) {
            function r() {
                function a(r, q) {
                    "";

                    d.push(va(r, ba[e.jc], !!q));
                    Gb++;
                    c();
                }

                try {
                    e.Ga(a);
                } catch (q) {
                    a([], Error("cannot got value"));
                }
            }

            e.u ? wa(r, 0) : r();
        });
    }

    function xa(e) {
        var c;
        e = e || "~";
        c = c || 0;
        var d = e.length % 16,
            r = e.length - d,
            q = [0, c];
        c = [0, c];

        for (var g = [0, 0], m = [0, 0], I = [2277735313, 289559509], f = [1291169091, 658871167], h = 0; h < r; h += 16) g = [e.charCodeAt(h + 4) & 255 | (e.charCodeAt(h + 5) & 255) << 8 | (e.charCodeAt(h + 6) & 255) << 16 | (e.charCodeAt(h + 7) & 255) << 24, e.charCodeAt(h) & 255 | (e.charCodeAt(h + 1) & 255) << 8 | (e.charCodeAt(h + 2) & 255) << 16 | (e.charCodeAt(h + 3) & 255) << 24], m = [e.charCodeAt(h + 12) & 255 | (e.charCodeAt(h + 13) & 255) << 8 | (e.charCodeAt(h + 14) & 255) << 16 | (e.charCodeAt(h + 15) & 255) << 24, e.charCodeAt(h + 8) & 255 | (e.charCodeAt(h + 9) & 255) << 8 | (e.charCodeAt(h + 10) & 255) << 16 | (e.charCodeAt(h + 11) & 255) << 24], g = P(g, I), g = pa(g, 31), g = P(g, f), q = D(q, g), q = pa(q, 27), q = ca(q, c), q = ca(P(q, [0, 5]), [0, 1390208809]), m = P(m, f), m = pa(m, 33), m = P(m, I), c = D(c, m), c = pa(c, 31), c = ca(c, q), c = ca(P(c, [0, 5]), [0, 944331445]);

        g = [0, 0];
        m = [0, 0];

        switch (d) {
            case 15:
                m = D(m, N([0, e.charCodeAt(h + 14)], 48));

            case 14:
                m = D(m, N([0, e.charCodeAt(h + 13)], 40));

            case 13:
                m = D(m, N([0, e.charCodeAt(h + 12)], 32));

            case 12:
                m = D(m, N([0, e.charCodeAt(h + 11)], 24));

            case 11:
                m = D(m, N([0, e.charCodeAt(h + 10)], 16));

            case 10:
                m = D(m, N([0, e.charCodeAt(h + 9)], 8));

            case 9:
                m = D(m, [0, e.charCodeAt(h + 8)]), m = P(m, f), m = pa(m, 33), m = P(m, I), c = D(c, m);

            case 8:
                g = D(g, N([0, e.charCodeAt(h + 7)], 56));

            case 7:
                g = D(g, N([0, e.charCodeAt(h + 6)], 48));

            case 6:
                g = D(g, N([0, e.charCodeAt(h + 5)], 40));

            case 5:
                g = D(g, N([0, e.charCodeAt(h + 4)], 32));

            case 4:
                g = D(g, N([0, e.charCodeAt(h + 3)], 24));

            case 3:
                g = D(g, N([0, e.charCodeAt(h + 2)], 16));

            case 2:
                g = D(g, N([0, e.charCodeAt(h + 1)], 8));

            case 1:
                g = D(g, [0, e.charCodeAt(h)]), g = P(g, I), g = pa(g, 31), g = P(g, f), q = D(q, g);
        }

        q = D(q, [0, e.length]);
        c = D(c, [0, e.length]);
        q = ca(q, c);
        c = ca(c, q);
        q = Kb(q);
        c = Kb(c);
        q = ca(q, c);
        c = ca(c, q);
        return ("00000000" + (q[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (q[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (c[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (c[1] >>> 0).toString(16)).slice(-8);
    }

    function Za() {
        var e = A["state"]["options"],
            c = W().k(Fa),
            d = da().k(qa),
            r = e.la,
            q = e.C,
            e = e["productNumber"],
            h = {
                Xb: "200",
                Gb: Ec(),
                yb: $a(),
                Pb: Fc(H() + (A["state"].wa || 0)),
                Ka: Gc,
                La: r,
                Ia: q,
                Ub: c,
                Ya: d,
                Fb: e,
                Sa: void 0,
                Ta: Hc,
                Ua: void 0,
                Va: Ic,
                Wa: Jc
            },
            m = [];
        ua(Object.keys(h)).forEach(function (e) {
            M(h[e]) !== "undefined" && (ba[e].c >= 800 && ba[e].c <= 804 && (h[e] = Kc(h[e])), "", m.push.apply(m, va(h[e], ba[e])));
        });
        return m;
    }

    function Jc() {
        return "ee8c4a34";
    }

    function va(e, c, d) {
        var r = c.a,
            q = c.e,
            g = [];
        if (!d && (r === y && (g = ea(X(e ? 1 : 2), q)), r === w && (g = ea(X(e), q)), r === Y && (g = ea(Lb(e), q)), r === t && (g = ya(ea(e, q))), r === F)) for (d = 0, r = e.length; d < r; d++) {
            var m = q[d],
                h = e[d];
            M(e[d]) === "number" && g.push.apply(g, ea(X(h), m));
            M(e[d]) === "string" && g.push.apply(g, ya(ea(h, m)));
        }
        e = ea(X(c.c), 2);
        c = ea(X(g.length), 2);
        return e.concat(c, g);
    }

    function Lc(e, c) {
        void 0 === c && (c = {});
        var d,
            r,
            q = c.ba,
            h = c.J;
        void 0 === h && (h = {});
        var m = c.xa;
        void 0 === m && (m = 60000);
        var I = c.V;
        void 0 === I && (I = V);
        var f = c.U;
        void 0 === f && (f = V);
        h["cb"] = "__wmjsonp_" + $a().slice(2, 9);
        m && (r = wa(function () {
            r && fa(r);
            d && typeof d["abort"] === "function" && d["abort"]();
            f(Error("Request timed out"));
        }, m));
        q === "GET" && (e += (~e.indexOf("?") ? "&" : "?") + ab(h));
        d = new bb(),
            d["open"](q, e, !0),
            d["setRequestHeader"]("Content-type", "application/x-www-form-urlencoded"),
            d["onreadystatechange"] = function () {
                if (d["readyState"] === 4) if (r && fa(r), d["status"] >= 200 && d["status"] < 400) {
                    var e,
                        c = new Db("^" + h["cb"] + "\\((.+)\\)$");

                    try {
                        console.log(q + "响应内容为: " + d["responseText"])
                        e = JSON["parse"]((d["responseText"] || "").match(c)[1] || "");
                    } catch (q) {}
                    e ? I(e) : f(Error("Response is empty"));
                } else f(Error("The server has encountered an error"));
            },
            d["send"](ab(h))
        return d && typeof d["abort"] === "function" && d["abort"];
    }

    function ka(a) {
        void 0 === a && (a = {});
        this.R = "__";
        this.w = {};
        this.p = a.p || "";
    }

    function za(a) {
        void 0 === a && (a = {});
        this.p = a.p || "";
        this.X = [Mc, Nc, Oc];
    }

    function ra(a) {
        this["state"] = a["state"];
        this.Mb = [];
        var c = this,
            d = this.j,
            r = this.B;

        this.j = function (a, b, e) {
            return d.call(c, a, b, e);
        };

        this.B = function (a, b) {
            return r.call(c, a, b);
        };

        this.yc(a.ac);
        this.zc(a.tc);
    }

    function B(a) {
        try {
            return Mb[a];
        } catch (b) {
        }
    }

    function $a() {
        return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (e) {
            var c = Math["random"]() * 16 | 0;
            return (e === "x" ? c : c & 3 | 8).toString(16);
        });
    }

    function Fc(e) {
        void 0 === e && (e = 0);
        e = new Aa(e)["getTime"]();
        return la(e / 1000, 10);
    }

    function M(b) {
        return null == b ? String(b) : Pc.call(b).slice(8, -1).toLowerCase();
    }

    function V() {
    }

    function Qc(a, b) {
        return a.filter(b)[0];
    }

    function Ua(a, c) {
        void 0 === c && (c = []);
        if (null === a || typeof a !== "object") return a;
        var d = Qc(c, function (b) {
            return b.xc === a;
        });
        if (d) return d.fc;
        var r = M(a) === "array" ? [] : {};
        c.push({
            xc: a,
            fc: r
        });
        Object.keys(a).forEach(function (b) {
            r[b] = Ua(a[b], c);
        });
        return r;
    }

    function cb() {
        var a;

        try {
            a = new bb();
        } catch (b) {
        }

        return !!a;
    }

    function ab(a) {
        return Object.keys(a).map(function (c) {
            return Z(c) + "=" + Z(a[c]);
        }).join("&");
    }

    function Nb(a) {
        return a.replace(/(^\/)|(\/$)/g, "");
    }

    function Da(a, c, d) {
        c = Nb(c.replace(/^https?:\/\//i, ""));
        return (d = d ? Nb(d) : "") ? a + "://" + c + "/" + d : a + "://" + c;
    }

    function Ha(a, b) {
        for (var d in b) !b.hasOwnProperty(d) || (a[d] = b[d]);

        return a;
    }

    function H() {
        return new Aa()["getTime"]();
    }

    function ua(a) {
        for (var c = a.length, d, r; c;) r = Math["floor"](Math["random"]() * c--), d = a[c], a[c] = a[r], a[r] = d;

        return a;
    }

    function W() {
        var a = A["state"]["options"].merged ? A["state"]["options"]["productNumber"] : "";
        if (Ia[a]) return Ia[a];
        Ia[a] = new za({
            p: a
        });
        return Ia[a];
    }

    function da() {
        var a = A["state"]["options"].merged ? A["state"]["options"]["productNumber"] : "";
        if (Ja[a]) return Ja[a];
        Ja[a] = new ka({
            p: a
        });
        return Ja[a];
    }

    function Ab(e, c) {
        function d() {
            if (t["parentNode"]) t["parentNode"]["removeChild"](t);
            v[r] = V;
            u && fa(u);
        }

        void 0 === c && (c = {});
        var r = "__wmjsonp_" + $a().slice(2, 9) + Rc++,
            q = "cb",
            h = Z,
            m = c.V;
        void 0 === m && (m = V);
        var f = c.J,
            k = c.U;
        void 0 === k && (k = V);
        var n = c.xa;
        void 0 === n && (n = 60000);
        var p = x["getElementsByTagName"]("script")[0] || x.head,
            t,
            u;
        n && (u = wa(function () {
            d();
            k && k(Error("Request timed out"));
        }, n));

        v[r] = function (a) {
            d();
            m && m(a);
        };

        e += (~e.indexOf("?") ? "&" : "?") + q + "=" + h(r) + "&" + ab(f);
        e = e.replace("?&", "?");
        t = x["createElement"]("script");
        t["src"] = e;

        t["onerror"] = function (a) {
            d();
            k(a);
        };

        t["setAttribute"]("charset", "UTF-8");
        p["parentNode"]["insertBefore"](t, p);
        return function () {
            v[r] && d();
        };
    }

    function Ob() {
    }

    function Pb(b, c) {
        c = Ha({
            ba: "GET",
            J: {},
            xa: 5000,
            V: Ob,
            U: Ob
        }, c);
        (cb() ? Lc : Ab)(b, c);
    }

    function Qb(e, c, d, r, g) {
        void 0 === d && (d = 0);
        void 0 === r && (r = Rb);
        void 0 === g && (g = db);
        var h,
            m = [];

        switch (d) {
            case 1:
                d = e[c];
                h = 0;
                m.push(r[d >>> 2 & 63], r[(d << 4 & 48) + (h >>> 4 & 15)], g, g);
                break;

            case 2:
                d = e[c];
                h = e[c + 1];
                e = 0;
                m.push(r[d >>> 2 & 63], r[(d << 4 & 48) + (h >>> 4 & 15)], r[(h << 2 & 60) + (e >>> 6 & 3)], g);
                break;

            case 3:
                d = e[c];
                h = e[c + 1];
                e = e[c + 2];
                m.push(r[d >>> 2 & 63], r[(d << 4 & 48) + (h >>> 4 & 15)], r[(h << 2 & 60) + (e >>> 6 & 3)], r[e & 63]);
                break;

            default:
                throw Error("1010");
        }

        return m.join("");
    }

    function Sb(e, c, d) {
        void 0 === c && (c = []);
        void 0 === d && (d = db);
        if (!e) return null;
        if (e.length === 0) return "";
        var r = 3;

        try {
            for (var g = [], h = 0; h < e.length;) if (h + r <= e.length) g.push(Qb(e, h, r, c, d)), h += r; else {
                g.push(Qb(e, h, e.length - h, c, d));
                break;
            }

            return g.join("");
        } catch (m) {
            throw Error("1010");
        }
    }

    function Tb(a) {
        void 0 === a && (a = []);
        return Sb(a, Sc, Tc);
    }

    function C(e) {
        if (e < -128) return C(128 - (-128 - e));
        if (e >= -128 && e <= 127) return e;
        if (e > 127) return C(-129 + e - 127);
        throw Error("1001");
    }

    function Uc(a, b) {
        return C(a + b);
    }

    function eb(a, b) {
        return C(C(a) ^ C(b));
    }

    function fb(b, c) {
        void 0 === b && (b = []);
        void 0 === c && (c = []);
        if (b.length !== c.length) return [];

        for (var d = [], r = 0, g = b.length; r < g; r++) d[r] = eb(b[r], c[r]);

        return d;
    }

    function Ub(e) {
        var c = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
        return "" + c[e >>> 4 & 15] + c[e & 15];
    }

    function gb(a) {
        void 0 === a && (a = []);
        return a.map(function (a) {
            return Ub(a);
        }).join("");
    }

    function hb(e) {
        void 0 === e && (e = "");
        e = typeof e === "string" ? e : String(e);

        for (var c = [], d = 0, r = 0, g = e.length / 2; d < g; d++) {
            var h = la(e.charAt(r++), 16) << 4,
                m = la(e.charAt(r++), 16);
            c[d] = C(h + m);
        }

        return c;
    }

    function ya(e) {
        if (null === e || void 0 === e) return e;
        e = Z(e);

        for (var c = [], d = 0, r = e.length; d < r; d++) if (e.charAt(d) === "%") {
            if (d + 2 < r) c.push(Lb(e.charAt(++d) + "" + e.charAt(++d))[0]); else throw Error("1009");
        } else c.push(C(e.charCodeAt(d)));

        return c;
    }

    function X(b) {
        var c = [];
        c[0] = C(b >>> 24 & 255);
        c[1] = C(b >>> 16 & 255);
        c[2] = C(b >>> 8 & 255);
        c[3] = C(b & 255);
        return c;
    }

    function ga(e, c, d, r, g) {
        void 0 === e && (e = []);
        void 0 === d && (d = []);

        if (e.length) {
            if (e.length < g) throw Error("1003");

            for (var h = 0; h < g; h++) d[r + h] = e[c + h];
        }
    }

    function Vb() {
        return Array.apply(null, Array(10)).map(function () {
            return 0;
        });
    }

    function Lb(b) {
        if (null === b || b.length === 0) return [];
        b = typeof b === "string" ? b : String(b);

        for (var c = [], d = 0, r = 0, g = b.length / 2; r < g; r++) {
            var h = la(b.charAt(d++), 16) << 4,
                m = la(b.charAt(d++), 16);
            c[r] = C(h + m);
        }

        return c;
    }

    function ib(e) {
        void 0 === e && (e = []);
        var c = [];
        if (!e.length) return Vb();

        if (e.length >= jb) {
            var c = 0,
                d = jb;
            void 0 === e && (e = []);
            var r = [];

            if (e.length) {
                if (e.length < d) throw Error("1003");

                for (var g = 0; g < d; g++) r[g] = e[c + g];
            }

            return r;
        }

        for (d = 0; d < jb; d++) c[d] = e[d % e.length];

        return c;
    }

    function Wb(b) {
        void 0 === b && (b = []);
        if (!b.length) return [];

        for (var c = [], d = 0, r = b.length; d < r; d++) {
            var g = b[d];
            c[d] = Vc[(g >>> 4 & 15) * 16 + (g & 15)];
        }

        return c;
    }

    function Wc(b, c) {
        void 0 === b && (b = []);
        if (!b.length) return [];
        c = C(c);

        for (var d = [], r = 0, g = b.length; r < g; r++) d.push(eb(b[r], c));

        return d;
    }

    function Xc(b, c) {
        void 0 === b && (b = []);
        if (!b.length) return [];
        c = C(c);

        for (var d = [], r = 0, g = b.length; r < g; r++) d.push(eb(b[r], c++));

        return d;
    }

    function Yc(b, c) {
        void 0 === b && (b = []);
        if (!b.length) return [];
        c = C(c);

        for (var d = [], r = 0, g = b.length; r < g; r++) d.push(C(b[r] + c));

        return d;
    }

    function Zc(b, c) {
        void 0 === b && (b = []);
        if (!b.length) return [];
        c = C(c);

        for (var d = [], g = 0, q = b.length; g < q; g++) d.push(Uc(b[g], c++));

        return d;
    }

    function $c(b) {
        return [[Yc, 46], [Xc, -63], [Wc, 67], [Zc, -16]].reduce(function (a, b) {
            return b[0](a, b[1]);
        }, b);
    }

    function kb(e) {
        void 0 === e && (e = []);
        var c = "993ec3699e964e90baefdf2dbb56f97b",
            d;
        d = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918000, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117];

        for (var g = 4294967295, q = 0, h = e.length; q < h; q++) g = g >>> 8 ^ d[(g ^ e[q]) & 255];

        d = gb(X(g ^ 4294967295));
        g = ya(d);
        d = [];
        ga(e, 0, d, 0, e.length);
        ga(g, 0, d, d.length, g.length);
        e = ya(c);
        void 0 === d && (d = []);
        g = [];

        for (c = 0; c < lb; c++) q = Math["random"]() * 256, q = Math["floor"](q), g[c] = C(q);

        e = ib(e);
        e = fb(e, ib(g));
        c = e = ib(e);
        var m = d;
        void 0 === m && (m = []);

        if (m.length) {
            d = [];
            q = m.length;
            h = 0;
            h = q % S <= S - Ka ? S - q % S - Ka : S * 2 - q % S - Ka;
            ga(m, 0, d, 0, q);

            for (m = 0; m < h; m++) d[q + m] = 0;

            ga(X(q), 0, d, q + h, Ka);
        } else d = Vb();

        q = d;
        void 0 === q && (q = []);
        if (q.length % S !== 0) throw Error("1005");
        d = [];

        for (var h = 0, m = q.length / S, f = 0; f < m; f++) {
            d[f] = [];

            for (var l = 0; l < S; l++) d[f][l] = q[h++];
        }

        q = [];
        ga(g, 0, q, 0, lb);
        g = 0;

        for (h = d.length; g < h; g++) {
            m = $c(d[g]);
            m = fb(m, e);
            f = c;
            void 0 === m && (m = []);
            void 0 === f && (f = []);

            for (var l = [], k = f.length, n = 0, p = m.length; n < p; n++) l[n] = C(m[n] + f[n % k]);

            m = fb(l, c);
            c = Wb(m);
            c = Wb(c);
            ga(c, 0, q, g * S + lb, S);
        }

        return Sb(q, Rb, db);
    }

    function Bc(e) {
        if (!e) return "";
        var c = [31, 125, -12, 60, 32, 48],
            d = 0;
        e = hb(e);

        for (var g = [], q = 0; q < e.length; q++) g[q] = C(0 - e[q]), g[q] = C(g[q] ^ c[d++ % c.length]);

        c = g;
        void 0 === c && (c = []);
        d = [];

        for (e = 0; e < c.length; e++) d.push("%"), d.push(Ub(c[e]));

        return Xb(d.join(""));
    }

    function La(e) {
        if (!e) return "";
        var c = 0,
            d = [31, 125, -12, 60, 32, 48];
        e = ya(e);

        for (var g = [], q = 0; q < e.length; q++) g[q] = C(e[q] ^ d[c++ % d.length]), g[q] = C(0 - g[q]);

        return gb(g);
    }

    function ha(b, c) {
        var d = (b & 65535) + (c & 65535);
        return (b >> 16) + (c >> 16) + (d >> 16) << 16 | d & 65535;
    }

    function G(b, c, d, g, q, h) {
        b = ha(ha(c, b), ha(g, h));
        return ha(b << q | b >>> 32 - q, d);
    }

    function J(a, b, d, g, q, h, m) {
        return G(b & d | ~b & g, a, b, q, h, m);
    }

    function K(a, b, d, g, q, h, m) {
        return G(b & g | d & ~g, a, b, q, h, m);
    }

    function L(a, b, d, g, q, h, m) {
        return G(d ^ (b | ~g), a, b, q, h, m);
    }

    function Yb(e) {
        var c,
            d = [];
        d[(e.length >> 2) - 1] = void 0;

        for (c = 0; c < d.length; c += 1) d[c] = 0;

        var g = e.length * 8;

        for (c = 0; c < g; c += 8) d[c >> 5] |= (e.charCodeAt(c / 8) & 255) << c % 32;

        e = e.length * 8;
        d[e >> 5] |= 128 << e % 32;
        d[(e + 64 >>> 9 << 4) + 14] = e;
        var q,
            h,
            m = 1732584193,
            f = -271733879,
            l = -1732584194,
            k = 271733878;

        for (e = 0; e < d.length; e += 16) c = m, g = f, q = l, h = k, m = J(m, f, l, k, d[e], 7, -680876936), k = J(k, m, f, l, d[e + 1], 12, -389564586), l = J(l, k, m, f, d[e + 2], 17, 606105819), f = J(f, l, k, m, d[e + 3], 22, -1044525330), m = J(m, f, l, k, d[e + 4], 7, -176418897), k = J(k, m, f, l, d[e + 5], 12, 1200080426), l = J(l, k, m, f, d[e + 6], 17, -1473231341), f = J(f, l, k, m, d[e + 7], 22, -45705983), m = J(m, f, l, k, d[e + 8], 7, 1770035416), k = J(k, m, f, l, d[e + 9], 12, -1958414417), l = J(l, k, m, f, d[e + 10], 17, -42063), f = J(f, l, k, m, d[e + 11], 22, -1990404162), m = J(m, f, l, k, d[e + 12], 7, 1804603682), k = J(k, m, f, l, d[e + 13], 12, -40341101), l = J(l, k, m, f, d[e + 14], 17, -1502002290), f = J(f, l, k, m, d[e + 15], 22, 1236535329), m = K(m, f, l, k, d[e + 1], 5, -165796510), k = K(k, m, f, l, d[e + 6], 9, -1069501632), l = K(l, k, m, f, d[e + 11], 14, 643717713), f = K(f, l, k, m, d[e], 20, -373897302), m = K(m, f, l, k, d[e + 5], 5, -701558691), k = K(k, m, f, l, d[e + 10], 9, 38016083), l = K(l, k, m, f, d[e + 15], 14, -660478335), f = K(f, l, k, m, d[e + 4], 20, -405537848), m = K(m, f, l, k, d[e + 9], 5, 568446438), k = K(k, m, f, l, d[e + 14], 9, -1019803690), l = K(l, k, m, f, d[e + 3], 14, -187363961), f = K(f, l, k, m, d[e + 8], 20, 1163531501), m = K(m, f, l, k, d[e + 13], 5, -1444681467), k = K(k, m, f, l, d[e + 2], 9, -51403784), l = K(l, k, m, f, d[e + 7], 14, 1735328473), f = K(f, l, k, m, d[e + 12], 20, -1926607734), m = G(f ^ l ^ k, m, f, d[e + 5], 4, -378558), k = G(m ^ f ^ l, k, m, d[e + 8], 11, -2022574463), l = G(k ^ m ^ f, l, k, d[e + 11], 16, 1839030562), f = G(l ^ k ^ m, f, l, d[e + 14], 23, -35309556), m = G(f ^ l ^ k, m, f, d[e + 1], 4, -1530992060), k = G(m ^ f ^ l, k, m, d[e + 4], 11, 1272893353), l = G(k ^ m ^ f, l, k, d[e + 7], 16, -155497632), f = G(l ^ k ^ m, f, l, d[e + 10], 23, -1094730640), m = G(f ^ l ^ k, m, f, d[e + 13], 4, 681279174), k = G(m ^ f ^ l, k, m, d[e], 11, -358537222), l = G(k ^ m ^ f, l, k, d[e + 3], 16, -722521979), f = G(l ^ k ^ m, f, l, d[e + 6], 23, 76029189), m = G(f ^ l ^ k, m, f, d[e + 9], 4, -640364487), k = G(m ^ f ^ l, k, m, d[e + 12], 11, -421815835), l = G(k ^ m ^ f, l, k, d[e + 15], 16, 530742520), f = G(l ^ k ^ m, f, l, d[e + 2], 23, -995338651), m = L(m, f, l, k, d[e], 6, -198630844), k = L(k, m, f, l, d[e + 7], 10, 1126891415), l = L(l, k, m, f, d[e + 14], 15, -1416354905), f = L(f, l, k, m, d[e + 5], 21, -57434055), m = L(m, f, l, k, d[e + 12], 6, 1700485571), k = L(k, m, f, l, d[e + 3], 10, -1894986606), l = L(l, k, m, f, d[e + 10], 15, -1051523), f = L(f, l, k, m, d[e + 1], 21, -2054922799), m = L(m, f, l, k, d[e + 8], 6, 1873313359), k = L(k, m, f, l, d[e + 15], 10, -30611744), l = L(l, k, m, f, d[e + 6], 15, -1560198380), f = L(f, l, k, m, d[e + 13], 21, 1309151649), m = L(m, f, l, k, d[e + 4], 6, -145523070), k = L(k, m, f, l, d[e + 11], 10, -1120210379), l = L(l, k, m, f, d[e + 2], 15, 718787259), f = L(f, l, k, m, d[e + 9], 21, -343485551), m = ha(m, c), f = ha(f, g), l = ha(l, q), k = ha(k, h);

        d = [m, f, l, k];
        c = "";
        g = d.length * 32;

        for (e = 0; e < g; e += 8) c += String.fromCharCode(d[e >> 5] >>> e % 32 & 255);

        return c;
    }

    function Zb(e) {
        var c = "0123456789abcdef",
            d = "",
            f,
            q;

        for (q = 0; q < e.length; q += 1) f = e.charCodeAt(q), d += c.charAt(f >>> 4 & 15) + c.charAt(f & 15);

        return d;
    }

    function $b() {
        var e = new Date()["getTime"](),
            c = Math["floor"](e / 4294967296),
            d = e % 4294967296,
            e = X(c),
            d = X(d),
            c = [];
        ga(e, 0, c, 0, 4);
        ga(d, 0, c, 4, 4);
        d = [];

        for (e = 0; e < 8; e++) d[e] = C(Math["floor"](Math["random"]() * 256));

        for (var e = [], g = 0; g < c.length * 2; g++) {
            if (g % 2 == 0) {
                var f = g / 2;
                e[g] = e[g] | (d[f] & 16) >>> 4 | (d[f] & 32) >>> 3 | (d[f] & 64) >>> 2 | (d[f] & 128) >>> 1 | (c[f] & 16) >>> 3 | (c[f] & 32) >>> 2 | (c[f] & 64) >>> 1 | (c[f] & 128) >>> 0;
            } else f = Math["floor"](g / 2), e[g] = e[g] | (d[f] & 1) << 0 | (d[f] & 2) << 1 | (d[f] & 4) << 2 | (d[f] & 8) << 3 | (c[f] & 1) << 1 | (c[f] & 2) << 2 | (c[f] & 4) << 3 | (c[f] & 8) << 4;

            e[g] = C(e[g]);
        }

        c = gb(e);
        c = Zb(Yb(ac(Z(c + "dAWsBhCqtOaNLLJ25hBzWbqWXwiK99Wd"))));
        c = hb(c.substring(0, 16));
        return Tb(c.concat(e));
    }

    function bc(a) {
        var c = a.C,
            d = a.ka,
            g = da().k(qa),
            f = A["state"]["options"].va;
        a = {
            r: f,
            d: g || "",
            b: c
        };
        d && (c = hb(Zb(Yb(ac(Z(f + g + c + "WoeTpXnDDPhiAvsJUUIY3RdAo2PKaVwi"))))), a.t = Tb(c));

        try {
            return La(JSON["stringify"](a));
        } catch (h) {
            return La("ERROR");
        }
    }

    function mb() {
        var a = da().k(qa),
            c = W().k(nb),
            a = {
                r: A["state"]["options"].va,
                d: a || "",
                i: c
            };

        try {
            return La(JSON["stringify"](a));
        } catch (d) {
            return La("ERROR");
        }
    }

    function ea(b, c) {
        return M(b) === "string" ? b.length > c ? b.slice(0, c) : b : M(b) === "array" ? b.length > c ? b.slice(-c) : b : b;
    }

    function Ec() {
        var b = 255;
        return cc < b ? ++cc : b;
    }

    function Kc(a) {
        switch (M(a)) {
            case "string":
                return a.replace(/,/g, "");

            case "function":
                return a();

            case "array":
                return a.join("");

            default:
                return a;
        }
    }

    function ca(b, c) {
        b = [b[0] >>> 16, b[0] & 65535, b[1] >>> 16, b[1] & 65535];
        c = [c[0] >>> 16, c[0] & 65535, c[1] >>> 16, c[1] & 65535];
        var d = [0, 0, 0, 0];
        d[3] += b[3] + c[3];
        d[2] += d[3] >>> 16;
        d[3] &= 65535;
        d[2] += b[2] + c[2];
        d[1] += d[2] >>> 16;
        d[2] &= 65535;
        d[1] += b[1] + c[1];
        d[0] += d[1] >>> 16;
        d[1] &= 65535;
        d[0] += b[0] + c[0];
        d[0] &= 65535;
        return [d[0] << 16 | d[1], d[2] << 16 | d[3]];
    }

    function P(b, c) {
        b = [b[0] >>> 16, b[0] & 65535, b[1] >>> 16, b[1] & 65535];
        c = [c[0] >>> 16, c[0] & 65535, c[1] >>> 16, c[1] & 65535];
        var d = [0, 0, 0, 0];
        d[3] += b[3] * c[3];
        d[2] += d[3] >>> 16;
        d[3] &= 65535;
        d[2] += b[2] * c[3];
        d[1] += d[2] >>> 16;
        d[2] &= 65535;
        d[2] += b[3] * c[2];
        d[1] += d[2] >>> 16;
        d[2] &= 65535;
        d[1] += b[1] * c[3];
        d[0] += d[1] >>> 16;
        d[1] &= 65535;
        d[1] += b[2] * c[2];
        d[0] += d[1] >>> 16;
        d[1] &= 65535;
        d[1] += b[3] * c[1];
        d[0] += d[1] >>> 16;
        d[1] &= 65535;
        d[0] += b[0] * c[3] + b[1] * c[2] + b[2] * c[1] + b[3] * c[0];
        d[0] &= 65535;
        return [d[0] << 16 | d[1], d[2] << 16 | d[3]];
    }

    function pa(b, c) {
        c %= 64;
        if (c === 32) return [b[1], b[0]];
        if (c < 32) return [b[0] << c | b[1] >>> 32 - c, b[1] << c | b[0] >>> 32 - c];
        c -= 32;
        return [b[1] << c | b[0] >>> 32 - c, b[0] << c | b[1] >>> 32 - c];
    }

    function N(b, c) {
        c %= 64;
        return c === 0 ? b : c < 32 ? [b[0] << c | b[1] >>> 32 - c, b[1] << c] : [b[1] << c - 32, 0];
    }

    function D(a, b) {
        return [a[0] ^ b[0], a[1] ^ b[1]];
    }

    function Kb(b) {
        b = D(b, [0, b[0] >>> 1]);
        b = P(b, [4283543511, 3981806797]);
        b = D(b, [0, b[0] >>> 1]);
        b = P(b, [3301882366, 444984403]);
        return b = D(b, [0, b[0] >>> 1]);
    }

    function dc() {
        function e(c) {
            for (var e = !1, f = 0; f < d.length && !(e = c[f]["offsetWidth"] !== p[d[f]] || c[f]["offsetHeight"] !== t[d[f]]); f++) ;

            return e;
        }

        function c() {
            var a = x["createElement"]("span");
            a["style"]["position"] = "absolute";
            a["style"]["left"] = "-9999px";
            a["style"]["fontSize"] = h;
            a["style"]["lineHeight"] = "normal";
            a["innerHTML"] = f;
            return a;
        }

        if (ob) return ob;

        var d = ["monospace", "sans-serif", "serif"],
            f = "mmmmmmmmmmlli",
            h = "72px",
            k = x["getElementsByTagName"]("body")[0],
            m = x["createElement"]("div"),
            n = x["createElement"]("div"),
            p = {},
            t = {},
            u = function () {
                for (var e = [], f = 0, r = d.length; f < r; f++) {
                    var h = c();
                    h["style"]["fontFamily"] = d[f];
                    m["appendChild"](h);
                    e.push(h);
                }

                return e;
            }();

        k["appendChild"](m);

        for (var v = 0, w = d.length; v < w; v++) p[d[v]] = u[v]["offsetWidth"], t[d[v]] = u[v]["offsetHeight"];

        u = function () {
            for (var e = {}, f = 0, r = fontList.length; f < r; f++) {
                for (var h = [], q = 0, m = d.length; q < m; q++) {
                    var l;
                    l = fontList[f];
                    var k = d[q],
                        p = c();
                    p["style"]["fontFamily"] = "'" + l + "'," + k;
                    l = p;
                    n["appendChild"](l);
                    h.push(l);
                }

                e[fontList[f]] = h;
            }

            return e;
        }();

        k["appendChild"](n);

        for (var v = [], w = 0, A = fontList.length; w < A; w++) e(u[fontList[w]]) && v.push(fontList[w]);

        k["removeChild"](n);
        k["removeChild"](m);
        return ob = v;
    }

    function ad() {
        var a = x["createElement"]("canvas"),
            c = null;

        try {
            c = a["getContext"]("webgl") || a["getContext"]("experimental-webgl");
        } catch (d) {
        }

        c || (c = null);
        return c;
    }

    function bd() {
        function e(e) {
            c["clearColor"](0, 0, 0, 1);
            c.enable(c["DEPTH_TEST"]);
            c["depthFunc"](c["LEQUAL"]);
            c.clear(c["COLOR_BUFFER_BIT"] | c["DEPTH_BUFFER_BIT"]);
            return "[" + e[0] + ", " + e[1] + "]";
        }

        if (Ba) return Ba;
        var c;
        c = ad();
        if (!c) return Ba = [];
        var d = [];

        try {
            var f = "attribute vec2 attrVertexvarying vec2 varyinTexCoordinateuniform vec2 uniformOffsetvoid main(){varyinTexCoordinate=attrVertex+uniformOffsetgl_Position=vec4(attrVertex,0,1)}",
                h = "precision mediump floatvarying vec2 varyinTexCoordinatevoid main() {gl_FragColor=vec4(varyinTexCoordinate,0,1)}",
                k = c["createBuffer"]();
            c["bindBuffer"](c["ARRAY_BUFFER"], k);
            var m = new Float32Array([-0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.732134444, 0]);
            c.bufferData(c["ARRAY_BUFFER"], m, c["STATIC_DRAW"]);
            k.qc = 3;
            k.uc = 3;
            var n = c["createProgram"](),
                p = c["createShader"](c["VERTEX_SHADER"]);
            c["shaderSource"](p, f);
            c["compileShader"](p);
            var t = c["createShader"](c["FRAGMENT_SHADER"]);
            c["shaderSource"](t, h);
            c["compileShader"](t);
            c["attachShader"](n, p);
            c["attachShader"](n, t);
            c["linkProgram"](n);
            c["useProgram"](n);
            n.Bc = c["getAttribLocation"](n, "attrVertex");
            n.vc = c["getUniformLocation"](n, "uniformOffset");
            c["enableVertexAttribArray"](n.Jc);
            c["vertexAttribPointer"](n.Bc, k.qc, c.FLOAT, !1, 0, 0);
            c["uniform2f"](n.vc, 1, 1);
            c["drawArrays"](c["TRIANGLE_STRIP"], 0, k.uc);
        } catch (v) {
        }

        null != c["canvas"] && d.push(c["canvas"]["toDataURL"]());
        d.push("extensions:" + c["getSupportedExtensions"]().join(""));
        d.push("webgl aliased line width range:" + e(c["getParameter"](c["ALIASED_LINE_WIDTH_RANGE"])));
        d.push("webgl aliased point size range:" + e(c["getParameter"](c["ALIASED_POINT_SIZE_RANGE"])));
        d.push("webgl alpha bits:" + c["getParameter"](c["ALPHA_BITS"]));
        d.push("webgl antialiasing:" + (c["getContextAttributes"]().antialias ? "yes" : "no"));
        d.push("webgl blue bits:" + c["getParameter"](c["BLUE_BITS"]));
        d.push("webgl depth bits:" + c["getParameter"](c["DEPTH_BITS"]));
        d.push("webgl green bits:" + c["getParameter"](c["GREEN_BITS"]));
        d.push("webgl max anisotropy:" + function (c) {
            var e,
                d = c["getExtension"]("EXT_texture_filter_anisotropic") || c["getExtension"]("WEBKIT_EXT_texture_filter_anisotropic") || c["getExtension"]("MOZ_EXT_texture_filter_anisotropic");
            return d ? (e = c["getParameter"](d["MAX_TEXTURE_MAX_ANISOTROPY_EXT"]), 0 === e && (e = 2), e) : null;
        }(c));
        d.push("webgl max combined texture image units:" + c["getParameter"](c["MAX_COMBINED_TEXTURE_IMAGE_UNITS"]));
        d.push("webgl max cube map texture size:" + c["getParameter"](c["MAX_CUBE_MAP_TEXTURE_SIZE"]));
        d.push("webgl max fragment uniform vectors:" + c["getParameter"](c["MAX_FRAGMENT_UNIFORM_VECTORS"]));
        d.push("webgl max render buffer size:" + c["getParameter"](c["MAX_RENDERBUFFER_SIZE"]));
        d.push("webgl max texture image units:" + c["getParameter"](c["MAX_TEXTURE_IMAGE_UNITS"]));
        d.push("webgl max texture size:" + c["getParameter"](c["MAX_TEXTURE_SIZE"]));
        d.push("webgl max varying vectors:" + c["getParameter"](c["MAX_VARYING_VECTORS"]));
        d.push("webgl max vertex attribs:" + c["getParameter"](c["MAX_VERTEX_ATTRIBS"]));
        d.push("webgl max vertex texture image units:" + c["getParameter"](c["MAX_VERTEX_TEXTURE_IMAGE_UNITS"]));
        d.push("webgl max vertex uniform vectors:" + c["getParameter"](c["MAX_VERTEX_UNIFORM_VECTORS"]));
        d.push("webgl max viewport dims:" + e(c["getParameter"](c["MAX_VIEWPORT_DIMS"])));
        d.push("webgl red bits:" + c["getParameter"](c["RED_BITS"]));
        d.push("webgl renderer:" + c["getParameter"](c["RENDERER"]));
        d.push("webgl shading language version:" + c["getParameter"](c["SHADING_LANGUAGE_VERSION"]));
        d.push("webgl stencil bits:" + c["getParameter"](c["STENCIL_BITS"]));
        d.push("webgl vendor:" + c["getParameter"](c["VENDOR"]));
        d.push("webgl version:" + c["getParameter"](c["VERSION"]));

        try {
            var u = c["getExtension"]("WEBGL_debug_renderer_info");
            u && (d.push("webgl unmasked vendor:" + c["getParameter"](u.UNMASKED_VENDOR_WEBGL)), d.push("webgl unmasked renderer:" + c["getParameter"](u.UNMASKED_RENDERER_WEBGL)));
        } catch (w) {
        }

        if (!c["getShaderPrecisionFormat"]) return Ba = d;
        d.push("webgl vertex shader high float precision:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["HIGH_FLOAT"])["precision"]);
        d.push("webgl vertex shader high float precision rangeMin:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["HIGH_FLOAT"])["rangeMin"]);
        d.push("webgl vertex shader high float precision rangeMax:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["HIGH_FLOAT"])["rangeMax"]);
        d.push("webgl vertex shader medium float precision:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["MEDIUM_FLOAT"])["precision"]);
        d.push("webgl vertex shader medium float precision rangeMin:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["MEDIUM_FLOAT"])["rangeMin"]);
        d.push("webgl vertex shader medium float precision rangeMax:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["MEDIUM_FLOAT"])["rangeMax"]);
        d.push("webgl vertex shader low float precision:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["LOW_FLOAT"])["precision"]);
        d.push("webgl vertex shader low float precision rangeMin:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["LOW_FLOAT"])["rangeMin"]);
        d.push("webgl vertex shader low float precision rangeMax:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["LOW_FLOAT"])["rangeMax"]);
        d.push("webgl fragment shader high float precision:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["HIGH_FLOAT"])["precision"]);
        d.push("webgl fragment shader high float precision rangeMin:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["HIGH_FLOAT"])["rangeMin"]);
        d.push("webgl fragment shader high float precision rangeMax:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["HIGH_FLOAT"])["rangeMax"]);
        d.push("webgl fragment shader medium float precision:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["MEDIUM_FLOAT"])["precision"]);
        d.push("webgl fragment shader medium float precision rangeMin:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["MEDIUM_FLOAT"])["rangeMin"]);
        d.push("webgl fragment shader medium float precision rangeMax:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["MEDIUM_FLOAT"])["rangeMax"]);
        d.push("webgl fragment shader low float precision:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["LOW_FLOAT"])["precision"]);
        d.push("webgl fragment shader low float precision rangeMin:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["LOW_FLOAT"])["rangeMin"]);
        d.push("webgl fragment shader low float precision rangeMax:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["LOW_FLOAT"])["rangeMax"]);
        d.push("webgl vertex shader high int precision:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["HIGH_INT"])["precision"]);
        d.push("webgl vertex shader high int precision rangeMin:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["HIGH_INT"])["rangeMin"]);
        d.push("webgl vertex shader high int precision rangeMax:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["HIGH_INT"])["rangeMax"]);
        d.push("webgl vertex shader medium int precision:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["MEDIUM_INT"])["precision"]);
        d.push("webgl vertex shader medium int precision rangeMin:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["MEDIUM_INT"])["rangeMin"]);
        d.push("webgl vertex shader medium int precision rangeMax:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["MEDIUM_INT"])["rangeMax"]);
        d.push("webgl vertex shader low int precision:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["LOW_INT"])["precision"]);
        d.push("webgl vertex shader low int precision rangeMin:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["LOW_INT"])["rangeMin"]);
        d.push("webgl vertex shader low int precision rangeMax:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["LOW_INT"])["rangeMax"]);
        d.push("webgl fragment shader high int precision:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["HIGH_INT"])["precision"]);
        d.push("webgl fragment shader high int precision rangeMin:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["HIGH_INT"])["rangeMin"]);
        d.push("webgl fragment shader high int precision rangeMax:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["HIGH_INT"])["rangeMax"]);
        d.push("webgl fragment shader medium int precision:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["MEDIUM_INT"])["precision"]);
        d.push("webgl fragment shader medium int precision rangeMin:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["MEDIUM_INT"])["rangeMin"]);
        d.push("webgl fragment shader medium int precision rangeMax:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["MEDIUM_INT"])["rangeMax"]);
        d.push("webgl fragment shader low int precision:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["LOW_INT"])["precision"]);
        d.push("webgl fragment shader low int precision rangeMin:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["LOW_INT"])["rangeMin"]);
        d.push("webgl fragment shader low int precision rangeMax:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["LOW_INT"])["rangeMax"]);
        return Ba = d;
    }

    function cd(e) {
        function c(a) {
            d(a);

            d = function () {
            };
        }

        function d(a) {
            return e(a);
        }

        if (ec) return e(ec);

        try {
            var f = new fc(1, 44100, 44100),
                h = f["createOscillator"]();
            h["type"] = "triangle";
            h["frequency"]["value"] = 10000;
            var k = f["createDynamicsCompressor"]();
            k["threshold"] && (k["threshold"]["value"] = -50);
            k["knee"] && (k["knee"]["value"] = 40);
            k["ratio"] && (k["ratio"]["value"] = 12);
            k["reduction"] && (k["reduction"]["value"] = -20);
            k["attack"] && (k["attack"]["value"] = 0);
            k["release"] && (k["release"]["value"] = 0.25);
            h["connect"](k);
            k["connect"](f["destination"]);
            h["start"](0);
            wa(function () {
                c("");

                f["oncomplete"] = function () {
                };

                f = null;
            }, 1000);

            f["oncomplete"] = function (e) {
                try {
                    var d = xa(e["renderedBuffer"]["getChannelData"](0).slice(4500, 5000).reduce(function (a, b) {
                        return a + Math.abs(b);
                    }, 0).toString());
                    c(d);
                    h["disconnect"]();
                    k["disconnect"]();
                } catch (f) {
                    c("");
                }
            };

            f["startRendering"]();
        } catch (m) {
            c("");
        }
    }

    function gc() {
        var e = u["userAgent"].toLowerCase();
        return e.indexOf("windows phone") >= 0 ? "Windows Phone" : e.indexOf("win") >= 0 && e.indexOf("windvane") < 0 ? "Windows" : e.indexOf("android") >= 0 ? "Android" : e.indexOf("linux") >= 0 ? "Linux" : e.indexOf("iphone") >= 0 || e.indexOf("ipad") >= 0 ? "iOS" : e.indexOf("mac") >= 0 ? "Mac" : "Other";
    }

    function hc() {
        var e = [],
            e = [].slice.call(u["plugins"], 0);
        return e.map(function (c) {
            var e = [].slice.call(c, 0).map(function (a) {
                return [a.type, a["suffixes"]].join("~");
            }).join(",");
            return [c.name, c["description"], e].join("::");
        });
    }

    function dd() {
        var a = [];
        if (Object["getOwnPropertyDescriptor"] && Object["getOwnPropertyDescriptor"](v, "ActiveXObject") || "ActiveXObject" in v) a = ["AcroPDF.PDF", "Adodb.Stream", "AgControl.AgControl", "DevalVRXCtrl.DevalVRXCtrl.1", "MacromediaFlashPaper.MacromediaFlashPaper", "Msxml2.DOMDocument", "Msxml2.XMLHTTP", "PDF.PdfCtrl", "QuickTime.QuickTime", "QuickTimeCheckObject.QuickTimeCheck.1", "RealPlayer", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "Scripting.Dictionary", "SWCtl.SWCtl", "Shell.UIHelper", "ShockwaveFlash.ShockwaveFlash", "Skype.Detection", "TDCCtl.TDCCtl", "WMPlayer.OCX", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1"].map(function (a) {
            try {
                return new ed(a), a;
            } catch (b) {
                return null;
            }
        });
        u["plugins"] && (a = a.concat(hc()));
        return a;
    }

    function ic() {
        var a = x["createElement"]("canvas");
        return !(!a["getContext"] || !a["getContext"]("2d"));
    }

    function fd() {
        return u["appName"] === "Microsoft Internet Explorer" || u["appName"] === "Netscape" && /Trident/.test(u["userAgent"]) ? !0 : !1;
    }

    function ja(a, b, d) {
        return function () {
            var g, f, h;
            d = d || this;
            f = H();
            g = a.apply(d, arguments);
            h = H();
            A.j(pb, {
                cursor: b,
                value: h - f
            });
            return g;
        };
    }

    function gd(a, b) {
        var d = void 0;
        return function (g) {
            var f, h;
            d = d || this;
            f = H();
            a.apply(d, [function (a) {
                h = H();
                A.j(pb, {
                    cursor: b,
                    value: h - f
                });
                g(a);
            }]);
        };
    }

    function qb(e, c) {
        for (var d = c.split("."), g = e, f = 0; f < d.length; f++) {
            if (void 0 == g[d[f]]) return;
            g = g[d[f]];
        }

        return g;
    }

    function hd() {
        for (var e = ["_Selenium_IDE_Recorder", "_phantom", "phantom.injectJs", "callPhantom", "_selenium", "callSelenium", "domAutomation", "domAutomationController", "__nightmare", "domAutomationController", "context.hashCode", "java.lang.System.exit", "spawn", "Buffer", "emit", "webdriver"], c = ["__driver_evaluate", "__webdriver_evaluate", "__selenium_evaluate", "__fxdriver_evaluate", "__driver_unwrapped", "__webdriver_unwrapped", "__selenium_unwrapped", "__fxdriver_unwrapped", "__webdriver_script_function", "__webdriver_script_func", "__webdriver_script_fn"], d = ["selenium", "webdriver", "driver"], f = 0, h = e.length; f < h; f++) if (qb(v, e[f])) return f + 1;

        e = 0;

        for (f = c.length; e < f; e++) if (qb(x, c[e])) return e + 50;

        c = 0;

        for (e = d.length; c < e; c++) if (x["documentElement"]["getAttribute"](d[c])) return c + 100;

        return !0 === qb(u, "webdriver") ? 130 : 0;
    }

    function Ma(e) {
        return x["getElementsByTagName"](e) && x["getElementsByTagName"](e).length || 0;
    }

    function jc(b) {
        return b === "undefined" ? 1 : b ? 2 : 3;
    }

    function kc() {
        var b = 65535;
        return Na < b ? ++Na : b;
    }

    function zc(a, c) {
        for (var d in c) a["setAttribute"](d, c[d]);
    }

    function Cb(a, c) {
        a["onload"] = function () {
            this["onerror"] = this["onload"] = null;
            c(null, a);
        };

        a["onerror"] = function () {
            this["onerror"] = this["onload"] = null;
            c(Error("Failed to load " + this["src"]), a);
        };
    }

    function Ac(a, c) {
        a["onreadystatechange"] = function () {
            if (this["readyState"] == "complete" || this["readyState"] == "loaded") this["onreadystatechange"] = null, c(null, a);
        };
    }

    function Oa(a, b, d) {
        a[b] = d;
    }

    function id() {
        var a = v[lc],
            c = {};
        if (!a) throw Error("Can not find configuration");
        sa || (sa = new f(a));
        Oa(c, "start", function () {
            sa._start();
        });
        Oa(c, "stop", function () {
            sa._stop();
        });
        Oa(c, "getToken", function (c, f, h, k) {
            if (c) sa._getToken(c, f, h, k); else if (typeof a["onerror"] === "function") a["onerror"](Error("Missing business key"));
        });
        Oa(c, "getNdInfo", function (a) {
            sa._getNdInfo(a);
        });
        if (typeof a["onload"] === "function") a["onload"](c);
    }

    Array.prototype.forEach || (Array.prototype.forEach = function (e, c) {
        var d, g;
        if (null == this) throw new TypeError(" this is null or not defined");
        var f = Object(this),
            h = f.length >>> 0;
        if (typeof e !== "function") throw new TypeError(e + " is not a function");
        arguments.length > 1 && (d = c);

        for (g = 0; g < h;) {
            var k;
            g in f && (k = f[g], e.call(d, k, g, f));
            g++;
        }
    });
    Array.prototype.filter || (Array.prototype.filter = function (e) {
        if (void 0 === this || null === this) throw new TypeError();
        var c = Object(this),
            d = c.length >>> 0;
        if (typeof e !== "function") throw new TypeError();

        for (var g = [], f = arguments.length >= 2 ? arguments[1] : void 0, h = 0; h < d; h++) if (h in c) {
            var k = c[h];
            e.call(f, k, h, c) && g.push(k);
        }

        return g;
    });
    Array.prototype.map || (Array.prototype.map = function (e, c) {
        var d, f, h;
        if (null == this) throw new TypeError(" this is null or not defined");
        var k = Object(this),
            l = k.length >>> 0;
        if (Object.prototype.toString.call(e) !== "[object Function]") throw new TypeError(e + " is not a function");
        c && (d = c);
        f = Array(l);

        for (h = 0; h < l;) {
            var n;
            h in k && (n = k[h], n = e.call(d, n, h, k), f[h] = n);
            h++;
        }

        return f;
    });
    Array.prototype.reduce || (Array.prototype.reduce = function (e) {
        if (null == this) throw new TypeError("Array.prototype.reduce called on null or undefined");
        if (typeof e !== "function") throw new TypeError(e + " is not a function");
        var c = Object(this),
            d = c.length >>> 0,
            g = 0,
            f;
        if (arguments.length == 2) f = arguments[1]; else {
            for (; g < d && !(g in c);) g++;

            if (g >= d) throw new TypeError("Reduce of empty array with no initial value");
            f = c[g++];
        }

        for (; g < d; g++) g in c && (f = e(f, c[g], g, c));

        return f;
    });
    Array.prototype.indexOf || (Array.prototype.indexOf = function (e, c) {
        var d;
        if (null == this) throw new TypeError("\"this\" is null or not defined");
        var g = Object(this),
            f = g.length >>> 0;
        if (f === 0) return -1;
        d = +c || 0;
        Infinity === Math.abs(d) && (d = 0);
        if (d >= f) return -1;

        for (d = Math["max"](d >= 0 ? d : f - Math.abs(d), 0); d < f;) {
            if (d in g && g[d] === e) return d;
            d++;
        }

        return -1;
    });
    var jd = window["document"];

    (function () {
        var e = Array.prototype.slice;

        try {
            e.call(jd["documentElement"]);
        } catch (c) {
            Array.prototype.slice = function (c, f) {
                f = typeof f !== "undefined" ? f : this.length;
                if (Object.prototype.toString.call(this) === "[object Array]") return e.call(this, c, f);
                var h,
                    k = [],
                    l;
                h = this.length;
                var n = c || 0,
                    n = n >= 0 ? n : h + n;
                l = f ? f : h;
                f < 0 && (l = h + f);
                l -= n;
                if (l > 0) if (k = Array(l), this.charAt) for (h = 0; h < l; h++) k[h] = this.charAt(n + h); else for (h = 0; h < l; h++) k[h] = this[n + h];
                return k;
            };
        }
    })();

    Object.keys || (Object.keys = function () {
        var e = Object.prototype.hasOwnProperty,
            c = !{
                toString: null
            }.propertyIsEnumerable("toString"),
            d = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
            g = d.length;
        return function (f) {
            if (typeof f !== "function" && (typeof f !== "object" || null === f)) throw new TypeError("Object.keys called on non-object");
            var h = [],
                k;

            for (k in f) e.call(f, k) && h.push(k);

            if (c) for (k = 0; k < g; k++) e.call(f, d[k]) && h.push(d[k]);
            return h;
        };
    }());
    typeof Object.create !== "function" && (Object.create = function (a, c) {
        function d() {
        }

        if (typeof a !== "object" && typeof a !== "function") throw new TypeError("Object prototype may only be an Object: " + a);
        if (null === a) throw Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
        if (typeof c !== "undefined") throw Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");
        d.prototype = a;
        return new d();
    });
    String.prototype.trim || (String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    });
    var lc = "WM_CONFIG",
        Fa = "WM_TID",
        qa = "WM_DID",
        mc = "WM_DIV",
        nb = "WM_NI",
        nc = "WM_NIKE",
        w = "NUMBER",
        t = "STRING",
        Y = "HEX",
        y = "BOOLEAN",
        F = "ARRAY",
        Ib = "CAT_CANVAS",
        Ya = "CAT_FONTS",
        Jb = "CAT_WEBGL",
        Mb = typeof window !== "undefined" ? window : Mb,
        v = B("window"),
        x = B("document"),
        u = B("navigator"),
        Ca = B("screen"),
        Bb = B("location"),
        bb = B("XMLHttpRequest"),
        kd = B("sessionStorage"),
        ma = B("localStorage"),
        ld = B("devicePixelRatio"),
        md = B("indexedDB"),
        nd = B("openDatabase"),
        oc = B("doNotTrack"),
        ed = B("ActiveXObject"),
        od = B("WebGLRenderingContext"),
        Z = B("encodeURIComponent"),
        Xb = B("decodeURIComponent"),
        wa = B("setTimeout"),
        pd = B("setInterval"),
        fa = B("clearTimeout"),
        la = B("parseInt"),
        Db = B("RegExp"),
        Aa = B("Date"),
        ac = B("unescape"),
        fc = B("OfflineAudioContext") || B("webkitOfflineAudioContext"),
        Pc = {}.toString;

    ra.prototype.zc = function (a) {
        this.ia = Ha(this.ia || {}, a);
    };

    ra.prototype.yc = function (a) {
        this.ca = Ha(this.ca || {}, a);
    };

    ra.prototype.j = function (a, c, d) {
        if (a = this.ca[a]) return a({
            state: this["state"],
            B: this.B,
            j: this.j
        }, c, d);
    };

    ra.prototype.B = function (a, c) {
        var d = this,
            g = {
                type: a,
                Hc: c
            },
            f = this.ia[a];
        f && (this.$b(function () {
            return f(d["state"], c);
        }), this.Mb.map(function (a) {
            return a(g, d["state"]);
        }));
    };

    ra.prototype.$b = function (a) {
        var b = this.ea;
        this.ea = !0;
        a();
        this.ea = b;
    };

    var Nc = {
            name: "JSCookie",
            m: function (a, c, d) {
                d = d ? "domain=" + d : "";
                x["cookie"] = Z(a) + "=" + Z(c) + ";expires=Tue, 19 Jan 2038 03:14:07 GMT;path=/;" + d + ";";
            },
            k: function (e) {
                for (var c = (x["cookie"] || "").split(";"), d = 0, g = c.length; d < g; d++) {
                    var f = c[d].split("="),
                        h = f[0],
                        f = f[1];
                    void 0 === f && (f = "");
                    if (h === e) return Xb(f);
                }

                return null;
            },
            W: function (a) {
                x["cookie"] = Z(a) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            }
        },
        Oc = {
            name: "localStorage",
            m: function (a, b) {
                try {
                    (v["localStorage"] || {}).setItem(a, b);
                } catch (d) {
                }
            },
            k: function (a) {
                try {
                    return (v["localStorage"] || {})["getItem"](a);
                } catch (c) {
                }
            },
            W: function (a) {
                try {
                    return (v["localStorage"] || {})["removeItem"](a);
                } catch (c) {
                }
            }
        },
        Pa = {},
        Mc = {
            name: "memoryStorage",
            m: function (a, b) {
                Pa[a] = b;
            },
            k: function (a) {
                return Pa[a];
            },
            W: function (a) {
                a in Pa && delete Pa[a];
            }
        };

    za.prototype.m = function (a, b, d) {
        var g = this;
        this.X.forEach(function (f) {
            return f.m(g.o(a), b, d);
        });
    };

    za.prototype.k = function (e) {
        for (var c = 0; c < this.X.length; c++) {
            var d = this.X[c].k(this.o(e));
            if (d) return d;
        }

        return "";
    };

    za.prototype.W = function (a) {
        var b = this;
        this.X.forEach(function (d) {
            return d.Ic(b.o(a));
        });
    };

    za.prototype.o = function (a) {
        return this.p ? this.p + ":" + a : a;
    };

    var Ia = {};

    ka.prototype.m = function (b, c, d) {
        b = this.o(b);

        if (c && typeof c === "string") {
            d = H() + la(d, 10);
            c = [c, d, H()].join(this.R);
            this.w[b] = c;

            try {
                ma.setItem(b, c);
            } catch (g) {
            }
        }
    };

    ka.prototype.mc = function (e) {
        e = this.o(e);
        var c = this.w[e];
        if (!c) try {
            c = ma["getItem"](e);
        } catch (d) {
        }
        if (!c) return !1;
        e = H();
        var c = c.split(this.R),
            g = +c[2] || 0;
        return e <= +(+c[1] || 0) && e > g ? !0 : !1;
    };

    ka.prototype.k = function (a) {
        a = this.o(a);
        var c = this.w[a];
        if (!c) try {
            c = ma["getItem"](a), this.w[a] = c;
        } catch (d) {
        }
        return c ? c.split(this.R)[0] || "" : "";
    };

    ka.prototype.kc = function (e) {
        e = this.o(e);
        var c = this.w[e];
        if (!c) try {
            c = ma["getItem"](e), this.w[e] = c;
        } catch (d) {
        }
        return c ? c.split(this.R)[1] || 0 : "";
    };

    ka.prototype.W = function (a) {
        a = this.o(a);
        delete this.w[a];

        try {
            ma["removeItem"](a);
        } catch (c) {
        }
    };

    ka.prototype.o = function (a) {
        return this.p ? this.p + ":" + a : a;
    };

    var Ja = {},
        Rc = 0,
        rb = 1,
        pc = 2,
        qc = 3,
        Qa = {};
    Qa[qc] = "request api error";
    Qa[pc] = "request resource error";
    Qa[rb] = "unknown error";

    var T = function (a) {
        function c(c, g, f) {
            void 0 === f && (f = {});
            a.call(this);
            this.name = "NEWatchmanError";
            this.code = c || rb;
            this.message = c + "(" + Qa[c] + ")" + (g ? " - " + g : "");
            this.data = f;
            a.captureStackTrace ? a.captureStackTrace(this, this.constructor) : this["stack"] = new a()["stack"];
        }

        a && (c.__proto__ = a);
        c.prototype = Object.create(a && a.prototype);
        c.prototype.constructor = c;

        c.prototype.toString = function () {
            return this["stack"] ? "" + this["stack"] : this.name + ": " + this.message;
        };

        return c;
    }(Error);

    T.K = qc;
    T.Dc = pc;
    T.UNKNOWN_ERROR = rb;
    var rc = "UPDATE_FUNC_TIMING",
        sc = "UPDATE_TIME_OFFSET",
        tc = "UPDATE_OPTIONS",
        na = "bb99db1_1",
        uc = "bb99db1_2",
        sb = "bb99db1_3",
        tb = "bb99db1_4",
        vc = "bb99db1_5",
        ub = "bb99db1_6",
        pb = "bb99db1_7",
        wc = "bb99db1_9",
        Rb = ["L", "P", "c", "4", "u", "Q", "N", "p", "t", "C", "2", "A", "6", "y", ".", "R", "9", "0", "D", "O", "B", "I", "r", "o", "S", "+", "q", "n", "x", "/", "e", "b", "3", "F", "M", "8", "f", "W", "1", "U", "Z", "G", "7", "V", "m", "w", "v", "k", "s", "g", "j", "h", "a", "T", "K", "z", "l", "X", "d", "i", "Y", "E", "H", "J"],
        Sc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/"],
        db = "5",
        Tc = "=",
        Vc = [83, 125, -76, 71, 49, 105, -1, -105, 70, -127, 50, -51, -84, -17, -4, 22, -31, -27, 101, -118, -57, 109, 4, 59, 19, 66, 120, -20, 20, -59, -93, 47, -9, -74, 78, -49, 98, 77, -80, -37, 5, -85, -111, -7, 44, 69, 99, 51, -72, 61, -108, -89, 118, 11, 56, -92, -112, -28, 16, 122, 67, 8, 80, -94, -95, 90, -26, -19, -71, 12, 113, -75, 62, -104, 27, 97, -96, 15, -113, 10, -14, 124, 117, 0, 18, -87, -40, -122, -128, 119, -47, 53, -90, 33, -78, -114, 94, -52, -39, 88, 102, -65, 39, 26, -86, 29, -99, 2, -22, 45, -70, 126, 72, -116, -30, -11, -88, 81, -44, 42, 115, 43, -5, -3, -124, 111, 92, -120, 123, -34, 48, -121, -32, -64, 104, 13, -125, 58, 85, -6, -81, -48, 40, -16, 52, -45, -18, -101, 121, 84, -97, 35, 89, 63, 93, -2, 127, 96, -103, -106, -83, 37, 116, 32, -126, -68, -10, -73, 38, 55, 1, 114, 76, 9, -24, 87, -67, -55, -43, -50, 95, -46, 46, -61, 17, -36, 25, 86, -69, 54, -23, 112, 21, -63, 79, -62, 91, -56, -29, 103, -109, -82, 74, 28, 57, 7, 82, -8, 107, -117, -77, 24, -110, -79, -35, 41, -33, 34, 36, 68, 3, 65, -91, -123, -107, -115, -60, 108, 64, 106, -58, -53, -42, -21, 6, 100, 30, -102, 73, 23, -25, -119, 110, -66, -13, -54, 75, -12, -41, -38, 31, -98, -15, -100, 60, 14],
        S = 64,
        jb = 64,
        Ka = 4,
        lb = 4,
        xc = "a02527b8",
        aa = {};

    aa[na] = function (a, b) {
        var d = a.B;
        void 0 === b && (b = {});
        d(tc, Ua(b));
    };

    aa[uc] = function (e, c, d) {
        var f = e.j;
        e = e["state"];
        void 0 === d && (d = V);
        e = e["options"];
        var h = e["domain"],
            k = e.gc,
            m = e.apiServer,
            n = Da(e["protocol"], e.__serverConfig__.apiServer || m, "/v3/d");
        Pb(n, {
            ba: "POST",
            J: {
                d: c,
                v: xc
            },
            V: function (c) {
                var e = c[0],
                    g = c[1],
                    l = c[2],
                    m = c[3],
                    p = c[5];
                e === 200 || e === 420 ? (m && f(vc, {
                    id: m,
                    rc: k * 5 / 6
                }), p && f(wc, {
                    id: p
                }), l && f(tb, {
                    domain: h,
                    id: l
                }), e === 420 && g && f(ub, g), d(null, c)) : d(new T(T.K, "device api response wrong", {
                    url: n
                }));
            },
            U: function (a) {
                void 0 === a && (a = {});
                d(new T(T.K, "send devicedata failed: " + (a.message ? a.message : ""), {
                    url: n
                }));
            }
        });
    };

    aa[sb] = function (e, c, d) {
        var f = e.j;
        e = e["state"];
        void 0 === d && (d = V);
        e = e["options"];
        var h = e["domain"],
            k = e.apiServer,
            m = Da(e["protocol"], e.__serverConfig__.apiServer || k, "/v3/b");
        Pb(m, {
            ba: "POST",
            J: {
                d: c,
                v: xc
            },
            V: function (c) {
                var e = c[0],
                    g = c[1],
                    k = c[2];
                e === 200 || e === 420 ? (k && f(tb, {
                    domain: h,
                    id: k
                }), e === 420 && g && f(ub, g), d(null, c)) : e === 470 ? d(null, c) : d(new T(T.K, "behavior api response wrong", {
                    url: m
                }));
            },
            U: function (a) {
                void 0 === a && (a = {});
                d(new T(T.K, "send devicedata failed: " + (a.message ? a.message : ""), {
                    url: m
                }));
            }
        });
    };

    aa[tb] = function (a, c) {
        var d = c.id,
            g = c["domain"];
        W().m(Fa, d, g);
    };

    aa[wc] = function (a, b) {
        var d = b.id;
        W().m(nb, d);
        W().m(nc, mb());
    };

    aa[vc] = function (a, c) {
        var d = a["state"],
            g = c.id,
            f = c.rc;
        da().m(qa, g, f);
        da().m(mc, d["options"].buildVersion, f);
    };

    aa[ub] = function (a, c) {
        var d = a.B;
        c = new Aa(c)["getTime"]();
        d(sc, c - H());
    };

    aa[pb] = function (a, b) {
        var d = a.B;
        d(rc, b);
    };

    var Ra = {};

    Ra[tc] = function (a, b) {
        a["options"] = b;
    };

    Ra[rc] = function (b, c) {
        b.$[c.cursor] = c.value || 0;
    };

    Ra[sc] = function (a, b) {
        a.wa = b;
    };

    var A = new ra({
            state: {
                options: {},
                wa: 0,
                $: [0, 0, 0, 0, 0, 0]
            },
            ac: aa,
            tc: Ra
        }),
        ba = {
            Xb: {
                c: 0,
                a: t,
                e: 3
            },
            Ka: {
                c: 1,
                a: t,
                e: 20
            },
            La: {
                c: 2,
                a: t,
                e: 32
            },
            Ia: {
                c: 3,
                a: t,
                e: 32
            },
            yb: {
                c: 4,
                a: t,
                e: 32
            },
            Pb: {
                c: 5,
                a: w,
                e: 4
            },
            Gb: {
                c: 6,
                a: w,
                e: 1
            },
            Ub: {
                c: 7,
                a: t,
                e: 32
            },
            Ya: {
                c: 8,
                a: t,
                e: 32
            },
            Fb: {
                c: 9,
                a: t,
                e: 32
            },
            Yb: {
                c: 107,
                a: w,
                e: 4
            },
            _move: {
                c: 109,
                a: F,
                e: [2, 4, 1, 4, 4]
            },
            _down: {
                c: 110,
                a: F,
                e: [2, 4, 1, 2, 4, 4]
            },
            _up: {
                c: 111,
                a: F,
                e: [2, 4, 1, 4, 4]
            },
            _click: {
                c: 112,
                a: F,
                e: [2, 4, 1, 4, 4, 20]
            },
            _keydown: {
                c: 113,
                a: F,
                e: [2, 4, 1, 20]
            },
            _focus: {
                c: 114,
                a: F,
                e: [2, 4, 1, 20]
            },
            _blur: {
                c: 115,
                a: F,
                e: [2, 4, 1, 20]
            },
            _scroll: {
                c: 116,
                a: F,
                e: [2, 4, 1, 4, 4]
            },
            _orientation: {
                c: 117,
                a: F,
                e: [2, 4, 4, 4, 4, 1]
            },
            _motion: {
                c: 118,
                a: F,
                e: [2, 4, 4, 4, 4, 2]
            },
            _battery: {
                c: 119,
                a: F,
                e: [2, 4, 1, 1, 4]
            },
            Vb: {
                c: 200,
                a: t,
                e: 400
            },
            ub: {
                c: 201,
                a: t,
                e: 20
            },
            Pa: {
                c: 202,
                a: w,
                e: 1
            },
            Xa: {
                c: 203,
                a: w,
                e: 1
            },
            Qb: {
                c: 206,
                a: w,
                e: 1
            },
            Kb: {
                c: 207,
                a: y,
                e: 1
            },
            xb: {
                c: 208,
                a: y,
                e: 1
            },
            ob: {
                c: 209,
                a: y,
                e: 1
            },
            Aa: {
                c: 210,
                a: y,
                e: 1
            },
            Ab: {
                c: 211,
                a: y,
                e: 1
            },
            Ra: {
                c: 212,
                a: t,
                e: 10
            },
            Db: {
                c: 213,
                a: t,
                e: 10
            },
            Za: {
                c: 214,
                a: t,
                e: 15
            },
            Eb: {
                c: 215,
                a: Y,
                e: 16
            },
            Ma: {
                c: 216,
                a: Y,
                e: 16
            },
            Zb: {
                c: 217,
                a: Y,
                e: 16
            },
            za: {
                c: 218,
                a: y,
                e: 1
            },
            kb: {
                c: 221,
                a: y,
                e: 1
            },
            jb: {
                c: 222,
                a: y,
                e: 1
            },
            Tb: {
                c: 223,
                a: y,
                e: 1
            },
            Hb: {
                c: 225,
                a: w,
                e: 1
            },
            Qa: {
                c: 228,
                a: y,
                e: 1
            },
            sb: {
                c: 229,
                a: y,
                e: 1
            },
            Ba: {
                c: 230,
                a: t,
                e: 20
            },
            Ca: {
                c: 231,
                a: t,
                e: 10
            },
            Da: {
                c: 232,
                a: t,
                e: 20
            },
            Ea: {
                c: 233,
                a: t,
                e: 150
            },
            vb: {
                c: 234,
                a: t,
                e: 10
            },
            Nb: {
                c: 235,
                a: t,
                e: 10
            },
            Wb: {
                c: 236,
                a: t,
                e: 10
            },
            Ja: {
                c: 237,
                a: t,
                e: 10
            },
            Bb: {
                c: 238,
                a: t,
                e: 40
            },
            $a: {
                c: 239,
                a: t,
                e: 20
            },
            eb: {
                c: 240,
                a: Y,
                e: 16
            },
            cb: {
                c: 241,
                a: w,
                e: 2
            },
            Ib: {
                c: 242,
                a: F,
                e: [2, 2, 2, 2]
            },
            hb: {
                c: 243,
                a: w,
                e: 1
            },
            ib: {
                c: 401,
                a: y,
                e: 1
            },
            bb: {
                c: 402,
                a: t,
                e: 10
            },
            zb: {
                c: 403,
                a: w,
                e: 1
            },
            ab: {
                c: 404,
                a: w,
                e: 1
            },
            Lb: {
                c: 405,
                a: y,
                e: 1
            },
            Sb: {
                c: 450,
                a: w,
                e: 1
            },
            rb: {
                c: 451,
                a: y,
                e: 1
            },
            nb: {
                c: 701,
                a: w,
                e: 1
            },
            fb: {
                c: 702,
                a: w,
                e: 1
            },
            qb: {
                c: 703,
                a: w,
                e: 1
            },
            Jb: {
                c: 704,
                a: w,
                e: 5
            },
            lb: {
                c: 705,
                a: w,
                e: 1
            },
            Rb: {
                c: 706,
                a: t,
                e: 10
            },
            tb: {
                c: 707,
                a: t,
                e: 16
            },
            Ob: {
                c: 708,
                a: w,
                e: 2
            },
            mb: {
                c: 709,
                a: w,
                e: 2
            },
            pb: {
                c: 710,
                a: w,
                e: 2
            },
            gb: {
                c: 711,
                a: F,
                e: [3, 3, 3, 3, 3]
            },
            Cb: {
                c: 712,
                a: F,
                e: [1, 3, 3]
            },
            Oa: {
                c: 713,
                a: F,
                e: [4, 4]
            },
            Sa: {
                c: 800,
                a: t,
                e: 8
            },
            Ta: {
                c: 801,
                a: t,
                e: 8
            },
            Ua: {
                c: 802,
                a: t,
                e: 8
            },
            Va: {
                c: 803,
                a: t,
                e: 8
            },
            Wa: {
                c: 804,
                a: t,
                e: 8
            },
            Ha: {
                c: 327,
                a: t,
                e: 32
            }
        },
        cc = 0,
        Gc = "2.7.1_a02527b8",
        Hc = ["7", "9", "2", "f", "f", "9", "b", "6"],
        Ic = "9,b,8,9,d,d,c,2",
        ob,
        vb,
        Ba,
        ec,
        E = gc(),
        qd = function () {
            var e = gc();
            return e === "Windows Phone" || e === "Android" || e === "iOS" ? 3 : e === "Linux" || e === "Windows" || e === "Mac" ? 2 : 1;
        }(),
        O = function () {
            var e = u["userAgent"].toLowerCase();
            return e.indexOf("firefox") >= 0 ? "Firefox" : e.indexOf("opera") >= 0 || e.indexOf("opr") >= 0 ? "Opera" : e.indexOf("chrome") >= 0 ? "Chrome" : e.indexOf("safari") >= 0 ? "Safari" : e.indexOf("trident") >= 0 ? "Internet Explorer" : "Other";
        }(),
        Xa = {
            Vb: {
                f: function () {
                    return u["userAgent"] || "";
                },
                a: t
            },
            ub: {
                f: function () {
                    return u["language"] || "";
                },
                a: t
            },
            Pa: {
                f: function () {
                    return Ca["colorDepth"] || 0;
                },
                a: w
            },
            Xa: {
                f: function () {
                    return ld || 0;
                },
                a: w
            },
            Qb: {
                f: function () {
                    return Math["floor"](new Aa()["getTimezoneOffset"]() / 60 * -1 + 12);
                },
                a: w
            },
            Kb: {
                f: function () {
                    return !!kd;
                },
                a: y
            },
            xb: {
                f: function () {
                    return !!ma;
                },
                a: y
            },
            ob: {
                f: function () {
                    return !!md;
                },
                a: y
            },
            Aa: {
                f: function () {
                    var a = x["body"];
                    return a && !!a["addBehavior"];
                },
                a: y
            },
            Ab: {
                f: function () {
                    return !!nd;
                },
                a: y
            },
            Ra: {
                f: function () {
                    return u["cpuClass"] || "";
                },
                a: t
            },
            Db: {
                f: function () {
                    return u["platform"] || "";
                },
                a: t
            },
            Za: {
                f: function () {
                    return u["doNotTrack"] ? u["doNotTrack"] : u.sc ? u.sc : oc ? oc : "unknown";
                },
                a: t
            },
            Eb: {
                f: function () {
                    var a = fd ? dd() : hc();
                    return xa(a.join("~"));
                },
                u: !0,
                a: Y
            },
            Ma: {
                f: function () {
                    var e;

                    if (ic()) {
                        if (vb) e = vb; else {
                            e = [];

                            try {
                                var c = x["createElement"]("canvas");
                                c["width"] = 500;
                                c["height"] = 200;
                                c["style"].display = "inline";
                                var d = c["getContext"]("2d");
                                d["rect"](0, 0, 10, 10);
                                d["rect"](2, 2, 6, 6);
                                e.push("canvas winding:" + (!1 === d.isPointInPath(5, 5, "evenodd") ? "yes" : "no"));
                                d["textBaseline"] = "alphabetic";
                                d["fillStyle"] = "#f60";
                                d["fillRect"](125, 1, 62, 20);
                                d["fillStyle"] = "#069";
                                d["font"] = "11pt Arial";
                                d.fillText("Cwm fjordbank glyphs vext quiz, \uD83D\uDE05\uD83D\uDE25\uD83D\uDC76\uD83D\uDE03\uD83E\uDDE5\uD83D\uDC36\uD83C\uDF4F\u26BD\uFE0F\u2702\uD83C\uDE32\uD83D\uDE97\u231A\uFE0F\u2764\uFE0F\uD83C\uDFC1\u25B6", 2, 15);
                                d["fillStyle"] = "rgba(102, 204, 0, 0.2)";
                                d["font"] = "18pt Arial";
                                d.fillText("Cwm fjordbank glyphs vext quiz, \uD83D\uDE05\uD83D\uDE25\uD83D\uDC76\uD83D\uDE03", 4, 45);
                                d.fillText("\uD83E\uDDE5\uD83D\uDC36\uD83C\uDF4F\u26BD\uFE0F\u2702\uD83C\uDE32\uD83D\uDE97\u231A\uFE0F\u2764\uFE0F\uD83C\uDFC1\u25B6", 4, 75);
                                d["globalCompositeOperation"] = "multiply";
                                d["fillStyle"] = "rgb(255,0,255)";
                                d["beginPath"]();
                                d["arc"](50, 50, 50, 0, Math.PI * 2, !0);
                                d["closePath"]();
                                d.fill();
                                d["fillStyle"] = "rgb(0,255,255)";
                                d["beginPath"]();
                                d["arc"](100, 50, 50, 0, Math.PI * 2, !0);
                                d["closePath"]();
                                d.fill();
                                d["fillStyle"] = "rgb(255,255,0)";
                                d["beginPath"]();
                                d["arc"](75, 100, 50, 0, Math.PI * 2, !0);
                                d["closePath"]();
                                d.fill();
                                d["fillStyle"] = "rgb(255,0,255)";
                                d["arc"](75, 75, 75, 0, Math.PI * 2, !0);
                                d["arc"](75, 75, 25, 0, Math.PI * 2, !0);
                                d.fill("evenodd");
                                e.push("canvas fp:" + c["toDataURL"]());
                            } catch (f) {
                                e.push(f);
                            }

                            e = vb = e;
                        }
                        e = xa(e.join("~"));
                    } else e = "";

                    return e;
                },
                a: Y,
                u: !0,
                T: Ib
            },
            Zb: {
                f: function () {
                    var a;

                    if (ic()) {
                        a = x["createElement"]("canvas");
                        var c;

                        try {
                            c = a["getContext"] && (a["getContext"]("webgl") || a["getContext"]("experimental-webgl"));
                        } catch (d) {
                            c = !1;
                        }

                        a = !!od && !!c;
                    } else a = !1;

                    return a ? xa(bd().join("~")) : "";
                },
                a: Y,
                u: !0,
                T: Jb
            },
            za: {
                f: function () {
                    var e = x["createElement"]("div"),
                        c = "fp_" + new Aa();
                    e["innerHTML"] = "&nbsp;";
                    e.className = "adsbox";
                    e.id = c;
                    var d = !1;

                    try {
                        x["body"]["appendChild"](e), d = x.getElementById(c)["offsetHeight"] === 0, x["body"]["removeChild"](e);
                    } catch (f) {
                        d = !1;
                    }

                    return d;
                },
                a: y,
                u: !0
            },
            kb: {
                f: function () {
                    var e = u["platform"],
                        c = u["oscpu"];
                    return ("ontouchstart" in v || u.qa > 0 || u.ra > 0) && E !== "Windows Phone" && E !== "Android" && E !== "iOs" && E !== "Other" || typeof c !== "undefined" && (c = c.toLowerCase(), ~c.indexOf("win") && E !== "Windows" && E !== "iOS" && E !== "Other" || ~c.indexOf("linux") && E !== "Linux" && E !== "Android" || ~c.indexOf("mac") && E !== "Mac" && E !== "iOS" || (c.indexOf("win") === -1 && c.indexOf("linux") === -1 && c.indexOf("mac" === -1)) !== (E === "Other")) ? !0 : e.indexOf("win") >= 0 && E !== "Windows" && E !== "Windows Phone" || (e.indexOf("linux") >= 0 || e.indexOf("android") >= 0 || e.indexOf("pike") >= 0) && E !== "Linux" && E !== "Android" || (e.indexOf("mac") >= 0 || e.indexOf("ipad") >= 0 || e.indexOf("ipod") >= 0 || e.indexOf("iphone") >= 0) && E !== "Mac" && E !== "iOS" || (e.indexOf("win") === -1 && e.indexOf("linux") === -1 && e.indexOf("mac") === -1) !== (E === "Other") ? !0 : typeof u["plugins"] === "undefined" && E !== "Windows" && E !== "Windows Phone" ? !0 : !1;
                },
                a: y
            },
            jb: {
                f: function () {
                    var e = u["productSub"];
                    if ((O === "Chrome" || O === "Safari" || O === "Opera") && e !== "20030107") return !0;
                    e = eval.toString().length;
                    if (e === 37 && O !== "Safari" && O !== "Firefox" && O !== "Other" || e === 39 && O !== "Internet Explorer" && O !== "Other" || e === 33 && O !== "Chrome" && O !== "Opera" && O !== "Other") return !0;
                    var c;

                    try {
                        throw Error("a");
                    } catch (d) {
                        try {
                            d["toSource"](), c = !0;
                        } catch (f) {
                            c = !1;
                        }
                    }

                    return c && O !== "Firefox" && O !== "Other" ? !0 : !1;
                },
                a: y
            },
            Tb: {
                f: function () {
                    var e = 0,
                        c = !1;
                    typeof u.qa !== "undefined" ? e = u.qa : typeof u.ra !== "undefined" && (e = u.ra);

                    try {
                        x["createEvent"]("TouchEvent"), c = !0;
                    } catch (d) {
                    }

                    var f = ("ontouchstart" in v);
                    return e > 0 || c || f;
                },
                a: y
            },
            Hb: {
                f: function () {
                    return qd;
                },
                a: w
            },
            Qa: {
                f: function () {
                    return !!u["cookieEnabled"];
                },
                a: y
            },
            sb: {
                f: function () {
                    try {
                        return !!u["javaEnabled"]();
                    } catch (a) {
                        return !1;
                    }
                },
                a: y
            },
            Ba: {
                f: function () {
                    return u["appCodeName"] || "";
                },
                a: t
            },
            Ca: {
                f: function () {
                    return u["appMinorVersion"] || "";
                },
                a: t
            },
            Da: {
                f: function () {
                    return u["appName"] || "";
                },
                a: t
            },
            Ea: {
                f: function () {
                    return u["appVersion"] || "";
                },
                a: t
            },
            vb: {
                f: function () {
                    return u["languages"] || "";
                },
                a: t
            },
            Nb: {
                f: function () {
                    return u["systemLanguage"] || "";
                },
                a: t
            },
            Wb: {
                f: function () {
                    return u["userLanguage"] || "";
                },
                a: t
            },
            Ja: {
                f: function () {
                    return u["browserLanguage"] || "";
                },
                a: t
            },
            Bb: {
                f: function () {
                    return u["oscpu"] || "";
                },
                a: t
            },
            $a: {
                f: function () {
                    return x["documentMode"] || x["compatMode"] || "";
                },
                a: t
            },
            eb: {
                f: function () {
                    return xa(dc().join("~"));
                },
                a: Y,
                u: !0,
                T: Ya
            },
            cb: {
                f: function () {
                    return dc().length || 0;
                },
                a: w,
                u: !0,
                T: Ya
            },
            hb: {
                f: function () {
                    return u["hardwareConcurrency"] || 0;
                },
                a: w
            },
            Ib: {
                f: function () {
                    var e = Ca["width"];
                    void 0 === e && (e = 0);
                    var c = Ca["height"];
                    void 0 === c && (c = 0);
                    var d = Ca["availWidth"];
                    void 0 === d && (d = 0);
                    var f = Ca["availHeight"];
                    return [e > c ? e : c, e > c ? c : e, d > f ? d : f, d > f ? f : d];
                },
                a: F
            },
            Ha: {
                f: function (a) {
                    return fc ? cd(a) : a("");
                },
                a: t,
                Fa: !0,
                u: !0
            }
        },
        Wa = [],
        Gb = 0,
        Va = [],
        Hb = !1,
        Sa = /./;

    try {
        Sa.toString = function () {
            return Sa.wc = !0;
        }, console.log("%c", Sa);
    } catch (rd) {
    }

    var Fb = {
            ib: {
                f: function () {
                    return !!Sa.wc;
                },
                a: y
            },
            bb: {
                f: function () {
                    var a;

                    try {
                        null[0]();
                    } catch (c) {
                        a = c;
                    }

                    return a && typeof a["stack"] === "string" ? ["phantomjs", "rhino", "nodejs", "couchjs", "selenium"].filter(function (c) {
                        return ~a["stack"].indexOf(c);
                    })[0] || "" : "";
                },
                a: t
            },
            zb: {
                f: function () {
                    for (var e = ["document", "navigator", "location", "history", "", "", "screen", "parent", "top", "self", {
                        q: "parseFloat",
                        n: function () {
                            try {
                                return v["parseFloat"]("1.01") === 1.01 && v["isNaN"](v["parseFloat"]("HI"));
                            } catch (c) {
                                return !1;
                            }
                        }
                    }, {
                        q: "parseInt",
                        n: function () {
                            try {
                                return v["parseInt"]("123") === 123 && v["isNaN"](v["parseFloat"]("HI"));
                            } catch (c) {
                                return !1;
                            }
                        }
                    }, {
                        q: "decodeURI",
                        n: function () {
                            try {
                                return v["decodeURI"]("%22") === "\"";
                            } catch (a) {
                                return !1;
                            }
                        }
                    }, {
                        q: "decodeURIComponent",
                        n: function () {
                            try {
                                return v["decodeURIComponent"]("%26") === "&";
                            } catch (a) {
                                return !1;
                            }
                        }
                    }, {
                        q: "encodeURI",
                        n: function () {
                            try {
                                return v["encodeURI"]("\"") === "%22";
                            } catch (a) {
                                return !1;
                            }
                        }
                    }, {
                        q: "encodeURIComponent",
                        n: function () {
                            try {
                                return v["encodeURIComponent"]("&") === "%26";
                            } catch (a) {
                                return !1;
                            }
                        }
                    }, {
                        q: "escape",
                        n: function () {
                            try {
                                return v["escape"]("&") === "%26";
                            } catch (a) {
                                return !1;
                            }
                        }
                    }, {
                        q: "unescape",
                        n: function () {
                            try {
                                return v["unescape"]("%26") === "&";
                            } catch (a) {
                                return !1;
                            }
                        }
                    }, {
                        q: "eval",
                        n: function () {
                            try {
                                return v["eval"]("(function(){return 123;})();") === 123;
                            } catch (c) {
                                return !1;
                            }
                        }
                    }, "window"], c = 0, d = e.length; c < d; c++) {
                        if (e[c].n) if (e[c].n()) continue; else return c + 1;
                        if (e[c] && !v[e[c]]) return c + 1;
                    }

                    return 0;
                },
                a: w
            },
            ab: {
                f: function () {
                    var e;
                    if (!(e = ja(hd, 5, void 0)())) a: {
                        for (var c in x) if (x[c]) {
                            try {
                                if (x[c]["cache_"] && c["match"] && c["match"](/\$[a-z]dc_/)) {
                                    e = 200;
                                    break a;
                                }
                            } catch (d) {
                            }

                            e = 0;
                            break a;
                        }

                        e = void 0;
                    }
                    if (!e) try {
                        e = v["external"] && ~v["external"].toString().indexOf("Sequentum") && 201;
                    } catch (f) {
                        e = 0;
                    }
                    return e;
                },
                a: w
            },
            Sb: {
                f: function () {
                    return v["initWatchman"]["version"] || v["initNEWatchman"]["version"] || 0;
                },
                a: w
            },
            rb: {
                f: function () {
                    for (var e = !1, c = x["getElementsByTagName"]("script"), d = 0, g = c.length; d < g; d++) {
                        var f = c[d]["src"];

                        if (f && ~f.indexOf("/tool.min.js")) {
                            e = !0;
                            break;
                        }
                    }

                    return e;
                },
                a: y
            }
        },
        Cc = {
            nb: {
                f: function () {
                    return Ma("iframe");
                },
                a: w
            },
            fb: {
                f: function () {
                    return Ma("form");
                },
                a: w
            },
            qb: {
                f: function () {
                    return Ma("input");
                },
                a: w
            },
            Jb: {
                f: function () {
                    return Ma("script");
                },
                a: w
            },
            lb: {
                f: function () {
                    return v.history.length || 0;
                },
                a: w
            },
            Rb: {
                f: function () {
                    return x["title"] || "";
                },
                a: t
            },
            tb: {
                f: function () {
                    return x.Gc || "";
                },
                a: t
            },
            Ob: {
                f: function () {
                    return (x["documentElement"]["textContent"] || x["documentElement"]["innerText"]).length || 0;
                },
                a: w
            },
            mb: {
                f: function () {
                    return x["documentElement"]["innerHTML"].length || 0;
                },
                a: w
            },
            pb: {
                f: function () {
                    return A["state"].$[0];
                },
                a: w
            },
            gb: {
                f: function () {
                    return A["state"].$.slice(1);
                },
                a: F
            },
            Cb: {
                f: function () {
                    var e = v["performance"];

                    if (e) {
                        var c = e["timing"];
                        return [e["navigation"].type, c["responseStart"] - c["requestStart"], c["responseEnd"] - c["fetchStart"]];
                    }

                    return [0, 0, 0];
                },
                a: F
            },
            Oa: {
                f: function () {
                    return [v["innerWidth"] || x["body"]["clientWidth"], v["innerHeight"] || x["body"]["clientHeight"]];
                },
                a: F
            },
            Lb: {
                f: function () {
                    return cb() ? 1 : 2;
                },
                a: w
            },
            Yb: {
                f: function () {
                    return A["state"]["options"].Cc;
                },
                a: w
            }
        },
        Ga = {
            _move: ["mousemove", "touchmove", "pointermove", "mspointermove"],
            _click: ["click"],
            _down: ["mousedown", "touchstart", "pointerdown", "mspointerdown"],
            _up: ["mouseup", "touchend", "pointerup", "mspointerup"],
            _keydown: ["keydown"],
            _focus: ["focus"],
            _blur: ["blur"],
            _scroll: ["scroll"],
            _orientation: ["deviceorientation"],
            _motion: ["devicemotion"]
        },
        ia = {},
        wb,
        xb;
    x["createElement"]("div")["addEventListener"] ? (wb = function (a, c, d) {
        a["addEventListener"](c, d, !0);
    }, xb = function (a, c, d) {
        a["removeEventListener"](c, d, !0);
    }) : (wb = function (a, c, d) {
        a["attachEvent"]("on" + c, d);
    }, xb = function (a, c, d) {
        a["detachEvent"]("on" + c, d);
    });

    ia.ta = function (a, b, d) {
        wb(a, b, d);
        return ia;
    };

    ia.sa = function (a, b, d) {
        xb(a, b, d);
        return ia;
    };

    var yb = Object.keys(Ga),
        zb = {},
        ta = !!u["getBattery"],
        Na = 0;

    U.prototype._start = function () {
        this.l || (this.l = !0, this.bc());
    };

    U.prototype._stop = function () {
        this.l = !1;
        this.ua();
        this.A();
    };

    U.prototype.A = function () {
        Na = 0;
        this._battery = {};
        if (this.g) for (var b in this.g) this.g[b] && (this.g[b] = []);
    };

    U.prototype.lc = function (e) {
        if (!this.l) return this.ua();
        e = e || v["event"];
        var c;

        a: if (c = e.type, zb[c]) c = zb[c]; else {
            for (var d = 0, f = yb.length; d < f; d++) for (var h = Ga[yb[d]], k = 0, l = h.length; k < l; k++) if (c === h[k]) {
                c = zb[c] = yb[d];
                break a;
            }

            c = "";
        }

        this.N(e, c);
    };

    U.prototype.I = function () {
        var a = this,
            b = [];
        ua(Object.keys(this.g)).forEach(function (d) {
            M(a.g[d]) === "array" && ua(a.g[d]).forEach(function (a) {
                return b.push.apply(b, a);
            });
        });
        this.A();
        return b;
    };

    U.prototype.bc = function () {
        var a = this;
        this.F.forEach(function (c) {
            var d = ~["_focus", "_blur", "_scroll", "_orientation", "_motion"].indexOf(c) ? v : x;
            a.Z[c] = d;
            // a.fa(d, c, !0);
        });
    };

    U.prototype.ua = function () {
        var a = this;
        this.F.forEach(function (b) {
            var d = a.Z[b];
            d && a.fa(d, b);
        });
        this.Z = {};
    };

    U.prototype.fa = function (a, b, d) {
        var g = this;
        Ga[b].forEach(function (b) {
            d ? ia.ta(a, b, g.pa) : ia.sa(a, b, g.pa);
        });
    };

    U.prototype.N = function (e, c) {
        var d,
            f,
            h,
            k,
            m = c.slice(1);
        d = this.ja;
        f = m + "Interval";
        var n = m + "Max",
            p = this.g[c];
        p || (p = this.g[c] = []);
        f = p.length < d[n] ? 100 : d[f];
        h = H();
        if (h - (p.ya || 0) <= f) return this;
        p.ya = h;
        p.length >= d[n] && p.shift();
        n = e;
        void 0 === n && (n = {});
        k = n["changedTouches"] && n["changedTouches"].length ? n["changedTouches"][0] : n;
        d = typeof n["isTrusted"] === "undefined" ? 1 : n["isTrusted"] ? 2 : 3;
        f = n["button"] || 0;
        h = k["clientX"] || k["screenX"];
        k = k["clientY"] || k["clientX"];
        var t = n["target"] || n["srcElement"],
            n = A["state"]["options"].S;
        void 0 === n && (n = 0);
        n = [kc(), H() - n];

        switch (m) {
            case "down":
                n.push(d, f, h << 0, k << 0);
                break;

            case "move":
                n.push(d, h << 0, k << 0);
                break;

            case "up":
                n.push(d, h << 0, k << 0);
                break;

            case "click":
                n.push(d, h << 0, k << 0, t.id || "");
                break;

            case "keydown":
            case "focus":
            case "blur":
                n.push(d, t && t.id || "");
                break;

            case "scroll":
                m = "pageXOffset" in v;
                f = (x["compatMode"] || "") === "CSS1Compat";
                m = [m ? v["pageXOffset"] : f ? x["documentElement"]["scrollLeft"] : x["body"]["scrollLeft"], m ? v["pageYOffset"] : f ? x["documentElement"]["scrollTop"] : x["body"]["scrollTop"]];
                n.push(d, m[0] << 0, m[1] << 0);
                break;

            case "orientation":
                if (null == e["alpha"] || null == e["beta"] || null == e["gamma"]) return;
                n.push(Math.round(e["alpha"]), Math.round(e["beta"]), Math.round(e["gamma"]), jc(e["absolute"]));
                break;

            case "motion":
                m = e["acceleration"] || e["accelerationIncludingGravity"];
                if (!m || null == m["x"] || null == m["y"] || null == m["z"]) return;
                n.push(Math.round(m["x"] * 1000), Math.round(m["y"] * 1000), Math.round(m["z"] * 1000), e["interval"]);
                break;

            default:
                n.length = 0;
        }

        n.length && ("", p.push(va(n, ba[c])));
    };

    oa.prototype._start = function () {
        var a = this;
        this.l || (this.l = !0, this.D = u["getBattery"](), this.D.then(function (c) {
            a._battery["charging"] = c["charging"];
            a._battery["level"] = c["level"];
            a._battery["chargingTime"] = c["chargingTime"];
            a._battery["dischargingTime"] = c["dischargingTime"];
            a.N(a._battery);
            // a.F.forEach(function (b) {
            //   return ia.ta(c, b, a.da);
            // });
        }));
    };

    oa.prototype._stop = function () {
        var a = this;
        this.l = !1;
        this.D && this.D.then(function (b) {
            a.F.forEach(function (d) {
                return ia.sa(b, d, a.da);
            });
        });
        this.A();
    };

    oa.prototype.A = function () {
        Na = 0;
        this.g = [];
        this.D = null;
        this._battery = {};
    };

    oa.prototype.N = function (e) {
        function c(a) {
            return null == e[a] ? d._battery[a] : e[a];
        }

        var d = this,
            f = this.g.length < this.Y[0] ? 100 : this.Y[1],
            h = H();
        if (h - (this.wb || 0) <= f) return this;
        this.wb = h;
        this.g.length >= this.Y[0] && this.g.shift();
        f = A["state"]["options"].S;
        void 0 === f && (f = 0);
        var f = [kc(), H() - f],
            h = [c("charging"), c("level"), c("chargingTime"), c("dischargingTime")],
            k = h[0],
            m = h[2],
            n = h[3];
        f.push(jc(k), Math.round(h[1] * 100), function (c) {
            return typeof c === "number" && isFinite(c) ? c : -1;
        }(k ? m : n));
        "";
        this.g.push(va(f, ba["_battery"]));
    };

    oa.prototype.I = function () {
        var a = [];
        this.g.forEach(function (b) {
            return a = a.concat(b);
        });
        this.g = [];
        return a;
    };

    var Ta,
        R = cb();

    Q.prototype._start = function () {
        this.P._start();

        ta && this.L._start();
    };

    Q.prototype._stop = function () {
        this.P._stop();

        ta && this.L._stop();
    };

    Q.prototype.A = function () {
        this.P.A();
        ta && this.L.A();
    };

    Q.prototype.I = function () {
        return this.P.I().concat(ta ? this.L.I() : []);
    };

    f.prototype.aa = function (a) {
        this.h = n(a);
        this.ec();
        A.j(na, this.h);
        this.nc();
    };

    f.prototype.ec = function () {
        var e = this.h,
            c = e.buildVersion,
            d = e.sConfig,
            f = e.staticServer,
            g = e.oc,
            e = e.valid;
        void 0 === e && (e = 0);
        if (!(e > 0) && d && M(g) === "number") try {
            ma.setItem(lc, JSON["stringify"]({
                sConfig: d,
                buildVersion: c,
                staticServer: f,
                valid: H() + la(g, 10)
            }));
        } catch (h) {
        }
    };

    f.prototype.nc = function () {
        var a = this.h,
            c = a["auto"],
            a = a.oa;
        this.M = new Q();
        this.Q = !1;
        c && this._start();
        a && (this.O() || this.H(), this.Na());
    };

    f.prototype.na = function () {
        for (var b = this.ma, c = 0, d = b.length; c < d; c++) b[c]();

        b.length = 0;
    };

    f.prototype.O = function () {
        var a = this.h,
            b = a.buildVersion,
            d = a.lastUsedVersion;
        if (!a.oa) return !0;
        var a = da().mc(qa),
            f = da().k(mc),
            g = W().k(Fa),
            h = W().k(nb);
        return !(d && f && f !== b && f !== d) && a && g && h;
    };

    f.prototype.H = function (e) {
        var c = this;
        typeof e === "function" && this.ma.push(e);
        this.Q || (this.Q = !0, this.ga(function (b, e) {
            var f = e && e[0];
            if (b || f === 420) return b && h(b), c.ga(function (a) {
                a && h(a, !0);
                c.na();
                c.Q = !1;
            });
            f === 200 && (c.na(), c.Q = !1);
        }));
    };

    f.prototype.Na = function () {
        var b = this,
            c = 60 * 1000;
        pd(function () {
            da().kc(qa) - H() <= c * 5 && b.H();
        }, c * 5);
    };

    f.prototype.ga = function (e) {
        void 0 === e && (e = V);
        var c = Za();
        gd(Dc, 3)(function (d) {
            var f = Eb(!0);
            "";
            "";
            "";
            d = ja(kb, 1, void 0)(c.concat(d, f));
            A.j(uc, d, e);
        });
    };

    f.prototype._start = function () {
        this.l || (this.l = !0, this.O() || this.H(), this.h.C = $b(), this.h.S = H(), A.j(na, this.h), this.M._start());
    };

    f.prototype._stop = function () {
        this.l = !1;

        this.M._stop();
    };

    f.prototype.ha = function (e, c, d, f) {
        function g() {
            x || (fa(y), c(bc({
                C: t,
                ka: x
            })));
        }

        function k() {
            x || (fa(y), console.log("\u8D85\u65F6\u4E86"), x = u.h.pc = !0, A.j(na, u.h), c(bc({
                C: t,
                ka: x
            })));
        }

        M(d) !== "function" && (f = d, d = void 0);
        var l = this.h,
            n = l.S,
            p = l.dc,
            l = l.Ac;
        this.h.Cc = H() - n;
        this.h.S = H();
        var t = this.h.C = $b();

        if (!~p.indexOf(e)) {
            this.h.la = e;
            A.j(na, this.h);
            var u = this;
            e = Za();
            var v = ja(this.M.I, 4, this.M)(),
                w = Eb();
            "";
            "";
            "";
            e = ja(kb, 1, void 0)(e.concat(w, v));
            var x = this.h.pc = !1,
                y = wa(k, +f >= 0 ? +f : l);
            A.j(sb, e, function (c, e) {
                var f = e && e[0];
                return c ? (h(c), k()) : f === 200 ? g() : f === 470 && d ? (fa(y), d(Error("businessKey is illegal"))) : f === 420 ? (f = Za(), f = ja(kb, 1, void 0)(f.concat(w, v)), A.j(sb, f, g)) : k();
            });
        }
    };

    f.prototype._getToken = function (a, b, d, f) {
        var g = this;
        void 0 === b && (b = V);
        this.O() ? this.ha(a, b, d, f) : this.H(function () {
            return g.ha(a, b, d, f);
        });
    };

    f.prototype._getNdInfo = function (a) {
        void 0 === a && (a = V);
        this.O() ? a(mb()) : this.H(function () {
            var b = mb();
            W().m(nc, b);
            a(b);
        });
    };

    var sa;
    v["Watchman"] = f;
})();

function M(a) {
    return {
        start: function () {
            a._start()
        },
        stop: function () {
            a._stop()
        },
        getToken: function (b, c, e) {
            if (!b)
                throw Error("Missing business key");
            a._getToken(b, c, e)
        },
        getNdInfo: function (b) {
            a._getNdInfo(b)
        },
        setCustomTrackId: function (b) {
            a._setCustomTrackId && a._setCustomTrackId(b)
        },
        getInstance: function () {
            return a
        }
    }
}

function get_ac_token(l){
    function w(a){
        void 0 === a && (a = 0);
        return (new Date).getTime() + parseInt(a, 10)
    };
    function y(a, b, c) {
        try {
            var e = w(c);
            localStorage.setItem(a, b + k + e)
        } catch(d) {}
    }

    var u = {
        "configHash": l.conf,
        "lastUsedVersion": l.luv,
        "sConfig": l.conf,
        "staticServer": l.s,
        "apiServer": l.as,
        "staticServers": l.ss,
        "apiServers": l.ass,
        "buildVersion": l.v,
        "protocol": "https",
        "productNumber": "YD20160637306799",
        "merged": true,
        "auto": true,
        "timeout": 6000,
        "pn": "YD20160637306799"
    }
    e = M(new window['Watchman'](u));
    e.getToken('07e2387ab53a4d6f930b8d9a9be71bdf', function (e) {
        console.log(console.log("acToken is:", e))
        window['acToken']  = e;
    }, 750)

}

console.log(get_ac_token({'s': 'acstatic-dun.126.net',
    'v': '2.7.1_7c08033d',
    'luv': '2.7.1_a02527b8',
    'as': 'ac.dun.163yun.com',
    'ivp': 300000,
    'conf': '9ca170a1abeedba16ba1f2ac96ed26f3eafdcfe265aff1bad3ae70e2f4ee83e27fe2e6ee82e226a8aba2cfb43ef1f2ad90f025b6eee183a128e2bca4c3b92ae2f4ee8ee867e2e6fbd1af2aafbba7c3b939f4f0e4c3e26faffef6d3b328e2bdab8aa132f1f000cda161a7b3eedbb43cf0fea586ec2afaed00d1af2aa6bba3c3b93af4f4ee87e863e2e6fdd1b328e2adab8ea132f2f0e4c3f26fabfef6d4b33cf0feab8be270e2e6aa82ef79a7f4ee86e579e2e6aa82ef79a7f4ee86f679e2e6aa82ef79a7f4ee93e880e2e6ffcda169afb2eedbb128e2bda7c3b93bf4f0e4c3ee80a7b3eedbb83cf0fea195e863e2e6fdd1b328e2b3bc86f02afaeb00cda167b8bba7c3b939f4f0e4c3f366e2e6eebac73af4effad1b539f5ed00d7b633fbfee4c3e870a1fef695f17fa7f4ee83ef2afafeeecda163b6b0eedbb23cf4f000d1af2aa8acba91a132fceafcd1b33cf4f0e4c3f780adfef6d3b33cf4f4ee86e47fe2e6aa82ef79a7f4ee82e780e2e6fbd1af2aa7acadc3b96ea3b4bd86af2ab8bdbcc3b93cbf',
    'ass': ['ac.dun.163.com', 'ac.dun.163yun.com'],
    'ss': ['acstatic-dun.126.net', 'acstatic.dun.163yun.com'],
    'cvk': 'e83a009874ccd095e6a37c43ad1c5b4f'}));