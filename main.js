var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/miller/Miller_idle.png");
ASSET_MANAGER.queueDownload("./sprites/miller/Miller_walk.png");
ASSET_MANAGER.queueDownload("./sprites/miller/Miller_gather.png");

ASSET_MANAGER.queueDownload("./sprites/chicken.png");

ASSET_MANAGER.queueDownload("./sprites/grass_tile.png");
ASSET_MANAGER.queueDownload("./sprites/wheat.png");
ASSET_MANAGER.queueDownload("./sprites/iron_ore.png");

ASSET_MANAGER.downloadAll(function () {
	var gameEngine = new GameEngine();

	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	PARAMS.CANVAS_WIDTH = canvas.width;

	gameEngine.init(ctx);
		
	new SceneManager(gameEngine);
	

	gameEngine.start();
});