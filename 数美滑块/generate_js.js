const fs = require('fs');
// 解析js,将js代码转换为AST
// parser的parse方法有第二个参数sourceType, 当js代码中含有import、export (es6的代码)等关键字时
// 需要指定sourceType为module
const parser = require("@babel/parser");
// 用来遍历AST中的节点
const traverse = require("@babel/traverse").default;
// 用来判断节点类型和生成新的节点等
const t = require("@babel/types");
// 用来把AST代码转换成JS代码
// generator 也有其他参数，具体参考文档: https://babeljs.io/docs/en/@babel-generator
const generator = require("@babel/generator").default;


function generateRealBigArgumentValue(js_path){
    const js_code = fs.readFileSync(js_path, {
        encoding: "utf-8"
    });
    let ast = parser.parse(js_code);

    function generate_js(astObjList){
        // 初始话一个空的AST对象
        let newAst = parser.parse("");
        // 放入到空的AST对象中 再转为js eval加载到内存中
        astObjList.map(function(p){newAst.program.body.push(p);})
        let code = generator(newAst, {compact: true}).code;
        return code;
    }

// 获取解密相关的JS代码
    let decrypt_func_name = ast.program.body[1].declarations[0].init.name;
    let decrypt_func_name_copy = decrypt_func_name;
    let decrypt_list = ast.program.body.slice(0,3)

    let encryptSequenceExpression = ast.program.body[3].expression;
    let callExpressionList = encryptSequenceExpression.expressions;
    let lastCallExpression = callExpressionList.pop();
    let decrypt_code = generator(ast, {compact: true}).code

// 解密函数加载到内存中
    eval(decrypt_code)

// 获取函数实参
    let realArguments = lastCallExpression.arguments;
    let realArgumentsValue = [];
    realArguments.map(function(p){
        realArgumentsValue.push(eval(generate_js([p])))
    })

    var _0x450a3e = realArgumentsValue, _0x3ff3d5;

// 观察发现实参的最后10个数是不会参与后序倒序的 并且倒数第9个数就是用来判断参数倒序的临界值
    let indexValue = realArgumentsValue[realArgumentsValue.length - 9];

// 如果某个值类型是字符串 就把字符串的字符顺序倒序
    for (_0x3ff3d5 = 0; _0x3ff3d5 < indexValue; _0x3ff3d5++) {
        typeof _0x450a3e[_0x3ff3d5] === "string" && (_0x450a3e[_0x3ff3d5] = _0x450a3e[_0x3ff3d5]["split"]("")["reverse"]()["join"](""));
    }

// 把除最后10个之外的参数全部倒序
    for (_0x3ff3d5 = 0; _0x3ff3d5 < (indexValue / 2); _0x3ff3d5++) {
        var _0xf4cda9 = _0x450a3e[_0x3ff3d5];
        _0x450a3e[_0x3ff3d5] = _0x450a3e[indexValue - _0x3ff3d5 - 1], _0x450a3e[indexValue - _0x3ff3d5 - 1] = _0xf4cda9;
    }
    return realArgumentsValue;
}
function base64Encode(_0x47c311) {
    var _0x51a4d7 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    var _0x3f5756, _0x377cf6, _0x59ce8f;

    var _0x2e4c49, _0x1c8ef5, _0x10b017;

    _0x59ce8f = _0x47c311["length"];
    _0x377cf6 = 0;
    _0x3f5756 = "";

    while (_0x377cf6 < _0x59ce8f) {
        _0x2e4c49 = _0x47c311["charCodeAt"](_0x377cf6++) & 255;

        if (_0x377cf6 == _0x59ce8f) {
            _0x3f5756 += _0x51a4d7["charAt"](_0x2e4c49 >> 2), _0x3f5756 += _0x51a4d7["charAt"]((_0x2e4c49 & 3) << 4), _0x3f5756 += "==";
            break;
        }

        _0x1c8ef5 = _0x47c311["charCodeAt"](_0x377cf6++);

        if (_0x377cf6 == _0x59ce8f) {
            _0x3f5756 += _0x51a4d7["charAt"](_0x2e4c49 >> 2), _0x3f5756 += _0x51a4d7["charAt"]((_0x2e4c49 & 3) << 4 | (_0x1c8ef5 & 240) >> 4), _0x3f5756 += _0x51a4d7["charAt"]((_0x1c8ef5 & 15) << 2), _0x3f5756 += "=";
            break;
        }

        _0x10b017 = _0x47c311["charCodeAt"](_0x377cf6++), _0x3f5756 += _0x51a4d7["charAt"](_0x2e4c49 >> 2), _0x3f5756 += _0x51a4d7["charAt"]((_0x2e4c49 & 3) << 4 | (_0x1c8ef5 & 240) >> 4), _0x3f5756 += _0x51a4d7["charAt"]((_0x1c8ef5 & 15) << 2 | (_0x10b017 & 192) >> 6), _0x3f5756 += _0x51a4d7["charAt"](_0x10b017 & 63);
    }

    return _0x3f5756;
}
function base64Decode(_0x315410) {
    var _0x14599c = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

    var _0x4cea4f, _0x4f7276, _0x58e1a7, _0x457100;

    var _0x37703a, _0x5ae166, _0x542d7e;

    _0x5ae166 = _0x315410["length"];
    _0x37703a = 0;
    _0x542d7e = "";

    while (_0x37703a < _0x5ae166) {
        do {
            _0x4cea4f = _0x14599c[_0x315410["charCodeAt"](_0x37703a++) & 255];
        } while (_0x37703a < _0x5ae166 && _0x4cea4f == -1);

        if (_0x4cea4f == -1) break;

        do {
            _0x4f7276 = _0x14599c[_0x315410["charCodeAt"](_0x37703a++) & 255];
        } while (_0x37703a < _0x5ae166 && _0x4f7276 == -1);

        if (_0x4f7276 == -1) break;
        _0x542d7e += String["fromCharCode"](_0x4cea4f << 2 | (_0x4f7276 & 48) >> 4);

        do {
            _0x58e1a7 = _0x315410["charCodeAt"](_0x37703a++) & 255;
            if (_0x58e1a7 == 61) return _0x542d7e;
            _0x58e1a7 = _0x14599c[_0x58e1a7];
        } while (_0x37703a < _0x5ae166 && _0x58e1a7 == -1);

        if (_0x58e1a7 == -1) break;
        _0x542d7e += String["fromCharCode"]((_0x4f7276 & 15) << 4 | (_0x58e1a7 & 60) >> 2);

        do {
            _0x457100 = _0x315410["charCodeAt"](_0x37703a++) & 255;
            if (_0x457100 == 61) return _0x542d7e;
            _0x457100 = _0x14599c[_0x457100];
        } while (_0x37703a < _0x5ae166 && _0x457100 == -1);

        if (_0x457100 == -1) break;
        _0x542d7e += String["fromCharCode"]((_0x58e1a7 & 3) << 6 | _0x457100);
    }

    return _0x542d7e;
}
function _0x2fc1eb(_0x298b2b) {
    var _0xd64f0 = new Array(0, 4, 536870912, 536870916, 65536, 65540, 536936448, 536936452, 512, 516, 536871424, 536871428, 66048, 66052, 536936960, 536936964);

    var _0x3169d0 = new Array(0, 1, 1048576, 1048577, 67108864, 67108865, 68157440, 68157441, 256, 257, 1048832, 1048833, 67109120, 67109121, 68157696, 68157697);

    var _0x2e9105 = new Array(0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272, 0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272);

    var _0x25eed5 = new Array(0, 2097152, 134217728, 136314880, 8192, 2105344, 134225920, 136323072, 131072, 2228224, 134348800, 136445952, 139264, 2236416, 134356992, 136454144);

    var _0x2a9a63 = new Array(0, 262144, 16, 262160, 0, 262144, 16, 262160, 4096, 266240, 4112, 266256, 4096, 266240, 4112, 266256);

    var _0x1d1d83 = new Array(0, 1024, 32, 1056, 0, 1024, 32, 1056, 33554432, 33555456, 33554464, 33555488, 33554432, 33555456, 33554464, 33555488);

    var _0x4a6e58 = new Array(0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746, 0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746);

    var _0x464608 = new Array(0, 65536, 2048, 67584, 536870912, 536936448, 536872960, 536938496, 131072, 196608, 133120, 198656, 537001984, 537067520, 537004032, 537069568);

    var _0x193da8 = new Array(0, 262144, 0, 262144, 2, 262146, 2, 262146, 33554432, 33816576, 33554432, 33816576, 33554434, 33816578, 33554434, 33816578);

    var _0x5054ec = new Array(0, 268435456, 8, 268435464, 0, 268435456, 8, 268435464, 1024, 268436480, 1032, 268436488, 1024, 268436480, 1032, 268436488);

    var _0x9dc513 = new Array(0, 32, 0, 32, 1048576, 1048608, 1048576, 1048608, 8192, 8224, 8192, 8224, 1056768, 1056800, 1056768, 1056800);

    var _0x1fa8f5 = new Array(0, 16777216, 512, 16777728, 2097152, 18874368, 2097664, 18874880, 67108864, 83886080, 67109376, 83886592, 69206016, 85983232, 69206528, 85983744);

    var _0x7b7a89 = new Array(0, 4096, 134217728, 134221824, 524288, 528384, 134742016, 134746112, 16, 4112, 134217744, 134221840, 524304, 528400, 134742032, 134746128);

    var _0xea6158 = new Array(0, 4, 256, 260, 0, 4, 256, 260, 1, 5, 257, 261, 1, 5, 257, 261);

    var _0x1588ad = _0x298b2b["length"] > 8 ? 3 : 1;

    var _0x5983c2 = new Array(32 * _0x1588ad);

    var _0x3998d9 = new Array(0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0);

    var _0x110b16 = void 0,
        _0x483ae3 = void 0,
        _0x5e4582 = 0,
        _0x1d57db = 0,
        _0x18f862 = void 0;

    for (var _0x1fd1f8 = 0; _0x1fd1f8 < _0x1588ad; _0x1fd1f8++) {
        var _0x50d3ac = _0x298b2b["charCodeAt"](_0x5e4582++) << 24 | _0x298b2b["charCodeAt"](_0x5e4582++) << 16 | _0x298b2b["charCodeAt"](_0x5e4582++) << 8 | _0x298b2b["charCodeAt"](_0x5e4582++);

        var _0xd4e338 = _0x298b2b["charCodeAt"](_0x5e4582++) << 24 | _0x298b2b["charCodeAt"](_0x5e4582++) << 16 | _0x298b2b["charCodeAt"](_0x5e4582++) << 8 | _0x298b2b["charCodeAt"](_0x5e4582++);

        _0x18f862 = (_0x50d3ac >>> 4 ^ _0xd4e338) & 252645135;
        _0xd4e338 ^= _0x18f862;
        _0x50d3ac ^= _0x18f862 << 4;
        _0x18f862 = (_0xd4e338 >>> -16 ^ _0x50d3ac) & 65535;
        _0x50d3ac ^= _0x18f862;
        _0xd4e338 ^= _0x18f862 << -16;
        _0x18f862 = (_0x50d3ac >>> 2 ^ _0xd4e338) & 858993459;
        _0xd4e338 ^= _0x18f862;
        _0x50d3ac ^= _0x18f862 << 2;
        _0x18f862 = (_0xd4e338 >>> -16 ^ _0x50d3ac) & 65535;
        _0x50d3ac ^= _0x18f862;
        _0xd4e338 ^= _0x18f862 << -16;
        _0x18f862 = (_0x50d3ac >>> 1 ^ _0xd4e338) & 1431655765;
        _0xd4e338 ^= _0x18f862;
        _0x50d3ac ^= _0x18f862 << 1;
        _0x18f862 = (_0xd4e338 >>> 8 ^ _0x50d3ac) & 16711935;
        _0x50d3ac ^= _0x18f862;
        _0xd4e338 ^= _0x18f862 << 8;
        _0x18f862 = (_0x50d3ac >>> 1 ^ _0xd4e338) & 1431655765;
        _0xd4e338 ^= _0x18f862;
        _0x50d3ac ^= _0x18f862 << 1;
        _0x18f862 = _0x50d3ac << 8 | _0xd4e338 >>> 20 & 240;
        _0x50d3ac = _0xd4e338 << 24 | _0xd4e338 << 8 & 16711680 | _0xd4e338 >>> 8 & 65280 | _0xd4e338 >>> 24 & 240;
        _0xd4e338 = _0x18f862;

        for (var _0x243faf = 0; _0x243faf < _0x3998d9["length"]; _0x243faf++) {
            _0x3998d9[_0x243faf] ? (_0x50d3ac = _0x50d3ac << 2 | _0x50d3ac >>> 26, _0xd4e338 = _0xd4e338 << 2 | _0xd4e338 >>> 26) : (_0x50d3ac = _0x50d3ac << 1 | _0x50d3ac >>> 27, _0xd4e338 = _0xd4e338 << 1 | _0xd4e338 >>> 27);
            _0x50d3ac &= -15;
            _0xd4e338 &= -15;
            _0x110b16 = _0xd64f0[_0x50d3ac >>> 28] | _0x3169d0[_0x50d3ac >>> 24 & 15] | _0x2e9105[_0x50d3ac >>> 20 & 15] | _0x25eed5[_0x50d3ac >>> 16 & 15] | _0x2a9a63[_0x50d3ac >>> 12 & 15] | _0x1d1d83[_0x50d3ac >>> 8 & 15] | _0x4a6e58[_0x50d3ac >>> 4 & 15];
            _0x483ae3 = _0x464608[_0xd4e338 >>> 28] | _0x193da8[_0xd4e338 >>> 24 & 15] | _0x5054ec[_0xd4e338 >>> 20 & 15] | _0x9dc513[_0xd4e338 >>> 16 & 15] | _0x1fa8f5[_0xd4e338 >>> 12 & 15] | _0x7b7a89[_0xd4e338 >>> 8 & 15] | _0xea6158[_0xd4e338 >>> 4 & 15];
            _0x18f862 = (_0x483ae3 >>> 16 ^ _0x110b16) & 65535;
            _0x5983c2[_0x1d57db++] = _0x110b16 ^ _0x18f862;
            _0x5983c2[_0x1d57db++] = _0x483ae3 ^ _0x18f862 << 16;
        }
    }

    return _0x5983c2;
}
function DES(_0x10d318, _0x183ed7, _0x4bcc22, _0x37080a, _0x2ab2c2, _0x46d821) {
    var _0x262998 = new Array(16843776, 0, 65536, 16843780, 16842756, 66564, 4, 65536, 1024, 16843776, 16843780, 1024, 16778244, 16842756, 16777216, 4, 1028, 16778240, 16778240, 66560, 66560, 16842752, 16842752, 16778244, 65540, 16777220, 16777220, 65540, 0, 1028, 66564, 16777216, 65536, 16843780, 4, 16842752, 16843776, 16777216, 16777216, 1024, 16842756, 65536, 66560, 16777220, 1024, 4, 16778244, 66564, 16843780, 65540, 16842752, 16778244, 16777220, 1028, 66564, 16843776, 1028, 16778240, 16778240, 0, 65540, 66560, 0, 16842756);

    var _0x35e121 = new Array(-2146402272, -2147450880, 32768, 1081376, 1048576, 32, -2146435040, -2147450848, -2147483616, -2146402272, -2146402304, -2147483648, -2147450880, 1048576, 32, -2146435040, 1081344, 1048608, -2147450848, 0, -2147483648, 32768, 1081376, -2146435072, 1048608, -2147483616, 0, 1081344, 32800, -2146402304, -2146435072, 32800, 0, 1081376, -2146435040, 1048576, -2147450848, -2146435072, -2146402304, 32768, -2146435072, -2147450880, 32, -2146402272, 1081376, 32, 32768, -2147483648, 32800, -2146402304, 1048576, -2147483616, 1048608, -2147450848, -2147483616, 1048608, 1081344, 0, -2147450880, 32800, -2147483648, -2146435040, -2146402272, 1081344);

    var _0x101d21 = new Array(520, 134349312, 0, 134348808, 134218240, 0, 131592, 134218240, 131080, 134217736, 134217736, 131072, 134349320, 131080, 134348800, 520, 134217728, 8, 134349312, 512, 131584, 134348800, 134348808, 131592, 134218248, 131584, 131072, 134218248, 8, 134349320, 512, 134217728, 134349312, 134217728, 131080, 520, 131072, 134349312, 134218240, 0, 512, 131080, 134349320, 134218240, 134217736, 512, 0, 134348808, 134218248, 131072, 134217728, 134349320, 8, 131592, 131584, 134217736, 134348800, 134218248, 520, 134348800, 131592, 8, 134348808, 131584);

    var _0x2cde99 = new Array(8396801, 8321, 8321, 128, 8396928, 8388737, 8388609, 8193, 0, 8396800, 8396800, 8396929, 129, 0, 8388736, 8388609, 1, 8192, 8388608, 8396801, 128, 8388608, 8193, 8320, 8388737, 1, 8320, 8388736, 8192, 8396928, 8396929, 129, 8388736, 8388609, 8396800, 8396929, 129, 0, 0, 8396800, 8320, 8388736, 8388737, 1, 8396801, 8321, 8321, 128, 8396929, 129, 1, 8192, 8388609, 8193, 8396928, 8388737, 8193, 8320, 8388608, 8396801, 128, 8388608, 8192, 8396928);

    var _0x1ec878 = new Array(256, 34078976, 34078720, 1107296512, 524288, 256, 1073741824, 34078720, 1074266368, 524288, 33554688, 1074266368, 1107296512, 1107820544, 524544, 1073741824, 33554432, 1074266112, 1074266112, 0, 1073742080, 1107820800, 1107820800, 33554688, 1107820544, 1073742080, 0, 1107296256, 34078976, 33554432, 1107296256, 524544, 524288, 1107296512, 256, 33554432, 1073741824, 34078720, 1107296512, 1074266368, 33554688, 1073741824, 1107820544, 34078976, 1074266368, 256, 33554432, 1107820544, 1107820800, 524544, 1107296256, 1107820800, 34078720, 0, 1074266112, 1107296256, 524544, 33554688, 1073742080, 524288, 0, 1074266112, 34078976, 1073742080);

    var _0x865553 = new Array(536870928, 541065216, 16384, 541081616, 541065216, 16, 541081616, 4194304, 536887296, 4210704, 4194304, 536870928, 4194320, 536887296, 536870912, 16400, 0, 4194320, 536887312, 16384, 4210688, 536887312, 16, 541065232, 541065232, 0, 4210704, 541081600, 16400, 4210688, 541081600, 536870912, 536887296, 16, 541065232, 4210688, 541081616, 4194304, 16400, 536870928, 4194304, 536887296, 536870912, 16400, 536870928, 541081616, 4210688, 541065216, 4210704, 541081600, 0, 541065232, 16, 16384, 541065216, 4210704, 16384, 4194320, 536887312, 0, 541081600, 536870912, 4194320, 536887312);

    var _0x4eecf2 = new Array(2097152, 69206018, 67110914, 0, 2048, 67110914, 2099202, 69208064, 69208066, 2097152, 0, 67108866, 2, 67108864, 69206018, 2050, 67110912, 2099202, 2097154, 67110912, 67108866, 69206016, 69208064, 2097154, 69206016, 2048, 2050, 69208066, 2099200, 2, 67108864, 2099200, 67108864, 2099200, 2097152, 67110914, 67110914, 69206018, 69206018, 2, 2097154, 67108864, 67110912, 2097152, 69208064, 2050, 2099202, 69208064, 2050, 67108866, 69208066, 69206016, 2099200, 0, 2, 69208066, 0, 2099202, 69206016, 2048, 67108866, 67110912, 2048, 2097154);

    var _0x37e95b = new Array(268439616, 4096, 262144, 268701760, 268435456, 268439616, 64, 268435456, 262208, 268697600, 268701760, 266240, 268701696, 266304, 4096, 64, 268697600, 268435520, 268439552, 4160, 266240, 262208, 268697664, 268701696, 4160, 0, 0, 268697664, 268435520, 268439552, 266304, 262144, 266304, 262144, 268701696, 4096, 64, 268697664, 4096, 266304, 268439552, 64, 268435520, 268697600, 268697664, 268435456, 262144, 268439616, 0, 268701760, 262208, 268435520, 268697600, 268439552, 268439616, 0, 268701760, 266240, 266240, 4160, 4160, 262208, 268435456, 268701696);

    var _0x286d26 = _0x2fc1eb(_0x10d318);

    var _0x23febe = 0,
        _0x8aa420 = void 0,
        _0x3d0daa = void 0,
        _0x256930 = void 0,
        _0x50a357 = void 0,
        _0x4bdcda = void 0,
        _0x2d3e6a = void 0,
        _0x1885b3 = void 0,
        _0x15dee9 = void 0;

    var _0x15dbb9 = void 0,
        _0x92f7ce = void 0,
        _0x2f23c2 = void 0,
        _0x2e3411 = void 0;

    var _0x38e7c8 = void 0,
        _0x11750b = void 0;

    var _0x17aa95 = _0x183ed7["length"];
    var _0x2d945c = 0;

    var _0x422bfb = _0x286d26["length"] == 32 ? 3 : 9;

    _0x422bfb == 3 ? _0x15dee9 = _0x4bcc22 ? new Array(0, 32, 2) : new Array(30, -2, -2) : _0x15dee9 = _0x4bcc22 ? new Array(0, 32, 2, 62, 30, -2, 64, 96, 2) : new Array(94, 62, -2, 32, 64, 2, 30, -2, -2);
    if (_0x46d821 == 2) _0x183ed7 += "        ";else {
        if (_0x46d821 == 1) {
            _0x256930 = 8 - _0x17aa95 % 8, _0x183ed7 += String["fromCharCode"](_0x256930, _0x256930, _0x256930, _0x256930, _0x256930, _0x256930, _0x256930, _0x256930);
            if (_0x256930 == 8) _0x17aa95 += 8;
        } else {
            if (!_0x46d821) _0x183ed7 += "\0\0\0\0\0\0\0\0";
        }
    }
    var _0x3c9490 = "";
    var _0x1bed6f = "";
    _0x37080a == 1 && (_0x15dbb9 = _0x2ab2c2["charCodeAt"](_0x23febe++) << 24 | _0x2ab2c2["charCodeAt"](_0x23febe++) << 16 | _0x2ab2c2["charCodeAt"](_0x23febe++) << 8 | _0x2ab2c2["charCodeAt"](_0x23febe++), _0x2f23c2 = _0x2ab2c2["charCodeAt"](_0x23febe++) << 24 | _0x2ab2c2["charCodeAt"](_0x23febe++) << 16 | _0x2ab2c2["charCodeAt"](_0x23febe++) << 8 | _0x2ab2c2["charCodeAt"](_0x23febe++), _0x23febe = 0);

    while (_0x23febe < _0x17aa95) {
        _0x2d3e6a = _0x183ed7["charCodeAt"](_0x23febe++) << 24 | _0x183ed7["charCodeAt"](_0x23febe++) << 16 | _0x183ed7["charCodeAt"](_0x23febe++) << 8 | _0x183ed7["charCodeAt"](_0x23febe++);
        _0x1885b3 = _0x183ed7["charCodeAt"](_0x23febe++) << 24 | _0x183ed7["charCodeAt"](_0x23febe++) << 16 | _0x183ed7["charCodeAt"](_0x23febe++) << 8 | _0x183ed7["charCodeAt"](_0x23febe++);
        _0x37080a == 1 && (_0x4bcc22 ? (_0x2d3e6a ^= _0x15dbb9, _0x1885b3 ^= _0x2f23c2) : (_0x92f7ce = _0x15dbb9, _0x2e3411 = _0x2f23c2, _0x15dbb9 = _0x2d3e6a, _0x2f23c2 = _0x1885b3));
        _0x256930 = (_0x2d3e6a >>> 4 ^ _0x1885b3) & 252645135;
        _0x1885b3 ^= _0x256930;
        _0x2d3e6a ^= _0x256930 << 4;
        _0x256930 = (_0x2d3e6a >>> 16 ^ _0x1885b3) & 65535;
        _0x1885b3 ^= _0x256930;
        _0x2d3e6a ^= _0x256930 << 16;
        _0x256930 = (_0x1885b3 >>> 2 ^ _0x2d3e6a) & 858993459;
        _0x2d3e6a ^= _0x256930;
        _0x1885b3 ^= _0x256930 << 2;
        _0x256930 = (_0x1885b3 >>> 8 ^ _0x2d3e6a) & 16711935;
        _0x2d3e6a ^= _0x256930;
        _0x1885b3 ^= _0x256930 << 8;
        _0x256930 = (_0x2d3e6a >>> 1 ^ _0x1885b3) & 1431655765;
        _0x1885b3 ^= _0x256930;
        _0x2d3e6a ^= _0x256930 << 1;
        _0x2d3e6a = _0x2d3e6a << 1 | _0x2d3e6a >>> 31;
        _0x1885b3 = _0x1885b3 << 1 | _0x1885b3 >>> 31;

        for (_0x3d0daa = 0; _0x3d0daa < _0x422bfb; _0x3d0daa += 3) {
            _0x38e7c8 = _0x15dee9[_0x3d0daa + 1];
            _0x11750b = _0x15dee9[_0x3d0daa + 2];

            for (_0x8aa420 = _0x15dee9[_0x3d0daa]; _0x8aa420 != _0x38e7c8; _0x8aa420 += _0x11750b) {
                _0x50a357 = _0x1885b3 ^ _0x286d26[_0x8aa420];
                _0x4bdcda = (_0x1885b3 >>> 4 | _0x1885b3 << 28) ^ _0x286d26[_0x8aa420 + 1];
                _0x256930 = _0x2d3e6a;
                _0x2d3e6a = _0x1885b3;
                _0x1885b3 = _0x256930 ^ (_0x35e121[_0x50a357 >>> 24 & 63] | _0x2cde99[_0x50a357 >>> 16 & 63] | _0x865553[_0x50a357 >>> 8 & 63] | _0x37e95b[_0x50a357 & 63] | _0x262998[_0x4bdcda >>> 24 & 63] | _0x101d21[_0x4bdcda >>> 16 & 63] | _0x1ec878[_0x4bdcda >>> 8 & 63] | _0x4eecf2[_0x4bdcda & 63]);
            }

            _0x256930 = _0x2d3e6a;
            _0x2d3e6a = _0x1885b3;
            _0x1885b3 = _0x256930;
        }

        _0x2d3e6a = _0x2d3e6a >>> 1 | _0x2d3e6a << 31;
        _0x1885b3 = _0x1885b3 >>> 1 | _0x1885b3 << 31;
        _0x256930 = (_0x2d3e6a >>> 1 ^ _0x1885b3) & 1431655765;
        _0x1885b3 ^= _0x256930;
        _0x2d3e6a ^= _0x256930 << 1;
        _0x256930 = (_0x1885b3 >>> 8 ^ _0x2d3e6a) & 16711935;
        _0x2d3e6a ^= _0x256930;
        _0x1885b3 ^= _0x256930 << 8;
        _0x256930 = (_0x1885b3 >>> 2 ^ _0x2d3e6a) & 858993459;
        _0x2d3e6a ^= _0x256930;
        _0x1885b3 ^= _0x256930 << 2;
        _0x256930 = (_0x2d3e6a >>> 16 ^ _0x1885b3) & 65535;
        _0x1885b3 ^= _0x256930;
        _0x2d3e6a ^= _0x256930 << 16;
        _0x256930 = (_0x2d3e6a >>> 4 ^ _0x1885b3) & 252645135;
        _0x1885b3 ^= _0x256930;
        _0x2d3e6a ^= _0x256930 << 4;
        _0x37080a == 1 && (_0x4bcc22 ? (_0x15dbb9 = _0x2d3e6a, _0x2f23c2 = _0x1885b3) : (_0x2d3e6a ^= _0x92f7ce, _0x1885b3 ^= _0x2e3411));
        _0x1bed6f += String["fromCharCode"](_0x2d3e6a >>> 24, _0x2d3e6a >>> 16 & 255, _0x2d3e6a >>> 8 & 255, _0x2d3e6a & 255, _0x1885b3 >>> 24, _0x1885b3 >>> 16 & 255, _0x1885b3 >>> 8 & 255, _0x1885b3 & 255);
        _0x2d945c += 8;
        _0x2d945c == 512 && (_0x3c9490 += _0x1bed6f, _0x1bed6f = "", _0x2d945c = 0);
    }

    return _0x3c9490 + _0x1bed6f;
}
function _0x29acd2_default (_0x54e97b) {
    return typeof _0x54e97b === "undefined" ? "undefined" : typeof _0x54e97b;
}
function _0x5f47f1(_0x584f6a) {
    var _0xc7b558 = typeof _0x584f6a === "undefined" ? "undefined" : (0, _0x29acd2_default)(_0x584f6a);

    if (_0xc7b558 == "string" || _0xc7b558 == "function") return "\"" + _0x584f6a["toString"]()["replace"]("\"", "\\\"") + "\"";
    if (_0xc7b558 == "number" || _0xc7b558 == "boolean") return _0x584f6a["toString"]();
    if (_0xc7b558 == "undefined") return "undefined";
    return "\"" + _0x584f6a["toString"]()["replace"]("\"", "\\\"") + "\"";
}
function _0x2a86e9(_0x197766, _0x8c7ca1) {
    for (var _0x2df0f2 = 0; _0x2df0f2 < _0x197766["length"]; _0x2df0f2++) {
        if (_0x197766[_0x2df0f2] === _0x8c7ca1) return _0x2df0f2;
    }

    return -1;
}
function _0x2638ec(_0x5d0d94) {
    var _0x4c15e2 = ["number", "boolean", "undefined", "string", "function"];
    var _0x20d6b9 = typeof _0x5d0d94 === "undefined" ? "undefined" : (0, _0x29acd2_default)(_0x5d0d94);

    if (_0x2a86e9(_0x4c15e2, _0x20d6b9) > -1) return _0x5f47f1(_0x5d0d94);

    if (_0x5d0d94 instanceof Array) {
        var _0x260fc1 = _0x5d0d94["length"],
            _0x363ac1 = [];

        for (var _0xf7e9d = 0; _0xf7e9d < _0x260fc1; _0xf7e9d++) {
            var _0x116c83 = (0, _0x29acd2_default)(_0x5d0d94[_0xf7e9d]);

            _0x2a86e9(_0x4c15e2, _0x116c83) > -1 ? _0x116c83 != "undefined" ? _0x363ac1["push"](_0x5f47f1(_0x5d0d94[_0xf7e9d])) : _0x363ac1["push"]("null") : _0x363ac1["push"](_0x2638ec(_0x5d0d94[_0xf7e9d]));
        }

        return "[" + _0x363ac1["join"](",") + "]";
    }

    if (_0x5d0d94 instanceof Object) {
        if (_0x5d0d94 == null) return "null";
        var _0x363ac1 = [];

        for (var _0x28578c in _0x5d0d94) {
            var _0x116c83 = (0, _0x29acd2_default)(_0x5d0d94[_0x28578c]);

            _0x2a86e9(_0x4c15e2, _0x116c83) > -1 ? _0x116c83 != "undefined" && _0x363ac1["push"]("\"" + _0x28578c + "\":" + _0x5f47f1(_0x5d0d94[_0x28578c])) : _0x363ac1["push"]("\"" + _0x28578c + "\":" + _0x2638ec(_0x5d0d94[_0x28578c]));
        }

        return "{" + _0x363ac1["join"](",") + "}";
    }
}
function smStringify(_0x472439, _0x5f456e) {
    var _0x395c94 = _0x2638ec(_0x472439);

    if (_0x5f456e) {
        var _0x5f15a4 = "";

        for (var _0x3c893d = 0; _0x3c893d < _0x395c94["length"]; _0x3c893d++) {
            _0x395c94["charCodeAt"](_0x3c893d) < 255 ? _0x5f15a4 += _0x395c94[_0x3c893d] : _0x5f15a4 += "\\u" + _0x395c94["charCodeAt"](_0x3c893d)["toString"](16);
        }

        _0x395c94 = _0x5f15a4;
    }

    return _0x395c94;
}
getEncryptContent = function (_0x4bac4f, _0x424239) {
    var _0x5d198e = "6fa105b8";

    var _0x38c530 = _0x424239 || _0x5d198e;

    var _0x358f06 = typeof _0x4bac4f === "string" ? true : false;

    var _0x15ecbd = _0x358f06 ? _0x4bac4f : smStringify(_0x4bac4f);

    var _0x56db43 = "";
    _0x56db43 = DES(_0x38c530, _0x15ecbd, 1, 0);
    _0x56db43 = base64Encode(_0x56db43)
    return _0x56db43;
}

