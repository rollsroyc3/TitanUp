var TU = require('/TitanUp/TitanUp');

function UIViewsDatePickerDemoWindow() {
	var _sp1, _lEvent;

	var _self = Ti.UI.createWindow({
		title : 'TU.UI.Views.DatePicker',
		backgroundColor : TU.UI.Theme.backgroundColor
	});

	var margin = TU.UI.Sizer.getDimension(10);
	var imgw = TU.UI.Sizer.getDimension(240);

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
		text : "TU.UI.Views.DatePicker is an android/ios implementation of a date picker.",
		color : TU.UI.Theme.textColor,
		font : TU.UI.Theme.fonts.small
	});

	contentview.add(l);

	_sp1 = TU.UI.createDatePicker({
		left : margin,
		right : margin,
		top : margin,
		title : 'Select a Date',
		value : new Date(),
		maxDate : new Date(),
		type : Ti.UI.PICKER_TYPE_DATE,
		dateFormat : 'mm/dd/yyyy'
	});

	_sp1.addEventListener('TUchange', function(e) {
		_lEvent.text = "[TUchange] value: " + e.value;
	});

	contentview.add(_sp1);

	_lEvent = Ti.UI.createLabel({
		top : margin,
		left : margin,
		text : "",
		color : TU.UI.Theme.textColor,
		font : TU.UI.Theme.fonts.medium
	});

	contentview.add(_lEvent);

	_self.add(contentview);

	return _self;
}

module.exports = UIViewsDatePickerDemoWindow;
