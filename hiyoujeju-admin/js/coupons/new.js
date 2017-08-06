$(document).ready(function () {
    windowHeight();

    function getData () {
        var priceTable = {};
        var a_ori_price = $('.a_ori_price').val();
        var a_dis_price = $('.a_dis_price').val();
        var y_ori_price = $('.y_ori_price').val();
        var y_dis_price = $('.y_dis_price').val();
        var c_ori_price = $('.c_ori_price').val();
        var c_dis_price = $('.c_dis_price').val();
        priceTable.adult = {"originalPriceKrw":a_ori_price,"discountedPriceKrw":a_dis_price};
        priceTable.youth = {"originalPriceKrw":y_ori_price,"discountedPriceKrw":y_dis_price};
        priceTable.child = {"originalPriceKrw":c_ori_price,"discountedPriceKrw":c_dis_price};

        var tags = [];
        $('.tags_box :checked').each(function(){
            tags.push($(this).val());
        });

        return {
            webUrl: $('.webUrl').val(),
            thumbnail: $('.thumbnail').val(),
            priceTable: priceTable,
            name: $('.name').val(),
            tags : tags
        }
    }

    $('.btn_save').click(function /* onClick */ (event) {
        event.preventDefault();

        var data = getData();
        console.log(JSON.stringify(data));
        // 새 쿠폰을 만듬.
        createCoupon(
            JSON.stringify(data),
            goToIndex() /* onDone */,
            function /* onFail */ () {
                console.error('잘못된 요청입니다.')
            });

        return false
    })
})
