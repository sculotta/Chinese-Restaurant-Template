$(function () { // Same as document.addEventListner("DOMContentLoaded")

	//Same as document.querySelector("#navbarToggle").addEventListner("")
	$("#navbarToggle").blur(function (event) {
		var screenWidth = window.innerWidth;
		if (screenWidth < 768) {
			$("#collapsable-nav").collapse('hide');
		}
	});
});


(function (global) {

	var dc={};


	var allCategoriesURL = "http://davids-restaurant.herokuapp.com/categories.json";

	var categoriesTitleHtml = "snippets/categories-title-snippet.html";

	var categoryHtml = "snippets/category-snippet.html";

	//Convinence function for inserting innerHTML for 'select'
	var insertHtml = function (selector, html) {
		var targetElem = doucment.querySelector(selector);

	};

	// Return substitue of '{{propName}}'
	// with propValue in given 'string'

	var insertProperty = function (string, propName, propValue) {
		var propToReplace = "{{" + propName + "}}";
		string = string
		 .replace(new RegExp(propToReplace, "g"), propValue);
		return string;
	}

	// load the menu categories view 

	dc.loadMenuCategories = function () {
		$ajaxutils.sendGetRequest (
			allCategoriesURL,
			buildAndShowCategoriesHTML);
	};

	// builds html for the cateogires page based on the data from the server
 function buildAndShowCategoriesHTML (categories) {

 	// load title snippet of categories page
 	$ajaxUtils.sendGetRequest(
 		categoriesTitleHtml,
 		function (categoriesTitleHtml) {
 			//retreive single category snippet
 		$ajaxUtils.sendGetRequest(
 			categoryHtml,
 			function (categoryHtml) {
 				var categoriesViewHtml =
 				 buildCategoriesViewHtml(categories,
 				 						categoriesTitleHtml, 
 				 						categoryHtml);
 				 	insertHtml("#main-content", categoriesViewHtml);
 			}, 
 			false);
 		},
 		false);
 }	



// using cateogires data and snippets html
//build cateogires view html to be inserted into page 

function buildCategoriesViewHtml (categories, categoriesTitleHtml, 
									categoryHtml) {
	var finalHtml = categoriesTitleHtml;
	finalHtml += "<section class='row'>";

	// loop over categories 
	for (var i = 0; i <categories.length; i++) {
		//insert category values 
	var html = categoryHtml;
	var name = "" + categories[i].name;
	var short_name = categories[i].short_name;
	html = insertProperty(html, "name", name);
	html = insertProperty(html, "short_name", short_name);
		finalHtml += html;
	}
	finalHtml += "</section>";
	return finalHtml;
   }


   global.$dc = dc;

})(window);







	