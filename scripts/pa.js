import fs from "fs";
import { exec } from "child_process";


/*function cleanify(htmlFilePath, outputFilePath) {


    let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
    let filteredHtml = htmlContent.split('').filter(char => char !== ';').join('');

    console.log(htmlContent);
    console.log("***********filtered*******************");
    console.log(filteredHtml);


    fs.appendFileSync(outputFilePath, filteredHtml, 'utf8');

    htmlContent = null;
    filteredHtml = null;
} */





/*   **********************   REVERTING TO CLASS ********************* */


//cleanify("../html/index.html", "../public/index.html", {})
class pa {
    constructor(htmlFilePath, outputFilePath, filterBy, options) {
        this.htmlFilePath = htmlFilePath;
        this.outputFilePath = outputFilePath;
        this.filterBy = filterBy || ";";
        this.options = {
            AddNew : options.AddNew ? options.AddNew : false,
             
        };
    }
    filterFile() {
        let htmlContent = null;
        let filteredHtml = null;
        htmlContent = fs.readFileSync(this.htmlFilePath, 'utf8');
        filteredHtml = htmlContent.split('').filter(char => char !== this.filterBy).join('');


        return filteredHtml;

    }

    mountFile() {
        // Platform-aware command
        const openCommand = process.platform === 'win32'
            ? `start "" "${outputFilePath}"`
            : process.platform === 'darwin'
                ? `open "${outputFilePath}"`
                : `xdg-open "${outputFilePath}"`; // Linux


        exec(openCommand, (err) => {
            if (err) {
                console.error('Failed to open file:', err);
            } else {
                console.log('HTML file opened in default browser.');
            }
        });
    }

    program() {
        switch (this.options) {
            case this.options.AddNew || this.options.Override : {
                // creating a new file
                const filtered = this.filterFile()
                console.log("fitered >> ",filtered)
                fs.writeFile(this.outputFilePath, filtered, 'utf-8')
                break;
            }

            case this.options.Append : {
                  const filtered = this.filterFile()
                console.log("fitered >> ",filtered)
                fs.appendFile(this.outputFilePath, filtered, 'utf-8')
                break;
            }
        }
    }
} 