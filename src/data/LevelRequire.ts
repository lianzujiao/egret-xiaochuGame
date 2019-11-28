class LevelRequire {
	/**
	 * public 类型方法，任何其他类都可以访问该方法
	 */
	public requireElements: LevelRequireElement[]; //游戏过关条件数组
	public constructor() {
		this.requireElements = [];
	}
	/**
	 * 获取关卡过关条件数据
	 */
	public getLevelReqNum(): number {
		return this.requireElements.length;
	}
	/**
	 * 添加关卡元素
	 */
	public addElement(type: string, num: number) {
		let ele: LevelRequireElement = new LevelRequireElement(); //每一个游戏过关条件
		ele.num = num;
		ele.type = type;
		this.requireElements.push(ele);

	}
	/**
	 * 启动关卡条件修改
	 */
	public openChange(){
		
		this.requireElements=[];
	}
	public changeReqNum(type:string,num:number){
		let len:number=this.getLevelReqNum(); //过关条件元素数组
		for(let i=0;i<len;i++){
			if(this.requireElements[i].type==type){
				this.requireElements[i].num -=num; //关卡指定过关条件元素的数量减一
				return;
			}
		}
	}
	/**
	 * 判断是否已经完成所有关卡
	 */
	public isClear():boolean{
		let len:number=this.getLevelReqNum();
		for(let i=0;i<len;i++){
			if(this.requireElements[i].num>0){
				return false;
			}
		}
		console.log("过关！")
		return true;
	}
}