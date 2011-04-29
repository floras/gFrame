/*
*  gf.yPlayer.js (test)
*  
*  2011-04-28
*/

gFrame("yplayer", '<div id="ytapiplayer">Youtube Packed</div></div>', 
	{top:20, left:20, width:400, height:325, style: 'border:3px solid #f00;'});
function onYouTubePlayerReady(playerId) {
  var ytplayer = document.getElementById("myytplayer");
  gFrame.yPlayer = _createYPlayer(ytplayer);
  gFrame.yReady(gFrame.yPlayer);
};
var _createYPlayer = function(ytplayer) {
	var player = ytplayer;	
	window.yPlayer = gFrame.yPlayer = function(id, start, quality) {
		makeList(id,start,quality);
		yPlayer.index = 0;
		yPlayer.play(0);
		return this;
	};
	var listParser = function(target) {
		var id = target.id;
		if (id.indexOf('youtube.com') > -1 || id.indexOf('youtube-nocookie.com') > -1) { 
			if (id.indexOf('watch')>0) id = id.split('v=')[1].split('&')[0];
			else if (id.indexOf('embed/')>0) id = id.split('embed/')[1].split('?')[0].split('&')[0];
			else if (id.indexOf('v/') > -1)  id = id.split('v/')[1].split('?')[0].split('&')[0];
		} 	
		return {id: id, start:target.start, quality:target.quality};
	};
	var copy = gFrame('yplayer');
	for (var i in copy) yPlayer[i] = copy[i];
	
	var makeList = function(id, start, quality) {
		var id = id;
		var target = [];
		var result = [];
		if (typeof id == 'string') target = [{id:id, start:start, quality:quality}];
		else target = id;
		for (var i=0; i < target.length;i++ ) result.push(listParser(target[i]));
		yPlayer.list = result;
	};
	yPlayer.volume = function(vol) {
		if (vol===undefined) return player.getVolume();
		else player.setVolume(vol);
		return this;
	};
	yPlayer.play = function (index) {
		if (index === undefined) { player.playVideo(); return this };
		var target = this.list[index];
		player.index = index;
		player.loadVideoById(target.id, target.start, target.quality);
		return this;
	};
	yPlayer.mute = function() { player.mute(); return this; };
	yPlayer.unMute = function() { player.unMute(); return this; };
	yPlayer.toggleMute = function() {
		if (player.isMuted()) return this.unMute();
		return player.mute(); 
	};
	yPlayer.pause = function() { player.pauseVideo(); return this; };
	yPlayer.stop = function()  { player.stopVideo(); return this; };
	yPlayer.togglePlay = function() { player.pauseVideo(); return this; };
	yPlayer.clear = function() {player.clearVideo(); return this};
	yPlayer.quality = function() { };
	yPlayer.next = function() {
		var next = (this.index + 1 >= this.list.length ) ? 0 :  this.index + 1;
		return this.play(next);
	};
	yPlayer.prev = function() {
		var prev = (this.index -1 <= -1 ) ? this.list.length - 1 :  this.index -1;
		return this.play(prev);
	};
	return yPlayer;
};
gFrame.loadScript("https://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js", function(){
	var params = { allowScriptAccess: "always", wmode : 'transparent', allowfullscreen : 'true' };
	var atts = { id: "myytplayer" };
	swfobject.embedSWF("http://www.youtube.com/apiplayer?enablejsapi=1&version=3&playerapiid=ytplayer&autoplay=1",
					   "ytapiplayer", "100%", "100%", "8", null, null, params, atts);
});