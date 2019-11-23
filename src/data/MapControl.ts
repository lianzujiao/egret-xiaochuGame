class MapControl {
	public constructor() {
	}
	public createElementAllMap() {
		this.createAllMap()
	}
	public createElements(num: number): string[] {
		var types: string[] = [];
		for (let i = 0; i < num; i++) {
			types.push(this.createType());
		}
		return types;
	}

	public createTypeById(id: number) {
		GameData.elements[id].type = this.createType()
	}

	public updateMapLocation() {
		let ids: number[] = [];
		let len: number = LinkLogic.lines.length;
		for (let i = 0; i < len; i++) {
			var l: number = LinkLogic.lines[i].length;
			for (let t = 0; t < l; t++) {
				var rel: boolean = false;
				var ll: number = ids.length;
				for (let r = 0; r < ll; r++) {
					if (ids[r] == LinkLogic.lines[i][t]) {
						rel = true;
					}
				}
				if (!rel) {
					this.createTypeById(LinkLogic.lines[i][t]);
					ids.push(LinkLogic.lines[i][t])
				}
			}
		}
		len = ids.length;
		var colarr: number[] = [];
		for (let i = 0; i < len; i++) {
			rel = false;
			for (let t = 0; t < colarr.length; t++) {
				if (colarr[t] == GameData.elements[ids[i]].location % GameData.MaxColumn) {
					return true
				}
			}
			if (!rel) {
				colarr.push(GameData.elements[ids[i]].location % GameData.MaxColumn);
			}
		}

		var colElementIds: number[];
		len = colarr.length;
		for (let i = 0; i < len; i++) {
			var newColIds: number[] = [];
			var removeColIds: number[] = [];
			for (let t = GameData.MaxRow - 1; t >= 0; t--) {
				rel = false;
				for (var q = 0; q < ids.length; q++) {
					removeColIds.push(ids[q])
					rel = true;
				}
				if (!rel) {
					if (GameData.mapData[t][colarr[i]] != -1) {
						newColIds.push(GameData.mapData[t][colarr[i]]);
					}
				}
			}
			newColIds = newColIds.concat(removeColIds)
			for (let t = GameData.MaxRow - 1; t >= 0; t--) {
				if (GameData.mapData[t][colarr[i]] != -1) {
					GameData.mapData[t][colarr[i]]=newColIds[0];
					GameData.elements[newColIds[0]].location=t*GameData.MaxRow+colarr[i]
					newColIds.shift()
				}
			}
		}
	}

	private createAllMap() {
		let len: number = GameData.MaxRow * GameData.MaxColumn;
		let type: string = "";
		let haveLink: boolean = true;
		var id: number = 0;
		var ztype: string = "";
		var htype: string = "";
		for (var i = 0; i < GameData.MaxRow; i++) {
			for (var t = 0; t < GameData.MaxColumn; t++) {
				while (haveLink) {
					type = this.createType();
					if (i > 1 && GameData.mapData[i - 1][t] != -1 && GameData.mapData[i - 2][t] != -1) {
						if (GameData.elements[GameData.mapData[i - 1][t]].type == GameData.elements[GameData.mapData[i - 2][t]].type) {
							ztype = GameData.elements[GameData.mapData[i - 1][t]].type;
						}
					}
					if (t > 1 && GameData.mapData[i][t - 1] != -1 && GameData.mapData[i][t - 2] != -1) {
						if (GameData.elements[GameData.mapData[i][t - 1]].type == GameData.elements[GameData.mapData[i][t - 2]].type) {
							htype = GameData.elements[GameData.mapData[i][t - 1]].type;
						}
					}
					if (type != ztype && type != htype) {
						haveLink = false;
					}
				}
				id = GameData.unusedElements[0];
				GameData.elements[id].type = type;
				GameData.elements[id].location = i * GameData.MaxRow + t;
				GameData.mapData[i][t] = id;
				GameData.unusedElements.shift();
				haveLink = true;
				ztype = "";
				htype = ""

			}
		}
	}

	private createType() {
		return GameData.elementTypes[Math.floor(Math.random() * GameData.elementTypes.length)].toString()
	}
}