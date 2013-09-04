var casper = require('casper').create();
var x = require('casper').selectXPath;
var fs = require('fs');
var utils = require('utils');

function getLinks() {
    var links = document.querySelectorAll('a[title="email"]');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}

casper.start('http://www.lineapelle-fair.it/en/catalogo_lineapelle.php', function() {
      this.echo(this.getTitle()); 

      casper.then(function() {
      this.echo(this.getTitle()); 

});
});







casper.run();