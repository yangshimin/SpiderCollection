var pureWindow = require('./pure_window')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var canvas = require('canvas');
var atob = require('atob');
const jsdom = require("jsdom");
const fs = require("fs");
const {JSDOM} = jsdom;
const dom = new JSDOM(`
    <head>
    <title>Security | Glassdoor</title>
    <meta http-equiv="content-type" content="text/html;charset=utf-8" />
    <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'/>
    <meta name="theme-color" content="#0caa41">
    <style type="text/css">body,html{margin:0;padding:0;background:#fff;font-family:Helvetica Neue,HelveticaNeue,Helvetica,Arial,sans-serif;font-size:16px}div,h1,h2,h3,h4,h5,h6,p{color:#20262e}.header{-webkit-box-shadow:inset 0 -1px 0 0 #dee0e3;box-shadow:inset 0 -1px 0 0 #dee0e3}.header .center{height:45px}.header .center:before{content:"";height:100%;margin-right:-.25em}.header .center:before,.logo{display:inline-block;vertical-align:middle}.center{width:996px;margin:0 auto}.article,.center{box-sizing:border-box}.article{max-width:690px;padding:16px;margin:16px 0;background-color:#fff;box-shadow:0 0 2px #c4c7cc;height:100%;border-radius:3px}h1{font-size:20px;font-weight:900;line-height:1em;margin-top:0}h2{font-size:18px;font-weight:400;margin:16px 0}@media only screen and (max-width:767px){.header .center{text-align:center}.center{padding:0;width:100%}.article{max-width:none;margin:16px}}@media only screen and (min-width:768px) and (max-width:1023px){.center{width:100%;margin:0;padding:0 14px}}</style>
    <meta http-equiv="refresh" content="12">
    
    <div id="cf-content" style="display:none">
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

let Node = dom.window.Node;


let mydocument = {
    $cookie: "",
    head: {
        removeChild: function (ele){},
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
        }else if (str === 'head'){
            return dom.window.document.getElementsByTagName(str);
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
    querySelectorAll: function(eleName){
        if (eleName === 'script'){
            return {"length": 6}
        } else{
            let elements = dom.window.document.querySelectorAll(eleName)
            return elements
        }
    }
}
Object.defineProperty(mydocument, 'cookie', {
    get: function() {
        return this.$cookie;
    },
    set: function(value) {
        if (value.indexOf("expires=") !== -1){
            let cookieStr = value.split(";")[0]
            if (new Date(value.split(";")[1].replace("expires=", "")).getTime() >= new Date()){
                this.$cookie = this.$cookie?this.$cookie + "; " + cookieStr:cookieStr
            }
        }else{
            this.$cookie = this.$cookie?this.$cookie + "; " + value:value
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
        "0":{
            "description": "Native Client Executable",
            "type": "application/x-nacl",
            "suffixes": "",
            "enabledPlugin": {},
        },
        "1":{
            "description": "Portable Native Client Executable",
            "type": "application/x-pnacl",
            "suffixes": "",
            "enabledPlugin": {},
        }

    }
];
plugins.item = function (x){
    if (x === 4294967296){
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
    mark: function (){},
    getEntries: function (){
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
                "name": "https://www.glassdoor.com/cdn-cgi/images/trace/jschal/js/transparent.gif?ray="+_cf_chl_opt['cRay'],
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
                "name": "https://www.glassdoor.com/cdn-cgi/images/trace/jschal/nojs/transparent.gif?ray="+_cf_chl_opt['cRay'],
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
                "name": "https://www.glassdoor.com/cdn-cgi/challenge-platform/h/"+_cf_chl_opt['cFPWv']+"/flow/ov1" + url_params + _cf_chl_opt['cRay'] + "/" + _cf_chl_opt['cHash'],
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
        getDetails: function(){},
        getIsInstalled: function(){},
        installState: function(){},
        isInstalled: false,
        runningState: function(){},

    },
    csi: function () {
        return {
            onloadT: new Date().getTime(),
            pageT: new Date().getTime() - timestamp,
            startE:  new Date().getTime() - 200
        }
    },
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

function getPrintShow(key){
    let type = typeof key;
    if (type === 'object'){
        try {
            return `${JSON.stringify(key)}`
        }catch {
            return key.toString()
        }
    }else if (type === 'symbol'){
        return key.toString
    }else {
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
                    return new Proxy(result,getMethodHandler(WatchName))
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


