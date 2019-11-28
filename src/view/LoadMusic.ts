class LoadMusic {
	public constructor() {
		
	}
	public playMusic() {
		var sound: egret.Sound = RES.getRes("BgMusic_mp3");
		sound.play();
	}
}