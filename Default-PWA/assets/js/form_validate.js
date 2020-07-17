$(function() {

  let cur_version = parseFloat($('#current_version').text());

  $.validator.addMethod('newVersionValidator', function(value, element) {
    return parseFloat(value) >= cur_version; 
  }, 'New version cannot be smaller than current version')

  $('#contact-form').validate({
    rules: {
      url: {
        required: true,
        url: true
      },
      'new_version': {
        required: true,
        newVersionValidator: true
      },
      'channel_id': "required",
      'app_id': "required",
    },
    messages: {
      url: {
        required: 'Please enter a URL'
      },
      'new_version': {
        required: 'Please enter a version number'
      }
    }
  });

  function toggleSubmit() {
    if ($('#contact-form').valid()) {
      $('#submit_btn').prop('disabled', false)
    }
    else {
      $('#submit_btn').prop('disabled', 'disabled')
    }
  }

  $('input').on('blur keyup', toggleSubmit);
  $('select').on('change', toggleSubmit);

  

  $('#contact-form').submit(() => alert('Thank you'));

})