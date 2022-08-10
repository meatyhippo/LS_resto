(()=>{
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
			padding: ;
		}
		#ui-box label, #ui-box input {
			width: 50%;
		}
		`;
		htmlnode.innerHTML = `
		<div id="close-box">
		</div>
		<div id="ui-box">
			<div class="" style="">
				<div id="extend_account">
					<p>
						<b>Extend account</b>
						<br>
						fill in specific date or leave empty for extend until 2030
					</p>
				</div>
				<div id=""></div>
			</div>
		</div>`;
		document.body.append(htmlnode, stylenode);
	}
	function addfunc(title){
		switch (title) {
			case 'extend_account':
				//get extend account function
				$.get("https://meatyhippo.github.io/LS_resto/LSK/scripts/extend_account.js",
					function (data, textStatus, jqXHR) {
						/**/console.log(title, 'function loaded: ', data);
					},
				);
				//set input fields
				extend = document.createElement('div'),
				blID = document.createElement('input'),
				date = document.createElement('input'),
				month = document.createElement('input'),
				year = document.createElement('input'),
				button = document.createElement('button'),
				blIDLabel = document.createElement('label'),
				dateLabel = document.createElement('label'),
				monthLabel = document.createElement('label'),
				yearLabel = document.createElement('label');
				location.pathname.includes('/businessLocationDetails')? 
				$(blID).attr({'placeholder': location.search.match(/\d+/gm)[0],'id':'blID'}):
				$(blID).attr({'placeholder': '123456789','id':'blID'});
				$(date).attr({'placeholder': '1','id':'date'}),
				$(month).attr({'placeholder': '1','id':'month'}),
				$(year).attr({'placeholder': '2030','id':'year'}),
				$(blIDLabel).attr('for','blID'),
				$(dateLabel).attr('for','date'),
				$(monthLabel).attr('for','month'),
				$(yearLabel).attr('for','year');
				//add fields to div
				extend.append(blID,blIDLabel,date,dateLabel,month,monthLabel,year,yearLabel,button);
				//paint div to ui box
				document.getElementById(title).append(extend);
				//add properties to fields

				break;
		
			default:
				break;
		}
	}
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
			/**/console.log(htmlnode)
		});
		if (location.pathname.includes('/admin')){
			addfunc('extend_account');
		}
	})
	.catch((e)=>{/**/console.log(e);})
})();