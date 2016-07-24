var options = {
  mode: 'view',
  modes: ['tree', 'code']
};

var editor = new JSONEditor(document.getElementById('value'), options);

try {
  var value = JSON.parse($('#hidden').val());
} catch (e) {
  var value = $('#hidden').val();
}
editor.set(value);

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

  var value = editor.get();

  if (value === '') {
    return $('#spin').text('The value cannot be null');
  }
  if (_.isObject(value) && _.isEmpty(value)) {
    return $('#spin').text('The value cannot be null');
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
    if (res.code) {
      $('#spin').text(res.msg);
    }
    readonly(true);
    $spinner.stop();
  }).fail(function (res) {
    $('#spin').text(res.msg);
    readonly(true);
    $spinner.stop();
  });

  toggleBtn();
});

function toggleBtn() {
  $('#btn-modify').toggle();
  $('#btn-submit').toggle();
  $('#btn-cancel').toggle();
}

function readonly(readonly) {
  $('#name').attr('readonly', readonly);
  $('#comment').attr('readonly', readonly);
  if (readonly) {
    editor.setMode('view');
    editor.expandAll();
  } else {
    editor.setMode('tree');
  }
}
