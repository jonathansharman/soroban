var v_lib_graphics2d_manifest = function(v_libRegData) {
	C$common$registerLibraryFunction('graphics2d', v_libRegData, "addImageRenderEvent", 13);
	C$common$registerLibraryFunction('graphics2d', v_libRegData, "flip", 6);
	C$common$registerLibraryFunction('graphics2d', v_libRegData, "initializeTexture", 5);
	C$common$registerLibraryFunction('graphics2d', v_libRegData, "initializeTextureResource", 3);
	C$common$registerLibraryFunction('graphics2d', v_libRegData, "isOpenGlBased", 0);
	C$common$registerLibraryFunction('graphics2d', v_libRegData, "isPlatformUsingTextureAtlas", 0);
	C$common$registerLibraryFunction('graphics2d', v_libRegData, "lineToQuad", 1);
	C$common$registerLibraryFunction('graphics2d', v_libRegData, "renderQueueAction", 3);
	C$common$registerLibraryFunction('graphics2d', v_libRegData, "renderQueueValidateArgs", 1);
	C$common$registerLibraryFunction('graphics2d', v_libRegData, "scale", 6);
};

var v_lib_graphics2d_function_addImageRenderEvent = function(v_args) {
	var v_bool1 = false;
	var v_bool2 = false;
	var v_float1 = 0.0;
	var v_i = 0;
	var v_int1 = 0;
	var v_int2 = 0;
	var v_int3 = 0;
	var v_intArray1 = null;
	var v_intArray2 = null;
	var v_len = 0;
	var v_objArray1 = null;
	var v_objArrayArray1 = null;
	var v_objArrayArray2 = null;
	var v_objInstance1 = null;
	var v_objInstance2 = null;
	var v_value = null;
	var v_output = v_VALUE_NULL;
	var v_arg1 = v_args[0];
	var v_arg2 = v_args[1];
	var v_arg3 = v_args[2];
	var v_arg4 = v_args[3];
	var v_arg5 = v_args[4];
	var v_arg6 = v_args[5];
	var v_arg7 = v_args[6];
	var v_arg8 = v_args[7];
	var v_arg9 = v_args[8];
	var v_arg10 = v_args[9];
	var v_arg11 = v_args[10];
	var v_arg12 = v_args[11];
	var v_arg13 = v_args[12];
	v_objInstance1 = v_arg1[1];
	v_objArray1 = v_objInstance1[3];
	v_intArray1 = v_objArray1[0];
	v_len = v_objArray1[1];
	if ((v_len >= v_intArray1.length)) {
		v_intArray2 = C$common$createNewArray(((v_len * 2) + 16));
		v_i = 0;
		while ((v_i < v_len)) {
			v_intArray2[v_i] = v_intArray1[v_i];
			v_i += 1;
		}
		v_intArray1 = v_intArray2;
		v_objArray1[0] = v_intArray1;
	}
	v_objArray1[1] = (v_len + 16);
	v_objArrayArray1 = v_objArray1[2];
	if ((v_objArrayArray1 == null)) {
		v_int1 = 0;
		v_objArrayArray1 = C$common$createNewArray(0);
	} else {
		v_int1 = v_objArray1[3];
	}
	if ((v_int1 >= v_objArrayArray1.length)) {
		v_objArrayArray2 = C$common$createNewArray(((v_int1 * 2) + 16));
		v_i = 0;
		while ((v_i < v_int1)) {
			v_objArrayArray2[v_i] = v_objArrayArray1[v_i];
			v_i += 1;
		}
		v_objArrayArray1 = v_objArrayArray2;
		v_objArray1[2] = v_objArrayArray1;
	}
	v_objArray1[3] = (v_int1 + 1);
	v_value = v_arg2;
	v_objInstance2 = v_value[1];
	v_objArray1 = v_objInstance2[3];
	v_objArrayArray1[v_int1] = v_objArray1;
	v_bool1 = true;
	v_bool2 = false;
	v_value = v_arg3;
	v_int1 = v_value[1];
	v_intArray1[v_len] = 6;
	v_intArray1[(v_len + 1)] = v_int1;
	if (((v_int1 & 4) != 0)) {
		v_value = v_arg12;
		if ((v_value[0] == 4)) {
			v_float1 = v_value[1];
		} else {
			if ((v_value[0] == 3)) {
				v_float1 = (v_value[1] + 0.0);
			} else {
				v_bool1 = false;
			}
		}
		v_int2 = Math.floor((v_canonicalizeAngle(v_float1) * 1048576));
		v_intArray1[(v_len | 10)] = v_int2;
	}
	if ((v_bool1 && ((v_int1 & 8) != 0))) {
		v_value = v_arg13;
		if ((v_value[0] == 3)) {
			v_int2 = v_value[1];
		} else {
			if ((v_value[0] == 4)) {
				v_float1 = v_value[1];
				v_int2 = Math.floor((v_float1 + 0.5));
			} else {
				v_bool1 = false;
			}
		}
		if ((v_int2 > 254)) {
			v_intArray1[(v_len | 1)] = (v_int1 - 8);
		} else {
			if ((v_int2 < 0)) {
				v_bool2 = true;
			} else {
				v_intArray1[(v_len | 11)] = v_int2;
			}
		}
	}
	v_i = 0;
	while ((v_i < 8)) {
		v_value = v_args[(3 + v_i)];
		if ((v_value[0] == 3)) {
			v_int2 = v_value[1];
		} else {
			if ((v_value[0] == 4)) {
				v_float1 = v_value[1];
				v_int2 = Math.floor((v_float1 + 0.5));
			} else {
				v_bool1 = false;
				v_i = 9;
			}
		}
		v_intArray1[((v_len + 2) + v_i)] = v_int2;
		v_i += 1;
	}
	if (((v_int1 & 2) != 0)) {
		v_int2 = v_intArray1[(v_len + 6)];
		if ((v_int2 < 0)) {
			v_bool1 = false;
		} else {
			if ((v_int2 == 0)) {
				v_bool2 = true;
			}
		}
		v_int2 = v_intArray1[(v_len + 7)];
		if ((v_int2 < 0)) {
			v_bool1 = false;
		} else {
			if ((v_int2 == 0)) {
				v_bool2 = true;
			}
		}
	}
	if (((v_int1 & 1) != 0)) {
		v_int1 = v_objArray1[5];
		v_int2 = v_intArray1[(v_len + 2)];
		v_int3 = v_intArray1[(v_len + 4)];
		if (((v_int2 < 0) || ((v_int2 + v_int3) > v_int1) || (v_int3 < 0))) {
			v_bool1 = false;
		}
		if ((v_int3 == 0)) {
			v_bool2 = true;
		}
		if (v_bool1) {
			v_int1 = v_objArray1[6];
			v_int2 = v_intArray1[(v_len + 3)];
			v_int3 = v_intArray1[(v_len + 5)];
			if (((v_int2 < 0) || ((v_int2 + v_int3) > v_int1) || (v_int3 < 0))) {
				v_bool1 = false;
			}
			if ((v_int3 == 0)) {
				v_bool2 = true;
			}
		}
	}
	if (v_bool1) {
		if (v_bool2) {
			v_objArray1 = v_objInstance1[3];
			v_objArray1[1] = (v_objArray1[1] - 16);
			v_objArray1[3] = (v_objArray1[3] - 1);
		}
		v_output = v_VALUE_TRUE;
	} else {
		v_output = v_VALUE_FALSE;
	}
	return v_output;
};

