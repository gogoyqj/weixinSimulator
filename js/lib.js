(function () {
	/* 篡改navigator ua */
    var trueUA = navigator.userAgent;
    Object.defineProperty(navigator, "userAgent", {
        get: function() {
            return trueUA + " MicroMessenger/6.0.0.54_r848616.501 NetType/WIFI"
        }
    });
    window.WeixinJSBridge = {
        invoke: function(api, arg, callback) {
        	debugger
        },
        on: function(event, callback) {
            this.events[event] = this.events[event] || [];
            this.events[event].push(callback)
        },
        _on: function(event, callback) {
            this._events[event] = this._events[event] || [];
            this._events[event].push(callback)
        },
        _events: {

        },
        events: {

        },
        fire: function(event, async) {
            var devEvent = this.events[event], 
            	timer = setTimeout(function() {
	            	var es = this._events[event];
		            es && es.forEach(function(func) {
		                func && func(event);
		            })
	            }, 50);
            // 用户触发，走异步进程
            if(async) {
	            if(devEvent && devEvent.length) {
	                clearTimeout(timer)
	                devEvent.forEach(function(func) {
		                func && func(event);
		            })
	            }
            };
        }
    };
    WeixinJSBridge.call = WeixinJSBridge.invoke;
    function shake(lastE) {
        var e = document.createEvent("Events"),
            ac = lastE ? lastE.accelerationIncludingGravity : false;
        e.initEvent("devicemotion", true, true);
        e.accelerationIncludingGravity = {
            x: (ac ? ac.x : 0) + (Math.random() > 0.5 ? 1 : -1) * 500 * Math.random(),
            y: (ac ? ac.y : 0) + (Math.random() > 0.5 ? 1 : -1) * 500 * Math.random(),
            z: 9.8
        };
        e.cnt = lastE ? lastE.cnt + 1 : 0;
        window.dispatchEvent(e);
        if(e.cnt < 5) setTimeout(function() {
            shake(e);
        }, 50)
    };
    var e = document.createEvent("Events");
    e.initEvent("WeixinJSBridgeReady", true, true);
    document.dispatchEvent(e);
    WeixinJSBridge.on("shake", function() {
    	shake()
    });/*摇一摇*/
    WeixinJSBridge.on("reload", function() {
    	location.reload()
    });/*刷新*/
})();