
const signUpButton = $('#sign-up')
const signInButton = $('#sign-in')
const container = $('#container')
const min = 10000; 
const max = 99999;

signUpButton.click( function() {
    container.addClass('right-panel-active');
  });

  signInButton.click( function() {
    container.removeClass('right-panel-active');
  });

// Registration new account

$(document).ready(function(){
  $('#account-sign-up').click(function(event){

    $('#register-status-text').text('Wait for a moment....');
    event.preventDefault();

    var username = $('#name').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var code = Math.floor(Math.random() * (max - min + 1)) + min;

    var registerEndPoint = 'http://127.0.0.1:8080/api/auth/register';
    var sendMailEndPoint = 'http://127.0.0.1:8080/api/auth/sendmail';

    var data = {
      name : username,
      email : email,
      password : password,
      token : 0,
      verified : false
    };

	var mailData = {
		receiver: email,
		msgBody: "Hi, Your verification code for dotEdu is " + code + ".Thank You",
		subject: "Verify your account",
	};

	
	// $.ajax({
	// 	type: 'POST',
	// 	url: sendMailEndPoint,
	// 	contentType: 'application/json',
	// 	data: JSON.stringify(mailData),
	// 	dataType: 'json',

	// 	success: function(response){
	// 		window.location.href = "../html/verify.html";
	// 	},
	// 	error: function(jqXHR, textStatus, errorThrown){
	// 		console.log(errorThrown)
	// 	}
	// });
    $.ajax({
		type: 'POST',
		url: registerEndPoint,
		contentType: 'application/json',
		data: JSON.stringify(data),
		dataType: 'json',
		
		success: function(response){
			var authToken = response.token;
			var error = response.error;

			if(authToken != null){
				localStorage.setItem('token',authToken);
				localStorage.setItem('code', code);
				
				var mailData = {
					receiver: email,
					msgBody: "Hi, Your verification code for dotEdu is " + code + ".Thank You",
					subject: "Verify your account",
				};

				
				$.ajax({
					type: 'POST',
					url: sendMailEndPoint,
					contentType: 'application/json',
					data: JSON.stringify(mailData),
					dataType: 'json',

					success: function(response){
						window.location.href = "../html/verify.html";
					},
					error: function(jqXHR, textStatus, errorThrown){
						console.log(response)
					}
				});
			
			}
			else if(error != null){
				$('#register-status-text').text(error);
			}
      	},

      error: function(jqXHR, textStatus, errorThrown){
        $('#register-status-text').text('we have encountered ' + errorThrown);
      }
    });
  });
});

// Login account

$(document).ready(function(){
  $('#account-sign-in').click(function(event){

    event.preventDefault();

    
    var email = $('#log-email').val();
    var password = $('#log-password').val();


    var authenticateEndPoint = 'http://127.0.0.1:8080/api/auth/authenticate';

    var data = {
      email : email,
      password : password
    };


    $.ajax({
      type: 'POST',
      url: authenticateEndPoint,
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: 'json',
      
      success: function(response){
        var authToken = response.token;
        var error = response.error;

        if(authToken != null){
          localStorage.setItem('token',authToken);
          window.location.href = "../html/ask.html";
        }
        else if(error != null){
          console.log(error);
        }
      },

      error: function(jqXHR, textStatus, errorThrown){
        alert(errorThrown);
      }
    });
  });
});