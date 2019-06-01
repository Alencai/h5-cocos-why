
cc.Class({
    extends: cc.Component,

    properties: {
        panel: cc.Label,
        progressFile: cc.ProgressBar,
        progressByte: cc.ProgressBar,
        // ----------------------
        btnCheck: cc.Node,
        btnBegin: cc.Node,
        btnRetry: cc.Node,
        btnClose: cc.Node,
        // ----------------------
        manifestUrl: { default: null, type: cc.Asset},
        // ----------------------
        _asMgr: null, // 更新管理器
        _updating: false, // 是否正在更新
        _retry: false, // 是否可以重试更新
        _failCount: 0, // 失败次数
        _isChecked: false, //
        _isSuccessed: false, // 
        _isIgnore: false, // 
    },

    onLoad() {
        this._resetBtn(1);
        this._resetInfo();
        this._initMgr();
    },

    toMainScene() {
        if (this._isSuccessed) {
            this.succUpdate();
            return;
        }
        cc.director.loadScene('main');
    },

    _resetInfo() {
        this._showPanelInfo('');
        this._setProgressFile(0);
        this._setProgressByte(0);
    },

    _resetBtn(idx) {
        this.btnCheck && (this.btnCheck.active = idx == 1);
        this.btnBegin && (this.btnBegin.active = idx == 2);
        this.btnRetry && (this.btnRetry.active = idx == 3);
        this.btnClose && (this.btnClose.active = idx == 4);
    },

    _showPanelInfo(msg) {
        if (this.panel) {
            this.panel.string = msg;
        }
    },

    _setProgressFile(per) {
        if (this.progressFile) {
            this.progressFile.progress = per;
        }
    },

    _setProgressByte(per) {
        if (this.progressByte) {
            this.progressByte.progress = per;
        }
    },

    _setDownloadInfo(event) {
        this._setProgressByte(event.getPercent()); 
        this._setProgressFile(event.getPercentByFile());
        var infoByte = event.getDownloadedBytes() + '/' + event.getTotalBytes();
        var infoFile = event.getDownloadedFiles() + '/' + event.getTotalFiles();
        this._showPanelInfo('更新进度：' + (event.getMessage() || '') + '\nbytes: ' + infoByte + '\nfile: ' + infoFile);
    },
  
    //-------------------------------------------------------------------------------------

    // 初始化
    _initMgr() {
        if (!cc.sys.isNative || !jsb) {
            this.toMainScene();
            return;
        }
        this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'hot-assets');
        this._asMgr = new jsb.AssetsManager('', this._storagePath);
        if (cc.sys.os === cc.sys.OS_ANDROID) { // 部分安卓设备，线程越多下载越慢
            this._asMgr.setMaxConcurrentTask(2); // 设置同时下载线程数
        }
        this._asMgr.setVersionCompareHandle(this.onVersionCompareHandle.bind(this));  // 自定义版本对比
        this._asMgr.setVerifyCallback(this.onVerifyCallback.bind(this)); // 文件正确性验证，目前cocos不能自检md5，所以直接返回true
        this._showPanelInfo('初始化游戏...');
        // cc.log(jsb.fileUtils.getWritablePath());
    },

    // 读取本地配置
    _loadManifest() {
        if (this._updating || !this._asMgr) {
            return false;
        }
        if (this._asMgr.getState() === jsb.AssetsManager.State.UNINITED) {
            this._loadManifestWithAsset();
            // this._loadManifestWithStr();
        }
        if (!this._asMgr.getLocalManifest() || !this._asMgr.getLocalManifest().isLoaded()) {
            this._showPanelInfo('读取本地配置失败！');
            return false;
        }
        return true;
    },

    // 检测更新
    checkUpdate() {
        cc.log('hotUpdate.checkUpdate: ' + (this._updating ? 'true' : 'false'));
        if (this._isChecked) {
            return;
        }
        this._resetInfo();
        if (!this._loadManifest()) {
            return;
        }
        this._showPanelInfo('开始检测游戏...');
        this._resetBtn(0);
        this._updating = true;
        this._asMgr.setEventCallback(this.onCheckUpdate.bind(this));
        this._asMgr.checkUpdate();
    },

    // 开始更新
    beginUpdate: function () {
        cc.log('hotUpdate.beginUpdate: ' + (this._updating ? 'true' : 'false'));
        if (this._isSuccessed || this._isIgnore || this._updating || !this._asMgr|| this._canRetry) {
            return;
        }
        this._resetInfo();
        if (!this._loadManifest()) {
            return;
        }
        this._failCount = 0;
        this._showPanelInfo('开始更新游戏...');
        this._resetBtn(0);
        this._updating = true;
        this._asMgr.setEventCallback(this.onBeginUpdate.bind(this));
        this._asMgr.update();
    },

    // 重新尝试
    retryUpdate: function () {
        if (this._isSuccessed || this._isIgnore || this._updating || !this._asMgr || !this._canRetry) {
            return;
        }
        ++this._failCount;
        this._showPanelInfo('正在尝试重新更新（' + this._failCount + '）');
        this._resetBtn(0);
        this._canRetry = false;
        this._asMgr.setEventCallback(this.onBeginUpdate.bind(this));
        this._asMgr.downloadFailedAssets();
    },

    // 成功更新
    succUpdate: function () {
        if (this._updating || !this._asMgr) {
            return;
        }
        var key = 'HotUpdateSearchPaths';
        if (!cc.sys.localStorage.getItem(key)) {
            var newPaths = this._asMgr.getLocalManifest().getSearchPaths();
            var searchPaths = jsb.fileUtils.getSearchPaths();
            Array.prototype.unshift.apply(searchPaths, newPaths);
            cc.sys.localStorage.setItem(key, JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths);
        }
        cc.audioEngine.stopAll();
        cc.game.restart();
    },
  
    //-------------------------------------------------------------------------------------

    // 从预置资源读取配置
    _loadManifestWithAsset() {
        var url = this.manifestUrl.nativeUrl;
        if (cc.loader.md5Pipe) {
            url = cc.loader.md5Pipe.transformURL(url);
        }
        cc.log('hotUpdate._loadManifestWithAsset', url);
        this._asMgr.loadLocalManifest(url);
    },

    // 从字符串读取配置
    _loadManifestWithStr() {
        var strManifest = JSON.stringify({
            "packageUrl": "", "remoteManifestUrl": "", "remoteVersionUrl":  "","version": "1.10",
            "assets": {"src/cocos2d-jsb.js": {"size": 3341465, "md5": "fafdde66bd0a81d1e096799fb8b7af95"},},
            "searchPaths": []
        });
        var manifest = new jsb.Manifest(strManifest, this._storagePath);
        this._asMgr.loadLocalManifest(manifest, this._storagePath);
    },

    // 时间戳转时间
    _formatTimestamp(format, time) {
        var date = new Date(time * 1000);
        var regs = {
            "Y+": date.getFullYear(),
            "M+": date.getMonth() + 1,
            "D+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            // "q+": Math.floor((date.getMonth() + 3) / 3),
            // "S+": date.getMilliseconds()
        };
        for (var k in regs) {
            if (new RegExp('(' + k + ')').test(format)) {
                var old = RegExp.$1, str = '' + regs[k];
                if (old.length > 1) {
                    for (var cnt = old.length - str.length; cnt > 0; --cnt, str = '0' + str);
                }
                format = format.replace(old, str);
            }
        }
        return format;
    },

    //-------------------------------------------------------------------------------------

    // 回调 - 版本对比
    onVersionCompareHandle(versionA, versionB) {
        this._showPanelInfo('本地版本(' + this._formatTimestamp('MMDD-hhmm', versionA) + ')\n最新版本(' + this._formatTimestamp('MMDD-hhmm', versionB) + ')');
        var vA = versionA.split('.');
        var vB = versionB.split('.');
        var ret = vB.length > vA.length ? -1 : 0;
        for (var i = 0; i < vA.length; ++i) {
            var a = parseInt(vA[i]);
            var b = parseInt(vB[i] || 0);
            if (a !== b) {
                ret = a - b;
                break;
            }
        }
        if (ret < 0) {
            this._resetBtn(2);
        }
        return ret;
    },

    // 回调 - 检测更新
    onCheckUpdate(event) {
        cc.log('hotUpdate.onCheckUpdate: ' + event.getEventCode());
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this._showPanelInfo('未找到本地配置！');
                this._resetBtn(4);
                this._isIgnore = true;
                this._isChecked = true;
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this._showPanelInfo('下载远程配置失败！');
                this._resetBtn(4);
                this._isIgnore = true;
                this._isChecked = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this._showPanelInfo('已经是最新版本！');
                this._resetBtn(4);
                this._isIgnore = true;
                this._isChecked = true;
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                this._showPanelInfo('检测到新版本！');
                this._resetBtn(2);
                this._isIgnore = false;
                this._isSuccessed = false;
                this._isChecked = true;
                break;
        }
        if (this._isChecked) {
            this._updating = false;
            this._asMgr.setEventCallback(null);
        }
    },

    // 回调 - 开始更新
    onBeginUpdate(event) {
        cc.log('hotUpdate.onBeginUpdate: ' + event.getEventCode());
        if (!this._updating) {
            return;
        }
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this._showPanelInfo('未找到本地配置！');
                this._resetBtn(4);
                this._isIgnore = true;
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this._showPanelInfo('下载远程配置失败！');
                this._resetBtn(4);
                this._isIgnore = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this._showPanelInfo('已经是最新版本！');
                this._resetBtn(4);
                this._isIgnore = true;
                break; 
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                this._setDownloadInfo(event); // 下载进度
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                this._showPanelInfo('更新成功！' + event.getMessage());
                this._resetBtn(4);
                this._isSuccessed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                this._showPanelInfo('更新失败！' + event.getMessage());
                this._resetBtn(3);
                this._canRetry = true;
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                this._showPanelInfo('更新错误：' + event.getAssetId() + ', ' + event.getMessage());
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                this._showPanelInfo('解压错误：' + event.getAssetId() + ', ' + event.getMessage());
                break;
        }
        if (this._isIgnore || this._isSuccessed || this._canRetry) {
            this._updating = false;
            this._asMgr.setEventCallback(null);
        }
    },

    // 回调 - 文件验证
    onVerifyCallback(path, asset) {
        var expectedMD5 = asset.md5;
        var relativePath = asset.path;
        // var compressed = asset.compressed;
        // var size = asset.size;
        cc.log('"hotUpdate.onVerifyCallback: " + relativePath' + ' (' + expectedMD5 + '): ' + relativePath);
        return true;
    },

});
