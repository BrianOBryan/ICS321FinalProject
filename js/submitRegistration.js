$(document).ready(function() {
	$("#register").click(function() {
		var username = $("#new_username").val();
		var password = $("#new_password").val();
		var email = $("#new_email").val();
		$("#register_msg").css('color', 'Red');
		if(username == '' || password == '' || email == '') {
			$("#register_msg").text("You must fill in all fields");
		}
		else if ((password.length) < 8) {
			$("#register_msg").text("Password must be at least 8 characters");
		}
		else {
		$.post("register.php", {
		username: username,
		password: password,
		email: email
		}, 
		function(data) {
			if (data == "You are now registered") {
				$("form")[1].reset();
				$("#register_msg").css('color', 'Black');
				$("#register_msg").text(data);
			} 
			else {
				$("#register_msg").text(data);
			}
		});
		}
	});
});