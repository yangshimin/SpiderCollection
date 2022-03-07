const fs = require('fs');
var window = global;
var location = {
    host: 'live.bilibili.com',
    origin: 'https://live.bilibili.com',
    protocol: 'https:',
    hostname: 'live.bilibili.com',
    href: 'https://live.bilibili.com',   // 不知道是否有验证值是否正确,
    pathname: '/22792924',
};
window.location = location;
var document = {
    body: {
        childNodes: [{}, {}]
    }
};
window.document = document;
var self = window;
let wasm_file = 'bilibili.wasm';


var id_to_raw_value_map = {};
var last_raw_value_id = 1;
var id_to_refcount_map = {};
var id_to_ref_map = {};
var ref_to_id_map = new WeakMap();
var ref_to_id_map_fallback = new Map();
var last_refid = 1;
var tmp = "";

let importObj = {
    env: {
        __cargo_web_snippet_0d39c013e2144171d64e2fac849140a7e54c939a: function(r, _) {
            _ = to_js(_),
                from_js(r, _.location)
        },
        __cargo_web_snippet_0f503de1d61309643e0e13a7871406891e3691c9: function(r) {
            from_js(r, window)
        },
        __cargo_web_snippet_10f5aa3985855124ab83b21d4e9f7297eb496508: function(r) {
            return id_to_ref_map[r] instanceof Array | 0
        },
        __cargo_web_snippet_2b0b92aee0d0de6a955f8e5540d7923636d951ae: function(r, _) {
            _ = to_js(_),
                from_js(r, function() {
                    try {
                        return {
                            value: _.origin,
                            success: !0
                        }
                    } catch (e) {
                        return {
                            error: e,
                            success: !1
                        }
                    }
                }())
        },
        __cargo_web_snippet_461d4581925d5b0bf583a3b445ed676af8701ca6: function(r, _) {
            _ = to_js(_),
                from_js(r, function() {
                    try {
                        return {
                            value: _.host,
                            success: !0
                        }
                    } catch (e) {
                        return {
                            error: e,
                            success: !1
                        }
                    }
                }())
        },
        __cargo_web_snippet_4c895ac2b754e5559c1415b6546d672c58e29da6: function(r, _) {
            _ = to_js(_),
                from_js(r, function() {
                    try {
                        return {
                            value: _.protocol,
                            success: !0
                        }
                    } catch (e) {
                        return {
                            error: e,
                            success: !1
                        }
                    }
                }())
        },
        __cargo_web_snippet_614a3dd2adb7e9eac4a0ec6e59d37f87e0521c3b: function(r, _) {
            _ = to_js(_),
                from_js(r, _.error)
        },
        __cargo_web_snippet_62ef43cf95b12a9b5cdec1639439c972d6373280: function(r, _) {
            _ = to_js(_),
                from_js(r, _.childNodes)
        },
        __cargo_web_snippet_6fcce0aae651e2d748e085ff1f800f87625ff8c8: function(r) {
            from_js(r, document)
        },
        __cargo_web_snippet_7ba9f102925446c90affc984f921f414615e07dd: function(r, _) {
            _ = to_js(_),
                from_js(r, _.body)
        },
        __cargo_web_snippet_80d6d56760c65e49b7be8b6b01c1ea861b046bf0: function(r) {
            decrement_refcount(r)
        },
        __cargo_web_snippet_897ff2d0160606ea98961935acb125d1ddbf4688: function(r) {
            var _ = acquire_js_reference(r);
            return _ instanceof DOMException && "SecurityError" === _.name
        },
        __cargo_web_snippet_8c32019649bb581b1b742eeedfc410e2bedd56a6: function(r, _) {
            var t = acquire_js_reference(r);
            serialize_array(_, t)
        },
        __cargo_web_snippet_a466a2ab96cd77e1a77dcdb39f4f031701c195fc: function(r, _) {
            _ = to_js(_),
                from_js(r, function() {
                    try {
                        return {
                            value: _.pathname,
                            success: !0
                        }
                    } catch (e) {
                        return {
                            error: e,
                            success: !1
                        }
                    }
                }())
        },
        __cargo_web_snippet_ab05f53189dacccf2d365ad26daa407d4f7abea9: function(r, _) {
            _ = to_js(_),
                from_js(r, _.value)
        },
        __cargo_web_snippet_b06dde4acf09433b5190a4b001259fe5d4abcbc2: function(r, _) {
            _ = to_js(_),
                from_js(r, _.success)
        },
        __cargo_web_snippet_b33a39de4ca954888e26fe9caa277138e808eeba: function(r, _) {
            _ = to_js(_),
                from_js(r, _.length)
        },
        __cargo_web_snippet_cdf2859151791ce4cad80688b200564fb08a8613: function(r, _) {
            _ = to_js(_),
                from_js(r, function() {
                    try {
                        return {
                            value: _.href,
                            success: !0
                        }
                    } catch (e) {
                        return {
                            error: e,
                            success: !1
                        }
                    }
                }())
        },
        __cargo_web_snippet_e8ef87c41ded1c10f8de3c70dea31a053e19747c: function(r, _) {
            _ = to_js(_),
                from_js(r, function() {
                    try {
                        return {
                            value: _.hostname,
                            success: !0
                        }
                    } catch (e) {
                        return {
                            error: e,
                            success: !1
                        }
                    }
                }())
        },
        __cargo_web_snippet_e9638d6405ab65f78daf4a5af9c9de14ecf1e2ec: function(r) {
            r = to_js(r),
                unregister_raw_value(r)
        },
        __cargo_web_snippet_ff5103e6cc179d13b4c7a785bdce2708fd559fc0: function(r) {
            tmp = to_js(r)
        },
        __web_on_grow: function s() {

        }
    }
}

