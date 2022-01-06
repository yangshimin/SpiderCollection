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
function get_ac_token(l, productNumber, bid) {
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
        "productNumber": productNumber || "YD20160637306799",
        "merged": true,
        "auto": true,
        "timeout": 6000,
        "pn": productNumber || "YD20160637306799"
    }

    var ee = M(new window.window['Watchman'](u));
    for (var infoIndex=0; infoIndex < trace_info.length; infoIndex++){
        let dtaEvent = trace_info[infoIndex]
        window.dispatchEvent(dtaEvent);
        sleep.msleep(15);
    }
    ee.getToken(bid || "07e2387ab53a4d6f930b8d9a9be71bdf", function (e) {
        window['acToken'] = e;
        console.log(e);
    }, 750)
}