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

router.get('/:id', function(req, res, next) {
    console.log(req.params.id);
  
  sql.connect(config, function (err) {
    
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
       
    // query to the database and get the records
    request.input('order', sql.Int, req.params.id)
    request.query("Select p_name, p_desc, quantity, price From Orders AS O Join Order_Details AS OD ON O.id_order = OD.id_order Join Products AS P ON OD.id_product = P.id_product Where O.id_order = @order", function (err, recordset) {
        
        if (err) console.log(err)
        // send records as a response
        console.log(recordset);
        res.send(recordset.recordsets);
        
    });
  });
});


module.exports = router;

