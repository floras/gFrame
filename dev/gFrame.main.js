/* 
*   gFrame.main  from First version fix
*/

(function() {
	var ver = "v0.1.0pa";

	if (top.gFrame) return undefined;

	var gFrame = top.gFrame = {
		loaded : false, // check main ;
		location : window.location.href,
	    host     : window.location.host,
		ver	     : ver
	};	
	
	 // IE Cracked;
	gFrame.bugFixLocation = gFrame.location.split(gFrame.host).join(gFrame.host+"/");

	// Main Frame Text
	var body  = '<!doctype html><html><head>';
	body += '<script>gFrame = top.gFrame;</script>';
	body += '<style>html,body{height:100%;} #debug {display:none} div.gLayer{position:absolute;}</style></head>';
	body += '<body id="gBody"><div id="debug" style="position:absolute;border:3px solid #f00;padding:5px;margin:10px;">sss</div>';
	body += '<iframe id="content" name="content" src="'+gFrame.bugFixLocation+'" frameborder=no border=0  style="border:0;width:100%;height:100%;" allowtransparency="true"></iframe>';
	body += '</body></html>';

	gFrame.onLoad = function() {
		if (gFrame.loaded) return false;
		gFrame.main = frames['mFrame'];
		gFrame.main.document.write(body);
		gFrame.main.document.close();
		gFrame.loaded = true;
	};
	
	// Wrapper : frame Wrapper text 
	var wrap  = '<meta http-equiv="X-UA-Compatible" content="IE=edge" />';
	wrap += '<title>gFrame init</title></head><frameset rows="*" border="0" framespacing="0" frameborder="no">';
	wrap += '<frame id="mFrame" name="mFrame" frameborder=no border=0 marginwidth=0 marginheight=0 noresize scrolling=NO src="" onload="gFrame.onLoad();"/>';
	wrap += '</frameset></html>';
	// LET'S START
	document.write(wrap);

})();