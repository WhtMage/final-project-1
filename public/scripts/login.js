$(document).ready(function () {

  $('.submit').click(function(e){

    $.ajax({
      url: '/users/login',
      data: {email: $('#entry-email').val(), password:$('#entry-password').val() },
      method: 'POST'
    }).done(() => {
      // Redirects user to their profile page
      $.ajax({
        url: "/users/info.json",
        data: {email: $('#entry-email').val()},
        method: "GET"
      }).done((userObj) => {
        const userID = userObj.id
        console.log('i am in client - userID', userID)
        window.location.replace(`/users/${userID}`);
      })
    }).catch((err) => {
      // TO DO: Make look nice
      if (err.status === 400){
        $('.login-alert').append(`
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>OOPS!</strong> The login information was not correct...
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        `)
      } else if (err.status === 404) {
        $('.login-alert').append(`
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>OOPS!</strong> The user does not exist!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        `)
      } else if (err.status === 403) {
        $('.login-alert').append(`
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>OOPS!</strong> Your E-mail and Password don't match!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        `)
      } else {
        $('.login-alert').append(`
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>OOPS!</strong> Something went wrong with your request!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        `)
      }
    });

    window.setTimeout(function() {
      $(".alert").fadeTo(500, 0).slideUp(500, function(){
          $(this).remove(); 
      });
  }, 5000);
  });

});
