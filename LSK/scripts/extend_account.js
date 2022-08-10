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
	"body": `blId=${BLid}&expirationDate=date.struct&expirationDate_day=${day||28}&expirationDate_month=${month||5}&expirationDate_year=${year}`,
	"method": "POST",
	"mode": "cors",
	"credentials": "include"
	})
	.then(res => /**/console.log('extended:', res))
	.catch(e=> /**/console.log('error extending:', e))
}