var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameData = (function () {
    function GameData() {
    }
    GameData.init = function () {
        GameData.mapData = [];
        // 循环初始化二维地图
        for (var i = 0; i < GameData.MaxRow; i++) {
            var arr = [];
            for (var t = 0; t < GameData.MaxColumn; t++) {
                GameData.mapData[t].push(-2); //设定-2表示当前地图是空的，可以使用， -1则是地图不能使用
            }
        }
        ;
        GameData.levelReq = new LevelRequire();
        GameData.elements = []; //游戏元素
        GameData.unusedElements = []; //未使用游戏元素
        var len = GameData.MaxRow * GameData.MaxColumn; //最大的元素数量
        for (var q = 0; q < len; q++) {
            var ele = new GameElement();
            ele.id = q;
            GameData.elements.push(ele); //将游戏类型元素压入当前游戏关卡做游戏元素
            GameData.unusedElements.push(q);
        }
        GameData.stageW = egret.MainContext.instance.stage.stageWidth;
        GameData.stageH = egret.MainContext.instance.stage.stageHeight;
        // egret.MainContext.instance.stage.stageWidth;
    };
    //静态实例，存在于类的本身而不存在类的实例上
    GameData.unmapnum = 0; //空白地图元素
    GameData.stepNum = 0; //当前关卡剩余步数
    GameData.levelStepNum = 0; //当前关卡要求步数
    GameData.levelBackgroundImageName = ""; //背景图
    GameData.MaxRow = 8; //最大行数
    GameData.MaxColumn = 8; //最大列数
    GameData.currentElementNum = 0; //当前可用元素数量，因为地图形状是可变的
    GameData.stageW = 0; //舞台宽度
    GameData.stageH = 0; //舞台高度
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map