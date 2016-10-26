var log = function() {
    console.log.apply(console, arguments)
}

var insertComCss = function() {
    var css = `
    <style media="screen">
        .add-comment {
            width: 80%;
            margin: 0 auto;
        }
        #id-input-comment {
            display: block;
            width: 100%;
            height: 113px;
            border-radius: 10px;
            border-style: solid;
            border-width: 2px;
            font-size: 19px;
            resize: none;
            padding: 10px;
            outline: none;
        }
        .note {
            display: block;
            margin: 20px 0px;
            text-align: right;
            width: 103%;
        }
        #id-span-message {
            display: inline-block;
            margin: 0px 20px;
            font-family: cursive;
            font-size: 20px;
            color: lightgray;
        }
        #id-span-font {
            font-size: 26px;
        }
        #id-button-add {
            display: inline-block;
            width: 179px;
            height: 35px;
            font-size: 21px;
            border-radius: 7px;
            border-style: none;
            background: #ffbd9a;
            color: white;
            font-weight: bold;
        }
        .divsion {
            border-bottom: 1px solid lightgrey;
            margin: 20px;
        }
        .allComments {
            width: 94%;
            margin: 0 auto;
        }
        .comment-i {
            display: block;
            margin-top: 5px;
            width: 100%;
            height: 88px;
            border-bottom: 1px lightgray dashed;
            padding: 5px;
        }
        .comment-img-head {
            display: inline-block;
            width: 60px;
            border: 1px lightgray solid ;
            border-radius: 5px;
            margin-left: 12px;
        }
        .comment-content {
            display: inline-block;
            position: absolute;
            margin: 0px 10px;
            font-size: 16px
        }
        .comment-time {
            display: block;
            position: static;
            top: -15px;
            margin-left: 10px;
            color: gray;
            font-size: 13px
        }
        span {
            white-space: normal;
        }
        .userPro {
            display: block;
            width: 71px;
            height: 71px;
            position: absolute;
            top: 25%;
            left: 1%;
        }
        .userName {
            display: block;
            position: absolute;
            display: inline-block;
            top: 37%;
            left: 2%;
            font-size: 15px;
            font-family: monospace;
        }
    </style>
    `
    $('head').append(css)
}

var insertComForm = function() {
    var form = `
    <div class="comment">
        <div class="add-comment">
            <div class="container">
                <div class="userInfo">
                    <img class="userPro comment-img-head" src=${window.userProfilePic} alt="" />
                    <span class="userName">${window.username}</span>
                </div>
                <textarea id="id-input-comment" maxlength="140"></textarea>
            </div>
            <div class="note">
                <span id="id-span-message">亲，还可以输入<span id="id-span-font"> 140 </span>字哟~</span>
                <button id="id-button-add" type="button" name="button">发表评论</button>
            </div>
        </div>
        <div class="divsion"></div>
        <div class="allComments">
            <div class="comment-i">
                <img class="comment-img-head" src="profilePic/peach.jpg" alt=head/>
                <div class="comment-content">
                    <span>茵 :</span>
                    <span> nice job </span>
                    <span class="comment-time">10  月 12 日</span>
                </div>
            </div>
            <div class="comment-i">
                <img class="comment-img-head" src="profilePic/grape.png" alt=head/>
                <div class="comment-content">
                    <span>老三 :</span>
                    <span>good luck, brother</span>
                    <span class="comment-time">10月13日</span>
                </div>
            </div>
        </div>
    </div>
    `
    $('body').append(form)
}

var init = function(img, name) {
    insertComCss()
    insertComForm()
}

var templateOfComment = function(name, img, data, time) {
    var t = `
        <div class="comment-i">
            <img class="comment-img-head" src=${img} alt=${name}head/>
            <div class="comment-content">
                <span>${name} :</span>
                <span>${data}</span>
                <span class="comment-time">${time}</span>
            </div>
        </div>
    `
    return t
}

var timeOfNow = function() {
    var d = new Date()
    var mon = d.getMonth() + 1
    var day = d.getDate()
    var min = d.getHours() + ':' + d.getMinutes()
    var time = `${mon}月${day}日${min}`
    return time
}

var addComment = function(data, name, img) {
    var time = timeOfNow()
    var t = templateOfComment(name, img, data, time)
    $('.allComments').prepend(t)
}

var bindEventNumbers = function() {
    $('#id-input-comment').on('keyup', function(){
        var data = $(this).val()
        var len = 140 - data.length
        $('#id-span-font').text(len)
    })
}

var bindEventAdd = function() {
    $('#id-button-add').on('click', function(){
        var data = $('#id-input-comment').val()
        var name = window.username
        var img = window.userProfilePic
        addComment(data, name, img)
    })
}

var bindEvents = function() {
    bindEventNumbers()
    bindEventAdd()
}

var __main = function() {
    init()
    bindEvents()
}

var addUser = __main
