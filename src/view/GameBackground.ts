class GameBackground extends egret.Sprite {
	public constructor() {
		super()
	}

	/**
	 * 启动关卡背景图
	 */
	public changeBackGround():void{
		this.cacheAsBitmap=false;
		this.removeChildren();
		this.createBackgroundImage();
		this.createMapbg();
		this.createLevelReq();
		this.createStepReq();
		this.cacheAsBitmap=true;
	}
	private bgImg: egret.Bitmap;
	private girdBg: egret.Bitmap[];

	/**
	 * 创建关卡背景图片
	 */
	private createBackgroundImage() {
		if (!this.bgImg) {
			this.bgImg = new egret.Bitmap()
		}
		this.bgImg.texture = RES.getRes(GameData.levelBackgroundImageName);
		this.bgImg.width = GameData.stageW;
		this.bgImg.height = GameData.stageH;
		this.addChild(this.bgImg);

		//@propBg:道具背景图片
		let propBg: egret.Bitmap = new egret.Bitmap();
		propBg.texture = RES.getRes("hc_infotip");
		propBg.width = GameData.stageW;
		propBg.height = GameData.stageW / 5 + 20;
		propBg.y = GameData.stageH - propBg.height;
		this.addChild(propBg);
	}

	/**
	 * 创建地图背景
	 */
	private createMapbg() {
		if (!this.girdBg) {
			this.girdBg = new Array();
		}

		let gird: egret.Bitmap;
		let girdWidth: number = (GameData.stageW - 40) / 8;
		let startY: number = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - girdWidth * GameData.MaxColumn;
		for (let i = 0; i < GameData.MaxRow; i++) {
			for (let t = 0; t < GameData.MaxColumn; t++) {
				if (GameData.mapData[i][t] != -1) {
					if (this.girdBg.length < (i * GameData.MaxRow + t)) {
						gird = new egret.Bitmap();
						this.girdBg.push(gird);
					}
					else {
						gird = this.girdBg[i * GameData.MaxRow + t]
					}
					gird.width = girdWidth;
					gird.height = girdWidth;
					gird.x = 20 + girdWidth * t;
					gird.y = startY + girdWidth * i;
					if ((i % 2 == 0 && t % 2 == 0) || (i % 2 == 1 && t % 2 == 1)) {
						gird.texture = RES.getRes('hc_lock_1');//偶数行列背景图
					}
					else {
						gird.texture = RES.getRes('hc_lock_1');//奇数行列背景图
					}
					this.addChild(gird)
				}
			}
		}

	}

	private createLevelReq() {
		let girdWidth: number = (GameData.stageW - 40) / 8;
		let bg: egret.Bitmap = new egret.Bitmap();
		bg.texture = RES.getRes("HHC_bg1");//关卡要求的背景图
		bg.width = GameData.levelReq.getLevelReqNum() * (10 * girdWidth) + 20
		bg.height=girdWidth+60;
		bg.x=20;
		bg.y=50;
		this.addChild(bg);

		let bgTxt:egret.Bitmap=new egret.Bitmap();
		bgTxt.texture=RES.getRes("HHC_bg1")//关卡名称的图片
		bgTxt.x=bg.x+(bg.width-bgTxt.width)/2;
		bgTxt.y=bg.y-18;
		this.addChild(bgTxt)
	}

	private createStepReq() {
		let girdWidth: number = (GameData.stageW - 40) / 8;
		let bg: egret.Bitmap = new egret.Bitmap();
		bg.texture = RES.getRes("HHC_bg1");//关卡剩余步数的背景图
		bg.width = 100;
		bg.height=100;
		bg.x=GameData.stageW-100;
		bg.y=50;
		this.addChild(bg);

		let bgTxt:egret.Bitmap=new egret.Bitmap();
		bgTxt.texture=RES.getRes("HHC_bg1")//关卡剩余步数文字的背景图
		bgTxt.x=bg.x+(bg.width-bgTxt.width)/2;
		bgTxt.y=bg.y+10;
		this.addChild(bgTxt)
	}
}