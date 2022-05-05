dta = {}
dta.listeners = {}

var EventTarget = function() {
};
EventTarget.toString = function toString(){return 'function EventTarget() { [native code] }'}

EventTarget.prototype.listeners = null;
EventTarget.prototype.addEventListener = function(type, callback) {
    if(!(type in dta.listeners)) {
        dta.listeners[type] = [];
    }
    dta.listeners[type].push(callback);
};

EventTarget.prototype.removeEventListener = function(type, callback) {
    if(!(type in dta.listeners)) {
        return;
    }
    var stack = dta.listeners[type];
    for(var i = 0, l = stack.length; i < l; i++) {
        if(stack[i] === callback){
            stack.splice(i, 1);
            return this.removeEventListener(type, callback);
        }
    }
};

EventTarget.prototype.dispatchEvent = function(event) {
    if(!(event.type in dta.listeners)) {
        return;
    }
    var stack = dta.listeners[event.type];
    event.target = this;
    for(var i = 0, l = stack.length; i < l; i++) {
        stack[i].call(this, event);
    }
};

module.exports = {
    EventTarget
}