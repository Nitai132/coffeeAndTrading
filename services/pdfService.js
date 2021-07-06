var PdfTable = require('voilab-pdf-table'),
    PdfDocument = require('pdfkit');

module.exports = {
    create: function (positions) {
        // מייצר פידיאף וטייבל
        var pdf = new PdfDocument({
            autoFirstPage: false
        }),
            table = new PdfTable(pdf, {
                bottomMargin: 30
            });

        table
            // הוספת פלאגין לסידור הרוחב
            .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({

            }))
            // ערכים דיפולטיביים לעמודות
            .setColumnsDefaults({
                headerBorder: 'B',
                align: 'left',
                padding: [10, 0, 0, 0],
            })
            // עמודות של הטבלה
            .addColumns([
                {
                    id: 'Num',
                    header: 'number',
                    align: 'left',
                    width: 50,
                },
                {
                    id: 'Operation',
                    header: 'Operation',
                    width: 50,
                    align: 'left',
                },
                {
                    id: 'StartDate',
                    header: 'StartDate',
                    width: 40,
                    align: 'left',
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
                    align: 'left',
                },
                {
                    id: 'EndPrice',
                    header: 'EndPrice',
                    width: 70,
                    align: 'left',
                },
                {
                    id: 'succeeded',
                    header: 'succeeded',
                    width: 70,
                    align: 'left',
                },
                {
                    id: 'PipsesCents',
                    header: 'PipsesCents',
                    width: 70,
                    align: 'left',
                },
                {
                    id: 'Precent',
                    header: 'Success rate (per page)',
                    width: 70,
                    align: 'left',
                },

            ])
            // הוספת כותרת לכל עמוד
            .onPageAdded(function (tb) {
                tb.addHeader();
            });

        // הוספת עמוד נוסף
        pdf.addPage();

        // הכנסת הפוזיציות לבודי של הטבלה
        table.addBody(
            positions
        );

        return pdf;
    }
}