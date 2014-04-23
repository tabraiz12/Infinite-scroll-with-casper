var casper = require('casper').create();
var fs = require('fs');
var utils = require('utils');
var x = require('casper').selectXPath;


casper.start('http://legacy.intracen.org/dbms/leather/Contact_EK.Asp?DS=LT&CG=G31&CD=356&PD=&PG=1&ID=19462', function() {
      fs.write("intracen_india.csv","name|email|country|products"+'\n','a');

      for(i=0;i<=1000;i++){
	      casper.then(function() {
			    this.clickLabel('next record', 'a');
			});

	      casper.then(function() {
	      	var k = this.evaluate(function() {
	                var temp = document.querySelector('#print_part > div > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(3) > font').textContent;
	            	return temp.replace("&nbsp;&nbsp;","|").replace("<br>","").replace(/\s+/g, ' ');
	            });

	      	var l = this.evaluate(function() {
	                var temp = document.querySelector('#print_part > div > table:nth-child(2) > tbody > tr:nth-child(4) > td:nth-child(3) > font ').textContent;
	            	
	            	temp = temp.replace("&nbsp;&nbsp;","|").replace("<br>","").replace(/\s+/g, ' ');
	            	return temp.split(' ')[1];
	            });

  		    var m = this.evaluate(function() {
        		    var temp = document.querySelector('#print_part > div > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(3) > font').textContent;
      	 			return temp.replace("&nbsp;&nbsp;","|").replace("<br>","").replace(/\s+/g, ' ');
       			 });

	      	var n = this.evaluate(function() {
	                var temp = document.querySelector('#print_part > div > table:nth-child(2) > tbody > tr:nth-child(6) > td:nth-child(3) > font').textContent;
	            	return temp.replace("&nbsp;&nbsp;","|").replace("<br>","").replace(/\s+/g, ' ');
	            });

	      	var data = k + '|' + l +'|' + m +'|' + n + '\n';

			fs.write("intracen_india.csv",data,'a');

	  		});

      }


      


});







casper.run();