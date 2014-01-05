var containsHintText = true;

_.extend(this, {
	feedback : null,

	construct : function(config) {
		$.screenshot.image = config.media;
		//$.screenshot.height = 600;
		$.screenshot.width = Alloy.isTablet ? 800 : 300;
		$.win.open();
	}
});

function closeWin(evt) {
	$.win.close();
}

function eraseMe() {
	$.paint.clear();
}

/**
 * Share given video on selected network
 *
 * @param {Object} evt Event details
 * @param {String} evt.id Network to share to
 */
function onSendFeedback(evt) {
	var emailDialog = Titanium.UI.createEmailDialog();
	if (!emailDialog.isSupported()) {
		Ti.UI.createAlertDialog({
			title : NO_MAIL_MESSAGE_TITLE,
			message : NO_MAIL_MESSAGE
		}).show();
		return;
	}

	emailDialog.setSubject("Feedback");
	emailDialog.setToRecipients(["YOUR_EMAIL_ADDRESSES"]); // TIP: configure a jira email address for automated JIRA ticket creation
	emailDialog.setMessageBody($.comment.value);
	emailDialog.addAttachment($.screenshot.toImage());

	if (Ti.Platform.name == 'iPhone OS') {
		emailDialog.setHtml(true);
		emailDialog.setBarColor('#336699');
	}

	emailDialog.addEventListener('complete', function(e) {
		if (e.result == emailDialog.SENT) {
			closeWin();
		} else {
			Ti.UI.createAlertDialog({
				title : L("error"),
				message : L("mail_not_sent"),
			}).show();
		}
	});
	emailDialog.open();
}

function focusComment (evt) {
	if (containsHintText) {
		$.comment.value = "";
		containsHintText = false;
	}
}
