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
function search(value,subject){
	// switch based on subject to pass into query
	switch (subject) {
		case 'location':
			viewName = 'BusinessLocation.list';
			prop = 'id';
			sValue = value;
			break;
		case 'user':
			viewName = 'Staff.backofficeUsers';
			prop = 'emailAddress';
			sValue = value;
			break;
		default:
			break;
	}
	// fetch the data
	fetch("https://manager.trial.lsk.lightspeed.app/criteria/datatables", {
		"headers": {
			"accept": "application/json, text/javascript, */*; q=0.01",
			"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
			"x-requested-with": "XMLHttpRequest"
		},
		"referrer": "https://manager.trial.lsk.lightspeed.app/admin/locations",
		"body": `sEcho=1&iColumns=4&sColumns=4&mDataProp_0=${prop||''}&sSearch=&bRegex=false&sSearch_0=${sValue||''}&bRegex_0=false&bSearchable_0=true&viewName=${viewName}&viewFormat=jQueryTable&blScoped=true&_arg_businessId=`,
		"method": "POST",
		"mode": "cors",
		"credentials": "include"
	}).then(res=>{
		res.json().then(json =>console.log(json.aaData[0]))
	})
} //search('cassia@ikentoo.com','user')