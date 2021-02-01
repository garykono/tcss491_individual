class Farmer {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game.farmer = this;

        // spritesheet
        this.spritesheets = []
        this.spritesheets[0] = ASSET_MANAGER.getAsset("./sprites/miller/Miller_idle.png");
        this.spritesheets[1] = ASSET_MANAGER.getAsset("./sprites/miller/Miller_walk.png");
        this.spritesheets[2] = ASSET_MANAGER.getAsset("./sprites/miller/Miller_gather.png");

        // mario's state variables
        this.facing = 0; // 0 = right, 1 = left
        this.state = 0; // 0 = idle, 1 = walking, 2 = gather
        this.dead = false;


        this.velocity = { x: 0, y: 0 };
        this.fallAcc = 562.5;

        this.updateBB();

        // mario's animations
        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {
        for (var i = 0; i < 3; i++) { // three states
            this.animations.push([]);
        }

        this.width = 30;
        this.height = 37;

        // idle animation for state = 0
        // facing right = 0
        this.animations[0] = new Animator(this.spritesheets[0], 1, 12, this.width, this.height, 4, 0.33, 18, false, true);

        // walk animation
        // facing right
        this.animations[1] = new Animator(this.spritesheets[1], 1, 12, this.width, this.height, 6, 0.33, 18, false, true);

        // gathering animation
        // facing right
        this.animations[2] = new Animator(this.spritesheets[2], 1, 12, this.width, this.height, 6, 0.33, 18, false, true);

        //this.deadAnim = new Animator(this.spritesheet, 0, 16, 16, 16, 1, 0.33, 0, false, true);
    };

    updateBB() {
        // this.lastBB = this.BB;
        // if (this.size === 0 || this.size === 3) {
        //     this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        // }
        // else {
        //     this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2);
        // }
    };

    die() {
        this.velocity.y = -640;
        this.dead = true;
    };

    update() {

        const TICK = this.game.clockTick;

        // // I used this page to approximate my constants
        // // https://web.archive.org/web/20130807122227/http://i276.photobucket.com/albums/kk21/jdaster64/smb_playerphysics.png
        // // I converted these values from hex and into units of pixels and seconds.
        
        // const MIN_WALK = 4.453125;
        // const MAX_WALK = 93.75;
        // const ACC_WALK = 133.59375;
        // const DEC_REL = 182.8125;

        // const STOP_FALL = 1575;
        // const WALK_FALL = 1800;
        // const STOP_FALL_A = 450;
        // const WALK_FALL_A = 421.875;

        // const MAX_FALL = 270;


        // if (this.dead) {
        //     this.velocity.y += WALK_FALL * TICK;
        //     this.y += this.velocity.y * TICK * PARAMS.SCALE;
        // } else {


        //     // update velocity

        //     if (this.state !== 4) { // not jumping
        //         // ground physics
        //         if (Math.abs(this.velocity.x) < MIN_WALK) {  // slower than a walk // starting, stopping or turning around
        //             this.velocity.x = 0;
        //             this.state = 0;
        //             if (this.game.left) {
        //                 this.velocity.x -= MIN_WALK;
        //             }
        //             if (this.game.right) {
        //                 this.velocity.x += MIN_WALK;
        //             }
        //         }
        //         else if (Math.abs(this.velocity.x) >= MIN_WALK) {  // faster than a walk // accelerating or decelerating
        //             if (this.facing === 0) {
        //                 if (this.game.right && !this.game.left) {
        //                     if (this.game.B) {
        //                         this.velocity.x += ACC_RUN * TICK;
        //                     } else this.velocity.x += ACC_WALK * TICK;
        //                 } else if (this.game.left && !this.game.right) {
        //                     this.velocity.x -= DEC_SKID * TICK;
        //                     this.state = 3;
        //                 } else {
        //                     this.velocity.x -= DEC_REL * TICK;
        //                 }
        //             }
        //             if (this.facing === 1) {
        //                 if (this.game.left && !this.game.right) {
        //                     if (this.game.B) {
        //                         this.velocity.x -= ACC_RUN * TICK;
        //                     } else this.velocity.x -= ACC_WALK * TICK;
        //                 } else if (this.game.right && !this.game.left) {
        //                     this.velocity.x += DEC_SKID * TICK;
        //                     this.state = 3;
        //                 } else {
        //                     this.velocity.x += DEC_REL * TICK;
        //                 }
        //             }
        //         }

        //         this.velocity.y += this.fallAcc * TICK;

        //         if (this.game.A) { // jump
        //             if (Math.abs(this.velocity.x) < 16) {
        //                 this.velocity.y = -240;
        //                 this.fallAcc = STOP_FALL;
        //             }
        //             else if (Math.abs(this.velocity.x) < 40) {
        //                 this.velocity.y = -240;
        //                 this.fallAcc = WALK_FALL;
        //             }
        //             else {
        //                 this.velocity.y = -300;
        //                 this.fallAcc = RUN_FALL;
        //             }
        //             this.state = 4;
        //         }
        //     } 
        //     else {
        //         // air physics
        //         // vertical physics
        //         if (this.velocity.y < 0 && this.game.A) { // holding A while jumping jumps higher
        //             if (this.fallAcc === STOP_FALL) this.velocity.y -= (STOP_FALL - STOP_FALL_A) * TICK;
        //             if (this.fallAcc === WALK_FALL) this.velocity.y -= (WALK_FALL - WALK_FALL_A) * TICK;
        //             if (this.fallAcc === RUN_FALL) this.velocity.y -= (RUN_FALL - RUN_FALL_A) * TICK;
        //         }
        //         this.velocity.y += this.fallAcc * TICK;

        //         // horizontal physics
        //         if (this.game.right && !this.game.left) {
        //             if (Math.abs(this.velocity.x) > MAX_WALK) {
        //                 this.velocity.x += ACC_RUN * TICK;
        //             } else this.velocity.x += ACC_WALK * TICK;
        //         } else if (this.game.left && !this.game.right) {
        //             if (Math.abs(this.velocity.x) > MAX_WALK) {
        //                 this.velocity.x -= ACC_RUN * TICK;
        //             } else this.velocity.x -= ACC_WALK * TICK;
        //         } else {
        //             // do nothing
        //         }

        //     }

        //     // max speed calculation
        //     if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
        //     if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;

        //     if (this.velocity.x >= MAX_RUN) this.velocity.x = MAX_RUN;
        //     if (this.velocity.x <= -MAX_RUN) this.velocity.x = -MAX_RUN;
        //     if (this.velocity.x >= MAX_WALK && !this.game.B) this.velocity.x = MAX_WALK;
        //     if (this.velocity.x <= -MAX_WALK && !this.game.B) this.velocity.x = -MAX_WALK;

            let MAXWALKSPEED = 100;

            if(this.game.left) {
                this.velocity.x = -MAXWALKSPEED;
                this.state = 1;
            } else if (this.game.right) {
                this.velocity.x = MAXWALKSPEED;
                this.state = 1;
            } else {
                this.velocity.x = 0;
                if(this.game.Q) {
                    this.state = 2;
                } else {
                    this.state = 0;
                }
            }

            // update position
            this.x += this.velocity.x * TICK * PARAMS.SCALE;
            this.y += this.velocity.y * TICK * PARAMS.SCALE;
            // this.updateBB();

            // // if mario fell of the map he's dead
            // if (this.y > PARAMS.BLOCKWIDTH * 16) this.die();

            // // collision
            // var that = this;
            // this.game.entities.forEach(function (entity) {
            //     if (entity.BB && that.BB.collide(entity.BB)) {
            //         if (that.velocity.y > 0) { // falling
            //             if ((entity instanceof Ground || entity instanceof Brick || entity instanceof Block || entity instanceof Tube || entity instanceof SideTube) // landing
            //                 && (that.lastBB.bottom) <= entity.BB.top) { // was above last tick
            //                 if (that.size === 0 || that.size === 3) { // small
            //                     that.y = entity.BB.top - PARAMS.BLOCKWIDTH;
            //                 } else { // big
            //                     that.y = entity.BB.top - 2 * PARAMS.BLOCKWIDTH;
            //                 }
            //                 that.velocity.y === 0;

            //                 if(that.state === 4) that.state = 0; // set state to idle
            //                 that.updateBB();

            //                 if (entity instanceof Tube && entity.destination && that.game.down) {
            //                     that.game.camera.loadLevel(bonusLevelOne, 2.5 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH);
            //                 }
            //             }
            //             if ((entity instanceof Goomba || entity instanceof Koopa) // squish Goomba
            //                 && (that.lastBB.bottom) <= entity.BB.top // was above last tick
            //                 && !entity.dead) { // can't squish an already squished Goomba
            //                 entity.dead = true;
            //                 that.velocity.y = -240; // bounce
            //             }
            //         }
            //         if (that.velocity.y < 0) { // jumping
            //             if ((entity instanceof Brick) // hit ceiling
            //                 && (that.lastBB.top) >= entity.BB.bottom // was below last tick
            //                 && that.BB.collide(entity.leftBB) && that.BB.collide(entity.rightBB)) { // collide with the center point of the brick
            //                 entity.bounce = true;
            //                 that.velocity.y = 0;
            //             }
            //         }
            //         if (entity instanceof Brick && entity.type // hit a visible brick
            //             && that.BB.collide(entity.topBB) && that.BB.collide(entity.bottomBB)) { // hit the side
            //             if (that.BB.collide(entity.leftBB)) {
            //                 that.x = entity.BB.left - PARAMS.BLOCKWIDTH;
            //                 if (that.velocity.x > 0) that.velocity.x = 0;
            //             } else if (that.BB.collide(entity.rightBB)) {
            //                 that.x = entity.BB.right;
            //                 if (that.velocity.x < 0) that.velocity.x = 0;
            //             }
            //             that.updateBB();
            //         }
            //         if ((entity instanceof Tube || entity instanceof SideTube || entity instanceof Block || entity instanceof Ground) && that.BB.bottom > entity.BB.top) {
            //             if (that.BB.collide(entity.leftBB)) {
            //                 that.x = entity.BB.left - PARAMS.BLOCKWIDTH;
            //                 if (that.velocity.x > 0) that.velocity.x = 0;
            //                 if (entity instanceof SideTube && that.game.right)
            //                     that.game.camera.loadLevel(levelOne, 162.5 * PARAMS.BLOCKWIDTH, 11 * PARAMS.BLOCKWIDTH) 
            //             } else {
            //                 that.x = entity.BB.right;
            //                 if (that.velocity.x < 0) that.velocity.x = 0;
            //             }
            //             that.updateBB();
            //         }
            //         if (entity instanceof Mushroom && !entity.emerging) {
            //             entity.removeFromWorld = true;
            //             if (entity.type === 'Growth') {
            //                 that.y -= PARAMS.BLOCKWIDTH;
            //                 that.size = 1;
            //                 that.game.addEntity(new Score(that.game, that.x, that.y, 1000));
            //             } else {
            //                 that.game.camera.lives++;
            //             }
            //         }
            //         if (entity instanceof Coin) {
            //             entity.removeFromWorld = true;
            //             that.game.camera.score += 200;
            //             that.game.camera.addCoin();
            //         }
            //     }
            // });


            // update state
            // if (this.state !== 4) {
            //     if (this.game.down) this.state = 5;
            //     else if (Math.abs(this.velocity.x) > MAX_WALK) this.state = 2;
            //     else if (Math.abs(this.velocity.x) >= MIN_WALK) this.state = 1;
            //     else this.state = 0;
            // } else {

            // }

            // update direction
            if (this.velocity.x < 0) this.facing = 1;
            if (this.velocity.x > 0) this.facing = 0;
        
    };

    drawMinimap(ctx, mmX, mmY) {
        ctx.fillStyle = "Red";
        ctx.fillRect(mmX + this.x / PARAMS.BITWIDTH, mmY + this.y / PARAMS.BITWIDTH, PARAMS.SCALE, PARAMS.SCALE * Math.min(this.size + 1, 2));
    }

    draw(ctx) {
        if (this.dead) {
            this.deadAnim.drawFrame(this.game.clockTick, ctx, this.x, this.y, PARAMS.SCALE);
        } else {
            if(this.facing === 0) {
                this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y, PARAMS.SCALE);
            } else {
                ctx.save();
                ctx.scale(-1, 1);
                this.animations[this.state].drawFrame(this.game.clockTick, ctx, -this.x - this.width, this.y, PARAMS.SCALE);
                ctx.restore();
            }
            
        }
        // if (PARAMS.DEBUG) {
        //     ctx.strokeStyle = 'Red';
        //     ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        // }
    };
};