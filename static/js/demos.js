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
    var $animThumb1 = $('#aniimated-thumbnials1');
    if ($animThumb1.length) {
        $animThumb1.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb1[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb2 = $('#aniimated-thumbnials2');
    if ($animThumb2.length) {
        $animThumb2.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb2[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb3 = $('#aniimated-thumbnials3');
    if ($animThumb3.length) {
        $animThumb3.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb3[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb4 = $('#aniimated-thumbnials4');
    if ($animThumb4.length) {
        $animThumb4.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb4[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb5 = $('#aniimated-thumbnials5');
    if ($animThumb5.length) {
        $animThumb5.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb5[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb6 = $('#aniimated-thumbnials6');
    if ($animThumb6.length) {
        $animThumb6.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb6[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb7 = $('#aniimated-thumbnials7');
    if ($animThumb7.length) {
        $animThumb7.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb7[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb8 = $('#aniimated-thumbnials8');
    if ($animThumb8.length) {
        $animThumb8.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb8[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb9 = $('#aniimated-thumbnials9');
    if ($animThumb9.length) {
        $animThumb9.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb9[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb10 = $('#aniimated-thumbnials10');
    if ($animThumb10.length) {
        $animThumb10.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb10[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb11 = $('#aniimated-thumbnials11');
    if ($animThumb11.length) {
        $animThumb11.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb11[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb12 = $('#aniimated-thumbnials12');
    if ($animThumb12.length) {
        $animThumb12.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb12[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb13 = $('#aniimated-thumbnials13');
    if ($animThumb13.length) {
        $animThumb13.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb13[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb14 = $('#aniimated-thumbnials14');
    if ($animThumb14.length) {
        $animThumb14.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb14[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb15 = $('#aniimated-thumbnials15');
    if ($animThumb15.length) {
        $animThumb15.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb15[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb16 = $('#aniimated-thumbnials16');
    if ($animThumb16.length) {
        $animThumb16.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb16[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb17 = $('#aniimated-thumbnials17');
    if ($animThumb17.length) {
        $animThumb17.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb17[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb18 = $('#aniimated-thumbnials18');
    if ($animThumb18.length) {
        $animThumb18.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb18[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb19 = $('#aniimated-thumbnials19');
    if ($animThumb19.length) {
        $animThumb19.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb19[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb20 = $('#aniimated-thumbnials20');
    if ($animThumb20.length) {
        $animThumb20.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb20[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb21 = $('#aniimated-thumbnials21');
    if ($animThumb21.length) {
        $animThumb21.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb21[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb22 = $('#aniimated-thumbnials22');
    if ($animThumb22.length) {
        $animThumb22.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb22[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb23 = $('#aniimated-thumbnials23');
    if ($animThumb23.length) {
        $animThumb23.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb23[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb24 = $('#aniimated-thumbnials24');
    if ($animThumb24.length) {
        $animThumb24.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb24[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb25 = $('#aniimated-thumbnials25');
    if ($animThumb25.length) {
        $animThumb25.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb25[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb26 = $('#aniimated-thumbnials26');
    if ($animThumb26.length) {
        $animThumb26.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb26[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb27 = $('#aniimated-thumbnials27');
    if ($animThumb27.length) {
        $animThumb27.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb27[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb28 = $('#aniimated-thumbnials28');
    if ($animThumb28.length) {
        $animThumb28.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb28[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb29 = $('#aniimated-thumbnials29');
    if ($animThumb29.length) {
        $animThumb29.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb29[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb30 = $('#aniimated-thumbnials30');
    if ($animThumb30.length) {
        $animThumb30.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb30[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb31 = $('#aniimated-thumbnials31');
    if ($animThumb31.length) {
        $animThumb31.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb31[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb32 = $('#aniimated-thumbnials32');
    if ($animThumb32.length) {
        $animThumb32.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb32[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb33 = $('#aniimated-thumbnials33');
    if ($animThumb33.length) {
        $animThumb33.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb33[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb34 = $('#aniimated-thumbnials34');
    if ($animThumb34.length) {
        $animThumb34.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb34[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb35 = $('#aniimated-thumbnials35');
    if ($animThumb35.length) {
        $animThumb35.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb35[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb36 = $('#aniimated-thumbnials36');
    if ($animThumb36.length) {
        $animThumb36.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb36[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb37 = $('#aniimated-thumbnials37');
    if ($animThumb37.length) {
        $animThumb37.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb37[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb38 = $('#aniimated-thumbnials38');
    if ($animThumb38.length) {
        $animThumb38.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb38[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb39 = $('#aniimated-thumbnials39');
    if ($animThumb39.length) {
        $animThumb39.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb39[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb40 = $('#aniimated-thumbnials40');
    if ($animThumb40.length) {
        $animThumb40.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb40[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb41 = $('#aniimated-thumbnials41');
    if ($animThumb41.length) {
        $animThumb41.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb41[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb42 = $('#aniimated-thumbnials42');
    if ($animThumb42.length) {
        $animThumb42.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb42[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb43 = $('#aniimated-thumbnials43');
    if ($animThumb43.length) {
        $animThumb43.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb43[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb44 = $('#aniimated-thumbnials44');
    if ($animThumb44.length) {
        $animThumb44.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb44[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb45 = $('#aniimated-thumbnials45');
    if ($animThumb45.length) {
        $animThumb45.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb45[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb46 = $('#aniimated-thumbnials46');
    if ($animThumb46.length) {
        $animThumb46.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb46[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb47 = $('#aniimated-thumbnials47');
    if ($animThumb47.length) {
        $animThumb47.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb47[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb48 = $('#aniimated-thumbnials48');
    if ($animThumb48.length) {
        $animThumb48.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb48[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb49 = $('#aniimated-thumbnials49');
    if ($animThumb49.length) {
        $animThumb49.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb49[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb50 = $('#aniimated-thumbnials50');
    if ($animThumb50.length) {
        $animThumb50.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb50[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb51 = $('#aniimated-thumbnials51');
    if ($animThumb51.length) {
        $animThumb51.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb51[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb52 = $('#aniimated-thumbnials52');
    if ($animThumb52.length) {
        $animThumb52.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb52[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb53 = $('#aniimated-thumbnials53');
    if ($animThumb53.length) {
        $animThumb53.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb53[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb54 = $('#aniimated-thumbnials54');
    if ($animThumb54.length) {
        $animThumb54.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb54[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb55 = $('#aniimated-thumbnials55');
    if ($animThumb55.length) {
        $animThumb55.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb55[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb56 = $('#aniimated-thumbnials56');
    if ($animThumb56.length) {
        $animThumb56.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb56[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb57 = $('#aniimated-thumbnials57');
    if ($animThumb57.length) {
        $animThumb57.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb57[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb58 = $('#aniimated-thumbnials58');
    if ($animThumb58.length) {
        $animThumb58.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb58[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb59 = $('#aniimated-thumbnials59');
    if ($animThumb59.length) {
        $animThumb59.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb59[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb60 = $('#aniimated-thumbnials60');
    if ($animThumb60.length) {
        $animThumb60.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb60[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb61 = $('#aniimated-thumbnials61');
    if ($animThumb61.length) {
        $animThumb61.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb61[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb62 = $('#aniimated-thumbnials62');
    if ($animThumb62.length) {
        $animThumb62.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb62[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb63 = $('#aniimated-thumbnials63');
    if ($animThumb63.length) {
        $animThumb63.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb63[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb64 = $('#aniimated-thumbnials64');
    if ($animThumb64.length) {
        $animThumb64.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb64[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb65 = $('#aniimated-thumbnials65');
    if ($animThumb65.length) {
        $animThumb65.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb65[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb66 = $('#aniimated-thumbnials66');
    if ($animThumb66.length) {
        $animThumb66.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb66[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb67 = $('#aniimated-thumbnials67');
    if ($animThumb67.length) {
        $animThumb67.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb67[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb68 = $('#aniimated-thumbnials68');
    if ($animThumb68.length) {
        $animThumb68.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb68[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb69 = $('#aniimated-thumbnials69');
    if ($animThumb69.length) {
        $animThumb69.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb69[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb70 = $('#aniimated-thumbnials70');
    if ($animThumb70.length) {
        $animThumb70.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb70[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb71 = $('#aniimated-thumbnials71');
    if ($animThumb71.length) {
        $animThumb71.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb71[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb72 = $('#aniimated-thumbnials72');
    if ($animThumb72.length) {
        $animThumb72.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb72[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb73 = $('#aniimated-thumbnials73');
    if ($animThumb73.length) {
        $animThumb73.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb73[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb74 = $('#aniimated-thumbnials74');
    if ($animThumb74.length) {
        $animThumb74.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb74[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb75 = $('#aniimated-thumbnials75');
    if ($animThumb75.length) {
        $animThumb75.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb75[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb76 = $('#aniimated-thumbnials76');
    if ($animThumb76.length) {
        $animThumb76.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb76[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb77 = $('#aniimated-thumbnials77');
    if ($animThumb77.length) {
        $animThumb77.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb77[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb78 = $('#aniimated-thumbnials78');
    if ($animThumb78.length) {
        $animThumb78.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb78[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb79 = $('#aniimated-thumbnials79');
    if ($animThumb79.length) {
        $animThumb79.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb79[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb80 = $('#aniimated-thumbnials80');
    if ($animThumb80.length) {
        $animThumb80.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb80[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb81 = $('#aniimated-thumbnials81');
    if ($animThumb81.length) {
        $animThumb81.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb81[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb82 = $('#aniimated-thumbnials82');
    if ($animThumb82.length) {
        $animThumb82.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb82[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb83 = $('#aniimated-thumbnials83');
    if ($animThumb83.length) {
        $animThumb83.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb83[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb84 = $('#aniimated-thumbnials84');
    if ($animThumb84.length) {
        $animThumb84.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb84[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb85 = $('#aniimated-thumbnials85');
    if ($animThumb85.length) {
        $animThumb85.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb85[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb86 = $('#aniimated-thumbnials86');
    if ($animThumb86.length) {
        $animThumb86.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb86[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb87 = $('#aniimated-thumbnials87');
    if ($animThumb87.length) {
        $animThumb87.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb87[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb88 = $('#aniimated-thumbnials88');
    if ($animThumb88.length) {
        $animThumb88.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb88[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb89 = $('#aniimated-thumbnials89');
    if ($animThumb89.length) {
        $animThumb89.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb89[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb90 = $('#aniimated-thumbnials90');
    if ($animThumb90.length) {
        $animThumb90.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb90[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb91 = $('#aniimated-thumbnials91');
    if ($animThumb91.length) {
        $animThumb91.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb91[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb92 = $('#aniimated-thumbnials92');
    if ($animThumb92.length) {
        $animThumb92.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb92[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb93 = $('#aniimated-thumbnials93');
    if ($animThumb93.length) {
        $animThumb93.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb93[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb94 = $('#aniimated-thumbnials94');
    if ($animThumb94.length) {
        $animThumb94.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb94[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb95 = $('#aniimated-thumbnials95');
    if ($animThumb95.length) {
        $animThumb95.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb95[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb96 = $('#aniimated-thumbnials96');
    if ($animThumb96.length) {
        $animThumb96.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb96[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb97 = $('#aniimated-thumbnials97');
    if ($animThumb97.length) {
        $animThumb97.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb97[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb98 = $('#aniimated-thumbnials98');
    if ($animThumb98.length) {
        $animThumb98.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb98[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb99 = $('#aniimated-thumbnials99');
    if ($animThumb99.length) {
        $animThumb99.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb99[0], {
                thumbnail: true
            });
        });
    };


    // Animated thumbnails
    var $animThumb100 = $('#aniimated-thumbnials100');
    if ($animThumb100.length) {
        $animThumb100.justifiedGallery({
            border: 6
        }).on('jg.complete', function() {
            lightGallery($animThumb100[0], {
                thumbnail: true
            });
        });
    };
