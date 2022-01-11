var sqlite3 = require('sqlite3').verbose()


const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstname text,
            lastname text, 
            email text UNIQUE, 
            image text, 
            phone text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO user (firstname,lastname, email, image,phone) VALUES (?,?,?,?,?)'
                db.run(insert, ["admin","lname","admi11n@example.com","test.jpg","111-111-1111"])
                db.run(insert, ["admin111111","lname1111111","admin@example.com","test.jpg","111-111-1111"])
            }
        });  
    }
});


module.exports = db
