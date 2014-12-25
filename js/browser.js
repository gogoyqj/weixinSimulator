function g(id) {
	return document.getElementById(id)
}
window.name = "we.emulator"
var doc
window.addEventListener("load", function (e) {
	doc = g("document")
	var menu = g("menu"),
		tpl = '<li><button id="#{en}">#{cn}</button></li>',
		menus = [
			{
				en: "share:timeline",
				cn: "分享到朋友圈"
			},
			{
				en: "share:appmessage",
				cn: "发送给朋友"
			},
			{
				en: "share:weibo",
				cn: "分享到微博"
			}
		],
		html = ""
		menus.forEach(function(item) {
			html += tpl.replace(/#\{[^\}]+\}/g, function(mat) {
				var mt = mat.replace(/^#\{|\}$/g, "")
				return item[mt] == void 0 ? mat : item[mt]
			})
		})
		menu.innerHTML = html + '<li><button id="shake">摇一摇</button></li>'
		menu.onclick = function(e) {
			var tar = e.target
			if(tar.tagName.toLowerCase() === "button") {
				menuFunc(tar.id)
			}
		}
		browse("http://127.0.0.1:8087/test/weAPI/")
})
var dic = {
	82: true, // r
	116: true // f5
}
function key(e) {
	var code = e.keyCode
	if ((e.ctrlKey || e.metaKey) && (code in dic) || code === 116) {
		e.preventDefault()
		send({
			action: "reload"
		})
	}
}
document.addEventListener("keydown", key)
document.addEventListener("keypress", key)
function browse(url) {
	doc.src = url
}
function menuFunc(arg) {
	send({
		action: arg != "shake" ? "menu" : "shake",
		arg: arg
	})
}
function send(arg) {
	doc.contentWindow.postMessage(arg, "*")
}
window.addEventListener("message", function(msg) {
	console.log(msg)
})