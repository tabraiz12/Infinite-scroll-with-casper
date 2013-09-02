var links = [];
var authour = [];
var casper1 = require('casper').create();
var casper = require('casper').create();
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
    var links = document.querySelectorAll('a.firstCredit');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}


casper.start('http://pinterest.com/search/pins/?q=book', function() {
    // search for 'casperjs' from google form
     // this.fill('form[action="/search/"]', { q: 'book' }, true);
});

casper.on('remote.message', function(msg) {
// authour.push(msg);
});

casper.thenEvaluate(function() {
    window.x = 0;
    var intervalID = setInterval(function() {
       console.log("Using setInternal " + window.x);
       if (++window.x === 3) {
           window.clearInterval(intervalID);

       }
    }, 20);
});

casper.each(list, function(self, i) {
    self.wait(20, function() {
        last = i;
        this.page.scrollPosition = { top: this.page.scrollPosition["top"] + 10000, left: 0 };

    });
});

casper.waitFor(function() {
    return last === list[list.length - 1] && 3 === this.getGlobal('x');
}, function() {
    this.echo('All done.')
});

casper.then(function() {
    // aggregate results for the 'casperjs' search
    // this.fill('form[action="/search/"]', { q: 'pen' }, true);

    links = this.evaluate(getLinks);
});

casper.then(function() {
    // aggregate results for the 'phantomjs' search
    links = links.concat(this.evaluate(getLinks));
});


casper.then(function() {
    // aggregate results for the 'phantomjs' search
    this.echo(links.length);
    casper.each(links.slice(0,4)    , function(self, i) {


            casper.thenOpen('http://pinterest.com/'+i, function() {
             var x = this.getTitle().split(' ');
             // names = names.push(x[2]);
            });
           

});
    fs.write('outfile.txt','Write this', 'w');
});
casper.run();
