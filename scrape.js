// This app is a command line tool

var request = require('request');
var cheerio = require('cheerio');

// Process CMD Arguments
var argProcessor = require('./controller/argProcessor.js');
var argsAction = argProcessor.processArgs();

// If scraping not required, exit app.
// For Help & Versions
if(argsAction.scrape == false) { 
	process.exit(1);	
}

else if(argsAction.scrape == true) {
	
	console.log("Hello ICO World");

	// Start Scraping

	// TODO: move this to Controller
	// Have URL and Element Tags defined as JSON rules in text file. 
	request('https://tokenmarket.net/blockchain/all-assets', function (error, response, html) {
	if (!error && response.statusCode == 200) {
		var $ = cheerio.load(html);
		
		// For Token Market, start with Logo and then move down
		$('td.col-ico-logo').each(function(i, element){

			// Logo URL
			// .col-ico-log -> a -> img
			// Pay attention to tag passed in attr(). Its different from 'src'
			var logoElement = $(this);
			var logoURL = logoElement.children().children().attr('data-cfsrc');	

			// Status 
			// .col-asset-status -> span -> text()
			var statusElement = logoElement.next();
			var status = statusElement.children().text();

			// ICO Name
			// .col-asset-name -> div -> a -> text()
			var nameElement = statusElement.next();
			var name = nameElement.children().children().text();

			// ICO Symbol
			// .col-asset-symbol -> symbol
			var symbolElement = nameElement.next();
			var symbol = symbolElement.text();

			// ICO Description
			// .col-asset-description -> description
			var descriptionElement = symbolElement.next();
			var description = descriptionElement.text();
			
			// Our parsed meta data object
			var metadata = {
				url: logoURL,
				name: name,
				status: status,
				symbol: symbol,
				description: description,
			};
				console.log(metadata);
		});
		}
	});
}