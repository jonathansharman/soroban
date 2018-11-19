var v_lib_random_manifest = function(v_libRegData) {
	C$common$registerLibraryFunction('random', v_libRegData, "random_bool", 0);
	C$common$registerLibraryFunction('random', v_libRegData, "random_float", 0);
	C$common$registerLibraryFunction('random', v_libRegData, "random_int", 2);
};

var v_lib_random_function_random_bool = function(v_args) {
	var v_output = v_VALUE_NULL;
	if ((Math.random() < 0.5)) {
		v_output = v_VALUE_TRUE;
	} else {
		v_output = v_VALUE_FALSE;
	}
	return v_output;
};

var v_lib_random_function_random_float = function(v_args) {
	var v_output = v_VALUE_NULL;
	v_output = v_buildFloat(Math.random());
	return v_output;
};

var v_lib_random_function_random_int = function(v_args) {
	var v_int1 = 0;
	var v_int2 = 0;
	var v_output = v_VALUE_NULL;
	var v_arg1 = v_args[0];
	var v_arg2 = v_args[1];
	if (((v_arg1[0] != 3) || (v_arg2[0] != 3))) {
		v_output = v_VALUE_NULL;
	} else {
		v_int1 = v_arg1[1];
		v_int2 = v_arg2[1];
		if ((v_int1 >= v_int2)) {
			v_output = v_VALUE_NULL;
		} else {
			v_int2 = Math.floor(((Math.random() * (v_int2 - v_int1))));
			v_output = v_buildInteger((v_int1 + v_int2));
		}
	}
	return v_output;
};

C$common$scrapeLibFuncNames('random');
