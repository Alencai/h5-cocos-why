cc.Class({
    extends: cc.Component,

    update(dt) {
        if (!this._isInit) {
            this._isInit = true;
            this.newBackBtn();
        }
    },

    newBackBtn() {
        var width = 80;
        var height = 40;

        var btnNode = new cc.Node();
        btnNode.width = width;
        btnNode.height = height;
        btnNode.zIndex = cc.macro.MAX_ZINDEX;
        btnNode.on(cc.Node.EventType.TOUCH_START,    function (evt) { btnNode.scale = 1.1; });
        btnNode.on(cc.Node.EventType.TOUCH_MOVE,     function (evt) { btnNode.scale = 1.1; });
        btnNode.on(cc.Node.EventType.TOUCH_CANCEL,   function (evt) { btnNode.scale = 1; });
        btnNode.on(cc.Node.EventType.TOUCH_END,      function (evt) { btnNode.scale = 1; cc.director.loadScene('main'); });
        
        var btnWidget = btnNode.addComponent(cc.Widget);
        btnWidget.bottom = 20;
        btnWidget.right = 20;
        btnWidget.isAlignBottom = true;
        btnWidget.isAlignRight = true;
        btnWidget.isAbsoluteBottom = true;
        btnWidget.isAbsoluteRight = true;

        var btnGraphics = btnNode.addComponent(cc.Graphics);
        btnGraphics.rect(-width / 2, -height / 2, width, height);
        btnGraphics.fillColor = cc.Color.WHITE;
        btnGraphics.fill();
        btnGraphics.lineWidth = 2;
        btnGraphics.strokeColor = cc.Color.BLUE;
        btnGraphics.stroke();

        var textNode = new cc.Node();
        textNode.width = width;
        textNode.height = height;
        textNode.color = cc.Color.BLACK;

        var textLabel = textNode.addComponent(cc.Label);
        textLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        textLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        textLabel.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
        textLabel.fontSize = height - 10;
        textLabel.lignHeight = height;
        textLabel.useSystemFont = true;
        textLabel.string = 'back';

        textNode.parent = btnNode;
        btnNode.parent = this.node;
    },
});
