require("fake-indexeddb/auto");
var openDatabase = require('websql');
var fs = require('fs');
// npm install cookie
var cookieIns = require('cookie')
var dtaEventTarget = require('./simpleEventTarget').EventTarget
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
Object.setPrototypeOf(window , dtaEventTarget.prototype)
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
Object.setPrototypeOf(document, dtaEventTarget.prototype)
document.write = function(text){return dom.window.document.write(text)}
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
    // console.log("getElementByTagName: " + name + " result is: " + dom.window.document.getElementsByTagName(name).length);
    return dom.window.document.getElementsByTagName(name);
};
document.getElementById = function (id) {
    return dom.window.document.getElementById(id);
};

// 不能采取document.$cookie的方式来定义 代码中有检查属性的第一个字符是否是$
// document.cookie = dom.window.document.cookie
let CookieStore = Object;
Object.defineProperty(document, 'cookie', {
    get: function () {
        let cookieStr = "";
        for (let name in CookieStore) {
            cookieStr += name + "=" + CookieStore[name] + "; ";
        }
        return cookieStr.slice(0, cookieStr.length - 2)
    },
    set: function (value) {
        Object.assign(CookieStore, cookieIns.parse(value))
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
    var _$aR = 0,
        _$6x = [[3, 4, 6, 7, 1, 2, 5, 0], [22, 85, 79, 43, 3, 98, 17, 35, 63, 36, 96, 36, 32, 92, 6, 50, 6, 36, 20, 28, 72, 4, 11, 24, 53, 21, 38, 83, 15, 30, 36, 33, 13, 59, 48, 51, 29, 69, 31, 86, 10, 37, 69, 44, 58, 0, 56, 70, 69, 91, 75, 57, 43, 89, 69, 54, 88, 14, 39, 1, 74, 81, 68, 69, 25, 46, 69, 12, 95, 62, 8, 36, 102, 5, 80, 62, 26, 73, 36, 19, 62, 36, 66, 87, 43, 61, 82, 90, 45, 101, 36, 7, 76, 64, 76, 55, 78, 34, 93, 47, 2, 27, 49, 18, 60, 9, 40, 97, 67, 42, 94, 65, 84, 52, 23, 16, 100, 99, 41, 77, 71, 36], [6, 15, 14, 28, 1, 13, 3, 20, 4, 31, 11, 22, 11, 21, 24, 4, 18, 27, 30, 17, 5, 26, 2, 23, 25, 33, 25, 10, 25, 16, 32, 16, 25, 7, 9, 25, 29, 25, 8, 19, 12, 0, 4], [24, 17, 40, 5, 19, 23, 43, 41, 42, 12, 32, 8, 33, 38, 48, 47, 3, 45, 11, 12, 16, 22, 4, 49, 39, 2, 44, 14, 22, 26, 7, 13, 29, 2, 28, 36, 18, 37, 28, 34, 30, 20, 30, 9, 1, 12, 30, 46, 1, 38, 31, 25, 15, 21, 0, 35, 20, 1, 46, 31, 9, 10, 27, 6, 19], [36, 10, 14, 34, 5, 29, 21, 1, 24, 16, 9, 3, 23, 28, 15, 3, 33, 26, 15, 25, 6, 17, 31, 30, 11, 20, 18, 25, 22, 7, 27, 12, 35, 30, 8, 18, 32, 22, 3, 2, 13, 4, 3, 19, 16, 0, 3]];

    function _$1t(_$QX, _$dr) {
        return _$CP.Math.abs(_$QX) % _$dr;
    }

    function _$0X(_$ij) {
        _$ij[_$1t(_$Mb() - _$ij[_$1t(_$Qg(), 16)], 16)] = _$ij[_$1t(_$7G() + _$NX(), 16)];
        _$ij[14] = _$Mb() - _$ij[_$1t(_$Qg(), 16)];
        if (_$7G() - _$ij[_$1t(_$_T(), 16)]) {
            if (_$Mb() + _$UH()) {
                _$ij[6] = _$GS();
            }
        }
        _$6z(_$ij);
        _$ij[2] = _$p5() - _$ij[_$1t(_$gg(), 16)];
        var _$RN = _$7G();
        if (_$88() - _$ij[_$1t(_$GS(), 16)]) {
            _$ij[_$1t(_$p5() + _$45(), 16)] = _$wR(_$ij);
        }
        _$X2(_$ij);
        return _$YT(_$ij);
    }

    function _$Mb() {
        return 5
    }

    function _$Qg() {
        return 8
    }

    function _$7G() {
        return 13
    }

    function _$NX() {
        return 3
    }

    function _$_T() {
        return 0
    }

    function _$UH() {
        return 11
    }

    function _$GS() {
        return 4
    }

    function _$45() {
        return 15
    }

    function _$hB() {
        return 10
    }

    function _$rI(_$ij) {
        var _$RN = _$45();
        var _$5S = _$Mb();
        _$ij[11] = _$88();
        var _$z_ = _$$V();
        var _$z_ = _$_T();
        return _$b3();
    }

    function _$88() {
        return 1
    }

    function _$$V() {
        return 2
    }

    function _$b3() {
        return 14
    }

    function _$6z(_$ij) {
        _$q5(_$ij);
        _$ij[_$1t(_$ij[_$1t(_$gg(), 16)], 16)] = _$Sg(_$ij);
        _$ij[_$1t(_$Cu(_$ij), 16)] = _$Pg(_$ij);
        return _$A_(_$ij);
    }

    function _$q5(_$ij) {
        _$3O(_$ij);
        _$71(_$ij);
        var _$z_ = _$b3();
        if (_$Qg()) {
            _$ij[_$1t(_$Ye(), 16)] = _$7G();
        }
        _$9L(_$ij);
        return _$7G() + _$NX();
    }

    function _$3O(_$ij) {
        _$ij[2] = _$_T();
        var _$5S = _$Mb();
        var _$z_ = _$UH();
        _$ij[1] = _$Ye();
        return _$7G();
    }

    function _$Ye() {
        return 7
    }

    function _$71(_$ij) {
        var _$5S = _$gg();
        var _$z_ = _$hB();
        _$ij[8] = _$8n();
        _$ij[4] = _$$V();
        _$ij[_$1t(_$p5(), 16)] = _$45();
        return _$Mb();
    }

    function _$gg() {
        return 12
    }

    function _$8n() {
        return 6
    }

    function _$p5() {
        return 9
    }

    function _$9L(_$ij) {
        var _$RN = _$Ye();
        var _$z_ = _$7G();
        var _$5S = _$b3();
        var _$RN = _$gg();
        _$ij[10] = _$Qg();
        return _$8n();
    }

    function _$Sg(_$ij) {
        var _$RN = _$Ye();
        var _$z_ = _$7G();
        _$ij[_$1t(_$_T(), 16)] = _$b3();
        var _$z_ = _$UH();
        var _$5S = _$88();
        return _$Ye();
    }

    function _$Cu(_$ij) {
        var _$z_ = _$45();
        var _$z_ = _$Mb();
        _$ij[_$1t(_$Qg(), 16)] = _$8n();
        _$ij[4] = _$$V();
        return _$_T();
    }

    function _$Pg(_$ij) {
        _$ij[12] = _$hB();
        _$ij[8] = _$8n();
        _$ij[4] = _$$V();
        return _$_T();
    }

    function _$A_(_$ij) {
        if (_$Mb()) {
            _$ij[_$1t(_$Qg(), 16)] = _$8n();
        }
        _$qh(_$ij);
        _$8A(_$ij);
        var _$5S = _$Ye();
        if (_$hB()) {
            var _$5S = _$7G();
        }
        _$ij[12] = _$hB();
        return _$88() + _$Ye();
    }

    function _$qh(_$ij) {
        _$ij[15] = _$Mb();
        var _$5S = _$8n();
        var _$z_ = _$GS();
        _$ij[_$1t(_$NX(), 16)] = _$p5();
        var _$5S = _$hB();
        var _$RN = _$Qg();
        return _$8n();
    }

    function _$8A(_$ij) {
        var _$5S = _$p5();
        var _$RN = _$45();
        var _$RN = _$Qg();
        var _$5S = _$8n();
        var _$z_ = _$NX();
        var _$z_ = _$p5();
        return _$45();
    }

    function _$wR(_$ij) {
        _$ij[8] = _$8n();
        var _$5S = _$NX();
        var _$RN = _$p5();
        _$ij[_$1t(_$gg(), 16)] = _$hB();
        return _$Qg();
    }

    function _$X2(_$ij) {
        _$ij[12] = _$fG(_$ij);
        _$ij[_$1t(_$uD(_$ij), 16)] = _$Mb();
        if (_$88() + _$Ye()) {
            _$ij[2] = _$_T();
        }
        var _$RN = _$88();
        var _$5S = _$ij[_$1t(_$GS(), 16)];
        var _$z_ = _$b3();
        if (_$ij[_$1t(_$_T(), 16)]) {
            if (_$45()) {
                _$ij[_$1t(_$hB(), 16)] = _$Qg();
            }
        }
        return _$mZ(_$ij);
    }

    function _$fG(_$ij) {
        _$ij[_$1t(_$88(), 16)] = _$Ye();
        var _$5S = _$_T();
        var _$RN = _$b3();
        var _$RN = _$UH();
        var _$5S = _$88();
        return _$Ye();
    }

    function _$uD(_$ij) {
        var _$5S = _$45();
        var _$5S = _$Mb();
        var _$z_ = _$8n();
        var _$RN = _$GS();
        _$ij[_$1t(_$NX(), 16)] = _$p5();
        return _$45();
    }

    function _$mZ(_$ij) {
        _$wQ(_$ij);
        _$r7(_$ij);
        _$ij[14] = _$gg();
        return _$t2(_$ij);
    }

    function _$wQ(_$ij) {
        _$ij[_$1t(_$Ye(), 16)] = _$7G();
        var _$RN = _$b3();
        var _$z_ = _$gg();
        var _$z_ = _$Qg();
        return _$8n();
    }

    function _$r7(_$ij) {
        var _$RN = _$p5();
        var _$z_ = _$45();
        _$ij[5] = _$UH();
        var _$5S = _$GS();
        var _$RN = _$$V();
        return _$_T();
    }

    function _$t2(_$ij) {
        _$ij[_$1t(_$88(), 16)] = _$Ye();
        _$ij[13] = _$NX();
        var _$RN = _$gg();
        var _$RN = _$hB();
        return _$Qg();
    }

    function _$YT(_$ij) {
        _$Po(_$ij);
        _$ij[6] = _$7G() + _$NX();
        _$AU(_$ij);
        _$7c(_$ij);
        _$ij[2] = _$p5() + _$45();
        return _$tC(_$ij);
    }

    function _$Po(_$ij) {
        _$ij[2] = _$_T();
        if (_$45()) {
            _$ij[_$1t(_$hB(), 16)] = _$Qg();
        }
        _$ij[3] = _$p5();
        if (_$gg()) {
            _$ij[_$1t(_$UH(), 16)] = _$88();
        }
        _$ij[0] = _$b3();
        return _$Mb() + _$UH();
    }

    function _$AU(_$ij) {
        _$ij[_$1t(_$Mb(), 16)] = _$UH();
        _$ij[_$1t(_$8n(), 16)] = _$GS();
        var _$5S = _$p5();
        var _$z_ = _$45();
        _$ij[_$1t(_$hB(), 16)] = _$Qg();
        return _$S2(_$ij);
    }

    function _$S2(_$ij) {
        var _$5S = _$NX();
        var _$RN = _$p5();
        var _$z_ = _$hB();
        var _$5S = _$Qg();
        _$ij[_$1t(_$Ye(), 16)] = _$7G();
        return _$NX();
    }

    function _$7c(_$ij) {
        _$ij[_$1t(_$gg(), 16)] = _$hB();
        var _$z_ = _$Ye();
        var _$z_ = _$7G();
        var _$RN = _$88();
        if (_$_T()) {
            _$ij[14] = _$gg();
        }
        if (_$$V()) {
            var _$RN = _$b3();
        }
        return _$88() + _$Ye();
    }

    function _$tC(_$ij) {
        _$ij[8] = _$8n();
        var _$z_ = _$b3();
        if (_$7G()) {
            var _$RN = _$gg();
        }
        var _$z_ = _$$V();
        var _$z_ = _$_T();
        return _$E9(_$ij);
    }

    function _$E9(_$ij) {
        var _$5S = _$UH();
        var _$RN = _$88();
        _$ij[_$1t(_$GS(), 16)] = _$$V();
        _$ij[0] = _$b3();
        return _$gg();
    }

    var _$wy, _$dd, _$CP, _$$0, _$WD, _$W5, _$OT, _$HD, _$0X;
    var _$p3, _$vx, _$Ce = _$aR, _$Ej = _$6x[0];
    while (1) {
        _$vx = _$Ej[_$Ce++];
        if (_$vx < 4) {
            if (_$vx < 1) {
                return;
            } else if (_$vx < 2) {
                if (!_$p3) _$Ce += 1;
            } else if (_$vx < 3) {
                _$HD = _$CP['$_ts'] = {};
            } else {
                _$wy = [4, 16, 64, 256, 1024, 4096, 16384, 65536];
            }
        } else {
            if (_$vx < 5) {
                _$CP = window, _$$0 = String, _$WD = Array, _$W5 = document, _$OT = Date;
            } else if (_$vx < 6) {
                _$tO(0);
            } else if (_$vx < 7) {
                _$HD = _$CP['$_ts'];
            } else {
                _$p3 = !_$HD;
            }
        }
    }

    function _$tO(_$Mb, _$QX) {
        function _$Gw() {
            var _$1t = _$dE.charCodeAt(_$Cs++), _$aR;
            if (_$1t < 128) {
                return _$1t;
            } else if (_$1t < 251) {
                return _$1t - 32;
            } else if (_$1t === 251) {
                return 0;
            } else if (_$1t === 254) {
                _$1t = _$dE.charCodeAt(_$Cs++);
                if (_$1t >= 128) _$1t -= 32;
                _$aR = _$dE.charCodeAt(_$Cs++);
                if (_$aR >= 128) _$aR -= 32;
                return _$1t * 219 + _$aR;
            } else if (_$1t === 255) {
                _$1t = _$dE.charCodeAt(_$Cs++);
                if (_$1t >= 128) _$1t -= 32;
                _$aR = _$dE.charCodeAt(_$Cs++);
                if (_$aR >= 128) _$aR -= 32;
                _$1t = _$1t * 219 * 219 + _$aR * 219;
                _$aR = _$dE.charCodeAt(_$Cs++);
                if (_$aR >= 128) _$aR -= 32;
                return _$1t + _$aR;
            } else if (_$1t === 252) {
                _$aR = _$dE.charCodeAt(_$Cs++);
                if (_$aR >= 128) _$aR -= 32;
                return -_$aR;
            } else if (_$1t === 253) {
                _$1t = _$dE.charCodeAt(_$Cs++);
                if (_$1t >= 128) _$1t -= 32;
                _$aR = _$dE.charCodeAt(_$Cs++);
                if (_$aR >= 128) _$aR -= 32;
                return _$1t * -219 - _$aR;
            } else {
            }
        }

        var _$bi, _$As, _$RN, _$gf, _$dE, _$tt, _$EX, _$1t, _$aR, _$Ce, _$p3, _$RX, _$vx, _$Ej, _$ij, _$LT, _$C2,
            _$z_, _$5S, _$Cs;
        var _$7G, _$_T, _$Qg = _$Mb, _$UH = _$6x[1];
        while (1) {
            _$_T = _$UH[_$Qg++];
            if (_$_T < 64) {
                if (_$_T < 16) {
                    if (_$_T < 4) {
                        if (_$_T < 1) {
                            var _$bi = _$Gw();
                        } else if (_$_T < 2) {
                            for (_$z_ = 0; _$z_ < _$C2; _$z_++) {
                                _$LT.push("}");
                            }
                        } else if (_$_T < 3) {
                            _$QX._$yH = "_$rI";
                        } else {
                            _$tO(31);
                        }
                    } else if (_$_T < 8) {
                        if (_$_T < 5) {
                            _$1t += "3PISJSx$ptYiQpI57iA14nB84$FsYOO4q7AXF8H6z6PZEgNvw4HtvHPxCGnEu3pnN3Em0YqBLnLbDZlm$p1mdpEWTcmtPTHzH5CK4wLEXtNLPslkx9RDK2JDRB7mpXTzYbcXBFlbBEq3BM0lPkJFRKJrOa2aejoHKjZOHIU_Hnhc1I9WuJLXfWONk5_5";
                        } else if (_$_T < 6) {
                            _$1t = _$1t.replace(RegExp('[\\r\\n\\s]', 'g'), "");
                        } else if (_$_T < 7) {
                            _$Qg += 78;
                        } else {
                            _$QX._$UF = 28;
                        }
                    } else if (_$_T < 12) {
                        if (_$_T < 9) {
                            _$HD._$Ht = 1;
                        } else if (_$_T < 10) {
                            _$QX._$Qg = "_$vx";
                        } else if (_$_T < 11) {
                            var _$p3 = _$dE.length;
                        } else {
                            _$1t += "sZiFU1GYgUBkL7V0$mQZsdiuW9IQgJ2O121O$6lodyXgvqsfbtcWLCjSK5OVprlA69lZZzwz$7ZCdC1gvJWxvBMBvAAAxOVKSIzJ8q9InyzuZISPoJHqitZ348MQ0$tNEoY5SAW6gErSqrrbYSXzdu5Z3_IqLK27f3hCGy9DzjMCluAN00Cr6MXpOS5a";
                        }
                    } else {
                        if (_$_T < 13) {
                            var _$RN = _$tO(10);
                        } else if (_$_T < 14) {
                            var _$dE = _$HD["a670748"];
                        } else if (_$_T < 15) {
                            var _$C2 = _$Gw();
                        } else {
                            _$1t += "COC_vyMPpsUMA08_6f41yPrldt9dC7X3aWNWDBJQ8tZarZyFChwXKrjH3yjVa792FxEAnTxR1LqsRGVnOlLZU0M_m4CQE676hlIldvJfuHIUUATEiysLLayLZ_pv59c9CbYDIkphRtsG3e0bPjixIM95qQmmnSBaPOWwcxM42lX62y2pc$0UMnb5G$JaNst0";
                        }
                    }
                } else if (_$_T < 32) {
                    if (_$_T < 20) {
                        if (_$_T < 17) {
                            _$QX._$Px = "_$tF";
                        } else if (_$_T < 18) {
                            _$nD(0);
                        } else if (_$_T < 19) {
                            _$QX._$pK = "_$q5";
                        } else {
                            _$7G = _$QX === undefined || _$QX === "";
                        }
                    } else if (_$_T < 24) {
                        if (_$_T < 21) {
                            var _$1t = '';
                        } else if (_$_T < 22) {
                            _$1t += "$krUsm49Czl4vDGPmWkBvLAxW45gV_Fd_ChOOXSi9EQYdmEh8dMJaqeGdqQFWTz5Mige$t0AqCR2bkt9fUdl96_GLjcZ5k299bDiGX8F66lhs$7R$Z6Evu2eWFEYGRZnROuU6XZLjU03Ra_iPq74XbBKan$dZNwUx7Tfh59GO9G2ef1DWlZs3bGGGKQl";
                        } else if (_$_T < 23) {
                            _$HD._$XB = _$tO(18);
                        } else {
                            _$QX._$ij = "_$KO";
                        }
                    } else if (_$_T < 28) {
                        if (_$_T < 25) {
                            _$1t += "nNqKT20wFuuuLtnxJBf5AbSQPR01Fqy05CvWDq$JY3yaITWkNBBtSbuBD_vSQa_zSyRCdQrdvF$_tj54pkYWHufz0V8adobeusskkn$1P_d54hDY1bBCAyu1fjlNQ0htJC$D7HR0cJz756LdnJOwK7b7wHmwZZa3JKhhi5dLDt7CWp58GQYzTXSUq6Z8";
                        } else if (_$_T < 26) {
                            _$aR = _$tO(10);
                        } else if (_$_T < 27) {
                            return 1;
                        } else {
                            _$QX._$HA = "_$88";
                        }
                    } else {
                        if (_$_T < 29) {
                            _$1t += "wyddCP$0WDW5OTHD0XQXdrGwdEttEXCsbigfAsH9D63sbvMAt7$PSwa1_L8Qk9y_npxS5QFOUFckPVxZ1l6xTBtOnDy3BD1taRCep3RXvxEjijLTC2z_5SRNMbQg7GNX_TUHGS45hBrI88$Vb36zq53OYe71gg8np59LSgCuPgA_qh8AwRX2fGuDmZwQ";
                        } else if (_$_T < 30) {
                            var _$aR = _$tO(10);
                        } else if (_$_T < 31) {
                            return _$tO(12, _$1t);
                        } else {
                            var _$EX = _$HD.aebi = [];
                        }
                    }
                } else if (_$_T < 48) {
                    if (_$_T < 36) {
                        if (_$_T < 33) {
                            var _$1t, _$aR, _$Ce = _$QX.length, _$p3 = new _$WD(_$Ce / 2), _$RX = '_$';
                        } else if (_$_T < 34) {
                            _$HD._$aR = new _$OT().getTime();
                        } else if (_$_T < 35) {
                            _$QX._$te = "_$GS";
                        } else {
                            _$CP['$_ts'] = {};
                        }
                    } else if (_$_T < 40) {
                        if (_$_T < 37) {
                            return;
                        } else if (_$_T < 38) {
                            var _$Cs = 0;
                        } else if (_$_T < 39) {
                            _$1t += "Nu6o4Dujiii3lKrtbn6ZDSW0Nm2vDaD3406VAg6vmVylVTg5CTfqslvZzMiO7rKkBJVzwMjyIctEJiot0JxFXTL_Cpj9GrBOHWB3zELfaxcqneup07ZhBzF2EUeTHLARCd5K0jALRHBSHsTIjzVmzkzYJeh32D1N6L_axdl58z9PHovcwt3jUETliLKa";
                        } else {
                            for (_$z_ = 0; _$z_ < _$C2; _$z_++) {
                                _$nD(16, _$z_, _$LT);
                            }
                        }
                    } else if (_$_T < 44) {
                        if (_$_T < 41) {
                            _$QX._$WD = "cx9TOrMMkTA";
                        } else if (_$_T < 42) {
                            _$QX._$RX = "_$Xv";
                        } else if (_$_T < 43) {
                            _$QX._$3s = "NvB6QUf11dq";
                        } else {
                            if (!_$7G) _$Qg += 2;
                        }
                    } else {
                        if (_$_T < 45) {
                            var _$RX = _$Gw();
                        } else if (_$_T < 46) {
                            debugger;
                            // _$1t = _$aR.call(_$CP, _$QX);
                            _$1t = eval_js();
                            debugger;
                        } else if (_$_T < 47) {
                            _$tO(79, _$5S);
                        } else {
                            _$QX._$2o = "_$hB";
                        }
                    }
                } else {
                    if (_$_T < 52) {
                        if (_$_T < 49) {
                            var _$tt = _$HD._$XB;
                        } else if (_$_T < 50) {
                            _$QX._$LI = "_$$V";
                        } else if (_$_T < 51) {
                            _$QX._$CP = 180;
                        } else {
                            var _$1t = _$tO(10);
                        }
                    } else if (_$_T < 56) {
                        if (_$_T < 53) {
                            _$QX._$vH = "_$tx";
                        } else if (_$_T < 54) {
                            _$1t += "3J5Jrj1W8XSosE0Bh4cAPPahCXAt8MxrqUMFdxzm4O$laP3cQRXWHvZHPDEr4JJ5kVzIsetLLqBV5jU$Lp9iXIhIQ2v987pdMHgoQD7x43euyG4U4SaBzHaAKNXP98JR0gSG0vVqKXFDPp9qKJbJ$Mfc9ZyiLGYvFbJwjEDC2i3Gv3GdSSVcxCu$JgeJ";
                        } else if (_$_T < 55) {
                            _$Cs += _$ij;
                        } else {
                            _$QX._$ck = 3;
                        }
                    } else if (_$_T < 60) {
                        if (_$_T < 57) {
                            var _$gf = _$Gw();
                        } else if (_$_T < 58) {
                            _$7G = _$C2 > 0;
                        } else if (_$_T < 59) {
                            var _$vx = _$Gw();
                        } else {
                            _$HD["a670748"] = _$dd;
                        }
                    } else {
                        if (_$_T < 61) {
                            _$QX._$7G = "_$6z";
                        } else if (_$_T < 62) {
                            _$1t = _$CP.execScript(_$QX);
                        } else if (_$_T < 63) {
                            if (!_$7G) _$Qg += 1;
                        } else {
                            _$CP['$_ts'].l__ = _$HD.l__;
                        }
                    }
                }
            } else {
                if (_$_T < 80) {
                    if (_$_T < 68) {
                        if (_$_T < 65) {
                            return _$p3;
                        } else if (_$_T < 66) {
                            _$QX._$Ej = "BoubQqS0a2e9gBk9MdFImq";
                        } else if (_$_T < 67) {
                            var _$1t;
                        } else {
                            _$QX._$OT = "fyOntaMchB5PZELWXIMuGl";
                        }
                    } else if (_$_T < 72) {
                        if (_$_T < 69) {
                            _$HD._$aR -= _$tO(10);
                        } else if (_$_T < 70) {
                        } else if (_$_T < 71) {
                            var _$Ej = _$Gw();
                        } else {
                            _$QX._$C2 = "_$1M";
                        }
                    } else if (_$_T < 76) {
                        if (_$_T < 73) {
                            _$1t += "r7t2YTPoAUS27ctCE9rKfxtGWX2jftTpDeUfSkdSxM_335Q6rfB_jbCYo$Xn0ZVUYa1VSxFMm79$X8UTtJVA1uZGpO6Gj8gMteyHHALIGD2opK0qlJmvvOKOXvb2uiL1LOJNwoyKW_AfHV1MyXEnGCXa3Wv$pGX9q2XBE2C9R3wYWUouuobP8jsDSTub";
                        } else if (_$_T < 74) {
                            return 0;
                        } else if (_$_T < 75) {
                            _$LT.push(")();");
                        } else {
                            var _$ij = _$Gw();
                        }
                    } else {
                        if (_$_T < 77) {
                            _$Qg += -78;
                        } else if (_$_T < 78) {
                            _$QX._$nE = "_$t_";
                        } else if (_$_T < 79) {
                            _$QX._$GD = "_$b3";
                        } else {
                            _$7G = _$HD["a670748"];
                        }
                    }
                } else if (_$_T < 96) {
                    if (_$_T < 84) {
                        if (_$_T < 81) {
                            _$7G = _$1t !== "functioneval(){[nativecode]}";
                        } else if (_$_T < 82) {
                            var _$5S = _$LT.join('');
                        } else if (_$_T < 83) {
                            _$Qg += 2;
                        } else {
                            _$1t += "Tn8WNqzKjtVOfCd77hTtuE5rbNEVm5bjb9WCjTLFDuHayMVk9SHUovVL3a21F_Gq7AA2Iv6lXLe8b1e_F6Pmu_yjLWCAHFlxmi73MI38shipbySEizvKSrLmzeSlVMQ44Lu2RkkJoQempEkqJUPlyZSCWvfQTyGOWMojrVVx6i$OmhQdBXoy1yiC6_WB";
                        }
                    } else if (_$_T < 88) {
                        if (_$_T < 85) {
                            _$QX._$3W = 58;
                        } else if (_$_T < 86) {
                            _$tO(91, _$HD);
                        } else if (_$_T < 87) {
                            var _$Ce = _$tO(72);
                        } else {
                            _$7G = _$CP.execScript;
                        }
                    } else if (_$_T < 92) {
                        if (_$_T < 89) {
                            var _$LT = [];
                        } else if (_$_T < 90) {
                            _$As = _$dE.substr(_$Cs, _$ij).split(_$$0.fromCharCode(255));
                        } else if (_$_T < 91) {
                            _$aR = _$CP.eval;
                        } else {
                            _$C2 = _$Gw();
                        }
                    } else {
                        if (_$_T < 93) {
                            for (_$1t = 0, _$aR = 0; _$aR < _$Ce; _$aR += 2) {
                                _$p3[_$1t++] = _$RX + _$QX.substr(_$aR, 2);
                            }
                        } else if (_$_T < 94) {
                            _$QX._$gM = "_$45";
                        } else if (_$_T < 95) {
                            _$QX._$$0 = _$0X;
                        } else {
                            _$7G = _$RN - _$1t > 12000;
                        }
                    }
                } else {
                    if (_$_T < 100) {
                        if (_$_T < 97) {
                            return new _$OT().getTime();
                        } else if (_$_T < 98) {
                            _$QX._$PV = "ESHNT4th78a";
                        } else if (_$_T < 99) {
                            _$Qg += 1;
                        } else {
                            _$QX._$CG = "_$uX";
                        }
                    } else {
                        if (_$_T < 101) {
                            _$QX._$LT = "_$mv";
                        } else if (_$_T < 102) {
                            return _$1t;
                        } else {
                            var _$1t = _$CP.eval.toString();
                        }
                    }
                }
            }
        }

        function _$nD(_$p3, _$H9, _$D6) {
            function _$3s() {
                var _$Ej = [0];
                Array.prototype.push.apply(_$Ej, arguments);
                return _$y3.apply(this, _$Ej);
            }

            var _$np, _$xS, _$5Q, _$1t, _$aR, _$Ce, _$bv, _$MA, _$t7, _$$P, _$Sw, _$a1, _$_L, _$8Q, _$k9, _$y_;
            var _$vx, _$ij, _$RX = _$p3, _$LT = _$6x[2];
            while (1) {
                _$ij = _$LT[_$RX++];
                if (_$ij < 16) {
                    if (_$ij < 4) {
                        if (_$ij < 1) {
                            _$y3(5, _$D6);
                        } else if (_$ij < 2) {
                            _$bv = _$CP.ActiveXObject ? new _$CP.ActiveXObject('Microsoft.XMLHTTP') : new _$CP.XMLHttpRequest();
                        } else if (_$ij < 3) {
                            var _$_L = _$Gw();
                        } else {
                            _$bv.onreadystatechange = _$3s;
                        }
                    } else if (_$ij < 8) {
                        if (_$ij < 5) {
                            return;
                        } else if (_$ij < 6) {
                            var _$Sw = _$Gw();
                        } else if (_$ij < 7) {
                            var _$1t = _$W5.scripts.length;
                        } else {
                            var _$1t = _$nD(9);
                        }
                    } else if (_$ij < 12) {
                        if (_$ij < 9) {
                            var _$aR = _$Gw();
                        } else if (_$ij < 10) {
                            _$EX[_$H9] = _$1t;
                        } else if (_$ij < 11) {
                            var _$y_ = _$nD(9);
                        } else {
                            _$RX += 19;
                        }
                    } else {
                        if (_$ij < 13) {
                            for (_$Ce = 0; _$Ce < _$aR; _$Ce++) {
                                _$5Q[_$Ce] = _$nD(9);
                            }
                        } else if (_$ij < 14) {
                            _$bv.open('GET', _$aR, false);
                        } else if (_$ij < 15) {
                            _$vx = _$aR;
                        } else {
                            var _$aR = _$1t > 1 ? _$W5.scripts[_$1t - 2].src : _$dd;
                        }
                    }
                } else if (_$ij < 32) {
                    if (_$ij < 20) {
                        if (_$ij < 17) {
                            _$RX += -19;
                        } else if (_$ij < 18) {
                            var _$$P = _$Gw();
                        } else if (_$ij < 19) {
                            var _$bv = _$Gw();
                        } else {
                            var _$5Q = [];
                        }
                    } else if (_$ij < 24) {
                        if (_$ij < 21) {
                            _$bv.send();
                        } else if (_$ij < 22) {
                            for (_$Ce = 0; _$Ce < _$1t; _$Ce++) {
                                _$aR[_$Ce] = _$Gw();
                            }
                        } else if (_$ij < 23) {
                            var _$np = _$nD(9);
                        } else {
                            var _$8Q = _$Gw();
                        }
                    } else if (_$ij < 28) {
                        if (_$ij < 25) {
                            return _$aR;
                        } else if (_$ij < 26) {
                        } else if (_$ij < 27) {
                            var _$a1 = _$Gw();
                        } else {
                            var _$MA = _$Gw();
                        }
                    } else {
                        if (_$ij < 29) {
                            if (!_$vx) _$RX += 4;
                        } else if (_$ij < 30) {
                            var _$xS = _$nD(9);
                        } else if (_$ij < 31) {
                            var _$t7 = _$Gw();
                        } else {
                            var _$1t = _$Gw();
                        }
                    }
                } else {
                    if (_$ij < 33) {
                        var _$aR = new _$WD(_$1t);
                    } else {
                        var _$k9 = _$nD(9);
                    }
                }
            }

            function _$y3(_$aR, _$FO) {
                var _$UF, _$1t;
                var _$p3, _$vx, _$Ce = _$aR, _$Ej = _$6x[3];
                while (1) {
                    _$vx = _$Ej[_$Ce++];
                    if (_$vx < 16) {
                        if (_$vx < 4) {
                            if (_$vx < 1) {
                                if (!_$p3) _$Ce += 9;
                            } else if (_$vx < 2) {
                                _$FO.push("=");
                            } else if (_$vx < 3) {
                                if (!_$p3) _$Ce += 4;
                            } else {
                                _$FO.push("function ");
                            }
                        } else if (_$vx < 8) {
                            if (_$vx < 5) {
                                for (_$1t = 0; _$1t < _$k9.length; _$1t++) {
                                    _$FO.push(",");
                                    _$FO.push(_$tt[_$k9[_$1t]]);
                                }
                            } else if (_$vx < 6) {
                                _$Ce += 27;
                            } else if (_$vx < 7) {
                                _$FO.push("}");
                            } else {
                                _$Ce += -27;
                            }
                        } else if (_$vx < 12) {
                            if (_$vx < 9) {
                                _$FO.push(_$tt[_$bi]);
                            } else if (_$vx < 10) {
                                _$FO.push(_$tt[_$bv]);
                            } else if (_$vx < 11) {
                                _$FO.push("++];");
                            } else {
                                _$FO.push("(");
                            }
                        } else {
                            if (_$vx < 13) {
                                _$FO.push(_$tt[_$MA]);
                            } else if (_$vx < 14) {
                                _$BD(39);
                            } else if (_$vx < 15) {
                                _$p3 = _$HD["a670748"];
                            } else {
                                _$FO.push("];");
                            }
                        }
                    } else if (_$vx < 32) {
                        if (_$vx < 20) {
                            if (_$vx < 17) {
                                _$p3 = _$k9.length;
                            } else if (_$vx < 18) {
                                _$Ce += 23;
                            } else if (_$vx < 19) {
                                for (_$1t = 1; _$1t < _$y_.length; _$1t++) {
                                    _$FO.push(",");
                                    _$FO.push(_$tt[_$y_[_$1t]]);
                                }
                            } else {
                                return;
                            }
                        } else if (_$vx < 24) {
                            if (_$vx < 21) {
                                _$FO.push(_$tt[_$_L]);
                            } else if (_$vx < 22) {
                                _$p3 = _$5Q.length;
                            } else if (_$vx < 23) {
                                if (!_$p3) _$Ce += 1;
                            } else {
                                var _$1t, _$UF = 4;
                            }
                        } else if (_$vx < 28) {
                            if (_$vx < 25) {
                                _$p3 = _$bv.readyState == 4;
                            } else if (_$vx < 26) {
                                _$FO.push(_$H9);
                            } else if (_$vx < 27) {
                                _$tO(31);
                            } else {
                                _$BD(12, 0, _$5Q.length);
                            }
                        } else {
                            if (_$vx < 29) {
                                _$FO.push("var ");
                            } else if (_$vx < 30) {
                                _$p3 = _$y_.length;
                            } else if (_$vx < 31) {
                                _$FO.push(",");
                            } else {
                                _$FO.push("[");
                            }
                        }
                    } else if (_$vx < 48) {
                        if (_$vx < 36) {
                            if (_$vx < 33) {
                                _$FO.push("=0,");
                            } else if (_$vx < 34) {
                                _$FO.push("=$_ts.scj,");
                            } else if (_$vx < 35) {
                                _$FO.push(_$tt[_$t7]);
                            } else {
                                _$FO.push("while(1){");
                            }
                        } else if (_$vx < 40) {
                            if (_$vx < 37) {
                                _$FO.push(_$tt[_$y_[0]]);
                            } else if (_$vx < 38) {
                                _$FO.push(";");
                            } else if (_$vx < 39) {
                                _$FO.push(_$tt[_$gf]);
                            } else {
                                _$Ce += -23;
                            }
                        } else if (_$vx < 44) {
                            if (_$vx < 41) {
                                for (_$1t = 0; _$1t < _$np.length; _$1t += 2) {
                                    _$BD(0, _$np[_$1t], _$np[_$1t + 1], _$FO);
                                }
                            } else if (_$vx < 42) {
                                if (!_$p3) _$Ce += 8;
                            } else if (_$vx < 43) {
                                _$FO.push("(function(){var ");
                            } else {
                                _$p3 = _$H9 == 0;
                            }
                        } else {
                            if (_$vx < 45) {
                                _$tO(79, _$bv.responseText);
                            } else if (_$vx < 46) {
                                _$FO.push(_$tt[_$Sw]);
                            } else if (_$vx < 47) {
                                _$FO.push(_$tt[_$8Q]);
                            } else {
                                _$Ce += 8;
                            }
                        }
                    } else {
                        if (_$vx < 49) {
                            _$FO.push("=$_ts.aebi;");
                        } else {
                            _$FO.push("){");
                        }
                    }
                }

                function _$BD(_$RX, _$ck, _$PV, _$xZ) {
                    var _$aR, _$Ce, _$p3, _$1t;
                    var _$Ej, _$LT, _$vx = _$RX, _$C2 = _$6x[4];
                    while (1) {
                        _$LT = _$C2[_$vx++];
                        if (_$LT < 16) {
                            if (_$LT < 4) {
                                if (_$LT < 1) {
                                    _$FO.push(_$As[_$xS[_$1t]]);
                                } else if (_$LT < 2) {
                                    for (_$Ce = 0; _$Ce < _$aR; _$Ce += 2) {
                                        _$FO.push(_$As[_$1t[_$Ce]]);
                                        _$FO.push(_$tt[_$1t[_$Ce + 1]]);
                                    }
                                } else if (_$LT < 3) {
                                    var _$1t = _$xS.length;
                                } else {
                                    return;
                                }
                            } else if (_$LT < 8) {
                                if (_$LT < 5) {
                                    _$vx += -40;
                                } else if (_$LT < 6) {
                                    var _$1t = _$5Q[_$ck];
                                } else if (_$LT < 7) {
                                    _$vx += 17;
                                } else {
                                    _$vx += 8;
                                }
                            } else if (_$LT < 12) {
                                if (_$LT < 9) {
                                    for (; _$ck + _$Ce < _$PV; _$ck += _$Ce) {
                                        _$FO.push(_$aR);
                                        _$FO.push(_$tt[_$_L]);
                                        _$FO.push('<');
                                        _$FO.push(_$ck + _$Ce);
                                        _$FO.push("){");
                                        _$BD(12, _$ck, _$ck + _$Ce);
                                        _$aR = "}else if(";
                                    }
                                } else if (_$LT < 10) {
                                    _$FO.push(_$As[_$1t[_$aR]]);
                                } else if (_$LT < 11) {
                                    _$vx += 40;
                                } else {
                                    _$PV--;
                                }
                            } else {
                                if (_$LT < 13) {
                                    for (_$1t = 1; _$1t < 7; _$1t++) {
                                        if (_$p3 <= _$wy[_$1t]) {
                                            _$Ce = _$wy[_$1t - 1];
                                            break;
                                        }
                                    }
                                } else if (_$LT < 14) {
                                    _$1t -= _$1t % 2;
                                } else if (_$LT < 15) {
                                    for (_$aR = 0; _$aR < _$1t; _$aR += 2) {
                                        _$FO.push(_$As[_$xS[_$aR]]);
                                        _$FO.push(_$tt[_$xS[_$aR + 1]]);
                                    }
                                } else {
                                    if (!_$Ej) _$vx += 2;
                                }
                            }
                        } else if (_$LT < 32) {
                            if (_$LT < 20) {
                                if (_$LT < 17) {
                                    if (!_$Ej) _$vx += 1;
                                } else if (_$LT < 18) {
                                    _$Ej = _$p3 <= _$UF;
                                } else if (_$LT < 19) {
                                    _$FO.push("}else{");
                                } else {
                                    _$Ej = _$xS.length != _$1t;
                                }
                            } else if (_$LT < 24) {
                                if (_$LT < 21) {
                                    for (; _$ck < _$PV; _$ck++) {
                                        _$FO.push(_$aR);
                                        _$FO.push(_$tt[_$_L]);
                                        _$FO.push('<');
                                        _$FO.push(_$ck + 1);
                                        _$FO.push("){");
                                        _$BD(4, _$ck);
                                        _$aR = "}else if(";
                                    }
                                } else if (_$LT < 22) {
                                    _$aR -= _$aR % 2;
                                } else if (_$LT < 23) {
                                    _$FO.push("}");
                                } else {
                                    var _$1t, _$aR, _$Ce, _$p3 = _$PV - _$ck;
                                }
                            } else if (_$LT < 28) {
                                if (_$LT < 25) {
                                    _$Ej = _$1t.length != _$aR;
                                } else if (_$LT < 26) {
                                    _$BD(4, _$ck);
                                } else if (_$LT < 27) {
                                    _$Ej = _$p3 == 1;
                                } else {
                                    _$Ce = 0;
                                }
                            } else {
                                if (_$LT < 29) {
                                    _$Ej = _$p3 == 0;
                                } else if (_$LT < 30) {
                                    var _$aR = _$1t.length;
                                } else if (_$LT < 31) {
                                    _$aR = "if(";
                                } else {
                                    if (!_$Ej) _$vx += 7;
                                }
                            }
                        } else {
                            if (_$LT < 36) {
                                if (_$LT < 33) {
                                    _$BD(12, _$ck, _$PV);
                                } else if (_$LT < 34) {
                                    _$vx += 21;
                                } else if (_$LT < 35) {
                                    _$vx += 39;
                                } else {
                                }
                            } else {
                                _$xZ.push(["function ", _$tt[_$ck], "(){var ", _$tt[_$$P], "=[", _$PV, "];Array.prototype.push.apply(", _$tt[_$$P], ",arguments);return ", _$tt[_$a1], ".apply(this,", _$tt[_$$P], ");}"].join(''));
                            }
                        }
                    }
                }
            }
        }
    }
})()
!function(){document.write("<script>console.log('hello world')</script>")}()
console.log(document.getElementsByTagName('html')[0].innerHTML)
_$v$('5EAU');
_$3O();