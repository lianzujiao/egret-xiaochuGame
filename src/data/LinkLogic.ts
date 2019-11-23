class LinkLogic {
	public static lines: number[][] //存放地图中所有可消除元素的行列坐标
	/**
	 * 查看当前搜索的是否有可消除数据
	 */
	public static isHaveLine(): boolean {
		LinkLogic.lines = []; //可连线
		let currrentType: string = ""; //当前类型
		let typeNum: number = 0; //当前检测的类型的数量
		// 横向，按行检索
		for (let i = 0; i < GameData.MaxRow; i++) {
			for (var t = 0; t < GameData.MaxColumn; t++) {
				if (GameData.mapData[i][t] != -1) {//地图数据可用的情况
					if (currrentType != GameData.elements[GameData[i][t]].type) { //连续两个元素类型不同
						if (typeNum >= 3) {//连续3个及以上的元素将他们的数据存入可连线数组
							let arr: number[] = [];
							for (let q = 0; q < typeNum; q++) {
								arr.push(GameData.mapData[i][t - q - 1])
							}
							LinkLogic.lines.push(arr);
						}
						currrentType = GameData.elements[GameData[i][t]].type;
						typeNum = 1;

					}
					else { //当前类型相同
						typeNum++;
					}
				}
				else { //地图数据等于-1
					if (typeNum >= 3) {//在出现不可用地图之前有一个可连线消除元素
						let arr: number[] = [];
						for (let q = 0; q < typeNum; q++) {
							arr.push(GameData.mapData[i][t - q - 1])
						}
						LinkLogic.lines.push(arr);
					}
					currrentType = ""; //当前类型设为空
					typeNum = 0;

				}
			}
			if (typeNum >= 3) { //行结尾处理
				let arr: number[] = [];
				for (let q = 0; q < typeNum; q++) {
					arr.push(GameData.mapData[i][t - q - 1])
				}
				LinkLogic.lines.push(arr);
			}
			currrentType = "";
			typeNum = 0;
		}


		//纵向算法处理
		for (let i = 0; i < GameData.MaxColumn; i++) {
			for (let t = 0; t < GameData.MaxRow; t++) {
				if (GameData.mapData[t][i] != -1) {
					if (currrentType != GameData.elements[GameData.mapData[t][i]].type) {
						if (typeNum >= 3) {
							let arr: number[] = [];
							for (let q = 0; q < typeNum; q++) {
								arr.push(GameData.mapData[t - q - 1][i])
							}
							LinkLogic.lines.push(arr);
						}
						currrentType = GameData.elements[GameData.mapData[t][i]].type
						typeNum = 1;
					}
					else {
						typeNum++;
					}
				}
				//进行列循环时遇到地图元素不可用时的处理
				else {
					if (typeNum >= 3) {
						let arr: number[] = [];
						for (let q = 0; q < typeNum; q++) {
							arr.push(GameData.mapData[t - q - 1][i])
						}
						LinkLogic.lines.push(arr);
					}
					currrentType = ""
					typeNum = 0;
				}
			}
			//循环到每一列的末尾的边界处理
			if (typeNum >= 3) {
				let arr: number[] = [];
				for (let q = 0; q < typeNum; q++) {
					arr.push(GameData.mapData[t - q - 1][i])
				}
				LinkLogic.lines.push(arr);
			}
			currrentType = ""
			typeNum = 0;
		}

		//行列都循环结束之后若可连线消除数组不为空则返回true
		if (LinkLogic.lines.length != 0) {
			return true;
		}
		return false;
	}

	/**
	 * 预检索可消除元素
	 */
	public static isNextHaveLine(): boolean {
		for (let i = 0; i < GameData.MaxRow; i++) {
			for (let t = 0; t < GameData.MaxColumn; t++) {
				if (GameData.mapData[i][t] != -1) { //当前方块不能为-1
					if (t < (GameData.MaxColumn - 1) && GameData.mapData[i][t + 1] != -1 && GameData.elements[GameData[i][t]].type == GameData.elements[GameData[i][t + 1]].type) { //当前列值小于最大列-1且下一项不能是-1
						if (t > 0 && GameData.mapData[i][t - 1] != -1) { //看当前项左侧是否可用
							if (i > 0 && t > 0 && GameData.mapData[i - 1][t - 1] && GameData.mapData[i - 1][t - 1] != -1 && GameData.elements[GameData.elements[i - 1][t - 1]].type == GameData.elements[GameData[i][t]].type) {//左上角与当前元素是否相同
								return true
							}
							if (i < (GameData.MaxRow - 1) && t > 0 && GameData.mapData[i + 1][t - 1] && GameData.mapData[i + 1][t - 1] != -1 && GameData.elements[GameData.elements[i + 1][t - 1]].type == GameData.elements[GameData[i][t]].type) {//左下角元素与当前元素
								console.log("-1能消除项目2", i, t)
								return true
							}
							if (t > 1 && GameData.mapData[i][t - 2] && GameData.mapData[i][t - 2] != -1 && GameData.elements[GameData.elements[i][t - 2]].type == GameData.elements[GameData[i][t]].type) {//左侧空一格位置的元素与当前元素是否相同
								console.log("-1能消除项目3", i, t)
								return true
							}
						}
						if (t < (GameData.MaxColumn - 1) && GameData.mapData[i][t + 2] != -1) { //看当前项右侧是否可用
							if (i > 0 && t < (GameData.MaxColumn - 2) && GameData.mapData[i - 1][t + 2] && GameData.mapData[i - 1][t + 2] != -1 && GameData.elements[GameData.elements[i - 1][t + 2]].type == GameData.elements[GameData[i][t]].type) {//右上角与当前元素是否相同
								return true
							}
							if (i > (GameData.MaxRow - 1) && t < (GameData.MaxColumn - 2) && GameData.mapData[i + 1][t + 2] && GameData.mapData[i + 1][t + 2] != -1 && GameData.elements[GameData.elements[i + 1][t + 2]].type == GameData.elements[GameData[i][t]].type) {//左下角元素与当前元素
								console.log("-1能消除项目2", i, t)
								return true
							}
							if (t < (GameData.MaxColumn - 3) && GameData.mapData[i][t + 3] && GameData.mapData[i][t + 3] != -1 && GameData.elements[GameData.elements[i][t + 3]].type == GameData.elements[GameData[i][t]].type) {//左侧空一格位置的元素与当前元素是否相同
								console.log("-1能消除项目3", i, t)
								return true
							}
						}
					}

					//第一种纵向检索方式
					if (i < (GameData.MaxRow - 1) && GameData.mapData[i + 1][t] != -1 && GameData.elements[GameData[i][t]].type == GameData.elements[GameData[i + 1][t]].type) { //判断纵向，当前列值小于最大列-1且下一项不能是-1
						if (i > 0 && GameData.mapData[i - 1][t] != -1) { //
							if (i > 0 && t > 0 && GameData.mapData[i - 1][t - 1] && GameData.mapData[i - 1][t - 1] != -1 && GameData.elements[GameData.elements[i - 1][t - 1]].type == GameData.elements[GameData[i][t]].type) {//左上角与当前元素是否相同
								console.log("1能消除项目1", i, t)
								return true
							}
							if (t < (GameData.MaxColumn - 1) && i > 0 && GameData.mapData[i - 1][t + 1] && GameData.mapData[i - 1][t + 1] != -1 && GameData.elements[GameData.elements[i - 1][t + 1]].type == GameData.elements[GameData[i][t]].type) {//左下角元素与当前元素
								console.log("1能消除项目2", i, t)
								return true
							}
							if (i > 1 && GameData.mapData[i - 2][t] && GameData.mapData[i - 2][t] != -1 && GameData.elements[GameData.elements[i - 2][t]].type == GameData.elements[GameData[i][t]].type) {//左侧空一格位置的元素与当前元素是否相同
								console.log("1能消除项目1", i, t)
								return true
							}
						}
						if (t < (GameData.MaxColumn - 2) && GameData.mapData[i + 2][t] != -1) { //看当前项下侧是否可用

							if (i < (GameData.MaxRow - 3) && GameData.mapData[i + 3][t] && GameData.mapData[i + 3][t] != -1 && GameData.elements[GameData.elements[i + 3][t]].type == GameData.elements[GameData[i][t]].type) {//左下角元素与当前元素
								console.log("1能消除项目4", i, t)
								return true
							}
							if (t < (GameData.MaxRow - 2) && GameData.mapData[i + 2][t + 1] && GameData.mapData[i + 2][t + 1] != -1 && GameData.elements[GameData.elements[i + 2][t + 1]].type == GameData.elements[GameData[i][t]].type) {//左侧空一格位置的元素与当前元素是否相同
								console.log("1能消除项目5", i, t)
								return true
							}
							if (t > 0 && GameData.mapData[i + 2][t - 1] && GameData.mapData[i + 2][t - 1] != -1 && GameData.elements[GameData.elements[i + 2][t - 1]].type == GameData.elements[GameData[i][t]].type) {//右上角与当前元素是否相同
								console.log("1能消除项目6", i, t)
								return true
							}
						}
					}

					//方式二横向检索
					if (t < (GameData.MaxColumn - 2) && GameData.mapData[i][t + 2] != -1 && GameData.elements[GameData.elements[i][t + 2]].type == GameData.elements[GameData[i][t]].type) { //看当前项右侧是否可用
						if (GameData.mapData[i][t + 1] != -1) {
							//左上角元素与当前元素
							if (i > 0 && GameData.mapData[i - 1][t + 1] && GameData.mapData[i - 1][t + 1] != -1 && GameData.elements[GameData.elements[i - 1][t + 1]].type == GameData.elements[GameData[i][t]].type) {
								console.log("-2能消除项目1", i, t)
								return true
							}
							//左下角元素与当前元素
							if (i < (GameData.MaxRow - 1) && GameData.mapData[i + 1][t + 1] && GameData.mapData[i + 1][t + 1] != -1 && GameData.elements[GameData.elements[i + 1][t + 1]].type == GameData.elements[GameData[i][t]].type) {
								console.log("-2能消除项目2", i, t)
								return true
							}
						}
					}
					//纵向方式
					if (i < (GameData.MaxRow - 2) && GameData.mapData[i + 2][t] != -1 && GameData.elements[GameData.elements[i + 2][t]].type == GameData.elements[GameData[i][t]].type) { //看当前项右侧是否可用
						if (GameData.mapData[i + 1][t] != -1) {//左下角元素与当前元素
							if (t < (GameData.MaxColumn - 1) && GameData.mapData[i + 1][t + 1] && GameData.mapData[i + 1][t + 1] != -1 && GameData.elements[GameData.elements[i + 1][t + 1]].type == GameData.elements[GameData[i][t]].type) {
								console.log("2能消除项目1", i, t)
								return true
							}
							if (i < (GameData.MaxRow - 1) && t > 0 && GameData.mapData[i + 1][t - 1] && GameData.mapData[i + 1][t - 1] != -1 && GameData.elements[GameData.elements[i + 1][t - 1]].type == GameData.elements[GameData[i][t]].type) {
								console.log("2能消除项目2", i, t)
								return true
							}
						}
					}
				}

			}
		}
		return false;
	}

	/**
	 * 判断两个元素是否可以交换
	 */
	public static canMove(id1: number, id2: number): boolean {

		let l1row = Math.floor(GameData.elements[id1].location / GameData.MaxRow)
		let l1col = GameData.elements[id1].location % GameData.MaxColumn;

		let l2row = Math.floor(GameData.elements[id2].location / GameData.MaxRow)
		let l2col = GameData.elements[id2].location % GameData.MaxColumn;

		if (l1row == l2row) {
			if (Math.abs(l1col - l2col) == 1) {
				return true;
			}
		}

		if (l1col == l2col) {
			if (Math.abs(l1row - l2row) == 1) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 全局乱序算法 
	 * */
	public static changeOrder() {
		let arr: number[] = [];
		//取出地图中元素的id放进数组中
		GameData.mapData.forEach((row) => {
			row.forEach((item) => {
				if (item != -1) {
					arr.push(item)
				}
			})
		})
		//双循环实现取出地图可用元素的id存入数组arr中
		// for (let i = 0; i < GameData.MaxRow; i++) {
		// 	for (let t = 0; t < GameData.MaxColumn; t++) {
		// 		if(GameData.mapData[i][t]!=-1){
		// 			arr.push(GameData.mapData[i][t]);
		// 		}
		// 	}
		// }

		let index: number = 0;
		for (let i = 0; i < GameData.MaxRow; i++) {
			for (let t = 0; t < GameData.MaxColumn; t++) {
				if (GameData.mapData[i][t] != -1) {
					index = Math.floor(Math.random() * arr.length);
					GameData.mapData[i][t] = arr[index];
					GameData.elements[arr[index]].location = i * GameData.MaxRow + t;
					arr.splice(index, 1)

				}
			}
		}
	}

	/**
	 * 判断元素是否可以交换
	 * 参数：两个游戏元素的location（0~63）
	 */
	public static isHaveLineByIndex(p1: number, p2: number): boolean {
		let p1n: number = p1;
		let p2n: number = p2;

		let p1Id = GameData.mapData[Math.floor(p1 / GameData.MaxColumn)][p1 % GameData.MaxRow];
		let p2Id = GameData.mapData[Math.floor(p2 / GameData.MaxColumn)][p2 % GameData.MaxRow];

		GameData.mapData[Math.floor(p1 / GameData.MaxColumn)][p1 % GameData.MaxRow] = p2Id;
		GameData.mapData[Math.floor(p2 / GameData.MaxColumn)][p2 % GameData.MaxRow] = p1Id;

		//查找是否有可消除元素
		let rel: boolean = LinkLogic.isHaveLine();
		if (rel) {
			GameData.elements[p1Id].location = p2;
			GameData.elements[p2Id].location = p1;
			return true;
		} else {
			GameData.mapData[Math.floor(p1 / GameData.MaxColumn)][p1 % GameData.MaxRow] = p1Id;
			GameData.mapData[Math.floor(p2 / GameData.MaxColumn)][p2 % GameData.MaxRow] = p2Id;
		}
		return false;

	}
}