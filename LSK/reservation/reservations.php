<html>
<head>
	<title>Lightspeed Test</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
	<meta name="viewport"
		content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200" rel="stylesheet">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css"
		integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js"
		integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous">
	</script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js"
		integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous">
	</script>
	<style>
		@media(min-width: 768px) {
			.flex {
				display: flex;
				align-items: center;
			}

			body {
				font-family: 'Source Sans Pro', sans-serif;
			}
		}

		.newline{
			padding: 10px 0;
		}

		.btn-outline-primary {
			background-color: #2E61DE !important;
			color: #FFFFFF !important;
			border: none;
		}

		.btn-outline-secondary {
			background-color: #FFFFFF !important;
			color: #FFFFFF !important;
			border: none;
		}
	</style>
	<script>
		function syntaxHighlight(json) {
			if (typeof json != 'string') {
				json = JSON.stringify(json, undefined, 2);
			}
			json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
			return json.replace(
				/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
				function (match) {
					var cls = 'number';
					if (/^"/.test(match)) {
						if (/:$/.test(match)) {
							cls = 'key';
						} else {
							cls = 'string';
						}
					} else if (/true|false/.test(match)) {
						cls = 'boolean';
					} else if (/null/.test(match)) {
						cls = 'null';
					}
					return '<span class="' + cls + '">' + match + '</span>';
				});
		}

		function printMessage(message) {
			pos_printText(message)
		}

		function addItemToCurrentAccount() {}

		function storeData(data) {
			if (data != null) {
				pos_storeData("1", data);
			}
		}

		function loadData() {
			const callback = function (response) {
				document.getElementById("dataview").placeholder = response.data
			};
			pos_loadData("1", callback);
		}

		function printResult(currentAccount) {
			document.getElementById("account").innerHTML =
				"<td>Business ID: " +  + "</p>" +
				"<td>Business Name: " + posContext.businessName + "</td>" +
				"<td>Location ID: " + posContext.locationId + "</td>" +
				"<td>Location Name: " + posContext.locationName + "</td>" +
				"<td>Configuration: " + posContext.configurationName + "</td>" +
				"<td>Device Name: " + posContext.deviceName + "</td>" +
				"<td>Device ID: " + posContext.deviceId + "</td>" +
				"<td>User Name: " + posContext.userName + "</td>" +
				"<td>User ID: " + posContext.userId + "</td>" +	
				"<td>App Version: " + printVersion() + "</td>"

		}

		function getCurrentAccount() {
			/**/console.log('load');
			const setaccount = function (response){
				window.currentAccount = response.data;
				printResult(currentAccount);
			}
			try {
				pos_getCurrentAccount(setaccount);
			} catch (error) {
				/**/console.log(error, document.getElementById('log_dump'));
				document.getElementById('log_dump').innerHTML = 'error getting account: '+error;
			}
		}
		$(document).ready(getCurrentAccount);

		function post_customer_data(){
			//svdc
		}

		function getCurrentAccount2() {
			const printResult = function (response) {
				document.getElementById("account").innerHTML = JSON.stringify(response.data, null, 2) //syntaxHighlight(response.data)
			};
			try {
				pos_getCurrentAccount(printResult);
			} catch (error) {
				/**/console.log(error, document.getElementById('log_dump'));
				document.getElementById('log_dump').innerHTML = 'error getting account: '+error;
			}
		}

		function setConsumer(firstName, lastName, identifier) {
			try { pos_setConsumer({ "firstName": firstName, "lastName": lastName, "identifier": identifier }) }
			catch (error) {document.getElementById('log_dump').innerHTML = 'error setting customer: '+error;}
		}
		function hideContent(name) {
			document.getElementById(name).innerHTML = "";
		}
	</script>
</head>

<body onload="">
	<?php echo '
		<div class="p-5">
		<div class="container newline text-center">
			<img src="https://euc1-web.posios.com/management/en-US/assets/img/logos/lightspeed-vertical.png"
				width="200px" />
			<h1>LSK Web Extensions Demo</h1>
		</div>
		<hr>
		<div class="container">
			<div class="row newline">
				<a href="/LSK/LSK_web_ext.html">
					<button class="btn btn-outline-primary btn-lg btn-ls">HOME</button>
				</a>
			</div>
			<div class="row">
				<button class="btn btn-outline-primary btn-lg btn-ls" onclick="getCurrentAccount3()">show account</button>
				<p id="account"></p>
			</div>
			<div class="row">
				<p>Item discounts</p>
			</div>
			<div class="row">
				<p>account discounts</p>
			</div>
			<div class="row">
				<p></p>
			</div>
		</div>
		<div>
			<div id="log_dump" class="row" ></div><button type="button" class="btn btn-lg btn-ls" onclick="hideContent(`log_dump`)">Clear</button>
		</div>
	</div>'; ?> 
</body>
</html>