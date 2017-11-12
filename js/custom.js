jQuery(document).ready(function() {





    function resizeContentMobile() {
        var height = $(window).height() - 119;
        $('.slideResize').height(height);
    }
    resizeContentMobile();

    function resizeContent() {
        var height = $(window).height() - 159;
        $('.slideResize').height(height);
    }
    resizeContent();
    if ($(window).width() < 768) {
        resizeContentMobile();
    } else {
        resizeContent();
    }
    $(window).resize(function() {
        resizeContent();
        resizeContentMobile();
    });
    var owl = $('.owl-carousel.partnersLogoSlider');
    owl.owlCarousel({
        loop: true,
        margin: 28,
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: true,
        nav: true,
        dots: false,
        smartSpeed: 500,
        responsive: {
            320: {
                slideBy: 1,
                items: 1
            },
            768: {
                slideBy: 1,
                items: 3
            },
            992: {
                slideBy: 1,
                items: 4
            }
        }
    });
    $('.owl-carousel.partnersLogoSlider').owlCarousel({
        rtl: true
    });
    $('#myCarousel').carousel({
        interval: 3000,
        cycle: true
    });
    $(window).scroll(function() {
        if ($(this).scrollTop() > 10) {
            $('.backToTop').css('opacity', 1);
        } else {
            $('.backToTop').css('opacity', 0);
        }
    });

    $('a[href="#pageTop"]').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('html, body').animate({
            scrollTop: 0
        }, 1500);
        return false;
    });

    $('.scrolling  a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var target = $(this).attr('href');
        $(target).velocity('scroll', {
            duration: 800,
            offset: -150,
            easing: 'easeOutExpo',
            mobileHA: false
        });
    });

    $('#productSlider, #thubmnailTeamSlider').on('touchstart', function(event) {
        var xClick = event.originalEvent.touches[0].pageX;
        $(this).one('touchmove', function(event) {
            var xMove = event.originalEvent.touches[0].pageX;
            if (Math.floor(xClick - xMove) < -5) {
                $('#productSlider, #thubmnailTeamSlider').carousel('prev');
            } else if (Math.floor(xClick - xMove) > 5) {
                $('#productSlider, #thubmnailTeamSlider').carousel('next');
            }
        });
        $('.carousel').on('touchend', function() {
            $(this).off('touchmove');
        });
    });

    $('#thubmnailTeamSlider').carousel({
        interval: 3000
    });

    $('#thubmnailTeamSlider .item').each(function() {
        var itemToClone = $(this);
        for (var i = 1; i < 4; i++) {
            itemToClone = itemToClone.next();
            if (!itemToClone.length) {
                itemToClone = $(this).siblings(':first');
            }
            itemToClone.children(':first-child').clone().addClass('cloneditem-' + (i)).appendTo($(this));
        }
    });

    $('#singleServiceTab a').on('click', function(e) {
        e.preventDefault();
        $(this).tab('show');
        $('.nav-stacked li a i').addClass('fa-angle-down').removeClass('fa-angle-up');
        $(this).find('i').toggleClass('fa-angle-up fa-angle-down');
    });

    $('.nav-stacked li a').on('click', function() {
        $('.tabList').removeClass('active openTab');
        $(this).parent('.tabList').addClass('active openTab');
    });

    $('.nav-stacked li .dropdown-menu li a').on('click', function(e) {
        $('.tabList').removeClass('active openTab');
        $(this).closest('.nav-stacked li.tabList').addClass('active openTab');
    });

    $('.content-collapse li').on('click', function() {
        $(this).toggleClass('active').siblings().removeClass('active');
    });

    $('#angelContactForm').submit(function(e) {
        var contactdata = $(this).serializeArray();
        var submiturl = $(this).attr('action');
        var submitbtn = $('#contact-submit-btn');
        submitbtn.val('Sending...');
        $('#angelContactForm :input').prop('disabled', true);
        $.ajax({
            url: submiturl,
            type: 'POST',
            dataType: 'json',
            data: contactdata,
            success: function(response) {
                $('#alert').removeClass('alert alert-success');
                $('#alert').removeClass('alert alert-danger');
                if (response.status === 'true') {
                    $('#alert').addClass('alert alert-success');
                    $('#angelContactForm :input').prop('disabled', false);
                    $('#angelContactForm')[0].reset();
                    submitbtn.val('Send');
                } else {
                    $('#alert').addClass('alert alert-danger');
                    $('#angelContactForm :input').prop('disabled', false);
                    submitbtn.val('Send');
                }
                $('#alert').html(response.message).slideDown();
                window.setTimeout(function() {
                    $('#alert').alert('close');
                }, 3000);
            }
        });
        e.preventDefault();
    });

    $('#appoinmentModalForm').submit(function(e) {
        var contactdata = $(this).serializeArray();
        var submiturl = $(this).attr('action');
        var submitbtn = $('#appointment-submit-btn');
        submitbtn.val('Sending...');
        $('#appoinmentModalForm :input').prop('disabled', true);
        $.ajax({
            url: submiturl,
            type: 'POST',
            dataType: 'json',
            data: contactdata,
            success: function(response) {
                $('#appointment-alert').removeClass('alert alert-success');
                $('#appointment-alert').removeClass('alert alert-danger');
                if (response.status === 'true') {
                    $('#appointment-alert').addClass('alert alert-success');
                    $('#appoinmentModalForm :input').prop('disabled', false);
                    $('#appoinmentModalForm')[0].reset();
                    submitbtn.val('Send');
                } else {
                    $('#appointment-alert').addClass('alert alert-danger');
                    $('#appoinmentModalForm :input').prop('disabled', false);
                    submitbtn.val('Send');
                }
                $('#appointment-alert').html(response.message).slideDown();
                window.setTimeout(function() {
                    $('#appointment-alert').alert('close');
                }, 3000);
            }
        });
        e.preventDefault();
    });
});
