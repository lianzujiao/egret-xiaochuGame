var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameLogic = (function () {
    function GameLogic(gameStage) {
        this._gameStage = gameStage;
        this.init();
    }
    GameLogic.prototype.init = function () {
        GameData.init(); //初始化数据
        var leveldata = RES.getRes('step1_json'); //初始化GameData数据
        MapDataPares.createdMapData(leveldata.map); //创建地图数据
        LevelGameDataParse.parseLevelGameData(leveldata); //解析游戏关卡数据
        this.mapc = new MapControl();
        this.mapc.createElementAllMap();
        var gbg = new GameBackground();
        this._gameStage.addChild(gbg);
        gbg.changeBackGround();
        var lec = new egret.Sprite();
        this._gameStage.addChild(lec);
        this.levm = new LevelReqViewManager(lec);
        this.levm.createCurrentLevelReq();
        var pvmc = new egret.Sprite();
        this._gameStage.addChild(pvmc);
        this.pvm = new PropViewManager(pvmc);
        var cc = new egret.Sprite();
        this._gameStage.addChild(cc);
        this.evm = new ElementViewManager(cc);
        this.evm.showAllElement();
        this.evm.addEventListener(ElementViewManagerEvent.TAP_TWO_ELEMENT, this.viewTouchTap, this); //两个元素被点击
        this.evm.addEventListener(ElementViewManagerEvent.REMOVE_ANIMATION_OVER, this.removeAniOver, this); //消除动画播放结束
        this.evm.addEventListener(ElementViewManagerEvent.UPDATE_MAP, this.createNewElement, this); //更新地图
        this.evm.addEventListener(ElementViewManagerEvent.UPDATE_VIEW_OVER, this.checkOtherElementLink, this); //更新地图结束
        this.evm.addEventListener(ElementViewManagerEvent.USE_PROP_CLICK, this.usePropClick, this); //使用道具点击
    };
    /**
     * 图管理器中存在两个被点击的元素，进行判断
     * */
    GameLogic.prototype.viewTouchTap = function (evt) {
        var rel = LinkLogic.canMove(evt.ele1, evt.ele2); //从二维地图中判断，两个元素是否可交换位置
        console.log('位置上是否可交换' + rel, evt.ele1, evt.ele2);
        if (rel) {
            //判断两个位置移动后是否可以消除
            var linerel = LinkLogic.isHaveLineByIndex(GameData.elements[evt.ele1].location, GameData.elements[evt.ele2].location);
            //执行移动
            if (linerel) {
                //移动，然后消除
                //   console.log('消除动画');
                this.evm.changeLocationAndScale(evt.ele1, evt.ele2);
                //更新步数
                GameData.stepNum--;
                this.levm.updateStep();
            }
            else {
                this.evm.changeLocationAndBack(evt.ele1, evt.ele2);
            }
        }
        else {
            this.evm.setNewElementFocus(evt.ele2); //两个元素从空间位置上不可交换，设置新焦点
        }
    };
    /*元素置换动画播放结束，数据操作，并播放删除动画*/
    //即将删除的元素移动结束
    //开始搜索删除数据，并且播放删除动画
    //更新地图数据
    //更新其他数据
    GameLogic.prototype.removeAniOver = function (evt) {
        console.log('需要消除' + LinkLogic.lines);
        var len = LinkLogic.lines.length;
        var rel;
        var etype = '';
        for (var i = 0; i < len; i++) {
            etype = GameData.elements[LinkLogic.lines[i]].type;
            rel = this.levm.haveReqType(etype);
            if (rel) {
                var p = this.levm.getPointByType(etype);
                GameData.levelReq.changeReqNum(etype, 1);
                this.levm.update();
                this.evm.playReqRemoveAn(LinkLogic.lines[i], p.x, p.y);
            }
            else {
                this.evm.playRemoveAni(LinkLogic.lines[i]);
            }
        }
    };
    /*所以元素都删除完毕后，创建新元素，并刷新地图*/
    GameLogic.prototype.createNewElement = function (evt) {
        console.log('刷新地图数据！！！！！！！！！！！！');
        this.mapc.updateMapLocation();
        this.evm.updateMapData();
    };
    /*删除动画完成后，检测地图中是否存在剩余可消除元素*/
    GameLogic.prototype.checkOtherElementLink = function (evt) {
        if (LinkLogic.isHaveLine()) {
            this.removeAniOver(null);
        }
        else {
            if (!LinkLogic.isNextHaveLine()) {
                var rel = false;
                //没有可消除的元素了，检查是否存在移动一步可消除的项目
                var next = true;
                while (next) {
                    console.log('执行乱序');
                    LinkLogic.changeOrder();
                    if (!LinkLogic.isHaveLine()) {
                        if (LinkLogic.isNextHaveLine()) {
                            next = false;
                            rel = true;
                        }
                    }
                }
                if (rel) {
                    this.evm.updateOrder();
                }
            }
        }
        console.log('所以动画逻辑结束');
        this.isGameOver();
    };
    GameLogic.prototype.isGameOver = function () {
        console.log('道具是否清空', GameData.levelReq.isClear());
        if (!this.gameoverpanel) {
            if (GameData.stepNum == 0) {
                this.gameoverpanel = new GameOverPanel();
                this._gameStage.addChild(this.gameoverpanel);
                if (GameData.levelReq.isClear()) {
                    this.gameoverpanel.show(true);
                }
                else {
                    this.gameoverpanel.show(false);
                }
            }
            else {
                if (GameData.levelReq.isClear()) {
                    this.gameoverpanel = new GameOverPanel();
                    this._gameStage.addChild(this.gameoverpanel);
                    this.gameoverpanel.show(true);
                }
            }
        }
    };
    /*道具被点击*/
    GameLogic.prototype.usePropClick = function (evt) {
        PropLogic.useProp(PropViewManager.proptype, evt.propElementLocation);
        this.pvm.useProp();
        this.removeAniOver(null); //交换动画结束时
    };
    return GameLogic;
}());
__reflect(GameLogic.prototype, "GameLogic");
//# sourceMappingURL=GameLogic.js.map