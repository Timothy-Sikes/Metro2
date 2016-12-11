
function submitStops() {
	var departure = $('#departureSelect').val();
	var arrival = $('#arrivalSelect').val();

	window.location.href = "/home/route?departure=" + departure + "&arrival=" + arrival;
}