acquire_tmp = function (r) {
    var _ = tmp;
    return tmp = null,
        _
}

unregister_raw_value = function (r) {
    delete id_to_raw_value_map[r]
}

decrement_refcount = function (r) {
    var _ = id_to_refcount_map;
    if (0 == --_[r]) {
        var t = id_to_ref_map,
            n = ref_to_id_map_fallback,
            a = t[r];
        delete t[r],
            delete _[r],
            n.delete(a)
    }
}

to_js_string = function (r, t) {
        return new TextDecoder("utf-8").decode(new Uint8Array(memory.buffer).subarray(r, r + t))
    }

to_js = function (r) {
    var _ = new Uint8Array(memory.buffer)[r + 12];
    if (0 !== _) {
        if (1 === _)
            return null;
        if (2 === _)
            return new Int32Array(memory.buffer)[r / 4];
        if (3 === _)
            return new Float64Array(memory.buffer)[r / 8];
        if (4 === _) {
            var t = new Uint32Array(memory.buffer)[r / 4],
                n = new Uint32Array(memory.buffer)[(r + 4) / 4];
            return to_js_string(t, n)
        }
        if (5 === _)
            return !1;
        if (6 === _)
            return !0;
        if (7 === _) {
            t = e.STDWEB_PRIVATE.arena + new Uint32Array(memory.buffer)[r / 4],
                n = new Uint32Array(memory.buffer)[(r + 4) / 4];
            for (var a = [], E = 0; E < n; ++E)
                a.push(to_js(t + 16 * E));
            return a
        }
        if (8 === _) {
            var c = e.STDWEB_PRIVATE.arena,
                o = c + new Uint32Array(memory.buffer)[r / 4],
                T = (n = new Uint32Array(memory.buffer)[(r + 4) / 4],
                c + new Uint32Array(memory.buffer)[(r + 8) / 4]);
            for (a = {},
                     E = 0; E < n; ++E) {
                var f = new Uint32Array(memory.buffer)[(T + 8 * E) / 4],
                    u = new Uint32Array(memory.buffer)[(T + 4 + 8 * E) / 4],
                    i = to_js_string(f, u),
                    A = to_js(o + 16 * E);
                a[i] = A
            }
            return a
        }
        if (9 === _)
            return acquire_js_reference(new Int32Array(memory.buffer)[r / 4]);
        if (10 === _ || 12 === _ || 13 === _) {
            var s = new Uint32Array(memory.buffer)[r / 4],
                P = (t = new Uint32Array(memory.buffer)[(r + 4) / 4],
                    new Uint32Array(memory.buffer)[(r + 8) / 4]),
                l = 0,
                d = !1;
            a = function () {
                if (0 === t || !0 === d)
                    throw 10 === _ ? new ReferenceError("Already dropped Rust function called!") : 12 === _ ? new ReferenceError("Already dropped FnMut function called!") : new ReferenceError("Already called or dropped FnOnce function called!");
                var r = t;
                if (13 === _ && (a.drop = noop,
                    t = 0),
                0 !== l && (12 === _ || 13 === _))
                    throw new ReferenceError("FnMut function called multiple times concurrently!");
                var n = e.STDWEB_PRIVATE.alloc(16);
                e.STDWEB_PRIVATE.serialize_array(n, arguments);
                try {
                    l += 1,
                        dyncall("vii", s, [r, n]);
                    var E = tmp;
                    tmp = null
                } finally {
                    l -= 1
                }
                return !0 === d && 0 === l && a.drop(),
                    E
            };
            return a.drop = function () {
                if (0 === l) {
                    a.drop = noop;
                    var r = t;
                    t = 0,
                    0 != r && dyncall("vi", P, [r])
                } else
                    d = !0
            },
                a
        }
        if (14 === _) {
            t = new Uint32Array(memory.buffer)[r / 4],
                n = new Uint32Array(memory.buffer)[(r + 4) / 4];
            var S = new Uint32Array(memory.buffer)[(r + 8) / 4],
                D = t + n;
            switch (S) {
                case 0:
                    return new Uint8Array(memory.buffer).subarray(t, D);
                case 1:
                    return new Int8Array(memory.buffer).subarray(t, D);
                case 2:
                    return new Uint16Array(memory.buffer).subarray(t, D);
                case 3:
                    return new Int16Array(memory.buffer).subarray(t, D);
                case 4:
                    return new Uint32Array(memory.buffer).subarray(t, D);
                case 5:
                    return new Int32Array(memory.buffer).subarray(t, D);
                case 6:
                    return new Float32Array(memory.buffer).subarray(t, D);
                case 7:
                    return new Float64Array(memory.buffer).subarray(t, D)
            }
        } else if (15 === _)
            return get_raw_value(new Uint32Array(memory.buffer)[r / 4])
    }
};

