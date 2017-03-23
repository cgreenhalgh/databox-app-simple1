var databox = require('node-databox');

databox.catalog.listAvailableStores().then((stores) => console.log(stores));

databox.catalog.walkStoreCatalogs().then((stores) => console.log(JSON.stringify(stores, null, '\t'))).catch((err) => console.error(err));

databox.catalog.mapStoreCatalogs((cat, i) => {
	console.log('Store ' + i + ':', JSON.stringify(cat, null, '\t'));
}).catch((err) => console.error(err));

/*
var notifications = databox.notifications.connect(href)

notifications.on('open', () => {
	//console.log('Store notificaitons connection open');
});

notificaitons.on('data', function (storeHostname, dataSourceID, data) {
	//console.log(storeHostname, dataSourceID, data);
});
*/
