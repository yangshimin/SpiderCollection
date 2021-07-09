var pureWindow = require('./pure_window')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var canvas = require('canvas');
var atob = require('atob');
const jsdom = require("jsdom");
const fs = require("fs");
var localStorage = require('./localStorage');
// sessionStorage页面会话结束时会被清除, 所以在server文件中导入
const {JSDOM} = jsdom;

const js_code = fs.readFileSync("./glassdoor.html", {
    encoding: "utf-8"
});
const dom = new JSDOM(js_code, {
    url: "https://www.glassdoor.com/",
    referrer: "https://www.baidu.com/",
    contentType: "text/html",
    includeNodeLocations: true,
    pretendToBeVisual: true,
    resources: "usable",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
});

const timestamp = new Date().getTime() - 5287.348
let url_params = fs.readFileSync('./url_params.txt', 'UTF-8').toString();
let cf_chl_opt = fs.readFileSync('./cf_chl_opt.json', 'UTF-8').toString();
let _cf_chl_opt = JSON.parse(cf_chl_opt);

let cf_chl_ctx = fs.readFileSync('./cf_chl_ctx.json', 'UTF-8').toString();
let _cf_chl_ctx = JSON.parse(cf_chl_ctx);

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
}

let Image = function () {
    return dom.window.document.createElement('img')
    // return {
    //     addEventListener: function (state, callBack, boolValue) {
    //         callBack()
    //     },
    //     attachEvent: function () {
    //     },
    //     onload: function () {
    //     },
    //     naturalHeight: 3,
    //     naturalWidth: 57,
    //     height: 3,
    //     width: 57,
    //     src: "",
    // }
};

let Node = dom.window.Node;


let mydocument = {
    title: "Security | Glassdoor",
    images: ['', '', ''],
    characterSet: "UTF-8",
    charset: "UTF-8",
    documentURI: "https://www.glassdoor.com/",
    domain: "www.glassdoor.com",
    lastModified: get_date('MM/dd/yyyy hh:mm:ss'),
    visibilityState: "visible",
    webkitVisibilityState: "visible",
    $cookie: "",
    head: {
        removeChild: function (ele) {
        },
    },
    body: dom.window.document.body,
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
        // if (ele_id === "challenge-form") {
        //     return dom.window.document.getElementById(ele_id)
        //     return {
        //         removeChild: function (ele) {
        //         },
        //         appendChild: function (ele) {
        //         }
        //     }
        // } else if (ele_id === "cf-bubbles") {
        //     return dom.window.document.createElement("div")
        // }
    },
    appendChild: dom.window.document.appendChild,
    createElement: function (eleName) {
        if (eleName === "iframe") {
            ele = dom.window.document.createElement(eleName);
            Object.defineProperty(ele, 'contentWindow', {
                value: pureWindow.pureWindow.contentWindow
            })
            Object.defineProperty(ele, 'contentDocument', {
                value: pureWindow.pureWindow.contentDocument
            })
            // ele = pureWindow.pureWindow
        } else {
            ele = dom.window.document.createElement(eleName);
        }
        return ele;
    },
    querySelectorAll: function (eleName) {
        return dom.window.document.querySelectorAll(eleName)
        // if (eleName === 'script') {
        //     return {"length": 6}
        // } else {
        //     let elements = dom.window.document.querySelectorAll(eleName)
        //     return elements
        // }
    }
}
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
})

let plugins = [
    {
        'description': "Portable Document Format",
        'filename': "internal-pdf-viewer",
        'length': 1,
        'name': "Chrome PDF Plugin",
        '0': {
            "description": "Portable Document Format",
            "enabledPlugin": {},
            "type": "application/x-google-chrome-pdf",
            "suffixes": "pdf"
        }

    },
    {
        'description': "",
        'filename': "mhjfbmdgcfjbbpaeojofohoefgiehjai",
        'length': 1,
        'name': "Chrome PDF Viewer",
        "0": {
            'description': "",
            "type": "application/pdf",
            "suffixes": "pdf",
            "enabledPlugin": {},
        }
    },
    {
        'description': "",
        'filename': "internal-nacl-plugin",
        'length': 1,
        'name': "Native Client",
        "0": {
            "description": "Native Client Executable",
            "type": "application/x-nacl",
            "suffixes": "",
            "enabledPlugin": {},
        },
        "1": {
            "description": "Portable Native Client Executable",
            "type": "application/x-pnacl",
            "suffixes": "",
            "enabledPlugin": {},
        }

    }
];
plugins.item = function (x) {
    if (x === 4294967296) {
        return plugins[0]
    }
    return plugins[x]
}

