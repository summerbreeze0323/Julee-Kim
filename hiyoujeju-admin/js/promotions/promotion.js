var API_URL = 'https://api.hiyoujeju.snapbak-studios.com/promotions/'

function getPromotions (onDone, onFail) {
  var options = {
    type: 'GET',
    dataType: 'json',
    url: API_URL
  };

  $.ajax(options).done(onDone).fail(onFail)
}

function getPromotion (id, onDone, onFail) {
  var options = {
    method: 'GET',
    contentType: 'application/json',
    url: API_URL + id
  };

  $.ajax(options).done(onDone).fail(onFail)
}

function createPromotion (data, onDone, onFail) {
  var options = {
    method: 'POST',
    dataType: 'json',
    url: API_URL,
    data: data
  };

  $.ajax(options).done(onDone).fail(onFail)
}

function deletePromotion (id, onDone, onFail) {
  var options = {
    type: 'DELETE',
    url: API_URL + id
  };

  $.ajax(options).done(onDone).fail(onFail)
}

function goToIndex () {
  window.location.href = 'index.html';
}

function windowHeight () {
  var height = window.innerHeight

  $('.container').css('height', height)
}


// 최신 순으로 정렬
function sortByTimeDesc (a, b) {
    return b.time - a.time;
}

// 'items'를 'limit'개씩 나누기
function paginate (items, limit) {
    var pages = [];
    for (var i = 0; i < items.length; i += limit)
        pages.push(items.slice(i, i + limit))
    return pages;
}


