navigator = {}
var p = Object.create({});
Object.defineProperty(p,'level',{enumerable: true, configurable: true, get: ()=> 1});
Object.defineProperty(p,'charging',{get: ()=> true});
Object.defineProperty(p,'chargingTime',{get: ()=> 0});
Object.defineProperty(p,'dischargingTime',{get: ()=> Infinity});

Object.defineProperty(p,'onchargingchange',{get: ()=> null});
Object.defineProperty(p,'onchargingtimechange',{get: ()=> null});
Object.defineProperty(p,'ondischargingtimechange',{get: ()=> null});
Object.defineProperty(p,'onlevelchange',{get: ()=> null});
// Object.defineProperty(navigator, "getBattery", {
//     value: () => { return Promise.resolve(p)
//     }
// });

navigator = {
    getBattery: function (){return Promise.resolve(p)}
}

navigator.getBattery().then(function(battery) {
    console.log(battery.level)
});