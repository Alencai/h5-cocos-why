

// ----------------------------------------------------------------
// 询问运行环境

/** 
 * 当前环境： 是否微信
 */
export function isWechat() {
    return cc.sys.platform == cc.sys.WECHAT_GAME;
}

/** 
 * 当前环境： 是否安卓Android
 */
export function isAndroid() {
    return cc.sys.os == cc.sys.OS_ANDROID;
}

/** 
 * 当前环境： 是否苹果ios
 */
export function isIOS() { 
    return cc.sys.os == cc.sys.OS_IOS;
}


// ----------------------------------------------------------------
// 询问游戏平台

/**
 * 发布的平台： 是否内网
 */
export function isGameIntra() {
    return false;
}

/** 
 * 发布的平台： 是否微信小游戏
 */
export function isGameWx() {
    return false;
}

/** 
 * 发布的平台： 是否开心斗
 */
export function isGameKxd() {
    return false;
}

/** 
 * 发布的平台： 是否4399的H5页游
 */
export function isGame4399Web() {
    return false;
}

/** 
 * 发布的平台： 是否4399的微信小游戏
 */
export function isGame4399Wx() {
    return false;
}
/** 
 * @deprecated 已废弃
 */
export function isGame4399() {
    return isGame4399Web();
}

// ----------------------------------------------------------------
// 基本功能

/**
 * sdk初始化
 */
export function init() {
}

/**
 * 设置登录按钮
 * - 微信Wx
 * @param style 按钮信息
 */
export function setLoginBtn(style) {}
/**
 * 设置默认分享信息
 * - 开心斗
 * @param style 按钮信息
 */
export function setDefaultShareList(list) {}
/** 
 * @deprecated 已废弃
 */
export function preLogin(style, list) {
    setLoginBtn(style);
    setDefaultShareList(list);
};

/**
 * 登录平台
 * - 微信Wx
 * - 4399wx
 */
export function loginPf() {
    onLoginPfSucc();
};
/**
 * 回调方法： 登录平台成功
 * @param data
 */
export function onLoginPfSucc(data) {}
/**
 * 回调方法： 登录平台失败
 * @param data
 */
export function onLoginPfFail(data) {

}


export function preLogin(btnConfig, listShare) {
};


export function preLogin(btnConfig, listShare) {
};


export function preLogin(btnConfig, listShare) {
};


export function preLogin(btnConfig, listShare) {
};


_sdkbase.authPf = function () {
    if (_sdkwx)   { _sdkwx.authPf();   return; }
    if (_sdk4399) { _sdk4399.authPf(); return; }
    if (_sdkkxd)  { _sdkkxd.authPf();  return; }
};

_sdkbase.getUserInfo = function () {
    if (_sdkwx)    { _sdkwx.getUserInfo();    return; }
    if (_sdk4399)  { _sdk4399.getUserInfo();  return; }
    if (_sdkkxd)   { _sdkkxd.getUserInfo();   return; }
    _sdkbase.onGetUserInfoSucc(null, true);
};

_sdkbase.loginSvr = function () {
    if (_sdkwx)    { _sdkwx.loginSvr();    return; }
    if (_sdk4399)  { _sdk4399.loginSvr();  return; }
    if (_sdkkxd)   { _sdkkxd.loginSvr();   return; }
};

// 显示 视频广告
_sdkbase.showAD = function (shareType = 0, btnType = 0, data = null, funcSucc = null, funcFail = null, isShareInstead = false) {
    if (_sdkwx)   { _sdkwx.showAD(shareType, btnType, data, funcSucc, funcFail, isShareInstead);    return; }
    if (_sdk4399) { _sdk4399.showAD(shareType, btnType, data, funcSucc, funcFail, isShareInstead);  return; }
    if (_sdkkxd)  { _sdkkxd.showAD(funcSucc, funcFail, isShareInstead); return; }
    funcSucc && funcSucc(true);
};

