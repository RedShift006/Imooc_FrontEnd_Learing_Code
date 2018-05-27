window.onload = function() {
    var list = document.getElementById('list');
    var lis = list.children;
    var timer;

    function removeNode(node) {
        node.parentNode.removeChild(node);
    }

    function praiseBox(box, el) {
        var praiseElement = box.getElementsByClassName('praises-total')[0];
        var oldTotal = parseInt(praiseElement.getAttribute('total'));
        var txt = el.innerHTML;

        var newTotal;
        if (txt == '赞') {
            newTotal = oldTotal + 1;
            praiseElement.innerHTML = (newTotal == 1) ? '我觉得很赞' : '我和' + oldTotal + '个人觉得很赞';
            el.innerHTML = '取消赞';
        } else {
            newTotal = oldTotal - 1;
            praiseElement.innerHTML = (newTotal == 0) ? '' : newTotal + '个人觉得很赞';
            el.innerHTML = '赞';
        }
        praiseElement.setAttribute('total', newTotal);
        praiseElement.style.display = (newTotal == 0) ? 'none' : 'block';
    }

    function replayBox(box) {
        var textarea = box.getElementsByTagName('textarea')[0];
        var list = box.getElementsByClassName('comment-list')[0];
        var li = document.createElement('div');
        li.className = 'comment-box clearfix';
        li.setAttribute('user', 'self');
        var html = '<img class="myhead" src="images/my.jpg" alt=""/>' +
            '<div class="comment-content">' +
            '<p class="comment-text"><span class="user">我：</span>' + textarea.value + '</p>' +
            '<p class="comment-time">' +
            getTime() +
            '<a href="javascript:;" class="comment-praise" total="0" my="0" style="">赞</a>' +
            '<a href="javascript:;" class="comment-operate">删除</a>' +
            '</p>' +
            '</div>';
        li.innerHTML = html;
        list.appendChild(li);
        textarea.value = '';
        textarea.onblur();




    }

    function getTime() {
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var mi = date.getMinutes();
        m = m > 9 ? m : '0' + m;
        return y + '-' + m + '-' + d + ' ' + h + ':' + mi;
    }


    function pariseReply(el) {
    	var oldTotal = parseInt(el.getAttribute('total'));
    	var my = parseInt(el.getAttribute('my'));
    	var newTotal;

    	if(my == 0) {
    		newTotal = oldTotal + 1;
    		el.setAttribute('total', newTotal);
    		el.setAttribute('my', 1);
    		el.innerHTML = newTotal + '取消赞';
    	}else {
    		newTotal = oldTotal -1;
    		el.setAttribute('total', newTotal);
    		el.setAttribute('my', 0);
    		el.innerHTML = (newTotal == 0) ? '赞': newTotal + '赞';
    		
    	}

    	el.style.display = (newTotal == 0) ? '' : 'inline-block';
    }


    function operateReply(el) {
    	var commentBox = el.parentNode.parentNode.parentNode;
    	var box = commentBox.parentNode.parentNode.parentNode;

    	var textarea = box.getElementsByTagName('textarea')[0];
    	var user = commentBox.getElementsByClassName('user')[0];

    	var txt = el.innerHTML;
    	if(txt == '回复') {
    		textarea.onfocus();
    		textarea.value = ' 回复' + user.innerHTML;
    		textarea.onkeyup();
    	}else {
    		removeNode(commentBox);
    	}
    }

    //事件代理的写法，不用逐个给元素添加事件，很好的应用
    for (var i = 0; i < lis.length; i++) {
        lis[i].onclick = function(e) {
            e = e || window.event;
            var el = e.srcElement;
            switch (el.className) {
                case 'close':
                    removeNode(el.parentNode);
                    break;

                case 'praise':
                    praiseBox(el.parentNode.parentNode.parentNode, el);
                    break;

                case 'btn btn-off':
                    clearTimeout(timer);
                    break;

                case 'btn':
                    replayBox(el.parentNode.parentNode.parentNode);
                    break;

                case 'comment-praise':
                	pariseReply(el);
                	break;

                case 'comment-operate':
                	operateReply(el);
                	break;

            }
        };

        var textarea = lis[i].getElementsByTagName('textarea')[0];
        textarea.onfocus = function() {
            this.parentNode.className = 'text-box text-box-on';
            console.log(this.value);
            this.value = this.value == '评论…' ? '' : this.value;
            this.onkeyup();
        };
        textarea.onblur = function() {
            var me = this;

            if (this.value == '') {
                timer = setTimeout(function() {
                    me.parentNode.className = 'text-box';
                    me.value = '评论…';
                }, 400);
            }
        };
        textarea.onkeyup = function(e) {
            var len = this.value.length;
            var p = this.parentNode;
            var btn = p.children[1];
            var word = p.children[2];
            if (len == 0 || len > 140) {
                btn.className = 'btn btn-off';
            } else {
                btn.className = 'btn';
            }
            word.innerHTML = len + '/140';
        };
    }

};