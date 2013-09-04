var links = [];
var casper = require('casper').create();
var x = require('casper').selectXPath;
var last,names;
var links = ["A" ,  "B" ,  "C" ,  "Ç" ,  "D" ,  "E" ,  "F" ,  "G" ,  "H" ,  "I" ,  "İ" ,  "J" ,  "K" ,  "L" ,  "M" ,  "N" ,  "O" ,  "Ö" ,  "P" ,  "R" ,  "S" ,  "Ş" ,  "T" ,  "U" ,  "Ü" ,  "V" ,  "Y" ,  "Z" ];
var temp = ["A"]
var fs = require('fs');
var utils = require('utils');
var linkall = []
var all = []

function getLinks() {
    var links = document.querySelectorAll('.right li a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}




casper.start();

casper.each(links, function(self, i) {
            
            casper.thenOpen('http://www.turkishleatherbrands.com/company_search.php?s=letter&q='+i, function() {
            links = this.evaluate(getLinks);
            // links = links.concat(this.evaluate(getlinks));
            linkall.push(links);
            this.echo(linkall.length)
        });
});
// casper.start('http://www.cfainstitute.org/community/membership/directory/pages/results.aspx', function() {
//     // search for 'casperjs' from google form
//      // this.fill('form[action="/search/"]', { q: 'book' }, true);
// });
casper.then(function(){
      all =  Array.prototype.concat.apply([], linkall);
      fs.write("s.csv","mo|email |website| phone1 |phone2",'a');
      casper.each(all, function(self, i) {
             casper.thenOpen('http://www.turkishleatherbrands.com/'+i, function() {
                // var element = document.evaluate( '//*tr[5]/td[4]' ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
                var k = this.getHTML('table tr:nth-child(4) td:nth-child(4)').replace("&nbsp;&nbsp;","|").replace("<br>","").replace(/\s+/g, ' ');
                var l = this.getHTML('table tr td:nth-child(4)').replace("&nbsp;&nbsp;","|").replace("<br>","").replace(/\s+/g, ' ');
                l =l.replace("&nbsp;&nbsp;","|");
                l =l.replace("&nbsp;",'');
                k =k.replace("&nbsp;&nbsp;","|");
                var data = k + '|' + l + '\n';
                // data = data.replace("<br>","|"); 
                

                fs.write("s.csv",data,'a');
            });
        });   

});


// casper.then(function() {
//     // aggregate results for the 'casperjs' search
//     // this.fill('formQ[action="/search/"]', { q: 'pen' }, true);

//     links = this.evaluate(getLinks);
//     this.echo(links);
// });

// casper.then(function() {
//     // aggregate results for the 'phantomjs' search
//     links = links.concat(this.evaluate(getLinks));
// });


// casper.then(function() {
//     // aggregate results for the 'phantomjs' search
//     this.echo(links.length);
//     this.echo(links);
//     links = links.filter(function (e, i, links) {
//     return links.lastIndexOf(e) === i;
//     });
//     fs.write("myfile.csv","name|address|awarded|postal|email\n ",'w');
//     casper.each(links, function(self, i) {
//             casper.thenOpen('http://www.cfainstitute.org/community/membership/directory/pages/results.aspx'+i, function() {
//             var name = this.evaluate(function() {
//                 return document.querySelector('h3.fn').textContent;
//             });
//             var address = this.evaluate(function() {
//                 return document.querySelector('.adr').textContent;
//             });
//             var awarded = this.evaluate(function() {
//                 return document.querySelector('.vcard span strong').textContent;
//             });
//             var postal = this.evaluate(function() {
//                 return document.querySelector('span.postal-code').textContent;
//             });
//             var email = this.evaluate(function() {
//                 return document.querySelector('span.email').textContent;
//             });
//             if(name!=="")
//             {var data = name + "|" + String(address) + "|" + String(awarded) + "|" + String(postal) + "|" + String(email) + "\n "
//             fs.write("myfile.csv",data,'a');
//             }
//             });
           
           

// });
  
// });
casper.run();
