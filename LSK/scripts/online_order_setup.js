function account_profiles(selected_channels, include_items){
	// add account profiles
	let i=0;
	let loop = window.setInterval(() => {
		if (i<deliverect_profiles.length){
			add_profile(deliverect_profiles[i]);
			/**/console.log(i);
			i++;
		} else window.clearInterval(loop);
	}, 1000);

	async function add_profile(profile){
		await fetch(location.origin+"/configuration/saveTag", {
			"headers": {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"content-type": "application/x-www-form-urlencoded",
			},
			"body": "id="+
			"&name="+profile.name+
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
	}
}account_profiles();