var v_lib_graphics2d_function_flip = function(v_args) {
	var v_bool1 = false;
	var v_bool2 = false;
	var v_i = 0;
	var v_objArray1 = null;
	var v_objArray2 = null;
	var v_object1 = null;
	var v_objInstance1 = null;
	var v_objInstance2 = null;
	var v_output = v_VALUE_NULL;
	var v_arg1 = v_args[0];
	var v_arg2 = v_args[1];
	var v_arg3 = v_args[2];
	var v_arg4 = v_args[3];
	var v_arg5 = v_args[4];
	var v_arg6 = v_args[5];
	v_objInstance1 = v_arg1[1];
	v_objInstance2 = v_arg2[1];
	v_objArray1 = v_objInstance1[3];
	v_objArray2 = C$common$createNewArray(7);
	v_objInstance2[3] = v_objArray2;
	v_bool1 = v_arg3[1];
	v_bool2 = v_arg4[1];
	v_i = 6;
	while ((v_i >= 0)) {
		v_objArray2[v_i] = v_objArray1[v_i];
		v_i -= 1;
	}
	v_objInstance1 = v_arg6[1];
	v_objArray1 = v_objInstance1[3];
	v_objInstance2 = v_arg2[1];
	v_objInstance2[3][0] = v_objArray1;
	v_object1 = v_objArray1[3];
	v_object1 = C$drawing$flipImage(v_object1, v_bool1, v_bool2);
	v_objArray1[3] = v_object1;
	v_output = v_arg2;
	return v_output;
};

