var TU = null;

/**
 * A class that makes a simple cross-platform picker.  On Android, it is a button that brings up a  dialog view with a picker.
 * On iOS, it is a button that brings up a popup picker.
 *
 * Properties
 * type = [Ti.UI.PICKER_TYPE_DATE,Ti.UI.PICKER_TYPE_TIME] - Android
 * type = [Ti.UI.PICKER_TYPE_*] - IOS
 * formatDate = 'shortDate' -  See more examples in formatDate function below, only works if type = Ti.UI.PICKER_TYPE_DATE
 *
 * Fires event: 'TUchange' (note, not 'change' like the standard picker); event object contains
 * a single property, 'value'
 */

function PickerPopup(title, value, type, maxDate) {
	var _self = null;
	var _value = ( value ? value : '');
	var _type = type;
	var _maxDate = maxDate;

	var _btnCancel = null;
	var _btnDone = null;
	var _toolbar = null;

	_self = Ti.UI.createWindow();

	var _slide_in = Titanium.UI.createAnimation({
		bottom : 0
	});

	var _slide_out = Titanium.UI.createAnimation({
		bottom : -251
	});

	var _picker_view = Titanium.UI.createView({
		height : 251,
		bottom : -251,
		width : Ti.UI.SIZE
	});

	_btnCancel = Ti.UI.createButton({
		title : 'Cancel',
		style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});

	_btnDone = Ti.UI.createButton({
		title : 'Done',
		style : Ti.UI.iPhone.SystemButtonStyle.BORDERED
	});

	var _spacer = Ti.UI.createButton({
		systemButton : Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});

	_toolbar = Ti.UI.iOS.createToolbar({
		top : 0,
		width : 320,
		items : [_btnCancel, _spacer, _btnDone],
		barColor : '#6c6c6c'
	});

	var _picker = Titanium.UI.createPicker({
		top : 43,
		type : _type,
		//type : ( _type ? _type : Ti.UI.PICKER_TYPE_DATE),
		selectionIndicator : true
	});

	if (_maxDate) {
		_picker.maxDate = _maxDate;
	}
	_picker.addEventListener("change", function(e) {
		_self.xsetValue(e.value);
	});

	_picker_view.slideIn = function(callback) {
		_picker_view.animate(_slide_in, callback());
	}
	_picker_view.slideOut = function(callback) {
		_picker_view.animate(_slide_out, callback());
	}

	_picker_view.add(_toolbar);
	_picker_view.add(_picker);
	_self.add(_picker_view);

	_btnCancel.addEventListener('click', function() {
		_picker_view.slideOut(function() {
			_self.close();
		});
	});

	_btnDone.addEventListener('click', function(e) {
		_self.fireEvent('done', {
			value : _value
		});
		_picker_view.slideOut(function() {
			_self.close();
		});
		_self.close();
	});

	_self.addEventListener('open', function() {
		_picker_view.slideIn(function() {
		});
	});

	_self.xsetValue = function(value) {
		_value = value;
	}

	return _self;
}

