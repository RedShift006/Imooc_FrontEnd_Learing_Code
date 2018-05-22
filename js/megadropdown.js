$(document).ready(function() {
	var sub = $('#sub');

	var activeRow;
	var activeMenu;

	var timer;

	var mouseInSub = false;

	sub.on('mouseenter', function(e) {
		mouseInSub = true;
	}).on('mouseleave', function(e) {
		mouseInSub = false;
	});

	$('#test')
		.on('mouseenter', function(e) {
			sub.removeClass('none');
		})
		.on('mouseleave', function(e) {
			sub.addClass('none');

			if(activeRow) {
				activeRow.removeClass('active');
				activeRow = null;
			}

			if(activeMenu) {
				activeMenu.addClass('none');
				activeMenu = null;
			}
		})
		.on('mouseenter', 'li', function(e) {
			if(!activeRow) {
				activeRow = $(e.target).addClass('active');
				activeMenu = $('#' + activeRow.data('id'));
				activeMenu.removeClass('none');
				return;
			}

			if(timer) {
				clearTimeout(timer);
			}
			// 这里元素如果存在的话，先将元素的激活状态，取消掉，然后重新复制激活元素，执行上，面同样的步骤，
			timer = setTimeout(function() {
				if(mouseInSub){
					return;
				}

				activeRow.removeClass('active');
				activeMenu.addClass('none');

				activeRow = $(e.target);
				activeRow.addClass('active');
				activeMenu = $('#' + activeRow.data('id'));
				activeMenu.removeClass('none');
				timer = null
			}, 300);
			

		});

});