dyncall = function (r, _, t) {
    return wasmObject.exports.__indirect_function_table.get(_).apply(null, t)
}

get_raw_value = function (r) {
    return id_to_raw_value_map[r]
}

to_utf8_string = function(_, t) {
        var n = (new TextEncoder("utf-8")).encode(t)
            , a = n.length
            , E = 0;
        a > 0 && (E = wasmObject.exports.__web_malloc(a),
            (new Int8Array(memory.buffer)).set(n, E)),
            (new Int32Array(memory.buffer))[_ / 4] = E,
            (new Int32Array(memory.buffer))[(_ + 4) / 4] = a
    };

register_raw_value = function(r) {
    var _ = last_raw_value_id++;
    return id_to_raw_value_map[_] = r,
        _
};

acquire_rust_reference = function(r) {
    if (null == r)
        return 0;
    var _ = id_to_refcount_map
        , t = id_to_ref_map
        , n = ref_to_id_map
        , a = ref_to_id_map_fallback
        , E = n.get(r);
    if (void 0 === E && (E = a.get(r)),
    void 0 === E) {
        E = last_refid++;
        try {
            n.set(r, E)
        } catch (e) {
            a.set(r, E)
        }
    }
    return E in t ? _[E]++ : (t[E] = r,
        _[E] = 1),
        E
}

from_js = function(r, _) {
    var t = Object.prototype.toString.call(_);
    if ("[object String]" === t)
        (new Int8Array(memory.buffer))[r + 12] = 4,
            to_utf8_string(r, _);
    else if ("[object Number]" === t)
        _ === (0 | _) ? ((new Int8Array(memory.buffer))[r + 12] = 2,
            (new Int32Array(memory.buffer))[r / 4] = _) : ((new Int8Array(memory.buffer))[r + 12] = 3,
            (new Float64Array(memory.buffer))[r / 8] = _);
    else if (null === _)
        (new Int8Array(memory.buffer))[r + 12] = 1;
    else if (void 0 === _)
        (new Int8Array(memory.buffer))[r + 12] = 0;
    else if (!1 === _)
        (new Int8Array(memory.buffer))[r + 12] = 5;
    else if (!0 === _)
        (new Int8Array(memory.buffer))[r + 12] = 6;
    else if ("[object Symbol]" === t) {
        var n = register_raw_value(_);
        (new Int8Array(memory.buffer))[r + 12] = 15,
            (new Int32Array(memory.buffer))[r / 4] = n
    } else {
        var a = acquire_rust_reference(_);
        (new Int8Array(memory.buffer))[r + 12] = 9,
            (new Int32Array(memory.buffer))[r / 4] = a
    }
};

acquire_js_reference = function(r) {
    return id_to_ref_map[r]
}

prepare_any_arg = function(r) {
    var _ = wasmObject.exports.__web_malloc(16);
    return from_js(_, r),
        _
};

serialize_array = function(r, _) {
    var t = _.length
        , n = wasmObject.exports.__web_malloc(16 * t);
    (new Int8Array(memory.buffer))[r + 12] = 7,
        (new Int32Array(memory.buffer))[r / 4] = n,
        (new Int32Array(memory.buffer))[(r + 4) / 4] = t;
    for (var a = 0; a < t; ++a)
        from_js(n + 16 * a, _[a])
};

noop = function () {};

