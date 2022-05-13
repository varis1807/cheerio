// const request = require("request");
// const cheerio = require("cheerio");
// const fs = require("fs");
// const json2csv = require("json2csv").Parser;

// async function main() {
//   const result = await request.get(
//     "https://www.worldometers.info/coronavirus/"
//   );
//   const $ = cheerio.load(result);

//   const scrapedData = [];
//   const tableHeaders = [
//     "Country,Other",
//     "Total Cases",
//     "New Cases",
//     "Total Deaths",
//     "New Deaths",
//     "Total Recovered",
//     "Acive Cases",
//     "Serious, Critical",
//     "Total Cases/1M Population",
//     "Deaths/ 1M Population",
//     "Total Tests",
//     "Tests/1M Population",
//     "Continent",
//   ];
//   //Go to each tr and push each td of each tr into scrapedData.
//   $("tbody > tr").each((index, element) => {
//     const tds = $(element).find("td");
//     const tableRow = {};
//     $(tds).each((i, element) => {
//       //Added replace to remove unwanted character from text.
//       tableRow[tableHeaders[i]] = $(element).text().trim().replace("\n", "");
//     });
//     scrapedData.push(tableRow);
//   });
    // console.log(scrapedData);
//   const j2cp = new json2csv();
  //Convert JSON data in CSV.
//   const csv = j2cp.parse(scrapedData);
  //Write converted CSV data into data.csv file.
// //   fs.writeFileSync("./data.csv", csv);
// }

// main();

const puppeteer = require('puppeteer');

const scrap = async () =>{
    const browser = await puppeteer.launch({headless : false}); //browser initiate
    const page = await browser.newPage();  // opening a new blank page
    await page.goto('https://en.wikipedia.org/wiki/2019%E2%80%9320_coronavirus_pandemic_by_country_and_territory', {waitUntil : 'domcontentloaded'}) // navigate to url and wait until page loads completely

    const recordList = await page.$$eval('div#covid19-container table#thetable tbody tr',(trows)=>{
        let rowList = []    
        trows.forEach(row => {
                let record = {'country' : '','cases' :'', 'death' : '', 'recovered':''}
                record.country = row.querySelector('a').innerText; // (tr < th < a) anchor tag text contains country name
                const tdList = Array.from(row.querySelectorAll('td'), column => column.innerText); // getting textvalue of each column of a row and adding them to a list.
                record.cases = tdList[0];        
                record.death = tdList[1];       
                record.recovered = tdList[2];   
                if(tdList.length >= 3){         
                    rowList.push(record)
                }
            });
        return rowList;
    })
    console.log(recordList)
    await page.screenshot({ path: 'screenshots/wikipedia.png' }); //screenshot 
}
srap();