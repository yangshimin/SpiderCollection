const fs = require('fs');
var pureWindow = require('./pure_window');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var canvas = require('canvas');
var atob = require('atob');
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const dom = new JSDOM(`<div id="cf-content" style="display:none">
    
    <div id="cf-bubbles">
      <div class="bubbles"></div>
      <div class="bubbles"></div>
      <div class="bubbles"></div>
    </div>
    <h1><span data-translate="checking_browser">Checking your browser before accessing</span> glassdoor.com.</h1>
    
    <div id="no-cookie-warning" class="cookie-warning" data-translate="turn_on_cookies" style="display:none">
      <p data-translate="turn_on_cookies" style="color:#bd2426;">Please enable Cookies and reload the page.</p>
    </div>
    <p data-translate="process_is_automatic">This process is automatic. Your browser will redirect to your requested content shortly.</p>
    <p data-translate="allow_5_secs" id="cf-spinner-allow-5-secs" >Please allow up to 5 seconds&hellip;</p>
    <p data-translate="redirecting" id="cf-spinner-redirecting" style="display:none">Redirecting&hellip;</p>
  </div><form class="challenge-form" id="challenge-form" action="/?__cf_chl_jschl_tk__=cd3ce437ab53ab2f4a758f26ca0c407d25e9fcac-1615694379-0-Ac8b5a-1l_fv6FMpLRLDrIihw9STzrx29LBvsyo2x6Ya-gF-lZYaEPvnu1COnbNFUzJRcO6CZFBYBkwG5AwMselWq_WSB0Qk2mzQAF023xh-LLCcLY_I_mzg7WYuFwqwsk5yYxJl9vh682FzrABPAnjTN4FOrUDDW3F3aDenWAORnPhVlRumJPL6dQyevZO4ZPbdsqtX4rQ215tRf3pApgb8mDMbCLspEeJIXRnu_WU20UXZEhxFj_07u0fvCYqZd8d7Xg_IZUkf-QBbAjWL63gamfrjKuvbxIpuLQJln8PcBwpeYQKNB7vQ6qiqxvZwu8QcBh5KKk4NR53l46OJAMNO9Y7VUIYbpKmV0zyarUe_9Bvwnrz5F7WZ6PGvDT9SEw" method="POST" enctype="application/x-www-form-urlencoded">
    <input type="hidden" name="r" value="5261f2c1ad869d701df49a81420ca0b55054177e-1615694379-0-ARs26Su9Xv4Bd8BbLbAU3OD0DMZZ7klnIf6migz96WI+XYK7QuiZ6180z6CuwObZHbLXN4TJnK9uVY1YuJ+UZ6fNjyurA7eiC+Nnynn0ZKMzUNl1KC/iOoiXU/7MsYiDTg+jsKzEacnBwCzwxjFAVkdXWNVptBXhg7Y1tNdvBes4KRMQUmRGUtBeRmwNHhOFHs86XwUnduIOZE+hJnsGedY+mknHj42uF6WYUl9XMkP5oaUDnJmjjhsbVM0hSzDZ8cyWEPZjf0ubbIu1L7Ynw9STu6LaqC3saomG2VVZuxuH/T2bJIAx5N6OgJfKxOLaqyuUJLgrr+SI21cd7eImtpsnKxvwyna0pgJc3MK9VLedF406jLWbDu8flXnunEKbmOfYpxW4RBbO4ScJXkxBSMDOuYfy/pMuDtqmuremetIQGCQOG9O/9WpjMwGa1TSSJpDHm9sZSjfKMWo8XDU5upwWhNYiKnPNST+ZFfZSaWr8zITijqPFIG1+N8YdQu50vjfB44CS0ODnSkGLQPvGpHYiX4qvYScRaRT4+pWtXzwpUl5k6JeEVelFM8tIDIZ34gFyRfV4ReriKGP0g2OVQ2OUKeLHJNv53JNDYyXpSvC7KTGAJykAXN9Fy0fVjCTK6asH34yxfWNQJfDsFzxLjZgpBf4Wpp7bYLNToF24sXYrSGih8MArcsRwusMUMtxgtmF3V09tdsdhkHYJs5k+KcIavVA8751VZPPlRhWeCnGyTh4MckE1hZ9FSDztQ8NiTxajrqWmmRqe+iofKHUcHVlRQafOwfhq7IAiTmAiZf+5016c3BmxvK8xBqPHD9iRFhaXouHYcg2MuG0AE8ATcPcU1Bt51ZW2BzOL5H1YZoSjB9ZmJ1v1qLGoB+a9eUwQ20Dzj+9IqPUrNqe1XnM3Xyza2/F/Y/NJshVfUS96pIlqHd7ZrGP67fbPCl7Tdyd5HuRfO2vrbE+cGh7Od4FqU/Bsvxord2NpHhg4QIsolLcLLs4jyRrDr/78IJyN9Z5UkwqOxI86HbgYCXE1TYHlwg3TQlgsqTlgSKPEgAooC6b43N9LSXqhdYwyzT4swfFpEPtu2DxxWGitE0KCXVatSvyZaTPEGDYiQJXCaQLHhH5VvTDd5zIQ05WHyh/2inR9oXNgA6He1s9qSDptgKIfBjAHyHekwQ/NkVIbVjONs5wy7PQLkqKxtHlV/HmOmI5438Gab6aruS1gUKDosYj+/Rmej9qMhkNKPs08L17+5yJOSbppXgGupguIvErPUFen6s3FH6TjI/3yEdck3rVkcCeIzd8+FyD84+zJs7eJAv5I15xy5secIFpJt+WonrlqwI+cFLvuwqmL6kKvfCv6L6z5WYH9EdcYCg1RG+PZ3OqM3mfp1THCSFVbiQZNURS8iKqT718J2cToyK8InkY4oPlnJPJ2kGFzakwOZumucPNtteormJX2SiI54paXzwpCNLPK2cmVB9p0DmId3TEiq+IMycJOUoS8wXmwA0HX2pei7CFahQLwhm9FqCkYyz8blD0juIIJt1cZurAak7orUT0VAL37Z43sR/jfyRO1Pjc4n8wzJaDzLBmI4i8huQxwNlHXkJpY1NtjYyPhkm9qd8w="/>
    <input type="hidden" value="ff13de57b177673d0c8c52a8a18fa2e8" id="jschl-vc" name="jschl_vc"/>
    <!-- <input type="hidden" value="" id="jschl-vc" name="jschl_vc"/> -->
    <input type="hidden" name="pass" value="1615694383.562-BX1xF6Pdpt"/>
    <input type="hidden" id="jschl-answer" name="jschl_answer"/>
  </form><script></script><script></script><script></script><script></script><script></script><script></script>`, {
    url: "https://www.glassdoor.com/",
    referrer: "https://www.baidu.com/",
    contentType: "text/html",
    includeNodeLocations: true,
    pretendToBeVisual: true,
    resources: "usable",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
});

