class GrassBlock {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/grass_tile.png");

        // this.BB = new BoundingBox(this.x, this.y, this.w, PARAMS.BLOCKWIDTH * 2);
        // this.leftBB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2)
        // this.rightBB = new BoundingBox(this.x + this.w - PARAMS.BLOCKWIDTH, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2)
    };

    update() {
    };

    drawMinimap(ctx, mmX, mmY) {
        ctx.fillStyle = "Brown";
        ctx.fillRect(mmX + this.x / PARAMS.BITWIDTH, mmY + this.y / PARAMS.BITWIDTH, this.w / PARAMS.BITWIDTH, PARAMS.SCALE * 2);
    };

    draw(ctx) {
        let grassBlockCount = this.w / PARAMS.BLOCKWIDTH;
        for (var i = 0; i < grassBlockCount; i++) {
            ctx.drawImage(this.spritesheet, 36, 1, 16,16, this.x + i * PARAMS.BLOCKWIDTH, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        }
        // if (PARAMS.DEBUG) {
        //     ctx.strokeStyle = 'Red';
        //     ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        // }
    };
};