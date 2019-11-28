
class GameLogic {
    private _gameStage:egret.Sprite;
	public constructor(gameStage:egret.Sprite) {
    	this._gameStage=gameStage;
    	this.init();
	}
	
	
	/*初始化数据，创建各种控制器*/
	private evm:ElementViewManager;
	private levm:LevelReqViewManager;
	private mapc:MapControl;
	private pvm:PropViewManager;
	private init(){
	    GameData.init();//初始化数据
	    
	    var leveldata =RES.getRes('step1_json');//初始化GameData数据
	    MapDataPares.createdMapData(leveldata.map);//创建地图数据
	    LevelGameDataParse.parseLevelGameData(leveldata);//解析游戏关卡数据
	    
	    this.mapc = new MapControl();
	    this.mapc.createElementAllMap()//地图控制器，初始化地图上的基本数据
	    
	    var gbg: GameBackground = new GameBackground();//创建背景
	    this._gameStage.addChild(gbg);
	    gbg.changeBackGround();
	    
	    var lec:egret.Sprite = new egret.Sprite();
	    this._gameStage.addChild(lec);
	    this.levm = new LevelReqViewManager(lec);//关卡控制器
	    this.levm.createCurrentLevelReq();
	    
	    var pvmc:egret.Sprite = new egret.Sprite();
	    this._gameStage.addChild(pvmc);
	    this.pvm = new PropViewManager(pvmc);//道具栏控制器
	    
	    var  cc:egret.Sprite = new egret.Sprite();
	    this._gameStage.addChild(cc);
	    this.evm=new ElementViewManager(cc);
	    this.evm.showAllElement();
	    
	    this.evm.addEventListener(ElementViewManagerEvent.TAP_TWO_ELEMENT,this.viewTouchTap,this);//两个元素被点击
	    this.evm.addEventListener(ElementViewManagerEvent.REMOVE_ANIMATION_OVER,this.removeAniOver,this);//消除动画播放结束
	    this.evm.addEventListener(ElementViewManagerEvent.UPDATE_MAP,this.createNewElement,this);//更新地图
	    this.evm.addEventListener(ElementViewManagerEvent.UPDATE_VIEW_OVER,this.checkOtherElementLink,this);//更新地图结束
	    this.evm.addEventListener(ElementViewManagerEvent.USE_PROP_CLICK,this.usePropClick,this);//使用道具点击
	    
	    
	    
	}
	
	
	/**
	 * 图管理器中存在两个被点击的元素，进行判断
	 * */
	private viewTouchTap(evt:ElementViewManagerEvent){
	    var rel:boolean=LinkLogic.canMove(evt.ele1,evt.ele2);//从二维地图中判断，两个元素是否可交换位置
	    console.log('位置上是否可交换'+rel,evt.ele1,evt.ele2);
	    if(rel){
	        //判断两个位置移动后是否可以消除
    	      var linerel:boolean = LinkLogic.isHaveLineByIndex(GameData.elements[evt.ele1].location,GameData.elements[evt.ele2].location);
    	      //执行移动
    	      if(linerel){
    	          //移动，然后消除
        	    //   console.log('消除动画');
        	      this.evm.changeLocationAndScale(evt.ele1,evt.ele2);
        	      //更新步数
        	      GameData.stepNum--;
        	      this.levm.updateStep();
    	      }else{
    	          this.evm.changeLocationAndBack(evt.ele1,evt.ele2);
    	      }
	    }else{
	        this.evm.setNewElementFocus(evt.ele2);//两个元素从空间位置上不可交换，设置新焦点
	    }
	}
	
	
	
	/*元素置换动画播放结束，数据操作，并播放删除动画*/
	//即将删除的元素移动结束
	//开始搜索删除数据，并且播放删除动画
	//更新地图数据
	//更新其他数据
	private removeAniOver(evt:ElementViewManagerEvent){
	    console.log('需要消除'+LinkLogic.lines);
	    var len:number=LinkLogic.lines.length;
	    var rel:boolean;
        var etype: string = '';
	    for(var i:number=0;i<len;i++){
	        
            etype = GameData.elements[LinkLogic.lines[i]].type;
            rel = this.levm.haveReqType(etype);
            if(rel) {//有相同关卡类型，运动到指定位置
                var p: egret.Point = this.levm.getPointByType(etype);
                GameData.levelReq.changeReqNum(etype,1);
                this.levm.update();
                this.evm.playReqRemoveAn(LinkLogic.lines[i],p.x,p.y);
            } else {
                this.evm.playRemoveAni(LinkLogic.lines[i]);
            }
	        
	    }
	}
	
	
	/*所以元素都删除完毕后，创建新元素，并刷新地图*/
	private createNewElement(evt:ElementViewManagerEvent){
	    console.log('刷新地图数据！！！！！！！！！！！！');
	    this.mapc.updateMapLocation();
	    this.evm.updateMapData();
	}
	
	
	
	/*删除动画完成后，检测地图中是否存在剩余可消除元素*/
	private checkOtherElementLink(evt:ElementViewManagerEvent){
	    if(LinkLogic.isHaveLine()){
	        this.removeAniOver(null);
	    }else{
	        if(!LinkLogic.isNextHaveLine()){
	            var rel:boolean=false;
	            //没有可消除的元素了，检查是否存在移动一步可消除的项目
	            var next:boolean=true;
	            while(next){
	                console.log('执行乱序');
	                LinkLogic.changeOrder();
	                if(!LinkLogic.isHaveLine()){
	                    if(LinkLogic.isNextHaveLine()){
	                        next=false;
	                        rel=true;
	                    }
	                }
	            }
	            if(rel){
	                this.evm.updateOrder();
	            }
	        }
	    }
	    console.log('所以动画逻辑结束');
	    
	    this.isGameOver();
	}
	
	
	
	
	/*检测当前游戏是否结束*/
	private gameoverpanel:GameOverPanel;
	private isGameOver(){
	    console.log('道具是否清空',GameData.levelReq.isClear());
	    if(!this.gameoverpanel){
	        if(GameData.stepNum==0){
	            this.gameoverpanel = new GameOverPanel();
	            this._gameStage.addChild(this.gameoverpanel);
	            if(GameData.levelReq.isClear()){
	                this.gameoverpanel.show(true);
	            }else{
	                this.gameoverpanel.show(false);
	            }
	        }else{
	            if(GameData.levelReq.isClear()){
	                this.gameoverpanel = new GameOverPanel();
	                this._gameStage.addChild(this.gameoverpanel);
	                this.gameoverpanel.show(true);
	            }
	        }
	    }
	}
	
	/*道具被点击*/
	private usePropClick(evt:ElementViewManagerEvent){
	    PropLogic.useProp(PropViewManager.proptype,evt.propElementLocation);
	    this.pvm.useProp();
	    this.removeAniOver(null);//交换动画结束时
	}
}
