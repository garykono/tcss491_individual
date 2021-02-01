class Wheat { 
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/wheat.png");
    };

    update() {

    };

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, 20, 27, this.x, this.y, PARAMS.BLOCKWIDTH * 1.5, PARAMS.BLOCKWIDTH * 1.5);
    };
};