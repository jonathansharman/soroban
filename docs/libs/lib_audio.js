var v_lib_audio_manifest = function(v_libRegData) {
	C$common$registerLibraryFunction('audio', v_libRegData, "getAudioResourcePath", 1);
	C$common$registerLibraryFunction('audio', v_libRegData, "is_supported", 0);
	C$common$registerLibraryFunction('audio', v_libRegData, "music_is_playing", 0);
	C$common$registerLibraryFunction('audio', v_libRegData, "music_load_from_file", 2);
	C$common$registerLibraryFunction('audio', v_libRegData, "music_load_from_resource", 2);
	C$common$registerLibraryFunction('audio', v_libRegData, "music_play", 5);
	C$common$registerLibraryFunction('audio', v_libRegData, "music_set_volume", 1);
	C$common$registerLibraryFunction('audio', v_libRegData, "music_stop", 0);
	C$common$registerLibraryFunction('audio', v_libRegData, "sfx_get_state", 3);
	C$common$registerLibraryFunction('audio', v_libRegData, "sfx_load_from_file", 2);
	C$common$registerLibraryFunction('audio', v_libRegData, "sfx_load_from_resource", 2);
	C$common$registerLibraryFunction('audio', v_libRegData, "sfx_play", 4);
	C$common$registerLibraryFunction('audio', v_libRegData, "sfx_resume", 4);
	C$common$registerLibraryFunction('audio', v_libRegData, "sfx_set_pan", 3);
	C$common$registerLibraryFunction('audio', v_libRegData, "sfx_set_volume", 3);
	C$common$registerLibraryFunction('audio', v_libRegData, "sfx_stop", 5);
};

var v_lib_audio_function_getAudioResourcePath = function(v_args) {
	return v_resource_manager_getResourceOfType(v_args[0][1], "SND");
};

var v_lib_audio_function_is_supported = function(v_args) {
	if (C$audio$isAudioSupported()) {
		return v_VALUE_TRUE;
	}
	return v_VALUE_FALSE;
};

var v_lib_audio_function_music_is_playing = function(v_args) {
	if (C$audio$musicIsPlaying()) {
		return v_VALUE_TRUE;
	}
	return v_VALUE_FALSE;
};

var v_lib_audio_function_music_load_from_file = function(v_args) {
	return v_VALUE_NULL;
};

var v_lib_audio_function_music_load_from_resource = function(v_args) {
	var v_objInstance1 = v_args[0][1];
	if (v_lib_audio_music_load_from_resource(v_objInstance1, v_args[1][1])) {
		return v_VALUE_TRUE;
	}
	return v_VALUE_FALSE;
};

var v_lib_audio_function_music_play = function(v_args) {
	return v_buildBoolean((v_lib_audio_music_play(v_args[0][1], v_args[1][1], v_args[2][1], v_args[3][1], v_args[4][1]) != -1));
};

var v_lib_audio_function_music_set_volume = function(v_args) {
	C$audio$musicSetVolume(v_args[0][1]);
	return v_VALUE_NULL;
};

var v_lib_audio_function_music_stop = function(v_args) {
	return v_VALUE_NULL;
};

var v_lib_audio_function_sfx_get_state = function(v_args) {
	var v_channelInstance = v_args[0][1];
	var v_nativeChannel = v_channelInstance[3][0];
	var v_soundInstance = v_args[1][1];
	var v_nativeSound = v_soundInstance[3][0];
	var v_resourceId = v_args[2][1];
	return v_buildInteger(v_lib_audio_sfx_get_state(v_nativeChannel, v_nativeSound, v_resourceId));
};

var v_lib_audio_function_sfx_load_from_file = function(v_args) {
	return v_VALUE_NULL;
};

var v_lib_audio_function_sfx_load_from_resource = function(v_args) {
	var v_soundInstance = v_args[0][1];
	v_lib_audio_load_sfx_from_resource(v_soundInstance, v_args[1][1]);
	return v_VALUE_NULL;
};

var v_lib_audio_function_sfx_play = function(v_args) {
	var v_channelInstance = v_args[0][1];
	var v_resourceInstance = v_args[1][1];
	v_channelInstance[3] = C$common$createNewArray(1);
	var v_nativeResource = v_resourceInstance[3][0];
	var v_vol = v_args[2][1];
	var v_pan = v_args[3][1];
	return v_buildInteger(v_lib_audio_sfx_launch(v_nativeResource, v_channelInstance[3], v_vol, v_pan));
};

