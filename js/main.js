if(!window.weChatEvaluator) {
	window.weChatEvaluator = {
		events: {},
		fire: function (e) {
			var evt = e.name,
				events = weChatEvaluator.events[evt],
				me = this
			if(events) events.forEach(function (item, index) {
				item.call(me, e)
			})
		},
		add: function(evt, func) {
			var events = weChatEvaluator.events[evt] || []
			weChatEvaluator.events[evt] = events
			events.push(func)
		}
	}
	chrome.browserAction.onClicked.addListener(function(tab) {
		window.open("/browser.html")
	})
}
