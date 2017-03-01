$(document).ready(function() {

    var data = {
        "id": "2",
        "userid": "1",
        "title": "Philips Hue helpdesk",
        "showshield": "1",
        "startbubble": "static",
        "background": "gradient",
        "startspeaker": "left",
        "colorgradientstart": "528422",
        "colorgradientmiddle": "13432",
        "colorgradientend": "26273",
        "colorprimary": "36556",
        "colorsecondary": "16777215",
        "colortertiary": "16363520",
        "dir": "img/",
        "speakers": [{
            "accessory": "question",
            "function": "Client",
            "icon": "man",
            "name": "Theo"
        }, {
            "accessory": "exclamation",
            "enabled": "true",
            "function": "Philips Hue webcare",
            "icon": "community",
            "name": "Fritsoline"
        }],
        "bubbles": [{
            "delay": "0",
            "emphasis": "normal",
            "size": "large",
            "speaker": "0",
            "time": "12:11",
            "txt": "My Philips Hue is not working correctly.",
            "name": "Henk",
            "func": "1"
        }, {
            "delay": "0",
            "emphasis": "normal",
            "size": "small",
            "speaker": "1",
            "time": "12:12",
            "txt": "What seems to be the problem?",
            "name": "Theo",
            "func": "2"
        }, {
            "delay": "1",
            "emphasis": "normal",
            "size": "small",
            "speaker": "0",
            "time": "12:12",
            "txt": "The lights are not turning on.",
            "name": "Dirk",
            "func": "3"
        }, {
            "delay": "1",
            "emphasis": "normal",
            "size": "large",
            "speaker": "1",
            "time": "12:13",
            "txt": "Have you tried resetting the bridge?",
            "name": "Paul",
            "func": "4"
        }, {
            "delay": "2",
            "emphasis": "strong",
            "size": "small",
            "speaker": "0",
            "time": "12:15",
            "txt": "No, but that solved it! Thank you!",
            "name": "Stimpy",
            "func": "5"
        }],
        "posted": "2014-10-21 20:33:57",
        "feed": "philips-conversation-00002",
        "showspeakers": "0"
    };



    $('.total-container').children().addClass('hidden');


    if ($(window).width() < $('.total-container').width()) {
        $('.total-container').css('font-size', $(window).width() / 2 + 'px');
    } else {
        $('.total-container').css('font-size', $('.total-container').width() / 2 + 'px');
    }

    $(window).resize(function() {
        $('.total-container').css('font-size', $('.total-container').width() / 2 + 'px');
    });

    var switcher, bubble, emphasis;
    var first = true,
        move = false;
    var highestBubbleNum = 0,
        i = 0,
        bubbleNum = 0,
        stableMessages = 0,
        stableMessagesHeight = 0,
        delay = 0,
        topValue = 0;




    function decToHex(num) {
        num = parseInt(num, 10);
        num = num.toString(16);
        while (num.length < 6) {
            num = '0' + num;
        }
        return '#' + num;
    }

    function pxToEm(element, pixels) {
        return (Math.ceil(pixels) / parseInt(element.parent().css('font-size'))).toFixed(2) + 'em';
    }

    function createBubble(obj) {
        if (data.startspeaker == 'left') {
            switcher = (obj.speaker == 0) ? 'left-bubble' : 'right-bubble';
        } else {
            switcher = (obj.speaker == 0) ? 'right-bubble' : 'left-bubble';
        }
        bubble = '<div class="' + switcher + ' bubble" num=' + bubbleNum++ + '><div class="msg-text ' + obj.size + '"><p class="msg-desc">' + obj.name + ' / ' + obj.func + ' // ' + obj.time + '</p>' + obj.txt + '</div></div>';
        return bubble + '<div class="clr"></div>'
    }

    function animate(element, animation, delay) {
        setTimeout(function() {
            element.addClass(animation);
            element.removeClass('hidden');
            element.addClass('visible');
        }, delay)
    }

    function moveMessageFromBottom(element, animation, delay) {
        setTimeout(function() {
            $('#conversation').animate({
                    'bottom': '+=' + pxToEm(element, element.height())
                },
                500);
            element.addClass(animation);
            element.removeClass('hidden');
            element.addClass('visible');
        }, delay)
    }

    function moveMessageToTop(element, highestElement, animation, delay) {
        setTimeout(function() {
            if (first) add = Math.ceil(parseInt($('#conversation').css('top'))) + 3;
            $('#conversation').animate({
                    'bottom': '+=' + pxToEm(element, highestElement.height() + add)
                },
                500);
            element.addClass(animation);
            element.removeClass('hidden');
            element.addClass('visible');
            first = false;
            add = 0;
        }, delay)
    }

    function setLayout(data) {

        $('footer').append(data.title);
        if (data.showshield == 0) {
            $('#logo').css({ 'display': 'none' });
        }
        switch (data.background) {
            case 'solid':
                $('.total-container').css({ 'backgroundColor': '#fff' }, 1000);
                break;
            case 'image':
                $('.total-container').css({ 'background-image': 'url(' + data.dir + data.id + ')' }, 1000);
                break;
            default:
                var colors = [decToHex(data.colorgradientstart), decToHex(data.colorgradientmiddle), decToHex(data.colorgradientend)];
                $('.total-container').css({
                    'background': colors[0],
                    'background': '-moz-linear-gradient(-45deg,' + colors[0] + ' 0%, ' + colors[1] + ' 50%, ' + colors[2] + ' 100%)',
                    'background': '-webkit-gradient(left top, right bottom, color - stop(0%,' + colors[0] + '), color - stop(50%, ' + colors[1] + '), color-stop(100%, ' + colors[2] + '))',
                    'background': '-webkit-linear-gradient(-45deg,' + colors[0] + ' 0%, ' + colors[1] + ' 50%, ' + colors[2] + ' 100%)',
                    'background': '-o-linear-gradient(-45deg,' + colors[0] + ' 0%, ' + colors[1] + ' 50%, ' + colors[2] + ' 100%)',
                    'background': '-ms-linear-gradient(-45deg,' + colors[0] + ' 0%, ' + colors[1] + ' 50%, ' + colors[2] + ' 100%)',
                    'background': 'linear-gradient(135deg,' + colors[0] + ' 0%, ' + colors[1] + ' 50%, ' + colors[2] + ' 100%)'
                }, 1000);
                break;
        }
        $('.total-container').css({
            'color': decToHex(data.colorsecondary)
        });
        $('footer .line').css({
            'background-color': decToHex(data.colortertiary)
        });
        $('.first-speaker .speaker-name').text(data.speakers[0].name);
        $('.second-speaker .speaker-name').text(data.speakers[1].name);
        $('.first-speaker .speaker-desc').text(data.speakers[0].function);
        $('.second-speaker .speaker-desc').text(data.speakers[1].function);
        $('.first-speaker .icon-block').addClass(data.speakers[0].icon);
        $('.second-speaker .icon-block').addClass(data.speakers[1].icon);
        $('.community .speaker-icon').attr('src', data.dir + 'community.svg');
        $('.man .speaker-icon').attr('src', data.dir + 'man.svg');
        $('.woman .speaker-icon').attr('src', data.dir + 'woman.svg');

        $('.first-speaker .icon-block .speaker-accessory').addClass(data.speakers[0].accessory);
        $('.second-speaker .icon-block .speaker-accessory').addClass(data.speakers[1].accessory);
        $('.question').attr('src', data.dir + 'question.svg');
        $('.exclamation').attr('src', data.dir + 'exclamation.svg');
        $('.exclamation').attr('src', data.dir + 'exclamation.svg');
        if ((data.showshield == '0') && ((data.showspeakers == '0'))) {
            $('#conversation').addClass('full');
        } else {
            $('#conversation').addClass('narrow');
        }
        setMessages(data);
        $('.right-bubble .msg-text').css({
            'background-color': decToHex(data.colorprimary)
        });
        $('.left-bubble .msg-text').css({
            'border-color': decToHex(data.colorsecondary)
        });
        if ((data.bubbles[0].size == data.bubbles[1].size) && (data.bubbles[1].size == data.bubbles[2].size) && (data.bubbles[3].size == 'small')) {
            stableMessages = 3;
        } else {
            stableMessages = 2;
        }
        for (i = 0; i < stableMessages; i++) {
            stableMessagesHeight += $('.bubble[num="' + i + '"]').outerHeight(true);
        }
        var topDistance = $('.total-container').innerHeight() - $('footer').outerHeight(true) - stableMessagesHeight - 60;
        $('#conversation').css({ 'top': pxToEm($('#conversation'), topDistance) });
        var bottomDistance = parseInt($('#conversation').css('bottom'));
        $('#conversation').css({ 'bottom': pxToEm($('#conversation'), bottomDistance) });
        $('#conversation').css({ 'top': 'auto' });
    }

    function setMessages(data) {
        for (var i = 0; i < data.bubbles.length; i++) {
            $('#conversation').append(createBubble(data.bubbles[i]));
        }
    }

    function animateTemplate(data) {


        function animateDesc() {
            animate($('.first-speaker .speaker-desc'), 'slideInLeft');
            animate($('.second-speaker .speaker-desc'), 'slideInRight');
            setTimeout(messageAppearing(stableMessages), 100);
        }

        function animateNames() {
            animate($('.first-speaker .speaker-name'), 'slideInLeft');
            animate($('.second-speaker .speaker-name'), 'slideInRight');
            setTimeout(animateDesc, 200);
        }

        function animateIcons() {
            animate($('.first-speaker .icon-block'), 'slideInLeft');
            animate($('.second-speaker .icon-block'), 'slideInRight');
            setTimeout(animateNames, 200);
        }

        function animateFooter() {
            animate($('footer .line'), 'zoomIn');
            setTimeout(function() {
                animate($('footer'), '');
            }, 500);
            if (data.showspeakers == '0') {
                setTimeout(messageAppearing(stableMessages), 500);
            } else {
                setTimeout(animateIcons, 500);
            }
        }

        setTimeout(animateFooter, 500);

    }



    function messageAppearing(stable) {
        for (i = 0; i < data.bubbles.length; i++) {
            delay += (parseInt(data.bubbles[i].delay) * 1000);

            function showMessage(i) {
                emphasis = (data.bubbles[i].emphasis == 'strong') ? 'strong' : 'normal';
                if ((i < stable) || (($('.total-container').innerHeight() - $('#conversation').outerHeight(true) + -(parseInt($('#conversation').css('top'))) - $('footer').outerHeight(true)) - 40 > 0)) {
                    animate($('.bubble[num="' + i + '"]'), emphasis + 'FadeInUp');
                } else if (parseInt($('#conversation').css('top')) > parseInt($('.bubble[num="' + i + '"]').height())) {
                    moveMessageFromBottom($('.bubble[num="' + i + '"]'), emphasis + 'FadeInUp');
                } else {
                    moveMessageToTop($('.bubble[num="' + i + '"]'), $('.bubble[num="' + highestBubbleNum + '"]'), emphasis + 'FadeInUp');
                    highestBubbleNum++;
                }
            }
            setTimeout(showMessage, delay += 800, i);
        }
    }

    setLayout(data);
    animateTemplate(data);
});