// 显示 分享
_sdkbase.showShare = function (shareType = 0, btnType = 0, data = null, funcSucc = null, funcFail = null) {
    if (_sdkwx)   { _sdkwx.shareAppBtn(shareType, btnType, data, funcSucc, funcFail);    return; }
    if (_sdk4399) { _sdk4399.shareAppBtn(shareType, btnType, data, funcSucc, funcFail);  return; }
    if (_sdkkxd)  { _sdkkxd.shareByShowType(funcSucc); return; }
    funcSucc && funcSucc();
};

// 显示 分享图片
_sdkbase.imgShare = function (path, funcSucc = null, funcFail = null) {
    if (_sdkwx)   { _sdkwx.imgShare(path, funcSucc, funcFail);    return; }
    if (_sdk4399) { _sdk4399.imgShare(path, funcSucc, funcFail);  return; }
    funcSucc && funcSucc();
};

// 虚拟支付
_sdkbase.payForCoin = function (stConfig) {
    if (_sdkwx)   { _sdkwx.payForCoin(stConfig);    return; }
    if (_sdk4399) { _sdk4399.payForCoin(stConfig);  return; }
    if (_sdklocal) { _sdklocal.payForCoin(stConfig);  return; }
};

// 视频广告是否加载完成
_sdkbase.isAdVideoReady = function () {
    if (_sdk4399) { return _sdk4399.isAdVideoReady(); }
    if (_sdkwx)   { return _sdkwx.isAdVideoReady(); }
    if (_sdkkxd)  { return false; }
    return true;
};

// 加载banner广告
_sdkbase.createAdBanner = function (node) {
    if (_sdkwx) { _sdkwx.createAdBanner(node); return; }
    if (_sdk4399) { _sdk4399.createAdBanner(node); return; }
};

// 设置屏幕常亮
_sdkbase.setKeepScreenOn = function (isKeep) {
    if (_sdkwx || _sdk4399) {
        wx.setKeepScreenOn({
            keepScreenOn: isKeep,
            success: function () { cc.log('wx.setKeepScreenOn succ'); },
            fail: function () { cc.log('wx.setKeepScreenOn fail'); },
        });
    }
};

_sdkbase.getTopbarHeight = function () {
    if (_sdkwx) { return _sdkwx.getTopbarHeight(); }
    if (_sdk4399) { return _sdk4399.getTopbarHeight(); }
    return 0;
};

_sdkbase.getPayCount = function (money) {
    if (_sdkwx) { return _sdkwx.getPayCount(money); }
    if (_sdk4399) { return _sdk4399.getPayCount(money); }
    return 0;
};

// 跳转到其它小游戏
_sdkbase.openOtherApp = function (appID, paras, path = null) {
    if (_sdkwx) { _sdkwx.openOtherApp(appID, paras, path); return true; }
    if (_sdk4399) { _sdk4399.openOtherApp(appID, paras, path); return true; }
    return false;
};

// 朋友圈按钮（注意，此按钮资源必须放在image动态加载，不能被打包到图集中）
_sdkbase.createGameClubBtn = function (style, onTapCallback) {
    if (_sdkwx) { _sdkwx.createGameClubBtn(style, onTapCallback); return; }
    if (_sdk4399) { _sdk4399.createGameClubBtn(style, onTapCallback); return; }
};
_sdkbase.removeGameClubBtn = function () {
    if (_sdkwx) { _sdkwx.removeGameClubBtn(); return; }
    if (_sdk4399) { _sdk4399.removeGameClubBtn(); return; }
};
_sdkbase.showGameClubBtn = function () {
    if (_sdkwx) { _sdkwx.showGameClubBtn(); return; }
    if (_sdk4399) { _sdk4399.showGameClubBtn(); return; }
};
_sdkbase.hideGameClubBtn = function () {
    if (_sdkwx) { _sdkwx.hideGameClubBtn(); return; }
    if (_sdk4399) { _sdk4399.hideGameClubBtn(); return; }
};

// 客服窗口
_sdkbase.openCustomerService = function (from, title, img) { 
    if (_sdkwx) { _sdkwx.openCustomerService(from, title, img); return; }
    if (_sdk4399) { _sdk4399.openCustomerService(from, title, img); return; }
};

