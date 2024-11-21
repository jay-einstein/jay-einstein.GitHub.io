(function() {
    var h = window.innerHeight;
    var w = window.innerWidth;

    var bg = document.getElementsByClassName("box_bg");

    if ((w / h) >= (1920 / 1080)) {
        for (var i = 0; i < bg.length; i++) {
            bg[i].style.width = w + 'px';
            bg[i].style.height = w * (1080 / 1920) + 'px';
            bg[i].style.top = -(w * (1080 / 1920) - h) / 2 + 'px';
            bg[i].style.left = '0';
        }
    } else {
        for (var i = 0; i < bg.length; i++) {
            bg[i].style.height = h + 'px';
            bg[i].style.width = h * (1920 / 1080) + 'px';
            bg[i].style.left = -(h * (1920 / 1080) - w) / 2 + 'px';
            bg[i].style.top = '0';
        }
    }

    var box01_index = 0;
    var box01_p = document.getElementById('box01_text').children;

    function boxOne() {
        if (box01_index >= 0 && box01_index <= 2) {
            box01_p[box01_index].style.opacity = '1';
            box01_index++;
        } else {
            clearInterval(boxOneTimer);
        }
    }

    var x_arr = new Array();
    var y_arr = new Array();
    var x = y = m = 0;
    for (var i = 0; i < 800; i++) {
        if (i >= 400) {
            x = m;
            y = 200 + Math.sqrt(40000 - Math.pow(x - 200, 2));
            m--;
        } else {
            x = m;
            y = 200 - Math.sqrt(40000 - Math.pow(x - 200, 2));
            m++;
        }
        x_arr[i] = x - 60;
        y_arr[i] = parseInt(y) - 25;
    }

    /*
     *原型轨迹
     */
    var gitMove = document.getElementById('github_a');
    var weiboMove = document.getElementById('weibo_a')
    var blogMove = document.getElementById('blog_a')
    var g_num = 0;
    var w_num = 0;
    var b_num = 0;

    function movegit() {
        if (g_num <= 750) {
            // gitMove.css({"left":x_arr[g_num] + "px","top":y_arr[g_num]+"px"});
            gitMove.style.left = x_arr[g_num] + 'px';
            gitMove.style.top = y_arr[g_num] + 'px';
            g_num += 3;
        } else {
            clearInterval(gitTimer);
        }
    }

    function moveweibo() {
        if (w_num <= 400) {
            // weiboMove.css({"left":x_arr[w_num]+"px","top":y_arr[w_num]});
            weiboMove.style.left = x_arr[w_num] + 'px';
            weiboMove.style.top = y_arr[w_num] + 'px';
            w_num += 3;
        } else {
            clearInterval(weiTimer);
        }
    }

    function moveblog() {
        if (b_num <= 90) {
            // blogMove.css({"left":x_arr[b_num]+"px","top":y_arr[b_num]});
            blogMove.style.left = x_arr[b_num] + 'px';
            blogMove.style.top = y_arr[b_num] + 'px';
            b_num += 3;
        } else {
            clearInterval(blogTimer);
        }
    }

    movegit();
    var gitTimer = setInterval(movegit, 1);
    moveweibo();
    var weiTimer = setInterval(moveweibo, 1);
    moveblog();
    var blogTimer = setInterval(moveblog, 1);

    //第一屏文字加载
    var boxOneTimer = setInterval(boxOne, 800);
})();



