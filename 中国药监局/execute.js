require("fake-indexeddb/auto");
var openDatabase = require('websql');
var fs = require('fs');
// npm install cookie
var cookieIns = require('cookie');
var canvas = require('canvas');
var dtaEventTarget = require('./simpleEventTarget').EventTarget
var navigator = require("./navigator").navigator;
var localStorage = require('./localStorage');
var sessionStorage = require('./sessionStorage');
var eval_js = require('./eval_js').eval_js
var fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const jsdom = require("jsdom");

index_code = fs.readFileSync("first_index.html", {
    encoding: "utf-8"
});
const {JSDOM} = jsdom;
const dom = new JSDOM(index_code, {
    url: "https://www.nmpa.gov.cn/xxgk/ggtg/index.html",
    referrer: "https://www.baidu.com/",
    contentType: "text/html",
    includeNodeLocations: true,
    pretendToBeVisual: true,
    resources: "usable",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0",
});

setTimeout.toString = function setTimeoutToString() {
    return 'function setTimeout() { [native code] }'
}
setInterval.toString = function setIntervalToString() {
    return 'function setInterval() { [native code] }'
}

let myChrome = {
    app: {
        InstallState: {},
        RunningState: {},
        getDetails: function () {
        },
        getIsInstalled: function () {
        },
        installState: function () {
        },
        isInstalled: false,
        runningState: function () {
        },

    },
    csi: function () {
        return {
            onloadT: new Date().getTime(),
            pageT: new Date().getTime() - timestamp,
            startE: new Date().getTime() - 356,
            tran: 15
        }
    },
    loadTimes: function () {
        return {
            commitLoadTime: new Date().getTime() - 356 + 127,
            connectionInfo: "h2",
            finishDocumentLoadTime: new Date().getTime(),
            finishLoadTime: new Date().getTime() + 124,
            firstPaintAfterLoadTime: 0,
            firstPaintTime: new Date().getTime() - 109,
            navigationType: "Other",
            npnNegotiatedProtocol: "h2",
            requestTime: new Date().getTime() - 356,
            startLoadTime: new Date().getTime() - 356,
            wasAlternateProtocolAvailable: false,
            wasFetchedViaSpdy: true,
            wasNpnNegotiated: true,


        }
    },
    runtime: {
        OnInstalledReason: {},
        OnRestartRequiredReason: {},
        PlatformArch: {},
        PlatformNaclArch: {},
        PlatformOs: {},
        RequestUpdateCheckStatus: {},
        connect: function (extensionId, connectInfo) {
            if (typeof extensionId !== 'number') {
                throw TypeError("Error in invocation of runtime.connect(optional string extensionId, optional object connectInfo): chrome.runtime.connect() called from a webpage must specify an Extension ID (string) for its first argument.")
            }
        },
        id: undefined,
        sendMessage: function () {
        },
    }
};

var window = global;
Object.setPrototypeOf(window, dtaEventTarget.prototype);
window.HTMLFormElement = dom.window.HTMLFormElement;
window.HTMLFrameSetElement = dom.window.HTMLFrameSetElement;
Object.defineProperty(window.HTMLFrameSetElement.prototype, 'hasPointerCapture', {
    value: function (){},
    enumerable: true
})
window.HTMLDocument = dom.window.HTMLDocument;
window.HTMLElement = dom.window.HTMLElement;
window.Math = Math;
window.parseFloat = parseFloat;
window.parseInt = parseInt;
window.isNaN = isNaN;
window.decodeURI = decodeURI;
window.decodeURIComponent = decodeURIComponent;
window.encodeURI = encodeURI;
window.escape = escape;
window.unescape = unescape;
window.eval = eval;
window.Date = Date;
window.getComputedStyle = function () {
};
window.toString = function windowToString() {
    return "[object Window]"
};
window.SVGPatternElement = function SVGPatternElement(){};
window.SVGGraphicsElement = function SVGGraphicsElement(){};
window.CloseEvent = function CloseEvent(){};
window.CanvasRenderingContext2D = canvas.CanvasRenderingContext2D;
window.BeforeInstallPromptEvent = function(){};
window.webkitRequestFileSystem = function() {};
window.performance = {
    "eventCounts": {},
    "memory": {},
    "navigation": {},
    "onresourcetimingbufferfull": null,
    "timeOrigin": "",
    "timing": {}
}
window.onmessage = null;
window.onerror = null;
window.external = dom.window.external;
window.defaultStatus = "";
window.chrome = myChrome;
window.SpeechSynthesisUtterance = function () {
};
window.ScreenOrientation = function () {
};
window.PerformancePaintTiming = function () {
};
window.OffscreenCanvasRenderingContext2D = function () {
};
window.MediaEncryptedEvent = function () {
};
window.Notification = function () {
};
window.Intl = dom.window.Intl;
window.CDATASection = dom.window.CDATASection;
HTMLFrameSetElement = function () {
};
HTMLFrameSetElement.prototype = {
    "hasPointerCapture": function () {
    },
    "webkitRequestFullScreen": function () {
    },
}
window.HTMLFrameSetElement = HTMLFrameSetElement;
Path2D = function () {
};
Path2D.prototype = {
    "addPath": function () {
    },
    "arc": function () {
    },
    "arcTo": function () {
    },
    "bezierCurveTo": function () {
    },
    "closePath": function () {
    },
    "ellipse": function () {
    },
    "lineTo": function () {
    },
    "moveTo": function () {
    },
    "quadraticCurveTo": function () {
    },
    "rect": function () {
    }
}
window.Path2D = Path2D;
SourceBuffer = function () {
};
SourceBuffer.prototype = {
    "changeType": function () {
    },
}
window.SourceBuffer = SourceBuffer;
TextTrackList = function () {
};
TextTrackList.prototype = {
    "getTrackById": function () {
    },
}
window.TextTrackList = TextTrackList;

let head = new Object();
head.title = "";
head.lang = "";
head.translate = true;
head.dir = "";
head.hidden = false;
head.id = "";
head.innerHTML = `\n<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n<\!--[if lt IE 9]><\script r='m'>document.createElement("section")<\/script><![endif]-->`;
head.innerText = "\n\n";
head.inputMode = ""
head.appendChild = function (name) {
    return {
        "name": name,
        "child": [],
        "appendChild": function (child) {
            this.child.push(child)
        }
    }
};

document = new Object();
Object.setPrototypeOf(document, dtaEventTarget.prototype)
document.exitFullscreen = function exitFullscreen(){};
document.write = function (text) {
    // let node = dom.window.document.createTextNode(text);
    return dom.window.document.write("\n" + text + "\n\n\n\n")
}
document.documentElement = dom.window.document.documentElement;
document.body = dom.window.document.body;
document.head = head;
document.charset = "UTF-8";
document.characterSet = "UTF-8"
document.scripts = [];
document.onmousemove = null;
document.onselectionchange = null;
document.scrollingElement = {
    "style": {"fontVariantNumeric": ""}
}
document.createElement = function (name) {
    let family = ['Verdana', 'Helvetica Neue LT Pro 35 Thin', 'tahoma', 'verdana', 'times new roman', 'Courier New',
        'Microsoft Himalaya', 'helvetica', 'LG-FZKaTong-M19-V2.2', 'Georgia', 'georgia', 'courier new', 'Arial',
        'arial', 'cursive', 'times', 'fantasy', 'courier', 'serif', 'STXingkai', 'monospace', 'Times New Roman']
    let element = dom.window.document.createElement(name);
    Object.defineProperties(dom.window.HTMLElement.prototype, {
        offsetLeft: {
            get: function () {
                return 8;
            }
        },
        offsetTop: {
            get: function () {
                return 8;
            }
        },
        offsetHeight: {
            get: function () {
                if (family.includes(this.style.fontFamily)) {
                    return 0
                } else {
                    return 151;
                }
            }
        },
        offsetWidth: {
            get: function () {
                if (family.includes(this.style.fontFamily)) {
                    return 0
                } else {
                    return 1327;
                }

            }
        }
    });
    return element
};
document.createElement.toString = function createElementToString() {
    return 'function createElement() { [native code] }'
};
document.getElementsByTagName = function (name) {
    // console.log("getElementByTagName: " + name + " result is: " + dom.window.document.getElementsByTagName(name).length);
    return dom.window.document.getElementsByTagName(name);
};
document.getElementById = function (id) {
    return dom.window.document.getElementById(id);
};

