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

// 不能采取document.$cookie的方式来定义 代码中有检查属性的第一个字符是否是$
document.cookie = dom.window.document.cookie
let CookieStore = Object;
// Object.defineProperty(document, 'cookie', {
//     get: function () {
//         let cookieStr = "";
//         for (let name in CookieStore) {
//             cookieStr += name + "=" + CookieStore[name] + "; ";
//         }
//         return cookieStr.slice(0, cookieStr.length - 2)
//     },
//     set: function (value) {
//         Object.assign(CookieStore, cookieIns.parse(value))
//     }
// });

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

eval(js_code);


document.cookie = 'acw_tc=3ccdc16716345348156607403e72ef5c411f918ed582bb912b648d5b081b5e; neCYtZEjo8GmO=5mCBUagAWIzsZf.780L55DrbdsBSbNmYp8XwaFInEtZGaWgn.0pJNjwMjKcA7QUFujWeKTm47HjCQcGUPLOP_GG; neCYtZEjo8GmP=53K0l8bmzrFGqqqmZ9w25Mqc1PHBEgQva43D3ce5floYyignbNJjUDg4UpwmjfLBIPGZ3XS0VEAw313KyVbzjXgKjOCTB0GC1VgvYgIg_bPTPHdORs95Hs9rWJTc_bUEywFceBjAWOIysTYfQZM.GWyTqpm0NVeOL.8OTByM9spgoA0uxTFBeWJZfhaKo3bOabqYs.xxCF3mXA.thTmtrA.2nqG8sWC3rmntcmBMalmgLhM3TgPmIGBT9Y3uUYu4Hg';
(function(){var _$6d=0,_$M2=[[0,5,1,2,6,7,3,4],[56,72,6,101,84,5,98,54,17,45,41,45,58,10,61,26,61,45,22,70,2,1,91,37,9,34,64,76,52,30,45,50,53,20,44,65,59,21,73,78,75,82,21,16,15,39,47,90,21,94,100,0,101,81,21,96,13,62,92,66,97,31,68,21,8,88,21,99,36,67,24,45,3,71,32,67,4,28,45,19,67,45,93,86,101,42,40,80,87,27,45,33,60,48,60,46,49,12,77,95,74,57,18,11,14,102,29,35,7,89,85,38,83,69,51,63,43,25,23,79,55,45],[16,18,14,22,7,23,6,29,10,30,28,17,28,19,11,10,32,8,33,25,24,12,1,0,15,20,15,3,15,21,5,21,15,13,27,15,4,15,26,9,2,31,10],[17,0,25,6,45,24,3,19,29,35,18,21,32,49,9,14,42,47,10,35,7,36,16,15,22,28,37,44,36,43,23,40,39,28,13,48,1,33,13,27,2,38,2,34,5,35,2,8,5,49,4,11,12,31,26,46,38,5,8,4,34,20,30,41,45],[0,3,7,33,27,32,28,26,19,31,4,25,9,24,13,25,16,1,13,22,14,15,29,2,30,12,18,22,10,17,35,8,11,2,36,18,21,10,25,23,34,20,25,5,31,6,25]];function _$2h(_$uv,_$pR){return _$Ue.Math.abs(_$uv)%_$pR;}function _$Ak(_$kw){_$kw[_$2h(_$Jk()-_$kw[_$2h(_$M0(),16)],16)]=_$kw[_$2h(_$I5()+_$aT(),16)];_$kw[14]=_$Jk()-_$kw[_$2h(_$M0(),16)];if(_$I5()-_$kw[_$2h(_$z$(),16)]){if(_$Jk()+_$oA()){_$kw[6]=_$po();}}_$_H(_$kw);_$kw[2]=_$v_()-_$kw[_$2h(_$aX(),16)];var _$Q3=_$I5();if(_$yg()-_$kw[_$2h(_$po(),16)]){_$kw[_$2h(_$v_()+_$25(),16)]=_$xR(_$kw);}_$Cz(_$kw);return _$y6(_$kw);}function _$Jk(){return 5}function _$M0(){return 8}function _$I5(){return 13}function _$aT(){return 3}function _$z$(){return 0}function _$oA(){return 11}function _$po(){return 4}function _$25(){return 15}function _$w8(){return 10}function _$7v(_$kw){var _$Q3=_$25();var _$jp=_$Jk();_$kw[11]=_$yg();var _$Bj=_$3U();var _$Bj=_$z$();return _$YF();}function _$yg(){return 1}function _$3U(){return 2}function _$YF(){return 14}function _$_H(_$kw){_$sx(_$kw);_$kw[_$2h(_$kw[_$2h(_$aX(),16)],16)]=_$QA(_$kw);_$kw[_$2h(_$kX(_$kw),16)]=_$Mo(_$kw);return _$9i(_$kw);}function _$sx(_$kw){_$mI(_$kw);_$SB(_$kw);var _$Bj=_$YF();if(_$M0()){_$kw[_$2h(_$1E(),16)]=_$I5();}_$Rb(_$kw);return _$I5()+_$aT();}function _$mI(_$kw){_$kw[2]=_$z$();var _$jp=_$Jk();var _$Bj=_$oA();_$kw[1]=_$1E();return _$I5();}function _$1E(){return 7}function _$SB(_$kw){var _$jp=_$aX();var _$Bj=_$w8();_$kw[8]=_$MK();_$kw[4]=_$3U();_$kw[_$2h(_$v_(),16)]=_$25();return _$Jk();}function _$aX(){return 12}function _$MK(){return 6}function _$v_(){return 9}function _$Rb(_$kw){var _$Q3=_$1E();var _$Bj=_$I5();var _$jp=_$YF();var _$Q3=_$aX();_$kw[10]=_$M0();return _$MK();}function _$QA(_$kw){var _$Q3=_$1E();var _$Bj=_$I5();_$kw[_$2h(_$z$(),16)]=_$YF();var _$Bj=_$oA();var _$jp=_$yg();return _$1E();}function _$kX(_$kw){var _$Bj=_$25();var _$Bj=_$Jk();_$kw[_$2h(_$M0(),16)]=_$MK();_$kw[4]=_$3U();return _$z$();}function _$Mo(_$kw){_$kw[12]=_$w8();_$kw[8]=_$MK();_$kw[4]=_$3U();return _$z$();}function _$9i(_$kw){if(_$Jk()){_$kw[_$2h(_$M0(),16)]=_$MK();}_$3J(_$kw);_$UY(_$kw);var _$jp=_$1E();if(_$w8()){var _$jp=_$I5();}_$kw[12]=_$w8();return _$yg()+_$1E();}function _$3J(_$kw){_$kw[15]=_$Jk();var _$jp=_$MK();var _$Bj=_$po();_$kw[_$2h(_$aT(),16)]=_$v_();var _$jp=_$w8();var _$Q3=_$M0();return _$MK();}function _$UY(_$kw){var _$jp=_$v_();var _$Q3=_$25();var _$Q3=_$M0();var _$jp=_$MK();var _$Bj=_$aT();var _$Bj=_$v_();return _$25();}function _$xR(_$kw){_$kw[8]=_$MK();var _$jp=_$aT();var _$Q3=_$v_();_$kw[_$2h(_$aX(),16)]=_$w8();return _$M0();}function _$Cz(_$kw){_$kw[12]=_$o5(_$kw);_$kw[_$2h(_$xQ(_$kw),16)]=_$Jk();if(_$yg()+_$1E()){_$kw[2]=_$z$();}var _$Q3=_$yg();var _$jp=_$kw[_$2h(_$po(),16)];var _$Bj=_$YF();if(_$kw[_$2h(_$z$(),16)]){if(_$25()){_$kw[_$2h(_$w8(),16)]=_$M0();}}return _$4E(_$kw);}function _$o5(_$kw){_$kw[_$2h(_$yg(),16)]=_$1E();var _$jp=_$z$();var _$Q3=_$YF();var _$Q3=_$oA();var _$jp=_$yg();return _$1E();}function _$xQ(_$kw){var _$jp=_$25();var _$jp=_$Jk();var _$Bj=_$MK();var _$Q3=_$po();_$kw[_$2h(_$aT(),16)]=_$v_();return _$25();}function _$4E(_$kw){_$ne(_$kw);_$0x(_$kw);_$kw[14]=_$aX();return _$Cp(_$kw);}function _$ne(_$kw){_$kw[_$2h(_$1E(),16)]=_$I5();var _$Q3=_$YF();var _$Bj=_$aX();var _$Bj=_$M0();return _$MK();}function _$0x(_$kw){var _$Q3=_$v_();var _$Bj=_$25();_$kw[5]=_$oA();var _$jp=_$po();var _$Q3=_$3U();return _$z$();}function _$Cp(_$kw){_$kw[_$2h(_$yg(),16)]=_$1E();_$kw[13]=_$aT();var _$Q3=_$aX();var _$Q3=_$w8();return _$M0();}function _$y6(_$kw){_$0P(_$kw);_$kw[6]=_$I5()+_$aT();_$G2(_$kw);_$Z9(_$kw);_$kw[2]=_$v_()+_$25();return _$0T(_$kw);}function _$0P(_$kw){_$kw[2]=_$z$();if(_$25()){_$kw[_$2h(_$w8(),16)]=_$M0();}_$kw[3]=_$v_();if(_$aX()){_$kw[_$2h(_$oA(),16)]=_$yg();}_$kw[0]=_$YF();return _$Jk()+_$oA();}function _$G2(_$kw){_$kw[_$2h(_$Jk(),16)]=_$oA();_$kw[_$2h(_$MK(),16)]=_$po();var _$jp=_$v_();var _$Bj=_$25();_$kw[_$2h(_$w8(),16)]=_$M0();return _$pL(_$kw);}function _$pL(_$kw){var _$jp=_$aT();var _$Q3=_$v_();var _$Bj=_$w8();var _$jp=_$M0();_$kw[_$2h(_$1E(),16)]=_$I5();return _$aT();}function _$Z9(_$kw){_$kw[_$2h(_$aX(),16)]=_$w8();var _$Bj=_$1E();var _$Bj=_$I5();var _$Q3=_$yg();if(_$z$()){_$kw[14]=_$aX();}if(_$3U()){var _$Q3=_$YF();}return _$yg()+_$1E();}function _$0T(_$kw){_$kw[8]=_$MK();var _$Bj=_$YF();if(_$I5()){var _$Q3=_$aX();}var _$Bj=_$3U();var _$Bj=_$z$();return _$c9(_$kw);}function _$c9(_$kw){var _$jp=_$oA();var _$Q3=_$yg();_$kw[_$2h(_$po(),16)]=_$3U();_$kw[0]=_$YF();return _$aX();}var _$Sq,_$YW,_$Ue,_$x3,_$fK,_$3l,_$3g,_$hB,_$Ak;var _$o4,_$iq,_$QN=_$6d,_$7P=_$M2[0];while(1){_$iq=_$7P[_$QN++];if(_$iq<4){if(_$iq<1){_$Sq=[4,16,64,256,1024,4096,16384,65536];}else if(_$iq<2){_$hB=_$Ue['$_ts'];}else if(_$iq<3){_$o4= !_$hB;}else{_$yv(0);}}else{if(_$iq<5){return;}else if(_$iq<6){_$Ue=window,_$x3=String,_$fK=Array,_$3l=document,_$3g=Date;}else if(_$iq<7){if( !_$o4)_$QN+=1;}else{_$hB=_$Ue['$_ts']={};}}}function _$yv(_$Jk,_$uv){function _$xw(){var _$2h=_$fa.charCodeAt(_$R7++ ),_$6d;if(_$2h<128){return _$2h;}else if(_$2h<251){return _$2h-32;}else if(_$2h===251){return 0;}else if(_$2h===254){_$2h=_$fa.charCodeAt(_$R7++ );if(_$2h>=128)_$2h-=32;_$6d=_$fa.charCodeAt(_$R7++ );if(_$6d>=128)_$6d-=32;return _$2h*219+_$6d;}else if(_$2h===255){_$2h=_$fa.charCodeAt(_$R7++ );if(_$2h>=128)_$2h-=32;_$6d=_$fa.charCodeAt(_$R7++ );if(_$6d>=128)_$6d-=32;_$2h=_$2h*219*219+_$6d*219;_$6d=_$fa.charCodeAt(_$R7++ );if(_$6d>=128)_$6d-=32;return _$2h+_$6d;}else if(_$2h===252){_$6d=_$fa.charCodeAt(_$R7++ );if(_$6d>=128)_$6d-=32;return -_$6d;}else if(_$2h===253){_$2h=_$fa.charCodeAt(_$R7++ );if(_$2h>=128)_$2h-=32;_$6d=_$fa.charCodeAt(_$R7++ );if(_$6d>=128)_$6d-=32;return _$2h* -219-_$6d;}else{}}var _$ZD,_$OE,_$Q3,_$z6,_$fa,_$QK,_$HX,_$2h,_$6d,_$QN,_$o4,_$tu,_$iq,_$7P,_$kw,_$cz,_$Wv,_$Bj,_$jp,_$R7;var _$I5,_$z$,_$M0=_$Jk,_$oA=_$M2[1];while(1){_$z$=_$oA[_$M0++];if(_$z$<64){if(_$z$<16){if(_$z$<4){if(_$z$<1){_$I5=_$Wv>0;}else if(_$z$<2){_$2h+="xnXqAaokv23fzUfL5q9jz1IN6m_cDhpieIB4zfkcVZ5TB_V8$6wg0ur0$ffOG7SLarriWW5MhpDoHy1pGOeHkN_V_F$XXsGvngX9trm5wHNP4YQYuRrFRwW10F6qkrTHrbmf_LbxHJkF93dFEu2N_4VmnhvAfxlz778cJDzBp6dY5sX8wuUudaNEmgqU";}else if(_$z$<3){_$2h+="0xCpy60PG2pLZ90Tc9Zs1AZX8F6tKHrjdrbC8ppv_XBkyw0XcsaRSstsaCdGmAkpDSN2gAlR5GbnErdBDYrQCfHA4upt$osdc6EXldbQafoqAJVLYpRMB9wE34hUuAIhLQUBPJd49GgCEhTw4tSJooW36x1XFqmL1IrsAXbgL6JpxqmoXBWociqtu3b0";}else{var _$2h=_$Ue.eval.toString();}}else if(_$z$<8){if(_$z$<5){return 1;}else if(_$z$<6){_$M0+=1;}else if(_$z$<7){_$I5=_$hB["a670748"];}else{_$uv._$3g="jaMfrbYVZ0uLRd4A1L7wKG";}}else if(_$z$<12){if(_$z$<9){_$6d=_$yv(10);}else if(_$z$<10){_$2h+="Wu_ApbAWmrfikQOuHVmXc_Q03KHky$7fDJw51u3P_Sq698eKsGPqYVbro31wLxroOW7A56nQmCnaznyMd_Q$tc45NeJvNS3EM5NozuDI1ZCdjizR3Xk9$5XSffqwagxpEmljTaph8mWbluwGlpH$KFPKeDjLf9pHK3NMkdoSOFtdfji2aZyNnyKtJxes";}else if(_$z$<11){for(_$2h=0,_$6d=0;_$6d<_$QN;_$6d+=2){_$o4[_$2h++ ]=_$tu+_$uv.substr(_$6d,2);}}else{_$uv._$AJ="_$sx";}}else{if(_$z$<13){_$uv._$c6="_$po";}else if(_$z$<14){var _$cz=[];}else if(_$z$<15){_$uv._$I5="_$_H";}else{var _$iq=_$xw();}}}else if(_$z$<32){if(_$z$<20){if(_$z$<17){var _$tu=_$xw();}else if(_$z$<18){_$Ue['$_ts'].l__=_$hB.l__;}else if(_$z$<19){_$uv._$bQ="_$3U";}else{_$I5=_$uv===undefined||_$uv==="";}}else if(_$z$<24){if(_$z$<21){_$hB["a670748"]=_$YW;}else if(_$z$<22){}else if(_$z$<23){var _$2h='';}else{_$uv._$tu="_$RM";}}else if(_$z$<28){if(_$z$<25){_$hB._$wg=1;}else if(_$z$<26){_$uv._$$f="_$HJ";}else if(_$z$<27){_$uv._$Ue=234;}else{return _$2h;}}else{if(_$z$<29){return 0;}else if(_$z$<30){_$uv._$fK="Q8rWeK5PwPa";}else if(_$z$<31){return _$yv(12,_$2h);}else{var _$jp=_$cz.join('');}}}else if(_$z$<48){if(_$z$<36){if(_$z$<33){_$I5=_$2h!=="functioneval(){[nativecode]}";}else if(_$z$<34){_$uv._$gj=34;}else if(_$z$<35){_$2h+="S4qyeae4t89JbLlHxSZLJeNH5LsyNt_2DLAtqpKjhHg2yTVH3RRH1svvLHhtwB_uZf$nX6UGRaenIDaWSSVxN3bh5SjoADl8inX2ulE7uNDzUIW9DtgK1ocxUl$vmNDaAEPBAmppZ03mbeGFK_frUOsgRdT3TyaBKvdKAbIcRrZz$Ss07rY$IxRuSnQt";}else{_$uv._$dH="J8f3J5j5MDA";}}else if(_$z$<40){if(_$z$<37){_$I5=_$Q3-_$2h>12000;}else if(_$z$<38){_$2h+="5mQF7ym8kMWjGk4Pmn$x7biPMW8Gow9UCvVce_2L$ptpiuN$Qb_qrhy55Ikvhzj9vcKU2FqHyISaeGgM6wxIhFByCuTisUKqZFZr6SZoAg5o0$Mz$BkBiDxF9AEiXm91TkI7NJNNZwcYzQxWZ36l_J4erlhmv1utoIyL$G$4qYcHMT$yMqfdyDui0G4H";}else if(_$z$<39){_$uv._$7P="stJ8RLXmjQ1vHnekPzvo3q";}else{var _$ZD=_$xw();}}else if(_$z$<44){if(_$z$<41){_$M0+=2;}else if(_$z$<42){return new _$3g().getTime();}else if(_$z$<43){_$2h=_$Ue.execScript(_$uv);}else{_$uv._$cz="_$Tw";}}else{if(_$z$<45){var _$QK=_$hB._$rs;}else if(_$z$<46){return;}else if(_$z$<47){_$uv._$Ig=1;}else{var _$z6=_$xw();}}}else{if(_$z$<52){if(_$z$<49){return _$o4;}else if(_$z$<50){_$uv._$af="_$YF";}else if(_$z$<51){_$hB._$6d=new _$3g().getTime();}else{_$uv._$kw="_$wE";}}else if(_$z$<56){if(_$z$<53){_$2h+="KWGphJymtB9X7Fum9tW4CYBBJGKhONK0_70V8rTdxEq9iOlIFNDkKGxbFUjZbK3Azb8NmwHp4WT5zo8njO53U8m4R2DQpq4jgIaY6eN6foV_Yw1mWGeSQi4s8AYtzNPrMlFmoYf25zGli_fRZ60w2DLctglJX1471zDGK8eXhvXOD6_hQEV7wYnCpYoJ4NJ$";}else if(_$z$<54){var _$fa=_$hB["a670748"];}else if(_$z$<55){_$Ue['$_ts']={};}else{_$uv._$Wv="_$34";}}else if(_$z$<60){if(_$z$<57){_$hB._$rs=_$yv(18);}else if(_$z$<58){_$uv._$ld="_$yg";}else if(_$z$<59){var _$2h,_$6d,_$QN=_$uv.length,_$o4=new _$fK(_$QN/2),_$tu='_$';}else{var _$6d=_$yv(10);}}else{if(_$z$<61){_$M0+=-78;}else if(_$z$<62){_$M0+=78;}else if(_$z$<63){var _$Wv=_$xw();}else{_$uv._$r0="_$Ba";}}}}else{if(_$z$<80){if(_$z$<68){if(_$z$<65){_$2h+="OMfHbpChNILVnZ61aIgeVos5b9cOzqNWXiTD$m9CHqPcyPNv0cyAEGPPvMlP7lY1WabFbRGghbtUfY4agwkxVuAzGe2kl94_75Jbbic85vBZpMaQ$ioCl55y0LDudky4JljVYAV9wFF8q10kEdtIQHBRaKQL_pSyy3WtEWLWJ4Xo_RW6j4b8Lqn12OT7";}else if(_$z$<66){var _$2h=_$yv(10);}else if(_$z$<67){for(_$Bj=0;_$Bj<_$Wv;_$Bj++ ){_$cz.push("}");}}else{if( !_$I5)_$M0+=1;}}else if(_$z$<72){if(_$z$<69){_$hB._$6d-=_$yv(10);}else if(_$z$<70){_$uv._$0u="_$up";}else if(_$z$<71){_$2h+="SqYWUex3fK3l3ghBAkuvpRxwfaQKHXR7ZDz6OEhZwh55nW7oJmmFt$qLsELsPpYcY3Bxud5tgjIgdHzZPGM2lvyvAn13rR2h6dQNo4tuiq7PkwczWvBjjpQ3JkM0I5aTz$oApo25w87vyg3UYF_HsxmI1ESBaXMKv_RbQAkXMo9i3JUYxRCzo5xQ4Ene";}else{_$2h=_$2h.replace(RegExp('[\\r\\n\\s]','g'),"");}}else if(_$z$<76){if(_$z$<73){_$yv(91,_$hB);}else if(_$z$<74){var _$HX=_$hB.aebi=[];}else if(_$z$<75){_$uv._$EX="_$7v";}else{var _$o4=_$fa.length;}}else{if(_$z$<77){_$2h+="6IaaklTvNs8dQXYoZ_o76zHsYN5nzI9sjjAy3Du70A6Nz2UDE5IMG3WKSfBSOUP$Xr$wYCKa5gVg7w3afwHDU0ZJT$gkT285Knm1Ipgga9Ndt1DMx6wew0SEkKgLCa9MIKc2ac_W4OU_2cim2AcMXXm2pctCiWeYgJB0J1LMBpcDjEAcz3xod2yqw$dL";}else if(_$z$<78){_$uv._$sd="_$25";}else if(_$z$<79){var _$QN=_$yv(72);}else{_$uv._$fO="_$5L";}}}else if(_$z$<96){if(_$z$<84){if(_$z$<81){_$6d=_$Ue.eval;}else if(_$z$<82){_$OE=_$fa.substr(_$R7,_$kw).split(_$x3.fromCharCode(255));}else if(_$z$<83){var _$R7=0;}else{_$uv._$6x=3;}}else if(_$z$<88){if(_$z$<85){_$yv(31);}else if(_$z$<86){_$uv._$x3=_$Ak;}else if(_$z$<87){_$I5=_$Ue.execScript;}else{_$2h=_$6d.call(_$Ue,_$uv);}}else if(_$z$<92){if(_$z$<89){_$yv(79,_$jp);}else if(_$z$<90){_$uv._$55="DOu7XspvBKA";}else if(_$z$<91){var _$7P=_$xw();}else{_$2h+="qxCTR_IC5XFS4rzglXEjfSj8n_LL8y4M3xpkdSXPJVi4KMfDL$pCUZEwCbpx_kkzZEHIcAkgS3yJYYEll$jDqGdZUHLm$R9IFuwU7uZGUj4$WR5_lthyGMHO_G7sHdsePC$DgbW5Va1j3MIjQsB7eh0aRnYeQMsNVBPWQjyh0qxjfb9zdhM8rcM35E9S";}}else{if(_$z$<93){for(_$Bj=0;_$Bj<_$Wv;_$Bj++ ){_$An(16,_$Bj,_$cz);}}else if(_$z$<94){var _$2h;}else if(_$z$<95){_$Wv=_$xw();}else{_$uv._$oq="_$w8";}}}else{if(_$z$<100){if(_$z$<97){_$R7+=_$kw;}else if(_$z$<98){_$cz.push(")();");}else if(_$z$<99){_$An(0);}else{var _$Q3=_$yv(10);}}else{if(_$z$<101){var _$kw=_$xw();}else if(_$z$<102){if( !_$I5)_$M0+=2;}else{_$uv._$M0="_$iq";}}}}}function _$An(_$o4,_$hZ,_$wh){function _$55(){var _$7P=[0];Array.prototype.push.apply(_$7P,arguments);return _$13.apply(this,_$7P);}var _$Y3,_$Bx,_$ud,_$2h,_$6d,_$QN,_$nW,_$7o,_$Jm,_$mF,_$t$,_$qL,_$sE,_$Ls,_$Pp,_$Yc;var _$iq,_$kw,_$tu=_$o4,_$cz=_$M2[2];while(1){_$kw=_$cz[_$tu++];if(_$kw<16){if(_$kw<4){if(_$kw<1){var _$Ls=_$xw();}else if(_$kw<2){var _$sE=_$xw();}else if(_$kw<3){for(_$QN=0;_$QN<_$6d;_$QN++ ){_$ud[_$QN]=_$An(9);}}else{var _$Yc=_$An(9);}}else if(_$kw<8){if(_$kw<5){var _$Bx=_$An(9);}else if(_$kw<6){var _$6d=new _$fK(_$2h);}else if(_$kw<7){_$nW.onreadystatechange=_$55;}else{_$nW=_$Ue.ActiveXObject?new _$Ue.ActiveXObject('Microsoft.XMLHTTP'):new _$Ue.XMLHttpRequest();}}else if(_$kw<12){if(_$kw<9){var _$7o=_$xw();}else if(_$kw<10){var _$ud=[];}else if(_$kw<11){return;}else{return _$6d;}}else{if(_$kw<13){var _$qL=_$xw();}else if(_$kw<14){var _$2h=_$An(9);}else if(_$kw<15){_$iq=_$6d;}else{}}}else if(_$kw<32){if(_$kw<20){if(_$kw<17){var _$2h=_$3l.scripts.length;}else if(_$kw<18){var _$Y3=_$An(9);}else if(_$kw<19){var _$6d=_$2h>1?_$3l.scripts[_$2h-2].src:_$YW;}else{for(_$QN=0;_$QN<_$2h;_$QN++ ){_$6d[_$QN]=_$xw();}}}else if(_$kw<24){if(_$kw<21){var _$Pp=_$An(9);}else if(_$kw<22){_$tu+=-19;}else if(_$kw<23){if( !_$iq)_$tu+=4;}else{_$nW.open('GET',_$6d,false);}}else if(_$kw<28){if(_$kw<25){var _$t$=_$xw();}else if(_$kw<26){var _$mF=_$xw();}else if(_$kw<27){var _$6d=_$xw();}else{_$HX[_$hZ]=_$2h;}}else{if(_$kw<29){_$tu+=19;}else if(_$kw<30){_$nW.send();}else if(_$kw<31){var _$2h=_$xw();}else{_$13(5,_$wh);}}}else{if(_$kw<33){var _$nW=_$xw();}else{var _$Jm=_$xw();}}}function _$13(_$6d,_$5t){var _$gj,_$2h;var _$o4,_$iq,_$QN=_$6d,_$7P=_$M2[3];while(1){_$iq=_$7P[_$QN++];if(_$iq<16){if(_$iq<4){if(_$iq<1){_$QN+=23;}else if(_$iq<2){for(_$2h=1;_$2h<_$Yc.length;_$2h++ ){_$5t.push(",");_$5t.push(_$QK[_$Yc[_$2h]]);}}else if(_$iq<3){_$5t.push(",");}else{_$o4=_$hZ==0;}}else if(_$iq<8){if(_$iq<5){_$5t.push("[");}else if(_$iq<6){_$5t.push("=");}else if(_$iq<7){_$QN+=27;}else{_$o4=_$Pp.length;}}else if(_$iq<12){if(_$iq<9){_$5t.push(_$QK[_$Ls]);}else if(_$iq<10){_$5t.push("=$_ts.aebi;");}else if(_$iq<11){_$5t.push("(");}else{_$5t.push(_$hZ);}}else{if(_$iq<13){_$5t.push("];");}else if(_$iq<14){_$5t.push("var ");}else if(_$iq<15){_$QN+=8;}else{_$5t.push("){");}}}else if(_$iq<32){if(_$iq<20){if(_$iq<17){for(_$2h=0;_$2h<_$Pp.length;_$2h++ ){_$5t.push(",");_$5t.push(_$QK[_$Pp[_$2h]]);}}else if(_$iq<18){_$o4=_$nW.readyState==4;}else if(_$iq<19){_$5t.push("=0,");}else{if( !_$o4)_$QN+=8;}}else if(_$iq<24){if(_$iq<21){_$5t.push("++];");}else if(_$iq<22){_$5t.push(_$QK[_$ZD]);}else if(_$iq<23){_$QN+=-23;}else{_$QN+=-27;}}else if(_$iq<28){if(_$iq<25){var _$2h,_$gj=4;}else if(_$iq<26){for(_$2h=0;_$2h<_$Y3.length;_$2h+=2){_$rR(0,_$Y3[_$2h],_$Y3[_$2h+1],_$5t);}}else if(_$iq<27){if( !_$o4)_$QN+=9;}else{_$5t.push(_$QK[_$Jm]);}}else{if(_$iq<29){if( !_$o4)_$QN+=4;}else if(_$iq<30){_$5t.push("(function(){var ");}else if(_$iq<31){_$rR(12,0,_$ud.length);}else{_$o4=_$ud.length;}}}else if(_$iq<48){if(_$iq<36){if(_$iq<33){_$5t.push("=$_ts.scj,");}else if(_$iq<34){_$5t.push(";");}else if(_$iq<35){_$5t.push(_$QK[_$nW]);}else{_$5t.push(_$QK[_$7o]);}}else if(_$iq<40){if(_$iq<37){if( !_$o4)_$QN+=1;}else if(_$iq<38){_$yv(79,_$nW.responseText);}else if(_$iq<39){_$5t.push(_$QK[_$sE]);}else{_$o4=_$Yc.length;}}else if(_$iq<44){if(_$iq<41){_$rR(39);}else if(_$iq<42){_$5t.push("}");}else if(_$iq<43){_$5t.push("function ");}else{_$yv(31);}}else{if(_$iq<45){_$o4=_$hB["a670748"];}else if(_$iq<46){return;}else if(_$iq<47){_$5t.push("while(1){");}else{_$5t.push(_$QK[_$t$]);}}}else{if(_$iq<49){_$5t.push(_$QK[_$Yc[0]]);}else{_$5t.push(_$QK[_$z6]);}}}function _$rR(_$tu,_$Ig,_$dH,_$zZ){var _$6d,_$QN,_$o4,_$2h;var _$7P,_$cz,_$iq=_$tu,_$Wv=_$M2[4];while(1){_$cz=_$Wv[_$iq++];if(_$cz<16){if(_$cz<4){if(_$cz<1){_$zZ.push(["function ",_$QK[_$Ig],"(){var ",_$QK[_$mF],"=[",_$dH,"];Array.prototype.push.apply(",_$QK[_$mF],",arguments);return ",_$QK[_$qL],".apply(this,",_$QK[_$mF],");}"].join(''));}else if(_$cz<2){_$7P=_$o4==1;}else if(_$cz<3){_$6d="if(";}else{_$iq+=40;}}else if(_$cz<8){if(_$cz<5){_$5t.push(_$OE[_$2h[_$6d]]);}else if(_$cz<6){_$7P=_$Bx.length!=_$2h;}else if(_$cz<7){_$5t.push(_$OE[_$Bx[_$2h]]);}else{for(_$6d=0;_$6d<_$2h;_$6d+=2){_$5t.push(_$OE[_$Bx[_$6d]]);_$5t.push(_$QK[_$Bx[_$6d+1]]);}}}else if(_$cz<12){if(_$cz<9){for(_$2h=1;_$2h<7;_$2h++ ){if(_$o4<=_$Sq[_$2h]){_$QN=_$Sq[_$2h-1];break;}}}else if(_$cz<10){var _$2h,_$6d,_$QN,_$o4=_$dH-_$Ig;}else if(_$cz<11){_$5t.push("}");}else{}}else{if(_$cz<13){for(;_$Ig<_$dH;_$Ig++ ){_$5t.push(_$6d);_$5t.push(_$QK[_$sE]);_$5t.push('<');_$5t.push(_$Ig+1);_$5t.push("){");_$rR(4,_$Ig);_$6d="}else if(";}}else if(_$cz<14){if( !_$7P)_$iq+=2;}else if(_$cz<15){_$iq+=17;}else{_$7P=_$o4<=_$gj;}}}else if(_$cz<32){if(_$cz<20){if(_$cz<17){_$iq+=21;}else if(_$cz<18){_$iq+=8;}else if(_$cz<19){_$5t.push("}else{");}else{_$7P=_$2h.length!=_$6d;}}else if(_$cz<24){if(_$cz<21){_$iq+=-40;}else if(_$cz<22){_$rR(12,_$Ig,_$dH);}else if(_$cz<23){_$rR(4,_$Ig);}else{var _$2h=_$Bx.length;}}else if(_$cz<28){if(_$cz<25){_$7P=_$o4==0;}else if(_$cz<26){return;}else if(_$cz<27){for(_$QN=0;_$QN<_$6d;_$QN+=2){_$5t.push(_$OE[_$2h[_$QN]]);_$5t.push(_$QK[_$2h[_$QN+1]]);}}else{var _$2h=_$ud[_$Ig];}}else{if(_$cz<29){_$6d-=_$6d%2;}else if(_$cz<30){if( !_$7P)_$iq+=7;}else if(_$cz<31){_$dH-- ;}else{if( !_$7P)_$iq+=1;}}}else{if(_$cz<36){if(_$cz<33){var _$6d=_$2h.length;}else if(_$cz<34){_$iq+=39;}else if(_$cz<35){_$2h-=_$2h%2;}else{_$QN=0;}}else{for(;_$Ig+_$QN<_$dH;_$Ig+=_$QN){_$5t.push(_$6d);_$5t.push(_$QK[_$sE]);_$5t.push('<');_$5t.push(_$Ig+_$QN);_$5t.push("){");_$rR(12,_$Ig,_$Ig+_$QN);_$6d="}else if(";}}}}}}}}})()
console.log("写script之前: \n" + document.getElementsByTagName('html')[0].innerHTML);

!function(){
    var ele = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.innerHTML = "console.log('111')"
    ele.appendChild(script)
}()
console.log("写script之后: \n" + document.getElementsByTagName('html')[0].innerHTML);

_$1X('WEAD');

_$mI();
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
let loadEvent = {"type": "load", "target": window}
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
