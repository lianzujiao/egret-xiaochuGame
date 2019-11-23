class LevelRequire {
	/**
	 * public 类型方法，任何其他类都可以访问该方法
	 */
	public requireElements: LevelRequireElement[]; //游戏关卡数组
	public constructor() {
		this.requireElements = [];
	}
	/**
	 * 获取关卡总数
	 */
	public getLevelReqNum(): number {
		return this.requireElements.length;
	}
	/**
	 * 添加关卡元素
	 */
	public addElement(type: string, num: number) {
		let ele: LevelRequireElement = new LevelRequireElement(); //每一个游戏关卡
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
		let len:number=this.getLevelReqNum(); //关卡元素数组长度
		for(let i=0;i<len;i++){
			if(this.requireElements[i].type=type){
				this.requireElements[i].num -=num; //未破解关卡逐渐减少
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
		return true;
	}
}