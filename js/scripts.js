$(() => {
 
    //Гамбургер меню
    $('header .menu_btn').click((e) => {
        e.preventDefault()

        if (!$('header .menu_btn').hasClass('active')) {			
            $('header .menu_btn').addClass('active')
            $('header .menu').addClass('show')	
            $('.overlay').fadeIn(300)	
        } else {		
            $('header .menu_btn').removeClass('active')
            $('header .menu').removeClass('show')
            $('.overlay').fadeOut(300)
        }
    })

    $('.overlay').click((e) => {
        e.preventDefault()
        $('header .menu_btn').removeClass('active')
        $('header .menu').removeClass('show')
        $('.overlay').fadeOut(300)
    })




    $('body').on('click', '.modal_btn', function (e) {
        e.preventDefault()

        Fancybox.close()

        Fancybox.show([{
            src: $(this).data('content'),
            type: 'inline'
        }])
    })


    $(document).on('change', '.error', function () {

        $(this).removeClass('error');
        if ($(this).attr('class') != 'checked') { $(this).next().hide(); }
    })

    $(document).on('click', '.submit_btn', function (event) {
        event.preventDefault();
        var dataForAjax = "action=form&";
        var addressForAjax = myajax.url;
        var valid = true;
        var form = $(this).closest('form');
        $(this).closest('form').find('input:not([type=submit]),textarea').each(function (i, elem) {
            if (this.value.length < 3 && $(this).hasClass('required')) {
                valid = false;
                $(this).addClass('error');
                $(this).next().show();
            }
            if ($(this).attr('name') == 'email' && $(this).hasClass('required')) {
                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                if (!pattern.test($(this).val())) {
                    valid = false;
                    $(this).addClass('error');
                    $(this).next().show();
                }
            }
            if ($(this).hasClass("checked") && !$(this).prop("checked")) {
                $(this).addClass('error');
                valid = false;
            }

            if (i > 0) {
                dataForAjax += '&';
            }
            dataForAjax += this.name + '=' + this.value;
        })

        if (!valid) {
            return false;
        }

        $.ajax({
            type: 'POST',
            data: dataForAjax,
            url: addressForAjax,
            success: function (response) {

                Fancybox.close()

                Fancybox.show([{
                    src: "#thanks",
                    type: 'inline'
                }])

                $('form').trigger("reset");
            }
        });
    });


})