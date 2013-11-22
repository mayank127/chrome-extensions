var translateText = function(text, obj){
	return function(e){
		e.stopImmediatePropagation();
		e.preventDefault();
		translate(text, obj.find('.tweet-text')[0], $(window).scrollTop());
	};
}


var addButton = function(tweet){
	var content = $(tweet).find('.content')[0];
	if($(content).find('.translate-my').length==0){
		var button =$('<li class="translate-my"><a role="button" class="js-tooltip" href="#"><b>Translate</b></a></li>');

		$(content).find('.tweet-actions').append(button);
		var text = $(content).find('.tweet-text')[0].innerText;
		button.click(translateText(text, $(content)));
	}
};


var translate = function (query, obj, scroll) {
	var appId = "66A8CA727C20371BED579D93DC7E476479EAC832";
	var toLanguage = "en";

	var textToTranslate = encodeURIComponent(query);
	var translateUrl = "https://api.microsofttranslator.com/V2/Ajax.svc/Translate?to=" + toLanguage + "&appid=" + appId + "&text=" + textToTranslate;
	return $.ajax({
		url: translateUrl,
		type: "GET",
		success: function(text){
			var a ="";
			for(var i=1;i<text.length-1;i++){
				if(text[i]=='\\' && text[i+1]=='\\'){ a = a + "\\"; i++}
				else if(text[i]=='\\'){ a = a + text[i+1]; i++;}
				else a= a+text[i];
			}
			obj.innerText = a;
			$(window).scrollTop(scroll);
		}
	});
};

$(document).on('ready', function(){
	$('body').on('mouseover','.tweet', function(){
		addButton(this);
	});
	$('body').on('click','.tweet', function(){
		addButton(this);
	});
});
