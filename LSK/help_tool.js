(()=>{
	function paint_box(){
		stylenode = document.createElement('style'),
		htmlnode = document.createElement('div');
		htmlnode.id = "overlay-box"
		stylenode.innerHTML = `
		#overlay-box{
				width: 100%;
				height: 500px;
				top: 0;
				left: 0;
				background-color: rgba(0,0,0,.6)!important;
				z-index: 9999999;
				display: block;
				position: fixed;
				/* opacity: 0.7; */
		}
		#ui-box{
			color: white;
			height: 100%;
			width: 450px;
			float: right;
			z-index:99999999999999;
		}`;
		htmlnode.innerHTML = `
		<div id="ui-box">
			<div class="account-extend">
				<p>TEXT here</p>
				<table class="">
				</table>
			</div>
		</div>`;
		document.body.append(htmlnode, stylenode);
	}
	let createbox = new Promise((resolve, reject)=>{
		resolve(paint_box())
	});
	createbox.then((fullfilled)=>{
		/**/console.log($('#ui-box'));
		$('#ui-box').click((e)=>{ 
			e.preventDefault();
			return;
		});
		$(htmlnode).click((e)=>{
			htmlnode.remove();
			stylenode.remove();
			/**/console.log(htmlnode)
		})
	})
	.catch((e)=>{/**/console.log(e);})
})();