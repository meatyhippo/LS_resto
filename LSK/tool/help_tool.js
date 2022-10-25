(()=>{
	//global variables
	let current_BL = "";
	location.pathname.includes('/businessLocationDetails')?current_BL = location.search.match(/\d+/gm)[0] : current_BL = "000000000000000";

	if ($("#overlay-box").length>0) console.log("removed"), htmlnode.remove(), stylenode.remove();

	// paint the UI
	function paint_box(){
		stylenode = document.createElement('style'),
		htmlnode = document.createElement('div');
		htmlnode.id = "overlay-box"
		stylenode.innerHTML = `
		#overlay-box{
			height: 100%;
			width: 100%;
			top: 0;
			left: 0;
			z-index: 9999999;
			display: block;
			position: fixed;
			float: left;
			/* opacity: 0.7; */
		}
		#close-box{
			height: 100%;
			width: 70%;
			top: 0;
			left: 0;
			z-index: 99999999;
			float: left;
		}
		#ui-box{
			background-color: rgba(0,0,0,.8)!important;
			color: white;
			height: 100%;
			width: 30%;
			top: 0;
			right: 0;
			float: right;
			z-index: 99999999;
		}
		#ui-box > div {
			padding: 10px 20px;
		}
		#ui-box label, #ui-box input, #ui-box label:focus, #ui-box input:focus {
			width: 45%;
			margin-bottom: 5px;
		}
		#ui-box label {
			float: left;
			margin-right: 2%;
		}
		#ui-box input {
			/*float: right;*/
		}

		`;
		htmlnode.innerHTML = `
		<div id="close-box">
		</div>
		<div id="ui-box">
			<div class="" style="">
				<div id="extend_account">
				</div>
				<div id="online_order">
				</div>
				<div id="deliverect"></div>
			</div>
		</div>`;
		document.body.append(htmlnode, stylenode);
	}
	
	//promise to only add functions after above box is created
	let createbox = new Promise((resolve, reject)=>{
		resolve(paint_box());
	});
	createbox.then((fullfilled)=>{
		/**/console.log($('#ui-box'));
		$('#ui-box').click((e)=>{ 
			e.preventDefault();
			return;
		});
		$('#close-box').click((e)=>{
			htmlnode.remove();
			stylenode.remove();
			/**/console.log("removed",htmlnode, stylenode);
		});
		if (location.pathname.includes('/admin')){
			// functions to add if on admin page
			/**/console.log("admin");
			addfunc('extend_account');
		}else{
			// functions to add if in account
			/**/console.log("account");
			addfunc('online_order');
			addfunc('deliverect');
		}
	}).catch((e)=>{/**/console.log(e);});

	//functions to add title and content
	function addparagraph(location, text){
		$(location).append(`<p>${text}</p>`);
	}
	
	//get extend account function
	$.get("https://meatyhippo.github.io/LS_resto/LSK/tool/scripts/extend_account.js",(data)=>{/**/console.log('extend account function loaded:', '\n', data)});
	//get online order function
	$.get("https://meatyhippo.github.io/LS_resto/LSK/tool/scripts/online_order_setup.js",(data)=>{/**/console.log('online order function loaded:', '\n', data)});
	//get deliverect function
	$.get("https://meatyhippo.github.io/LS_resto/LSK/tool/scripts/account_profiles.js",
	function (data) {
		console.log(title+'function loaded:', '\n', data);
	})//get account profiles JSON
	.get("https://meatyhippo.github.io/LS_resto/LSK/tool/scripts/online_order_setup.js",
	(data)=>{
		/**/console.log(data);
		selectionlist = document.createElement('form');

	})

	// main function to add lines to the UI
	function addfunc(title){
		switch (title) {
			case 'extend_account':
				addparagraph('#extend_account', `<b>Extend account</b><br>Fill in specific date or leave empty for extend until 2030`);

				//set input fields
				let fields = {"blID":{"element":"input","attributes":{"placeholder":current_BL,"id":"blID"},"label":{"for":"blID","html":"Business location"}},"date":{"element":"input","attributes":{"placeholder":"28","id":"date"},"label":{"for":"date","html":"Day"}},"month":{"element":"input","attributes":{"placeholder":"05","id":"month"},"label":{"for":"month","html":"Month"}},"year":{"element":"input","attributes":{"placeholder":"2030","id":"year"},"label":{"for":"year","html":"Year"}},"button":{"element":"button","attributes":{"id": "submit_extend","class":"btn"}}}
				extend = document.createElement('form');
				for (const key in fields) {
					if (Object.hasOwnProperty.call(fields, key)) {
						const field = fields[key];
						div = document.createElement('div');
						element = document.createElement(field.element);
						$(element).attr(field.attributes);
						if (field.label){
							label = document.createElement('label');
							$(label).attr('for', field.label.for).html(field.label.html)
							div.append(label);
						}
						div.append(element);
						extend.append(div);
					}
				}
				//paint div to ui box
				document.getElementById(title).append(extend);
				$('#submit_extend').click(()=>{
					try {						
						extend_account($('#blID')[0].value?$('#blID')[0].value:$('#blID')[0].placeholder, $('#date')[0].value?$('#date')[0].value:$('#date')[0].placeholder, $('#month')[0].value?$('#month')[0].value:$('#month')[0].placeholder, $('#year')[0].value?$('#year')[0].value:$('#year')[0].placeholder)
					} catch (error) {
						alert(error);
					}
				}).html('submit account extend');
				break;
			case 'online_order':
				addparagraph('#online_order', `<b>Setup online orders</b><br>Creates account profiles, payment methods, RTN and activates API`);
				
				//get online order function
				break;
			case 'deliverect':
				addparagraph('#deliverect', `<b>Setup Deliverect</b><br>Creates account profiles, payment methods, RTN and activates API`);

				break;

			default:
				break;
		}
	}
})();