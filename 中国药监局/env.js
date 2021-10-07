require("fake-indexeddb/auto");
var openDatabase = require('websql');
var fs = require('fs');
var navigator = require("./navigator").navigator;
var localStorage = require('./localStorage');
var sessionStorage = require('./sessionStorage');
var eval_js = require('./eval_js').eval_js
var fetch = require("node-fetch");
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

window.webkitRequestFileSystem = function () {
};
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

head = new Object();
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
document.documentElement = dom.window.document.documentElement;
document.body = dom.window.document.body;
document.head = head;
document.charset = "UTF-8";
document.characterSet = "UTF-8"
document.scripts = [];
document.onmousemove = null;
document.onselectionchange = null;
document.scrollingElement = {
    "style": {}
}
document.createElement = function (name) {
    let family = ['Verdana', 'Helvetica Neue LT Pro 35 Thin', 'tahoma', 'verdana', 'times new roman', 'Courier New',
        'Microsoft Himalaya', 'helvetica', 'LG-FZKaTong-M19-V2.2', 'Georgia', 'georgia', 'courier new', 'Arial',
        'arial', 'cursive', 'times', 'fantasy', 'courier', 'serif', 'STXingkai', 'monospace', 'Times New Roman']
    let element = dom.window.document.createElement(name);
    Object.defineProperties(dom.window.HTMLElement.prototype, {
            offsetLeft: {
                get: function() { return 8; }
            },
            offsetTop: {
                get: function() { return 8; }
            },
            offsetHeight: {
                get: function() {
                    if (family.includes(this.style.fontFamily)){
                        return 0
                    }else{
                        return 151;
                    }
                }
            },
            offsetWidth: {
                get: function() {
                    if (family.includes(this.style.fontFamily)){
                        return 0
                    }else{
                        return 1327;
                    }

                }
            }
        });
    return element
};
document.createElement.toString = function createElementToString() {
    debugger
};
document.getElementsByTagName = function (name) {
    console.log("getElementByTagName: " + name + " result is: " + dom.window.document.getElementsByTagName(name).length);
    return dom.window.document.getElementsByTagName(name);
};
document.getElementById = function (id) {
    return dom.window.document.getElementById(id);
};
// document.addEventListener = function (type, listeners, options){
//     return dom.window.addEventListener(type, listeners, options)
// }
document.addEventListener = function (type, listeners, options) {
}
// 不能采取document.$cookie的方式来定义 代码中有检查属性的第一个字符是否是$
document.cookie = dom.window.document.cookie

window.document = document;

let location = new Object();
location.port = "";
location.protocol = "https:",
    location.href = "https://www.nmpa.gov.cn/xxgk/ggtg/index.html",
    location.pathname = "/xxgk/ggtg/index.html",
    location.host = "www.nmpa.gov.cn",
    location.hostname = "www.nmpa.gov.cn",
    location.origin = "https://www.nmpa.gov.cn"
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

// window.addEventListener = function (){};
window.addEventListener = function (type, listeners, options) {
    return dom.window.addEventListener(type, listeners, options)
}
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

