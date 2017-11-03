var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));

module.exports = {

	// Refer HELP.md for lsit of Arguments
	processArgs: function() {

		var argActions = {
						scrape: true, // determine if scraping required. Decline for Help & Versions
						display: false // maybe to just display results. To be decided later
					};

		// -h is Help
		if(argv.h == true) {
			// display contents from HELP.md
			try {  
			    var data = fs.readFileSync('HELP.md', 'utf8');
			    console.log(data); 
			    argActions.scrape = false;
			} catch(e) {
			    console.log('Error:', e.stack);
			}
		}

		// -v is Version
		if(argv.v) {
			console.log('Version 0.0.1'); 
			argActions.scrape = false;
		}

		if(argv.n) {
			console.log(cmdArgs.n + " results to be displayed on screen: \n");
		}

		if(argv.d) {
			console.log("Show results on Screen");
		}

		if(argv.f) {
			console.log("saving results to " + cmdArgs.f);
		}

		return argActions;
	}
};