getMouseAction = function (slideMouseData, realArgumentsValue, RegisterData) {
    // let timestamp = new Date().getTime();
    var _0x561681 = "slide",
        _0x4c3773 = RegisterData,
        _0x22e28c = _0x4c3773["k"],
        _0x661bb = _0x4c3773["l"],
        _0x18f6c6 = base64Decode(_0x22e28c),
        _0x392906 = DES("sshummei", _0x18f6c6, 0, 0)["substr"](0, _0x661bb),
        _0x342936 = slideMouseData,
        _0x35041f = _0x342936["mouseData"],
        _0x4c4eb6 = _0x342936["startTime"],
        _0x407a7 = _0x342936["endTime"],
        _0x22a660 = _0x342936["mouseEndX"],
        _0x8fb2df = _0x342936["trueWidth"],
        _0x4165cd = _0x342936["trueHeight"],
        _0x24ae8e = _0x342936["selectData"],
        _0x356a00 = _0x342936["blockWidth"],
        _0x3cef46 = "web_pc",
        _0x4f3e89 = {};

    switch (_0x561681) {
        case "select":
        case "icon_select":
        case "seq_select":
        case "spatial_select":
            // ol c2af468b
            _0x4f3e89[realArgumentsValue[realArgumentsValue.length - 527]] = getEncryptContent(_0x24ae8e,
                realArgumentsValue[realArgumentsValue.length - 529]),
                // yf c372a70d
                _0x4f3e89[realArgumentsValue[realArgumentsValue.length - 530]] = getEncryptContent(_0x35041f,
                    realArgumentsValue[realArgumentsValue.length - 531]),
                // od 0c19c14a
                _0x4f3e89[realArgumentsValue[realArgumentsValue.length - 532]] = getEncryptContent(_0x407a7 - _0x4c4eb6,
                    realArgumentsValue[realArgumentsValue.length - 533]),
                // el b8b24b35
                _0x4f3e89[realArgumentsValue[realArgumentsValue.length - 534]] = getEncryptContent(_0x8fb2df,
                    realArgumentsValue[realArgumentsValue.length - 535]),
                // sc b59a492a
                _0x4f3e89[realArgumentsValue[realArgumentsValue.length - 536]] = getEncryptContent(_0x4165cd,
                    realArgumentsValue[realArgumentsValue.length - 537]),
                // act.os
                _0x4f3e89[realArgumentsValue[realArgumentsValue.length - 538]] = _0x3cef46;
            break;

        case "slide":
            // vq 402d3ee0
            _0x4f3e89[realArgumentsValue[realArgumentsValue.length - 539]] = getEncryptContent(_0x22a660 / _0x8fb2df,
                realArgumentsValue[realArgumentsValue.length - 540]),
                // yf c372a70d
                _0x4f3e89[realArgumentsValue[realArgumentsValue.length - 530]] = getEncryptContent(_0x35041f,
                    realArgumentsValue[realArgumentsValue.length - 531]),
                // od 0c19c14a
                _0x4f3e89[realArgumentsValue[realArgumentsValue.length - 532]] = getEncryptContent(_0x407a7 - _0x4c4eb6,
                    realArgumentsValue[realArgumentsValue.length - 533]),
                // el b8b24b35
                _0x4f3e89[realArgumentsValue[realArgumentsValue.length - 534]] = getEncryptContent(_0x8fb2df,
                    realArgumentsValue[realArgumentsValue.length - 535]),
                // sc b59a492a
                _0x4f3e89[realArgumentsValue[realArgumentsValue.length - 536]] = getEncryptContent(_0x4165cd,
                    realArgumentsValue[realArgumentsValue.length - 537]),
                // act.os
                _0x4f3e89[realArgumentsValue[realArgumentsValue.length - 538]] = _0x3cef46;
            // vq 402d3ee0
            _0x8fb2df == 0 && (_0x4f3e89[realArgumentsValue[realArgumentsValue.length - 539]] = getEncryptContent(0,
                realArgumentList[realArgumentList.length - 540]));
            break;

        case "auto_slide":
            // vq 402d3ee0
            _0x4f3e89[realArgumentsValue[realArgumentsValue.length - 539]] = getEncryptContent(_0x22a660 / _0x8fb2df,
                realArgumentsValue[realArgumentsValue.length - 540]),
                // yf c372a70d
                _0x4f3e89[realArgumentsValue[realArgumentsValue.length - 530]] = getEncryptContent(_0x35041f,
                    realArgumentsValue[realArgumentsValue.length - 531]),
                // od 0c19c14a
                _0x4f3e89[realArgumentsValue[realArgumentsValue.length - 532]] = getEncryptContent(_0x407a7 - _0x4c4eb6,
                    realArgumentsValue[realArgumentsValue.length - 533]),
                // el b8b24b35
                _0x4f3e89[realArgumentsValue[realArgumentsValue.length - 534]] = getEncryptContent(_0x8fb2df,
                    realArgumentsValue[realArgumentsValue.length - 535]),
                // sc b59a492a
                _0x4f3e89[realArgumentsValue[realArgumentsValue.length - 536]] = getEncryptContent(_0x4165cd,
                    realArgumentsValue[realArgumentsValue.length - 537]),
                // act.os
                _0x4f3e89[realArgumentsValue[realArgumentsValue.length - 538]] = _0x3cef46;
            break;
    }

    // ag 27166be6
    return _0x4f3e89[realArgumentsValue[realArgumentsValue.length - 541]] = getEncryptContent(1,
        realArgumentsValue[realArgumentsValue.length - 544]),
        // rv b62295c4
        _0x4f3e89[realArgumentsValue[realArgumentsValue.length - 545]] = getEncryptContent(0,
            realArgumentsValue[realArgumentsValue.length - 547]),
        // yq ff570d22
        _0x4f3e89[realArgumentsValue[realArgumentsValue.length - 548]] = getEncryptContent(-1,
            realArgumentsValue[realArgumentsValue.length - 549]),
        // this["_data"]["__key"] = _0x392906,
        _0x4f3e89;
}

