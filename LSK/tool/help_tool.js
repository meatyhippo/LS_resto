//(()=>{
	if(window.LSK) stylenode.remove(), htmlnode.remove();
	if(!window.LSK) window.LSK = {}

	window.scrollTo(0, 0);
	//global variables
	let current_BL = "";
	location.pathname.includes('/businessLocationDetails')?current_BL = location.search.match(/\d+/gm)[0] : current_BL = "000000000000000";
	current_user = $('#primary-nav li.business p')[0].innerHTML;
	$('.container-fluid')[0].removeAttribute('style');

	//add css to page
	(()=>{
		stylenode = document.createElement('style'),
		stylenode.innerHTML = `
		/* css for account BO */
		.flame-header{
			height: fit-content !important;
			flex-direction: column !important;
			left: 0 !important;
			width: 100% !important;
			position: relative !important;
		}
		.flame-header .main-container, .flame-header #ui-box{
			display: flex;
			flex: 1 100% !important;
			width: 100% !important;
			margin: 0 important;
		}
		#ui-box > div , .business-info{
			padding: 1.125rem !important;
		}
		/* css for admin BO */

		/* general css */
		.tool-container{
			display: flex;
			flex-direction: row;
			width: 100%;
			justify-content: space-between;
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
			border: 1px solid lightgrey;
			border-radius: 5px;
		}
		.muted * {
			color: #999999!important;
		}
		`;
		document.body.append(stylenode);
	})();
	//UI for admin BO
	function paint_admin_box(){
		htmlnode = document.createElement('div');
		htmlnode.id = "ui-box"
		htmlnode.innerHTML = `
		<div class="" style="">
			<h3>Quick tools</h3>
			<div class="tool-container" style="">
				<div id="your_account"></div>
				<div id="search_BL"></div>
				<div id="search_user"></div>
				<div id="extend_account"></div>
			</div>
		</div>`;
		$('#content').prepend(htmlnode);
		searchTable = document.createElement('table');
		$(searchTable).attr({'id':'searchTable', 'class':"table"});
	}
	//UI for account BO
	function paint_account_box(){
		htmlnode = document.createElement('div');
		htmlnode.id = "ui-box"
		htmlnode.innerHTML = `
		<div class="" style="">
			<div id="online_order"></div>
			<div id="deliverect"></div>
		</div>`;
		$('.flame-header').append(htmlnode);
	}
	//filter between admin and in an actual account
	if (location.pathname.includes('/admin')){
		//promise to only add functions after UI is created
		let createbox = new Promise((resolve, reject)=>{
			resolve(paint_admin_box());
		}).then((fullfilled)=>{
			/**/console.log("admin UI added");
			//get admin functions
			//admin = fetch("https://meatyhippo.github.io/LS_resto/LSK/tool/scripts/admin.js");
			f = $.get("https://meatyhippo.github.io/LS_resto/LSK/tool/scripts/admin.js",(data)=>{('admin functions loaded:')})
			// UI functions to add if on admin page
			addfunc('your_account');
			addfunc('search_BL'); //add search location function
			addfunc('search_user'); //add search user function
			addfunc('extend_account'); //add extend account function
		}).catch((e)=>{/**/console.log(e);});
	} else {
		//promise to only add functions after UI is created
		let createbox = new Promise((resolve, reject)=>{
			resolve(paint_account_box());
		}).then((fullfilled)=>{
			/**/console.log("account UI added");
			//get online order implementation function
			$.get("https://meatyhippo.github.io/LS_resto/LSK/tool/scripts/online_order_setup.js",(data)=>{/**/console.log('online order function loaded:', '\n', data)})
			//get account profiles JSON
			let profiles = fetch("https://meatyhippo.github.io/LS_resto/LSK/tool/scripts/account_profiles.json");
			let profilesJSON = profiles.then(res=> {res.json()})
			// UI functions to add if in account
			addfunc('online_order'); //add online order function
			addfunc('deliverect'); //add deliverect function
		}).catch((e)=>{/**/console.log(e);});
	}
	//functions to add title and content
	function addparagraph(location, text){
		$(location).append(`<p>${text}</p>`);
	}
	//add input fields based on function
	function addinputfields(fields, location){
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
				location.append(div);
			}
		}
	}
	//add data to the UI table after search
	function addtabledata(type, searchData){
		console.log('adding to table', type, searchData);
		if (typeof(searchHead)=='undefined') searchHead = document.createElement('thead'),searchTable.append(searchHead);
		searchBody = document.createElement('tbody'), searchTable.append(searchBody);
		htmlnode.append(searchTable);
		switch (type) {
			//business locations
			case 'BusinessLocation.list':
				//add table head data
					searchHead.innerHTML = `<tr class="row">
						<th class="text-left">Business</th>
						<th class="text-left">Name</th>
						<th class="text-left">Address</th>
						<th class="text-left">City</th>
						<th class="text-left">Country</th>
						<th class="text-left">Production</th>
						<th class="text-left">License status</th>
						<th class="text-left">License expiration</th>
					</tr>`;
				//add table body data
				Object.keys(searchData).forEach(r=>{
					r = searchData[r];
					searchBody.innerHTML += `<tr class="row ${!r.licenseStatus.includes('ACTIVE')?"muted":""}">
						<td class="text-left"><a href="/admin/index?bizId=${r.businessId}&what=loginAs">${r.businessName} (${r.businessId})</a></td>
						<td class="text-left">${r.name}</td>
						<td class="text-left">${r.address}</td>
						<td class="text-left">${r.city}</td>
						<td class="text-left">${r.countdy}</td>
						<td class="text-left">${r.blStatus} (since ${r.moveToProdDate})</td>
						<td class="text-left">${r.licenseStatus}</td>
						<td class="text-left">${r.licenseExpirationDate}</td>
						</tr>`;
				});
				break;
			//users
			case 'Staff.backofficeUsers':
				//add table head data
				searchHead.innerHTML = `<tr class="row">
					<th class="text-left">Businesses</th>
					<th class="text-left">First Name</th>
					<th class="text-left">Last Name</th>
					<th class="text-left">Email</th>
					<th class="text-left">Active</th>
					<th class="text-left">Id</th>
					<th class="text-left">Add BL</th>
				</tr>`;
				//add table body data
				Object.keys(searchData).forEach(r=>{
					r = searchData[r];
					searchBody.innerHTML += `<tr class="row">
						<td class="text-left">+</td>
						<td class="text-left">${r.firstName}</td>
						<td class="text-left">${r.lastName}</td>
						<td class="text-left">${r.emailAddress}</td>
						<td class="text-left">${r.active}</td>
						<td class="text-left">${r.id}</td>
						<td class="text-left"><a class=\"btn btn-primary add-bl\" href=${location.origin+'/admin/boUsers#addBizLoc'} data-staff=\"${r.id}\" data-email=\"${r.emailAddress}\"><i class=\"icon-plus\"></i> Add BL</a></td>
						</tr>`;
				});
				break;
			default:
				break;
		}
	}
	//main function to add lines to the UI
	async function addfunc(title){
		switch (title) {
			case 'your_account':
				// add accounts the current user is connected to
				let r = await f;
				console.log('r',r);
				addparagraph('#your_account', `<h4>Your account</h4>These are the accounts you are connected to:`);
				let accounts = await userdata(null, current_user.split('@')[0]);
				console.log('function ran', accounts);
				accountsTable = document.createElement('table');
				$(accountsTable).attr({'id':'accountsTable', 'class':"table"});
				accountsHead = document.createElement('thead'),accountsTable.append(accountsHead);
				accountsBody = document.createElement('tbody'), accountsTable.append(accountsBody);
				accountsHead.innerHTML = `<tr class="row">
				<th class="text-left">Business ID</th>
				<th class="text-left">Business Name</th>
				<th class="text-left">Business Location ID</th>
				<th class="text-left">Business Location</th>
				</tr>`;
				accounts.forEach(t => {
					accountsBody.innerHTML += `
					<tr class="row">
						<td class="text-left">${t.bl_businessId}</td>
						<td class="text-left">${t.bl_businessName}</td>
						<td class="text-left">${t.bl_id}</td>
						<td class="text-left">${t.bl_name}</td>
					</tr>`
				});
				document.getElementById(title).append(accountsTable)
				break;
			case 'extend_account':
				addparagraph('#extend_account', `<h4>Extend account</h4>Fill in specific date or leave empty for extend until 2030`);
				//set input fields to extend account if date left empty, auto extend until 2030.
				fields = {
					"blID":{
						"element":"input",
						"attributes":{
							"placeholder":current_BL,
							"id":"blID"
						},
						"label":{
							"for":"blID",
							"html":"Business location"
						}
					},"date":{"element":"input","attributes":{"placeholder":"28","id":"date"},"label":{"for":"date","html":"Day"}},"month":{"element":"input","attributes":{"placeholder":"05","id":"month"},"label":{"for":"month","html":"Month"}},"year":{"element":"input","attributes":{"placeholder":"2030","id":"year"},"label":{"for":"year","html":"Year"}},"button":{"element":"button","attributes":{"id": "submit_extend","class":"btn"}}}

				// parse above fields into UI
				extend = document.createElement('form');
				addinputfields(fields, extend);
				document.getElementById(title).append(extend);

				//add event listener to button to extend account
				$('#submit_extend').click(()=>{
					try {
						extend_account($('#blID')[0].value?$('#blID')[0].value:$('#blID')[0].placeholder,
							$('#date')[0].value?$('#date')[0].value:$('#date')[0].placeholder,
							$('#month')[0].value?$('#month')[0].value:$('#month')[0].placeholder,
							$('#year')[0].value?$('#year')[0].value:$('#year')[0].placeholder)
					} catch (error) {
						console.log(error);
					}
				}).html('Submit account extend');
			break;
			case 'search_BL':
				addparagraph('#search_BL', `<h4>Search location</h4>Fill in specific location id OR search by name`);
				//set input fields for UI 
				fields = {
					"blID":{"element":"input","attributes":{"placeholder":"Id or Name","id":"s_blID"},"label":{"for":"s_blID","html":"Business location search"}},"button":{"element":"button","attributes":{"id": "submit_bl_search","class":"btn"}}
				}
				// parse above fields into UI
				search_blid = document.createElement('form');
				addinputfields(fields, search_blid);
				document.getElementById(title).append(search_blid);
				$('#submit_bl_search').click((e)=>{
					e.preventDefault();
					try {
						if (typeof(searchBody) != "undefined") console.log('removing', searchBody), searchBody.remove();
						search([{
							'prop': 'id',
							'viewName': 'BusinessLocation.list',
							'sValue': s_blID.value
						},{
							'prop': 'name',
							'viewName': 'BusinessLocation.list',
							'sValue': s_blID.value
						}]);
						//search()
					} catch (error) {
						console.log(error);
					}
				}).html('Search business location');
			break;
			case 'search_user':
				addparagraph('#search_user', `<h4>Search BO user</h4>Fill in specific location id OR search by name`);
				//set input fields for UI
				fields = {
					"usermail":{"element":"input","attributes":{"placeholder":current_user,"id":"s_usermail"},"label":{"for":"s_usermail","html":"Search user by email"}},"button":{"element":"button","attributes":{"id": "submit_user_search","class":"btn"}}
				}
				// parse above fields into UI
				search_user = document.createElement('form');
				addinputfields(fields, search_user);
				document.getElementById(title).append(search_user);
				$('#submit_user_search').click( async(e)=>{
					e.preventDefault();
					try {
						if (typeof(searchBody) != "undefined") console.log('removing', searchBody), searchBody.remove();
						search([{
							'prop': 'emailAddress',
							'viewName': 'Staff.backofficeUsers',
							'sValue': s_usermail.value
						},{
							'prop': 'firstName',
							'viewName': 'Staff.backofficeUsers',
							'sValue': s_usermail.value
						},{
							'prop': 'lastName',
							'viewName': 'Staff.backofficeUsers',
							'sValue': s_usermail.value
						}]);
						//search();
						//search();
					} catch (error) {
						console.log(error);
					}
				}).html('Search BO user');

			break;
			case 'online_order':
				//get online order function
				addparagraph('#'+title, `<b>Setup online orders</b><br>Creates account profiles, payment methods, RTN and activates API`);
				div = document.createElement('div');
				button = document.createElement('button');
				$(button).attr({'class':'btn','id':'submit_oo'}).html('Setup Online ordering');
				$(button).click(()=>{
					try {
						console.log(profilesJSON)
						//generic_setup();
					} catch (error) {
						console.log(error);
					}
				});
				div.appendChild(button);
				document.getElementById(title).append(div);

			break;
			case 'deliverect':
				addparagraph('#'+title, `<b>Setup Deliverect</b><br>Creates account profiles, payment methods, RTN and activates API. Does not include generi setup.`);
				div = document.createElement('div');
				button = document.createElement('button');
				$(button).attr({'class':'btn','id':'submit_Del'}).html('Setup Deliverect');
				$(button).click(()=>{
					try {
						profilesJSON.then(json=>console.log(json))
						//generic_setup();
					} catch (error) {
						console.log(error);
					}
				});
				div.appendChild(button);
				document.getElementById(title).append(div);
				selectionlist = document.createElement('form');
			break;
			default:
			break;
		}
	}
//})();