// 截屏
_sdkbase.shotScreen = function (node = null, destWidth = 0, destHeight = 0) {
    if (_sdkwx) { return _sdkwx.shotScreen(node, destWidth, destHeight); }
    if (_sdk4399) { return _sdk4399.shotScreen(node, destWidth, destHeight); }
    return '';
};

// 获取玩家信息的按钮
// style 参考 fly.sdk.preLogin 的 btnConfig
// succCB 为成功后回调
// failCB 为失败后回调
_sdkbase.createWxUserInfoBtn = function (style, succCB, failCB) {
    if (_sdkwx)   { _sdkwx.createUserInfoButton(style, succCB, failCB); }
};

_sdkbase.setAdBannerHeight = function (height, realScale) {
    if (_sdkwx) { _sdkwx.setAdBannerHeight(height, realScale); return; }
    if (_sdk4399) { _sdk4399.setAdBannerHeight(height, realScale); return; }
};

_sdkbase.removeAdBanner = function (banner) {
    if (banner) {
        if (_sdkwx) { banner.hide(); banner.destroy(); return; }
        if (_sdk4399) { banner.hide(); banner.destroy(); return; }
    }
};

_sdkbase.onGameEnterTown = function () {
    if (_isFirstEnterTown) {
        return;
    }
    _isFirstEnterTown = true;
    if (_sdkwx) {
        _sdkwx.showShareMenu();
        _sdkwx.checkLinkData();
        _sdkwx.onFirstEnterTown();
        return;
    }
    if (_sdk4399) {
        _sdk4399.setShareMenuInfo();
        _sdk4399.checkLinkData();
        _sdk4399.onFirstEnterTown();
        return;
    }
};

_sdkbase.getRootUrl = function () {
    if (_sdkwx)   { return wxDownloader.REMOTE_SERVER_ROOT; }
    if (_sdk4399) { return wxDownloader.REMOTE_SERVER_ROOT; }
    if (_sdkkxd)  { return _sdkkxd.getRootUrl(); }
    return '';
};

_sdkbase.getSvrWssUrl = function () {
    if (_sdkkxd) { return _sdkkxd.getWssUrl(); }
    return '';  
};

_sdkbase.removeButton = function () {
    if (_sdkwx) { _sdkwx.destroyUserInfoButton(); return; }
};

_sdkbase.onLogStartLoading = function () {
    if (_sdkkxd)  { _sdkkxd.onPKLoading();       return; }
    if (_sdk4399) { _sdk4399.onEvtLogGameOpen(); return; }
};

_sdkbase.onLogFinishLoading = function () {
    if (_sdkkxd)  { _sdkkxd.onPKFinishLoading(); return; }
    if (_sdk4399) { _sdk4399.onEvtLogGameLoad(); return; }
};

_sdkbase.onLogGameAuth = function () {
    if (_sdk4399) { _sdk4399.onEvtLogSelectServer(); return; }
};

_sdkbase.onLogSelectServer = function (svrid, uid, name) {
    if (_sdk4399) { _sdk4399.onEvtLogSelectServer(svrid, uid, name); return; }
};

_sdkbase.onLogCreateRole = function (svrid, uid, name) {
    if (_sdk4399) { _sdk4399.onEvtLogCreateRole(svrid, uid, name); _sdk4399.onCreateRole(svrid, uid, name); return; }
};

_sdkbase.onLogEnterTown = function (svrid, uid, name, level) {
    if (_sdkkxd) { _sdkkxd.onPKStart(); return; }
    if (_sdk4399) { _sdk4399.onEvtLogStartTown(svrid, uid, name); _sdk4399.onLoginServer(svrid, uid, name, level); return; }
};


// ---------------------------------
// 平台特例

_sdkbase.wxsubPostMessage = function (msg) {
    if (_sdkwx)   { _sdkwx.postMessage(msg);   return; }
    if (_sdk4399) { _sdk4399.postMessage(msg); return; }
};

_sdkbase.kxdOnGameResult = function (timestamp, nonstr, resultrawdata, gametype, sign) {
    if (_sdkkxd) { _sdkkxd.doPKFinish(timestamp, nonstr, resultrawdata, gametype, sign); return; }
};

