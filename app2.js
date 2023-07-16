const express = require('express');
const morgan = require('morgan');
const sqlite3 = require('sqlite3').verbose();



const app2 = express();
const db = new sqlite3.Database('db.sqlite3');


app2.set('view engine', 'ejs');





db.run(`CREATE TABLE IF NOT EXISTS contact_contact (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT
  )`);



app2.use(express.urlencoded({ extended: true }));
  



app2.use(express.static('public'));
app2.use(morgan('dev'));


app2.get('/', (req, res) => {
    db.all('SELECT * FROM blog_post WHERE active = 1', (err, rows) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res.render('index', { posts: rows });
        }
      });
    });

app2.get('/about', (req, res) => {
    res.render('about');
});


app2.get('/contact-us', (req, res) => {
    res.render('form');
});
  
// Handle form submission
app2.post('/contact-us', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  // Insert form data into the SQLite database
  db.run(
    'INSERT INTO contact_contact (name, email, message) VALUES (?, ?, ?)',
    [name, email, message],
    function (err) {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.render('form'); // Redirect to a success page
      }
    }
  );
});
  





app2.use((req, res) => {
    res.status(404).render('404');
});


// Start the server
app2.listen(3000, () => {
  console.log('Server is running on port 3000');
});
  