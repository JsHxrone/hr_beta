$(function(){
    $('#app>header').html(header)
        // console.log($('#foot'))
        // console.log($('#me>.container>footer'))
        $('#app>.container>footer').append(`
            <ul>
        <li class="active">
            <a class="a" href="#app">
                <i class="icon iconfont icon-category
                "></i>
                <span>聊天室</span>
            </a>
        </li>
        <li>
            <a class="b" href="#me">
                <i class="icon iconfont icon-account"></i>
                <span>我</span>
            </a>
        </li>
    </ul>
          `)
        if(!getCookie('username') || getCookie('username')==""){
           location.href="login.html"
        }
        $("link").each(function(index,element){
            var href=$(element).attr('href');
            $(element).attr('href',href+"?random="+Math.random());
            // alert($(element).attr('href'));
        });
        function getChatList(){
              var url =  http+'api/getChatList.php?random='+Math.random();
              $('.chatList ul').html('');
              $.get(url,function(date,status){
                if (status=='success') {
                    var response=$.parseJSON(date);
                    console.log(response);
                    $(response).each(function(index,element){
                        let firstName = element.title.substring(0,1);
                        let title;
                        if(element.title.length>20){
                            title = element.title.substring(0,19)+"..."
                        }else{
                            title = element.title;
                        }
                        let body = element.body.substring(0,50)+"..."
                        let createDate = element.createDate.substring(5)
                        const id = element.chatId;
                        var search=$('#search');
                        console.log('search'+search.val());
                        
                        if (search.val()) 
                            {
                            if (element.title.match(search.val())||element.body.match(search.val())) {
                                 $('.chatList ul').append(`
                                    <li class="col-sm-4" onclick="location.href='chat.html?chatid=${id}'">
                                        <div class="firstName">${firstName}</div>
                                        <h4>
                                            <a href="javascript:;">${title}</a>
                                            <small>${body}</small>
                                            <span class="createDate">${createDate}</span>
                                        </h4>
                                    </li>
                                    `);
                            }
                            // console.log('查找成功');
                            $('.chatList>ul>li').addClass("col-sm-4")
                        }
                        else{
                        $('.chatList ul').append(`
                            <li onclick="location.href='chat.html?chatid=${id}'">
                                <div class="firstName">${firstName}</div>
                                <h4>
                                    <a href="javascript:;">${title}</a>
                                    <small>${body}</small>
                                    <span class="createDate">${createDate}</span>
                                </h4>
                            </li>
                            `);
                        }
                       
                    });
                     var liLength=$('.chatList ul').children('li').length
                        if (!liLength) {
                            $('#search').attr('placeholder','未查找到相应聊天室');
                            $('#search').val("")
                        }
                     $('.firstName').each(function(index,element){
                        const bgColor = new Color();
                        $(element).css("background-color",bgColor.color);
                     });
                }
              });
        }
        getChatList();

    
    // console.log(.swiper-container.autoplay="true") 

    function user() {
        // let section = $('section');
        var url = http + "api/getUser.php?userid=" + getCookie('userId');
        $.get(url,function(data){
                let json = $.parseJSON(data);
                console.log(json)
                let userAvatar
                if (json[0].userAvatar) {
                    userAvatar = json[0].userAvatar.substring(3);
                } else {
                    userAvatar = 'images/xiaoxin.jpg'
                }
                let userLevel;
                if (json[0].userLevel == 0) {
                    userLevel = '管理员'
                } else {
                    userLevel = '普通用户'
                }
                $('#me>.container>section').html(`
            <ol>
                <li class="user">
                    <a href="avatar.html"><img src="${userAvatar}"></a>
                    <h4>${json[0].userName}<small id = "identity">身份:${userLevel}</small><small id = "tel">联系电话:${json[0].phoneNumber}</small></h4>    
                </li>
            </ol>
            <ol>
                <li><i class="icon iconfont icon-form"></i><a id = "power" onclick="aaa()">发布新的聊天室</a><div class="str"></div></li>
                <li><i class="icon iconfont icon-form"></i><a href="javascript:;" onclick="edituser()">完善信息</a><div class="str"></div></li>
                <li><i class="icon iconfont icon-text"></i><a href="editUser.html?userId=${json[0].userId}">修改密码</a><div class="str"></div></li>
                <li><i class="icon iconfont icon-help"></i><a href="help.html">帮助说明</a></li>
            </ol>
            <ol>
                <li><i class="icon iconfont icon-information"></i><a href="javascript:;" onclick="outCookie()">注销帐户</a><div class="str"></div></li>
                <li><i class="icon iconfont icon-delete"></i><a onclick="users()">删除帐户</a></li>
            </ol>`)
           });
    }
    user()

 let phoneNumber = $('#phoneNumber')
   function edituser(){
      phoneNumber.css({
          display : "block"
      });
   }

   phoneNumber.on("click",function(){
    phoneNumber.css({
          display : "none"
      });
   })
  function a(e){
      var ev = e || window.event;
      ev.cancelBubble==true;
      ev.stopPropagation()
  }

  function updatePhone(e){
     let phone = $('#phone');
     let tel = $('#tel')
      var ev = e || window.event;
      ev.cancelBubble==true;
      ev.stopPropagation();
      if(phone.val()==""){
           alert('手机号码不能为空')
           return false
      }else{
        let url = http + "api/editUserSave.php?send=1&phoneNumber="+phone.val();
      $.get(url,function(data){
        let json = $.parseJSON(data);
        if (phone.val().length != 11) {
            alert(json.message)
            return false
        }else{
            alert(json.message)
            phoneNumber.css({
            display : "none"
            });
            tel.html("联系电话:"+phone.val())
            phone.val(" ")    
        }
      })
      }
      
  }

    $('.footer_1').append(`
            <ul>
        <li class="active">
            <a class="a" href="#app">
                <i class="icon iconfont icon-category
                "></i>
                <span>聊天室</span>
            </a>
        </li>
        <li>
            <a class="b" href="#me">
                <i class="icon iconfont icon-account"></i>
                <span>我</span>
            </a>
        </li>
    </ul>
          `)
    $(".footer_1>ul>li").eq(0).removeClass("active");
    $(".footer_1>ul>li").eq(1).attr("class","active");
    console.log($(".swiper-wrapper").eq(1))
    var width = $(window).width();
    console.log(width)
    $(".a").each(function(index){
        $(this).on('click',function(){
            $(".swiper-wrapper").eq(1).css({transform:'translate3d(0px, 0px, 0px)'})
        })
    })
    $(".b").each(function(index){
        $(this).on('click',function(){
            $(".swiper-wrapper").eq(1).css({transform:'translate3d(-'+width+'px, 0px, 0px)'})
        })
    })
    $("link").each(function(index,element){
            var href=$(element).attr('href');
            $(element).attr('href',href+"?random="+Math.random());
            // alert($(element).attr('href'));
        });
    function outCookie() {
        removeCookie("username");
        removeCookie("userid");
        removeCookie("userlevel");
        location.href = "login.html"
    }
    
    function aaa(){
        var power = $("#power");
        var identity = $("#identity");
        if (identity.html() == '身份:管理员') {
            power.attr('href',"admin.html");
        }else{
            alert("您不是管理员，不能创建聊天室！！！")
            // return false
        }
    }
    function users() {
        // let section = $('section');
        var url = http + "api/deleteaccount.php?&userid="+getCookie('userId');
        $.get(url,function(data){
                let json = $.parseJSON(data);
                alert(json.message+",请重新注册！")
                location.href = "register.html"
            })
        }
})
        