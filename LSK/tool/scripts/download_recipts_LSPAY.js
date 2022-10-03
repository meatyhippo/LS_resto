(()=>{
	let i=1;
window.csv = "";
function getreceipt(i){
	let account = "A761460."+i;
	$.ajax({
		type: "GET",
		url: "https://manager.lsk.lightspeed.app/receipt/loadReceipt?id="+account,
		dataType: "html",
		success: function (res) {
			try{
				let receipthtml = $(res).find('pre.receipt-preview')[0];
				let aid = receipthtml.innerText.split('AID:')[1].split('\n')[0].trim()?receipthtml.innerText.split('AID:')[1].split('\n')[0].trim():'';
				let paymeth = receipthtml.innerText.split('Betalingsmethode:')[1].split('\n')[0].trim()?receipthtml.innerText.split('Betalingsmethode:')[1].split('\n')[0].trim():'';
				console.log(account, aid, paymeth);
				csv += account+";"+aid+";"+paymeth+"\n\r";
			}catch(e){
				console.log(account);
				//console.log(e);
			};
		}
	});
}
function DL_(){
	var blob = new Blob([csv]);
	var file = document.createElement('a');
	file.href = window.URL.createObjectURL(blob, {encoding:"UTF-8",type:"text/plain;charset=UTF-8"}),
	file.download = 'receipts_export.csv',
	file.click();
}

let loop = window.setInterval(() => {
	if (i<=5026){
		getreceipt(i);
		i++;
	} else {
		window.clearInterval(loop);
		//DL_();
	}
}, 500);
})();