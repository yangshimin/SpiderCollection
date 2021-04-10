var navigator = {};
global.document = {
    "location": {
        "href": "http://localhost:63342/task/%E6%8A%96%E9%9F%B3.html",
        "ancestorOrigins": {},
        "origin": "https://www.iesdouyin.com",
        "protocol": "https:",
        "host": "www.iesdouyin.com",
        "hostname": "www.iesdouyin.com",
        "port": "",
        "pathname": "",
        "search": "",
        "hash": ""
    },
    "createElement": function () {
        const Canvas = require('canvas');
        var canvas_obj = Canvas.createCanvas(48, 16);
        return canvas_obj;
    },
    "_zid": 2
};
global.navigator = {
    "appCodeName": "Mozilla",
    "appName": "Netscape",
    "appVersion": "5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36",
    "bluetooth": {},
    "clipboard": {},
    "connection": {onchange: null, effectiveType: "4g", rtt: 0, downlink: 10, saveData: false},
    "cookieEnabled": true,
    "credentials": {},
    "deviceMemory": 8,
    "doNotTrack": null,
    "geolocation": {},
    "hardwareConcurrency": 4,
    "keyboard": {},
    "language": "zh",
    "languages": ["zh", "zh-CN", "en-GB", "en", "ja"],
    "locks": {},
    "maxTouchPoints": 0,
    "mediaCapabilities": {},
    "mediaDevices": {ondevicechange: null},
    "mimeTypes": {
        0: "MimeType",
        1: "MimeType",
        2: "MimeType",
        3: "MimeType",
        "application/pdf": "MimeType",
        "application/x-google-chrome-pdf": "MimeType",
        "application/x-nacl": "MimeType",
        "application/x-pnacl": "MimeType",
        length: 4
    },
    "onLine": true,
    "permissions": {},
    "platform": "Win32",
    "plugins": {
        0: "Plugin",
        1: "Plugin",
        2: "Plugin",
        "Chrome PDF Plugin": "Plugin",
        "Chrome PDF Viewer": "Plugin",
        "Native Client": "Plugin",
        length: 3
    },
    "presentation": {defaultRequest: null, receiver: null},
    "product": "Gecko",
    "productSub": "20030107",
    "serviceWorker": {ready: "Promise", controller: null, oncontrollerchange: null, onmessage: null},
    "storage": {},
    "usb": {onconnect: null, ondisconnect: null},
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36",
    "vendor": "Google Inc.",
    "vendorSub": "",
    "webkitPersistentStorage": {}
};
global._zid = 1;
var window = global;
func = function anonymous() {
    function e(e, a, r) {
        return (b[e] || (b[e] = t("x,y", "return x " + e + " y")))(r, a)
    }

    function a(e, a, r) {
        return (k[r] || (k[r] = t("x,y", "return new x[y](" + Array(r + 1).join(",x[++y]").substr(1) + ")")))(e, a)
    }

    function r(e, a, r) {
        var n, t, s = {}, b = s.d = r ? r.d + 1 : 0;
        for (s["$" + b] = s,
                 t = 0; t < b; t++)
            s[n = "$" + t] = r[n];
        for (t = 0,
                 b = s.length = a.length; t < b; t++)
            s[t] = a[t];
        var sign = c(e, 0, s);
        return sign;
    }

    function c(t, b, k) {
        function u(e) {
            v[x++] = e;
            if (e === "canvas") {
                console.log(e)
                // v[x-1] = function () {}
            }
            console.log("数组中增加:", e);
        }

        function f() {
            return g = t.charCodeAt(b++) - 32,
                t.substring(b, b += g)
        }

        function l() {
            try {
                y = c(t, b, k)
            } catch (e) {
                h = e,
                    y = l
            }
        }

        for (var h, y, d, g, v = [], x = 0; ;)
            switch (g = t.charCodeAt(b++) - 32) {
                case 1:
                    u(!v[--x]);
                    break;
                case 4:
                    v[x++] = f();
                    break;
                case 5:
                    u(function (e) {
                        var a = 0
                            , r = e.length;
                        return function () {
                            var c = a < r;
                            return c && u(e[a++]),
                                c
                        }
                    }(v[--x]));
                    break;
                case 6:
                    y = v[--x],
                        u(v[--x](y));
                    break;
                case 8:
                    if (g = t.charCodeAt(b++) - 32,
                        l(),
                        b += g,
                        g = t.charCodeAt(b++) - 32,
                    y === c)
                        b += g;
                    else if (y !== l)
                        return y;
                    break;
                case 9:
                    v[x++] = c;
                    break;
                case 10:
                    u(s(v[--x]));
                    break;
                case 11:
                    y = v[--x],
                        u(v[--x] + y);
                    break;
                case 12:
                    for (y = f(),
                             d = [],
                             g = 0; g < y.length; g++)
                        d[g] = y.charCodeAt(g) ^ g + y.length;
                    u(String.fromCharCode.apply(null, d));
                    break;
                case 13:
                    y = v[--x],
                        h = delete v[--x][y];
                    break;
                case 14:
                    v[x++] = t.charCodeAt(b++) - 32;
                    break;
                case 59:
                    u((g = t.charCodeAt(b++) - 32) ? (y = x,
                        v.slice(x -= g, y)) : []);
                    break;
                case 61:
                    u(v[--x][t.charCodeAt(b++) - 32]);
                    break;
                case 62:
                    g = v[--x],
                        k[0] = 65599 * k[0] + k[1].charCodeAt(g) >>> 0;
                    break;
                case 65:
                    h = v[--x],
                        y = v[--x],
                        v[--x][y] = h;
                    break;
                case 66:
                    u(e(t[b++], v[--x], v[--x]));
                    break;
                case 67:
                    try {
                        y = v[--x],
                            d = v[--x],
                            u((g = v[--x]).x === c ? r(g.y, y, k) : g.apply(d, y));
                        break;
                    } catch (err) {
                        console.log(err)
                    }

                    break;
                case 68:
                    u(e((g = t[b++]) < "<" ? (b--,
                        f()) : g + g, v[--x], v[--x]));
                    break;
                case 70:
                    u(!1);
                    break;
                case 71:
                    v[x++] = n;
                    break;
                case 72:
                    v[x++] = +f();
                    break;
                case 73:
                    u(parseInt(f(), 36));
                    break;
                case 75:
                    if (v[--x]) {
                        b++;
                        break
                    }
                case 74:
                    g = t.charCodeAt(b++) - 32 << 16 >> 16,
                        b += g;
                    break;
                case 76:
                    u(k[t.charCodeAt(b++) - 32]);
                    break;
                case 77:
                    y = v[--x],
                        u(v[--x][y]);
                    break;
                case 78:
                    g = t.charCodeAt(b++) - 32,
                        u(a(v, x -= g + 1, g));
                    break;
                case 79:
                    g = t.charCodeAt(b++) - 32,
                        u(k["$" + g]);
                    break;
                case 81:
                    h = v[--x],
                        v[--x][f()] = h;
                    break;
                case 82:
                    u(v[--x][f()]);
                    break;
                case 83:
                    h = v[--x],
                        k[t.charCodeAt(b++) - 32] = h;
                    break;
                case 84:
                    v[x++] = !0;
                    break;
                case 85:
                    v[x++] = void 0;
                    break;
                case 86:
                    u(v[x - 1]);
                    break;
                case 88:
                    h = v[--x],
                        y = v[--x],
                        v[x++] = h,
                        v[x++] = y;
                    break;
                case 89:
                    u(function () {
                        function e() {
                            return r(e.y, arguments, k)
                        }

                        return e.y = f(),
                            e.x = c,
                            e
                    }());
                    break;
                case 90:
                    v[x++] = null;
                    break;
                case 91:
                    v[x++] = h;
                    break;
                case 93:
                    h = v[--x];
                    break;
                case 0:
                    return v[--x] || k[0]['sign'];
                default:
                    u((g << 16 >> 16) - 16)
            }
    }

    var n = this
        , t = n.Function
        , s = Object.keys || function (e) {
        var a = {}
            , r = 0;
        for (var c in e)
            a[r++] = c;
        return a.length = r, a
    }
        , b = {}
        , k = {};
    return r
};

