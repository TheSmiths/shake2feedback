shake2feedback
==============

An Alloy widget to supply instant easy feedback from an app


Usage:

Ti.Gesture.addEventListener('shake', function(e) {
  Ti.API.info('Shake it like a polaroid picture!');
  Titanium.Media.takeScreenshot(function(event) {
      //event.media;
      Alloy.createController('Feedback', {
        media : event.media
      });
  });
});