to_js = function(r) {
    var _ = new Uint8Array(memory.buffer)[r + 12];
    if (0 !== _) {
        if (1 === _)
            return null;
        if (2 === _)
            return new Int32Array(memory.buffer)[r / 4];
        if (3 === _)
            return new Float64Array(memory.buffer)[r / 8];
        if (4 === _) {
            var t = new Uint32Array(memory.buffer)[r / 4]
                , n = new Uint32Array(memory.buffer)[(r + 4) / 4];
            return to_js_string(t, n)
        }
        if (5 === _)
            return !1;
        if (6 === _)
            return !0;
        if (7 === _) {
            t = e.STDWEB_PRIVATE.arena + new Uint32Array(memory.buffer)[r / 4],
                n = new Uint32Array(memory.buffer)[(r + 4) / 4];
            for (var a = [], E = 0; E < n; ++E)
                a.push(to_js(t + 16 * E));
            return a
        }
        if (8 === _) {
            var c = e.STDWEB_PRIVATE.arena
                , o = c + new Uint32Array(memory.buffer)[r / 4]
                , T = (n = new Uint32Array(memory.buffer)[(r + 4) / 4],
            c + new Uint32Array(memory.buffer)[(r + 8) / 4]);
            for (a = {},
                     E = 0; E < n; ++E) {
                var f = new Uint32Array(memory.buffer)[(T + 8 * E) / 4]
                    , u = new Uint32Array(memory.buffer)[(T + 4 + 8 * E) / 4]
                    , i = to_js_string(f, u)
                    , A = to_js(o + 16 * E);
                a[i] = A
            }
            return a
        }
        if (9 === _)
            return acquire_js_reference(new Int32Array(memory.buffer)[r / 4]);
        if (10 === _ || 12 === _ || 13 === _) {
            var s = new Uint32Array(memory.buffer)[r / 4]
                , P = (t = new Uint32Array(memory.buffer)[(r + 4) / 4],
                new Uint32Array(memory.buffer)[(r + 8) / 4])
                , l = 0
                , d = !1;
            a = function() {
                if (0 === t || !0 === d)
                    throw 10 === _ ? new ReferenceError("Already dropped Rust function called!") : 12 === _ ? new ReferenceError("Already dropped FnMut function called!") : new ReferenceError("Already called or dropped FnOnce function called!");
                var r = t;
                if (13 === _ && (a.drop = noop,
                    t = 0),
                0 !== l && (12 === _ || 13 === _))
                    throw new ReferenceError("FnMut function called multiple times concurrently!");
                var n = wasmObject.exports.__web_malloc(16);
                serialize_array(n, arguments);
                try {
                    l += 1,
                        dyncall("vii", s, [r, n]);
                    var E = tmp;
                    tmp = null
                } finally {
                    l -= 1
                }
                return !0 === d && 0 === l && a.drop(),
                    E
            }
            ;
            return a.drop = function() {
                if (0 === l) {
                    a.drop = noop;
                    var r = t;
                    t = 0,
                    0 != r && dyncall("vi", P, [r])
                } else
                    d = !0
            }
                ,
                a
        }
        if (14 === _) {
            t = new Uint32Array(memory.buffer)[r / 4],
                n = new Uint32Array(memory.buffer)[(r + 4) / 4];
            var S = new Uint32Array(memory.buffer)[(r + 8) / 4]
                , D = t + n;
            switch (S) {
                case 0:
                    return new Uint8Array(memory.buffer).subarray(t, D);
                case 1:
                    return new Int8Array(memory.buffer).subarray(t, D);
                case 2:
                    return new Uint16Array(memory.buffer).subarray(t, D);
                case 3:
                    return new Int16Array(memory.buffer).subarray(t, D);
                case 4:
                    return new Uint32Array(memory.buffer).subarray(t, D);
                case 5:
                    return new Int32Array(memory.buffer).subarray(t, D);
                case 6:
                    return new Float32Array(memory.buffer).subarray(t, D);
                case 7:
                    return new Float64Array(memory.buffer).subarray(t, D)
            }
        } else if (15 === _)
            return get_raw_value(new Uint32Array(memory.buffer)[r / 4])
    }
}


var wasmObject = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array(fs.readFileSync(wasm_file))), importObj);
let memory = wasmObject.exports.memory

var arge1 = '{"id":"[3,163,13,5887574]","device":"[\\"AUTO1716277899447614\\",\\"3fc2a589-9cb7-42bf-85c9-c2af590c2fad\\"]","ets":1627808068,"benchmark":"seacasdgyijfhofiuxoannn","time":60,"ts":1627808222759,"ua":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4580.0 Safari/537.36"}';
var arge2 = new Array();
arge2.push(2);
arge2.push(5);
arge2.push(1);
arge2.push(4);
var wasmr = prepare_any_arg(arge1);
var wasmt = prepare_any_arg(arge2);

console.log(acquire_tmp(wasmObject.exports.spyder(wasmr, wasmt)));