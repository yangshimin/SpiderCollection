const { createCanvas, CanvasRenderingContext2D } = require('canvas')
const jsdom = require("jsdom");
const fs = require("fs");
const fetch = require('node-fetch');
const {JSDOM} = jsdom;
var localStorage = require('./localStorage');
var sessionStorage = require('./sessionStorage');
var pluginRequire = require('./plugin')

var plugins = pluginRequire.plugins
var PluginArray = pluginRequire.PluginArray

const canvas = createCanvas(300, 150)

const consoleAble = false
const js_code = fs.readFileSync("./douyin.html", {
    encoding: "utf-8"
});
const dom = new JSDOM(js_code, {
    url: "https://www.douyin.com/",
    referrer: "https://www.douyin.com",
    contentType: "text/html",
    includeNodeLocations: true,
    pretendToBeVisual: true,
    resources: "usable",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
});

function get_date(fmt){
    let myDate = new Date();
    var o = {
        "M+": myDate.getMonth() + 1,
        "d+": myDate.getDate(),
        "h+": myDate.getHours(),
        "m+": myDate.getMinutes(),
        "s+": myDate.getSeconds(),
        "q+": Math.floor((myDate.getMonth() + 3) / 3),
        "S": myDate.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (myDate.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
let Headers = function(){};
Headers.prototype.toString = function (){return "function Headers() { [native code] }"}
let Request = function(){};
Request.prototype.toString = function (){return "function Request() { [native code] }"}
let WebSocket = function(){};
WebSocket.prototype.toString = function (){return "function WebSocket() { [native code] }"}
let DOMException = function(){};
DOMException.prototype.toString = function (){return "function DOMException() { [native code] }"}
let indexedDB = {
    custom_name: "IDBFactory",
};
indexedDB.toString = function (){return "[object IDBFactory]"}
let Image = function(){return dom.window.document.createElement('img')};
Image.prototype.toString = function (){return "function Image() { [native code] }"}
let myhistory = {
    length: 2,
    pushState: function(){},
    replaceState: function (){},
    scrollRestoration: "auto",
    state: null,
    custom_name: "History",
};
myhistory.toString = function (){return "[object History]"}
let mynavigator = {
    appName: "Netscape",
    appCode: "Mozilla",
    appVersion: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
    bluetooth: {},
    clipboard: {},
    connnection: {downlink: 10, effectiveType: "4g", onchange: null, rtt: 250, saveData: false},
    cookieEnabled: true,
    credentials: {},
    deviceMemory: 8,
    doNotTrack: null,
    geolocation: {},
    hardwareConcurrency: 4,
    hid: {},
    keyboard: {},
    language: "zh-CN",
    languages: ["zh-CN", "en-GB", "zh", "ja"],
    locks: {},
    maxTouchPoints: 0,
    mediaCapabilities: {},
    mediaDevices: {},
    mediaSession: {},
    mimeTypes: {},
    online: true,
    permissions: {},
    platform: "Win32",
    plugins: plugins,
    presentation: {},
    product: "Gecko",
    productSub: "20030107",
    scheduling: {},
    serviceWorker: {},
    storage: {},
    usb: {},
    userActivation: {},
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36",
    userAgentData: {},
    vendor: "Google Inc.",
    vendorSub: "",
    wakeLock: {},
    webdriver: false,
    webkitPersistentStorage: {},
    webkitTemporaryStorage: {},
    xr: {},
    getBattery: function () {
    },
    getGamepads: function () {
    },
    javaEnabled: function () {
    },
    sendBeacon: function () {
    },
    vibrate: function () {
    },
    serial: {},
    canShare: function () {
    },
    registerProtocolHandler: function () {
    },
    unregisterProtocolHandler: function () {
    },
    getInstalledRelatedApps: function () {
    },
    clearAppBadge: function () {
    },
    setAppBadge: function () {
    },
    getUserMedia: function () {
    },
    requestMIDIAccess: function () {
    },
    requestMediaKeySystemAccess: function () {
    },
    webkitGetUserMedia: function () {
    },
    share: function () {
    },
    custom_name: "Navigator",
};
mynavigator.toString = function toString(){return "[object Navigator]"}
let mylocation = {
    protocol: "https:",
    href: "https://www.douyin.com/",
    port: "",
    pathname: "",
    host: "www.douyin.com",
    hostname: "www.douyin.com",
    origin: "https://www.douyin.com"
};
mylocation.toString = function (){return "https://www.douyin.com/"}

let mydocument = {
    title: "【抖音】记录美好生活",
    images: ['', '', ''],
    characterSet: "UTF-8",
    charset: "UTF-8",
    onmouseout: null,
    referrer: "",
    documentURI: "https://www.douyin.com/",
    domain: "www.douyin.com",
    lastModified: get_date('MM/dd/yyyy hh:mm:ss'),
    visibilityState: "visible",
    webkitVisibilityState: "visible",
    $cookie: "",
    head: {
        removeChild: function (ele) {
        },
    },
    body: dom.window.document.body,
    createEvent: dom.window.document.createEvent,
    documentElement: {
        getAttribute: function () {
        }
    },
    readyState: "complete",
    addEventListener: function () {
    },
    getElementsByTagName: function (str) {
        console.log(str)
        if (str === "meta") {
            let metaRes = []
            metaRes["meta-pro"] = {
                "content": {
                    "length": 6
                }
            }
            return metaRes
        } else if (str === 'head') {
            return dom.window.document.getElementsByTagName(str);
        }
    },
    getElementById: function (ele_id) {
        return dom.window.document.getElementById(ele_id)
    },
    appendChild: dom.window.document.appendChild,
    createElement: function (eleName) {
        if (eleName === 'canvas'){
            canvas.toDataURL.toString = function(){return "function toDataURL() { [native code] }"}
            return canvas
        }
        ele = dom.window.document.createElement(eleName);
        return ele;
    },
    querySelectorAll: function (eleName) {
        return dom.window.document.querySelectorAll(eleName)
    },
    custom_name: "HTMLDocument",
};
mydocument.toString = function (){return "[object HTMLDocument]"}
Object.defineProperty(mydocument, 'cookie', {
    get: function () {
        return this.$cookie;
    },
    set: function (value) {
        if (value.indexOf("expires=") !== -1) {
            let cookieStr = value.split(";")[0]
            if (new Date(value.split(";")[1].replace("expires=", "")).getTime() >= new Date()) {
                this.$cookie = this.$cookie ? this.$cookie + "; " + cookieStr : cookieStr
            }
        } else {
            this.$cookie = this.$cookie ? this.$cookie + "; " + value : value
            return value
        }
    }
});
mydocument = Object.create(mydocument);
mydocument.location = mylocation;
mydocument.__reactEvents$o5euvjezgm = new Set(["selectionchange__bubble", "selectionchange__capture"]);

let mysrceen = {
    availHeight: 1040,
    availLeft: 2560,
    availTop: 0,
    availWidth: 1920,
    colorDepth: 24,
    pixelDepth: 24,
    height: 1080,
    width: 1920,
    innerHeight: 937,
    orientation: {
        angle: 0,
        onchange: null,
        type: "landscape-primary"
    },
    custom_name: "Screen"
};
mysrceen.toString = function (){return "[object Screen]"}
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
            if (typeof extensionId !== 'number'){
                throw TypeError("Error in invocation of runtime.connect(optional string extensionId, optional object connectInfo): chrome.runtime.connect() called from a webpage must specify an Extension ID (string) for its first argument.")
            }
        },
        id: undefined,
        sendMessage: function () {
        },
    }
};
let mywindow = {
    chrome: myChrome,
    process: undefined,
    postMessage: dom.window.postMessage,
    localStorage: localStorage,
    sessionStorage: sessionStorage,
    Object: Object,
    canvas: canvas,
    Audio: dom.window.Audio,
    CanvasRenderingContext2D: CanvasRenderingContext2D,
    CSSRuleList: function(){},
    CSSStyleDeclaration: function(){},
    DOMRectList: function(){},
    DOMStringList: function(){},
    DOMTokenList: function(){},
    DataTransferItemList: function(){},
    FileList: function(){},
    HTMLCollection: function(){},
    HTMLFormElement: function(){},
    HTMLSelectElement: function(){},
    MediaList: function(){},
    MimeTypeArray: function(){},
    NamedNodeMap: function(){},
    NodeList: function(){},
    Plugin: function(){},
    PluginArray: function(){},
    SVGLengthList: function(){},
    SVGNumberList: function(){},
    SVGPointList: function(){},
    SVGStringList: function(){},
    SVGTransformList: function(){},
    SourceBufferList: function(){},
    StyleSheetList: function(){},
    TextTrackCueList: function(){},
    TextTrackList: function(){},
    TouchList: function(){},
    HTMLAllCollection: function(){},
    RTCPeerConnection: function () {
    },
    DeviceOrientationEvent: function () {
    },
    DeviceMotionEvent: function () {
    },
    navigator: mynavigator,
    scrollTo: function () {
    },
    addEventListener: function () {
    },
    attachEvent: function () {
    },
    screen: mysrceen,
    location: mylocation,
    document: mydocument,
    history: myhistory,
    XMLHttpRequest: dom.window.XMLHttpRequest,
    HTMLElement: dom.window.HTMLElement,
    _$jsvmprt: "",
    "fetch": fetch,
    "Request": Request,
    "Headers": Headers,
    custom_name: "Window"
};
mywindow.toString = function (){return "[object Window]"}

