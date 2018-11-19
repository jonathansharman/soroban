var v_lib_graphics2dtext_manifest = function(v_libRegData) {
	C$common$registerLibraryFunction('graphics2dtext', v_libRegData, "createNativeFont", 8);
	C$common$registerLibraryFunction('graphics2dtext', v_libRegData, "getNativeFontUniqueKey", 8);
	C$common$registerLibraryFunction('graphics2dtext', v_libRegData, "glGenerateAndLoadTexture", 4);
	C$common$registerLibraryFunction('graphics2dtext', v_libRegData, "glRenderCharTile", 4);
	C$common$registerLibraryFunction('graphics2dtext', v_libRegData, "glRenderTextSurface", 2);
	C$common$registerLibraryFunction('graphics2dtext', v_libRegData, "glSetNativeDataIntArray", 3);
	C$common$registerLibraryFunction('graphics2dtext', v_libRegData, "isDynamicFontLoaded", 0);
	C$common$registerLibraryFunction('graphics2dtext', v_libRegData, "isGlRenderer", 0);
	C$common$registerLibraryFunction('graphics2dtext', v_libRegData, "isResourceAvailable", 1);
	C$common$registerLibraryFunction('graphics2dtext', v_libRegData, "isSystemFontPresent", 1);
	C$common$registerLibraryFunction('graphics2dtext', v_libRegData, "renderText", 11);
	C$common$registerLibraryFunction('graphics2dtext', v_libRegData, "simpleBlit", 5);
};

var v_lib_graphics2dtext_function_createNativeFont = function(v_args) {
	var v_nf = v_args[0][1];
	var v_nfOut = v_nf[3];
	var v_fontType = v_args[1][1];
	var v_fontPath = "";
	if ((v_fontType == 0)) {
		v_fontType = v_args[2][1];
	} else {
		v_fontPath = v_args[2][1];
		if ((v_fontType == 1)) {
			var v_res = v_resource_manager_getResourceOfType(v_fontPath, "TTF");
			if ((v_res[0] == 1)) {
				return v_buildInteger(2);
			}
			var v_resList = v_res[1];
			if (!v_resList[0][1]) {
				return v_buildInteger(2);
			}
			v_fontPath = v_resList[1][1];
		}
	}
	var v_fontClass = 0;
	var v_fontSize = v_args[3][1];
	var v_red = v_args[4][1];
	var v_green = v_args[5][1];
	var v_blue = v_args[6][1];
	var v_styleBitmask = v_args[7][1];
	var v_isBold = (v_styleBitmask & 1);
	var v_isItalic = (v_styleBitmask & 2);
	v_nfOut[0] = LIB$graphics2dtext$createNativeFont(v_fontType, v_fontClass, v_fontPath);
	if ((v_nfOut[0] == null)) {
		if ((v_fontType == 3)) {
			return v_buildInteger(1);
		}
		return v_buildInteger(2);
	}
	return v_buildInteger(0);
};

var v_lib_graphics2dtext_function_getNativeFontUniqueKey = function(v_args) {
	var v_output = v_args[7][1];
	v_output.splice(0, 0, v_args[0], v_args[1]);
	return v_VALUE_NULL;
};

var v_lib_graphics2dtext_function_glGenerateAndLoadTexture = function(v_args) {
	return v_VALUE_NULL;
};

var v_lib_graphics2dtext_function_glRenderCharTile = function(v_args) {
	return v_VALUE_TRUE;
};

var v_lib_graphics2dtext_function_glRenderTextSurface = function(v_args) {
	return v_VALUE_NULL;
};

var v_lib_graphics2dtext_function_glSetNativeDataIntArray = function(v_args) {
	return v_VALUE_NULL;
};

var v_lib_graphics2dtext_function_isDynamicFontLoaded = function(v_args) {
	return v_buildBoolean(LIB$graphics2dtext$isDynamicFontLoaded());
};

var v_lib_graphics2dtext_function_isGlRenderer = function(v_args) {
	return v_VALUE_FALSE;
};

