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
var PropView = (function (_super) {
    __extends(PropView, _super);
    function PropView(type) {
        var _this = _super.call(this) || this;
        _this._type = -1; //道具类型
        _this.id = -1; //道具id
        _this._num = 0; //数量
        _this._type = type;
        _this.init();
        return _this;
    }
    Object.defineProperty(PropView.prototype, "proptype", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    PropView.prototype.init = function () {
        this.createView();
        this.createNumText();
        this.addChild(this._view_activate);
        this.addChild(this._view_box);
        this.addChild(this._numText);
        this.setActivateState(true);
    };
    //设置道具的可用数量
    PropView.prototype.createNumText = function () {
        this._numText = new egret.TextField();
        this._numText.x = this._view_activate.width - 31;
        this._numText.textColor = 0xff0000;
        this._numText.size = 40;
    };
    //
    PropView.prototype.createView = function () {
        var _interval = 15;
        var _width = (GameData.stageW - _interval * 6) / 5;
        if (!this._view_activate) {
            this._view_activate = new egret.Bitmap();
            this._view_activate.texture = RES.getRes(this.getActivateTexture(this._type));
            this._view_activate.width = _width;
            this._view_activate.height = _width;
        }
        if (!this._view_box) {
            this._view_box = new egret.Bitmap();
            this._view_box.texture = RES.getRes("propbox_png"); //道具盒子图片
            this._view_box.width = this._view_activate.width + 10;
            this._view_box.height = this._view_activate.height + 10;
            this._view_box.x = -5;
            this._view_box.y = -5;
        }
    };
    Object.defineProperty(PropView.prototype, "num", {
        /**
         * 获取各个道具的可使用数量
         */
        get: function () {
            return this._num;
        },
        /**
         * 设置道具的数量
         */
        set: function (val) {
            this._num = val;
            this._numText.text = val.toString();
            if (val <= 0) {
                this.setActivateState(false);
            }
            else {
                this.setActivateState(true);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @val 是否为可激活状态，激活状态调用彩色图片
     */
    PropView.prototype.setActivateState = function (val) {
        this.touchEnabled = val;
        if (val) {
            this._view_activate.texture = RES.getRes(this.getActivateTexture(this._type)); //彩色图片
            this._view_box.texture = RES.getRes("propbox_png");
        }
        else {
            this._view_activate.texture = RES.getRes(this.getDisableTexture(this._type)); //灰色图片
            this._view_box.texture = RES.getRes("propboxdisable_png");
        }
    };
    //可使用状态时是彩色图片
    PropView.prototype.getActivateTexture = function (type) {
        var textureRename = "";
        switch (type) {
            case 0:
                textureRename = "tongse_png";
                break;
            case 1:
                textureRename = "zhadan_png";
                break;
            case 2:
                textureRename = "zhenghang_png";
                break;
            case 3:
                textureRename = "zhenglie_png";
                break;
            case 4:
                textureRename = "chanzi_png";
                break;
        }
        return textureRename;
    };
    /**
     * 道具数量小于0时图片为灰色的
     */
    PropView.prototype.getDisableTexture = function (type) {
        var textureRename = "";
        switch (type) {
            case 0:
                textureRename = "tongsedisable_png";
                break;
            case 1:
                textureRename = "zhadandisable_png";
                break;
            case 2:
                textureRename = "zhenghangdisable_png";
                break;
            case 3:
                textureRename = "zhengliedisable_png";
                break;
            case 4:
                textureRename = "chanzidisable_png";
                break;
        }
        return textureRename;
    };
    PropView.prototype.setFocus = function (val) {
        if (val) {
            this._view_box.texture = RES.getRes("propboxactive_png");
        }
        else {
            this._view_box.texture = RES.getRes("propbox_png");
        }
    };
    return PropView;
}(egret.Sprite));
__reflect(PropView.prototype, "PropView");
//# sourceMappingURL=PropView.js.map