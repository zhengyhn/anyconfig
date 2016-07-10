var options = {
  schema: {
  }
};

var editor = new JSONEditor(document.getElementById('value'), options);

$('#name').change(function () {
  $('#spin').text('');

  $.ajax({
    method: 'POST',
    url: '/anyconfig/checkkey',
    data: {
      key: $('#name').val()
    }
  }).done(function (res) {
    if (res.code) {
      $('#spin').text('该配置已存在!');
    }
  }).fail(function (res) {
    //
  });
});

$('#btn-add').click(function () {
  $('#spin').text('');

  var errors = editor.validate();
  if(errors.length) {
    return $('#spin').text('配置值json 错误!');
  }
  var value = editor.getValue();
  console.info(value);

  if (!value) {
    return $('#spin').text('配置值不能为空');
  }
  if (_.isObject(value) && _.isEmpty(value)) {
    return $('#spin').text('配置值不能为空');
  }

  $spinner.spin($('#spin').get(0));
  $.ajax({
    method: 'POST',
    url: '/anyconfig/add',
    data: {
      key: $('#name').val(),
      comment: $('#comment').val(),
      value: value
    }
  }).done(function (res) {
    $spinner.stop();

    if (res.code) {
      $('#spin').text(res.msg);
    } else {
      window.location = '/anyConfig/view/' + $('#name').val();
    }
  }).fail(function (res) {
    $('#spin').text(res.msg);
    $spinner.stop();
  });
});
