class PropView extends egret.Sprite {
	public constructor() {
		super();
		this._type = type;
		this.init();
	}

	//道具元素界面
	private _view_box: egret.Bitmap;
	private _view_activate: egret.Bitmap;
	private _numText: egret.BitmapText;
	private _type: number = -1;
	public id: number = -1;

	public get proptype(): number {
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
	private createNumText() {
		this._numText = new egret.BitmapText();
		this._numText.font = RES.getRes("number_fnt");
		this._numText.x = this._view_activate.width - 31;
	}
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
	public get num(): number {
		return this._num;
	}
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

	private setActivateState(val: boolean) {
		this.touchEnabled = val;
		if (val) {
			this._view_activate.texture = RES.getRes(this.getActivateTexture(this._type));
			this._view_box.texture = RES.getRes("propbox_png");
			this._numText.font = RES.getRes("number_fnt");
		}
		else {
			this._view_activate.texture = RES.getRes(this.getDisableTexture(this._type))
			this._view_box.texture = RES.getRes("propboxdisable_png");
			this._numText.font = RES.getRes("numberdisable_fnt");
		}
	}

	private getActivateTexture(type: number): string {
		let textureRename: string = "";
		switch (type) {
			case 0: textureRename = "tongse_png";
				break;
			case 1: textureRename = "zhadan_png";
				break;
			case 0: textureRename = "zhenghang_png";
				break;
			case 0: textureRename = "zhenglie_png";
				break;
			case 0: textureRename = "chanzi_png";
				break;

		}
		return textureRename
	}
	private getDisableTexture(type: number): string {
		let textureRename: string = "";
		switch (type) {
			case 0: textureRename = "tongsedisble_png";
				break;
			case 1: textureRename = "zhadandisble_png";
				break;
			case 0: textureRename = "zhenghangdisble_png";
				break;
			case 0: textureRename = "zhengliedisble_png";
				break;
			case 0: textureRename = "chanzidisble_png";
				break;

		}
		return textureRename
	}
	public setFocus(val:boolean){
		if(val){
			this._view_box.texture=RES.getRes("propboxactive_png")
		}else{
			this._view_box.texture=RES.getRes("propbox_png")
		}
	}
}