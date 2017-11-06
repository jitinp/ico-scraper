var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var printToFile = require('./printToFile');

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

        // fetch source URL of ICO Database
        var sources = lists.sources;

        sources.forEach(function(item) {

            // Have URL and Element Tags defined as JSON values in text file.
            request(item.url, function (error, response, html) {
                if (!error && response.statusCode == 200) {
                    var $ = cheerio.load(html);

                    // Fetch List of Elements to be scraped
                    var elements = item.elements;

                    // Fetch all elements associated with every Anchor element
                    // This returns all occurrence of Anchor Element
                    // Each Anchor Element returns unique URL of current ICOs
                    $(item.anchor).each(function(){

                        // declare main json Structure
                        var ico = {
                            name: "",
                            symbol: "",
                            url: "",
                            oneliner: "",
                            dates: {
                                openingDate: "",
                                closingDate: ""
                            },
                            concept: "",
                            team: "",
                            whitepaper: "",
                            github: "",
                            links: {
                                website: "",
                                blog: "",
                                twitter: "",
                                facebook: "",
                                linkedin: "",
                                whitepaper: "",
                                slack: "",
                                telegram: "",
                                youtube: ""
                            }
                        };

                        ico.name = eval(elements.name);
                        ico.url = eval(elements.subPageURL);

                        // Open every Link on the main Website
                        request(ico.url, function (error, response, html) {
                            if (!error && response.statusCode == 200) {
                                var $ = cheerio.load(html);

                                ico.oneLiner = eval(elements.oneLiner);

                                // Symbol
                                ico.symbol = eval(elements.symbol);

                                // Date
                                ico.dates.openingDate = eval(elements.openingDate);
                                ico.dates.closingDate = eval(elements.closingDate);
                                ico.concept = eval(elements.concept);

                                // White paper
                                ico.whitepaper = eval(elements.whitepaper);

                                // Links
                                ico.links.website = eval(elements.website);
                                ico.links.blog = eval(elements.blog);
                                ico.links.facebook = eval(elements.facebook);
                                ico.links.twitter = eval(elements.twitter);
                                ico.links.linkedin = eval(elements.linkedin);
                                ico.links.slack = eval(elements.slack);
                                ico.links.telegram = eval(elements.telegram);
                                ico.github = eval(elements.github);
                                ico.links.youtube = eval(elements.youtube);

                                // Team info
                                ico.team = eval(elements.team);
                            }

                            // Turn off display on Terminal if False
                            if(isDisplayOnScreen != 'false')
                                console.log(ico);

                            // Save Data to DB
                            if(isStoreToDb == 'false')
                                console.log('Don\'t store results in DB');

                            // Write Data to File
                            if(isWriteToFile != null)
                                printToFile.print(isWriteToFile, JSON.stringify(ico, null, "\t"));
                        });
                    });
                }
            });
        });
        return;
    }
}