let cf_chl_opt = fs.readFileSync('./cf_chl_opt.json', 'UTF-8').toString();
let _cf_chl_opt = JSON.parse(cf_chl_opt);

let cf_chl_ctx = fs.readFileSync('./cf_chl_ctx.json', 'UTF-8').toString();
let _cf_chl_ctx = JSON.parse(cf_chl_ctx);


function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
};


// var _cf_chl_opt = {
//     "cvId": "2",
//     "cType": "non-interactive",
//     "cNounce": "96015",
//     "cRay": "64aa9dcbcc7db150",
//     "cHash": "4eaf57ee0a50afa",
//     "cFPWv": "b",
//     "cTTimeMs": "4000",
//     "cRq": {
//         "ru": "aHR0cHM6Ly93d3cuZ2xhc3Nkb29yLmNvbS8=",
//         "ra": "TW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzg4LjAuNDMyNC4xOTAgU2FmYXJpLzUzNy4zNg==",
//         "rm": "R0VU",
//         "d": "wuVX4pBM/eo6G+3A6QiR/KwUUaNyk09CgI+kdgulgiZTi70P7lD9bjLS7NgZHTGqCGCzf2ofKibp8jUNPj9+YHx2eFR80wG539dFxt9Ksw9dhhOMHZbKPYp0DO1UOKehVbq+FBttuMusgERd/C8JLKz1gws+2k6UNFaB3eH7I07h9MXN+pas44+gA79kLV7L/3dIYvP+guY5jqjWdiMDGE5eBJEhKw1Lsl3FotgiWQaNHaC9KYwxFEfVyUm+/pk2ZEOcd4dUGdFSUyoooQssgvSxIhKvHxUUJ53TSJYffFmvsSiNvGUgLHu4ofPzVG/znq21CCHrnf5A0oHDjeg0l/P6YZKQrTjhjLitKe7H3Oyw04NZu1HqdTknAzGh4qhSi6s0sAE/vOLGR92BzROLgk2Rvz4Tc5bnMP28g2ymcgSQR37jPmDcZwkYHYzugYJVWBC5dB8esROfK7C3wPO0DdZJkWoBO8oFfNk/TT28VMLoWmlhqEH/Z3NIDrbdaE6Ta5GOilaDYY2b1pPpjZV9DCR1zF3zqmDCx1nYyjNECzirm5/kBFtQ3/wR6ZynlZ9ElQFeE1wJpQ9QMBSFJOnEwns8bVpsaEbj45ZXZ0ZtYbDbdLsJgRf/fjdZdsjRlE5LM5oR6iykgWA3rUBQdk5f/igK1AwJBFB1VeLcSNWyr6ZUs+pAxIKnFryxPWVY3C+wOAQz54/iwDRAi0VIjKvz/w==",
//         "t": "MTYyMDIyNDQ5OC41MzMwMDA=",
//         "m": "ymXameOapMrqo8979dUaa7QA9dwhzi/plw8HzWEQA3s=",
//         "i1": "mtarAHSPum4ysPqytdtNQQ==",
//         "i2": "P+9IccwdSsEzRATkaA8j0A==",
//         "zh": "TQkEHgHhi+xhF/iExe2uh5+tltWmrCx87Khv6iwpjq4=",
//         "uh": "6ozB8GjLYgPgJw4ufzfhk4tPSnSDxHi/QCLnfCVvdg8=",
//         "hh": "Wit0evcL1yGYPLJa0cE4cw446Y55PAPeEZUCLWtoWmw="
//     }
// };
// var _cf_chl_ctx = {
//     'chLog': {'0': {'start': 1620224501825}, 'c': 1},
//     'chReq': 'non-interactive',
//     'cNounce': _cf_chl_opt['cNounce'],
//     'cvId': '2',
//     'chC': 0,
//     'chCAS': 0,
//     'oV': 1,
//     'cRq': _cf_chl_opt['cRq']
// }

