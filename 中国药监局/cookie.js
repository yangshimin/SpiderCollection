var Cookie = require("cookiejar")
var CookieIns = Cookie.Cookie;

function MockCookie() {
    this.cookie_infos = [];
    this.__defineGetter__('cookie', function() {
        var cookie_str = ""
        if (this.cookie_infos.length === 0){
            return cookie_str
        }else{
            for (var item_index=0; item_index<this.cookie_infos.length;item_index++){
                cookie_str += (cookie_str ? ';' : '') + this.cookie_infos[item_index]['name'] + "=" + this.cookie_infos[item_index]['value'];
            }
            return cookie_str
        }
    });
    this.__defineSetter__('cookie', function(s) {
        var cookie = new CookieIns(s);
        if (cookie['expiration_date'] > new Date().getTime()){
            this.cookie_infos.push(cookie);
        }
    });
}
var mock = new MockCookie();
// mock.cookie = 'has_recent_activity=1; path=/; expires=Wed, 15 Dec 2021 08:18:18 GMT; secure; HttpOnly; SameSite=Lax';
// mock.cookie = 'favorite_food=tripe';
module.exports = {
    mock
}