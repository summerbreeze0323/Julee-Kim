$(document).ready(function () {
  windowHeight();

  // 필터 대상인 문자열을 날짜 객체로 변환
  // 날짜 객체로 변환이 불가능한 문자열 또는 다른 값에 대한 처리는 생략했음
  Vue.filter('newDate', function (value) {
    return new Date(value)
  })


  // 필터 대상인 날짜 객체의 'toLocaleString'를 호출해 문자열로 변환
  // 필터 대상이 Date 클래스의 인스턴스가 아닌 경우, 오류 메시지를 노출함
  Vue.filter('toLocaleString', function (value) {
    return 'Date' == value.constructor.name ? value.toLocaleString() : 'Invalid Filtering'
  })

  var tableVueData = {
    pages: [],
    selectedPageIndex: 0,
    itemsInPage: 10 // 한 페이지에 보여지는 컨텐츠 수
  }

  var tableVue = new Vue({
    el: '#table_container',
    data: tableVueData
  })

  // 캐스트 목록을 불러온다.
  getCasts(
    function /* onDone */(data) {

      // 정렬을 위한 키를 추가
      data.Items.forEach(function (item) {
        item.time = new Date(item.createdAt).getTime()
      })

      // 정렬
      data.Items = data.Items.sort(sortByTimeDesc)

      // 렌더링
      tableVueData.pages = paginate(data.Items, tableVueData.itemsInPage)
    },
    function /* onFail */() {
      console.error('잘못된 요청입니다.')
    })
}); // document.ready_end