// ---------------------------------
// 覆盖平台sdk回调

_sdkbase.onLoginPfSucc = function () {
    _sdkbase.authPf();
};

_sdkbase.onAuthPfSucc = function (data) {
    if (_sdkwx)   { _sdkwx.onWxAuthSucc(data);}
    if (_sdk4399) { _sdk4399.onWxAuthSucc(data);}
    // 开心斗没有验证
    _sdkbase.getUserInfo();
};

_sdkbase.onGetUserInfoSucc = function (data, isSucc) {
    if (_sdkwx)   { _sdkwx.onWxGetUserInfoSucc(data, isSucc); }
    if (_sdk4399) { _sdk4399.onWxGetUserInfoSucc(data, isSucc); }
    if (_sdkkxd)  { _sdkkxd.onKxdGetUserInfo(data); }
    _sdkbase.loginSvr();
};

_sdkbase.onLoginPfFail = function () {
    if (_sdkwx)   { _sdkwx.onWxAuthFail();   return; }
    if (_sdk4399) { _sdk4399.onWxAuthFail(); return;}
    // 开心斗没有登录
};

_sdkbase.onAuthPfFail = function () {
    if (_sdkwx)   { _sdkwx.onWxAuthFail();   return;}
    if (_sdk4399) { _sdk4399.onWxAuthFail(); return;}
    // 开心斗没有验证
};

_sdkbase.onGetUserInfoFail = function () {
    if (_sdkwx)   { _sdkwx.onWxGetUserInfoFail(); _sdkwx.createUserInfoButton(); return; }
    // 4399提前判断了
    // 开心斗不用获取
};

// ----------------------------------------------------------------

var _sdkbase = module.exports = {};  // 图片处理
var _isWinIntra = false;
var _sdkkxd = null;
var _sdkwx = null;
var _sdk4399 = null;
var _sdklocal = null;
var _isFirstEnterTown = false;

_sdkbase.isWechat = function () {
    return _sdkwx || _sdk4399;
};

_sdkbase.isAndroid = function () {
    return cc.sys.os == cc.sys.OS_ANDROID;
};

_sdkbase.isIOS = function () {
    return cc.sys.os == cc.sys.OS_IOS;
};

_sdkbase.init = function () {
    var isMobile = cc.sys.isMobile;
    var isBrowser = cc.sys.isBrowser;
    var isWin = cc.sys.os == cc.sys.OS_WINDOWS;
    if (!isMobile && isBrowser && isWin) {
        _isWinIntra = true;
    }
    var isWechat = !isBrowser && cc.sys.platform == cc.sys.WECHAT_GAME && window.hasOwnProperty('wx');
    var is4399 = isWechat && window.hasOwnProperty('Game4399');
    if (is4399) {
        _sdk4399 = require('sdk4399');
        _sdk4399.init();
        _sdk4399.hideShareMenu();
        _sdkbase.copyMethodTo(_sdk4399);
        return;
    }
    if (isWechat) {
        _sdkwx = require('sdkwx');
        _sdkwx.init();
        _sdkwx.hideShareMenu();
        _sdkbase.copyMethodTo(_sdkwx);
        return;
    }
    var isKxd = isBrowser && window.hasOwnProperty('kxd');
    if (isKxd) {
        _sdkkxd = require('sdkkxd');
        _sdkkxd.init();
        _sdkbase.copyMethodTo(_sdkkxd);
        return;
    }
    _sdklocal = require('sdklocal');
};

_sdkbase.preLogin = function (btnConfig, listShare) {
    if (_sdk4399) { _sdk4399.setBtnConfig(btnConfig); return; }
    if (_sdkwx)   { _sdkwx.setBtnConfig(btnConfig); return; }
    if (_sdkkxd)  { _sdkkxd.setShareLists(listShare); return; }
};

_sdkbase.loginPf = function () {
    if (_sdkwx)   { _sdkwx.loginPf();   return; }
    if (_sdk4399) { _sdk4399.loginPf(); return; }
    if (_sdkkxd)  { _sdkkxd.loginPf();  return; }
};

