define(['cordova', 'cls', 'adptr/DeviceAdaptor', 'scanDroid', 'scanIOS', 'photodb'], 
function(cordovaModule, cls, DeviceAdaptor, scanDroid, scanIOS, photodb) {

    console.debug("phonegap2.js");

	var me = {
        deviceInfo:undefined,     // phonegap device information, when changed "deviceInfoChange" even is fired
        littleEndian:undefined,
        scan:undefined,
 
        initialize: function() {
            me.bindEvents();
        },

        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },

        onDeviceReady: function() {
            console.log('phonegap.onDeviceReady');
            me.checkDevice();
            var littleEndian = (function() {
              var buffer = new ArrayBuffer(2);
              new DataView(buffer).setInt16(0, 256, true);
              return new Int16Array(buffer)[0] === 256;
            })();
            console.debug("littleEndian = " + littleEndian); // true or false
            me.littleEndian = littleEndian;
            $.event.trigger("phonegapReady", [me]);
        },

        isAndroid:function(){
            return me.deviceInfo ? me.deviceInfo.platform == "Android" : false;
        },

        isIOS:function(){
            return me.deviceInfo ? me.deviceInfo.platform == "iOS" : false;
        },

        checkDevice:function(){
            if (typeof device == "undefined") {
                console.debug("phonegap.checkDevice > device feature is unsupported");
            	DeviceAdaptor.inBrowser = true;
            } else {
                var infoText =  'Device Model: '    + device.model    + '\n' +
                                'Device Cordova: '  + device.cordova  + '\n' +
                                'Device Platform: ' + device.platform + '\n' +
                                'Device UUID: '     + device.uuid     + '\n' +
                                'Device Version: '  + device.version  + '\n';
                //console.log('Device Info: ' + infoText);
                DeviceAdaptor.deviceId = device.uuid;
                this.deviceInfo = device;
                $.event.trigger("deviceInfoChange", [me.deviceInfo, infoText]);
            }
        },

        getScan:function(){
            if(!me.scan){
                if(me.isAndroid())
                    me.scan = scanDroid;
                else if(me.isIOS())
                    me.scan = scanIOS;
                else
                    console.log("SCAN OBJECT IS undefined!!!!!");
            }
            return me.scan;
        },

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        getAllPhotos:function(){
            console.log("phonegap.getAllPhotos");
            scan = me.getScan();
            if(scan) scan.getAllPhotos(me.getAllPhotosCallback);
        },
        getAllPhotosCallback:function(data){
            console.debug("phonegap.getAllPhotosCallback > " + data.length);
            var allPhotos = [];
            for(var i=0; i<data.length;i++){
                url = data[i].url;
                allPhotos.push(url);
                console.debug(url);
            }
            $.event.trigger("allPhotosChange",[allPhotos]);
        },

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        getPhotoMetadata:function(urls){
            console.log("phonegap.getPhotoMetadata");
            scan = me.getScan();
            if(scan) scan.getPhotoMetadata(urls, me.getPhotoMetadataCallback);
        },
        getPhotoMetadataCallback:function(data){
            console.debug("phonegap.getPhotoMetadataCallback > " + data.length);
            $.event.trigger("photoMetadataChange",[data]);
        }
    };
    return me;
});