$(document).ready(function () {
    $(document).on('scroll',function () {
        var $scrollPage = $(document).scrollTop();
        if($scrollPage >= 600){
            $("#nav-bar").css({'position':'fixed','top':'73px','bottom':'auto'});
        } else if ($scrollPage <=599){
            if($("body").hasClass('news-mod')){
                $("#nav-bar").css({'position':'fixed','top':'73px','bottom':'auto'});
            } else {
                $("#nav-bar").css({'position':'absolute','top':'auto','bottom':'0'});
            }
        }
    });
    $(window).on("load",function(){
        $(".gubarev-accost__text__wrapper").mCustomScrollbar({
            theme:"my-red"
        });
        $(".biography__content__point").mCustomScrollbar({
            theme:"my-blue"
        });
        $(".pop-up__deputats__right__content").mCustomScrollbar({
            theme:"my-blue"
        });
    });
    var $tabs = $(".btn-tabs");
    var $tabsContent = $(".biography__content__point");
    var $tabsNews = $(".biography__news");
    $tabs.on('click',function () {
        var $indexTabs = $($tabs).index(this);
        $tabs.removeClass('active');
        $tabsContent.removeClass('active');
        $tabsNews.removeClass('active');
        $tabs.eq($indexTabs).addClass('active');
        $tabsContent.eq($indexTabs).addClass('active');
        $tabsNews.eq($indexTabs).addClass('active');
    })
    var $newsBlog = $(".news-blog__header h2");
    $newsBlog.on('click',function () {
        if($newsBlog.index(this) == 0){
            $newsBlog.removeClass('active');
            $newsBlog.eq(0).addClass('active');
            $(".news-blog__body.news").css('display','flex');
            $(".news-blog__body.blog").css('display','none');
            $("#refresh__news").css('display','block');
            $("#refresh__blog").css('display','none');
        } else if ($newsBlog.index(this) == 2){
            $newsBlog.removeClass('active');
            $newsBlog.eq(2).addClass('active');
            $(".news-blog__body.news").css('display','none');
            $(".news-blog__body.blog").css('display','flex');
            $("#refresh__news").css('display','none');
            $("#refresh__blog").css('display','block');
        }
    })
    var $navMenu = $("#nav-bar");
    var $link = $navMenu.find('a');
    var $mobilCollapser = $('#mobil-menu input');
    var $mobilLinks = $('#mobil-menu a');
    $mobilLinks.on('click',function () {
        $mobilCollapser.prop('checked',false);
        var $linkHrefMob = $(this).attr("href");
        var $linkToMob = $($linkHrefMob).offset().top;
        $('html').animate({ scrollTop: $linkToMob - 160}, 1100);
        return false;
    });
    $link.click(function () {
        var $linkHref = $(this).attr("href");
        var $linkTo = $($linkHref).offset().top;
        $link.removeClass('active');
        $(this).addClass('active');
        $('html').animate({ scrollTop: $linkTo - 110}, 1100);
        return false;
    });
    var $quoteRadio = $(".quote__radio__imitation");
    var $quoteText = $(".quote__text p");
    var $quoteCount = 0;
    $quoteRadio.on('click',function () {
        $radioIndex = $quoteRadio.index(this);
        var $quoteOld = $('.quote__text :visible');
        $quoteRadio.removeClass('active');
        $quoteRadio.eq($radioIndex).addClass('active');
        $quoteOld.stop();
        $quoteOld.animate({'position':'absolute','right':'-300px','opacity':'0'},400,function () {
            $quoteOld.css('display','none');
            $quoteText.eq($radioIndex).css({'display':'block','right':'-300px'});
            $quoteText.eq($radioIndex).animate({'position':'relative','right':'0','opacity':'1'},400);
        });
    });
    setInterval(quoteAuto,15000);
    function quoteAuto() {
    var $quoteOld = $('.quote__text :visible');
    $quoteRadio.removeClass('active');
    $quoteRadio.eq($quoteCount).addClass('active');
    $quoteOld.stop();
    $quoteOld.animate({'position':'absolute','right':'-300px','opacity':'0'},400,function () {
        $quoteOld.css('display','none');
        $quoteText.eq($quoteCount).css({'display':'block','right':'-300px'});
        $quoteText.eq($quoteCount).animate({'position':'relative','right':'0','opacity':'1'},400);
    });
    if($quoteCount <= 1){
        $quoteCount++;
    } else {
        $quoteCount = 0;
    }
}
    var $popUp = $("#pop-up");
    // var $popUpNews = $("#pop-up .pop-up__news");
    var $popUpDeputat = $("#pop-up .pop-up__deputats");
    var $popUpCallBack = $("#pop-up .pop-up__call-back");
    var $callPopUp = $("[data-pop-up]");//атрибут для клик события
    $callPopUp.on('click',function () {
        var $eventObject = $(this);
        showPopUp($eventObject);
    })
    function showPopUp($eventObject) {
        var $type = $($eventObject).attr('data-pop-up');//тип попапа
        var $closeBtn = $(".btn-close");
        if($type != 'body-call-back' && $type != 'header-call-back'){
            var $eventData = $($eventObject).attr('data-targets'); //если не call-back то записываем второй атрибут с индификатором
        }
        $popUp.css('display','block');
        if($type == 'header-call-back' || $type == 'body-call-back'){
            selectPopUp($popUpCallBack,'none');
        } else if ($type == 'news' || $type == 'blog'){
            // selectPopUp($popUpNews,'none');
            $popUp.css('display','none');
        } else if ($type == 'deputat'){
            selectPopUp($popUpDeputat ,$eventData);
        } //блок проверки типа попапа
        function selectPopUp($typePop,$dataPop) {
            var $tempScrol = 0;
            var $tempScroll = false;
            if($dataPop != 'none'){
                $typePop.filter('.' + $dataPop).css('display','block');
            } else {
                $typePop.css('display','block');
            }
            if($typePop.outerHeight() > window.outerHeight){
                $tempScrol = $(document).scrollTop();
                $(document).on('scroll',function () {
                    $typePop.css('top',-($(document).scrollTop() - $tempScrol));
                    $tempScroll = true;
                    if($(document).scrollTop() >= $(document).outerHeight() - window.outerHeight){
                        $(document).scrollTop($(document).scrollTop() - 1);
                        $tempScrol -= 15;
                    }
                })
            }
            $closeBtn.on('click',function () {
                closePopUp();
            })
            $('.pop-up__closed').on('click',function () {
                closePopUp()
            })
            function closePopUp() {
                $typePop.css('display','none');
                $popUp.css('display','none');
                $closeBtn.off();
                $(document).off();
                $popUp.off();
            }
        }
    }
    var $akaredeon = $(".program__body__point");
    $akaredeon.on('click',function () {
        if($(this).hasClass('active')){
            $akaredeon.removeClass('active');
            $akaredeon.find(".program__body__point__body").animate({'height':'0'}, 300);
        } else {
            $akaredeon.removeClass('active');
            $akaredeon.find(".program__body__point__body").animate({'height':'0'}, 300);
            $(this).addClass('active');
            $(this).find(".program__body__point__body").animate({'height':$(this).find('.program__body__point__body__wrapp').outerHeight() + 30}, 300);
        }
    })
})