var v_lib_graphics2d_function_initializeTexture = function(v_args) {
	var v_float1 = 0.0;
	var v_float2 = 0.0;
	var v_list1 = null;
	var v_objArray1 = null;
	var v_objInstance1 = null;
	var v_value = null;
	var v_output = v_VALUE_NULL;
	var v_arg1 = v_args[0];
	var v_arg2 = v_args[1];
	var v_arg3 = v_args[2];
	var v_arg4 = v_args[3];
	var v_arg5 = v_args[4];
	v_objInstance1 = v_arg1[1];
	v_objArray1 = C$common$createNewArray(7);
	v_objInstance1[3] = v_objArray1;
	v_objInstance1 = v_arg2[1];
	v_objArray1[0] = v_objInstance1[3];
	v_list1 = v_arg3[1];
	v_value = v_list1[0];
	v_float1 = v_value[1];
	v_value = v_list1[2];
	v_float2 = v_value[1];
	v_objArray1[1] = v_float1;
	v_objArray1[3] = v_float2;
	v_value = v_list1[1];
	v_float1 = v_value[1];
	v_value = v_list1[3];
	v_float2 = v_value[1];
	v_objArray1[2] = v_float1;
	v_objArray1[4] = v_float2;
	v_objArray1[5] = v_arg4[1];
	v_objArray1[6] = v_arg5[1];
	return v_output;
};

var v_lib_graphics2d_function_initializeTextureResource = function(v_args) {
	var v_textureResourceInstance = v_args[0][1];
	var v_textureResourceNativeData = C$common$createNewArray(6);
	v_textureResourceInstance[3] = v_textureResourceNativeData;
	var v_nativeImageDataInstance = v_args[2][1];
	var v_nativeImageDataNativeData = v_nativeImageDataInstance[3];
	if (v_args[1][1]) {
		v_textureResourceNativeData[0] = false;
		v_textureResourceNativeData[1] = false;
		v_textureResourceNativeData[2] = -1;
		v_textureResourceNativeData[3] = v_nativeImageDataNativeData[0];
		v_textureResourceNativeData[4] = v_nativeImageDataNativeData[1];
		v_textureResourceNativeData[5] = v_nativeImageDataNativeData[2];
	} else {
		v_textureResourceNativeData[0] = false;
		v_textureResourceNativeData[1] = true;
		v_textureResourceNativeData[2] = -1;
		v_textureResourceNativeData[3] = v_nativeImageDataNativeData[3];
		v_textureResourceNativeData[4] = v_nativeImageDataNativeData[4];
		v_textureResourceNativeData[5] = v_nativeImageDataNativeData[5];
	}
	return v_VALUE_NULL;
};

var v_lib_graphics2d_function_isOpenGlBased = function(v_args) {
	return v_VALUE_FALSE;
};

var v_lib_graphics2d_function_isPlatformUsingTextureAtlas = function(v_args) {
	return v_VALUE_FALSE;
};

