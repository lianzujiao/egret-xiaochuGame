class GameOverPanel extends egret.Sprite {
	public constructor() {
		super()
	}
	private _view:egret.Bitmap;
	private _isSuccess:boolean=false;
	public show(isSuccess:boolean){
		this._isSuccess=isSuccess;
		this._view=new egret.Bitmap();
		this._view.texture=RES.getRes("levelreq_png");
		this._view.width=GameData.stageW-30;
		this._view.height=GameData.stageW-30;
		this._view.x=this._view.width/-2;
		this._view.y=this._view.height/-2;//GameData.stageH/4
		this.addChild(this._view)

		this.x=GameData.stageW/2;
		this.y=GameData.stageH/2;
		this.scaleX=0.1;
		this.scaleY=0.1;
		egret.Tween.get(this).to({scaleX:1,scaleY:1},700,egret.Ease.bounceOut).call(this.playStarAni,this);
		
	}
	private playStarAni(){
		let gameOver:egret.Bitmap=new egret.Bitmap();
		gameOver.texture=RES.getRes("gameovertitle_png");
		gameOver.width=this._view.width/2;
		gameOver.height=60;
		gameOver.x=this._view.x+(this._view.width-gameOver.width)/2
		gameOver.y=this._view.y-10;
		gameOver.scaleX=0;
		gameOver.scaleY=0;
		this.addChild(gameOver);
		egret.Tween.get(gameOver).to({scaleX:1,scaleY:1},700,egret.Ease.bounceOut);

		console.log("播放动画失败");
		if(this._isSuccess){
			//成功动画
			let chengzi:egret.Bitmap=new egret.Bitmap();
			chengzi.texture=RES.getRes("chengzi_png");
			chengzi.width=(this._view.width-50)/3;
			chengzi.height=chengzi.width;
			chengzi.x=(GameData.stageW-chengzi.width*2)/3+this._view.x;
			chengzi.y=150+this._view.y;
			chengzi.scaleX=1.5;
			chengzi.scaleY=1.5;
			chengzi.alpha=0;
			this.addChild(chengzi);
			egret.Tween.get(chengzi).to({scaleX:1,scaleY:1,alpha:1},700,egret.Ease.circIn)

			let gongzi:egret.Bitmap=new egret.Bitmap();
			gongzi.texture=RES.getRes("gongzi_png");
			gongzi.width=(this._view.width-50)/3;
			gongzi.height=gongzi.width;
			gongzi.x=(GameData.stageW-boizi.width*2)/3*2+gongzi.width+this._view.width;//？
			gongzi.y=150+this._view.y;
			gongzi.scaleX=1.5;
			gongzi.scaleY=1.5;
			gongzi.alpha=0;
			this.addChild(gongzi);
			egret.Tween.get(gongzi).wait(400).to({scaleX:1,scaleY:1,alpha:1},700,egret.Ease.circIn)
		}
		else{
			//失败动画
			let shizi:egret.Bitmap=new egret.Bitmap();
			shizi.texture=RES.getRes("shizi_png");
			shizi.width=(this._view.width-50)/3;
			shizi.height=shizi.width;
			shizi.x=(GameData.stageW-boizi.width*2)/3+this._view.x;
			shizi.y=150+this._view.y;
			shizi.scaleX=1.5;
			shizi.scaleY=1.5;
			shizi.alpha=0;
			this.addChild(shizi);
			egret.Tween.get(shizi).to({scaleX:1,scaleY:1,alpha:1},700,egret.Ease.circIn)

			var boizi:egret.Bitmap=new egret.Bitmap();
			boizi.texture=RES.getRes("boizi_png");
			boizi.width=(this._view.width-50)/3;
			boizi.height=boizi.width;
			boizi.x=(GameData.stageW-boizi.width*2)/3*2+boizi.width+this._view.width;//？
			boizi.y=150+this._view.y;
			boizi.scaleX=1.5;
			boizi.scaleY=1.5;
			boizi.alpha=0;
			this.addChild(boizi);
			egret.Tween.get(boizi).wait(400).to({scaleX:1,scaleY:1,alpha:1},700,egret.Ease.circIn)
		}
	}
}