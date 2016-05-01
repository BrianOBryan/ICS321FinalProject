$(document).ready(function() {
	$("#login").click(function() {
		var username = $("#username").val();
		var password = $("#password").val();
		if(username == '' || password == '') {
			$("#login_msg").text("Required fields cannot be blank");
		}
		else {
		$.post("login.php", {
		username: username,
		password: password,
		}, 
		function(data) {
			if (data != "") {
				$("#login_msg").text(data);
			}
			else {
			    window.location = "profile.php";
			}
		});
		}
	});
});