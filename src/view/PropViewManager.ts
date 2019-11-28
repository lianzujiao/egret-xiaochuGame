class PropViewManager {
	private _layer: egret.Sprite;
	private _currentID: number = -1;//未曾点击过任何道具则ID为-1，否则ID为点击的道具的id值
	public static proptype: number = -1;//道具类型
	public constructor(layer: egret.Sprite) {
		this._layer = layer;
		this.init();
	}
	private _props: PropView[];
	private init() {
		this._props = new Array();
		this.createData()
	}

	/**
	 * 管理道具栏的位置以及各种道具的可用数量
	 */
	private createData() {
		for (let i = 0; i < 5; i++) {
			var prop: PropView = new PropView(i);
			prop.x = 15 + (5 + prop.width) * i;
			prop.y = GameData.stageH - prop.height - 10;
			this._layer.addChild(prop);
			this._props.push(prop);
			prop.num = Math.floor(Math.random() * 5);//随机指定各种道具的可用数量
			prop.id = i;
			prop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this)//道具被点击时
		}
	}

	/**
	 * 道具被点击时改变当前currentID和道具状态
	 */
	private click(evt: egret.TouchEvent) {
		if (this._currentID != -1) {
			this._props[this._currentID].setFocus(false);
			if (this._currentID == (<PropView>evt.currentTarget).id) {//连续两侧点击同一个道具时取消选择
				this._currentID = -1;
				PropViewManager.proptype = -1
			} else {
				
				this._currentID < (<PropView>evt.currentTarget).id;
				this._props[this._currentID].setFocus(true);
				PropViewManager.proptype = this._props[this._currentID].proptype;
			}

		}
		else {
			this._currentID = (<PropView>evt.currentTarget).id;
			this._props[this._currentID].setFocus(true);
			PropViewManager.proptype = this._props[this._currentID].proptype;
		}
	}
	

	/**
	 * 使用一次道具数量就减一
	 */
	public useProp() {
		this._props[this._currentID].num--;
		this._props[this._currentID].setFocus(false);
		this._currentID = -1;
		PropViewManager.proptype = -1
	}

}