// 不能采取document.$cookie的方式来定义 代码中有检查属性的第一个字符是否是$
// document.cookie = dom.window.document.cookie
let CookieStore = Object;
Object.defineProperty(document, 'cookie', {
    get: function () {
        let cookieStr = "";
        for (let name in CookieStore) {
            cookieStr += name + "=" + CookieStore[name] + "; ";
        }
        return cookieStr.slice(0, cookieStr.length - 2)
    },
    set: function (value) {
        Object.assign(CookieStore, cookieIns.parse(value))
    }
});

window.document = document;

let location = new Object();
location.port = "";
location.protocol = "https:",
location.href = "https://www.nmpa.gov.cn/xxgk/ggtg/index.html",
location.pathname = "/xxgk/ggtg/index.html",
location.host = "www.nmpa.gov.cn",
location.hostname = "www.nmpa.gov.cn",
location.origin = "https://www.nmpa.gov.cn";
location.replace = String.prototype.replace;
window.location = location;

window.navigator = navigator;
window.clientInformation = Object.assign(navigator, {})

history = new Object();
history.length = 5;
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
screen.pixelDepth = 24;
screen.orientation = {"angle": 0, "onchange": null, "type": "landscape-primary"};
window.screen = screen;

window.openDatabase = openDatabase

window.indexedDB = indexedDB
window.name = ""
window.fetch = fetch;
fetch.toString = function fetchToString() {
    return 'function fetch() { [native code] }'
};
window.sessionStorage = sessionStorage;
window.localStorage = localStorage;
window.XMLHttpRequest = dom.window.XMLHttpRequest;
window.DOMParser = dom.window.DOMParser;
window.outerHeight = 1040;
window.outerWidth = 1920;
window.pageXOffset = 0;
window.pageYOffset = 300;
window.screenLeft = 1920;
window.screenTop = 0;
window.screenX = 1920;
window.screenY = 0;
window.scrollX = 0;
window.scrollY = 300;
window.parent = window;
window.top = window;
window.self = window;
window.window = window;

window['crypto'] = require('crypto-js');

js_code = fs.readFileSync("first_script.js", {
    encoding: "utf-8"
});

let rawstringify = JSON.stringify;
JSON.stringify = function (Object) {
    if ((Object?.value ?? Object) === global) {
        return "global"
    } else {
        return rawstringify(Object)
    }
}

function checkproxy() {
    //Object.keys(window)
    window.a = {
        "b": {
            "c": {
                "d": 123
            }
        }
    }
    window.a.b.c.d = 456
    window.a.b
    window.btoa("123")
    window.atob.name
    "c" in window.a
    delete window.a.b
    Object.defineProperty(window, "b", {
        value: "bbb"
    })
    Object.getOwnPropertyDescriptor(window, "b")
    Object.getPrototypeOf(window)
    Object.setPrototypeOf(window, {"dta": "dta"})
    // for (let windowKey in window) {
    //     windowKey
    // }
    Object.preventExtensions(window)
    Object.isExtensible(window)
}

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
            console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [${argArray}], result is [${getPrintShow(result)}].`)
            return result
        },
        construct(target, argArray, newTarget) {
            var result = Reflect.construct(target, argArray, newTarget)
            console.log(`[${WatchName}] construct function name is [${target.name}], argArray is [${argArray}], result is [${getPrintShow(result)}].`)
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
                    console.log(`[${WatchName}] getting propKey is [${getPrintShow(propKey)}] , it is function`)
                    return new Proxy(result, getMethodHandler(WatchName))
                } else {
                    console.log(`[${WatchName}] getting propKey is [${propKey.toString()}], result is [${getPrintShow(result)}]`);
                }
                // 不注释的话，会遍历对象的所有key
                // return new Proxy(result, getObjhandler(`${WatchName}.${getPrintShow(result)}`))
            }
            console.log(`[${WatchName}] getting propKey is [${propKey?.description ?? propKey}], result is [${getPrintShow(result)}]`);
            return result;
        },
        set(target, propKey, value, receiver) {
            if (value instanceof Object) {
                console.log(`[${WatchName}] setting propKey is [${propKey}], value is [${getPrintShow(value)}]`);
            } else {
                console.log(`[${WatchName}] setting propKey is [${propKey}], value is [${value}]`);
            }
            return Reflect.set(target, propKey, value, receiver);
        },
        has(target, propKey) {
            var result = Reflect.has(target, propKey);
            console.log(`[${WatchName}] has propKey [${propKey}], result is [${getPrintShow(result)}]`)
            return result;
        },
        deleteProperty(target, propKey) {
            var result = Reflect.deleteProperty(target, propKey);
            console.log(`[${WatchName}] delete propKey [${propKey}], result is [${getPrintShow(result)}]`)
            return result;
        },
        getOwnPropertyDescriptor(target, propKey) {
            var result = Reflect.getOwnPropertyDescriptor(target, propKey);
            console.log(`[${WatchName}] getOwnPropertyDescriptor  propKey [${propKey.toString()}] result is [${getPrintShow(result)}]`)
            return result;
        },
        defineProperty(target, propKey, attributes) {
            var result = Reflect.defineProperty(target, propKey, attributes);
            console.log(`[${WatchName}] defineProperty propKey [${propKey}] attributes is [${getPrintShow(attributes)}], result is [${getPrintShow(result)}]`)
            return result
        },
        getPrototypeOf(target) {
            var result = Reflect.getPrototypeOf(target)
            console.log(`[${WatchName}] getPrototypeOf result is [${getPrintShow(result)}]`)
            return result;
        },
        setPrototypeOf(target, proto) {
            console.log(`[${WatchName}] setPrototypeOf proto is [${getPrintShow(proto)}]`)
            return Reflect.setPrototypeOf(target, proto);
        },
        preventExtensions(target) {
            console.log(`[${WatchName}] preventExtensions`)
            return Reflect.preventExtensions(target);
        },
        isExtensible(target) {
            var result = Reflect.isExtensible(target)
            console.log(`[${WatchName}] isExtensible, result is [${result}]`)
            return result;
        },
        ownKeys(target) {
            var result = Reflect.ownKeys(target)
            console.log(`[${WatchName}] invoke ownkeys, result is [${getPrintShow(result)}]`)
            return result
        },
        apply(target, thisArg, argArray) {
            let result = Reflect.apply(target, thisArg, argArray)
            console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [${argArray}], result is [${getPrintShow(result)}].`)
            return result
        },
        construct(target, argArray, newTarget) {
            var result = Reflect.construct(target, argArray, newTarget)
            console.log(`[${WatchName}] construct function name is [${target.name}], argArray is [${argArray}], result is [${getPrintShow(result)}].`)
            return result;
        }
    }
    return handler;
}

// navigator = new Proxy(Object.create(navigator), getObjhandler("navigator"));
// screen = new Proxy(Object.create(screen), getObjhandler("screen"));
// history = new Proxy(history, getObjhandler("history"));
// location = new Proxy(location, getObjhandler("location"));
// document = new Proxy(document, getObjhandler("document"));
// window = new Proxy(Object.assign(global, window), getObjhandler("window"));

eval(js_code);


