
$(document).ready(function() {
    var lane1 = $('.lane1');
    var lane2 = $('.lane2');
    var lane3 = $('.lane3');
    var duckSpace = '15%';
    var ballSpeed = 350;
    var fadeSpeed = 600;
    var powSpeed = 100;


    function animateDuckForward(lane, time) {
        lane.children(':first').animate({
            'margin-left': duckSpace
        }, time, 'linear', function() {
            lane.children()
                .removeAttr('style')
                .last().prependTo(lane);
            animateDuckForward(lane, time);
        });
    }

    function animateDuckBackward(lane, time) {

        lane.children(':first').animate({
            'margin-left': '-' + duckSpace
        }, time, 'linear', function() {
            lane.children()
                .removeAttr('style')
                .first().appendTo(lane);
            animateDuckBackward(lane, time);
        });
    }

    function startGame() {
        animateDuckForward(lane1, 900);
        animateDuckBackward(lane2, 1000);
        animateDuckForward(lane3, 800);
    }


    function enableOnClick() {

        $('.container').on('click', function(e) {



            var offset = $(this).offset();
            var leftOffset = e.clientX - offset.left;
            var topOffset = e.clientY - offset.top;

            // var pos = $(this).position();
            // var leftPos = e.clientX - pos.left;
            // var topPos = e.clientY - pos.top;

            $('.onDeck').first() //.stop(true, false)
                .animate({
                    left: leftOffset - 25,
                    top: topOffset - 25
                }, ballSpeed, function() {

                    $(this).removeClass('onDeck');
                    // console.log(document.elementFromPoint(leftPos, topPos));
                    //'var element = $(document.elementFromPoint(leftPos, topPos));
                    var element = $(document.elementFromPoint(e.clientX, e.clientY));

                    // console.log('POSITION X: '+leftPos+', Y: '+topPos);
                    console.log('OFFSET   X: ' + e.clientY + ', Y: ' + e.clientY);

                    // var element = $(document.elementFromPoint(leftOffset+10, topOffset+10));
                    if (element.hasClass('duck')) { //if duck exists
                        element.addClass('clickDuck');

                        $('.pow').css({
                            left: leftOffset - 30,
                            top: topOffset - 30,
                            display: 'block'
                        }).delay(powSpeed).queue(function() {
                            $(this).removeAttr('style').dequeue();
                        });
                        $('.duckShaded').last().removeClass('duckShaded');
                    }

                    winOrLose();
                });

        });
    }

    function winOrLose() {
        var result = '';
        var duckLen = $('.clickDuck').length;
        var ballLen = $('.onDeck').length;
        if (duckLen >= 3) {
            result = 'W';
        } else if (ballLen === 0) {
            result = 'L';
        }

        if (result !== '') {
            var resultPage = $('.resultPage');
            resultPage.fadeIn(fadeSpeed);

            if (result == 'W') {
                resultPage.children('.resultWin').show();
            } else {
                resultPage.children('.resultLose').show();
            }
            $('.duck, .container').off();
        }
    }

    function resetGame() {
        $('.ball').addClass('onDeck').removeAttr('style');
        $('.duck').removeClass('clickDuck').removeAttr('style');
        $('.duckScore').addClass('duckShaded');
        $('.resultPage').fadeOut(function() {
            enableOnClick();
            $(this).children().removeAttr('style');
        });
    }

    $('.clickToBegin').on('click', function() {
        $(this).parent().fadeOut(fadeSpeed, function() {
            enableOnClick();
        });
        startGame();
    });

    $('.playAgain').on('click', function() {
        resetGame();
    });

});
