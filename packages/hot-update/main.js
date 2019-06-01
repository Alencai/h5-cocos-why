/**
 * 热更绑定的脚本，设置搜索路径 
 * - 这里需要调换一下js的引用顺序： settings.js 在设置搜索路径之后再引用
 * - 适用于 cocos creator v2.0.10
 */

'use strict';

var Fs = require("fire-fs");
var Path = require("fire-path");

var delStr = "require('src/settings.js');";
var oldStr = "cc.macro.CLEANUP_IMAGE_CACHE = true;";
var newStr =`
    if (cc.sys.isNative) {
        var hotUpdateSearchPaths = cc.sys.localStorage.getItem('HotUpdateSearchPaths');
        if (hotUpdateSearchPaths) {
            jsb.fileUtils.setSearchPaths(JSON.parse(hotUpdateSearchPaths));
        }
    }
    require('src/settings.js');

` + "    " + oldStr;

module.exports = {
    load: function () {
        // 当 package 被正确加载的时候执行
    },

    unload: function () {
        // 当 package 被正确卸载的时候执行
    },

    messages: {
        'editor:build-finished': function (event, target) {
            var root = Path.normalize(target.dest);
            var url = Path.join(root, "main.js");
            Fs.readFile(url, "utf8", function (err, data) {
                if (err) {
                    throw err;
                }

                var newData = data.replace(delStr, '').replace(delStr, '').replace(oldStr, newStr);
                Fs.writeFile(url, newData, function (error) {
                    if (err) {
                        throw err;
                    }
                    Editor.log("SearchPath updated in built main.js for hot update", url);
                });
            });
        }
    }
};