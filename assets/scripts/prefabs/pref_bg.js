var icon_idx = 0;

cc.Class({
    extends: cc.Component,

    properties: {
        front1: cc.Node,
        front2: cc.Node,
        front3: cc.Node,
        back1: cc.Node,
        back2: cc.Node,
        back3: cc.Node,
    },

    onLoad() {
        this._leftEdge = -this.node.width / 2;
        this._imgWidth = this.front1.width * this.front1.scaleX;
        this.front1.x = this.front2.x - this._imgWidth;
        this.front3.x = this.front2.x + this._imgWidth;
        this.back1.x = this.back2.x - this._imgWidth;
        this.back3.x = this.back2.x + this._imgWidth;
    },

    update(dt) {
        var moveX1 = dt * 50;
        var moveX2 = dt * 30;
        this.move(this.front1, moveX1);
        this.move(this.front2, moveX1);
        this.move(this.front3, moveX1);
        this.move(this.back1, moveX2);
        this.move(this.back2, moveX2);
        this.move(this.back3, moveX2);
    },

    move(bg, moveX) {
        var posX = bg.x - moveX;
        if (posX < this._leftEdge) {
            posX += this._imgWidth + this._imgWidth + this._imgWidth;
        }
        bg.x = posX;
    },
});


