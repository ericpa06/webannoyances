/// disable-pageview-api.js
// Based on: https://addons.mozilla.org/firefox/addon/disable-page-visibility/
// License:  http://www.opensource.org/licenses/bsd-license.php
(function(){
alert("blocker.js is running via uBlock Origin right now!");
// visibilitychange events are captured and stopped 
document.addEventListener("visibilitychange", function(e) {
    e.stopImmediatePropagation();
}, true);
// document.visibilityState always returns false
Object.defineProperty(Document.prototype, "hidden", {
    get: function hidden() {
        return false;
    },
    enumerable: true,
    configurable: true
});
// document.visibilityState always returns "visible"
Object.defineProperty(Document.prototype, "visibilityState", {
    get: function visibilityState() {
        return "visible";
    },
    enumerable: true,
    configurable: true
});
})()
