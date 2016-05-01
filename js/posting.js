
$(document).ready(function() {
    var lat;
    var lon;
	setGeoLocation(setCoord);
	function setGeoLocation(setCoord) {

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				lat = getCoord(position.coords.latitude);
				lon = getCoord(position.coords.longitude);
				setCoord(lat, lon);
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
    
	function getTimeStamp() {
		var date = new Date();
		var datetime = date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
		return datetime;
	}
	
	//overlay box
	var isOpen = false;
	function showOverlayBox() {
	    if( isOpen == false ) return;
	    $('.OverlayBox').css({
	        display:'block',
	        left:( $(window).width() - $('.OverlayBox').width())/2,
	        top:( $(window).height() - $('.OverlayBox').height())/2 -20,
	        position:'absolute'
	    });
	    $('.bgCover').css({
	        display:'block',
	        width: $(window).width(),
	        height:$(window).height(),
	    });
	}
	function doOverlayOpen() {
	    isOpen = true;
	    showOverlayBox();
	    $('.bgCover').css({opacity:0}).animate( {opacity:0.5, backgroundColor:'#000'} );
	    // dont follow the link : so return false.
	    return false;
	}
	function doOverlayClose() {
	    isOpen = false;
	    $('.OverlayBox').css( 'display', 'none' );
	    $('.bgCover').animate( {opacity:0}, null, null, function() { $(this).hide(); } );
        
        // clears the overlay div for future use
        $('#overlay_div').removeAttr("style");
        $('#overlay_div').empty();
	}
    
	$(window).bind('resize',showOverlayBox);
	
	$( document ).on( 'click', '.open_map', function() {
        doOverlayOpen();
		var parent = $(this).parent();
        var geo = $(parent).find('#geo').text();
        var lat = geo.split(" ")[0];
        var lng = geo.split(" ")[1];
        
        var latLng = new google.maps.LatLng(lat, lng);
        var options = {
            zoom: 15,
            center: latLng,
        }
        map = new google.maps.Map(document.getElementById('overlay_div'), options);
        var cityCircle = new google.maps.Circle({
          strokeColor: '#66ff33',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#66ff33',
          fillOpacity: 0.35,
          map: map,
          center: options.center,
          radius: 400
        });
        
    });
	$( document ).on( 'click', '.close_map', doOverlayClose);
	
	$("#submit_post").click(function(position) {
		var post_desc = $("#posting_textarea").val();
		if (post_desc.trim() != "") {
			
			var ts = getTimeStamp();
            var date = ts.split(" ")[0];
            var hr = String (ts.split(" ")[1].split(":")[0]);
            var min = String (ts.split(" ")[1].split(":")[1]);
            var sec = String (ts.split(" ")[1].split(":")[2]);
            var meridiem = "";
            var timestamp;
        
            
            if (parseInt(hr) >= 12) {
                hr -= 12;
                meridiem = " PM";
            }
            else {
                meridiem = " AM";
            }
            
            // pads the 0s
            if (parseInt(hr) < 10) {
                hr = "0" + String(hr);
            }
            if (parseInt(min) < 10) {
                min = "0" + String(min);
            }
            if (parseInt(sec) < 10) {
                sec = "0" + String(sec);
            }
            
            timestamp = date + " " + hr + ":" + min + ":" + sec + meridiem;
            
			$.post("post_status.php", {
			post_desc: post_desc,
			timestamp: timestamp,
			lat: lat,
			lon: lon,
			}, 
			function(data) {
                    $("form")[0].reset();
			    	var post_array= $.parseJSON(data);
                    var div_s = "<div class=\"post\" data-value='" + post_array[0].Post_ID + "'>";
                    var desc = "<p>" + post_desc + "</p>";
                    var geo = "<span style='display:none' id=\"geo\">" + lat + " " + lon + "</span>";
                    var mapBtn = "<button class=\"open_map\">Map</button>";
                    var time = "<span>" + timestamp + "</span>";
                    var firstName = "<h3>" + post_array[0].Firstname + "</h3>";
                    var delbtn= "<button id=\"del_post\">Delete</button>";
                    var div_e = "</div>";
                    var listPcpBtn = "<button id=\"list_ptcp\">List</button>";
                    var out = div_s + firstName + delbtn + desc + mapBtn + geo + listPcpBtn + time +  div_e;
                    $('#posts').prepend(out);
                    $(".word_cnt").text(200);
			});
		}
	});
	
	
	// Counts remaining character for the posting textarea
	$(document).on('keyup', '#posting_textarea', function() {
		var numChar = $("#posting_textarea").val().length;
		var numRem = 200 - numChar;
		$(".word_cnt").text(numRem);
	});
	
	$(document).on('click', '#del_post', function() {
		var parent = $(this).parent();
        var post_id = $(parent).attr("data-value");
        $.post("delete_post.php", {
                post_id: post_id,
                }, 
                function(data) {
                    if (data == "") {
                        $(parent).remove();
                    }
        });
	});
    
    $(document).on('click', '#hangout', function() {
        var t = $(this);
		var parent = $(this).parent();
        var post_id = $(parent).attr("data-value");
        $.post("participate.php", {
                post_id: post_id,
                }, 
                function(data) {
                    if (data == "") {
                        t.text("Un-Hangout");
                        t.attr('id','unhangout'); 
                    }
        });
	});
    
    $(document).on('click', '#unhangout', function() {
        var t = $(this);
		var parent = $(this).parent();
        var post_id = $(parent).attr("data-value");
        $.post("unparticipate.php", {
                post_id: post_id,
                }, 
                function(data) {
                    if (data == "") {
                        t.text("Hangout");
                        t.attr('id','hangout'); 
                    }
        });
	});
    
    $(document).on('click', '#list_ptcp', function() {
        doOverlayOpen();
        var t = $(this);
		var parent = $(this).parent();
        var post_id = $(parent).attr("data-value");
        $.get("list_participants.php", {
                post_id: post_id,
                }, 
                function(data) {
                    if (data != "") {
                        var ptcps = $.parseJSON(data);
                        var ul_s = "<ul>";
                        var ul_e = "</ul>";
                        $('#overlay_div').append(ul_s);
                        for (i = 0; i < ptcps.length; i++) {
                            var li_s = "<li>";
                            var li_e = "</li>";
                            var fn = ptcps[i].Firstname;
                            var out = li_s + fn + li_e;
                            $('#overlay_div').append(out);
                        }
                        $('#overlay_div').append(ul_e);
                    }
        });
	});
});