$(document).ready(function () {
  // console.log('I am ready');
  $('.submit').click(function(e){

    const email = $('#entry-email').val();
    const password = $('#entry-password').val();
    const battlenet = $('#entry-battlenet').val()

    console.log(email);
    console.log(battlenet);
    $.ajax({
      url: '/users/new',
      data: {email: email, password: password, battlenet: battlenet },
      method: 'POST'
    }).done(() => {
      //Redirects to the index
      window.location.replace('/');
    }).catch((err) => {
      //TO DO: make look nice with a flash message or something
      alert('error!');
      console.log(err.status);
    });
    //empty the DOM and insert a loader
    $('.container').empty();
    $('.container').append('<div class="loader"></div>');
  });

});