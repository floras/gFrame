/* 
** gFrame v0.1.0pa
**
** Made By 50ndd1n6@gmail.com
** http://50ndd1n6.tistory.com
*/

(function() {	
	if (top.gFrame) return undefined;
	var gFrame = top.gFrame = {
		loaded : false, // check main ;
		location : window.location.href,
	    host     : window.location.host,
		ver	     : "v0.1.0pa"
	};	
	 // IE Cracked;
	gFrame.bugFixLocation = gFrame.location.split(gFrame.host).join(gFrame.host+"/");
	
	// Wrapper : frame Wrapper text 
	var wrap  = '<meta http-equiv="X-UA-Compatible" content="IE=edge" />';
	wrap += '<title>gFrame init</title></head><frameset rows="*" border="0" framespacing="0" frameborder="no">';
	wrap += '<frame id="mFrame" name="mFrame" frameborder=no border=0 marginwidth=0 marginheight=0 noresize scrolling=NO src="" onload="gFrame.onLoad();"/>';
	wrap += '</frameset></html>';

	// Main Frame Text
	var body  = '<!doctype html><html><head>';
	body += '<script>gFrame = top.gFrame;</script></head>';
	body += '<style>html,body{height:100%;} #debug {display:none} div.gLayer{position:absolute;}</style>';
	body += '<body id="gBody"><div id="debug" style="position:absolute;border:3px solid #f00;padding:5px;margin:10px;">sss</div>';
	body += '<iframe id="" name="" src="'+gFrame.bugFixLocation+'" frameborder=no border=0  style="border:0;width:100%;height:100%;" allowtransparency="true"></iframe>';
	body += '</body></html>';

	gFrame.onLoad = function() {
		if (gFrame.loaded) return false;
		gFrame.main = frames['mFrame'];
		gFrame.main.document.write(body);
		gFrame.main.document.close();
		gFrame.loaded = true;
	};
	gFrame.test = function() {
		var debug = gFrame.main.document.getElementById('debug');
		debug.innerHTML = "gFrame";
		debug.style.display = "block";
	};
	gFrame.create = function(id, text, dimension){
		if (gFrame.main.document.getElementById(id)) return false; 
		var _default = { top : 100, left : 100, style : "border:3px solid #f00"};
		
		if (dimension) for (var i in dimension) _default[i] = dimension[i];
		var dimension = _default;
		var gLayer = gFrame.main.document.createElement("div");
		gLayer.id = id;

		// Bug-Fix under IE 7
		if (document.all && !window.localStorage) gLayer.style.setAttribute('cssText', dimension.style);
		else gLayer.setAttribute('style', dimension.style);

		if (dimension.right) gLayer.style.right = dimension.right + "px";
		else gLayer.style.left = dimension.left + "px";
		if (dimension.bottom) gLayer.style.bottom = dimension.bottom + "px";
		else gLayer.style.top = dimension.top + "px";

		if (dimension.width.indexOf("%") > -1) 	gLayer.style.width = dimension.width;
		else gLayer.style.width  = (dimension.width) ?  dimension.width + "px" : "auto";

		if (dimension.width.indexOf("%") > -1) 	gLayer.style.height = dimension.height;
		else gLayer.style.height = (dimension.height) ?  dimension.height + "px" : "auto";
				
		gLayer.className = 'gLayer';
		gLayer.innerHTML = text;
		gFrame.main.document.getElementById('gBody').appendChild(gLayer);
		return undefined //gLayer;
	};
	gFrame.remove = function(id) {
		gFrame.main.document.body.removeChild(gFrame.main.document.getElementById(id));
	};
	gFrame.hide = function(id) {
		var target = gFrame.main.document.getElementById(id);
		target.style.display = "none";
		return target;
	};
	gFrame.show = function(id) {
		var target = gFrame.main.document.getElementById(id);
		target.style.display = "block";
		return target;
	};
	gFrame.opacity = function(id, value) {
		var target = gFrame.main.document.getElementById(id);
		if (target.style.opacity !== undefined) { 
			target.style.opacity = value;
		} else if (target.filters) {			
			target.style.filter = "alpha(opacity="+value*100+");";
		};
		return target
	};
	gFrame.height = function(id, value) {
		var target = gFrame.main.document.getElementById(id);
		if (value.indexOf("%") > -1) gLayer.style.height = value;
		else gLayer.style.height = value + "px";
		return target
	};
	gFrame.width = function(id, value) {
		var target = gFrame.main.document.getElementById(id);
		if (value.indexOf("%") > -1) gLayer.style.width = value;
		else gLayer.style.width = value + "px";
		return target
	};
	gFrame.style = function(id, value) {
		var target = gFrame.main.document.getElementById(id);		
		if (document.all && !window.localStorage) target.style.setAttribute('cssText', dimension.style);
		else target.setAttribute('style', dimension.style);
		return target;
	}
	gFrame.title = function(title) {
		top.document.title = title;
	}
	// LET'S START
	document.write(wrap);

})();