var v_lib_graphics2d_function_lineToQuad = function(v_args) {
	var v_float1 = 0.0;
	var v_float2 = 0.0;
	var v_float3 = 0.0;
	var v_i = 0;
	var v_int1 = 0;
	var v_int2 = 0;
	var v_int3 = 0;
	var v_int4 = 0;
	var v_int5 = 0;
	var v_intArray1 = null;
	var v_j = 0;
	var v_len = 0;
	var v_objArray1 = null;
	var v_objInstance1 = null;
	var v_output = v_VALUE_NULL;
	var v_arg1 = v_args[0];
	v_objInstance1 = v_arg1[1];
	v_objArray1 = v_objInstance1[3];
	v_intArray1 = v_objArray1[0];
	v_len = (v_objArray1[1] - 16);
	v_int1 = v_intArray1[(v_len + 1)];
	v_int2 = v_intArray1[(v_len + 2)];
	v_int3 = v_intArray1[(v_len + 3)];
	v_int4 = v_intArray1[(v_len + 4)];
	v_int5 = v_intArray1[(v_len + 5)];
	v_float1 = ((0.0 + v_int4) - v_int2);
	v_float2 = ((0.0 + v_int3) - v_int1);
	v_float3 = (v_float1 / v_float2);
	v_float1 = (v_int5 / 2.0);
	if ((v_float1 < 0.5)) {
		v_float1 = 1.0;
	}
	v_float2 = (v_float1 / (Math.pow(((v_float3 * v_float3) + 1), 0.5)));
	v_float1 = (-v_float2 * v_float3);
	v_i = Math.floor(((v_int1 + v_float1) + 0.5));
	v_j = Math.floor(((v_int1 - v_float1) + 0.5));
	if ((v_i == v_j)) {
		v_j += 1;
	}
	v_intArray1[(v_len + 1)] = v_i;
	v_intArray1[(v_len + 3)] = v_j;
	v_i = Math.floor(((v_int2 + v_float2) + 0.5));
	v_j = Math.floor(((v_int2 - v_float2) + 0.5));
	if ((v_i == v_j)) {
		v_j += 1;
	}
	v_intArray1[(v_len + 2)] = v_i;
	v_intArray1[(v_len + 4)] = v_j;
	v_i = Math.floor(((v_int3 - v_float1) + 0.5));
	v_j = Math.floor(((v_int3 + v_float1) + 0.5));
	if ((v_i == v_j)) {
		v_i += 1;
	}
	v_intArray1[(v_len + 5)] = v_i;
	v_intArray1[(v_len + 7)] = v_j;
	v_i = Math.floor(((v_int4 - v_float2) + 0.5));
	v_j = Math.floor(((v_int4 + v_float2) + 0.5));
	if ((v_i == v_j)) {
		v_i += 1;
	}
	v_intArray1[(v_len + 6)] = v_i;
	v_intArray1[(v_len + 8)] = v_j;
	return v_VALUE_NULL;
};

var v_lib_graphics2d_function_renderQueueAction = function(v_args) {
	var v_command = v_args[2][1];
	var v_objInstance1 = v_args[0][1];
	var v_objArray1 = v_objInstance1[3];
	if ((v_objArray1 == null)) {
		v_objArray1 = C$common$createNewArray(5);
		v_objInstance1[3] = v_objArray1;
	}
	var v_intArray1 = v_objArray1[0];
	if ((v_intArray1 == null)) {
		v_intArray1 = C$common$createNewArray(0);
		v_objArray1[0] = v_intArray1;
		v_objArray1[1] = 0;
		v_objArray1[2] = C$common$createNewArray(64);
		v_objArray1[3] = 0;
		v_objArray1[4] = [];
	}
	var v_intList1 = v_objArray1[4];
	if ((v_command == 1)) {
		var v_charList = v_args[1];
		if ((v_charList[0] == 6)) {
			var v_value = null;
			var v_list1 = v_charList[1];
			var v_len = v_list1.length;
			var v_i = 0;
			while ((v_i < v_len)) {
				v_value = v_list1[v_i];
				v_intList1.push(v_value[1]);
				v_i += 1;
			}
		}
		C$drawing$rendererSetData(v_intArray1, v_objArray1[1], v_objArray1[2], v_intList1);
	} else {
		if ((v_command == 2)) {
			v_objArray1[1] = 0;
			v_objArray1[3] = 0;
			C$common$clearList((v_intList1));
		}
	}
	return v_VALUE_NULL;
};

