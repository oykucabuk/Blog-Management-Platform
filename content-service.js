// Name: Oyku Cabuk
// Student number: 149790230
// Email: ocabuk@myseneca.ca
// Date Created: 17 feb 2025
// Date last modified: 17 feb 2025

const fs = require("fs");
const path = require("path");


let articles = [];
let categories = [];


function initialize() {
    return new Promise((resolve,reject) => {

        const articlesPath = path.join(__dirname, 'data', 'articles.json');
        const categoriesPath = path.join(__dirname, 'data', 'categories.json');

    fs.readFile(articlesPath, 'utf8', (err, articlesData) => {
      if (err) {
        reject("unable to read articles.json");
        return;
      }
      articles = JSON.parse(articlesData);  
      console.log('Articles:', articles);

      fs.readFile(categoriesPath, 'utf8', (err, categoriesData) => {
        if (err) {
          reject("unable to read categories.json");
          return;
        }
        categories = JSON.parse(categoriesData);  
        console.log('Categories:', categories);

        resolve('Both articles and categories have been successfully read.');
    });
    });
  });
}

function getPublishedArticles(){
    return new Promise((resolve, reject) => {
        const publishedArticles = articles.filter(article => article.published === true);
        if (publishedArticles.length > 0) {
            resolve(publishedArticles);
        } else {
            reject("No published articles found");
        }
    });
}

function getAllArticles(){
    return new Promise((resolve, reject) => {
        if (articles.length > 0) {
            resolve(articles);
        } else {
            reject("No articles found");
        }
    });
}

function getCategories() {
    return new Promise((resolve, reject) => {
        if (categories.length > 0) {
             resolve(categories);
         } else {
             reject("No categories found");
        }
        });
}

module.exports = {
    initialize,
    getPublishedArticles,
    getAllArticles,
    getCategories
};