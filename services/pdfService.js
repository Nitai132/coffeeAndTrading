var PdfTable = require('voilab-pdf-table'),
    PdfDocument = require('pdfkit');
   
module.exports = {
    create: function (arr) {
        // create a PDF from PDFKit, and a table from PDFTable
        var pdf = new PdfDocument({
                autoFirstPage: false
            }),
            table = new PdfTable(pdf, {
                bottomMargin: 30
            });
 
        table
            // add some plugins (here, a 'fit-to-width' for a column)
            .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
              
            }))
            // set defaults to your columns
            .setColumnsDefaults({
                headerBorder: 'B',
                align: 'left'
            })
            // add table columns
            .addColumns([
                {
                    id: 'Num',
                    header: 'number',
                    align: 'center',
                    width: 50,
                },
                {
                    id: 'Operation',
                    header: 'Operation',
                    width: 50,
                    align: 'center',
                },
                {
                    id: 'StartDate',
                    header: 'StartDate',
                    width: 40,
                    align: 'center',
                },
                {
                    id: 'EndDate',
                    header: 'EndDate',
                    width: 70,
                    align: 'left'
                },
                {
                    id: 'StartPrice',
                    header: 'StartPrice',
                    width: 70,
                    align: 'center',
                },
                {
                    id: 'EndPrice',
                    header: 'EndPrice',
                    width: 70,
                    align: 'center',
                },
                {
                    id: 'succeeded',
                    header: 'succeeded',
                    width: 70,
                    align: 'center',
                },
                {
                    id: 'PipsesCents',
                    header: 'PipsesCents',
                    width: 70,
                    align: 'center',
                },
                {
                    id: 'Precent',
                    header: 'Success rate (per page)',
                    width: 70,
                    align: 'center',
                },

            ])
            // add events (here, we draw headers on each new page)
            .onPageAdded(function (tb) {
                tb.addHeader();
            });
 
        // if no page already exists in your PDF, do not forget to add one
        pdf.addPage();
 
        // draw content, by passing data to the addBody method
        table.addBody(
            arr
        );
 
        return pdf;
    }
}