let mynavigator = {
    appName: "Netscape",
    appCode: "Mozilla",
    appVersion: "5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
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
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36",
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
};

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
    }
};

let mylocation = {
    url: "https://www.glassdoor.com/",
    protocol: "https:",
    href: "https://www.glassdoor.com/",
    port: "",
    pathname: "",
    host: "www.glassdoor.com",
    hostname: "www.glassdoor.com",
};

let myhistory = {
    length: 5,
    scrollRestoration: "auto",
    state: null,
    replaceState: function (stateObj, title, url){
        return dom.window.history.replaceState(stateObj, title, url)
    },
};

let myperformance = {
    eventCounts: {size: 36},
    memory: {jsHeapSizeLimit: 4294705152, totalJSHeapSize: 29604118, usedJSHeapSize: 26031314},
    navigation: {redirectCount: 0, type: 1},
    onresourcetimingbufferfull: null,
    timeOrigin: new Date().getTime(),
    timing: {
        connectEnd: new Date().getTime(),
        connectStart: new Date().getTime(),
        domComplete: new Date().getTime(),
        domContentLoadedEventEnd: new Date().getTime(),
        domContentLoadedEventStart: new Date().getTime(),
        domInteractive: new Date().getTime(),
        domLoading: new Date().getTime(),
        domainLookupEnd: new Date().getTime(),
        domainLookupStart: new Date().getTime(),
        fetchStart: new Date().getTime(),
        loadEventEnd: new Date().getTime(),
        loadEventStart: new Date().getTime(),
        navigationStart: new Date().getTime(),
        redirectEnd: 0,
        redirectStart: 0,
        requestStart: new Date().getTime(),
        responseEnd: new Date().getTime(),
        responseStart: new Date().getTime(),
        secureConnectionStart: 0,
        unloadEventEnd: new Date().getTime(),
        unloadEventStart: new Date().getTime(),
    },
    mark: function () {
    },
    getEntries: function () {
        return [
            {
                "name": "https://www.glassdoor.com/",
                "entryType": "navigation",
                "startTime": 0,
                "duration": 9407.099999964237,
                "initiatorType": "navigation",
                "nextHopProtocol": "h2",
                "workerStart": 0,
                "redirectStart": 0,
                "redirectEnd": 0,
                "fetchStart": 2,
                "domainLookupStart": 2,
                "domainLookupEnd": 2,
                "connectStart": 2,
                "connectEnd": 2,
                "secureConnectionStart": 2,
                "requestStart": 12.099999964237213,
                "responseStart": 70.19999998807907,
                "responseEnd": 87,
                "transferSize": 69749,
                "encodedBodySize": 69140,
                "decodedBodySize": 69140,
                "serverTiming": [],
                "workerTiming": [],
                "unloadEventStart": 78,
                "unloadEventEnd": 78.19999998807907,
                "domInteractive": 190.79999995231628,
                "domContentLoadedEventStart": 190.89999997615814,
                "domContentLoadedEventEnd": 193.19999998807907,
                "domComplete": 9407,
                "loadEventStart": 9407.099999964237,
                "loadEventEnd": 9407.099999964237,
                "type": "reload",
                "redirectCount": 0
            },
            {
                "name": "first-paint",
                "entryType": "paint",
                "startTime": 170.69999998807907,
                "duration": 0
            },
            {
                "name": "first-contentful-paint",
                "entryType": "paint",
                "startTime": 170.69999998807907,
                "duration": 0
            },
            {
                "name": "https://www.glassdoor.com/cdn-cgi/challenge-platform/h/g/orchestrate/jsch/v1?ray=" + _cf_chl_opt['cRay'],
                "entryType": "resource",
                "startTime": 186,
                "duration": 75.19999998807907,
                "initiatorType": "script",
                "nextHopProtocol": "h2",
                "workerStart": 0,
                "redirectStart": 0,
                "redirectEnd": 0,
                "fetchStart": 186,
                "domainLookupStart": 186,
                "domainLookupEnd": 186,
                "connectStart": 186,
                "connectEnd": 186,
                "secureConnectionStart": 186,
                "requestStart": 190.5,
                "responseStart": 258.5999999642372,
                "responseEnd": 261.19999998807907,
                "transferSize": 11339,
                "encodedBodySize": 11196,
                "decodedBodySize": 31895,
                "serverTiming": [],
                "workerTiming": []
            },
            {
                "name": "https://www.glassdoor.com/cdn-cgi/images/trace/jschal/js/transparent.gif?ray=" + _cf_chl_opt['cRay'],
                "entryType": "resource",
                "startTime": 186.29999995231628,
                "duration": 52.80000001192093,
                "initiatorType": "img",
                "nextHopProtocol": "h2",
                "workerStart": 0,
                "redirectStart": 0,
                "redirectEnd": 0,
                "fetchStart": 186.29999995231628,
                "domainLookupStart": 186.29999995231628,
                "domainLookupEnd": 186.29999995231628,
                "connectStart": 186.29999995231628,
                "connectEnd": 186.29999995231628,
                "secureConnectionStart": 186.29999995231628,
                "requestStart": 191.89999997615814,
                "responseStart": 236.79999995231628,
                "responseEnd": 239.0999999642372,
                "transferSize": 147,
                "encodedBodySize": 42,
                "decodedBodySize": 42,
                "serverTiming": [],
                "workerTiming": []
            },
            {
                "name": "https://www.google-analytics.com/analytics.js",
                "entryType": "resource",
                "startTime": 190.0999999642372,
                "duration": 93.80000001192093,
                "initiatorType": "script",
                "nextHopProtocol": "h2",
                "workerStart": 0,
                "redirectStart": 0,
                "redirectEnd": 0,
                "fetchStart": 190.0999999642372,
                "domainLookupStart": 0,
                "domainLookupEnd": 0,
                "connectStart": 0,
                "connectEnd": 0,
                "secureConnectionStart": 0,
                "requestStart": 0,
                "responseStart": 0,
                "responseEnd": 283.89999997615814,
                "transferSize": 0,
                "encodedBodySize": 0,
                "decodedBodySize": 0,
                "serverTiming": [],
                "workerTiming": []
            },
            {
                "name": "https://www.glassdoor.com/cdn-cgi/images/trace/jschal/nojs/transparent.gif?ray=" + _cf_chl_opt['cRay'],
                "entryType": "resource",
                "startTime": 221.29999995231628,
                "duration": 49.700000047683716,
                "initiatorType": "css",
                "nextHopProtocol": "h2",
                "workerStart": 0,
                "redirectStart": 0,
                "redirectEnd": 0,
                "fetchStart": 221.29999995231628,
                "domainLookupStart": 221.29999995231628,
                "domainLookupEnd": 221.29999995231628,
                "connectStart": 221.29999995231628,
                "connectEnd": 221.29999995231628,
                "secureConnectionStart": 221.29999995231628,
                "requestStart": 225.69999998807907,
                "responseStart": 269.5,
                "responseEnd": 271,
                "transferSize": 101,
                "encodedBodySize": 42,
                "decodedBodySize": 42,
                "serverTiming": [],
                "workerTiming": []
            },
            {
                "name": "https://www.glassdoor.com/cdn-cgi/challenge-platform/h/" + _cf_chl_opt['cFPWv'] + "/flow/ov1" + url_params + _cf_chl_opt['cRay'] + "/" + _cf_chl_opt['cHash'],
                "entryType": "resource",
                "startTime": 9358.899999976158,
                "duration": 547.5,
                "initiatorType": "xmlhttprequest",
                "nextHopProtocol": "h2",
                "workerStart": 0,
                "redirectStart": 0,
                "redirectEnd": 0,
                "fetchStart": 9358.899999976158,
                "domainLookupStart": 9358.899999976158,
                "domainLookupEnd": 9358.899999976158,
                "connectStart": 9358.899999976158,
                "connectEnd": 9358.899999976158,
                "secureConnectionStart": 9358.899999976158,
                "requestStart": 9363.799999952316,
                "responseStart": 9899.099999964237,
                "responseEnd": 9906.399999976158,
                "transferSize": 36383,
                "encodedBodySize": 36238,
                "decodedBodySize": 48216,
                "serverTiming": [],
                "workerTiming": []
            },
            {
                "name": "https://www.google-analytics.com/j/collect?v=1&_v=j91&a=1136406229&t=pageview&_s=1&dl=https%3A%2F%2Fwww.glassdoor.com%2F&ul=zh-cn&de=UTF-8&dt=Security%20%7C%20Glassdoor&sd=24-bit&sr=1920x1080&vp=361x881&je=0&_u=AACAAEABAAAAAC~&jid=&gjid=&cid=142697002.1625553556&tid=UA-2595786-6&_gid=24820331.1625553556&_slc=1&z=1676604190",
                "entryType": "resource",
                "startTime": 9393.399999976158,
                "duration": 85.5,
                "initiatorType": "xmlhttprequest",
                "nextHopProtocol": "h2",
                "workerStart": 0,
                "redirectStart": 0,
                "redirectEnd": 0,
                "fetchStart": 9393.399999976158,
                "domainLookupStart": 0,
                "domainLookupEnd": 0,
                "connectStart": 0,
                "connectEnd": 0,
                "secureConnectionStart": 0,
                "requestStart": 0,
                "responseStart": 0,
                "responseEnd": 9478.899999976158,
                "transferSize": 0,
                "encodedBodySize": 0,
                "decodedBodySize": 0,
                "serverTiming": [],
                "workerTiming": []
            },
            {
                "name": "https://www.glassdoor.com/favicon.ico",
                "entryType": "resource",
                "startTime": 9421,
                "duration": 87.29999995231628,
                "initiatorType": "other",
                "nextHopProtocol": "h2",
                "workerStart": 0,
                "redirectStart": 0,
                "redirectEnd": 0,
                "fetchStart": 9421,
                "domainLookupStart": 9421,
                "domainLookupEnd": 9421,
                "connectStart": 9421,
                "connectEnd": 9421,
                "secureConnectionStart": 9421,
                "requestStart": 9434.399999976158,
                "responseStart": 9492.599999964237,
                "responseEnd": 9508.299999952316,
                "transferSize": 69279,
                "encodedBodySize": 69103,
                "decodedBodySize": 69103,
                "serverTiming": [],
                "workerTiming": []
            },
            {
                "name": "cp-n-71566",
                "entryType": "mark",
                "startTime": 10170.799999952316,
                "duration": 0
            }
        ]
    },

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
        connect: function (){},
        id: undefined,
        sendMessage: function () {
        },
    }
};

