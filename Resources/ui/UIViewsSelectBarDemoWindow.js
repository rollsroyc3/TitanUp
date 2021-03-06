var TU = require ('/TitanUp/TitanUp');

function UIViewsSelectBarDemoWindow ()
{
	var _lEvent = null;
	var _sb1, _sb2, _sb3;
	
	var _self = Ti.UI.createWindow ({
		title: 'TU.UI.Views.SelectBar',
		backgroundColor: TU.UI.Theme.backgroundColor
	});
	
	var margin = TU.UI.Sizer.getDimension (10);
	var imgw = TU.UI.Sizer.getDimension (240);
	
	var contentview = Ti.UI.createView ({
		top: margin,
		left: margin,
		right: margin,
		bottom: margin,
		borderRadius: margin,
		borderColor: TU.UI.Theme.textColor,
		backgroundColor: TU.UI.Theme.lightBackgroundColor,
		layout: 'vertical'
	});
	
	var l, iv;
	
	l = Ti.UI.createLabel ({
		left: margin,
		right: margin,
		top: margin,
		text: "TU.UI.Views.SelectBar is an android/ios implementation of a 'TabbedBar'",
        color: TU.UI.Theme.textColor,
        font: TU.UI.Theme.fonts.small
	});

	contentview.add (l);

	// make sure width is divisible by the number of choices; this has to do with buggy rounding in
	// percentage-based widths (SelectBar uses percentage-based widths to
	// size its buttons on android)
	var ctlwidth = parseInt (TU.Device.getDisplayWidth () - 4 * margin);
    ctlwidth = ctlwidth - (ctlwidth % 3);

	
	var l;
	
	l = Ti.UI.createLabel ({
		top: margin,
		left: margin,
		text: "No deselection",
        color: TU.UI.Theme.textColor,
        font: TU.UI.Theme.fonts.mediumBold
	});
	
	contentview.add (l);
	
	_sb1 = TU.UI.createSelectBar ({
		left: margin,
		width: ctlwidth,
		top: margin,
		allow_deselect: false,
		labels: ['foo', 'bar', 'baz']
	});
	
	contentview.add (_sb1);
	
	l = Ti.UI.createLabel ({
		top: margin,
		left: margin,
		text: "Deselection",
        color: TU.UI.Theme.textColor,
        font: TU.UI.Theme.fonts.mediumBold
	});
	
	contentview.add (l);
		
	_sb2 = TU.UI.createSelectBar ({
		left: margin,
		width: ctlwidth,
		top: margin,
		labels: ['foo', 'bar', 'baz']
	});
	
	contentview.add (_sb2);
	
	l = Ti.UI.createLabel ({
		top: margin,
		left: margin,
		text: "TUchange event",
        color: TU.UI.Theme.textColor,
        font: TU.UI.Theme.fonts.mediumBold
	});
	
	contentview.add (l);
	
	_sb3 = TU.UI.createSelectBar ({
		left: margin,
		width: ctlwidth,
		top: margin,
		labels: ['foo', 'bar', 'baz']
	});
	
	_sb3.addEventListener ('TUchange', function (e) {
		_lEvent.text = "[TUchange] index: " + e.index;
	});
	
	contentview.add (_sb3);
	
	_lEvent = Ti.UI.createLabel ({
		top: margin,
		left: margin,
		text: "",
        color: TU.UI.Theme.textColor,
        font: TU.UI.Theme.fonts.medium
	});
	
	contentview.add (_lEvent);
	
	_self.add (contentview);
	
	return _self;
}

module.exports = UIViewsSelectBarDemoWindow;
