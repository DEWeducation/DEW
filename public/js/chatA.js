/**
 * Created by Qvjunping on 2016-07-13.
 */
var openAudioPhone = 1;
var historyScroll = document.getElementById("chatHistory");
var offOrOn = false;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
var gRecorder = null;
var door = true;
var starInterval;
var audioHistory = [];
var Atime = 0;




//语音聊天长连
function openAudio() {
    offOrOn = true;
    if (!navigator.getUserMedia) {
        alert("设备不支持聊天")
    }
    // 记录开始时间，方便回放时同步
    socket.emit("startTime",new Date().getTime());



    SRecorder.get(function (rec) {
        gRecorder = rec;
    });
    fomrtStar();
//    *****************************************************************
    function fomrtStar() {
        starInterval = setInterval(function () {
            setTimeout(function () {
                gRecorder.start();
                door = true;
            }, 0);
            setTimeout(function () {
                if (offOrOn) {
                    socket.emit('audiomore', gRecorder.getBlob());
                    // console.log("发送长度：" + gRecorder.getBlob().size);
                    // console.info("发送类型：" + typeof (gRecorder.getBlob()));
                    // console.log("发送" + gRecorder.getBlob());
                    gRecorder.clear();
                    gRecorder.stop();
                }
            }, 200)
        }, 200)
    }
    //*****************************************************
}

// 关闭语音聊天
function closeAudio() {
    //功夫不负有心人
    offOrOn = false;
    clearInterval(starInterval);
    localMediaStream.getTracks()[0].stop();
}

var SRecorder = function (stream, config) {
    config = config || {};
    config.sampleBits = config.sampleBits || 8;      //采样数位 8, 16  
    config.sampleRate = config.sampleRate || (44100 / 6);   //采样率(1/6 44100)  


    //创建一个音频环境对象  
    audioContext = window.AudioContext || window.webkitAudioContext;
    var context = new audioContext();

    //将声音输入这个对像  
    var audioInput = context.createMediaStreamSource(stream);

    //设置音量节点  
    var volume = context.createGain();
    audioInput.connect(volume);

    //创建缓存，用来缓存声音  
    var bufferSize = 4096;

    // 创建声音的缓存节点，createScriptProcessor方法的  
    // 第二个和第三个参数指的是输入和输出都是双声道。  
    var recorder = context.createScriptProcessor(bufferSize, 2, 2);

    var audioData = {
        size: 0          //录音文件长度  
        , buffer: []     //录音缓存  
        , inputSampleRate: context.sampleRate    //输入采样率  
        , inputSampleBits: 16       //输入采样数位 8, 16  
        , outputSampleRate: config.sampleRate    //输出采样率  
        , oututSampleBits: config.sampleBits       //输出采样数位 8, 16
        , clear: function () {
            this.buffer = [];
            this.size = 0;
        }
        , input: function (data) {
            this.buffer.push(new Float32Array(data));
            this.size += data.length;
        }
        , compress: function () { //合并压缩  
            //合并  
            var data = new Float32Array(this.size);
            var offset = 0;
            for (var i = 0; i < this.buffer.length; i++) {
                data.set(this.buffer[i], offset);
                offset += this.buffer[i].length;
            }
            //压缩  
            var compression = parseInt(this.inputSampleRate / this.outputSampleRate);
            var length = data.length / compression;
            var result = new Float32Array(length);
            var index = 0, j = 0;
            while (index < length) {
                result[index] = data[j];
                j += compression;
                index++;
            }
            return result;
        }
        , encodeWAV: function () {
            var sampleRate = Math.min(this.inputSampleRate, this.outputSampleRate);
            var sampleBits = Math.min(this.inputSampleBits, this.oututSampleBits);
            var bytes = this.compress();
            var dataLength = bytes.length * (sampleBits / 8);
            var buffer = new ArrayBuffer(44 + dataLength);
            var data = new DataView(buffer);

            var channelCount = 1;//单声道  
            var offset = 0;

            var writeString = function (str) {
                for (var i = 0; i < str.length; i++) {
                    data.setUint8(offset + i, str.charCodeAt(i));
                }
            };

            // 资源交换文件标识符   
            writeString('RIFF');
            offset += 4;
            // 下个地址开始到文件尾总字节数,即文件大小-8   
            data.setUint32(offset, 36 + dataLength, true);
            offset += 4;
            // WAV文件标志  
            writeString('WAVE');
            offset += 4;
            // 波形格式标志   
            writeString('fmt ');
            offset += 4;
            // 过滤字节,一般为 0x10 = 16   
            data.setUint32(offset, 16, true);
            offset += 4;
            // 格式类别 (PCM形式采样数据)   
            data.setUint16(offset, 1, true);
            offset += 2;
            // 通道数   
            data.setUint16(offset, channelCount, true);
            offset += 2;
            // 采样率,每秒样本数,表示每个通道的播放速度   
            data.setUint32(offset, sampleRate, true);
            offset += 4;
            // 波形数据传输率 (每秒平均字节数) 单声道×每秒数据位数×每样本数据位/8   
            data.setUint32(offset, channelCount * sampleRate * (sampleBits / 8), true);
            offset += 4;
            // 快数据调整数 采样一次占用字节数 单声道×每样本的数据位数/8   
            data.setUint16(offset, channelCount * (sampleBits / 8), true);
            offset += 2;
            // 每样本数据位数   
            data.setUint16(offset, sampleBits, true);
            offset += 2;
            // 数据标识符   
            writeString('data');
            offset += 4;
            // 采样数据总数,即数据总大小-44   
            data.setUint32(offset, dataLength, true);
            offset += 4;
            // 写入采样数据   
            if (sampleBits === 8) {
                for (var i = 0; i < bytes.length; i++, offset++) {
                    var s = Math.max(-1, Math.min(1, bytes[i]));
                    var val = s < 0 ? s * 0x8000 : s * 0x7FFF;
                    val = parseInt(255 / (65535 / (val + 32768)));
                    data.setInt8(offset, val, true);
                }
            } else {
                for (var i = 0; i < bytes.length; i++, offset += 2) {
                    var s = Math.max(-1, Math.min(1, bytes[i]));
                    data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
                }
            }

            return new Blob([data], {type: 'audio/wav'});
        }
    };

    //开始录音  
    this.start = function () {
        audioInput.connect(recorder);
        recorder.connect(context.destination);
    };

    this.clear = function () {
        audioData.clear();
    };
    //停止  
    this.stop = function () {
        recorder.disconnect();
    };

    //获取音频文件  
    this.getBlob = function () {
        this.stop();
        return audioData.encodeWAV();
    };

    //回放  
    this.play = function (audio) {
        audio.src = window.URL.createObjectURL(this.getBlob());
    };

    //上传  
    this.upload = function (url, callback) {
        var fd = new FormData();
        fd.append('audioData', this.getBlob());
        var xhr = new XMLHttpRequest();
        if (callback) {
            xhr.upload.addEventListener('progress', function (e) {
                callback('uploading', e);
            }, false);
            xhr.addEventListener('load', function (e) {
                callback('ok', e);
            }, false);
            xhr.addEventListener('error', function (e) {
                callback('error', e);
            }, false);
            xhr.addEventListener('abort', function (e) {
                callback('cancel', e);
            }, false);
        }
        xhr.open('POST', url);
        xhr.send(fd);
    };

    //音频采集  
    recorder.onaudioprocess = function (e) {
        audioData.input(e.inputBuffer.getChannelData(0));
    };

};

