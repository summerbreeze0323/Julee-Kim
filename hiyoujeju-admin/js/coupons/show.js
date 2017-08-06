$(document).ready(function () {
  windowHeight();

  function getId () {
      var idString = window.location.search.substring(1);
      var tempArray = idString.split('=');
      return tempArray[1];
  }
  function renderText (webUrl, name) {
      $('.webUrl').append(webUrl);
      $('.name').append(name);
  }

  function renderTags (tags) {
      var str = "";
      for (var tag in tags) {
        str += tags[tag] + ', ';
      }

      var result = str.slice(0,-2);

      $('.tags').append(result);
  }

  function renderPrice (a_ori_price, a_dis_price, y_ori_price, y_dis_price, c_ori_price, c_dis_price) {
      $('.a_ori_price').append(a_ori_price);
      $('.a_dis_price').append(a_dis_price);
      $('.y_ori_price').append(y_ori_price);
      $('.y_dis_price').append(y_dis_price);
      $('.c_ori_price').append(c_ori_price);
      $('.c_dis_price').append(c_dis_price);
  }

  function renderThumbnail (thumbnail) {
      $('.thumbnail').append(thumbnail);
      $('.thumbnail_img').attr('src', thumbnail);
  }

  var id = getId('id');

  // 'id'가 없는 경우 페이지를 coupon list로 이동
  if (!id) {
      goToIndex;
      console.err("쿼리스트링 파라미터 'id'가 필요합니다.");
      return;
  }

  // 'id'에 해당하는 캐스트를 불러옴
  getCoupon(
      id,
      function /* onDone */ (data) {
          renderText(data.webUrl, data.name);
          renderTags(data.tags);
          renderPrice(data.priceTable.adult.originalPriceKrw, data.priceTable.adult.discountedPriceKrw,
              data.priceTable.youth.originalPriceKrw, data.priceTable.youth.discountedPriceKrw,
              data.priceTable.child.originalPriceKrw, data.priceTable.child.discountedPriceKrw);
          renderThumbnail(data.thumbnail);
      },
      function /* onFail */ () {
          goToIndex;
          console.error("잘못된 'id'에 대한 요청입니다.");
      }
  );

  $('.btn_delete').click(function () {
      deleteCoupon(
          id,
          goToIndex /* onDone */,
          function /* onFail */() {
              console.error("잘못된 'id'에 대한 요청입니다");
          }
      )
      return false
  });
}); // document.ready_end