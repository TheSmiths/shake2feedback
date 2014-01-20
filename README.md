# Shake2Feedback
An Alloy widget to supply instant easy feedback from an app, including screenshot.

## Install

1. Use [gitTio](http://gitt.io/component/wz.Feedback): `gittio install wz.Feedback` or download the repo as zip etc.
2. Also install ti.pain (`gittio install ti.paint`)
3. In your `alloy.js` add:

```
Alloy.createWidget('wz.Feedback', {
	recipients: ['support@company.com', 'ticket@jra.company.com']
});
```

## Use
Shake, then feedback :)

## Customize
Use the `wzFeedback_` keys to translate texts.

Use the `wzFeedback_` ID's (not classes) to overide the styles.

## License
Copyright WappZapp TV

MIT License
