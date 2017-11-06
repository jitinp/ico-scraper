var fs = require('fs');

module.exports = {

    /*
     * Print values to provided File name
	 * @fileName - Name of file
	 * @jsonData - JSON Blob to be printed
	 * @isWriteToFile - whether to write to File
	 */
    print: function (file, jsonData) {
        fs.appendFileSync(file, jsonData + ",\n"); // append json value to make it pretty
    }
}