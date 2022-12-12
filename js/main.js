$(document).ready(function(){


  // Const helper
    const select = (e) => document.querySelector(e);
    const selectAll = (e) => document.querySelectorAll(e);


    // Add Gsap plugins
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);


    function smoothScroll(){
        let smoother = ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            //normalizeScroll: true,
            smooth: 1.2,   // seconds it takes to "catch up" to native scroll position
            effects: true // look for data-speed and data-lag attributes on elements and animate accordingly
        });

        smoother.scrollTo(0);

        gsap.utils.toArray('.scroll-to').forEach(link => {
            const target = link.getAttribute('href');
            link.addEventListener('click', (e) => {
                e.preventDefault();
                smoother.scrollTo(target, true, "top top")
            });
        });
    }

    function navigation(){
        $(window).scroll(function() {    
          var scroll = $(window).scrollTop();
            //var docHeight = $(window).height();
            if (scroll >= 100) {
                $(".main-nav").addClass("change-it");
                $('.c-scroll-indicator').addClass('scrolled');
                $("body").removeClass("menu-open-nav");
                $(".navigation > li").removeClass("menu-hovered");
                $("body").css("background-color","#fff");
            } else {
                $(".main-nav").removeClass("change-it");
                 $('.c-scroll-indicator').removeClass('scrolled');
                $(".main-nav").removeClass("menu-opened");
            }
        });
    }


    function accordions(){
        //$('.accordion > li:first-child').addClass('active').find('.accordion-item').show();
        $('.accordion li > a').click(function(j) {
            var dropDown = $(this).parent().closest('li').find('.accordion-item');
            // This closes the siblings
            $(this).closest('.accordion').find('.accordion-item').not(dropDown).slideUp();
            if ($(this).parent().hasClass('active')) {
                $(this).parent().removeClass('active');
            } else {
                // This closes the siblings
                $(this).closest('.accordion').parent().find('.active').removeClass('active');
                $(this).parent().addClass('active');
            }
            dropDown.stop(false, true).slideToggle();
            event.preventDefault();

        });

        if ($('.accordion-container').hasClass('accordion-container')){
            setTimeout(function(){ 
                //ScrollTrigger.refresh();
            }, 400);
        }

    }

    ///////// BARBA.JS /////////

    // Vars
    const body = document.querySelector('body');


    // Barba trigger only before ajax click
    barba.hooks.before ((data) => {
        const background = data.current.container.dataset.background;
        body.style.setProperty('background-color', background);
    });





    // Barba hooks 
    barba.hooks.beforeOnce(() => {

    });


    barba.hooks.enter((data) => {
        var el = document.querySelector('.ajax-load-more-wrap');
        ajaxloadmore.start(el);
    });


    barba.hooks.beforeLeave((data) => {
        //ScrollTrigger.getById("s1").kill();
        
        $('.main-nav-mobile').removeClass('menu-opened-mobile');
        $('.main-nav').removeClass('change-it');



        $('.menu-item-has-children').removeClass('menu-hovered');
        
        $('body').removeClass('body-menu-opened-mobile');
        $('body').removeClass('menu-open-nav');
        $('body').addClass('barba-leaving');

        $('body').removeClass('page-transitioned');
        
    });


    barba.hooks.afterLeave(() => {

        
    });


    barba.hooks.beforeEnter((data) => {
        $('body').removeClass('barba-leaving');

        const navs = $(data.next.html).find('[data-barba-update]') // New ones
        $('[data-barba-update]').each((i,el) => $(el).html($(navs[i]).html())) // Replace each old ones

        smoothScroll();
        navigation();
        setTimeout(() => {
            accordions();
        }, 500);
        
        // Set <body> classes for "next" page
        var nextHtml = data.next.html;
        var response = nextHtml.replace(/(<\/?)body( .+?)?>/gi, '$1notbody$2>', nextHtml)
        var bodyClasses = $(response).filter('notbody').attr('class')
        $("body").attr("class", bodyClasses);

    });






    barba.hooks.afterEnter((data) => {
        $('body').addClass('page-transitioned');
       
    });

    // Barba trigger only after ajax click
    barba.hooks.enter((data) => {
        //ga('set', 'page', window.location.pathname);
        //ga('send', 'pageview');
    });

    // Add Barba plugins
    barba.use(barbaCss);

    // init Barba
    barba.init({
    views: [
        {
            namespace: 'home',
            beforeEnter (data){
                setTimeout(() => {
                    
                }, 300);
                
            },
            afterEnter (data){
               
            }
        }
    ],

    debug: true,
    timeout: 5000,
      transitions: [
        {
          name: 'fade',
          //sync: true,
          //to: {
          //  namespace: ['about']
          //},
          beforeOnce(){
            //console.log('beforeOnce')
          },
          once(){},
          afterOnce(){
            //console.log('afterOnce')
          },
          leave(){
            //console.log('leave')
          },
          enter(){
            //console.log('enter')
          },
         

        }
      ],

    });


});