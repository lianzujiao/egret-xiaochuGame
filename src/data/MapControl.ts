class MapControl {
	public constructor() {
	}
	public createElementAllMap() {
		this.createAllMap()
	}
	/**
	 * 随机创建number个元素
	 */
	public createElements(num: number): string[] {
		var types: string[] = [];
		for (let i = 0; i < num; i++) {
			types.push(this.createType());
		}
		return types;
	}

	/**
	 * 根据指定id随机创建一个元素
	 */
	public createTypeById(id: number) {
		GameData.elements[id].type = this.createType()
	}

		public updateMapLocation(){
	    var ids:number[]=[];
	    var len:number=LinkLogic.lines.length;
	    for(var i=0;i<len;i++){
	        //var l:number=LinkLogic.lines[i].length;            
            ids.push(LinkLogic.lines[i]);            	   
	    }
	    
	    len = ids.length;
	    var colarr:number[]=[];
	    for(i=0;i<len;i++){
    	      
            var tempCol: number = GameData.elements[ids[i]].location % GameData.MaxColumn;
            if(colarr.indexOf(tempCol)==-1){
                colarr.push(tempCol);
            }
	    }
	    
	    var colelids:number[];
	    len = colarr.length;
	    for(i=0;i<len;i++){
	        var newcolids:number[]=[];
	        var removeids:number[]=[];
	        for(var t=GameData.MaxRow-1;t>=0;t--){
	            //console.log(ids);
	            if(ids.indexOf(GameData.mapData[t][colarr[i]])>=0){
                    removeids.push(GameData.mapData[t][colarr[i]]);
                    
	            }else{
                    if(GameData.mapData[t][colarr[i]] != -1) {
                        newcolids.push(GameData.mapData[t][colarr[i]]);
                    }
	            }
	        }
	        newcolids=newcolids.concat(removeids);
	        //console.log(newcolids);
	        for(t=GameData.MaxRow-1;t>=0;t--){
	            if(GameData.mapData[t][colarr[i]]!=-1){
    	              var newcol:number = newcolids.shift();
	                GameData.mapData[t][colarr[i]]=newcol;
                    // console.log(GameData.elements[newcol].location);
                    GameData.elements[newcol].location=t*GameData.MaxRow+colarr[i];
	            
	            }
	        }
	        
	        for(t=0;t<removeids.length;t++){
	            this.createTypeById(removeids[t]);
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
					type = this.createType();//随机获取一个当前关卡元素类型
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

	/**
	 * return 任意一个元素类型
	 */
	private createType() {
		return GameData.elementTypes[Math.floor(Math.random() * GameData.elementTypes.length)].toString()//随机数的值是0~元素类型数组长度
	}
}