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
		if(txt == '赞') {
			newTotal = oldTotal + 1;
			praiseElement.innerHTML = (newTotal == 1) ? '我觉得很赞' : '我和' + oldTotal + '个人觉得很赞';
			el.innerHTML = '取消赞';
		} else {
			newTotal = oldTotal - 1;
			praiseElement.innerHTML = (newTotal == 0) ? '' :newTotal + '个人觉得很赞';
			el.innerHTML = '赞';
		}
		praiseElement.setAttribute('total', newTotal);
		praiseElement.style.display = (newTotal == 0) ? 'none' : 'block';
	}

	for (var i = 0; i < lis.length; i++) {
		lis[i].onclick = function (e) {
			e = e || window.event;
			var el = e.srcElement;
			switch (el.className) {
				case 'close' :
				removeNode(el.parentNode);
				break;

				case 'praise' :
				praiseBox(el.parentNode.parentNode.parentNode, el);
				break;

				case 'btn btn-off':
					clearTimeout(timer);
					break;
			}
		}

		var textarea = lis[i].getElementsByTagName('textarea')[0];
		textarea.onfocus = function () {
			this.parentNode.className = 'text-box text-box-on';
			console.log(this.value);
			this.value = this.value == '评论…'? '' : this.value;
			this.onkeyup();
		};
		textarea.onblur = function() {
			var me = this;

			if (this.value =='') {
				timer = setTimeout(function() {
					me.parentNode.className = 'text-box';
					me.value = '评论…';
				}, 400);
			}
		};
		textarea.onkeyup = function (e) {
			var len = this.value.length;
			var p = this.parentNode;
			var btn = p.children[1];
			var word = p.children[2];
			if (len == 0 || len > 140 ) {
				btn.className = 'btn btn-off';
			} else {
				btn.className = 'btn';
			}
			word.innerHTML = len + '/140';
		};
	}

};