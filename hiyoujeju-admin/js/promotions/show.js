$(document).ready(function () {
  windowHeight();

  function getId () {
      var idString = window.location.search.substring(1);
      var tempArray = idString.split('=');
      return tempArray[1];
  }
  function renderStatus (status) {
      $('.status').append(status);
  }

  function renderBanner (banner) {
      $('.banner').append(banner);
      $('.banner_img').attr('src', banner);
  }

  var id = getId('id');

  // 'id'가 없는 경우 페이지를 promotion list로 이동
  if (!id) {
      goToIndex;
      console.err("쿼리스트링 파라미터 'id'가 필요합니다.");
      return;
  }

  // 'id'에 해당하는 캐스트를 불러옴
  getPromotion(
      id,
      function /* onDone */ (data) {
          renderStatus(data.status);
          renderBanner(data.banner);
      },
      function /* onFail */ () {
          goToIndex;
          console.error("잘못된 'id'에 대한 요청입니다.");
      }
  );

  $('.btn_delete').click(function () {
      deletePromotion(
          id,
          goToIndex /* onDone */,
          function /* onFail */() {
              console.error("잘못된 'id'에 대한 요청입니다");
          }
      )
      return false
  });
}); // document.ready_end