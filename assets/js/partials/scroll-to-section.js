$(document).ready(function () {
  $('.navbar .navbar-nav a.nav-link')
    .not('.languages')
    .click(function () {
      $('.navbar .navbar-toggler').click();
      var linkHref = $(this).attr('href');
      var idElement = linkHref.substr(linkHref.indexOf('#'));
      $('html, body').animate(
        {
          scrollTop: $(idElement).offset().top - 60,
        },
        1000,
      );
      return false;
    });
});
