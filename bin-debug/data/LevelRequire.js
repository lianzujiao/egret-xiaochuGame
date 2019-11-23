var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LevelRequire = (function () {
    function LevelRequire() {
        this.requireElements = [];
    }
    /**
     * 获取关卡总数
     */
    LevelRequire.prototype.getLevelReqNum = function () {
        return this.requireElements.length;
    };
    /**
     * 添加关卡元素
     */
    LevelRequire.prototype.addElement = function (type, num) {
        var ele = new LevelRequireElement(); //每一个游戏关卡
        ele.num = num;
        ele.type = type;
        this.requireElements.push(ele);
    };
    /**
     * 启动关卡条件修改
     */
    LevelRequire.prototype.openChange = function () {
        this.requireElements = [];
    };
    LevelRequire.prototype.changeReqNum = function (type, num) {
        var len = this.getLevelReqNum(); //关卡元素数组长度
        for (var i = 0; i < len; i++) {
            if (this.requireElements[i].type = type) {
                this.requireElements[i].num -= num; //未破解关卡逐渐减少
                return;
            }
        }
    };
    /**
     * 判断是否已经完成所有关卡
     */
    LevelRequire.prototype.isClear = function () {
        var len = this.getLevelReqNum();
        for (var i = 0; i < len; i++) {
            if (this.requireElements[i].num > 0) {
                return false;
            }
        }
        return true;
    };
    return LevelRequire;
}());
__reflect(LevelRequire.prototype, "LevelRequire");
//# sourceMappingURL=LevelRequire.js.map