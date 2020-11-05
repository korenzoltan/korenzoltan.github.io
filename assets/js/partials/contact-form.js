$(document).ready(function () {
  $('#contact-form-send-button').on('click', function () {
    const formsparkContactFormActionUrl = $(
      '#formspark-contact-form-action-url',
    ).val();

    const name = $('#name');
    const email = $('#email-address');
    const message = $('#message');

    const isValidName = validate('name', name);
    const isValidEmail = validate('email', email);
    const isValidMessage = validate('message', message);

    if (isValidName && isValidEmail && isValidMessage) {
      $('.spinner-border').css('display', 'inline-block');
      $('#contact-send-button')
        .css('opacity', '.7')
        .attr('disabled', 'disabled');

      const data = {
        name: name.val(),
        email: email.val(),
        message: message.val(),
      };

      $.ajax({
        url: formsparkContactFormActionUrl,
        method: 'POST',
        data,
        dataType: 'json',
        success: function (res) {
          isSendEmail('success');
        },
        error: function (res) {
          isSendEmail('error');
        },
      });
    }
  });
});

function validate(fieldName, element) {
  if (element.val().length > 0) {
    if (
      fieldName === 'email' &&
      !element.val().match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    ) {
      element.addClass('is-invalid');
      element.siblings('.alert').css('display', 'block');
      return false;
    } else {
      element.removeClass('is-invalid');
      element.siblings('.alert').css('display', 'none');
      return true;
    }
  } else {
    element.addClass('is-invalid');
    element.siblings('.alert').css('display', 'block');
    return false;
  }
}

function isSendEmail(status) {
  $('#contact-form').trigger('reset');
  $('#contact-form .spinner-border').removeAttr('style');
  $('#contact-form-send-button').removeAttr('style disabled');
  $('#contact-form #status #status-' + status).css('display', 'block');
}
