import fs from "fs";
import { exec } from "child_process";


/*function cleanify(htmlFilePath, outputFilePath) {


    let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
    let filteredHtml = htmlContent.split('').filter(char => char !== ';').join('');

    console.log(htmlContent);
    console.log("***********filtered*******************");
    console.log(filteredHtml);


    fs.appendFileSync(outputFilePath, filteredHtml, 'utf8');


} */





/*   **********************   REVERTING TO CLASS ********************* */


//cleanify("../html/index.html", "../public/index.html", {})
class pa {
    constructor(htmlFilePath, outputFilePath, filterBy, options) {
        this.htmlFilePath = htmlFilePath;
        this.outputFilePath = outputFilePath;
        this.filterBy = filterBy || ";";
        this.options = {
            AddNew: options.AddNew || false,
            Override: options.Override || false,
            Append: options.Append || false


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
    const openCommand = process.platform === 'win32'
        ? `start "" "${this.outputFilePath}"`
        : process.platform === 'darwin'
            ? `open "${this.outputFilePath}"`
            : `xdg-open "${this.outputFilePath}"`;


        exec(openCommand, (err) => {
            if (err) {
                console.error('Failed to open file:', err);
            } else {
                console.log('HTML file opened in default browser.');
            }
        });
    }

      program() {
            const filtered = this.filterFile();
            //console.log("filtered >>", filtered);

            if (this.options.AddNew || this.options.Override) {
                fs.writeFileSync(this.outputFilePath, filtered, 'utf-8');
            } else if (this.options.Append) {
                fs.appendFileSync(this.outputFilePath, filtered, 'utf-8');
            }

            this.mountFile();
        }
 
   }




export function papa(htmlFilePath, outputFilePath, filterBy, options = { AddNew: true }) {
    let p = new pa(htmlFilePath, outputFilePath, filterBy, options)
   // console.log(p)
    p.program();
    return p
}

papa("../html/index.html", "../public/index.html")