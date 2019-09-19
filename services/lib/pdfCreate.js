const fs = require("fs-extra");
const { join } = require("path");
const PdfPrinter = require('pdfmake')

const getContent = require('./contentProdDetails')

module.exports = (product) => new Promise( (resolve, reject) => {
    try {
        
        const fonts = {
            Roboto: {
              normal: 'Helvetica',
              bold: 'Helvetica-Bold',
              italics: 'Helvetica-Oblique',
              bolditalics: 'Helvetica-BoldOblique'
            }
          };
        const opts = {
        }
        
        const printer = new PdfPrinter(fonts)
        
        const docDefinition = {content: getContent(product)}
        const pdfDoc = printer.createPdfKitDocument(docDefinition, opts);
        pdfDoc.pipe(fs.createWriteStream(join(__dirname, '../document.pdf')));
        pdfDoc.end();
        resolve()
        
        
    } catch (error) {
        reject(error)
    }
} )