var v_lib_audio_function_sfx_resume = function(v_args) {
	var v_sndInstance = v_args[0][1];
	var v_nativeSound = v_sndInstance[3][0];
	var v_sndResInstance = v_args[1][1];
	var v_nativeResource = v_sndResInstance[3][0];
	var v_vol = v_args[2][1];
	var v_pan = v_args[3][1];
	v_lib_audio_sfx_unpause(v_nativeSound, v_nativeResource, v_vol, v_pan);
	return v_VALUE_NULL;
};

var v_lib_audio_function_sfx_set_pan = function(v_args) {
	var v_channel = v_args[0][1];
	var v_nativeChannel = v_channel[3][0];
	var v_resource = v_args[1][1];
	var v_nativeResource = v_resource[3][0];
	v_lib_audio_sfx_set_pan(v_nativeChannel, v_nativeResource, v_args[2][1]);
	return v_VALUE_NULL;
};

var v_lib_audio_function_sfx_set_volume = function(v_args) {
	var v_channel = v_args[0][1];
	var v_nativeChannel = v_channel[3][0];
	var v_resource = v_args[1][1];
	var v_nativeResource = v_resource[3][0];
	v_lib_audio_sfx_set_volume(v_nativeChannel, v_nativeResource, v_args[2][1]);
	return v_VALUE_NULL;
};

var v_lib_audio_function_sfx_stop = function(v_args) {
	var v_channel = v_args[0][1];
	var v_nativeChannel = v_channel[3][0];
	var v_resource = v_args[1][1];
	var v_nativeResource = v_resource[3][0];
	var v_resourceId = v_args[2][1];
	var v_currentState = v_args[3][1];
	var v_completeStopAndFreeChannel = v_args[4][1];
	var v_isAlreadyPaused = ((v_currentState == 2) && !v_completeStopAndFreeChannel);
	if (((v_currentState != 3) && !v_isAlreadyPaused)) {
		v_lib_audio_sfx_stop(v_nativeChannel, v_nativeResource, v_resourceId, (v_currentState == 1), v_completeStopAndFreeChannel);
	}
	return v_VALUE_NULL;
};

var v_lib_audio_load_sfx_from_resource = function(v_obj, v_path) {
	var v_sfx = C$audio$prepSoundForLoading(v_path);
	v_obj[3] = C$common$createNewArray(1);
	v_obj[3][0] = v_sfx;
	return 1;
};

var v_lib_audio_music_load_from_resource = function(v_musicObj, v_path) {
	var v_nativeMusicObject = C$audio$musicLoad(v_path);
	if ((v_nativeMusicObject != null)) {
		v_musicObj[3] = C$common$createNewArray(1);
		v_musicObj[3][0] = v_nativeMusicObject;
		return true;
	}
	return false;
};

var v_lib_audio_music_play = function(v_musicObject, v_isResource, v_path, v_startingVolume, v_isLoop) {
	C$audio$musicSetVolume(v_startingVolume);
	var v_nativeObject = null;
	if ((v_musicObject[3] != null)) {
		v_nativeObject = v_musicObject[3][0];
	}
	if (v_isResource) {
		C$audio$musicPlay(v_nativeObject, v_isLoop);
	} else {
		if (!false) {
			return -1;
		}
		C$common$alwaysTrue();
	}
	return 0;
};

var v_lib_audio_sfx_get_state = function(v_channel, v_sfxResource, v_resourceId) {
	return (v_channel[2] + 1);
};

var v_lib_audio_sfx_launch = function(v_sfxResource, v_channelNativeDataOut, v_volume, v_pan) {
	var v_channel = C$audio$playSound(v_sfxResource, 0);
	if ((v_channel == null)) {
		return 0;
	}
	v_channelNativeDataOut[0] = v_channel;
	return 1;
};

var v_lib_audio_sfx_set_pan = function(v_channel, v_sfxResource, v_pan) {
	return 0;
};

var v_lib_audio_sfx_set_volume = function(v_channel, v_sfxResource, v_volume) {
	return 0;
};

var v_lib_audio_sfx_stop = function(v_channel, v_resource, v_resourceId, v_isActivelyPlaying, v_hardStop) {
	C$audio$stopSound(v_channel, true);
	return 0;
};

var v_lib_audio_sfx_unpause = function(v_channel, v_sfxResource, v_volume, v_pan) {
	C$audio$resumeSound(v_channel);
	return 0;
};

var v_lib_audio_stop = function(v_sound, v_reset) {
	C$audio$stopSound(v_sound);
	return 0;
};

C$common$scrapeLibFuncNames('audio');
