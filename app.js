//var http = require("http");
const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');

app.use(morgan('short'));

app.get('/user',(req, res) => {
  console.log('fetching users')

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'newroot',
    database: 'test'
  });

  connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
   
    console.log('Connected to the MySQL server.');
  });

  connection.query('select * from users;',(err, rows, fields) => {
    if(err)
    {
      console.log("Failed to query"+ err)//throw error
      return
    }
    
    console.log('I think we have fetched successfully')

    const users = rows.map((row) =>{
      return{UserId: row.user_id, Name: row.name, Email: row.email}
    });
    
    res.json(rows)
  });
 // res.end()

});

app.get('/', (req, res)=>{
  console.log("REsponding to root route")
  res.send('hello ')
});



//localhost:3003
app.listen(3003, () =>{
  console.log("Server is up and listening on 3003...")
});

