var v_lib_imageresources_manifest = function(v_libRegData) {
	C$common$registerLibraryFunction('imageresources', v_libRegData, "blit", 8);
	C$common$registerLibraryFunction('imageresources', v_libRegData, "checkLoaderIsDone", 3);
	C$common$registerLibraryFunction('imageresources', v_libRegData, "flushImageChanges", 1);
	C$common$registerLibraryFunction('imageresources', v_libRegData, "getManifestString", 0);
	C$common$registerLibraryFunction('imageresources', v_libRegData, "loadAsynchronous", 3);
	C$common$registerLibraryFunction('imageresources', v_libRegData, "loadSynchronous", 3);
	C$common$registerLibraryFunction('imageresources', v_libRegData, "nativeImageDataInit", 3);
	C$common$registerLibraryFunction('imageresources', v_libRegData, "yieldRequiredByPlatform", 0);
};

var v_lib_imageresources_function_blit = function(v_args) {
	var v_object1 = null;
	var v_objInstance1 = v_args[0][1];
	var v_objInstance2 = v_args[1][1];
	C$imageresources$imageResourceBlitImage(v_objInstance1[3][0], v_objInstance2[3][0], v_args[2][1], v_args[3][1], v_args[4][1], v_args[5][1], v_args[6][1], v_args[7][1]);
	return v_VALUE_NULL;
};

var v_lib_imageresources_function_checkLoaderIsDone = function(v_args) {
	var v_objInstance1 = v_args[0][1];
	var v_objInstance2 = v_args[1][1];
	var v_list1 = v_args[2][1];
	C$imageresources$checkLoaderIsDone(v_objInstance1[3], v_objInstance2[3], v_list1);
	return v_VALUE_NULL;
};

var v_lib_imageresources_function_flushImageChanges = function(v_args) {
	return v_VALUE_NULL;
};

var v_lib_imageresources_function_getManifestString = function(v_args) {
	return v_buildString(C$imageresources$getImageResourceManifest());
};

var v_lib_imageresources_function_loadAsynchronous = function(v_args) {
	var v_objInstance1 = v_args[0][1];
	var v_filename = v_args[1][1];
	var v_objInstance2 = v_args[2][1];
	var v_objArray1 = C$common$createNewArray(3);
	v_objInstance1[3] = v_objArray1;
	var v_objArray2 = C$common$createNewArray(4);
	v_objArray2[2] = 0;
	v_objInstance2[3] = v_objArray2;
	C$imageresources$imageLoad(v_filename, v_objArray1, v_objArray2);
	return v_VALUE_NULL;
};

var v_lib_imageresources_function_loadSynchronous = function(v_args) {
	return v_VALUE_NULL;
};

var v_lib_imageresources_function_nativeImageDataInit = function(v_args) {
	var v_objInstance1 = v_args[0][1];
	var v_nd = C$common$createNewArray(4);
	var v_width = v_args[1][1];
	var v_height = v_args[2][1];
	v_nd[0] = C$imageresources$generateNativeBitmapOfSize(v_width, v_height);
	v_nd[1] = v_width;
	v_nd[2] = v_height;
	v_nd[3] = null;
	v_objInstance1[3] = v_nd;
	return v_VALUE_NULL;
};

var v_lib_imageresources_function_yieldRequiredByPlatform = function(v_args) {
	var v_output = v_VALUE_FALSE;
	v_output = v_VALUE_TRUE;
	return v_output;
};

C$common$scrapeLibFuncNames('imageresources');
