// This app is a command line tool

var scraper = require('./controller/scraper');

// Process CMD Arguments
var argProcessor = require('./controller/argProcessor.js');
var argsAction = argProcessor.processArgs();

// If scraping not required, exit app (for Help & Versions)
if(argsAction.scrape == false) { 
	process.exit(1);	
}

else if(argsAction.scrape == true) {
	
	console.log("Hello ICO World");

	// Start Scraping
    scraper.startScraping(argsAction.display, argsAction.writeToDb, argsAction.writeToFile);
}