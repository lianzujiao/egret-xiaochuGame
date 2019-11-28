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
/**
 *
 * @author
 *
 */
var ElementViewManager = (function (_super) {
    __extends(ElementViewManager, _super);
    function ElementViewManager(elementLayer) {
        var _this = _super.call(this) || this;
        /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
        /**
         * 焦点相关控制
         * */
        _this._currentTapID = -1;
        /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
        /*=====================================动画播放控制================================*/
        _this.removenum = 0;
        _this.moveeleNum = 0;
        /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
        /*==========================更新整个地图元素位置========================*/
        _this.moveLocElementNum = 0;
        _this._layer = elementLayer;
        _this.init();
        return _this;
    }
    //初始化所有数据变量
    ElementViewManager.prototype.init = function () {
        this.elementviews = new Array();
        var l = GameData.MaxColumn * GameData.MaxRow;
        var el;
        for (var i = 0; i < l; i++) {
            el = new ElementView(this._layer);
            el.id = i;
            el.location = GameData.elements[i].location;
            this.elementviews.push(el);
            el.addEventListener(ElementViewManagerEvent.REMOVE_ANIMATION_OVER, this.removeAniOver, this);
            el.addEventListener(egret.TouchEvent.TOUCH_TAP, this.elTap, this);
            el.addEventListener(ElementViewManagerEvent.UPDATE_MAP, this.updateMap, this);
            el.addEventListener(ElementViewManagerEvent.UPDATE_VIEW_OVER, this.moveNewLocationOver, this);
        }
    };
    //元素被点击响应时间
    //判断当前元素焦点状态，是否需要改变，如果存在两个焦点，则触发TAP_TWO_ELEMENT,通知上层逻辑
    ElementViewManager.prototype.elTap = function (evt) {
        if (PropViewManager.proptype == -1) {
            if (evt.currentTarget instanceof ElementView) {
                var ev = evt.currentTarget;
                if (this._currentTapID != -1) {
                    if (ev.id == this._currentTapID) {
                        ev.setfocus(false);
                        this._currentTapID = -1;
                    }
                    else {
                        ev.setfocus(true);
                        var event = new ElementViewManagerEvent(ElementViewManagerEvent.TAP_TWO_ELEMENT);
                        event.ele1 = this._currentTapID;
                        event.ele2 = ev.id;
                        this.dispatchEvent(event);
                    }
                }
                else {
                    ev.setfocus(true);
                    this._currentTapID = ev.id;
                }
            }
        }
        else {
            if (this._currentTapID != -1) {
                this._currentTapID = -1;
            }
            var evts = new ElementViewManagerEvent(ElementViewManagerEvent.USE_PROP_CLICK);
            evts.propElementLocation = evt.currentTarget.location;
            this.dispatchEvent(evts);
        }
    };
    //设置焦点，将旧焦点取消，设置新对象焦点
    ElementViewManager.prototype.setNewElementFocus = function (location) {
        this.elementviews[this._currentTapID].setfocus(false);
        this.elementviews[location].setfocus(true);
        this._currentTapID = location;
    };
    /*播放交互动画，交换后再返回*/
    //可以交换，但交换后没有发生位置移动
    //移除焦点
    //播放一个交换的动画，然后两个位置再换回来
    ElementViewManager.prototype.changeLocationAndBack = function (id1, id2) {
        if (this.elementviews[id1].focus) {
            this.elementviews[id1].setfocus(false);
            if (this._layer.getChildIndex(this.elementviews[id1]) < this._layer.getChildIndex(this.elementviews[id2])) {
                this._layer.swapChildren(this.elementviews[id1], this.elementviews[id2]);
            }
            this.elementviews[id1].moveAndBack(this.elementviews[id2].location, true);
            this.elementviews[id2].moveAndBack(this.elementviews[id1].location);
        }
        else {
            this.elementviews[id2].setfocus(false);
            if (this._layer.getChildIndex(this.elementviews[id1]) > this._layer.getChildIndex(this.elementviews[id2])) {
                this._layer.swapChildren(this.elementviews[id1], this.elementviews[id2]);
            }
            this.elementviews[id1].moveAndBack(this.elementviews[id2].location);
            this.elementviews[id2].moveAndBack(this.elementviews[id1].location, true);
        }
        this._currentTapID = -1;
    };
    /*播放删除动画*/
    /**
     * 播放删除动画
     */
    ElementViewManager.prototype.changeLocationAndScale = function (id1, id2) {
        if (this.elementviews[id1].focus) {
            this.elementviews[id1].setfocus(false);
            if (this._layer.getChildIndex(this.elementviews[id1]) < this._layer.getChildIndex(this.elementviews[id2])) {
                this._layer.swapChildren(this.elementviews[id1], this.elementviews[id2]);
            }
            this.elementviews[id1].moveAndScale(this.elementviews[id2].location, true);
            this.elementviews[id2].moveAndScale(this.elementviews[id1].location);
        }
        else {
            this.elementviews[id2].setfocus(false);
            if (this._layer.getChildIndex(this.elementviews[id1]) > this._layer.getChildIndex(this.elementviews[id2])) {
                this._layer.swapChildren(this.elementviews[id1], this.elementviews[id2]);
            }
            this.elementviews[id1].moveAndScale(this.elementviews[id2].location);
            this.elementviews[id2].moveAndScale(this.elementviews[id1].location, true);
        }
        this._currentTapID = -1;
    };
    /*显示所有元素，并播放出场动画*/
    /**
     * 显示所有元素，并播放出场动画
     * 关卡开始时执行
     */
    ElementViewManager.prototype.showAllElement = function () {
        this._layer.removeChildren();
        var girdwidth = (GameData.stageW - 40) / GameData.MaxColumn;
        var startY = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - girdwidth * GameData.MaxColumn;
        var ele;
        for (var i = 0; i < GameData.MaxRow; i++) {
            for (var t = 0; t < GameData.MaxColumn; t++) {
                if (GameData.mapData[i][t] != -1) {
                    ele = this.elementviews[GameData.mapData[i][t]];
                    ele.setTexture('hc_animal_' + GameData.elements[GameData.mapData[i][t]].type + '_png');
                    ele.x = ele.targetX();
                    ele.y = startY - ele.width;
                    ele.show((50 * GameData.MaxColumn * GameData.MaxRow - 50 * GameData.unmapnum) - (i * GameData.MaxRow + t) * 50);
                }
            }
        }
    };
    /**
     * 消除动画播放结束
     */
    ElementViewManager.prototype.removeAniOver = function (evt) {
        this.removenum++;
        if (this.removenum == 2) {
            this.removenum = 0;
            this.dispatchEvent(evt);
        }
    };
    //播放直线动画，此类型动画用于可消除过关条件的情况
    ElementViewManager.prototype.playReqRemoveAn = function (id, tx, ty) {
        this.moveeleNum++;
        var el = this.elementviews[id];
        if (el.parent) {
            this._layer.setChildIndex(el, this._layer.numChildren);
        }
        el.playCurveMove(tx, ty);
    };
    //播放放大动画，播放后直接删除，用于可删除元素，但元素类型不是关卡过关条件
    ElementViewManager.prototype.playRemoveAni = function (id) {
        this.moveeleNum++;
        var el = this.elementviews[id];
        if (el.parent) {
            this._layer.setChildIndex(el, this._layer.numChildren);
        }
        el.playRemoveAni();
    };
    //删除动画完成，现在更新地图元素
    ElementViewManager.prototype.updateMap = function (evt) {
        this.moveeleNum--;
        if (this.moveeleNum == 0) {
            this.dispatchEvent(evt);
        }
    };
    ElementViewManager.prototype.updateMapData = function () {
        console.log('重新布局');
        var len = this.elementviews.length;
        this.moveLocElementNum = 0;
        for (var i = 0; i < len; i++) {
            this.elementviews[i].location = GameData.elements[i].location;
            this.elementviews[i].setTexture('hc_animal_' + GameData.elements[i].type + '_png');
            this.elementviews[i].moveNewLocation();
        }
    };
    //新位置掉落结束
    ElementViewManager.prototype.moveNewLocationOver = function (event) {
        this.moveLocElementNum++;
        if (this.moveLocElementNum == (GameData.MaxColumn * GameData.MaxRow)) {
            var evt = new ElementViewManagerEvent(ElementViewManagerEvent.UPDATE_VIEW_OVER);
            this.dispatchEvent(evt);
        }
    };
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
    /*======================乱序操作，移动全部元素位置=============================*/
    ElementViewManager.prototype.updateOrder = function () {
        //乱序移动指令触发
        var len = this.elementviews.length;
        egret.Tween.removeAllTweens();
        for (var i = 0; i < len; i++) {
            this.elementviews[i].location = GameData.elements[i].location;
            this.elementviews[i].move();
        }
    };
    return ElementViewManager;
}(egret.EventDispatcher));
__reflect(ElementViewManager.prototype, "ElementViewManager");
//# sourceMappingURL=ElementViewManager.js.map