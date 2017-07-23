var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var csrArr = [];


//make an HTTP request for the page to be scraped
request('http://www.dhl.co.in/en/about_us/responsibility/csr_in_india.html', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);

        //find all div elements with richtext class and fetch the csr text
        $('div.richtext').each(function (i, element) {
            var a = $(this).text();
            var csrActivity = {
                id: i,
                activity: a
            }
            //push the csr activity to the csr activities array
            csrArr.push(csrActivity);

        });
    }

    //write the csr activites to the local json file
    fs.writeFile('./csr.json', JSON.stringify(csrArr), 'utf-8', function (err) {
        if (err) throw err

    })
});