_sdkbase.authPf = function () {
    if (_sdkwx)   { _sdkwx.authPf();   return; }
    if (_sdk4399) { _sdk4399.authPf(); return; }
    if (_sdkkxd)  { _sdkkxd.authPf();  return; }
};

_sdkbase.getUserInfo = function () {
    if (_sdkwx)    { _sdkwx.getUserInfo();    return; }
    if (_sdk4399)  { _sdk4399.getUserInfo();  return; }
    if (_sdkkxd)   { _sdkkxd.getUserInfo();   return; }
    _sdkbase.onGetUserInfoSucc(null, true);
};

_sdkbase.loginSvr = function () {
    if (_sdkwx)    { _sdkwx.loginSvr();    return; }
    if (_sdk4399)  { _sdk4399.loginSvr();  return; }
    if (_sdkkxd)   { _sdkkxd.loginSvr();   return; }
};

// 显示 视频广告
_sdkbase.showAD = function (shareType = 0, btnType = 0, data = null, funcSucc = null, funcFail = null, isShareInstead = false) {
    if (_sdkwx)   { _sdkwx.showAD(shareType, btnType, data, funcSucc, funcFail, isShareInstead);    return; }
    if (_sdk4399) { _sdk4399.showAD(shareType, btnType, data, funcSucc, funcFail, isShareInstead);  return; }
    if (_sdkkxd)  { _sdkkxd.showAD(funcSucc, funcFail, isShareInstead); return; }
    funcSucc && funcSucc(true);
};

// 显示 分享
_sdkbase.showShare = function (shareType = 0, btnType = 0, data = null, funcSucc = null, funcFail = null) {
    if (_sdkwx)   { _sdkwx.shareAppBtn(shareType, btnType, data, funcSucc, funcFail);    return; }
    if (_sdk4399) { _sdk4399.shareAppBtn(shareType, btnType, data, funcSucc, funcFail);  return; }
    if (_sdkkxd)  { _sdkkxd.shareByShowType(funcSucc); return; }
    funcSucc && funcSucc();
};

// 显示 分享图片
_sdkbase.imgShare = function (path, funcSucc = null, funcFail = null) {
    if (_sdkwx)   { _sdkwx.imgShare(path, funcSucc, funcFail);    return; }
    if (_sdk4399) { _sdk4399.imgShare(path, funcSucc, funcFail);  return; }
    funcSucc && funcSucc();
};

// 虚拟支付
_sdkbase.payForCoin = function (stConfig) {
    if (_sdkwx)   { _sdkwx.payForCoin(stConfig);    return; }
    if (_sdk4399) { _sdk4399.payForCoin(stConfig);  return; }
    if (_sdklocal) { _sdklocal.payForCoin(stConfig);  return; }
};

// 视频广告是否加载完成
_sdkbase.isAdVideoReady = function () {
    if (_sdk4399) { return _sdk4399.isAdVideoReady(); }
    if (_sdkwx)   { return _sdkwx.isAdVideoReady(); }
    if (_sdkkxd)  { return false; }
    return true;
};

// 加载banner广告
_sdkbase.createAdBanner = function (node) {
    if (_sdkwx) { _sdkwx.createAdBanner(node); return; }
    if (_sdk4399) { _sdk4399.createAdBanner(node); return; }
};

// 设置屏幕常亮
_sdkbase.setKeepScreenOn = function (isKeep) {
    if (_sdkwx || _sdk4399) {
        wx.setKeepScreenOn({
            keepScreenOn: isKeep,
            success: function () { cc.log('wx.setKeepScreenOn succ'); },
            fail: function () { cc.log('wx.setKeepScreenOn fail'); },
        });
    }
};

_sdkbase.getTopbarHeight = function () {
    if (_sdkwx) { return _sdkwx.getTopbarHeight(); }
    if (_sdk4399) { return _sdk4399.getTopbarHeight(); }
    return 0;
};

