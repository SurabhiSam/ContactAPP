const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3
var db = require("./database.js")
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// // db operations
// var sqlite3 = require('sqlite3').verbose()
// var db = new sqlite3.Database('db.sqlite')

// db.serialize(function () {
//   db.run('CREATE TABLE contacts( [ContactId] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,[FirstName] NVARCHAR(160)  NOT NULL,[LastName]  NVARCHAR(160)  NOT NULL,[Email]  NVARCHAR(160)  NOT NULL, [Image]  NVARCHAR(160)  NOT NULL, [Phone]  NVARCHAR(160)  NOT NULL)')
 

//   var stmt = db.prepare('INSERT INTO contacts VALUES (?,?,?,?,?,?)')

//   for (var i = 1; i < 11; i++) {
//     stmt.run(i,'FName ' + i,'Lanme'+i,'email'+i,'Image'+i+'.jpg','222-222-212'+i)
//   }

//   stmt.finalize()
//   db.each('SELECT *  FROM contacts', function (err, row) {
//     // result.push(row);
//     console.log(row);
//   })

// })





// create a GET route
app.get('/api/contacts', (req, res,next) => { //Line 9
    var sql = "select * from contacts"
    result=[];
db.all(sql,result,(err,rows)=>{
    if(err){
        res.status(400).json({"error":err.message});
        return;
    }
    res.json({
        "message":"success",
        "data":rows
    })
})
    
 
}); //Line 11

app.post("/api/contacts/", (req, res, next) => {
    var errors=[]
    if (!req.body.fname){
        errors.push("No password specified");
    }
    if (!req.body.lname){
        errors.push("No email specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        name: req.body.name,
        email: req.body.email,
        password : md5(req.body.password)
    }
    var sql ='INSERT INTO user (name, email, password) VALUES (?,?,?)'
    var params =[data.name, data.email, data.password]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})
