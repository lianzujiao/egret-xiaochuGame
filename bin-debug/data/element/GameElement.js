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
var GameElement = (function (_super) {
    __extends(GameElement, _super);
    function GameElement() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 0; //地图上可用游戏元素的id
        _this.location = 0; //游戏元素位置0~63
        return _this;
    }
    return GameElement;
}(BaseElement));
__reflect(GameElement.prototype, "GameElement");
//# sourceMappingURL=GameElement.js.map