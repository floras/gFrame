/* 
*  gFrame.main.js v0.1.03pa
*
* Copyright (c) 2011 50ndd1n6@gmail.com, 50ndd1n6.tistory.com
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/

(function() {

	var ver = "v0.1.03pa";

	// START, EXIT FUNCTION

	var START = function() {
		document.cookie = "gFOUT= ;expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/";
		gFrame.wrapper.location.replace(self.location.href);
	};
	var EXIT  = function() {
		document.cookie = "gFOUT=true ; path=/";	
		gFrame.wrapper.location.replace(gFrame.content.location.href);
	};
	var DUMMY = Function("return this");

	/* DOC TYPE 0 : USER WANT DISABLE gFRAME */
	if (document.cookie.indexOf('gFOUT') > -1) {
		var gFrame = window.gFrame = function() {return this};
		gFrame.wrapper = window; 
		gFrame.start   = START;
		gFrame.alive   = false;
		gFrame.ver     = ver;
		gFrame.exit    = function() {return this}; // dummy function;
		return undefined;
	}
	/* PHASE 1st : ##content## */
	if (window.name == "content") {
		window.gFrame = parent.gFrame;

		return undefined;
	};
	/* PHASE 2nd : ##main## - write body	*/	
	if (window.name == "main") { // main breaker
		var mainBreak = '<script type="text/javascript">window.onload = parent.gFrame.writeMain;</script></head>'
		mainBreak += '<frameset><frame /></frameset></html>';
		document.write(mainBreak);
		document.close();
		return undefined;
	};
	
	/* PHASE 3rd : Create gFrame	*/
	var gFrame = window.gFrame = function() {};
	//window.name    = "wrapper";
	gFrame.wrapper = window;
	gFrame.alive   = true;
	gFrame.ver     = ver;
	gFrame.exit    = EXIT;
	gFrame.init    = function() {};
	gFrame.start   = Function("return this");

	gFrame.load = function() {
		if (!gFrame.contentInit) { // firstMain loaded
			gFrame.content = gFrame.main.frames['content'];
			gFrame.content.location.replace(parent.document.location);
			gFrame.contentInit = true;
		};
	};

	/******* FINISH *******/

	/* WRITE DOC*/// Main Frame Text
	var body  = '<!doctype html><html><head>';
	body += '<script>gFrame = parent.gFrame;</script>';
	body += '<style>html,body{height:100%;} div.gLayer{position:absolute;}</style></head>';
	body += '<body>';
	body += '<div id="debug" class="gLayer" style="right:5px;border:3px solid #f00;padding:5px;background:#fff">gFrame</div>';
	body += '<iframe id="content" name="content" frameborder=no border=0  style="border:0;width:100%;height:100%;" allowtransparency="true" onload="gFrame.load();"></iframe>';
	body += '</body></html>';
	gFrame.writeMain = function() {
		gFrame.main.document.write(body);
		gFrame.main.document.close();
	};

	//* Wrapper Frame */	
	var check = false;
	window.firstEnter = function() {
		if (check) return false;
		gFrame.main = frames['main'];
		gFrame.main.location.replace(location.href);
		check = true;
	};
	var wrap = '<meta http-equiv="X-UA-Compatible" content="IE=edge" />';
	wrap += '<title>gFrame init</title></head><frameset rows="*" border="0" framespacing="0" frameborder="no">';
	wrap += '<frame id="main" name="main" src="about:blank" frameborder=no border=0 marginwidth=0 marginheight=0 noresize scrolling=NO onload="firstEnter()"/>';
	wrap += '</frameset></html>';

	/* LET'S START */
	document.write(wrap);
	document.close();

})();