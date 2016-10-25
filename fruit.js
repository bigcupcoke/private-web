var log = function() {
    console.log.apply(console, arguments)
}

var templete = function(actions, index) {
    var t = ''
    $(actions).each(function(i, e) {
        var path = 'profilePic/' + e
    var head = `<img class="img-head" src=${path} alt=/>`
    t += head
    })
    return t
}

var insertCss = function() {
    var css = `
    <style class="modal-remove">
        .modal-mask {
            position: fixed;
            background: black;
            width: 100%;
            height: 100%;
            top: 0px;
            left: 0px;
            opacity: 0.8;
            color: white;
        }
        .modal-alert {
            font-family: cursive;
            opacity: 1;
        }
        .modal-title {
            text-align: center;
            background: #15c5ff;
            font-size: 33px;
            padding: 15px;
        }
        .modal-message {
            padding: 10px 5px;
            background: white;
            text-align: center;
        }
        .class-button-action {
            width: 100%;
            font-size: 22px;
            border: 1px;
            margin: 1px;
        }
        .modal-control {
            font-size: 0;
        }
        .class-button-modal {
            width: 100%;
            height: 100%;
            font-size: 30px;
            font-family: cursive;
            padding: 12px;
            background: #15c5ff;
            border: 0px;
            margin: 0px;
            outline: none;
        }
        .vertical-center {
            position: absolute;;
            top: 50%;
            left: 50%;
            transform:translate(-50%, -50%);
        }

        .img-head {
            display: inline-block;
            width: 80px;
            height: 80px;
            /*border: 1px lightgray solid ;*/
            border-radius: 5px;
            margin: 0px;
            padding: 12px;
        }
        .img-head-div {
            display: inline-block;
            width: 30px;
            height: 30px;
        }
        .img-head-i-border {
            border: 1px red solid;
            padding: 11px;
        }
        .loungeUsernameNote {
            display: block;
            position: absolute;
            left: 9%;
            top: 36%;
            font-size: 24px;
            color: lightgray;
            padding: 20px;
        }
        .loungeUsername {
            border-radius: 6px;
            outline: none;
            border: black 1px solid;
            height: 56px;
            width: 338px;
            font-size: 32px;
            padding: 6px 10px;
        }
    </style>
    `
    $('head').append(css)
}

var insertContainer = function(title) {
    var insertBody = `
        <div class="modal-container modal-remove">
            <div class="modal-mask"></div>
            <div class="modal-alert vertical-center">
                <div class="modal-title">
                    ${title}
                </div>
                <div class="modal-message">
                </div>
                <div class="modal-control">
                    <button class="class-button-modal" type="button" data-type="cancel">Ok</button>
                </div>
            </div>
        </div>
    `
    $('body').append(insertBody)
}

var inputUsername = function() {
    var t = `
             <span class="loungeUsernameNote">Please input your name in here.</span>
             <input class="loungeUsername" type="text" name="name" value="">
             `
    $('.modal-message').append(t)
}

var bindEventMouseover = function() {
    $('.img-head').on('mouseover', function(){
        log('mouseover')
        $('.img-head').removeClass('img-head-i-border')
        $(this).addClass('img-head-i-border')
    })
}

var bindEventOk = function() {
    $('.modal-control').on('click', function(){
        log('ok')
        window.username = $('.loungeUsername').val()
        $('.modal-remove').remove()
        window.alertCallback()
    })
}

var initAlert = function(title, actions, callback) {
    insertCss()
    insertContainer(title)
    $(".class-button-modal").attr("disabled", true)
    window.alertCallback = callback

    var t = templete(actions)
    $('.modal-message').append(t)
}

var GuaActions = function(title, actions, callback) {

    initAlert(title, actions, callback)

    bindEventMouseover()

    $('.img-head').on('click', function(){
        log('click')
        $('.img-head').unbind()
        window.userProfilePic = $(this).attr('src')
        $('.img-head').fadeOut()
        inputUsername()
        $('.loungeUsername').fadeIn()
        $('.loungeUsernameNote').fadeIn()
        $('.modal-title').text('Now,Please input your name.')

        $('.loungeUsernameNote').on('click', function(){
            log('keydown')
            $(this).remove()
            $('.loungeUsername').focus()
        })

        $('.loungeUsername').on('keyup',function(){
            var len = $(this).val().length
            if(len > 0) {
                $(".class-button-modal").attr("disabled", false);
            } else {
                $(".class-button-modal").attr("disabled", true);
            }
        })
    })

    bindEventOk()
}