var v_lib_graphics2d_function_renderQueueValidateArgs = function(v_args) {
	var v_o = v_args[0][1];
	var v_drawQueueRawData = v_o[3];
	var v_drawEvents = v_drawQueueRawData[0];
	var v_length = v_drawQueueRawData[1];
	var v_r = 0;
	var v_g = 0;
	var v_b = 0;
	var v_a = 0;
	var v_i = 0;
	while ((v_i < v_length)) {
		switch (v_drawEvents[v_i]) {
			case 1:
				v_r = v_drawEvents[(v_i | 5)];
				v_g = v_drawEvents[(v_i | 6)];
				v_b = v_drawEvents[(v_i | 7)];
				v_a = v_drawEvents[(v_i | 8)];
				if ((v_r > 255)) {
					v_drawEvents[(v_i | 5)] = 255;
				} else {
					if ((v_r < 0)) {
						v_drawEvents[(v_i | 5)] = 0;
					}
				}
				if ((v_g > 255)) {
					v_drawEvents[(v_i | 6)] = 255;
				} else {
					if ((v_g < 0)) {
						v_drawEvents[(v_i | 6)] = 0;
					}
				}
				if ((v_b > 255)) {
					v_drawEvents[(v_i | 7)] = 255;
				} else {
					if ((v_b < 0)) {
						v_drawEvents[(v_i | 7)] = 0;
					}
				}
				if ((v_a > 255)) {
					v_drawEvents[(v_i | 8)] = 255;
				} else {
					if ((v_a < 0)) {
						v_drawEvents[(v_i | 8)] = 0;
					}
				}
				break;
			case 2:
				v_r = v_drawEvents[(v_i | 5)];
				v_g = v_drawEvents[(v_i | 6)];
				v_b = v_drawEvents[(v_i | 7)];
				v_a = v_drawEvents[(v_i | 8)];
				if ((v_r > 255)) {
					v_drawEvents[(v_i | 5)] = 255;
				} else {
					if ((v_r < 0)) {
						v_drawEvents[(v_i | 5)] = 0;
					}
				}
				if ((v_g > 255)) {
					v_drawEvents[(v_i | 6)] = 255;
				} else {
					if ((v_g < 0)) {
						v_drawEvents[(v_i | 6)] = 0;
					}
				}
				if ((v_b > 255)) {
					v_drawEvents[(v_i | 7)] = 255;
				} else {
					if ((v_b < 0)) {
						v_drawEvents[(v_i | 7)] = 0;
					}
				}
				if ((v_a > 255)) {
					v_drawEvents[(v_i | 8)] = 255;
				} else {
					if ((v_a < 0)) {
						v_drawEvents[(v_i | 8)] = 0;
					}
				}
				break;
			case 3:
				v_r = v_drawEvents[(v_i | 6)];
				v_g = v_drawEvents[(v_i | 7)];
				v_b = v_drawEvents[(v_i | 8)];
				v_a = v_drawEvents[(v_i | 9)];
				if ((v_r > 255)) {
					v_drawEvents[(v_i | 6)] = 255;
				} else {
					if ((v_r < 0)) {
						v_drawEvents[(v_i | 6)] = 0;
					}
				}
				if ((v_g > 255)) {
					v_drawEvents[(v_i | 7)] = 255;
				} else {
					if ((v_g < 0)) {
						v_drawEvents[(v_i | 7)] = 0;
					}
				}
				if ((v_b > 255)) {
					v_drawEvents[(v_i | 8)] = 255;
				} else {
					if ((v_b < 0)) {
						v_drawEvents[(v_i | 8)] = 0;
					}
				}
				if ((v_a > 255)) {
					v_drawEvents[(v_i | 9)] = 255;
				} else {
					if ((v_a < 0)) {
						v_drawEvents[(v_i | 9)] = 0;
					}
				}
				break;
			case 4:
				v_r = v_drawEvents[(v_i | 7)];
				v_g = v_drawEvents[(v_i | 8)];
				v_b = v_drawEvents[(v_i | 9)];
				v_a = v_drawEvents[(v_i | 10)];
				if ((v_r > 255)) {
					v_drawEvents[(v_i | 7)] = 255;
				} else {
					if ((v_r < 0)) {
						v_drawEvents[(v_i | 7)] = 0;
					}
				}
				if ((v_g > 255)) {
					v_drawEvents[(v_i | 8)] = 255;
				} else {
					if ((v_g < 0)) {
						v_drawEvents[(v_i | 8)] = 0;
					}
				}
				if ((v_b > 255)) {
					v_drawEvents[(v_i | 9)] = 255;
				} else {
					if ((v_b < 0)) {
						v_drawEvents[(v_i | 9)] = 0;
					}
				}
				if ((v_a > 255)) {
					v_drawEvents[(v_i | 10)] = 255;
				} else {
					if ((v_a < 0)) {
						v_drawEvents[(v_i | 10)] = 0;
					}
				}
				break;
			case 5:
				v_r = v_drawEvents[(v_i | 9)];
				v_g = v_drawEvents[(v_i | 10)];
				v_b = v_drawEvents[(v_i | 11)];
				v_a = v_drawEvents[(v_i | 12)];
				if ((v_r > 255)) {
					v_drawEvents[(v_i | 9)] = 255;
				} else {
					if ((v_r < 0)) {
						v_drawEvents[(v_i | 9)] = 0;
					}
				}
				if ((v_g > 255)) {
					v_drawEvents[(v_i | 10)] = 255;
				} else {
					if ((v_g < 0)) {
						v_drawEvents[(v_i | 10)] = 0;
					}
				}
				if ((v_b > 255)) {
					v_drawEvents[(v_i | 11)] = 255;
				} else {
					if ((v_b < 0)) {
						v_drawEvents[(v_i | 11)] = 0;
					}
				}
				if ((v_a > 255)) {
					v_drawEvents[(v_i | 12)] = 255;
				} else {
					if ((v_a < 0)) {
						v_drawEvents[(v_i | 12)] = 0;
					}
				}
				break;
			case 6:
				v_a = v_drawEvents[(v_i | 11)];
				if ((v_a > 255)) {
					v_drawEvents[(v_i | 11)] = 255;
				} else {
					if ((v_a < 0)) {
						v_drawEvents[(v_i | 11)] = 0;
					}
				}
				break;
			case 8:
				v_r = v_drawEvents[(v_i | 10)];
				v_g = v_drawEvents[(v_i | 11)];
				v_b = v_drawEvents[(v_i | 12)];
				v_a = v_drawEvents[(v_i | 13)];
				if ((v_r > 255)) {
					v_drawEvents[(v_i | 10)] = 255;
				} else {
					if ((v_r < 0)) {
						v_drawEvents[(v_i | 10)] = 0;
					}
				}
				if ((v_g > 255)) {
					v_drawEvents[(v_i | 11)] = 255;
				} else {
					if ((v_g < 0)) {
						v_drawEvents[(v_i | 11)] = 0;
					}
				}
				if ((v_b > 255)) {
					v_drawEvents[(v_i | 12)] = 255;
				} else {
					if ((v_b < 0)) {
						v_drawEvents[(v_i | 12)] = 0;
					}
				}
				if ((v_a > 255)) {
					v_drawEvents[(v_i | 13)] = 255;
				} else {
					if ((v_a < 0)) {
						v_drawEvents[(v_i | 13)] = 0;
					}
				}
				break;
		}
		v_i += 16;
	}
	return v_VALUE_NULL;
};

