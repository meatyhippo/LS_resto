function paymentConfirmed(form, requestId) {
	console.log("1")
	var confirmation = {}
	console.log("2")
	confirmation.amount = parseFloat(form.amount.value)
	console.log("3")
	confirmation.tip = parseFloat(form.tip.value)
	console.log("4")
	confirmation.requestId = requestId
	console.log("5")
	LightspeedRestaurant.actions.confirmPayment(confirmation)
	console.log("6")
  }

  function paymentCanceled(requestId) {
	var cancelation = {}
	cancelation.requestId = requestId
	LightspeedRestaurant.actions.cancelPayment(cancelation)
  }

  function registerHandlers() {
	  LightspeedRestaurant.callbacks.cancelPayment = function(context) {
		var requestId = context.requestId
		alert("Payment cancelled. Request Id = " + requestId);
	  }

	  LightspeedRestaurant.callbacks.startPayment = function(context) {

		  var requestId = context.requestId
		  var customer = context.customer
		  var receipt = context.receipt

		  var header = "<tr>"
			+ "<th>Amount</th>"
			+ "<th>Name</th>"
			+ "<th>Price</th>"
			+ "<th>Price Without Vat</th>"
			+ "<th>Item Id</th>"
			+ "<th>UUID</th>"
			+ "<th>parent UUID</th>"
			+ "<th>PLU</th>"
			+ "<th>ProductId</th>"
			+ "</tr>"

		  var rowsHTML = receipt.items.map( item =>
			"<tr> <td>"
			  + item.amount
			  + "</td> <td>"
			  + item.name
			  + "</td> <td>"
			  + item.price
			  + "</td> <td>"
			  + item.priceWithoutVat
			  + "</td> <td>"
			  + item.itemId
			  + "</td> <td>"
			  + item.UUID
			  + "</td> <td>"
			  + item.parentUUID
			  + "</td> <td>"
			  + item.PLU
			  + "</td> <td>"
			  + item.productId
			  + "</td> </tr>"
			)
			.reduce( (accumulator, value) => accumulator + value )

		  var customerDetails = ""

		  if (typeof customer !== 'undefined') {
			customerDetails += ("<p>CustomerId # " + customer.customerId + "</p>"
			  + "<p>email " + customer.email + "</p>"
			  + "<p>first " + customer.firstName + "</p>"
			  + "<p>last " + customer.lastName + "</p>"
			  + "<p>phone " + customer.telephone + "</p>"
			  + "<br>")
		  }

		  document.getElementById("request").innerHTML =
			"<h1>Payment Request Details:</h1>"
			+ "<p>Request Id " + requestId + "</p>"
			+ customerDetails
			+ "<p>Receipt # " + receipt.receiptId + "</p>"
			+ "<p>Receipt UUID " + receipt.receiptUUID + "</p>"
			+ "<p>Company # " + receipt.companyId + "</p>"
			+ "<p>User # " + receipt.currentUserId + "</p>"
			+ "<p>Creator # " + receipt.ownerUserId + "</p>"
			+ "<p>Floor ID # " + receipt.floorId + "</p>"
			+ "<p>Table ID # " + receipt.tableId + "</p>"
			+ "<p>Parent ID # " + receipt.parentId + "</p>"
			+ "<p>Vat Inclusive? " + receipt.vatInclusive + "</p>"
			+ "<h2>Items:</h2>"
			+ "<table class=\"table table-striped table-sm\">"
			+ header
			+ rowsHTML
			+ "</table>"
			+ "<h2>Totals:</h2>"
			+ "<p>Total $ " + receipt.total + "</p>"
			+ "<table class=\"table table-striped table-sm\">"
			+ "<p>Total Due $ " + receipt.totalDue + "</p>"
			+ "</table>"
			+ "<form name=\"form\" action=\"\" METHOD=\"GET\" >"
			+ "Payment Amount:<br>"
			+ "<input type=\"text\" name=\"amount\" value=\"" + receipt.totalDue + "\"><br>"
			+ "Tip:<br>"
			+ "<input type=\"text\" name=\"tip\" value=\"0\"><br>"
			+ "<input type=\"button\" name=\"button\" value=\"Confirm Payment\" onClick=\"paymentConfirmed(this.form, '" + requestId + "')\">"
			+ "<input type=\"button\" name=\"cancel\" value=\"Cancel\" onClick=\"paymentCanceled('" + requestId + "')\">"
			+ "</form>"
	  }
  }