_sdkbase.getPayCount = function (money) {
    if (_sdkwx) { return _sdkwx.getPayCount(money); }
    if (_sdk4399) { return _sdk4399.getPayCount(money); }
    return 0;
};

// 跳转到其它小游戏
_sdkbase.openOtherApp = function (appID, paras, path = null) {
    if (_sdkwx) { _sdkwx.openOtherApp(appID, paras, path); return true; }
    if (_sdk4399) { _sdk4399.openOtherApp(appID, paras, path); return true; }
    return false;
};

// 朋友圈按钮（注意，此按钮资源必须放在image动态加载，不能被打包到图集中）
_sdkbase.createGameClubBtn = function (style, onTapCallback) {
    if (_sdkwx) { _sdkwx.createGameClubBtn(style, onTapCallback); return; }
    if (_sdk4399) { _sdk4399.createGameClubBtn(style, onTapCallback); return; }
};
_sdkbase.removeGameClubBtn = function () {
    if (_sdkwx) { _sdkwx.removeGameClubBtn(); return; }
    if (_sdk4399) { _sdk4399.removeGameClubBtn(); return; }
};
_sdkbase.showGameClubBtn = function () {
    if (_sdkwx) { _sdkwx.showGameClubBtn(); return; }
    if (_sdk4399) { _sdk4399.showGameClubBtn(); return; }
};
_sdkbase.hideGameClubBtn = function () {
    if (_sdkwx) { _sdkwx.hideGameClubBtn(); return; }
    if (_sdk4399) { _sdk4399.hideGameClubBtn(); return; }
};

// 客服窗口
_sdkbase.openCustomerService = function (from, title, img) { 
    if (_sdkwx) { _sdkwx.openCustomerService(from, title, img); return; }
    if (_sdk4399) { _sdk4399.openCustomerService(from, title, img); return; }
};

// 截屏
_sdkbase.shotScreen = function (node = null, destWidth = 0, destHeight = 0) {
    if (_sdkwx) { return _sdkwx.shotScreen(node, destWidth, destHeight); }
    if (_sdk4399) { return _sdk4399.shotScreen(node, destWidth, destHeight); }
    return '';
};

// 获取玩家信息的按钮
// style 参考 fly.sdk.preLogin 的 btnConfig
// succCB 为成功后回调
// failCB 为失败后回调
_sdkbase.createWxUserInfoBtn = function (style, succCB, failCB) {
    if (_sdkwx)   { _sdkwx.createUserInfoButton(style, succCB, failCB); }
};

_sdkbase.setAdBannerHeight = function (height, realScale) {
    if (_sdkwx) { _sdkwx.setAdBannerHeight(height, realScale); return; }
    if (_sdk4399) { _sdk4399.setAdBannerHeight(height, realScale); return; }
};

_sdkbase.removeAdBanner = function (banner) {
    if (banner) {
        if (_sdkwx) { banner.hide(); banner.destroy(); return; }
        if (_sdk4399) { banner.hide(); banner.destroy(); return; }
    }
};

_sdkbase.onGameEnterTown = function () {
    if (_isFirstEnterTown) {
        return;
    }
    _isFirstEnterTown = true;
    if (_sdkwx) {
        _sdkwx.showShareMenu();
        _sdkwx.checkLinkData();
        _sdkwx.onFirstEnterTown();
        return;
    }
    if (_sdk4399) {
        _sdk4399.setShareMenuInfo();
        _sdk4399.checkLinkData();
        _sdk4399.onFirstEnterTown();
        return;
    }
};

_sdkbase.getRootUrl = function () {
    if (_sdkwx)   { return wxDownloader.REMOTE_SERVER_ROOT; }
    if (_sdk4399) { return wxDownloader.REMOTE_SERVER_ROOT; }
    if (_sdkkxd)  { return _sdkkxd.getRootUrl(); }
    return '';
};

_sdkbase.getSvrWssUrl = function () {
    if (_sdkkxd) { return _sdkkxd.getWssUrl(); }
    return '';  
};

_sdkbase.removeButton = function () {
    if (_sdkwx) { _sdkwx.destroyUserInfoButton(); return; }
};