let mywindow = {
    XMLHttpRequest: XMLHttpRequest,
    canvas: canvas,
    sessionStorage: {},
    localStorage: {},
    _cf_atob: atob,
    performance: myperformance,
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
    chrome: myChrome,
    document: mydocument,
    history: myhistory,
    sendRequest: function (s) {
        for (var i = 1; i <= window._cf_chl_ctx.chC; i++) {
            var fp = window._cf_chl_ctx[String(i)].fp;
            if (fp && fp.length === 0) {
                window._cf_chl_ctx[String(i)].fp = [
                    {
                        "i": 14,
                        "h": 28
                    },
                    {
                        "i": 25,
                        "h": 14
                    }
                ];
                break
            }
        }
        var data = {
            "url": s,
            "data": window["_cf_chl_ctx"]
        };
        console.log(data);
    },
    _cf_chl_opt: _cf_chl_opt,
    _cf_chl_ctx: _cf_chl_ctx
};

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

const navigator = new Proxy(Object.create(mynavigator), getObjhandler("navigator"));
const screen = new Proxy(Object.create(mysrceen), getObjhandler("screen"));
const history = new Proxy(myhistory, getObjhandler("history"));
const location = new Proxy(mylocation, getObjhandler("location"));
const document = new Proxy(mydocument, getObjhandler("document"));
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
    Node,
}


