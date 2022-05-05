require("fake-indexeddb/auto");
var openDatabase = require('websql');
var fs = require('fs');
// npm install cookie
var cookieIns = require('cookie');
var canvas = require('canvas');
var mock_cookie = require("./cookie").mock;
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


document.cookie = 'acw_tc=3ccdc15916395616784695045e6cdcba30ff25629e85d02cb47b22468e8698; neCYtZEjo8GmO=5E0iTF1c0baFDeHDcQuexTQXmT15cZefzulrHvo6U_h60oY6BFprGEp6Lorx._AZeP1QPObTQKfPBxMpupg5lLa';
(function(){var _$hY=0,_$P1=[[2,6,0,7,1,4,5,3],[47,26,81,64,54,63,7,30,62,50,49,50,73,65,5,15,5,50,35,101,80,37,57,24,67,19,11,17,44,12,50,4,28,93,88,83,102,70,6,79,22,77,70,33,16,90,40,8,70,68,100,18,64,3,70,39,21,95,72,48,91,86,36,70,52,51,70,34,97,53,32,50,59,29,82,53,98,55,50,75,53,50,45,92,64,23,25,9,74,1,50,99,94,46,94,2,38,41,20,69,89,66,78,43,58,76,42,61,27,0,13,14,84,85,71,10,60,87,56,31,96,50],[24,0,26,32,3,27,7,10,29,33,30,8,30,14,19,29,12,28,23,13,21,31,2,17,22,9,22,20,22,1,5,1,22,25,6,22,11,22,16,4,15,18,29],[36,14,30,5,48,0,9,49,17,46,18,1,7,43,11,19,31,15,34,46,39,45,22,37,8,41,42,47,45,44,13,32,29,41,6,28,10,33,6,16,23,35,23,38,12,46,23,21,12,43,25,26,4,27,20,40,35,12,21,25,38,2,3,24,48],[10,1,0,25,24,33,26,4,19,14,28,2,18,32,20,2,6,21,20,34,30,11,17,3,27,7,12,34,31,23,16,22,29,3,15,12,13,31,2,35,5,36,2,9,14,8,2]];function _$Cq(_$hx,_$ig){return _$BR.Math.abs(_$hx)%_$ig;}function _$Jv(_$Ce){_$Ce[_$Cq(_$kc()-_$Ce[_$Cq(_$8R(),16)],16)]=_$Ce[_$Cq(_$Lr()+_$sJ(),16)];_$Ce[14]=_$kc()-_$Ce[_$Cq(_$8R(),16)];if(_$Lr()-_$Ce[_$Cq(_$u1(),16)]){if(_$kc()+_$ap()){_$Ce[6]=_$wU();}}_$RW(_$Ce);_$Ce[2]=_$BB()-_$Ce[_$Cq(_$XG(),16)];var _$nE=_$Lr();if(_$SX()-_$Ce[_$Cq(_$wU(),16)]){_$Ce[_$Cq(_$BB()+_$Vj(),16)]=_$vM(_$Ce);}_$Sz(_$Ce);return _$ta(_$Ce);}function _$kc(){return 5}function _$8R(){return 8}function _$Lr(){return 13}function _$sJ(){return 3}function _$u1(){return 0}function _$ap(){return 11}function _$wU(){return 4}function _$Vj(){return 15}function _$r_(){return 10}function _$31(_$Ce){var _$nE=_$Vj();var _$Dy=_$kc();_$Ce[11]=_$SX();var _$Rs=_$tI();var _$Rs=_$u1();return _$cT();}function _$SX(){return 1}function _$tI(){return 2}function _$cT(){return 14}function _$RW(_$Ce){_$PX(_$Ce);_$Ce[_$Cq(_$Ce[_$Cq(_$XG(),16)],16)]=_$8G(_$Ce);_$Ce[_$Cq(_$YN(_$Ce),16)]=_$Cb(_$Ce);return _$id(_$Ce);}function _$PX(_$Ce){_$vK(_$Ce);_$Kb(_$Ce);var _$Rs=_$cT();if(_$8R()){_$Ce[_$Cq(_$Gm(),16)]=_$Lr();}_$7p(_$Ce);return _$Lr()+_$sJ();}function _$vK(_$Ce){_$Ce[2]=_$u1();var _$Dy=_$kc();var _$Rs=_$ap();_$Ce[1]=_$Gm();return _$Lr();}function _$Gm(){return 7}function _$Kb(_$Ce){var _$Dy=_$XG();var _$Rs=_$r_();_$Ce[8]=_$zW();_$Ce[4]=_$tI();_$Ce[_$Cq(_$BB(),16)]=_$Vj();return _$kc();}function _$XG(){return 12}function _$zW(){return 6}function _$BB(){return 9}function _$7p(_$Ce){var _$nE=_$Gm();var _$Rs=_$Lr();var _$Dy=_$cT();var _$nE=_$XG();_$Ce[10]=_$8R();return _$zW();}function _$8G(_$Ce){var _$nE=_$Gm();var _$Rs=_$Lr();_$Ce[_$Cq(_$u1(),16)]=_$cT();var _$Rs=_$ap();var _$Dy=_$SX();return _$Gm();}function _$YN(_$Ce){var _$Rs=_$Vj();var _$Rs=_$kc();_$Ce[_$Cq(_$8R(),16)]=_$zW();_$Ce[4]=_$tI();return _$u1();}function _$Cb(_$Ce){_$Ce[12]=_$r_();_$Ce[8]=_$zW();_$Ce[4]=_$tI();return _$u1();}function _$id(_$Ce){if(_$kc()){_$Ce[_$Cq(_$8R(),16)]=_$zW();}_$GI(_$Ce);_$Br(_$Ce);var _$Dy=_$Gm();if(_$r_()){var _$Dy=_$Lr();}_$Ce[12]=_$r_();return _$SX()+_$Gm();}function _$GI(_$Ce){_$Ce[15]=_$kc();var _$Dy=_$zW();var _$Rs=_$wU();_$Ce[_$Cq(_$sJ(),16)]=_$BB();var _$Dy=_$r_();var _$nE=_$8R();return _$zW();}function _$Br(_$Ce){var _$Dy=_$BB();var _$nE=_$Vj();var _$nE=_$8R();var _$Dy=_$zW();var _$Rs=_$sJ();var _$Rs=_$BB();return _$Vj();}function _$vM(_$Ce){_$Ce[8]=_$zW();var _$Dy=_$sJ();var _$nE=_$BB();_$Ce[_$Cq(_$XG(),16)]=_$r_();return _$8R();}function _$Sz(_$Ce){_$Ce[12]=_$YD(_$Ce);_$Ce[_$Cq(_$0r(_$Ce),16)]=_$kc();if(_$SX()+_$Gm()){_$Ce[2]=_$u1();}var _$nE=_$SX();var _$Dy=_$Ce[_$Cq(_$wU(),16)];var _$Rs=_$cT();if(_$Ce[_$Cq(_$u1(),16)]){if(_$Vj()){_$Ce[_$Cq(_$r_(),16)]=_$8R();}}return _$ED(_$Ce);}function _$YD(_$Ce){_$Ce[_$Cq(_$SX(),16)]=_$Gm();var _$Dy=_$u1();var _$nE=_$cT();var _$nE=_$ap();var _$Dy=_$SX();return _$Gm();}function _$0r(_$Ce){var _$Dy=_$Vj();var _$Dy=_$kc();var _$Rs=_$zW();var _$nE=_$wU();_$Ce[_$Cq(_$sJ(),16)]=_$BB();return _$Vj();}function _$ED(_$Ce){_$FR(_$Ce);_$PK(_$Ce);_$Ce[14]=_$XG();return _$bT(_$Ce);}function _$FR(_$Ce){_$Ce[_$Cq(_$Gm(),16)]=_$Lr();var _$nE=_$cT();var _$Rs=_$XG();var _$Rs=_$8R();return _$zW();}function _$PK(_$Ce){var _$nE=_$BB();var _$Rs=_$Vj();_$Ce[5]=_$ap();var _$Dy=_$wU();var _$nE=_$tI();return _$u1();}function _$bT(_$Ce){_$Ce[_$Cq(_$SX(),16)]=_$Gm();_$Ce[13]=_$sJ();var _$nE=_$XG();var _$nE=_$r_();return _$8R();}function _$ta(_$Ce){_$2A(_$Ce);_$Ce[6]=_$Lr()+_$sJ();_$UM(_$Ce);_$37(_$Ce);_$Ce[2]=_$BB()+_$Vj();return _$gg(_$Ce);}function _$2A(_$Ce){_$Ce[2]=_$u1();if(_$Vj()){_$Ce[_$Cq(_$r_(),16)]=_$8R();}_$Ce[3]=_$BB();if(_$XG()){_$Ce[_$Cq(_$ap(),16)]=_$SX();}_$Ce[0]=_$cT();return _$kc()+_$ap();}function _$UM(_$Ce){_$Ce[_$Cq(_$kc(),16)]=_$ap();_$Ce[_$Cq(_$zW(),16)]=_$wU();var _$Dy=_$BB();var _$Rs=_$Vj();_$Ce[_$Cq(_$r_(),16)]=_$8R();return _$bi(_$Ce);}function _$bi(_$Ce){var _$Dy=_$sJ();var _$nE=_$BB();var _$Rs=_$r_();var _$Dy=_$8R();_$Ce[_$Cq(_$Gm(),16)]=_$Lr();return _$sJ();}function _$37(_$Ce){_$Ce[_$Cq(_$XG(),16)]=_$r_();var _$Rs=_$Gm();var _$Rs=_$Lr();var _$nE=_$SX();if(_$u1()){_$Ce[14]=_$XG();}if(_$tI()){var _$nE=_$cT();}return _$SX()+_$Gm();}function _$gg(_$Ce){_$Ce[8]=_$zW();var _$Rs=_$cT();if(_$Lr()){var _$nE=_$XG();}var _$Rs=_$tI();var _$Rs=_$u1();return _$vS(_$Ce);}function _$vS(_$Ce){var _$Dy=_$ap();var _$nE=_$SX();_$Ce[_$Cq(_$wU(),16)]=_$tI();_$Ce[0]=_$cT();return _$XG();}var _$xW,_$xY,_$BR,_$ex,_$cI,_$WT,_$NI,_$OE,_$Jv;var _$dD,_$EQ,_$2T=_$hY,_$jn=_$P1[0];while(1){_$EQ=_$jn[_$2T++];if(_$EQ<4){if(_$EQ<1){_$OE=_$BR['$_ts'];}else if(_$EQ<2){if( !_$dD)_$2T+=1;}else if(_$EQ<3){_$xW=[4,16,64,256,1024,4096,16384,65536];}else{return;}}else{if(_$EQ<5){_$OE=_$BR['$_ts']={};}else if(_$EQ<6){_$Pc(0);}else if(_$EQ<7){_$BR=window,_$ex=String,_$cI=Array,_$WT=document,_$NI=Date;}else{_$dD= !_$OE;}}}function _$Pc(_$kc,_$hx){function _$W8(){var _$Cq=_$kZ.charCodeAt(_$IW++ ),_$hY;if(_$Cq<128){return _$Cq;}else if(_$Cq<251){return _$Cq-32;}else if(_$Cq===251){return 0;}else if(_$Cq===254){_$Cq=_$kZ.charCodeAt(_$IW++ );if(_$Cq>=128)_$Cq-=32;_$hY=_$kZ.charCodeAt(_$IW++ );if(_$hY>=128)_$hY-=32;return _$Cq*219+_$hY;}else if(_$Cq===255){_$Cq=_$kZ.charCodeAt(_$IW++ );if(_$Cq>=128)_$Cq-=32;_$hY=_$kZ.charCodeAt(_$IW++ );if(_$hY>=128)_$hY-=32;_$Cq=_$Cq*219*219+_$hY*219;_$hY=_$kZ.charCodeAt(_$IW++ );if(_$hY>=128)_$hY-=32;return _$Cq+_$hY;}else if(_$Cq===252){_$hY=_$kZ.charCodeAt(_$IW++ );if(_$hY>=128)_$hY-=32;return -_$hY;}else if(_$Cq===253){_$Cq=_$kZ.charCodeAt(_$IW++ );if(_$Cq>=128)_$Cq-=32;_$hY=_$kZ.charCodeAt(_$IW++ );if(_$hY>=128)_$hY-=32;return _$Cq* -219-_$hY;}else{}}var _$06,_$1c,_$nE,_$j6,_$kZ,_$oh,_$mO,_$Cq,_$hY,_$2T,_$dD,_$UQ,_$EQ,_$jn,_$Ce,_$UV,_$PB,_$Rs,_$Dy,_$IW;var _$Lr,_$u1,_$8R=_$kc,_$ap=_$P1[1];while(1){_$u1=_$ap[_$8R++];if(_$u1<64){if(_$u1<16){if(_$u1<4){if(_$u1<1){_$hx._$Lg="XIjINWqxReA";}else if(_$u1<2){return _$Cq;}else if(_$u1<3){_$hx._$GB=4;}else{_$1c=_$kZ.substr(_$IW,_$Ce).split(_$ex.fromCharCode(255));}}else if(_$u1<8){if(_$u1<5){_$OE._$hY=new _$NI().getTime();}else if(_$u1<6){_$8R+=78;}else if(_$u1<7){var _$mO=_$OE.aebi=[];}else{_$Y9(0);}}else if(_$u1<12){if(_$u1<9){var _$jn=_$W8();}else if(_$u1<10){_$hY=_$BR.eval;}else if(_$u1<11){_$hx._$Q1="_$dl";}else{_$Cq+="k3ZUAQOmbSDEJwVEUxUPSl6bPrYuGudefKa3Dqt99rkLQ2lradgdhLJzQqQ6M6eAC72ZNmN1qdPh09kWNjUo7j_yhQsmL4l0q_UqrSHEmYJcwBxQBSvJt7ecR7M91WbD38foVqPy42Jl4wAL2IMeSKg0C0_mtnqircCfKSUIczYx_sqKLQv$7knC84Mq";}}else{if(_$u1<13){return _$Pc(12,_$Cq);}else if(_$u1<14){_$hx._$ex=_$Jv;}else if(_$u1<15){_$hx._$jn="13JVNqD.kLZP3EGPNH9ZmA";}else{_$hx._$BR=75;}}}else if(_$u1<32){if(_$u1<20){if(_$u1<17){var _$EQ=_$W8();}else if(_$u1<18){_$Cq+="5gTXOiMlzGb3v7d4MIVH$qE2Rr9ySNP4JC6MmjIRk4yHbE1Q9LJE9DcknVyRsvKnBqPIW$GNrwW2VbY3Ua67PFZArmZbG_E1j_S62CNrrDbhSYrqvfxK_NWOJg87cnU1YmHgm82m7gUgkKgEeyYkVvZ2ia9gmUg2Iin2bep_9fRQtv0IFo$LuGfLqBOV";}else if(_$u1<19){_$Lr=_$PB>0;}else{_$Cq+="4uIDl1Yeo1dOcULv3qpvBKCUpHRvsYLtYv6cTPeF9JyKQFJiRxCv5G1F$unOrd$OaEVZ4s91CmrFMQhi1NMHuOzNSbivVi4eo9oElkiPBvBNXTMR6D$UxhRVTmfphNsCLETl3$CyyQXosVhWNa52fPxMof1EoDNlTUp9acbo3aSmjz6yFQbtjtG1vEW9";}}else if(_$u1<24){if(_$u1<21){_$hx._$K9="_$Vj";}else if(_$u1<22){var _$UV=[];}else if(_$u1<23){var _$dD=_$kZ.length;}else{_$Cq=_$BR.execScript(_$hx);}}else if(_$u1<28){if(_$u1<25){_$Cq+="iGx9qZcbKqjfnxnz0efVLNKwZNY1IHGRGANeACnPy1YJxTxsnGi0MFtfkvhyYrvZjlFLskSMLnSRhmZpC6d7XL$w_Pz6GtJWYV3gZg4IU3Yh5zysDeDPrZXJ7tsbPLgj3vO4NZU2JHVyWMn8yqjrV1fwnXJQnhdoj55LtqTqi3MAeu_Zs496$BJB8yP_";}else if(_$u1<26){_$8R+=2;}else if(_$u1<27){_$Pc(91,_$OE);}else{_$hx._$NI="c2TENE8EkCi9OetBTU4ij0";}}else{if(_$u1<29){var _$kZ=_$OE["a670748"];}else if(_$u1<30){_$Cq=_$Cq.replace(RegExp('[\\r\\n\\s]','g'),"");}else if(_$u1<31){_$BR['$_ts']={};}else{_$hx._$qm="_$Dx";}}}else if(_$u1<48){if(_$u1<36){if(_$u1<33){_$OE._$d2=1;}else if(_$u1<34){var _$UQ=_$W8();}else if(_$u1<35){var _$nE=_$Pc(10);}else{var _$Cq='';}}else if(_$u1<40){if(_$u1<37){_$OE._$hY-=_$Pc(10);}else if(_$u1<38){_$Cq+="xukBLBfdL6iVXuiYXrumi97LG61rTH_b7E0NUiXDux19yhHMGyd2icQ1_2qm2Py0nUYlEVM5b4EbM$jbsd$CHQ_xmRyGVcU66Ikzb2flclUYGz1eP0bwN7_lmAGq17YycH1RFMNHcaftn143q9goZzNT3JzqkQh4frN4xol4bx0PLdIdIAnM6ezcQgrB";}else if(_$u1<39){_$hx._$RB="_$cT";}else{_$IW+=_$Ce;}}else if(_$u1<44){if(_$u1<41){var _$j6=_$W8();}else if(_$u1<42){_$hx._$QL="_$wU";}else if(_$u1<43){_$hx._$cI="eCMtQ599ZtG";}else{_$hx._$PJ="_$PX";}}else{if(_$u1<45){_$Cq+="uR1GyUrKCTiBOJ4ak_DgONQdxnmwm373O1RiyS6KWgrQ4TPwgADkakndjmDd1Od_Vz8vDXnKrkg5hMZjirdy_XziolUz4h48eH9cHKXAYMU7bN3eat3HCQVKTAkjdRb7kn5PJFf_kfkqpcDB8_0n2j8Uiw8JtMxBf2YYdLugqAB1E4DlV3gmQo0DnF23aMX0";}else if(_$u1<46){var _$Cq;}else if(_$u1<47){return _$dD;}else{_$OE._$H5=_$Pc(18);}}}else{if(_$u1<52){if(_$u1<49){for(_$Rs=0;_$Rs<_$PB;_$Rs++ ){_$UV.push("}");}}else if(_$u1<50){return new _$NI().getTime();}else if(_$u1<51){return;}else{_$Pc(79,_$Dy);}}else if(_$u1<56){if(_$u1<53){_$hY=_$Pc(10);}else if(_$u1<54){if( !_$Lr)_$8R+=1;}else if(_$u1<55){_$Pc(31);}else{return 0;}}else if(_$u1<60){if(_$u1<57){_$hx._$UQ="_$NN";}else if(_$u1<58){_$Cq+="Ba5JGopLS1dwJUT4onT8X2gHrClAxjBipxQazVBmTCTQLljs0U9QmLLsLwJ8FPvzT$5YqpQTIuvrjGNFMSlVhPErSJf0CD8CyB1V3sPf$EF4OHTBOl9iDiZrytxy8iiOu7Xyj3$4MmT7E$MY3RQzUbm1$hH7GJSj0KNRhqlUVuFxEOsG22Tw6GtX7HyL";}else if(_$u1<59){_$hx._$Lr="_$RW";}else{var _$Cq=_$BR.eval.toString();}}else{if(_$u1<61){_$hx._$UV="_$ih";}else if(_$u1<62){_$hx._$YW="XyITM0bMOKA";}else if(_$u1<63){_$BR['$_ts'].l__=_$OE.l__;}else{_$8R+=1;}}}}else{if(_$u1<80){if(_$u1<68){if(_$u1<65){if( !_$Lr)_$8R+=2;}else if(_$u1<66){for(_$Cq=0,_$hY=0;_$hY<_$2T;_$hY+=2){_$dD[_$Cq++ ]=_$UQ+_$hx.substr(_$hY,2);}}else if(_$u1<67){_$hx._$71="_$SX";}else{_$Cq+="tdh0sWz_n_UTE9VA0LfXao16zB05qllEK5buoJ8A2En7SEWlMwaytWvAR3z8oo7mahXIM7q7_UQQ$83lZIzIdlFbwC9KTsb0J5aR0bBYiTyiyrdM$xuLsh880QFActg6JGVrdNtxmfTNsihwoKkx9IdbAxxFkmoII9Z6mQzx3DD$SsIaB21tDmioco$e";}}else if(_$u1<72){if(_$u1<69){_$PB=_$W8();}else if(_$u1<70){_$hx._$8T="_$r_";}else if(_$u1<71){}else{_$hx._$Ce="_$f1";}}else if(_$u1<76){if(_$u1<73){for(_$Rs=0;_$Rs<_$PB;_$Rs++ ){_$Y9(16,_$Rs,_$UV);}}else if(_$u1<74){var _$Cq,_$hY,_$2T=_$hx.length,_$dD=new _$cI(_$2T/2),_$UQ='_$';}else if(_$u1<75){_$Cq=_$hY.call(_$BR,_$hx);}else{_$Lr=_$hx===undefined||_$hx==="";}}else{if(_$u1<77){_$hx._$8R="_$EQ";}else if(_$u1<78){var _$IW=0;}else if(_$u1<79){_$hx._$ZC="_$tI";}else{var _$2T=_$Pc(72);}}}else if(_$u1<96){if(_$u1<84){if(_$u1<81){_$Cq+="PKbTta2AUMbi37ggvS7owmhoGOgPcXnNZQ_4XxV0C_72VOo6QidceCSDyFjKyTDCX9d9mBVD3YITCMMDOBxgnfQJn$5h0kK9QLsu71ZCRB8TPJKDf1U5AEycJt5ktpzEtL$iZWuzQtihtFg$usNNp2iRWQkecAln5FH5sXuiHLX54$gulybUunlQ_hO7";}else if(_$u1<82){_$Lr=_$OE["a670748"];}else if(_$u1<83){_$Lr=_$Cq!=="functioneval(){[nativecode]}";}else{var _$Cq=_$Pc(10);}}else if(_$u1<88){if(_$u1<85){_$hx._$WQ=120;}else if(_$u1<86){_$hx._$ic="_$eB";}else if(_$u1<87){var _$Dy=_$UV.join('');}else{_$hx._$_2="_$8k";}}else if(_$u1<92){if(_$u1<89){var _$oh=_$OE._$H5;}else if(_$u1<90){_$hx._$su="_$31";}else if(_$u1<91){var _$06=_$W8();}else{_$UV.push(")();");}}else{if(_$u1<93){_$Lr=_$BR.execScript;}else if(_$u1<94){_$OE["a670748"]=_$xY;}else if(_$u1<95){_$8R+=-78;}else{var _$PB=_$W8();}}}else{if(_$u1<100){if(_$u1<97){_$hx._$PB="_$p2";}else if(_$u1<98){_$Lr=_$nE-_$Cq>12000;}else if(_$u1<99){return 1;}else{_$hx._$pU=52;}}else{if(_$u1<101){var _$Ce=_$W8();}else if(_$u1<102){_$Cq+="xWxYBRexcIWTNIOEJvhxigW8kZohmOIW06j61calKGLgEcWCQEXwjEqx4VyJ7YpS_aE8owUDpUGBYW0pUhP1aaPcY9eYSTCqhY2TdDUQEQjnCeUVPBRsDynEkc8RLrsJu1apwUVjr_31SXtIcTRWPXvKGmKbXGzWBB7p8GYNCbidGIBrvMSzYD0rEDFR";}else{var _$hY=_$Pc(10);}}}}}function _$Y9(_$dD,_$al,_$KG){function _$Lg(){var _$jn=[0];Array.prototype.push.apply(_$jn,arguments);return _$eY.apply(this,_$jn);}var _$_a,_$E8,_$ow,_$Cq,_$hY,_$2T,_$Ec,_$WC,_$QE,_$Xw,_$jE,_$qx,_$4V,_$yJ,_$7Y,_$pS;var _$EQ,_$Ce,_$UQ=_$dD,_$UV=_$P1[2];while(1){_$Ce=_$UV[_$UQ++];if(_$Ce<16){if(_$Ce<4){if(_$Ce<1){var _$hY=_$Cq>1?_$WT.scripts[_$Cq-2].src:_$xY;}else if(_$Ce<2){_$UQ+=-19;}else if(_$Ce<3){var _$4V=_$W8();}else{_$Ec=_$BR.ActiveXObject?new _$BR.ActiveXObject('Microsoft.XMLHTTP'):new _$BR.XMLHttpRequest();}}else if(_$Ce<8){if(_$Ce<5){var _$ow=[];}else if(_$Ce<6){var _$hY=new _$cI(_$Cq);}else if(_$Ce<7){_$mO[_$al]=_$Cq;}else{_$Ec.onreadystatechange=_$Lg;}}else if(_$Ce<12){if(_$Ce<9){var _$_a=_$Y9(9);}else if(_$Ce<10){var _$7Y=_$Y9(9);}else if(_$Ce<11){_$Ec.send();}else{var _$E8=_$Y9(9);}}else{if(_$Ce<13){var _$Ec=_$W8();}else if(_$Ce<14){var _$Xw=_$W8();}else if(_$Ce<15){for(_$2T=0;_$2T<_$Cq;_$2T++ ){_$hY[_$2T]=_$W8();}}else{for(_$2T=0;_$2T<_$hY;_$2T++ ){_$ow[_$2T]=_$Y9(9);}}}}else if(_$Ce<32){if(_$Ce<20){if(_$Ce<17){var _$hY=_$W8();}else if(_$Ce<18){var _$yJ=_$W8();}else if(_$Ce<19){_$eY(5,_$KG);}else{return _$hY;}}else if(_$Ce<24){if(_$Ce<21){var _$pS=_$Y9(9);}else if(_$Ce<22){var _$jE=_$W8();}else if(_$Ce<23){}else{var _$QE=_$W8();}}else if(_$Ce<28){if(_$Ce<25){var _$Cq=_$WT.scripts.length;}else if(_$Ce<26){var _$Cq=_$Y9(9);}else if(_$Ce<27){_$EQ=_$hY;}else{_$Ec.open('GET',_$hY,false);}}else{if(_$Ce<29){var _$WC=_$W8();}else if(_$Ce<30){return;}else if(_$Ce<31){_$UQ+=19;}else{var _$qx=_$W8();}}}else{if(_$Ce<33){if( !_$EQ)_$UQ+=4;}else{var _$Cq=_$W8();}}}function _$eY(_$hY,_$UD){var _$pU,_$Cq;var _$dD,_$EQ,_$2T=_$hY,_$jn=_$P1[3];while(1){_$EQ=_$jn[_$2T++];if(_$EQ<16){if(_$EQ<4){if(_$EQ<1){var _$Cq,_$pU=4;}else if(_$EQ<2){_$UD.push(_$oh[_$06]);}else if(_$EQ<3){_$UD.push("++];");}else{_$ST(12,0,_$ow.length);}}else if(_$EQ<8){if(_$EQ<5){_$UD.push("];");}else if(_$EQ<6){_$2T+=27;}else if(_$EQ<7){_$UD.push("var ");}else{_$UD.push("=$_ts.scj,");}}else if(_$EQ<12){if(_$EQ<9){_$2T+=-23;}else if(_$EQ<10){_$dD=_$al==0;}else if(_$EQ<11){for(_$Cq=1;_$Cq<_$pS.length;_$Cq++ ){_$UD.push(",");_$UD.push(_$oh[_$pS[_$Cq]]);}}else{_$UD.push("=$_ts.aebi;");}}else{if(_$EQ<13){_$UD.push("=");}else if(_$EQ<14){_$2T+=-27;}else if(_$EQ<15){_$2T+=23;}else{_$UD.push(_$oh[_$jE]);}}}else if(_$EQ<32){if(_$EQ<20){if(_$EQ<17){_$UD.push(_$oh[_$QE]);}else if(_$EQ<18){_$UD.push("(function(){var ");}else if(_$EQ<19){_$UD.push("=0,");}else{_$2T+=8;}}else if(_$EQ<24){if(_$EQ<21){if( !_$dD)_$2T+=9;}else if(_$EQ<22){_$UD.push(_$oh[_$yJ]);}else if(_$EQ<23){for(_$Cq=0;_$Cq<_$7Y.length;_$Cq++ ){_$UD.push(",");_$UD.push(_$oh[_$7Y[_$Cq]]);}}else{_$UD.push(",");}}else if(_$EQ<28){if(_$EQ<25){_$UD.push("}");}else if(_$EQ<26){_$UD.push("[");}else if(_$EQ<27){_$UD.push(_$al);}else{_$dD=_$ow.length;}}else{if(_$EQ<29){_$UD.push(_$oh[_$pS[0]]);}else if(_$EQ<30){_$dD=_$pS.length;}else if(_$EQ<31){for(_$Cq=0;_$Cq<_$_a.length;_$Cq+=2){_$ST(0,_$_a[_$Cq],_$_a[_$Cq+1],_$UD);}}else{_$UD.push("function ");}}}else if(_$EQ<48){if(_$EQ<36){if(_$EQ<33){_$ST(39);}else if(_$EQ<34){_$UD.push(";");}else if(_$EQ<35){_$UD.push("(");}else{_$UD.push(_$oh[_$4V]);}}else if(_$EQ<40){if(_$EQ<37){_$dD=_$Ec.readyState==4;}else if(_$EQ<38){_$UD.push("){");}else if(_$EQ<39){_$UD.push(_$oh[_$Ec]);}else{_$dD=_$7Y.length;}}else if(_$EQ<44){if(_$EQ<41){_$UD.push("while(1){");}else if(_$EQ<42){if( !_$dD)_$2T+=4;}else if(_$EQ<43){_$Pc(79,_$Ec.responseText);}else{_$UD.push(_$oh[_$j6]);}}else{if(_$EQ<45){_$Pc(31);}else if(_$EQ<46){if( !_$dD)_$2T+=1;}else if(_$EQ<47){_$UD.push(_$oh[_$WC]);}else{_$dD=_$OE["a670748"];}}}else{if(_$EQ<49){return;}else{if( !_$dD)_$2T+=8;}}}function _$ST(_$UQ,_$GB,_$YW,_$0p){var _$hY,_$2T,_$dD,_$Cq;var _$jn,_$UV,_$EQ=_$UQ,_$PB=_$P1[4];while(1){_$UV=_$PB[_$EQ++];if(_$UV<16){if(_$UV<4){if(_$UV<1){for(_$hY=0;_$hY<_$Cq;_$hY+=2){_$UD.push(_$1c[_$E8[_$hY]]);_$UD.push(_$oh[_$E8[_$hY+1]]);}}else if(_$UV<2){_$EQ+=40;}else if(_$UV<3){return;}else{_$hY="if(";}}else if(_$UV<8){if(_$UV<5){for(_$2T=0;_$2T<_$hY;_$2T+=2){_$UD.push(_$1c[_$Cq[_$2T]]);_$UD.push(_$oh[_$Cq[_$2T+1]]);}}else if(_$UV<6){_$Cq-=_$Cq%2;}else if(_$UV<7){_$EQ+=21;}else{for(;_$GB<_$YW;_$GB++ ){_$UD.push(_$hY);_$UD.push(_$oh[_$4V]);_$UD.push('<');_$UD.push(_$GB+1);_$UD.push("){");_$ST(4,_$GB);_$hY="}else if(";}}}else if(_$UV<12){if(_$UV<9){_$UD.push(_$1c[_$E8[_$Cq]]);}else if(_$UV<10){_$jn=_$E8.length!=_$Cq;}else if(_$UV<11){_$0p.push(["function ",_$oh[_$GB],"(){var ",_$oh[_$Xw],"=[",_$YW,"];Array.prototype.push.apply(",_$oh[_$Xw],",arguments);return ",_$oh[_$qx],".apply(this,",_$oh[_$Xw],");}"].join(''));}else{_$jn=_$dD<=_$pU;}}else{if(_$UV<13){_$UD.push("}else{");}else if(_$UV<14){_$ST(12,_$GB,_$YW);}else if(_$UV<15){if( !_$jn)_$EQ+=1;}else{for(;_$GB+_$2T<_$YW;_$GB+=_$2T){_$UD.push(_$hY);_$UD.push(_$oh[_$4V]);_$UD.push('<');_$UD.push(_$GB+_$2T);_$UD.push("){");_$ST(12,_$GB,_$GB+_$2T);_$hY="}else if(";}}}}else if(_$UV<32){if(_$UV<20){if(_$UV<17){_$2T=0;}else if(_$UV<18){if( !_$jn)_$EQ+=7;}else if(_$UV<19){var _$Cq,_$hY,_$2T,_$dD=_$YW-_$GB;}else{_$jn=_$Cq.length!=_$hY;}}else if(_$UV<24){if(_$UV<21){if( !_$jn)_$EQ+=2;}else if(_$UV<22){_$jn=_$dD==1;}else if(_$UV<23){for(_$Cq=1;_$Cq<7;_$Cq++ ){if(_$dD<=_$xW[_$Cq]){_$2T=_$xW[_$Cq-1];break;}}}else{_$EQ+=8;}}else if(_$UV<28){if(_$UV<25){var _$Cq=_$ow[_$GB];}else if(_$UV<26){_$EQ+=39;}else if(_$UV<27){_$hY-=_$hY%2;}else{_$YW-- ;}}else{if(_$UV<29){_$UD.push(_$1c[_$Cq[_$hY]]);}else if(_$UV<30){}else if(_$UV<31){_$EQ+=17;}else{_$UD.push("}");}}}else{if(_$UV<36){if(_$UV<33){_$jn=_$dD==0;}else if(_$UV<34){var _$hY=_$Cq.length;}else if(_$UV<35){_$ST(4,_$GB);}else{var _$Cq=_$E8.length;}}else{_$EQ+=-40;}}}}}}}})()
console.log("写script之前: \n" + document.getElementsByTagName('html')[0].innerHTML);

!function(){
    var ele = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.innerHTML = "console.log('111')"
    ele.appendChild(script)
}()
console.log("写script之后: \n" + document.getElementsByTagName('html')[0].innerHTML);

_$ke('wEAR');

_$vK();
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