function DatePicker(params) {
	var _self = null;
	var _label = null;
	var _value = "";
	var _title = '';
	var _ppopup = null;
	var _type = null;
	var _maxDate = null;
	var _dateFormat = '';
	var _btn_disclosure = null;

	var newparams = {};

	for (var k in params) {
		if (k == 'value') {
			_value = params[k];
			continue;
		}
		if (k == 'title') {
			_title = params[k];
			continue;
		}
		if (k == 'type') {
			_type = params[k];
			continue;
		}
		if (k == 'maxDate') {
			_maxDate = params[k];
			continue;
		}
		if (k == 'dateFormat') {
			_dateFormat = params[k];
			continue;
		}

		newparams[k] = params[k];
	}

	if (TU.Device.getOS() == 'android') {
		if ( typeof newparams.backgroundColor != "undefined") {
			// don't set a background color on android; that will remove the "control look" of
			// the picker...
			delete newparams.backgroundColor;
		}
		Ti.API.debug('[DatePicker] newparams: ' + JSON.stringify(newparams));
		//_dateFormat
		//alert(_dateFormat);// (_type == Ti.UI.PICKER_TYPE_DATE && _dateFormat ? dateFormat(_value, _dateFormat) : _value);
		newparams.title = (_type == Ti.UI.PICKER_TYPE_DATE && _dateFormat ? dateFormat(_value, _dateFormat) : _value);
		_self = Ti.UI.createButton(newparams);
		_self.addEventListener('click', function() {
			var _datepicker = Ti.UI.createPicker(params);
			_datepicker.selectionIndicator = true;

			_ppopup = Titanium.UI.createOptionDialog({
				androidView : _datepicker,
				title : _title
			});
			_ppopup.buttonNames = ['Done', 'Cancel'];
			_ppopup.addEventListener('click', function(e) {
				if (e.index === 0) {
					_value = (_type == Ti.UI.PICKER_TYPE_DATE && _dateFormat ? dateFormat(_datepicker.value, _dateFormat) : _datepicker.value);
					_self.title = _value.toString();

					_self.fireEvent('TUchange', {
						value : _value
					});
				}
			});
			_ppopup.show();
		});
	} else {
		if ( typeof newparams.height === 'undefined') {
			newparams.height = 35;
		}
		if ( typeof newparams.borderColor === 'undefined') {
			newparams.borderColor = '#999';
		}
		if ( typeof newparams.borderRadius === 'undefined') {
			newparams.borderRadius = 5;
		}
		if ( typeof newparams.backgroundColor === 'undefined') {
			newparams.backgroundColor = '#fff';
		}
		if ( typeof newparams.font === 'undefined') {
			newparams.font = {
				fontSize : 16,
				fontWeight : 'bold'
			};
		}
		if ( typeof newparams.color === 'undefined') {
			newparams.color = '#385487';
		}

		newparams.text = _value;

		_self = Ti.UI.createView(newparams);

		var labelparams = {
			left : 10,
			top : 8,
			color : newparams.color,
			font : newparams.font,
			text : (_type == Ti.UI.PICKER_TYPE_DATE && _dateFormat ? dateFormat(_value, _dateFormat) : _value)
		};

		_label = Ti.UI.createLabel(labelparams);

		var tr = Ti.UI.create2DMatrix();
		tr = tr.rotate(90);
		_btn_disclosure = Ti.UI.createButton({
			right : 5,
			style : Ti.UI.iPhone.SystemButton.DISCLOSURE,
			transform : tr
		});

		_self.add(_label);
		_self.add(_btn_disclosure);

		_self.addEventListener('click', function(e) {
			_ppopup = new PickerPopup(_title, _value, _type, _maxDate);
			_ppopup.addEventListener('done', function(e) {
				if (e.value == _value) {
					return;
				}
				//_value = e.value;
				_value = (_type == Ti.UI.PICKER_TYPE_DATE && _dateFormat ? dateFormat(e.value, _dateFormat) : e.value);
				_label.text = _value;
				
				_self.fireEvent('TUchange', {
					value : _value
				});
			});

			_ppopup.xsetValue(_value);

			_ppopup.open();
		});
	}

	_self.xgetValue = function() {
		return _value;
	};

	_self.xsetValue = function(value) {
		_value = value;
		if (TU.Device.getOS() == 'android') {
			_self.setSelectedRow(0, i, false);
		} else {
			_label.text = _value;
		}
	}
	// }
	// };

	return _self;
}

DatePicker.TUInit = function(tu) {
	TU = tu;
};

module.exports = DatePicker;

/* http://blog.stevenlevithan.com/archives/date-time-format
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function() {
	var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g, timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g, timezoneClip = /[^-+\dA-Z]/g, pad = function(val, len) {
		val = String(val);
		len = len || 2;
		while (val.length < len)
		val = "0" + val;
		return val;
	};

	// Regexes and supporting functions are cached through closure
	return function(date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date))
			throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var _ = utc ? "getUTC" : "get", d = date[_ + "Date"](), D = date[_ + "Day"](), m = date[_ + "Month"](), y = date[_ + "FullYear"](), H = date[_ + "Hours"](), M = date[_ + "Minutes"](), s = date[_ + "Seconds"](), L = date[_ + "Milliseconds"](), o = utc ? 0 : date.getTimezoneOffset(), flags = {
			d : d,
			dd : pad(d),
			ddd : dF.i18n.dayNames[D],
			dddd : dF.i18n.dayNames[D + 7],
			m : m + 1,
			mm : pad(m + 1),
			mmm : dF.i18n.monthNames[m],
			mmmm : dF.i18n.monthNames[m + 12],
			yy : String(y).slice(2),
			yyyy : y,
			h : H % 12 || 12,
			hh : pad(H % 12 || 12),
			H : H,
			HH : pad(H),
			M : M,
			MM : pad(M),
			s : s,
			ss : pad(s),
			l : pad(L, 3),
			L : pad(L > 99 ? Math.round(L / 10) : L),
			t : H < 12 ? "a" : "p",
			tt : H < 12 ? "am" : "pm",
			T : H < 12 ? "A" : "P",
			TT : H < 12 ? "AM" : "PM",
			Z : utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
			o : (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
			S : ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
		};

		return mask.replace(token, function($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default" : "ddd mmm dd yyyy HH:MM:ss",
	shortDate : "m/d/yy",
	mediumDate : "mmm d, yyyy",
	longDate : "mmmm d, yyyy",
	fullDate : "dddd, mmmm d, yyyy",
	shortTime : "h:MM TT",
	mediumTime : "h:MM:ss TT",
	longTime : "h:MM:ss TT Z",
	isoDate : "yyyy-mm-dd",
	isoTime : "HH:MM:ss",
	isoDateTime : "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime : "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	monthNames : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};
