// play Event
var PLAY_ERROR = "RTMPMEDIA.PLAY.ERROR";
var PLAY_INFO = "RTMPMEDIA.PLAY.INFO";
var PLAY_NETSTREAM_INFO = "RTMPMEDIA.PLAY.NETSTREAM.INFO";
// publish Event
var PUBLISH_ERROR = "RTMPMEDIA.PUBLISH.ERROR";
var PUBLISH_INFO = "RTMPMEDIA.PUBLISH.INFO";
var PUBLISH_NETSTREAM_INFO = "RTMPMEDIA.PUBLISH.NETSTREAM.INFO";
// schedul Event
var SCHEDULE_RESULT = "SchedulRequest.Result";
var SCHEDULE_ERROR = "SchedulRequest.Error";
var SCHEDULE_INFO = "SchedulRequest.Info";
var SCHEDULE_FINISH = "RtmpMedia.Initialize.Success";
// server version Event
var GET_SVR_VERSION_ERR = "GetSvrVersion.Error";
var GET_SVR_VERSION_INFO = "GetSvrVersion.Info";
// client version Event
var CHECK_VERSION_INFO = "Check.Version.Info";
var CHECK_VERSION_ERROR = "Check.Version.Error";
// media Event
var RTMP_MEDIA_ERROR = "RtmpMedia.Error";
var RTMP_MEDIA_INFO = "RtmpMedia.Info";
var RTMP_MEDIA_NETSTREAM_INFO = "RtmpMedia.NetStreamInfo";
var RTMP_MEDIA_DEBUG = "RtmpMedia.Debug";
var RTMP_MEDIA_READY = "RtmpMedia.Ready";
var RTMP_MEDIA_STATISTICS = "RtmpMedia.Statistics";
// media control Event
var RTMP_MEIDA_CONTROL_INFO = "RtmpMedia.Control.Info";
var RTMP_MEIDA_CONTROL_ERROR = "RtmpMedia.Control.Error";
// socket Event
var SOCKET_PING_CONNECT = "SocketPing.Connected";
var SOCKET_PING_ERROR = "SocketPing.Error";
var SOCKET_PING_PING_DONE = "SocketPing.Ping.Done";
// media device Event
var MEDIA_DEVICE_INFO = "Media.Device.Info";
var RTMP_PEPFLASH = "Rtmp.PepFlash";

var UUID_BASE = 0;
var THIS_SWF_NAME = LSS_SITE + "/lss/lssplayer/vvMedia.swf";
var globalUUID_CallbackFuncMap = {};
var globalUUID_OnSwfReadyFuncMap = {};
// 视频显示对象
function Video(id, width, height, callbackFunc, params) {
	if (typeof id == "number") {
		id = parseInt(id).toString();
	} else if (typeof id == "string"){
	}else{
		return;
	}
	if (typeof params == "object") {
		var len = 0;
		for (var i in params) {
			len++;
		}
		if (len) {
			this.params /*object*/ = params;
		}
	}
	this.id /*string*/ = id;
	this.uuid /*string*/ = generateUUID();
	this.width /*string*/ = width;
	this.height /*string*/ = height;
	this.params /*object*/ = null;
	this.handle = null;
	createVideo(this.id, this.uuid, this.width, this.height, this.params);
	if (typeof callbackFunc == "function") {
		globalUUID_CallbackFuncMap[this.uuid] = callbackFunc;
	}
	globalUUID_OnSwfReadyFuncMap[this.uuid] = this.onSwfReady;
}
// SWF加载完成消息
Video.prototype.onSwfReady = function () {
	this.handle = document.getElementById(this.uuid);
	if (this.handle) {
	}else {
		alert("can't find swf");
	}
}
// 初始化连接
// 注：如果rtmpAddr有多个，使用英文逗号分割