var v_lib_graphics2d_function_scale = function(v_args) {
	var v_objArray1 = null;
	var v_objArray2 = null;
	var v_objInstance1 = null;
	var v_objInstance2 = null;
	var v_arg2 = v_args[1];
	var v_arg3 = v_args[2];
	var v_arg4 = v_args[3];
	var v_arg5 = v_args[4];
	var v_arg6 = v_args[5];
	var v_int1 = v_arg3[1];
	var v_int2 = v_arg4[1];
	v_objInstance1 = v_arg5[1];
	var v_object1 = v_objInstance1[3][3];
	v_objInstance1 = v_arg6[1];
	v_objArray1 = C$common$createNewArray(6);
	v_objInstance1[3] = v_objArray1;
	v_objArray1[0] = false;
	v_objArray1[1] = true;
	v_objArray1[2] = 0;
	v_objArray1[3] = C$drawing$scaleImage(v_object1, v_int1, v_int2);
	v_objArray1[4] = v_int1;
	v_objArray1[5] = v_int2;
	v_objInstance2 = v_arg2[1];
	v_objArray1 = C$common$createNewArray(7);
	v_objInstance2[3] = v_objArray1;
	v_objInstance2 = v_args[0][1];
	v_objArray2 = v_objInstance2[3];
	var v_i = 4;
	while ((v_i >= 1)) {
		v_objArray1[v_i] = v_objArray2[v_i];
		v_i -= 1;
	}
	v_objArray1[5] = v_int1;
	v_objArray1[6] = v_int2;
	v_objInstance1 = v_arg6[1];
	v_objArray1[0] = v_objInstance1[3];
	return v_args[0];
};

C$common$scrapeLibFuncNames('graphics2d');
