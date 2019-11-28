class GameBackground extends egret.Sprite {
	public constructor() {
		super()
	}

	/**
	 * 启动关卡背景图
	 */
	public changeBackGround(): void {
		this.cacheAsBitmap = false;//优化页面性能
		this.removeChildren();
		this.createBackgroundImage();//创建关卡背景图片背景
		this.createMapbg();//创建游戏区整体背景图片
		this.createLevelReq();//创建关卡要求图片
		this.createStepReq();//关卡剩余步数图片
		this.cacheAsBitmap = true;
	}
	private bgImg: egret.Bitmap;//背景图片
	private girdBg: egret.Bitmap[];//游戏区元素网格

	/**
	 * 创建关卡背景图片
	 */
	private createBackgroundImage() {
		if (!this.bgImg) {
			this.bgImg = new egret.Bitmap()
		}
		this.bgImg.texture = RES.getRes(GameData.levelBackgroundImageName);//当前关卡背景图片
		this.bgImg.width = GameData.stageW;
		this.bgImg.height = GameData.stageH;
		this.addChild(this.bgImg);

		//@propBg:道具栏背景图片
		let propBg: egret.Bitmap = new egret.Bitmap();
		propBg.texture = RES.getRes("propAllBg_png");
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
		let girdWidth: number = (GameData.stageW - 40) / 8;//每个游戏消除元素小网格的大小
		let startY: number = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - girdWidth * GameData.MaxColumn;
		for (let i = 0; i < GameData.MaxRow; i++) {
			for (let t = 0; t < GameData.MaxColumn; t++) {
				if (GameData.mapData[i][t] != -1) {
					if (this.girdBg.length <= (i * GameData.MaxRow + t)) {

						gird = new egret.Bitmap();
						this.girdBg.push(gird);
					}
					else {

						gird = this.girdBg[i * GameData.MaxRow + t]
					}
					gird.width = girdWidth;
					gird.height = girdWidth;
					// console.log(gird)
					gird.x = 20 + girdWidth * t;
					gird.y = startY + girdWidth * i;
					if ((i % 2 == 0 && t % 2 == 0) || (i % 2 == 1 && t % 2 == 1)) {
						gird.texture = RES.getRes('hc_lock_png');//偶数行列背景图
					}
					else {
						gird.texture = RES.getRes('hc_lock_png');//奇数行列背景图
					}
					this.addChild(gird)
				}
			}
		}

	}

	/**
	 * 过关条件位置样式设置
	 */
	private createLevelReq() {
		let girdWidth: number = (GameData.stageW - 40) / 8;
		let bg: egret.Bitmap = new egret.Bitmap();
		bg.texture = RES.getRes("LevelRequireBg_png");//关卡要求的背景图
		bg.height = girdWidth + 80;
		bg.width = girdWidth * 5
		console.log(bg.width)
		bg.x = 20;
		bg.y = 50;
		this.addChild(bg);

		let bgTxt: egret.Bitmap = new egret.Bitmap();
		bgTxt.texture = RES.getRes("LevelRequireName_png")//关卡名称的图片
		bgTxt.height = 45;
		bgTxt.x = bg.x + (bg.width - bgTxt.width) / 2;
		bgTxt.y = bg.y - 5;
		this.addChild(bgTxt)
	}

	private createStepReq() {
		let girdWidth: number = (GameData.stageW - 40) / 8;
		let bg: egret.Bitmap = new egret.Bitmap();
		bg.texture = RES.getRes("leftStepBg_png");//关卡剩余步数的背景图
		bg.width = girdWidth + 80;
		bg.height = girdWidth + 80;
		bg.x = GameData.stageW - bg.width - 20;//20是画面右边距
		bg.y = 50;
		this.addChild(bg);

		let bgTxt: egret.Bitmap = new egret.Bitmap();
		bgTxt.texture = RES.getRes("leftStepName_png")//关卡"剩余步数"文字
		bgTxt.width = 120;
		bgTxt.height = 75;
		bgTxt.x = bg.x + (bg.width - bgTxt.width) / 2;
		bgTxt.y = bg.y + 65;
		this.addChild(bgTxt)
	}
}