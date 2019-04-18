
cc.Class({
    extends: cc.Component,

    properties: {
        // 初始：全屏
        background: cc.Node, // 灰 // cc.Widget 资源里先置
        // 初始：200 x 200
        layer1: cc.Node,   // 蓝   // cc.Widget 代码里后置
        layer2: cc.Node,   // 绿
        layer3: cc.Node,   // 黄
        layer4: cc.Node,   // 红
        layer5: cc.Node,   // 紫
    },

    // 1. 在 onLoad、start、首次update、首次lateUpdate 时，widget并没有更新尺寸
    // 2. 可通过 widget.updateAlignment 直接刷新尺寸

    onLoad() {
        cc.log('s1_life  onLoad');
        this.setWidget(this.layer1, 20);
        this.follow(this.layer2, this.background, 30);
        this.follow(this.layer4, this.layer1, 50);
    },

    onStart() { 
        cc.log('s1_life  onStart');
    },

    update(dt) {
        this.logCnt('s1_life  update');
    },
    
    lateUpdate(dt) {
        this.logCnt('s1_life  lateUpdate');
        if (!this._isInit) {
            this._isInit = true;
            this.follow(this.layer3, this.background, 40);
            this.follow(this.layer5, this.layer1, 60);
        }
    },

    onDestroy() { 
        cc.log('s1_life  onDestroy');
    },

    onDisable() { 
        cc.log('s1_life  onDisable');
    },
    onEnable() { 
        cc.log('s1_life  onEnable');
    },

    onRestore() { 
        cc.log('s1_life  onRestore');
    },
    onFocusInEditor() { 
        cc.log('s1_life  onFocusInEditor');
    },
    onLostFocusInEditor() { 
        cc.log('s1_life  onLostFocusInEditor');
    },

    logCnt(str) {
        this._updateCount = (this._updateCount || 0) + 1;
        if (this._updateCount < 10) {
            cc.log(str + ' ' + this._updateCount);
        }
    },

    follow(from, target, edge) {
        from.x = target.x;
        from.y = target.y;
        from.width = target.width - edge * 2;
        from.height = target.height - edge * 2;
    },

    setWidget(node, edge) {
        var widget = node.getComponent(cc.Widget);
        if (!widget) {
            widget = node.addComponent(cc.Widget);
        }
        widget.left = edge;
        widget.top = edge;
        widget.bottom = edge;
        widget.right = edge;
        widget.isAlignBottom = true;
        widget.isAlignRight = true;
        widget.isAlignLeft = true;
        widget.isAlignTop = true;
    },
});
