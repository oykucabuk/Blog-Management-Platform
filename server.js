// Name: Oyku Cabuk
// Student number: 149790230
// Email: ocabuk@myseneca.ca
// Date Created: 17 feb 2025
// Date last modified: 10 march 2025

const express = require('express'); // "require" the Express module

const path = require('path');

const app = express(); // obtain the "app" object

const contentService = require('./content-service');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const HTTP_PORT = process.env.PORT || 1010; // assign a port

app.use(express.static('public'));


const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
    cloud_name: 'dd6gqlnxe',
    api_key: '589739393893539',
    api_secret: 'OM_5WZlxl4f-qdRT8adve8O2Ydw',
    secure: true
});

const upload = multer();

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
    res.render('about');
  });

  
//   app.get("/articles", (req, res) => {
//     contentService.getAllArticles()
//         .then(articles => res.json(articles))
//         .catch(err => res.json({ message: err }));
// });
// app.get("/articles", (req, res) => {
//   let { category, minDate } = req.query;

//   if (category) {
//       contentService.getArticlesByCategory(category)
//           .then(articles => res.json(articles))
//           .catch(err => res.status(404).json({ message: err }));
//   } else if (minDate) {
//       contentService.getArticlesByMinDate(minDate)
//           .then(articles => res.json(articles))
//           .catch(err => res.status(404).json({ message: err }));
//   } else {
//       contentService.getAllArticles()
//           .then(articles => res.json(articles))
//           .catch(err => res.status(404).json({ message: err }));
//   }
// });
app.get("/articles", (req, res) => {
    let { category, minDate } = req.query;
  
    const renderData = {
      title: "Articles",
      path: req.path,
      articles: [],
      errorMessage: null
    };
  
    if (category) {
      contentService.getArticlesByCategory(category)
        .then(articles => {
          renderData.articles = articles;
          res.render("articles", renderData);
        })
        .catch(err => {
          renderData.errorMessage = err;
          res.render("articles", renderData);
        });
  
    } else if (minDate) {
      contentService.getArticlesByMinDate(minDate)
        .then(articles => {
          renderData.articles = articles;
          res.render("articles", renderData);
        })
        .catch(err => {
          renderData.errorMessage = err;
          res.render("articles", renderData);
        });
  
    } else {
      contentService.getAllArticles()
        .then(articles => {
          renderData.articles = articles;
          res.render("articles", renderData);
        })
        .catch(err => {
          renderData.errorMessage = err;
          res.render("articles", renderData);
        });
    }
  });
app.get('/article/:id', (req, res) => {
  contentService.getArticleById(req.params.id)
      .then(article => res.json(article))
      .catch(err => res.status(404).json({ message: err }));
});

app.get("/categories", (req, res) => {
  contentService.getCategories()
  .then(categories => res.json(categories))
  .catch(err => res.json({ message: err }));
});

app.get('/articles/add', (req, res) => {
    res.render('addArticle');
});

app.post('/articles/add', upload.single("featureImage"), (req, res) => {
    if (req.file) {
        let streamUpload = (req) => { //upload the image to Cloudinary
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream( // create a Cloudinary upload stream
                    (error, result) => {
                        if (result) resolve(result);//resolve the promise with the result
                        else reject(error);// reject the promise if there is an error
                    }
                );
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        async function upload(req) { //its an async function to uploading the image and returning the uploaded URL
            let result = await streamUpload(req); // its waiting for the image upload to complete
            return result;
        }

        upload(req).then((uploaded) => { //function to call upload function
            processArticle(uploaded.url); //when its uploaded its call processArticle function to process and save it
        }).catch(err => res.status(500).json({ message: "Image upload failed", error: err }));
    } else {
        processArticle("");
    }

    function processArticle(imageUrl) { //its process the article data and save it
        req.body.featureImage = imageUrl;// Assign the image URL to the article
        
        contentService.addArticle(req.body) // Call addArticle function 
            .then(() => res.redirect('/articles')) //redirect to the articles page
            .catch(err => res.status(500).json({ message: "Article creation failed", error: err }));
    }
});


// start the server on the port and output a confirmation to the console
//app.listen(HTTP_PORT, () => console.log(`Express server listening on: ${HTTP_PORT}`));

