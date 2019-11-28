class LevelReqViewManager {
	private _layer: egret.Sprite;
	public constructor(layer: egret.Sprite) {
		this._layer = layer;
		this.init();
	}
	private elements: LevelElementView[];
	private init() {
		this.elements = new Array();
	}
	private stepNumText: egret.TextField;
	//创建当前关卡的过关条件元素
	public createCurrentLevelReq() {
		let len: number = GameData.levelReq.getLevelReqNum();
		let el: LevelElementView;
		// console.log(len)
		for (let i = 0; i < len; i++) {
			if (this.elements.length <= i) {
				el = new LevelElementView();
				this.elements.push(el);
			} else {

				el = this.elements[i];
			}

			el.eleType = GameData.levelReq.requireElements[i].type;
			// console.log(el.eleType)
			el.setTexture("hc_animal_" + el.eleType + "_png");

			el.x = 43 + (5 + el.width) * i;
			el.y = 95;
			el.num = GameData.levelReq.requireElements[i].num;
			this._layer.addChild(el);
		}
		if (!this.stepNumText) {
			this.stepNumText = new egret.TextField();
			this.stepNumText.x = GameData.stageW - 95-30;
			this.stepNumText.y = 90;
			this.stepNumText.scaleX = 1.5;
			this.stepNumText.scaleY = 1.5;
			this._layer.addChild(this.stepNumText);
			//关卡步数获取设置，数据是在GameData当中
			this.stepNumText.text = GameData.stepNum.toString();
		}

	}

	/**
	 * 判断当前消除的元素是否存在指定要消除的元素，如果存在则返回true,否则返回false
	 */
	public haveReqType(type: string): boolean {
		var l: number = this.elements.length;
		for (var i = 0; i < l; i++) {
			if (this.elements[i].eleType == type) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 获取指定类型元素的位置，
	 * 目的：指定过关元素被消除时会有一个飞到这个元素的位置上的动画，因此需要获取位置
	 */
	public getPointByType(type: string): egret.Point {
		var p: egret.Point = new egret.Point();
		var l: number = this.elements.length;
		for (let i = 0; i < l; i++) {
			if (this.elements[i].eleType == type) {
				p.x = this.elements[i].x + this.elements[i].width / 2
				p.y = this.elements[i].y + this.elements[i].height / 2
			}
		}
		return p;
	}

	/**
	 * 更新关卡过关元素数据
	 */
	public update() {
		console.log("更新关卡过关条件数据");
		let len: number = GameData.levelReq.getLevelReqNum();
		for (let i = 0; i < len; i++) {
			this.elements[i].num = GameData.levelReq.requireElements[i].num;
		}
	}
	//更新步数
	public updateStep() {
		this.stepNumText.text = GameData.stepNum.toString();
	}

}