class LevelElementView extends egret.Sprite {
	public constructor() {
		super();
		this.init();
	}



	public eleType: string = "";//元素类型
	public set num(val: number) {
		if (val <= 0) {
			//已经没了，显示对号
			if (!this.checkmarkbit) {
				this.checkmarkbit = new egret.Bitmap();
				this.checkmarkbit.texture = RES.getRes("checkMark_png");
				this.checkmarkbit.x = (this.bitmap.width - this.checkmarkbit.width) / 2;
				this.checkmarkbit.y = this.bitmap.height + this.bitmap.y - this.checkmarkbit.height;
				this.addChild(this.checkmarkbit);
				this.removeChild(this.bittext);
			}
		}
		else {
			this.bittext.text = val.toString();
			this.bittext.size=40,
			this.bittext.textColor=0xff0000;
		}
	}
	public get num(): number {
		return Number(this.bittext.text);
	}

	private checkmarkbit: egret.Bitmap;//对勾图
	private bitmap: egret.Bitmap;//

	private bittext: egret.TextField;
	private init() {
		this.touchChildren = false;
		if (!this.bitmap) {
			this.bitmap = new egret.Bitmap();
		}
		let bitWidth:number=(GameData.stageW-40)/GameData.MaxColumn;
		this.bitmap.width=bitWidth;
		this.bitmap.height=bitWidth;
		this.addChild(this.bitmap);

		this.bittext=new egret.TextField();
		this.bittext.text="0";
		this.bittext.x=(bitWidth-this.bittext.width)/2;
		this.bittext.y=this.bitmap.height+this.bitmap.y-this.bittext.height/2;
		this.addChild(this.bittext);
	}

	public setTexture(val:string){
		this.bitmap.texture=RES.getRes(val);
	}
}