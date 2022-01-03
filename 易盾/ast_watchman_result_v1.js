const OfflineAudioContext = require("web-audio-engine").OfflineAudioContext;

// try {
//   var f = new OfflineAudioContext(1, 44100, 44100),
//       m = f["createOscillator"]();
//   m["type"] = "triangle";
//   m["frequency"]["value"] = 10000;
//   var h = f["createDynamicsCompressor"]();
//   h["threshold"] && (h["threshold"]["value"] = -50);
//   h["knee"] && (h["knee"]["value"] = 40);
//   h["ratio"] && (h["ratio"]["value"] = 12);
//   h["reduction"] && (h["reduction"]["value"] = -20);
//   h["attack"] && (h["attack"]["value"] = 0);
//   h["release"] && (h["release"]["value"] = 0.25);
//   m["connect"](h);
//   h["connect"](f["destination"]);
//   m["start"](0);
//   setTimeout(function () {
//
//
//     f["oncomplete"] = function () {};
//
//     f = null;
//   }, 1000);
//
//
//   f["startRendering"]();
// } catch (l) {
//   console.log(l);
// }


require("fake-indexeddb/auto");
const fs = require('fs');
var dtaEventTarget = require('./simpleEventTarget').EventTarget;

var xml_http_request = require('xhr2');
var XMLHttpRequest = xml_http_request.XMLHttpRequest;
XMLHttpRequest.prototype.withCredentials = true;

var openDatabase = require('websql');
var navigator = require("./navigator").navigator;
var deprecated_color = require("./deprecated_system_color").color;
var mock_cookie = require("./cookie").mock;
var localStorage = require('./localStorage');
var sessionStorage = require('./sessionStorage');
var canvas = require('canvas');
const jsdom = require("jsdom");

const {JSDOM} = jsdom;
let index_code = fs.readFileSync("F:\\code\\SpiderCollection\\易盾\\static\\index.html", {
    encoding: "utf-8"
});

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
Object.setPrototypeOf(window, Window.prototype);
Object.setPrototypeOf(Window.prototype, dtaEventTarget.prototype);

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

window.parent = window;
window.top = window;
window.self = window;
window.window = window;


