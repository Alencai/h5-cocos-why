
/** 
 * 上海火刀石网络科技有限公司
 * 
 * Cocos Creator 工具集
 */
declare namespace fly {
    /**
     * 各平台js接入sdk
     */
    namespace sdk {
        /** 
         * 发布的平台： 是否内网
         */
        export function isGameIntra(): boolean;

        /** 
         * 发布的平台： 是否微信小游戏
         */
        export function isGameWx(): boolean;
        
        /** 
         * 发布的平台： 是否开心斗
         */
        export function isGameKxd(): boolean;

        /** 
         * 发布的平台： 是否4399的H5页游
         */
        export function isGame4399Web(): boolean;
        
        /** 
         * 发布的平台： 是否4399的微信小游戏
         */
        export function isGame4399Wx(): boolean;

        /** 
         * 发布的平台： 是否4399的微信小游戏
         * @deprecated 已废弃
         */
        export function isGame4399(): boolean;

        // ----------------------------------------------------------------

    }
}
