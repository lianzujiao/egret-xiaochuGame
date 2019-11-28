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
var LevelElementView = (function (_super) {
    __extends(LevelElementView, _super);
    function LevelElementView() {
        var _this = _super.call(this) || this;
        _this.eleType = ""; //元素类型
        _this.init();
        return _this;
    }
    Object.defineProperty(LevelElementView.prototype, "num", {
        get: function () {
            return Number(this.bittext.text);
        },
        set: function (val) {
            if (val <= 0) {
                //已经没了，显示对号
                if (!this.checkmarkbit) {
                    this.checkmarkbit = new egret.Bitmap();
                    this.checkmarkbit.texture = RES.getRes("checkMark_png");
                    this.checkmarkbit.x = (this.bitmap.width - this.checkmarkbit.width) / 2;
                    this.checkmarkbit.y = this.bitmap.height + this.bitmap.y - this.checkmarkbit.height;
                    this.addChild(this.checkmarkbit);
                    this.removeChild(this.bittext);
                }
            }
            else {
                this.bittext.text = val.toString();
                this.bittext.size = 40,
                    this.bittext.textColor = 0xff0000;
            }
        },
        enumerable: true,
        configurable: true
    });
    LevelElementView.prototype.init = function () {
        this.touchChildren = false;
        if (!this.bitmap) {
            this.bitmap = new egret.Bitmap();
        }
        var bitWidth = (GameData.stageW - 40) / GameData.MaxColumn;
        this.bitmap.width = bitWidth;
        this.bitmap.height = bitWidth;
        this.addChild(this.bitmap);
        this.bittext = new egret.TextField();
        this.bittext.text = "0";
        this.bittext.x = (bitWidth - this.bittext.width) / 2;
        this.bittext.y = this.bitmap.height + this.bitmap.y - this.bittext.height / 2;
        this.addChild(this.bittext);
    };
    LevelElementView.prototype.setTexture = function (val) {
        this.bitmap.texture = RES.getRes(val);
    };
    return LevelElementView;
}(egret.Sprite));
__reflect(LevelElementView.prototype, "LevelElementView");
//# sourceMappingURL=LevelElementView.js.map