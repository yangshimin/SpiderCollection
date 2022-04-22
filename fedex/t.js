var cookie_abck = 'E17D02DCE06BAD6FCBB777666AA425E4~-1~YAAQhfw7F4izcBKAAQAAWyBmUAeN49MOMSw/jkf406YrhM9qYu3ol3lBTcRdmQneYUHF/qWEBQs67JWJCxVeFnzHtFE/1CBGikBTmJKanD/Rw2KyIRA0eIz1qVCbqWK2ZsMvMenBqgYaOqnAinsaSwwxFdyIPI9cbIhoN7ZKvmthmAUg+OlSJjufnLpyaWV9/+JPa+rNPQOICtiVAak56sRUto+RnNzyTZdt9jp96IV//GFuzsyrN2rYerCrchJKEoeJ/fcY49KqRBnx+jmwjtWJyFv6p/oa6+gcSXvVG7VjaiTJdGMu85pTX41hp9fdlyVIDXJfeGYk0azEJHQ3hpE0i6y3FvFWPAtYYUmth7dKZVZFzqpRZtyMng==~-1~-1~-1'
var _cf = _cf || [];
var bmak = bmak && bmak["hasOwnProperty"]("ver") && bmak["hasOwnProperty"]("sed") ? bmak : {
    ver: 1.75,
    ke_cnt_lmt: 150,
    mme_cnt_lmt: 100,
    mduce_cnt_lmt: 75,
    pme_cnt_lmt: 25,
    pduce_cnt_lmt: 25,
    tme_cnt_lmt: 25,
    tduce_cnt_lmt: 25,
    doe_cnt_lmt: 10,
    dme_cnt_lmt: 10,
    vc_cnt_lmt: 100,
    doa_throttle: 0,
    dma_throttle: 0,
    session_id: "default_session",
    js_post: !1,
    loc: "",
    cf_url: "https://",
    params_url: "https://"  + 'www.fedex.com' + "/get_params",
    auth: "",
    api_public_key: "afSbep8yjnZUjq3aL010jO15Sawj2VZfdYK8uY90uxq",
    aj_lmt_doact: 1,
    aj_lmt_dmact: 1,
    aj_lmt_tact: 1,
    ce_js_post: 0,
    init_time: 0,
    informinfo: "",
    prevfid: -1,
    fidcnt: 0,
    sensor_data: 0,
    pua: "",
    ins: null,
    cns: null,
    enGetLoc: 0,
    enReadDocUrl: 1,
    disFpCalOnTimeout: 0,
    xagg: -1,
    pen: -1,
    brow: "",
    brv: 0,
    browver: "",
    psub: "-",
    lang: "-",
    prod: "-",
    plen: -1,
    doadma_en: 0,
    sdfn: [],
    d2: 0,
    d3: 0,
    thr: 0,
    cs: "0a46G5m17Vrp4o4c",
    hn: "unk",
    z1: 0,
    o9: 0,
    vc: "",
    y1: 2016,
    ta: 0,
    tst: -1,
    t_tst: 0,
    ckie: "_abck",
    n_ck: "0",
    ckurl: 0,
    bm: !1,
    mr: "-1",
    altFonts: !1,
    rst: !1,
    runFonts: !1,
    fsp: !1,
    firstLoad: !0,
    pstate: !1,
    mn_mc_lmt: 10,
    mn_state: 0,
    mn_mc_indx: 0,
    mn_sen: 0,
    mn_tout: 100,
    mn_stout: 1e3,
    mn_ct: 1,
    mn_cc: "",
    mn_cd: 1e4,
    mn_lc: [],
    mn_ld: [],
    mn_lcl: 0,
    mn_al: [],
    mn_il: [],
    mn_tcl: [],
    mn_r: [],
    mn_rt: 0,
    mn_wt: 0,
    mn_abck: "",
    mn_psn: "",
    mn_ts: "",
    mn_lg: [],
    ipr: !1,
    loap: 1,
    dcs: 0,
    cc: function (t) {
        var a = t % 4;
        2 == a && (a = 3);

        var e = 42 + a,
            n = function (t, a) {
                return 0;
            };

        if (42 == e) var n = function (t, a) {
            return t * a;
        };
        else if (43 == e) var n = function (t, a) {
            return t + a;
        };
        else var n = function (t, a) {
                return t - a;
            };
        return n;
    },
    get_cf_date: function () {
        return Date["now"] ? Date["now"]() : +new Date();
    },
    sd_debug: function (t) {
        if (!bmak["js_post"]) {
            var a = t;
            "string" == typeof _sd_trace ? _sd_trace += a : _sd_trace = a;
        }
    },
    getStateField: function (t) {
        for (var a = "",
                 e = "aeiouy13579",
                 n = 0,
                 o = t["toLowerCase"](); n < o["length"];) {
            e["indexOf"](o["charAt"](n)) >= 0 || e["indexOf"](o["charAt"](n + 1)) >= 0 ? a += 1 : a += 0, n += 2;
        }

        return a;
    },
    listFunctions: {
        _setJsPost: function (t) {
            bmak["js_post"] = t, bmak["js_post"] && (bmak["enReadDocUrl"] = 1);
        },
        _setSessionId: function (t) {
            bmak["session_id"] = t;
        },
        _setJavaScriptKey: function (t) {
            bmak["api_public_key"] = t;
        },
        _setEnAddHidden: function (t) {
            bmak["enAddHidden"] = t;
        },
        _setInitTime: function (t) {
            bmak["init_time"] = t;
        },
        _setApiUrl: function (t) {
            bmak["cf_url"] = t;
        },
        _setEnGetLoc: function (t) {
            bmak["enGetLoc"] = t;
        },
        _setEnReadDocUrl: function (t) {
            bmak["enReadDocUrl"] = t;
        },
        _setDisFpCalOnTimeout: function (t) {
            bmak["disFpCalOnTimeout"] = t;
        },
        _setCookie: function (t) {
            bmak["ckie"] = t;
        },
        _setCS: function (t) {
            bmak["cs"] = (String(t) + bmak["cs"])["slice"](0, 16);
        },
        _setFsp: function (t) {
            bmak["fsp"] = t, bmak["fsp"] && (bmak["cf_url"] = bmak["cf_url"]["replace"](/^http:\/\//i, "https://"));
        },
        _setBm: function (t) {
            bmak["bm"] = t, bmak["bm"] ? (bmak["cf_url"] = (bmak["fsp"] ? "https:" : 'https:') + "//" + 'www.fedex.com' + "/_bm/_data", bmak["js_post"] = !0) : bmak["params_url"] = (bmak["fsp"] ? "https:" : document["location"]["protocol"]) + "//" + document["location"]["hostname"] + "/get_params";
        },
        _setAu: function (t) {
            "string" == typeof t && (0 === t["lastIndexOf"]("/", 0) ? bmak["cf_url"] = (bmak["fsp"] ? "https:" : 'https:') + "//" + 'www.fedex.com' + t : bmak["cf_url"] = t);
        },
        _setSDFieldNames: function () {
            try {
                var t;

                for (t = 0; t < arguments["length"]; t += 1) bmak["sdfn"]["push"](arguments[t]);
            } catch (t) {
                bmak["sd_debug"](",setSDFN:" + t);
            }
        },
        _setUseAltFonts: function (t) {
            bmak["altFonts"] = t;
        },
        _setPowState: function (t) {
            bmak["pstate"] = t;
        },
        _setPow: function (t) {
            bmak["pstate"] = t;
        },
        _setLOAP: function (t) {
            bmak["loap"] = t;
        },
        _setIpr: function (t) {
            bmak["ipr"] = t;
        }
    },
    ir: function () {
        bmak["start_ts"] = Date["now"] ? Date["now"]() : +new Date(), bmak["kact"] = "", bmak["ke_cnt"] = 0, bmak["ke_vel"] = 0, bmak["mact"] = "", bmak["mme_cnt"] = 0, bmak["mduce_cnt"] = 0, bmak["me_vel"] = 0, bmak["pact"] = "", bmak["pme_cnt"] = 0, bmak["pduce_cnt"] = 0, bmak["pe_vel"] = 0, bmak["tact"] = "", bmak["tme_cnt"] = 0, bmak["tduce_cnt"] = 0, bmak["te_vel"] = 0, bmak["doact"] = "", bmak["doe_cnt"] = 0, bmak["doe_vel"] = 0, bmak["dmact"] = "", bmak["dme_cnt"] = 0, bmak["dme_vel"] = 0, bmak["vcact"] = "", bmak["vc_cnt"] = 0, bmak["aj_indx"] = 0, bmak["aj_ss"] = 0, bmak["aj_type"] = -1, bmak["aj_indx_doact"] = 0, bmak["aj_indx_dmact"] = 0, bmak["aj_indx_tact"] = 0, bmak["me_cnt"] = 0, bmak["pe_cnt"] = 0, bmak["te_cnt"] = 0, bmak["nav_perm"] = "", bmak["brv"] = 0, bmak["hbCalc"] = !1, bmak["fmh"] = "", bmak["fmz"] = "", bmak["ssh"] = "", bmak["wv"] = "", bmak["wr"] = "", bmak["weh"] = "", bmak["wl"] = 0, bmak["pdet"] = !0;
    },
    startdoadma: function () {
        0 == bmak["doadma_en"] && (
            bmak["doadma_en"] = 1),
            bmak["doa_throttle"] = 0,
            bmak["dma_throttle"] = 0;
    },
    cdoa: function (t) {
        // deviceorientation 事件的回调函数
        try {
            if (bmak["doe_cnt"] < bmak["doe_cnt_lmt"] && bmak["doa_throttle"] < 2 && t) {
                var a = bmak["get_cf_date"]() - bmak["start_ts"],
                    e = bmak["getFloatVal"](t["alpha"]),
                    n = bmak["getFloatVal"](t["beta"]),
                    o = bmak["getFloatVal"](t["gamma"]),
                    m = bmak["doe_cnt"] + "," + a + "," + e + "," + n + "," + o;
                void 0 !== t["isTrusted"] && !1 === t["isTrusted"] && (m += ",0"), bmak["doact"] = bmak["doact"] + m + ";", bmak["ta"] += a, bmak["doe_vel"] = bmak["doe_vel"] + bmak["doe_cnt"] + a, bmak["doe_cnt"]++;
            }

            bmak["js_post"] && bmak["doe_cnt"] > 1 && bmak["aj_indx_doact"] < bmak["aj_lmt_doact"] && (bmak["aj_type"] = 6, bmak["bpd"](), bmak["pd"](!0), bmak["ce_js_post"] = 1, bmak["aj_indx_doact"]++), bmak["doa_throttle"]++;
        } catch (t) {}
    },
    cdma: function (t) {
        // devicemotion事件的回调函数
        try {
            if (bmak["dme_cnt"] < bmak["dme_cnt_lmt"] && bmak["dma_throttle"] < 2 && t) {
                var a = bmak["get_cf_date"]() - bmak["start_ts"],
                    e = -1,
                    n = -1,
                    o = -1;
                t["acceleration"] && (e = bmak["getFloatVal"](t["acceleration"]["x"]), n = bmak["getFloatVal"](t["acceleration"]["y"]), o = bmak["getFloatVal"](t["acceleration"]["z"]));
                var m = -1,
                    r = -1,
                    i = -1;
                t["accelerationIncludingGravity"] && (m = bmak["getFloatVal"](t["accelerationIncludingGravity"]["x"]), r = bmak["getFloatVal"](t["accelerationIncludingGravity"]["y"]), i = bmak["getFloatVal"](t["accelerationIncludingGravity"]["z"]));
                var c = -1,
                    b = -1,
                    d = 1;
                t["rotationRate"] && (c = bmak["getFloatVal"](t["rotationRate"]["alpha"]), b = bmak["getFloatVal"](t["rotationRate"]["beta"]), d = bmak["getFloatVal"](t["rotationRate"]["gamma"]));
                var s = bmak["dme_cnt"] + "," + a + "," + e + "," + n + "," + o + "," + m + "," + r + "," + i + "," + c + "," + b + "," + d;
                void 0 !== t["isTrusted"] && !1 === t["isTrusted"] && (s += ",0"), bmak["dmact"] = bmak["dmact"] + s + ";", bmak["ta"] += a, bmak["dme_vel"] = bmak["dme_vel"] + bmak["dme_cnt"] + a, bmak["dme_cnt"]++;
            }

            bmak["js_post"] && bmak["dme_cnt"] > 1 && bmak["aj_indx_dmact"] < bmak["aj_lmt_dmact"] && (bmak["aj_type"] = 7, bmak["bpd"](), bmak["pd"](!0), bmak["ce_js_post"] = 1, bmak["aj_indx_dmact"]++), bmak["dma_throttle"]++;
        } catch (t) {}
    },
    to: function () {
        var t = bmak["x2"]() % 1e7;
        bmak["d3"] = t;

        for (var a = t, e = parseInt(String["fromCharCode"](51)), n = 0; n < 5; n++) {
            var o = parseInt(t / Math["pow"](10, n)) % 10,
                m = o + 1;
            a = bmak["cc"](o)(a, m);
        }

        bmak["o9"] = a * e;
    },
    x2: function () {
        var n = bmak['get_cf_date'],
            o = 0;
        return "function" == typeof n && (o = n()), o;
    },

    htm: function (t) {
        // touchmove事件的回调函数
        bmak["cta"](t, 1);
    },
    hts: function (t) {
        // touchstart事件的回调函数
        bmak["cta"](t, 2);
    },
    hte: function (t) {
        // touchend事件的回调函数
        bmak["cta"](t, 3);
    },
    htc: function (t) {
        // touchcancel事件的回调函数
        bmak["cta"](t, 4);
    },
    hmm: function (t) {
        // mousemove事件的回调函数
        bmak["cma"](t, 1);
    },
    hc: function (t) {
        // click事件的回调函数
        bmak["cma"](t, 2);
    },
    hmd: function (t) {
        // mousedown事件的回调函数
        bmak["cma"](t, 3);
    },
    hmu: function (t) {
        // mouseup事件的回调函数
        bmak["cma"](t, 4);
    },
    hpd: function (t) {
        // pointerdown事件的回调函数
        bmak["cpa"](t, 3);
    },
    hpu: function (t) {
        // pointerup事件的回调函数
        bmak["cpa"](t, 4);
    },
    hkd: function (t) {
        // keydown事件的回调函数
        bmak["cka"](t, 1);
    },
    hku: function (t) {
        // keyup事件的回调函数
        bmak["cka"](t, 2);
    },
    hkp: function (t) {
        // keypress事件的回调函数
        bmak["cka"](t, 3);
    },
    cta: function (t, a) {
        // touch事件的回调函数调度(touchmove touchstart touchend touchcancel)
        try {
            if (1 == a && bmak["tme_cnt"] < bmak["tme_cnt_lmt"] || 1 != a && bmak["tduce_cnt"] < bmak["tduce_cnt_lmt"]) {
                var e = t || window["event"],
                    n = -1,
                    o = -1;
                e && e["pageX"] && e["pageY"] ? (n = Math["floor"](e["pageX"]), o = Math["floor"](e["pageY"])) : e && e["clientX"] && e["clientY"] && (n = Math["floor"](e["clientX"]), o = Math["floor"](e["clientY"]));
                var m = bmak["get_cf_date"]() - bmak["start_ts"],
                    r = bmak["te_cnt"] + "," + a + "," + m + "," + n + "," + o;
                void 0 !== e["isTrusted"] && !1 === e["isTrusted"] && (r += ",0"), bmak["tact"] = bmak["tact"] + r + ";", bmak["ta"] += m, bmak["te_vel"] = bmak["te_vel"] + bmak["te_cnt"] + a + m + n + o, bmak["doa_throttle"] = 0, bmak["dma_throttle"] = 0;
            }

            1 == a ? bmak["tme_cnt"]++ : bmak["tduce_cnt"]++, bmak["te_cnt"]++, bmak["js_post"] && 2 == a && bmak["aj_indx_tact"] < bmak["aj_lmt_tact"] && (bmak["aj_type"] = 5, bmak["bpd"](), bmak["pd"](!0), bmak["ce_js_post"] = 1, bmak["aj_indx_tact"]++);
        } catch (t) {}
    },
    cma: function (t, a) {
        // mouse事件的回调函数(mousemove click mousedown mouseup)
        try {
            if (1 == a && bmak["mme_cnt"] < bmak["mme_cnt_lmt"] || 1 != a && bmak["mduce_cnt"] < bmak["mduce_cnt_lmt"]) {
                var e = t || window["event"],
                    n = -1,
                    o = -1;
                e && e["pageX"] && e["pageY"] ? (n = Math["floor"](e["pageX"]), o = Math["floor"](e["pageY"])) : e && e["clientX"] && e["clientY"] && (n = Math["floor"](e["clientX"]), o = Math["floor"](e["clientY"]));
                var m = e["toElement"];
                null == m && (m = e["target"]);
                var r = bmak["gf"](m),
                    i = bmak["get_cf_date"]() - bmak["start_ts"],
                    c = bmak["me_cnt"] + "," + a + "," + i + "," + n + "," + o;

                if (1 != a) {
                    c = c + "," + r;
                    var b = void 0 !== e["which"] ? e["which"] : e["button"];
                    null != b && 1 != b && (c = c + "," + b);
                }

                void 0 !== e["isTrusted"] && !1 === e["isTrusted"] && (c += ",it0"), c += ";", bmak["me_vel"] = bmak["me_vel"] + bmak["me_cnt"] + a + i + n + o, bmak["mact"] = bmak["mact"] + c, bmak["ta"] += i;
            }

            1 == a ? bmak["mme_cnt"]++ : bmak["mduce_cnt"]++, bmak["me_cnt"]++, bmak["js_post"] && 3 == a && (bmak["aj_type"] = 1, bmak["bpd"](), bmak["pd"](!0), bmak["ce_js_post"] = 1);
        } catch (t) {}
    },
    cpa: function (t, a) {
        // pointer事件的回调函数调度(pointerdown pointerup)
        try {
            var e = !1;

            if (1 == a && bmak["pme_cnt"] < bmak["pme_cnt_lmt"] || 1 != a && bmak["pduce_cnt"] < bmak["pduce_cnt_lmt"]) {
                var n = t || window["event"];

                if (n && "mouse" != n["pointerType"]) {
                    e = !0;
                    var o = -1,
                        m = -1;
                    n && n["pageX"] && n["pageY"] ? (o = Math["floor"](n["pageX"]), m = Math["floor"](n["pageY"])) : n && n["clientX"] && n["clientY"] && (o = Math["floor"](n["clientX"]), m = Math["floor"](n["clientY"]));
                    var r = bmak["get_cf_date"]() - bmak["start_ts"],
                        i = bmak["pe_cnt"] + "," + a + "," + r + "," + o + "," + m;
                    void 0 !== n["isTrusted"] && !1 === n["isTrusted"] && (i += ",0"), bmak["pe_vel"] = bmak["pe_vel"] + bmak["pe_cnt"] + a + r + o + m, bmak["pact"] = bmak["pact"] + i + ";", bmak["ta"] += r, 1 == a ? bmak["pme_cnt"]++ : bmak["pduce_cnt"]++;
                }
            }

            1 == a ? bmak["pme_cnt"]++ : bmak["pduce_cnt"]++, bmak["pe_cnt"]++, bmak["js_post"] && 3 == a && e && (bmak["aj_type"] = 2, bmak["bpd"](), bmak["pd"](!0), bmak["ce_js_post"] = 1);
        } catch (t) {}
    },
    cka: function (t, a) {
        // keyup和keypress事件的回调函数调度
        try {
            var e = t || window["event"],
                n = -1,
                o = 1;

            if (bmak["ke_cnt"] < bmak["ke_cnt_lmt"] && e) {
                n = e["keyCode"];
                var m = e["charCode"],
                    r = e["shiftKey"] ? 1 : 0,
                    i = e["ctrlKey"] ? 1 : 0,
                    c = e["metaKey"] ? 1 : 0,
                    b = e["altKey"] ? 1 : 0,
                    d = 8 * r + 4 * i + 2 * c + b,
                    s = bmak["get_cf_date"]() - bmak["start_ts"],
                    k = bmak["gf"](null),
                    l = 0;
                m && n && (n = 0 != m && 0 != n && m != n ? -1 : 0 != n ? n : m), 0 == i && 0 == c && 0 == b && n >= 32 && (n = 3 == a && n >= 32 && n <= 126 ? -2 : n >= 33 && n <= 47 ? -3 : n >= 112 && n <= 123 ? -4 : -2), k != bmak["prevfid"] ? (bmak["fidcnt"] = 0, bmak["prevfid"] = k) : bmak["fidcnt"] = bmak["fidcnt"] + 1;

                if (0 == bmak["isIgn"](n)) {
                    var u = bmak["ke_cnt"] + "," + a + "," + s + "," + n + "," + l + "," + d + "," + k;
                    void 0 !== e["isTrusted"] && !1 === e["isTrusted"] && (u += ",0"), u += ";", bmak["kact"] = bmak["kact"] + u, bmak["ke_vel"] = bmak["ke_vel"] + bmak["ke_cnt"] + a + s + n + d + k, bmak["ta"] += s;
                } else o = 0;
            }

            o && e && bmak["ke_cnt"]++, !bmak["js_post"] || 1 != a || 13 != n && 9 != n || (bmak["aj_type"] = 3, bmak["bpd"](), bmak["pd"](!0), bmak["ce_js_post"] = 1);
        } catch (t) {}
    },
    rve: function () {
        bmak["hn"] = "hidden",
            bmak["vc"] = "visibilitychange"
            // window["onblur"] = bmak["hb"],
            // window["onfocus"] = bmak["hf"];
    },
    hb: function (t) {
        // 失去焦点的时事件回调函数
        bmak["lvc"](2);
    },
    hf: function (t) {
        // 获得焦点的事件回调函数
        bmak["lvc"](3);
    },
    hvc: function () {
        // 一个未知事件的注册函数
        debugger;
        try {
            var t = 1;
            document[bmak["hn"]] && (t = 0), bmak["lvc"](t);
        } catch (t) {}
    },
    getforminfo: function () {
        var a = '0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;1;';
        var t = '0,-1,0,1,2588,1468,0;0,-1,0,1,1386,447,0;1,0,0,1,1649,331,0;0,-1,0,0,1498,-1,0;0,-1,0,1,-1,1500,0;0,-1,0,1,-1,1684,0;0,-1,0,1,-1,1684,0;0,-1,0,1,-1,1684,0;0,-1,0,1,2563,-1,0;';
        return null == bmak["ins"] && (bmak["ins"] = a), bmak["cns"] = a, t;
    },
    patp: function (t) {
        bmak["aj_ss"]++, bmak["rst"] = !1;
    },
    apicall_bm: function (t, a, e) {
        bmak["dcs"] = 0;
    },
    pd: function (t) {
        bmak["check_stop_protocol"]() || bmak["check_ipr_signals"]() ? (
            bmak["apicall_bm"](bmak["cf_url"], t, bmak["patp"]),
                bmak["aj_indx"] = bmak["aj_indx"] + 1) : bmak["loap"] && bmak["dcs"] && bmak["apicall_bm"](bmak["cf_url"], t, bmak["patp"]);
    },
    check_stop_protocol: function () {
        var t = bmak["get_stop_signals"](),
            a = t[0];
        !bmak["rst"] && a > -1 && (bmak["ir"](), bmak["rst"] = !0);
        var e = t[1];
        return -1 == e || bmak["aj_ss"] < e;
    },
    check_ipr_signals: function () {
        var t = -1;
        if (bmak["ipr"]) try {
            t = Date["now"] ? Date["now"]() : +new Date(), t = bmak["pi"](t / 1e3) - bmak["get_heartbeat_timestamp"]();
        } catch (t) {}
        return t > 0;
    },
    get_heartbeat_timestamp: function () {
        var t = Number["MAX_VALUE"],
            a = bmak["cookie_chk_read"](bmak["ckie"]);
        if (!1 !== a) try {
            var e = decodeURIComponent(a)["split"]("~");

            if (e["length"] > 5) {
                var n = bmak["pi"](e[5]);
                n = isNaN(n) || -1 == n ? Number["MAX_VALUE"] : n, t = n;
            }
        } catch (t) {}
        return t;
    },
    get_stop_signals: function () {
        var t = [-1, -1],
            a = cookie_abck;
        if (!1 !== a) try {
            var e = decodeURIComponent(a)["split"]("~");

            if (e["length"] >= 4) {
                var n = parseInt(e[1]),
                    o = parseInt(e[3]);
                n = isNaN(n) ? -1 : n, o = isNaN(o) ? -1 : o, t = [o, n];
            }
        } catch (t) {}
        return t;
    },
    updatet: function () {
        return bmak["get_cf_date"]() - bmak["start_ts"];
    },
    ab: function (t) {
        if (null == t) return -1;

        try {
            for (var a = 0, e = 0; e < t["length"]; e++) {
                var n = t["charCodeAt"](e);
                n < 128 && (a += n);
            }

            return a;
        } catch (t) {
            return -2;
        }
    },
    get_browser: function () {
        bmak["psub"] = '20030107';
        bmak["lang"] = 'zh-CN';
        bmak["prod"] = 'Gecko';
        bmak["plen"] = 5;
    },
    bc: function () {
        var t = 1,
            a = 1,
            e = 0,
            n = 0,
            o = 1,
            m = 1,
            r = 1,
            i = 0,
            c = 1,
            b = 1,
            d = 0,
            s = 1;
        var k = 1;
        var l = 1
        bmak["xagg"] = t + (a << 1) + (e << 2) + (n << 3) + (o << 4) + (m << 5) + (r << 6) + (i << 7) + (k << 8) + (l << 9) + (c << 10) + (b << 11) + (d << 12) + (s << 13);
    },
    bmisc: function () {
        bmak["pen"] = 0,
            bmak["wen"] = 0,
            bmak["den"] = 0;
    },
    bd: function () {
        var t = [],
            a = 0;
        t["push"](",cpen:" + a);
        var e = 0;
        t["push"]("i1:" + e);
        var n = 0;
        t["push"]("dm:" + n);
        var o = 0;
        t["push"]("cwen:" + o);
        var m = 1;
        t["push"]("non:" + m);
        var r = 0;
        t["push"]("opc:" + r);
        var i = 0;
        t["push"]("fc:" + i);
        var c = 0;
        t["push"]("sc:" + c);
        var b = 1;
        t["push"]("wrc:" + b);
        var d = 0;
        t["push"]("isc:" + d), bmak["d2"] = parseInt(bmak["z1"] / 23);
        var s = 1;
        t["push"]("vib:" + s);
        var k = 1;
        t["push"]("bat:" + k);
        var l = 0;
        t["push"]("x11:" + l);
        var u = 1;
        return t["push"]("x12:" + u), t["join"](",");
    },
    gd: function () {
        var t = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36",
            a = "" + bmak["ab"](t),
            e = bmak["start_ts"] / 2,
            n = -1,
            o = -1,
            m = -1,
            r = -1,
            i = -1,
            c = -1,
            b = -1;
            n = 1920;
            o = 1040;
            m = 1920;
            r = 1080;
            i = 881;
            c = 829;
            b = 1920;

        bmak["z1"] = parseInt(bmak["start_ts"] / (bmak["y1"] * bmak["y1"]));
        var d = Math["random"](),
            s = parseInt(1e3 * d / 2),
            k = d + "";
        return k = k["slice"](0, 11) + s,
            bmak["get_browser"](),
            bmak["bc"](),
            bmak["bmisc"](),
        t + ",uaend," + bmak["xagg"] + "," + bmak["psub"] + "," + bmak["lang"] + "," + bmak["prod"] + "," + bmak["plen"] + "," + bmak["pen"] + "," + bmak["wen"] + "," + bmak["den"] + "," + bmak["z1"] + "," + bmak["d3"] + "," + n + "," + o + "," + m + "," + r + "," + c + "," + i + "," + b + "," + bmak["bd"]() + "," + a + "," + k + "," + e + "," + bmak["brv"] + ",loc:" + bmak["loc"];
    },
    get_cookie: function () {
        var t = "0";

        try {
            var t =cookie_abck; // 或者当前_abck的值
            t || (bmak["n_ck"] = 1, t = bmak["bm"] ? "2" : "1");
        } catch (t) {}

        return t;
    },
    np: function () {
        bmak["nav_perm"] = 8;
        Promise.resolve().then(() => [1, 1, 3, 2, 1, 1, 4, 4, 2, 4, 1, 3, 2, 2, 2, 4, 3, 1, 2, 2]).then(res =>bmak['nav_perm']=res.join(","), console.log("执行了np函数", bmak['nav_perm']))
    },
    cal_dis: function (t) {
        var a = t[0] - t[1],
            e = t[2] - t[3],
            n = t[4] - t[5],
            o = Math["sqrt"](a * a + e * e + n * n);
        return Math["floor"](o);
    },
    jrs: function (t) {
        for (var a = Math["floor"](1e5 * Math["random"]() + 1e4), e = String(t * a), n = 0, o = [], m = e["length"] >= 18; o["length"] < 6;) o["push"](parseInt(e["slice"](n, n + 2))), n = m ? n + 3 : n + 2;

        return [a, bmak["cal_dis"](o)];
    },
    fas: function () {
        return 30261693;
    },
    hbs: function () {
        return 0;
    },
    gwd: function () {
        return -1;
    },
    sed: function () {
        var t;
        t = "0";
        var a;
        a = "0";
        var e;
        e = "0";
        var n;
        n = "0";
        var o;
        o = "1";
        var m;
        m = "0";
        var r;
        return r = "0", [t, a, e, n, o, m, r]["join"](",");
    },
    get_mn_params_from_abck: function () {
        var t = [
            []
        ];

        try {
            var a = cookie_abck;

            if (!1 !== a) {
                var e = decodeURIComponent(a)["split"]("~");

                if (e["length"] >= 5) {
                    var n = e[0],
                        o = e[4],
                        m = o["split"]("||");
                    if (m["length"] > 0)
                        for (var r = 0; r < m["length"]; r++) {
                            var i = m[r],
                                c = i["split"]("-");

                            if (1 == c["length"] && "0" == c[0] && (bmak["pdet"] = !1), c["length"] >= 5) {
                                var b = parseInt(c[0]),
                                    d = c[1],
                                    s = parseInt(c[2]),
                                    k = parseInt(c[3]),
                                    l = parseInt(c[4]),
                                    u = 1;
                                c["length"] >= 6 && (u = parseInt(c[5]));
                                var _ = [b, n, d, s, k, l, u];
                                2 == u ? t["splice"](0, 0, _) : t["push"](_);
                            }
                        }
                }
            }
        } catch (t) {}

        return t;
    },
    mn_get_current_challenges: function () {
        var t = bmak["get_mn_params_from_abck"](),
            a = [];
        if (null != t)
            for (var e = 0; e < t["length"]; e++) {
                var n = t[e];

                if (n["length"] > 0) {
                    var o = n[1] + n[2],
                        m = n[6];
                    a[m] = o;
                }
            }
        return a;
    },
    build_pua: function () {
        Promise.resolve().then(() => [
            "Mozilla/5.0 (",
            "Windows;10.0.0;x86;64;)",
            " AppleWebKit/537.36 (KHTML, like Gecko) Chrome/",
            "100.0.4896.88",
            " Safari/537.36"
        ]).then(res =>bmak['pua']=res.join(","), console.log("执行了build_pua函数", bmak['pua']))
    },
    od: function (t, a) {
        try {
            t = String(t), a = String(a);
            var e = [],
                n = a["length"];

            if (n > 0) {
                for (var o = 0; o < t["length"]; o++) {
                    var m = t["charCodeAt"](o),
                        r = t["charAt"](o),
                        i = a["charCodeAt"](o % n);
                    m = bmak["rir"](m, 47, 57, i), m != t["charCodeAt"](o) && (r = String["fromCharCode"](m)), e["push"](r);
                }

                if (e["length"] > 0) return e["join"]("");
            }
        } catch (t) {}

        return t;
    },
    bpd: function () {
        console.log("开始生成sensor_data")
        bmak["sd_debug"]("<bpd>");
        var t = 0;

        try {
            t = bmak["get_cf_date"]();
            var a = bmak["updatet"](),
                e = "3";
            bmak["ckie"] && (e = bmak["get_cookie"]());
            var n = bmak["gd"](),
                o = 'do_en',
                m = 'dm_en',
                r = "t_en",
                i = o + "," + m + "," + r,
                c = bmak["getforminfo"](),
                b = 'https://www.fedex.com/en-cn/home.html',
                d = bmak["aj_type"] + "," + bmak["aj_indx"];
            !bmak["fpcf"]["fpValCalculated"] && (0 == bmak["js_post"] || bmak["aj_indx"] > 0) && bmak["fpcf"]["fpVal"]();

            var s = bmak["ke_vel"] + bmak["me_vel"] + bmak["doe_vel"] + bmak["dme_vel"] + bmak["te_vel"] + bmak["pe_vel"],
                k = String["fromCharCode"],
                l = k(80) + k(105) + k(90) + k(116) + k(69),
                u = bmak["jrs"](bmak["start_ts"]),
                _ = bmak["get_cf_date"]() - bmak["start_ts"],
                f = parseInt(bmak["d2"] / 6),
                p = bmak["fas"](),
                h = bmak["hbs"](),
                v = bmak["gwd"](),
                g = [bmak["ke_vel"] + 1, bmak["me_vel"] + 32, bmak["te_vel"] + 32, bmak["doe_vel"], bmak["dme_vel"], bmak["pe_vel"], s, a, bmak["init_time"], bmak["start_ts"], bmak["fpcf"]["td"], bmak["d2"], bmak["ke_cnt"], bmak["me_cnt"], f, bmak["pe_cnt"], bmak["te_cnt"], _, bmak["ta"], bmak["n_ck"], e, bmak["ab"](e), bmak["fpcf"]["rVal"], bmak["fpcf"]["rCFP"], p, l, u[0], u[1], h, v],
                w = g["join"](","),
                y = "" + bmak["ab"](bmak["fpcf"]["fpValstr"]);

            bmak["firstLoad"] ? bmak["np"]() : bmak[_acxj[0]](), !bmak["hbCalc"] && (0 == bmak["js_post"] || bmak["aj_indx"] > 0) && (setTimeout(bmak["fm"], 4e3), setTimeout(bmak["wgl"], 4e3), bmak["hbCalc"] = !0);
            var E = "";
            bmak["hbCalc"] && (E = bmak["fmh"] + "," + bmak["fmz"] + "," + bmak["ssh"] + "," + bmak["wv"] + "," + bmak["wr"] + "," + bmak["weh"] + "," + bmak["wl"]);
            var S = bmak["sed"](),
                C = bmak["mn_get_current_challenges"](),
                A = "",
                B = "",
                x = "";

            if (void 0 !== C[1]) {
                var M = C[1];
                void 0 !== bmak["mn_r"][M] && (A = bmak["mn_r"][M]);
            }

            if (void 0 !== C[2]) {
                var j = C[2];
                void 0 !== bmak["mn_r"][j] && (B = bmak["mn_r"][j]);
            }

            if (void 0 !== C[3]) {
                var L = C[3];
                void 0 !== bmak["mn_r"][L] && (x = bmak["mn_r"][L]);
            }

            bmak["build_pua"](),
                bmak["sensor_data"] = bmak["ver"] + "-1,2,-94,-100," + n + "-1,2,-94,-131," + bmak["pua"] + "-1,2,-94,-101," + i + "-1,2,-94,-105," + bmak["informinfo"] + "-1,2,-94,-102," + c + "-1,2,-94,-108," + bmak["kact"] + "-1,2,-94,-110," + bmak["mact"] + "-1,2,-94,-117," + bmak["tact"] + "-1,2,-94,-111," + bmak["doact"] + "-1,2,-94,-109," + bmak["dmact"] + "-1,2,-94,-114," + bmak["pact"] + "-1,2,-94,-103," + bmak["vcact"] + "-1,2,-94,-112," + b + "-1,2,-94,-115," + w + "-1,2,-94,-106," + d, bmak["sensor_data"] = bmak["sensor_data"] + "-1,2,-94,-119," + bmak["mr"] + "-1,2,-94,-122," + S + "-1,2,-94,-123," + A + "-1,2,-94,-124," + B + "-1,2,-94,-126," + x + "-1,2,-94,-127," + bmak["nav_perm"];
            var P = 24 ^ bmak["ab"](bmak["sensor_data"]);
            bmak["sensor_data"] = bmak["sensor_data"] + "-1,2,-94,-70," + bmak["fpcf"]["fpValstr"] + "-1,2,-94,-80," + y + "-1,2,-94,-116," + bmak["o9"] + "-1,2,-94,-118," + P + "-1,2,-94,-129," + E + "-1,2,-94,-121,", bmak["sd_debug"](",s1:" + bmak["sensor_data"]["slice"](0, 10));
        } catch (t) {
            var T = "";

            try {
                debugger;
                t["stack"] && "string" == typeof t["stack"] ? T = t["stack"]["replace"](/\"/g, "\\'") : "string" == typeof t && (T = t["replace"](/\"/g, "\\'")), T = T["slice"](0, 1e3), bmak["sd_debug"](",s2:" + T), bmak["sensor_data"] = bmak["ver"] + "-1,2,-94,-100," + bmak["uar"]() + "-1,2,-94,-120," + T;
            } catch (t) {
                t["stack"] && "string" == typeof t["stack"] ? T = t["stack"]["replace"](/\"/g, "\\'") : "string" == typeof t && (T = t["replace"](/\"/g, "\\'")), T = T["slice"](0, 1e3), bmak["sd_debug"](",s3:" + T), bmak["sensor_data"] = bmak["ver"] + bmak["sensor_data"] + ",s3:" + T;
            }
        }

        try {
            var F = bmak["od"](bmak["cs"], bmak["api_public_key"])["slice"](0, 16),
                D = Math["floor"](bmak["get_cf_date"]() / 36e5),
                N = bmak["get_cf_date"](),
                R = F + bmak["od"](D, F) + bmak["sensor_data"];
            debugger;
            bmak["sensor_data"] = R + ";" + (bmak["get_cf_date"]() - t) + ";" + bmak["tst"] + ";" + (bmak["get_cf_date"]() - N);
        } catch (t) {}

        console.log("sensor_data is: ", bmak["sensor_data"])
        bmak["sd_debug"]("</bpd>");
    },

};

var init_func = !function (t){
    var a = {};
    t["fpcf"] = a,
        a["sf4"] = function () {
            return false;
        },
        a["fpValstr"] = "-1",
        a["fpValCalculated"] = !1,
        a["rVal"] = "-1",
        a["rCFP"] = "-1",
        a["cache"] = {},
        a["td"] = -999999,
        a["clearCache"] = function () {
            a["cache"] = {};
        },
        a["fpVal"] = function () {
            debugger
            a["fpValCalculated"] = !0;

            try {
                var t = 0;
                t = Date["now"] ? Date["now"]() : +new Date();
                var e = a["data"]();
                a["fpValstr"] = e["replace"](/\"/g, "\\\\\"");
                var n = 0;
                n = Date["now"] ? Date["now"]() : +new Date(), a["td"] = n - t;
            } catch (t) {}
        },
        a["timezoneOffsetKey"] = function () {
            return new Date()["getTimezoneOffset"]();
        },
        a["data"] = function () {
            var t = 24,  //  screen["colorDepth"]
                e = 24,  // screen["pixelDepth"]
                n = true,  // navigator["cookieEnabled"]
                o = false, // navigator["javaEnabled"]()
                m = -1,   // navigator["doNotTrack"] ? navigator["doNotTrack"] : -1
                r = "default";
            r = bmak["runFonts"] ? bmak["altFonts"] ? a["fonts_optm"]() : a["fonts"]() : "dis";
            return [
                a["canvas"]("<@nv45. F1n63r,Pr1n71n6!"),
                a["canvas"]("m,Ev!xV67BaU> eh2m<f3AG3@"),
                r,
                a["pluginInfo"](),
                a["sessionStorageKey"](),
                a["localStorageKey"](),
                a["indexedDbKey"](),
                a["timezoneOffsetKey"](),
                a["webrtcKey"](),
                t, e, n, o, m]["join"](";");
        },
        a["PLUGINS"] = ["WebEx64 General Plugin Container", "YouTube Plug-in", "Java Applet Plug-in", "Shockwave Flash",
            "iPhotoPhotocast", "SharePoint Browser Plug-in", "Chrome Remote Desktop Viewer", "Chrome PDF Viewer",
            "Native Client", "Unity Player", "WebKit-integrierte PDF", "QuickTime Plug-in", "RealPlayer Version Plugin",
            "RealPlayer(tm) G2 LiveConnect-Enabled Plug-In (32-bit)", "Mozilla Default Plug-in", "Adobe Acrobat",
            "AdobeAAMDetect", "Google Earth Plug-in", "Java Plug-in 2 for NPAPI Browsers",
            "Widevine Content Decryption Module", "Microsoft Office Live Plug-in",
            "Windows Media Player Plug-in Dynamic Link Library", "Google Talk Plugin Video Renderer", "Edge PDF Viewer",
            "Shockwave for Director", "Default Browser Helper", "Silverlight Plug-In"],
        a["pluginInfo"] = function () {
            if (void 0 === navigator["plugins"]) return null;

            for (var t = a["PLUGINS"]["length"], e = "", n = 0; n < t; n++) {
                var o = a["PLUGINS"][n];
                void 0 !== navigator["plugins"][o] && (e = e + "," + n);
            }

            return e;
        },
        a["canvas"] = function (t) {
            try {
                if (void 0 !== a["cache"]["canvas"]) return a["cache"]["canvas"];
                var e = -1;

                var n = document["createElement"]("canvas");

                if (n["width"] = 280, n["height"] = 60, n["style"]["display"] = "none", "function" == typeof n["getContext"]) {
                    var o = n["getContext"]("2d");
                    o["fillStyle"] = "rgb(102, 204, 0)",
                        o["fillRect"](100, 5, 80, 50),
                        o["fillStyle"] = "#f60",
                        o["font"] = "16pt Arial",
                        o["fillText"](t, 10, 40),
                        o["strokeStyle"] = "rgb(120, 186, 176)",
                        o["arc"](80, 10, 20, 0, Math["PI"], !1),
                        o["stroke"]();
                    var m = n["toDataURL"]();
                    e = 0;

                    for (var r = 0; r < m["length"]; r++) {
                        e = (e << 5) - e + m["charCodeAt"](r), e &= e;
                    }

                    e = e["toString"]();
                    var i = document["createElement"]("canvas");
                    i["width"] = 16, i["height"] = 16;
                    var c = i["getContext"]("2d");
                    c["font"] = "6pt Arial",
                        a["rVal"] = Math["floor"](1e3 * Math["random"]())["toString"](),
                        c["fillText"](a["rVal"], 1, 12);

                    for (var b = i["toDataURL"](), d = 0, s = 0; s < b["length"]; s++) {
                        d = (d << 5) - d + b["charCodeAt"](s), d &= d;
                    }

                    a["rCFP"] = d["toString"]();
                }

                return e;
            } catch (t) {
                return "exception";
            }
        },
        a["fonts_optm"] = function () {
            var t = 200,
                e = bmak["get_cf_date"](),
                n = [];

            var o = ["sans-serif", "monospace"],
                m = [0, 0],
                r = [0, 0],
                i = document["createElement"]("div");
            i["style"]["cssText"] = "position: relative; left: -9999px; visibility: hidden; display: block !important";
            var c;

            for (c = 0; c < o["length"]; c++) {
                var b = document["createElement"]("span");
                b["innerHTML"] = "abcdefhijklmnopqrstuvxyz1234567890;+-.",
                    b["style"]["fontSize"] = "90px",
                    b["style"]["fontFamily"] = o[c],
                    i["appendChild"](b);
            }

            for (document["body"]["appendChild"](i), c = 0; c < i["childNodes"]["length"]; c++){
                b = i["childNodes"][c],
                    m[c] = b["offsetWidth"],
                    r[c] = b["offsetHeight"]
            };

            if (document["body"]["removeChild"](i), bmak["get_cf_date"]() - e > t) return "";
            var d = ["Geneva", "Lobster", "New York", "Century", "Apple Gothic", "Minion Pro", "Apple LiGothic", "Century Gothic", "Monaco", "Lato", "Fantasque Sans Mono", "Adobe Braille", "Cambria", "Futura", "Bell MT", "Courier", "Courier New", "Calibri", "Avenir Next", "Birch Std", "Palatino", "Ubuntu Regular", "Oswald", "Batang", "Ubuntu Medium", "Cantarell", "Droid Serif", "Roboto", "Helvetica Neue", "Corsiva Hebrew", "Adobe Hebrew", "TI-Nspire", "Comic Neue", "Noto", "AlNile", "Palatino-Bold", "ArialHebrew-Light", "Avenir", "Papyrus", "Open Sans", "Times", "Quicksand", "Source Sans Pro", "Damascus", "Microsoft Sans Serif"],
                s = document["createElement"]("div");
            s["style"]["cssText"] = "position: relative; left: -9999px; visibility: hidden; display: block !important";

            for (var k = [], l = 0; l < d["length"]; l++) {
                var u = document["createElement"]("div");

                for (c = 0; c < o["length"]; c++) {
                    var b = document["createElement"]("span");
                    b["innerHTML"] = "abcdefhijklmnopqrstuvxyz1234567890;+-.",
                        b["style"]["fontSize"] = "90px",
                        b["style"]["fontFamily"] = d[l] + "," + o[c],
                        u["appendChild"](b);
                }

                s["appendChild"](u);
            }

            if (bmak["get_cf_date"]() - e > t) return "";
            document["body"]["appendChild"](s);

            for (var l = 0; l < s["childNodes"]["length"]; l++) {
                var _ = !1,
                    u = s["childNodes"][l];

                for (c = 0; c < u["childNodes"]["length"]; c++) {
                    var b = u["childNodes"][c];

                    if (b["offsetWidth"] !== m[c] || b["offsetHeight"] !== r[c]) {
                        _ = !0;
                        break;
                    }
                }

                if (_ && k["push"](l), bmak["get_cf_date"]() - e > t) break;
            }

            document["body"]["removeChild"](s), n = k["sort"]();

            return n["join"](",");
        },
        a["fonts"] = function () {
            var t = [];

            if (!a["sf4"]() && document["body"]) {
                var e = ["serif", "sans-serif", "monospace"],
                    n = [0, 0, 0],
                    o = [0, 0, 0],
                    m = document["createElement"]("span");
                m["innerHTML"] = "abcdefhijklmnopqrstuvxyz1234567890;+-.", m["style"]["fontSize"] = "90px";
                var r;

                for (r = 0; r < e["length"]; r++) m["style"]["fontFamily"] = e[r], document["body"]["appendChild"](m), n[r] = m["offsetWidth"], o[r] = m["offsetHeight"], document["body"]["removeChild"](m);

                for (var i = ["Geneva", "Lobster", "New York", "Century", "Apple Gothic", "Minion Pro", "Apple LiGothic", "Century Gothic", "Monaco", "Lato", "Fantasque Sans Mono", "Adobe Braille", "Cambria", "Futura", "Bell MT", "Courier", "Courier New", "Calibri", "Avenir Next", "Birch Std", "Palatino", "Ubuntu Regular", "Oswald", "Batang", "Ubuntu Medium", "Cantarell", "Droid Serif", "Roboto", "Helvetica Neue", "Corsiva Hebrew", "Adobe Hebrew", "TI-Nspire", "Comic Neue", "Noto", "AlNile", "Palatino-Bold", "ArialHebrew-Light", "Avenir", "Papyrus", "Open Sans", "Times", "Quicksand", "Source Sans Pro", "Damascus", "Microsoft Sans Serif"], c = [], b = 0; b < i["length"]; b++) {
                    var d = !1;

                    for (r = 0; r < e["length"]; r++)
                        if (m["style"]["fontFamily"] = i[b] + "," + e[r], document["body"]["appendChild"](m), m["offsetWidth"] === n[r] && m["offsetHeight"] === o[r] || (d = !0), document["body"]["removeChild"](m), d) {
                            c["push"](b);
                            break;
                        }
                }

                t = c["sort"]();
            }

            return t["join"](",");
        },
        a["webrtcKey"] = function () {
            return true;
        },
        a["indexedDbKey"] = function () {
            return !!a["hasIndexedDB"]();
        },
        a["sessionStorageKey"] = function () {
            return !!a["hasSessionStorage"]();
        },
        a["localStorageKey"] = function () {
            return !!a["hasLocalStorage"]();
        },
        a["hasSessionStorage"] = function () {
            return true;
        },
        a["hasLocalStorage"] = function () {
            return true;
        },
        a["hasIndexedDB"] = function () {return true;};

    bmak["sd_debug"]("<init/>");
    var bm_url = 'https://www.fedex.com/clN3FXQwSbxHnbCIiblw/OkJYGfz0iE1c/WBIbQg/QSMOQ/jktKEg',
        url_split = bm_url["split"]("/"),
        obfus_state_field;

    if (url_split["length"] >= 4 && (obfus_state_field = bm_url["split"]("/")["slice"](-4)[0]), obfus_state_field && obfus_state_field["length"] % 2 == 0) {
        var state_field_str = bmak["getStateField"](obfus_state_field);
        state_field_str["length"] > 3 && (bmak["listFunctions"]["_setFsp"]("1" == state_field_str["charAt"](0)), bmak["listFunctions"]["_setBm"]("1" == state_field_str["charAt"](1)), bmak["listFunctions"]["_setPowState"]("1" == state_field_str["charAt"](2)), bmak["listFunctions"]["_setIpr"]("1" == state_field_str["charAt"](3)), bmak["listFunctions"]["_setAu"](bm_url));
    }

    bmak["ir"]();
    bmak["t_tst"] = bmak["get_cf_date"]();

}(bmak);

var first_get_sensor_data = function(){
    bmak["to"]();
    bmak["rve"]();
    bmak["informinfo"] = bmak["getforminfo"]();
    bmak["js_post"] && (bmak["aj_type"] = 0, bmak["bpd"](), bmak["pd"](!0)), bmak["firstLoad"] = !1;
}


console.log(first_get_sensor_data())