SRecorder.get = function (callback) {
    if (callback) {
        if (navigator.getUserMedia) {
            navigator.getUserMedia({audio: true}, function (stream) {
                localMediaStream = stream;
                var rec = new SRecorder(stream);
                callback(rec);
            }, function (err) {
                console.log(err);
            })
        }
    }
};

//接收消息
(function () {
    //长连接
    socket.on('audiomore', function (audioData) {
        var dataView = new DataView(audioData);
        var blob = new Blob([dataView], {type: 'audio/wav'});
        // audio.src = (window.URL.createObjectURL(blob));
        console.log("接收大小" + blob.size);
        console.info("接收类型" + typeof (blob));
        console.info(blob);
        $('#chatHistory').append($('<audio>').attr({
            'src': window.URL.createObjectURL(blob),
            'autoplay': "autoplay"
        }).css({
            display: "none"
        }));
    });


    socket.on('reAudio', function (data) {
        console.log("开始接收音频",new Date().getTime())
        Atime += 2;
        if (data != 'end') {
            var blob = new Blob([data], {type: 'audio/wav'});
            audioHistory.push({
                audioData: blob,
                time: Atime + 2
            });
        } else {
            console.log("音频接收完毕", audioHistory.length,new Date().getTime());
            for (var i = 0; i < audioHistory.length; i++) {
                var _au = audioHistory[i];
                (function _(_au) {
                    setTimeout(function () {
                        $('#chatHistory').append($('<audio>').attr({
                            'src': window.URL.createObjectURL(_au.audioData),
                            'autoplay': "autoplay"
                        }).css({
                            display: "none"
                        }));
                    }, (_au.time - 2) * 100)
                })(_au);
            }
        }
    })
})();

function reAudio() {
    socket.emit("reAudio", "yes");
}