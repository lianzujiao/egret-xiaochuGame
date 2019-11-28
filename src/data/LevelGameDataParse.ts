class LevelGameDataParse {//关卡过关条件数据解析

	public static parseLevelGameData(val:any){ //使用泛型定义
		GameData.stepNum=val.step; //关卡步数
		GameData.levelStepNum=val.step; //剩余可用步数
		GameData.elementTypes=val.element;//关卡要求的过关条件元素类型
		GameData.levelBackgroundImageName=val.levelBgImg;
		LevelGameDataParse.parseLevelRequire(val.levelreq);
	}
	private static parseLevelRequire(val:any){
		GameData.levelReq.openChange(); //openchange将原有数据清空，重新赋值
		let len:number=val.length;
		for(let i=0;i<len;i++){
			GameData.levelReq.addElement(val[i].type,val[i].num) //循环添加过关条件游戏元素
		}
	}
}