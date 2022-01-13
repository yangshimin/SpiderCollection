function M(a) {
    return {
        start: function () {
            a._start()
        },
        stop: function () {
            a._stop()
        },
        getToken: function (b, c, e) {
            if (!b)
                throw Error("Missing business key");
            a._getToken(b, c, e)
        },
        getNdInfo: function (b) {
            a._getNdInfo(b)
        },
        setCustomTrackId: function (b) {
            a._setCustomTrackId && a._setCustomTrackId(b)
        },
        getInstance: function () {
            return a
        }
    }
}

function initWatchMan(l, productNumber, bid) {
    function w(a) {
        void 0 === a && (a = 0);
        return (new Date).getTime() + parseInt(a, 10)
    };

    function y(a, b, c) {
        try {
            var e = w(c);
            localStorage.setItem(a, b + k + e)
        } catch (d) {
        }
    }

    var pn = productNumber || "YD20160637306799";
    var u = {
        "configHash": l.conf,
        "lastUsedVersion": l.luv,
        "sConfig": l.conf,
        "staticServer": l.s,
        "apiServer": l.as,
        "staticServers": l.ss,
        "apiServers": l.ass,
        "buildVersion": l.v,
        "protocol": "https",
        "productNumber": pn,
        "merged": true,
        "auto": true,
        "timeout": 6000,
        "pn": pn,
        "onerror": function () {
            console.log('call onerror')
        },
        "onload": function () {
            console.log('call onload')
        },
    }

    window['initWatchman']["__instances__"][pn] = M(new window.window['Watchman'](u));
    for (var infoIndex = 0; infoIndex < trace_info.length; infoIndex++) {
        let dtaEvent = trace_info[infoIndex]
        window.dispatchEvent(dtaEvent);
        sleep.msleep(15);
    }
}

function get_ac_token(pn, bid){
    pn = pn || "YD20160637306799";
    bid = bid || "07e2387ab53a4d6f930b8d9a9be71bdf";
    window['initWatchman']["__instances__"][pn].getToken(bid, function(e){window['acToken'] = e;console.log(e);}, 750)
}

// initWatchMan({
//     's': 'acstatic-dun.126.net',
//     'v': '2.7.3_eb045ea7',
//     'luv': '2.7.1_7c08033d',
//     'as': 'ac.dun.163yun.com',
//     'ivp': 300000,
//     'conf': '9ca170a1abeedba16ba1f2ac96ed26f3eafdcfe265aff1bad3ae70e2f4ee83e27fe2e6ee82e226a8aba2cfb43ef1f2ad90f025b6eee183a128e2bca4c3b92ae2f4ee8ee867e2e6fbd1af2aafbba7c3b939f4f0e4c3e26faffef6d3b328e2bdab8aa132f1f000cda161a7b3eedbb43cf0fea586ec2afaed00d1af2aa6bba3c3b93af4f4ee87e863e2e6fdd1b328e2adab8ea132f2f0e4c3f26fabfef6d4b33cf0feab8be270e2e6aa82ef79a7f4ee86e579e2e6aa82ef79a7f4ee86f679e2e6aa82ef79a7f4ee93e880e2e6ffcda169afb2eedbb128e2bda7c3b93bf4f0e4c3ee80a7b3eedbb83cf0fea195e863e2e6fdd1b328e2b3bc86f02afaeb00cda167b8bba7c3b939f4f0e4c3f366e2e6eebac73af4effad1b539f5ed00d7b633fbfee4c3e870a1fef695f17fa7f4ee83ef2afafeeecda163b6b0eedbb23cf4f000d1af2aa8acba91a132fceafcd1b33cf4f0e4c3f780adfef6d3b33cf4f4ee86e47fe2e6aa82ef79a7f4ee82e780e2e6fbd1af2aa7acadc3b96ea3b4bd86af2ab8bdbcc3b93cbf',
//     'ass': ['ac.dun.163.com', 'ac.dun.163yun.com'],
//     'ss': ['acstatic-dun.126.net', 'acstatic.dun.163yun.com'],
//     'cvk': '2c492abe0532265928ae77e8513e6066'
// })