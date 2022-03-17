function te(n) {
    if ((void 0 === n ? "undefined" : typeof n) !== 'undefined')
        return On(n)
}
function On(n) {
    n = "" + n;
    for (var t = xl, e = 0; e < n.length; e++) {
        t = (t << 5) - t + n.charCodeAt(e),
            t |= 0
    }
    return ct(t)
}
function ct(n) {
    return n |= 0,
    n < 0 && (n += 4294967296),
        n.toString(16)
}


data = {
    "PX10249": te(window.console.log), // '64556c77'
    "PX10238": "",
    "PX10995": te(Object.prototype.toString),
    "PX10567": te(navigator.toString),
    "PX11192": On("" + (Object.getOwnPropertyDescriptor(Object.getPrototypeOf(navigator), 'webdriver').get || "") + (n.value || ""))


}

console.log(data)