let rawindexof = String.prototype.indexOf
String.prototype.indexOf = function (str) {
    var res = rawindexof.call(this, str)
    console.log(`[String] "${this}" is indexof "${str}", res is ${res}`)
    return res
}

let Image = function() {
    return {
        addEventListener: function (state, callBack, boolValue){callBack()},
        attachEvent: function (){},
        onload: function (){},
        naturalHeight: 3,
        naturalWidth: 57,
        height: 3,
        width: 57,
        src: "",
    }
};

let mydocument = {
    head: {},
    body: {
        appendChild: function (ele) {
            return ele
        },
        removeChild: function (ele) {
        },
    },
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
        }
    },
    getElementById: function (ele_id) {
        console.log(ele_id);
        if (ele_id === "challenge-form") {
            return {
                removeChild: function (ele) {
                },
                appendChild: function (ele) {
                }
            }
        }else if (ele_id === "cf-bubbles"){
            return dom.window.document.createElement("div")
        }
    },
    appendChild: function () {
    },
    createElement: function (eleName) {
        if (eleName === "iframe") {
            console.log(pureWindow.pureWindow.contentWindow.Object)
            ele = pureWindow.pureWindow
        } else {
            ele = dom.window.document.createElement(eleName);
        }
        return ele;
    },
    querySelectorAll: function(eleName){
        if (eleName === 'script'){
            return {"length": 6}
        }
    }
}

let plugins = [
    {
        'description': "Portable Document Format",
        'filename': "internal-pdf-viewer",
        'length': 1,
        'name': "Chrome PDF Plugin",
        'mimeTypes': [
            {
                "type": "application/x-google-chrome-pdf",
                "suffixes": "pdf"
            }
        ]
    },
    {
        'description': "",
        'filename': "mhjfbmdgcfjbbpaeojofohoefgiehjai",
        'length': 1,
        'name': "Chrome PDF Viewer",
        "mimeTypes": [
            {
                "type": "application/pdf",
                "suffixes": "pdf"
            }
        ]
    },
    {
        'description': "",
        'filename': "internal-nacl-plugin",
        'length': 1,
        'name': "Native Client",
        "mimeTypes": [
            {
                "type": "application/x-nacl",
                "suffixes": ""
            },
            {
                "type": "application/x-pnacl",
                "suffixes": ""
            }
        ]
    }
];
plugins.item = function (x){
    if (x === 4294967296){
        return plugins[0]
    }
    return plugins[x]
};

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
    serial: {},
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

    getBattery: function (){},
    getGamepads: function(){},
    javaEnabled: function (){},
    sendBeacon: function(){},
    vibrate: function(){},
    serial: {},
    canShare: function(){},
    registerProtocolHandler: function(){},
    unregisterProtocolHandler: function(){},
    getInstalledRelatedApps: function(){},
    clearAppBadge: function(){},
    setAppBadge: function(){},
    getUserMedia: function(){},
    requestMIDIAccess: function(){},
    requestMediaKeySystemAccess: function(){},
    webkitGetUserMedia: function (){},
    share: function (){},
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
    replaceState: function (){},
};