res = function(uid, tac){
    // window.tac = tac;
    sign = func()("gr$Daten Иb/s!l y͒yĹg,(lfi~ah`{mv,-n|jqewVxp{rvmmx,&effkx[!cs\"l\".Pq%widthl\"@q&heightl\"vr*getContextx$\"2d[!cs#l#,*;?|u.|uc{uq$fontl#vr(fillTextx$$龘ฑภ경2<[#c}l#2q*shadowBlurl#1q-shadowOffsetXl#$$limeq+shadowColorl#vr#arcx88802[%c}l#vr&strokex[ c}l\"v,)}eOmyoZB]mx[ cs!0s$l$Pb<k7l l!r&lengthb%^l$1+s$jl  s#i$1ek1s$gr#tack4)zgr#tac$! +0o![#cj?o ]!l$b%s\"o ]!l\"l$b*b^0d#>>>s!0s%yA0s\"l\"l!r&lengthb<k+l\"^l\"1+s\"jl  s&l&z0l!$ +[\"cs'(0l#i'1ps9wxb&s() &{s)/s(gr&Stringr,fromCharCodes)0s*yWl ._b&s o!])l l Jb<k$.aj;l .Tb<k$.gj/l .^b<k&i\"-4j!+& s+yPo!]+s!l!l Hd>&l!l Bd>&+l!l <d>&+l!l 6d>&+l!l &+ s,y=o!o!]/q\"13o!l q\"10o!],l 2d>& s.{s-yMo!o!]0q\"13o!]*Ld<l 4d#>>>b|s!o!l q\"10o!],l!& s/yIo!o!].q\"13o!],o!]*Jd<l 6d#>>>b|&o!]+l &+ s0l-l!&l-l!i'1z141z4b/@d<l\"b|&+l-l(l!b^&+l-l&zl'g,)gk}ejo{cm,)|yn~Lij~em[\"cl$b%@d<l&zl'l $ +[\"cl$b%b|&+l-l%8d<@b|l!b^&+ q$sign ",
        [{"__esModule": true}]
    );
    return sign(uid);
};

