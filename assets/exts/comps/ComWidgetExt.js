import UtlPlatform from 'UtlPlatform';

const BANNER_AD_ALIGN = new cc.Enum({
    NONE: 1,
    TOP: 2,
    BOTTOM: 3,
});

// ---------------------------------------------------

cc.Class({
    extends: cc.Component,

    editor: CC_EDITOR && {
        executeInEditMode: true,  // 允许当前组件在编辑器模式下运行。
        requireComponent: cc.Widget,   // 用来指定当前组件的依赖组件。
        // executionOrder: 0,        // 脚本生命周期回调的执行优先级。
    },

    properties: {
        _isDirty: true,
        // -------------
        _isTopBarShow: false,
        isTopBarShow: {
            displayName: '是否显示topbar',
            set(value) {
                this._isTopBarShow = value;
                this._isDirty = true;
            },
            get() {
                return this._isTopBarShow;
            },
        },
        _topBarHeight: 0,
        topBarHeight: {
            displayName: '--- 预置topBar的高度',
            tooltip: '1. 当设备没有topbar时，使用此高度；\n 2. 当设备拥有topbar时，使用较大的一个高度',
            set(value) {
                this._topBarHeight = value;
                this._isDirty = true;
            },
            get() {
                return this._topBarHeight;
            },
            visible() {
                return this._isTopBarShow;
            },
        },
        // -------------
        _isScaleSize: false,
        isScaleSize: {
            displayName: '是否适应缩放',
            tooltip: '根据配置的width和height，当适配后的尺寸小于配置的数值时，自动缩放大小以满足显示',
            set(value) {
                this._isScaleSize = value;
                this._isDirty = true;
            },
            get() {
                return this._isScaleSize;
            },
        },
        _scaleHeight: 0,
        scaleHeight: {
            displayName: '--- 缩放高度Height',
            set(value) {
                this._scaleHeight = value;
                this._isDirty = true;
            },
            get() {
                return this._scaleHeight;
            },
            visible() {
                return this._isScaleSize;
            },
        },
        _scaleWidth: 0,
        scaleWidth: {
            displayName: '--- 缩放宽度Width',
            set(value) {
                this._scaleWidth = value;
                this._isDirty = true;
            },
            get() {
                return this._scaleWidth;
            },
            visible() {
                return this._isScaleSize;
            },
        },
        // -------------
        _isShowBanner: false,
        isShowBanner: {
            displayName: '是否适配topbar',
            set(value) {
                this._bannerAlign = value;
                this._isDirty = true;
            },
            get() {
                return this._isShowBanner;
            },
        },
        _bannerAlign: BANNER_AD_ALIGN.TOP,
        bannerAlign: {
            displayName: '适配topbar位置',
            tooltip: 'NONE：不显示，不适配\n TOP：在顶端显示banner广告\n BOTTOM: 在底部显示banner广告',
            type: BANNER_AD_ALIGN,
            set(value) {
                this._bannerAlign = value;
                this._isDirty = true;
            },
            get() {
                return this._bannerAlign;
            },
            visible() {
                return this._isShowBanner;
            },
        },
        _bannerHeight: 0,
        bannerHeight: {
            displayName: '--- 预置banner的高度',
            tooltip: '1. 若存在banner广告，将以此高度设置',
            set(value) {
                this._bannerHeight = value;
                this._isDirty = true;
            },
            get() {
                return this._bannerHeight;
            },
            visible() {
                return this._isShowBanner;
            },
        },
        // -------------
    },

    onLoad() {
        this.initWidgetEnable();
    },

    initWidgetEnable() {
        var widget = this.node.getComponent(cc.Widget);
        if (widget) {
            var onOldEnable = widget.onEnable;
            widget.onEnable = function () {
                this._isDirty = false;
                this.checkBannerAndAdjust();
                onOldEnable.call(widget);
            }.bind(this);
            this._widget = widget;
        }
    },

    update() {
        if (this._isDirty) {
            this._isDirty = false;
            this.checkBannerAndAdjust();
        }
        if (CC_EDITOR) {
            var widget = this._widget;
            if (widget) {
                widget.isAlignTop = false;
                widget.isAlignBottom = false;
                widget.isAlignLeft = false;
                widget.isAlignRight = false;
                widget.isAlignVerticalCenter = true;
                widget.isAlignHorizontalCenter = true;
                // widget.horizontalCenter = 0;
                // widget.verticalCenter = 0;
            }
        }
    },

    // 检测banner广告，并调整适配
    checkBannerAndAdjust() {
        if (this._bannerAlign === BANNER_AD_ALIGN.TOP) {
            return;
        }
        if (this._bannerAlign === BANNER_AD_ALIGN.BOTTOM) {
            return;
        }
        this.adjustSize();
    },

    // 调整适配
    // 这里直接以游戏实际窗口大小计算，强制scale为1，强制Anchor为0.5
    adjustSize() {
        // 设个接口可以获取配置的朝向，但好像没什么意义
        // var orientation = cc.view._orientation;
        // if (orientation & cc.macro.ORIENTATION_LANDSCAPE) {...}

        // 设备朝向未找到接口获取，所以直接相信设计尺寸
        // 这里通过 width与height 的大小，得出设备朝向
        var size = cc.view.getDesignResolutionSize();
        if (size.width < size.height) {
            this._adjustWithPortrait();
        }
        else {
            this._adjustWithLandscape();
        }
    },

    // 适配竖屏
    _adjustWithPortrait() {
        var size = cc.view.getVisibleSize();
        var width = size.width, height = size.height;
        var posX = 0, posY = 0;
        if (this._isTopBarShow) {
            var topbarHeight = CC_EDITOR ? this._topBarHeight : UtlPlatform.getTopbarHeight();
            height -= topbarHeight;
            posX -= topbarHeight / 2;
        }
    },

    // 适配横屏
    _adjustWithLandscape() {
        var size = cc.view.getVisibleSize();
        var height = size - size.height;
        if (this._isTopBarShow) {
            var topbarHeight = CC_EDITOR ? this._topBarHeight : UtlPlatform.getTopbarHeight();
            height -= topbarHeight;
        }
    },

});
