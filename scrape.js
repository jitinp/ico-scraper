// This app would be used as a command line tool

var fs = require('fs');
var json = require('json-parser');


// Process CMD Arguments
var argProcessor = require('./controller/argProcessor.js');
var argsAction = argProcessor.processArgs();

// If scraping not required, exit app
if(argsAction.scrape == false) { 
	process.exit(1);	
}

else if(argsAction.scrape == true) {
	
	console.log("Hello ICO World");

	// Start Scraping
	
}