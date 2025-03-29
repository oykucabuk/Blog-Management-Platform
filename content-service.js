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
function getCategoryNameById(categoryId) {
    const category = categories.find(cat => cat.id == categoryId);
    return category ? category.name : "Unknown";
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

function getAllArticles() {
    return new Promise((resolve, reject) => {
        if (articles.length > 0) {
            const articlesWithCategory = articles.map(article => ({
                ...article,
                categoryName: getCategoryNameById(article.category) 
            }));
            resolve(articlesWithCategory);
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

function addArticle(articleData){
    return new Promise((resolve, reject) => {
        articleData.published = articleData.published ? true : false;
        articleData.id = articles.length + 1;
        articles.push(articleData);
        resolve(articleData);
    });
};


function getArticlesByCategory(categoryId) {
    return new Promise((resolve, reject) => {
        const filteredArticles = articles
            .filter(article => article.category == categoryId)
            .map(article => ({
                ...article,
                categoryName: getCategoryNameById(article.category) 
            }));
        
        if (filteredArticles.length > 0) resolve(filteredArticles);
        else reject("no results returned");
    });
}

function getArticlesByMinDate(minDateStr) {
    return new Promise((resolve, reject) => {
        const minDate = new Date(minDateStr);
        const filteredArticles = articles.filter(article => new Date(article.articleDate) >= minDate);
        if (filteredArticles.length > 0) resolve(filteredArticles);
        else reject("no results returned");
    });
};

function getArticleById(id) {
    return new Promise((resolve, reject) => {
        const foundArticle = articles.find(article => article.id == id);
        if (foundArticle) {
            const articleWithCategory = {
                ...foundArticle,
                categoryName: getCategoryNameById(foundArticle.category)
            };
            resolve(articleWithCategory);
        } else {
            reject("no result returned");
        }
    });
}


module.exports = {
    initialize,
    getPublishedArticles,
    getAllArticles,
    getCategories,
    addArticle,
    getArticlesByCategory,
    getArticlesByMinDate,
    getArticleById,
    getCategoryNameById
};