document.cookie = 'acw_tc=3ccdc15a16342038356061354e1187cae6417d19402d3da0e0052a53d2d0eb; neCYtZEjo8GmO=5FwZvodhNVFovgd9PdP1sLlI6NPRhz9BKfW7bSDIbkjizBbhWmDhs1d8cLMvMSTHeBaxUkYYGGUwLST..0Z8x_q';
(function () {
    var _$f5 = 0,
        _$0g = [[4, 6, 7, 3, 0, 2, 1, 5], [51, 98, 90, 38, 15, 23, 14, 56, 42, 53, 43, 53, 47, 64, 0, 13, 0, 53, 76, 74, 97, 22, 46, 9, 60, 75, 66, 61, 45, 70, 53, 28, 58, 33, 32, 83, 50, 52, 10, 71, 34, 11, 52, 100, 18, 54, 81, 57, 52, 49, 78, 84, 38, 55, 52, 12, 40, 88, 5, 85, 95, 37, 3, 52, 82, 91, 52, 1, 48, 79, 26, 53, 41, 99, 31, 79, 17, 6, 53, 59, 79, 53, 30, 101, 38, 2, 4, 16, 92, 80, 53, 65, 67, 87, 67, 44, 68, 24, 7, 96, 39, 86, 63, 94, 35, 20, 69, 102, 93, 27, 72, 73, 77, 29, 36, 25, 62, 21, 89, 19, 8, 53], [16, 2, 31, 11, 18, 12, 30, 1, 28, 14, 6, 19, 6, 8, 25, 28, 23, 20, 5, 9, 29, 4, 26, 0, 7, 24, 7, 15, 7, 27, 10, 27, 7, 33, 22, 7, 21, 7, 32, 3, 13, 17, 28], [18, 39, 20, 36, 40, 43, 9, 32, 5, 38, 29, 41, 35, 34, 3, 49, 21, 6, 25, 38, 42, 2, 45, 33, 46, 1, 47, 30, 2, 22, 10, 44, 26, 1, 27, 14, 23, 37, 27, 19, 7, 0, 7, 17, 8, 38, 7, 31, 8, 34, 13, 24, 16, 28, 4, 11, 0, 8, 31, 13, 17, 12, 15, 48, 40], [3, 1, 10, 31, 9, 13, 28, 18, 36, 5, 12, 34, 29, 4, 6, 34, 25, 8, 6, 22, 30, 35, 32, 19, 14, 21, 26, 22, 0, 2, 33, 20, 11, 19, 15, 26, 27, 0, 34, 7, 23, 16, 34, 24, 5, 17, 34]];

    function _$9O(_$7R, _$bK) {
        return _$89.Math.abs(_$7R) % _$bK;
    }

    function _$ve(_$fT) {
        _$fT[_$9O(_$wG() - _$fT[_$9O(_$LC(), 16)], 16)] = _$fT[_$9O(_$ap() + _$VP(), 16)];
        _$fT[14] = _$wG() - _$fT[_$9O(_$LC(), 16)];
        if (_$ap() - _$fT[_$9O(_$Ya(), 16)]) {
            if (_$wG() + _$_P()) {
                _$fT[6] = _$tk();
            }
        }
        _$Fz(_$fT);
        _$fT[2] = _$7J() - _$fT[_$9O(_$i_(), 16)];
        var _$Lu = _$ap();
        if (_$NF() - _$fT[_$9O(_$tk(), 16)]) {
            _$fT[_$9O(_$7J() + _$f6(), 16)] = _$XY(_$fT);
        }
        _$Vv(_$fT);
        return _$41(_$fT);
    }

    function _$wG() {
        return 5
    }

    function _$LC() {
        return 8
    }

    function _$ap() {
        return 13
    }

    function _$VP() {
        return 3
    }

    function _$Ya() {
        return 0
    }

    function _$_P() {
        return 11
    }

    function _$tk() {
        return 4
    }

    function _$f6() {
        return 15
    }

    function _$3d() {
        return 10
    }

    function _$yE(_$fT) {
        var _$Lu = _$f6();
        var _$1a = _$wG();
        _$fT[11] = _$NF();
        var _$Ia = _$ty();
        var _$Ia = _$Ya();
        return _$RX();
    }

    function _$NF() {
        return 1
    }

    function _$ty() {
        return 2
    }

    function _$RX() {
        return 14
    }

    function _$Fz(_$fT) {
        _$Hl(_$fT);
        _$fT[_$9O(_$fT[_$9O(_$i_(), 16)], 16)] = _$QR(_$fT);
        _$fT[_$9O(_$lk(_$fT), 16)] = _$uM(_$fT);
        return _$rb(_$fT);
    }

    function _$Hl(_$fT) {
        _$4n(_$fT);
        _$w6(_$fT);
        var _$Ia = _$RX();
        if (_$LC()) {
            _$fT[_$9O(_$iD(), 16)] = _$ap();
        }
        _$HZ(_$fT);
        return _$ap() + _$VP();
    }

    function _$4n(_$fT) {
        _$fT[2] = _$Ya();
        var _$1a = _$wG();
        var _$Ia = _$_P();
        _$fT[1] = _$iD();
        return _$ap();
    }

    function _$iD() {
        return 7
    }

    function _$w6(_$fT) {
        var _$1a = _$i_();
        var _$Ia = _$3d();
        _$fT[8] = _$VQ();
        _$fT[4] = _$ty();
        _$fT[_$9O(_$7J(), 16)] = _$f6();
        return _$wG();
    }

    function _$i_() {
        return 12
    }

    function _$VQ() {
        return 6
    }

    function _$7J() {
        return 9
    }

    function _$HZ(_$fT) {
        var _$Lu = _$iD();
        var _$Ia = _$ap();
        var _$1a = _$RX();
        var _$Lu = _$i_();
        _$fT[10] = _$LC();
        return _$VQ();
    }

    function _$QR(_$fT) {
        var _$Lu = _$iD();
        var _$Ia = _$ap();
        _$fT[_$9O(_$Ya(), 16)] = _$RX();
        var _$Ia = _$_P();
        var _$1a = _$NF();
        return _$iD();
    }

    function _$lk(_$fT) {
        var _$Ia = _$f6();
        var _$Ia = _$wG();
        _$fT[_$9O(_$LC(), 16)] = _$VQ();
        _$fT[4] = _$ty();
        return _$Ya();
    }

    function _$uM(_$fT) {
        _$fT[12] = _$3d();
        _$fT[8] = _$VQ();
        _$fT[4] = _$ty();
        return _$Ya();
    }

    function _$rb(_$fT) {
        if (_$wG()) {
            _$fT[_$9O(_$LC(), 16)] = _$VQ();
        }
        _$En(_$fT);
        _$z9(_$fT);
        var _$1a = _$iD();
        if (_$3d()) {
            var _$1a = _$ap();
        }
        _$fT[12] = _$3d();
        return _$NF() + _$iD();
    }

    function _$En(_$fT) {
        _$fT[15] = _$wG();
        var _$1a = _$VQ();
        var _$Ia = _$tk();
        _$fT[_$9O(_$VP(), 16)] = _$7J();
        var _$1a = _$3d();
        var _$Lu = _$LC();
        return _$VQ();
    }

    function _$z9(_$fT) {
        var _$1a = _$7J();
        var _$Lu = _$f6();
        var _$Lu = _$LC();
        var _$1a = _$VQ();
        var _$Ia = _$VP();
        var _$Ia = _$7J();
        return _$f6();
    }

    function _$XY(_$fT) {
        _$fT[8] = _$VQ();
        var _$1a = _$VP();
        var _$Lu = _$7J();
        _$fT[_$9O(_$i_(), 16)] = _$3d();
        return _$LC();
    }

    function _$Vv(_$fT) {
        _$fT[12] = _$3v(_$fT);
        _$fT[_$9O(_$eG(_$fT), 16)] = _$wG();
        if (_$NF() + _$iD()) {
            _$fT[2] = _$Ya();
        }
        var _$Lu = _$NF();
        var _$1a = _$fT[_$9O(_$tk(), 16)];
        var _$Ia = _$RX();
        if (_$fT[_$9O(_$Ya(), 16)]) {
            if (_$f6()) {
                _$fT[_$9O(_$3d(), 16)] = _$LC();
            }
        }
        return _$DQ(_$fT);
    }

    function _$3v(_$fT) {
        _$fT[_$9O(_$NF(), 16)] = _$iD();
        var _$1a = _$Ya();
        var _$Lu = _$RX();
        var _$Lu = _$_P();
        var _$1a = _$NF();
        return _$iD();
    }

    function _$eG(_$fT) {
        var _$1a = _$f6();
        var _$1a = _$wG();
        var _$Ia = _$VQ();
        var _$Lu = _$tk();
        _$fT[_$9O(_$VP(), 16)] = _$7J();
        return _$f6();
    }

    function _$DQ(_$fT) {
        _$QO(_$fT);
        _$B8(_$fT);
        _$fT[14] = _$i_();
        return _$wh(_$fT);
    }

    function _$QO(_$fT) {
        _$fT[_$9O(_$iD(), 16)] = _$ap();
        var _$Lu = _$RX();
        var _$Ia = _$i_();
        var _$Ia = _$LC();
        return _$VQ();
    }

    function _$B8(_$fT) {
        var _$Lu = _$7J();
        var _$Ia = _$f6();
        _$fT[5] = _$_P();
        var _$1a = _$tk();
        var _$Lu = _$ty();
        return _$Ya();
    }

    function _$wh(_$fT) {
        _$fT[_$9O(_$NF(), 16)] = _$iD();
        _$fT[13] = _$VP();
        var _$Lu = _$i_();
        var _$Lu = _$3d();
        return _$LC();
    }

    function _$41(_$fT) {
        _$LR(_$fT);
        _$fT[6] = _$ap() + _$VP();
        _$Ua(_$fT);
        _$yg(_$fT);
        _$fT[2] = _$7J() + _$f6();
        return _$Hh(_$fT);
    }

    function _$LR(_$fT) {
        _$fT[2] = _$Ya();
        if (_$f6()) {
            _$fT[_$9O(_$3d(), 16)] = _$LC();
        }
        _$fT[3] = _$7J();
        if (_$i_()) {
            _$fT[_$9O(_$_P(), 16)] = _$NF();
        }
        _$fT[0] = _$RX();
        return _$wG() + _$_P();
    }

    function _$Ua(_$fT) {
        _$fT[_$9O(_$wG(), 16)] = _$_P();
        _$fT[_$9O(_$VQ(), 16)] = _$tk();
        var _$1a = _$7J();
        var _$Ia = _$f6();
        _$fT[_$9O(_$3d(), 16)] = _$LC();
        return _$9m(_$fT);
    }

    function _$9m(_$fT) {
        var _$1a = _$VP();
        var _$Lu = _$7J();
        var _$Ia = _$3d();
        var _$1a = _$LC();
        _$fT[_$9O(_$iD(), 16)] = _$ap();
        return _$VP();
    }

    function _$yg(_$fT) {
        _$fT[_$9O(_$i_(), 16)] = _$3d();
        var _$Ia = _$iD();
        var _$Ia = _$ap();
        var _$Lu = _$NF();
        if (_$Ya()) {
            _$fT[14] = _$i_();
        }
        if (_$ty()) {
            var _$Lu = _$RX();
        }
        return _$NF() + _$iD();
    }

    function _$Hh(_$fT) {
        _$fT[8] = _$VQ();
        var _$Ia = _$RX();
        if (_$ap()) {
            var _$Lu = _$i_();
        }
        var _$Ia = _$ty();
        var _$Ia = _$Ya();
        return _$Ga(_$fT);
    }

    function _$Ga(_$fT) {
        var _$1a = _$_P();
        var _$Lu = _$NF();
        _$fT[_$9O(_$tk(), 16)] = _$ty();
        _$fT[0] = _$RX();
        return _$i_();
    }

    var _$em, _$zA, _$89, _$Ig, _$vw, _$y6, _$$F, _$ed, _$ve;
    var _$Dp, _$x0, _$5s = _$f5, _$4k = _$0g[0];
    while (1) {
        _$x0 = _$4k[_$5s++];
        if (_$x0 < 4) {
            if (_$x0 < 1) {
                if (!_$Dp) _$5s += 1;
            } else if (_$x0 < 2) {
                _$dp(0);
            } else if (_$x0 < 3) {
                _$ed = _$89['$_ts'] = {};
            } else {
                _$Dp = !_$ed;
            }
        } else {
            if (_$x0 < 5) {
                _$em = [4, 16, 64, 256, 1024, 4096, 16384, 65536];
            } else if (_$x0 < 6) {
                return;
            } else if (_$x0 < 7) {
                _$89 = window, _$Ig = String, _$vw = Array, _$y6 = document, _$$F = Date;
            } else {
                _$ed = _$89['$_ts'];
            }
        }
    }

    function _$dp(_$wG, _$7R) {
        function _$Qt() {
            var _$9O = _$PG.charCodeAt(_$Qx++), _$f5;
            if (_$9O < 128) {
                return _$9O;
            } else if (_$9O < 251) {
                return _$9O - 32;
            } else if (_$9O === 251) {
                return 0;
            } else if (_$9O === 254) {
                _$9O = _$PG.charCodeAt(_$Qx++);
                if (_$9O >= 128) _$9O -= 32;
                _$f5 = _$PG.charCodeAt(_$Qx++);
                if (_$f5 >= 128) _$f5 -= 32;
                return _$9O * 219 + _$f5;
            } else if (_$9O === 255) {
                _$9O = _$PG.charCodeAt(_$Qx++);
                if (_$9O >= 128) _$9O -= 32;
                _$f5 = _$PG.charCodeAt(_$Qx++);
                if (_$f5 >= 128) _$f5 -= 32;
                _$9O = _$9O * 219 * 219 + _$f5 * 219;
                _$f5 = _$PG.charCodeAt(_$Qx++);
                if (_$f5 >= 128) _$f5 -= 32;
                return _$9O + _$f5;
            } else if (_$9O === 252) {
                _$f5 = _$PG.charCodeAt(_$Qx++);
                if (_$f5 >= 128) _$f5 -= 32;
                return -_$f5;
            } else if (_$9O === 253) {
                _$9O = _$PG.charCodeAt(_$Qx++);
                if (_$9O >= 128) _$9O -= 32;
                _$f5 = _$PG.charCodeAt(_$Qx++);
                if (_$f5 >= 128) _$f5 -= 32;
                return _$9O * -219 - _$f5;
            } else {
            }
        }

        var _$67, _$7v, _$Lu, _$IL, _$PG, _$UJ, _$1u, _$9O, _$f5, _$5s, _$Dp, _$B9, _$x0, _$4k, _$fT, _$Pi, _$Yg, _$Ia,
            _$1a, _$Qx;
        var _$ap, _$Ya, _$LC = _$wG, _$_P = _$0g[1];
        while (1) {
            _$Ya = _$_P[_$LC++];
            if (_$Ya < 64) {
                if (_$Ya < 16) {
                    if (_$Ya < 4) {
                        if (_$Ya < 1) {
                            _$LC += 78;
                        } else if (_$Ya < 2) {
                            var _$Lu = _$dp(10);
                        } else if (_$Ya < 3) {
                            _$9O = _$89.execScript(_$7R);
                        } else {
                            _$ed._$f5 -= _$dp(10);
                        }
                    } else if (_$Ya < 8) {
                        if (_$Ya < 5) {
                            _$LC += 2;
                        } else if (_$Ya < 6) {
                            for (_$Ia = 0; _$Ia < _$Yg; _$Ia++) {
                                _$lM(16, _$Ia, _$Pi);
                            }
                        } else if (_$Ya < 7) {
                            return 0;
                        } else {
                            _$7R._$OB = "_$f6";
                        }
                    } else if (_$Ya < 12) {
                        if (_$Ya < 9) {
                            _$7R._$Yg = "_$f2";
                        } else if (_$Ya < 10) {
                            _$9O += "DEsF4A7mID7UWrrjUv7_KABqLzFxgXp$yTEvnxJ83Ev7TP3DT7tWz21mALqN_VGx9D_IY1xaftqsf1FiexIVxlpAO2ruSPOm27rRGF6ULDjzwo8ytXqBb5cbIfKtCmWbtiTO9Ym$8ccJZcqcBbSpQNFBfsKGNzRnECOt3zmggClyfWTSKd8_xBjpOwsi";
                        } else if (_$Ya < 11) {
                            var _$1u = _$ed.aebi = [];
                        } else {
                            var _$Qx = 0;
                        }
                    } else {
                        if (_$Ya < 13) {
                            _$Qx += _$fT;
                        } else if (_$Ya < 14) {
                            _$7R._$89 = 215;
                        } else if (_$Ya < 15) {
                            _$lM(0);
                        } else {
                            _$dp(31);
                        }
                    }
                } else if (_$Ya < 32) {
                    if (_$Ya < 20) {
                        if (_$Ya < 17) {
                            _$f5 = _$89.eval;
                        } else if (_$Ya < 18) {
                            return 1;
                        } else if (_$Ya < 19) {
                            var _$x0 = _$Qt();
                        } else {
                            _$7R._$_J = "_$Sy";
                        }
                    } else if (_$Ya < 24) {
                        if (_$Ya < 21) {
                            _$7R._$LC = "_$x0";
                        } else if (_$Ya < 22) {
                            _$7R._$uU = "_$_a";
                        } else if (_$Ya < 23) {
                            _$9O += "nCrtRBFa6VDiT03WydODrnBiXhxThXRyYUUOcSRgoI4SNklll82A2XdAuU_J2aBJ$V56vMF8u38VMm2sSYWw3FQUs7MjULlcN4f88RWvHuKqtI_BfpHd_yDRZ5qWOpEcCjAnc3HwON6u0pRz$s53BkFGKmScj5D6d0oviaPuzVfwvpiCxUIT8oLPOYqF";
                        } else {
                            _$LC += 1;
                        }
                    } else if (_$Ya < 28) {
                        if (_$Ya < 25) {
                            _$7R._$7X = "_$tk";
                        } else if (_$Ya < 26) {
                            _$7R._$dA = "_$we";
                        } else if (_$Ya < 27) {
                            _$ed._$2A = 1;
                        } else {
                            _$7R._$ax = "RvXK58xsSPA";
                        }
                    } else {
                        if (_$Ya < 29) {
                            _$ed._$f5 = new _$$F().getTime();
                        } else if (_$Ya < 30) {
                            _$7R._$2X = "_$46";
                        } else if (_$Ya < 31) {
                            var _$9O;
                        } else {
                            _$ap = _$9O !== "functioneval(){[nativecode]}";
                        }
                    }
                } else if (_$Ya < 48) {
                    if (_$Ya < 36) {
                        if (_$Ya < 33) {
                            var _$UJ = _$ed._$aV;
                        } else if (_$Ya < 34) {
                            _$ed["a670748"] = _$zA;
                        } else if (_$Ya < 35) {
                            var _$Dp = _$PG.length;
                        } else {
                            _$7R._$ap = "_$Fz";
                        }
                    } else if (_$Ya < 40) {
                        if (_$Ya < 37) {
                            _$7R._$fT = "_$YE";
                        } else if (_$Ya < 38) {
                            var _$1a = _$Pi.join('');
                        } else if (_$Ya < 39) {
                            if (!_$ap) _$LC += 2;
                        } else {
                            _$7R._$4t = "_$yE";
                        }
                    } else if (_$Ya < 44) {
                        if (_$Ya < 41) {
                            var _$Pi = [];
                        } else if (_$Ya < 42) {
                            var _$9O = _$89.eval.toString();
                        } else if (_$Ya < 43) {
                            _$89['$_ts'].l__ = _$ed.l__;
                        } else {
                            return new _$$F().getTime();
                        }
                    } else {
                        if (_$Ya < 45) {
                            _$7R._$P5 = 1;
                        } else if (_$Ya < 46) {
                            _$9O += "scxEeFNNuCVXZgFQBSeXHRvsddHgMfMS1B9h3r7SZLPPZ28UEXguylBdOlJU1lQqRLagxk05MLrY6DE8x_0QBQt5IsuncNYIOE$CYqJiS8kVDAfnyQeoupXuF9DVq4hfJTkfIChLZZduN6DS6A$zbUEH9eJJq$6yZMD3BLrPL8TGkLwRpRnTn_ElzlJYUD9F";
                        } else if (_$Ya < 47) {
                            _$9O += "L_Gp4mCNdnCPVbHe_3bxncPOK78ia59LJ$NiDb0U9JYZTaPFBEp6slYcnZjl2zLvaKPNynMdzjk3l$UkHkImL57GM5W_wg0K6wooFqyjMtoS45hGB_I6WdGM$3b$leLxXCfZR5QEtK9wdhHOjsWjsM1_m70ZXJDLcvZtGykDxhfk9dbvGHCcnGI3C$kz";
                        } else {
                            var _$9O, _$f5, _$5s = _$7R.length, _$Dp = new _$vw(_$5s / 2), _$B9 = '_$';
                        }
                    }
                } else {
                    if (_$Ya < 52) {
                        if (_$Ya < 49) {
                            _$ap = _$Lu - _$9O > 12000;
                        } else if (_$Ya < 50) {
                            _$Yg = _$Qt();
                        } else if (_$Ya < 51) {
                            var _$f5 = _$dp(10);
                        } else {
                            _$ed._$aV = _$dp(18);
                        }
                    } else if (_$Ya < 56) {
                        if (_$Ya < 53) {
                        } else if (_$Ya < 54) {
                            return;
                        } else if (_$Ya < 55) {
                            var _$67 = _$Qt();
                        } else {
                            _$7v = _$PG.substr(_$Qx, _$fT).split(_$Ig.fromCharCode(255));
                        }
                    } else if (_$Ya < 60) {
                        if (_$Ya < 57) {
                            _$89['$_ts'] = {};
                        } else if (_$Ya < 58) {
                            var _$4k = _$Qt();
                        } else if (_$Ya < 59) {
                            var _$PG = _$ed["a670748"];
                        } else {
                            _$ap = _$7R === undefined || _$7R === "";
                        }
                    } else {
                        if (_$Ya < 61) {
                            _$9O += "ZyZTk6Nyh2OPW7YmENUhboPDvogWBHOksNrWTcxDXyebmUHHZREGbi2To6zBzvd8WCKDT1z$RUx7A6lsrMwlwd2RSOXRlPi3Hq3X3HJ1PT8CkxJnQKUfmyqvuTFmxOQ$B2b10sGiGc31PriNqMYb7WZ4hiN2WYrrZns3872hZos9Emit4lmY8wV978xv";
                        } else if (_$Ya < 62) {
                            _$9O += "6Q5Oli3j7ZUUhoL39taLMiGt7hzopsDkqkibThJdJFVAcDZDp1mntH3cobmF4VW6345UEEf$yq4cYOM9z34DbnnX5g7MxH5YBlfikavI8MKfR35ly8DuaiYGUWycqlbzjo83EgBc$8Q7lTNhorGUv33pl2g_sqRouOeEuNcC4vxtQlGI0BbE5RVHXcuo";
                        } else if (_$Ya < 63) {
                            _$7R._$Pi = "_$w8";
                        } else {
                            _$7R._$w4 = "_$ty";
                        }
                    }
                }
            } else {
                if (_$Ya < 80) {
                    if (_$Ya < 68) {
                        if (_$Ya < 65) {
                            for (_$9O = 0, _$f5 = 0; _$f5 < _$5s; _$f5 += 2) {
                                _$Dp[_$9O++] = _$B9 + _$7R.substr(_$f5, 2);
                            }
                        } else if (_$Ya < 66) {
                            _$7R._$Z0 = 2;
                        } else if (_$Ya < 67) {
                            _$9O += "$TPv4IsgGPPBmxfU8bGqEwdBM$LjCU_RzMfbg0wuVGgVfLJDfJD1AMYjegVDeZvhU3dsI4A8uSbkDz0Yq7RZ2wWuTw7KtGc4BZbArdyfny7LT2hV158PNKXX1ExWttz01APdcYChXwlRqjJXEqvACQMHpo0Ipq04WkhQtgeO5FyuqXndX8VaVuWetcoa";
                        } else {
                            _$LC += -78;
                        }
                    } else if (_$Ya < 72) {
                        if (_$Ya < 69) {
                            _$7R._$mA = "_$RX";
                        } else if (_$Ya < 70) {
                            _$7R._$vw = "fp1gqRzKGzG";
                        } else if (_$Ya < 71) {
                            return _$dp(12, _$9O);
                        } else {
                            var _$5s = _$dp(72);
                        }
                    } else if (_$Ya < 76) {
                        if (_$Ya < 73) {
                            _$7R._$Ig = _$ve;
                        } else if (_$Ya < 74) {
                            _$7R._$4k = "1.i.WylrdO1tTzdNBD.ARq";
                        } else if (_$Ya < 75) {
                            _$9O += "emzA89Igvwy6$Fedve7RbKQtPGUJ1uQx67IL7v9g$kax4WI9vP$41Tne5_c9MlH864mS8rmqZ0P56LjqjX0g$KdplMhRsS9Of55sDpB9x04kfTPiYgIa1aLuwGLCapVPYa_Ptkf63dyENFtyRXFzHl4niDw6i_VQ7JHZQRlkuMrbEnz9XYVv3veGDQQO";
                        } else {
                            _$9O += "8ZXmx$pHxZBBWKNEldDmrCeWVI2EeCTBTUqID7EURiCp44D4yvoqx34$koY_XW559v2GKs6dpzOFZv2IlgGu7NzmHn4Xw31tP$1PsuIWHaVZuYoQiy1XVV8XhNqA8HB60N_zA4vr5jO7ff9A0aNH5814weLBEMsdMKoYhPXtk1QwtDm4YwljN9jeBpzD";
                        }
                    } else {
                        if (_$Ya < 77) {
                            var _$9O = '';
                        } else if (_$Ya < 78) {
                            _$7R._$Hr = 93;
                        } else if (_$Ya < 79) {
                            var _$fT = _$Qt();
                        } else {
                            if (!_$ap) _$LC += 1;
                        }
                    }
                } else if (_$Ya < 96) {
                    if (_$Ya < 84) {
                        if (_$Ya < 81) {
                            return _$9O;
                        } else if (_$Ya < 82) {
                            var _$IL = _$Qt();
                        } else if (_$Ya < 83) {
                            _$f5 = _$dp(10);
                        } else {
                            var _$9O = _$dp(10);
                        }
                    } else if (_$Ya < 88) {
                        if (_$Ya < 85) {
                            _$ap = _$Yg > 0;
                        } else if (_$Ya < 86) {
                            for (_$Ia = 0; _$Ia < _$Yg; _$Ia++) {
                                _$Pi.push("}");
                            }
                        } else if (_$Ya < 87) {
                            _$7R._$20 = "_$NF";
                        } else {
                            return _$Dp;
                        }
                    } else if (_$Ya < 92) {
                        if (_$Ya < 89) {
                            var _$Yg = _$Qt();
                        } else if (_$Ya < 90) {
                            _$7R._$B9 = "_$09";
                        } else if (_$Ya < 91) {
                            _$ap = _$ed["a670748"];
                        } else {
                            _$dp(79, _$1a);
                        }
                    } else {
                        if (_$Ya < 93) {
                            debugger;
                            // _$9O = _$f5.call(_$89, _$7R);
                            _$9O = eval_js();
                            debugger;
                        } else if (_$Ya < 94) {
                            _$7R._$$F = "vUoJq3RpttvUPXZNaS6p20";
                        } else if (_$Ya < 95) {
                            _$7R._$fH = "_$Hl";
                        } else {
                            _$Pi.push(")();");
                        }
                    }
                } else {
                    if (_$Ya < 100) {
                        if (_$Ya < 97) {
                            _$7R._$nI = "_$3d";
                        } else if (_$Ya < 98) {
                            _$9O += "B8wh41LRUa9mygHhGa5PSzWJPHdXQQSakvuZvR25rG5DmOHBYlhw3Li6Ednva9d3allxeS0eaAoCeJA33ZYDLlBOBnrO22OB7X4t20w4mAnIfHk2k409pVf2YEsDCdj490ze$UV7cf$YFkw8HDHj518LHrAjihAH_gaVkOR$a1qtgI5m8xelRaEfx2Er";
                        } else if (_$Ya < 99) {
                            _$dp(91, _$ed);
                        } else {
                            _$9O = _$9O.replace(RegExp('[\\r\\n\\s]', 'g'), "");
                        }
                    } else {
                        if (_$Ya < 101) {
                            var _$B9 = _$Qt();
                        } else if (_$Ya < 102) {
                            _$ap = _$89.execScript;
                        } else {
                            _$7R._$6L = "STxp3qzc5Dq";
                        }
                    }
                }
            }
        }

        function _$lM(_$Dp, _$9g, _$$k) {
            function _$ax() {
                var _$4k = [0];
                Array.prototype.push.apply(_$4k, arguments);
                return _$hR.apply(this, _$4k);
            }

            var _$64, _$mS, _$8r, _$9O, _$f5, _$5s, _$4W, _$I9, _$vP, _$$4, _$1T, _$ne, _$5_, _$c9, _$Ml, _$H8;
            var _$x0, _$fT, _$B9 = _$Dp, _$Pi = _$0g[2];
            while (1) {
                _$fT = _$Pi[_$B9++];
                if (_$fT < 16) {
                    if (_$fT < 4) {
                        if (_$fT < 1) {
                            var _$c9 = _$Qt();
                        } else if (_$fT < 2) {
                            _$4W.send();
                        } else if (_$fT < 3) {
                            var _$f5 = _$9O > 1 ? _$y6.scripts[_$9O - 2].src : _$zA;
                        } else {
                            var _$8r = [];
                        }
                    } else if (_$fT < 8) {
                        if (_$fT < 5) {
                            var _$ne = _$Qt();
                        } else if (_$fT < 6) {
                            var _$vP = _$Qt();
                        } else if (_$fT < 7) {
                            _$B9 += 19;
                        } else {
                        }
                    } else if (_$fT < 12) {
                        if (_$fT < 9) {
                            for (_$5s = 0; _$5s < _$9O; _$5s++) {
                                _$f5[_$5s] = _$Qt();
                            }
                        } else if (_$fT < 10) {
                            var _$$4 = _$Qt();
                        } else if (_$fT < 11) {
                            var _$f5 = new _$vw(_$9O);
                        } else {
                            if (!_$x0) _$B9 += 4;
                        }
                    } else {
                        if (_$fT < 13) {
                            _$4W.open('GET', _$f5, false);
                        } else if (_$fT < 14) {
                            for (_$5s = 0; _$5s < _$f5; _$5s++) {
                                _$8r[_$5s] = _$lM(9);
                            }
                        } else if (_$fT < 15) {
                            var _$9O = _$Qt();
                        } else {
                            var _$H8 = _$lM(9);
                        }
                    }
                } else if (_$fT < 32) {
                    if (_$fT < 20) {
                        if (_$fT < 17) {
                            var _$9O = _$y6.scripts.length;
                        } else if (_$fT < 18) {
                            _$hR(5, _$$k);
                        } else if (_$fT < 19) {
                            _$4W = _$89.ActiveXObject ? new _$89.ActiveXObject('Microsoft.XMLHTTP') : new _$89.XMLHttpRequest();
                        } else {
                            var _$64 = _$lM(9);
                        }
                    } else if (_$fT < 24) {
                        if (_$fT < 21) {
                            var _$I9 = _$Qt();
                        } else if (_$fT < 22) {
                            var _$mS = _$lM(9);
                        } else if (_$fT < 23) {
                            _$1u[_$9g] = _$9O;
                        } else {
                            var _$4W = _$Qt();
                        }
                    } else if (_$fT < 28) {
                        if (_$fT < 25) {
                            var _$Ml = _$lM(9);
                        } else if (_$fT < 26) {
                            return _$f5;
                        } else if (_$fT < 27) {
                            var _$5_ = _$Qt();
                        } else {
                            _$B9 += -19;
                        }
                    } else {
                        if (_$fT < 29) {
                            return;
                        } else if (_$fT < 30) {
                            var _$1T = _$Qt();
                        } else if (_$fT < 31) {
                            _$4W.onreadystatechange = _$ax;
                        } else {
                            _$x0 = _$f5;
                        }
                    }
                } else {
                    if (_$fT < 33) {
                        var _$f5 = _$Qt();
                    } else {
                        var _$9O = _$lM(9);
                    }
                }
            }

            function _$hR(_$f5, _$mq) {
                var _$Z0, _$9O;
                var _$Dp, _$x0, _$5s = _$f5, _$4k = _$0g[3];
                while (1) {
                    _$x0 = _$4k[_$5s++];
                    if (_$x0 < 16) {
                        if (_$x0 < 4) {
                            if (_$x0 < 1) {
                                _$mq.push(_$UJ[_$5_]);
                            } else if (_$x0 < 2) {
                                if (!_$Dp) _$5s += 4;
                            } else if (_$x0 < 3) {
                                if (!_$Dp) _$5s += 1;
                            } else {
                                _$mq.push("=$_ts.aebi;");
                            }
                        } else if (_$x0 < 8) {
                            if (_$x0 < 5) {
                                if (!_$Dp) _$5s += 9;
                            } else if (_$x0 < 6) {
                                _$mq.push("(function(){var ");
                            } else if (_$x0 < 7) {
                                _$mq.push(_$UJ[_$1T]);
                            } else {
                                _$mq.push(",");
                            }
                        } else if (_$x0 < 12) {
                            if (_$x0 < 9) {
                                _$mq.push("=");
                            } else if (_$x0 < 10) {
                                _$Dp = _$9g == 0;
                            } else if (_$x0 < 11) {
                                _$5s += -27;
                            } else {
                                _$mq.push("while(1){");
                            }
                        } else {
                            if (_$x0 < 13) {
                                _$mq.push("++];");
                            } else if (_$x0 < 14) {
                                _$mq.push("[");
                            } else if (_$x0 < 15) {
                                _$mq.push(_$UJ[_$H8[0]]);
                            } else {
                                _$sS(12, 0, _$8r.length);
                            }
                        }
                    } else if (_$x0 < 32) {
                        if (_$x0 < 20) {
                            if (_$x0 < 17) {
                                _$mq.push("];");
                            } else if (_$x0 < 18) {
                                _$mq.push(_$UJ[_$4W]);
                            } else if (_$x0 < 19) {
                                _$Dp = _$4W.readyState == 4;
                            } else {
                                _$mq.push(_$UJ[_$vP]);
                            }
                        } else if (_$x0 < 24) {
                            if (_$x0 < 21) {
                                for (_$9O = 0; _$9O < _$64.length; _$9O += 2) {
                                    _$sS(0, _$64[_$9O], _$64[_$9O + 1], _$mq);
                                }
                            } else if (_$x0 < 22) {
                                _$mq.push("function ");
                            } else if (_$x0 < 23) {
                                _$dp(31);
                            } else {
                                for (_$9O = 1; _$9O < _$H8.length; _$9O++) {
                                    _$mq.push(",");
                                    _$mq.push(_$UJ[_$H8[_$9O]]);
                                }
                            }
                        } else if (_$x0 < 28) {
                            if (_$x0 < 25) {
                                _$mq.push(_$9g);
                            } else if (_$x0 < 26) {
                                _$mq.push("(");
                            } else if (_$x0 < 27) {
                                _$Dp = _$H8.length;
                            } else {
                                _$mq.push("var ");
                            }
                        } else {
                            if (_$x0 < 29) {
                                _$Dp = _$8r.length;
                            } else if (_$x0 < 30) {
                                _$mq.push("=0,");
                            } else if (_$x0 < 31) {
                                _$Dp = _$ed["a670748"];
                            } else {
                                _$mq.push(_$UJ[_$c9]);
                            }
                        }
                    } else if (_$x0 < 48) {
                        if (_$x0 < 36) {
                            if (_$x0 < 33) {
                                if (!_$Dp) _$5s += 8;
                            } else if (_$x0 < 34) {
                                _$mq.push("){");
                            } else if (_$x0 < 35) {
                                _$mq.push(_$UJ[_$IL]);
                            } else {
                                _$mq.push("=$_ts.scj,");
                            }
                        } else if (_$x0 < 40) {
                            if (_$x0 < 37) {
                                _$5s += 27;
                            } else if (_$x0 < 38) {
                                _$mq.push(";");
                            } else if (_$x0 < 39) {
                                _$mq.push(_$UJ[_$I9]);
                            } else {
                                _$5s += 23;
                            }
                        } else if (_$x0 < 44) {
                            if (_$x0 < 41) {
                                return;
                            } else if (_$x0 < 42) {
                                _$mq.push(_$UJ[_$67]);
                            } else if (_$x0 < 43) {
                                _$Dp = _$Ml.length;
                            } else {
                                var _$9O, _$Z0 = 4;
                            }
                        } else {
                            if (_$x0 < 45) {
                                _$sS(39);
                            } else if (_$x0 < 46) {
                                for (_$9O = 0; _$9O < _$Ml.length; _$9O++) {
                                    _$mq.push(",");
                                    _$mq.push(_$UJ[_$Ml[_$9O]]);
                                }
                            } else if (_$x0 < 47) {
                                _$5s += -23;
                            } else {
                                _$dp(79, _$4W.responseText);
                            }
                        }
                    } else {
                        if (_$x0 < 49) {
                            _$mq.push("}");
                        } else {
                            _$5s += 8;
                        }
                    }
                }

                function _$sS(_$B9, _$P5, _$6L, _$jq) {
                    var _$f5, _$5s, _$Dp, _$9O;
                    var _$4k, _$Pi, _$x0 = _$B9, _$Yg = _$0g[4];
                    while (1) {
                        _$Pi = _$Yg[_$x0++];
                        if (_$Pi < 16) {
                            if (_$Pi < 4) {
                                if (_$Pi < 1) {
                                    _$mq.push("}");
                                } else if (_$Pi < 2) {
                                    _$x0 += 40;
                                } else if (_$Pi < 3) {
                                    _$x0 += 8;
                                } else {
                                    _$jq.push(["function ", _$UJ[_$P5], "(){var ", _$UJ[_$$4], "=[", _$6L, "];Array.prototype.push.apply(", _$UJ[_$$4], ",arguments);return ", _$UJ[_$ne], ".apply(this,", _$UJ[_$$4], ");}"].join(''));
                                }
                            } else if (_$Pi < 8) {
                                if (_$Pi < 5) {
                                    _$4k = _$Dp == 0;
                                } else if (_$Pi < 6) {
                                    if (!_$4k) _$x0 += 1;
                                } else if (_$Pi < 7) {
                                    if (!_$4k) _$x0 += 2;
                                } else {
                                    var _$9O = _$mS.length;
                                }
                            } else if (_$Pi < 12) {
                                if (_$Pi < 9) {
                                    _$4k = _$Dp == 1;
                                } else if (_$Pi < 10) {
                                    var _$9O = _$8r[_$P5];
                                } else if (_$Pi < 11) {
                                    for (_$f5 = 0; _$f5 < _$9O; _$f5 += 2) {
                                        _$mq.push(_$7v[_$mS[_$f5]]);
                                        _$mq.push(_$UJ[_$mS[_$f5 + 1]]);
                                    }
                                } else {
                                }
                            } else {
                                if (_$Pi < 13) {
                                    _$mq.push(_$7v[_$9O[_$f5]]);
                                } else if (_$Pi < 14) {
                                    var _$f5 = _$9O.length;
                                } else if (_$Pi < 15) {
                                    _$6L--;
                                } else {
                                    for (; _$P5 + _$5s < _$6L; _$P5 += _$5s) {
                                        _$mq.push(_$f5);
                                        _$mq.push(_$UJ[_$5_]);
                                        _$mq.push('<');
                                        _$mq.push(_$P5 + _$5s);
                                        _$mq.push("){");
                                        _$sS(12, _$P5, _$P5 + _$5s);
                                        _$f5 = "}else if(";
                                    }
                                }
                            }
                        } else if (_$Pi < 32) {
                            if (_$Pi < 20) {
                                if (_$Pi < 17) {
                                    _$x0 += -40;
                                } else if (_$Pi < 18) {
                                    _$mq.push(_$7v[_$mS[_$9O]]);
                                } else if (_$Pi < 19) {
                                    for (_$5s = 0; _$5s < _$f5; _$5s += 2) {
                                        _$mq.push(_$7v[_$9O[_$5s]]);
                                        _$mq.push(_$UJ[_$9O[_$5s + 1]]);
                                    }
                                } else {
                                    _$f5 = "if(";
                                }
                            } else if (_$Pi < 24) {
                                if (_$Pi < 21) {
                                    for (_$9O = 1; _$9O < 7; _$9O++) {
                                        if (_$Dp <= _$em[_$9O]) {
                                            _$5s = _$em[_$9O - 1];
                                            break;
                                        }
                                    }
                                } else if (_$Pi < 22) {
                                    for (; _$P5 < _$6L; _$P5++) {
                                        _$mq.push(_$f5);
                                        _$mq.push(_$UJ[_$5_]);
                                        _$mq.push('<');
                                        _$mq.push(_$P5 + 1);
                                        _$mq.push("){");
                                        _$sS(4, _$P5);
                                        _$f5 = "}else if(";
                                    }
                                } else if (_$Pi < 23) {
                                    _$sS(4, _$P5);
                                } else {
                                    _$9O -= _$9O % 2;
                                }
                            } else if (_$Pi < 28) {
                                if (_$Pi < 25) {
                                    _$4k = _$mS.length != _$9O;
                                } else if (_$Pi < 26) {
                                    _$x0 += 21;
                                } else if (_$Pi < 27) {
                                    _$mq.push("}else{");
                                } else {
                                    _$sS(12, _$P5, _$6L);
                                }
                            } else {
                                if (_$Pi < 29) {
                                    _$f5 -= _$f5 % 2;
                                } else if (_$Pi < 30) {
                                    var _$9O, _$f5, _$5s, _$Dp = _$6L - _$P5;
                                } else if (_$Pi < 31) {
                                    _$x0 += 17;
                                } else {
                                    _$x0 += 39;
                                }
                            }
                        } else {
                            if (_$Pi < 36) {
                                if (_$Pi < 33) {
                                    if (!_$4k) _$x0 += 7;
                                } else if (_$Pi < 34) {
                                    _$5s = 0;
                                } else if (_$Pi < 35) {
                                    return;
                                } else {
                                    _$4k = _$Dp <= _$Z0;
                                }
                            } else {
                                _$4k = _$9O.length != _$f5;
                            }
                        }
                    }
                }
            }
        }
    }
})()
console.log("写script之前: \n" + document.getElementsByTagName('html')[0].innerHTML);

