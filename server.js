const https = require('https');
const url = require('url');

const express = require('express');
const bodyParser = require('body-parser');
//const WebSocket = require('ws');
const databox = require('node-databox');

const DATASOURCE_loadavg1 = JSON.parse(process.env.DATASOURCE_loadavg1 || '{}');
var loadavg1_ENDPOINT = DATASOURCE_loadavg1.href || '';

console.log('datasource: '+loadavg1_ENDPOINT);

// for API & UI web server
const PORT = process.env.PORT || 8080;

const HTTPS_SERVER_CERT = process.env.HTTPS_SERVER_CERT || '';
const HTTPS_SERVER_PRIVATE_KEY = process.env.HTTPS_SERVER_PRIVATE_KEY || '';
const credentials = {
	key:  HTTPS_SERVER_PRIVATE_KEY,
	cert: HTTPS_SERVER_CERT,
};

const app = express();

app.get('/status', function(req, res){
	res.send('active');
});

app.get('/ui', function(req, res){
	// this is stupid!
	var endpointUrl = url.parse(loadavg1_ENDPOINT);
	var dsUrl = endpointUrl.protocol + '//' + endpointUrl.host;
	var dsName = endpointUrl.path.replace('/','');
	// how do i know it is a time-series?
	databox.timeseries.latest(dsUrl, dsName)
	.then((data)=>{
        console.log('Got data '+JSON.stringify(data));
        if (data.length>0) {
        	res.send('loadavg1 = '+data[0].data);
        }
        else {
        	res.send('No data');
        }
    })
    .catch((err)=>{
        console.log("[Error getting timeseries.latest]",dsUrl, dsID);
        res.send('Error getting data');
    });
});

//start the express server
https.createServer(credentials, app).listen(PORT);
