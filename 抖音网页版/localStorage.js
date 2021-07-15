// http://www.rajdeepd.com/articles/chrome/localstrg/LocalStorageSample.htm

// NOTE:
// this varies from actual localStorage in some subtle ways

// also, there is no persistence
// TODO persist
(function () {
    "use strict";

    var db;
    function allKeyLength(obj, ignoreKey){
        var existsLength = 0;
        Object.keys(obj).forEach(function (key) {
            if (key !== ignoreKey){
                existsLength += obj[key].length;
            }
        });
        return existsLength
    }

    function LocalStorage() {
    }
    db = LocalStorage;

    db.prototype.getItem = function getItem(key) {
        if (this.hasOwnProperty(key)) {
            return String(this[key]);
        }
        return null;
    };

    db.prototype.setItem = function setItem(key, val) {
        // window.localStorage 和 window.sessionStorage都有内存限制
        let existsLength = allKeyLength(this, key);
        if (typeof val === 'string' && (existsLength + val.length) >= 5242880){
            throw {
                "name": "QuotaExceededError",
                "message": "DOMException: Failed to execute 'setItem' on 'Storage': Setting the value of 'test' exceeded the quota.",
                "stack": ""
            }
        }
        this[key] = String(val);
    };

    db.prototype.removeItem = function removeItem(key) {
        delete this[key];
    };

    db.prototype.clear = function clear() {
        var self = this;
        Object.keys(self).forEach(function (key) {
            self[key] = undefined;
            delete self[key];
        });
    };

    db.prototype.key = function key(i) {
        i = i || 0;
        return Object.keys(this)[i];
    };

    db.prototype.__defineGetter__('length', function () {
        return Object.keys(this).length;
    });

    if (global.localStorage) {
        module.exports = localStorage;
    } else {
        module.exports = new LocalStorage();
    }
}());