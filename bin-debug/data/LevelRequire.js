var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LevelRequire = (function () {
    function LevelRequire() {
        this.requireElements = [];
    }
    /**
     * 获取关卡过关条件数据
     */
    LevelRequire.prototype.getLevelReqNum = function () {
        return this.requireElements.length;
    };
    /**
     * 添加关卡元素
     */
    LevelRequire.prototype.addElement = function (type, num) {
        var ele = new LevelRequireElement(); //每一个游戏过关条件
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
        var len = this.getLevelReqNum(); //过关条件元素数组
        for (var i = 0; i < len; i++) {
            if (this.requireElements[i].type == type) {
                this.requireElements[i].num -= num; //关卡指定过关条件元素的数量减一
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
        console.log("过关！");
        return true;
    };
    return LevelRequire;
}());
__reflect(LevelRequire.prototype, "LevelRequire");
//# sourceMappingURL=LevelRequire.js.map