getResult = function(slideMouseData, realArgumentsValue, RegisterData){
    let result = {};
    // hw 5d653e60
    result[realArgumentsValue[realArgumentsValue.length - 564]] = getEncryptContent(realArgumentsValue[realArgumentsValue.length - 31],
        realArgumentsValue[realArgumentsValue.length - 565]);
    // cq 505f4c87
    result[realArgumentsValue[realArgumentsValue.length - 566]] = getEncryptContent(realArgumentsValue[realArgumentsValue.length - 828],
        realArgumentsValue[realArgumentsValue.length - 567]);
    // hi dad77b6c
    result[realArgumentsValue[realArgumentsValue.length - 568]] = getEncryptContent(realArgumentsValue[realArgumentsValue.length - 353],
        realArgumentsValue[realArgumentsValue.length - 569]);

    // ‌rversion "1.0.3"
    result[realArgumentsValue[realArgumentsValue.length - 570]] = realArgumentsValue[realArgumentsValue.length - 829];
    // ‌sdkver
    result[realArgumentsValue[realArgumentsValue.length - 571]] = realArgumentsValue[realArgumentsValue.length - 830];
    // protocol 145
    result[realArgumentsValue[realArgumentsValue.length - 572]] = realArgumentsValue[realArgumentsValue.length - 573];
    // ‌ostype
    result[realArgumentsValue[realArgumentsValue.length - 574]] = realArgumentsValue[realArgumentsValue.length - 562];

    let mouseActionData = getMouseAction(slideMouseData, realArgumentsValue, RegisterData)
    Object.keys(mouseActionData).map(function(p){
        result[p] = mouseActionData[p];
    });
    return result;
}

