
cc.Class({
    extends: cc.Component,

    properties: {
        bar1: cc.ProgressBar,
        bar2: cc.ProgressBar,
        txtEditor1: cc.Label,
        txtEditor2: cc.Label,
        txtEditor3: cc.Label,
        iconContain: cc.Node,
        dbContain1: cc.Node,
        dbContain2: cc.Node,
        dbContain3: cc.Node,
        iconPrefab: cc.Prefab,
        enemyPrefab: cc.Prefab,
        meishiPrafab: cc.Prefab,
        _iconsArray: [],
        _enemyArray: [],
        _meishiArray:  [],
        _calTotal: 1,
        _randSeed: 1,
    },

    onLoad() {
        this.bar1.progress = 0.3;
        this.bar2.progress = 0.7;
        this.evtEditor1Add();
        this.evtEditor2Add();
        this.evtEditor3Add();
    },

    start() {
    },

    update(dt) {
        this.nextBar(this.bar1, dt);
        this.nextBar(this.bar2, dt);
        this.calculate();
    },

    updateBg(front1, front2, back1, back2) {

    },

    calculate() {
        for (var i = 0; i < this._calTotal; ++i) {
            this._randSeed = (1000 * (this._randSeed + 1) * Math.random()) % 117;
        }
    },

    nextBar(bar, dt) {
        bar.progress += dt;
        if (bar.progress > 1) {
            bar.progress = 0;
        }
    },

    randDBContain() {
        var rand = Math.random();
        if (rand < 0.33) {
            return this.dbContain1;
        }
        return rand < 0.66 ? this.dbContain2 : this.dbContain3;
    },

    createDB() {
        var node;
        var parent = this.randDBContain();
        if (Math.random() < 0.5) {
            node = cc.instantiate(this.enemyPrefab);
            this._enemyArray.push(node);
        }
        else { 
            node = cc.instantiate(this.meishiPrafab);
            this._meishiArray.push(node);
        }
        node.parent = parent;
        node.x = parent.width * (Math.random() - 0.5);
        node.y = parent.height * (Math.random() - 0.5);
    },

    evtGridClick(evt) {
        cc.log('点击按钮');
    },

    evtEditor1Add() {
        this.createDB();
        var count = this._enemyArray.length + this._meishiArray.length;
        this.txtEditor1.string = '龙骨：' + count;
    },

    evtEditor1Dec() {
        var count = this._enemyArray.length + this._meishiArray.length;
        if (count <= 0) {
            return;
        }
        if (this._enemyArray.length > 0 && Math.random() < 0.5) {
            this._enemyArray[0].destroy();
            this._enemyArray.splice(0, 1);
        }
        else if (this._meishiArray.length > 0) {
            this._meishiArray[0].destroy();
            this._meishiArray.splice(0, 1);
        }
        count = this._enemyArray.length + this._meishiArray.length;
        this.txtEditor1.string = '龙骨：' + count;
    },

    evtEditor2Add() {
        this._calTotal += 1000;
        this.txtEditor2.string = '运算量：' + this._calTotal;
    },

    evtEditor2Dec() {
        this._calTotal = Math.max(this._calTotal - 1000, 0);
        this.txtEditor2.string = '运算量：' + this._calTotal;
    },

    evtEditor3Add() {
        if (this._iconsArray.length >= 18) {
            return;
        }
        var node = cc.instantiate(this.iconPrefab);
        node.parent = this.iconContain;
        this._iconsArray.push(node);
        this.txtEditor3.string = '图标：' + this._iconsArray.length;
    },

    evtEditor3Dec() {
        if (this._iconsArray.length <= 0) {
            return;
        }
        this._iconsArray[0].destroy();
        this._iconsArray.splice(0, 1);
        this.txtEditor3.string = '图标：' + this._iconsArray.length;
    },
});


