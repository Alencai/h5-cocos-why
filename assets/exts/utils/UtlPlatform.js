
/**
 * Banner广告ID
 */
export function setBannerADID(id) {
    cc.log('空调用 UtlBannerAD.setID ');
}

/**
 * Banner广告配置
 * 1. 按照width或者height中较小的一边去适配（铺满其中一边，且不超过）。
 * 2. 如果适配后的width长度超过300（微信规定），则至少保证300宽度（此时可能超过style尺寸）。
 * @param style
 * @param style.width 预设宽度
 * @param style.height 预设高度
 * @param style.top Boolean 是否显示在顶部，否则显示在底部
 */
export function setBannerADStyle(style) {
    cc.log('空调用 UtlBannerAD.setStyle ');
}

/**
 * Topbar高度
 */
export function getTopbarHeight() {
    return 0;
}


