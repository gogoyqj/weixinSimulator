(function() {
    if(parent != window && parent.name && parent.name === "we.emulator") {
        
        window.addEventListener("message", function(data) {
            var msg = data && data.data,
                cmd = msg.action
            if(msg && msg.action) {
                switch(msg.action) {
                    // case "reload": // 刷新frame
                    // case "shake":break;// 实现摇啊摇
                    case "menu":cmd = "menu:" + msg.arg;break;
                }
                run("if(window.WeixinJSBridge){WeixinJSBridge.fire(\"" + cmd + "\", \"async\")}")
            }
        })
        function run(cmd, init) {
            var s = document.createElement("script"),
                head = document.getElementsByTagName("head")[0] || document.getElementsByTagName("html")[0]
            s.innerHTML = cmd
            s.type = "text/javascript";
            head.appendChild(s);
            if(init) return
            head.removeChild(s);
            s = null
        }
        var url = chrome.extension.getURL("js/lib.js"),
            req = new XMLHttpRequest
            req.onload = function (argument) {
                var cmd = argument.target.response
                run(cmd, "init");
            };
            req.open("get", url, false);
            req.send()
    }
})();