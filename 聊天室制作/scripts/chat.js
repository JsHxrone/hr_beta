

const http = 'http://hr1256337851.gz01.bdysite.com/8/';

const header = `
    <ul>
        <li class="logo">
            <a href="index.html">我的聊天室</a>
        </li>
        <li class="search">
        <input id="search" value="" placeholder="">
            <i class="icon iconfont icon-search" onclick ="getChatList()"></i>
        </li>
    </ul>
`

const footer = `
    <ul>
        <li class="active">
            <a href="index.html">
                <i class="icon iconfont icon-category
                "></i>
                <span>聊天室</span>
            </a>
        </li>
        <li>
            <a href="me.html">
                <i class="icon iconfont icon-account"></i>
                <span>我</span>
            </a>
        </li>
    </ul>
`;




function Color() {
    this.r = Math.floor(Math.random() * 255);
    this.g = Math.floor(Math.random() * 255);
    this.b = Math.floor(Math.random() * 255);
    this.color = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',1)';
}


String.prototype.strHTML = function() {
    let str = /<(?:.|\s)*?>/g;
    return this.replace(str, "");
}



function getQs(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


//完整格式为：
//name=value; [expires=date]; [path=path]; [domain=hzbiz.net]; [secure]
function setCookie(name, value, expires, path, domain, secure) {
    var cookieName = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    //var cookieName=name+'='+value;
    if (expires instanceof Date) {
        cookieName += ';expires=' + expires;
    }
    if (path) {
        cookieName += '; expires=' + path;
    }
    if (domain) {
        cookieName += '; domain=' + domain;
    }
    if (secure) {
        cookieName += '; secure';
    }
    document.cookie = cookieName;
    //alert(cookieName);
}


function setCookie2(name, value) {
    //定义时间变量,保存当前时间
    var expiresDate = new Date();
    //因为日期是从0开始的.所以要加1
    //默认保存一个月
    //因为是自己的网站,可以设置一个固定值
    expiresDate.setMonth(expiresDate.getMonth() + 1)
    //添加cookie
    var cookieName = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    cookieName += ';expires=' + expiresDate.toUTCString() + ';';
    document.cookie = cookieName;
}



function setCookieDate(day) {
    var date = new Date();
    date.setDate(date.getDate() + day);
    return date;
}


function getCookie(name) {
    //访问Cookie的name开始处
    var offset = document.cookie.indexOf(name);
    //alert(offset);
    //如果找到指定的cookie
    if (offset != -1) {
        //从cookie名后的位置开始搜索
        offset += name.length + 1;
        end = document.cookie.indexOf(";", offset);
        //如果没有找到分号
        if (end == -1) {
            end = document.cookie.length;
        }
        //截取字符中的cookie的值
        return unescape(decodeURIComponent(document.cookie.substring(offset, end)));
    } else {
        return "";
    }
}


//删除cookie
function removeCookie(name) {
    var date = new Date(); //获取当前时间
    date.setTime(date.getTime()-10000); //将date设置为过去的时间
    document.cookie = name + "=; expires =" +date.toGMTString()+';path=/';//设置cookie
}



// // alert(document.cookie)
// setCookie('name','应煜鑫')
// setCookie('email','yyx219@qq.com')
// removeCookie("email");
// alert(getCookle('name'));