function extend_account(BLid, day, month, year){
	fetch(location.origin+"/admin/setExpirationDate", {
	"headers": {
		"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
		"accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
		"cache-control": "max-age=0",
		"content-type": "application/x-www-form-urlencoded",
		"sec-fetch-dest": "document",
		"sec-fetch-mode": "navigate",
		"sec-fetch-site": "same-origin",
		"sec-fetch-user": "?1",
		"sec-gpc": "1",
		"upgrade-insecure-requests": "1"
	},
	"body": `blId=${BLid}&expirationDate=date.struct&expirationDate_day=${day||28}&expirationDate_month=${month||5}&expirationDate_year=${year||2030}`,
	"method": "POST",
	"mode": "cors",
	"credentials": "include"
	})
	.then(res => /**/console.log('extended:', res),location.reload())
	.catch(e=> /**/console.log('error extending:', e))
}
function search(data){
	let fetchlist = [];
	let aData = {};
	data.forEach(s => {
		// fetch the data
		let x = fetch(location.origin+"/criteria/datatables", {
			"headers": {
				"accept": "application/json, text/javascript, */*; q=0.01",
				"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
				"x-requested-with": "XMLHttpRequest"
			},
			"referrer": "https://manager.trial.lsk.lightspeed.app/admin/locations",
			"body": `sEcho=1&iColumns=4&sColumns=4&iDisplayLength=25&mDataProp_0=${s.prop}&sSearch=&bRegex=false&sSearch_0=${s.sValue}&bRegex_0=false&bSearchable_0=true&viewName=${s.viewName}&viewFormat=jQueryTable&blScoped=true&_arg_businessId=`,
			"method": "POST",
			"mode": "cors",
			"credentials": "include"
		});
		fetchlist.push(x);
	});
	Promise.all(fetchlist).then(res=>{
		let jsonlist = [];
		res.forEach(r=>{
			let j = r.json();
			jsonlist.push(j);
		});
		Promise.all(jsonlist).then(jsons=>{
			jsons.forEach(json=>{
				console.log(json.aaData);
				json.aaData.forEach(d=>{
					aData[d.id] = d;
				});
			});
			console.log('totaldata results:', Object.keys(aData).length, aData);
			addtabledata(data[0].viewName, aData);
		});
	})
}
/** 
search([{
	'prop': 'emailAddress',
	'viewName': 'Staff.backofficeUsers',
	'sValue':'cassia@ikentoo.com'
}])
search([{
	'prop': 'id',
	'viewName': 'BusinessLocation.list',
	'sValue': '25769803788'
}])
*/
function userdata(){
	fetch(location.origin+"/criteria/ajax", {
		"headers": {
			"accept": "application/json, text/javascript, */*; q=0.01",
			"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
			"x-requested-with": "XMLHttpRequest"
		},
		"body": `_filter_staffId=%3D%3D${staff_id}&view=Staff.backofficeUserBusinessLocations&max=1000&offset=0&maxRows=20000&viewFormat=jQueryTable&blScoped=true`,
		"method": "POST",
		"mode": "cors",
		"credentials": "include"
	}).then(res=>{
		res.json().then(json=>{
			console.log(json.rows);
		})
	})
}