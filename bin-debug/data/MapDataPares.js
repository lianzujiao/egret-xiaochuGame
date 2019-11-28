var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MapDataPares = (function () {
    function MapDataPares() {
    }
    /**
     * @val:number[]：关卡json中的map数组，map存放的是不可用的location
     */
    MapDataPares.createdMapData = function (val) {
        var len = val.length;
        GameData.unmapnum = len; //地图未使用元素数量
        var index = 0;
        for (var i = 0; i < len; i++) {
            index = val[i];
            var row = Math.floor(index / GameData.MaxColumn); //向下舍入得到当前设定的行
            var col = index % GameData.MaxRow; //得到当前设定的列
            GameData.mapData[row][col] = -1;
        }
        GameData.currentElementNum = GameData.MaxRow * GameData.MaxColumn - len; //游戏中可用地图数据的长度
    };
    return MapDataPares;
}());
__reflect(MapDataPares.prototype, "MapDataPares");
//# sourceMappingURL=MapDataPares.js.map