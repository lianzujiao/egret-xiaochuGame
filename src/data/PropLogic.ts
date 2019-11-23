class PropLogic {
	/**
	 * 道具使用判断
	 * @proptype 道具类型
	 * @elLoc 点击的元素的location
	 */
	public static useProp(propType: number, elLoc: number) {
		switch (propType) {
			case 0: PropLogic.removeType(elLoc); break;
			case 1: PropLogic.removeRound(elLoc); break;
			case 2: PropLogic.removeRow(elLoc); break;
			case 3: PropLogic.removeCol(elLoc); break;
			case 4: PropLogic.removeOne(elLoc); break;
		}
	}

	/**
	 * 消除同类型
	 * @location 点击元素的Location(0~63)
	 */
	public static removeType(location) {
		LinkLogic.lines = [];
		let arr: number[] = [];
		let type: string = GameData.elements[GameData.mapData[Math.floor(location / 8)][location % 8]].type;
		for (let i = 0; i < GameData.MaxRow; i++) {
			for (let t = 0; t < GameData.MaxColumn; t++) {
				if (GameData.mapData[i][t] != -1 && GameData.elements[GameData.mapData[i][t]].type == type) {
					arr.push(GameData.mapData[i][t]);
				}
			}
		}
		LinkLogic.lines.push(arr)
	}

	/**
	 * 消除一周
	 */
	public static removeRound(location) {
		LinkLogic.lines = [];
		let i = Math.floor(location / 8)
		let t = location % 8;
		let arr: number[] = [];
		arr.push(GameData.elements[GameData[i][t]].id)
		if (i > 0 && GameData[i - 1][t] != -1) {//上
			arr.push(GameData.elements[GameData[i - 1][t]].id)
		}
		if (i < (GameData.MaxRow - 1) && GameData.mapData[i + 1][t] != -1) {//下
			arr.push(GameData.elements[GameData[i + 1][t]].id)
		}
		if (t > 0 && GameData[i][t - 1] != -1) {//左
			arr.push(GameData.elements[GameData[i][t - 1]].id)
		}
		if (t < (GameData.MaxColumn - 1) && GameData.mapData[i][t + 1] != -1) {//右
			arr.push(GameData.elements[GameData[i][t + 1]].id)
		}
		LinkLogic.lines.push(arr)
	}
	/**
	 * 消除一行
	 */
	public static removeRow(location) {
		LinkLogic.lines = [];
		let rowIndex = Math.floor(location / 8);
		let arr: number[] = []
		for (let t = 0; t < GameData.MaxColumn; t++) {
			if (GameData.mapData[rowIndex][t] != -1) {
				console.log(rowIndex, t);
				arr.push(GameData.elements[GameData.mapData[rowIndex][t]].id)
			}
		}
		LinkLogic.lines.push(arr);

	}

	/**
	 * 消除一列
	 */
	public static removeCol(location) {
		LinkLogic.lines = [];
		let colIndex =location%8;
		let arr: number[] = []
		for (let i = 0; i < GameData.MaxRow; i++) {
			if (GameData.mapData[i][colIndex] != -1) {
				console.log(i, colIndex);
				arr.push(GameData.elements[GameData.mapData[i][colIndex]].id)
			}
		}
		LinkLogic.lines.push(arr);
	}

	/**
	 * 消除单个
	 */
	public static removeOne(location) {
		LinkLogic.lines = [];
		LinkLogic.lines.push([GameData.elements[GameData.mapData[Math.floor(location/8)][location%8]].id])
	}
}
