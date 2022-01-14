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
let index_code = fs.readFileSync("static\\index.html", {
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
history.length = 2;
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
    "innerHTML": {"length": 105790},
    "innerText": {"length": 810},
    "textContent": {"length": 77414},
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
        return []
    }else if (tag.toLowerCase() === "input"){
        return new Array(10).fill({})
    }else if (tag.toLowerCase() === "script"){
        let scriptArray = new Array(28).fill({});
        scriptArray.push({"src": 'https://acstatic-dun.126.net/tool.min.js'})
        return scriptArray;
    }
    return dom.window.document.getElementsByTagName(tag)
};
document.getElementById = function(tagId){
    console.log("find ele by id: ", tagId);
    if (tagId.toLowerCase().startsWith('fp_')){
        return {"offsetHeight": 14}
    }
    return dom.window.document.getElementById(tagId);
};
document.createElement = function (tag) {
    console.log("createElement ele: ", tag)
    if (tag.toLowerCase() === "canvas") {
        // return canvas.createCanvas(300, 150)
        canvasEle = dom.window.document.createElement(tag);
        canvasEle.toDataURL = function(){return 'data:image/png;base64,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'}
        return canvasEle;
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
location.origin = "https://dun.163.com";
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