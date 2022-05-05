var plugins = require("./plugin").plugins;
var mimetypes = require("./mimetype").mimetypes;

makeFnsNative = (obj) => {
    const oldCall = Function.prototype.call
    function call () {
        return oldCall.apply(this, arguments)
    }
    // eslint-disable-next-line
    Function.prototype.call = call

    const nativeToStringFunctionString = Error.toString().replace(
        /Error/g,
        'toString'
    )
    const oldToString = Function.prototype.toString

    function functionToString () {
        for (var pro in obj) {
            if (typeof obj[pro] === "function" && this === obj[pro]) {
                return `function ${obj[pro].name}() { [native code] }`
            }
        }

        if (this === functionToString) {
            return nativeToStringFunctionString
        }
        // return oldCall.call(oldToString, this)
        return this.toString.name.indexOf(this.name) !== -1 ? `function ${this.name}() { [native code] }`:oldCall.call(oldToString, this)
    }
    // eslint-disable-next-line
    Function.prototype.toString = functionToString
}

var p = Object.create({});
Object.defineProperty(p,'level',{enumerable: true, configurable: true, get: ()=> 1});
Object.defineProperty(p,'charging',{get: ()=> true});
Object.defineProperty(p,'chargingTime',{get: ()=> 0});
Object.defineProperty(p,'dischargingTime',{get: ()=> Infinity});

Object.defineProperty(p,'onchargingchange',{get: ()=> null});
Object.defineProperty(p,'onchargingtimechange',{get: ()=> null});
Object.defineProperty(p,'ondischargingtimechange',{get: ()=> null});
Object.defineProperty(p,'onlevelchange',{get: ()=> null});

let navigatorProperties = {
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36",
    bluetooth: {},
    clipboard: {},
    connection: {downlink: 10, effectiveType: "4g", onchange: null, rtt: 250, saveData: false},
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
    mimeTypes: mimetypes,
    onLine: true,
    permissions: {},
    platform: "Win32",
    plugins: plugins.plugins,
    presentation: {},
    product: "Gecko",
    productSub: "20030107",
    scheduling: {},
    serial: {},
    serviceWorker: {},
    storage: {},
    usb: {},
    userActivation: {},
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36",
    userAgentData: {},
    vendor: "Google Inc.",
    vendorSub: "",
    wakeLock: {},
    webdriver: false,
    webkitPersistentStorage: {},
    webkitTemporaryStorage: {},
    xr: {},
    managed: {},
    // getBattery: function (){return Promise.resolve(p)},
    getBattery: () => { return new Promise(function(resolve, reject) {
        return resolve(p); });
    },
    getGamepads: function(){},
    javaEnabled: function (){},
    sendBeacon: function(){},
    vibrate: function(){},
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

class Navigator {
    constructor() {
        // 配置可被遍历的属性
        for (var proKey in navigatorProperties){
            Object.defineProperty(Navigator.prototype, proKey, {
                enumerable: true,
                value: navigatorProperties[proKey]
            })
        }
    }

    get [Symbol.toStringTag]() {
        return 'Navigator'
    }

}

navigator = new Navigator()
makeFnsNative(navigator)


// console.log(Function.prototype.toString.call(navigator.getBattery))
// console.log(navigator.hasOwnProperty('appCodeName'))
// console.log(navigator.__proto__.hasOwnProperty('appCodeName'))
// for (var k in navigator) {
//     console.log(k)
// }
// console.log(navigator.toString())
// navigator.getBattery().then(function(battery){
//     console.log(battery.charging); // Boolean
//     console.log(battery.chargingTime); // Infinity
//     console.log(battery.dischargingTime); // Infinity
//     console.log(battery.level ); // Float (0 to 1)
// });
// console.log(navigator.getBattery.toString())
// navigator.getBattery().then(function(battery) {
//     console.log(battery.level)
// });

module.exports = {
    navigator
}
