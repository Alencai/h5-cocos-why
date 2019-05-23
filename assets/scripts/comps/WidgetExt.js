
cc.Class({
    extends: cc.Widget,

    editor: CC_EDITOR && {
        // requireComponent: cc.Widget,
        menu: 'i18n:MAIN_MENU.component.ui/Widget',
        help: 'i18n:COMPONENT.help_url.widget',
        inspector: 'packages://inspector/inspectors/comps/ccwidget.js',
        executeInEditMode: true,
        disallowMultiple: true,
    },

    properties: {
        progress: cc.Node,
    },

    onLoad() {
        this.node.on(cc.Node.EventType.SIZE_CHANGED, this.updateAlignment, this);
    },

    updateAlignment() {
        cc.log('12312');
    },
});