(function () {
    var _$7G = 0,
        _$v0 = [[4, 1, 2, 3, 5, 6, 7, 0], [35, 91, 24, 38, 4, 32, 100, 44, 69, 76, 96, 76, 43, 14, 67, 56, 67, 76, 23, 90, 10, 74, 20, 26, 87, 62, 78, 71, 47, 11, 76, 49, 22, 13, 54, 39, 101, 9, 41, 86, 92, 63, 9, 94, 70, 77, 18, 59, 9, 50, 66, 19, 38, 7, 9, 52, 48, 85, 28, 30, 33, 72, 6, 9, 97, 27, 9, 80, 40, 82, 12, 76, 58, 75, 95, 82, 79, 84, 76, 88, 82, 76, 45, 5, 38, 16, 46, 55, 25, 0, 76, 34, 102, 42, 102, 68, 2, 3, 31, 37, 98, 53, 81, 99, 64, 57, 60, 1, 73, 8, 65, 61, 93, 89, 21, 83, 29, 17, 15, 51, 36, 76], [30, 27, 23, 4, 18, 2, 16, 33, 17, 9, 32, 31, 32, 3, 0, 17, 19, 14, 8, 26, 22, 29, 1, 21, 12, 28, 12, 25, 12, 11, 15, 11, 12, 7, 5, 12, 13, 12, 24, 20, 10, 6, 17], [35, 14, 8, 9, 37, 15, 31, 44, 19, 26, 38, 17, 48, 47, 24, 23, 45, 0, 36, 26, 10, 22, 39, 42, 13, 40, 33, 32, 22, 18, 46, 21, 4, 40, 11, 6, 1, 3, 11, 16, 5, 49, 5, 20, 27, 26, 5, 29, 27, 47, 25, 12, 43, 28, 34, 7, 49, 27, 29, 25, 20, 2, 41, 30, 37], [24, 20, 33, 5, 28, 10, 32, 36, 23, 19, 3, 26, 34, 9, 1, 26, 12, 30, 1, 17, 35, 29, 13, 25, 31, 16, 14, 17, 27, 4, 21, 0, 15, 25, 2, 14, 6, 27, 26, 22, 11, 7, 26, 18, 19, 8, 26]];

    function _$rO(_$nt, _$tt) {
        return _$uc.Math.abs(_$nt) % _$tt;
    }

    function _$Rp(_$WH) {
        _$WH[_$rO(_$N2() - _$WH[_$rO(_$Is(), 16)], 16)] = _$WH[_$rO(_$B_() + _$3R(), 16)];
        _$WH[14] = _$N2() - _$WH[_$rO(_$Is(), 16)];
        if (_$B_() - _$WH[_$rO(_$pi(), 16)]) {
            if (_$N2() + _$Us()) {
                _$WH[6] = _$5V();
            }
        }
        _$Lo(_$WH);
        _$WH[2] = _$51() - _$WH[_$rO(_$G0(), 16)];
        var _$zd = _$B_();
        if (_$OB() - _$WH[_$rO(_$5V(), 16)]) {
            _$WH[_$rO(_$51() + _$7T(), 16)] = _$s$(_$WH);
        }
        _$AJ(_$WH);
        return _$dD(_$WH);
    }

    function _$N2() {
        return 5
    }

    function _$Is() {
        return 8
    }

    function _$B_() {
        return 13
    }

    function _$3R() {
        return 3
    }

    function _$pi() {
        return 0
    }

    function _$Us() {
        return 11
    }

    function _$5V() {
        return 4
    }

    function _$7T() {
        return 15
    }

    function _$Ku() {
        return 10
    }

    function _$GA(_$WH) {
        var _$zd = _$7T();
        var _$lL = _$N2();
        _$WH[11] = _$OB();
        var _$rI = _$pa();
        var _$rI = _$pi();
        return _$_y();
    }

    function _$OB() {
        return 1
    }

    function _$pa() {
        return 2
    }

    function _$_y() {
        return 14
    }

    function _$Lo(_$WH) {
        _$2c(_$WH);
        _$WH[_$rO(_$WH[_$rO(_$G0(), 16)], 16)] = _$Sx(_$WH);
        _$WH[_$rO(_$GI(_$WH), 16)] = _$Pf(_$WH);
        return _$30(_$WH);
    }

    function _$2c(_$WH) {
        _$Cb(_$WH);
        _$yt(_$WH);
        var _$rI = _$_y();
        if (_$Is()) {
            _$WH[_$rO(_$Cv(), 16)] = _$B_();
        }
        _$U$(_$WH);
        return _$B_() + _$3R();
    }

    function _$Cb(_$WH) {
        _$WH[2] = _$pi();
        var _$lL = _$N2();
        var _$rI = _$Us();
        _$WH[1] = _$Cv();
        return _$B_();
    }

    function _$Cv() {
        return 7
    }

    function _$yt(_$WH) {
        var _$lL = _$G0();
        var _$rI = _$Ku();
        _$WH[8] = _$zH();
        _$WH[4] = _$pa();
        _$WH[_$rO(_$51(), 16)] = _$7T();
        return _$N2();
    }

    function _$G0() {
        return 12
    }

    function _$zH() {
        return 6
    }

    function _$51() {
        return 9
    }

    function _$U$(_$WH) {
        var _$zd = _$Cv();
        var _$rI = _$B_();
        var _$lL = _$_y();
        var _$zd = _$G0();
        _$WH[10] = _$Is();
        return _$zH();
    }

    function _$Sx(_$WH) {
        var _$zd = _$Cv();
        var _$rI = _$B_();
        _$WH[_$rO(_$pi(), 16)] = _$_y();
        var _$rI = _$Us();
        var _$lL = _$OB();
        return _$Cv();
    }

    function _$GI(_$WH) {
        var _$rI = _$7T();
        var _$rI = _$N2();
        _$WH[_$rO(_$Is(), 16)] = _$zH();
        _$WH[4] = _$pa();
        return _$pi();
    }

    function _$Pf(_$WH) {
        _$WH[12] = _$Ku();
        _$WH[8] = _$zH();
        _$WH[4] = _$pa();
        return _$pi();
    }

    function _$30(_$WH) {
        if (_$N2()) {
            _$WH[_$rO(_$Is(), 16)] = _$zH();
        }
        _$fE(_$WH);
        _$86(_$WH);
        var _$lL = _$Cv();
        if (_$Ku()) {
            var _$lL = _$B_();
        }
        _$WH[12] = _$Ku();
        return _$OB() + _$Cv();
    }

    function _$fE(_$WH) {
        _$WH[15] = _$N2();
        var _$lL = _$zH();
        var _$rI = _$5V();
        _$WH[_$rO(_$3R(), 16)] = _$51();
        var _$lL = _$Ku();
        var _$zd = _$Is();
        return _$zH();
    }

    function _$86(_$WH) {
        var _$lL = _$51();
        var _$zd = _$7T();
        var _$zd = _$Is();
        var _$lL = _$zH();
        var _$rI = _$3R();
        var _$rI = _$51();
        return _$7T();
    }

    function _$s$(_$WH) {
        _$WH[8] = _$zH();
        var _$lL = _$3R();
        var _$zd = _$51();
        _$WH[_$rO(_$G0(), 16)] = _$Ku();
        return _$Is();
    }

    function _$AJ(_$WH) {
        _$WH[12] = _$mE(_$WH);
        _$WH[_$rO(_$wT(_$WH), 16)] = _$N2();
        if (_$OB() + _$Cv()) {
            _$WH[2] = _$pi();
        }
        var _$zd = _$OB();
        var _$lL = _$WH[_$rO(_$5V(), 16)];
        var _$rI = _$_y();
        if (_$WH[_$rO(_$pi(), 16)]) {
            if (_$7T()) {
                _$WH[_$rO(_$Ku(), 16)] = _$Is();
            }
        }
        return _$4$(_$WH);
    }

    function _$mE(_$WH) {
        _$WH[_$rO(_$OB(), 16)] = _$Cv();
        var _$lL = _$pi();
        var _$zd = _$_y();
        var _$zd = _$Us();
        var _$lL = _$OB();
        return _$Cv();
    }

    function _$wT(_$WH) {
        var _$lL = _$7T();
        var _$lL = _$N2();
        var _$rI = _$zH();
        var _$zd = _$5V();
        _$WH[_$rO(_$3R(), 16)] = _$51();
        return _$7T();
    }

    function _$4$(_$WH) {
        _$_i(_$WH);
        _$WK(_$WH);
        _$WH[14] = _$G0();
        return _$Na(_$WH);
    }

    function _$_i(_$WH) {
        _$WH[_$rO(_$Cv(), 16)] = _$B_();
        var _$zd = _$_y();
        var _$rI = _$G0();
        var _$rI = _$Is();
        return _$zH();
    }

    function _$WK(_$WH) {
        var _$zd = _$51();
        var _$rI = _$7T();
        _$WH[5] = _$Us();
        var _$lL = _$5V();
        var _$zd = _$pa();
        return _$pi();
    }

    function _$Na(_$WH) {
        _$WH[_$rO(_$OB(), 16)] = _$Cv();
        _$WH[13] = _$3R();
        var _$zd = _$G0();
        var _$zd = _$Ku();
        return _$Is();
    }

    function _$dD(_$WH) {
        _$rF(_$WH);
        _$WH[6] = _$B_() + _$3R();
        _$Nz(_$WH);
        _$5s(_$WH);
        _$WH[2] = _$51() + _$7T();
        return _$XY(_$WH);
    }

    function _$rF(_$WH) {
        _$WH[2] = _$pi();
        if (_$7T()) {
            _$WH[_$rO(_$Ku(), 16)] = _$Is();
        }
        _$WH[3] = _$51();
        if (_$G0()) {
            _$WH[_$rO(_$Us(), 16)] = _$OB();
        }
        _$WH[0] = _$_y();
        return _$N2() + _$Us();
    }

    function _$Nz(_$WH) {
        _$WH[_$rO(_$N2(), 16)] = _$Us();
        _$WH[_$rO(_$zH(), 16)] = _$5V();
        var _$lL = _$51();
        var _$rI = _$7T();
        _$WH[_$rO(_$Ku(), 16)] = _$Is();
        return _$D5(_$WH);
    }

    function _$D5(_$WH) {
        var _$lL = _$3R();
        var _$zd = _$51();
        var _$rI = _$Ku();
        var _$lL = _$Is();
        _$WH[_$rO(_$Cv(), 16)] = _$B_();
        return _$3R();
    }

    function _$5s(_$WH) {
        _$WH[_$rO(_$G0(), 16)] = _$Ku();
        var _$rI = _$Cv();
        var _$rI = _$B_();
        var _$zd = _$OB();
        if (_$pi()) {
            _$WH[14] = _$G0();
        }
        if (_$pa()) {
            var _$zd = _$_y();
        }
        return _$OB() + _$Cv();
    }

    function _$XY(_$WH) {
        _$WH[8] = _$zH();
        var _$rI = _$_y();
        if (_$B_()) {
            var _$zd = _$G0();
        }
        var _$rI = _$pa();
        var _$rI = _$pi();
        return _$B5(_$WH);
    }

    function _$B5(_$WH) {
        var _$lL = _$Us();
        var _$zd = _$OB();
        _$WH[_$rO(_$5V(), 16)] = _$pa();
        _$WH[0] = _$_y();
        return _$G0();
    }

    var _$Jk, _$q7, _$uc, _$$t, _$en, _$uf, _$5l, _$ZK, _$Rp;
    var _$JP, _$IJ, _$zX = _$7G, _$9I = _$v0[0];
    while (1) {
        _$IJ = _$9I[_$zX++];
        if (_$IJ < 4) {
            if (_$IJ < 1) {
                return;
            } else if (_$IJ < 2) {
                _$uc = window, _$$t = String, _$en = Array, _$uf = document, _$5l = Date;
            } else if (_$IJ < 3) {
                _$ZK = _$uc['$_ts'];
            } else {
                _$JP = !_$ZK;
            }
        } else {
            if (_$IJ < 5) {
                _$Jk = [4, 16, 64, 256, 1024, 4096, 16384, 65536];
            } else if (_$IJ < 6) {
                if (!_$JP) _$zX += 1;
            } else if (_$IJ < 7) {
                _$ZK = _$uc['$_ts'] = {};
            } else {
                _$1q(0);
            }
        }
    }

    function _$1q(_$N2, _$nt) {
        function _$13() {
            var _$rO = _$Jx.charCodeAt(_$Vx++), _$7G;
            if (_$rO < 128) {
                return _$rO;
            } else if (_$rO < 251) {
                return _$rO - 32;
            } else if (_$rO === 251) {
                return 0;
            } else if (_$rO === 254) {
                _$rO = _$Jx.charCodeAt(_$Vx++);
                if (_$rO >= 128) _$rO -= 32;
                _$7G = _$Jx.charCodeAt(_$Vx++);
                if (_$7G >= 128) _$7G -= 32;
                return _$rO * 219 + _$7G;
            } else if (_$rO === 255) {
                _$rO = _$Jx.charCodeAt(_$Vx++);
                if (_$rO >= 128) _$rO -= 32;
                _$7G = _$Jx.charCodeAt(_$Vx++);
                if (_$7G >= 128) _$7G -= 32;
                _$rO = _$rO * 219 * 219 + _$7G * 219;
                _$7G = _$Jx.charCodeAt(_$Vx++);
                if (_$7G >= 128) _$7G -= 32;
                return _$rO + _$7G;
            } else if (_$rO === 252) {
                _$7G = _$Jx.charCodeAt(_$Vx++);
                if (_$7G >= 128) _$7G -= 32;
                return -_$7G;
            } else if (_$rO === 253) {
                _$rO = _$Jx.charCodeAt(_$Vx++);
                if (_$rO >= 128) _$rO -= 32;
                _$7G = _$Jx.charCodeAt(_$Vx++);
                if (_$7G >= 128) _$7G -= 32;
                return _$rO * -219 - _$7G;
            } else {
            }
        }

        var _$6G, _$_j, _$zd, _$Y6, _$Jx, _$6E, _$_w, _$rO, _$7G, _$zX, _$JP, _$TG, _$IJ, _$9I, _$WH, _$oD, _$Fk,
            _$rI, _$lL, _$Vx;
        var _$B_, _$pi, _$Is = _$N2, _$Us = _$v0[1];
        while (1) {
            _$pi = _$Us[_$Is++];
            if (_$pi < 64) {
                if (_$pi < 16) {
                    if (_$pi < 4) {
                        if (_$pi < 1) {
                            return _$rO;
                        } else if (_$pi < 2) {
                            _$nt._$G7 = "aa1fnutnnIA";
                        } else if (_$pi < 3) {
                            _$nt._$7C = "_$_y";
                        } else {
                            _$nt._$lW = "_$5V";
                        }
                    } else if (_$pi < 8) {
                        if (_$pi < 5) {
                            _$1q(31);
                        } else if (_$pi < 6) {
                            _$B_ = _$uc.execScript;
                        } else if (_$pi < 7) {
                            _$ZK._$7G -= _$1q(10);
                        } else {
                            _$_j = _$Jx.substr(_$Vx, _$WH).split(_$$t.fromCharCode(255));
                        }
                    } else if (_$pi < 12) {
                        if (_$pi < 9) {
                            _$nt._$yp = "fSjhm4dF0Gq";
                        } else if (_$pi < 10) {
                        } else if (_$pi < 11) {
                            _$rO += "WKNadDrFNzD55sXYB5blCt9gGCoup9P$a95em86s5zGoC9n5L9WdyDzf41GcY3Doll4aAXf6RNUyOqi96_P0G9tOJFXm1961lWsyAKc47CP_gZp_F84IdneXUW0cYLwoAlPoU7CNE9Qxdqt5djN0kwuRxbtyePrLL1ct6Hq4iZ8v4zaUQ4aivOBvLipA";
                        } else {
                            return _$1q(12, _$rO);
                        }
                    } else {
                        if (_$pi < 13) {
                            _$ZK._$Ej = 1;
                        } else if (_$pi < 14) {
                            _$ZK["a670748"] = _$q7;
                        } else if (_$pi < 15) {
                            for (_$rO = 0, _$7G = 0; _$7G < _$zX; _$7G += 2) {
                                _$JP[_$rO++] = _$TG + _$nt.substr(_$7G, 2);
                            }
                        } else {
                            _$nt._$TG = "_$wo";
                        }
                    }
                } else if (_$pi < 32) {
                    if (_$pi < 20) {
                        if (_$pi < 17) {
                            _$rO = _$uc.execScript(_$nt);
                        } else if (_$pi < 18) {
                            _$nt._$Ju = "_$Vl";
                        } else if (_$pi < 19) {
                            var _$Y6 = _$13();
                        } else {
                            _$B_ = _$Fk > 0;
                        }
                    } else if (_$pi < 24) {
                        if (_$pi < 21) {
                            _$rO += "w8CXKQWNb1JGAWf9TFmbd7X6Ya0C5GweMyvgIWvmppVfVwNb6Qrwc0Iln3_g4YUI6D0QciyonbA9VlCTfb01TIsIQAZfOGIauNY9pE4XRt5JK72n7UELIIUPPABkFrHeHLZOi4kehDSXnTxo7uDRCirQS7IiN1pGQ1nAYSwcVBJo$1qtYifAGvSEcGkK";
                        } else if (_$pi < 22) {
                            _$nt._$WH = "_$uR";
                        } else if (_$pi < 23) {
                            var _$Jx = _$ZK["a670748"];
                        } else {
                            var _$rO = '';
                        }
                    } else if (_$pi < 28) {
                        if (_$pi < 25) {
                            _$B_ = _$ZK["a670748"];
                        } else if (_$pi < 26) {
                            // _$rO = _$7G.call(_$uc, _$nt);
                            debugger;
                            _$rO = eval_js();
                        } else if (_$pi < 27) {
                            _$rO += "Ryk7Q6a6sNxYSyuw904mcayiEQHd36vobdJsrZI30BDMxaSDLv_A3jLEyunfLeKs_dnzEWzpmM7dWusH3aPjcB0I4Sz4D$2RW39CXXx8Bb1T4F$_pM0WamcIhFhxDxzLWquOLHlHjFqyXcOWyyMxZP35mFojHcOa6y1Eu9J$4fIxqUSOOeCJ0LHCt_CD";
                        } else {
                            _$1q(79, _$lL);
                        }
                    } else {
                        if (_$pi < 29) {
                            for (_$rI = 0; _$rI < _$Fk; _$rI++) {
                                _$7q(16, _$rI, _$oD);
                            }
                        } else if (_$pi < 30) {
                            _$nt._$oD = "_$dj";
                        } else if (_$pi < 31) {
                            for (_$rI = 0; _$rI < _$Fk; _$rI++) {
                                _$oD.push("}");
                            }
                        } else {
                            _$nt._$61 = "_$7T";
                        }
                    }
                } else if (_$pi < 48) {
                    if (_$pi < 36) {
                        if (_$pi < 33) {
                            _$Is += 1;
                        } else if (_$pi < 34) {
                            _$oD.push(")();");
                        } else if (_$pi < 35) {
                            _$nt._$oQ = 59;
                        } else {
                            _$ZK._$ct = _$1q(18);
                        }
                    } else if (_$pi < 40) {
                        if (_$pi < 37) {
                            _$nt._$Fk = "_$Po";
                        } else if (_$pi < 38) {
                            _$nt._$P_ = "_$Ku";
                        } else if (_$pi < 39) {
                            if (!_$B_) _$Is += 2;
                        } else {
                            var _$rO = _$1q(10);
                        }
                    } else if (_$pi < 44) {
                        if (_$pi < 41) {
                            _$B_ = _$zd - _$rO > 12000;
                        } else if (_$pi < 42) {
                            var _$_w = _$ZK.aebi = [];
                        } else if (_$pi < 43) {
                            return _$JP;
                        } else {
                            var _$rO, _$7G, _$zX = _$nt.length, _$JP = new _$en(_$zX / 2), _$TG = '_$';
                        }
                    } else {
                        if (_$pi < 45) {
                            _$uc['$_ts'] = {};
                        } else if (_$pi < 46) {
                            var _$rO;
                        } else if (_$pi < 47) {
                            _$Is += 2;
                        } else {
                            _$rO += "3C91I7zgBBqmvEJhVNByusUqlGlgfP8TOX7y1dTYH10oWbjSrk8UM_x6zMeRG1iaf3CnCh2bVErEnyes73GwoU$oNThqoiY1fsyeUnHs4EdxLkNh6imm28YIY24WWnUuDhK1A3vrSrikZIxVJTf0xfFjZ6fdwfNo2mlqh1UYGbjLMR_VxM7WDKLgs_zO$iNx";
                        }
                    }
                } else {
                    if (_$pi < 52) {
                        if (_$pi < 49) {
                            var _$oD = [];
                        } else if (_$pi < 50) {
                            _$ZK._$7G = new _$5l().getTime();
                        } else if (_$pi < 51) {
                            _$Fk = _$13();
                        } else {
                            _$nt._$XJ = "_$6U";
                        }
                    } else if (_$pi < 56) {
                        if (_$pi < 53) {
                            _$Vx += _$WH;
                        } else if (_$pi < 54) {
                            _$nt._$AK = "_$OB";
                        } else if (_$pi < 55) {
                            var _$6E = _$ZK._$ct;
                        } else {
                            _$7G = _$uc.eval;
                        }
                    } else if (_$pi < 60) {
                        if (_$pi < 57) {
                            _$nt._$uc = 41;
                        } else if (_$pi < 58) {
                            _$nt._$Is = "_$IJ";
                        } else if (_$pi < 59) {
                            var _$rO = _$uc.eval.toString();
                        } else {
                            var _$9I = _$13();
                        }
                    } else {
                        if (_$pi < 61) {
                            _$nt._$en = "IXek5bcz81q";
                        } else if (_$pi < 62) {
                            _$nt._$9I = "iVNy_hKlUwhSUaXg2IIpZq";
                        } else if (_$pi < 63) {
                            _$rO += "IwkSbOhbWvWms1GmNPHBxciSMgL_AP6KH_8A9wmTbBsOqTr5M8mn2fx4PCHFYzYBVyMLlQiIRXwuVpGQ5iAveGImAY$U_RJwQPtMCjXw0HU0rNKOfLhTuUMVFbavynoNLSEqbyqdcqrBgOpDhuR_KLfkBo6R4CXsvPdSGHnYQ_alNO_lMFlvTXPz5b1H";
                        } else {
                            var _$Vx = 0;
                        }
                    }
                }
            } else {
                if (_$pi < 80) {
                    if (_$pi < 68) {
                        if (_$pi < 65) {
                            _$nt._$B_ = "_$Lo";
                        } else if (_$pi < 66) {
                            _$nt._$$t = _$Rp;
                        } else if (_$pi < 67) {
                            var _$WH = _$13();
                        } else {
                            _$Is += 78;
                        }
                    } else if (_$pi < 72) {
                        if (_$pi < 69) {
                            _$nt._$pX = 2;
                        } else if (_$pi < 70) {
                            _$uc['$_ts'].l__ = _$ZK.l__;
                        } else if (_$pi < 71) {
                            var _$IJ = _$13();
                        } else {
                            _$rO += "LuNMDCJAIL$bJgdomIF4IFA7S6X5ekzU6UEsUKLs3_V4dd$e9i079ucZv9R5RwvHl4mr49zNT$9lqsBfSoboibBx3zH2Nlur2wRaMpP10wfaGG3vNmBs6XfzWPbiIGbUZpB6_pLfbGBV5kdwkstf1YpHX0r_DWMWra65iRxLGnGdkEaaEGwkWz$758BP";
                        }
                    } else if (_$pi < 76) {
                        if (_$pi < 73) {
                            var _$lL = _$oD.join('');
                        } else if (_$pi < 74) {
                            _$nt._$5l = "ndh82oVPHopqHS9DWhtr9a";
                        } else if (_$pi < 75) {
                            _$rO += "VjuZhkAFcegfpU0_vl8aDTeedi0sHHlJrDrlIUUEQ$oCL$KS93EjcXA_JuXJ4QjaVT1UfFl9IfYYcHqvt6hrlXop_8Ni_rk_RbQsVt_W1oHS0al6WUshHDgzrgBlU9aM24H$JnZnMczoYWVuoGpPoPZN1SL3$qEE4Nnrer3wPBUb20UifnH6tXy1PWKH";
                        } else {
                            _$rO = _$rO.replace(RegExp('[\\r\\n\\s]', 'g'), "");
                        }
                    } else {
                        if (_$pi < 77) {
                            return;
                        } else if (_$pi < 78) {
                            var _$6G = _$13();
                        } else if (_$pi < 79) {
                            _$rO += "cl_Ua53Zk9YURiCWOHB91knL4lJjvQTC5a1mlYHZEOJzC7ghwK7NzmuEg$Q27jgW8tvksuZkTBIcRUJ8unMG8HPt1WCQUe$lVgPHlebjmkzbZT02ztSQDk5PLcT2FC$wS93WTiLx0G5tcKA8cuEnPlmdv$WZLKcx95ubsnayJL2LKWy3qex3o3g1j5yL";
                        } else {
                            return 1;
                        }
                    }
                } else if (_$pi < 96) {
                    if (_$pi < 84) {
                        if (_$pi < 81) {
                            var _$zd = _$1q(10);
                        } else if (_$pi < 82) {
                            _$nt._$c4 = "_$pa";
                        } else if (_$pi < 83) {
                            if (!_$B_) _$Is += 1;
                        } else {
                            _$nt._$A_ = "_$OU";
                        }
                    } else if (_$pi < 88) {
                        if (_$pi < 85) {
                            return 0;
                        } else if (_$pi < 86) {
                            var _$Fk = _$13();
                        } else if (_$pi < 87) {
                            var _$zX = _$1q(72);
                        } else {
                            _$rO += "uFQTTrCyP7ftmlhBSFj00$lIfymSAEcnhWo5jjxG1jgw6BsEBqNp1tyjyc_qmhgLYEAfokNyH4q19S8SecKwU4ngiCxlCRDjh__f$6_QHA2$kBgisUS3hnO1SSns9DMeyPQLBO9$Fhon0N6MKvmfSZpflRe09maFoM_tgYKp6nHUEZiynoqpNIHJ1cqD";
                        }
                    } else if (_$pi < 92) {
                        if (_$pi < 89) {
                            _$B_ = _$nt === undefined || _$nt === "";
                        } else if (_$pi < 90) {
                            _$nt._$cX = "_$yC";
                        } else if (_$pi < 91) {
                            _$rO += "Jkq7uc$tenuf5lZKRpnttt13Jx6E_wVx6GY6_j$T$nyp$XElvR0Ew5N9qIKV7_69crq2Tqq$oQpXG7$FZ1v0lh1q7q9o9VrO7GzXJPTGIJ9IWHoDFkrIlLzdN2IsB_3RpiUs5V7TKuGAOBpa_yLo2cCbCvytG0zH51U$SxGIPf30fE86s$AJmEwT4$_i";
                        } else {
                            _$1q(91, _$ZK);
                        }
                    } else {
                        if (_$pi < 93) {
                            var _$JP = _$Jx.length;
                        } else if (_$pi < 94) {
                            _$nt._$xb = 5;
                        } else if (_$pi < 95) {
                            var _$TG = _$13();
                        } else {
                            _$B_ = _$rO !== "functioneval(){[nativecode]}";
                        }
                    }
                } else {
                    if (_$pi < 100) {
                        if (_$pi < 97) {
                            return new _$5l().getTime();
                        } else if (_$pi < 98) {
                            _$7G = _$1q(10);
                        } else if (_$pi < 99) {
                            _$nt._$sy = "_$GA";
                        } else {
                            _$nt._$gZ = "_$2c";
                        }
                    } else {
                        if (_$pi < 101) {
                            _$7q(0);
                        } else if (_$pi < 102) {
                            var _$7G = _$1q(10);
                        } else {
                            _$Is += -78;
                        }
                    }
                }
            }
        }

        function _$7q(_$JP, _$$T, _$$n) {
            function _$yp() {
                var _$9I = [0];
                Array.prototype.push.apply(_$9I, arguments);
                return _$9o.apply(this, _$9I);
            }

            var _$cr, _$q2, _$Tq, _$rO, _$7G, _$zX, _$$X, _$El, _$vR, _$0E, _$w5, _$N9, _$qI, _$KV, _$7_, _$69;
            var _$IJ, _$WH, _$TG = _$JP, _$oD = _$v0[2];
            while (1) {
                _$WH = _$oD[_$TG++];
                if (_$WH < 16) {
                    if (_$WH < 4) {
                        if (_$WH < 1) {
                            return _$7G;
                        } else if (_$WH < 2) {
                            var _$qI = _$13();
                        } else if (_$WH < 3) {
                            _$$X.open('GET', _$7G, false);
                        } else {
                            for (_$zX = 0; _$zX < _$rO; _$zX++) {
                                _$7G[_$zX] = _$13();
                            }
                        }
                    } else if (_$WH < 8) {
                        if (_$WH < 5) {
                            if (!_$IJ) _$TG += 4;
                        } else if (_$WH < 6) {
                            _$_w[_$$T] = _$rO;
                        } else if (_$WH < 7) {
                            _$9o(5, _$$n);
                        } else {
                            var _$rO = _$7q(9);
                        }
                    } else if (_$WH < 12) {
                        if (_$WH < 9) {
                            var _$vR = _$13();
                        } else if (_$WH < 10) {
                            var _$rO = _$13();
                        } else if (_$WH < 11) {
                            for (_$zX = 0; _$zX < _$7G; _$zX++) {
                                _$Tq[_$zX] = _$7q(9);
                            }
                        } else {
                            _$TG += -19;
                        }
                    } else {
                        if (_$WH < 13) {
                        } else if (_$WH < 14) {
                            var _$q2 = _$7q(9);
                        } else if (_$WH < 15) {
                            var _$El = _$13();
                        } else {
                            var _$7G = new _$en(_$rO);
                        }
                    }
                } else if (_$WH < 32) {
                    if (_$WH < 20) {
                        if (_$WH < 17) {
                            _$$X.onreadystatechange = _$yp;
                        } else if (_$WH < 18) {
                            return;
                        } else if (_$WH < 19) {
                            _$$X = _$uc.ActiveXObject ? new _$uc.ActiveXObject('Microsoft.XMLHTTP') : new _$uc.XMLHttpRequest();
                        } else {
                            var _$$X = _$13();
                        }
                    } else if (_$WH < 24) {
                        if (_$WH < 21) {
                            var _$Tq = [];
                        } else if (_$WH < 22) {
                            var _$KV = _$13();
                        } else if (_$WH < 23) {
                            var _$w5 = _$13();
                        } else {
                            _$IJ = _$7G;
                        }
                    } else if (_$WH < 28) {
                        if (_$WH < 25) {
                            var _$7G = _$13();
                        } else if (_$WH < 26) {
                            var _$69 = _$7q(9);
                        } else if (_$WH < 27) {
                            var _$0E = _$13();
                        } else {
                            var _$7G = _$rO > 1 ? _$uf.scripts[_$rO - 2].src : _$q7;
                        }
                    } else {
                        if (_$WH < 29) {
                            var _$7_ = _$7q(9);
                        } else if (_$WH < 30) {
                            var _$N9 = _$13();
                        } else if (_$WH < 31) {
                            var _$rO = _$uf.scripts.length;
                        } else {
                            var _$cr = _$7q(9);
                        }
                    }
                } else {
                    if (_$WH < 33) {
                        _$TG += 19;
                    } else {
                        _$$X.send();
                    }
                }
            }

            function _$9o(_$7G, _$q$) {
                var _$oQ, _$rO;
                var _$JP, _$IJ, _$zX = _$7G, _$9I = _$v0[3];
                while (1) {
                    _$IJ = _$9I[_$zX++];
                    if (_$IJ < 16) {
                        if (_$IJ < 4) {
                            if (_$IJ < 1) {
                                _$q$.push(_$6E[_$w5]);
                            } else if (_$IJ < 2) {
                                for (_$rO = 1; _$rO < _$69.length; _$rO++) {
                                    _$q$.push(",");
                                    _$q$.push(_$6E[_$69[_$rO]]);
                                }
                            } else if (_$IJ < 3) {
                                _$q$.push("++];");
                            } else {
                                _$q$.push(";");
                            }
                        } else if (_$IJ < 8) {
                            if (_$IJ < 5) {
                                _$JP = _$69.length;
                            } else if (_$IJ < 6) {
                                _$q$.push(",");
                            } else if (_$IJ < 7) {
                                _$q$.push(_$6E[_$69[0]]);
                            } else {
                                _$q$.push("while(1){");
                            }
                        } else if (_$IJ < 12) {
                            if (_$IJ < 9) {
                                for (_$rO = 0; _$rO < _$cr.length; _$rO += 2) {
                                    _$9V(0, _$cr[_$rO], _$cr[_$rO + 1], _$q$);
                                }
                            } else if (_$IJ < 10) {
                                _$zX += 27;
                            } else if (_$IJ < 11) {
                                _$JP = _$7_.length;
                            } else {
                                _$q$.push("var ");
                            }
                        } else {
                            if (_$IJ < 13) {
                                _$q$.push(_$$T);
                            } else if (_$IJ < 14) {
                                _$zX += -23;
                            } else if (_$IJ < 15) {
                                _$zX += 23;
                            } else {
                                var _$rO, _$oQ = 4;
                            }
                        }
                    } else if (_$IJ < 32) {
                        if (_$IJ < 20) {
                            if (_$IJ < 17) {
                                _$q$.push(_$6E[_$vR]);
                            } else if (_$IJ < 18) {
                                _$q$.push(_$6E[_$6G]);
                            } else if (_$IJ < 19) {
                                _$1q(31);
                            } else {
                                _$q$.push("(function(){var ");
                            }
                        } else if (_$IJ < 24) {
                            if (_$IJ < 21) {
                                _$q$.push(_$6E[_$$X]);
                            } else if (_$IJ < 22) {
                                _$9V(39);
                            } else if (_$IJ < 23) {
                                if (!_$JP) _$zX += 1;
                            } else {
                                _$zX += 8;
                            }
                        } else if (_$IJ < 28) {
                            if (_$IJ < 25) {
                                _$q$.push("=$_ts.aebi;");
                            } else if (_$IJ < 26) {
                                _$q$.push("[");
                            } else if (_$IJ < 27) {
                                _$q$.push(_$6E[_$El]);
                            } else {
                                _$q$.push("=");
                            }
                        } else {
                            if (_$IJ < 29) {
                                _$JP = _$Tq.length;
                            } else if (_$IJ < 30) {
                                _$q$.push(_$6E[_$KV]);
                            } else if (_$IJ < 31) {
                                _$q$.push("}");
                            } else {
                                _$JP = _$$T == 0;
                            }
                        }
                    } else if (_$IJ < 48) {
                        if (_$IJ < 36) {
                            if (_$IJ < 33) {
                                _$JP = _$ZK["a670748"];
                            } else if (_$IJ < 34) {
                                _$1q(79, _$$X.responseText);
                            } else if (_$IJ < 35) {
                                if (!_$JP) _$zX += 9;
                            } else {
                                _$JP = _$$X.readyState == 4;
                            }
                        } else if (_$IJ < 40) {
                            if (_$IJ < 37) {
                                _$q$.push("(");
                            } else if (_$IJ < 38) {
                                return;
                            } else if (_$IJ < 39) {
                                _$q$.push("=0,");
                            } else {
                                for (_$rO = 0; _$rO < _$7_.length; _$rO++) {
                                    _$q$.push(",");
                                    _$q$.push(_$6E[_$7_[_$rO]]);
                                }
                            }
                        } else if (_$IJ < 44) {
                            if (_$IJ < 41) {
                                if (!_$JP) _$zX += 4;
                            } else if (_$IJ < 42) {
                                _$9V(12, 0, _$Tq.length);
                            } else if (_$IJ < 43) {
                                _$q$.push("){");
                            } else {
                                _$q$.push("];");
                            }
                        } else {
                            if (_$IJ < 45) {
                                if (!_$JP) _$zX += 8;
                            } else if (_$IJ < 46) {
                                _$q$.push("function ");
                            } else if (_$IJ < 47) {
                                _$zX += -27;
                            } else {
                                _$q$.push(_$6E[_$Y6]);
                            }
                        }
                    } else {
                        if (_$IJ < 49) {
                            _$q$.push("=$_ts.scj,");
                        } else {
                            _$q$.push(_$6E[_$qI]);
                        }
                    }
                }

                function _$9V(_$TG, _$pX, _$G7, _$$F) {
                    var _$7G, _$zX, _$JP, _$rO;
                    var _$9I, _$oD, _$IJ = _$TG, _$Fk = _$v0[4];
                    while (1) {
                        _$oD = _$Fk[_$IJ++];
                        if (_$oD < 16) {
                            if (_$oD < 4) {
                                if (_$oD < 1) {
                                    for (_$rO = 1; _$rO < 7; _$rO++) {
                                        if (_$JP <= _$Jk[_$rO]) {
                                            _$zX = _$Jk[_$rO - 1];
                                            break;
                                        }
                                    }
                                } else if (_$oD < 2) {
                                    if (!_$9I) _$IJ += 2;
                                } else if (_$oD < 3) {
                                    for (; _$pX + _$zX < _$G7; _$pX += _$zX) {
                                        _$q$.push(_$7G);
                                        _$q$.push(_$6E[_$qI]);
                                        _$q$.push('<');
                                        _$q$.push(_$pX + _$zX);
                                        _$q$.push("){");
                                        _$9V(12, _$pX, _$pX + _$zX);
                                        _$7G = "}else if(";
                                    }
                                } else {
                                    _$q$.push(_$_j[_$rO[_$7G]]);
                                }
                            } else if (_$oD < 8) {
                                if (_$oD < 5) {
                                    _$IJ += 8;
                                } else if (_$oD < 6) {
                                    _$IJ += 39;
                                } else if (_$oD < 7) {
                                    _$9V(12, _$pX, _$G7);
                                } else {
                                    _$IJ += -40;
                                }
                            } else if (_$oD < 12) {
                                if (_$oD < 9) {
                                    _$q$.push(_$_j[_$q2[_$rO]]);
                                } else if (_$oD < 10) {
                                    _$9I = _$JP == 0;
                                } else if (_$oD < 11) {
                                    var _$7G = _$rO.length;
                                } else {
                                    _$rO -= _$rO % 2;
                                }
                            } else {
                                if (_$oD < 13) {
                                    _$IJ += 21;
                                } else if (_$oD < 14) {
                                    if (!_$9I) _$IJ += 7;
                                } else if (_$oD < 15) {
                                    _$q$.push("}else{");
                                } else {
                                }
                            }
                        } else if (_$oD < 32) {
                            if (_$oD < 20) {
                                if (_$oD < 17) {
                                    for (; _$pX < _$G7; _$pX++) {
                                        _$q$.push(_$7G);
                                        _$q$.push(_$6E[_$qI]);
                                        _$q$.push('<');
                                        _$q$.push(_$pX + 1);
                                        _$q$.push("){");
                                        _$9V(4, _$pX);
                                        _$7G = "}else if(";
                                    }
                                } else if (_$oD < 18) {
                                    _$9V(4, _$pX);
                                } else if (_$oD < 19) {
                                    _$9I = _$q2.length != _$rO;
                                } else {
                                    if (!_$9I) _$IJ += 1;
                                }
                            } else if (_$oD < 24) {
                                if (_$oD < 21) {
                                    _$IJ += 40;
                                } else if (_$oD < 22) {
                                    _$zX = 0;
                                } else if (_$oD < 23) {
                                    var _$rO = _$q2.length;
                                } else {
                                    _$9I = _$rO.length != _$7G;
                                }
                            } else if (_$oD < 28) {
                                if (_$oD < 25) {
                                    _$$F.push(["function ", _$6E[_$pX], "(){var ", _$6E[_$0E], "=[", _$G7, "];Array.prototype.push.apply(", _$6E[_$0E], ",arguments);return ", _$6E[_$N9], ".apply(this,", _$6E[_$0E], ");}"].join(''));
                                } else if (_$oD < 26) {
                                    _$7G = "if(";
                                } else if (_$oD < 27) {
                                    return;
                                } else {
                                    _$q$.push("}");
                                }
                            } else {
                                if (_$oD < 29) {
                                    var _$rO = _$Tq[_$pX];
                                } else if (_$oD < 30) {
                                    _$9I = _$JP <= _$oQ;
                                } else if (_$oD < 31) {
                                    _$9I = _$JP == 1;
                                } else {
                                    _$G7--;
                                }
                            }
                        } else {
                            if (_$oD < 36) {
                                if (_$oD < 33) {
                                    _$7G -= _$7G % 2;
                                } else if (_$oD < 34) {
                                    for (_$7G = 0; _$7G < _$rO; _$7G += 2) {
                                        _$q$.push(_$_j[_$q2[_$7G]]);
                                        _$q$.push(_$6E[_$q2[_$7G + 1]]);
                                    }
                                } else if (_$oD < 35) {
                                    var _$rO, _$7G, _$zX, _$JP = _$G7 - _$pX;
                                } else {
                                    _$IJ += 17;
                                }
                            } else {
                                for (_$zX = 0; _$zX < _$7G; _$zX += 2) {
                                    _$q$.push(_$_j[_$rO[_$zX]]);
                                    _$q$.push(_$6E[_$rO[_$zX + 1]]);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
})()