var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MapControl = (function () {
    function MapControl() {
    }
    MapControl.prototype.createElementAllMap = function () {
        this.createAllMap();
    };
    /**
     * 随机创建number个元素
     */
    MapControl.prototype.createElements = function (num) {
        var types = [];
        for (var i = 0; i < num; i++) {
            types.push(this.createType());
        }
        return types;
    };
    /**
     * 根据指定id随机创建一个元素
     */
    MapControl.prototype.createTypeById = function (id) {
        GameData.elements[id].type = this.createType();
    };
    MapControl.prototype.updateMapLocation = function () {
        var ids = [];
        var len = LinkLogic.lines.length;
        for (var i = 0; i < len; i++) {
            //var l:number=LinkLogic.lines[i].length;            
            ids.push(LinkLogic.lines[i]);
        }
        len = ids.length;
        var colarr = [];
        for (i = 0; i < len; i++) {
            var tempCol = GameData.elements[ids[i]].location % GameData.MaxColumn;
            if (colarr.indexOf(tempCol) == -1) {
                colarr.push(tempCol);
            }
        }
        var colelids;
        len = colarr.length;
        for (i = 0; i < len; i++) {
            var newcolids = [];
            var removeids = [];
            for (var t = GameData.MaxRow - 1; t >= 0; t--) {
                //console.log(ids);
                if (ids.indexOf(GameData.mapData[t][colarr[i]]) >= 0) {
                    removeids.push(GameData.mapData[t][colarr[i]]);
                }
                else {
                    if (GameData.mapData[t][colarr[i]] != -1) {
                        newcolids.push(GameData.mapData[t][colarr[i]]);
                    }
                }
            }
            newcolids = newcolids.concat(removeids);
            //console.log(newcolids);
            for (t = GameData.MaxRow - 1; t >= 0; t--) {
                if (GameData.mapData[t][colarr[i]] != -1) {
                    var newcol = newcolids.shift();
                    GameData.mapData[t][colarr[i]] = newcol;
                    // console.log(GameData.elements[newcol].location);
                    GameData.elements[newcol].location = t * GameData.MaxRow + colarr[i];
                }
            }
            for (t = 0; t < removeids.length; t++) {
                this.createTypeById(removeids[t]);
            }
        }
    };
    MapControl.prototype.createAllMap = function () {
        var len = GameData.MaxRow * GameData.MaxColumn;
        var type = "";
        var haveLink = true;
        var id = 0;
        var ztype = "";
        var htype = "";
        for (var i = 0; i < GameData.MaxRow; i++) {
            for (var t = 0; t < GameData.MaxColumn; t++) {
                while (haveLink) {
                    type = this.createType(); //随机获取一个当前关卡元素类型
                    if (i > 1 && GameData.mapData[i - 1][t] != -1 && GameData.mapData[i - 2][t] != -1) {
                        if (GameData.elements[GameData.mapData[i - 1][t]].type == GameData.elements[GameData.mapData[i - 2][t]].type) {
                            ztype = GameData.elements[GameData.mapData[i - 1][t]].type;
                        }
                    }
                    if (t > 1 && GameData.mapData[i][t - 1] != -1 && GameData.mapData[i][t - 2] != -1) {
                        if (GameData.elements[GameData.mapData[i][t - 1]].type == GameData.elements[GameData.mapData[i][t - 2]].type) {
                            htype = GameData.elements[GameData.mapData[i][t - 1]].type;
                        }
                    }
                    if (type != ztype && type != htype) {
                        haveLink = false;
                    }
                }
                id = GameData.unusedElements[0];
                GameData.elements[id].type = type;
                GameData.elements[id].location = i * GameData.MaxRow + t;
                GameData.mapData[i][t] = id;
                GameData.unusedElements.shift();
                haveLink = true;
                ztype = "";
                htype = "";
            }
        }
    };
    /**
     * return 任意一个元素类型
     */
    MapControl.prototype.createType = function () {
        return GameData.elementTypes[Math.floor(Math.random() * GameData.elementTypes.length)].toString(); //随机数的值是0~元素类型数组长度
    };
    return MapControl;
}());
__reflect(MapControl.prototype, "MapControl");
//# sourceMappingURL=MapControl.js.map