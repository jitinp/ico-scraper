var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));

module.exports = {

	/*
	 * Command line arguments
	 * -h: Help
	 * -n: number of results to be returned
	 * -d: display results on screen
	 * -s: save results to DB (default action)
	 * -f: write results to file
	 */
	
	processArgs: function() {

		var argActions = {
						scrape: true, // determine if scraping or further actions required
						display: false // maybe to just display results. To be decided later
					};

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