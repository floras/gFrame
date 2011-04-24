/* 
*  gFrame v0.1.01pa
*
* Copyright (c) 2011 50ndd1n6@gmail.com, 50ndd1n6.tistory.com
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/


(function() {

	/**
	 * from jQuery Cookie plugin
	 *
	 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
	 * Dual licensed under the MIT and GPL licenses:
	 * http://www.opensource.org/licenses/mit-license.php
	 * http://www.gnu.org/licenses/gpl.html
	 *
	 */	 
	eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('4 d=x(9,b,2){6(f b!=\'y\'){2=2||{};6(b===m){b=\'\';2.3=-1}4 3=\'\';6(2.3&&(f 2.3==\'n\'||2.3.l)){6(f 2.3==\'n\'){4 a=v q();a.r(a.t()+(2.3*u*k*k*B))}o 4 a=2.3;3=\'; 3=\'+a.l()}4 8=2.8?\'; 8=\'+(2.8):\'\';4 7=2.7?\'; 7=\'+(2.7):\'\';4 e=2.e?\'; e\':\'\';c.5=[9,\'=\',E(b),3,8,7,e].A(\'\')}o{4 j=m;6(c.5&&c.5!=\'\'){4 d=c.5.G(\';\');C(4 i=0;i<d.h;i++){4 5=(d[i]).D(/^\\s+|\\s+$/g,"");6(5.p(0,9.h+1)==(9+\'=\')){j=F(5.p(9.h+1));w}}}z j}};',43,43,'||options|expires|var|cookie|if|domain|path|name|date|value|document|cookies|secure|typeof||length||cValue|60|toUTCString|null|number|else|substring|Date|setTime||getTime|24|new|break|function|undefined|return|join|1000|for|replace|encodeURIComponent|decodeURIComponent|split'.split('|'),0,{}));

	if (cookies('gFOUT')) {
		var gFrame = window.gFrame = function() {
			return gFrame;
		};
		gFrame.start = function() {
			cookies('gFOUT', null, {path:"/"});
			top.location.href = self.location.href;
		};
		return undefined;
	} else if (top.gFrame) { 
		if (top!=self) { 
			var gFrame = window.gFrame = top.gFrame; 
			gFrame.content = self;
			gFrame.initEvent();
		}
		return undefined; 
	};

	// gFrame : short-hand handler
	var gFrame = top.gFrame = function(id, code, option) { 
		if (code) return gFrame.create(id,code,option);
		else return gFrame.get(id);
	};
	gFrame.cookie = cookies;
	gFrame.ver = "v0.1.01pa";
	gFrame.loaded = false;
	
	gFrame.onLoad = function() {
		if (gFrame.loaded) return false;
		gFrame.main = frames['mFrame'];
		gFrame.main.document.write(body);
		gFrame.main.document.close();
		gFrame.loaded = true;
		gFrame.body = gFrame.main.document.body;
	};
	gFrame.test = function() {
		gFrame('debug').show();
		return gFrame;
	};
	gFrame.id = function(id) {
		return gFrame.main.document.getElementById(id);
	};
	gFrame.create = function(id, text, dimension){
		if (gFrame.main.document.getElementById(id)) return false; 
		var _default = { top : 100, left : 100, width:"", height:"", style : "border:3px solid #f00"};
		
		if (dimension) for (var i in dimension) _default[i] = dimension[i];
		var dimension = _default;
		var gLayer = gFrame.main.document.createElement("div");
		gLayer.innerHTML = text;
		gLayer.id = id;

		if (("" + dimension.height).indexOf("%") > -1) 	gLayer.style.height = dimension.height;
		else gLayer.style.height = (dimension.height) ?  dimension.height + "px" : "auto";
				
		gLayer.className = 'gLayer';
		gFrame.main.document.getElementById('gBody').appendChild(gLayer);
		if (dimension.style) gFrame.style(id, dimension.style);
		if (dimension.width) gFrame.width(id, dimension.width);
		if (dimension.height) gFrame.height(id, dimension.height);
		if (dimension.top) gFrame.top(id, dimension.top);
		if (dimension.left) gFrame.left(id, dimension.left);

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
		target.savePosition = {left: target.style.left, right: target.style.right};
		gFrame.left(id, "-1000");
		return gFrame;
	};
	gFrame.show = function(id) {
		var target = gFrame.main.document.getElementById(id);
		if (!target || !target.savePosition) return undefined;
		target.style.left = target.savePosition.left;
		target.style.right = target.savePosition.right;
		return gFrame;
	};
	gFrame.opacity = function(id, value) {
		var target = gFrame.main.document.getElementById(id);
		if (!target) return undefined;
		if (target.style.opacity !== undefined) target.style.opacity = value;
		else if (target.filters) target.style.filter = "alpha(opacity="+value*100+");";
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
	gFrame.title = function(title) {top.document.title = title; return gFrame};
	gFrame.get = function(id) {
		var target = gFrame.main.document.getElementById(id);
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
			toBack : function()  {gFrame.toBack(this.id);         return this;},
			toFront : function() {gFrame.toFront(this.id);        return this;},  
			zIndex  : function(v) {
				if (v !== undefined) { gFrame.zIndex(this.id, v); return this;
				} else return gFrame.zIndex(this.id);
			},
			hide    : function( ) { gFrame.hide  (this.id);       return this}, 
			show    : function(v) { gFrame.show  (this.id);       return this} 
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
		try { return gFrame.main.eval.call(null, code);} 
		catch (err)	{return err }		
	};

	gFrame.initEvent = function() {
		if (!gFrame.content || top == gFrame.content) return false;
		var target = gFrame.content;
		var ready = function(e) {
			gFrame.title(target.document.title);
			gFrame.trigger('ready', e);
		};
		if (target.addEventListener) {
			target.addEventListener('DOMContentLoaded', ready, false);
			target.addEventListener('load',   function(e){gFrame.trigger('load', e);}, false);
			target.addEventListener('unload', function(e){
				gFrame.trigger('unload',e);
				pEvent = {load:[], unload:[], ready:[]};
			}, false);
		} else if (target.attachEvent) {
			target.attachEvent('onload',   function(e){gFrame.trigger('load', e);});
			target.attachEvent('onunload', function(e){
				gFrame.trigger('unload', e);
				pEvent = {load:[], unload:[], ready:[]};
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
	gFrame.load = function(fun, global) {
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

	gFrame.exit = function() {
		cookies('gFOUT', 'END', {path:"/"});		
		var target =(""+gFrame.content.location.href).split(gFrame.content.location.host);
		target[1] = target[1].replace(/\/+/, "/");
		target = target.join(gFrame.content.location.host);
		top.location.href = target;
	};

	 // IE Cracked; ALL IE (Include IE9, IE10)
	var bugFixLocation = (function(host){
		return (""+window.location.href).split(host).join(host+"/");
	})(window.location.host);
	
	// Wrapper : frame Wrapper text 
	var wrap  = '<meta http-equiv="X-UA-Compatible" content="IE=edge" />';
	wrap += '<title>gFrame init</title></head><frameset rows="*" frameborder=no border="0" framespacing="0" frameborder="no">';
	wrap += '<frame id="mFrame" name="mFrame" frameborder=no border=0 marginwidth=0 marginheight=0 noresize scrolling=NO src="" onload="gFrame.onLoad();" style="margin:0;padding:0"/>';
	wrap += '</frameset></html>';

	// Main Frame Text
	var body  = '<!doctype html><html><head><title>main Frame</title>';
	body += '<script>gFrame = top.gFrame;</script></head>';
	body += '<style>html,body{height:100%;margin:0;padding:0;} #debug {bottom:17px; left:2px;border:1px solid #f00;padding:5px;font:bold 10px arial;border-radius:3px;z-index:1000;cursor:default;} div.gLayer{position:absolute;z-index:10}</style>';
	body += '<body id="gBody"><div id="debug" class="gLayer"><div>gFrame</div></div>';
	body += '<iframe id="cFrame" name="cFrame" src="'+bugFixLocation+'" frameborder=no border=0  style="border:0;width:100%;height:100%;" allowtransparency="true"></iframe>';
	body += '</body></html>';

	// LET'S START
	document.write(wrap);

})();