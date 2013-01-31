var TU = require('/TitanUp/TitanUp');

function UIViewsToastDemoWindow() {
	var _self = Ti.UI.createWindow({
		title : 'TU.UI.Views.Toast',
		backgroundColor : TU.UI.Theme.backgroundColor
	});

	var margin = TU.UI.Sizer.getDimension(10);

	var contentview = Ti.UI.createView({
		top : margin,
		left : margin,
		right : margin,
		bottom : margin,
		borderRadius : margin,
		borderColor : TU.UI.Theme.textColor,
		backgroundColor : TU.UI.Theme.lightBackgroundColor,
		layout : 'vertical'
	});

	var l;

	l = Ti.UI.createLabel({
		left : margin,
		right : margin,
		top : margin,
		text : "TU.UI.Views.Toast is an android/ios notification message that disappears after X seconds .",
		color : TU.UI.Theme.textColor,
		font : TU.UI.Theme.fonts.small
	});

	contentview.add(l);

	b = Ti.UI.createButton({
		left : margin,
		right : margin,
		top : margin,
		title : 'Show Toast'
	});

	b.addEventListener('click', function(e) {
		TU.UI.createToast({
			text : 'this is a test!',
			duration : 3000
		});
	});

	contentview.add(b);

	_self.add(contentview);

	return _self;
}

module.exports = UIViewsToastDemoWindow;
