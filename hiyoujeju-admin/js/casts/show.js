$(document).ready(function () {
  function getId () {
    var idString = window.location.search.substring(1)
    var tempArray = idString.split('=')
    return tempArray[1]
  }

  function renderBrief (brief) {
    $('.brief').append(brief)
  }

  function renderThumbnail (thumbnail) {
    $('.thumbnail').append(thumbnail)
    $('.thumb_img').attr('src', thumbnail)
  }

  windowHeight()

  var id = getId('id')

  // 정의된 'id'가 없을 경우, 페이지를 벗어난다.
  if (!id) {
    goToIndex()
    console.error("쿼리스트링 파라미터 'id'가 필요합니다.")
    return
  }

  // 정의된 'id'에 해당하는 캐스트를 불러온다.
  getCast(
    id,
    function /* onDone */(data) {
      renderBrief(data.brief)
      renderThumbnail(data.thumbnail)
    },
    function /* onFail */() {
      goToIndex
      console.error("잘못된 'id'에 대한 요청입니다.")
    }
  )

  $('.btn_delete').click(function /* onClick */ () {
    // 정의된 'id'에 해당하는 캐스트를 삭제한다.
    deleteCast(
      id,
      goToIndex /* onDone */,
      function /* onFail */ () {
        console.error("잘못된 'id'에 대한 요청입니다.")
      })
      return false;
  })
})
