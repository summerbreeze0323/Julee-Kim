$(document).ready(function () {
  windowHeight();

  // 문자열을 날짜 객체로 변환
  Vue.filter('newDate', function (value) {
    return new Date(value);
  });

  // 날짜 객체를 'toLocaleString'을 사용해 문자열로 변환
  Vue.filter('toLocaleString', function (value) {
    return 'Date' == value.constructor.name ? value.toLocaleString() : 'Invalid Filtering';
  });

  var tableVueData = {
    pages: [],
    selectedPageIndex: 0,
    itemsInPage: 10
  };

  var tableVue = new Vue({
    el: '#table_container',
    data: tableVueData
  });

  // 프로모션 목록을 불러옴
  getCoupons(
    function /* onDone */ (data) {
      // time 키 추가
      data.Items.forEach(function (item) {
        item.time = new Date(item.createdAt).getTime()
      });

      // 정렬
      data.Items = data.Items.sort(sortByTimeDesc);

      // 렌더링
      tableVueData.pages = paginate(data.Items, tableVueData.itemsInPage)
    },
    function /* onFail */ () {
      console.error('잘못된 요청입니다.');
    })
}); // document.ready_end


