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
var sleep = require('sleep');
var dtaEventTarget = require('./simpleEventTarget').EventTarget;

var xml_http_request = require('xhr2');
var XMLHttpRequest = xml_http_request.XMLHttpRequest;
XMLHttpRequest.prototype.withCredentials = true;

var openDatabase = require('websql');
var navigator = require("./navigator").navigator;
var deprecated_color = require("./deprecated_system_color").color;
var trace_info = require("./trace").trace_info;
var mock_cookie = require("./cookie").mock;
var localStorage = require('./localStorage');
var sessionStorage = require('./sessionStorage');
var canvas = require('canvas');
const jsdom = require("jsdom");

const {JSDOM} = jsdom;
let index_code = fs.readFileSync("E:\\个人\\SpiderCollection\\易盾\\static\\index.html", {
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

consoleAble = false

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
        console.info(`[${WatchName}] getOwnPropertyDescriptor  propKey [${propKey.toString()}] result is [${getPrintShow(result)}]`)
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
  function g(d) {
    void 0 === d && (d = {});
    this.aa = ka(this.aa, 0, this);
    this.na = [];
    this.aa(d);
  }

  function q(d) {
    function c(d) {
      O(d) === "array" || (d = [d]);
      d.length < 2 && (d = d.concat(d));
      return d;
    }

    function e(d, b) {
      return d || d === 0 ? d : b;
    }

    function r(a, d) {
      return typeof a === "boolean" ? a : d;
    }

    var n = d.buildVersion,
        y = d.lastUsedVersion,
        m = d.staticServer,
        F = d.apiServer,
        ra = d.apiServers,
        g = d.staticServers,
        h = d["auto"];
    void 0 === h && (h = !0);
    var k = d.valid,
        t = d.sConfig,
        v = d.configHash,
        x = d["protocol"],
        u = d.pn,
        w = d["productNumber"],
        z = d["onload"],
        B = d["onerror"],
        C = d.merged;
    d = d.__serverConfig__;
    void 0 === d && (d = {});
    var A = {};
    if (v || t) try {
      var D = ka(Bc, 2, void 0)(v || t),
          A = JSON["parse"](D);
    } catch (G) {
      "";
    }
    var D = O(A.bl) === "string" ? A.bl.split(",") : [],
        E = O(A.dl) === "string" ? A.dl.split(",") : [],
        I = p(E),
        H = 1000 * 60 * 60,
        J = H * 24;
    return {
      auto: h,
      onload: z,
      onerror: B,
      staticServer: m,
      apiServer: F,
      staticServers: c(g || d.staticServer || m),
      apiServers: c(ra || d.apiServer || F),
      productNumber: w || u,
      protocol: x,
      domain: I,
      Hc: E,
      fc: D,
      buildVersion: n,
      lastUsedVersion: y,
      sConfig: t,
      configHash: v,
      valid: k,
      merged: C,
      kc: r(A.ejcd, !1),
      lc: r(A.ews, !1),
      pa: r(A.edc, !0),
      rc: e(A.ivp, J),
      jc: e(A.dtvp, H),
      Dc: e(A.tto, 2000),
      wa: e(A.ret, 1),
      moveMax: A.mem,
      moveInterval: A.mei,
      keydownMax: A.kem,
      keydownInterval: A.kei,
      clickMax: A.cem,
      clickInterval: A.cei,
      upMax: A.cem,
      upInterval: A.cei,
      downMax: A.cem,
      downInterval: A.cei,
      focusMax: A.fem,
      focusInterval: A.fei,
      blurMax: A.fem,
      blurInterval: A.fei,
      scrollMax: A.sem,
      scrollInterval: A.sei,
      orientationMax: A.otem,
      orientationInterval: A.otei,
      motionMax: A.mtem,
      motionInterval: A.mtei
    };
  }

  function p(d) {
    void 0 === d && (d = []);
    var c = Bb["hostname"];
    if (!c || !d.length) return "";

    try {
      for (var e = 0; e < d.length; e++) {
        var r = d[e];

        if (null === r || void 0 === r ? 0 : null !== /^[a-zA-Z0-9_.-]+$/.exec(r)) {
          var n = new Cb(d[e].replace(/\./g, "\\.") + "$");
          if (null !== c.match(n)) return d[e];
        }
      }
    } catch (y) {
      "";
    }

    return "";
  }

  function h() {
    if (Ua) return Ua;
    Ua = this;
    var d = Va(C["state"]["options"]),
        c = {
      moveMax: S ? 100 : 3,
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
    Object.keys(c).forEach(function (e) {
      d[e] = d[e] > 0 ? ~e.indexOf("Max") ? Math["min"](d[e], c[e]) : Math["max"](d[e], c[e]) : c[e];
    });
    C.h(la, d);
    this.P = new V(d);
    wa && (this.L = new k(d));
  }

  function k(a) {
    void 0 === a && (a = {});
    var c = this;
    this.F = ["chargingchange", "chargingtimechange", "dischargingtimechange", "levelchange"];
    this.Y = [a["batteryMax"], a["batteryInterval"]];
    this.ka = a;
    this.j = [];
    this.l = !1;
    this.D = null;
    this._battery = {};

    this.ea = function (a) {
      return c.N(a);
    };
  }

  function V(a) {
    var b = this;
    void 0 === a && (a = {});
    this.F = Object.keys(Ha);
    this.Z = {};
    this.ka = a;
    this.j = {};
    this.l = !1;

    this.qa = function () {
      for (var a = [], d = arguments.length; d--;) a[d] = arguments[d];

      b.oc.apply(b, a);
    };
  }

  function ca(a) {
    var c = a ? Db : Ia(Db, Cc),
        e = [];

    try {
      xa(Object.keys(c)).forEach(function (a) {
        var d = c[a].f();
        "";
        e.push.apply(e, ya(d, da[a]));
      });
    } catch (f) {}

    return e;
  }

  function Dc(d) {
    function c() {
      Eb >= Wa.length && (Fb = !0, Xa = xa(e).reduce(function (a, d) {
        a.push.apply(a, d);
        return a;
      }, []), d(Xa));
    }

    var e = [];
    if (Fb) return d(Xa);
    var r = C["state"]["options"],
        n = r.kc;
    void 0 === n && (n = !1);
    var y = r.Ic;
    void 0 === y && (y = !0);
    var m = r.lc;
    void 0 === m && (m = !1);
    Object.keys(Ya).forEach(function (a) {
      var d = Ya[a],
          c = d.T,
          e = Ya[a].Ga;
      d.mc = a;
      da[a].a !== d.a || O(d) !== "object" || c && (c === Gb && !y || c === Za && !n || c === Hb && !m) || (d.Ha = e ? d.f : function (a) {
        return a(d.f());
      }, Wa.push(d));
    });
    Wa.forEach(function (d) {
      function f() {
        function a(f, r) {
          "";

          e.push(ya(f, da[d.mc], !!r));
          Eb++;
          c();
        }

        try {
          d.Ha(a);
        } catch (r) {
          a([], Error("cannot got value"));
        }
      }

      d.u ? za(f, 0) : f();
    });
  }

  function Aa(d) {
    var c;
    d = d || "~";
    c = c || 0;
    var e = d.length % 16,
        f = d.length - e,
        n = [0, c];
    c = [0, c];

    for (var y = [0, 0], m = [0, 0], F = [2277735313, 289559509], ra = [1291169091, 658871167], l = 0; l < f; l += 16) y = [d.charCodeAt(l + 4) & 255 | (d.charCodeAt(l + 5) & 255) << 8 | (d.charCodeAt(l + 6) & 255) << 16 | (d.charCodeAt(l + 7) & 255) << 24, d.charCodeAt(l) & 255 | (d.charCodeAt(l + 1) & 255) << 8 | (d.charCodeAt(l + 2) & 255) << 16 | (d.charCodeAt(l + 3) & 255) << 24], m = [d.charCodeAt(l + 12) & 255 | (d.charCodeAt(l + 13) & 255) << 8 | (d.charCodeAt(l + 14) & 255) << 16 | (d.charCodeAt(l + 15) & 255) << 24, d.charCodeAt(l + 8) & 255 | (d.charCodeAt(l + 9) & 255) << 8 | (d.charCodeAt(l + 10) & 255) << 16 | (d.charCodeAt(l + 11) & 255) << 24], y = R(y, F), y = sa(y, 31), y = R(y, ra), n = G(n, y), n = sa(n, 27), n = ea(n, c), n = ea(R(n, [0, 5]), [0, 1390208809]), m = R(m, ra), m = sa(m, 33), m = R(m, F), c = G(c, m), c = sa(c, 31), c = ea(c, n), c = ea(R(c, [0, 5]), [0, 944331445]);

    y = [0, 0];
    m = [0, 0];

    switch (e) {
      case 15:
        m = G(m, P([0, d.charCodeAt(l + 14)], 48));

      case 14:
        m = G(m, P([0, d.charCodeAt(l + 13)], 40));

      case 13:
        m = G(m, P([0, d.charCodeAt(l + 12)], 32));

      case 12:
        m = G(m, P([0, d.charCodeAt(l + 11)], 24));

      case 11:
        m = G(m, P([0, d.charCodeAt(l + 10)], 16));

      case 10:
        m = G(m, P([0, d.charCodeAt(l + 9)], 8));

      case 9:
        m = G(m, [0, d.charCodeAt(l + 8)]), m = R(m, ra), m = sa(m, 33), m = R(m, F), c = G(c, m);

      case 8:
        y = G(y, P([0, d.charCodeAt(l + 7)], 56));

      case 7:
        y = G(y, P([0, d.charCodeAt(l + 6)], 48));

      case 6:
        y = G(y, P([0, d.charCodeAt(l + 5)], 40));

      case 5:
        y = G(y, P([0, d.charCodeAt(l + 4)], 32));

      case 4:
        y = G(y, P([0, d.charCodeAt(l + 3)], 24));

      case 3:
        y = G(y, P([0, d.charCodeAt(l + 2)], 16));

      case 2:
        y = G(y, P([0, d.charCodeAt(l + 1)], 8));

      case 1:
        y = G(y, [0, d.charCodeAt(l)]), y = R(y, F), y = sa(y, 31), y = R(y, ra), n = G(n, y);
    }

    n = G(n, [0, d.length]);
    c = G(c, [0, d.length]);
    n = ea(n, c);
    c = ea(c, n);
    n = Ib(n);
    c = Ib(c);
    n = ea(n, c);
    c = ea(c, n);
    return ("00000000" + (n[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (n[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (c[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (c[1] >>> 0).toString(16)).slice(-8);
  }

  function $a() {
    var d = C["state"]["options"],
        c = X().k(Ja),
        e = fa().k(ta),
        r = d.ma,
        n = d.C,
        l = d["productNumber"],
        d = d.ic,
        m = {
      Zb: "200",
      Ib: Ec(),
      Ab: ab(),
      Rb: Fc(K() + (C["state"].xa || 0)),
      La: Gc,
      Ma: r,
      Ja: n,
      Wb: c,
      Ya: d,
      $a: e,
      Hb: l,
      Ta: Hc,
      Ua: void 0,
      Va: Ic,
      Wa: Jc,
      Xa: Kc
    },
        F = [];
    xa(Object.keys(m)).forEach(function (d) {
      O(m[d]) !== "undefined" && (da[d].c >= 800 && da[d].c <= 804 && (m[d] = Lc(m[d])), "", F.push.apply(F, ya(m[d], da[d])));
    });
    return F;
  }

  function Jc() {
    return "04bd3946";
  }

  function ya(d, c, e) {
    var r = c.a,
        n = c.e,
        l = [];
    if (!e && (r === B && (l = ga(Y(d ? 1 : 2), n)), r === z && (l = ga(Y(d), n)), r === Z && (l = ga(Jb(d), n)), r === t && (l = Ba(ga(d, n))), r === H)) for (e = 0, r = d.length; e < r; e++) {
      var m = n[e],
          F = d[e];
      O(d[e]) === "number" && l.push.apply(l, ga(Y(F), m));
      O(d[e]) === "string" && l.push.apply(l, Ba(ga(F, m)));
    }
    d = ga(Y(c.c), 2);
    c = ga(Y(l.length), 2);
    return d.concat(c, l);
  }

  function Kb(d, c) {
    function e(a) {
      var d = {},
          c = null,
          e = null;
      h.concat(k).forEach(function (a) {
        window[a] && (d[a] = window[a]);
      });
      var r = Ka(n, q);
      Mc(r, {
        charset: "gbk"
      }, function (r, n) {
        if (r) return "", null;
        n && n.parentElement["removeChild"](n);
        c = h.map(function (a) {
          return window[a];
        }).join("/");
        e = k.map(function (a) {
          return window[a];
        }).join("/");
        "";
        "";
        a(c, e);

        for (var m in d) window[m] = d[m];
      });
    }

    void 0 === c && (c = 1);
    var r = C["state"]["options"],
        n = r["protocol"],
        y = r.apiServers,
        m = r["productNumber"];
    void 0 === m && (m = "");
    var F = r.ma;
    void 0 === F && (F = "");
    r = r.C;
    void 0 === r && (r = "");
    var g = X().k(Ja),
        q = "nstool.netease.com/info.js",
        h = ["ip", "ip_isp", "ip_province", "ip_city"],
        k = ["dns", "dns_isp", "dns_province", "dns_city", "res", "msg"];

    (function (d) {
      e(function (b, c) {
        d.ip = b;
        d.dns = c;
        var e = Ka(n, y[y.length - 1], "/v2/collect");
        Lb(e, {
          J: d
        });
      });
    })({
      tid: g,
      referrer: Bb.href || "",
      pn: m,
      bid: F,
      tid2: r,
      type: d.code,
      message: d.toString(),
      target: d.data.url || "",
      requestCount: c,
      osv: u["platform"] || "",
      sdkv: "2.7.3_eb045ea7"
    });
  }

  function Mc(a, c, e) {
    var r = document.head || document["getElementsByTagName"]("head")[0],
        n = document["createElement"]("script");
    typeof c === "function" && (e = c, c = {});
    c = c || {};

    e = e || function () {};

    n.type = c.type || "text/javascript";
    n.charset = c.charset || "utf8";
    n.async = "async" in c ? !!c.async : !0;
    n["src"] = a;
    c.ec && Nc(n, c.ec);
    c.text && (n.text = "" + c.text);
    ("onload" in n ? Mb : Oc)(n, e);
    n["onload"] || Mb(n, e);
    r["appendChild"](n);
  }

  function Pc(d, c) {
    function e(a, d) {
      n && ua(n);
      r && typeof r["abort"] === "function" && r["abort"]();
      a ? h(a) : g(d);
    }

    void 0 === c && (c = {});
    var r,
        n,
        y = c.ba,
        m = c.J;
    void 0 === m && (m = {});
    var F = c.ya;
    void 0 === F && (F = 60000);
    var g = c.V;
    void 0 === g && (g = W);
    var h = c.U;
    void 0 === h && (h = W);
    m["cb"] = "__wmjsonp_" + ab().slice(2, 9);
    F && (n = za(function () {
      e(Error("Request timed out"));
    }, F));
    y === "GET" && (d += (~d.indexOf("?") ? "&" : "?") + bb(m));
    cb ? (r = new cb(), "withCredentials" in r ? (r["open"](y, d, !0), r["setRequestHeader"]("Content-type", "application/x-www-form-urlencoded"), r["onerror"] = c["onerror"], r["onreadystatechange"] = function () {
      if (r["readyState"] === 4) if (n && ua(n), r["status"] >= 200 && r["status"] < 400) {
        var d,
            c = new Cb("^" + m["cb"] + "\\((.+)\\)$");

        try {
          d = JSON["parse"]((r["responseText"] || "").match(c)[1] || "");
        } catch (y) {}

        d ? e(null, d) : e(Error("Response is empty"));
      } else e(Error("The server has encountered an error"));
    }, r["send"](bb(m))) : (e(Error("Does not support CORS")), "")) : (e(Error("Does not support CORS")), "");
    return r && typeof r["abort"] === "function" && r["abort"];
  }

  function ma(a) {
    void 0 === a && (a = {});
    this.R = "__";
    this.w = {};
    this.p = a.p || "";
  }

  function Ca(a) {
    void 0 === a && (a = {});
    this.p = a.p || "";
    this.X = [Qc, Rc, Sc];
  }

  function va(a) {
    this["state"] = a["state"];
    this.Ob = [];
    var b = this,
        e = this.h,
        r = this.B;

    this.h = function (a, d, f) {
      return e.call(b, a, d, f);
    };

    this.B = function (a, d) {
      return r.call(b, a, d);
    };

    this.Bc(a.cc);
    this.Cc(a.wc);
  }

  function D(a) {
    try {
      return Nb[a];
    } catch (b) {}
  }

  function ab() {
    return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (d) {
      var c = Math["random"]() * 16 | 0;
      return (d === "x" ? c : c & 3 | 8).toString(16);
    });
  }

  function Fc(d) {
    void 0 === d && (d = 0);
    d = new Da(d)["getTime"]();
    return na(d / 1000, 10);
  }

  function O(d) {
    return null == d ? String(d) : Tc.call(d).slice(8, -1).toLowerCase();
  }

  function W() {}

  function Uc(a, b) {
    return a.filter(b)[0];
  }

  function Va(a, c) {
    void 0 === c && (c = []);
    if (null === a || typeof a !== "object") return a;
    var e = Uc(c, function (b) {
      return b.Ac === a;
    });
    if (e) return e.hc;
    var f = O(a) === "array" ? [] : {};
    c.push({
      Ac: a,
      hc: f
    });
    Object.keys(a).forEach(function (b) {
      f[b] = Va(a[b], c);
    });
    return f;
  }

  function db() {
    var a;

    try {
      a = new cb();
    } catch (b) {}

    return !!a && "withCredentials" in a;
  }

  function bb(a) {
    return Object.keys(a).map(function (c) {
      return aa(c) + "=" + aa(a[c]);
    }).join("&");
  }

  function Ob(a) {
    return a.replace(/(^\/)|(\/$)/g, "");
  }

  function Ka(a, c, e) {
    c = Ob(c.replace(/^https?:\/\//i, ""));
    return (e = e ? Ob(e) : "") ? a + "://" + c + "/" + e : a + "://" + c;
  }

  function Ia(a, b) {
    for (var e in b) !b.hasOwnProperty(e) || (a[e] = b[e]);

    return a;
  }

  function K() {
    return new Da()["getTime"]();
  }

  function xa(a) {
    for (var c = a.length, e, f; c;) f = Math["floor"](Math["random"]() * c--), e = a[c], a[c] = a[f], a[f] = e;

    return a;
  }

  function X() {
    var a = C["state"]["options"].merged ? C["state"]["options"]["productNumber"] : "";
    if (La[a]) return La[a];
    La[a] = new Ca({
      p: a
    });
    return La[a];
  }

  function fa() {
    var a = C["state"]["options"].merged ? C["state"]["options"]["productNumber"] : "";
    if (Ma[a]) return Ma[a];
    Ma[a] = new ma({
      p: a
    });
    return Ma[a];
  }

  function Lb(d, c) {
    function e() {
      if (k["parentNode"]) k["parentNode"]["removeChild"](k);
      w[r] = W;
      p && ua(p);
    }

    void 0 === c && (c = {});
    var r = "__wmjsonp_" + ab().slice(2, 9) + Vc++,
        n = "cb",
        y = aa,
        m = c.V;
    void 0 === m && (m = W);
    var F = c.J,
        g = c.U;
    void 0 === g && (g = W);
    var h = c.ya;
    void 0 === h && (h = 6000);
    var q = x["getElementsByTagName"]("script")[0] || x.head,
        k,
        p;
    h && (p = za(function () {
      e();
      g && g(Error("Request timed out"));
    }, h));

    w[r] = function (a) {
      e();
      m && m(a);
    };

    d += (~d.indexOf("?") ? "&" : "?") + n + "=" + y(r) + "&" + bb(F);
    d = d.replace("?&", "?");
    k = x["createElement"]("script");
    k["src"] = d;

    k["onerror"] = function (a) {
      e();
      g(a);
    };

    k["setAttribute"]("charset", "UTF-8");
    q["parentNode"]["insertBefore"](k, q);
    return function () {
      w[r] && e();
    };
  }

  function Pb() {}

  function Qb(d, b) {
    b = Ia({
      ba: "GET",
      J: {},
      ya: 5000,
      V: Pb,
      U: Pb
    }, b);
    (db() ? Pc : Lb)(d, b);
  }

  function Rb(d, c, e, f, n) {
    void 0 === e && (e = 0);
    void 0 === f && (f = Sb);
    void 0 === n && (n = eb);
    var l,
        m = [];

    switch (e) {
      case 1:
        e = d[c];
        l = 0;
        m.push(f[e >>> 2 & 63], f[(e << 4 & 48) + (l >>> 4 & 15)], n, n);
        break;

      case 2:
        e = d[c];
        l = d[c + 1];
        d = 0;
        m.push(f[e >>> 2 & 63], f[(e << 4 & 48) + (l >>> 4 & 15)], f[(l << 2 & 60) + (d >>> 6 & 3)], n);
        break;

      case 3:
        e = d[c];
        l = d[c + 1];
        d = d[c + 2];
        m.push(f[e >>> 2 & 63], f[(e << 4 & 48) + (l >>> 4 & 15)], f[(l << 2 & 60) + (d >>> 6 & 3)], f[d & 63]);
        break;

      default:
        throw Error("1010");
    }

    return m.join("");
  }

  function Tb(d, c, e) {
    void 0 === c && (c = []);
    void 0 === e && (e = eb);
    if (!d) return null;
    if (d.length === 0) return "";
    var f = 3;

    try {
      for (var n = [], l = 0; l < d.length;) if (l + f <= d.length) n.push(Rb(d, l, f, c, e)), l += f;else {
        n.push(Rb(d, l, d.length - l, c, e));
        break;
      }

      return n.join("");
    } catch (m) {
      throw Error("1010");
    }
  }

  function Ub(a) {
    void 0 === a && (a = []);
    return Tb(a, Wc, Xc);
  }

  function E(d) {
    if (d < -128) return E(128 - (-128 - d));
    if (d >= -128 && d <= 127) return d;
    if (d > 127) return E(-129 + d - 127);
    throw Error("1001");
  }

  function fb(a, b) {
    return E(E(a) ^ E(b));
  }

  function gb(d, b) {
    void 0 === d && (d = []);
    void 0 === b && (b = []);
    if (d.length !== b.length) return [];

    for (var e = [], f = 0, n = d.length; f < n; f++) e[f] = fb(d[f], b[f]);

    return e;
  }

  function Vb(d) {
    var c = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    return "" + c[d >>> 4 & 15] + c[d & 15];
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

    for (var c = [], e = 0, r = 0, n = d.length / 2; e < n; e++) {
      var l = na(d.charAt(r++), 16) << 4,
          m = na(d.charAt(r++), 16);
      c[e] = E(l + m);
    }

    return c;
  }

  function Ba(d) {
    if (null === d || void 0 === d) return d;
    d = aa(d);

    for (var c = [], e = 0, f = d.length; e < f; e++) if (d.charAt(e) === "%") {
      if (e + 2 < f) c.push(Jb(d.charAt(++e) + "" + d.charAt(++e))[0]);else throw Error("1009");
    } else c.push(E(d.charCodeAt(e)));

    return c;
  }

  function Y(d) {
    var b = [];
    b[0] = E(d >>> 24 & 255);
    b[1] = E(d >>> 16 & 255);
    b[2] = E(d >>> 8 & 255);
    b[3] = E(d & 255);
    return b;
  }

  function ha(d, c, e, f, n) {
    void 0 === d && (d = []);
    void 0 === e && (e = []);

    if (d.length) {
      if (d.length < n) throw Error("1003");

      for (var l = 0; l < n; l++) e[f + l] = d[c + l];
    }
  }

  function Wb() {
    return Array.apply(null, Array(10)).map(function () {
      return 0;
    });
  }

  function Jb(d) {
    if (null === d || d.length === 0) return [];
    d = typeof d === "string" ? d : String(d);

    for (var b = [], e = 0, r = 0, n = d.length / 2; r < n; r++) {
      var l = na(d.charAt(e++), 16) << 4,
          m = na(d.charAt(e++), 16);
      b[r] = E(l + m);
    }

    return b;
  }

  function jb(d) {
    void 0 === d && (d = []);
    var c = [];
    if (!d.length) return Wb();

    if (d.length >= kb) {
      var c = 0,
          e = kb;
      void 0 === d && (d = []);
      var f = [];

      if (d.length) {
        if (d.length < e) throw Error("1003");

        for (var n = 0; n < e; n++) f[n] = d[c + n];
      }

      return f;
    }

    for (e = 0; e < kb; e++) c[e] = d[e % d.length];

    return c;
  }

  function Xb(d) {
    void 0 === d && (d = []);
    if (!d.length) return [];

    for (var b = [], e = 0, f = d.length; e < f; e++) {
      var n = d[e];
      b[e] = Yc[(n >>> 4 & 15) * 16 + (n & 15)];
    }

    return b;
  }

  function Yb(d, b) {
    void 0 === d && (d = []);
    if (!d.length) return [];
    b = E(b);

    for (var e = [], f = 0, n = d.length; f < n; f++) e.push(fb(d[f], b));

    return e;
  }

  function Zb(d, b) {
    void 0 === d && (d = []);
    if (!d.length) return [];
    b = E(b);

    for (var e = [], f = 0, n = d.length; f < n; f++) e.push(fb(d[f], b--));

    return e;
  }

  function Zc(d, b) {
    void 0 === d && (d = []);
    if (!d.length) return [];
    b = E(b);

    for (var e = [], f = 0, n = d.length; f < n; f++) e.push(E(d[f] + b));

    return e;
  }

  function $c(d) {
    return [[Yb, -100], [Yb, -120], [Zc, 1], [Zb, -121], [Zb, -9]].reduce(function (a, d) {
      return d[0](a, d[1]);
    }, d);
  }

  function lb(d) {
    void 0 === d && (d = []);
    var c = "7576c10a9f634a208f68f7f774f13450",
        e;
    e = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918000, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117];

    for (var f = 4294967295, n = 0, l = d.length; n < l; n++) f = f >>> 8 ^ e[(f ^ d[n]) & 255];

    e = hb(Y(f ^ 4294967295));
    f = Ba(e);
    e = [];
    ha(d, 0, e, 0, d.length);
    ha(f, 0, e, e.length, f.length);
    d = Ba(c);
    void 0 === e && (e = []);
    f = [];

    for (c = 0; c < mb; c++) n = Math["random"]() * 256, n = Math["floor"](n), f[c] = E(n);

    d = jb(d);
    d = gb(d, jb(f));
    c = d = jb(d);
    var m = e;
    void 0 === m && (m = []);

    if (m.length) {
      e = [];
      n = m.length;
      l = 0;
      l = n % T <= T - Na ? T - n % T - Na : T * 2 - n % T - Na;
      ha(m, 0, e, 0, n);

      for (m = 0; m < l; m++) e[n + m] = 0;

      ha(Y(n), 0, e, n + l, Na);
    } else e = Wb();

    n = e;
    void 0 === n && (n = []);
    if (n.length % T !== 0) throw Error("1005");
    e = [];

    for (var l = 0, m = n.length / T, g = 0; g < m; g++) {
      e[g] = [];

      for (var h = 0; h < T; h++) e[g][h] = n[l++];
    }

    n = [];
    ha(f, 0, n, 0, mb);
    f = 0;

    for (l = e.length; f < l; f++) {
      m = $c(e[f]);
      m = gb(m, d);
      g = c;
      void 0 === m && (m = []);
      void 0 === g && (g = []);

      for (var h = [], q = g.length, k = 0, p = m.length; k < p; k++) h[k] = E(m[k] + g[k % q]);

      m = gb(h, c);
      c = Xb(m);
      c = Xb(c);
      ha(c, 0, n, f * T + mb, T);
    }

    return Tb(n, Sb, eb);
  }

  function Bc(d) {
    if (!d) return "";
    var c = [31, 125, -12, 60, 32, 48],
        e = 0;
    d = ib(d);

    for (var f = [], n = 0; n < d.length; n++) f[n] = E(0 - d[n]), f[n] = E(f[n] ^ c[e++ % c.length]);

    c = f;
    void 0 === c && (c = []);
    e = [];

    for (d = 0; d < c.length; d++) e.push("%"), e.push(Vb(c[d]));

    return $b(e.join(""));
  }

  function Oa(d) {
    if (!d) return "";
    var c = 0,
        e = [31, 125, -12, 60, 32, 48];
    d = Ba(d);

    for (var f = [], n = 0; n < d.length; n++) f[n] = E(d[n] ^ e[c++ % e.length]), f[n] = E(0 - f[n]);

    return hb(f);
  }

  function ia(d, b) {
    var e = (d & 65535) + (b & 65535);
    return (d >> 16) + (b >> 16) + (e >> 16) << 16 | e & 65535;
  }

  function J(d, b, e, f, n, l) {
    d = ia(ia(b, d), ia(f, l));
    return ia(d << n | d >>> 32 - n, e);
  }

  function L(a, b, e, f, n, l, m) {
    return J(b & e | ~b & f, a, b, n, l, m);
  }

  function M(a, b, e, f, n, l, m) {
    return J(b & f | e & ~f, a, b, n, l, m);
  }

  function N(a, b, e, f, n, l, m) {
    return J(e ^ (b | ~f), a, b, n, l, m);
  }

  function ac(d) {
    var c,
        e = [];
    e[(d.length >> 2) - 1] = void 0;

    for (c = 0; c < e.length; c += 1) e[c] = 0;

    var f = d.length * 8;

    for (c = 0; c < f; c += 8) e[c >> 5] |= (d.charCodeAt(c / 8) & 255) << c % 32;

    d = d.length * 8;
    e[d >> 5] |= 128 << d % 32;
    e[(d + 64 >>> 9 << 4) + 14] = d;
    var n,
        l,
        m = 1732584193,
        g = -271733879,
        h = -1732584194,
        k = 271733878;

    for (d = 0; d < e.length; d += 16) c = m, f = g, n = h, l = k, m = L(m, g, h, k, e[d], 7, -680876936), k = L(k, m, g, h, e[d + 1], 12, -389564586), h = L(h, k, m, g, e[d + 2], 17, 606105819), g = L(g, h, k, m, e[d + 3], 22, -1044525330), m = L(m, g, h, k, e[d + 4], 7, -176418897), k = L(k, m, g, h, e[d + 5], 12, 1200080426), h = L(h, k, m, g, e[d + 6], 17, -1473231341), g = L(g, h, k, m, e[d + 7], 22, -45705983), m = L(m, g, h, k, e[d + 8], 7, 1770035416), k = L(k, m, g, h, e[d + 9], 12, -1958414417), h = L(h, k, m, g, e[d + 10], 17, -42063), g = L(g, h, k, m, e[d + 11], 22, -1990404162), m = L(m, g, h, k, e[d + 12], 7, 1804603682), k = L(k, m, g, h, e[d + 13], 12, -40341101), h = L(h, k, m, g, e[d + 14], 17, -1502002290), g = L(g, h, k, m, e[d + 15], 22, 1236535329), m = M(m, g, h, k, e[d + 1], 5, -165796510), k = M(k, m, g, h, e[d + 6], 9, -1069501632), h = M(h, k, m, g, e[d + 11], 14, 643717713), g = M(g, h, k, m, e[d], 20, -373897302), m = M(m, g, h, k, e[d + 5], 5, -701558691), k = M(k, m, g, h, e[d + 10], 9, 38016083), h = M(h, k, m, g, e[d + 15], 14, -660478335), g = M(g, h, k, m, e[d + 4], 20, -405537848), m = M(m, g, h, k, e[d + 9], 5, 568446438), k = M(k, m, g, h, e[d + 14], 9, -1019803690), h = M(h, k, m, g, e[d + 3], 14, -187363961), g = M(g, h, k, m, e[d + 8], 20, 1163531501), m = M(m, g, h, k, e[d + 13], 5, -1444681467), k = M(k, m, g, h, e[d + 2], 9, -51403784), h = M(h, k, m, g, e[d + 7], 14, 1735328473), g = M(g, h, k, m, e[d + 12], 20, -1926607734), m = J(g ^ h ^ k, m, g, e[d + 5], 4, -378558), k = J(m ^ g ^ h, k, m, e[d + 8], 11, -2022574463), h = J(k ^ m ^ g, h, k, e[d + 11], 16, 1839030562), g = J(h ^ k ^ m, g, h, e[d + 14], 23, -35309556), m = J(g ^ h ^ k, m, g, e[d + 1], 4, -1530992060), k = J(m ^ g ^ h, k, m, e[d + 4], 11, 1272893353), h = J(k ^ m ^ g, h, k, e[d + 7], 16, -155497632), g = J(h ^ k ^ m, g, h, e[d + 10], 23, -1094730640), m = J(g ^ h ^ k, m, g, e[d + 13], 4, 681279174), k = J(m ^ g ^ h, k, m, e[d], 11, -358537222), h = J(k ^ m ^ g, h, k, e[d + 3], 16, -722521979), g = J(h ^ k ^ m, g, h, e[d + 6], 23, 76029189), m = J(g ^ h ^ k, m, g, e[d + 9], 4, -640364487), k = J(m ^ g ^ h, k, m, e[d + 12], 11, -421815835), h = J(k ^ m ^ g, h, k, e[d + 15], 16, 530742520), g = J(h ^ k ^ m, g, h, e[d + 2], 23, -995338651), m = N(m, g, h, k, e[d], 6, -198630844), k = N(k, m, g, h, e[d + 7], 10, 1126891415), h = N(h, k, m, g, e[d + 14], 15, -1416354905), g = N(g, h, k, m, e[d + 5], 21, -57434055), m = N(m, g, h, k, e[d + 12], 6, 1700485571), k = N(k, m, g, h, e[d + 3], 10, -1894986606), h = N(h, k, m, g, e[d + 10], 15, -1051523), g = N(g, h, k, m, e[d + 1], 21, -2054922799), m = N(m, g, h, k, e[d + 8], 6, 1873313359), k = N(k, m, g, h, e[d + 15], 10, -30611744), h = N(h, k, m, g, e[d + 6], 15, -1560198380), g = N(g, h, k, m, e[d + 13], 21, 1309151649), m = N(m, g, h, k, e[d + 4], 6, -145523070), k = N(k, m, g, h, e[d + 11], 10, -1120210379), h = N(h, k, m, g, e[d + 2], 15, 718787259), g = N(g, h, k, m, e[d + 9], 21, -343485551), m = ia(m, c), g = ia(g, f), h = ia(h, n), k = ia(k, l);

    e = [m, g, h, k];
    c = "";
    f = e.length * 32;

    for (d = 0; d < f; d += 8) c += String.fromCharCode(e[d >> 5] >>> d % 32 & 255);

    return c;
  }

  function bc(d) {
    var c = "0123456789abcdef",
        e = "",
        f,
        n;

    for (n = 0; n < d.length; n += 1) f = d.charCodeAt(n), e += c.charAt(f >>> 4 & 15) + c.charAt(f & 15);

    return e;
  }

  function cc() {
    var d = new Date()["getTime"](),
        c = Math["floor"](d / 4294967296),
        e = d % 4294967296,
        d = Y(c),
        e = Y(e),
        c = [];
    ha(d, 0, c, 0, 4);
    ha(e, 0, c, 4, 4);
    e = [];

    for (d = 0; d < 8; d++) e[d] = E(Math["floor"](Math["random"]() * 256));

    for (var d = [], g = 0; g < c.length * 2; g++) {
      if (g % 2 == 0) {
        var n = g / 2;
        d[g] = d[g] | (e[n] & 16) >>> 4 | (e[n] & 32) >>> 3 | (e[n] & 64) >>> 2 | (e[n] & 128) >>> 1 | (c[n] & 16) >>> 3 | (c[n] & 32) >>> 2 | (c[n] & 64) >>> 1 | (c[n] & 128) >>> 0;
      } else n = Math["floor"](g / 2), d[g] = d[g] | (e[n] & 1) << 0 | (e[n] & 2) << 1 | (e[n] & 4) << 2 | (e[n] & 8) << 3 | (c[n] & 1) << 1 | (c[n] & 2) << 2 | (c[n] & 4) << 3 | (c[n] & 8) << 4;

      d[g] = E(d[g]);
    }

    c = hb(d);
    c = bc(ac(dc(aa(c + "dAWsBhCqtOaNLLJ25hBzWbqWXwiK99Wd"))));
    c = ib(c.substring(0, 16));
    return Ub(c.concat(d));
  }

  function ec(a) {
    var c = a.C,
        e = a.la,
        g = fa().k(ta),
        n = C["state"]["options"].wa;
    a = {
      r: n,
      d: g || "",
      b: c
    };
    e && (c = ib(bc(ac(dc(aa(n + g + c + "WoeTpXnDDPhiAvsJUUIY3RdAo2PKaVwi"))))), a.t = Ub(c));

    try {
      return Oa(JSON["stringify"](a));
    } catch (l) {
      return Oa("ERROR");
    }
  }

  function nb() {
    var a = fa().k(ta),
        c = X().k(ob),
        a = {
      r: C["state"]["options"].wa,
      d: a || "",
      i: c
    };

    try {
      return Oa(JSON["stringify"](a));
    } catch (e) {
      return Oa("ERROR");
    }
  }

  function Nc(a, c) {
    for (var e in c) a["setAttribute"](e, c[e]);
  }

  function Mb(a, c) {
    a["onload"] = function () {
      this["onerror"] = this["onload"] = null;
      c(null, a);
    };

    a["onerror"] = function () {
      this["onerror"] = this["onload"] = null;
      c(Error("Failed to load " + this["src"]), a);
    };
  }

  function Oc(a, c) {
    a["onreadystatechange"] = function () {
      if (this["readyState"] == "complete" || this["readyState"] == "loaded") this["onreadystatechange"] = null, c(null, a);
    };
  }

  function ga(b, c) {
    return O(b) === "string" ? b.length > c ? b.slice(0, c) : b : O(b) === "array" ? b.length > c ? b.slice(-c) : b : b;
  }

  function Ec() {
    var b = 255;
    return fc < b ? ++fc : b;
  }

  function Lc(a) {
    switch (O(a)) {
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

  function ea(b, c) {
    b = [b[0] >>> 16, b[0] & 65535, b[1] >>> 16, b[1] & 65535];
    c = [c[0] >>> 16, c[0] & 65535, c[1] >>> 16, c[1] & 65535];
    var e = [0, 0, 0, 0];
    e[3] += b[3] + c[3];
    e[2] += e[3] >>> 16;
    e[3] &= 65535;
    e[2] += b[2] + c[2];
    e[1] += e[2] >>> 16;
    e[2] &= 65535;
    e[1] += b[1] + c[1];
    e[0] += e[1] >>> 16;
    e[1] &= 65535;
    e[0] += b[0] + c[0];
    e[0] &= 65535;
    return [e[0] << 16 | e[1], e[2] << 16 | e[3]];
  }

  function R(b, c) {
    b = [b[0] >>> 16, b[0] & 65535, b[1] >>> 16, b[1] & 65535];
    c = [c[0] >>> 16, c[0] & 65535, c[1] >>> 16, c[1] & 65535];
    var e = [0, 0, 0, 0];
    e[3] += b[3] * c[3];
    e[2] += e[3] >>> 16;
    e[3] &= 65535;
    e[2] += b[2] * c[3];
    e[1] += e[2] >>> 16;
    e[2] &= 65535;
    e[2] += b[3] * c[2];
    e[1] += e[2] >>> 16;
    e[2] &= 65535;
    e[1] += b[1] * c[3];
    e[0] += e[1] >>> 16;
    e[1] &= 65535;
    e[1] += b[2] * c[2];
    e[0] += e[1] >>> 16;
    e[1] &= 65535;
    e[1] += b[3] * c[1];
    e[0] += e[1] >>> 16;
    e[1] &= 65535;
    e[0] += b[0] * c[3] + b[1] * c[2] + b[2] * c[1] + b[3] * c[0];
    e[0] &= 65535;
    return [e[0] << 16 | e[1], e[2] << 16 | e[3]];
  }

  function sa(b, c) {
    c %= 64;
    if (c === 32) return [b[1], b[0]];
    if (c < 32) return [b[0] << c | b[1] >>> 32 - c, b[1] << c | b[0] >>> 32 - c];
    c -= 32;
    return [b[1] << c | b[0] >>> 32 - c, b[0] << c | b[1] >>> 32 - c];
  }

  function P(b, c) {
    c %= 64;
    return c === 0 ? b : c < 32 ? [b[0] << c | b[1] >>> 32 - c, b[1] << c] : [b[1] << c - 32, 0];
  }

  function G(a, b) {
    return [a[0] ^ b[0], a[1] ^ b[1]];
  }

  function Ib(b) {
    b = G(b, [0, b[0] >>> 1]);
    b = R(b, [4283543511, 3981806797]);
    b = G(b, [0, b[0] >>> 1]);
    b = R(b, [3301882366, 444984403]);
    return b = G(b, [0, b[0] >>> 1]);
  }

  function gc() {
    function d(b) {
      for (var d = !1, c = 0; c < e.length && !(d = b[c]["offsetWidth"] !== q[e[c]] || b[c]["offsetHeight"] !== p[e[c]]); c++);

      return d;
    }

    function c() {
      var a = x["createElement"]("span");
      a["style"]["position"] = "absolute";
      a["style"]["left"] = "-9999px";
      a["style"]["fontSize"] = n;
      a["style"]["lineHeight"] = "normal";
      a["innerHTML"] = g;
      return a;
    }

    if (pb) return pb;

    var e = ["monospace", "sans-serif", "serif"],
        g = "mmmmmmmmmmlli",
        n = "72px",
        h = x["getElementsByTagName"]("body")[0],
        m = x["createElement"]("div"),
        k = x["createElement"]("div"),
        q = {},
        p = {},
        t = function () {
      for (var d = [], n = 0, g = e.length; n < g; n++) {
        var h = c();
        h["style"]["fontFamily"] = e[n];
        m["appendChild"](h);
        d.push(h);
      }

      return d;
    }();

    h["appendChild"](m);

    for (var u = 0, w = e.length; u < w; u++) q[e[u]] = t[u]["offsetWidth"], p[e[u]] = t[u]["offsetHeight"];

    t = function () {
      for (var d = {}, n = 0, g = fontList.length; n < g; n++) {
        for (var h = [], m = 0, r = e.length; m < r; m++) {
          var q;
          q = fontList[n];
          var p = e[m],
              y = c();
          y["style"]["fontFamily"] = "'" + q + "'," + p;
          q = y;
          k["appendChild"](q);
          h.push(q);
        }

        d[fontList[n]] = h;
      }

      return d;
    }();

    h["appendChild"](k);

    for (var u = [], w = 0, z = fontList.length; w < z; w++) d(t[fontList[w]]) && u.push(fontList[w]);

    h["removeChild"](k);
    h["removeChild"](m);
    return pb = u;
  }

  function ad() {
    var a = x["createElement"]("canvas"),
        c = null;

    try {
      c = a["getContext"]("webgl") || a["getContext"]("experimental-webgl");
    } catch (e) {}

    c || (c = null);
    return c;
  }

  function bd() {
    function d(d) {
      c["clearColor"](0, 0, 0, 1);
      c.enable(c["DEPTH_TEST"]);
      c["depthFunc"](c["LEQUAL"]);
      c.clear(c["COLOR_BUFFER_BIT"] | c["DEPTH_BUFFER_BIT"]);
      return "[" + d[0] + ", " + d[1] + "]";
    }

    if (Ea) return Ea;
    var c;
    c = ad();
    if (!c) return Ea = [];
    var e = [];

    try {
      var g = "attribute vec2 attrVertexvarying vec2 varyinTexCoordinateuniform vec2 uniformOffsetvoid main(){varyinTexCoordinate=attrVertex+uniformOffsetgl_Position=vec4(attrVertex,0,1)}",
          n = "precision mediump floatvarying vec2 varyinTexCoordinatevoid main() {gl_FragColor=vec4(varyinTexCoordinate,0,1)}",
          h = c["createBuffer"]();
      c["bindBuffer"](c["ARRAY_BUFFER"], h);
      var m = new Float32Array([-0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.732134444, 0]);
      c.bufferData(c["ARRAY_BUFFER"], m, c["STATIC_DRAW"]);
      h.tc = 3;
      h.xc = 3;
      var k = c["createProgram"](),
          q = c["createShader"](c["VERTEX_SHADER"]);
      c["shaderSource"](q, g);
      c["compileShader"](q);
      var p = c["createShader"](c["FRAGMENT_SHADER"]);
      c["shaderSource"](p, n);
      c["compileShader"](p);
      c["attachShader"](k, q);
      c["attachShader"](k, p);
      c["linkProgram"](k);
      c["useProgram"](k);
      k.Ec = c["getAttribLocation"](k, "attrVertex");
      k.yc = c["getUniformLocation"](k, "uniformOffset");
      c["enableVertexAttribArray"](k.Mc);
      c["vertexAttribPointer"](k.Ec, h.tc, c.FLOAT, !1, 0, 0);
      c["uniform2f"](k.yc, 1, 1);
      c["drawArrays"](c["TRIANGLE_STRIP"], 0, h.xc);
    } catch (t) {}

    null != c["canvas"] && e.push(c["canvas"]["toDataURL"]());
    e.push("extensions:" + c["getSupportedExtensions"]().join(""));
    e.push("webgl aliased line width range:" + d(c["getParameter"](c["ALIASED_LINE_WIDTH_RANGE"])));
    e.push("webgl aliased point size range:" + d(c["getParameter"](c["ALIASED_POINT_SIZE_RANGE"])));
    e.push("webgl alpha bits:" + c["getParameter"](c["ALPHA_BITS"]));
    e.push("webgl antialiasing:" + (c["getContextAttributes"]().antialias ? "yes" : "no"));
    e.push("webgl blue bits:" + c["getParameter"](c["BLUE_BITS"]));
    e.push("webgl depth bits:" + c["getParameter"](c["DEPTH_BITS"]));
    e.push("webgl green bits:" + c["getParameter"](c["GREEN_BITS"]));
    e.push("webgl max anisotropy:" + function (d) {
      var c,
          e = d["getExtension"]("EXT_texture_filter_anisotropic") || d["getExtension"]("WEBKIT_EXT_texture_filter_anisotropic") || d["getExtension"]("MOZ_EXT_texture_filter_anisotropic");
      return e ? (c = d["getParameter"](e["MAX_TEXTURE_MAX_ANISOTROPY_EXT"]), 0 === c && (c = 2), c) : null;
    }(c));
    e.push("webgl max combined texture image units:" + c["getParameter"](c["MAX_COMBINED_TEXTURE_IMAGE_UNITS"]));
    e.push("webgl max cube map texture size:" + c["getParameter"](c["MAX_CUBE_MAP_TEXTURE_SIZE"]));
    e.push("webgl max fragment uniform vectors:" + c["getParameter"](c["MAX_FRAGMENT_UNIFORM_VECTORS"]));
    e.push("webgl max render buffer size:" + c["getParameter"](c["MAX_RENDERBUFFER_SIZE"]));
    e.push("webgl max texture image units:" + c["getParameter"](c["MAX_TEXTURE_IMAGE_UNITS"]));
    e.push("webgl max texture size:" + c["getParameter"](c["MAX_TEXTURE_SIZE"]));
    e.push("webgl max varying vectors:" + c["getParameter"](c["MAX_VARYING_VECTORS"]));
    e.push("webgl max vertex attribs:" + c["getParameter"](c["MAX_VERTEX_ATTRIBS"]));
    e.push("webgl max vertex texture image units:" + c["getParameter"](c["MAX_VERTEX_TEXTURE_IMAGE_UNITS"]));
    e.push("webgl max vertex uniform vectors:" + c["getParameter"](c["MAX_VERTEX_UNIFORM_VECTORS"]));
    e.push("webgl max viewport dims:" + d(c["getParameter"](c["MAX_VIEWPORT_DIMS"])));
    e.push("webgl red bits:" + c["getParameter"](c["RED_BITS"]));
    e.push("webgl renderer:" + c["getParameter"](c["RENDERER"]));
    e.push("webgl shading language version:" + c["getParameter"](c["SHADING_LANGUAGE_VERSION"]));
    e.push("webgl stencil bits:" + c["getParameter"](c["STENCIL_BITS"]));
    e.push("webgl vendor:" + c["getParameter"](c["VENDOR"]));
    e.push("webgl version:" + c["getParameter"](c["VERSION"]));

    try {
      var u = c["getExtension"]("WEBGL_debug_renderer_info");
      u && (e.push("webgl unmasked vendor:" + c["getParameter"](u.UNMASKED_VENDOR_WEBGL)), e.push("webgl unmasked renderer:" + c["getParameter"](u.UNMASKED_RENDERER_WEBGL)));
    } catch (w) {}

    if (!c["getShaderPrecisionFormat"]) return Ea = e;
    e.push("webgl vertex shader high float precision:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["HIGH_FLOAT"])["precision"]);
    e.push("webgl vertex shader high float precision rangeMin:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["HIGH_FLOAT"])["rangeMin"]);
    e.push("webgl vertex shader high float precision rangeMax:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["HIGH_FLOAT"])["rangeMax"]);
    e.push("webgl vertex shader medium float precision:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["MEDIUM_FLOAT"])["precision"]);
    e.push("webgl vertex shader medium float precision rangeMin:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["MEDIUM_FLOAT"])["rangeMin"]);
    e.push("webgl vertex shader medium float precision rangeMax:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["MEDIUM_FLOAT"])["rangeMax"]);
    e.push("webgl vertex shader low float precision:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["LOW_FLOAT"])["precision"]);
    e.push("webgl vertex shader low float precision rangeMin:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["LOW_FLOAT"])["rangeMin"]);
    e.push("webgl vertex shader low float precision rangeMax:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["LOW_FLOAT"])["rangeMax"]);
    e.push("webgl fragment shader high float precision:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["HIGH_FLOAT"])["precision"]);
    e.push("webgl fragment shader high float precision rangeMin:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["HIGH_FLOAT"])["rangeMin"]);
    e.push("webgl fragment shader high float precision rangeMax:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["HIGH_FLOAT"])["rangeMax"]);
    e.push("webgl fragment shader medium float precision:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["MEDIUM_FLOAT"])["precision"]);
    e.push("webgl fragment shader medium float precision rangeMin:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["MEDIUM_FLOAT"])["rangeMin"]);
    e.push("webgl fragment shader medium float precision rangeMax:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["MEDIUM_FLOAT"])["rangeMax"]);
    e.push("webgl fragment shader low float precision:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["LOW_FLOAT"])["precision"]);
    e.push("webgl fragment shader low float precision rangeMin:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["LOW_FLOAT"])["rangeMin"]);
    e.push("webgl fragment shader low float precision rangeMax:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["LOW_FLOAT"])["rangeMax"]);
    e.push("webgl vertex shader high int precision:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["HIGH_INT"])["precision"]);
    e.push("webgl vertex shader high int precision rangeMin:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["HIGH_INT"])["rangeMin"]);
    e.push("webgl vertex shader high int precision rangeMax:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["HIGH_INT"])["rangeMax"]);
    e.push("webgl vertex shader medium int precision:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["MEDIUM_INT"])["precision"]);
    e.push("webgl vertex shader medium int precision rangeMin:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["MEDIUM_INT"])["rangeMin"]);
    e.push("webgl vertex shader medium int precision rangeMax:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["MEDIUM_INT"])["rangeMax"]);
    e.push("webgl vertex shader low int precision:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["LOW_INT"])["precision"]);
    e.push("webgl vertex shader low int precision rangeMin:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["LOW_INT"])["rangeMin"]);
    e.push("webgl vertex shader low int precision rangeMax:" + c["getShaderPrecisionFormat"](c["VERTEX_SHADER"], c["LOW_INT"])["rangeMax"]);
    e.push("webgl fragment shader high int precision:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["HIGH_INT"])["precision"]);
    e.push("webgl fragment shader high int precision rangeMin:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["HIGH_INT"])["rangeMin"]);
    e.push("webgl fragment shader high int precision rangeMax:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["HIGH_INT"])["rangeMax"]);
    e.push("webgl fragment shader medium int precision:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["MEDIUM_INT"])["precision"]);
    e.push("webgl fragment shader medium int precision rangeMin:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["MEDIUM_INT"])["rangeMin"]);
    e.push("webgl fragment shader medium int precision rangeMax:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["MEDIUM_INT"])["rangeMax"]);
    e.push("webgl fragment shader low int precision:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["LOW_INT"])["precision"]);
    e.push("webgl fragment shader low int precision rangeMin:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["LOW_INT"])["rangeMin"]);
    e.push("webgl fragment shader low int precision rangeMax:" + c["getShaderPrecisionFormat"](c["FRAGMENT_SHADER"], c["LOW_INT"])["rangeMax"]);
    return Ea = e;
  }

  function cd(d) {
    function c(a) {
      e(a);

      e = function () {};
    }

    function e(a) {
      return d(a);
    }

    if (hc) return d(hc);

    try {
      var g = new ic(1, 44100, 44100),
          n = g["createOscillator"]();
      n["type"] = "triangle";
      n["frequency"]["value"] = 10000;
      var h = g["createDynamicsCompressor"]();
      h["threshold"] && (h["threshold"]["value"] = -50);
      h["knee"] && (h["knee"]["value"] = 40);
      h["ratio"] && (h["ratio"]["value"] = 12);
      h["reduction"] && (h["reduction"]["value"] = -20);
      h["attack"] && (h["attack"]["value"] = 0);
      h["release"] && (h["release"]["value"] = 0.25);
      n["connect"](h);
      h["connect"](g["destination"]);
      n["start"](0);
      za(function () {
        c("");

        g["oncomplete"] = function () {};

        g = null;
      }, 1000);

      g["oncomplete"] = function (d) {
        try {
          var e = Aa(d["renderedBuffer"]["getChannelData"](0).slice(4500, 5000).reduce(function (a, b) {
            return a + Math.abs(b);
          }, 0).toString());
          c(e);
          n["disconnect"]();
          h["disconnect"]();
        } catch (g) {
          c("");
        }
      };

      g["startRendering"]();
    } catch (m) {
      c("");
    }
  }

  function jc() {
    var d = u["userAgent"].toLowerCase();
    return d.indexOf("windows phone") >= 0 ? "Windows Phone" : d.indexOf("win") >= 0 && d.indexOf("windvane") < 0 ? "Windows" : d.indexOf("android") >= 0 ? "Android" : d.indexOf("linux") >= 0 ? "Linux" : d.indexOf("iphone") >= 0 || d.indexOf("ipad") >= 0 ? "iOS" : d.indexOf("mac") >= 0 ? "Mac" : "Other";
  }

  function kc() {
    var d = [],
        d = [].slice.call(u["plugins"], 0);
    return d.map(function (d) {
      var e = [].slice.call(d, 0).map(function (a) {
        return [a.type, a["suffixes"]].join("~");
      }).join(",");
      return [d.name, d["description"], e].join("::");
    });
  }

  function dd() {
    var a = [];
    if (Object["getOwnPropertyDescriptor"] && Object["getOwnPropertyDescriptor"](w, "ActiveXObject") || "ActiveXObject" in w) a = ["AcroPDF.PDF", "Adodb.Stream", "AgControl.AgControl", "DevalVRXCtrl.DevalVRXCtrl.1", "MacromediaFlashPaper.MacromediaFlashPaper", "Msxml2.DOMDocument", "Msxml2.XMLHTTP", "PDF.PdfCtrl", "QuickTime.QuickTime", "QuickTimeCheckObject.QuickTimeCheck.1", "RealPlayer", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "Scripting.Dictionary", "SWCtl.SWCtl", "Shell.UIHelper", "ShockwaveFlash.ShockwaveFlash", "Skype.Detection", "TDCCtl.TDCCtl", "WMPlayer.OCX", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1"].map(function (a) {
      try {
        return new ed(a), a;
      } catch (b) {
        return null;
      }
    });
    u["plugins"] && (a = a.concat(kc()));
    return a;
  }

  function lc() {
    var a = x["createElement"]("canvas");
    return !(!a["getContext"] || !a["getContext"]("2d"));
  }

  function fd() {
    return u["appName"] === "Microsoft Internet Explorer" || u["appName"] === "Netscape" && /Trident/.test(u["userAgent"]) ? !0 : !1;
  }

  function ka(a, b, e) {
    return function () {
      var f, n, g;
      e = e || this;
      n = K();
      f = a.apply(e, arguments);
      g = K();
      C.h(qb, {
        cursor: b,
        value: g - n
      });
      return f;
    };
  }

  function gd(a, b) {
    var e = void 0;
    return function (f) {
      var n, g;
      e = e || this;
      n = K();
      a.apply(e, [function (a) {
        g = K();
        C.h(qb, {
          cursor: b,
          value: g - n
        });
        f(a);
      }]);
    };
  }

  function rb(d, c) {
    for (var e = c.split("."), f = d, n = 0; n < e.length; n++) {
      if (void 0 == f[e[n]]) return;
      f = f[e[n]];
    }

    return f;
  }

  function hd() {
    for (var d = ["_Selenium_IDE_Recorder", "_phantom", "phantom.injectJs", "callPhantom", "_selenium", "callSelenium", "domAutomation", "domAutomationController", "__nightmare", "domAutomationController", "context.hashCode", "java.lang.System.exit", "spawn", "emit", "webdriver"], c = ["__driver_evaluate", "__webdriver_evaluate", "__selenium_evaluate", "__fxdriver_evaluate", "__driver_unwrapped", "__webdriver_unwrapped", "__selenium_unwrapped", "__fxdriver_unwrapped", "__webdriver_script_function", "__webdriver_script_func", "__webdriver_script_fn"], e = ["selenium", "webdriver", "driver"], g = 0, n = d.length; g < n; g++) if (rb(w, d[g])) return g + 1;

    d = 0;

    for (g = c.length; d < g; d++) if (rb(x, c[d])) return d + 50;

    c = 0;

    for (d = e.length; c < d; c++) if (x["documentElement"]["getAttribute"](e[c])) return c + 100;

    return !0 === rb(u, "webdriver") ? 130 : 0;
  }

  function Pa(d) {
    return x["getElementsByTagName"](d) && x["getElementsByTagName"](d).length || 0;
  }

  function mc(b) {
    return O(b) === "undefined" ? 1 : b ? 2 : 3;
  }

  function nc(b) {
    var c = 65535;
    null == oa[b] && (oa[b] = 0);
    return oa[b] < c ? ++oa[b] : c;
  }

  function id(b) {
    function c(k) {
      k >= b || (c(k * 2 + 1), e === f && (h = k, f++, g = !0), g || e++, c(k * 2 + 2));
    }

    var e = 0,
        f = 0,
        g = !1,
        h;
    return function () {
      f >= b && (f = 0);
      g = !1;
      e = 0;
      c(0);
      return h;
    };
  }

  function Fa(a, b, e) {
    a[b] = e;
  }

  function jd() {
    var a = w[oc],
        c = {};
    if (!a) throw Error("Can not find configuration");
    pa || (pa = new g(a));
    Fa(c, "start", function () {
      pa._start();
    });
    Fa(c, "stop", function () {
      pa._stop();
    });
    Fa(c, "getToken", function (c, g, n, h) {
      if (c) pa._getToken(c, g, n, h);else if (typeof a["onerror"] === "function") a["onerror"](Error("Missing business key"));
    });
    Fa(c, "getNdInfo", function (a) {
      pa._getNdInfo(a);
    });
    Fa(c, "setCustomTrackId", function (a) {
      pa._setCustomTrackId(a);
    });
    if (typeof a["onload"] === "function") a["onload"](c);
  }

  Array.prototype.forEach || (Array.prototype.forEach = function (d, c) {
    var e, f;
    if (null == this) throw new TypeError(" this is null or not defined");
    var g = Object(this),
        h = g.length >>> 0;
    if (typeof d !== "function") throw new TypeError(d + " is not a function");
    arguments.length > 1 && (e = c);

    for (f = 0; f < h;) {
      var k;
      f in g && (k = g[f], d.call(e, k, f, g));
      f++;
    }
  });
  Array.prototype.filter || (Array.prototype.filter = function (d) {
    if (void 0 === this || null === this) throw new TypeError();
    var c = Object(this),
        e = c.length >>> 0;
    if (typeof d !== "function") throw new TypeError();

    for (var f = [], g = arguments.length >= 2 ? arguments[1] : void 0, h = 0; h < e; h++) if (h in c) {
      var k = c[h];
      d.call(g, k, h, c) && f.push(k);
    }

    return f;
  });
  Array.prototype.map || (Array.prototype.map = function (d, c) {
    var e, f, g;
    if (null == this) throw new TypeError(" this is null or not defined");
    var h = Object(this),
        k = h.length >>> 0;
    if (Object.prototype.toString.call(d) !== "[object Function]") throw new TypeError(d + " is not a function");
    c && (e = c);
    f = Array(k);

    for (g = 0; g < k;) {
      var q;
      g in h && (q = h[g], q = d.call(e, q, g, h), f[g] = q);
      g++;
    }

    return f;
  });
  Array.prototype.reduce || (Array.prototype.reduce = function (d) {
    if (null == this) throw new TypeError("Array.prototype.reduce called on null or undefined");
    if (typeof d !== "function") throw new TypeError(d + " is not a function");
    var c = Object(this),
        e = c.length >>> 0,
        g = 0,
        h;
    if (arguments.length == 2) h = arguments[1];else {
      for (; g < e && !(g in c);) g++;

      if (g >= e) throw new TypeError("Reduce of empty array with no initial value");
      h = c[g++];
    }

    for (; g < e; g++) g in c && (h = d(h, c[g], g, c));

    return h;
  });
  Array.prototype.indexOf || (Array.prototype.indexOf = function (d, c) {
    var e;
    if (null == this) throw new TypeError("\"this\" is null or not defined");
    var f = Object(this),
        g = f.length >>> 0;
    if (g === 0) return -1;
    e = +c || 0;
    Infinity === Math.abs(e) && (e = 0);
    if (e >= g) return -1;

    for (e = Math["max"](e >= 0 ? e : g - Math.abs(e), 0); e < g;) {
      if (e in f && f[e] === d) return e;
      e++;
    }

    return -1;
  });
  var kd = window["document"];

  (function () {
    var d = Array.prototype.slice;

    try {
      d.call(kd["documentElement"]);
    } catch (c) {
      Array.prototype.slice = function (c, f) {
        f = typeof f !== "undefined" ? f : this.length;
        if (Object.prototype.toString.call(this) === "[object Array]") return d.call(this, c, f);
        var g,
            h = [],
            k;
        g = this.length;
        var l = c || 0,
            l = l >= 0 ? l : g + l;
        k = f ? f : g;
        f < 0 && (k = g + f);
        k -= l;
        if (k > 0) if (h = Array(k), this.charAt) for (g = 0; g < k; g++) h[g] = this.charAt(l + g);else for (g = 0; g < k; g++) h[g] = this[l + g];
        return h;
      };
    }
  })();

  Object.keys || (Object.keys = function () {
    var d = Object.prototype.hasOwnProperty,
        c = !{
      toString: null
    }.propertyIsEnumerable("toString"),
        e = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
        g = e.length;
    return function (f) {
      if (typeof f !== "function" && (typeof f !== "object" || null === f)) throw new TypeError("Object.keys called on non-object");
      var h = [],
          k;

      for (k in f) d.call(f, k) && h.push(k);

      if (c) for (k = 0; k < g; k++) d.call(f, e[k]) && h.push(e[k]);
      return h;
    };
  }());
  typeof Object.create !== "function" && (Object.create = function (a, c) {
    function e() {}

    if (typeof a !== "object" && typeof a !== "function") throw new TypeError("Object prototype may only be an Object: " + a);
    if (null === a) throw Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
    if (typeof c !== "undefined") throw Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");
    e.prototype = a;
    return new e();
  });
  String.prototype.trim || (String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  });
  var oc = "WM_CONFIG",
      Ja = "WM_TID",
      ta = "WM_DID",
      pc = "WM_DIV",
      ob = "WM_NI",
      qc = "WM_NIKE",
      z = "NUMBER",
      t = "STRING",
      Z = "HEX",
      B = "BOOLEAN",
      H = "ARRAY",
      Gb = "CAT_CANVAS",
      Za = "CAT_FONTS",
      Hb = "CAT_WEBGL",
      Nb = typeof window !== "undefined" ? window : Nb,
      w = D("window"),
      x = D("document"),
      u = D("navigator"),
      Ga = D("screen"),
      Bb = D("location"),
      cb = D("XMLHttpRequest"),
      ld = D("sessionStorage"),
      qa = D("localStorage"),
      md = D("devicePixelRatio"),
      nd = D("indexedDB"),
      od = D("openDatabase"),
      rc = D("doNotTrack"),
      ed = D("ActiveXObject"),
      pd = D("WebGLRenderingContext"),
      aa = D("encodeURIComponent"),
      $b = D("decodeURIComponent"),
      za = D("setTimeout"),
      qd = D("setInterval"),
      ua = D("clearTimeout"),
      na = D("parseInt"),
      Cb = D("RegExp"),
      Da = D("Date"),
      dc = D("unescape"),
      ic = D("OfflineAudioContext") || D("webkitOfflineAudioContext"),
      Tc = {}.toString;

  va.prototype.Cc = function (a) {
    this.ja = Ia(this.ja || {}, a);
  };

  va.prototype.Bc = function (a) {
    this.da = Ia(this.da || {}, a);
  };

  va.prototype.h = function (a, b, e) {
    if (a = this.da[a]) return a({
      state: this["state"],
      B: this.B,
      h: this.h
    }, b, e);
  };

  va.prototype.B = function (a, b) {
    var e = this,
        g = {
      type: a,
      Kc: b
    },
        h = this.ja[a];
    h && (this.bc(function () {
      return h(e["state"], b);
    }), this.Ob.map(function (a) {
      return a(g, e["state"]);
    }));
  };

  va.prototype.bc = function (a) {
    var b = this.fa;
    this.fa = !0;
    a();
    this.fa = b;
  };

  var Rc = {
    name: "JSCookie",
    m: function (a, c, e) {
      e = e ? "domain=" + e : "";
      x["cookie"] = aa(a) + "=" + aa(c) + ";expires=Tue, 19 Jan 2038 03:14:07 GMT;path=/;" + e + ";";
    },
    k: function (d) {
      for (var c = (x["cookie"] || "").split(";"), e = 0, f = c.length; e < f; e++) {
        var g = c[e].split("="),
            h = g[0],
            g = g[1];
        void 0 === g && (g = "");
        if (h === d) return $b(g);
      }

      return null;
    },
    W: function (a) {
      x["cookie"] = aa(a) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    }
  },
      Sc = {
    name: "localStorage",
    m: function (a, b) {
      try {
        (w["localStorage"] || {}).setItem(a, b);
      } catch (e) {}
    },
    k: function (a) {
      try {
        return (w["localStorage"] || {})["getItem"](a);
      } catch (c) {}
    },
    W: function (a) {
      try {
        return (w["localStorage"] || {})["removeItem"](a);
      } catch (c) {}
    }
  },
      Qa = {},
      Qc = {
    name: "memoryStorage",
    m: function (a, b) {
      Qa[a] = b;
    },
    k: function (a) {
      return Qa[a];
    },
    W: function (a) {
      a in Qa && delete Qa[a];
    }
  };

  Ca.prototype.m = function (a, b, e) {
    var f = this;
    this.X.forEach(function (g) {
      return g.m(f.o(a), b, e);
    });
  };

  Ca.prototype.k = function (d) {
    for (var c = 0; c < this.X.length; c++) {
      var e = this.X[c].k(this.o(d));
      if (e) return e;
    }

    return "";
  };

  Ca.prototype.W = function (a) {
    var b = this;
    this.X.forEach(function (e) {
      return e.Lc(b.o(a));
    });
  };

  Ca.prototype.o = function (a) {
    return this.p ? this.p + ":" + a : a;
  };

  var La = {};

  ma.prototype.m = function (b, c, e) {
    b = this.o(b);

    if (c && typeof c === "string") {
      e = K() + na(e, 10);
      c = [c, e, K()].join(this.R);
      this.w[b] = c;

      try {
        qa.setItem(b, c);
      } catch (g) {}
    }
  };

  ma.prototype.pc = function (d) {
    d = this.o(d);
    var c = this.w[d];
    if (!c) try {
      c = qa["getItem"](d);
    } catch (e) {}
    if (!c) return !1;
    d = K();
    var c = c.split(this.R),
        f = +c[2] || 0;
    return d <= +(+c[1] || 0) && d > f ? !0 : !1;
  };

  ma.prototype.k = function (a) {
    a = this.o(a);
    var c = this.w[a];
    if (!c) try {
      c = qa["getItem"](a), this.w[a] = c;
    } catch (e) {}
    return c ? c.split(this.R)[0] || "" : "";
  };

  ma.prototype.nc = function (d) {
    d = this.o(d);
    var c = this.w[d];
    if (!c) try {
      c = qa["getItem"](d), this.w[d] = c;
    } catch (e) {}
    return c ? c.split(this.R)[1] || 0 : "";
  };

  ma.prototype.W = function (a) {
    a = this.o(a);
    delete this.w[a];

    try {
      qa["removeItem"](a);
    } catch (c) {}
  };

  ma.prototype.o = function (a) {
    return this.p ? this.p + ":" + a : a;
  };

  var Ma = {},
      Vc = 0,
      sb = 1,
      sc = 2,
      tc = 3,
      Ra = {};
  Ra[tc] = "request api error";
  Ra[sc] = "request resource error";
  Ra[sb] = "unknown error";

  var U = function (a) {
    function c(c, f, g) {
      void 0 === g && (g = {});
      a.call(this);
      this.name = "NEWatchmanError";
      this.code = c || sb;
      this.message = c + "(" + Ra[c] + ")" + (f ? " - " + f : "");
      this.data = g;
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

  U.K = tc;
  U.Gc = sc;
  U.UNKNOWN_ERROR = sb;
  var uc = "UPDATE_FUNC_TIMING",
      vc = "UPDATE_TIME_OFFSET",
      wc = "UPDATE_OPTIONS",
      la = "bb99db1_1",
      xc = "bb99db1_2",
      tb = "bb99db1_3",
      ub = "bb99db1_4",
      yc = "bb99db1_5",
      vb = "bb99db1_6",
      qb = "bb99db1_7",
      zc = "bb99db1_9",
      Sb = ["m", "Z", "T", "V", "e", "z", "i", "F", "6", "A", "t", "H", "4", "G", "o", "W", "n", "X", "2", "Y", "0", "9", "7", "l", "B", "S", "J", "d", "g", "8", "f", "K", "k", "O", "P", "Q", "u", "3", "b", "/", "y", "+", "s", "j", "U", "p", "E", "L", "q", "a", "x", "N", "w", "c", "r", "v", "M", "h", "5", "1", "D", ".", "R", "I"],
      Wc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/"],
      eb = "C",
      Xc = "=",
      Yc = [19, -12, -96, -107, -106, -89, -14, 37, 42, -93, -104, -19, -16, 36, 35, -34, -123, -31, -126, -52, 92, 65, 47, -95, 11, -6, 90, -36, -109, 81, 114, -81, 48, -99, 98, 5, -50, 1, 0, 20, 107, 25, -3, -54, -11, 53, -1, 108, 71, 70, 93, -127, -79, 96, 121, 118, 103, -111, -101, 44, -2, -120, -41, 43, 83, 77, 119, 86, -121, -32, -80, -91, -5, 2, 26, 22, -122, 9, -67, -61, -108, -37, -98, -18, 55, 99, 52, 67, -113, 16, 41, 31, -27, -35, -20, -114, 94, -97, -112, -88, 61, -17, 40, -55, -83, 10, -73, -38, 125, -85, -39, -44, 84, 60, -33, -13, -103, 14, 72, 127, 49, 23, 66, -116, -71, -125, -10, -58, -64, -25, 6, -43, 58, -94, 105, -65, 74, 68, -68, -42, -48, 109, -77, 34, -9, -23, -102, 30, 116, -59, 29, -53, -4, 69, 120, 115, -117, -87, 102, -124, -51, -70, 45, 100, 27, -128, 28, 4, -15, 73, 88, 113, -66, -78, -82, -84, 51, -92, 104, 50, -86, 57, 76, 111, -119, -30, -56, -46, 78, 8, 12, 17, 97, 87, -90, -29, 63, -45, -21, -63, -105, 112, -62, 75, 13, 18, -118, 117, -7, 79, 106, 39, 82, -47, -115, 110, -40, 3, 124, -60, 56, -74, -26, 15, 101, 95, -49, 126, -24, 123, 46, 62, 91, 54, -22, 38, 85, -100, -110, -72, -8, -28, 122, 7, 59, 64, -76, 32, 21, 24, -57, -75, -69, 80, 89, 33],
      T = 64,
      kb = 64,
      Na = 4,
      mb = 4,
      Ac = "eb045ea7",
      ba = {};

  ba[la] = function (a, b) {
    var e = a.B;
    void 0 === b && (b = {});
    e(wc, Va(b));
  };

  ba[xc] = function (d, c, e) {
    function g(d, l) {
      if (d >= p.length) e(l);else {
        var t = Ka(k, p[d], "/v3/d");
        Qb(t, {
          ba: "POST",
          J: {
            d: c,
            v: Ac
          },
          V: function (b) {
            var d = b[0],
                c = b[1],
                g = b[2],
                k = b[3],
                l = b[5];
            d === 200 || d === 420 ? (k && h(yc, {
              id: k,
              uc: q * 5 / 6
            }), l && h(zc, {
              id: l
            }), g && h(ub, {
              domain: m,
              id: g
            }), d === 420 && c && h(vb, c), e(null, b)) : (b = new U(U.K, "device api response wrong", {
              url: t
            }), e(b));
          },
          U: function (c) {
            void 0 === c && (c = {});
            c = new U(U.K, "send devicedata failed: " + (c.message ? c.message : ""), {
              url: t
            });
            Kb(c, d + 1);
            g(d + 1, c);
          }
        });
      }
    }

    var h = d.h;
    d = d["state"];
    void 0 === e && (e = W);
    d = d["options"];
    var k = d["protocol"],
        m = d["domain"],
        q = d.jc,
        p = d.apiServers;
    g(0);
  };

  ba[tb] = function (d, c, e) {
    function g(d, l) {
      if (d >= q.length) e(l);else {
        var p = Ka(k, q[d], "/v3/b");
        Qb(p, {
          ba: "POST",
          J: {
            d: c,
            v: Ac
          },
          V: function (b) {
            var d = b[0],
                c = b[1],
                g = b[2];
            d === 200 || d === 420 ? (g && h(ub, {
              domain: m,
              id: g
            }), d === 420 && c && h(vb, c), e(null, b)) : d === 470 ? e(null, b) : (b = new U(U.K, "behavior api response wrong", {
              url: p
            }), e(b));
          },
          U: function (c) {
            void 0 === c && (c = {});
            c = new U(U.K, "send behaviordata failed: " + (c.message ? c.message : ""), {
              url: p
            });
            Kb(c, d + 1);
            g(d + 1, c);
          }
        });
      }
    }

    var h = d.h;
    d = d["state"];
    void 0 === e && (e = W);
    d = d["options"];
    var k = d["protocol"],
        m = d["domain"],
        q = d.apiServers;
    g(0);
  };

  ba[ub] = function (a, c) {
    var e = c.id,
        f = c["domain"];
    X().m(Ja, e, f);
  };

  ba[zc] = function (a, b) {
    var e = b.id;
    X().m(ob, e);
    X().m(qc, nb());
  };

  ba[yc] = function (a, b) {
    var e = a["state"],
        g = b.id,
        h = b.uc;
    fa().m(ta, g, h);
    fa().m(pc, e["options"].buildVersion, h);
  };

  ba[vb] = function (a, c) {
    var e = a.B;
    c = new Da(c)["getTime"]();
    e(vc, c - K());
  };

  ba[qb] = function (a, b) {
    var e = a.B;
    e(uc, b);
  };

  var Sa = {};

  Sa[wc] = function (a, b) {
    a["options"] = b;
  };

  Sa[uc] = function (b, c) {
    b.$[c.cursor] = c.value || 0;
  };

  Sa[vc] = function (a, b) {
    a.xa = b;
  };

  var C = new va({
    state: {
      options: {},
      xa: 0,
      $: [0, 0, 0, 0, 0, 0]
    },
    cc: ba,
    wc: Sa
  }),
      da = {
    Zb: {
      c: 0,
      a: t,
      e: 3
    },
    La: {
      c: 1,
      a: t,
      e: 20
    },
    Ma: {
      c: 2,
      a: t,
      e: 32
    },
    Ja: {
      c: 3,
      a: t,
      e: 32
    },
    Ab: {
      c: 4,
      a: t,
      e: 32
    },
    Rb: {
      c: 5,
      a: z,
      e: 4
    },
    Ib: {
      c: 6,
      a: z,
      e: 1
    },
    Wb: {
      c: 7,
      a: t,
      e: 32
    },
    $a: {
      c: 8,
      a: t,
      e: 32
    },
    Hb: {
      c: 9,
      a: t,
      e: 32
    },
    Ya: {
      c: 10,
      a: t,
      e: 128
    },
    $b: {
      c: 107,
      a: z,
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
    Xb: {
      c: 200,
      a: t,
      e: 400
    },
    wb: {
      c: 201,
      a: t,
      e: 20
    },
    Qa: {
      c: 202,
      a: z,
      e: 1
    },
    Za: {
      c: 203,
      a: z,
      e: 1
    },
    Sb: {
      c: 206,
      a: z,
      e: 1
    },
    Mb: {
      c: 207,
      a: B,
      e: 1
    },
    zb: {
      c: 208,
      a: B,
      e: 1
    },
    qb: {
      c: 209,
      a: B,
      e: 1
    },
    Ba: {
      c: 210,
      a: B,
      e: 1
    },
    Cb: {
      c: 211,
      a: B,
      e: 1
    },
    Sa: {
      c: 212,
      a: t,
      e: 10
    },
    Fb: {
      c: 213,
      a: t,
      e: 10
    },
    ab: {
      c: 214,
      a: t,
      e: 15
    },
    Gb: {
      c: 215,
      a: Z,
      e: 16
    },
    Na: {
      c: 216,
      a: Z,
      e: 16
    },
    ac: {
      c: 217,
      a: Z,
      e: 16
    },
    Aa: {
      c: 218,
      a: B,
      e: 1
    },
    mb: {
      c: 221,
      a: B,
      e: 1
    },
    lb: {
      c: 222,
      a: B,
      e: 1
    },
    Vb: {
      c: 223,
      a: B,
      e: 1
    },
    Jb: {
      c: 225,
      a: z,
      e: 1
    },
    Ra: {
      c: 228,
      a: B,
      e: 1
    },
    ub: {
      c: 229,
      a: B,
      e: 1
    },
    Ca: {
      c: 230,
      a: t,
      e: 20
    },
    Da: {
      c: 231,
      a: t,
      e: 10
    },
    Ea: {
      c: 232,
      a: t,
      e: 20
    },
    Fa: {
      c: 233,
      a: t,
      e: 150
    },
    xb: {
      c: 234,
      a: t,
      e: 10
    },
    Pb: {
      c: 235,
      a: t,
      e: 10
    },
    Yb: {
      c: 236,
      a: t,
      e: 10
    },
    Ka: {
      c: 237,
      a: t,
      e: 10
    },
    Db: {
      c: 238,
      a: t,
      e: 40
    },
    bb: {
      c: 239,
      a: t,
      e: 20
    },
    gb: {
      c: 240,
      a: Z,
      e: 16
    },
    fb: {
      c: 241,
      a: z,
      e: 2
    },
    Kb: {
      c: 242,
      a: H,
      e: [2, 2, 2, 2]
    },
    jb: {
      c: 243,
      a: z,
      e: 1
    },
    kb: {
      c: 401,
      a: B,
      e: 1
    },
    eb: {
      c: 402,
      a: t,
      e: 10
    },
    Bb: {
      c: 403,
      a: z,
      e: 1
    },
    cb: {
      c: 404,
      a: z,
      e: 1
    },
    Nb: {
      c: 405,
      a: B,
      e: 1
    },
    Ub: {
      c: 450,
      a: z,
      e: 1
    },
    tb: {
      c: 451,
      a: B,
      e: 1
    },
    pb: {
      c: 701,
      a: z,
      e: 1
    },
    hb: {
      c: 702,
      a: z,
      e: 1
    },
    sb: {
      c: 703,
      a: z,
      e: 1
    },
    Lb: {
      c: 704,
      a: z,
      e: 5
    },
    nb: {
      c: 705,
      a: z,
      e: 1
    },
    Tb: {
      c: 706,
      a: t,
      e: 10
    },
    vb: {
      c: 707,
      a: t,
      e: 16
    },
    Qb: {
      c: 708,
      a: z,
      e: 2
    },
    ob: {
      c: 709,
      a: z,
      e: 2
    },
    rb: {
      c: 710,
      a: z,
      e: 2
    },
    ib: {
      c: 711,
      a: H,
      e: [3, 3, 3, 3, 3]
    },
    Eb: {
      c: 712,
      a: H,
      e: [1, 3, 3]
    },
    Pa: {
      c: 713,
      a: H,
      e: [4, 4]
    },
    Ta: {
      c: 800,
      a: t,
      e: 8
    },
    Ua: {
      c: 801,
      a: t,
      e: 8
    },
    Va: {
      c: 802,
      a: t,
      e: 8
    },
    Wa: {
      c: 803,
      a: t,
      e: 8
    },
    Xa: {
      c: 804,
      a: t,
      e: 8
    },
    Ia: {
      c: 327,
      a: t,
      e: 32
    }
  },
      fc = 0,
      Gc = "2.7.3_eb045ea7",
      Hc = ["7", "9", "9", "1", "8", "5", "e", "8"],
      Ic = "f,d,b,a,9,5,8,f",
      Kc = "3eb22b97",
      pb,
      wb,
      Ea,
      hc,
      I = jc(),
      rd = function () {
    var d = jc();
    return d === "Windows Phone" || d === "Android" || d === "iOS" ? 3 : d === "Linux" || d === "Windows" || d === "Mac" ? 2 : 1;
  }(),
      Q = function () {
    var d = u["userAgent"].toLowerCase();
    return d.indexOf("firefox") >= 0 ? "Firefox" : d.indexOf("opera") >= 0 || d.indexOf("opr") >= 0 ? "Opera" : d.indexOf("chrome") >= 0 ? "Chrome" : d.indexOf("safari") >= 0 ? "Safari" : d.indexOf("trident") >= 0 ? "Internet Explorer" : "Other";
  }(),
      Ya = {
    Xb: {
      f: function () {
        return u["userAgent"] || "";
      },
      a: t
    },
    wb: {
      f: function () {
        return u["language"] || "";
      },
      a: t
    },
    Qa: {
      f: function () {
        return Ga["colorDepth"] || 0;
      },
      a: z
    },
    Za: {
      f: function () {
        return md || 0;
      },
      a: z
    },
    Sb: {
      f: function () {
        return Math["floor"](new Da()["getTimezoneOffset"]() / 60 * -1 + 12);
      },
      a: z
    },
    Mb: {
      f: function () {
        return !!ld;
      },
      a: B
    },
    zb: {
      f: function () {
        return !!qa;
      },
      a: B
    },
    qb: {
      f: function () {
        return !!nd;
      },
      a: B
    },
    Ba: {
      f: function () {
        var a = x["body"];
        return a && !!a["addBehavior"];
      },
      a: B
    },
    Cb: {
      f: function () {
        return !!od;
      },
      a: B
    },
    Sa: {
      f: function () {
        return u["cpuClass"] || "";
      },
      a: t
    },
    Fb: {
      f: function () {
        return u["platform"] || "";
      },
      a: t
    },
    ab: {
      f: function () {
        return u["doNotTrack"] ? u["doNotTrack"] : u.vc ? u.vc : rc ? rc : "unknown";
      },
      a: t
    },
    Gb: {
      f: function () {
        var a = fd ? dd() : kc();
        return Aa(a.join("~"));
      },
      u: !0,
      a: Z
    },
    Na: {
      f: function () {
        var d;

        if (lc()) {
          if (wb) d = wb;else {
            d = [];

            try {
              var c = x["createElement"]("canvas");
              c["width"] = 500;
              c["height"] = 200;
              c["style"].display = "inline";
              var e = c["getContext"]("2d");
              e["rect"](0, 0, 10, 10);
              e["rect"](2, 2, 6, 6);
              d.push("canvas winding:" + (!1 === e.isPointInPath(5, 5, "evenodd") ? "yes" : "no"));
              e["textBaseline"] = "alphabetic";
              e["fillStyle"] = "#f60";
              e["fillRect"](125, 1, 62, 20);
              e["fillStyle"] = "#069";
              e["font"] = "11pt Arial";
              e.fillText("Cwm fjordbank glyphs vext quiz, \uD83D\uDE05\uD83D\uDE25\uD83D\uDC76\uD83D\uDE03\uD83E\uDDE5\uD83D\uDC36\uD83C\uDF4F\u26BD\uFE0F\u2702\uD83C\uDE32\uD83D\uDE97\u231A\uFE0F\u2764\uFE0F\uD83C\uDFC1\u25B6", 2, 15);
              e["fillStyle"] = "rgba(102, 204, 0, 0.2)";
              e["font"] = "18pt Arial";
              e.fillText("Cwm fjordbank glyphs vext quiz, \uD83D\uDE05\uD83D\uDE25\uD83D\uDC76\uD83D\uDE03", 4, 45);
              e.fillText("\uD83E\uDDE5\uD83D\uDC36\uD83C\uDF4F\u26BD\uFE0F\u2702\uD83C\uDE32\uD83D\uDE97\u231A\uFE0F\u2764\uFE0F\uD83C\uDFC1\u25B6", 4, 75);
              e["globalCompositeOperation"] = "multiply";
              e["fillStyle"] = "rgb(255,0,255)";
              e["beginPath"]();
              e["arc"](50, 50, 50, 0, Math.PI * 2, !0);
              e["closePath"]();
              e.fill();
              e["fillStyle"] = "rgb(0,255,255)";
              e["beginPath"]();
              e["arc"](100, 50, 50, 0, Math.PI * 2, !0);
              e["closePath"]();
              e.fill();
              e["fillStyle"] = "rgb(255,255,0)";
              e["beginPath"]();
              e["arc"](75, 100, 50, 0, Math.PI * 2, !0);
              e["closePath"]();
              e.fill();
              e["fillStyle"] = "rgb(255,0,255)";
              e["arc"](75, 75, 75, 0, Math.PI * 2, !0);
              e["arc"](75, 75, 25, 0, Math.PI * 2, !0);
              e.fill("evenodd");
              d.push("canvas fp:" + c["toDataURL"]());
            } catch (g) {
              d.push(g);
            }

            d = wb = d;
          }
          d = Aa(d.join("~"));
        } else d = "";

        return d;
      },
      a: Z,
      u: !0,
      T: Gb
    },
    ac: {
      f: function () {
        var a;

        if (lc()) {
          a = x["createElement"]("canvas");
          var c;

          try {
            c = a["getContext"] && (a["getContext"]("webgl") || a["getContext"]("experimental-webgl"));
          } catch (e) {
            c = !1;
          }

          a = !!pd && !!c;
        } else a = !1;

        return a ? Aa(bd().join("~")) : "";
      },
      a: Z,
      u: !0,
      T: Hb
    },
    Aa: {
      f: function () {
        var d = x["createElement"]("div"),
            c = "fp_" + new Da();
        d["innerHTML"] = "&nbsp;";
        d.className = "adsbox";
        d.id = c;
        var e = !1;

        try {
          x["body"]["appendChild"](d), e = x.getElementById(c)["offsetHeight"] === 0, x["body"]["removeChild"](d);
        } catch (g) {
          e = !1;
        }

        return e;
      },
      a: B,
      u: !0
    },
    mb: {
      f: function () {
        var d = u["platform"],
            c = u["oscpu"];
        return ("ontouchstart" in w || u.ra > 0 || u.sa > 0) && I !== "Windows Phone" && I !== "Android" && I !== "iOs" && I !== "Other" || typeof c !== "undefined" && (c = c.toLowerCase(), ~c.indexOf("win") && I !== "Windows" && I !== "iOS" && I !== "Other" || ~c.indexOf("linux") && I !== "Linux" && I !== "Android" || ~c.indexOf("mac") && I !== "Mac" && I !== "iOS" || (c.indexOf("win") === -1 && c.indexOf("linux") === -1 && c.indexOf("mac" === -1)) !== (I === "Other")) ? !0 : d.indexOf("win") >= 0 && I !== "Windows" && I !== "Windows Phone" || (d.indexOf("linux") >= 0 || d.indexOf("android") >= 0 || d.indexOf("pike") >= 0) && I !== "Linux" && I !== "Android" || (d.indexOf("mac") >= 0 || d.indexOf("ipad") >= 0 || d.indexOf("ipod") >= 0 || d.indexOf("iphone") >= 0) && I !== "Mac" && I !== "iOS" || (d.indexOf("win") === -1 && d.indexOf("linux") === -1 && d.indexOf("mac") === -1) !== (I === "Other") ? !0 : typeof u["plugins"] === "undefined" && I !== "Windows" && I !== "Windows Phone" ? !0 : !1;
      },
      a: B
    },
    lb: {
      f: function () {
        var d = u["productSub"];
        if ((Q === "Chrome" || Q === "Safari" || Q === "Opera") && d !== "20030107") return !0;
        d = eval.toString().length;
        if (d === 37 && Q !== "Safari" && Q !== "Firefox" && Q !== "Other" || d === 39 && Q !== "Internet Explorer" && Q !== "Other" || d === 33 && Q !== "Chrome" && Q !== "Opera" && Q !== "Other") return !0;
        var c;

        try {
          throw Error("a");
        } catch (e) {
          try {
            e["toSource"](), c = !0;
          } catch (g) {
            c = !1;
          }
        }

        return c && Q !== "Firefox" && Q !== "Other" ? !0 : !1;
      },
      a: B
    },
    Vb: {
      f: function () {
        var d = 0,
            c = !1;
        typeof u.ra !== "undefined" ? d = u.ra : typeof u.sa !== "undefined" && (d = u.sa);

        try {
          x["createEvent"]("TouchEvent"), c = !0;
        } catch (e) {}

        var f = ("ontouchstart" in w);
        return d > 0 || c || f;
      },
      a: B
    },
    Jb: {
      f: function () {
        return rd;
      },
      a: z
    },
    Ra: {
      f: function () {
        return !!u["cookieEnabled"];
      },
      a: B
    },
    ub: {
      f: function () {
        try {
          return !!u["javaEnabled"]();
        } catch (a) {
          return !1;
        }
      },
      a: B
    },
    Ca: {
      f: function () {
        return u["appCodeName"] || "";
      },
      a: t
    },
    Da: {
      f: function () {
        return u["appMinorVersion"] || "";
      },
      a: t
    },
    Ea: {
      f: function () {
        return u["appName"] || "";
      },
      a: t
    },
    Fa: {
      f: function () {
        return u["appVersion"] || "";
      },
      a: t
    },
    xb: {
      f: function () {
        return u["languages"] || "";
      },
      a: t
    },
    Pb: {
      f: function () {
        return u["systemLanguage"] || "";
      },
      a: t
    },
    Yb: {
      f: function () {
        return u["userLanguage"] || "";
      },
      a: t
    },
    Ka: {
      f: function () {
        return u["browserLanguage"] || "";
      },
      a: t
    },
    Db: {
      f: function () {
        return u["oscpu"] || "";
      },
      a: t
    },
    bb: {
      f: function () {
        return x["documentMode"] || x["compatMode"] || "";
      },
      a: t
    },
    gb: {
      f: function () {
        return Aa(gc().join("~"));
      },
      a: Z,
      u: !0,
      T: Za
    },
    fb: {
      f: function () {
        return gc().length || 0;
      },
      a: z,
      u: !0,
      T: Za
    },
    jb: {
      f: function () {
        return u["hardwareConcurrency"] || 0;
      },
      a: z
    },
    Kb: {
      f: function () {
        var d = Ga["width"];
        void 0 === d && (d = 0);
        var c = Ga["height"];
        void 0 === c && (c = 0);
        var e = Ga["availWidth"];
        void 0 === e && (e = 0);
        var g = Ga["availHeight"];
        return [d > c ? d : c, d > c ? c : d, e > g ? e : g, e > g ? g : e];
      },
      a: H
    },
    Ia: {
      f: function (a) {
        return ic ? cd(a) : a("");
      },
      a: t,
      Ga: !0,
      u: !0
    }
  },
      Xa = [],
      Eb = 0,
      Wa = [],
      Fb = !1,
      Ta = /./;

  try {
    Ta.toString = function () {
      return Ta.zc = !0;
    }, console.log("%c", Ta);
  } catch (sd) {}

  var Db = {
    kb: {
      f: function () {
        return !!Ta.zc;
      },
      a: B
    },
    eb: {
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
    Bb: {
      f: function () {
        for (var d = ["document", "navigator", "location", "history", "", "", "screen", "parent", "top", "self", {
          q: "parseFloat",
          n: function () {
            try {
              return w["parseFloat"]("1.01") === 1.01 && w["isNaN"](w["parseFloat"]("HI"));
            } catch (c) {
              return !1;
            }
          }
        }, {
          q: "parseInt",
          n: function () {
            try {
              return w["parseInt"]("123") === 123 && w["isNaN"](w["parseFloat"]("HI"));
            } catch (c) {
              return !1;
            }
          }
        }, {
          q: "decodeURI",
          n: function () {
            try {
              return w["decodeURI"]("%22") === "\"";
            } catch (a) {
              return !1;
            }
          }
        }, {
          q: "decodeURIComponent",
          n: function () {
            try {
              return w["decodeURIComponent"]("%26") === "&";
            } catch (a) {
              return !1;
            }
          }
        }, {
          q: "encodeURI",
          n: function () {
            try {
              return w["encodeURI"]("\"") === "%22";
            } catch (a) {
              return !1;
            }
          }
        }, {
          q: "encodeURIComponent",
          n: function () {
            try {
              return w["encodeURIComponent"]("&") === "%26";
            } catch (a) {
              return !1;
            }
          }
        }, {
          q: "escape",
          n: function () {
            try {
              return w["escape"]("&") === "%26";
            } catch (a) {
              return !1;
            }
          }
        }, {
          q: "unescape",
          n: function () {
            try {
              return w["unescape"]("%26") === "&";
            } catch (a) {
              return !1;
            }
          }
        }, {
          q: "eval",
          n: function () {
            try {
              return w["eval"]("(function(){return 123;})();") === 123;
            } catch (c) {
              return !1;
            }
          }
        }, "window"], c = 0, e = d.length; c < e; c++) {
          if (d[c].n) if (d[c].n()) continue;else return c + 1;
          if (d[c] && !w[d[c]]) return c + 1;
        }

        return 0;
      },
      a: z
    },
    cb: {
      f: function () {
        var d;
        if (!(d = ka(hd, 5, void 0)())) a: {
          for (var c in x) if (x[c]) {
            try {
              if (x[c]["cache_"] && c["match"] && c["match"](/\$[a-z]dc_/)) {
                d = 200;
                break a;
              }
            } catch (e) {}

            d = 0;
            break a;
          }

          d = void 0;
        }
        if (!d) try {
          d = w["external"] && ~w["external"].toString().indexOf("Sequentum") && 201;
        } catch (f) {
          d = 0;
        }
        return d;
      },
      a: z
    },
    Ub: {
      f: function () {
        return w["initWatchman"]["version"] || w["initNEWatchman"]["version"] || 0;
      },
      a: z
    },
    tb: {
      f: function () {
        for (var d = !1, c = x["getElementsByTagName"]("script"), e = 0, f = c.length; e < f; e++) {
          var g = c[e]["src"];

          if (g && ~g.indexOf("/tool.min.js")) {
            d = !0;
            break;
          }
        }

        return d;
      },
      a: B
    }
  },
      Cc = {
    pb: {
      f: function () {
        return Pa("iframe");
      },
      a: z
    },
    hb: {
      f: function () {
        return Pa("form");
      },
      a: z
    },
    sb: {
      f: function () {
        return Pa("input");
      },
      a: z
    },
    Lb: {
      f: function () {
        return Pa("script");
      },
      a: z
    },
    nb: {
      f: function () {
        return w.history.length || 0;
      },
      a: z
    },
    Tb: {
      f: function () {
        return x["title"] || "";
      },
      a: t
    },
    vb: {
      f: function () {
        return x.Jc || "";
      },
      a: t
    },
    Qb: {
      f: function () {
        return (x["documentElement"]["textContent"] || x["documentElement"]["innerText"]).length || 0;
      },
      a: z
    },
    ob: {
      f: function () {
        return x["documentElement"]["innerHTML"].length || 0;
      },
      a: z
    },
    rb: {
      f: function () {
        return C["state"].$[0];
      },
      a: z
    },
    ib: {
      f: function () {
        return C["state"].$.slice(1);
      },
      a: H
    },
    Eb: {
      f: function () {
        var d = w["performance"];

        if (d) {
          var c = d["timing"];
          return [d["navigation"].type, c["responseStart"] - c["requestStart"], c["responseEnd"] - c["fetchStart"]];
        }

        return [0, 0, 0];
      },
      a: H
    },
    Pa: {
      f: function () {
        return [w["innerWidth"] || x["documentElement"]["clientWidth"] || x["body"]["clientWidth"], w["innerHeight"] || x["documentElement"]["clientHeight"] || x["body"]["clientHeight"]];
      },
      a: H
    },
    Nb: {
      f: function () {
        return db() ? 1 : 2;
      },
      a: z
    },
    $b: {
      f: function () {
        return C["state"]["options"].Fc;
      },
      a: z
    }
  },
      Ha = {
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
  x["createElement"]("div")["addEventListener"] ? (xb = function (a, c, e) {
    a["addEventListener"](c, e, !0);
  }, yb = function (a, c, e) {
    a["removeEventListener"](c, e, !0);
  }) : (xb = function (a, c, e) {
    a["attachEvent"]("on" + c, e);
  }, yb = function (a, c, e) {
    a["detachEvent"]("on" + c, e);
  });

  ja.ua = function (a, b, e) {
    xb(a, b, e);
    return ja;
  };

  ja.ta = function (a, b, e) {
    yb(a, b, e);
    return ja;
  };

  var zb = Object.keys(Ha),
      Ab = {},
      wa = !!u["getBattery"],
      oa = {};

  V.prototype._start = function () {
    this.l || (this.l = !0, this.dc());
  };

  V.prototype._stop = function () {
    this.l = !1;
    this.va();
    this.A();
  };

  V.prototype.A = function () {
    oa = {};
    if (this.j) for (var a in this.j) this.j[a] && (this.j[a] = []);
  };

  V.prototype.oc = function (d) {
    if (!this.l) return this.va();
    d = d || w["event"];
    var c;

    a: if (c = d.type, Ab[c]) c = Ab[c];else {
      for (var e = 0, f = zb.length; e < f; e++) for (var g = Ha[zb[e]], h = 0, k = g.length; h < k; h++) if (c === g[h]) {
        c = Ab[c] = zb[e];
        break a;
      }

      c = "";
    }

    this.N(d, c);
  };

  V.prototype.I = function () {
    var a = this,
        b = [];
    xa(Object.keys(this.j)).forEach(function (e) {
      O(a.j[e]) === "array" && xa(a.j[e]).forEach(function (a) {
        return b.push.apply(b, a);
      });
    });
    this.A();
    return b;
  };

  V.prototype.dc = function () {
    var a = this;
    this.F.forEach(function (c) {
      var e = ~["_focus", "_blur", "_scroll", "_orientation", "_motion"].indexOf(c) ? w : x;
      a.Z[c] = e;
      a.ga(e, c, !0);
    });
  };

  V.prototype.va = function () {
    var a = this;
    this.F.forEach(function (b) {
      var e = a.Z[b];
      e && a.ga(e, b);
    });
    this.Z = {};
  };

  V.prototype.ga = function (a, b, e) {
    var f = this;
    Ha[b].forEach(function (b) {
      e ? ja.ua(a, b, f.qa) : ja.ta(a, b, f.qa);
    });
  };

  V.prototype.N = function (d, c) {
    var e,
        g,
        h,
        k,
        m = c.slice(1),
        q = this.ka;
    g = q[m + "Interval"];
    e = q[m + "Max"];
    (q = this.j[c]) || (q = this.j[c] = []);
    var p = q.length;
    g = p < e ? 10 : g;
    h = K();
    if (h - (q.za || 0) <= g) {
      // debugger;
      return this;
    };
    q.za = h;
    q.ca || (q.ca = id(e));
    p >= e && (e = q.ca(), q.splice(e, 1));
    p = d;
    void 0 === p && (p = {});
    k = p["changedTouches"] && p["changedTouches"].length ? p["changedTouches"][0] : p;
    e = typeof p["isTrusted"] === "undefined" ? 1 : p["isTrusted"] ? 2 : 3;
    g = p["button"] || 0;
    h = k["clientX"] || k["screenX"];
    k = k["clientY"] || k["clientX"];
    var t = p["target"] || p["srcElement"],
        p = C["state"]["options"].S;
    void 0 === p && (p = 0);
    p = [nc(m), K() - p];

    switch (m) {
      case "down":
        p.push(e, g, h << 0, k << 0);
        break;

      case "move":
        p.push(e, h << 0, k << 0);
        break;

      case "up":
        p.push(e, h << 0, k << 0);
        break;

      case "click":
        p.push(e, h << 0, k << 0, t.id || "");
        break;

      case "keydown":
      case "focus":
      case "blur":
        p.push(e, t && t.id || "");
        break;

      case "scroll":
        m = "pageXOffset" in w;
        g = (x["compatMode"] || "") === "CSS1Compat";
        m = [m ? w["pageXOffset"] : g ? x["documentElement"]["scrollLeft"] : x["body"]["scrollLeft"], m ? w["pageYOffset"] : g ? x["documentElement"]["scrollTop"] : x["body"]["scrollTop"]];
        p.push(e, m[0] << 0, m[1] << 0);
        break;

      case "orientation":
        if (null == d["alpha"] || null == d["beta"] || null == d["gamma"]) return;
        p.push(Math.round(d["alpha"]), Math.round(d["beta"]), Math.round(d["gamma"]), mc(d["absolute"]));
        break;

      case "motion":
        m = d["acceleration"] || d["accelerationIncludingGravity"];
        if (!m || null == m["x"] || null == m["y"] || null == m["z"]) return;
        p.push(Math.round(m["x"] * 1000), Math.round(m["y"] * 1000), Math.round(m["z"] * 1000), d["interval"]);
        break;

      default:
        p.length = 0;
    }

    p.length && ("", q.push(ya(p, da[c])));
  };

  k.prototype._start = function () {
    var a = this;
    this.l || (this.l = !0, this.D = u["getBattery"](), this.D.then(function (c) {
      a._battery["charging"] = c["charging"];
      a._battery["level"] = c["level"];
      a._battery["chargingTime"] = c["chargingTime"];
      a._battery["dischargingTime"] = c["dischargingTime"];
      a.N(a._battery);
      a.F.forEach(function (b) {
        return ja.ua(c, b, a.ea);
      });
    }));
  };

  k.prototype._stop = function () {
    var a = this;
    this.l = !1;
    this.D && this.D.then(function (b) {
      a.F.forEach(function (e) {
        return ja.ta(b, e, a.ea);
      });
    });
    this.A();
  };

  k.prototype.A = function () {
    var b = "battery";
    b ? oa[b] = 0 : oa = {};
    this.j = [];
    this.D = null;
    this._battery = {};
  };

  k.prototype.N = function (d) {
    function c(a) {
      return null == d[a] ? e._battery[a] : d[a];
    }

    var e = this,
        g = this.j.length,
        h = g < this.Y[0] ? 100 : this.Y[1],
        k = K();
    if (k - (this.yb || 0) <= h) return this;
    this.yb = k;
    g >= this.Y[0] && (g = Math.round(Math["random"]() * (g - 1 - 1)) + 1, this.j.splice(g, 1));
    g = C["state"]["options"].S;
    void 0 === g && (g = 0);
    var g = [nc("battery"), K() - g],
        m = [c("charging"), c("level"), c("chargingTime"), c("dischargingTime")],
        h = m[0],
        k = m[1],
        p = m[2],
        m = m[3];
    g.push(mc(h), Math.round(k * 100), function (c) {
      return typeof c === "number" && isFinite(c) ? c : -1;
    }(h ? p : m));
    "";
    this.j.push(ya(g, da["_battery"]));
  };

  k.prototype.I = function () {
    var a = [];
    this.j.forEach(function (b) {
      return a = a.concat(b);
    });
    this.j = [];
    return a;
  };

  var Ua,
      S = db();

  h.prototype._start = function () {
    this.P._start();

    wa && this.L._start();
  };

  h.prototype._stop = function () {
    this.P._stop();

    wa && this.L._stop();
  };

  h.prototype.A = function () {
    this.P.A();
    wa && this.L.A();
  };

  h.prototype.I = function () {
    return this.P.I().concat(wa ? this.L.I() : []);
  };

  g.prototype.aa = function (a) {
    this.g = q(a);
    this.gc();
    C.h(la, this.g);
    this.qc();
  };

  g.prototype.gc = function () {
    var d = this.g,
        c = d.buildVersion,
        e = d.sConfig,
        f = d.staticServer,
        g = d.rc,
        d = d.valid;
    void 0 === d && (d = 0);
    if (!(d > 0) && e && O(g) === "number") try {
      qa.setItem(oc, JSON["stringify"]({
        sConfig: e,
        buildVersion: c,
        staticServer: f,
        valid: K() + na(g, 10)
      }));
    } catch (h) {}
  };

  g.prototype.qc = function () {
    var a = this.g,
        c = a["auto"],
        a = a.pa;
    this.M = new h();
    this.Q = !1;
    c && this._start();
    a && (this.O() || this.H(), this.Oa());
  };

  g.prototype.oa = function () {
    for (var b = this.na, c = 0, e = b.length; c < e; c++) b[c]();

    b.length = 0;
  };

  g.prototype.O = function () {
    var a = this.g,
        b = a.buildVersion,
        e = a.lastUsedVersion;
    if (!a.pa) return !0;
    var a = fa().pc(ta),
        f = fa().k(pc),
        g = X().k(Ja),
        h = X().k(ob);
    return !(e && f && f !== b && f !== e) && a && g && h;
  };

  g.prototype.H = function (d) {
    var c = this;
    typeof d === "function" && this.na.push(d);
    this.Q || (this.Q = !0, this.ha(function (b, d) {
      if (!b) {
        var f = d && d[0];
        if (f === 420) return c.ha(function (a) {
          a || (c.oa(), c.Q = !1);
        });
        f === 200 && (c.oa(), c.Q = !1);
      }
    }));
  };

  g.prototype.Oa = function () {
    var b = this,
        c = 60 * 1000;
    qd(function () {
      fa().nc(ta) - K() <= c * 5 && b.H();
    }, c * 5);
  };

  g.prototype.ha = function (d) {
    void 0 === d && (d = W);
    var c = $a();
    gd(Dc, 3)(function (e) {
      var f = ca(!0);
      "";
      "";
      "";
      e = ka(lb, 1, void 0)(c.concat(e, f));
      C.h(xc, e, d);
    });
  };

  g.prototype._start = function () {
    this.l || (this.l = !0, this.O() || this.H(), this.g.C = cc(), this.g.S = K(), C.h(la, this.g), this.M._start());
  };

  g.prototype._stop = function () {
    this.l = !1;

    this.M._stop();
  };

  g.prototype._setCustomTrackId = function (a) {
    this.g.ic = a;
    C.h(la, this.g);
  };

  g.prototype.ia = function (d, c, e, g) {
    function h() {
      x || (ua(z), c(ec({
        C: t,
        la: x
      })));
    }

    function k() {
      x || (ua(z), console.log("\u8D85\u65F6\u4E86"), x = u.g.sc = !0, C.h(la, u.g), c(ec({
        C: t,
        la: x
      })));
    }

    O(e) !== "function" && (g = e, e = void 0);
    var l = this.g,
        p = l.S,
        q = l.fc,
        l = l.Dc;
    this.g.Fc = K() - p;
    this.g.S = K();
    var t = this.g.C = cc();

    if (!~q.indexOf(d)) {
      this.g.ma = d;
      C.h(la, this.g);
      var u = this;
      d = $a();
      // debugger;
      var v = ka(this.M.I, 4, this.M)(),
          w = ca();
      "";
      "";
      "";
      d = ka(lb, 1, void 0)(d.concat(w, v));
      var x = this.g.sc = !1,
          z = za(k, +g >= 0 ? +g : l);
      C.h(tb, d, function (b, c) {
        var d = c && c[0];
        return b ? k() : d === 200 ? h() : d === 470 && e ? (ua(z), e(Error("businessKey is illegal"))) : d === 420 ? (d = $a(), d = ka(lb, 1, void 0)(d.concat(w, v)), C.h(tb, d, h)) : k();
      });
    }
  };

  g.prototype._getToken = function (a, b, e, f) {
    var g = this;
    void 0 === b && (b = W);
    this.O() ? this.ia(a, b, e, f) : this.H(function () {
      return g.ia(a, b, e, f);
    });
  };

  g.prototype._getNdInfo = function (a) {
    void 0 === a && (a = W);
    this.O() ? a(nb()) : this.H(function () {
      var b = nb();
      X().m(qc, b);
      a(b);
    });
  };

  var pa;
  w["initWatchman"]["__supportCaptcha__"] ? w["Watchman"] = g : jd();
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

function get_ac_token(l, productNumber, bid) {
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
    "productNumber": productNumber || "YD20160637306799",
    "merged": true,
    "auto": true,
    "timeout": 6000,
    "pn": productNumber || "YD20160637306799"
  }

  var ee = M(new window.window['Watchman'](u));
  for (var infoIndex=0; infoIndex < trace_info.length; infoIndex++){
    let dtaEvent = trace_info[infoIndex]
    window.dispatchEvent(dtaEvent);
    sleep.msleep(15);
  }
  ee.getToken(bid || "07e2387ab53a4d6f930b8d9a9be71bdf", function (e) {
    window['acToken'] = e;
    console.log(e);
  }, 750)
}

console.log(get_ac_token({'s': 'acstatic-dun.126.net', 'v': '2.7.1_a02527b8', 'luv': '2.7.3_eb045ea7', 'as': 'ac.dun.163yun.com', 'ivp': 300000, 'conf': '9ca170a1abeedba16ba1f2ac96ed26f3eafdcfe265aff1bad3ae70e2f4ee83e27fe2e6ee82e226a8aba2cfb43ef1f2ad90f025b6eee183a128e2bca4c3b92ae2f4ee8ee867e2e6fbd1af2aafbba7c3b939f4f0e4c3e26faffef6d3b328e2bdab8aa132f1f000cda161a7b3eedbb43cf0fea586ec2afaed00d1af2aa6bba3c3b93af4f4ee87e863e2e6fdd1b328e2adab8ea132f2f0e4c3f26fabfef6d4b33cf0feab8be270e2e6aa82ef79a7f4ee86e579e2e6aa82ef79a7f4ee86f679e2e6aa82ef79a7f4ee93e880e2e6ffcda169afb2eedbb128e2bda7c3b93bf4f0e4c3ee80a7b3eedbb83cf0fea195e863e2e6fdd1b328e2b3bc86f02afaeb00cda167b8bba7c3b939f4f0e4c3f366e2e6eebac73af4effad1b539f5ed00d7b633fbfee4c3e870a1fef695f17fa7f4ee83ef2afafeeecda163b6b0eedbb23cf4f000d1af2aa8acba91a132fceafcd1b33cf4f0e4c3f780adfef6d3b33cf4f4ee86e47fe2e6aa82ef79a7f4ee82e780e2e6fbd1af2aa7acadc3b96ea3b4bd86af2ab8bdbcc3b93cbf', 'ass': ['ac.dun.163.com', 'ac.dun.163yun.com'], 'ss': ['acstatic-dun.126.net', 'acstatic.dun.163yun.com'], 'cvk': 'c67fcb4b8e3f931ced40b4d3c7a2cd9c'}));