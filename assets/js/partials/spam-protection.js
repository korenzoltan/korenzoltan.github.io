$(document).ready(function () {
  $('a[data-email]').each(function () {
    this.href =
      'mailto:' +
      $(this)
        .attr('data-email')
        .replace('[at]', '@')
        .replace(/\[dot]/g, '.');
    this.innerHTML = this.href.replace('mailto:', '');
  });
});
