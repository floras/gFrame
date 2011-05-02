/* 
*  gFrame.micro.js v0.1.03pa
*
* Copyright (c) 2011 50ndd1n6@gmail.com, 50ndd1n6.tistory.com
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/

(function() {
	if (window.name == "content") {
		window.gFrame = parent.gFrame;
		return undefined;
	};
	var gFrame = window.gFrame = {};
	var body  = '<!doctype html><html><head>';
	body += '<style>html,body{height:100%;}</style></head>';
	body += '<body>';
	body += '<iframe id="content" name="content" frameborder=no border=0  style="border:0;width:100%;height:100%;" allowtransparency="true"></iframe>';
	body += '</body></html>';
	var wrap = '<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />'; 
	wrap += '<title>gFrame init</title></head><frameset rows="*" border="0" framespacing="0" frameborder="no">';
	wrap += '<frame id="main" name="main" frameborder="no" border="0" marginwidth="0" marginheight="0" noresize scrolling="no" />';
	wrap += '</frameset></html>';	
	document.write(wrap);
	gFrame.main = frames['main'];
	gFrame.main.location.replace(location.href);
	document.close();
	gFrame.main.document.write(body);
	gFrame.content = gFrame.main.frames['content'];
	gFrame.content.location.replace(self.document.location);
	gFrame.main.document.close();
})();