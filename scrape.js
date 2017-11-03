// This app is a command line tool

var request = require('request');
var cheerio = require('cheerio');
var scraper = require('./controller/scraper');

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
    // Call scraper
    scraper.startScraping(argsAction.display, 'h', argsAction.file);
}