$(document).ready(function() {
	$("#login").click(function() {
		var username = $("#username").val();
		var password = $("#password").val();
		if(username == '' || password == '') {
<<<<<<< HEAD
			$("#login_msg").text("Required fields cannot be blank");
=======
			alert("Required fields cannot be blank");
>>>>>>> d4a6efb5ee176091db1e3fb3118ecac660f11bf3
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
