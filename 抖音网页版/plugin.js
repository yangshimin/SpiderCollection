function isNumber(val) {
    if (typeof val === 'symbol') return
    var regPos = /^\d+(\.\d+)?$/;//非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;//负浮点数
    if(regPos.test(val) || regNeg.test(val)) {
        return true;
    }else {
        return false;
    }
}

const makeFnsNative = (fns = []) => {
    const oldCall = Function.prototype.call
    function call () {
        return oldCall.apply(this, arguments)
    }
    // eslint-disable-next-line
    Function.prototype.call = call

    const nativeToStringFunctionString = Error.toString().replace(
        /Error/g,
        'toString'
    )
    const oldToString = Function.prototype.toString

    function functionToString () {
        for (const fn of fns) {
            if (this === fn) {
                return `function ${fn.name}() { [native code] }`
            }
        }

        if (this === functionToString) {
            return nativeToStringFunctionString
        }
        return oldCall.call(oldToString, this)
    }
    // eslint-disable-next-line
    Function.prototype.toString = functionToString
}


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

        this.plugins.map(function (p) {
            p.namedItem = function (name) {
                for (let k in Object.keys(p)){
                    if (isNumber(k)){
                        if (p[k].type === name){
                            return p[k]
                        }
                    }
                }
                return null
            }
        })
    }
    get[Symbol.toStringTag](){
        return 'PluginArray'
    }

    item(index){
        if (index === 4294967296) {
            index = 0
        }
        this.p = this.plugins[index]
        return this.p
    }

    refresh = function (){}

}
PluginArray.prototype.__defineGetter__('length', function () {
    return Object.keys(this.plugins).length;
});

proxy = function (object_) {
    return new Proxy(object_, {
        get(target, property, receiver) {
            if (typeof property !== "symbol" && isNumber(property)){
                return target.plugins[property]
            }
            return target[property];
        }
    });
};

plugins = new PluginArray()
plugins = proxy(plugins)
makeFnsNative([plugins.item, plugins.refresh])

console.log(plugins.item.toString())   // 期望返回的是 'function item() { [native code] }'
// console.log(plugins instanceof PluginArray)
// console.log(Object.prototype.toString.call(plugins))
// console.log(plugins.length)
// console.log(plugins[0])
// console.log(plugins.item(0))
// console.log(plugins.item(0).name)
// console.log(plugins.item(0).description)
// console.log(plugins.item(0).filename)
// console.log(plugins.toString())
// console.log(plugins.item(0).namedItem('application/x-google-chrome-pdf'))
// console.log(plugins.item(2).namedItem('application/x-pnacl'))

module.exports = {
    PluginArray,
    plugins
}