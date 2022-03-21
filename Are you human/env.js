require("fake-indexeddb/auto");
// var getRandomValues = require('get-random-values');
var openDatabase = require('websql');
var nodeCrypto = require('crypto')
var fs = require('fs');
// npm install cookie
var cookieIns = require('cookie');
var canvas = require('canvas');
var mock_cookie = require("./cookie").mock;
var dtaEventTarget = require('./simpleEventTarget').EventTarget
var navigator = require("./navigator").navigator;
var localStorage = require('./localStorage');
var sessionStorage = require('./sessionStorage');
var fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const jsdom = require("jsdom");

var index_code = fs.readFileSync("E:\\个人\\SpiderCollection\\Are you human\\block.html", {
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

// window = global;
// Object.setPrototypeOf(window, dtaEventTarget.prototype);

global.window = global;
var Window = function(){};
global.Window = Window
Object.setPrototypeOf(window, Window.prototype);
Object.setPrototypeOf(Window.prototype, dtaEventTarget.prototype);
//
// console.log(window instanceof Window)
// console.log(window.addEventListener)

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
document.querySelector = function(seq){
    return dom.window.document.querySelector(seq);
};
document.querySelectorAll = function(seq){
    return dom.window.document.querySelectorAll(seq);
}

document.createTextNode = function(ele){
    return dom.window.document.createTextNode(ele)
}

// 不能采取document.$cookie的方式来定义 代码中有检查属性的第一个字符是否是$
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
    location.href = "https://www.walmart.ca/blocked?url=L2VuL2lwL2dvb2dsZS1jaHJvbWVjYXN0LzYwMDAxOTg3NDY1MDI=&uuid=1cf08f24-a113-11ec-bac1-566b70446877&vid=&",
    location.pathname = "/blocked",
    location.host = "www.walmart.ca",
    location.hostname = "www.walmart.ca",
    location.origin = "https://www.walmart.ca";
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
screen.width = 1920;
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
window.MutationObserver = function(){};
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
window.crypto.getRandomValues = function (buf) {
    if (nodeCrypto.randomBytes) {
        if (!(buf instanceof Uint8Array)) {
            throw new TypeError('expected Uint8Array');
        }
        if (buf.length > 65536) {
            var e = new Error();
            e.code = 22;
            e.message = 'Failed to execute \'getRandomValues\' on \'Crypto\': The ' +
                'ArrayBufferView\'s byte length (' + buf.length + ') exceeds the ' +
                'number of bytes of entropy available via this API (65536).';
            e.name = 'QuotaExceededError';
            throw e;
        }
        var bytes = nodeCrypto.randomBytes(buf.length);
        buf.set(bytes);
        return buf;
    }
    else {
        throw new Error('No secure random number generator available.');
    }
}
window._pxAppId = 'PXnp9B16Cq';
window._PXnp9B16Cq = {
    "locale": "zh-CN"
};

window._pxAppId = 'PXnp9B16Cq';
window._pxJsClientSrc = '/px/' + window._pxAppId + '/init.js';
window._pxFirstPartyEnabled = true;
window._pxHostUrl = '/px/' + window._pxAppId + '/xhr';
window._pxreCaptchaTheme = 'light';
window["_PXnp9B16Cq"] = {
    locale: "zh-CN"
};
window.PointerEvent = function(){debugger};

module.exports = {
    window,
    document,
    screen,
    navigator,
    location,
}

