/*import sql from 'mssql';

var config = {
    database: 'users',
    server: 'DESKTOP-TREHFS8\\SQLEXPRESS', // Use the IP address of your SQL Server instance
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
}

sql.connect(config, function (err) {
    if (err) {
        console.log("Error connecting to the database:", err);
        return;
    }
    var request = new sql.Request();
    request.query('select * from usertable', function (err, recordSet) {
        if (err) {
            console.log("Error executing query:", err);
            sql.close(); 
            return;
        } else {
            console.log("Query executed successfully. Result:", recordSet);
            sql.close();
        }
    });
});*/

import sql from "msnodesqlv8";

const connectionString = "server=.; database=; Trusted_Connection=Yes; Driver={SQL Server Native Client 11.0}";
const query = "SELECT from userstable";

sql.query(connectionString, query, (err, rows) => {
    console.log(rows);
})


