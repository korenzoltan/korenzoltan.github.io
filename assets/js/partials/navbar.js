$(document).ready(function () {
  $(document).scroll(function () {
    const navbar = $('header, .navbar'),
      scroll = $(window).scrollTop();

    if ($(window).width() >= 992) {
      scroll > 0 ? navbar.css('height', '60px') : navbar.css('height', '90px');
    }
  });

  $('.nav-item .chevron').click(function () {
    $(this).hasClass('collapsed')
      ? $(this).removeClass('collapsed')
      : $(this).addClass('collapsed');

    const parent = $(this).parent();
    const dropdownMenu = parent.children('.dropdown-menu');
    dropdownMenu.hasClass('show')
      ? dropdownMenu.removeClass('show')
      : dropdownMenu.addClass('show');
  });
});
