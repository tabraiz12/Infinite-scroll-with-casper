var links = [];
var casper1 = require('casper').create();
var last,names;
var list = range(1, 1);
var fs = require('fs');
var utils = require('utils');

function range(start, count) {
    if(arguments.length == 1) {
        count = start;
        start = 0;
    }

    var foo = [];
    for (var i = 0; i < count; i++) {
        foo.push(start + i);
    }
    return foo;
}

function getLinks() {
    var links = document.querySelectorAll('a.dr-profile-link');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}


casper.start('http://www.cfainstitute.org/community/membership/directory/pages/results.aspx', function() {
    // search for 'casperjs' from google form
     // this.fill('form[action="/search/"]', { q: 'book' }, true);
});

casper.on('remote.message', function(msg) {
// authour.push(msg);
});
    


casper.each(list, function(self, i) {
    self.wait(3, function() {
        last = i;
        this.page.scrollPosition = { top: this.page.scrollPosition["top"] + 10000, left: 0 };

    });
});


casper.then(function() {
    // aggregate results for the 'casperjs' search
    // this.fill('formQ[action="/search/"]', { q: 'pen' }, true);

    links = this.evaluate(getLinks);
});

casper.then(function() {
    // aggregate results for the 'phantomjs' search
    links = links.concat(this.evaluate(getLinks));
});


casper.then(function() {
    // aggregate results for the 'phantomjs' search
    this.echo(links.length);
    this.echo(links);
    links = links.filter(function (e, i, links) {
    return links.lastIndexOf(e) === i;
    });
    fs.write("myfile.csv","name|address|awarded|postal|email\n ",'w');
    casper.each(links, function(self, i) {
            casper.thenOpen('http://www.cfainstitute.org/community/membership/directory/pages/results.aspx'+i, function() {
            var name = this.evaluate(function() {
                return document.querySelector('h3.fn').textContent;
            });
            var address = this.evaluate(function() {
                return document.querySelector('.adr').textContent;
            });
            var awarded = this.evaluate(function() {
                return document.querySelector('.vcard span strong').textContent;
            });
            var postal = this.evaluate(function() {
                return document.querySelector('span.postal-code').textContent;
            });
            var email = this.evaluate(function() {
                return document.querySelector('span.email').textContent;
            });
            if(name!=="")
            {var data = name + "|" + String(address) + "|" + String(awarded) + "|" + String(postal) + "|" + String(email) + "\n "
            fs.write("myfile.csv",data,'a');
            }
            });
           
           

});
  
});
casper.run();