Video.prototype.initConnect = function (rtmpAddr,/*string*/
										rtmpLive,/*string*/
										rtmpStream,/*string*/
										rtmpArea,/*string*/
										schedulingPing,/*uint*/
										limitCheckPing,/*uint*/
										checkPingTimer,/*uint*/
										userID,/*string*/
										isHD,/*boolean*/
										session,/*string*/
										isUDP,/*boolean*/
										key/*string*/) {
	if (this.handle) {
		if (typeof rtmpAddr != "string"
			|| typeof rtmpLive != "string"
			|| typeof rtmpStream != "string"
			|| typeof rtmpArea != "string"
			|| typeof userID != "string"
			|| typeof session != "string"
			|| typeof isHD != "boolean"
			|| typeof isUDP != "boolean"
			|| typeof key != "string"){
			return;
		}
		if (typeof schedulingPing == "number" || typeof schedulingPing == "string") {
			schedulingPing = parseInt(schedulingPing);
		}else{
			return;
		}
		if (typeof limitCheckPing == "number" || typeof limitCheckPing == "string") {
			limitCheckPing = parseInt(limitCheckPing);
		}else{
			return;
		}
		if (typeof checkPingTimer == "number" || typeof checkPingTimer == "string") {
			checkPingTimer = parseInt(checkPingTimer);
		}else{
			return;
		}
		this.handle.initConnect(encodeFlashData(rtmpAddr),
								encodeFlashData(rtmpLive),
								encodeFlashData(rtmpStream),
								encodeFlashData(rtmpArea),
								1500,
								300,
								1000,
								encodeFlashData(userID),
								isHD,
								encodeFlashData(session),
								isUDP,
								encodeFlashData(key));
	}
}


Video.prototype.initConnectad = function () {
	if (this.handle) {
		this.handle.initConnectad();
	}
} 

// 关闭连接
Video.prototype.closeConnect = function () {
	if (this.handle) {
		this.handle.closeConnect();
	}
}
// 上麦
Video.prototype.startPublish = function (width,/*uint*/
										height,/*uint*/
										micID,/*uint*/
										camID,/*uint*/
										audioCodec,/*string*/
										videoCodec,/*string*/
										audioKBitrate,/*uint*/
										audioSamplerate,/*uint*/
										fps,/*uint*/
										keyFrameInterval,/*uint*/
										videoKBitrate,/*uint*/
										videoQuality,/*uint*/
										volume,/*uint*/
										isUseCam,/*boolean*/
										isUseMic,/*boolean*/
										isHD,/*boolean*/
										isUDP,/*boolean*/
										isMute/*boolean*/) {
	if (this.handle) {
		if (typeof audioCodec != "string"
			|| typeof videoCodec != "string"
			|| typeof isUseCam != "boolean"
			|| typeof isUseMic != "boolean"
			|| typeof isHD != "boolean"
			|| typeof isUDP != "boolean"
			|| typeof isMute != "boolean"){
			return;
		}
		if (typeof width == "number" || typeof width == "string") {
			width = parseInt(width);
		}else{
			return;
		}
		if (typeof height == "number" || typeof height == "string") {
			height = parseInt(height);
		}else{
			return;
		}
		if (typeof micID == "number" || typeof micID == "string") {
			micID = parseInt(micID);
		}else{
			return;
		}
		if (typeof camID == "number" || typeof camID == "string") {
			camID = parseInt(camID);
		}else{
			return;
		}
		if (typeof audioKBitrate == "number" || typeof audioKBitrate == "string") {
			audioKBitrate = parseInt(audioKBitrate);
		}else{
			return;
		}
		if (typeof audioSamplerate == "number" || typeof audioSamplerate == "string") {
			audioSamplerate = parseInt(audioSamplerate);
		}else{
			return;
		}
		if (typeof fps == "number" || typeof fps == "string") {
			fps = parseInt(fps);
		}else{
			return;
		}
		if (typeof keyFrameInterval == "number" || typeof keyFrameInterval == "string") {
			keyFrameInterval = parseInt(keyFrameInterval);
		}else{
			return;
		}
		if (typeof videoKBitrate == "number" || typeof videoKBitrate == "string") {
			videoKBitrate = parseInt(videoKBitrate);
		}else{
			return;
		}
		if (typeof videoQuality == "number" || typeof videoQuality == "string") {
			videoQuality = parseInt(videoQuality);
		}else{
			return;
		}
		if (typeof volume == "number" || typeof volume == "string") {
			volume = parseInt(volume);
		}else{
			return;
		}
		this.handle.startPublish(width,
								height,
								micID,
								camID,
								encodeFlashData(audioCodec),
								encodeFlashData(videoCodec),
								audioKBitrate,
								audioSamplerate,
								fps,
								keyFrameInterval,
								videoKBitrate,
								videoQuality,
								volume,
								isUseCam,
								isUseMic,
								isHD,
								isUDP,
								isMute);
	}
}
// 暂停上麦
Video.prototype.pausePublish = function () {
	if (this.handle) {
		this.handle.pausePublish();
	}
}
// 停止上麦
Video.prototype.stopPublish = function () {
	if (this.handle) {
		this.handle.stopPublish();
	}
}
// 播放
Video.prototype.startPlay_ = function ( rtmpStream, /*string*/
										bufferTime,/*uint*/
									   speedupRange,/*uint reserved,set 0*/
									   speedupTime,/*uint reserved,set 0*/
									   speedupSpeed,/*uint reserved,set 0*/
									   volume,/*uint*/
									   isMute/*Boolean*/) {

	if (this.handle) {
		if (typeof isMute != "boolean"){
			return;
		}
		if (typeof bufferTime == "number" || typeof bufferTime == "string") {
			bufferTime = parseInt(bufferTime);
		}else{
			return;
		}
		if (typeof speedupRange == "number" || typeof speedupRange == "string") {
			speedupRange = parseInt(speedupRange);
		}else{
			return;
		}
		if (typeof speedupTime == "number" || typeof speedupTime == "string") {
			speedupTime = parseInt(speedupTime);
		}else{
			return;
		}
		if (typeof speedupSpeed == "number" || typeof speedupSpeed == "string") {
			speedupSpeed = parseInt(speedupSpeed);
		}else{
			return;
		}
		if (typeof volume == "number" || typeof volume == "string") {
			volume = parseInt(volume);
		}else{
			return;
		}
		//alert("String:"+String(rtmpStream));
		this.handle.startPlay_(rtmpStream, bufferTime, speedupRange, speedupTime, speedupSpeed, volume, isMute);
	}
}

