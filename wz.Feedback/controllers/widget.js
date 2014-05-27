var args = arguments[0] || {},
	isOpen = false,
	hintText;

init();

function init() {

	Ti.Gesture.addEventListener('shake', function(e) {

		// Save hintText
		hintText = $.wzFeedback_comment.value;

		// Only show once
		if (isOpen) {
			return;
		}

		isOpen = true;

		// Take screenshot
		Titanium.Media.takeScreenshot(function(e) {

			// Set values
			$.wzFeedback_comment.value = hintText;
			$.wzFeedback_screenshot.image = e.media;

			// Open window
			$.wzFeedback_window.open();
		});
	});
}

function closeWindow(evt) {
	$.wzFeedback_window.close();

	isOpen = false;
}

function sendFeedback(evt) {
	var emailDialog = Titanium.UI.createEmailDialog();

	// Not supported
	if (!emailDialog.isSupported()) {
		alert(L('wzFeedback_couldNotCreateEmail', 'Could not create email'));
		return;
	}

	emailDialog.setSubject(args.subject || L('wzFeedback_subject', 'Feedback'));

	if (args.recipients) {
		emailDialog.setToRecipients(args.recipients);
	}

	emailDialog.setMessageBody($.wzFeedback_comment.value);
	emailDialog.addAttachment($.wzFeedback_screenshot.image);

	if (OS_IOS) {
		emailDialog.setHtml(true);
	}

	emailDialog.addEventListener('complete', function(e) {
		if (e.result == emailDialog.SENT) {
			if (OS_IOS) {
				setTimeout(function(){closeWindow();},750);
			}else{
				closeWindow();
			}
		}
	});

	emailDialog.open();
}

function removeHintText(evt) {
	$.wzFeedback_comment.removeEventListener('focus', removeHintText);
	$.wzFeedback_comment.value = '';
}