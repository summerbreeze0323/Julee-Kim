$(document).ready(function(){
    var showMenuItem = new ShowMenu(".menu_icon", ".menu_list", "left");

    var showSearchBar = new ShowMenu(".search_icon", ".search_area form input", "right");

    var moveSlider = new Slider(".slider_section .slider_container");
})

/* 메뉴아이콘 클릭시 메뉴아이템이 보이게 하고, 검색아이콘 클릭시 Input태그 보이게 하기 */
function ShowMenu(icon, moveItem, direction){
    this.$Icon = null;
    this.$box = null;
    this.direction = null;
    this.windowWidth = 0;

    this.init(icon, moveItem, direction);
    this.initEvent();
}

ShowMenu.prototype.init = function(icon, moveItem, direction){
    this.$Icon = $(icon);
    this.$box = $(moveItem);
    this.direction = direction;
    this.windowWidth = $(window).width();
}

ShowMenu.prototype.initEvent = function(){
    var objThis = this;

    this.$Icon.on("click", function(){
        objThis.toggleBox($(this), objThis.direction);
    })
}

ShowMenu.prototype.openBox = function($item, direction){
    var left = 0;

    $item.attr("data-extension", "open");

    $item.css({
        "background-image" : "url(../imgs/cancel.png)",
        "background-size" : "contain"
    });

    if(direction  == "left"){
        left = 0;
    }else{
        left = 15;
        $(".gnb").css("display", "none");

        if(this.windowWidth >= 768 && this.windowWidth <= 991) {
            left = 50;
        }

        if (this.windowWidth >= 992 && this.windowWidth < 3000) {
            var searchAreaWidth = this.windowWidth * (75/100);

            $(".search_area form").css("width", searchAreaWidth);

            left = 200;
        }
    }

    this.$box.stop().animate({
        opacity : 1,
        left : left
    }, 200);
}

ShowMenu.prototype.closeBox = function($item, direction){
    var outerWidth = 0;
    var width = 0;
    var backgroundImage = null;
    var bgSize = null;

    if (direction == "left"){
        width = -this.$box.outerWidth(true);
        backgroundImage = "url(../imgs/menu-btn.png)";
        bgSize = "cover";

    } else if(direction == "right") {
        outerWidth = this.$box.outerWidth(true);
        width = outerWidth;

        backgroundImage = "url(../imgs/search.png)";
        bgSize = "contain";
        $(".gnb").css("display", "block");

        $(".search_area form").css("width", 0);
    }

    $item.attr("data-extension", "close");

    $item.css({
        "background-image" : backgroundImage,
        "background-size" : bgSize
    });

    this.$box.stop().animate({
        opacity : 0,
        left : width
    }, 200);
}

ShowMenu.prototype.toggleBox = function($item, direction){
    if($item.attr("data-extension") == "open"){
        this.closeBox($item, direction);
    }else if($item.attr("data-extension") == "close"){
        this.openBox($item, direction);
    }
}

/* ---------- ALL COMEDY에서 화살표 버튼을 눌렀을 때 슬라이더 이미지 이동 --------- */
function Slider(container) {
    this.$sliderContainer = null;
    this.$moveItem = null;
    this.$leftBtn = null;
    this.$rightBtn = null;
    this.imgWidth = 0;
    this.moveItemOffset = 0;
    this.currentLeft = 0;
    this.numOfImgs = 3;

    this.init(container);
    this.initEvent();
    this.btnState();
}

Slider.prototype.init = function(container) {
    this.$sliderContainer = $(container);
    this.$moveItem = this.$sliderContainer.find("ul");
    this.$leftBtn = this.$sliderContainer.find(".slider_control_l .sl_con_left");
    this.$rightBtn = this.$sliderContainer.find(".slider_control_r .sl_con_right");

    this.imgWidth = this.$moveItem.find("li:first").outerWidth();
    this.moveItemOffset = parseInt(this.$moveItem.css("left"));
}

Slider.prototype.initEvent = function() {
    var objThis = this;

    this.$leftBtn.on("click", function() {
        objThis.moveToLeft();
    });

    this.$rightBtn.on("click", function() {
        objThis.moveToRight();
    });
}

Slider.prototype.moveSliderItem = function(direction) {
    var totalImgWidth = this.imgWidth * this.numOfImgs; // ul 총 길이
    var viewWidth = $(window).width();
    var lestWidth = (totalImgWidth - viewWidth) - Math.abs(this.currentLeft) + 15; // 15는 패딩값
//    console.log("lestWidth: "+ lestWidth);

    if(direction === "right") {
        if(lestWidth > this.imgWidth) {
            this.currentLeft -= this.imgWidth;
        }
        else {
            this.currentLeft -= lestWidth;
        }
    }

    if (direction === "left") {
        var numOfLeftImg = parseInt(Math.abs(this.currentLeft) / this.imgWidth);
        var passedImgSize = (Math.abs(this.currentLeft) % this.imgWidth);

        if (numOfLeftImg || passedImgSize) {
            if(passedImgSize === 0) {
                this.currentLeft += this.imgWidth;
            }
            else {
                this.currentLeft += passedImgSize;
            }
        }
    }

//    console.log("viewWidth: "+viewWidth);
//    console.log("this.currentLeft: "+this.currentLeft);

    this.$moveItem.stop().animate({left: this.currentLeft}, 500);

    // arrow button hide or show
    this.btnState();
}

Slider.prototype.moveToRight = function() {
    this.moveSliderItem("right");
}

Slider.prototype.moveToLeft = function() {
    this.moveSliderItem("left");
}

Slider.prototype.btnState = function() {
    var numOfLeftImg = parseInt(Math.abs(this.currentLeft) / this.imgWidth);
    var passedImgSize = (Math.abs(this.currentLeft) % this.imgWidth);

    if(numOfLeftImg || passedImgSize) {
        this.$leftBtn.removeClass("hide");
    } else {
        this.$leftBtn.addClass("hide");
    }

    if(passedImgSize) {
        this.$rightBtn.addClass("hide");
    } else {
        this.$rightBtn.removeClass("hide");
    }
}