let RegisterData = {
    "bg": "/crb/set-000006/v2/8f62601c8cb230835d36ee6bd575f2ab_bg.jpg",
    "bg_height": 300,
    "bg_width": 600,
    "domains": [
        "castatic.fengkongcloud.cn",
        "castatic.fengkongcloud.com",
        "castatic-a.fengkongcloud.com",
        "castatic2.fengkongcloud.com"
    ],
    "fg": "/crb/set-000006/v2/8f62601c8cb230835d36ee6bd575f2ab_fg.png",
    "k": "yRF9AagskQY=",  // 每次动态更新
    "l": 8,
    "rid": "2021081016330108c33838ed0d614e11", // 每次动态更新
    "retryCount": 0
}

let realBigArgumentValue = generateRealBigArgumentValue('F:\\code\\SpiderCollection\\数美滑块\\captcha_sdk.js')
let _data = {
    mouseData: [
        [
            0,
            -16,
            0
        ],
        [
            0,
            -16,
            113
        ],
        [
            0,
            -16,
            205
        ],
        [
            0,
            -16,
            315
        ],
        [
            0,
            -16,
            408
        ],
        [
            0,
            -16,
            502
        ],
        [
            0,
            -16,
            612
        ],
        [
            0,
            -16,
            704
        ],
        [
            0,
            -16,
            814
        ],
        [
            0,
            -16,
            907
        ],
        [
            0,
            -16,
            1015
        ],
        [
            0,
            -16,
            1109
        ],
        [
            0,
            -16,
            1203
        ],
        [
            0,
            -16,
            1314
        ],
        [
            0,
            -16,
            1407
        ],
        [
            0,
            -16,
            1502
        ],
        [
            0,
            -16,
            1610
        ],
        [
            0,
            -16,
            1704
        ],
        [
            0,
            -16,
            1814
        ],
        [
            0,
            -16,
            1907
        ],
        [
            0,
            -16,
            2016
        ],
        [
            0,
            -16,
            2110
        ],
        [
            0,
            -16,
            2203
        ],
        [
            0,
            -16,
            2312
        ],
        [
            0,
            -16,
            2406
        ],
        [
            0,
            -16,
            2516
        ],
        [
            0,
            -16,
            2609
        ],
        [
            0,
            -16,
            2702
        ],
        [
            8,
            0,
            2802
        ],
        [
            11,
            0,
            2901
        ],
        [
            15,
            -1,
            3002
        ],
        [
            28,
            -2,
            3101
        ],
        [
            39,
            -3,
            3201
        ],
        [
            49,
            -3,
            3300
        ],
        [
            58,
            -3,
            3401
        ],
        [
            70,
            -3,
            3501
        ],
        [
            83,
            -3,
            3601
        ],
        [
            90,
            -1,
            3701
        ],
        [
            103,
            -1,
            3801
        ],
        [
            126,
            -1,
            3901
        ],
        [
            139,
            -1,
            4001
        ],
        [
            144,
            0,
            4102
        ],
        [
            154,
            2,
            4202
        ],
        [
            154,
            2,
            4308
        ],
        [
            154,
            2,
            4403
        ]
    ],
    startTime: 1628584396794,
    endTime: 1628584401245 ,
    mouseEndX: 154,   // 暂时不知道怎么得到的
    trueWidth: 300,   // 滑块在页面上展示的宽度
    trueHeight: 150,  // 滑块在页面上展示的高度
    selectData: [],
    blockWidth: 40, // 可能是滑块宽度的一半

}
let result = getResult(_data, realBigArgumentValue, RegisterData);
// result 中还需要补齐rid 和 organization这两个字段
// 暂时还不清楚getEncryptContent中的_0x5d198e是怎么来的
console.log(result);