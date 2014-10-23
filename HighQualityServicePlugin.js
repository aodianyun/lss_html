/**1.1.7.2.20140220172928**/
var _handle = null;
var _isMSIE = false;
var _ieVer = false;
var _isHasHQ = false;
var _isHasIEPlugin = false;
var _isHasChromePlugin = false;
if (isMSIE()) {
  document.getElementById("HQPlugin").innerHTML = "<OBJECT ID='HighQualityPluginForIE' CLASSID='CLSID:A2CA8D9D-0FB9-43DE-A679-F7507DC772F9' width='0' height='0' VIEWASTEXT></OBJECT>";
} else {
  document.getElementById("HQPlugin").innerHTML = "<OBJECT ID='HighQualityPluginForChrome' type='application/kkyoo.HighQualityFlashService-plugin' width='0' height='0' VIEWASTEXT></OBJECT>";
}
function isMSIE() {
  if (_isMSIE != true) {
    var ua = navigator.userAgent.toLowerCase();
    _isMSIE = ((/msie/.test(ua) || /trident/.test(ua)) && !/opera/.test(ua));
  }
  return _isMSIE;
}
function getVer() {
  if (_ieVer == false) {
    var ua = navigator.userAgent.toLowerCase();
    if (/msie/.test(ua)) {
      _ieVer = (ua.match(/msie ([\d.]+)/)[1]).split('.')[0];
    } else if (/trident/.test(ua)) {
      _ieVer = (ua.match(/rv:([\d.]+)/)[1]).split('.')[0];
    }
  }
  return _ieVer;
}
function isHasHQ() {
  if (_isHasHQ != true) {
    if (isMSIE()) {
      _isHasHQ = hasIEPlug("HIGHQUALITYFLASH.HighQualityFlashCtrl.1");
    } else {
      _isHasHQ = hasChromePlugin("kkyoo.HighQualityFlashService-plugin");
    }
  }
  return _isHasHQ;
}
function hasChromePlugin(name) {
  if (_isHasChromePlugin != true) {
    if (navigator.plugins != null && navigator.plugins.length > 0) {
      var plugin = navigator.plugins[name];
      if (plugin) {
        _isHasChromePlugin = true;
      }
    }
  }
  return _isHasChromePlugin;
}
function hasIEPlug(name) {
  if (_isHasIEPlugin != true) {
    var v = funGetPluginVersion();
    if (v) {
      _isHasIEPlugin = true;
    } else {
      _isHasIEPlugin = false;
    }
  }
  return _isHasIEPlugin;
}
function getHQ() {
  if (_handle == null) {
    if (isMSIE()) {
      _handle = document.getElementById("HighQualityPluginForIE");
    } else {
      _handle = document.getElementById("HighQualityPluginForChrome");
    }
  }
  return _handle;
}
function funHasHighQualityServicePlugin() {
  var results = {};
  results.have = isHasHQ();
  return results;
}
function funGetPluginVersion() {
  var HQ = getHQ();
  if (HQ) {
    return HQ.GetPluginVersion();
  }
  return "";
}
function GetRegPluginVersion() {
  var HQ = getHQ();
  if (HQ) {
    return HQ.GetRegPluginVersion();
  }
  return "";
}
function funGetDataPort() {}
function funGetUnacceptableProc() {}
function RestartHighQualityFlashService() {}
function CallCPluginInterface(uCmd, bOne, bTwo, uOne, uTwo, uThree, uFour, uFive, uSix, strOne, strTwo, strThree) {
  var HQ = getHQ();
  if (isMSIE()) {
    var JSO = {
      uCmd : uCmd,
      bOne : bOne,
      bTwo : bTwo,
      uOne : uOne,
      uTwo : uTwo,
      uThree : uThree,
      uFour : uFour,
      uFive : uFive,
      uSix : uSix,
      strOne : strOne,
      strTwo : strTwo,
      strThree : strThree
    };
    if (HQ)
      return HQ.ReceiveFlashCmd(JSO);
  } else {
    if (HQ)
      return HQ.ReceiveFlashCmd(uCmd, bOne, bTwo, uOne, uTwo, uThree, uFour, uFive, uSix, strOne, strTwo, strThree);
  }
}
function CallbackJsInterface() {
  var HQ = getHQ();
  if (HQ) {
    var rst = HQ.SendStatusToFlash();
    try {
      return eval('(' + rst + ')');
    } catch (err) {}
  }
}
CallFlashInterface = function (strJSON) {
  try {
    var obj = eval('(' + strJSON + ')');
    var flash = getFlash();
    if (flash) {
      flash.JsCallbackInterface(obj);
    }
  } catch (err) {}
}
function getFlash() {
  try {
    var obj = swfobject.getObjectById("ktv")
       || swfobject.getObjectById("ktvie")
       || swfobject.getObjectById("testRtmpMediaManager")
       || swfobject.getObjectById("vvMedia1");
    return obj;
  } catch (err) {}
}
function GetComputerStatus() {
  var HQ = getHQ();
  if (HQ) {
    var rst = HQ.GetComputerStatus();
    try {
      return eval('(' + rst + ')');
    } catch (err) {}
  }
}
function CheckIsHighQualityFlashServiceUsing() {
  var HQ = getHQ();
  if (HQ) {
    return HQ.CheckIsFlashServiceUsing();
  }
  return false;
}
function IsPluginHasCallback() {
  if (isMSIE() && (getVer() < 7)) {
    return false;
  }
  var HQ = getHQ();
  if (HQ) {
    return HQ.IsHasCallback();
  }
  return false;
}
function SetHostName(hostname) {
  var HQ = getHQ();
  if (HQ) {
    try {
      return HQ.SetHostName(hostname);
    } catch (err) {
      return false;
    }
  }
  return false;
}
if(typeof getHost === "function" ){
	var url = getHost();
	url = url.replace("http://","");
	SetHostName(url);
}else{
	SetHostName(window.top.location.hostname);
}

function SetFlashHostName(hostname) {
  var HQ = getHQ();
  if (HQ) {
    try {
      return HQ.SetFlashHostName(hostname);
    } catch (err) {
      return false;
    }
  }
  return false;
}
SetFlashHostName(window.location.hostname);