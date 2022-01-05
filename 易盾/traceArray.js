traceArray = [
    {isTrusted: true, absolute:false, alpha:null, beta:null, bubbles:false, eventPhase:0, timeStamp: 2139.7999999523163, type: "deviceorientation"}
]

var contains = [];
var contains_item = {};
let func = function(item, index, arr){
    let insType = typeof obj[item]
    if (insType === "string" || insType === "number" || insType === "boolean"){
        contains_item[item] = obj[item];
    }
}

let getAllKey = function(item){
    let keyList = [];
    for(var key in item){
        keyList.push(key);
    }
    return keyList
}

for (var iiii = 0; iiii <window.traceArray.length; iiii++){
    var obj = window.traceArray[iiii]
    getAllKey(obj).forEach(func);
    contains.push(contains_item);
    contains_item = {}
}
console.log(contains)