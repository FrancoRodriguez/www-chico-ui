var autocomplete;

function parseResults(results) {
    var data = [];
    if (results[2].suggested_queries !== undefined) {
        results[2].suggested_queries.forEach(function (e, i) {
            data.push(e.q);
        });

        autocomplete.suggest(data);
    }
}

$(window).on("load", function () {

    autocomplete = $('.autocomplete').autocomplete().on('type', function (userInput) {
         $.ajax({
             'url': 'http://suggestgz.mlapps.com/sites/MLA/autosuggest?q='+ userInput +'&v=1&callback=parseResults',
             'dataType': 'jsonp',
             'cache': false,
             'global': true,
             'context': window,
             'jsonp': 'parseResults',
             'crossDomain': true
         });
    });

    var calendar = $(".YOUR_SELECTOR_calendar").calendar({'selected': '2012/01/22'});

    // Expandable
    var expandable1 = $(".YOUR_SELECTOR_expandable").expandable();

    var expandable2 = $(".YOUR_SELECTOR_expandable2").expandable({
        'container': $('#container')
    });

    var expandable3 = $(".YOUR_SELECTOR_expandable3").expandable({
        'container': $('#container-ajax'),
        'content': '/src/assets/ajax.html'
    });

    // Menu
    var menu = $(".YOUR_SELECTOR_Menu").menu();

    // Dropdown
    var dropdown1 = $(".myDropdown").dropdown();

    var dropdown2 = $(".myDropdownNav").dropdown({'shortcuts': false, 'skin': true});

    var dropdown3 = $(".myDropdownSkin").dropdown({'skin': true});

    // Tooltip
    // Bottom
    var tooltip1 = $('#default').tooltip(); // lt lb
    var tooltip2 = $('#ctcb').tooltip({
        'side': 'bottom',
        'align': 'center'
    });
    var tooltip3 = $('#rtrb').tooltip({
        'side': 'bottom',
        'align': 'right'
    });

    // Top
    var tooltip4 = $('#lblt').tooltip({
        'side': 'top',
        'align': 'left',
        'offsetY': -10
    });
    var tooltip5 = $('#cbct').tooltip({
        'side': 'top',
        'align': 'center',
        'offsetY': -10
    });
    var tooltip6 = $('#rbrt').tooltip({
        'side': 'top',
        'align': 'right',
        'offsetY': -10
    });

    // Right
    var tooltip7 = $('#ltrt').tooltip({
        'side': 'right',
        'align': 'top',
        'offsetX': 10
    });
    var tooltip8 = $('#lmrm').tooltip({
        'side': 'right',
        'align': 'center',
        'offsetX': 10
    });
    var tooltip9 = $('#lbrb').tooltip({
        'side': 'right',
        'align': 'bottom',
        'offsetX': 10
    });

    // Left
    var tooltip10 = $('#rtlt').tooltip({
        'side': 'left',
        'align': 'top',
        'offsetX': -10
    });
    var tooltip11 = $('#rmlm').tooltip({
        'side': 'left',
        'align': 'center',
        'offsetX': -10
    });
    var tooltip12 = $('#rblb').tooltip({
        'side': 'left',
        'align': 'bottom',
        'offsetX': -10
    });

    var tooltipX = $.tooltip({
        'content': 'Tooltip without trigger!',
        'reference': $('#default')
    });


    // Layer
    var layer = $('#layer1').layer({
        'content': 'foo',
        'align': 'center'
    });

    var bubble = $.bubble({
        'reference': $('#bubble1')
    }).show();

    // Modal
    var modal = $('#modal1').modal($('#invisible-content'));

    // Trasition
    var transition = $('#transition').transition();

    var transitionX = $.transition({
        'content': 'Transition without trigger!'
    });

    // Zoom
    var zoom = $('.zoom').zoom().loadImage();

    // Carousel
    var carousel = $(".myCarousel").carousel({"pagination": true});

    // Tabs
    var tabs = $(".YOUR_SELECTOR_Tabs").tabs();

    // Date Picker
    var datepicker = $("#val_date").datepicker({
     "selected": "2011/11/15",
     "to": "today"
    });

    // Countdown
    var countdown = $("#text_cd").countdown({'max': 140, 'plural': '# left', 'singular': '# left'});

    // Messages
    var message = (function (message, value) {
    var messages = {
         'option': 'Choose an option.',
         'requiredCheck': 'Accept the Terms of Use.',
         'link': 'Fill in this information. <a href="#double">Chico UI</a>.'
     };

     return function (message, value) {
         var message = messages[message] || message;
         if(value){
             return message.replace('{#num#}',value)
         }
         return message;
     }
    }());

    // Form
    var m = $.modal();
    var form = $('.myForm').form()
             .on('success', function (event) {
                 event.preventDefault();
                 m.show();
             })
             .on('error', function (errors) {
                 console.log(errors);
             });

    $('.myForm').on('submit.form', function (event) {
        if (!form.hasError()) {
            event.preventDefault();
            console.log('Ademas hago otra cosa en el submit');
        }
    });

    var  validation1 = $('#input_ico').required().and().string();
    var  validation2 = $('#input_ico_inside').required().and().string();
    var  validation4 = $('#email').required().and().email();
    var  validation5 = $('#custom')
     .custom(
         'myCustom1',
         function (v) {
             if (v.toString().indexOf("1") > -1) {
                 return true;
             }
             return false;
         },
         'The number must contain a 1.')
     .and()
     .custom(
         'myCustom2',
         function (v) {
             if (v.toString().indexOf("2") > -1) {
                 return true;
             }
             return false;
         },
         'The number must contain a 2.');

    var validation6 = $('#url').url()
    var validation7 = $('#number').number().and().min(5);
    var validation8 = $('#range').min(8).and().max(10);
    var validation9 = $('#characters').maxLength(20).and().minLength(6);
    var validation10 = $('#select2').required(message('option'));
    var validation11 = $('.required-check').required(message('requiredCheck'));
    var validation12 = $('.required-option').required(message('option'));
    var validation13 = $('#double').required(message('link'));
    var validation14 = $('#double').number();
    var validation15 = $('#double, #textarea2').required();
});