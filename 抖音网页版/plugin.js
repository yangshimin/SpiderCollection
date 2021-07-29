// var PLUGIN = [
//     {
//         'description':"Portable Document Format",
//         'filename':"internal-pdf-viewer",
//         'length':1,
//         'name':"Chrome PDF Plugin",
//         '0':
//             {
//                 "description":"Portable Document Format",
//                 "enabledPlugin":{},
//                 "type":"application/x-google-chrome-pdf",
//                 "suffixes":"pdf"
//             }
//
//     },
//     {
//         'description':"",
//         'filename':"mhjfbmdgcfjbbpaeojofohoefgiehjai",
//         'length':1,
//         'name':"Chrome PDF Viewer",
//         "0":
//             {
//                 'description':"",
//                 "type":"application/pdf",
//                 "suffixes":"pdf",
//                 "enabledPlugin":{},
//             }
//     },
//     {
//         'description':"",
//         'filename':"internal-nacl-plugin",
//         'length':1,
//         'name':"Native Client",
//         "0":
//             {
//                 "description":"Native Client Executable",
//                 "type":"application/x-nacl",
//                 "suffixes":"",
//                 "enabledPlugin":{},
//             }
//         ,
//         "1":{
//             "description":"Portable Native Client Executable",
//             "type":"application/x-pnacl",
//             "suffixes":"",
//             "enabledPlugin":{},
//         }
//
//
//     }
// ];
//
// (function (plugins) {
//     "use strict";
//
//     var db;
//
//     function Plugin() {
//         return plugins
//     }
//     db = Plugin;
//     let p = null
//
//     db.prototype.toString = function(){
//         return '[object PluginArray]'
//     };
//
//     db.prototype.item = function(index) {
//         if (arguments.length < 1) {
//             throw new TypeError(
//                 "Failed to execute 'item' on 'Plugin': 1 argument required, but only " + arguments.length + " present."
//             );
//         }
//         if (index === 4294967296) {
//             index = 0
//         }
//         p = plugins[index]
//         return p
//     }
//
//     db.prototype.namedItem = function(name) {
//         return undefined
//     }
//
//     db.prototype.name = function() {
//         return p.name;
//     }
//
//     db.prototype.description = function() {
//         return p.description;
//     }
//
//     db.prototype.filename = function() {
//         return p.filename;
//     }
//     db.prototype.toString = function (){
//         return "[object PluginArray]"
//     }
//     db.prototype.refresh = function (){}
//
//     db.prototype.__defineGetter__('length', function () {
//         return Object.keys(plugins).length;
//     });
//
//     if (global.plugin) {
//         module.exports = plugin;
//     } else {
//         module.exports = new Plugin();
//     }
// }(PLUGIN));


class PluginArray{
    constructor() {
        this.p = null
        this.plugins = [
    {
        'description':"Portable Document Format",
        'filename':"internal-pdf-viewer",
        'length':1,
        'name':"Chrome PDF Plugin",
        '0':
            {
                "description":"Portable Document Format",
                "enabledPlugin":{},
                "type":"application/x-google-chrome-pdf",
                "suffixes":"pdf"
            }

    },
    {
        'description':"",
        'filename':"mhjfbmdgcfjbbpaeojofohoefgiehjai",
        'length':1,
        'name':"Chrome PDF Viewer",
        "0":
            {
                'description':"",
                "type":"application/pdf",
                "suffixes":"pdf",
                "enabledPlugin":{},
            }
    },
    {
        'description':"",
        'filename':"internal-nacl-plugin",
        'length':1,
        'name':"Native Client",
        "0":
            {
                "description":"Native Client Executable",
                "type":"application/x-nacl",
                "suffixes":"",
                "enabledPlugin":{},
            }
        ,
        "1":{
            "description":"Portable Native Client Executable",
            "type":"application/x-pnacl",
            "suffixes":"",
            "enabledPlugin":{},
        }


    }
];

    }

    static isNumber(val) {
        var regPos = /^\d+(\.\d+)?$/;//非负浮点数
        var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;//负浮点数
        if(regPos.test(val) || regNeg.test(val)) {
            return true;
        }else {
            return false;
        }
    }

    item(index){
        if (index === 4294967296) {
            index = 0
        }
        this.p = this.plugins[index]
        return this.p
    }

    namedItem = function(name) {
        this.p.keys().map(function (k) {
            if (this.isNumber(k)){
                if (this.p.k.type === name){
                    return this.p.k
                }else{
                    return null
                }
            }

        })
    }

    name = function() {
        return this.p.name;
    }

    description = function() {
        return this.p.description;
    }

    filename = function() {
        return this.p.filename;
    }
    toString = function (){
        return "[object PluginArray]"
    }
    refresh = function (){}
}

plugins = new PluginArray()
console.log(plugins.item(0))
console.log(plugins.item(0).name)
console.log(plugins.item(0).description)
console.log(plugins.item(0).filename)
console.log(plugins.toString())
console.log(plugins.item(0).namedItem('application/x-google-chrome-pdf'))
