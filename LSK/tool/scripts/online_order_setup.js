async function add_profile(profile){
	profile.names.forEach((element, i) => {
		await fetch(location.origin+"/configuration/saveTag", {
			"headers": {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"content-type": "application/x-www-form-urlencoded",
			},
			"body": "id="+
			"&name="+profile.names+
			"&code="+profile.code+
			"&commitScriptUrl=&"+"_sticky="+
			"&_changeTaxOnExistingItems="+
			"&deliveryMode="+profile.deliveryMode+
			"&deliveryDelay=NOTUSED"+
			"&minDeliveryDelay=-1"+
			"&completionMode="+profile.completionMode+
			"&_consumerRequired="+
			"&_deliverySlipOnReceipt="+
			"&_printNoteOnCreation="+
			"&_forceNoPrintOnlineOrders="+
			"&_playSoundOnOnlineOrders="+
			"&signageDeviceIpAddress="+
			"&serviceChargeProductId="+
			"&serviceChargePercent=0"+
			"&schedules.0._days="+
			"&schedules.0.days="+
			"&schedules.0._days="+
			"&schedules.0._days="+
			"&schedules.0._days="+
			"&schedules.0._days="+
			"&schedules.0._days="+
			"&schedules.0._days="+
			"&schedules.0._days="+
			"&schedules.0.startTime=0"+
			"&schedules.0.endTime=0"+
			"&schedules.0._useWhenDirect="+
			"&schedules.0.useWhenDirect=true"+
			"&schedules.0._useWhenAccount="+
			"&schedules.0.useWhenAccount=true"+
			"&schedules.0._active="+
			"&schedules.0.active=true",
			"method": "POST"
		})
		.then(res=>console.log(res, profile))
		.catch(e=>console.log(e))
	});
}
async function add_pay(){
	await fetch(location.origin+ "URL",{

	}).then(res=>{console.log(res)})
	.catch(e=>console.log("error", e))
}
async function add_RTN(){
	await fetch(location.origin+ "URL",{

	}).then(res=>{console.log(res)})
	.catch(e=>console.log("error", e))
}
async function add_OPAPI(){
	await fetch(location.origin+"/integration/saveOnlineOrderingIntegration", {
		"headers": {
		  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
		  "content-type": "application/x-www-form-urlencoded"
		},
		"body": `integrator=API&orderStatusUrl=http%3A%2F%2Fape%2Fo%2Fcb%2Fikentoo%2Fapi%2Forder&menuId=357745005953065&paymentMethodId=357745005953036&staffId=52354&tagId=357745005953218&_nulldevicesToReceiveOrders%5B0%5D=&save=Opslaan`,
		"method": "POST"
	}).then(res=>{console.log(res)})
	.catch(e=>console.log("error", e))
}
async function add_EPAPI(){
	await fetch(location.origin+ "URL",{

	}).then(res=>{console.log(res)})
	.catch(e=>console.log("error", e))
}
async function add_USER(){
	await fetch(location.origin+ "URL",{

	}).then(res=>{console.log(res)})
	.catch(e=>console.log("error", e))
}
function deliverect(selected_channels, include_items){
	// add account profiles
	let i=0;
	let loop = window.setInterval(() => {
		if (i<deliverect_profiles.length){
			add_profile(deliverect_profiles[i]);
			/**/console.log(i);
			i++;
		} else window.clearInterval(loop);
	}, 1000);
}
function generic_setup(){
	let payment_method = "",
	user = "",
	account_profile = "";
	add_profile();
	add_pay();
	add_USER();
	add_RTN();
	add_OPAPI();
	add_EPAPI();
}