var v_lib_graphics2dtext_function_isResourceAvailable = function(v_args) {
	var v_path = v_args[0][1];
	var v_res = v_resource_manager_getResourceOfType(v_path, "TTF");
	if ((v_res[0] == 1)) {
		return v_VALUE_FALSE;
	}
	var v_resList = v_res[1];
	if (!v_resList[0][1]) {
		return v_VALUE_FALSE;
	}
	return v_VALUE_TRUE;
};

var v_lib_graphics2dtext_function_isSystemFontPresent = function(v_args) {
	return v_buildBoolean(LIB$graphics2dtext$isSystemFontAvailable(v_args[0][1]));
};

var v_lib_graphics2dtext_function_renderText = function(v_args) {
	var v_sizeOut = v_args[0][1];
	var v_textSurface = v_args[1][1];
	var v_imageOut = v_textSurface[3];
	var v_nativeFont = (v_args[2][1])[3][0];
	var v_sourceType = v_args[3][1];
	var v_fontClass = 0;
	var v_fontPath = "";
	if ((v_sourceType == 0)) {
		v_fontClass = v_args[4][1];
	} else {
		v_fontPath = v_args[4][1];
	}
	var v_fontSize = v_args[5][1];
	var v_fontStyle = v_args[6][1];
	var v_isBold = (v_fontStyle & 1);
	var v_isItalic = (v_fontStyle & 2);
	var v_red = v_args[7][1];
	var v_green = v_args[8][1];
	var v_blue = v_args[9][1];
	var v_text = v_args[10][1];
	var v_bmp = LIB$graphics2dtext$renderText(C$common$intBuffer16, v_nativeFont, v_fontSize, (v_isBold > 0), (v_isItalic > 0), v_red, v_green, v_blue, v_text);
	var v_spoofedNativeData = C$common$createNewArray(4);
	v_spoofedNativeData[3] = v_bmp;
	var v_spoofedNativeData2 = C$common$createNewArray(1);
	v_spoofedNativeData2[0] = v_spoofedNativeData;
	v_imageOut[0] = v_spoofedNativeData2;
	v_sizeOut[0] = v_buildInteger(C$common$intBuffer16[0]);
	v_sizeOut[1] = v_buildInteger(C$common$intBuffer16[1]);
	return v_VALUE_NULL;
};

var v_lib_graphics2dtext_function_simpleBlit = function(v_args) {
	var v_nativeBlittableBitmap = (v_args[0][1])[3][0];
	var v_drawQueueNativeData = (v_args[1][1])[3];
	var v_alpha = v_args[4][1];
	var v_eventQueue = v_drawQueueNativeData[0];
	var v_index = (v_drawQueueNativeData[1] - 16);
	var v_imageQueue = v_drawQueueNativeData[2];
	var v_imageQueueLength = v_drawQueueNativeData[3];
	v_eventQueue[v_index] = 6;
	v_eventQueue[(v_index | 1)] = 0;
	v_eventQueue[(v_index | 8)] = v_args[2][1];
	v_eventQueue[(v_index | 9)] = v_args[3][1];
	if ((v_imageQueue.length == v_imageQueueLength)) {
		var v_oldSize = v_imageQueue.length;
		var v_newSize = (v_oldSize * 2);
		var v_newImageQueue = C$common$createNewArray(v_newSize);
		var v_i = 0;
		while ((v_i < v_oldSize)) {
			v_newImageQueue[v_i] = v_imageQueue[v_i];
			v_i += 1;
		}
		v_imageQueue = v_newImageQueue;
		v_drawQueueNativeData[2] = v_imageQueue;
	}
	v_imageQueue[v_imageQueueLength] = v_nativeBlittableBitmap;
	v_drawQueueNativeData[3] = (v_imageQueueLength + 1);
	return v_VALUE_NULL;
};

C$common$scrapeLibFuncNames('graphics2dtext');

LIB$graphics2dtext$createNativeFont = function(sourceType, fontClass, fontPath) {
	switch (sourceType) {
		case 0: // default
			throw "TODO";
		case 1: // resource
			var b64 = C$common$getBinaryResBase64(fontPath);
			var nativeFont = [fontPath, false, b64];
			LIB$graphics2dtext$loadFontStyle(nativeFont);
			return nativeFont;
		case 2: // file
			throw "TODO";
		case 3: // system font
			return [fontPath, true, null];
	}
};

