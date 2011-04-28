$(function(){
	if (window.SyntaxHighlighter) SyntaxHighlighter.all();
	$("#ver").html(gFrame.ver);
	$("button:enabled").hover(function(){$(this).addClass("hover")}, function(){$(this).removeClass("hover")});
	$("#pages span").hover(function(){$(this).addClass("hover")}, function(){$(this).removeClass("hover")});
	$("#titleWrap").hover(function(){$(this).addClass("hover")}, function(){$(this).removeClass("hover")});
	$("#titleWrap").click(function(){
		window.location.href = "index.html";
	});
	if (!gFrame.alive) $("button.av").attr("disabled", "disabled");
	else $("button.Rav").attr("disabled", "disabled");
	$("button:enabled").addClass('enabled');
	$("<div class='overlay'></div>").appendTo($("#container"));
	$("<div id='overlay-header' class='overlay'></div>").appendTo($("#title"));
	if (!gFrame.alive) $("<div id='WoffButton'><div id='offButton'onclick='gFrame.start();'>OFF</div></div>").prependTo($("body"));
});