const express = require('express');
const app = express();
const port = 3000;
const connection = require('./conf');

app.get('/admins', (request, res) => {
    connection.query('SELECT * from admin', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des admins');
          } else {
            res.json(results);
          }
      });
});
app.get('/company', (request, res) => {
    connection.query('SELECT company from admin', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des admins');
          } else {
            res.json(results);
          }
      });
});
app.get('/camping', (request, res) => {
    connection.query('SELECT company,lastname,firstname,photo,LENGTH(company) AS lenght_company from admin WHERE company LIKE 'ca%' AND LENGTH(company)>10', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des admins');
          } else {
            res.json(results);
          }
      });
});
app.get('/companyasc', (request, res) => {
  connection.query('SELECT company, firstname, lastname from admin order by lastname asc', (err, results) => {
      if (err) {
          res.status(500).send('Erreur lors de la récupération des admins');
        } else {
          res.json(results);
        }
    });
});
app.post('/admin', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO admin SET ?', formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'un admin");
    } else {
      res.sendStatus(200);
    }
  })
});
app.put('/api/admin/:id', (req, res) => {
  const idAdmin = req.body.id;
  const formData = req.body;
  connection.query('UPDATE admin SET ? WHERE id = ?', [formData, idAdmin], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la modification d'un admin");
    } else {
      res.sendStatus(200);
    }
  });
});
app.put('/api/admin/:id', (req, res) => {
  const idAdmin = req.body.id;
  const formData = req.body;
  connection.query('UPDATE admin SET is_active=1 WHERE is_active=0', [formData, idAdmin], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la modification d'un admin");
    } else {
      res.sendStatus(200);
    }
  });
});


app.delete('/api/admins/:id', (req, res) => {
  const idAdmin = req.params.id;
  connection.query('DELETE FROM admin WHERE id = ?', [idAdmin], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un admin");
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete('/api/admins/:id', (req, res) => {
  const idAdmin = req.params.id;
  connection.query('DELETE FROM admin WHERE is_active = 0', [idAdmin], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un admin");
    } else {
      res.sendStatus(200);
    }
  });
});


app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});