Video.prototype.testDisplay = function () {
	if (this.handle) {
		this.handle.testDisplay();
	}
}

// 暂停播放
Video.prototype.pausePlay = function () {
	if (this.handle) {
		this.handle.pausePlay();
	}
}
// 停止播放
Video.prototype.stopPlay = function () {
	if (this.handle) {
		this.handle.stopPlay_();
	}
}
// 暂停上麦/播放
Video.prototype.pause = function () {
	this.pausePublish();
	this.pausePlay();
}
// 停止上麦/播放
Video.prototype.stop = function () {
	this.stopPublish();
	this.stopPlay_();
}
// 切换务器，initConnect()之后调用有效
Video.prototype.changeServer = function (addr/*string*/, lineType/*string*/){
	if (this.handle) {
		if (typeof addr != "string"
			|| typeof lineType != "string"){
			return;
		}
		return this.handle.changeServer(encodeFlashData(addr), encodeFlashData(lineType));
	}
}
//获取play流信息
Video.prototype.getPlayStreamInfo = function () /*Number*/{
	if (this.handle) {
		return this.handle.getPlayStreamInfo();  
	}
}
//获取publish流信息
Video.prototype.getPublishStreamInfo = function () /*Number*/{
	if (this.handle) {
		return this.handle.getPublishStreamInfo();
	}
}
// 获取play累计流量
Video.prototype.getByteCount = function () /*Number*/{
	if (this.handle) {
		return this.handle.getByteCount();
	}
}
//获取play平均码率
Video.prototype.getAvgBitrate = function () /*Number*/{
	if (this.handle) {
		return this.handle.getAvgBitrate();
	}
}
//获取play最大码率
Video.prototype.getMaxBitrate = function () /*Number*/{
	if (this.handle) {
		return this.handle.getMaxBitrate();
	}
}

// 获取publish累计流量
Video.prototype.getPublishByteCount = function () /*Number*/{
	if (this.handle) {
		return this.handle.getPublishByteCount();
	}
}
//获取publish平均码率
Video.prototype.getPublishAvgBitrate = function () /*Number*/{
	if (this.handle) {
		return this.handle.getPublishAvgBitrate();
	}
}
//获取publish最大码率
Video.prototype.getPublishMaxBitrate = function () /*Number*/{
	if (this.handle) {
		return this.handle.getPublishMaxBitrate();
	}
}

