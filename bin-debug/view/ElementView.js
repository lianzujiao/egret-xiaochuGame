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
var ElementView = (function (_super) {
    __extends(ElementView, _super);
    function ElementView(tparent) {
        var _this = _super.call(this) || this;
        _this.location = 0; //位置编号，用于提供移动使用
        _this._id = -1;
        /*-------------------------------------------------------------------------------*/
        /*焦点管理相关*/
        _this._focus = false;
        /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
        /*------------------------------移动到新位置，乱序操作使用-----------------------*/
        _this.speed = 700;
        _this.thisparent = tparent;
        _this.init();
        return _this;
    }
    Object.defineProperty(ElementView.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (val) {
            this._id = val;
        },
        enumerable: true,
        configurable: true
    });
    //初始化所有数据
    ElementView.prototype.init = function () {
        this.touchEnabled = true;
        this.touchChildren = false;
        this.bitmap = new egret.Bitmap();
        var bitwidth = (GameData.stageW - 40) / GameData.MaxColumn;
        this.bitmap.width = bitwidth - 10;
        this.bitmap.height = bitwidth - 10;
        this.bitmap.x = -1 * bitwidth / 2;
        this.bitmap.y = -1 * bitwidth / 2;
        this.addChild(this.bitmap);
    };
    //设置贴图
    ElementView.prototype.setTexture = function (val) {
        this.bitmap.texture = RES.getRes(val);
    };
    Object.defineProperty(ElementView.prototype, "focus", {
        get: function () {
            return this._focus;
        },
        enumerable: true,
        configurable: true
    });
    //设置选中状态的焦点模式
    ElementView.prototype.setfocus = function (val) {
        if (val != this._focus) {
            var tw = egret.Tween.get(this);
            tw.to({ scaleX: 1.2, scaleY: 1.2 }, 300, egret.Ease.cubicOut);
        }
        else {
            var tw = egret.Tween.get(this);
            tw.to({ scaleX: 1.0, scaleY: 1.0 }, 300, egret.Ease.cubicOut);
            console.log("选中了");
        }
    };
    //移动到新位置，使用cubicInOut算法移动，直线运动
    ElementView.prototype.move = function () {
        var tw = egret.Tween.get(this);
        tw.to({ x: this.targetX(), y: this.targetY() }, this.speed, egret.Ease.cubicInOut);
    };
    /*显示元素，从上方掉落*/
    /*掉落后添加到父级别显示列表*/
    ElementView.prototype.show = function (wait) {
        var tw = egret.Tween.get(this);
        tw.wait(wait, false);
        tw.call(this.addThisToParent, this);
        tw.to({ x: this.targetX(), y: this.targetY() }, this.speed, egret.Ease.bounceOut);
    };
    ElementView.prototype.addThisToParent = function () {
        if (!this.parent) {
            this.thisparent.addChild(this);
        }
    };
    ElementView.prototype.targetX = function () {
        var girdwidth = (GameData.stageW - 40) / GameData.MaxColumn;
        var xx = 20 + girdwidth * (this.location % GameData.MaxColumn) + girdwidth / 2 + 5;
        return xx;
    };
    ElementView.prototype.targetY = function () {
        var girdwidth = (GameData.stageW - 40) / GameData.MaxColumn;
        var startY = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - girdwidth * GameData.MaxColumn;
        var yy = startY + girdwidth * (Math.floor(this.location / 8)) + girdwidth / 2 + 5;
        return yy;
    };
    /*移动并返回*/
    /*用于用户交换两个对象，但未找到能够连续消除的时候使用*/
    //移动到另外一个位置，然后再移动回来
    ElementView.prototype.moveAndBack = function (location, isscale) {
        if (isscale === void 0) { isscale = false; }
        var girdwidth = (GameData.stageW - 40) / GameData.MaxColumn;
        var xx = 20 + girdwidth * (location % GameData.MaxColumn) + girdwidth / 2 + 5;
        var startY = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - girdwidth * GameData.MaxColumn;
        var yy = startY + girdwidth * (Math.floor(location / 8)) + girdwidth / 2 + 5;
        //移动时候，不仅会移动位置，还会放大会缩小，移动回来时，scale都设置为1
        var tw = egret.Tween.get(this);
        if (isscale) {
            tw.to({ x: xx, y: yy, scaleX: 1.2, scaleY: 1.2 }, 300, egret.Ease.cubicOut).call(this.back, this);
        }
        else {
            tw.to({ x: xx, y: yy, scaleX: 0.8, scaleY: 0.8 }, 300, egret.Ease.cubicOut).call(this.back, this);
        }
    };
    ElementView.prototype.back = function () {
        var tw = egret.Tween.get(this);
        tw.to({ x: this.targetX(), y: this.targetY(), scaleX: 1, scaleY: 1 }, 300, egret.Ease.cubicOut);
    };
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
    /*-----------------------------此动画用于移动元素，然后消除-----------------------------------*/
    //移动到另外一个位置，然后再返回原始的scale
    ElementView.prototype.moveAndScale = function (location, isscale) {
        if (isscale === void 0) { isscale = false; }
        var girdwidth = (GameData.stageW - 40) / GameData.MaxColumn;
        var xx = 20 + girdwidth * (location % GameData.MaxColumn) + girdwidth / 2 + 5;
        var startY = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - girdwidth * GameData.MaxColumn;
        var yy = startY + girdwidth * (Math.floor(location / 8)) + girdwidth / 2 + 5;
        var tw = egret.Tween.get(this);
        if (isscale) {
            tw.to({ x: xx, y: yy, scaleX: 1.4, scaleY: 1.4 }, 300, egret.Ease.cubicOut).call(this.backScale, this);
        }
        else {
            tw.to({ x: xx, y: yy, scaleX: 0.6, scaleY: 0.6 }, 300, egret.Ease.cubicOut).call(this.backScale, this);
        }
    };
    ElementView.prototype.backScale = function () {
        var tw = egret.Tween.get(this);
        tw.to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut).call(this.canRemove, this);
    };
    ElementView.prototype.canRemove = function () {
        var evt = new ElementViewManagerEvent(ElementViewManagerEvent.REMOVE_ANIMATION_OVER);
        this.dispatchEvent(evt);
    };
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
    /*----------------此动画用于将元素移动到关卡积分位置，然后移除显示列表-----------------------------------*/
    //播放曲线动画
    ElementView.prototype.playCurveMove = function (tx, ty) {
        var tw = egret.Tween.get(this);
        tw.to({ x: tx, y: ty }, 700, egret.Ease.quadOut).call(this.overCurveMove, this);
    };
    ElementView.prototype.overCurveMove = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        var evt = new ElementViewManagerEvent(ElementViewManagerEvent.UPDATE_MAP);
        this.dispatchEvent(evt);
    };
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
    /*-----------------------------删除元素，当元素不属于关卡条件时，执行此动画--------------------------*/
    //播放直接消除动画，自己放大，然后缩回到原有大小，然后删除
    ElementView.prototype.playRemoveAni = function () {
        var tw = egret.Tween.get(this);
        tw.to({ scaleX: 1.4, scaleY: 1.4 }, 300, egret.Ease.cubicInOut).to({ scaleX: 0.1, scaleY: 0.1 }, 300, egret.Ease.cubicInOut).call(this.removeAniCall, this);
    };
    ElementView.prototype.removeAniCall = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        var evt = new ElementViewManagerEvent(ElementViewManagerEvent.UPDATE_MAP);
        this.dispatchEvent(evt);
    };
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
    /*-------------------------------移动到新位置，方块被消除后重新生成下落使用---------------------------*/
    //根据列编号，重新计算元素X轴位置，从起始Y轴开始播放下落动画
    ElementView.prototype.moveNewLocation = function () {
        if (!this.parent) {
            var girdwidth = (GameData.stageW - 40) / GameData.MaxColumn;
            var startY = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - girdwidth * GameData.MaxColumn;
            this.y = startY - this.width;
            this.scaleX = 1;
            this.scaleY = 1;
            this.x = this.targetX();
            this.thisparent.addChild(this);
        }
        egret.Tween.get(this).to({ x: this.targetX(), y: this.targetY() }, this.speed, egret.Ease.bounceOut).call(this.moveNewLocationOver, this);
    };
    ElementView.prototype.moveNewLocationOver = function () {
        var evt = new ElementViewManagerEvent(ElementViewManagerEvent.UPDATE_VIEW_OVER);
        this.dispatchEvent(evt);
    };
    return ElementView;
}(egret.Sprite));
__reflect(ElementView.prototype, "ElementView");
//# sourceMappingURL=ElementView.js.map