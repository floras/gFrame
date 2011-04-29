/* 
*  gFrame v0.1.02pa
*
* Copyright (c) 2011 50ndd1n6@gmail.com, 50ndd1n6.tistory.com
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/


(function() {
	
	var ver = "v0.1.02pa";

	/*  
	*  INIT UTILS
	*/
	
	// START, EXIT FUNCTION

	var START = function() {
		document.cookie = "gFOUT= ;expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/";
		gFrame.wrapper.location.href = self.location.href;
	}
	var EXIT  = function() {
		document.cookie = "gFOUT=true ; path=/";	
		gFrame.wrapper.location.href = gFrame.content.location.href;
	};
	var DUMMY = Function("return this");

	/*
	*  START gFrame script
	*/

	// PRIORITY : USER[COOKIE] > SERVER[gFSETUP] > DEFAULT(ON);

	// CASE : USER WANTS DISABLE gFRAME	
	if (document.cookie.indexOf('gFOUT') > -1) {
		var gFrame = window.gFrame = DUMMY;
		gFrame.wrapper = self;
		gFrame.start = START;
		gFrame.alive = false;
		gFrame.ver   = ver;
		gFrame.exit  = DUMMY; 
		return undefined;
	};


	// CASE : PASS THE NORMAL DOCUMENT WITHIN gFrame ;		
	if (window.name == 'cFrame') { 
		var gFrame = window.gFrame = parent.gFrame; 
		gFrame.content = self;
		gFrame.initEvent();
		return undefined; 
	};
	
	// CASE : FIREFOX WITH FLASH (in the mFrame & break HTML Render);

	if (window.name == 'initFrame') {
		window.name = 'mFrame';
		parent.gFrame.main = self;
		window.onload = parent.gFrame.phase2();
		document.write('</head><frameset col="*"><frame src="javascript:void 0"/></frameset></html>');
	    document.close();
		return true;
	}

	/*
	*  INNER UTILS
	*/

	// Array.prototype.indexOf, Array.prototype.filter for ECMA5 browser - By MDC
	if (!Array.prototype.indexOf) { Array.prototype.indexOf = function(searchElement /*, fromIndex */) {
		if (this === void 0 || this === null) throw new TypeError();
		var t = Object(this); var len = t.length >>> 0; if (len === 0) return -1; var n = 0;
		if (arguments.length > 0) { n = Number(arguments[1]);
			if (n !== n) n = 0; else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) n = (n > 0 || -1) * Math.floor(Math.abs(n));
		};
		if (n >= len) return -1; var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
		for (; k < len; k++) if (k in t && t[k] === searchElement) return k;
		return -1;
	};};
	if (!Array.prototype.filter) { Array.prototype.filter = function(fun /*, thisp */) {
		if (this === void 0 || this === null) throw new TypeError();
		var t = Object(this); var len = t.length >>> 0;
		if (typeof fun !== "function") throw new TypeError();
		var res = []; var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
		  if (i in t) {
			var val = t[i]; // in case fun mutates this
			if (fun.call(thisp, val, i, t)) res.push(val);
		  }
		}
		return res;
	};};
	// Array Remove - By John Resig (MIT Licensed)
	Array.prototype.remove = function(from, to) {
	  var rest = this.slice((to || from) + 1 || this.length);
	  this.length = from < 0 ? this.length + from : from;
	  return this.push.apply(this, rest);
	};

	/*
	*  gFrame UTILS
	*/

	// gFrame : short-hand handler
	var gFrame = window.gFrame = function(id, code, option) { 
		if (code) return gFrame.create(id,code,option);
		else return gFrame.get(id);
	};
	gFrame.wrapper = self;
	gFrame.start = function() {return gFrame}; // dummy function;
	gFrame.loaded = false;
	gFrame.alive = true;
	gFrame.ver = ver;

	// detect Browser;
	gFrame.browser = (function(){
		if (window.opera) return "opera";
		else if (window.chrome) return "chrome";
		else if (document.all&&window.DOMParser)       return "ie9";
		else if (document.all&&window.Storage)         return "ie8";
		else if (document.all&&window.XMLHttpRequest)  return "ie7";
		else if (document.all&&!window.XMLHttpRequest) return "ie6";
		else if (navigator.userAgent.indexOf('Firefox') > -1) return "firefox";
		else if (navigator.userAgent.indexOf('Safari') > -1) return "safari";
		else if (document.all)    return "iec";
		return undefined;
	})();	
	
	gFrame.test = function() {
		gFrame('debug').show();
		return gFrame;
	};

	gFrame.id = function(id) {
		return gFrame.main.document.getElementById(id);
	};
	gFrame.create = function(id, text, dimension){
		if (gFrame.main.document.getElementById(id)) return gFrame.get(id); 
		var _default = { top : 100, left : 100, width:"", height:"", style : "border:3px solid #f00"};		
		if (dimension) for (var i in dimension) _default[i] = dimension[i];
		var dimension = _default;
		var gLayer = gFrame.main.document.createElement("div");
		gLayer.innerHTML = text;
		gLayer.id = id;				
		gLayer.className = 'gLayer';
		gFrame.main.document.getElementById('gBody').appendChild(gLayer);
		// set option
		if (dimension.style) gFrame.style(id, dimension.style);
		if (dimension.width) gFrame.width(id, dimension.width);
		if (dimension.height) gFrame.height(id, dimension.height);
		if (dimension.top) gFrame.top(id, dimension.top);
		if (dimension.bottom) gFrame.bottom(id, dimension.bottom);
		if (dimension.left) gFrame.left(id, dimension.left);
		if (dimension.right) gFrame.right(id, dimension.right);
		return gFrame.get(gLayer.id);
	};
	gFrame.remove = function(id) {
		var target = gFrame.main.document.getElementById(id)
		if (!target) return undefined;
		gFrame.main.document.body.removeChild(target);
		return gFrame;
	};
	gFrame.hide = function(id) {
		var target = gFrame.main.document.getElementById(id);
		if (!target) return undefined;
		if (target.savePosition) return undefined;
		target.savePosition = {left: target.style.left, right: target.style.right};
		gFrame.left(id, "-3000");
		return gFrame;
	};
	gFrame.show = function(id) {
		var target = gFrame.main.document.getElementById(id);
		if (!target || !target.savePosition) return undefined;
		target.style.left = target.savePosition.left;
		target.style.right = target.savePosition.right;
		target.savePosition = undefined;
		return gFrame;
	};
	gFrame.opacity = function(id, value) {
		var target = gFrame.main.document.getElementById(id);
		if (!target) return undefined;
		if (target.style.opacity !== undefined) target.style.opacity = value;
		else if (target.filters) target.style.filter = "alpha(opacity="+value*100+")";
		return gFrame;
	};
	gFrame.toBack = function(id) {
		var target = gFrame.main.document.getElementById(id);
		target.style.zIndex = "-10";
		return gFrame;
	};
	gFrame.toFront = function(id) {
		var target = gFrame.main.document.getElementById(id);
		target.style.zIndex = "10";
		return gFrame;
	};
	gFrame.full = function(id) {
		var target = gFrame.main.document.getElementById(id);
		var dimension = {width: gFrame(id).width(), height:gFrame(id).height()};
		var top = target.style.top, bottom = target.style.bottom, left = target.style.left, right = target.style.right;
		if (top&&(bottom!='auto')&&bottom) dimension.bottom = bottom; else dimension.top = top;
		if (left&&(right!='auto')&&right) dimension.right = right; else dimension.left = left;
		dimension.border  = target.style.border;
		dimension.margin  = target.style.margin;
		dimension.padding = target.style.padding;
		dimension.zIndex  = target.style.zIndex || 100;
		target.style.border  = "0";
		target.style.margin  = "0";
		target.style.padding = "0";
		target.style.top  = "0";
		target.style.left = "0";
		target.style.width = "100%";
		target.style.height = "100%";
		if (!target.originalDimension) target.originalDimension = dimension;
		return gFrame;
	};
	gFrame.original = function(id) {
		var target = gFrame.main.document.getElementById(id);
		var dimension = target.originalDimension;
		if (dimension){
			if (dimension.top&&dimension.bottom) gFrame.bottom(id, dimension.bottom); else gFrame.top(id,  dimension.top );
			if (dimension.left&&dimension.right) gFrame.right(id,  dimension.right ); else gFrame.left(id, dimension.left);
			if (dimension.width  )   gFrame(id).width(dimension.width);
			if (dimension.height )  gFrame(id).height(dimension.height);
			if (dimension.border )  target.style.border = dimension.border;
			if (dimension.padding) target.style.padding = dimension.padding;
			if (dimension.margin )  target.style.margin = dimension.margin;
			if (dimension.zIndex )  target.style.zIndex = dimension.zIndex;
			target.originalDimension = undefined;
		}
		return gFrame;
	};
	gFrame.fullBack = function(id) {
		gFrame.full(id);
		gFrame.toBack(id);
		return gFrame;
	};

	gFrame.zIndex = function(id, value) {
		var target = gFrame.main.document.getElementById(id);
		if (value === undefined) {
			return target.style.zIndex;
		} else target.style.zIndex = value;
		return gFrame;
	};

	// Keyword : 
	// offsetWidth, clientWith, currentStyle, runtimeStyle, getComputedStyle

	gFrame.top = function(id, value) {
		var target = gFrame.main.document.getElementById(id);
		if (!target) return undefined;
		if (value === undefined) return target.style.top;
		else if (("" + value).indexOf("%") > -1 || value == "auto") target.style.top = value;
		else {
			target.style.top = ("" + value).split("px")[0] + "px";
			target.style.bottom = "auto";
		}
		return target;
	};
	gFrame.bottom = function(id, value) {
		var target = gFrame.main.document.getElementById(id);
		if (!target) return undefined;
		if (value === undefined) return target.style.bottom;
		if (("" + value).indexOf("%") > -1 || value == "auto") target.style.bottom = value;
		else {
			target.style.bottom = ("" + value).split("px")[0] + "px";
			target.style.top = "auto";
		}
		return target;
	};
	gFrame.left  = function(id, value) {
		var target = gFrame.main.document.getElementById(id);
		if (!target) return undefined;
		if (value === undefined) return target.style.left;
		if (("" + value).indexOf("%") > -1 || value == "auto") target.style.left = value;
		else {
			target.style.left = ("" + value).split("px")[0] + "px";
			target.style.right = "auto";
		}
		return target;
	};
	gFrame.right = function(id, value) {
		var target = gFrame.main.document.getElementById(id);
		if (!target) return undefined;
		if (value === undefined) return target.style.right;
		if (("" + value).indexOf("%") > -1 || value == "auto") target.style.right = value;
		else {
			target.style.right = ("" + value).split("px")[0] + "px";
			target.style.left  = "auto";
		}
		return target;
	};
	gFrame.height = function(id, value) {
		var target = gFrame.main.document.getElementById(id);
		if (!target) return undefined;
		if (value === undefined) return target.clientHeight; 
		if (("" + value).indexOf("%") > -1 || value == "auto") target.style.height = value;
		else target.style.height = ("" + value).split("px")[0] + "px";
		return gFrame;
	};
	gFrame.width = function(id, value) {
		var target = gFrame.main.document.getElementById(id);
		if (!target) return undefined;
		if (value === undefined) return target.clientWidth; 
		else if (("" + value).indexOf("%") > -1 || value == "auto") target.style.width = value;
		else target.style.width = ("" + value).split("px")[0] + "px";
		return gFrame;
	};
	gFrame.style = function(id, value) { // for style attribute
		var target = gFrame.main.document.getElementById(id);
		if (!target) return undefined;
		if (value === undefined) {
			if (document.all && !window.Storage) return target.style.cssText;
			else return target.getAttribute('style'); 
		} else {
			if (document.all && !window.Storage) target.style.cssText = value;
			else target.setAttribute('style', value);
		}
		return target;
	};
	gFrame.text = function(id, value) {
		var target = gFrame.main.document.getElementById(id);
		if (!target) return undefined;
		if (value === undefined) return target.innerHTML
		else target.innerHTML = value;
		return target;
	};
	gFrame.has = function(id) {
		var target = gFrame.main.document.getElementById(id);
		return (target && target.id) ? true : false;
	};
	gFrame.get = function(id) {
		var target = gFrame.main.document.getElementById(id);
		if (!target) return {remove: function(){}};
		return {
			id      : target.id,
			element : target,
			height  : function(v) { 
				if (v !== undefined) { gFrame.height(this.id, v); return this;
				} else return gFrame.height(this.id); 				
			}, 
			width   : function(v) {
				if (v !== undefined) { gFrame.width(this.id, v);  return this;
				} else return gFrame.width(this.id); 	
			}, 
			text    : function(v) { 
				if (v !== undefined) { gFrame.text(this.id, v);   return this;
				} else return gFrame.text(this.id); 	
			}, 
			top     : function(v) {
				if (v !== undefined) { gFrame.top(this.id, v);    return this;
				} else return gFrame.top(this.id); 
			},  
			left    : function(v) {
				if (v !== undefined) { gFrame.left(this.id, v);   return this;
				} else return gFrame.left(this.id); 
			},  
			right   : function(v) {
				if (v !== undefined) { gFrame.right(this.id, v);  return this;
				} else return gFrame.right(this.id); 
			},  
			bottom  : function(v) {
				if (v !== undefined) { gFrame.bottom(this.id, v); return this;
				} else return gFrame.bottom(this.id); 
			},  
			style  : function(v) {
				if (v !== undefined) { gFrame.style(this.id, v);  return this;
				} else return gFrame.style(this.id); 
			},  
			opacity : function(v) {
					gFrame.opacity(this.id, v);  return this;
			},
			toBack   : function()  {gFrame.toBack(this.id);         return this;},
			toFront  : function()  {gFrame.toFront(this.id);        return this;},  
			full     : function()  {gFrame.full(this.id);           return this;},
			fullBack : function()  {gFrame.fullBack(this.id);       return this;},
			original : function()  {gFrame.original(this.id);       return this;},  
			zIndex   : function(v) {
				if (v !== undefined) { gFrame.zIndex(this.id, v); return this;
				} else return gFrame.zIndex(this.id);
			},
			hide    : function( ) { gFrame.hide  (this.id);       return this}, 
			show    : function( ) { gFrame.show  (this.id);       return this},
			remove  : function( ) { gFrame.remove(this.id);       return this} 
		};
	};
	gFrame.size = function() {
		var target = gFrame.main.document.getElementsByTagName('div');
		var items = 0;
		for (var i=0; i < target.length; i++) {
			if (target[i].className&&target[i].className.indexOf("gLayer") > -1) {
				items++;
			}
		}
		return items;
	};
	gFrame.list = function() {
		var target = gFrame.main.document.getElementsByTagName('div');
		var items = [];
		for (var i=0; i < target.length; i++) {
			if (target[i].className&&target[i].className.indexOf("gLayer") > -1) {
				items.push(target[i].id);
			}
		}
		return items;
	};

	/*
	*  once util
	*/
	var once = [];
	gFrame.once = function(id, code) {
		if (once.indexOf(id) > -1) return gFrame;
		once.push(id);
		gFrame.eval(code);
		return gFrame;
	};
	gFrame.once.empty = function() { 
		once.length = 0;
		return gFrame;
	}
	gFrame.once.list = function() { 
		return once;
	}
	gFrame.once.size = function() {
		return once.length;
	};
	gFrame.once.remove = function(id) {
		var target = once.indexOf(id);
		if (target > -1) once.remove(target);
		return gFrame;
	};
	
	gFrame.loadScript = function(src, callfunc/*, charset*/) {
		var script = gFrame.main.document.createElement('script');
		var callback = function() {gFrame.eval(callfunc)};
		script.type = 'text/javascript';
		script.onload = callback;
		script.src = src;
		if (document.all&&!window.Storage) { // ie6&ie7
			script.onreadystatechange = function() {
				if (this.readyState == 'complete') return callback();
			}
		}
		gFrame.main.document.body.appendChild(script);
	};

	/*
	** gFrame Events
	*/ 
	var pEvent = { // page Event, removed when page moved
		load   : [],
		unload : [],
		ready  : []
	};
	var gEvent = { // global Event
		load   : [],
		unload : [],
		ready  : []
	};	
	var eventCheck = function(type, func, global) {
		var target = (global) ? gEvent[type] :  pEvent[type];
		for (var i=0; i < target.length ; i++ ) {
			if (target[i] == func) return i;
		}
		return -1;
	};
	gFrame.removeEvent = function(type, func) {
		var target1 = pEvent[type]; 
		var target2 = gEvent[type];
		for (var i=0; i < target1.length;i++ ) {
			if (target1[i] == func) {
				target1.remove(i);
				return gFrame;
			}
		}
		for (var i=0; i < target2.length;i++ ) {
			if (target2[i] == func) {
				target2.remove(i);
				return gFrame;
			}
		}
		return gFrame;
	};
	gFrame.addEvent = function(type, func, global) {
		if (eventCheck(type, func, global) > -1 ) return false;
		else if (global) gEvent[type].push(func);
		else pEvent[type].push(func);
		return gFrame;
	};

	gFrame.trigger = function(type, e) {
		var list = (gEvent[type]).concat(pEvent[type]);
		for (var i=0 ; i < list.length; i++ ) list[i](e);
		return gFrame;
	};
	gFrame.eval = function(code) {
		 var result
		try {
			if (typeof code == "function") var result = code.apply(gFrame.main);
			else result = gFrame.main.eval.call(null, code);
			return result;
		} catch (err)	{return err }		
	};

	gFrame.initEvent = function() {
		if (!gFrame.content || top == gFrame.content) return false;
		// reset pEvent
		pEvent = {load:[], unload:[], ready:[]};
		var target = gFrame.content;
		var ready = function(e) {
			gFrame.title();
			gFrame.trigger('ready', e);
		};
		if (target.addEventListener) {
			target.addEventListener('DOMContentLoaded', ready, false);
			target.addEventListener('load',   function(e){gFrame.trigger('load', e);}, false);
			target.addEventListener('unload', function(e){
				gFrame.trigger('unload',e);
			}, false);
		} else if (target.attachEvent) {
			target.attachEvent('onload',   function(e){gFrame.trigger('load', e);});
			target.attachEvent('onunload', function(e){
				gFrame.trigger('unload', e);
			});
			// less than IE9, use defer trick for DOMContentLoaded event; 
			target.document.write('<script id="rTs" type="text/javascript" defer="defer" src="javascript:void(0)"></'+'script>');	
			var rt = target.document.getElementById("rTs");
			rt.onreadystatechange=function(){
				if (this.readyState=="complete") return ready();
			};
		};
	}
	gFrame.ready = function(fun, global) {
		if (!fun) return gFrame.trigger('ready');			 
		else gFrame.addEvent('ready', fun, global);
		return gFrame;
	};
	gFrame.load  = function(fun, global) {
		if (!fun) return gFrame.trigger('load');			 
		else gFrame.addEvent('load', fun, global);
		return gFrame;
	};	
	gFrame.unload = function(fun, global) {
		if (!fun) return gFrame.trigger('unload');			 
		else gFrame.addEvent('unload', fun, global);
		return gFrame;
	};
	gFrame.target = undefined;
	gFrame.exit   = EXIT;

	/*
	*  HTML TEXT
	*/
	gFrame.title = function() {
		var title = gFrame.content.document.title + " #";
		try	{ 
			if (window.history.replaceState) top.history.replaceState({foo:'bar'}, title, gFrame.content.location.href);		
			top.document.title = title;		
		}catch (err){};
		return gFrame
	};
		
	gFrame.store = {
		style  : 'html, body{height:100%;margin:0;padding:0;}\n '+ '#debug {position:absolute;color:#5E5E5E;z-index:500;font:10px arial;left:5px;bottom:15px;border:1px solid #f00;border-radius:3px;padding:3px;cursor:default}' + 'div.gLayer {position:absolute;z-index:100}\n' + 'iframe ',
		scripts : [],
		head	: "",
		body	: ""
	};

	if (window.gFSETUP) {
		gFrame.store.style = (gFSETUP.style) ? gFrame.store.style + gFSETUP.style : gFrame.store.style;
		gFrame.store.scripts = gFrame.store.scripts.concat(gFSETUP.scripts);
		gFrame.store.head = (gFSETUP.head) ? gFrame.store.head + gFSETUP.head : gFrame.store.head;		
		gFrame.store.body = (gFSETUP.body) ? gFrame.store.body + gFSETUP.body : gFrame.store.body;		
	}

	gFrame.mReady = function(a, b) {
		var scripts = gFrame.store.scripts;
		gFrame.main = a;
		gFrame.content = b;
		for (var i=0; i< scripts.length; i++ ) {
			gFrame.eval(scripts[i]);
		}
		gFrame.content.location.href = self.location.href;
		return gFrame;
		
	};
	// Main Frame Text Escape
	var body  = '<!doctype html><html><head><title>main Frame</title>';
	body += '<script type="text/javascript">gFrame = parent.gFrame; gFrame.main = window; </script>';
	body += '<style>' + gFrame.store.style + '</style>';
	body += gFrame.store.head+'</head>';
	body += '<body id="gBody">';
	body += '<div id="debug" class="gLayer">gFrame</div>';
	body += '<iframe id="cFrame" name="cFrame" frameBorder="0" style="margin:0;padding:0;border:0;width:100%;height:100%;" marginwidth=0 marginheight=0 scrolling="auto" allowtransparency="true"></iframe>';
	body +=  gFrame.store.body;
	body += '<script type="text/javascript">gFrame.mReady(self, frames["cFrame"]);</script>';
	body += '</body></html>';

	gFrame.check = false;

	// Wrapper : frame Wrapper text 
	gFrame.phase1 = function() {
		
		gFrame.wrapper.document.getElementById('initFrame').removeAttribute('onload');
		gFrame.wrapper.document.getElementById('initFrame').onload = null;
		if (gFrame.check)	{ return false}

		gFrame.main = frames['initFrame'];
		//if (true /*gFrame.browser == "firefox"*/) {  // URL HOOK (flash script)
			gFrame.main.document.location.href = document.location.href;
		/*} else { // ABOUT:BLANK (flash script)
			gFrame.main.document.write(body);
			gFrame.main.document.close();
		};
		*/

		gFrame.check = true;
	};

	gFrame.phase2 = function() {
		gFrame.main.document.write(body);
		gFrame.main.document.close();
		return true;
	};

	var wrap  = '<meta http-equiv="X-UA-Compatible" content="IE=edge" />';
	wrap += '<title>gFrame init</title></head><frameset rows="*" frameborder="no" border="0" framespacing="0">';
	wrap += '<frame id="initFrame" name="initFrame" frameborder="no" style="margin:0;padding:0;"frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" noresize onload="gFrame.phase1();"/>';
	wrap += '</frameset></html>';

	// LET'S START
	document.write(wrap);
	document.close();

})();