var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

module.exports = {

    /*
     * Call scraper - Scrape results from Listed Websites in Source File.
	 * Load Website List and Scraping Elements from `source.json`
	 * Anchor points and subsequent elements listed in `source.json`, parse and pass elements as JS eval object
	 *
	 * @isDisplayOnScreen - whether to display results on screen
	 * @isStoreToDb - whether to write to DB
	 * @isWriteToFile - whether to write to File
	 */
    startScraping: function (isDisplayOnScreen, isStoreToDb, isWriteToFile) {

        // Read JSON file for Scraping List
        var lists = JSON.parse(fs.readFileSync('source.json', 'utf8'));
        console.log(lists); // List of Website and Elements

        // fetch List of website
        var sources = lists.sources;

        sources.forEach(function(item) {

            // Have URL and Element Tags defined as JSON values in text file.
            request(item.url, function (error, response, html) {
                if (!error && response.statusCode == 200) {
                    var $ = cheerio.load(html);

                    // Fetch List of Elements to be scraped
                    var elements = item.elements;

                    // Fetch all elements associated with every Anchor element
                    $(item.anchor).each(function(){

                        var logoURL = eval(elements.logoURLElement); // Logo URL
                        var status = eval(elements.statusElement); // Status
                        var name = eval(elements.nameElement); // ICO Name
                        var symbol = eval(elements.symbolElement); // ICO Symbol
                        var description = eval(elements.descriptionElement); // ICO Description

                        var metadata = {
                            url: logoURL.trim(), // remove white spaces and escape chars
                            name: name.trim(),
                            status: status.trim(),
                            symbol: symbol.trim(),
                            description: description.trim(),
                        };

                        // Turn off display on Terminal if False
                        if(isDisplayOnScreen != 'false')
                            console.log(metadata);

                        // Save Data to DB

                        if(isStoreToDb == 'false')
                            console.log('Don\'t store results in DB');

                        // Write Data to File
                        // to be completed..
                        if(isWriteToFile == 'true')
                            console.log('Writing data to File');

                    });
                }
            });
        });
        return;
    }
}