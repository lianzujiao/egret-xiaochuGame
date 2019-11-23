class ElementView extends egret.Sprite {
	private thisparent: egret.Sprite;
	public constructor(tparent: egret.Sprite) {
		super();
		this.thisparent = tparent;
		this.init();
	}

	public location: number = 0; //位置编号，用于提供移动使用

	//编号相关，携带测试信息
	public _id: number = -1;//ID编号，对应GameData.elements中的数据ID,与数据下标相同
	public get id(): number {
		return this._id
	}
	public set id(val: number) {
		this._id = val;
	}

	//元素位图，初始化相关功能
	private bitmap: egret.Bitmap;//当前元素的位图数据

	private init() {
		this.touchEnabled = true;
		this.touchChildren = false;
		this.bitmap = new egret.Bitmap();
		var bitwidth: number = (GameData.stageW - 40) / GameData.MaxColumn;
		this.bitmap.width = bitwidth - 10;
		this.bitmap.height = bitwidth - 10;
		this.bitmap.x = -1 * bitwidth / 2;
		this.bitmap.y = -1 * bitwidth / 2;
		this.addChild(this.bitmap);
	}

	//设置贴图
	private setTexture(val: string) {
		this.bitmap.texture = RES.getRes(val);
	}

	//焦点管理相关
	private _focus: boolean = false;
	public get focus(): boolean {
		return this._focus
	}
	private _focusMc: egret.MovieClip;
	public setfocus(val: boolean) {
		if (val != this._focus) {
			this._focus = val;
			if (!this._focusMc) {
				let tex = RES.getRes("focusmc_png")
				let data = RES.getRes("focusmc_json")
				let mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data.tex)
				this._focusMc = new egret.MovieClip(mcf.generateMovieClipData("focusmc"))
				this._focusMc.x = this._focusMc.width / -2
				this._focusMc.y = this._focusMc.height / -2
				this._focusMc.width = this.bitmap.width;
				this._focusMc.height = this.bitmap.height;
			}
			if (val) {
				this.addChild(this._focusMc)
				this._focusMc.play(-1);
			}
			else {
				if (this._focusMc.parent) {
					this._focusMc.stop();
					this.removeChild(this._focusMc)
				}
			}
		}
	}

	/**
	 * 移动到新位置，乱序使用
	 */
	public speed: number = 700;
	//移动到新位置，使用cubilInOut算法移动，直线运动
	public move() {
		var tw: egret.Tween = egret.Tween.get(this);
		tw.to({ x: this.targetX(), y: this.targetY() })//源码 targetX(),targetY()
	}

	/**
	 * 显示元素，从上方掉落
	 * 掉落后添加到父级显示列表
	 */

	public show(wait: number) {
		var tw: egret.Tween = egret.Tween.get(this);
		tw.wait(wait, false);

		tw.call(this.addThisToParent, this)//动画结束后回调一个函数

		tw.to({ x: this.targetX(), y: this.targetY() }, this.speed, egret.Ease.bounceOut)

	}

	private addThisToParent() {//添加到父级
		if (!this.parent) {
			this.thisparent.addChild(this)
		}
	}

	public targetX(): number {//计算目标x轴位置
		var girdWidth: number = (GameData.stageW - 40) / GameData.MaxColumn;
		var xx: number = 20 + girdWidth * (this.location % GameData.MaxColumn) + girdWidth / 2 + 5
		return xx
	}
	public targetY(): number {//计算目标y轴位置
		var girdWidth: number = (GameData.stageW - 40) / GameData.MaxColumn;
		var startY: number = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - girdWidth * GameData.MaxColumn;
		var yy: number = startY + girdWidth * (Math.floor(this.location / 8)) + girdWidth / 2 + 5
		return yy
	}

	/**
	 * 两个元素交换后但无法消除，也就是移动并返回的动画
	 */
	public moveAndBack(location: number, isscale: boolean = false) {
		let girdWidth: number = (GameData.stageW - 40) / GameData.MaxColumn;
		let xx: number = 20 + girdWidth * (location % GameData.MaxColumn) + girdWidth / 2 + 5;
		var startY: number = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - girdWidth * GameData.MaxColumn;
		var yy: number = startY + girdWidth * (Math.floor(this.location / 8)) + girdWidth / 2 + 5
		//移动时会有放大缩小效果，移动回来时，scale都设置为1
		let tw: egret.Tween = egret.Tween.get(this);
		if (isscale) {
			tw.to({ x: xx, y: yy, scaleX: 1.2, scaleY: 1.2 }, 300, egret.Ease.cubicOut).call(this.back, this);
		}
		else {
			tw.to({ x: xx, y: yy, scaleX: 0.8, scaleY: 0.8 }, 300, egret.Ease.cubicOut).call(this.back, this);
		}
	}
	private back() {
		var tw: egret.Tween = egret.Tween.get(this);
		tw.to({ x: this.targetX(), y: this.targetY(), scaleX: 1, scaleY: 1 }, 300, egret.Ease.cubicOut);
	}

	/**
	 * 移动后元素消除的动画
	 */
	public moveAndScale(location: number, isscale: boolean = false) {
		let girdWidth: number = (GameData.stageW - 40) / GameData.MaxColumn;
		let xx: number = 20 + girdWidth * (location % GameData.MaxColumn) + girdWidth / 2 + 5;
		var startY: number = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - girdWidth * GameData.MaxColumn;
		var yy: number = startY + girdWidth * (Math.floor(this.location / 8)) + girdWidth / 2 + 5
		//移动时会有放大缩小效果，移动回来时，scale都设置为1
		let tw: egret.Tween = egret.Tween.get(this);
		if (isscale) {
			tw.to({ x: xx, y: yy, scaleX: 1.4, scaleY: 1.5 }, 300, egret.Ease.cubicOut).call(this.backScale, this);
		}
		else {
			tw.to({ x: xx, y: yy, scaleX: 0.6, scaleY: 0.6 }, 300, egret.Ease.cubicOut).call(this.backScale, this);
		}
	}

	private backScale() {
		var tw: egret.Tween = egret.Tween.get(this);
		tw.to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut).call(this.canRemove, this);
	}
	private canRemove() {
		let evt: ElementViewManagerEvent = new ElementViewManagerEvent(ElementViewManagerEvent.REMOVE_ANIMATION_OVER);
		this.dispatchEvent(evt);
	}

	/**
	 * 此动画用于将元素移动到关卡积分跟位置，然后移除显示列表
	 */
	//播放曲线动画
	public playCurveMove(tx: number, ty: number) {
		let tw: egret.Tween = egret.Tween.get(this);
		tw.to({ x: tx, y: ty }, 700, egret.Ease.quadOut).call(this.overCurveMove, this);
	}

	private overCurveMove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
		let evt: ElementViewManagerEvent = new ElementViewManagerEvent(ElementViewManagerEvent.UPDATE_MAP);
		this.dispatchEvent(evt);
	}

	/**
	 * 删除元素，当元素不属于当前关卡时，执行此动画
	 */
	//播放直接消除动画，自己放大然后缩回原来大小，直接删除
	public playRemoveAni() {
		let tw: egret.Tween = egret.Tween.get(this);
		tw.to({ scaleX: 1.4, scaleY: 1.4 }, 300, egret.Ease.cubicInOut).to({ scaleX: 0.1, scaleY: 0.1 }, 300, egret.Ease.cubicInOut).call(this.removeAniCall, this);
	}
	private removeAniCall() {
		if (!this.parent) {
			this.parent.removeChild(this);
		}
		let evt: ElementViewManagerEvent = new ElementViewManagerEvent(ElementViewManagerEvent.UPDATE_MAP);
		this.dispatchEvent(evt);
	}

	/**
	 * 移动到新位置。方块被消除后重新生成下落使用
	 * //根据列编号，重新计算x轴位置，从起始Y轴播放下落动画
	 */
	public moveNewLocation() {
		if (!this.parent) {
			var girdWidth: number = (GameData.stageW - 40) / GameData.MaxColumn;
			let startY: number = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - girdWidth * GameData.MaxColumn;
			this.y = startY - this.width;
			this.scaleX = 1;
			this.scaleY = 1;
			this.x = this.targetX();
			this.thisparent.addChild(this);
		}
		egret.Tween.get(this).to({ x: this.targetX(), y: this.targetY() }, this.speed, egret.Ease.bounceOut).call(this.moveNewLocationOver, this)
	}
	private moveNewLocationOver() {
		let evt: ElementViewManagerEvent = new ElementViewManagerEvent(ElementViewManagerEvent.UPDATE_VIEW_OVER);
		this.dispatchEvent(evt);
	}
}