$(document).ready(function() {

    window.prettyPrint && prettyPrint()

    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };

    //thumbnails without animation
    var $thumb = $('#thumbnials-without-animation');
    if ($thumb.length) {
        $thumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($thumb[0], {
                thumbnail: true,
                animateThumb: false,
                showThumbByDefault: false
            });
        });
    };


    // Fixed size
    lightGallery(document.getElementById('fixed-size'), {
        width: '700px',
        height: '470px',
        mode: 'lg-fade',
        addClass: 'fixed-size',
        counter: false,
        download: false,
        startClass: '',
        enableSwipe: false,
        enableDrag: false,
        speed: 500
    });

    lightGallery($('#html5-videos')[0], {
        thumbnail: false
    });

    lightGallery($('#html5-videos-videojs')[0], {
        videojs: true
    });

    lightGallery($('#videos')[0]);
    lightGallery($('#videos-without-poster')[0]);
    lightGallery($('#video-player-param')[0], {
        youtubePlayerParams: {
            modestbranding: 1,
            showinfo: 0,
            rel: 0,
            controls: 0
        },
        vimeoPlayerParams: {
            byline: 0,
            portrait: 0,
            color: 'A90707'
        }
    });

    lightGallery($('#video-thumbnails')[0], {
        loadYoutubeThumbnail: true,
        youtubeThumbSize: 'default',
        loadVimeoThumbnail: true,
        vimeoThumbSize: 'thumbnail_medium'
    });

    if (document.getElementById('dynamic')) {
        document.getElementById('dynamic').addEventListener('click', function() {
            lightGallery(document.getElementById('dynamic'), {
                dynamic: true,
                dynamicEl: [{
                    src: '../static/img/1.jpg',
                    thumb: '../static/img/thumb-1.jpg',
                    subHtml: '<h4>Fading Light</h4><p>Classic view from Rigwood Jetty on Coniston Water an old archive shot similar to an old post but a little later on.</p>'
                }, {
                    src: '../static/img/2.jpg',
                    thumb: '../static/img/thumb-2.jpg',
                    subHtml: '<h4>Bowness Bay</h4><p>A beautiful Sunrise this morning taken En-route to Keswick not one as planned but I\'m extremely happy I was passing the right place at the right time....</p>'
                }, {
                    src: '../static/img/13.jpg',
                    thumb: '../static/img/thumb-13.jpg',
                    subHtml: '<h4>Sunset Serenity</h4><p>A gorgeous Sunset tonight captured at Coniston Water....</p>'
                }, {
                    src: '../static/img/3.jpg',
                    thumb: '../static/img/thumb-3.jpg',
                    subHtml: '<h4>Coniston Calmness</h4><p>Beautiful morning</p>'
                }]
            })
        });
    }


    function customTransitions(trans) {
        lightGallery($('#custom-transitions')[0], {
            mode: trans
        });
    }

    customTransitions('lg-slide');

    $('#select-trans').on('change', function() {
        window.lgData[$('#custom-transitions').attr('lg-uid')].destroy(true);
        customTransitions($(this).val());
    });

    function customEasing(ease) {
        lightGallery($('#custom-easing')[0], {
            cssEasing: ease
        });
    }

    customEasing('cubic-bezier(0.680, -0.550, 0.265, 1.550)');

    $('#select-ease').on('change', function() {

        var val = $(this).val();
        prompt('You can copy cubic-bezier from here', val);

        window.lgData[$('#custom-easing').attr('lg-uid')].destroy(true);
        customEasing('cubic-bezier(' + val + ')');
    });

    // Custom events
    var $customEvents = $('#custom-events');
    if ($customEvents.length) {
        lightGallery($customEvents[0]);

        var colours = ['rgb(33, 23, 26)', 'rgb(129, 87, 94)', 'rgb(156, 80, 67)', 'rgb(143, 101, 93)'];
        $customEvents[0].addEventListener('onBeforeSlide', function(event) {
            document.querySelector('.lg-outer').style.backgroundColor =  colours[event.detail.index];
        });
    }


    // Responsive images
    lightGallery(document.getElementById('responsive-images'));
    lightGallery(document.getElementById('srcset-images'));

    // methods
    var $methods = document.getElementById('methods');
    var $appendSlide = document.getElementById('appendSlide');
    if ($methods && $appendSlide) {
        var slide = '<li class="col-xs-6 col-sm-4 col-md-3" data-src="../static/img/4.jpg">' +
            '<a href="">' +
            '<img class="img-responsive" src="../static/img/thumb-4.jpg">' +
            '<div class="demo-gallery-poster">' +
            '<img src="../static/img/zoom.png">' +
            '</div>' +
            '</a>' +
            '</li>';
        lightGallery($methods);
        $appendSlide.addEventListener('click', function() {
            $methods.insertAdjacentHTML('beforeend', slide);
            window.lgData[$methods.getAttribute('lg-uid')].destroy(true);
            lightGallery($methods);
        }, false);
    }

    // iframe
    lightGallery(document.getElementById('open-website'), {
        selector: 'this'
    });

    // Google map
    lightGallery(document.getElementById('google-map'), {
        selector: 'this',
        iframeMaxWidth: '80%'
    });

    lightGallery(document.getElementById('captions'));
    lightGallery(document.getElementById('relative-caption'), {
        subHtmlSelectorRelative: true
    });
    lightGallery(document.getElementById('hash'));
    lightGallery(document.getElementById('lg-share-demo'));

    var commentBox = document.getElementById('comment-box');
    if (commentBox) {
        lightGallery(commentBox, {
            appendSubHtmlTo: '.lg-item',
            addClass: 'fb-comments',
            mode: 'lg-fade',
            download: false,
            enableDrag: false,
            enableSwipe: false
        });
        commentBox.addEventListener('onAfterSlide', function(event) {
            var items = document.querySelectorAll('.lg-outer .lg-item');
            if (!items[event.detail.index].getAttribute('data-fb')) {
                try {
                    items[event.detail.index].setAttribute('data-fb', 'loaded');
                    FB.XFBML.parse();
                } catch (err) {
                    window.addEventListener('fbAsyncInit', function() {
                        items[event.detail.index].setAttribute('data-fb', 'loaded');
                        FB.XFBML.parse();
                    });
                }
            }
        });
    }

    var commentBoxSep = document.getElementById('comment-box-sep');
    if (commentBoxSep) {
        lightGallery(commentBoxSep, {
            addClass: 'fb-comments',
            download: false,
            galleryId: 2
        });
        commentBoxSep.addEventListener('onAfterAppendSubHtml', function() {
            try {
                FB.XFBML.parse();
            } catch (err) {
                window.addEventListener('fbAsyncInit', function() {
                    FB.XFBML.parse();
                });
            }
        });
    }

});



    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials1');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials2');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials3');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials4');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials5');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials6');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials7');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials8');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials9');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials10');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials11');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials12');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials13');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials14');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials15');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials16');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials17');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials18');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials19');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials20');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials21');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials22');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials23');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials24');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials25');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials26');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials27');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials28');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials29');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials30');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials31');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials32');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials33');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials34');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials35');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials36');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials37');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials38');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials39');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials40');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials41');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials42');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials43');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials44');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials45');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials46');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials47');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials48');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials49');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials50');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials51');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials52');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials53');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials54');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials55');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials56');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials57');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials58');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials59');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials60');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials61');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials62');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials63');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials64');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials65');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials66');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials67');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials68');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials69');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials70');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials71');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials72');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials73');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials74');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials75');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials76');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials77');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials78');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials79');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials80');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials81');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials82');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials83');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials84');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials85');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials86');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials87');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials88');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials89');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials90');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials91');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials92');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials93');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials94');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials95');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials96');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials97');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials98');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials99');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb = $('#aniimated-thumbnials100');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb[0], {
                thumbnail: true
            });
        });
    };
