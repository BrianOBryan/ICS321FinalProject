
window.onload = function() {
    var lat;
    var lon;
    setGeoLocation(function(lat, lon) {
        setCoord(lat,lon);
        getPosts();
    });
   
	function setGeoLocation(callback) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				lat = getCoord(position.coords.latitude);
				lon = getCoord(position.coords.longitude);
				callback(lat, lon);
			});
		} else { 
			x.innerHTML = "Geolocation is not supported by this browser.";
		}
	}
	function getCoord(s) {
		t = Math.round(s * 1000) / 1000;
		return t;
	}
	function setCoord(tlat, tlon) { 
		lat = tlat;
		lon = tlon;
    }

    function getPosts() {
        $.get("display_posts.php", {
                lat: lat,
                lon: lon,
                }, 
            function (data) { 
            //alert(data);
                var post_array= $.parseJSON(data);
                for (i = 0; i < post_array.length; i++) {
                    var div_s = "<div class=\"post\" data-value='" + post_array[i].Post_ID + "'>";
                    var desc = "	<p>" + post_array[i].Post_Desc + "</p>";
                    var mapBtn = "<button class=\"open_map\">Map</button>";
                    var geo = "<span style='display:none' id=\"geo\">" + post_array[i].Location + "</span>";
                    var time = "<span>" + post_array[i].Time_Stamp + "</span>";
                    var username = "<h3>" + post_array[i].Firstname + "</h3>";
                    var deletebtn;
                    var hangoutbtn;
                    var listPcpBtn;
                    if (post_array[i].isOwner == 'true'){
                        listPcpBtn = "<button id=\"list_ptcp\">List</button>";
                        deletebtn= "<button id=\"del_post\">Delete</button>";
                        hangoutbtn = "";
                    }
                    else {
                        deletebtn = "";
                        listPcpBtn = "";
                        if (post_array[i].Is_Participant == 'Y'){
                            hangoutbtn = "<button id=\"unhangout\">Un-Hangout</button>";
                        }
                        else {
                            hangoutbtn = "<button id=\"hangout\">Hangout</button>";
                        }
                    }
                    var div_e = "</div>";
                    var out = div_s + username + deletebtn + hangoutbtn + desc + mapBtn + geo + listPcpBtn + time +  div_e;
                    $('#posts').append(out);
                }
        });
    }
    
    $.get("list_friends.php", 
        function (data) { 
	    	var friends = $.parseJSON(data);
	    	for (i = 0; i < friends.length; i++) {
                var removeFriendBtn = "<button class=\"removeFriend\">Remove Friend</button>";
	    		var out = "<li value=" + friends[i].User_ID + ">" + friends[i].Firstname + removeFriendBtn + "</li>";
	    		$('.friend_list').append(out);
	    	}
    });
    
    $(document).on('click', '.removeFriend', function() {    
        var t = $(this);
        var parent = $(t).parent();
        var friend_id = $(parent).attr("value");
        $.post("remove_friend.php", {
            friend_id: friend_id,
        },
        function (data) { 
            if (data == "") {
                $(parent).remove();
            }
        });
    });
}