LIB$graphics2dtext$fontLoaderCounter = 0;

LIB$graphics2dtext$loadFontStyle = function(nativeFont) {
	if (nativeFont[1]) return true; // already loaded
	
	var loader = document.getElementById('crayon_font_loader'); // window not opened yet
	if (!!loader) {
		var base64 = nativeFont[2];
		var fontFamily = 'CrayonFont' + ++LIB$graphics2dtext$fontLoaderCounter;
		loader.innerHTML += [
			'<style type="text/css">',
				'@font-face { ',
					"font-family: " + fontFamily + ";",
					'src: url(data:font/truetype;charset=utf-8;base64,' + base64 + ") format('truetype');",
				'}',
			'</style>'].join('\n');
		nativeFont[1] = true;
		nativeFont[2] = fontFamily;
		
		LIB$graphics2dtext$testFont(fontFamily);
		
		return true;
	}
	return false;
}

LIB$graphics2dtext$testFont = function(name) {
	
	/*
		Add the lowercase letter 'l' to two span elements.
		Each has the font applied, but one uses a monospace fallback (which will be wide) and 
		the other will have a sans-serif fallback (which will be skinny). The reason for this
		mechanism is two-fold:
		- some browsers will not load a font face resource (even if directly embedded as base64)
		  unless it is applied to some element on the page.
		- some browsers will not synchronously load the font so applying the font with a fallback
		  font that is known to have different widths is an easy way to query whether the font
		  is truly loaded (by checking the width of the span elements).
	*/
	var loader1 = LIB$graphics2dtext$getFontLoader(1);
	var loader2 = LIB$graphics2dtext$getFontLoader(2);
	loader1.style.fontFamily = name + ",monospace";
	loader2.style.fontFamily = name + ",sans-serif";
	loader1.innerHTML = 'l';
	loader2.innerHTML = 'l';
};

LIB$graphics2dtext$getFontLoader = function(id) {
	C$game$getFontLoader();
	return document.getElementById('crayon_font_loader_' + id);
}

LIB$graphics2dtext$isDynamicFontLoaded = function() {
	var loader1 = LIB$graphics2dtext$getFontLoader(1);
	var loader2 = LIB$graphics2dtext$getFontLoader(2);
	var w1 = loader1.getBoundingClientRect().width;
	var w2 = loader2.getBoundingClientRect().width;
	var loaded = Math.floor(w1 * 1000 + .5) == Math.floor(w2 * 1000 + .5);
	if (loaded) {
		// get rid of the l's in the DOM as soon as possible.
		loader1.innerHTML = '';
		loader2.innerHTML = '';
	}
	return loaded;
};

LIB$graphics2dtext$isSystemFontAvailable = function(name) {
	LIB$graphics2dtext$testFont(name);
	return LIB$graphics2dtext$isDynamicFontLoaded(name);
};

LIB$graphics2dtext$tempCanvas = document.createElement('canvas');

LIB$graphics2dtext$renderText = function(sizeout, nativeFont, size, isBold, isItalic, r, g, b, text) {

	if (!nativeFont[1]) LIB$graphics2dtext$loadFontStyle(nativeFont);
	if (!nativeFont[1]) throw false; // TODO: prevent renderText before game window is initialized
	
	var effectiveSize = Math.floor(size * 70 / 54 + .5);
	
	var ctx = LIB$graphics2dtext$tempCanvas.getContext('2d');
	// TODO: bold, italic
	var fontCss = effectiveSize + 'px ' + nativeFont[2];
	if (isBold) fontCss = 'bold ' + fontCss;
	if (isItalic) fontCss = 'italic ' + fontCss;
	ctx.font = fontCss;
	var measure = ctx.measureText(text);
	var width = Math.ceil(measure.width);
	var height = effectiveSize;
	var surface = C$imageresources$generateNativeBitmapOfSize(width, height * 4 / 3);
	ctx = surface.getContext('2d');
	ctx.font = fontCss;
	ctx.fillStyle = C$drawing$HEXR[r] + C$drawing$HEX[g] + C$drawing$HEX[b];
	ctx.fillText(text, 0, height);
	sizeout[0] = surface.width;
	sizeout[1] = surface.height;
	return surface;
};


