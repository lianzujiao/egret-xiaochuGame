var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LoadMusic = (function () {
    function LoadMusic() {
    }
    LoadMusic.prototype.playMusic = function () {
        var sound = RES.getRes("BgMusic_mp3");
        sound.play();
    };
    return LoadMusic;
}());
__reflect(LoadMusic.prototype, "LoadMusic");
//# sourceMappingURL=LoadMusic.js.map