//  当前帧率
Video.prototype.getCurrentFPS= function () /*Number*/{
	if (this.handle) {
		return this.handle.getCurrentFPS();
	}
}
//音频码率
Video.prototype.getAudioBytesPerSecond= function () /*Number*/{
	if (this.handle) {
		return this.handle.getAudioBytesPerSecond();
	}
}
//视频码率
Video.prototype.getVideoBytesPerSecond= function () /*Number*/{
	if (this.handle) {
		return this.handle.getVideoBytesPerSecond();
	}
}
//当前码率
Video.prototype.getCurrentBytesPerSecond= function () /*Number*/{
	if (this.handle) {
		return this.handle.getCurrentBytesPerSecond();
	}
}
//获取字节数
Video.prototype.getCurrentByteCount= function () /*Number*/{
	if (this.handle) {
		return this.handle.getCurrentByteCount();
	}
}
//缓冲区时间
Video.prototype.getBufferLength= function () /*Number*/{
	if (this.handle) {
		return this.handle.getBufferLength();
	}
}
//音频缓冲区时间
Video.prototype.getAudioBufferLength= function () /*Number*/{
	if (this.handle) {
		return this.handle.getAudioBufferLength();
	}
}
//视频缓冲区时间
Video.prototype.getVideoBufferLength= function () /*Number*/{
	if (this.handle) {
		return this.handle.getVideoBufferLength();
	}
}
//音频编码
Video.prototype.getAudioCodec= function () /*String*/{
	if (this.handle) {
		return this.handle.getAudioCodec();
	}
}
//视频编码
Video.prototype.getVideoCodec= function () /*String*/{
	if (this.handle) {
		return this.handle.getVideoCodec();
	}
}
//原始视频宽
Video.prototype.getVideoWidth= function () /*Number*/{
	if (this.handle) {
		return this.handle.getVideoWidth();
	}
}
//原始视频高
Video.prototype.getVideoHeight= function () /*Number*/{
	if (this.handle) {
		return this.handle.getVideoHeight();
	}
}
//上麦视频宽
Video.prototype.getPublishVideoWidth= function () /*Number*/{
	if (this.handle) {
		return this.handle.getPublishVideoWidth();
	}
}
//上麦视频高
Video.prototype.getPublishVideoHeight= function () /*Number*/{
	if (this.handle) {
		return this.handle.getPublishVideoHeight();
	}
}

//音频设备
Video.prototype.getMicName= function () /*String*/{
	if (this.handle) {
		return this.handle.getMicName();
	}
}
 //视频设备
Video.prototype.getCameraName= function () /*String*/{
	if (this.handle) {
		return this.handle.getCameraName();
	}
}

