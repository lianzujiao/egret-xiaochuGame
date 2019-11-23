class LevelElementView extends egret.Sprite {
	public constructor() {
		super();
		this.init();
	}



	public eleType: string = "";
	public set num(val: number) {
		if (val <= 0) {
			//已经没了，显示对号
			if (!this.checkmarkbit) {
				this.checkmarkbit = new egret.Bitmap();
				this.checkmarkbit.texture = RES.getRes("checkmark_png");
				this.checkmarkbit.x = (this.bitmap.width - this.checkmarkbit.width) / 2;
				this.checkmarkbit.y = this.bitmap.height + this.bitmap.y - this.checkmarkbit.heiht;
				this.addChild(this.checkmarkbit);
				this.removeChild(this.bittext);
			}
		}
		else {
			this.bittext.text = val.toString();
		}
	}
	public get num(): number {
		return Number(this.bittext.text);
	}

	private checkmarkbit: egret.Bitmap;//对勾图
	private bitmap: egret.Bitmap;//对勾图

	private bittext: egret.BitmapText;
	private init() {
		this.touchChildren = false;
		if (!this.bitmap) {
			this.bitmap = new egret.Bitmap();
		}
		let bitWidth:number=(GameData.stageW-40)/GameData.MaxColumn;
		this.bitmap.width=bitWidth;
		this.bitmap.height=bitWidth;
		this.addChild(this.bitmap);

		this.bittext=new egret.BitmapText();
		this.bittext.font=RES.getRes("number_fnt");
		this.bittext.text="0";
		this.bittext.x=(bitWidth-this.bittext.width)/2;
		this.bittext.y=this.bitmap.height+this.bitmap.y-this.bittext.height/2;
		this.addChild(this.bittext);
	}

	public setTexture(val:string){
		this.bitmap.texture=RES.getRes(val);
	}
}