_sdkbase.onLogStartLoading = function () {
    if (_sdkkxd)  { _sdkkxd.onPKLoading();       return; }
    if (_sdk4399) { _sdk4399.onEvtLogGameOpen(); return; }
};

_sdkbase.onLogFinishLoading = function () {
    if (_sdkkxd)  { _sdkkxd.onPKFinishLoading(); return; }
    if (_sdk4399) { _sdk4399.onEvtLogGameLoad(); return; }
};

_sdkbase.onLogGameAuth = function () {
    if (_sdk4399) { _sdk4399.onEvtLogSelectServer(); return; }
};

_sdkbase.onLogSelectServer = function (svrid, uid, name) {
    if (_sdk4399) { _sdk4399.onEvtLogSelectServer(svrid, uid, name); return; }
};

_sdkbase.onLogCreateRole = function (svrid, uid, name) {
    if (_sdk4399) { _sdk4399.onEvtLogCreateRole(svrid, uid, name); _sdk4399.onCreateRole(svrid, uid, name); return; }
};

_sdkbase.onLogEnterTown = function (svrid, uid, name, level) {
    if (_sdkkxd) { _sdkkxd.onPKStart(); return; }
    if (_sdk4399) { _sdk4399.onEvtLogStartTown(svrid, uid, name); _sdk4399.onLoginServer(svrid, uid, name, level); return; }
};


// ---------------------------------
// 平台特例

_sdkbase.wxsubPostMessage = function (msg) {
    if (_sdkwx)   { _sdkwx.postMessage(msg);   return; }
    if (_sdk4399) { _sdk4399.postMessage(msg); return; }
};

_sdkbase.kxdOnGameResult = function (timestamp, nonstr, resultrawdata, gametype, sign) {
    if (_sdkkxd) { _sdkkxd.doPKFinish(timestamp, nonstr, resultrawdata, gametype, sign); return; }
};

// ---------------------------------
// 覆盖平台sdk回调

_sdkbase.onLoginPfSucc = function () {
    _sdkbase.authPf();
};

_sdkbase.onAuthPfSucc = function (data) {
    if (_sdkwx)   { _sdkwx.onWxAuthSucc(data);}
    if (_sdk4399) { _sdk4399.onWxAuthSucc(data);}
    // 开心斗没有验证
    _sdkbase.getUserInfo();
};

_sdkbase.onGetUserInfoSucc = function (data, isSucc) {
    if (_sdkwx)   { _sdkwx.onWxGetUserInfoSucc(data, isSucc); }
    if (_sdk4399) { _sdk4399.onWxGetUserInfoSucc(data, isSucc); }
    if (_sdkkxd)  { _sdkkxd.onKxdGetUserInfo(data); }
    _sdkbase.loginSvr();
};

_sdkbase.onLoginPfFail = function () {
    if (_sdkwx)   { _sdkwx.onWxAuthFail();   return; }
    if (_sdk4399) { _sdk4399.onWxAuthFail(); return;}
    // 开心斗没有登录
};

_sdkbase.onAuthPfFail = function () {
    if (_sdkwx)   { _sdkwx.onWxAuthFail();   return;}
    if (_sdk4399) { _sdk4399.onWxAuthFail(); return;}
    // 开心斗没有验证
};

_sdkbase.onGetUserInfoFail = function () {
    if (_sdkwx)   { _sdkwx.onWxGetUserInfoFail(); _sdkwx.createUserInfoButton(); return; }
    // 4399提前判断了
    // 开心斗不用获取
};

//---------------------------------------------------------
// 被外部绑定的方法
_sdkbase.copyMethodTo = function (target) {
    target.onLoginPfSucc = _sdkbase.onLoginPfSucc;
    target.onLoginPfFail = _sdkbase.onLoginPfFail;
    target.onAuthPfSucc = _sdkbase.onAuthPfSucc;
    target.onAuthPfFail = _sdkbase.onAuthPfFail;
    target.onGetUserInfoSucc = _sdkbase.onGetUserInfoSucc;
    target.onGetUserInfoFail = _sdkbase.onGetUserInfoFail;
}
