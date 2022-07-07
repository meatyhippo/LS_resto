fetch("https://manager.trial.lsk.lightspeed.app/admin/setExpirationDate", {
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
  "referrer": "https://manager.trial.lsk.lightspeed.app/admin/businessLocationDetails?blId=183455233081346",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "blId=183455233081346&expirationDate=date.struct&expirationDate_day=20&expirationDate_month=2&expirationDate_year=2030",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});