var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 *
 * @author
 *
 */
var GameOverPanel = (function (_super) {
    __extends(GameOverPanel, _super);
    function GameOverPanel() {
        var _this = _super.call(this) || this;
        _this._issuccess = false;
        return _this;
    }
    GameOverPanel.prototype.show = function (issuccess) {
        this._issuccess = issuccess;
        this._view = new egret.Bitmap;
        this._view.texture = RES.getRes('bg_jpg');
        this._view.width = GameData.stageW;
        this._view.height = GameData.stageH;
        this._view.x = 0;
        this._view.y = 0;
        this.addChild(this._view);
        egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 700, egret.Ease.bounceOut).call(this.playStarAni, this);
    };
    GameOverPanel.prototype.playStarAni = function () {
        var gameover = new egret.Bitmap();
        gameover.texture = RES.getRes('gameOverTitle_png');
        gameover.width = this._view.width / 2;
        gameover.height = 60;
        gameover.x = this._view.x + (this._view.width - gameover.width) / 2;
        gameover.y = this._view.y + 10;
        gameover.scaleX = 0;
        gameover.scaleY = 0;
        this.addChild(gameover);
        egret.Tween.get(gameover).to({ scaleX: 1, scaleY: 1 }, 700, egret.Ease.bounceOut);
        console.log('播放失败动画');
        if (this._issuccess) {
            //成功动画
            var chengzi = new egret.Bitmap();
            chengzi.texture = RES.getRes('chengzi_png');
            chengzi.width = (this._view.width - 50) / 3;
            chengzi.height = chengzi.width;
            chengzi.x = (GameData.stageW - chengzi.width * 2) / 3 + this._view.x;
            chengzi.y = 150 + this._view.y;
            chengzi.scaleX = 1.5;
            chengzi.scaleY = 1.5;
            chengzi.alpha = 0;
            this.addChild(chengzi);
            egret.Tween.get(chengzi).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 700, egret.Ease.circIn);
            var gongzi = new egret.Bitmap();
            gongzi.texture = RES.getRes('gongzi_png');
            gongzi.width = (this._view.width - 50) / 3;
            gongzi.height = gongzi.width;
            gongzi.x = (GameData.stageW - gongzi.width * 2) / 3 * 2 + gongzi.width + this._view.x;
            gongzi.y = 150 + this._view.y;
            gongzi.scaleX = 1.5;
            gongzi.scaleY = 1.5;
            gongzi.alpha - 0;
            this.addChild(gongzi);
            egret.Tween.get(gongzi).wait(400).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 700, egret.Ease.circIn);
        }
        else {
            //失败动画
            var shizi = new egret.Bitmap();
            shizi.texture = RES.getRes('shizi_png');
            shizi.width = (this._view.width - 50) / 3;
            shizi.height = shizi.width;
            shizi.x = (GameData.stageW - shizi.width * 2) / 3 + this._view.x;
            shizi.y = 150 + this._view.y;
            shizi.scaleX = 1.5;
            shizi.scaleY = 1.5;
            shizi.alpha = 0;
            this.addChild(shizi);
            egret.Tween.get(shizi).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 700, egret.Ease.circIn);
            var baizi = new egret.Bitmap();
            baizi.texture = RES.getRes('baizi_png');
            baizi.width = (this._view.width - 50) / 3;
            baizi.height = baizi.width;
            baizi.x = (GameData.stageW - baizi.width * 2) / 3 * 2 + baizi.width + this._view.x;
            baizi.y = 150 + this._view.y;
            baizi.scaleX = 1.5;
            baizi.scaleY = 1.5;
            baizi.alpha - 0;
            this.addChild(baizi);
            egret.Tween.get(baizi).wait(400).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 700, egret.Ease.circIn);
        }
    };
    return GameOverPanel;
}(egret.Sprite));
__reflect(GameOverPanel.prototype, "GameOverPanel");
//# sourceMappingURL=GameOverPanel.js.map