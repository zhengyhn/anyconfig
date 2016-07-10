var options = {
  schema: {
  }
};

var editor = new JSONEditor(document.getElementById('value'), options);
editor.setValue($('#hidden').val());
readonly(true);

$('#btn-submit').toggle();
$('#btn-cancel').toggle();

$('#btn-modify').click(function () {
  toggleBtn();
  readonly(false);
});

$('#btn-cancel').click(function () {
  toggleBtn();
  readonly(true);
});

$('#btn-submit').click(function () {
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
    url: '/anyconfig/update',
    data: {
      key: $('#name').val(),
      comment: $('#comment').val(),
      value: value
    }
  }).done(function (res) {
    $spinner.stop();

    if (res.code) {
      $('#spin').text(res.msg);
    }
    readonly(true);
  }).fail(function (res) {
    $('#spin').text(res.msg);
    $spinner.stop();
    readonly(true);
  });

  toggleBtn();
});

function toggleBtn() {
  $('#btn-modify').toggle();
  $('#btn-submit').toggle();
  $('#btn-cancel').toggle();
}

function readonly(readonly) {
  if (readonly) {
    editor.disable();
  } else {
    editor.enable();
  }
  $('#name').attr('readonly', readonly);
  $('#comment').attr('readonly', readonly);
}
