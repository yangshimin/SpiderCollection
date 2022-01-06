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
    console.log("需要计算WebGLRenderingContext");
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