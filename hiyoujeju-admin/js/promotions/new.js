$(document).ready(function () {
    windowHeight();

    function getData () {
        return {
            status: $('#status option:selected').val(),
            banner: $('.banner').val()
        }
    }

    $('.btn_save').click(function /* onClick */ (event) {
        event.preventDefault();

        var data = getData()

        // 새 프로모션을 만듬.
        createPromotion(
            JSON.stringify(data),
            goToIndex() /* onDone */,
            function /* onFail */ () {
                console.error('잘못된 요청입니다.')
            })

        return false
    })
})