!function () {
    var ele = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.innerHTML = "console.log('111')"
    ele.appendChild(script)
}()
console.log("写script之后: \n" + document.getElementsByTagName('html')[0].innerHTML);

_$Aj('fEAj');

_$4n();

function getPrintShow(key) {
    if (key == null){
        return key
    }
    let type = typeof key;
    if (type === 'object') {
        try {
            return key.toString()
        } catch {
            return key.toString()
        }
    } else if (type === 'symbol') {
        return key.toString
    } else {
        return key
    }

}

function getObjhandler(WatchName) {
    let handler = {
        get(target, propKey, receiver) {
            let result = Reflect.get(target, propKey, receiver)
            if (propKey === "onmousemove"){
                debugger
            }
            if (result instanceof Object) {
                if (typeof result === "function") {
                    console.log(`[${WatchName}] getting propKey is [${getPrintShow(propKey)}] , it is function`)
                    return new Proxy(result, getMethodHandler(WatchName))
                } else {
                    console.log(`[${WatchName}] getting propKey is [${propKey.toString()}], result is [${getPrintShow(result)}]`);
                }
                // 不注释的话，会遍历对象的所有key
                // return new Proxy(result, getObjhandler(`${WatchName}.${getPrintShow(result)}`))
            }
            console.log(`[${WatchName}] getting propKey is [${propKey?.description ?? propKey}], result is [${getPrintShow(result)}]`);
            return result;
        },
        set(target, propKey, value, receiver) {
            if (value instanceof Object) {
                console.log(`[${WatchName}] setting propKey is [${propKey}], value is [${getPrintShow(value)}]`);
            } else {
                console.log(`[${WatchName}] setting propKey is [${propKey}], value is [${value}]`);
            }
            return Reflect.set(target, propKey, value, receiver);
        },
        has(target, propKey) {
            var result = Reflect.has(target, propKey);
            console.log(`[${WatchName}] has propKey [${propKey}], result is [${getPrintShow(result)}]`)
            return result;
        },
        deleteProperty(target, propKey) {
            var result = Reflect.deleteProperty(target, propKey);
            console.log(`[${WatchName}] delete propKey [${propKey}], result is [${getPrintShow(result)}]`)
            return result;
        },
        getOwnPropertyDescriptor(target, propKey) {
            var result = Reflect.getOwnPropertyDescriptor(target, propKey);
            console.log(`[${WatchName}] getOwnPropertyDescriptor  propKey [${propKey.toString()}] result is [${getPrintShow(result)}]`)
            return result;
        },
        defineProperty(target, propKey, attributes) {
            var result = Reflect.defineProperty(target, propKey, attributes);
            console.log(`[${WatchName}] defineProperty propKey [${propKey}] attributes is [${getPrintShow(attributes)}], result is [${getPrintShow(result)}]`)
            return result
        },
        getPrototypeOf(target) {
            var result = Reflect.getPrototypeOf(target)
            console.log(`[${WatchName}] getPrototypeOf result is [${getPrintShow(result)}]`)
            return result;
        },
        setPrototypeOf(target, proto) {
            console.log(`[${WatchName}] setPrototypeOf proto is [${getPrintShow(proto)}]`)
            return Reflect.setPrototypeOf(target, proto);
        },
        preventExtensions(target) {
            console.log(`[${WatchName}] preventExtensions`)
            return Reflect.preventExtensions(target);
        },
        isExtensible(target) {
            var result = Reflect.isExtensible(target)
            console.log(`[${WatchName}] isExtensible, result is [${result}]`)
            return result;
        },
        ownKeys(target) {
            var result = Reflect.ownKeys(target)
            console.log(`[${WatchName}] invoke ownkeys, result is [${getPrintShow(result)}]`)
            return result
        },
        apply(target, thisArg, argArray) {
            let result = Reflect.apply(target, thisArg, argArray)
            console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [${argArray}], result is [${getPrintShow(result)}].`)
            return result
        },
        construct(target, argArray, newTarget) {
            var result = Reflect.construct(target, argArray, newTarget)
            console.log(`[${WatchName}] construct function name is [${target.name}], argArray is [${argArray}], result is [${getPrintShow(result)}].`)
            return result;
        }
    }
    return handler;
}

let loadEvent = {"type": "load", "target": document}
let mousemoveEvent = {
    "type": "mousemove",
    "target": window,
    "timeStamp": new Date().getTime(),
    "screenX": 2287,
    "screenY": 512,
    "keyCode": undefined,
    "data": undefined,
    "button": 0,
    "offsetX": 343,
    "offsetY": 3,
    "x": 367,
    "y": 409
}
let dtaLoadEvent = new Proxy(Object.create(loadEvent), getObjhandler("load"));
let dtaMousemoveEvent = new Proxy(Object.create(mousemoveEvent), getObjhandler("mousemove"));
window.dispatchEvent(dtaLoadEvent);
// window.dispatchEvent(dtaMousemoveEvent);
