define(['cls', 'util/GpsUtil', 'log', 'util/IchUtil'],
function(cls, gpsUtil, log, IchUtil) {  

    console.debug("scan-ios2.js");

    var me = {

        getAllPhotos:function(callback){
            if (navigator.assetslib) {
                navigator.assetslib.getAllPhotos(function(data){me.onGetAllPhotosSuccess(data);callback(data);}, me.onGetAllPhotosError);
            } else {
                console.log("scan-ios.getAllPhotos > navigator.assetslib feature is unsupported");
            }
        },
        onGetAllPhotosSuccess:function(data){
            console.log("scan-ios.onGetAllPhotosSuccess > " + data.length);
            //alert("scan-ios.onGetAllPhotosSuccess\n" + data.length);
        },
        onGetAllPhotosError:function(error){
            console.log("scan-ios.onGetAllPhotosError > " + error);
        },

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        getPhotoMetadata:function(urls,callback){
            if (navigator.assetslib) {
                navigator.assetslib.getPhotoMetadata(urls, function(data){me.onGetPhotoMetadataSuccess(data);callback(data);}, me.onGetPhotoMetadataError);
            } else {
                console.log("scan-ios.getPhotoMetadata > navigator.assetslib feature is unsupported");
            }
        },
        onGetPhotoMetadataSuccess:function(data){
            console.log("scan-ios.onGetPhotoMetadataSuccess > " + data.length);
            //alert("scan-ios.onGetPhotoMetadataSuccess\n" + data.length);
        },
        onGetPhotoMetadataError:function(error){
            console.log("scan-ios.onGetPhotoMetadataError > " + error);
        }
    };

    return me;
});