console.log(res("98983038895", "i)69p44w2n7s!i#wpys\"0yʡg,&qnfme|ms g,)gk}ejo{cms!g,&Ieblims\"l!,)~oihgyucmk\"t (,.jjvx|vDgyg}knbl\"d\"inkfl\"v,.jjvx|vDgyg}knbmxl!,)~oihgyucgr&Objectn vuq%valuevfq(writable[#c}) %{s#t ,4KJarz}hrjxl@EWCOQDRB,3LKfs{}wsnqB{iAMWBP@,;DCj{}DSKUAWyTK[C[XrHZ^RFZ[[,7HGnyxowiES}PGWOW\\vL^BN,5JI`}{~iuk{mRAQMURxNG,3LKsnsjpl~nB{iAMWBP@,2MLpga}kEnrjl~PQGG,5JI`}{~iuk{mTLTVDVWMM,1NMwf|`rjFm}qk~TD,4KJert|tripAjNVPBTUCC,4KJpo|ksmyoAjNVPBTUCC[+s#,)Vyn`h`fe|,,olbcCt~vz|cz,6ID}uuuhs@ieg|v@EHZMOY[#s$l$*%s%l%u&k4s&l$l&ms'l l'mk\"t jl#*%s%l%u&k?s&l#l&ms'l ,(lfi~ah`{ml'mk\"t j￻l ,(lfi~ah`{m*%s%l%u&kls&l&vr%matchxgr&RegExp$*\\$[a-z]dc_$ n\"[!cvk:}l ,(lfi~ah`{ml&m,&efkaoTmk\"t jￎf z[ cb|1d<,%Dscafgd\"in,8[xtm}nLzNEGQMKAdGG^NTYkgd\"inb<b|1d<g,&TboLr{m,()!jx-2n&vr$testxg,%@tug{mn ,%vrfkbm[!cb|"));
