class MapDataPares { //解析json中的地图数组
	public static createdMapData(val:number[]):void{
		let len:number=val.length;
		GameData.unmapnum=len; //地图未使用元素数量
		let index:number=0;
		for(let i=0;i<len;i++){
			index=val[i];
			var row:number=Math.floor(index/GameData.MaxColumn); //向下舍入得到当前设定的行
			var col:number=index%GameData.MaxRow;//得到当前设定的列
			GameData.mapData[row][col]=-1;

		}
		GameData.currentElementNum=GameData.MaxRow*GameData.MaxColumn-len;//游戏中可用地图数据的长度
	}
}