// 获取vvMedia版本
Video.prototype.getClientVersion = function ()/*string*/{
	if (this.handle) {
		return this.handle.getClientVersion();
	}
}
// 获取高清插件版本
Video.prototype.getHQVersion = function ()/*string*/{
	if (this.handle) {
		return this.handle.getHQVersion();
	}
}
// 获取受支持的高清插件的最低版本
Video.prototype.getLowestSupportHQVersion = function ()/*string*/{
	if (this.handle) {
		return this.handle.getLowestSupportHQVersion();
	}
}
// 获取flash版本，initConnect()之后调用有效
Video.prototype.getFlashVersion = function ()/*string*/{
	if (this.handle) {
		return this.handle.getFlashVersion();
	}
}
// 获取服务器版本，initConnect()之后调用有效
Video.prototype.getServerVersion = function ()/*string*/{
	if (this.handle) {
		return this.handle.getServerVersion();
	}
}
// 获取当前正在使用的服务器，initConnect()之后调用有效
Video.prototype.getCurrentServer = function ()/*string*/
{
	if (this.handle) {
		return this.handle.getCurrentServer();
	}
}
// 获取当前保存的服务器列表，以逗号分隔
Video.prototype.getChangeSvrList = function()/*string*/
{
	if (this.handle) {
		return this.handle.getChangeSvrList();
	}
}
// 获取音频编码列表，以逗号分隔
Video.prototype.getAudioCodecSet = function ()/*string*/
{
	if (this.handle) {
		return this.handle.getAudioCodecSet();
	}
}
// 获取视频编码列表，以逗号分隔
Video.prototype.getVideoCodecSet = function ()/*string*/
{
	if (this.handle) {
		return this.handle.getVideoCodecSet();
	}
}
// 获取麦克风列表
Video.prototype.getMicList = function ()/*array*/
{
	if (this.handle) {
		return this.handle.getMicList();
	}
}
// 获取摄像头列表
Video.prototype.getCamList = function ()/*array*/
{
	if (this.handle) {
		return this.handle.getCamList();
	}
}
// 设置高清模式，initConnect()之后调用有效
Video.prototype.setHD = function (isHD /*boolean*/) {
	if (this.handle) {
		if (typeof isHD != "boolean"){
			return;
		}
		return this.handle.setHD(isHD);
	}
}
// 设置UDP模式，initConnect()之后调用有效
Video.prototype.setUDP = function (isUDP /*boolean*/) {
	if (this.handle) {
		if (typeof isUDP != "boolean"){
			return;
		}
		return this.handle.setUDP(isUDP);
	}
}
// 设置音频编码，initConnect()之后调用有效
Video.prototype.setAudioCodec = function (audioCodec /*string*/) {
	if (this.handle) {
		if (typeof audioCodec != "string"){
			return;
		}
		return this.handle.setAudioCodec(encodeFlashData(audioCodec));
	}
}
// 设置视频编码，initConnect()之后调用有效
Video.prototype.setVideoCodec = function (videoCodec /*string*/) {
	if (this.handle) {
		if (typeof videoCodec != "string"){
			return;
		}
		return this.handle.setVideoCodec(encodeFlashData(videoCodec));
	}
}
// 设置音频码率 仅speex编码，initConnect()之后调用有效
Video.prototype.setAudioBitrate = function (audioKBitrate /*uint*/) {
	if (this.handle) {
		if (typeof audioKBitrate == "number" || typeof audioKBitrate == "string") {
			audioKBitrate = parseInt(audioKBitrate);
		}else{
			return;
		}
		return this.handle.setAudioBitrate(audioKBitrate);
	}
}
// 设置音频采样率，initConnect()之后调用有效
Video.prototype.setAudioSamplerate = function (audioSamplerate /*uint*/) {
	if (this.handle) {
		if (typeof audioSamplerate == "number" || typeof audioSamplerate == "string") {
			audioSamplerate = parseInt(audioSamplerate);
		}else{
			return;
		}
		return this.handle.setAudioSamplerate(audioSamplerate);
	}
}
// 设置音频通道，initConnect()之后调用有效
Video.prototype.setAudioChannelCount = function (channelCount /*uint*/) {
	if (this.handle) {
		if (typeof channelCount == "number" || typeof channelCount == "string") {
			channelCount = parseInt(channelCount);
		}else{
			return;
		}
		return this.handle.setAudioChannelCount(channelCount);
	}
}
// 设置音频采样精度，initConnect()之后调用有效
Video.prototype.setAudioBitPerSample = function (audioBitPerSample /*uint*/) {
	if (this.handle) {
		if (typeof audioBitPerSample == "number" || typeof audioBitPerSample == "string") {
			audioBitPerSample = parseInt(audioBitPerSample);
		}else{
			return;
		}
		return this.handle.setAudioBitPerSample(audioBitPerSample);
	}
}
// 设置关键帧间隔，initConnect()之后调用有效
Video.prototype.setKeyFrameInterval = function (keyFrameInterval /*uint*/) {
	if (this.handle) {
		if (typeof keyFrameInterval == "number" || typeof keyFrameInterval == "string") {
			keyFrameInterval = parseInt(keyFrameInterval);
		}else{
			return;
		}
		return this.handle.setKeyFrameInterval(keyFrameInterval);
	}
}
// 设置视频宽高，帧率，initConnect()之后调用有效
Video.prototype.setCameraMode = function (width /*uint*/, height /*uint*/, fps /*uint*/) {
	if (this.handle) {
		if (typeof width == "number" || typeof width == "string") {
			width = parseInt(width);
		}else{
			return;
		}
		if (typeof height == "number" || typeof height == "string") {
			height = parseInt(height);
		}else{
			return;
		}
		if (typeof fps == "number" || typeof fps == "string") {
			fps = parseInt(fps);
		}else{
			return;
		}
		return this.handle.setCameraMode(width, height, fps);
	}
}
// 设置视频码率，质量，initConnect()之后调用有效
Video.prototype.setCameraQuality = function (videoKBitrate /*uint*/, videoQuality /*uint*/) {
	if (this.handle) {
		if (typeof videoKBitrate == "number" || typeof videoKBitrate == "string") {
			videoKBitrate = parseInt(videoKBitrate);
		}else{
			return;
		}
		if (typeof videoQuality == "number" || typeof videoQuality == "string") {
			videoQuality = parseInt(videoQuality);
		}else{
			return;
		}
		return this.handle.setCameraQuality(videoKBitrate, videoQuality);
	}
}
// 设置是否使用摄像头，initConnect()之后调用有效
Video.prototype.setIsUseCam = function (isUseCam /*Boolean*/) {
	if (this.handle) {
		if (typeof isUseCam != "boolean"){
			return;
		}
		return this.handle.setIsUseCam(isUseCam);
	}
}
// 设置是否使用麦克风，initConnect()之后调用有效
Video.prototype.setIsUseMic = function (isUseMic /*Boolean*/) {
	if (this.handle) {
		if (typeof isUseMic != "boolean"){
			return;
		}
		return this.handle.setIsUseMic(isUseMic);
	}
}
// 设置音量，initConnect()之后调用有效
Video.prototype.setVolume = function (volume /*uint*/) {
	if (this.handle) {
		if (typeof volume == "number" || typeof volume == "string") {
			volume = parseInt(volume);
		}else{
			return;
		}
		return this.handle.setVolume(volume);
	}
}
// 设置是否静音，initConnect()之后调用有效
Video.prototype.setMute = function (isMute /*Boolean*/) {
	if (this.handle) {
		if (typeof isMute != "boolean"){
			return;
		}
		return this.handle.setMute(isMute);
	}
}
// 播放模式 实时、质量、自定义，initConnect()之后调用有效
Video.prototype.setPlayMode = function (bufferTime /*uint*/,
										speedupRange /*uint*/,
										speedupTime /*uint*/,
										speedupSpeed /*uint*/) {
	if (this.handle) {
		if (typeof bufferTime == "number" || typeof bufferTime == "string") {
			bufferTime = parseInt(bufferTime);
		}else{
			return;
		}
		if (typeof speedupRange == "number" || typeof speedupRange == "string") {
			speedupRange = parseInt(speedupRange);
		}else{
			return;
		}
		if (typeof speedupTime == "number" || typeof speedupTime == "string") {
			speedupTime = parseInt(speedupTime);
		}else{
			return;
		}
		if (typeof speedupSpeed == "number" || typeof speedupSpeed == "string") {
			speedupSpeed = parseInt(speedupSpeed);
		}else{
			return;
		}
		return this.handle.setPlayMode(bufferTime, speedupRange, speedupTime, speedupSpeed);
	}
}
// 上麦时，切换摄像头，initConnect()之后调用有效
Video.prototype.setCam = function (camID /*int*/) {
	if (this.handle) {
		if (typeof camID == "number" || typeof camID == "string") {
			camID = parseInt(camID);
		}else{
			return;
		}
		return this.handle.setCam(camID);
	}
}
// 上麦时，切换麦克风，initConnect()之后调用有效
Video.prototype.setMic = function (micID /*int*/) {
	if (this.handle) {
		if (typeof micID == "number" || typeof micID == "string") {
			micID = parseInt(micID);
		}else{
			return;
		}
		return this.handle.setMic(micID);
	}
}
// 设置播放窗口大小，initConnect()之后调用有效
Video.prototype.setVideoDisplaySize = function (width/*uint*/, height/*uint*/) {
	if (this.handle) {
		if (typeof width == "number" || typeof width == "string") {
			width = parseInt(width);
		}else{
			return;
		}
		if (typeof height == "number" || typeof height == "string") {
			height = parseInt(height);
		}else{
			return;
		}
		return this.handle.setVideoDisplaySize(width, height);
	}
}
// 设置是否接收音频，initConnect()之后调用有效
Video.prototype.setReceiveAudio = function (isReceive/*Boolean*/) {
	if (this.handle) {
		return this.handle.setReceiveAudio(isReceive);
	}
}
// 设置是否接收视频，initConnect()之后调用有效
Video.prototype.setReceiveVideo = function (isReceive/*Boolean*/) {
	if (this.handle) {
		if (typeof isReceive != "boolean"){
			return;
		}
		return this.handle.setReceiveVideo(isReceive);
	}
}
// 获取flash版本，initConnect()之后调用有效
Video.prototype.getFlashVersion = function ()/*string*/{
	if (this.handle) {
		return this.handle.getFlashVersion();
	}
}
// 设置使用麦克风，initConnect()之后调用有效
/*bool*/ Video.prototype.setCapAudioFromMic = function (){
	if (this.handle) {
		return this.handle.setCapAudioFromMic();
	}
}
// 设置使用混音，initConnect()之后调用有效
/*bool*/ Video.prototype.setCapAudioFromStereo = function (){
	if (this.handle) {
		return this.handle.setCapAudioFromStereo();
	}
}
// 下载高清插件
Video.prototype.downloadHD = function () {
	if (this.handle) {
		return this.handle.downloadHD();
	}
}
// 浏览器是否支持使用高清 return {type:2, describe:"HQPlugin Need Update"}
/**
 * type
 * 1. 插件可以使用
 * 2. 插件未安装
 * 3. 插件需要更新
 * 4. 浏览器不支持插件
 **/
