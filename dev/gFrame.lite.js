/* 
*  gFrame.lite.js v0.1.03a
*
* Copyright (c) 2011 50ndd1n6@gmail.com, 50ndd1n6.tistory.com
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/

(function() {

	var ver = "v0.1.03a";

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
		gFrame.content = window;
		gFrame.wrapper = window; 
		gFrame.start   = START;
		gFrame.alive   = false;
		gFrame.ver     = ver;
		gFrame.exit    = function() {return this}; // dummy function;
		return undefined;
	};

	/* PHASE 1st : ##content## */
	if (window.name == "content") {
		var gFrame = window.gFrame = parent.gFrame;
		gFrame.content = window;
		gFrame.initEvent();
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

	/******* START *******/
	
	// Array.prototype.indexOf, Array.prototype.filter, Array.prototype.forEach for ECMA5 browser - By MDC
	// Array Remove - By John Resig (MIT Licensed)
	eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('2(!8.6.y){8.6.y=9(x){2(3===m 0||3===r)f c e();4 t=l(3);4 5=t.7>>>0;2(5===0)b-1;4 n=0;2(j.7>0){n=G(j[1]);2(n!==n)n=0;I 2(n!==0&&n!==(1/0)&&n!==-(1/0))n=(n>0||-1)*h.E(h.z(n))};2(n>=5)b-1;4 k=n>=0?n:h.F(5-h.z(n),0);q(;k<5;k++)2(k s t&&t[k]===x)b k;b-1}};2(!8.6.w){8.6.w=9(a){2(3===m 0||3===r)f c e();4 t=l(3);4 5=t.7>>>0;2(D a!=="9")f c e();4 o=[];4 g=j[1];q(4 i=0;i<5;i++){2(i s t){4 p=t[i];2(a.A(g,p,i,t))o.B(p)}}b o}};2(!8.6.v){8.6.v=9(a){2(3===m 0||3===r)f c e();4 t=l(3);4 5=t.7>>>0;2(D a!=="9")f c e();4 g=j[1];q(4 i=0;i<5;i++)2(i s t)a.A(g,t[i],i,t)}};8.6.K=9(d,C){4 u=3.J((C||d)+1||3.7);3.7=d<0?3.7+d:d;b 3.B.H(3,u)};',47,47,'||if|this|var|len|prototype|length|Array|function|fun|return|new|from|TypeError|throw|thisp|Math||arguments||Object|void||res|val|for|null|in||rest|forEach|filter|searchElement|indexOf|abs|call|push|to|typeof|floor|max|Number|apply|else|slice|remove'.split('|')));

	//window.name = "wrapper";
	var gFrame = window.gFrame = {};
	gFrame.wrapper = window;
	gFrame.alive   = true;
	gFrame.ver     = ver;
	gFrame.exit    = EXIT;
	gFrame.init    = function() {};
	gFrame.start   = Function("return this");

	// ETC Utils
	gFrame.eval = function(code) {
		var result;
		try {
			if (typeof code == "function") result = code.apply(gFrame.main);
			else result = gFrame.main.eval.call(null, code);
			return result;
		} catch (err)	{return err }	
		return result
	};
	gFrame.title = function() {
		try {if (!gFrame.wrapper == top) return false;}
		catch (err)	{return false};
		gFrame.wrapper.document.title = gFrame.content.document.title;
		if (window.history.replaceState) {
			gFrame.wrapper.history.replaceState({}, undefined, gFrame.content.location.href);
		}
		return gFrame;		
	};
	gFrame.loadScript = function(src, callfunc/*, charset*/) {
		var script = gFrame.main.document.createElement('script');
		var callback = function() {gFrame.eval(callfunc)};
		script.type = 'text/javascript';
		script.onload = callback;
		script.src = src;
		script.onreadystatechange = function() {
			if (this.readyState == 'complete') return callback();
		}
		gFrame.main.document.getElementById('gBody').appendChild(script);
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
	};
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
	/******* FINISH *******/	
	var store = {
		style  : 'html, body{height:100%;margin:0;padding:0;}\n '
				+ '#debug {position:absolute;color:#5E5E5E;z-index:500;font:10px arial;left:5px;bottom:15px;border:1px solid #f00;border-radius:3px;padding:3px;cursor:default}\n' 
				+ 'div.gLayer {position:absolute;z-index:100}\n',
		scripts : [],
		head	: "",
		body	: ""
	};

	if (window.gFSETUP) {
		store.style   = (gFSETUP.style) ? store.style + gFSETUP.style : store.style;
		store.scripts = store.scripts.concat(gFSETUP.scripts);
		store.head    = (gFSETUP.head)  ? store.head  + gFSETUP.head  : store.head;		
		store.body    = (gFSETUP.body)  ? store.body +  gFSETUP.body  : store.body;		
	};

	var gFrameLoaded = false
	gFrame.mReady = function(a, b) {
		if (!gFrameLoaded) { // firstMain loaded
			gFrame.content = gFrame.main.frames['content'];
			var scripts = store.scripts;
			for (var i=0; i< scripts.length; i++ ) gFrame.eval(scripts[i]);
			gFrame.content.location.replace(parent.document.location);
			gFrameLoaded = true;
		};
		return gFrame;
	};

	/* WRITE DOC*/// Main Frame Text
	var body  = '<!doctype html><html><head>';
	body += '<script>window.gFrame = parent.gFrame;</script>';
	body += '<style>' + store.style + '</style>';
	body += store.head + '</head>';
	body += '<body id="gBody">' + store.body;
	body += '<div id="debug" class="gLayer">gFrame</div>';
	body += '<iframe id="content" name="content" frameborder=no border=0  style="border:0;width:100%;height:100%;" allowtransparency="true" onload="gFrame.mReady();"></iframe>';
	body += '</body></html>';

	gFrame.writeMain = function() {
		gFrame.main.document.write(body);
		gFrame.main.document.close();
	};

	/* Wrapper Frame */	
	var check = false;
	var firstEnter = function() {
		if (check) return false;
		gFrame.main = frames['main'];
		gFrame.main.location.replace(location.href);
		check = true;
	};
	if (window.addEventListener) window.addEventListener('DOMContentLoaded', firstEnter, false);
	else {
		document.write('<script id="fRs" type="text/javascript" defer="defer" src="javascript:void(0)"></'+'script>');	
		var fR = target.document.getElementById("fRs");
			fR.onreadystatechange=function(){
				if (this.readyState=="complete") return firstEnter();
		};
	};
	window.onload = firstEnter;
	var wrap  = '<meta http-equiv="X-UA-Compatible" content="IE=edge" />';
	wrap += '<title>gFrame init</title></head><frameset rows="*" border="0" framespacing="0" frameborder="no">';
	wrap += '<frame id="main" name="main" src="about:blank" frameborder=no border=0 marginwidth=0 marginheight=0 noresize scrolling=NO />';
	wrap += '</frameset></html>'; 

	/* LET'S START */
	document.write(wrap);
	document.close();
})();