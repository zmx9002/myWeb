$(function () {
    //监测文本输入状态
    $(document).on('input', '.message-text', function () {
        if ($(this).text() == '') {
            $('.add').show();
            $('.send').hide();
        } else {
            $('.add').hide();
            $('.send').show();
        }
    });
    //其它功能展示（照片和相机）
    $(document).on('click', '.J_add', function () {
        $('.other').addClass('show');
        //解决视觉bug
        setTimeout(function () {
            $('#messages').css('padding-bottom', $('.message-btn').height() + 'px');
            $('body').scrollTop($('#messages').height() + $('.message-btn').height() + $('.show').height());
        }, 500);
    });
    var access_token = null;
    var expires_in = null;
    //$.ajax({
    //    type:'get',
    //    url:'https://api.weixin.qq.com/cgi-bin/token',
    //    data:{
    //        grant_type:'client_credential',
    //        appid:'wx158a2d2aa408aa0f',
    //        secret:'435f9edsfcdf'
    //    },
    //    success:function(result){
    //        if(result.success){
    //            access_token = result.access_token;
    //            expires_in = result.expires_in;
    //        }else{
    //            console.log(result.errmsg)
    //        }
    //    }
    //});
    //微信
    //wx.config({
    //    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //    appId: 'gh_b396e2e5061c', // 必填，公众号的唯一标识
    //    timestamp: new Date().getTime(), // 必填，生成签名的时间戳
    //    nonceStr: '022cd9fd995849b58b3ef0e943421ed9', // 必填，生成签名的随机串
    //    signature: ' ',// 必填，签名，见附录1
    //    jsApiList: ['startRecord','stopRecord','onVoiceRecordEnd','playVoice','pauseVoice','stopVoice','onVoicePlayEnd','uploadVoice','downloadVoice',] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    //});
    //wx.ready(function(){
    //    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    //});

    $(document).on('touchstart', '.J_voice_transcribe', function () {
        $(this).css('background', '#000');
        wx.startRecord();
    });
    $(document).on('touchend', '.J_voice_transcribe', function () {
        $(this).css('background', '#f0f0f0')
    });
});


function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

var appkey = "94192ab409d7de443d2d5b85",
    random_str = "022cd9fd995849b58b3ef0e943421ed9",
    timestamp = new Date().getTime(),
    secret = "ee242cd90d91eb880e3d85cf",
    signature = hex_md5('appkey=' + appkey + '&timestamp=' + timestamp + '&random_str=' +
        random_str + '&key=' + secret);


var JIM = new JMessage();
JIM.onDisconnect(function () {
    console.log("【disconnect】");
}); //异常断线监听

//初始化
init();
function init() {
    JIM.init({
        "appkey": appkey,//开发者在极光平台注册的IM应用 appkey
        "random_str": random_str,//随机字符串
        "signature": signature,//签名
        "timestamp": timestamp,//当初时间戳
        "flag": 1 //是否启用消息记录漫游，默认 0 否，1 是
    }).onSuccess(function (data) {
        console.log('init is success');
        console.log('success:' + JSON.stringify(data));
        login();
    }).onFail(function (data) {
        console.log('error:' + JSON.stringify(data));
    });
}
//登陆
function login() {
    JIM.login({
        'username': 'test1',
        'password': '123456'
    }).onSuccess(function (data) {
        console.log('login is success');

        //离线消息同步监听
        JIM.onSyncConversation(function (data) {
            var key = getUrlParam('key');
            for (var i = 0; i < data.length; i++) {
                if (data[i].key == key) {
                    var result = data[i];
                    for (var j = 0; j < result.msgs.length; j++) {
                        var text = result.msgs[j].content.msg_body.text;
                        if (result.msgs[j].content.from_id == 'test1') {
                            getMessages(text);
                        } else {
                            sendMessages(text);
                        }
                    }
                }
            }
            // 内容过多时,将滚动条放置到最底端
            $('body').scrollTop($('#messages').height() + $('.message-btn').height());
        });
    }).onFail(function (data) {
        //console.log('error:' + JSON.stringify(data));
    });
}

//聊天消息实时监听
JIM.onMsgReceive(function (data) {
    var key = getUrlParam('key');
    for (var i = 0; i < data.length; i++) {
        if (data[i].key == key) {
            var result = data[i];
            for (var j = 0; j < result.msgs.length; j++) {
                var text = result.msgs[j].content.msg_body.text;
                if (result.msgs[j].content.from_id == 'test1') {
                    getMessages(text);
                } else {
                    sendMessages(text);
                }
            }
        }
    }
    // 内容过多时,将滚动条放置到最底端
    $('body').scrollTop($('#messages').height() + $('.message-btn').height());
});

function sendMessages(text) {
    $('#messages').append('<li class="right">' +
        '<div class="avatar"><img src=""/></div>' +
        '<div class="content">' +
        '<i class="iconfont">&#xe600;</i>' +
        '<p>' + text + '</p>' +
        '</div>' +
        '</li>'
    )
}

function getMessages(text) {
    $('#messages').append('<li class="left">' +
        '<div class="avatar"><img src=""/></div>' +
        '<div class="content">' +
        '<i class="iconfont">&#xe600;</i>' +
        '<p>' + text + '</p>' +
        '</div>' +
        '</li>'
    )
}

$(document).on('click', '.J_send', function () {
    var content = $('#text').text();
    if (content != '') {
        JIM.sendSingleMsg({
            'target_username': 'manager',
            'target_nickname': 'manager',
            'content': content,
            'appkey': appkey,
            'no_notification': true
        }).onSuccess(function (data) {
            console.log('success:' + JSON.stringify(data));
            sendMessages(content);
            $('#text').text('');
            // 内容过多时,将滚动条放置到最底端
            $('body').scrollTop($('#messages').height() + $('.message-btn').height());
        }).onFail(function (data) {
            console.log('fail:' + JSON.stringify(data));
        });
    }
});