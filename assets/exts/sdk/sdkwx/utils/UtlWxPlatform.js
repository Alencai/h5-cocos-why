import UtlPlatform from 'UtlPlatform';

if (wx && wx.createBannerAd) {
    //----------------------------------------------------------------------------
    // 广告位
    var wxBannerID = '';        // 广告ID
    var wxBannerAD = null;      // 广告实例
    var wxBannerLoaded = false; // 广告是否初始化成功
    var wxBannerStyle = null;   // Banner配置
    /**
     * 设置广告ID
     */
    function setBannerADID(id) {
        wxBannerAD = id;
    }
    /**
     * 调整广告位
     */
    function adjustBannerAD() {
        var style = wxBannerStyle;
        if (!wxBannerLoaded || !style) { return; }
        wxBannerStyle = null;
        // cc.view.getFrameSize()
        var winSize = cc.view.getCanvasSize(); 
        var adSize = wxBannerAD.style;
        var width = winSize.width, height = 0;
        if (style.width) {
            style.width /= cc.view.getScaleX();
            width = Math.max(300, Math.min(style.width / scaleX, width));
            height = width * adSize.realHeight / adSize.realWidth;
        }
        if (style.height && (height == 0 || height > style.height)) {
            style.height /= cc.view.getScaleY();
            width = Math.max(300, Math.min(adSize.realWidth * style.height / adSize.realHeight, width));
            height = width * adSize.realHeight / adSize.realWidth;
        }
        adSize.height = height;
        adSize.width = width;
        adSize.left = (winSize.width - width) / 2;
        adSize.top = style.top ? 0 : (winSize.height - height);
    }

    /**
     * 创建广告位
     */
    function createBannerAD(style) {
        wxBannerStyle = style;
        if (wxBannerAD) { adjustBannerAD(); return;}
        if (!wxBannerID) { return; }
        var winSize = cc.view.getCanvasSize(); 
        wxBannerAD = wx.createBannerAd({
            adUnitId: wxBannerID,
            style: { left: 0, top: 0, width: winSize.width },
        });
        wxBannerAD.onLoad(function (res) {
            cc.log('wxBannerAD.onLoad', res);
            wxBannerLoaded = true;
            adjustBannerAD();
        });
        wxBannerAD.onError(function (res) { cc.log('wxBannerAD.onError', res);});
        wxBannerAD.onResize(function (res) { cc.log('wxBannerAD.onResize', res);});
    }

    //----------------------------------------------------------------------------
    // topbar高度
    var topBarHeight; 
    function getTopbarHeight() {
        if (topBarHeight !== undefined) {
            return topBarHeight;
        }
        var sysInfo = wx.getSystemInfoSync(); 
        if (sysInfo.model && sysInfo.model.indexOf("iPhone X") >= 0) {
            topBarHeight = Math.max(sysInfo.statusBarHeight - 5, 0);
        }
        else {
            topBarHeight = Math.max(sysInfo.statusBarHeight - 20, 0);
        }
        return topBarHeight;
    }
    
    // --------------------------------------------------
    // 重写的部分
    
    UtlPlatform.setBannerADID = setBannerADID;
    UtlPlatform.setBannerADStyle = createBannerAD;
    UtlPlatform.getTopbarHeight = getTopbarHeight;
}