// Object.defineProperty(document, Symbol.toStringTag,{value: 'HTMLDocument'}) 也能实现同样的效果 但是需要每个对象都这么设置一哈
// 所以这里直接这么hook
let origin_tostring_call = Object.prototype.toString.call.bind(Object.prototype.toString)
Object.prototype.toString.call = function(obj){
    if (obj && obj.custom_name){
        res = "[object " + obj.custom_name + "]"
    }else{
        res = origin_tostring_call(obj)
    }
    return res
}

// let rawstringify = JSON.stringify;
// JSON.stringify = function (Object) {
//     if ((Object?.value ?? Object) === global) {
//         return "global"
//     } else {
//         return rawstringify(Object)
//     }
// }

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
            if (consoleAble){
                console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [${argArray}], result is [${getPrintShow(result)}].`)
            }
            return result
        },
        construct(target, argArray, newTarget) {
            var result = Reflect.construct(target, argArray, newTarget)
            if (consoleAble){
                console.log(`[${WatchName}] construct function name is [${target.name}], argArray is [${argArray}], result is [${getPrintShow(result)}].`)
            }
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
                    if (consoleAble){
                        console.log(`[${WatchName}] getting propKey is [${getPrintShow(propKey)}] , it is function`)
                    }
                    return new Proxy(result, getMethodHandler(WatchName))
                } else {
                    if (consoleAble){
                        console.log(`[${WatchName}] getting propKey is [${propKey.toString()}], result is [${getPrintShow(result)}]`);
                    }
                }
                // 不注释的话，会遍历对象的所有key
                return new Proxy(result, getObjhandler(`${WatchName}.${getPrintShow(result)}`))
            }
            if (consoleAble){
                console.log(`[${WatchName}] getting propKey is [${propKey?.description ?? propKey}], result is [${getPrintShow(result)}]`);
            }
            return result;
        },
        set(target, propKey, value, receiver) {
            if (value instanceof Object) {
                if (consoleAble){
                    console.log(`[${WatchName}] setting propKey is [${propKey}], value is [${getPrintShow(value)}]`);
                }
            } else {
                if (consoleAble){
                    console.log(`[${WatchName}] setting propKey is [${propKey}], value is [${value}]`);
                }
            }
            return Reflect.set(target, propKey, value, receiver);
        },
        has(target, propKey) {
            var result = Reflect.has(target, propKey);
            if (consoleAble){
                console.log(`[${WatchName}] has propKey [${propKey}], result is [${getPrintShow(result)}]`)
            }
            return result;
        },
        deleteProperty(target, propKey) {
            var result = Reflect.deleteProperty(target, propKey);
            if (consoleAble){
                console.log(`[${WatchName}] delete propKey [${propKey}], result is [${getPrintShow(result)}]`)
            }
            return result;
        },
        getOwnPropertyDescriptor(target, propKey) {
            var result = Reflect.getOwnPropertyDescriptor(target, propKey);
            if (consoleAble){
                console.log(`[${WatchName}] getOwnPropertyDescriptor  propKey [${propKey.toString()}] result is [${getPrintShow(result)}]`)
            }
            return result;
        },
        defineProperty(target, propKey, attributes) {
            var result = Reflect.defineProperty(target, propKey, attributes);
            if (consoleAble){
                console.log(`[${WatchName}] defineProperty propKey [${propKey}] attributes is [${getPrintShow(attributes)}], result is [${getPrintShow(result)}]`)
            }
            return result
        },
        getPrototypeOf(target) {
            var result = Reflect.getPrototypeOf(target)
            if (consoleAble){
                console.log(`[${WatchName}] getPrototypeOf result is [${getPrintShow(result)}]`)
            }
            return result;
        },
        setPrototypeOf(target, proto) {
            if (consoleAble){
                console.log(`[${WatchName}] setPrototypeOf proto is [${getPrintShow(proto)}]`)
            }
            return Reflect.setPrototypeOf(target, proto);
        },
        preventExtensions(target) {
            if (consoleAble){
                console.log(`[${WatchName}] preventExtensions`)
            }
            return Reflect.preventExtensions(target);
        },
        isExtensible(target) {
            var result = Reflect.isExtensible(target)
            if (consoleAble){
                console.log(`[${WatchName}] isExtensible, result is [${result}]`)
            }
            return result;
        },
        ownKeys(target) {
            var result = Reflect.ownKeys(target)
            if (consoleAble){
                console.log(`[${WatchName}] invoke ownkeys, result is [${getPrintShow(result)}]`)
            }
            return result
        },
        apply(target, thisArg, argArray) {
            let result = Reflect.apply(target, thisArg, argArray)
            if (consoleAble){
                console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [${argArray}], result is [${getPrintShow(result)}].`)
            }
            return result
        },
        construct(target, argArray, newTarget) {
            var result = Reflect.construct(target, argArray, newTarget)
            if (consoleAble){
                console.log(`[${WatchName}] construct function name is [${target.name}], argArray is [${argArray}], result is [${getPrintShow(result)}].`)
            }
            return result;
        }
    }
    return handler;
}

const screen = new Proxy(Object.create(mysrceen), getObjhandler("screen"));
const history = new Proxy(myhistory, getObjhandler("history"));
const location = new Proxy(mylocation, getObjhandler("location"));
const document = new Proxy(mydocument, getObjhandler("document"));
const navigator = new Proxy(Object.create(mynavigator), getObjhandler("navigator"));
const window = new Proxy(Object.assign(global, mywindow), getObjhandler("window"));

//checkproxy()
module.exports = {
    window,
    navigator,
    screen,
    location,
    String,
    Image,
    document,
    history,
    Headers,
    Request,
    WebSocket,
    DOMException,
    indexedDB,
    PluginArray,
}
