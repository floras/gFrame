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
	
	if (window.gFrame&& window.gFrame.alive) {
		var onOff = "<style>#offButton:hover{border:1px solid #66D399}</style><div id='offButton'onclick='gFrame.exit();' style='display:block;height:100%;background:#43C881;color:#fff;cursor:pointer;padding:15px;font:bold 14px arial;width:35px;height:20px'>ON</div>";	
		var style = "border: 3px solid #43C881;border-radius:5px;text-align:center;";			
		gFrame('switch', onOff, {top:10, right:25, style:style});
	} else $("<div id='WoffButton'><div id='offButton'onclick='gFrame.start();'>OFF</div></div>").prependTo($("body"));
	
});