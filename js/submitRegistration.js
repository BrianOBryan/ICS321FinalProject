$(document).ready(function() {
	$("#register").click(function() {
		var username = $("#new_username").val().toLowerCase();
		var firstname= $("#new_firstname").val();
		var lastname = $("#new_lastname").val();
		var password = $("#new_password").val();
		var cpassword = $("#new_cpassword").val();
		var email = $("#new_email").val();
		$("#register_msg").css('color', 'Red');
		if(username == '' || password == '' || email == '') {
			$("#register_msg").text("You must fill in all fields");
		}
		else if ((password.length) < 8) {
			$("#register_msg").text("Password must be at least 8 characters");
		}
		else if (password != cpassword) { 
			$("#register_msg").text("Confirm password does not match with password");
		}
		else {
			$.post("register.php", {
			username: username,
			firstname: firstname,
			lastname: lastname,
			password: password,
			email: email
			}, 
			function(data) {
				if (data == "You are now registered") {
					$("form")[1].reset();
					$("#register_msg").css('color', 'Black');
					$("#register_msg").text(data);
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
				else {
					$("#register_msg").text(data);
				}
			});
		}
	});
});