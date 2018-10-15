var size = 16;
var content ;
$(function(){

	init();
	bind();

	$("#resume").click(function(){
		var obj=path.pop();
		if (!obj){
			alert("别按了。。")
			return;
		}
		$("td[x="+obj.x+"][y="+obj.y+"] div").remove();
		index--;
		var li = $("<li>");
		li.html(username[(index)%2]+"悔棋在：(" + obj.x +"," + obj.y + ")位置");
		li.css("color","red");
		$("#path").append(li);
		// $("#path :last-child").remove();
	})

})

function init()
{
	content = $("#content");

	for (var i = 0; i < size; i++) {
		var $tr = $("<tr>");
		for(var j = 0; j < size ; j ++)
		{
			var $td = $("<td>");
			$td.attr("x",i);
			$td.attr("y",j);
			$tr.append($td);
		}
		content.append($tr);
	}

	username.push(prompt("请输入第1个玩家的姓名"));
	username.push(prompt("请输入第2个玩家的姓名"));

}

var users = ["black","red"];
var index = 0;
var username = [];
//会员
var vips = ['cuiyi'];
var svip = 'zhubowen';
var path=[];

function bind()
{
	$("td").click(function(){
		if($(this).find("div").length && vips.findIndex((value)=>{return value == username[index%2]}) == -1   )
		{
			alert("此位置已经有旗子");
			return;
		}
		
		var div = $("<div>");
		div.addClass("item");
		div.addClass(users[(index++)%2]);
		$(this).html(div);
		var x = $(this).attr("x") - 0;
		var y = $(this).attr("y") - 0;
		var clsName = div.attr("class");
		path.push({x,y});
		var li = $("<li>");
		li.html(username[(index-1)%2]+"落子在：(" + x +"," + y + ")位置");
		$("#path").append(li);
		if(check(x,y,clsName) && username[(index-1)%2] != svip)
		{
			// alert("游戏结束,"+users[(index-1)%2]+"获胜");
			setTimeout(function(){
				alert("游戏结束,"+username[(index-1)%2]+"获胜");
				$("td").unbind("click");
			},100); 
		}
	});
}


function check(x,y,clsName)
{
	return a(x,y,clsName) >= 5 || b(x,y,clsName)  >= 5 || c(x,y,clsName)  >= 5 || d(x,y,clsName)  >= 5;
}

//水平方向
function a(x,y,clsName){
	var count = 1;

	var x1 = x;
	var y1 = y - 1;
	while($("td[x="+x1+"][y="+y1+"]").find("div[class='"+clsName+"']").length)
	{
		count++;
		y1--;
	}

	var x2 = x;
	var y2 = y + 1;
	while($("td[x="+x2+"][y="+y2+"]").find("div[class='"+clsName+"']").length)
	{
		count++;
		y2++;
	}

	return count;
}



function b(x,y,clsName){
    var count = 1;

	var x1 = x - 1;
	var y1 = y ;
	while($("td[x="+x1+"][y="+y1+"]").find("div[class='"+clsName+"']").length)
	{
		count++;
		x1--;
	}

	var x2 = x + 1;
	var y2 = y ;
	while($("td[x="+x2+"][y="+y2+"]").find("div[class='"+clsName+"']").length)
	{
		count++;
		x2++;
	}

	return count; 



}
function c(x,y,clsName){
	var count = 1;

	var x1 = x - 1;
	var y1 = y + 1  ;
	while($("td[x="+x1+"][y="+y1+"]").find("div[class='"+clsName+"']").length)
	{
		count++;
		x1--;
		y1++;
	}

	var x2 = x + 1;
	var y2 = y - 1 ;
	while($("td[x="+x2+"][y="+y2+"]").find("div[class='"+clsName+"']").length)
	{
		count++;
		x2++;
		y2--;
	}
	console.log(clsName,count,"td[x="+x2+"][y="+y2+"]")
	return count; 
}
function d(x,y,clsName){


	var count = 1;

	var x1 = x - 1;
	var y1 = y - 1;
	while($("td[x="+x1+"][y="+y1+"]").find("div[class='"+clsName+"']").length)
	{
		count++;
		x1--;
		y1--;
	}

	var x2 = x + 1;
	var y2 = y + 1;
	while($("td[x="+x2+"][y="+y2+"]").find("div[class='"+clsName+"']").length)
	{
		count++;
		x2++;
		y2++;
	}

	return count; 
}

