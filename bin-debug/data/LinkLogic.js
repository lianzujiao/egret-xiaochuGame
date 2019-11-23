var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LinkLogic = (function () {
    function LinkLogic() {
    }
    /**
     * 查看当前搜索的是否有可消除数据
     */
    LinkLogic.isHaveLine = function () {
        LinkLogic.lines = []; //可连线
        var currrentType = ""; //当前类型
        var typeNum = 0; //当前检测的类型的数量
        // 横向，按行检索
        for (var i = 0; i < GameData.MaxRow; i++) {
            for (var t = 0; t < GameData.MaxColumn; t++) {
                if (GameData.mapData[i][t] != -1) {
                    if (currrentType != GameData.elements[GameData[i][t]].type) {
                        if (typeNum >= 3) {
                            var arr = [];
                            for (var q = 0; q < typeNum; q++) {
                                arr.push(GameData.mapData[i][t - q - 1]);
                            }
                            LinkLogic.lines.push(arr);
                        }
                        currrentType = GameData.elements[GameData[i][t]].type;
                        typeNum = 1;
                    }
                    else {
                        typeNum++;
                    }
                }
                else {
                    if (typeNum >= 3) {
                        var arr = [];
                        for (var q = 0; q < typeNum; q++) {
                            arr.push(GameData.mapData[i][t - q - 1]);
                        }
                        LinkLogic.lines.push(arr);
                    }
                    currrentType = ""; //当前类型设为空
                    typeNum = 0;
                }
            }
            if (typeNum >= 3) {
                var arr = [];
                for (var q = 0; q < typeNum; q++) {
                    arr.push(GameData.mapData[i][t - q - 1]);
                }
                LinkLogic.lines.push(arr);
            }
            currrentType = "";
            typeNum = 0;
        }
        //纵向算法处理
        for (var i = 0; i < GameData.MaxColumn; i++) {
            for (var t_1 = 0; t_1 < GameData.MaxRow; t_1++) {
                if (GameData.mapData[t_1][i] != -1) {
                    if (currrentType != GameData.elements[GameData.mapData[t_1][i]].type) {
                        if (typeNum >= 3) {
                            var arr = [];
                            for (var q = 0; q < typeNum; q++) {
                                arr.push(GameData.mapData[t_1 - q - 1][i]);
                            }
                            LinkLogic.lines.push(arr);
                        }
                        currrentType = GameData.elements[GameData.mapData[t_1][i]].type;
                        typeNum = 1;
                    }
                    else {
                        typeNum++;
                    }
                }
                else {
                    if (typeNum >= 3) {
                        var arr = [];
                        for (var q = 0; q < typeNum; q++) {
                            arr.push(GameData.mapData[t_1 - q - 1][i]);
                        }
                        LinkLogic.lines.push(arr);
                    }
                    currrentType = "";
                    typeNum = 0;
                }
            }
            //循环到每一列的末尾的边界处理
            if (typeNum >= 3) {
                var arr = [];
                for (var q = 0; q < typeNum; q++) {
                    arr.push(GameData.mapData[t - q - 1][i]);
                }
                LinkLogic.lines.push(arr);
            }
            currrentType = "";
            typeNum = 0;
        }
        //行列都循环结束之后若可连线消除数组不为空则返回true
        if (LinkLogic.lines.length != 0) {
            return true;
        }
        return false;
    };
    /**
     * 预检索可消除元素
     */
    LinkLogic.isNextHaveLine = function () {
        for (var i = 0; i < GameData.MaxRow; i++) {
            for (var t = 0; t < GameData.MaxColumn; t++) {
                if (GameData.mapData[i][t] != -1) {
                    if (t < (GameData.MaxColumn - 1) && GameData.mapData[i][t + 1] != -1 && GameData.elements[GameData[i][t]].type == GameData.elements[GameData[i][t + 1]].type) {
                        if (t > 0 && GameData.mapData[i][t - 1] != -1) {
                            if (i > 0 && t > 0 && GameData.mapData[i - 1][t - 1] && GameData.mapData[i - 1][t - 1] != -1 && GameData.elements[GameData.elements[i - 1][t - 1]].type == GameData.elements[GameData[i][t]].type) {
                                return true;
                            }
                            if (i < (GameData.MaxRow - 1) && t > 0 && GameData.mapData[i + 1][t - 1] && GameData.mapData[i + 1][t - 1] != -1 && GameData.elements[GameData.elements[i + 1][t - 1]].type == GameData.elements[GameData[i][t]].type) {
                                console.log("-1能消除项目2", i, t);
                                return true;
                            }
                            if (t > 1 && GameData.mapData[i][t - 2] && GameData.mapData[i][t - 2] != -1 && GameData.elements[GameData.elements[i][t - 2]].type == GameData.elements[GameData[i][t]].type) {
                                console.log("-1能消除项目3", i, t);
                                return true;
                            }
                        }
                        if (t < (GameData.MaxColumn - 1) && GameData.mapData[i][t + 2] != -1) {
                            if (i > 0 && t < (GameData.MaxColumn - 2) && GameData.mapData[i - 1][t + 2] && GameData.mapData[i - 1][t + 2] != -1 && GameData.elements[GameData.elements[i - 1][t + 2]].type == GameData.elements[GameData[i][t]].type) {
                                return true;
                            }
                            if (i > (GameData.MaxRow - 1) && t < (GameData.MaxColumn - 2) && GameData.mapData[i + 1][t + 2] && GameData.mapData[i + 1][t + 2] != -1 && GameData.elements[GameData.elements[i + 1][t + 2]].type == GameData.elements[GameData[i][t]].type) {
                                console.log("-1能消除项目2", i, t);
                                return true;
                            }
                            if (t < (GameData.MaxColumn - 3) && GameData.mapData[i][t + 3] && GameData.mapData[i][t + 3] != -1 && GameData.elements[GameData.elements[i][t + 3]].type == GameData.elements[GameData[i][t]].type) {
                                console.log("-1能消除项目3", i, t);
                                return true;
                            }
                        }
                    }
                    //第一种纵向检索方式
                    if (i < (GameData.MaxRow - 1) && GameData.mapData[i + 1][t] != -1 && GameData.elements[GameData[i][t]].type == GameData.elements[GameData[i + 1][t]].type) {
                        if (i > 0 && GameData.mapData[i - 1][t] != -1) {
                            if (i > 0 && t > 0 && GameData.mapData[i - 1][t - 1] && GameData.mapData[i - 1][t - 1] != -1 && GameData.elements[GameData.elements[i - 1][t - 1]].type == GameData.elements[GameData[i][t]].type) {
                                console.log("1能消除项目1", i, t);
                                return true;
                            }
                            if (t < (GameData.MaxColumn - 1) && i > 0 && GameData.mapData[i - 1][t + 1] && GameData.mapData[i - 1][t + 1] != -1 && GameData.elements[GameData.elements[i - 1][t + 1]].type == GameData.elements[GameData[i][t]].type) {
                                console.log("1能消除项目2", i, t);
                                return true;
                            }
                            if (i > 1 && GameData.mapData[i - 2][t] && GameData.mapData[i - 2][t] != -1 && GameData.elements[GameData.elements[i - 2][t]].type == GameData.elements[GameData[i][t]].type) {
                                console.log("1能消除项目1", i, t);
                                return true;
                            }
                        }
                        if (t < (GameData.MaxColumn - 2) && GameData.mapData[i + 2][t] != -1) {
                            if (i < (GameData.MaxRow - 3) && GameData.mapData[i + 3][t] && GameData.mapData[i + 3][t] != -1 && GameData.elements[GameData.elements[i + 3][t]].type == GameData.elements[GameData[i][t]].type) {
                                console.log("1能消除项目4", i, t);
                                return true;
                            }
                            if (t < (GameData.MaxRow - 2) && GameData.mapData[i + 2][t + 1] && GameData.mapData[i + 2][t + 1] != -1 && GameData.elements[GameData.elements[i + 2][t + 1]].type == GameData.elements[GameData[i][t]].type) {
                                console.log("1能消除项目5", i, t);
                                return true;
                            }
                            if (t > 0 && GameData.mapData[i + 2][t - 1] && GameData.mapData[i + 2][t - 1] != -1 && GameData.elements[GameData.elements[i + 2][t - 1]].type == GameData.elements[GameData[i][t]].type) {
                                console.log("1能消除项目6", i, t);
                                return true;
                            }
                        }
                    }
                    //方式二横向检索
                    if (t < (GameData.MaxColumn - 2) && GameData.mapData[i][t + 2] != -1 && GameData.elements[GameData.elements[i][t + 2]].type == GameData.elements[GameData[i][t]].type) {
                        if (GameData.mapData[i][t + 1] != -1) {
                            //左上角元素与当前元素
                            if (i > 0 && GameData.mapData[i - 1][t + 1] && GameData.mapData[i - 1][t + 1] != -1 && GameData.elements[GameData.elements[i - 1][t + 1]].type == GameData.elements[GameData[i][t]].type) {
                                console.log("-2能消除项目1", i, t);
                                return true;
                            }
                            //左下角元素与当前元素
                            if (i < (GameData.MaxRow - 1) && GameData.mapData[i + 1][t + 1] && GameData.mapData[i + 1][t + 1] != -1 && GameData.elements[GameData.elements[i + 1][t + 1]].type == GameData.elements[GameData[i][t]].type) {
                                console.log("-2能消除项目2", i, t);
                                return true;
                            }
                        }
                    }
                    //纵向方式
                    if (i < (GameData.MaxRow - 2) && GameData.mapData[i + 2][t] != -1 && GameData.elements[GameData.elements[i + 2][t]].type == GameData.elements[GameData[i][t]].type) {
                        if (GameData.mapData[i + 1][t] != -1) {
                            if (t < (GameData.MaxColumn - 1) && GameData.mapData[i + 1][t + 1] && GameData.mapData[i + 1][t + 1] != -1 && GameData.elements[GameData.elements[i + 1][t + 1]].type == GameData.elements[GameData[i][t]].type) {
                                console.log("2能消除项目1", i, t);
                                return true;
                            }
                            if (i < (GameData.MaxRow - 1) && t > 0 && GameData.mapData[i + 1][t - 1] && GameData.mapData[i + 1][t - 1] != -1 && GameData.elements[GameData.elements[i + 1][t - 1]].type == GameData.elements[GameData[i][t]].type) {
                                console.log("2能消除项目2", i, t);
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    };
    /**
     * 判断两个元素是否可以交换
     */
    LinkLogic.canMove = function (id1, id2) {
        var l1row = Math.floor(GameData.elements[id1].location / GameData.MaxRow);
        var l1col = GameData.elements[id1].location % GameData.MaxColumn;
        var l2row = Math.floor(GameData.elements[id2].location / GameData.MaxRow);
        var l2col = GameData.elements[id2].location % GameData.MaxColumn;
        if (l1row == l2row) {
            if (Math.abs(l1col - l2col) == 1) {
                return true;
            }
        }
        if (l1col == l2col) {
            if (Math.abs(l1row - l2row) == 1) {
                return true;
            }
        }
        return false;
    };
    /**
     * 全局乱序算法
     * */
    LinkLogic.changeOrder = function () {
        var arr = [];
        //取出地图中元素的id放进数组中
        GameData.mapData.forEach(function (row) {
            row.forEach(function (item) {
                if (item != -1) {
                    arr.push(item);
                }
            });
        });
        //双循环实现取出地图可用元素的id存入数组arr中
        // for (let i = 0; i < GameData.MaxRow; i++) {
        // 	for (let t = 0; t < GameData.MaxColumn; t++) {
        // 		if(GameData.mapData[i][t]!=-1){
        // 			arr.push(GameData.mapData[i][t]);
        // 		}
        // 	}
        // }
        var index = 0;
        for (var i = 0; i < GameData.MaxRow; i++) {
            for (var t = 0; t < GameData.MaxColumn; t++) {
                if (GameData.mapData[i][t] != -1) {
                    index = Math.floor(Math.random() * arr.length);
                    GameData.mapData[i][t] = arr[index];
                    GameData.elements[arr[index]].location = i * GameData.MaxRow + t;
                    arr.splice(index, 1);
                }
            }
        }
    };
    /**
     * 判断元素是否可以交换
     * 参数：两个游戏元素的location（0~63）
     */
    LinkLogic.isHaveLineByIndex = function (p1, p2) {
        var p1n = p1;
        var p2n = p2;
        var p1Id = GameData.mapData[Math.floor(p1 / GameData.MaxColumn)][p1 % GameData.MaxRow];
        var p2Id = GameData.mapData[Math.floor(p2 / GameData.MaxColumn)][p2 % GameData.MaxRow];
        GameData.mapData[Math.floor(p1 / GameData.MaxColumn)][p1 % GameData.MaxRow] = p2Id;
        GameData.mapData[Math.floor(p2 / GameData.MaxColumn)][p2 % GameData.MaxRow] = p1Id;
        //查找是否有可消除元素
        var rel = LinkLogic.isHaveLine();
        if (rel) {
            GameData.elements[p1Id].location = p2;
            GameData.elements[p2Id].location = p1;
            return true;
        }
        else {
            GameData.mapData[Math.floor(p1 / GameData.MaxColumn)][p1 % GameData.MaxRow] = p1Id;
            GameData.mapData[Math.floor(p2 / GameData.MaxColumn)][p2 % GameData.MaxRow] = p2Id;
        }
        return false;
    };
    return LinkLogic;
}());
__reflect(LinkLogic.prototype, "LinkLogic");
//# sourceMappingURL=LinkLogic.js.map