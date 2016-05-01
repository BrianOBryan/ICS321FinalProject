$(document).ready(function() {
	$("#logout").click(function() {
		$.get("logout.php", 
		function(data) {
			if (data == "done") {
				window.location = "index.php";
			}
		});
	});
});