document = new Object();
document.compatMode = 'CSS1Compat';
document.title = dom.window.document.title;
tool_script = dom.window.document.createElement('script');
tool_script.src = 'https://acstatic-dun.126.net/tool.min.js'
dom.window.document.body.appendChild(tool_script)
document.body = {
    "id": "",
    "scrollLeft": 0,
    "scrollTop": 0,
    "innerHTML": dom.window.document.body.innerHTML,
    "innerText": dom.window.document.body.innerText,
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
// dom.window.document.documentElement
var document_documentElement_custom_properties = {
    "scrollLeft": 0,
    "scrollTop": 5,
    "innerHTML": {"length": 98427},
    "innerText": {"length": 810},
    "textContent": {"length": 70367},
};
function documentElementHand(watchName){
    let handler = {
        get: function (obj, prop) {
            console.log(`[${watchName}] setting propKey is [${getPrintShow(prop)}]`);
            if (prop in document_documentElement_custom_properties){
                return document_documentElement_custom_properties[prop]
            }
            return obj[prop];
        }
    }
    return handler;
}
documentElement = Object.assign(dom.window.document.documentElement, {})
document.documentElement = new Proxy(documentElement, documentElementHand("document.documentElement"))

document.getElementsByTagName = function (tag) {
    if (tag.toLowerCase() === "iframe") {
        return {
            "length": 5,
        }
    }else if (tag.toLowerCase() === "form"){
        return {"length": 0}
    }else if (tag.toLowerCase() === "input"){
        return {"length": 10}
    }else if (tag.toLowerCase() === "script"){
        return {"length": 29}
    }
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
Object.setPrototypeOf(document, dtaEventTarget.prototype)
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
location.protocol = "https:";
location.href = "https://dun.163.com/trial/jigsaw";
location.pathname = "/trial/jigsaw";
location.host = "dun.163.com";
location.hostname = "dun.163.com";
location.origin = "https://www.nmpa.gov.cn";
location.replace = String.prototype.replace;
window.location = location;

window.WebGLRenderingContext = function () {
    debugger
};
window.performance = {
    "eventCounts": {},
    "memory": {},
    "navigation": {
        redirectCount: 0,
        type: 1
    },
    "onresourcetimingbufferfull": null,
    "timeOrigin": "",
    "timing": {
        responseStart: 172,
        requestStart: 4,
        responseEnd: 174,
        fetchStart: 0
    }
}
window.pageXOffset = 0;
window.pageYOffset = 0;
window.external = dom.window.external;
window.innerWidth = 1426;
window.innerHeight = 937;
window.devicePixelRatio = 1;
window.navigator = navigator;
window.sessionStorage = sessionStorage;
window.localStorage = localStorage;
window.indexedDB = indexedDB;
window.openDatabase = openDatabase;
window.XMLHttpRequest = XMLHttpRequest;
window.OfflineAudioContext = OfflineAudioContext;
window.getComputedStyle = function (ele) {
    return ele.style;
};
window.clientInformation = Object.assign(navigator, {})
window.initWatchman || (window.initWatchman = window.initNEWatchman = {},
    window.initWatchman.version = 7,
    window.initWatchman.__instances__ = {},
    window.initWatchman.__supportCaptcha__ = !0)

consoleAble = true

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


// watchMan.js
(function () {
    function f(d) {
        void 0 === d && (d = {});
        this.aa = ka(this.aa, 0, this);
        this.ma = [];
        this.aa(d);
    }

    function h(d, e) {
        function g(a) {
            var d = {},
                e = null,
                g = null;
            k.concat(n).forEach(function (a) {
                window[a] && (d[a] = window[a]);
            });
            var t = Ea(m, f);
            q(t, {
                charset: "gbk"
            }, function (t, m) {
                if (t) return "", null;
                m && m.parentElement["removeChild"](m);
                e = k.map(function (a) {
                    return window[a];
                }).join("/");
                g = n.map(function (a) {
                    return window[a];
                }).join("/");
                "";
                "";
                a(e, g);

                for (var l in d) window[l] = d[l];
            });
        }

        var t = D["state"]["options"],
            m = t["protocol"],
            v = t.apiServer,
            l = t["productNumber"];
        void 0 === l && (l = "");
        var p = t.la;
        void 0 === p && (p = "");
        t = t.C;
        void 0 === t && (t = "");
        var Ac = X().k(Fa),
            f = "nstool.netease.com/info.js",
            k = ["ip", "ip_isp", "ip_province", "ip_city"],
            n = ["dns", "dns_isp", "dns_province", "dns_city", "res", "msg"];

        (function (a) {
            g(function (d, e) {
                a.ip = d;
                a.dns = e;
                var g = Ea(m, v, "/v2/collect");
                Bb(g, {
                    J: a
                });
            });
        })({
            tid: Ac,
            referrer: Cb.href || "",
            pn: l,
            bid: p,
            tid2: t,
            type: d.code,
            message: d.toString(),
            target: d.data.url || "",
            requestCount: e ? 2 : 1,
            osv: w["platform"] || "",
            sdkv: "2.7.1_7c08033d"
        });
    }

    function q(a, e, g) {
        var t = document.head || document["getElementsByTagName"]("head")[0],
            m = document["createElement"]("script");
        typeof e === "function" && (g = e, e = {});
        e = e || {};

        g = g || function () {
        };

        m.type = e.type || "text/javascript";
        m.charset = e.charset || "utf8";
        m.async = "async" in e ? !!e.async : !0;
        m["src"] = a;
        e.cc && Bc(m, e.cc);
        e.text && (m.text = "" + e.text);
        ("onload" in m ? Db : Cc)(m, g);
        m["onload"] || Db(m, g);
        t["appendChild"](m);
    }

    function n(d) {
        function e(d, e) {
            return d || d === 0 ? d : e;
        }

        function g(a, d) {
            return typeof a === "boolean" ? a : d;
        }

        var t = d.buildVersion,
            m = d.lastUsedVersion,
            v = d.staticServer,
            l = d.apiServer,
            p = d["auto"];
        void 0 === p && (p = !0);
        var f = d.valid,
            Ta = d.sConfig,
            h = d.configHash,
            q = d["protocol"],
            u = d.pn,
            x = d["productNumber"],
            w = d["onload"],
            z = d["onerror"],
            y = d.merged;
        d = d.__serverConfig__;
        void 0 === d && (d = {});
        var B = {};
        if (h || Ta) try {
            var A = ka(Dc, 2, void 0)(h || Ta),
                B = JSON["parse"](A);
        } catch (D) {
            "";
        }
        var A = N(B.bl) === "string" ? B.bl.split(",") : [],
            C = N(B.dl) === "string" ? B.dl.split(",") : [],
            F = r(C),
            E = 1000 * 60 * 60;
        return {
            auto: p,
            onload: w,
            onerror: z,
            staticServer: v,
            apiServer: l,
            productNumber: x || u,
            protocol: q,
            domain: F,
            Ec: C,
            dc: A,
            buildVersion: t,
            lastUsedVersion: m,
            sConfig: Ta,
            configHash: h,
            valid: f,
            merged: y,
            hc: g(B.ejcd, !1),
            ic: g(B.ews, !1),
            oa: g(B.edc, !0),
            oc: e(B.ivp, E * 24),
            gc: e(B.dtvp, E),
            Ac: e(B.tto, 2000),
            va: e(B.ret, 1),
            moveMax: B.mem,
            moveInterval: B.mei,
            keydownMax: B.kem,
            keydownInterval: B.kei,
            clickMax: B.cem,
            clickInterval: B.cei,
            upMax: B.cem,
            upInterval: B.cei,
            downMax: B.cem,
            downInterval: B.cei,
            focusMax: B.fem,
            focusInterval: B.fei,
            blurMax: B.fem,
            blurInterval: B.fei,
            scrollMax: B.sem,
            scrollInterval: B.sei,
            orientationMax: B.otem,
            orientationInterval: B.otei,
            motionMax: B.mtem,
            motionInterval: B.mtei,
            __serverConfig__: d
        };
    }

    function r(d) {
        void 0 === d && (d = []);
        var e = Cb["hostname"];
        if (!e || !d.length) return "";

        try {
            for (var g = 0; g < d.length; g++) {
                var t = d[g];

                if (null === t || void 0 === t ? 0 : null !== /^[a-zA-Z0-9_.-]+$/.exec(t)) {
                    var m = new Eb(d[g].replace(/\./g, "\\.") + "$");
                    if (null !== e.match(m)) return d[g];
                }
            }
        } catch (v) {
            "";
        }

        return "";
    }

    function R() {
        if (Ua) return Ua;
        Ua = this;
        var d = Va(D["state"]["options"]),
            e = {
                moveMax: S ? 50 : 3,
                moveInterval: 300,
                downMax: S ? 20 : 3,
                downInterval: 300,
                upMax: S ? 20 : 3,
                upInterval: 300,
                clickMax: S ? 20 : 1,
                clickInterval: 300,
                focusMax: S ? 20 : 1,
                focusInterval: 300,
                blurMax: S ? 20 : 1,
                blurInterval: 300,
                keydownMax: S ? 10 : 2,
                keydownInterval: 300,
                scrollMax: S ? 20 : 2,
                scrollInterval: 300,
                orientationMax: S ? 50 : 2,
                orientationInterval: 3000,
                motionMax: S ? 50 : 2,
                motionInterval: 3000,
                batteryMax: S ? 100 : 3,
                batteryInterval: 10
            };
        Object.keys(e).forEach(function (g) {
            d[g] = d[g] > 0 ? ~g.indexOf("Max") ? Math["min"](d[g], e[g]) : Math["max"](d[g], e[g]) : e[g];
        });
        D.j(oa, d);
        this.P = new V(d);
        ua && (this.L = new pa(d));
    }

    function pa(a) {
        void 0 === a && (a = {});
        var e = this;
        this.F = ["chargingchange", "chargingtimechange", "dischargingtimechange", "levelchange"];
        this.Y = [a["batteryMax"], a["batteryInterval"]];
        this.ja = a;
        this.g = [];
        this.l = !1;
        this.D = null;
        this._battery = {};

        this.da = function (a) {
            return e.N(a);
        };
    }

    function V(a) {
        var e = this;
        void 0 === a && (a = {});
        this.F = Object.keys(Ga);
        this.Z = {};
        this.ja = a;
        this.g = {};
        this.l = !1;

        this.pa = function () {
            for (var a = [], d = arguments.length; d--;) a[d] = arguments[d];

            e.lc.apply(e, a);
        };
    }

    function Fb(a) {
        var e = a ? Gb : Ha(Gb, Ec),
            g = [];

        try {
            va(Object.keys(e)).forEach(function (a) {
                var d = e[a].f();
                console.log("检查:" + a + " , result is: " + d);
                "";
                g.push.apply(g, wa(d, ca[a]));
            });
        } catch (b) {
        }

        return g;
    }

    function Fc(d) {
        function e() {
            Hb >= Wa.length && (Ib = !0, Xa = va(g).reduce(function (a, d) {
                a.push.apply(a, d);
                return a;
            }, []), d(Xa));
        }

        var g = [];
        if (Ib) return d(Xa);
        var t = D["state"]["options"],
            m = t.hc;
        void 0 === m && (m = !1);
        var v = t.Fc;
        void 0 === v && (v = !0);
        var l = t.ic;
        void 0 === l && (l = !1);
        Object.keys(Ya).forEach(function (a) {
            var d = Ya[a],
                e = d.T,
                g = Ya[a].Fa;
            d.jc = a;
            ca[a].a !== d.a || N(d) !== "object" || e && (e === Jb && !v || e === Za && !m || e === Kb && !l) || (d.Ga = g ? d.f : function (a) {
                return a(d.f());
            }, Wa.push(d));
        });
        Wa.forEach(function (d) {
            function b() {
                function a(b, t) {
                    "";

                    g.push(wa(b, ca[d.jc], !!t));
                    Hb++;
                    e();
                }

                try {
                    d.Ga(a);
                } catch (t) {
                    a([], Error("cannot got value"));
                }
            }

            d.u ? xa(b, 0) : b();
        });
    }

    function ya(d) {
        var e;
        d = d || "~";
        e = e || 0;
        var g = d.length % 16,
            t = d.length - g,
            m = [0, e];
        e = [0, e];

        for (var v = [0, 0], l = [0, 0], p = [2277735313, 289559509], f = [1291169091, 658871167], h = 0; h < t; h += 16) v = [d.charCodeAt(h + 4) & 255 | (d.charCodeAt(h + 5) & 255) << 8 | (d.charCodeAt(h + 6) & 255) << 16 | (d.charCodeAt(h + 7) & 255) << 24, d.charCodeAt(h) & 255 | (d.charCodeAt(h + 1) & 255) << 8 | (d.charCodeAt(h + 2) & 255) << 16 | (d.charCodeAt(h + 3) & 255) << 24], l = [d.charCodeAt(h + 12) & 255 | (d.charCodeAt(h + 13) & 255) << 8 | (d.charCodeAt(h + 14) & 255) << 16 | (d.charCodeAt(h + 15) & 255) << 24, d.charCodeAt(h + 8) & 255 | (d.charCodeAt(h + 9) & 255) << 8 | (d.charCodeAt(h + 10) & 255) << 16 | (d.charCodeAt(h + 11) & 255) << 24], v = Q(v, p), v = qa(v, 31), v = Q(v, f), m = E(m, v), m = qa(m, 27), m = da(m, e), m = da(Q(m, [0, 5]), [0, 1390208809]), l = Q(l, f), l = qa(l, 33), l = Q(l, p), e = E(e, l), e = qa(e, 31), e = da(e, m), e = da(Q(e, [0, 5]), [0, 944331445]);

        v = [0, 0];
        l = [0, 0];

        switch (g) {
            case 15:
                l = E(l, O([0, d.charCodeAt(h + 14)], 48));

            case 14:
                l = E(l, O([0, d.charCodeAt(h + 13)], 40));

            case 13:
                l = E(l, O([0, d.charCodeAt(h + 12)], 32));

            case 12:
                l = E(l, O([0, d.charCodeAt(h + 11)], 24));

            case 11:
                l = E(l, O([0, d.charCodeAt(h + 10)], 16));

            case 10:
                l = E(l, O([0, d.charCodeAt(h + 9)], 8));

            case 9:
                l = E(l, [0, d.charCodeAt(h + 8)]), l = Q(l, f), l = qa(l, 33), l = Q(l, p), e = E(e, l);

            case 8:
                v = E(v, O([0, d.charCodeAt(h + 7)], 56));

            case 7:
                v = E(v, O([0, d.charCodeAt(h + 6)], 48));

            case 6:
                v = E(v, O([0, d.charCodeAt(h + 5)], 40));

            case 5:
                v = E(v, O([0, d.charCodeAt(h + 4)], 32));

            case 4:
                v = E(v, O([0, d.charCodeAt(h + 3)], 24));

            case 3:
                v = E(v, O([0, d.charCodeAt(h + 2)], 16));

            case 2:
                v = E(v, O([0, d.charCodeAt(h + 1)], 8));

            case 1:
                v = E(v, [0, d.charCodeAt(h)]), v = Q(v, p), v = qa(v, 31), v = Q(v, f), m = E(m, v);
        }

        m = E(m, [0, d.length]);
        e = E(e, [0, d.length]);
        m = da(m, e);
        e = da(e, m);
        m = Lb(m);
        e = Lb(e);
        m = da(m, e);
        e = da(e, m);
        return ("00000000" + (m[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (m[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (e[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (e[1] >>> 0).toString(16)).slice(-8);
    }

    function $a() {
        var d = D["state"]["options"],
            e = X().k(Fa),
            g = ea().k(ra),
            t = d.la,
            m = d.C,
            d = d["productNumber"],
            v = {
                Xb: "200",
                Gb: Gc(),
                yb: ab(),
                Pb: Hc(J() + (D["state"].wa || 0)),
                Ka: Ic,
                La: t,
                Ia: m,
                Ub: e,
                Ya: g,
                Fb: d,
                Sa: Jc,
                Ta: Kc,
                Ua: void 0,
                Va: Lc,
                Wa: Mc
            },
            l = [];
        va(Object.keys(v)).forEach(function (d) {
            N(v[d]) !== "undefined" && (ca[d].c >= 800 && ca[d].c <= 804 && (v[d] = Nc(v[d])), "", l.push.apply(l, wa(v[d], ca[d])));
        });
        return l;
    }

    function Lc() {
        return "757c7093";
    }

    function wa(d, e, g) {
        var t = e.a,
            m = e.e,
            v = [];
        if (!g && (t === A && (v = fa(Y(d ? 1 : 2), m)), t === y && (v = fa(Y(d), m)), t === Z && (v = fa(Mb(d), m)), t === u && (v = za(fa(d, m))), t === H)) for (g = 0, t = d.length; g < t; g++) {
            var l = m[g],
                p = d[g];
            N(d[g]) === "number" && v.push.apply(v, fa(Y(p), l));
            N(d[g]) === "string" && v.push.apply(v, za(fa(p, l)));
        }
        d = fa(Y(e.c), 2);
        e = fa(Y(v.length), 2);
        return d.concat(e, v);
    }

    function Oc(d, e) {
        console.log("开始请求环境config")
        void 0 === e && (e = {});
        var g,
            t,
            m = e.ba,
            v = e.J;
        void 0 === v && (v = {});
        var l = e.xa;
        void 0 === l && (l = 60000);
        var p = e.V;
        void 0 === p && (p = W);
        var h = e.U;
        void 0 === h && (h = W);
        v["cb"] = "__wmjsonp_" + ab().slice(2, 9);
        l && (t = xa(function () {
            t && ga(t);
            g && typeof g["abort"] === "function" && g["abort"]();
            h(Error("Request timed out"));
        }, l));
        m === "GET" && (d += (~d.indexOf("?") ? "&" : "?") + bb(v));
        cb ? (g = new cb(), "withCredentials" in g ? (g["open"](m, d, !0), g["setRequestHeader"]("Content-type", "application/x-www-form-urlencoded"), g["onerror"] = e["onerror"], g["onreadystatechange"] = function () {
            if (g["readyState"] === 4) if (t && ga(t), g["status"] >= 200 && g["status"] < 400) {
                var d,
                    e = new Eb("^" + v["cb"] + "\\((.+)\\)$");

                try {
                    d = JSON["parse"]((g["responseText"] || "").match(e)[1] || "");
                } catch (m) {
                }

                d ? p(d) : h(Error("Response is empty"));
            } else h(Error("The server has encountered an error"));
        }, g["send"](bb(v))) : (t && ga(t), h(Error("Does not support CORS")), "")) : (t && ga(t), h(Error("Does not support CORS")), "");
        return g && typeof g["abort"] === "function" && g["abort"];
    }

    function la(a) {
        void 0 === a && (a = {});
        this.R = "__";
        this.w = {};
        this.p = a.p || "";
    }

    function Aa(a) {
        void 0 === a && (a = {});
        this.p = a.p || "";
        this.X = [Pc, Qc, Rc];
    }

    function sa(a) {
        this["state"] = a["state"];
        this.Mb = [];
        var e = this,
            g = this.j,
            c = this.B;

        this.j = function (a, d, c) {
            return g.call(e, a, d, c);
        };

        this.B = function (a, d) {
            return c.call(e, a, d);
        };

        this.yc(a.ac);
        this.zc(a.tc);
    }

    function F(a) {
        try {
            return Nb[a];
        } catch (e) {
        }
    }

    function ab() {
        return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (d) {
            var e = Math["random"]() * 16 | 0;
            return (d === "x" ? e : e & 3 | 8).toString(16);
        });
    }

    function Hc(d) {
        void 0 === d && (d = 0);
        d = new Ba(d)["getTime"]();
        return ma(d / 1000, 10);
    }

    function N(d) {
        return null == d ? String(d) : Sc.call(d).slice(8, -1).toLowerCase();
    }

    function W() {
    }

    function Tc(a, e) {
        return a.filter(e)[0];
    }

    function Va(a, e) {
        void 0 === e && (e = []);
        if (null === a || typeof a !== "object") return a;
        var g = Tc(e, function (e) {
            return e.xc === a;
        });
        if (g) return g.fc;
        var t = N(a) === "array" ? [] : {};
        e.push({
            xc: a,
            fc: t
        });
        Object.keys(a).forEach(function (g) {
            t[g] = Va(a[g], e);
        });
        return t;
    }

    function db() {
        var a;

        try {
            a = new cb();
        } catch (e) {
        }

        return !!a && "withCredentials" in a;
    }

    function bb(a) {
        return Object.keys(a).map(function (e) {
            return aa(e) + "=" + aa(a[e]);
        }).join("&");
    }

    function Ob(a) {
        return a.replace(/(^\/)|(\/$)/g, "");
    }

    function Ea(a, e, g) {
        e = Ob(e.replace(/^https?:\/\//i, ""));
        return (g = g ? Ob(g) : "") ? a + "://" + e + "/" + g : a + "://" + e;
    }

    function Ha(a, e) {
        for (var g in e) !e.hasOwnProperty(g) || (a[g] = e[g]);

        return a;
    }

    function J() {
        return new Ba()["getTime"]();
    }

    function va(a) {
        for (var e = a.length, g, t; e;) t = Math["floor"](Math["random"]() * e--), g = a[e], a[e] = a[t], a[t] = g;

        return a;
    }

    function X() {
        var a = D["state"]["options"].merged ? D["state"]["options"]["productNumber"] : "";
        if (Ia[a]) return Ia[a];
        Ia[a] = new Aa({
            p: a
        });
        return Ia[a];
    }

    function ea() {
        var a = D["state"]["options"].merged ? D["state"]["options"]["productNumber"] : "";
        if (Ja[a]) return Ja[a];
        Ja[a] = new la({
            p: a
        });
        return Ja[a];
    }

    function Bb(d, e) {
        function g() {
            if (r["parentNode"]) r["parentNode"]["removeChild"](r);
            z[t] = W;
            u && ga(u);
        }

        void 0 === e && (e = {});
        var t = "__wmjsonp_" + ab().slice(2, 9) + Uc++,
            m = "cb",
            v = aa,
            l = e.V;
        void 0 === l && (l = W);
        var h = e.J,
            f = e.U;
        void 0 === f && (f = W);
        var n = e.xa;
        void 0 === n && (n = 60000);
        var q = x["getElementsByTagName"]("script")[0] || x.head,
            r,
            u;
        n && (u = xa(function () {
            g();
            f && f(Error("Request timed out"));
        }, n));

        z[t] = function (a) {
            g();
            l && l(a);
        };

        d += (~d.indexOf("?") ? "&" : "?") + m + "=" + v(t) + "&" + bb(h);
        d = d.replace("?&", "?");
        r = x["createElement"]("script");
        r["src"] = d;

        r["onerror"] = function (a) {
            g();
            f(a);
        };

        r["setAttribute"]("charset", "UTF-8");
        q["parentNode"]["insertBefore"](r, q);
        return function () {
            z[t] && g();
        };
    }

    function Pb() {
    }

    function Qb(d, e) {
        e = Ha({
            ba: "GET",
            J: {},
            xa: 5000,
            V: Pb,
            U: Pb
        }, e);
        (db() ? Oc : Bb)(d, e);
    }

    function Rb(d, e, g, b, m) {
        void 0 === g && (g = 0);
        void 0 === b && (b = Sb);
        void 0 === m && (m = eb);
        var h,
            l = [];

        switch (g) {
            case 1:
                g = d[e];
                h = 0;
                l.push(b[g >>> 2 & 63], b[(g << 4 & 48) + (h >>> 4 & 15)], m, m);
                break;

            case 2:
                g = d[e];
                h = d[e + 1];
                d = 0;
                l.push(b[g >>> 2 & 63], b[(g << 4 & 48) + (h >>> 4 & 15)], b[(h << 2 & 60) + (d >>> 6 & 3)], m);
                break;

            case 3:
                g = d[e];
                h = d[e + 1];
                d = d[e + 2];
                l.push(b[g >>> 2 & 63], b[(g << 4 & 48) + (h >>> 4 & 15)], b[(h << 2 & 60) + (d >>> 6 & 3)], b[d & 63]);
                break;

            default:
                throw Error("1010");
        }

        return l.join("");
    }

    function Tb(d, e, g) {
        void 0 === e && (e = []);
        void 0 === g && (g = eb);
        if (!d) return null;
        if (d.length === 0) return "";
        var b = 3;

        try {
            for (var m = [], h = 0; h < d.length;) if (h + b <= d.length) m.push(Rb(d, h, b, e, g)), h += b; else {
                m.push(Rb(d, h, d.length - h, e, g));
                break;
            }

            return m.join("");
        } catch (l) {
            throw Error("1010");
        }
    }

    function Ub(a) {
        void 0 === a && (a = []);
        return Tb(a, Vc, Wc);
    }

    function C(d) {
        if (d < -128) return C(128 - (-128 - d));
        if (d >= -128 && d <= 127) return d;
        if (d > 127) return C(-129 + d - 127);
        throw Error("1001");
    }

    function Xc(a, e) {
        return C(a + e);
    }

    function fb(a, e) {
        return C(C(a) ^ C(e));
    }

    function gb(d, e) {
        void 0 === d && (d = []);
        void 0 === e && (e = []);
        if (d.length !== e.length) return [];

        for (var g = [], c = 0, b = d.length; c < b; c++) g[c] = fb(d[c], e[c]);

        return g;
    }

    function Vb(d) {
        var e = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
        return "" + e[d >>> 4 & 15] + e[d & 15];
    }

    function hb(a) {
        void 0 === a && (a = []);
        return a.map(function (a) {
            return Vb(a);
        }).join("");
    }

    function ib(d) {
        void 0 === d && (d = "");
        d = typeof d === "string" ? d : String(d);

        for (var e = [], g = 0, t = 0, m = d.length / 2; g < m; g++) {
            var h = ma(d.charAt(t++), 16) << 4,
                l = ma(d.charAt(t++), 16);
            e[g] = C(h + l);
        }

        return e;
    }

    function za(d) {
        if (null === d || void 0 === d) return d;
        d = aa(d);

        for (var e = [], g = 0, b = d.length; g < b; g++) if (d.charAt(g) === "%") {
            if (g + 2 < b) e.push(Mb(d.charAt(++g) + "" + d.charAt(++g))[0]); else throw Error("1009");
        } else e.push(C(d.charCodeAt(g)));

        return e;
    }

    function Y(d) {
        var e = [];
        e[0] = C(d >>> 24 & 255);
        e[1] = C(d >>> 16 & 255);
        e[2] = C(d >>> 8 & 255);
        e[3] = C(d & 255);
        return e;
    }

    function ha(d, e, g, b, m) {
        void 0 === d && (d = []);
        void 0 === g && (g = []);

        if (d.length) {
            if (d.length < m) throw Error("1003");

            for (var h = 0; h < m; h++) g[b + h] = d[e + h];
        }
    }

    function Wb() {
        return Array.apply(null, Array(10)).map(function () {
            return 0;
        });
    }

    function Mb(d) {
        if (null === d || d.length === 0) return [];
        d = typeof d === "string" ? d : String(d);

        for (var e = [], g = 0, c = 0, m = d.length / 2; c < m; c++) {
            var h = ma(d.charAt(g++), 16) << 4,
                l = ma(d.charAt(g++), 16);
            e[c] = C(h + l);
        }

        return e;
    }

    function jb(d) {
        void 0 === d && (d = []);
        var e = [];
        if (!d.length) return Wb();

        if (d.length >= kb) {
            var e = 0,
                g = kb;
            void 0 === d && (d = []);
            var b = [];

            if (d.length) {
                if (d.length < g) throw Error("1003");

                for (var m = 0; m < g; m++) b[m] = d[e + m];
            }

            return b;
        }

        for (g = 0; g < kb; g++) e[g] = d[g % d.length];

        return e;
    }

    function Xb(d) {
        void 0 === d && (d = []);
        if (!d.length) return [];

        for (var e = [], c = 0, b = d.length; c < b; c++) {
            var m = d[c];
            e[c] = Yc[(m >>> 4 & 15) * 16 + (m & 15)];
        }

        return e;
    }

    function Zc(d, e) {
        void 0 === d && (d = []);
        if (!d.length) return [];
        e = C(e);

        for (var c = [], b = 0, m = d.length; b < m; b++) c.push(fb(d[b], e));

        return c;
    }

    function $c(d, e) {
        void 0 === d && (d = []);
        if (!d.length) return [];
        e = C(e);

        for (var c = [], b = 0, m = d.length; b < m; b++) c.push(fb(d[b], e--));

        return c;
    }

    function Yb(d, e) {
        void 0 === d && (d = []);
        if (!d.length) return [];
        e = C(e);

        for (var c = [], b = 0, m = d.length; b < m; b++) c.push(C(d[b] + e));

        return c;
    }

    function ad(d, e) {
        void 0 === d && (d = []);
        if (!d.length) return [];
        e = C(e);

        for (var c = [], b = 0, m = d.length; b < m; b++) c.push(Xc(d[b], e--));

        return c;
    }

    function bd(d) {
        return [[Yb, -70], [$c, -85], [ad, 60], [Zc, -18], [Yb, -107]].reduce(function (a, d) {
            return d[0](a, d[1]);
        }, d);
    }

    function lb(d) {
        void 0 === d && (d = []);
        var e = "d73f85d653b74a259fe620aac656670b",
            g;
        g = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918000, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117];

        for (var t = 4294967295, m = 0, h = d.length; m < h; m++) t = t >>> 8 ^ g[(t ^ d[m]) & 255];

        g = hb(Y(t ^ 4294967295));
        t = za(g);
        g = [];
        ha(d, 0, g, 0, d.length);
        ha(t, 0, g, g.length, t.length);
        d = za(e);
        void 0 === g && (g = []);
        t = [];

        for (e = 0; e < mb; e++) m = Math["random"]() * 256, m = Math["floor"](m), t[e] = C(m);

        d = jb(d);
        d = gb(d, jb(t));
        e = d = jb(d);
        var l = g;
        void 0 === l && (l = []);

        if (l.length) {
            g = [];
            m = l.length;
            h = 0;
            h = m % T <= T - Ka ? T - m % T - Ka : T * 2 - m % T - Ka;
            ha(l, 0, g, 0, m);

            for (l = 0; l < h; l++) g[m + l] = 0;

            ha(Y(m), 0, g, m + h, Ka);
        } else g = Wb();

        m = g;
        void 0 === m && (m = []);
        if (m.length % T !== 0) throw Error("1005");
        g = [];

        for (var h = 0, l = m.length / T, p = 0; p < l; p++) {
            g[p] = [];

            for (var f = 0; f < T; f++) g[p][f] = m[h++];
        }

        m = [];
        ha(t, 0, m, 0, mb);
        t = 0;

        for (h = g.length; t < h; t++) {
            l = bd(g[t]);
            l = gb(l, d);
            p = e;
            void 0 === l && (l = []);
            void 0 === p && (p = []);

            for (var f = [], k = p.length, n = 0, q = l.length; n < q; n++) f[n] = C(l[n] + p[n % k]);

            l = gb(f, e);
            e = Xb(l);
            e = Xb(e);
            ha(e, 0, m, t * T + mb, T);
        }

        return Tb(m, Sb, eb);
    }

    function Dc(d) {
        if (!d) return "";
        var e = [31, 125, -12, 60, 32, 48],
            b = 0;
        d = ib(d);

        for (var t = [], m = 0; m < d.length; m++) t[m] = C(0 - d[m]), t[m] = C(t[m] ^ e[b++ % e.length]);

        e = t;
        void 0 === e && (e = []);
        b = [];

        for (d = 0; d < e.length; d++) b.push("%"), b.push(Vb(e[d]));

        return Zb(b.join(""));
    }

    function La(d) {
        if (!d) return "";
        var e = 0,
            b = [31, 125, -12, 60, 32, 48];
        d = za(d);

        for (var t = [], m = 0; m < d.length; m++) t[m] = C(d[m] ^ b[e++ % b.length]), t[m] = C(0 - t[m]);

        return hb(t);
    }

    function ia(d, e) {
        var c = (d & 65535) + (e & 65535);
        return (d >> 16) + (e >> 16) + (c >> 16) << 16 | c & 65535;
    }

    function I(d, e, c, b, m, h) {
        d = ia(ia(e, d), ia(b, h));
        return ia(d << m | d >>> 32 - m, c);
    }

    function K(a, e, c, b, m, h, l) {
        return I(e & c | ~e & b, a, e, m, h, l);
    }

    function L(a, e, c, b, m, h, l) {
        return I(e & b | c & ~b, a, e, m, h, l);
    }

    function M(a, e, c, b, m, h, l) {
        return I(c ^ (e | ~b), a, e, m, h, l);
    }

    function $b(d) {
        var e,
            b = [];
        b[(d.length >> 2) - 1] = void 0;

        for (e = 0; e < b.length; e += 1) b[e] = 0;

        var t = d.length * 8;

        for (e = 0; e < t; e += 8) b[e >> 5] |= (d.charCodeAt(e / 8) & 255) << e % 32;

        d = d.length * 8;
        b[d >> 5] |= 128 << d % 32;
        b[(d + 64 >>> 9 << 4) + 14] = d;
        var m,
            h,
            l = 1732584193,
            p = -271733879,
            f = -1732584194,
            k = 271733878;

        for (d = 0; d < b.length; d += 16) e = l, t = p, m = f, h = k, l = K(l, p, f, k, b[d], 7, -680876936), k = K(k, l, p, f, b[d + 1], 12, -389564586), f = K(f, k, l, p, b[d + 2], 17, 606105819), p = K(p, f, k, l, b[d + 3], 22, -1044525330), l = K(l, p, f, k, b[d + 4], 7, -176418897), k = K(k, l, p, f, b[d + 5], 12, 1200080426), f = K(f, k, l, p, b[d + 6], 17, -1473231341), p = K(p, f, k, l, b[d + 7], 22, -45705983), l = K(l, p, f, k, b[d + 8], 7, 1770035416), k = K(k, l, p, f, b[d + 9], 12, -1958414417), f = K(f, k, l, p, b[d + 10], 17, -42063), p = K(p, f, k, l, b[d + 11], 22, -1990404162), l = K(l, p, f, k, b[d + 12], 7, 1804603682), k = K(k, l, p, f, b[d + 13], 12, -40341101), f = K(f, k, l, p, b[d + 14], 17, -1502002290), p = K(p, f, k, l, b[d + 15], 22, 1236535329), l = L(l, p, f, k, b[d + 1], 5, -165796510), k = L(k, l, p, f, b[d + 6], 9, -1069501632), f = L(f, k, l, p, b[d + 11], 14, 643717713), p = L(p, f, k, l, b[d], 20, -373897302), l = L(l, p, f, k, b[d + 5], 5, -701558691), k = L(k, l, p, f, b[d + 10], 9, 38016083), f = L(f, k, l, p, b[d + 15], 14, -660478335), p = L(p, f, k, l, b[d + 4], 20, -405537848), l = L(l, p, f, k, b[d + 9], 5, 568446438), k = L(k, l, p, f, b[d + 14], 9, -1019803690), f = L(f, k, l, p, b[d + 3], 14, -187363961), p = L(p, f, k, l, b[d + 8], 20, 1163531501), l = L(l, p, f, k, b[d + 13], 5, -1444681467), k = L(k, l, p, f, b[d + 2], 9, -51403784), f = L(f, k, l, p, b[d + 7], 14, 1735328473), p = L(p, f, k, l, b[d + 12], 20, -1926607734), l = I(p ^ f ^ k, l, p, b[d + 5], 4, -378558), k = I(l ^ p ^ f, k, l, b[d + 8], 11, -2022574463), f = I(k ^ l ^ p, f, k, b[d + 11], 16, 1839030562), p = I(f ^ k ^ l, p, f, b[d + 14], 23, -35309556), l = I(p ^ f ^ k, l, p, b[d + 1], 4, -1530992060), k = I(l ^ p ^ f, k, l, b[d + 4], 11, 1272893353), f = I(k ^ l ^ p, f, k, b[d + 7], 16, -155497632), p = I(f ^ k ^ l, p, f, b[d + 10], 23, -1094730640), l = I(p ^ f ^ k, l, p, b[d + 13], 4, 681279174), k = I(l ^ p ^ f, k, l, b[d], 11, -358537222), f = I(k ^ l ^ p, f, k, b[d + 3], 16, -722521979), p = I(f ^ k ^ l, p, f, b[d + 6], 23, 76029189), l = I(p ^ f ^ k, l, p, b[d + 9], 4, -640364487), k = I(l ^ p ^ f, k, l, b[d + 12], 11, -421815835), f = I(k ^ l ^ p, f, k, b[d + 15], 16, 530742520), p = I(f ^ k ^ l, p, f, b[d + 2], 23, -995338651), l = M(l, p, f, k, b[d], 6, -198630844), k = M(k, l, p, f, b[d + 7], 10, 1126891415), f = M(f, k, l, p, b[d + 14], 15, -1416354905), p = M(p, f, k, l, b[d + 5], 21, -57434055), l = M(l, p, f, k, b[d + 12], 6, 1700485571), k = M(k, l, p, f, b[d + 3], 10, -1894986606), f = M(f, k, l, p, b[d + 10], 15, -1051523), p = M(p, f, k, l, b[d + 1], 21, -2054922799), l = M(l, p, f, k, b[d + 8], 6, 1873313359), k = M(k, l, p, f, b[d + 15], 10, -30611744), f = M(f, k, l, p, b[d + 6], 15, -1560198380), p = M(p, f, k, l, b[d + 13], 21, 1309151649), l = M(l, p, f, k, b[d + 4], 6, -145523070), k = M(k, l, p, f, b[d + 11], 10, -1120210379), f = M(f, k, l, p, b[d + 2], 15, 718787259), p = M(p, f, k, l, b[d + 9], 21, -343485551), l = ia(l, e), p = ia(p, t), f = ia(f, m), k = ia(k, h);

        b = [l, p, f, k];
        e = "";
        t = b.length * 32;

        for (d = 0; d < t; d += 8) e += String.fromCharCode(b[d >> 5] >>> d % 32 & 255);

        return e;
    }

    function ac(d) {
        var e = "0123456789abcdef",
            g = "",
            f,
            m;

        for (m = 0; m < d.length; m += 1) f = d.charCodeAt(m), g += e.charAt(f >>> 4 & 15) + e.charAt(f & 15);

        return g;
    }

    function bc() {
        var d = new Date()["getTime"](),
            e = Math["floor"](d / 4294967296),
            g = d % 4294967296,
            d = Y(e),
            g = Y(g),
            e = [];
        ha(d, 0, e, 0, 4);
        ha(g, 0, e, 4, 4);
        g = [];

        for (d = 0; d < 8; d++) g[d] = C(Math["floor"](Math["random"]() * 256));

        for (var d = [], f = 0; f < e.length * 2; f++) {
            if (f % 2 == 0) {
                var m = f / 2;
                d[f] = d[f] | (g[m] & 16) >>> 4 | (g[m] & 32) >>> 3 | (g[m] & 64) >>> 2 | (g[m] & 128) >>> 1 | (e[m] & 16) >>> 3 | (e[m] & 32) >>> 2 | (e[m] & 64) >>> 1 | (e[m] & 128) >>> 0;
            } else m = Math["floor"](f / 2), d[f] = d[f] | (g[m] & 1) << 0 | (g[m] & 2) << 1 | (g[m] & 4) << 2 | (g[m] & 8) << 3 | (e[m] & 1) << 1 | (e[m] & 2) << 2 | (e[m] & 4) << 3 | (e[m] & 8) << 4;

            d[f] = C(d[f]);
        }

        e = hb(d);
        e = ac($b(cc(aa(e + "dAWsBhCqtOaNLLJ25hBzWbqWXwiK99Wd"))));
        e = ib(e.substring(0, 16));
        return Ub(e.concat(d));
    }

    function dc(a) {
        var e = a.C,
            g = a.ka,
            f = ea().k(ra),
            m = D["state"]["options"].va;
        a = {
            r: m,
            d: f || "",
            b: e
        };
        g && (e = ib(ac($b(cc(aa(m + f + e + "WoeTpXnDDPhiAvsJUUIY3RdAo2PKaVwi"))))), a.t = Ub(e));

        try {
            return La(JSON["stringify"](a));
        } catch (h) {
            return La("ERROR");
        }
    }

    function nb() {
        var a = ea().k(ra),
            e = X().k(ob),
            a = {
                r: D["state"]["options"].va,
                d: a || "",
                i: e
            };

        try {
            return La(JSON["stringify"](a));
        } catch (g) {
            return La("ERROR");
        }
    }

    function fa(d, e) {
        return N(d) === "string" ? d.length > e ? d.slice(0, e) : d : N(d) === "array" ? d.length > e ? d.slice(-e) : d : d;
    }

    function Gc() {
        var d = 255;
        return ec < d ? ++ec : d;
    }

    function Nc(a) {
        switch (N(a)) {
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

    function da(d, e) {
        d = [d[0] >>> 16, d[0] & 65535, d[1] >>> 16, d[1] & 65535];
        e = [e[0] >>> 16, e[0] & 65535, e[1] >>> 16, e[1] & 65535];
        var b = [0, 0, 0, 0];
        b[3] += d[3] + e[3];
        b[2] += b[3] >>> 16;
        b[3] &= 65535;
        b[2] += d[2] + e[2];
        b[1] += b[2] >>> 16;
        b[2] &= 65535;
        b[1] += d[1] + e[1];
        b[0] += b[1] >>> 16;
        b[1] &= 65535;
        b[0] += d[0] + e[0];
        b[0] &= 65535;
        return [b[0] << 16 | b[1], b[2] << 16 | b[3]];
    }

    function Q(d, e) {
        d = [d[0] >>> 16, d[0] & 65535, d[1] >>> 16, d[1] & 65535];
        e = [e[0] >>> 16, e[0] & 65535, e[1] >>> 16, e[1] & 65535];
        var b = [0, 0, 0, 0];
        b[3] += d[3] * e[3];
        b[2] += b[3] >>> 16;
        b[3] &= 65535;
        b[2] += d[2] * e[3];
        b[1] += b[2] >>> 16;
        b[2] &= 65535;
        b[2] += d[3] * e[2];
        b[1] += b[2] >>> 16;
        b[2] &= 65535;
        b[1] += d[1] * e[3];
        b[0] += b[1] >>> 16;
        b[1] &= 65535;
        b[1] += d[2] * e[2];
        b[0] += b[1] >>> 16;
        b[1] &= 65535;
        b[1] += d[3] * e[1];
        b[0] += b[1] >>> 16;
        b[1] &= 65535;
        b[0] += d[0] * e[3] + d[1] * e[2] + d[2] * e[1] + d[3] * e[0];
        b[0] &= 65535;
        return [b[0] << 16 | b[1], b[2] << 16 | b[3]];
    }

    function qa(d, b) {
        b %= 64;
        if (b === 32) return [d[1], d[0]];
        if (b < 32) return [d[0] << b | d[1] >>> 32 - b, d[1] << b | d[0] >>> 32 - b];
        b -= 32;
        return [d[1] << b | d[0] >>> 32 - b, d[0] << b | d[1] >>> 32 - b];
    }

    function O(d, b) {
        b %= 64;
        return b === 0 ? d : b < 32 ? [d[0] << b | d[1] >>> 32 - b, d[1] << b] : [d[1] << b - 32, 0];
    }

    function E(a, b) {
        return [a[0] ^ b[0], a[1] ^ b[1]];
    }

    function Lb(d) {
        d = E(d, [0, d[0] >>> 1]);
        d = Q(d, [4283543511, 3981806797]);
        d = E(d, [0, d[0] >>> 1]);
        d = Q(d, [3301882366, 444984403]);
        return d = E(d, [0, d[0] >>> 1]);
    }

    function fc() {
        function d(d) {
            for (var e = !1, c = 0; c < g.length && !(e = d[c]["offsetWidth"] !== n[g[c]] || d[c]["offsetHeight"] !== q[g[c]]); c++) ;

            return e;
        }

        function e() {
            var a = x["createElement"]("span");
            a["style"]["position"] = "absolute";
            a["style"]["left"] = "-9999px";
            a["style"]["fontSize"] = m;
            a["style"]["lineHeight"] = "normal";
            a["innerHTML"] = f;
            return a;
        }

        if (pb) return pb;

        var g = ["monospace", "sans-serif", "serif"],
            f = "mmmmmmmmmmlli",
            m = "72px",
            h = x["getElementsByTagName"]("body")[0],
            l = x["createElement"]("div"),
            p = x["createElement"]("div"),
            n = {},
            q = {},
            r = function () {
                for (var d = [], m = 0, f = g.length; m < f; m++) {
                    var t = e();
                    t["style"]["fontFamily"] = g[m];
                    l["appendChild"](t);
                    d.push(t);
                }

                return d;
            }();

        h["appendChild"](l);

        for (var u = 0, w = g.length; u < w; u++) n[g[u]] = r[u]["offsetWidth"], q[g[u]] = r[u]["offsetHeight"];

        r = function () {
            for (var d = {}, m = 0, f = fontList.length; m < f; m++) {
                for (var t = [], h = 0, l = g.length; h < l; h++) {
                    var k;
                    k = fontList[m];
                    var n = g[h],
                        q = e();
                    q["style"]["fontFamily"] = "'" + k + "'," + n;
                    k = q;
                    p["appendChild"](k);
                    t.push(k);
                }

                d[fontList[m]] = t;
            }

            return d;
        }();

        h["appendChild"](p);

        for (var u = [], w = 0, z = fontList.length; w < z; w++) d(r[fontList[w]]) && u.push(fontList[w]);

        h["removeChild"](p);
        h["removeChild"](l);
        return pb = u;
    }

    function cd() {
        var a = x["createElement"]("canvas"),
            e = null;

        try {
            e = a["getContext"]("webgl") || a["getContext"]("experimental-webgl");
        } catch (g) {
        }

        e || (e = null);
        return e;
    }

    function dd() {
        function d(d) {
            e["clearColor"](0, 0, 0, 1);
            e.enable(e["DEPTH_TEST"]);
            e["depthFunc"](e["LEQUAL"]);
            e.clear(e["COLOR_BUFFER_BIT"] | e["DEPTH_BUFFER_BIT"]);
            return "[" + d[0] + ", " + d[1] + "]";
        }

        if (Ca) return Ca;
        var e;
        e = cd();
        if (!e) return Ca = [];
        var g = [];

        try {
            var f = "attribute vec2 attrVertexvarying vec2 varyinTexCoordinateuniform vec2 uniformOffsetvoid main(){varyinTexCoordinate=attrVertex+uniformOffsetgl_Position=vec4(attrVertex,0,1)}",
                m = "precision mediump floatvarying vec2 varyinTexCoordinatevoid main() {gl_FragColor=vec4(varyinTexCoordinate,0,1)}",
                h = e["createBuffer"]();
            e["bindBuffer"](e["ARRAY_BUFFER"], h);
            var l = new Float32Array([-0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.732134444, 0]);
            e.bufferData(e["ARRAY_BUFFER"], l, e["STATIC_DRAW"]);
            h.qc = 3;
            h.uc = 3;
            var p = e["createProgram"](),
                n = e["createShader"](e["VERTEX_SHADER"]);
            e["shaderSource"](n, f);
            e["compileShader"](n);
            var q = e["createShader"](e["FRAGMENT_SHADER"]);
            e["shaderSource"](q, m);
            e["compileShader"](q);
            e["attachShader"](p, n);
            e["attachShader"](p, q);
            e["linkProgram"](p);
            e["useProgram"](p);
            p.Bc = e["getAttribLocation"](p, "attrVertex");
            p.vc = e["getUniformLocation"](p, "uniformOffset");
            e["enableVertexAttribArray"](p.Jc);
            e["vertexAttribPointer"](p.Bc, h.qc, e.FLOAT, !1, 0, 0);
            e["uniform2f"](p.vc, 1, 1);
            e["drawArrays"](e["TRIANGLE_STRIP"], 0, h.uc);
        } catch (r) {
        }

        null != e["canvas"] && g.push(e["canvas"]["toDataURL"]());
        g.push("extensions:" + e["getSupportedExtensions"]().join(""));
        g.push("webgl aliased line width range:" + d(e["getParameter"](e["ALIASED_LINE_WIDTH_RANGE"])));
        g.push("webgl aliased point size range:" + d(e["getParameter"](e["ALIASED_POINT_SIZE_RANGE"])));
        g.push("webgl alpha bits:" + e["getParameter"](e["ALPHA_BITS"]));
        g.push("webgl antialiasing:" + (e["getContextAttributes"]().antialias ? "yes" : "no"));
        g.push("webgl blue bits:" + e["getParameter"](e["BLUE_BITS"]));
        g.push("webgl depth bits:" + e["getParameter"](e["DEPTH_BITS"]));
        g.push("webgl green bits:" + e["getParameter"](e["GREEN_BITS"]));
        g.push("webgl max anisotropy:" + function (d) {
            var e,
                g = d["getExtension"]("EXT_texture_filter_anisotropic") || d["getExtension"]("WEBKIT_EXT_texture_filter_anisotropic") || d["getExtension"]("MOZ_EXT_texture_filter_anisotropic");
            return g ? (e = d["getParameter"](g["MAX_TEXTURE_MAX_ANISOTROPY_EXT"]), 0 === e && (e = 2), e) : null;
        }(e));
        g.push("webgl max combined texture image units:" + e["getParameter"](e["MAX_COMBINED_TEXTURE_IMAGE_UNITS"]));
        g.push("webgl max cube map texture size:" + e["getParameter"](e["MAX_CUBE_MAP_TEXTURE_SIZE"]));
        g.push("webgl max fragment uniform vectors:" + e["getParameter"](e["MAX_FRAGMENT_UNIFORM_VECTORS"]));
        g.push("webgl max render buffer size:" + e["getParameter"](e["MAX_RENDERBUFFER_SIZE"]));
        g.push("webgl max texture image units:" + e["getParameter"](e["MAX_TEXTURE_IMAGE_UNITS"]));
        g.push("webgl max texture size:" + e["getParameter"](e["MAX_TEXTURE_SIZE"]));
        g.push("webgl max varying vectors:" + e["getParameter"](e["MAX_VARYING_VECTORS"]));
        g.push("webgl max vertex attribs:" + e["getParameter"](e["MAX_VERTEX_ATTRIBS"]));
        g.push("webgl max vertex texture image units:" + e["getParameter"](e["MAX_VERTEX_TEXTURE_IMAGE_UNITS"]));
        g.push("webgl max vertex uniform vectors:" + e["getParameter"](e["MAX_VERTEX_UNIFORM_VECTORS"]));
        g.push("webgl max viewport dims:" + d(e["getParameter"](e["MAX_VIEWPORT_DIMS"])));
        g.push("webgl red bits:" + e["getParameter"](e["RED_BITS"]));
        g.push("webgl renderer:" + e["getParameter"](e["RENDERER"]));
        g.push("webgl shading language version:" + e["getParameter"](e["SHADING_LANGUAGE_VERSION"]));
        g.push("webgl stencil bits:" + e["getParameter"](e["STENCIL_BITS"]));
        g.push("webgl vendor:" + e["getParameter"](e["VENDOR"]));
        g.push("webgl version:" + e["getParameter"](e["VERSION"]));

        try {
            var u = e["getExtension"]("WEBGL_debug_renderer_info");
            u && (g.push("webgl unmasked vendor:" + e["getParameter"](u.UNMASKED_VENDOR_WEBGL)), g.push("webgl unmasked renderer:" + e["getParameter"](u.UNMASKED_RENDERER_WEBGL)));
        } catch (w) {
        }

        if (!e["getShaderPrecisionFormat"]) return Ca = g;
        g.push("webgl vertex shader high float precision:" + e["getShaderPrecisionFormat"](e["VERTEX_SHADER"], e["HIGH_FLOAT"])["precision"]);
        g.push("webgl vertex shader high float precision rangeMin:" + e["getShaderPrecisionFormat"](e["VERTEX_SHADER"], e["HIGH_FLOAT"])["rangeMin"]);
        g.push("webgl vertex shader high float precision rangeMax:" + e["getShaderPrecisionFormat"](e["VERTEX_SHADER"], e["HIGH_FLOAT"])["rangeMax"]);
        g.push("webgl vertex shader medium float precision:" + e["getShaderPrecisionFormat"](e["VERTEX_SHADER"], e["MEDIUM_FLOAT"])["precision"]);
        g.push("webgl vertex shader medium float precision rangeMin:" + e["getShaderPrecisionFormat"](e["VERTEX_SHADER"], e["MEDIUM_FLOAT"])["rangeMin"]);
        g.push("webgl vertex shader medium float precision rangeMax:" + e["getShaderPrecisionFormat"](e["VERTEX_SHADER"], e["MEDIUM_FLOAT"])["rangeMax"]);
        g.push("webgl vertex shader low float precision:" + e["getShaderPrecisionFormat"](e["VERTEX_SHADER"], e["LOW_FLOAT"])["precision"]);
        g.push("webgl vertex shader low float precision rangeMin:" + e["getShaderPrecisionFormat"](e["VERTEX_SHADER"], e["LOW_FLOAT"])["rangeMin"]);
        g.push("webgl vertex shader low float precision rangeMax:" + e["getShaderPrecisionFormat"](e["VERTEX_SHADER"], e["LOW_FLOAT"])["rangeMax"]);
        g.push("webgl fragment shader high float precision:" + e["getShaderPrecisionFormat"](e["FRAGMENT_SHADER"], e["HIGH_FLOAT"])["precision"]);
        g.push("webgl fragment shader high float precision rangeMin:" + e["getShaderPrecisionFormat"](e["FRAGMENT_SHADER"], e["HIGH_FLOAT"])["rangeMin"]);
        g.push("webgl fragment shader high float precision rangeMax:" + e["getShaderPrecisionFormat"](e["FRAGMENT_SHADER"], e["HIGH_FLOAT"])["rangeMax"]);
        g.push("webgl fragment shader medium float precision:" + e["getShaderPrecisionFormat"](e["FRAGMENT_SHADER"], e["MEDIUM_FLOAT"])["precision"]);
        g.push("webgl fragment shader medium float precision rangeMin:" + e["getShaderPrecisionFormat"](e["FRAGMENT_SHADER"], e["MEDIUM_FLOAT"])["rangeMin"]);
        g.push("webgl fragment shader medium float precision rangeMax:" + e["getShaderPrecisionFormat"](e["FRAGMENT_SHADER"], e["MEDIUM_FLOAT"])["rangeMax"]);
        g.push("webgl fragment shader low float precision:" + e["getShaderPrecisionFormat"](e["FRAGMENT_SHADER"], e["LOW_FLOAT"])["precision"]);
        g.push("webgl fragment shader low float precision rangeMin:" + e["getShaderPrecisionFormat"](e["FRAGMENT_SHADER"], e["LOW_FLOAT"])["rangeMin"]);
        g.push("webgl fragment shader low float precision rangeMax:" + e["getShaderPrecisionFormat"](e["FRAGMENT_SHADER"], e["LOW_FLOAT"])["rangeMax"]);
        g.push("webgl vertex shader high int precision:" + e["getShaderPrecisionFormat"](e["VERTEX_SHADER"], e["HIGH_INT"])["precision"]);
        g.push("webgl vertex shader high int precision rangeMin:" + e["getShaderPrecisionFormat"](e["VERTEX_SHADER"], e["HIGH_INT"])["rangeMin"]);
        g.push("webgl vertex shader high int precision rangeMax:" + e["getShaderPrecisionFormat"](e["VERTEX_SHADER"], e["HIGH_INT"])["rangeMax"]);
        g.push("webgl vertex shader medium int precision:" + e["getShaderPrecisionFormat"](e["VERTEX_SHADER"], e["MEDIUM_INT"])["precision"]);
        g.push("webgl vertex shader medium int precision rangeMin:" + e["getShaderPrecisionFormat"](e["VERTEX_SHADER"], e["MEDIUM_INT"])["rangeMin"]);
        g.push("webgl vertex shader medium int precision rangeMax:" + e["getShaderPrecisionFormat"](e["VERTEX_SHADER"], e["MEDIUM_INT"])["rangeMax"]);
        g.push("webgl vertex shader low int precision:" + e["getShaderPrecisionFormat"](e["VERTEX_SHADER"], e["LOW_INT"])["precision"]);
        g.push("webgl vertex shader low int precision rangeMin:" + e["getShaderPrecisionFormat"](e["VERTEX_SHADER"], e["LOW_INT"])["rangeMin"]);
        g.push("webgl vertex shader low int precision rangeMax:" + e["getShaderPrecisionFormat"](e["VERTEX_SHADER"], e["LOW_INT"])["rangeMax"]);
        g.push("webgl fragment shader high int precision:" + e["getShaderPrecisionFormat"](e["FRAGMENT_SHADER"], e["HIGH_INT"])["precision"]);
        g.push("webgl fragment shader high int precision rangeMin:" + e["getShaderPrecisionFormat"](e["FRAGMENT_SHADER"], e["HIGH_INT"])["rangeMin"]);
        g.push("webgl fragment shader high int precision rangeMax:" + e["getShaderPrecisionFormat"](e["FRAGMENT_SHADER"], e["HIGH_INT"])["rangeMax"]);
        g.push("webgl fragment shader medium int precision:" + e["getShaderPrecisionFormat"](e["FRAGMENT_SHADER"], e["MEDIUM_INT"])["precision"]);
        g.push("webgl fragment shader medium int precision rangeMin:" + e["getShaderPrecisionFormat"](e["FRAGMENT_SHADER"], e["MEDIUM_INT"])["rangeMin"]);
        g.push("webgl fragment shader medium int precision rangeMax:" + e["getShaderPrecisionFormat"](e["FRAGMENT_SHADER"], e["MEDIUM_INT"])["rangeMax"]);
        g.push("webgl fragment shader low int precision:" + e["getShaderPrecisionFormat"](e["FRAGMENT_SHADER"], e["LOW_INT"])["precision"]);
        g.push("webgl fragment shader low int precision rangeMin:" + e["getShaderPrecisionFormat"](e["FRAGMENT_SHADER"], e["LOW_INT"])["rangeMin"]);
        g.push("webgl fragment shader low int precision rangeMax:" + e["getShaderPrecisionFormat"](e["FRAGMENT_SHADER"], e["LOW_INT"])["rangeMax"]);
        return Ca = g;
    }

    function ed(d) {
        function e(a) {
            g(a);

            g = function () {
            };
        }

        function g(a) {
            return d(a);
        }

        if (gc) return d(gc);

        try {
            var f = new hc(1, 44100, 44100),
                m = f["createOscillator"]();
            m["type"] = "triangle";
            m["frequency"]["value"] = 10000;
            var h = f["createDynamicsCompressor"]();
            h["threshold"] && (h["threshold"]["value"] = -50);
            h["knee"] && (h["knee"]["value"] = 40);
            h["ratio"] && (h["ratio"]["value"] = 12);
            // h["reduction"] && (h["reduction"]["value"] = -20);
            h["attack"] && (h["attack"]["value"] = 0);
            h["release"] && (h["release"]["value"] = 0.25);
            m["connect"](h);
            h["connect"](f["destination"]);
            m["start"](0);
            xa(function () {
                e("");

                f["oncomplete"] = function () {
                };

                f = null;
            }, 1000);

            f["oncomplete"] = function (d) {
                try {
                    var g = ya(d["renderedBuffer"]["getChannelData"](0).slice(4500, 5000).reduce(function (a, d) {
                        return a + Math.abs(d);
                    }, 0).toString());
                    e(g);
                    m["disconnect"]();
                    h["disconnect"]();
                } catch (f) {
                    e("");
                }
            };

            f["startRendering"]();
        } catch (l) {
            e("");
        }
    }

    function ic() {
        var d = w["userAgent"].toLowerCase();
        return d.indexOf("windows phone") >= 0 ? "Windows Phone" : d.indexOf("win") >= 0 && d.indexOf("windvane") < 0 ? "Windows" : d.indexOf("android") >= 0 ? "Android" : d.indexOf("linux") >= 0 ? "Linux" : d.indexOf("iphone") >= 0 || d.indexOf("ipad") >= 0 ? "iOS" : d.indexOf("mac") >= 0 ? "Mac" : "Other";
    }

    function jc() {
        var d = [],
            d = [].slice.call(w["plugins"], 0);
        return d.map(function (d) {
            var g = [].slice.call(d, 0).map(function (a) {
                return [a.type, a["suffixes"]].join("~");
            }).join(",");
            return [d.name, d["description"], g].join("::");
        });
    }

    function fd() {
        var a = [];
        if (Object["getOwnPropertyDescriptor"] && Object["getOwnPropertyDescriptor"](z, "ActiveXObject") || "ActiveXObject" in z) a = ["AcroPDF.PDF", "Adodb.Stream", "AgControl.AgControl", "DevalVRXCtrl.DevalVRXCtrl.1", "MacromediaFlashPaper.MacromediaFlashPaper", "Msxml2.DOMDocument", "Msxml2.XMLHTTP", "PDF.PdfCtrl", "QuickTime.QuickTime", "QuickTimeCheckObject.QuickTimeCheck.1", "RealPlayer", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "Scripting.Dictionary", "SWCtl.SWCtl", "Shell.UIHelper", "ShockwaveFlash.ShockwaveFlash", "Skype.Detection", "TDCCtl.TDCCtl", "WMPlayer.OCX", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1"].map(function (a) {
            try {
                return new gd(a), a;
            } catch (d) {
                return null;
            }
        });
        w["plugins"] && (a = a.concat(jc()));
        return a;
    }

    function kc() {
        var a = x["createElement"]("canvas");
        return !(!a["getContext"] || !a["getContext"]("2d"));
    }

    function hd() {
        return w["appName"] === "Microsoft Internet Explorer" || w["appName"] === "Netscape" && /Trident/.test(w["userAgent"]) ? !0 : !1;
    }

    function ka(a, b, c) {
        return function () {
            var f, m, h;
            c = c || this;
            m = J();
            f = a.apply(c, arguments);
            h = J();
            D.j(qb, {
                cursor: b,
                value: h - m
            });
            return f;
        };
    }

    function id(a, b) {
        var c = void 0;
        return function (f) {
            var m, h;
            c = c || this;
            m = J();
            a.apply(c, [function (a) {
                h = J();
                D.j(qb, {
                    cursor: b,
                    value: h - m
                });
                f(a);
            }]);
        };
    }

    function rb(d, b) {
        for (var g = b.split("."), f = d, m = 0; m < g.length; m++) {
            if (void 0 == f[g[m]]) return;
            f = f[g[m]];
        }

        return f;
    }

    function jd() {
        for (var d = ["_Selenium_IDE_Recorder", "_phantom", "phantom.injectJs", "callPhantom", "_selenium", "callSelenium", "domAutomation", "domAutomationController", "__nightmare", "domAutomationController", "context.hashCode", "java.lang.System.exit", "spawn", "emit", "webdriver"],
                 e = ["__driver_evaluate", "__webdriver_evaluate", "__selenium_evaluate", "__fxdriver_evaluate", "__driver_unwrapped", "__webdriver_unwrapped", "__selenium_unwrapped", "__fxdriver_unwrapped", "__webdriver_script_function", "__webdriver_script_func", "__webdriver_script_fn"],
                 g = ["selenium", "webdriver", "driver"], f = 0, m = d.length; f < m; f++) {
            if (rb(z, d[f])) return f + 1
        }
        ;

        d = 0;

        for (f = e.length; d < f; d++) if (rb(x, e[d])) return d + 50;

        e = 0;

        for (d = g.length; e < d; e++) if (x["documentElement"]["getAttribute"](g[e])) return e + 100;

        return !0 === rb(w, "webdriver") ? 130 : 0;
    }

    function Ma(d) {
        return x["getElementsByTagName"](d) && x["getElementsByTagName"](d).length || 0;
    }

    function lc(d) {
        return d === "undefined" ? 1 : d ? 2 : 3;
    }

    function mc() {
        var d = 65535;
        return Na < d ? ++Na : d;
    }

    function Bc(a, b) {
        for (var g in b) a["setAttribute"](g, b[g]);
    }

    function Db(a, e) {
        a["onload"] = function () {
            this["onerror"] = this["onload"] = null;
            e(null, a);
        };

        a["onerror"] = function () {
            this["onerror"] = this["onload"] = null;
            e(Error("Failed to load " + this["src"]), a);
        };
    }

    function Cc(a, e) {
        a["onreadystatechange"] = function () {
            if (this["readyState"] == "complete" || this["readyState"] == "loaded") this["onreadystatechange"] = null, e(null, a);
        };
    }

    function Oa(a, b, c) {
        a[b] = c;
    }

    function kd() {
        var a = z[nc],
            e = {};
        if (!a) throw Error("Can not find configuration");
        ta || (ta = new f(a));
        Oa(e, "start", function () {
            ta._start();
        });
        Oa(e, "stop", function () {
            ta._stop();
        });
        Oa(e, "getToken", function (e, c, f, h) {
            if (e) ta._getToken(e, c, f, h); else if (typeof a["onerror"] === "function") a["onerror"](Error("Missing business key"));
        });
        Oa(e, "getNdInfo", function (a) {
            ta._getNdInfo(a);
        });
        if (typeof a["onload"] === "function") a["onload"](e);
    }

    Array.prototype.forEach || (Array.prototype.forEach = function (d, e) {
        var c, f;
        if (null == this) throw new TypeError(" this is null or not defined");
        var m = Object(this),
            h = m.length >>> 0;
        if (typeof d !== "function") throw new TypeError(d + " is not a function");
        arguments.length > 1 && (c = e);

        for (f = 0; f < h;) {
            var l;
            f in m && (l = m[f], d.call(c, l, f, m));
            f++;
        }
    });
    Array.prototype.filter || (Array.prototype.filter = function (d) {
        if (void 0 === this || null === this) throw new TypeError();
        var b = Object(this),
            c = b.length >>> 0;
        if (typeof d !== "function") throw new TypeError();

        for (var f = [], m = arguments.length >= 2 ? arguments[1] : void 0, h = 0; h < c; h++) if (h in b) {
            var l = b[h];
            d.call(m, l, h, b) && f.push(l);
        }

        return f;
    });
    Array.prototype.map || (Array.prototype.map = function (d, e) {
        var c, f, m;
        if (null == this) throw new TypeError(" this is null or not defined");
        var h = Object(this),
            l = h.length >>> 0;
        if (Object.prototype.toString.call(d) !== "[object Function]") throw new TypeError(d + " is not a function");
        e && (c = e);
        f = Array(l);

        for (m = 0; m < l;) {
            var p;
            m in h && (p = h[m], p = d.call(c, p, m, h), f[m] = p);
            m++;
        }

        return f;
    });
    Array.prototype.reduce || (Array.prototype.reduce = function (d) {
        if (null == this) throw new TypeError("Array.prototype.reduce called on null or undefined");
        if (typeof d !== "function") throw new TypeError(d + " is not a function");
        var e = Object(this),
            g = e.length >>> 0,
            f = 0,
            m;
        if (arguments.length == 2) m = arguments[1]; else {
            for (; f < g && !(f in e);) f++;

            if (f >= g) throw new TypeError("Reduce of empty array with no initial value");
            m = e[f++];
        }

        for (; f < g; f++) f in e && (m = d(m, e[f], f, e));

        return m;
    });
    Array.prototype.indexOf || (Array.prototype.indexOf = function (d, b) {
        var c;
        if (null == this) throw new TypeError("\"this\" is null or not defined");
        var f = Object(this),
            m = f.length >>> 0;
        if (m === 0) return -1;
        c = +b || 0;
        Infinity === Math.abs(c) && (c = 0);
        if (c >= m) return -1;

        for (c = Math["max"](c >= 0 ? c : m - Math.abs(c), 0); c < m;) {
            if (c in f && f[c] === d) return c;
            c++;
        }

        return -1;
    });
    var ld = window["document"];

    (function () {
        var d = Array.prototype.slice;

        try {
            d.call(ld["documentElement"]);
        } catch (e) {
            Array.prototype.slice = function (e, c) {
                c = typeof c !== "undefined" ? c : this.length;
                if (Object.prototype.toString.call(this) === "[object Array]") return d.call(this, e, c);
                var f,
                    h = [],
                    l;
                f = this.length;
                var p = e || 0,
                    p = p >= 0 ? p : f + p;
                l = c ? c : f;
                c < 0 && (l = f + c);
                l -= p;
                if (l > 0) if (h = Array(l), this.charAt) for (f = 0; f < l; f++) h[f] = this.charAt(p + f); else for (f = 0; f < l; f++) h[f] = this[p + f];
                return h;
            };
        }
    })();

    Object.keys || (Object.keys = function () {
        var d = Object.prototype.hasOwnProperty,
            e = !{
                toString: null
            }.propertyIsEnumerable("toString"),
            g = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
            f = g.length;
        return function (b) {
            if (typeof b !== "function" && (typeof b !== "object" || null === b)) throw new TypeError("Object.keys called on non-object");
            var h = [],
                l;

            for (l in b) d.call(b, l) && h.push(l);

            if (e) for (l = 0; l < f; l++) d.call(b, g[l]) && h.push(g[l]);
            return h;
        };
    }());
    typeof Object.create !== "function" && (Object.create = function (a, e) {
        function g() {
        }

        if (typeof a !== "object" && typeof a !== "function") throw new TypeError("Object prototype may only be an Object: " + a);
        if (null === a) throw Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
        if (typeof e !== "undefined") throw Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");
        g.prototype = a;
        return new g();
    });
    String.prototype.trim || (String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    });
    var nc = "WM_CONFIG",
        Fa = "WM_TID",
        ra = "WM_DID",
        oc = "WM_DIV",
        ob = "WM_NI",
        pc = "WM_NIKE",
        y = "NUMBER",
        u = "STRING",
        Z = "HEX",
        A = "BOOLEAN",
        H = "ARRAY",
        Jb = "CAT_CANVAS",
        Za = "CAT_FONTS",
        Kb = "CAT_WEBGL",
        Nb = typeof window !== "undefined" ? window : Nb,
        z = F("window"),
        x = F("document"),
        w = F("navigator"),
        Da = F("screen"),
        Cb = F("location"),
        cb = F("XMLHttpRequest"),
        md = F("sessionStorage"),
        na = F("localStorage"),
        nd = F("devicePixelRatio"),
        od = F("indexedDB"),
        pd = F("openDatabase"),
        qc = F("doNotTrack"),
        gd = F("ActiveXObject"),
        qd = F("WebGLRenderingContext"),
        aa = F("encodeURIComponent"),
        Zb = F("decodeURIComponent"),
        xa = F("setTimeout"),
        rd = F("setInterval"),
        ga = F("clearTimeout"),
        ma = F("parseInt"),
        Eb = F("RegExp"),
        Ba = F("Date"),
        cc = F("unescape"),
        hc = F("OfflineAudioContext") || F("webkitOfflineAudioContext"),
        Sc = {}.toString;

    sa.prototype.zc = function (a) {
        this.ia = Ha(this.ia || {}, a);
    };

    sa.prototype.yc = function (a) {
        this.ca = Ha(this.ca || {}, a);
    };

    sa.prototype.j = function (a, e, c) {
        if (a = this.ca[a]) return a({
            state: this["state"],
            B: this.B,
            j: this.j
        }, e, c);
    };

    sa.prototype.B = function (a, e) {
        var c = this,
            f = {
                type: a,
                Hc: e
            },
            h = this.ia[a];
        h && (this.$b(function () {
            return h(c["state"], e);
        }), this.Mb.map(function (a) {
            return a(f, c["state"]);
        }));
    };

    sa.prototype.$b = function (a) {
        var b = this.ea;
        this.ea = !0;
        a();
        this.ea = b;
    };

    var Qc = {
            name: "JSCookie",
            m: function (a, e, g) {
                g = g ? "domain=" + g : "";
                x["cookie"] = aa(a) + "=" + aa(e) + ";expires=Tue, 19 Jan 2038 03:14:07 GMT;path=/;" + g + ";";
            },
            k: function (b) {
                for (var e = (x["cookie"] || "").split(";"), g = 0, f = e.length; g < f; g++) {
                    var h = e[g].split("="),
                        k = h[0],
                        h = h[1];
                    void 0 === h && (h = "");
                    if (k === b) return Zb(h);
                }

                return null;
            },
            W: function (a) {
                x["cookie"] = aa(a) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            }
        },
        Rc = {
            name: "localStorage",
            m: function (a, e) {
                try {
                    (z["localStorage"] || {}).setItem(a, e);
                } catch (c) {
                }
            },
            k: function (a) {
                try {
                    return (z["localStorage"] || {})["getItem"](a);
                } catch (e) {
                }
            },
            W: function (a) {
                try {
                    return (z["localStorage"] || {})["removeItem"](a);
                } catch (e) {
                }
            }
        },
        Pa = {},
        Pc = {
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

    Aa.prototype.m = function (a, b, c) {
        var f = this;
        this.X.forEach(function (h) {
            return h.m(f.o(a), b, c);
        });
    };

    Aa.prototype.k = function (b) {
        for (var e = 0; e < this.X.length; e++) {
            var g = this.X[e].k(this.o(b));
            if (g) return g;
        }

        return "";
    };

    Aa.prototype.W = function (a) {
        var b = this;
        this.X.forEach(function (c) {
            return c.Ic(b.o(a));
        });
    };

    Aa.prototype.o = function (a) {
        return this.p ? this.p + ":" + a : a;
    };

    var Ia = {};

    la.prototype.m = function (d, e, c) {
        d = this.o(d);

        if (e && typeof e === "string") {
            c = J() + ma(c, 10);
            e = [e, c, J()].join(this.R);
            this.w[d] = e;

            try {
                na.setItem(d, e);
            } catch (f) {
            }
        }
    };

    la.prototype.mc = function (b) {
        b = this.o(b);
        var e = this.w[b];
        if (!e) try {
            e = na["getItem"](b);
        } catch (g) {
        }
        if (!e) return !1;
        b = J();
        var e = e.split(this.R),
            f = +e[2] || 0;
        return b <= +(+e[1] || 0) && b > f ? !0 : !1;
    };

    la.prototype.k = function (a) {
        a = this.o(a);
        var b = this.w[a];
        if (!b) try {
            b = na["getItem"](a), this.w[a] = b;
        } catch (g) {
        }
        return b ? b.split(this.R)[0] || "" : "";
    };

    la.prototype.kc = function (b) {
        b = this.o(b);
        var e = this.w[b];
        if (!e) try {
            e = na["getItem"](b), this.w[b] = e;
        } catch (g) {
        }
        return e ? e.split(this.R)[1] || 0 : "";
    };

    la.prototype.W = function (a) {
        a = this.o(a);
        delete this.w[a];

        try {
            na["removeItem"](a);
        } catch (b) {
        }
    };

    la.prototype.o = function (a) {
        return this.p ? this.p + ":" + a : a;
    };

    var Ja = {},
        Uc = 0,
        sb = 1,
        rc = 2,
        sc = 3,
        Qa = {};
    Qa[sc] = "request api error";
    Qa[rc] = "request resource error";
    Qa[sb] = "unknown error";

    var U = function (a) {
        function e(e, f, h) {
            void 0 === h && (h = {});
            a.call(this);
            this.name = "NEWatchmanError";
            this.code = e || sb;
            this.message = e + "(" + Qa[e] + ")" + (f ? " - " + f : "");
            this.data = h;
            a.captureStackTrace ? a.captureStackTrace(this, this.constructor) : this["stack"] = new a()["stack"];
        }

        a && (e.__proto__ = a);
        e.prototype = Object.create(a && a.prototype);
        e.prototype.constructor = e;

        e.prototype.toString = function () {
            return this["stack"] ? "" + this["stack"] : this.name + ": " + this.message;
        };

        return e;
    }(Error);

    U.K = sc;
    U.Dc = rc;
    U.UNKNOWN_ERROR = sb;
    var tc = "UPDATE_FUNC_TIMING",
        uc = "UPDATE_TIME_OFFSET",
        vc = "UPDATE_OPTIONS",
        oa = "bb99db1_1",
        wc = "bb99db1_2",
        tb = "bb99db1_3",
        ub = "bb99db1_4",
        xc = "bb99db1_5",
        vb = "bb99db1_6",
        qb = "bb99db1_7",
        yc = "bb99db1_9",
        Sb = ["w", "I", "g", "E", "R", "8", "p", "K", "M", "P", "t", "U", "7", "y", "X", "O", "6", "W", "j", "G", "e", "1", "o", "D", "J", "3", "5", "/", "H", "S", "l", "Q", "Y", "x", "C", "c", "m", "F", "n", "+", "b", "q", ".", "0", "u", "v", "z", "s", "f", "V", "i", "4", "T", "9", "L", "k", "B", "2", "A", "d", "Z", "N", "h", "a"],
        Vc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/"],
        eb = "r",
        Wc = "=",
        Yc = [-47, 110, 27, 16, -119, -75, 15, -20, -109, -122, -38, 28, -16, 96, -82, 71, -29, 23, -127, -8, -99, 70, -37, -50, 122, -91, -52, -107, 94, 107, 65, -65, 100, -63, -74, 40, 105, -28, 124, 68, -21, -108, 99, -39, -115, 62, -67, -14, 24, 63, -103, 77, -88, -53, 103, -125, 39, -10, 41, -98, 59, 81, 44, 72, -124, -43, -33, 30, 12, 121, 54, -95, 18, 88, 123, 73, 33, -101, 86, 87, -60, -64, -34, -57, 83, 8, -128, -84, 7, 97, -19, 91, -69, 106, 74, -13, 114, -26, -24, -62, 11, -89, 36, 118, 109, 38, -78, 104, -18, 60, -12, 51, 17, -51, -118, 56, 53, -114, 34, 92, -23, -9, -68, 6, -102, 90, 85, 22, 119, -110, 29, -97, 50, 125, -46, 45, 47, 21, -120, 37, -92, -73, 48, -96, 10, -15, -54, 1, -79, 61, -32, -121, 55, -93, -81, 116, -49, -58, -111, -31, 67, 58, -3, -85, 42, 120, -40, -61, 32, -5, -42, -71, 78, -11, -36, -25, -83, -55, 43, 80, -1, 127, 46, 35, 9, -105, 75, 111, -112, -44, 108, -87, 115, 19, 25, -72, -2, -123, -106, -6, 14, -66, -117, 13, 102, -70, -17, -76, 82, 0, 66, -4, 112, 64, 57, -86, -27, -30, 49, -22, 93, -45, -7, -56, 26, 98, 113, 4, 89, 2, -116, -113, -100, 31, -80, 69, -41, 52, 20, -48, 5, 76, 95, -77, 3, 101, -90, -59, -126, 79, 117, -35, -104, 84, 126, -94],
        T = 64,
        kb = 64,
        Ka = 4,
        mb = 4,
        zc = "7c08033d",
        ba = {};

    ba[oa] = function (a, b) {
        var c = a.B;
        void 0 === b && (b = {});
        c(vc, Va(b));
    };

    ba[wc] = function (d, e, g) {
        var f = d.j;
        d = d["state"];
        void 0 === g && (g = W);
        d = d["options"];
        var h = d["domain"],
            n = d.gc,
            l = d.apiServer,
            p = Ea(d["protocol"], d.__serverConfig__.apiServer || l, "/v3/d");
        Qb(p, {
            ba: "POST",
            J: {
                d: e,
                v: zc
            },
            V: function (d) {
                var c = d[0],
                    e = d[1],
                    k = d[2],
                    l = d[3],
                    q = d[5];
                c === 200 || c === 420 ? (l && f(xc, {
                    id: l,
                    rc: n * 5 / 6
                }),
                q && f(yc, {
                    id: q
                }),
                k && f(ub, {
                    domain: h,
                    id: k
                }),
                c === 420 && e && f(vb, e), g(null, d)) : g(new U(U.K, "device api response wrong", {
                    url: p
                }));
            },
            U: function (a) {
                void 0 === a && (a = {});
                g(new U(U.K, "send devicedata failed: " + (a.message ? a.message : ""), {
                    url: p
                }));
            }
        });
    };

    ba[tb] = function (d, e, g) {
        var f = d.j;
        d = d["state"];
        void 0 === g && (g = W);
        d = d["options"];
        var h = d["domain"],
            n = d.apiServer,
            l = Ea(d["protocol"], d.__serverConfig__.apiServer || n, "/v3/b");
        Qb(l, {
            ba: "POST",
            J: {
                d: e,
                v: zc
            },
            V: function (d) {
                var c = d[0],
                    e = d[1],
                    k = d[2];
                c === 200 || c === 420 ? (k && f(ub, {
                    domain: h,
                    id: k
                }), c === 420 && e && f(vb, e), g(null, d)) : c === 470 ? g(null, d) : g(new U(U.K, "behavior api response wrong", {
                    url: l
                }));
            },
            U: function (a) {
                void 0 === a && (a = {});
                g(new U(U.K, "send devicedata failed: " + (a.message ? a.message : ""), {
                    url: l
                }));
            }
        });
    };

    ba[ub] = function (a, b) {
        var g = b.id,
            f = b["domain"];
        X().m(Fa, g, f);
    };

    ba[yc] = function (a, b) {
        var c = b.id;
        X().m(ob, c);
        X().m(pc, nb());
    };

    ba[xc] = function (a, c) {
        var g = a["state"],
            f = c.id,
            h = c.rc;
        ea().m(ra, f, h);
        ea().m(oc, g["options"].buildVersion, h);
    };

    ba[vb] = function (a, b) {
        var g = a.B;
        b = new Ba(b)["getTime"]();
        g(uc, b - J());
    };

    ba[qb] = function (a, b) {
        var c = a.B;
        c(tc, b);
    };

    var Ra = {};

    Ra[vc] = function (a, c) {
        a["options"] = c;
    };

    Ra[tc] = function (b, c) {
        b.$[c.cursor] = c.value || 0;
    };

    Ra[uc] = function (a, b) {
        a.wa = b;
    };

    var D = new sa({
            state: {
                options: {},
                wa: 0,
                $: [0, 0, 0, 0, 0, 0]
            },
            ac: ba,
            tc: Ra
        }),
        ca = {
            Xb: {
                c: 0,
                a: u,
                e: 3
            },
            Ka: {
                c: 1,
                a: u,
                e: 20
            },
            La: {
                c: 2,
                a: u,
                e: 32
            },
            Ia: {
                c: 3,
                a: u,
                e: 32
            },
            yb: {
                c: 4,
                a: u,
                e: 32
            },
            Pb: {
                c: 5,
                a: y,
                e: 4
            },
            Gb: {
                c: 6,
                a: y,
                e: 1
            },
            Ub: {
                c: 7,
                a: u,
                e: 32
            },
            Ya: {
                c: 8,
                a: u,
                e: 32
            },
            Fb: {
                c: 9,
                a: u,
                e: 32
            },
            Yb: {
                c: 107,
                a: y,
                e: 4
            },
            _move: {
                c: 109,
                a: H,
                e: [2, 4, 1, 4, 4]
            },
            _down: {
                c: 110,
                a: H,
                e: [2, 4, 1, 2, 4, 4]
            },
            _up: {
                c: 111,
                a: H,
                e: [2, 4, 1, 4, 4]
            },
            _click: {
                c: 112,
                a: H,
                e: [2, 4, 1, 4, 4, 20]
            },
            _keydown: {
                c: 113,
                a: H,
                e: [2, 4, 1, 20]
            },
            _focus: {
                c: 114,
                a: H,
                e: [2, 4, 1, 20]
            },
            _blur: {
                c: 115,
                a: H,
                e: [2, 4, 1, 20]
            },
            _scroll: {
                c: 116,
                a: H,
                e: [2, 4, 1, 4, 4]
            },
            _orientation: {
                c: 117,
                a: H,
                e: [2, 4, 4, 4, 4, 1]
            },
            _motion: {
                c: 118,
                a: H,
                e: [2, 4, 4, 4, 4, 2]
            },
            _battery: {
                c: 119,
                a: H,
                e: [2, 4, 1, 1, 4]
            },
            Vb: {
                c: 200,
                a: u,
                e: 400
            },
            ub: {
                c: 201,
                a: u,
                e: 20
            },
            Pa: {
                c: 202,
                a: y,
                e: 1
            },
            Xa: {
                c: 203,
                a: y,
                e: 1
            },
            Qb: {
                c: 206,
                a: y,
                e: 1
            },
            Kb: {
                c: 207,
                a: A,
                e: 1
            },
            xb: {
                c: 208,
                a: A,
                e: 1
            },
            ob: {
                c: 209,
                a: A,
                e: 1
            },
            Aa: {
                c: 210,
                a: A,
                e: 1
            },
            Ab: {
                c: 211,
                a: A,
                e: 1
            },
            Ra: {
                c: 212,
                a: u,
                e: 10
            },
            Db: {
                c: 213,
                a: u,
                e: 10
            },
            Za: {
                c: 214,
                a: u,
                e: 15
            },
            Eb: {
                c: 215,
                a: Z,
                e: 16
            },
            Ma: {
                c: 216,
                a: Z,
                e: 16
            },
            Zb: {
                c: 217,
                a: Z,
                e: 16
            },
            za: {
                c: 218,
                a: A,
                e: 1
            },
            kb: {
                c: 221,
                a: A,
                e: 1
            },
            jb: {
                c: 222,
                a: A,
                e: 1
            },
            Tb: {
                c: 223,
                a: A,
                e: 1
            },
            Hb: {
                c: 225,
                a: y,
                e: 1
            },
            Qa: {
                c: 228,
                a: A,
                e: 1
            },
            sb: {
                c: 229,
                a: A,
                e: 1
            },
            Ba: {
                c: 230,
                a: u,
                e: 20
            },
            Ca: {
                c: 231,
                a: u,
                e: 10
            },
            Da: {
                c: 232,
                a: u,
                e: 20
            },
            Ea: {
                c: 233,
                a: u,
                e: 150
            },
            vb: {
                c: 234,
                a: u,
                e: 10
            },
            Nb: {
                c: 235,
                a: u,
                e: 10
            },
            Wb: {
                c: 236,
                a: u,
                e: 10
            },
            Ja: {
                c: 237,
                a: u,
                e: 10
            },
            Bb: {
                c: 238,
                a: u,
                e: 40
            },
            $a: {
                c: 239,
                a: u,
                e: 20
            },
            eb: {
                c: 240,
                a: Z,
                e: 16
            },
            cb: {
                c: 241,
                a: y,
                e: 2
            },
            Ib: {
                c: 242,
                a: H,
                e: [2, 2, 2, 2]
            },
            hb: {
                c: 243,
                a: y,
                e: 1
            },
            ib: {
                c: 401,
                a: A,
                e: 1
            },
            bb: {
                c: 402,
                a: u,
                e: 10
            },
            zb: {
                c: 403,
                a: y,
                e: 1
            },
            ab: {
                c: 404,
                a: y,
                e: 1
            },
            Lb: {
                c: 405,
                a: A,
                e: 1
            },
            Sb: {
                c: 450,
                a: y,
                e: 1
            },
            rb: {
                c: 451,
                a: A,
                e: 1
            },
            nb: {
                c: 701,
                a: y,
                e: 1
            },
            fb: {
                c: 702,
                a: y,
                e: 1
            },
            qb: {
                c: 703,
                a: y,
                e: 1
            },
            Jb: {
                c: 704,
                a: y,
                e: 5
            },
            lb: {
                c: 705,
                a: y,
                e: 1
            },
            Rb: {
                c: 706,
                a: u,
                e: 10
            },
            tb: {
                c: 707,
                a: u,
                e: 16
            },
            Ob: {
                c: 708,
                a: y,
                e: 2
            },
            mb: {
                c: 709,
                a: y,
                e: 2
            },
            pb: {
                c: 710,
                a: y,
                e: 2
            },
            gb: {
                c: 711,
                a: H,
                e: [3, 3, 3, 3, 3]
            },
            Cb: {
                c: 712,
                a: H,
                e: [1, 3, 3]
            },
            Oa: {
                c: 713,
                a: H,
                e: [4, 4]
            },
            Sa: {
                c: 800,
                a: u,
                e: 8
            },
            Ta: {
                c: 801,
                a: u,
                e: 8
            },
            Ua: {
                c: 802,
                a: u,
                e: 8
            },
            Va: {
                c: 803,
                a: u,
                e: 8
            },
            Wa: {
                c: 804,
                a: u,
                e: 8
            },
            Ha: {
                c: 327,
                a: u,
                e: 32
            }
        },
        ec = 0,
        Ic = "2.7.1_7c08033d",
        Jc = ["5", "6", "e", "3", "5", "c", "d", "1"],
        Kc = "7,0,1,d,7,3,7,3",
        Mc = "32288785",
        pb,
        wb,
        Ca,
        gc,
        G = ic(),
        sd = function () {
            var d = ic();
            return d === "Windows Phone" || d === "Android" || d === "iOS" ? 3 : d === "Linux" || d === "Windows" || d === "Mac" ? 2 : 1;
        }(),
        P = function () {
            var d = w["userAgent"].toLowerCase();
            return d.indexOf("firefox") >= 0 ? "Firefox" : d.indexOf("opera") >= 0 || d.indexOf("opr") >= 0 ? "Opera" : d.indexOf("chrome") >= 0 ? "Chrome" : d.indexOf("safari") >= 0 ? "Safari" : d.indexOf("trident") >= 0 ? "Internet Explorer" : "Other";
        }(),
        Ya = {
            Vb: {
                f: function () {
                    return w["userAgent"] || "";
                },
                a: u
            },
            ub: {
                f: function () {
                    return w["language"] || "";
                },
                a: u
            },
            Pa: {
                f: function () {
                    return Da["colorDepth"] || 0;
                },
                a: y
            },
            Xa: {
                f: function () {
                    return nd || 0;
                },
                a: y
            },
            Qb: {
                f: function () {
                    return Math["floor"](new Ba()["getTimezoneOffset"]() / 60 * -1 + 12);
                },
                a: y
            },
            Kb: {
                f: function () {
                    return !!md;
                },
                a: A
            },
            xb: {
                f: function () {
                    return !!na;
                },
                a: A
            },
            ob: {
                f: function () {
                    return !!od;
                },
                a: A
            },
            Aa: {
                f: function () {
                    var a = x["body"];
                    return a && !!a["addBehavior"];
                },
                a: A
            },
            Ab: {
                f: function () {
                    return !!pd;
                },
                a: A
            },
            Ra: {
                f: function () {
                    return w["cpuClass"] || "";
                },
                a: u
            },
            Db: {
                f: function () {
                    return w["platform"] || "";
                },
                a: u
            },
            Za: {
                f: function () {
                    return w["doNotTrack"] ? w["doNotTrack"] : w.sc ? w.sc : qc ? qc : "unknown";
                },
                a: u
            },
            Eb: {
                f: function () {
                    var a = hd ? fd() : jc();
                    return ya(a.join("~"));
                },
                u: !0,
                a: Z
            },
            Ma: {
                f: function () {
                    var d;

                    if (kc()) {
                        if (wb) d = wb; else {
                            d = [];

                            try {
                                var e = x["createElement"]("canvas");
                                e["width"] = 500;
                                e["height"] = 200;
                                e["style"].display = "inline";
                                var g = e["getContext"]("2d");
                                g["rect"](0, 0, 10, 10);
                                g["rect"](2, 2, 6, 6);
                                d.push("canvas winding:" + (!1 === g.isPointInPath(5, 5, "evenodd") ? "yes" : "no"));
                                g["textBaseline"] = "alphabetic";
                                g["fillStyle"] = "#f60";
                                g["fillRect"](125, 1, 62, 20);
                                g["fillStyle"] = "#069";
                                g["font"] = "11pt Arial";
                                g.fillText("Cwm fjordbank glyphs vext quiz, \uD83D\uDE05\uD83D\uDE25\uD83D\uDC76\uD83D\uDE03\uD83E\uDDE5\uD83D\uDC36\uD83C\uDF4F\u26BD\uFE0F\u2702\uD83C\uDE32\uD83D\uDE97\u231A\uFE0F\u2764\uFE0F\uD83C\uDFC1\u25B6", 2, 15);
                                g["fillStyle"] = "rgba(102, 204, 0, 0.2)";
                                g["font"] = "18pt Arial";
                                g.fillText("Cwm fjordbank glyphs vext quiz, \uD83D\uDE05\uD83D\uDE25\uD83D\uDC76\uD83D\uDE03", 4, 45);
                                g.fillText("\uD83E\uDDE5\uD83D\uDC36\uD83C\uDF4F\u26BD\uFE0F\u2702\uD83C\uDE32\uD83D\uDE97\u231A\uFE0F\u2764\uFE0F\uD83C\uDFC1\u25B6", 4, 75);
                                g["globalCompositeOperation"] = "multiply";
                                g["fillStyle"] = "rgb(255,0,255)";
                                g["beginPath"]();
                                g["arc"](50, 50, 50, 0, Math.PI * 2, !0);
                                g["closePath"]();
                                g.fill();
                                g["fillStyle"] = "rgb(0,255,255)";
                                g["beginPath"]();
                                g["arc"](100, 50, 50, 0, Math.PI * 2, !0);
                                g["closePath"]();
                                g.fill();
                                g["fillStyle"] = "rgb(255,255,0)";
                                g["beginPath"]();
                                g["arc"](75, 100, 50, 0, Math.PI * 2, !0);
                                g["closePath"]();
                                g.fill();
                                g["fillStyle"] = "rgb(255,0,255)";
                                g["arc"](75, 75, 75, 0, Math.PI * 2, !0);
                                g["arc"](75, 75, 25, 0, Math.PI * 2, !0);
                                g.fill("evenodd");
                                d.push("canvas fp:" + e["toDataURL"]());
                            } catch (f) {
                                d.push(f);
                            }

                            d = wb = d;
                        }
                        d = ya(d.join("~"));
                    } else d = "";

                    return d;
                },
                a: Z,
                u: !0,
                T: Jb
            },
            Zb: {
                f: function () {
                    var a;

                    if (kc()) {
                        a = x["createElement"]("canvas");
                        var e;

                        try {
                            e = a["getContext"] && (a["getContext"]("webgl") || a["getContext"]("experimental-webgl"));
                        } catch (g) {
                            e = !1;
                        }

                        a = !!qd && !!e;
                    } else a = !1;

                    return a ? ya(dd().join("~")) : "";
                },
                a: Z,
                u: !0,
                T: Kb
            },
            za: {
                f: function () {
                    var d = x["createElement"]("div"),
                        e = "fp_" + new Ba();
                    d["innerHTML"] = "&nbsp;";
                    d.className = "adsbox";
                    d.id = e;
                    var g = !1;

                    try {
                        x["body"]["appendChild"](d), g = x.getElementById(e)["offsetHeight"] === 0, x["body"]["removeChild"](d);
                    } catch (f) {
                        g = !1;
                    }

                    return g;
                },
                a: A,
                u: !0
            },
            kb: {
                f: function () {
                    var d = w["platform"],
                        e = w["oscpu"];
                    return ("ontouchstart" in z || w.qa > 0 || w.ra > 0) && G !== "Windows Phone" && G !== "Android" && G !== "iOs" && G !== "Other" || typeof e !== "undefined" && (e = e.toLowerCase(), ~e.indexOf("win") && G !== "Windows" && G !== "iOS" && G !== "Other" || ~e.indexOf("linux") && G !== "Linux" && G !== "Android" || ~e.indexOf("mac") && G !== "Mac" && G !== "iOS" || (e.indexOf("win") === -1 && e.indexOf("linux") === -1 && e.indexOf("mac" === -1)) !== (G === "Other")) ? !0 : d.indexOf("win") >= 0 && G !== "Windows" && G !== "Windows Phone" || (d.indexOf("linux") >= 0 || d.indexOf("android") >= 0 || d.indexOf("pike") >= 0) && G !== "Linux" && G !== "Android" || (d.indexOf("mac") >= 0 || d.indexOf("ipad") >= 0 || d.indexOf("ipod") >= 0 || d.indexOf("iphone") >= 0) && G !== "Mac" && G !== "iOS" || (d.indexOf("win") === -1 && d.indexOf("linux") === -1 && d.indexOf("mac") === -1) !== (G === "Other") ? !0 : typeof w["plugins"] === "undefined" && G !== "Windows" && G !== "Windows Phone" ? !0 : !1;
                },
                a: A
            },
            jb: {
                f: function () {
                    var d = w["productSub"];
                    if ((P === "Chrome" || P === "Safari" || P === "Opera") && d !== "20030107") return !0;
                    d = eval.toString().length;
                    if (d === 37 && P !== "Safari" && P !== "Firefox" && P !== "Other" || d === 39 && P !== "Internet Explorer" && P !== "Other" || d === 33 && P !== "Chrome" && P !== "Opera" && P !== "Other") return !0;
                    var e;

                    try {
                        throw Error("a");
                    } catch (g) {
                        try {
                            g["toSource"](), e = !0;
                        } catch (f) {
                            e = !1;
                        }
                    }

                    return e && P !== "Firefox" && P !== "Other" ? !0 : !1;
                },
                a: A
            },
            Tb: {
                f: function () {
                    var d = 0,
                        e = !1;
                    typeof w.qa !== "undefined" ? d = w.qa : typeof w.ra !== "undefined" && (d = w.ra);

                    try {
                        x["createEvent"]("TouchEvent"), e = !0;
                    } catch (g) {
                    }

                    var f = ("ontouchstart" in z);
                    return d > 0 || e || f;
                },
                a: A
            },
            Hb: {
                f: function () {
                    return sd;
                },
                a: y
            },
            Qa: {
                f: function () {
                    return !!w["cookieEnabled"];
                },
                a: A
            },
            sb: {
                f: function () {
                    try {
                        return !!w["javaEnabled"]();
                    } catch (a) {
                        return !1;
                    }
                },
                a: A
            },
            Ba: {
                f: function () {
                    return w["appCodeName"] || "";
                },
                a: u
            },
            Ca: {
                f: function () {
                    return w["appMinorVersion"] || "";
                },
                a: u
            },
            Da: {
                f: function () {
                    return w["appName"] || "";
                },
                a: u
            },
            Ea: {
                f: function () {
                    return w["appVersion"] || "";
                },
                a: u
            },
            vb: {
                f: function () {
                    return w["languages"] || "";
                },
                a: u
            },
            Nb: {
                f: function () {
                    return w["systemLanguage"] || "";
                },
                a: u
            },
            Wb: {
                f: function () {
                    return w["userLanguage"] || "";
                },
                a: u
            },
            Ja: {
                f: function () {
                    return w["browserLanguage"] || "";
                },
                a: u
            },
            Bb: {
                f: function () {
                    return w["oscpu"] || "";
                },
                a: u
            },
            $a: {
                f: function () {
                    return x["documentMode"] || x["compatMode"] || "";
                },
                a: u
            },
            eb: {
                f: function () {
                    return ya(fc().join("~"));
                },
                a: Z,
                u: !0,
                T: Za
            },
            cb: {
                f: function () {
                    return fc().length || 0;
                },
                a: y,
                u: !0,
                T: Za
            },
            hb: {
                f: function () {
                    return w["hardwareConcurrency"] || 0;
                },
                a: y
            },
            Ib: {
                f: function () {
                    var d = Da["width"];
                    void 0 === d && (d = 0);
                    var c = Da["height"];
                    void 0 === c && (c = 0);
                    var g = Da["availWidth"];
                    void 0 === g && (g = 0);
                    var f = Da["availHeight"];
                    return [d > c ? d : c, d > c ? c : d, g > f ? g : f, g > f ? f : g];
                },
                a: H
            },
            Ha: {
                f: function (a) {
                    return hc ? ed(a) : a("");
                },
                a: u,
                Fa: !0,
                u: !0
            }
        },
        Xa = [],
        Hb = 0,
        Wa = [],
        Ib = !1,
        Sa = /./;

    try {
        Sa.toString = function () {
            return Sa.wc = !0;
        }, console.log("%c", Sa);
    } catch (td) {
    }

    var Gb = {
            ib: {
                f: function () {
                    return !!Sa.wc;
                },
                a: A
            },
            bb: {
                f: function () {
                    var a;

                    try {
                        null[0]();
                    } catch (e) {
                        a = e;
                    }

                    return a && typeof a["stack"] === "string" ? ["phantomjs", "rhino", "nodejs", "couchjs", "selenium"].filter(function (b) {
                        return ~a["stack"].indexOf(b);
                    })[0] || "" : "";
                },
                a: u
            },
            zb: {
                f: function () {
                    for (var d = ["document", "navigator", "location", "history", "", "", "screen", "parent", "top", "self", {
                        q: "parseFloat",
                        n: function () {
                            try {
                                return z["parseFloat"]("1.01") === 1.01 && z["isNaN"](z["parseFloat"]("HI"));
                            } catch (d) {
                                return !1;
                            }
                        }
                    }, {
                        q: "parseInt",
                        n: function () {
                            try {
                                return z["parseInt"]("123") === 123 && z["isNaN"](z["parseFloat"]("HI"));
                            } catch (d) {
                                return !1;
                            }
                        }
                    }, {
                        q: "decodeURI",
                        n: function () {
                            try {
                                return z["decodeURI"]("%22") === "\"";
                            } catch (a) {
                                return !1;
                            }
                        }
                    }, {
                        q: "decodeURIComponent",
                        n: function () {
                            try {
                                return z["decodeURIComponent"]("%26") === "&";
                            } catch (a) {
                                return !1;
                            }
                        }
                    }, {
                        q: "encodeURI",
                        n: function () {
                            try {
                                return z["encodeURI"]("\"") === "%22";
                            } catch (a) {
                                return !1;
                            }
                        }
                    }, {
                        q: "encodeURIComponent",
                        n: function () {
                            try {
                                return z["encodeURIComponent"]("&") === "%26";
                            } catch (a) {
                                return !1;
                            }
                        }
                    }, {
                        q: "escape",
                        n: function () {
                            try {
                                return z["escape"]("&") === "%26";
                            } catch (a) {
                                return !1;
                            }
                        }
                    }, {
                        q: "unescape",
                        n: function () {
                            try {
                                return z["unescape"]("%26") === "&";
                            } catch (a) {
                                return !1;
                            }
                        }
                    }, {
                        q: "eval",
                        n: function () {
                            try {
                                return z["eval"]("(function(){return 123;})();") === 123;
                            } catch (d) {
                                return !1;
                            }
                        }
                    }, "window"], e = 0, g = d.length; e < g; e++) {
                        if (d[e].n) if (d[e].n()) continue; else return e + 1;
                        if (d[e] && !z[d[e]]) return e + 1;
                    }

                    return 0;
                },
                a: y
            },
            ab: {
                f: function () {
                    var d;
                    if (!(d = ka(jd, 5, void 0)())) a: {
                        for (var e in x) if (x[e]) {
                            try {
                                if (x[e]["cache_"] && e["match"] && e["match"](/\$[a-z]dc_/)) {
                                    d = 200;
                                    break a;
                                }
                            } catch (g) {
                            }

                            d = 0;
                            break a;
                        }

                        d = void 0;
                    }
                    if (!d) try {
                        d = z["external"] && ~z["external"].toString().indexOf("Sequentum") && 201;
                    } catch (f) {
                        d = 0;
                    }
                    return d;
                },
                a: y
            },
            Sb: {
                f: function () {
                    return z["initWatchman"]["version"] || z["initNEWatchman"]["version"] || 0;
                },
                a: y
            },
            rb: {
                f: function () {
                    for (var d = !1, e = x["getElementsByTagName"]("script"), g = 0, f = e.length; g < f; g++) {
                        var h = e[g]["src"];

                        if (h && ~h.indexOf("/tool.min.js")) {
                            d = !0;
                            break;
                        }
                    }

                    return d;
                },
                a: A
            }
        },
        Ec = {
            nb: {
                f: function () {
                    return Ma("iframe");
                },
                a: y
            },
            fb: {
                f: function () {
                    return Ma("form");
                },
                a: y
            },
            qb: {
                f: function () {
                    return Ma("input");
                },
                a: y
            },
            Jb: {
                f: function () {
                    return Ma("script");
                },
                a: y
            },
            lb: {
                f: function () {
                    return z.history.length || 0;
                },
                a: y
            },
            Rb: {
                f: function () {
                    return x["title"] || "";
                },
                a: u
            },
            tb: {
                f: function () {
                    return x.Gc || "";
                },
                a: u
            },
            Ob: {
                f: function () {
                    return (x["documentElement"]["textContent"] || x["documentElement"]["innerText"]).length || 0;
                },
                a: y
            },
            mb: {
                f: function () {
                    return x["documentElement"]["innerHTML"].length || 0;
                },
                a: y
            },
            pb: {
                f: function () {
                    return D["state"].$[0];
                },
                a: y
            },
            gb: {
                f: function () {
                    return D["state"].$.slice(1);
                },
                a: H
            },
            Cb: {
                f: function () {
                    var d = z["performance"];

                    if (d) {
                        var e = d["timing"];
                        return [d["navigation"].type, e["responseStart"] - e["requestStart"], e["responseEnd"] - e["fetchStart"]];
                    }

                    return [0, 0, 0];
                },
                a: H
            },
            Oa: {
                f: function () {
                    return [z["innerWidth"] || x["body"]["clientWidth"], z["innerHeight"] || x["body"]["clientHeight"]];
                },
                a: H
            },
            Lb: {
                f: function () {
                    return db() ? 1 : 2;
                },
                a: y
            },
            Yb: {
                f: function () {
                    return D["state"]["options"].Cc;
                },
                a: y
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
        ja = {},
        xb,
        yb;
    x["createElement"]("div")["addEventListener"] ? (xb = function (a, b, g) {
        a["addEventListener"](b, g, !0);
    }, yb = function (a, b, g) {
        a["removeEventListener"](b, g, !0);
    }) : (xb = function (a, c, g) {
        a["attachEvent"]("on" + c, g);
    }, yb = function (a, c, g) {
        a["detachEvent"]("on" + c, g);
    });

    ja.ta = function (a, b, c) {
        xb(a, b, c);
        return ja;
    };

    ja.sa = function (a, b, c) {
        yb(a, b, c);
        return ja;
    };

    var zb = Object.keys(Ga),
        Ab = {},
        ua = !!w["getBattery"],
        Na = 0;

    V.prototype._start = function () {
        this.l || (this.l = !0, this.bc());
    };

    V.prototype._stop = function () {
        this.l = !1;
        this.ua();
        this.A();
    };

    V.prototype.A = function () {
        Na = 0;
        this._battery = {};
        if (this.g) for (var b in this.g) this.g[b] && (this.g[b] = []);
    };

    V.prototype.lc = function (d) {
        if (!this.l) return this.ua();
        d = d || z["event"];
        var e;

        a: if (e = d.type, Ab[e]) e = Ab[e]; else {
            for (var g = 0, f = zb.length; g < f; g++) for (var h = Ga[zb[g]], k = 0, l = h.length; k < l; k++) if (e === h[k]) {
                e = Ab[e] = zb[g];
                break a;
            }

            e = "";
        }

        this.N(d, e);
    };

    V.prototype.I = function () {
        var a = this,
            c = [];
        va(Object.keys(this.g)).forEach(function (g) {
            N(a.g[g]) === "array" && va(a.g[g]).forEach(function (a) {
                return c.push.apply(c, a);
            });
        });
        this.A();
        return c;
    };

    V.prototype.bc = function () {
        var a = this;
        this.F.forEach(function (b) {
            var g = ~["_focus", "_blur", "_scroll", "_orientation", "_motion"].indexOf(b) ? z : x;
            a.Z[b] = g;
            a.fa(g, b, !0);
        });
    };

    V.prototype.ua = function () {
        var a = this;
        this.F.forEach(function (b) {
            var c = a.Z[b];
            c && a.fa(c, b);
        });
        this.Z = {};
    };

    V.prototype.fa = function (a, b, c) {
        var f = this;
        Ga[b].forEach(function (b) {
            c ? ja.ta(a, b, f.pa) : ja.sa(a, b, f.pa);
        });
    };

    V.prototype.N = function (d, e) {
        var g,
            f,
            h,
            n,
            l = e.slice(1);
        g = this.ja;
        f = l + "Interval";
        var p = l + "Max",
            q = this.g[e];
        q || (q = this.g[e] = []);
        f = q.length < g[p] ? 100 : g[f];
        h = J();
        if (h - (q.ya || 0) <= f) return this;
        q.ya = h;
        q.length >= g[p] && q.shift();
        p = d;
        void 0 === p && (p = {});
        n = p["changedTouches"] && p["changedTouches"].length ? p["changedTouches"][0] : p;
        g = typeof p["isTrusted"] === "undefined" ? 1 : p["isTrusted"] ? 2 : 3;
        f = p["button"] || 0;
        h = n["clientX"] || n["screenX"];
        n = n["clientY"] || n["clientX"];
        var r = p["target"] || p["srcElement"],
            p = D["state"]["options"].S;
        void 0 === p && (p = 0);
        p = [mc(), J() - p];

        switch (l) {
            case "down":
                p.push(g, f, h << 0, n << 0);
                break;

            case "move":
                p.push(g, h << 0, n << 0);
                break;

            case "up":
                p.push(g, h << 0, n << 0);
                break;

            case "click":
                p.push(g, h << 0, n << 0, r.id || "");
                break;

            case "keydown":
            case "focus":
            case "blur":
                p.push(g, r && r.id || "");
                break;

            case "scroll":
                l = "pageXOffset" in z;
                f = (x["compatMode"] || "") === "CSS1Compat";
                l = [l ? z["pageXOffset"] : f ? x["documentElement"]["scrollLeft"] : x["body"]["scrollLeft"],
                    l ? z["pageYOffset"] : f ? x["documentElement"]["scrollTop"] : x["body"]["scrollTop"]];
                p.push(g, l[0] << 0, l[1] << 0);
                break;

            case "orientation":
                if (null == d["alpha"] || null == d["beta"] || null == d["gamma"]) return;
                p.push(Math.round(d["alpha"]), Math.round(d["beta"]), Math.round(d["gamma"]), lc(d["absolute"]));
                break;

            case "motion":
                l = d["acceleration"] || d["accelerationIncludingGravity"];
                if (!l || null == l["x"] || null == l["y"] || null == l["z"]) return;
                p.push(Math.round(l["x"] * 1000), Math.round(l["y"] * 1000), Math.round(l["z"] * 1000), d["interval"]);
                break;

            default:
                p.length = 0;
        }

        p.length && ("", q.push(wa(p, ca[e])));
    };

    pa.prototype._start = function () {
        var a = this;
        this.l || (this.l = !0, this.D = w["getBattery"](), this.D.then(function (e) {
            a._battery["charging"] = e["charging"];
            a._battery["level"] = e["level"];
            a._battery["chargingTime"] = e["chargingTime"];
            a._battery["dischargingTime"] = e["dischargingTime"];
            a.N(a._battery);
            a.F.forEach(function (b) {
                return ja.ta(e, b, a.da);
            });
        }));
    };

    pa.prototype._stop = function () {
        var a = this;
        this.l = !1;
        this.D && this.D.then(function (b) {
            a.F.forEach(function (c) {
                return ja.sa(b, c, a.da);
            });
        });
        this.A();
    };

    pa.prototype.A = function () {
        Na = 0;
        this.g = [];
        this.D = null;
        this._battery = {};
    };

    pa.prototype.N = function (d) {
        function e(a) {
            return null == d[a] ? g._battery[a] : d[a];
        }

        var g = this,
            f = this.g.length < this.Y[0] ? 100 : this.Y[1],
            h = J();
        if (h - (this.wb || 0) <= f) return this;
        this.wb = h;
        this.g.length >= this.Y[0] && this.g.shift();
        f = D["state"]["options"].S;
        void 0 === f && (f = 0);
        var f = [mc(), J() - f],
            h = [e("charging"), e("level"), e("chargingTime"), e("dischargingTime")],
            n = h[0],
            l = h[2],
            p = h[3];
        f.push(lc(n), Math.round(h[1] * 100), function (b) {
            return typeof b === "number" && isFinite(b) ? b : -1;
        }(n ? l : p));
        "";
        this.g.push(wa(f, ca["_battery"]));
    };

    pa.prototype.I = function () {
        var a = [];
        this.g.forEach(function (b) {
            return a = a.concat(b);
        });
        this.g = [];
        return a;
    };

    var Ua,
        S = db();

    R.prototype._start = function () {
        this.P._start();

        ua && this.L._start();
    };

    R.prototype._stop = function () {
        this.P._stop();

        ua && this.L._stop();
    };

    R.prototype.A = function () {
        this.P.A();
        ua && this.L.A();
    };

    R.prototype.I = function () {
        return this.P.I().concat(ua ? this.L.I() : []);
    };

    f.prototype.aa = function (a) {
        this.h = n(a);
        this.ec();
        D.j(oa, this.h);
        this.nc();
    };

    f.prototype.ec = function () {
        var d = this.h,
            e = d.buildVersion,
            f = d.sConfig,
            h = d.staticServer,
            k = d.oc,
            d = d.valid;
        void 0 === d && (d = 0);
        if (!(d > 0) && f && N(k) === "number") try {
            na.setItem(nc, JSON["stringify"]({
                sConfig: f,
                buildVersion: e,
                staticServer: h,
                valid: J() + ma(k, 10)
            }));
        } catch (n) {
        }
    };

    f.prototype.nc = function () {
        var a = this.h,
            b = a["auto"],
            a = a.oa;
        this.M = new R();
        this.Q = !1;
        b && this._start();
        a && (this.O() || this.H(), this.Na());
    };

    f.prototype.na = function () {
        for (var b = this.ma, c = 0, f = b.length; c < f; c++) b[c]();

        b.length = 0;
    };

    f.prototype.O = function () {
        var a = this.h,
            b = a.buildVersion,
            c = a.lastUsedVersion;
        if (!a.oa) return !0;
        var a = ea().mc(ra),
            f = ea().k(oc),
            h = X().k(Fa),
            k = X().k(ob);
        return !(c && f && f !== b && f !== c) && a && h && k;
    };

    f.prototype.H = function (b) {
        var c = this;
        typeof b === "function" && this.ma.push(b);
        this.Q || (this.Q = !0, this.ga(function (b, d) {
            var f = d && d[0];
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
        rd(function () {
            ea().kc(ra) - J() <= c * 5 && b.H();
        }, c * 5);
    };

    f.prototype.ga = function (b) {
        void 0 === b && (b = W);
        var e = $a();
        id(Fc, 3)(function (f) {
            var h = Fb(!0);
            "";
            "";
            "";
            f = ka(lb, 1, void 0)(e.concat(f, h));
            D.j(wc, f, b);
        });
    };

    f.prototype._start = function () {
        this.l || (this.l = !0, this.O() || this.H(), this.h.C = bc(), this.h.S = J(), D.j(oa, this.h), this.M._start());
    };

    f.prototype._stop = function () {
        this.l = !1;

        this.M._stop();
    };

    f.prototype.ha = function (d, e, f, n) {
        function m() {
            y || (ga(A), e(dc({
                C: u,
                ka: y
            })));
        }

        function q() {
            y || (ga(A), console.log("\u8D85\u65F6\u4E86"), y = w.h.pc = !0, D.j(oa, w.h), e(dc({
                C: u,
                ka: y
            })));
        }

        N(f) !== "function" && (n = f, f = void 0);
        var l = this.h,
            p = l.S,
            r = l.dc,
            l = l.Ac;
        this.h.Cc = J() - p;
        this.h.S = J();
        var u = this.h.C = bc();

        if (!~r.indexOf(d)) {
            this.h.la = d;
            D.j(oa, this.h);
            var w = this;
            d = $a();
            var x = ka(this.M.I, 4, this.M)(),
                z = Fb();
            "";
            "";
            "";
            d = ka(lb, 1, void 0)(d.concat(z, x));
            var y = this.h.pc = !1,
                A = xa(q, +n >= 0 ? +n : l);
            D.j(tb, d, function (c, d) {
                var e = d && d[0];
                return c ? (h(c), q()) : e === 200 ? m() : e === 470 && f ? (ga(A), f(Error("businessKey is illegal"))) : e === 420 ? (e = $a(), e = ka(lb, 1, void 0)(e.concat(z, x)), D.j(tb, e, m)) : q();
            });
        }
    };

    f.prototype._getToken = function (a, b, c, f) {
        var h = this;
        void 0 === b && (b = W);
        this.O() ? this.ha(a, b, c, f) : this.H(function () {
            return h.ha(a, b, c, f);
        });
    };

    f.prototype._getNdInfo = function (a) {
        void 0 === a && (a = W);
        this.O() ? a(nb()) : this.H(function () {
            var b = nb();
            X().m(pc, b);
            a(b);
        });
    };

    var ta;
    z["initWatchman"]["__supportCaptcha__"] ? z["Watchman"] = f : kd();
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

function get_ac_token(l) {
    function w(a) {
        void 0 === a && (a = 0);
        return (new Date).getTime() + parseInt(a, 10)
    };

    function y(a, b, c) {
        try {
            var e = w(c);
            localStorage.setItem(a, b + k + e)
        } catch (d) {
        }
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
    var ee = M(new window.window['Watchman'](u));
    ee.getToken('07e2387ab53a4d6f930b8d9a9be71bdf', function (e) {
        console.log(console.log("acToken is:", e))
        window['acToken'] = e;
    }, 750)

}

console.log(get_ac_token({
    's': 'acstatic-dun.126.net',
    'v': '2.7.1_7c08033d',
    'luv': '2.7.1_a02527b8',
    'as': 'ac.dun.163yun.com',
    'ivp': 300000,
    'conf': '9ca170a1abeedba16ba1f2ac96ed26f3eafdcfe265aff1bad3ae70e2f4ee83e27fe2e6ee82e226a8aba2cfb43ef1f2ad90f025b6eee183a128e2bca4c3b92ae2f4ee8ee867e2e6fbd1af2aafbba7c3b939f4f0e4c3e26faffef6d3b328e2bdab8aa132f1f000cda161a7b3eedbb43cf0fea586ec2afaed00d1af2aa6bba3c3b93af4f4ee87e863e2e6fdd1b328e2adab8ea132f2f0e4c3f26fabfef6d4b33cf0feab8be270e2e6aa82ef79a7f4ee86e579e2e6aa82ef79a7f4ee86f679e2e6aa82ef79a7f4ee93e880e2e6ffcda169afb2eedbb128e2bda7c3b93bf4f0e4c3ee80a7b3eedbb83cf0fea195e863e2e6fdd1b328e2b3bc86f02afaeb00cda167b8bba7c3b939f4f0e4c3f366e2e6eebac73af4effad1b539f5ed00d7b633fbfee4c3e870a1fef695f17fa7f4ee83ef2afafeeecda163b6b0eedbb23cf4f000d1af2aa8acba91a132fceafcd1b33cf4f0e4c3f780adfef6d3b33cf4f4ee86e47fe2e6aa82ef79a7f4ee82e780e2e6fbd1af2aa7acadc3b96ea3b4bd86af2ab8bdbcc3b93cbf',
    'ass': ['ac.dun.163.com', 'ac.dun.163yun.com'],
    'ss': ['acstatic-dun.126.net', 'acstatic.dun.163yun.com'],
    'cvk': 'e83a009874ccd095e6a37c43ad1c5b4f'
}));