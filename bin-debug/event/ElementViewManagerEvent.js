var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ElementViewManagerEvent = (function (_super) {
    __extends(ElementViewManagerEvent, _super);
    function ElementViewManagerEvent(type, buble, cancellable) {
        if (buble === void 0) { buble = false; }
        if (cancellable === void 0) { cancellable = false; }
        var _this = _super.call(this, type, buble, cancellable) || this;
        _this.propElementLocation = 0; //携带道具点击的元素位置
        _this.ele1 = 0; //第一个点击的元素的id
        _this.ele2 = 0; //第二个点击的元素的id
        return _this;
    }
    ElementViewManagerEvent.TAP_TWO_ELEMENT = "tap_two_element";
    ElementViewManagerEvent.REMOVE_ANIMATION_OVER = "remove_animation_over";
    ElementViewManagerEvent.UPDATE_MAP = "update_map";
    ElementViewManagerEvent.UPDATE_VIEW_OVER = "update_view_over";
    ElementViewManagerEvent.USE_PROP_CLICK = "use_prop_click";
    return ElementViewManagerEvent;
}(egret.Event));
__reflect(ElementViewManagerEvent.prototype, "ElementViewManagerEvent");
//# sourceMappingURL=ElementViewManagerEvent.js.map