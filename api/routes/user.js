var express = require('express');
var router = express.Router();
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var sql = require('mssql');

const config = {
  user: 'sklepinternetowy',
  password: '$Prus3210',
  server: 'sqltester2018.wwsi.edu.pl',
  database: 'BD2019SklepInternetowy',
}

// var config = {  
//   server: 'sqltester2018.wwsi.edu.pl',
//   authentication: {
//       type: 'default',
//       options: {
//           userName: 'sklepinternetowy',
//           password: '$Prus3210'
//       }
//   },
//   options: {
//       encrypt: true,
//       rowCollectionOnRequestCompletion: true,
//       database: 'BD2019SklepInternetowy'
//   }
// };  

router.post('/', function(req, res, next) {
    console.log(req.body);
  
  sql.connect(config, function (err) {
    
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
       
    // query to the database and get the records
    request.input('client', sql.Int, req.body.client)
    request.query("select * from Orders JOIN Users as U on Orders.id_user = U.id_user WHERE U.id_user = @client", function (err, recordset) {
        
        if (err) console.log(err)
        // send records as a response
        console.log(recordset);
        res.send(recordset.recordsets[0]);
        
    });
  });
});


module.exports = router;