Video.prototype.checkPlugin = function () {
	if (this.handle) {
		return this.handle.checkPlugin();
	}
}
// 设置带宽不足提示条件 ping
Video.prototype.setAvgPing = function (ping/*uint*/) {
	if (this.handle) {
		if (typeof ping == "number" || typeof ping == "string") {
			ping = parseInt(ping);
		}else{
			return;
		}
		return this.handle.setAvgPing(ping);
	}
}
// 添加回调
Video.prototype.addEventListener = function (callbackFunc) {
	if (typeof callbackFunc == "function") {
		globalUUID_CallbackFuncMap[this.uuid] = callbackFunc;
	}
}
// 回调消息
function lssCallBack(uuid, type, info) {
	if (globalUUID_CallbackFuncMap[uuid]){
		globalUUID_CallbackFuncMap[uuid](type, info);
	}
}
// 生成全局UUID
// 注意：不包含以下字符：. - + * \ /
function generateUUID() {
	UUID_BASE++;
	return ('vvMedia' + UUID_BASE);
}
// 所有发送给flash的字符串都必须经过此方法编码
function encodeFlashData(str) {
  str = str.toString().replace(/\\/g, '\\\\');
  str = str.replace(/&/g, '__FLASH__AMPERSAND');
  return str;
}
// 创建SWF对象
function createVideo(id, uuid, width, height, param) {
	param = param || {};
	var displayid = id.toString();
	var swfVersionStr = "11.1.0";
	// To use express install, set to playerProductInstall.swf, otherwise the empty string.
	var xiSwfUrlStr = LSS_SITE + "/lss/lssplayer/playerProductInstall.swf";
	var flashvars = {};
	flashvars.uuid = uuid;
	var params = {};
	params.quality = param["quality"] || "high";
	params.bgcolor = param["bgcolor"] || "#ffffff";
	//params.allowscriptaccess = param["allowscriptaccess"] || "sameDomain";
	params.allowfullscreen = param["allowfullscreen"] || "true";
	params.allowScriptAccess = "always";
	var attributes = {};
	attributes.id = uuid;
	attributes.name = uuid;
	attributes.align = param["align"] || "middle";
	swfobject.embedSWF(
		THIS_SWF_NAME, displayid,
		width, height,
		swfVersionStr, xiSwfUrlStr,
		flashvars, params, attributes);
		swfobject.createCSS("#flashContent", "display:block;text-align:left;");
}