let myChrome = {
    app: {
        InstallState: {},
        RunningState: {},
        getDetails: function(){},
        getIsInstalled: function(){},
        installState: function(){},
        isInstalled: false,
        runningState: function(){},

    },
    csi: function () {},
    loadTimes: function(){},
    runtime: {
        OnInstalledReason: {},
        OnRestartRequiredReason: {},
        PlatformArch: {},
        PlatformNaclArch: {},
        PlatformOs: {},
        RequestUpdateCheckStatus: {},
        connect: {},
        id: undefined,
        sendMessage: function () {},
    }
};

let mywindow = {
    chrome: myChrome,
    XMLHttpRequest: XMLHttpRequest,
    canvas: canvas,
    sessionStorage: {},
    localStorage: {},
    _cf_atob: atob,
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
    sendRequest: function (s) {
        for (var i = 1; i <= window._cf_chl_ctx.chC; i++) {
            var fp = window._cf_chl_ctx[String(i)].fp;
            if (fp && fp.length === 0) {
                window._cf_chl_ctx[String(i)].fp = [
                    {
                        "i": 8,
                        "h": 28
                    },
                    {
                        "i": 20,
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

function getMethodHandler(WatchName) {
    let methodhandler = {
        apply(target, thisArg, argArray) {
            let result = Reflect.apply(target, thisArg, argArray)
            console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [${argArray}], result is [${result}].`)
            return result
        },
        construct(target, argArray, newTarget) {
            var result = Reflect.construct(target, argArray, newTarget)
            console.log(`[${WatchName}] construct function name is [${target.name}], argArray is [${argArray}], result is [${JSON.stringify(result)}].`)
            return result;
        }
    }
    return methodhandler
}

function getObjhandler(WatchName) {
    let handler = {
        get(target, propKey, receiver) {
            if (propKey === 'xmlhttprequest'){
                debugger
            }
            let result = Reflect.get(target, propKey, receiver)
            if (result instanceof Object) {
                if (typeof result === "function") {
                    console.log(`[${WatchName}] getting propKey is [${propKey}] , it is function`)
                    return new Proxy(result,getMethodHandler(WatchName))
                } else {
                    console.log(`[${WatchName}] getting propKey is [${propKey}], result is [${JSON.stringify(result)}]`);
                }
                return new Proxy(result, getObjhandler(`${WatchName}.${propKey}`))
            }
            console.log(`[${WatchName}] getting propKey is [${propKey?.description ?? propKey}], result is [${result}]`);
            return result;
        },
        set(target, propKey, value, receiver) {
            if (value instanceof Object) {
                console.log(`[${WatchName}] setting propKey is [${propKey}], value is [${JSON.stringify(value)}]`);
            } else {
                console.log(`[${WatchName}] setting propKey is [${propKey}], value is [${value}]`);
            }
            return Reflect.set(target, propKey, value, receiver);
        },
        has(target, propKey) {
            var result = Reflect.has(target, propKey);
            console.log(`[${WatchName}] has propKey [${propKey}], result is [${result}]`)
            return result;
        },
        deleteProperty(target, propKey) {
            var result = Reflect.deleteProperty(target, propKey);
            console.log(`[${WatchName}] delete propKey [${propKey}], result is [${result}]`)
            return result;
        },
        getOwnPropertyDescriptor(target, propKey) {
            var result = Reflect.getOwnPropertyDescriptor(target, propKey);
            console.log(`[${WatchName}] getOwnPropertyDescriptor  propKey [${propKey}] result is [${JSON.stringify(result)}]`)
            return result;
        },
        defineProperty(target, propKey, attributes) {
            var result = Reflect.defineProperty(target, propKey, attributes);
            console.log(`[${WatchName}] defineProperty propKey [${propKey}] attributes is [${JSON.stringify(attributes)}], result is [${result}]`)
            return result
        },
        getPrototypeOf(target) {
            var result = Reflect.getPrototypeOf(target)
            console.log(`[${WatchName}] getPrototypeOf result is [${JSON.stringify(result)}]`)
            return result;
        },
        setPrototypeOf(target, proto) {
            console.log(`[${WatchName}] setPrototypeOf proto is [${JSON.stringify(proto)}]`)
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
            console.log(`[${WatchName}] invoke ownkeys, result is [${JSON.stringify(result)}]`)
            return result
        },
        apply(target, thisArg, argArray) {
            let result = Reflect.apply(target, thisArg, argArray)
            console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [${argArray}], result is [${result}].`)
            return result
        },
        construct(target, argArray, newTarget) {
            var result = Reflect.construct(target, argArray, newTarget)
            console.log(`[${WatchName}] construct function name is [${target.name}], argArray is [${argArray}], result is [${JSON.stringify(result)}].`)
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
    history
}


