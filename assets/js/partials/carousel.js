$(document).ready(function () {
  const carouselLength = $('.carousel.slide').length;
  const carouselIndex = carouselLength - 1;

  for (let index = 0; index <= carouselIndex; index++) {
    $('#carousel-' + index + ' .carousel-item')
      .first()
      .addClass('active');

    $('#carousel-' + index).on('slide.bs.carousel', function (e) {
      const $e = $(e.relatedTarget);
      const idx = $e.index();
      const itemsPerSlide = 4;
      const totalItems = $('#carousel-' + index + ' .carousel-item').length;

      if (idx >= totalItems - (itemsPerSlide - 1)) {
        const it = itemsPerSlide - (totalItems - idx);
        for (let i = 0; i < it; i++) {
          // append slides to end
          if (e.direction == 'left') {
            $('#carousel-' + index + ' .carousel-item')
              .eq(i)
              .appendTo('#carousel-' + index + ' .carousel-inner');
          } else {
            $('#carousel-' + index + ' .carousel-item')
              .eq(0)
              .appendTo('#carousel-' + index + ' .carousel-inner');
          }
        }
      }
    });
  }
});