function lssplayerRun(conf){
	if(!conf.uin||conf.uin==""||!conf.app||conf.app==""||!conf.stream||conf.stream==""){
		console.log("缺少必要的参数：app、stream");
		return;
	}
	
	var pageHost = ((document.location.protocol == "https:") ? "https://" : "http://");
	var html = '<p>To view this page ensure that Adobe Flash Player version 11.0.0 or greater is installed.</p><a href="http://www.adobe.com/go/getflashplayer"><img src="' + pageHost + '"www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" /></a>';
	$('#'+conf.container).html(html);
	
	var mode = /^\d{0,6}(\%)?$/;
	var width = mode.test(conf.player.width) ? conf.player.width : '100%';
	var height = mode.test(conf.player.height) ? conf.player.height : '100%';
	var containerWidth = document.getElementById(conf.container).scrollWidth;
	var containerHeight = document.getElementById(conf.container).scrollHeight;
	var mode = /^\d{0,6}$/;
	if(mode.test(width)){
		width = parseInt(width);
	}
	else{
		width = (width.substr(0,width.length-1).toString(0)/100) * containerWidth;
	}
	if(mode.test(height)){
		height = parseInt(height);
	}
	else{
		height = (height.substr(0,height.length-1).toString(0)/100) * containerHeight;
	}
	
	var autostart = typeof(conf.player.autostart)=='boolean'?conf.player.autostart:false;
	var _bufferTime = mode.test(conf.player.bufferlength) ? parseInt(conf.player.bufferlength) : 3;
	
	var _rtmpLive = conf.app;
	var _rtmpAddr = 'rtmp://'+ conf.uin +'.lssplay.aodianyun.com/' + _rtmpLive;
	var _rtmpStream = conf.stream;
	var _key = conf.key ? conf.key : '';//密码
	var _rtmpArea = 'hangzhou';
	var _schedulingPing = '1500';//调度时Ping超时
	var _limitCheckPing = '300';//播放时超过Ping就切换服务器
	var _checkPingTimer = '1000';//检测Ping间隔
	var _userID = 'Test';
	var _isHD = false;//是否高清
	var _session = 'TestSession';
	var _isUDP = false;//是否UDP
	var _speedupRange = '0';
	var _speedupTime = '0';
	var _speedupSpeed = '0';
	var _volume = '80';//音量
	var _isMute = false;//是否静音
	var _totalFlow = 0;//总流量
	var _avgBitrate = 0;//平均码率
	var _maxBitrate = 0;//峰值码率
	var _mediaInfo = '';//流媒体传输信息
	
	var player1 = new Video(conf.container,width,height,
				  function(type, info){
					 switch(type)
					 {
					  case RTMP_MEDIA_INFO:
						  switch(info)
						  {
						  case "Svr.Version.Success":
							  break;
						  case "NetConnection.Connect.Success":
						  case "ChangeInfo.NetConnection.Connect.Success":
						  case "new connect":
							  break;
						  case SCHEDULE_FINISH:
							  break;
						  case RTMP_PEPFLASH:
							  alert("警告：\n\n系统检测到您正在使用 Pepper Flash Player，\n\n此版本的 Flash 并不完善，请尝试更换IE浏览器，\n\n或百度“如何禁用Pepper Flash”。");
							  player1.closeConnect();
							  break;
						  default:
							  break;
						  }
						  break;
					  case RTMP_MEDIA_ERROR:
						  break;
					  case MEDIA_DEVICE_INFO:
						  switch(info)
						  {
						  case "AVHardwareDisable":
							  alert("flash player 全局设置了禁用硬件设置，修改方法：\nC:\WINDOWS\system32\Macromed\Flash\mms.cfg\n文件，修改为 AVHardwareDisable=0");;
							  break;
						  //需要添加其他摄像头麦克风禁用的消息
						  default:
							  break;
						  }
						  break;
					  case RTMP_MEDIA_READY:	//swf加载完成消息
						  player1.onSwfReady();
						  player1.initConnect(_rtmpAddr,_rtmpLive,_rtmpStream,_rtmpArea,_schedulingPing,_limitCheckPing,_checkPingTimer,_userID,_isHD,_session,_isUDP,_key);
						  if(autostart == true){
							  player1.startPlay(_rtmpStream,_bufferTime,_speedupRange, _speedupTime,_speedupSpeed,_volume,_isMute);
						  }
						  break;
					  case RTMP_MEDIA_NETSTREAM_INFO:
						  break;
					  case RTMP_MEDIA_STATISTICS:
						  var obj = JSON.parse(info);
						  if (obj) {
							  if (obj.totalFlow >= 1048576) {
								  _totalFlow = (obj.totalFlow / 1048576).toFixed(2) + "MB";
							  } else {
								  _totalFlow = (obj.totalFlow / 1024).toFixed(2) + "KB";
							  }
							  _avgBitrate = (obj.avgBitrate / 1000).toFixed(2) + "kb";
							  _maxBitrate = (obj.maxBitrate / 1000).toFixed(2) + "kb";
						  }
						  break;
					  default:
						  break;
					 }
					 if (type != RTMP_MEDIA_NETSTREAM_INFO && type != RTMP_MEDIA_STATISTICS){
						  var date = new Date();
						  _mediaInfo.value = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"."+date.getMilliseconds()+' '+info+'\n'+_mediaInfo.value;
					 }
				  },
			null);
	
	this.test = function(){alert(123);}
	//播放
	this.startPlay = function(){
    	if(player1){
			player1.startPlay(_rtmpStream,_bufferTime,_speedupRange, _speedupTime,_speedupSpeed,_volume,_isMute);
		}
		else{
			console.log('播放器加载失败');
			return;
		}
    }
	//暂停
	this.pause = function(){
		if(player1){
			player1.pause();
		}
		else{
			console.log('播放器加载失败');
			return;
		}
	}
	//停止
	this.stopPlayer = function(){
		if(player1){
			player1.stopPlayer();
		}
		else{
			console.log('播放器加载失败');
			return;
		}
	}
	//断开连接
	this.closeConnect = function(){
		if(player1){
			player1.closeConnect();
		}
		else{
			console.log('播放器加载失败');
			return;
		}
	}
	//禁音
	this.setMute = function(isMute){
		if(typeof(isMute)!='boolean'){
			console.log('参数错误');
			return;
		}
		if(player1){
			player1.setMute(isMute);
		}
		else{
			console.log('播放器加载失败');
			return;
		}
	}
	//音量调节
	this.setVolume = function(volume){
		var mode = /^\d{1,3}$/;
		if(!mode.test(volume)){
			console.log('音量只能为0-100');
			return;
		}
		volume = parseInt(volume);
		if(volume > 100){
			console.log('音量只能为0-100');
			return;
		}
		if(player1){
			player1.setVolume(volume);
		}
		else{
			console.log('播放器加载失败');
			return;
		}
	}
}