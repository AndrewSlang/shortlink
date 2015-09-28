//function to short links
var shortLink = function(){
	//var shortLink;
	var chars = "123456789bcdfghjkmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ";
	var i;
	var parametr = "";
	for (i = 0; i < 5; i++) {
		parametr += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	//shortLink = baseUrl + "/r/" + parametr;
	//return shortLink;
	return parametr;
};

exports.toShort = shortLink;

//function to split tags
var recordTags = function(tags){
	var tagsString = tags.toString();
	var tagsArray = tagsString.split(';');
	var i = 0;
	var tagname = '';
	var tagnameTrim = '';
	for (i; i < tagsArray.length; i++) {
		tagname = tagsArray[i].trim();
		tagnameTrim = tagnameTrim + tagname + ';';
	}
	tagnameTrim = tagnameTrim.split(';');
	for (var t = 0; t < 2; t++) {
		tagPop = tagnameTrim.pop();
	}
	return tagnameTrim;
};

exports.toSplitTags = recordTags;