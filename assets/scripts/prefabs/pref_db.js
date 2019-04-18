var icon_idx = 0;

cc.Class({
    extends: cc.Component,

    properties: {
        dragon: dragonBones.ArmatureDisplay,
    },

    onLoad() {
        var armatures = this.dragon.getArmatureNames();
        if (armatures && armatures.length > 0) {
            var armatureName = armatures[parseInt(armatures.length * Math.random())];
            var animations = this.dragon.getAnimationNames(armatureName);
            if (animations && animations.length > 0) {
                var animationName = animations[parseInt(animations.length * Math.random())];
                this.play(armatureName, animationName, -1);
            }
        }
        this.randomAction();
    },

    play(armature, animation, times) {
        this.dragon.playTimes = times;
        this.dragon.animationName = animation;
        this.dragon.armatureName = armature;
    },

    randomAction() {
        this.node.stopAllActions();
        var rand = parseInt(Math.random() * 4);
        switch (rand) {
            case 0: this.actionMove(); break;
            case 1: this.actionRote(); break;
            case 2: this.actionTint(); break;
            case 3: this.actionScale(); break;
        }
    },

    actionMove() {
        var moveX = (Math.random() - 0.5) * 200;
        var moveY = (Math.random() - 0.5) * 100;
        this.node.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.5, moveX, moveY), cc.moveBy(0.5, -moveX, -moveY))));
    },

    actionRote() {
        this.node.runAction(cc.repeatForever(cc.rotateBy(1, 360)));
    },

    actionTint() {
        this.node.runAction(cc.repeatForever(cc.sequence(cc.tintTo(cc.Color.BLACK), cc.tintTo(cc.Color.WHITE))));
    },

    actionScale() {
        this.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 0.5 + 2 * Math.random()), cc.scaleTo(0.5, 1))));
    },
});


