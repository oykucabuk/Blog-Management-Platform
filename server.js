// Name: Oyku Cabuk
// Student number: 149790230
// Email: ocabuk@myseneca.ca
// Date Created: 17 feb 2025
// Date last modified: 17 feb 2025

const express = require('express'); // "require" the Express module

const path = require('path');

const app = express(); // obtain the "app" object

const contentService = require('./content-service');


const HTTP_PORT = process.env.PORT || 1010; // assign a port

app.use(express.static('public'));

contentService.initialize()
  .then(() => {
      app.listen(HTTP_PORT, () => { console.log(`Express server listening on: ${HTTP_PORT}`);});
  })
  .catch((err) => {
      console.error('Initialization failed:', err);
  });

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/views/index.html'));
//   });

  app.get('/', (req, res) => {
    res.redirect('/about');
  });

  app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/about.html'));
  });

  
  app.get("/articles", (req, res) => {
    contentService.getAllArticles()
        .then(articles => res.json(articles))
        .catch(err => res.json({ message: err }));
});

app.get("/categories", (req, res) => {
  contentService.getCategories()
  .then(categories => res.json(categories))
  .catch(err => res.json({ message: err }));
});


// start the server on the port and output a confirmation to the console
//app.listen(HTTP_PORT, () => console.log(`Express server listening on: ${HTTP_PORT}`));

