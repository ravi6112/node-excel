const mysql = require('mysql');
const excel = require('exceljs');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'phone_dir'
});

conn.connect((err) => {
    if (err) {
        console.log('error came ', err);
        throw err;
    }
    conn.query("SELECT * FROM employees LIMIT 100", (err, users, fields) => {
        console.log('inside query');
        const jsonUsers = JSON.parse(JSON.stringify(users));


        let workbook = new excel.Workbook();
        let workSheet = workbook.addWorksheet('Employees');


        workSheet.columns = [
            { header: 'Id', key: 'id', width: 10 },
            { header: 'First Name', key: 'first_name', width: 30 },
            { header: 'Last Name', key: 'last_name', width: 30 },
            { header: 'Occupation', key: 'occupation', width: 30 },
            { header: 'DOB', key: 'dob', width: 30 },
            { header: 'Country', key: 'country', width: 30 },
            { header: 'Project Id', key: 'project_id', width: 30 },
        ];

        workSheet.addRows(jsonUsers);

        // console.log('cell value',workSheet.getCell('G2').dataValidation);
        workSheet.getCell('G2').dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: ['"One,Two,Three,Four"'],
            errorStyle: 'error',
            errorTitle: 'Five',
            error: 'invalid data'
        }

        if(workSheet.getCell('G2').dataValidation.error === false){
            console.log("Data successfully validated");
            workSheet.getCell('G2').value = 'Invalid Data';
        } else {
            console.log("Invalid Data");
            
        }

        console.log('cell value',workSheet.getCell('G2').value);


        // workSheet.getColumnKey("first_name").eachCell({ includeEmpty: true }, function (cell, rowNumber) {
        //     // console.log('----------------', cell);
        //     cell.dataValidation = {
        //         type: 'date',
        //         allowBlank: true,
        //         formulae: [new Date(2016, 0, 1)],
        //         showErrorMessage: true,
        //         errorStyle: 'error',
        //         error: 'must be date'
        //     };
        // });

        workbook.xlsx.writeFile('employees.xlsx').then(() =>
            console.log('file is saved properly'),
            (err) =>
                console.log(err));

        conn.end((err) => {
            if (err) {
                return console.log('error:' + err.message);
            }
            console.log('Close the database connection.');
        });
    });
});