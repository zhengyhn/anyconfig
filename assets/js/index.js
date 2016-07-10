$('#input-search').keydown(function (event) {
  if (event.which === 13) {
    search();
  }
});

function source (arr) {
  return function (q, cb) {
    cb(arr);
  }
}

var engine = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  local: []
});

$('#input-search').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'keys',
  source: engine 
});

$('#input-search').on('input propertychange', function (event) {
  var key = $('#input-search').val();
  if (!key) {
    return;
  }

  $.ajax({
    method: 'POST',
    url: '/anyconfig/getPrompts',
    data: {
      key: key
    }
  }).done(function (res) {
    if (!res.code) {
      console.info(res.data);
      engine.clear();
      engine.add(res.data);
    }
  }).fail(function (res) {
    ;
  });
});

$('#btn-search').click(function () {
  search();
});

function search () {
  $('#input-search').blur();
  $('#spin').text('');
  $('#list').text('');

  var text = $('#input-search').val();
  if (!text) {
    return
  }
  $spinner.spin($('#spin').get(0));
  $.ajax({
    method: 'POST',
    url: '/anyconfig/search',
    data: {
      text: text
    }
  }).done(function (res) {
    $spinner.stop();

    if (res.code) {
      $('#spin').text(res.msg);
    } else {
      console.info(res.data);
      addResult(res.data);
    }
  }).fail(function (res) {
    $('#spin').text(res.msg);
    $spinner.stop();
  });
}

function addResult(arr) {
  for (var i = 0; i < arr.length; ++i) {
    var keyDiv = $('<div>').text(arr[i].key).addClass('title');
    var a = $('<a>').attr('href', '/anyConfig/view/' + arr[i].key);
    a.append(keyDiv)

    var commentDiv = $('<div>').text(arr[i].comment).addClass('comment');

    var li = $('<li>');
    li.append(a).append(commentDiv);;

    $('#list').append(li);
  }
}
