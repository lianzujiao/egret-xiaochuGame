var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PropLogic = (function () {
    function PropLogic() {
    }
    /**
     * 道具使用判断
     * @proptype 道具类型
     * @elLoc 点击的元素的location
     */
    PropLogic.useProp = function (propType, elLoc) {
        switch (propType) {
            case 0:
                PropLogic.removeType(elLoc);
                break;
            case 1:
                PropLogic.removeRound(elLoc);
                break;
            case 2:
                PropLogic.removeRow(elLoc);
                break;
            case 3:
                PropLogic.removeCol(elLoc);
                break;
            case 4:
                PropLogic.removeOne(elLoc);
                break;
        }
    };
    /**
     * 消除同类型
     * @location 点击元素的Location(0~63)
     */
    PropLogic.removeType = function (location) {
        LinkLogic.lines = [];
        var arr = [];
        var type = GameData.elements[GameData.mapData[Math.floor(location / 8)][location % 8]].type;
        for (var i = 0; i < GameData.MaxRow; i++) {
            for (var t = 0; t < GameData.MaxColumn; t++) {
                if (GameData.mapData[i][t] != -1 && GameData.elements[GameData.mapData[i][t]].type == type) {
                    arr.push(GameData.mapData[i][t]);
                }
            }
        }
        LinkLogic.lines.push(arr);
    };
    /**
     * 消除一周
     */
    PropLogic.removeRound = function (location) {
        LinkLogic.lines = [];
        var i = Math.floor(location / 8);
        var t = location % 8;
        var arr = [];
        arr.push(GameData.elements[GameData[i][t]].id);
        if (i > 0 && GameData[i - 1][t] != -1) {
            arr.push(GameData.elements[GameData[i - 1][t]].id);
        }
        if (i < (GameData.MaxRow - 1) && GameData.mapData[i + 1][t] != -1) {
            arr.push(GameData.elements[GameData[i + 1][t]].id);
        }
        if (t > 0 && GameData[i][t - 1] != -1) {
            arr.push(GameData.elements[GameData[i][t - 1]].id);
        }
        if (t < (GameData.MaxColumn - 1) && GameData.mapData[i][t + 1] != -1) {
            arr.push(GameData.elements[GameData[i][t + 1]].id);
        }
        LinkLogic.lines.push(arr);
    };
    /**
     * 消除一行
     */
    PropLogic.removeRow = function (location) {
        LinkLogic.lines = [];
        var rowIndex = Math.floor(location / 8);
        var arr = [];
        for (var t = 0; t < GameData.MaxColumn; t++) {
            if (GameData.mapData[rowIndex][t] != -1) {
                console.log(rowIndex, t);
                arr.push(GameData.elements[GameData.mapData[rowIndex][t]].id);
            }
        }
        LinkLogic.lines.push(arr);
    };
    /**
     * 消除一列
     */
    PropLogic.removeCol = function (location) {
        LinkLogic.lines = [];
        var colIndex = location % 8;
        var arr = [];
        for (var i = 0; i < GameData.MaxRow; i++) {
            if (GameData.mapData[i][colIndex] != -1) {
                console.log(i, colIndex);
                arr.push(GameData.elements[GameData.mapData[i][colIndex]].id);
            }
        }
        LinkLogic.lines.push(arr);
    };
    /**
     * 消除单个
     */
    PropLogic.removeOne = function (location) {
        LinkLogic.lines = [];
        LinkLogic.lines.push([GameData.elements[GameData.mapData[Math.floor(location / 8)][location % 8]].id]);
    };
    return PropLogic;
}());
__reflect(PropLogic.prototype, "PropLogic");
//# sourceMappingURL=PropLogic.js.map