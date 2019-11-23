var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LevelGameDataParse = (function () {
    function LevelGameDataParse() {
    }
    LevelGameDataParse.parseLevelGameData = function (val) {
        GameData.stepNum = val.step; //关卡步数
        GameData.levelStepNum = val.step; //剩余可用步数
        GameData.elementTypes = val.element; //关卡出现的元素类型
        GameData.levelBackgroundImageName = val.levelBgImg;
        LevelGameDataParse.parseLevelRequire(val.levelreq);
    };
    LevelGameDataParse.parseLevelRequire = function (val) {
        GameData.levelReq.openChange(); //openchange将原有数据清空，重新赋值
        var len = val.length;
        for (var i = 0; i < len; i++) {
            GameData.levelReq.addElement(val[i].type, val[i].num); //循环添加游戏元素
        }
    };
    return LevelGameDataParse;
}());
__reflect(LevelGameDataParse.prototype, "LevelGameDataParse");
//# sourceMappingURL=LevelGameDataParse.js.map