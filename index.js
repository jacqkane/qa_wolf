// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const { createObjectCsvWriter } = require('csv-writer');
const fs = require("fs");

async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com");

 
  const articles = await page.$$eval("tr.athing", (rows) => {
    return rows.slice(0, 10).map((row) => {
      const titleElement = row.querySelector("td.title > .titleline > a");
      return {
        title: titleElement ? titleElement.innerText.trim() : "",
        url: titleElement ? titleElement.href : "",
      };
    });
  });

  
  console.log(articles);

  await browser.close();

  
  const csvWriter = createObjectCsvWriter({
    path: 'top_articles.csv',
    header: [
      {id: 'title', title: 'Title'},
      {id: 'url', title: 'URL'}
    ]
  });

  
  await csvWriter.writeRecords(articles);

}

(async () => {
  await saveHackerNewsArticles();
})();