//remove_all_account_profiles.js
let ids = document.querySelectorAll("#tags-list > tbody > tr > td:nth-child(5) > a:nth-child(2)");
ids.forEach(id=>{fetch("https://manager.trial.lsk.lightspeed.app/configuration/disableTag/357745005953514").then(res=>/**/console.log(res))});