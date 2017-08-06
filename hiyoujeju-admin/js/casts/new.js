$(document).ready(function () {
  function getData () {
    return {
      brief: $('.brief').val(),
      thumbnail: $('.thumbnail').val()
    }
  }

  windowHeight()

  $('.btn_save').click(function /* onClick */(event) {
    event.preventDefault()

    var data = getData()

    // 새 캐스트를 만든다.
    createCast(
      JSON.stringify(data),
      goToIndex /* onDone*/,
      function /* onFail */ () {
        console.error('잘못된 요청입니다.')
      })

    return false
  })
})
