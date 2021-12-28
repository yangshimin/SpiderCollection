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
        // return oldCall.call(oldToString, this)
        return this.toString.name.indexOf(this.name) !== -1 ? `function ${this.name}() { [native code] }`:oldCall.call(oldToString, this)
    }
    // eslint-disable-next-line
    Function.prototype.toString = functionToString
}


class MimeTypeArray{
    constructor() {
        this.p = null
        this.mimetypes = [
            {
                'description':"",
                'suffixes': "pdf",
                'type': "application/pdf",
                'enabledPlugin': {
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
                }
            },
            {
                "description": "Portable Document Format",
                "suffixes": "pdf",
                "type": "application/x-google-chrome-pdf",
                "enabledPlugin": {
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

                }
            },
            {
                "description": "Native Client Executable",
                "suffixes": "",
                "type": "application/x-nacl",
                "enabledPlugin": {
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
            },
            {
                "description": "Portable Native Client Executable",
                "suffixes": "",
                "type": "application/x-pnacl",
                "enabledPlugin": {
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
            }
        ];
        this.mimetypes.map(function (p){
            MimeTypeArray.prototype.__defineGetter__(p.type, function () {
                return p;
            })
        });
        MimeTypeArray.prototype.__defineGetter__('length', function () {
            return Object.keys(this.mimetypes).length;
        });
    }
    get[Symbol.toStringTag](){
        return 'MimeTypeArray'
    }

    namedItem(name){
        for (var i=0; i<=this.mimetypes.length; i++) {
            if (this.mimetypes[i].type === name){
                return this.mimetypes[i]
            }

        }
    }

    item(index){
        if (index === 4294967296) {
            index = 0
        }
        this.p = this.mimetypes[index]
        return this.p
    }

    refresh = function (){}

}


proxy = function (object_) {
    return new Proxy(object_, {
        get(target, property, receiver) {
            if (typeof property !== "symbol" && isNumber(property)){
                return target.mimetypes[property]
            }
            return target[property];
        }
    });
};

mimetypes = new MimeTypeArray()
mimetypes = proxy(mimetypes)
makeFnsNative([mimetypes.item, mimetypes.refresh])


// console.log(mimetypes['application/x-nacl'])
// console.log(mimetypes.item.toString())
// console.log(mimetypes instanceof MimeTypeArray)
// console.log(Object.prototype.toString.call(mimetypes))
// console.log(mimetypes.length)
// console.log(mimetypes[0])
// console.log(mimetypes.item(0))
// console.log(mimetypes.toString())
// console.log(mimetypes.namedItem('application/x-google-chrome-pdf'))
// console.log(mimetypes.namedItem('application/x-pnacl'))

module.exports = {
    MimeTypeArray,
    mimetypes
}