var TU = null;

/**
 * A class that makes a simple cross-platform toast notification.  On Android, it uses the default toast.
 * On iOS, it is a toast like view.
 */

function Toast(params) {
	var _text = '';
	var _duration = 0;

	for (var k in params) {
		if (k == 'text') {
			_text = params[k];
			continue;
		}
		if (k == 'duration') {
			_duration = params[k];
			continue;
		}
	}

	_text = ( _text ? _text : 'Hello World!');
	_duration = ( _duration ? _duration : 2000);

	if (TU.Device.getOS() == 'android') {
		Titanium.UI.createNotification({
			duration : _duration,
			message : _text
		}).show();
	} else {
		// window container
		var _self = Titanium.UI.createWindow();

		//  view
		var _view = Titanium.UI.createView({
			height : Ti.UI.SIZE,
			width : Ti.UI.SIZE,
			borderRadius : 4,
			backgroundColor : 'black',
			opacity : .8,
			bottom : 100
		});

		_self.add(_view);

		// message
		var _message = Titanium.UI.createLabel({
			text : _text,
			color : 'white',
			top : 5,
			bottom : 5,
			left : 5,
			right : 5,
			height : Ti.UI.SIZE,
			width : Ti.UI.SIZE,
			textAlign : 'center',
			font : {
				fontFamily : 'Helvetica Neue',
				fontSize : 12,
				fontWeight : 'bold'
			}
		});

		_view.add(_message);
		_self.open();
		_self.close({
			opacity : 0,
			duration : _duration
		});
	}
}

Toast.TUInit = function(tu) {
	TU = tu;
};

module.exports = Toast;
