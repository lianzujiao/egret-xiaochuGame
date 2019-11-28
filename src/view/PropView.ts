class PropView extends egret.Sprite {
	public constructor(type: number) {
		super();
		this._type = type;
		this.init();
	}

	//道具元素界面
	private _view_box: egret.Bitmap;//道具盒子
	private _view_activate: egret.Bitmap;//激活道具图像
	private _numText: egret.TextField;//可用道具数量
	private _type: number = -1;//道具类型
	public id: number = -1;//道具id

	public get proptype(): number { //返回道具类型
		return this._type;
	}

	private init() {
		this.createView();
		this.createNumText();
		this.addChild(this._view_activate);
		this.addChild(this._view_box);
		this.addChild(this._numText);
		this.setActivateState(true);
	}
	//设置道具的可用数量
	private createNumText() {
		this._numText = new egret.TextField();
		this._numText.x = this._view_activate.width - 31;
		this._numText.textColor = 0xff0000;
		this._numText.size = 40
	}

	//
	private createView() {
		let _interval: number = 15;
		let _width: number = (GameData.stageW - _interval * 6) / 5;
		if (!this._view_activate) {
			this._view_activate = new egret.Bitmap();
			this._view_activate.texture = RES.getRes(this.getActivateTexture(this._type));
			this._view_activate.width = _width;
			this._view_activate.height = _width;
		}
		if (!this._view_box) {
			this._view_box = new egret.Bitmap();
			this._view_box.texture = RES.getRes("propbox_png")//道具盒子图片
			this._view_box.width = this._view_activate.width + 10
			this._view_box.height = this._view_activate.height + 10;
			this._view_box.x = -5;
			this._view_box.y = -5;
		}
	}

	private _num: number = 0//数量

	/**
	 * 获取各个道具的可使用数量
	 */
	public get num(): number {
		return this._num;
	}

	/**
	 * 设置道具的数量
	 */
	public set num(val: number) {
		this._num = val;
		this._numText.text = val.toString();
		if (val <= 0) {
			this.setActivateState(false)
		}
		else {
			this.setActivateState(true)
		}
	}

	/**
	 * @val 是否为可激活状态，激活状态调用彩色图片
	 */
	private setActivateState(val: boolean) {
		this.touchEnabled = val;
		if (val) {
			this._view_activate.texture = RES.getRes(this.getActivateTexture(this._type));//彩色图片
			this._view_box.texture = RES.getRes("propbox_png");
		}
		else {
			this._view_activate.texture = RES.getRes(this.getDisableTexture(this._type))//灰色图片
			this._view_box.texture = RES.getRes("propboxdisable_png");
		}
	}

	//可使用状态时是彩色图片
	private getActivateTexture(type: number): string {
		let textureRename: string = "";
		switch (type) {
			case 0: textureRename = "tongse_png";
				break;
			case 1: textureRename = "zhadan_png";
				break;
			case 2: textureRename = "zhenghang_png";
				break;
			case 3: textureRename = "zhenglie_png";
				break;
			case 4: textureRename = "chanzi_png";
				break;

		}
		return textureRename
	}
	/**
	 * 道具数量小于0时图片为灰色的
	 */
	private getDisableTexture(type: number): string {
		let textureRename: string = "";
		switch (type) {
			case 0: textureRename = "tongsedisable_png";
				break;
			case 1: textureRename = "zhadandisable_png";
				break;
			case 2: textureRename = "zhenghangdisable_png";
				break;
			case 3: textureRename = "zhengliedisable_png";
				break;
			case 4: textureRename = "chanzidisable_png";
				break;

		}
		return textureRename
	}
	public setFocus(val: boolean) {
		if (val) {
			this._view_box.texture = RES.getRes("propboxactive_png")
		} else {
			this._view_box.texture = RES.getRes("propbox_png")
		}
	}
}