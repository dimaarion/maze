(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.playerHandLeft = function() {
	this.initialize(img.playerHandLeft);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,150,200);


(lib.playerHandRightpngкопия = function() {
	this.initialize(img.playerHandRightpngкопия);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,150,200);


(lib.playerLeft = function() {
	this.initialize(img.playerLeft);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,150,201);


(lib.playerlegLeftpngкопия = function() {
	this.initialize(img.playerlegLeftpngкопия);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,150,200);


(lib.playerlegRight = function() {
	this.initialize(img.playerlegRight);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,150,200);


// stage content:
(lib.player = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_6
	this.instance = new lib.playerHandLeft();
	this.instance.setTransform(355.55,240.35,0.9998,0.9998,-7.4909);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4).to({rotation:-10.5229,x:351.95,y:244.3},0).wait(5).to({scaleX:0.9997,scaleY:0.9997,rotation:31.2597,x:413.9,y:206.3},0).wait(5).to({rotation:58.4704,x:461.9,y:208.7},0).wait(5).to({scaleX:0.9996,scaleY:0.9996,rotation:31.9914,x:415.1,y:206.3},0).wait(5).to({scaleX:0.9997,scaleY:0.9997,rotation:-17.6844,x:344.75,y:255.1},0).wait(6));

	// Слой_1
	this.instance_1 = new lib.playerLeft();
	this.instance_1.setTransform(328,192,0.9998,0.9998);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(30));

	// Слой_11
	this.instance_2 = new lib.playerlegLeftpngкопия();
	this.instance_2.setTransform(383.5,241.1,0.9998,0.9998,33.6937);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(4).to({scaleX:0.9999,scaleY:0.9999,rotation:7.7798,x:322.3,y:259.55},0).wait(5).to({scaleX:0.9997,scaleY:0.9997,rotation:33.3954,x:364.7,y:245.9},0).wait(5).to({rotation:12.3071,x:315.1,y:259.1},0).wait(5).to({scaleX:0.9998,scaleY:0.9998,rotation:-7.4483,x:301.1,y:286.3},0).wait(5).to({rotation:-14.9926,x:310.3,y:294.7},0).wait(6));

	// Слой_10
	this.instance_3 = new lib.playerHandRightpngкопия();
	this.instance_3.setTransform(319.9,169.1,0.9997,0.9997,29.5322);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(4).to({scaleX:0.9998,scaleY:0.9998,rotation:25.2505,x:310.3,y:173.5},0).wait(5).to({scaleX:0.9996,scaleY:0.9996,rotation:-6.6543,x:253.55,y:226.3},0).wait(5).to({scaleX:0.9997,scaleY:0.9997,rotation:-0.4049,x:264,y:217.05},0).wait(5).to({rotation:1.5516,x:265.1,y:209.5},0).wait(5).to({scaleX:0.9995,scaleY:0.9995,rotation:35.8579,x:334.7,y:163.9},0).wait(6));

	// Слой_3
	this.instance_4 = new lib.playerlegRight();
	this.instance_4.setTransform(272.75,319.1,0.9997,0.9997,-29.999);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(4).to({rotation:-14.733,x:306.7,y:295.1},0).wait(5).to({rotation:-43.2336,x:299.5,y:345.95},0).wait(5).to({rotation:-28.8175,x:312.7,y:318.35},0).wait(5).to({scaleX:0.9998,scaleY:0.9998,rotation:8.7205,x:347.9,y:254.3},0).wait(5).to({scaleX:0.9997,scaleY:0.9997,rotation:12.6941,x:339.95,y:253.55},0).wait(6));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(617.6,463.9,-69.20000000000005,31.5);
// library properties:
lib.properties = {
	id: '808007A4A15133459D19890570B2306E',
	width: 800,
	height: 600,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/playerHandLeft.png", id:"playerHandLeft"},
		{src:"images/playerHandRightpngкопия.png", id:"playerHandRightpngкопия"},
		{src:"images/playerLeft.png", id:"playerLeft"},
		{src:"images/playerlegLeftpngкопия.png", id:"playerlegLeftpngкопия"},
		{src:"images/playerlegRight.png", id:"playerlegRight"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['808007A4A15133459D19890570B2306E'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;