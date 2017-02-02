var express =  require('express');
var app =  express();
var unirest = require('unirest');
var Cloudant = require('cloudant');
var me = '129d0ca5-862b-45d1-8aa0-6dbfdd40d84c-bluemix'; // Set this to your own account
var password = 'd2cc26021357b1729a548d46e3187ad4d1b583af26739da3b59f5f3af406395f';
var cloudant = Cloudant({account:me, password:password});
var db = cloudant.db.use("rfid");
var port =  process.env.PORT || 4000;

var arr={
'a':['18.0111258,83.521108','17.956184,83.418791','17.955530,83.420850','17.821573, 83.355619']
};
var timestamp1 = 1.00;
var timestamp2 = 1.30;

var dist;
var timetaken;
var avgspeed;

	function distance(lat1, lon1, lat2, lon2) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	 dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
    dist = dist * 1.609344 //for kms
	//resultsobj[i].differ = dist;
	console.log("distance"+dist);
	return dist;
}

function time(timestamp1,timestamp2){
	timetaken = timestamp2-timestamp1;
	console.log("time"+timetaken);
	return timetaken;
}



app.get('/rfid1',function(req,res){
	distance(arr.a[0].split(",")[0],arr.a[0].split(",")[1],arr.a[1].split(",")[0],arr.a[1].split(",")[1]);
	avgspeed = distance(arr.a[0].split(",")[0],arr.a[0].split(",")[1],arr.a[1].split(",")[0],arr.a[1].split(",")[1])/time(timestamp1,timestamp2);
	console.log("speed"+avgspeed);
});

app.listen(port,function(req,res){
	
	console.log('running on port'+port)
})