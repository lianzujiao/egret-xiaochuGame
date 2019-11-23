class GameData {

	//静态实例，存在于类的本身而不存在类的实例上
	public static unmapnum: number = 0;//空白地图元素
	public static mapData: number[][];//地图数据
	public static stepNum: number = 0;//当前关卡剩余步数
	public static levelStepNum: number = 0;//当前关卡要求步数
	public static elementTypes: number[];//当前关卡出现的元素类型
	public static levelReq: LevelRequire;//过关要求
	public static elements: GameElement[];//存放游戏元素（id，location(0~63)，type）
	public static unusedElements: number[];//游戏中未使用的元素的ID
	public static levelBackgroundImageName: string = "";//背景图

	public static MaxRow: number = 8; //最大行数
	public static MaxColumn: number = 8; //最大列数
	public static currentElementNum: number = 0 //当前可用元素数量，因为地图形状是可变的

	public static init() {
		GameData.mapData = [];
		// 循环初始化二维地图
		for (let i = 0; i < GameData.MaxRow; i++) {
			let arr: number[] = [];
			for (let t = 0; t < GameData.MaxColumn; t++) {
				GameData.mapData[t].push(-2)//设定-2表示当前地图是空的，可以使用， -1则是地图不能使用
			}
		};
		GameData.levelReq = new LevelRequire();
		GameData.elements = []; //游戏元素
		GameData.unusedElements = [] //未使用游戏元素
		let len: number = GameData.MaxRow * GameData.MaxColumn; //最大的元素数量
		for (let q = 0; q < len; q++) {
			let ele: GameElement = new GameElement();
			ele.id = q;
			GameData.elements.push(ele);//将游戏类型元素压入当前游戏关卡做游戏元素
			GameData.unusedElements.push(q);

		}
		GameData.stageW = egret.MainContext.instance.stage.stageWidth;
		GameData.stageH = egret.MainContext.instance.stage.stageHeight;
		// egret.MainContext.instance.stage.stageWidth;
	}

	public static stageW: number = 0; //舞台宽度
	public static stageH: number = 0; //舞台高度
}