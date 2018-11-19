var v_COMMON_STRINGS = {};
var v_INTEGER_NEGATIVE_CACHE = C$common$createNewArray(257);
var v_INTEGER_POSITIVE_CACHE = C$common$createNewArray(2049);
var v_VALUE_EMPTY_STRING = [5, ""];
var v_VALUE_FALSE = [2, false];
var v_VALUE_FLOAT_NEGATIVE_ONE = [4, -1.0];
var v_VALUE_FLOAT_ONE = [4, 1.0];
var v_VALUE_FLOAT_ZERO = [4, 0.0];
var v_VALUE_INT_NEG_ONE = [3, -1];
var v_VALUE_INT_ONE = [3, 1];
var v_VALUE_INT_ZERO = [3, 0];
var v_VALUE_NULL = [1, null];
var v_VALUE_TRUE = [2, true];


var v_addLiteralImpl = function(v_row, v_stringArg) {
	var v_p = C$common$programData;
	var v_type = v_row[0];
	if ((v_type == 1)) {
		v_p[9].push(v_VALUE_NULL);
	} else {
		if ((v_type == 2)) {
			v_p[9].push(v_buildBoolean((v_row[1] == 1)));
		} else {
			if ((v_type == 3)) {
				v_p[9].push(v_buildInteger(v_row[1]));
			} else {
				if ((v_type == 4)) {
					v_p[9].push(v_buildFloat(parseFloat(v_stringArg)));
				} else {
					if ((v_type == 5)) {
						v_p[9].push(v_buildCommonString(v_stringArg));
					} else {
						if ((v_type == 9)) {
							var v_index = v_p[9].length;
							v_p[9].push(v_buildCommonString(v_stringArg));
							v_p[36][v_stringArg] = v_index;
						} else {
							if ((v_type == 10)) {
								var v_cv = [false, v_row[1]];
								v_p[9].push([10, v_cv]);
							}
						}
					}
				}
			}
		}
	}
	return 0;
};

var v_addNameImpl = function(v_nameValue) {
	var v_p = C$common$programData;
	var v_index = v_p[6].length;
	v_p[7][v_nameValue] = v_index;
	v_p[6].push(v_nameValue);
	if ("length" == v_nameValue) {
		v_p[25] = v_index;
	}
	return 0;
};

var v_buildBoolean = function(v_value) {
	if (v_value) {
		return v_VALUE_TRUE;
	}
	return v_VALUE_FALSE;
};

var v_buildCommonString = function(v_s) {
	if (!(v_COMMON_STRINGS[v_s] !== undefined)) {
		var v_value = v_buildString(v_s);
		v_COMMON_STRINGS[v_s] = v_value;
	}
	return v_COMMON_STRINGS[v_s];
};

var v_buildDictionary = function(v_keys, v_values) {
	var v_keyLookup = {};
	var v_valueLookup = {};
	var v_i = (v_keys.length - 1);
	var v_key = null;
	var v_keyValue = null;
	while ((v_i >= 0)) {
		v_key = v_keys[v_i];
		v_keyValue = [5, v_key];
		v_keyLookup[v_key] = v_keyValue;
		v_valueLookup[v_key] = v_values[v_i];
		v_i -= 1;
	}
	return [7, [{}, {}, v_keyLookup, v_valueLookup, Object.keys(v_keyLookup).length, 5]];
};

var v_buildFloat = function(v_value) {
	if ((v_value == 0.0)) {
		return v_VALUE_FLOAT_ZERO;
	}
	if ((v_value == 1.0)) {
		return v_VALUE_FLOAT_ONE;
	}
	return [4, v_value];
};

var v_buildInteger = function(v_num) {
	if ((v_num < 0)) {
		if ((v_num > -257)) {
			return v_INTEGER_NEGATIVE_CACHE[-v_num];
		}
	} else {
		if ((v_num < 2049)) {
			return v_INTEGER_POSITIVE_CACHE[v_num];
		}
	}
	return [3, v_num];
};

var v_buildList = function(v_valueList) {
	return [6, v_valueList];
};

var v_buildRelayObj = function(v_type, v_iarg1, v_iarg2, v_iarg3, v_farg1, v_sarg1) {
	return [v_type, v_iarg1, v_iarg2, v_iarg3, v_farg1, v_sarg1];
};

var v_buildString = function(v_s) {
	if ((v_s.length == 0)) {
		return v_VALUE_EMPTY_STRING;
	}
	return [5, v_s];
};

var v_buildStringList = function(v_stringList) {
	var v_output = [];
	var v_size = v_stringList.length;
	var v_i = 0;
	while ((v_i < v_size)) {
		v_output.push(v_buildString(v_stringList[v_i]));
		v_i += 1;
	}
	return v_buildList(v_output);
};

var v_buildSwitchIntImpl = function(v_row) {
	var v_p = C$common$programData;
	var v_integerSwitchLookup = {};
	var v_i = 0;
	while ((v_i < v_row.length)) {
		v_integerSwitchLookup[v_row[v_i]] = v_row[(v_i + 1)];
		v_i += 2;
	}
	v_p[15].push(v_integerSwitchLookup);
	return 0;
};

var v_buildSwitchStringImpl = function(v_row, v_caseValue) {
	var v_p = C$common$programData;
	var v_allStringSwitchLookups = v_p[17];
	var v_id = v_row[0];
	while ((v_allStringSwitchLookups.length <= v_id)) {
		v_allStringSwitchLookups.push({});
	}
	var v_stringSwitchLookup = v_allStringSwitchLookups[v_id];
	v_stringSwitchLookup[v_caseValue] = v_row[1];
	return 0;
};

var v_canonicalizeAngle = function(v_a) {
	var v_twopi = 6.28318530717958;
	v_a = (v_a % v_twopi);
	if ((v_a < 0)) {
		v_a += v_twopi;
	}
	return v_a;
};

var v_canonicalizeListSliceArgs = function(v_outParams, v_beginValue, v_endValue, v_beginIndex, v_endIndex, v_stepAmount, v_length, v_isForward) {
	if ((v_beginValue == null)) {
		if (v_isForward) {
			v_beginIndex = 0;
		} else {
			v_beginIndex = (v_length - 1);
		}
	}
	if ((v_endValue == null)) {
		if (v_isForward) {
			v_endIndex = v_length;
		} else {
			v_endIndex = (-1 - v_length);
		}
	}
	if ((v_beginIndex < 0)) {
		v_beginIndex += v_length;
	}
	if ((v_endIndex < 0)) {
		v_endIndex += v_length;
	}
	if (((v_beginIndex == 0) && (v_endIndex == v_length) && (v_stepAmount == 1))) {
		return 2;
	}
	if (v_isForward) {
		if ((v_beginIndex >= v_length)) {
			return 0;
		}
		if ((v_beginIndex < 0)) {
			return 3;
		}
		if ((v_endIndex < v_beginIndex)) {
			return 4;
		}
		if ((v_beginIndex == v_endIndex)) {
			return 0;
		}
		if ((v_endIndex > v_length)) {
			v_endIndex = v_length;
		}
	} else {
		if ((v_beginIndex < 0)) {
			return 0;
		}
		if ((v_beginIndex >= v_length)) {
			return 3;
		}
		if ((v_endIndex > v_beginIndex)) {
			return 4;
		}
		if ((v_beginIndex == v_endIndex)) {
			return 0;
		}
		if ((v_endIndex < -1)) {
			v_endIndex = -1;
		}
	}
	v_outParams[0] = v_beginIndex;
	v_outParams[1] = v_endIndex;
	return 1;
};

var v_cloneDictionary = function(v_original, v_clone) {
	var v_keyIntLookup_clone = null;
	var v_valueIntLookup_clone = null;
	var v_keyStringLookup_clone = null;
	var v_valueStringLookup_clone = null;
	if ((v_clone == null)) {
		v_keyIntLookup_clone = {};
		v_valueIntLookup_clone = {};
		v_keyStringLookup_clone = {};
		v_valueStringLookup_clone = {};
		v_clone = [v_keyIntLookup_clone, v_valueIntLookup_clone, v_keyStringLookup_clone, v_valueStringLookup_clone, 0, v_original[5]];
	} else {
		v_keyIntLookup_clone = v_clone[0];
		v_valueIntLookup_clone = v_clone[1];
		v_keyStringLookup_clone = v_clone[2];
		v_valueStringLookup_clone = v_clone[3];
	}
	var v_i = 0;
	var v_iKey = 0;
	var v_sKey = null;
	var v_intKeys = C$common$dictionaryKeys(v_original[0]);
	var v_stringKeys = C$common$dictionaryKeys(v_original[2]);
	v_i = (v_intKeys.length - 1);
	while ((v_i >= 0)) {
		v_iKey = v_intKeys[v_i];
		v_keyIntLookup_clone[v_iKey] = v_original[0][v_iKey];
		v_valueIntLookup_clone[v_iKey] = v_original[1][v_iKey];
		v_i -= 1;
	}
	v_i = (v_stringKeys.length - 1);
	while ((v_i >= 0)) {
		v_sKey = v_stringKeys[v_i];
		v_keyStringLookup_clone[v_sKey] = v_original[2][v_sKey];
		v_valueStringLookup_clone[v_sKey] = v_original[3][v_sKey];
		v_i -= 1;
	}
	v_clone[4] = (Object.keys(v_keyStringLookup_clone).length + Object.keys(v_keyIntLookup_clone).length);
	return v_clone;
};

var v_createLibraryFunctionLookup = function() {
	var v_p = C$common$programData;
	var v_length = v_p[2].length;
	var v_row = null;
	var v_functionPointersByPc = C$common$createNewArray(v_length);
	var v_pc = 0;
	while ((v_pc < v_length)) {
		if ((v_p[2][v_pc] == 14)) {
			v_row = v_p[3][v_pc];
			var v_functionId = v_p[32][((v_row[0] * 4096) + v_row[1])];
			var v_fp = v_p[33][v_functionId];
			v_functionPointersByPc[v_pc] = v_fp;
		}
		v_pc += 1;
	}
	v_p[38] = v_functionPointersByPc;
	return v_functionPointersByPc;
};

var v_declareLibrary = function(v_refId, v_descriptor) {
	var v_p = C$common$programData;
	var v_descriptorParts = v_descriptor.split(",");
	var v_name = v_descriptorParts[0];
	var v_ver = v_descriptorParts[1];
	var v_status = C$common$determineLibraryAvailability(v_name, v_ver);
	if ((v_status == 0)) {
		var v_lro = [v_p[33], v_p[34], v_p[35]];
		v_p[37] = v_refId;
		v_status = C$common$runLibraryManifest(v_name, v_lro);
	}
	return v_status;
};

var v_defOriginalCodeImpl = function(v_row, v_fileContents) {
	var v_p = C$common$programData;
	var v_fileId = v_row[0];
	var v_codeLookup = v_p[13];
	while ((v_codeLookup.length <= v_fileId)) {
		v_codeLookup.push(null);
	}
	v_codeLookup[v_fileId] = v_fileContents;
	return 0;
};

var v_doEqualityComparisonAndReturnCode = function(v_a, v_b) {
	var v_leftType = v_a[0];
	var v_rightType = v_b[0];
	if ((v_leftType == v_rightType)) {
		var v_output = 0;
		switch (v_leftType) {
			case 1:
				v_output = 1;
				break;
			case 3:
				if ((v_a[1] == v_b[1])) {
					v_output = 1;
				}
				break;
			case 4:
				if ((v_a[1] == v_b[1])) {
					v_output = 1;
				}
				break;
			case 2:
				if ((v_a[1] == v_b[1])) {
					v_output = 1;
				}
				break;
			case 5:
				if ((v_a[1] == v_b[1])) {
					v_output = 1;
				}
				break;
			case 6:
				if ((v_a[1] == v_b[1])) {
					v_output = 1;
				}
				break;
			case 7:
				if ((v_a[1] == v_b[1])) {
					v_output = 1;
				}
				break;
			case 8:
				if ((v_a[1] == v_b[1])) {
					v_output = 1;
				}
				break;
			case 9:
				var v_f1 = v_a[1];
				var v_f2 = v_b[1];
				if ((v_f1[3] == v_f2[3])) {
					if (((v_f1[0] == 2) || (v_f1[0] == 4))) {
						if ((v_doEqualityComparisonAndReturnCode(v_f1[1], v_f2[1]) == 1)) {
							v_output = 1;
						}
					} else {
						v_output = 1;
					}
				}
				break;
			case 10:
				var v_c1 = v_a[1];
				var v_c2 = v_b[1];
				if ((v_c1[1] == v_c2[1])) {
					v_output = 1;
				}
				break;
			default:
				v_output = 2;
				break;
		}
		return v_output;
	}
	if ((v_rightType == 1)) {
		return 0;
	}
	if (((v_leftType == 3) && (v_rightType == 4))) {
		if ((v_a[1] == v_b[1])) {
			return 1;
		}
	} else {
		if (((v_leftType == 4) && (v_rightType == 3))) {
			if ((v_a[1] == v_b[1])) {
				return 1;
			}
		}
	}
	return 0;
};

var v_errorResult = function(v_error) {
	return [3, v_error];
};

var v_EX_AssertionFailed = function(v_ec, v_exMsg) {
	return v_generateException2(v_ec, 2, v_exMsg);
};

var v_EX_DivisionByZero = function(v_ec, v_exMsg) {
	return v_generateException2(v_ec, 3, v_exMsg);
};

var v_EX_Fatal = function(v_ec, v_exMsg) {
	return v_generateException2(v_ec, 0, v_exMsg);
};

var v_EX_IndexOutOfRange = function(v_ec, v_exMsg) {
	return v_generateException2(v_ec, 4, v_exMsg);
};

var v_EX_InvalidArgument = function(v_ec, v_exMsg) {
	return v_generateException2(v_ec, 5, v_exMsg);
};

var v_EX_InvalidAssignment = function(v_ec, v_exMsg) {
	return v_generateException2(v_ec, 6, v_exMsg);
};

var v_EX_InvalidInvocation = function(v_ec, v_exMsg) {
	return v_generateException2(v_ec, 7, v_exMsg);
};

var v_EX_InvalidKey = function(v_ec, v_exMsg) {
	return v_generateException2(v_ec, 8, v_exMsg);
};

var v_EX_KeyNotFound = function(v_ec, v_exMsg) {
	return v_generateException2(v_ec, 9, v_exMsg);
};

var v_EX_NullReference = function(v_ec, v_exMsg) {
	return v_generateException2(v_ec, 10, v_exMsg);
};

var v_EX_UnassignedVariable = function(v_ec, v_exMsg) {
	return v_generateException2(v_ec, 11, v_exMsg);
};

var v_EX_UnknownField = function(v_ec, v_exMsg) {
	return v_generateException2(v_ec, 12, v_exMsg);
};

var v_EX_UnsupportedOperation = function(v_ec, v_exMsg) {
	return v_generateException2(v_ec, 13, v_exMsg);
};

var v_finalizeInitializationImpl = function(v_projectId, v_localeCount) {
	var v_p = C$common$programData;
	v_p[30][2] = v_localeCount;
	v_p[5] = C$common$multiplyList(v_p[6], 1);
	v_p[8] = C$common$multiplyList(v_p[9], 1);
	v_p[14] = C$common$multiplyList(v_p[15], 1);
	v_p[16] = C$common$multiplyList(v_p[17], 1);
	v_p[12] = C$common$multiplyList(v_p[13], 1);
	v_p[23] = v_primitiveMethodsInitializeLookup(v_p[7]);
	v_p[24] = C$common$createNewArray(v_p[5].length);
	v_p[28] = v_projectId;
	v_p[6] = null;
	v_p[9] = null;
	v_p[15] = null;
	v_p[17] = null;
	v_p[13] = null;
	v_p[38] = v_createLibraryFunctionLookup();
	v_p[19] = true;
	return 0;
};

var v_fixFuzzyFloatPrecision = function(v_x) {
	if (((v_x % 1) != 0)) {
		var v_u = (v_x % 1);
		if ((v_u < 0)) {
			v_u += 1.0;
		}
		var v_roundDown = false;
		if ((v_u > 0.9999999999)) {
			v_roundDown = true;
			v_x += 0.1;
		} else {
			if ((v_u < 0.00000000002250000000)) {
				v_roundDown = true;
			}
		}
		if (v_roundDown) {
			if ((true || (v_x > 0))) {
				v_x = (Math.floor(v_x) + 0.0);
			} else {
				v_x = (Math.floor(v_x) - 1.0);
			}
		}
	}
	return v_x;
};

var v_generateEsfData = function(v_byteCodeLength, v_esfArgs) {
	var v_output = C$common$createNewArray(v_byteCodeLength);
	var v_esfTokenStack = [];
	var v_esfTokenStackTop = null;
	var v_esfArgIterator = 0;
	var v_esfArgLength = v_esfArgs.length;
	var v_j = 0;
	var v_pc = 0;
	while ((v_pc < v_byteCodeLength)) {
		if (((v_esfArgIterator < v_esfArgLength) && (v_pc == v_esfArgs[v_esfArgIterator]))) {
			v_esfTokenStackTop = C$common$createNewArray(2);
			v_j = 1;
			while ((v_j < 3)) {
				v_esfTokenStackTop[(v_j - 1)] = v_esfArgs[(v_esfArgIterator + v_j)];
				v_j += 1;
			}
			v_esfTokenStack.push(v_esfTokenStackTop);
			v_esfArgIterator += 3;
		}
		while (((v_esfTokenStackTop != null) && (v_esfTokenStackTop[1] <= v_pc))) {
			v_esfTokenStack.pop();
			if ((v_esfTokenStack.length == 0)) {
				v_esfTokenStackTop = null;
			} else {
				v_esfTokenStackTop = v_esfTokenStack[(v_esfTokenStack.length - 1)];
			}
		}
		v_output[v_pc] = v_esfTokenStackTop;
		v_pc += 1;
	}
	return v_output;
};

var v_generateException = function(v_stack, v_pc, v_valueStackSize, v_ec, v_type, v_message) {
	v_ec[2] = v_valueStackSize;
	v_stack[0] = v_pc;
	v_ec[7] = (v_stack[1] + 1);
	var v_p = C$common$programData;
	var v_mn = v_p[30];
	var v_generateExceptionFunctionId = v_mn[1];
	var v_functionInfo = v_p[21][v_generateExceptionFunctionId];
	v_pc = v_functionInfo[2];
	if ((v_ec[5].length <= (v_functionInfo[7] + v_stack[3]))) {
		v_increaseLocalsStackCapacity(v_ec, v_functionInfo[7]);
	}
	var v_localsIndex = v_stack[3];
	v_ec[5][v_localsIndex] = v_buildInteger(v_type);
	v_ec[5][(v_localsIndex + 1)] = v_buildString(v_message);
	v_ec[6][v_localsIndex] = v_ec[7];
	v_ec[6][(v_localsIndex + 1)] = v_ec[7];
	v_ec[1] = [(v_pc + 1), v_ec[7], v_stack[3], (v_stack[3] + v_functionInfo[7]), v_stack, false, null, v_valueStackSize, 0, (v_stack[9] + 1), 0, null];
	return [5, null];
};

var v_generateException2 = function(v_ec, v_exceptionType, v_exMsg) {
	v_ec[13] = [1, v_exceptionType, v_exMsg];
	return true;
};

var v_generatePrimitiveMethodReference = function(v_lookup, v_globalNameId, v_context) {
	var v_functionId = v_resolvePrimitiveMethodName2(v_lookup, v_context[0], v_globalNameId);
	if ((v_functionId < 0)) {
		return null;
	}
	return [9, [4, v_context, 0, v_functionId]];
};

var v_generateTokenListFromPcs = function(v_pcs) {
	var v_output = [];
	var v_p = C$common$programData;
	var v_tokensByPc = v_p[10];
	var v_token = null;
	var v_i = 0;
	while ((v_i < v_pcs.length)) {
		var v_localTokens = v_tokensByPc[v_pcs[v_i]];
		if ((v_localTokens == null)) {
			if ((v_output.length > 0)) {
				v_output.push(null);
			}
		} else {
			v_token = v_localTokens[0];
			v_output.push(v_token);
		}
		v_i += 1;
	}
	return v_output;
};

var v_getBinaryOpFromId = function(v_id) {
	switch (v_id) {
		case 0:
			return "+";
		case 1:
			return "-";
		case 2:
			return "*";
		case 3:
			return "/";
		case 4:
			return "%";
		case 5:
			return "**";
		case 6:
			return "&";
		case 7:
			return "|";
		case 8:
			return "^";
		case 9:
			return "<<";
		case 10:
			return ">>";
		case 11:
			return "<";
		case 12:
			return "<=";
		case 13:
			return ">";
		case 14:
			return ">=";
		default:
			return "unknown";
	}
};

var v_getClassTable = function(v_p, v_classId) {
	var v_oldTable = v_p[20];
	var v_oldLength = v_oldTable.length;
	if ((v_classId < v_oldLength)) {
		return v_oldTable;
	}
	var v_newLength = (v_oldLength * 2);
	if ((v_classId >= v_newLength)) {
		v_newLength = (v_classId + 100);
	}
	var v_newTable = C$common$createNewArray(v_newLength);
	var v_i = (v_oldLength - 1);
	while ((v_i >= 0)) {
		v_newTable[v_i] = v_oldTable[v_i];
		v_i -= 1;
	}
	v_p[20] = v_newTable;
	return v_newTable;
};

var v_getExecutionContext = function(v_id) {
	var v_p = C$common$programData;
	if ((v_id == -1)) {
		v_id = v_p[1];
	}
	if ((v_p[0][v_id] !== undefined)) {
		return v_p[0][v_id];
	}
	return null;
};

var v_getFloat = function(v_num) {
	if ((v_num[0] == 4)) {
		return v_num[1];
	}
	return (v_num[1] + 0.0);
};

var v_getFunctionTable = function(v_p, v_functionId) {
	var v_oldTable = v_p[21];
	var v_oldLength = v_oldTable.length;
	if ((v_functionId < v_oldLength)) {
		return v_oldTable;
	}
	var v_newLength = (v_oldLength * 2);
	if ((v_functionId >= v_newLength)) {
		v_newLength = (v_functionId + 100);
	}
	var v_newTable = C$common$createNewArray(v_newLength);
	var v_i = 0;
	while ((v_i < v_oldLength)) {
		v_newTable[v_i] = v_oldTable[v_i];
		v_i += 1;
	}
	v_p[21] = v_newTable;
	return v_newTable;
};

var v_getNativeDataItem = function(v_objValue, v_index) {
	var v_obj = v_objValue[1];
	return v_obj[3][v_index];
};

var v_getTypeFromId = function(v_id) {
	switch (v_id) {
		case 1:
			return "null";
		case 2:
			return "boolean";
		case 3:
			return "integer";
		case 4:
			return "float";
		case 5:
			return "string";
		case 6:
			return "list";
		case 7:
			return "dictionary";
		case 8:
			return "instance";
		case 9:
			return "function";
	}
	return null;
};

var v_increaseLocalsStackCapacity = function(v_ec, v_newScopeSize) {
	var v_oldLocals = v_ec[5];
	var v_oldSetIndicator = v_ec[6];
	var v_oldCapacity = v_oldLocals.length;
	var v_newCapacity = ((v_oldCapacity * 2) + v_newScopeSize);
	var v_newLocals = C$common$createNewArray(v_newCapacity);
	var v_newSetIndicator = C$common$createNewArray(v_newCapacity);
	var v_i = 0;
	while ((v_i < v_oldCapacity)) {
		v_newLocals[v_i] = v_oldLocals[v_i];
		v_newSetIndicator[v_i] = v_oldSetIndicator[v_i];
		v_i += 1;
	}
	v_ec[5] = v_newLocals;
	v_ec[6] = v_newSetIndicator;
	return 0;
};

var v_initialize_constant_values = function() {
	var v_i = 0;
	v_i = 2;
	while ((v_i < 2049)) {
		v_INTEGER_POSITIVE_CACHE[v_i] = [3, v_i];
		v_i += 1;
	}
	v_i = 2;
	while ((v_i < 257)) {
		v_INTEGER_NEGATIVE_CACHE[v_i] = [3, -v_i];
		v_i += 1;
	}
	v_INTEGER_POSITIVE_CACHE[0] = v_VALUE_INT_ZERO;
	v_INTEGER_POSITIVE_CACHE[1] = v_VALUE_INT_ONE;
	v_INTEGER_NEGATIVE_CACHE[0] = v_VALUE_INT_ZERO;
	v_INTEGER_NEGATIVE_CACHE[1] = v_VALUE_INT_NEG_ONE;
	return 0;
};

var v_initializeClass = function(v_pc, v_p, v_args, v_className) {
	var v_i = 0;
	var v_memberId = 0;
	var v_globalId = 0;
	var v_functionId = 0;
	var v_t = 0;
	var v_classId = v_args[0];
	var v_baseClassId = v_args[1];
	var v_globalNameId = v_args[2];
	var v_constructorFunctionId = v_args[3];
	var v_staticConstructorFunctionId = v_args[4];
	var v_staticInitializationState = 0;
	if ((v_staticConstructorFunctionId == -1)) {
		v_staticInitializationState = 2;
	}
	var v_staticFieldCount = v_args[5];
	var v_staticFields = C$common$createNewArray(v_staticFieldCount);
	v_i = 0;
	while ((v_i < v_staticFieldCount)) {
		v_staticFields[v_i] = v_VALUE_NULL;
		v_i += 1;
	}
	var v_classInfo = [v_classId, v_globalNameId, v_baseClassId, v_staticInitializationState, v_staticFields, v_staticConstructorFunctionId, v_constructorFunctionId, 0, null, null, null, null, v_p[40][v_classId], v_className];
	var v_classTable = v_getClassTable(v_p, v_classId);
	v_classTable[v_classId] = v_classInfo;
	var v_classChain = [];
	v_classChain.push(v_classInfo);
	var v_classIdWalker = v_baseClassId;
	while ((v_classIdWalker != -1)) {
		var v_walkerClass = v_classTable[v_classIdWalker];
		v_classChain.push(v_walkerClass);
		v_classIdWalker = v_walkerClass[2];
	}
	var v_baseClass = null;
	if ((v_baseClassId != -1)) {
		v_baseClass = v_classChain[1];
	}
	var v_functionIds = [];
	var v_fieldInitializationCommand = [];
	var v_fieldInitializationLiteral = [];
	var v_globalNameIdToMemberId = {};
	if ((v_baseClass != null)) {
		v_i = 0;
		while ((v_i < v_baseClass[7])) {
			v_functionIds.push(v_baseClass[8][v_i]);
			v_fieldInitializationCommand.push(v_baseClass[9][v_i]);
			v_fieldInitializationLiteral.push(v_baseClass[10][v_i]);
			v_i += 1;
		}
		var v_keys = C$common$dictionaryKeys(v_baseClass[11]);
		v_i = 0;
		while ((v_i < v_keys.length)) {
			v_t = v_keys[v_i];
			v_globalNameIdToMemberId[v_t] = v_baseClass[11][v_t];
			v_i += 1;
		}
		v_keys = C$common$dictionaryKeys(v_baseClass[12]);
		v_i = 0;
		while ((v_i < v_keys.length)) {
			v_t = v_keys[v_i];
			v_classInfo[12][v_t] = v_baseClass[12][v_t];
			v_i += 1;
		}
	}
	v_i = 6;
	while ((v_i < v_args.length)) {
		v_memberId = v_args[(v_i + 1)];
		v_globalId = v_args[(v_i + 2)];
		while ((v_memberId >= v_functionIds.length)) {
			v_functionIds.push(-1);
			v_fieldInitializationCommand.push(-1);
			v_fieldInitializationLiteral.push(null);
		}
		v_globalNameIdToMemberId[v_globalId] = v_memberId;
		if ((v_args[v_i] == 0)) {
			v_fieldInitializationCommand[v_memberId] = v_args[(v_i + 3)];
			v_t = v_args[(v_i + 4)];
			if ((v_t == -1)) {
				v_fieldInitializationLiteral[v_memberId] = v_VALUE_NULL;
			} else {
				v_fieldInitializationLiteral[v_memberId] = v_p[8][v_t];
			}
		} else {
			v_functionId = v_args[(v_i + 3)];
			v_functionIds[v_memberId] = v_functionId;
		}
		v_i += 5;
	}
	v_classInfo[8] = C$common$multiplyList(v_functionIds, 1);
	v_classInfo[9] = C$common$multiplyList(v_fieldInitializationCommand, 1);
	v_classInfo[10] = C$common$multiplyList(v_fieldInitializationLiteral, 1);
	v_classInfo[7] = v_functionIds.length;
	v_classInfo[11] = v_globalNameIdToMemberId;
	if ("Core.Exception" == v_className) {
		var v_mn = v_p[30];
		v_mn[0] = v_classId;
	}
	return 0;
};

var v_initializeFunction = function(v_p, v_args, v_currentPc, v_stringArg) {
	var v_functionId = v_args[0];
	var v_nameId = v_args[1];
	var v_minArgCount = v_args[2];
	var v_maxArgCount = v_args[3];
	var v_functionType = v_args[4];
	var v_classId = v_args[5];
	var v_localsCount = v_args[6];
	var v_pcJump = v_args[7];
	var v_numPcOffsetsForOptionalArgs = v_args[8];
	var v_pcOffsetsForOptionalArgs = C$common$createNewArray((v_numPcOffsetsForOptionalArgs + 1));
	var v_i = 0;
	while ((v_i < v_numPcOffsetsForOptionalArgs)) {
		v_pcOffsetsForOptionalArgs[(v_i + 1)] = v_args[(9 + v_i)];
		v_i += 1;
	}
	var v_functionTable = v_getFunctionTable(v_p, v_functionId);
	v_functionTable[v_functionId] = [v_functionId, v_nameId, v_currentPc, v_minArgCount, v_maxArgCount, v_functionType, v_classId, v_localsCount, v_pcOffsetsForOptionalArgs, v_stringArg];
	if ((v_nameId >= 0)) {
		var v_name = v_p[5][v_nameId];
		if ("_LIB_CORE_list_filter" == v_name) {
			v_p[26][0] = v_functionId;
		} else {
			if ("_LIB_CORE_list_map" == v_name) {
				v_p[26][1] = v_functionId;
			} else {
				if ("_LIB_CORE_list_sort_by_key" == v_name) {
					v_p[26][2] = v_functionId;
				} else {
					if ("_LIB_CORE_invoke" == v_name) {
						v_p[26][3] = v_functionId;
					} else {
						if ("_LIB_CORE_generateException" == v_name) {
							var v_mn = v_p[30];
							v_mn[1] = v_functionId;
						}
					}
				}
			}
		}
	}
	return v_pcJump;
};

var v_initLocTable = function(v_row) {
	var v_classId = v_row[0];
	var v_memberCount = v_row[1];
	var v_nameId = 0;
	var v_p = C$common$programData;
	var v_totalLocales = v_p[30][2];
	var v_lookup = {};
	var v_i = 2;
	while ((v_i < v_row.length)) {
		var v_localeId = v_row[v_i];
		v_i += 1;
		var v_j = 0;
		while ((v_j < v_memberCount)) {
			v_nameId = v_row[(v_i + v_j)];
			if ((v_nameId != -1)) {
				v_lookup[((v_nameId * v_totalLocales) + v_localeId)] = v_j;
			}
			v_j += 1;
		}
		v_i += v_memberCount;
	}
	v_p[40][v_classId] = v_lookup;
	return 0;
};

var v_interpret = function(v_executionContextId) {
	var v_output = v_interpretImpl(v_executionContextId);
	while ((v_output[0] == 5)) {
		v_output = v_interpretImpl(v_executionContextId);
	}
	return v_output;
};

var v_interpreterFinished = function(v_ec) {
	if ((v_ec != null)) {
		var v_id = v_ec[0];
		var v_p = C$common$programData;
		if ((v_p[0][v_id] !== undefined)) {
			delete v_p[0][v_id];
		}
	}
	return [1, null];
};

var v_interpreterGetExecutionContext = function(v_executionContextId) {
	var v_p = C$common$programData;
	var v_executionContexts = v_p[0];
	if (!(v_executionContexts[v_executionContextId] !== undefined)) {
		return null;
	}
	return v_executionContexts[v_executionContextId];
};

var v_interpretImpl = function(v_executionContextId) {
	var v_p = C$common$programData;
	var v_executionContexts = v_p[0];
	var v_ec = v_interpreterGetExecutionContext(v_executionContextId);
	if ((v_ec == null)) {
		return v_interpreterFinished(null);
	}
	v_ec[8] += 1;
	var v_stack = v_ec[1];
	var v_ops = v_p[2];
	var v_args = v_p[3];
	var v_stringArgs = v_p[4];
	var v_libFunctionPointers = v_p[38];
	var v_classTable = v_p[20];
	var v_functionTable = v_p[21];
	var v_literalTable = v_p[8];
	var v_identifiers = v_p[5];
	var v_valueStack = v_ec[4];
	var v_valueStackSize = v_ec[2];
	var v_valueStackCapacity = v_valueStack.length;
	var v_hasInterrupt = false;
	var v_type = 0;
	var v_nameId = 0;
	var v_classId = 0;
	var v_functionId = 0;
	var v_localeId = 0;
	var v_classInfo = null;
	var v_len = 0;
	var v_root = null;
	var v_row = null;
	var v_argCount = 0;
	var v_stringList = null;
	var v_returnValueUsed = false;
	var v_output = null;
	var v_functionInfo = null;
	var v_keyType = 0;
	var v_intKey = 0;
	var v_stringKey = null;
	var v_dictIntKeyLookup = null;
	var v_dictIntValueLookup = null;
	var v_dictStringKeyLookup = null;
	var v_dictStringValueLookup = null;
	var v_first = false;
	var v_primitiveMethodToCoreLibraryFallback = false;
	var v_bool1 = false;
	var v_bool2 = false;
	var v_staticConstructorNotInvoked = true;
	var v_int1 = 0;
	var v_int2 = 0;
	var v_int3 = 0;
	var v_i = 0;
	var v_j = 0;
	var v_float1 = 0.0;
	var v_float2 = 0.0;
	var v_float3 = 0.0;
	var v_floatList1 = C$common$createNewArray(2);
	var v_value = null;
	var v_value2 = null;
	var v_value3 = null;
	var v_string1 = null;
	var v_string2 = null;
	var v_objInstance1 = null;
	var v_objInstance2 = null;
	var v_object1 = null;
	var v_list1 = null;
	var v_list2 = null;
	var v_dictImpl = null;
	var v_dictImpl2 = null;
	var v_stringList1 = null;
	var v_intList1 = null;
	var v_valueArray1 = null;
	var v_intArray1 = null;
	var v_intArray2 = null;
	var v_objArray1 = null;
	var v_functionPointer1 = null;
	var v_intIntDict1 = null;
	var v_stackFrame2 = null;
	var v_leftValue = null;
	var v_rightValue = null;
	var v_classValue = null;
	var v_arg1 = null;
	var v_arg2 = null;
	var v_arg3 = null;
	var v_globalNameIdToPrimitiveMethodName = v_p[23];
	var v_magicNumbers = v_p[30];
	var v_integerSwitches = v_p[14];
	var v_stringSwitches = v_p[16];
	var v_integerSwitch = null;
	var v_stringSwitch = null;
	var v_esfData = v_p[29];
	var v_localsStack = v_ec[5];
	var v_localsStackSet = v_ec[6];
	var v_localsStackSetToken = v_stack[1];
	var v_localsStackCapacity = v_localsStack.length;
	var v_localsStackOffset = v_stack[2];
	var v_funcArgs = v_p[24];
	var v_pc = v_stack[0];
	while (true) {
		v_row = v_args[v_pc];
		switch (v_ops[v_pc]) {
			case 0:
				// ADD_LITERAL;
				v_addLiteralImpl(v_row, v_stringArgs[v_pc]);
				break;
			case 1:
				// ADD_NAME;
				v_addNameImpl(v_stringArgs[v_pc]);
				break;
			case 2:
				// ASSIGN_INDEX;
				v_valueStackSize -= 3;
				v_value = v_valueStack[(v_valueStackSize + 2)];
				v_value2 = v_valueStack[(v_valueStackSize + 1)];
				v_root = v_valueStack[v_valueStackSize];
				v_type = v_root[0];
				v_bool1 = (v_row[0] == 1);
				if ((v_type == 6)) {
					if ((v_value2[0] == 3)) {
						v_i = v_value2[1];
						v_list1 = v_root[1];
						if ((v_i >= v_list1.length)) {
							v_hasInterrupt = v_EX_IndexOutOfRange(v_ec, "Index is out of range.");
						} else {
							if ((v_i < 0)) {
								v_i += v_list1.length;
								if ((v_i < 0)) {
									v_hasInterrupt = v_EX_IndexOutOfRange(v_ec, "Index is out of range.");
								} else {
									v_list1[v_i] = v_value;
								}
							} else {
								v_list1[v_i] = v_value;
							}
						}
					} else {
						v_hasInterrupt = v_EX_InvalidArgument(v_ec, "List index must be an integer.");
					}
				} else {
					if ((v_type == 7)) {
						v_keyType = v_value2[0];
						if ((v_keyType == 3)) {
							v_intKey = v_value2[1];
						} else {
							if ((v_keyType == 5)) {
								v_stringKey = v_value2[1];
							} else {
								if ((v_keyType == 8)) {
									v_objInstance1 = v_value2[1];
									v_intKey = v_objInstance1[1];
								} else {
									v_hasInterrupt = v_EX_InvalidArgument(v_ec, "Invalid key for a dictionary.");
								}
							}
						}
						if (!v_hasInterrupt) {
							v_dictImpl = v_root[1];
							v_bool2 = (v_dictImpl[4] > 0);
							if ((v_bool2 && (v_dictImpl[5] != v_keyType))) {
								v_hasInterrupt = v_EX_InvalidKey(v_ec, "Cannot have multiple keys in one dictionary with different types.");
							} else {
								if ((v_keyType == 5)) {
									if (!(v_dictImpl[2][v_stringKey] !== undefined)) {
										v_dictImpl[2][v_stringKey] = v_value2;
										v_dictImpl[4] += 1;
										if (!v_bool2) {
											v_dictImpl[5] = v_keyType;
										}
									}
									v_dictImpl[3][v_stringKey] = v_value;
								} else {
									if (!(v_dictImpl[0][v_intKey] !== undefined)) {
										v_dictImpl[0][v_intKey] = v_value2;
										v_dictImpl[4] += 1;
										if (!v_bool2) {
											v_dictImpl[5] = v_keyType;
										}
									}
									v_dictImpl[1][v_intKey] = v_value;
								}
							}
						}
					} else {
						v_hasInterrupt = v_EX_UnsupportedOperation(v_ec, v_getTypeFromId(v_type) + " type does not support assigning to an index.");
					}
				}
				if (v_bool1) {
					v_valueStack[v_valueStackSize] = v_value;
					v_valueStackSize += 1;
				}
				break;
			case 4:
				// ASSIGN_STATIC_FIELD;
				v_classInfo = v_classTable[v_row[0]];
				v_staticConstructorNotInvoked = true;
				if ((v_classInfo[3] < 2)) {
					v_stack[0] = v_pc;
					v_stackFrame2 = v_maybeInvokeStaticConstructor(v_p, v_ec, v_stack, v_classInfo, v_valueStackSize, C$common$intBuffer16);
					if ((C$common$intBuffer16[0] == 1)) {
						return v_generateException(v_stack, v_pc, v_valueStackSize, v_ec, 0, "Static initialization loop detected. The class this field is a member of is not done being initialized.");
					}
					if ((v_stackFrame2 != null)) {
						v_staticConstructorNotInvoked = false;
						v_stack = v_stackFrame2;
						v_pc = v_stack[0];
						v_localsStackSetToken = v_stack[1];
						v_localsStackOffset = v_stack[2];
					}
				}
				if (v_staticConstructorNotInvoked) {
					v_valueStackSize -= 1;
					v_classInfo[4][v_row[1]] = v_valueStack[v_valueStackSize];
				}
				break;
			case 5:
				// ASSIGN_STEP;
				v_valueStackSize -= 2;
				v_value = v_valueStack[(v_valueStackSize + 1)];
				v_value2 = v_valueStack[v_valueStackSize];
				v_nameId = v_row[2];
				if ((v_value2[0] == 8)) {
					v_objInstance1 = v_value2[1];
					v_classId = v_objInstance1[0];
					v_classInfo = v_classTable[v_classId];
					v_intIntDict1 = v_classInfo[12];
					if ((v_intIntDict1[v_nameId] !== undefined)) {
						v_int1 = v_intIntDict1[v_nameId];
						v_int2 = v_classInfo[8][v_int1];
						if ((v_int2 == -1)) {
							v_objInstance1[2][v_int1] = v_value;
						} else {
							v_hasInterrupt = v_EX_InvalidArgument(v_ec, "Cannot override a method with assignment.");
						}
					} else {
						v_hasInterrupt = v_EX_InvalidAssignment(v_ec, ["'", v_classInfo[13], "' instances do not have a field called '", v_p[5][v_nameId], "'"].join(''));
					}
				} else {
					v_hasInterrupt = v_EX_InvalidAssignment(v_ec, "Cannot assign to a field on this type.");
				}
				if ((v_row[1] == 1)) {
					v_valueStack[v_valueStackSize++] = v_value;
				}
				break;
			case 6:
				// ASSIGN_THIS_STEP;
				v_objInstance2 = v_stack[6][1];
				v_objInstance2[2][v_row[0]] = v_valueStack[--v_valueStackSize];
				break;
			case 3:
				// ASSIGN_LOCAL;
				v_i = (v_localsStackOffset + v_row[0]);
				v_localsStack[v_i] = v_valueStack[--v_valueStackSize];
				v_localsStackSet[v_i] = v_localsStackSetToken;
				break;
			case 7:
				// BINARY_OP;
				v_rightValue = v_valueStack[--v_valueStackSize];
				v_leftValue = v_valueStack[(v_valueStackSize - 1)];
				switch (((((v_leftValue[0] * 15) + v_row[0]) * 11) + v_rightValue[0])) {
					case 553:
						// int ** int;
						if ((v_rightValue[1] == 0)) {
							v_value = v_VALUE_INT_ONE;
						} else {
							if ((v_rightValue[1] > 0)) {
								v_value = v_buildInteger(Math.floor(Math.pow(v_leftValue[1], v_rightValue[1])));
							} else {
								v_value = v_buildFloat(Math.pow(v_leftValue[1], v_rightValue[1]));
							}
						}
						break;
					case 554:
						// int ** float;
						v_value = v_buildFloat((0.0 + Math.pow(v_leftValue[1], v_rightValue[1])));
						break;
					case 718:
						// float ** int;
						v_value = v_buildFloat((0.0 + Math.pow(v_leftValue[1], v_rightValue[1])));
						break;
					case 719:
						// float ** float;
						v_value = v_buildFloat((0.0 + Math.pow(v_leftValue[1], v_rightValue[1])));
						break;
					case 708:
						// float % float;
						v_float1 = v_rightValue[1];
						if ((v_float1 == 0)) {
							v_hasInterrupt = v_EX_DivisionByZero(v_ec, "Modulo by 0.");
						} else {
							v_float3 = (v_leftValue[1] % v_float1);
							if ((v_float3 < 0)) {
								v_float3 += v_float1;
							}
							v_value = v_buildFloat(v_float3);
						}
						break;
					case 707:
						// float % int;
						v_int1 = v_rightValue[1];
						if ((v_int1 == 0)) {
							v_hasInterrupt = v_EX_DivisionByZero(v_ec, "Modulo by 0.");
						} else {
							v_float1 = (v_leftValue[1] % v_int1);
							if ((v_float1 < 0)) {
								v_float1 += v_int1;
							}
							v_value = v_buildFloat(v_float1);
						}
						break;
					case 543:
						// int % float;
						v_float3 = v_rightValue[1];
						if ((v_float3 == 0)) {
							v_hasInterrupt = v_EX_DivisionByZero(v_ec, "Modulo by 0.");
						} else {
							v_float1 = (v_leftValue[1] % v_float3);
							if ((v_float1 < 0)) {
								v_float1 += v_float3;
							}
							v_value = v_buildFloat(v_float1);
						}
						break;
					case 542:
						// int % int;
						v_int2 = v_rightValue[1];
						if ((v_int2 == 0)) {
							v_hasInterrupt = v_EX_DivisionByZero(v_ec, "Modulo by 0.");
						} else {
							v_int1 = (v_leftValue[1] % v_int2);
							if ((v_int1 < 0)) {
								v_int1 += v_int2;
							}
							v_value = v_buildInteger(v_int1);
						}
						break;
					case 996:
						// list + list;
						v_value = [6, v_leftValue[1].concat(v_rightValue[1])];
						break;
					case 498:
						// int + int;
						v_int1 = (v_leftValue[1] + v_rightValue[1]);
						if ((v_int1 < 0)) {
							if ((v_int1 > -257)) {
								v_value = v_INTEGER_NEGATIVE_CACHE[-v_int1];
							} else {
								v_value = [3, v_int1];
							}
						} else {
							if ((v_int1 < 2049)) {
								v_value = v_INTEGER_POSITIVE_CACHE[v_int1];
							} else {
								v_value = [3, v_int1];
							}
						}
						break;
					case 509:
						// int - int;
						v_int1 = (v_leftValue[1] - v_rightValue[1]);
						if ((v_int1 < 0)) {
							if ((v_int1 > -257)) {
								v_value = v_INTEGER_NEGATIVE_CACHE[-v_int1];
							} else {
								v_value = [3, v_int1];
							}
						} else {
							if ((v_int1 < 2049)) {
								v_value = v_INTEGER_POSITIVE_CACHE[v_int1];
							} else {
								v_value = [3, v_int1];
							}
						}
						break;
					case 520:
						// int * int;
						v_int1 = (v_leftValue[1] * v_rightValue[1]);
						if ((v_int1 < 0)) {
							if ((v_int1 > -257)) {
								v_value = v_INTEGER_NEGATIVE_CACHE[-v_int1];
							} else {
								v_value = [3, v_int1];
							}
						} else {
							if ((v_int1 < 2049)) {
								v_value = v_INTEGER_POSITIVE_CACHE[v_int1];
							} else {
								v_value = [3, v_int1];
							}
						}
						break;
					case 531:
						// int / int;
						v_int2 = v_rightValue[1];
						if ((v_int2 == 0)) {
							v_hasInterrupt = v_EX_DivisionByZero(v_ec, "Division by 0.");
						} else {
							v_int1 = Math.floor(v_leftValue[1] / v_int2);
							if ((v_int1 < 0)) {
								if ((v_int1 > -257)) {
									v_value = v_INTEGER_NEGATIVE_CACHE[-v_int1];
								} else {
									v_value = [3, v_int1];
								}
							} else {
								if ((v_int1 < 2049)) {
									v_value = v_INTEGER_POSITIVE_CACHE[v_int1];
								} else {
									v_value = [3, v_int1];
								}
							}
						}
						break;
					case 663:
						// float + int;
						v_value = v_buildFloat((v_leftValue[1] + v_rightValue[1]));
						break;
					case 499:
						// int + float;
						v_value = v_buildFloat((v_leftValue[1] + v_rightValue[1]));
						break;
					case 664:
						// float + float;
						v_float1 = (v_leftValue[1] + v_rightValue[1]);
						if ((v_float1 == 0)) {
							v_value = v_VALUE_FLOAT_ZERO;
						} else {
							if ((v_float1 == 1)) {
								v_value = v_VALUE_FLOAT_ONE;
							} else {
								v_value = [4, v_float1];
							}
						}
						break;
					case 510:
						// int - float;
						v_value = v_buildFloat((v_leftValue[1] - v_rightValue[1]));
						break;
					case 674:
						// float - int;
						v_value = v_buildFloat((v_leftValue[1] - v_rightValue[1]));
						break;
					case 675:
						// float - float;
						v_float1 = (v_leftValue[1] - v_rightValue[1]);
						if ((v_float1 == 0)) {
							v_value = v_VALUE_FLOAT_ZERO;
						} else {
							if ((v_float1 == 1)) {
								v_value = v_VALUE_FLOAT_ONE;
							} else {
								v_value = [4, v_float1];
							}
						}
						break;
					case 685:
						// float * int;
						v_value = v_buildFloat((v_leftValue[1] * v_rightValue[1]));
						break;
					case 521:
						// int * float;
						v_value = v_buildFloat((v_leftValue[1] * v_rightValue[1]));
						break;
					case 686:
						// float * float;
						v_value = v_buildFloat((v_leftValue[1] * v_rightValue[1]));
						break;
					case 532:
						// int / float;
						v_float1 = v_rightValue[1];
						if ((v_float1 == 0)) {
							v_hasInterrupt = v_EX_DivisionByZero(v_ec, "Division by 0.");
						} else {
							v_value = v_buildFloat((v_leftValue[1] / v_float1));
						}
						break;
					case 696:
						// float / int;
						v_int1 = v_rightValue[1];
						if ((v_int1 == 0)) {
							v_hasInterrupt = v_EX_DivisionByZero(v_ec, "Division by 0.");
						} else {
							v_value = v_buildFloat((v_leftValue[1] / v_int1));
						}
						break;
					case 697:
						// float / float;
						v_float1 = v_rightValue[1];
						if ((v_float1 == 0)) {
							v_hasInterrupt = v_EX_DivisionByZero(v_ec, "Division by 0.");
						} else {
							v_value = v_buildFloat((v_leftValue[1] / v_float1));
						}
						break;
					case 564:
						// int & int;
						v_value = v_buildInteger((v_leftValue[1] & v_rightValue[1]));
						break;
					case 575:
						// int | int;
						v_value = v_buildInteger((v_leftValue[1] | v_rightValue[1]));
						break;
					case 586:
						// int ^ int;
						v_value = v_buildInteger((v_leftValue[1] ^ v_rightValue[1]));
						break;
					case 597:
						// int << int;
						v_int1 = v_rightValue[1];
						if ((v_int1 < 0)) {
							v_hasInterrupt = v_EX_InvalidArgument(v_ec, "Cannot bit shift by a negative number.");
						} else {
							v_value = v_buildInteger((v_leftValue[1] << v_int1));
						}
						break;
					case 608:
						// int >> int;
						v_int1 = v_rightValue[1];
						if ((v_int1 < 0)) {
							v_hasInterrupt = v_EX_InvalidArgument(v_ec, "Cannot bit shift by a negative number.");
						} else {
							v_value = v_buildInteger((v_leftValue[1] >> v_int1));
						}
						break;
					case 619:
						// int < int;
						if ((v_leftValue[1] < v_rightValue[1])) {
							v_value = v_VALUE_TRUE;
						} else {
							v_value = v_VALUE_FALSE;
						}
						break;
					case 630:
						// int <= int;
						if ((v_leftValue[1] <= v_rightValue[1])) {
							v_value = v_VALUE_TRUE;
						} else {
							v_value = v_VALUE_FALSE;
						}
						break;
					case 784:
						// float < int;
						if ((v_leftValue[1] < v_rightValue[1])) {
							v_value = v_VALUE_TRUE;
						} else {
							v_value = v_VALUE_FALSE;
						}
						break;
					case 795:
						// float <= int;
						if ((v_leftValue[1] <= v_rightValue[1])) {
							v_value = v_VALUE_TRUE;
						} else {
							v_value = v_VALUE_FALSE;
						}
						break;
					case 620:
						// int < float;
						if ((v_leftValue[1] < v_rightValue[1])) {
							v_value = v_VALUE_TRUE;
						} else {
							v_value = v_VALUE_FALSE;
						}
						break;
					case 631:
						// int <= float;
						if ((v_leftValue[1] <= v_rightValue[1])) {
							v_value = v_VALUE_TRUE;
						} else {
							v_value = v_VALUE_FALSE;
						}
						break;
					case 785:
						// float < float;
						if ((v_leftValue[1] < v_rightValue[1])) {
							v_value = v_VALUE_TRUE;
						} else {
							v_value = v_VALUE_FALSE;
						}
						break;
					case 796:
						// float <= float;
						if ((v_leftValue[1] <= v_rightValue[1])) {
							v_value = v_VALUE_TRUE;
						} else {
							v_value = v_VALUE_FALSE;
						}
						break;
					case 652:
						// int >= int;
						if ((v_leftValue[1] >= v_rightValue[1])) {
							v_value = v_VALUE_TRUE;
						} else {
							v_value = v_VALUE_FALSE;
						}
						break;
					case 641:
						// int > int;
						if ((v_leftValue[1] > v_rightValue[1])) {
							v_value = v_VALUE_TRUE;
						} else {
							v_value = v_VALUE_FALSE;
						}
						break;
					case 817:
						// float >= int;
						if ((v_leftValue[1] >= v_rightValue[1])) {
							v_value = v_VALUE_TRUE;
						} else {
							v_value = v_VALUE_FALSE;
						}
						break;
					case 806:
						// float > int;
						if ((v_leftValue[1] > v_rightValue[1])) {
							v_value = v_VALUE_TRUE;
						} else {
							v_value = v_VALUE_FALSE;
						}
						break;
					case 653:
						// int >= float;
						if ((v_leftValue[1] >= v_rightValue[1])) {
							v_value = v_VALUE_TRUE;
						} else {
							v_value = v_VALUE_FALSE;
						}
						break;
					case 642:
						// int > float;
						if ((v_leftValue[1] > v_rightValue[1])) {
							v_value = v_VALUE_TRUE;
						} else {
							v_value = v_VALUE_FALSE;
						}
						break;
					case 818:
						// float >= float;
						if ((v_leftValue[1] >= v_rightValue[1])) {
							v_value = v_VALUE_TRUE;
						} else {
							v_value = v_VALUE_FALSE;
						}
						break;
					case 807:
						// float > float;
						if ((v_leftValue[1] > v_rightValue[1])) {
							v_value = v_VALUE_TRUE;
						} else {
							v_value = v_VALUE_FALSE;
						}
						break;
					case 830:
						// string + string;
						v_value = [5, v_leftValue[1] + v_rightValue[1]];
						break;
					case 850:
						// string * int;
						v_value = v_multiplyString(v_leftValue, v_leftValue[1], v_rightValue[1]);
						break;
					case 522:
						// int * string;
						v_value = v_multiplyString(v_rightValue, v_rightValue[1], v_leftValue[1]);
						break;
					case 1015:
						// list * int;
						v_int1 = v_rightValue[1];
						if ((v_int1 < 0)) {
							v_hasInterrupt = v_EX_UnsupportedOperation(v_ec, "Cannot multiply list by negative number.");
						} else {
							v_value = [6, C$common$multiplyList(v_leftValue[1], v_int1)];
						}
						break;
					case 523:
						// int * list;
						v_int1 = v_leftValue[1];
						if ((v_int1 < 0)) {
							v_hasInterrupt = v_EX_UnsupportedOperation(v_ec, "Cannot multiply list by negative number.");
						} else {
							v_value = [6, C$common$multiplyList(v_rightValue[1], v_int1)];
						}
						break;
					default:
						if (((v_row[0] == 0) && (((v_leftValue[0] == 5) || (v_rightValue[0] == 5))))) {
							v_value = [5, v_valueToString(v_leftValue) + v_valueToString(v_rightValue)];
						} else {
							// unrecognized op;
							v_hasInterrupt = v_EX_UnsupportedOperation(v_ec, ["The '", v_getBinaryOpFromId(v_row[0]), "' operator is not supported for these types: ", v_getTypeFromId(v_leftValue[0]), " and ", v_getTypeFromId(v_rightValue[0])].join(''));
						}
						break;
				}
				v_valueStack[(v_valueStackSize - 1)] = v_value;
				break;
			case 8:
				// BOOLEAN_NOT;
				v_value = v_valueStack[(v_valueStackSize - 1)];
				if ((v_value[0] != 2)) {
					v_hasInterrupt = v_EX_InvalidArgument(v_ec, "Boolean expected.");
				} else {
					if (v_value[1]) {
						v_valueStack[(v_valueStackSize - 1)] = v_VALUE_FALSE;
					} else {
						v_valueStack[(v_valueStackSize - 1)] = v_VALUE_TRUE;
					}
				}
				break;
			case 9:
				// BREAK;
				if ((v_row[0] == 1)) {
					v_pc += v_row[1];
				} else {
					v_intArray1 = v_esfData[v_pc];
					v_pc = (v_intArray1[1] - 1);
					v_valueStackSize = (v_stack[7] + v_p[31][v_pc]);
					v_stack[10] = 1;
				}
				break;
			case 10:
				// BUILD_SWITCH_INT;
				v_buildSwitchIntImpl(v_row);
				break;
			case 11:
				// BUILD_SWITCH_STRING;
				v_buildSwitchStringImpl(v_row, v_stringArgs[v_pc]);
				break;
			case 12:
				// CALL_FUNCTION;
				v_type = v_row[0];
				v_argCount = v_row[1];
				v_functionId = v_row[2];
				v_returnValueUsed = (v_row[3] == 1);
				v_classId = v_row[4];
				if (((v_type == 2) || (v_type == 6))) {
					// constructor or static method;
					v_classInfo = v_p[20][v_classId];
					v_staticConstructorNotInvoked = true;
					if ((v_classInfo[3] < 2)) {
						v_stack[0] = v_pc;
						v_stackFrame2 = v_maybeInvokeStaticConstructor(v_p, v_ec, v_stack, v_classInfo, v_valueStackSize, C$common$intBuffer16);
						if ((C$common$intBuffer16[0] == 1)) {
							return v_generateException(v_stack, v_pc, v_valueStackSize, v_ec, 0, "Static initialization loop detected. The class this field is a member of is not done being initialized.");
						}
						if ((v_stackFrame2 != null)) {
							v_staticConstructorNotInvoked = false;
							v_stack = v_stackFrame2;
							v_pc = v_stack[0];
							v_localsStackSetToken = v_stack[1];
							v_localsStackOffset = v_stack[2];
						}
					}
				} else {
					v_staticConstructorNotInvoked = true;
				}
				if (v_staticConstructorNotInvoked) {
					v_bool1 = true;
					// construct args array;
					if ((v_argCount == -1)) {
						v_valueStackSize -= 1;
						v_value = v_valueStack[v_valueStackSize];
						if ((v_value[0] == 1)) {
							v_argCount = 0;
						} else {
							if ((v_value[0] == 6)) {
								v_list1 = v_value[1];
								v_argCount = v_list1.length;
								v_i = (v_argCount - 1);
								while ((v_i >= 0)) {
									v_funcArgs[v_i] = v_list1[v_i];
									v_i -= 1;
								}
							} else {
								v_hasInterrupt = v_EX_InvalidArgument(v_ec, "Function pointers' .invoke method requires a list argument.");
							}
						}
					} else {
						v_i = (v_argCount - 1);
						while ((v_i >= 0)) {
							v_valueStackSize -= 1;
							v_funcArgs[v_i] = v_valueStack[v_valueStackSize];
							v_i -= 1;
						}
					}
					if (!v_hasInterrupt) {
						if ((v_type == 3)) {
							v_value = v_stack[6];
							v_objInstance1 = v_value[1];
							if ((v_objInstance1[0] != v_classId)) {
								v_int2 = v_row[5];
								if ((v_int2 != -1)) {
									v_classInfo = v_classTable[v_objInstance1[0]];
									v_functionId = v_classInfo[8][v_int2];
								}
							}
						} else {
							if ((v_type == 5)) {
								// field invocation;
								v_valueStackSize -= 1;
								v_value = v_valueStack[v_valueStackSize];
								v_localeId = v_row[5];
								switch (v_value[0]) {
									case 1:
										v_hasInterrupt = v_EX_NullReference(v_ec, "Invoked method on null.");
										break;
									case 8:
										// field invoked on an object instance.;
										v_objInstance1 = v_value[1];
										v_int1 = v_objInstance1[0];
										v_classInfo = v_classTable[v_int1];
										v_intIntDict1 = v_classInfo[12];
										v_int1 = ((v_row[4] * v_p[30][2]) + v_row[5]);
										if ((v_intIntDict1[v_int1] !== undefined)) {
											v_int1 = v_intIntDict1[v_int1];
											v_functionId = v_classInfo[8][v_int1];
											if ((v_functionId > 0)) {
												v_type = 3;
											} else {
												v_value = v_objInstance1[2][v_int1];
												v_type = 4;
												v_valueStack[v_valueStackSize] = v_value;
												v_valueStackSize += 1;
											}
										} else {
											v_hasInterrupt = v_EX_UnknownField(v_ec, "Unknown field.");
										}
										break;
									case 10:
										// field invocation on a class object instance.;
										v_functionId = v_resolvePrimitiveMethodName2(v_globalNameIdToPrimitiveMethodName, v_value[0], v_classId);
										if ((v_functionId < 0)) {
											v_hasInterrupt = v_EX_InvalidInvocation(v_ec, "Class definitions do not have that method.");
										} else {
											v_functionId = v_resolvePrimitiveMethodName2(v_globalNameIdToPrimitiveMethodName, v_value[0], v_classId);
											if ((v_functionId < 0)) {
												v_hasInterrupt = v_EX_InvalidInvocation(v_ec, v_getTypeFromId(v_value[0]) + " does not have that method.");
											} else {
												if ((v_globalNameIdToPrimitiveMethodName[v_classId] == 8)) {
													v_type = 6;
													v_classValue = v_value[1];
													if (v_classValue[0]) {
														v_hasInterrupt = v_EX_UnsupportedOperation(v_ec, "Cannot create an instance of an interface.");
													} else {
														v_classId = v_classValue[1];
														if (!v_returnValueUsed) {
															v_hasInterrupt = v_EX_UnsupportedOperation(v_ec, "Cannot create an instance and not use the output.");
														} else {
															v_classInfo = v_p[20][v_classId];
															v_functionId = v_classInfo[6];
														}
													}
												} else {
													v_type = 9;
												}
											}
										}
										break;
									default:
										// primitive method suspected.;
										v_functionId = v_resolvePrimitiveMethodName2(v_globalNameIdToPrimitiveMethodName, v_value[0], v_classId);
										if ((v_functionId < 0)) {
											v_hasInterrupt = v_EX_InvalidInvocation(v_ec, v_getTypeFromId(v_value[0]) + " does not have that method.");
										} else {
											v_type = 9;
										}
										break;
								}
							}
						}
					}
					if (((v_type == 4) && !v_hasInterrupt)) {
						// pointer provided;
						v_valueStackSize -= 1;
						v_value = v_valueStack[v_valueStackSize];
						if ((v_value[0] == 9)) {
							v_functionPointer1 = v_value[1];
							switch (v_functionPointer1[0]) {
								case 1:
									// pointer to a function;
									v_functionId = v_functionPointer1[3];
									v_type = 1;
									break;
								case 2:
									// pointer to a method;
									v_functionId = v_functionPointer1[3];
									v_value = v_functionPointer1[1];
									v_type = 3;
									break;
								case 3:
									// pointer to a static method;
									v_functionId = v_functionPointer1[3];
									v_classId = v_functionPointer1[2];
									v_type = 2;
									break;
								case 4:
									// pointer to a primitive method;
									v_value = v_functionPointer1[1];
									v_functionId = v_functionPointer1[3];
									v_type = 9;
									break;
							}
						} else {
							v_hasInterrupt = v_EX_InvalidInvocation(v_ec, "This type cannot be invoked like a function.");
						}
					}
					if (((v_type == 9) && !v_hasInterrupt)) {
						// primitive method invocation;
						v_output = v_VALUE_NULL;
						v_primitiveMethodToCoreLibraryFallback = false;
						switch (v_value[0]) {
							case 5:
								// ...on a string;
								v_string1 = v_value[1];
								switch (v_functionId) {
									case 7:
										if ((v_argCount != 1)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("string contains method", 1, v_argCount));
										} else {
											v_value2 = v_funcArgs[0];
											if ((v_value2[0] != 5)) {
												v_hasInterrupt = v_EX_InvalidArgument(v_ec, "string contains method requires another string as input.");
											} else {
												if ((v_string1.indexOf(v_value2[1]) != -1)) {
													v_output = v_VALUE_TRUE;
												} else {
													v_output = v_VALUE_FALSE;
												}
											}
										}
										break;
									case 9:
										if ((v_argCount != 1)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("string endsWith method", 1, v_argCount));
										} else {
											v_value2 = v_funcArgs[0];
											if ((v_value2[0] != 5)) {
												v_hasInterrupt = v_EX_InvalidArgument(v_ec, "string endsWith method requires another string as input.");
											} else {
												if (C$common$stringEndsWith(v_string1, v_value2[1])) {
													v_output = v_VALUE_TRUE;
												} else {
													v_output = v_VALUE_FALSE;
												}
											}
										}
										break;
									case 13:
										if ((v_argCount != 1)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("string indexOf method", 1, v_argCount));
										} else {
											v_value2 = v_funcArgs[0];
											if ((v_value2[0] != 5)) {
												v_hasInterrupt = v_EX_InvalidArgument(v_ec, "string indexOf method requires another string as input.");
											} else {
												v_output = v_buildInteger(v_string1.indexOf(v_value2[1]));
											}
										}
										break;
									case 19:
										if ((v_argCount > 0)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("string lower method", 0, v_argCount));
										} else {
											v_output = v_buildString(v_string1.toLowerCase());
										}
										break;
									case 20:
										if ((v_argCount > 0)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("string ltrim method", 0, v_argCount));
										} else {
											v_output = v_buildString(C$common$stringTrimOneSide(v_string1, true));
										}
										break;
									case 25:
										if ((v_argCount != 2)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("string replace method", 2, v_argCount));
										} else {
											v_value2 = v_funcArgs[0];
											v_value3 = v_funcArgs[1];
											if (((v_value2[0] != 5) || (v_value3[0] != 5))) {
												v_hasInterrupt = v_EX_InvalidArgument(v_ec, "string replace method requires 2 strings as input.");
											} else {
												v_output = v_buildString(v_string1.split(v_value2[1]).join(v_value3[1]));
											}
										}
										break;
									case 26:
										if ((v_argCount > 0)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("string reverse method", 0, v_argCount));
										} else {
											v_output = v_buildString(v_string1.split('').reverse().join(''));
										}
										break;
									case 27:
										if ((v_argCount > 0)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("string rtrim method", 0, v_argCount));
										} else {
											v_output = v_buildString(C$common$stringTrimOneSide(v_string1, false));
										}
										break;
									case 30:
										if ((v_argCount != 1)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("string split method", 1, v_argCount));
										} else {
											v_value2 = v_funcArgs[0];
											if ((v_value2[0] != 5)) {
												v_hasInterrupt = v_EX_InvalidArgument(v_ec, "string split method requires another string as input.");
											} else {
												v_stringList = v_string1.split(v_value2[1]);
												v_list1 = [];
												v_len = v_stringList.length;
												v_i = 0;
												while ((v_i < v_len)) {
													v_list1.push(v_buildString(v_stringList[v_i]));
													v_i += 1;
												}
												v_output = [6, v_list1];
											}
										}
										break;
									case 31:
										if ((v_argCount != 1)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("string startsWith method", 1, v_argCount));
										} else {
											v_value2 = v_funcArgs[0];
											if ((v_value2[0] != 5)) {
												v_hasInterrupt = v_EX_InvalidArgument(v_ec, "string startsWith method requires another string as input.");
											} else {
												if ((v_string1.indexOf(v_value2[1]) == 0)) {
													v_output = v_VALUE_TRUE;
												} else {
													v_output = v_VALUE_FALSE;
												}
											}
										}
										break;
									case 32:
										if ((v_argCount > 0)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("string trim method", 0, v_argCount));
										} else {
											v_output = v_buildString(v_string1.trim());
										}
										break;
									case 33:
										if ((v_argCount > 0)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("string upper method", 0, v_argCount));
										} else {
											v_output = v_buildString(v_string1.toUpperCase());
										}
										break;
									default:
										v_output = null;
										break;
								}
								break;
							case 6:
								// ...on a list;
								v_list1 = v_value[1];
								switch (v_functionId) {
									case 0:
										if ((v_argCount == 0)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, "List add method requires at least one argument.");
										} else {
											v_i = 0;
											while ((v_i < v_argCount)) {
												v_list1.push(v_funcArgs[v_i]);
												v_i += 1;
											}
											v_output = v_VALUE_NULL;
										}
										break;
									case 3:
										if ((v_argCount > 0)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("list choice method", 0, v_argCount));
										} else {
											v_len = v_list1.length;
											if ((v_len == 0)) {
												v_hasInterrupt = v_EX_UnsupportedOperation(v_ec, "Cannot use list.choice() method on an empty list.");
											} else {
												v_output = v_list1[Math.floor(((Math.random() * v_len)))];
											}
										}
										break;
									case 4:
										if ((v_argCount > 0)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("list clear method", 0, v_argCount));
										} else {
											C$common$clearList((v_list1));
										}
										break;
									case 5:
										if ((v_argCount > 0)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("list clone method", 0, v_argCount));
										} else {
											v_list2 = [];
											v_len = v_list1.length;
											v_i = 0;
											while ((v_i < v_len)) {
												v_list2.push(v_list1[v_i]);
												v_i += 1;
											}
											v_output = [6, v_list2];
										}
										break;
									case 6:
										if ((v_argCount != 1)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("list concat method", 1, v_argCount));
										} else {
											v_value2 = v_funcArgs[0];
											if ((v_value2[0] != 6)) {
												v_hasInterrupt = v_EX_InvalidArgument(v_ec, "list concat methods requires a list as an argument.");
											} else {
												v_list2 = v_value2[1];
												v_len = v_list2.length;
												v_i = 0;
												while ((v_i < v_len)) {
													v_list1.push(v_list2[v_i]);
													v_i += 1;
												}
											}
										}
										break;
									case 7:
										if ((v_argCount != 1)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("list contains method", 1, v_argCount));
										} else {
											v_value2 = v_funcArgs[0];
											v_len = v_list1.length;
											v_output = v_VALUE_FALSE;
											v_i = 0;
											while ((v_i < v_len)) {
												if ((v_doEqualityComparisonAndReturnCode(v_value2, v_list1[v_i]) == 1)) {
													v_output = v_VALUE_TRUE;
													v_i = v_len;
												}
												v_i += 1;
											}
										}
										break;
									case 10:
										if ((v_argCount != 1)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("list filter method", 1, v_argCount));
										} else {
											v_value2 = v_funcArgs[0];
											if ((v_value2[0] != 9)) {
												v_hasInterrupt = v_EX_InvalidArgument(v_ec, "list filter method requires a function pointer as its argument.");
											} else {
												v_primitiveMethodToCoreLibraryFallback = true;
												v_functionId = v_p[26][0];
												v_funcArgs[1] = v_value;
												v_argCount = 2;
												v_output = null;
											}
										}
										break;
									case 14:
										if ((v_argCount != 2)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("list insert method", 1, v_argCount));
										} else {
											v_value = v_funcArgs[0];
											v_value2 = v_funcArgs[1];
											if ((v_value[0] != 3)) {
												v_hasInterrupt = v_EX_InvalidArgument(v_ec, "First argument of list.insert must be an integer index.");
											} else {
												v_int1 = v_value[1];
												v_len = v_list1.length;
												if ((v_int1 < 0)) {
													v_int1 += v_len;
												}
												if ((v_int1 == v_len)) {
													v_list1.push(v_value2);
												} else {
													if (((v_int1 < 0) || (v_int1 >= v_len))) {
														v_hasInterrupt = v_EX_IndexOutOfRange(v_ec, "Index out of range.");
													} else {
														v_list1.splice(v_int1, 0, v_value2);
													}
												}
											}
										}
										break;
									case 17:
										if ((v_argCount != 1)) {
											if ((v_argCount == 0)) {
												v_value2 = v_VALUE_EMPTY_STRING;
											} else {
												v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("list join method", 1, v_argCount));
											}
										} else {
											v_value2 = v_funcArgs[0];
											if ((v_value2[0] != 5)) {
												v_hasInterrupt = v_EX_InvalidArgument(v_ec, "Argument of list.join needs to be a string.");
											}
										}
										if (!v_hasInterrupt) {
											v_stringList1 = [];
											v_string1 = v_value2[1];
											v_len = v_list1.length;
											v_i = 0;
											while ((v_i < v_len)) {
												v_stringList1.push(v_valueToString(v_list1[v_i]));
												v_i += 1;
											}
											v_string1 = v_stringList1.join(v_string1);
											v_output = v_buildString(v_string1);
										}
										break;
									case 21:
										if ((v_argCount != 1)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("list map method", 1, v_argCount));
										} else {
											v_value2 = v_funcArgs[0];
											if ((v_value2[0] != 9)) {
												v_hasInterrupt = v_EX_InvalidArgument(v_ec, "list map method requires a function pointer as its argument.");
											} else {
												v_primitiveMethodToCoreLibraryFallback = true;
												v_functionId = v_p[26][1];
												v_funcArgs[1] = v_value;
												v_argCount = 2;
												v_output = null;
											}
										}
										break;
									case 23:
										if ((v_argCount > 0)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("list pop method", 0, v_argCount));
										} else {
											v_len = v_list1.length;
											if ((v_len < 1)) {
												v_hasInterrupt = v_EX_IndexOutOfRange(v_ec, "Cannot pop from an empty list.");
											} else {
												if (v_returnValueUsed) {
													v_output = v_list1[(v_len - 1)];
												}
												v_list1.pop();
											}
										}
										break;
									case 24:
										if ((v_argCount != 1)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("list remove method", 1, v_argCount));
										} else {
											v_value = v_funcArgs[0];
											if ((v_value[0] != 3)) {
												v_hasInterrupt = v_EX_InvalidArgument(v_ec, "Argument of list.remove must be an integer index.");
											} else {
												v_int1 = v_value[1];
												v_len = v_list1.length;
												if ((v_int1 < 0)) {
													v_int1 += v_len;
												}
												if (((v_int1 < 0) || (v_int1 >= v_len))) {
													v_hasInterrupt = v_EX_IndexOutOfRange(v_ec, "Index out of range.");
												} else {
													if (v_returnValueUsed) {
														v_output = v_list1[v_int1];
													}
													v_list1.splice(v_int1, 1);
												}
											}
										}
										break;
									case 26:
										if ((v_argCount > 0)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("list reverse method", 0, v_argCount));
										} else {
											v_list1.reverse();
										}
										break;
									case 28:
										if ((v_argCount > 0)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("list shuffle method", 0, v_argCount));
										} else {
											C$common$shuffle(v_list1);
										}
										break;
									case 29:
										if ((v_argCount == 0)) {
											v_sortLists(v_list1, v_list1, C$common$intBuffer16);
											if ((C$common$intBuffer16[0] > 0)) {
												v_hasInterrupt = v_EX_InvalidArgument(v_ec, "Invalid list to sort. All items must be numbers or all strings, but not mixed.");
											}
										} else {
											if ((v_argCount == 1)) {
												v_value2 = v_funcArgs[0];
												if ((v_value2[0] == 9)) {
													v_primitiveMethodToCoreLibraryFallback = true;
													v_functionId = v_p[26][2];
													v_funcArgs[1] = v_value;
													v_argCount = 2;
												} else {
													v_hasInterrupt = v_EX_InvalidArgument(v_ec, "list.sort(get_key_function) requires a function pointer as its argument.");
												}
												v_output = null;
											}
										}
										break;
									default:
										v_output = null;
										break;
								}
								break;
							case 7:
								// ...on a dictionary;
								v_dictImpl = v_value[1];
								switch (v_functionId) {
									case 4:
										if ((v_argCount > 0)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("dictionary clear method", 0, v_argCount));
										} else {
											if ((v_dictImpl[4] > 0)) {
												v_dictImpl[0] = {};
												v_dictImpl[1] = {};
												v_dictImpl[2] = {};
												v_dictImpl[3] = {};
												v_dictImpl[4] = 0;
											}
										}
										break;
									case 5:
										if ((v_argCount > 0)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("dictionary clone method", 0, v_argCount));
										} else {
											v_output = [7, v_cloneDictionary(v_dictImpl, null)];
										}
										break;
									case 7:
										if ((v_argCount != 1)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("dictionary contains method", 1, v_argCount));
										} else {
											v_value = v_funcArgs[0];
											v_output = v_VALUE_FALSE;
											if ((v_value[0] == 5)) {
												if ((v_dictImpl[2][v_value[1]] !== undefined)) {
													v_output = v_VALUE_TRUE;
												}
											} else {
												if ((v_value[0] == 3)) {
													if ((v_dictImpl[0][v_value[1]] !== undefined)) {
														v_output = v_VALUE_TRUE;
													}
												}
											}
										}
										break;
									case 11:
										if (((v_argCount != 1) && (v_argCount != 2))) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, "Dictionary get method requires 1 or 2 arguments.");
										} else {
											if ((v_argCount == 2)) {
												v_output = v_funcArgs[1];
											} else {
												v_output = v_VALUE_NULL;
											}
											v_value = v_funcArgs[0];
											switch (v_value[0]) {
												case 3:
													v_int1 = v_value[1];
													if ((v_dictImpl[0][v_int1] !== undefined)) {
														v_output = v_dictImpl[1][v_int1];
													}
													break;
												case 8:
													v_objInstance1 = v_value[1];
													v_int1 = v_objInstance1[1];
													if ((v_dictImpl[0][v_int1] !== undefined)) {
														v_output = v_dictImpl[1][v_int1];
													}
													break;
												case 5:
													v_string1 = v_value[1];
													if ((v_dictImpl[2][v_string1] !== undefined)) {
														v_output = v_dictImpl[3][v_string1];
													}
													break;
												default:
													v_int1 = 0;
													break;
											}
										}
										break;
									case 18:
										if ((v_argCount > 0)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("dictionary keys method", 0, v_argCount));
										} else {
											if ((v_dictImpl[5] == 5)) {
												v_output = [6, C$common$dictionaryValues(v_dictImpl[2])];
											} else {
												v_output = [6, C$common$dictionaryValues(v_dictImpl[0])];
											}
										}
										break;
									case 22:
										if ((v_argCount != 1)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("dictionary merge method", 1, v_argCount));
										} else {
											v_value2 = v_funcArgs[0];
											if ((v_value2[0] != 7)) {
												v_hasInterrupt = v_EX_InvalidArgument(v_ec, "dictionary merge method requires another dictionary as a parameeter.");
											} else {
												v_dictImpl2 = v_value2[1];
												if ((v_dictImpl2[4] > 0)) {
													if ((v_dictImpl[4] == 0)) {
														v_value[1] = v_cloneDictionary(v_dictImpl2, null);
													} else {
														if ((v_dictImpl2[5] != v_dictImpl[5])) {
															v_hasInterrupt = v_EX_InvalidKey(v_ec, "dictionaries with different key types cannot be merged.");
														} else {
															v_cloneDictionary(v_dictImpl2, v_dictImpl);
														}
													}
												}
												v_output = v_VALUE_NULL;
											}
										}
										break;
									case 24:
										if ((v_argCount != 1)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("dictionary remove method", 1, v_argCount));
										} else {
											v_value2 = v_funcArgs[0];
											v_bool2 = true;
											if (((v_dictImpl[4] > 0) && (v_dictImpl[5] == v_value2[0]))) {
												switch (v_value2[0]) {
													case 3:
														v_int1 = v_value2[1];
														if ((v_dictImpl[0][v_int1] !== undefined)) {
															v_bool2 = false;
															delete v_dictImpl[0][v_int1];
															delete v_dictImpl[1][v_int1];
															v_dictImpl[4] -= 1;
														}
														break;
													case 8:
														v_objInstance1 = v_value2[1];
														v_int1 = v_objInstance1[1];
														if ((v_dictImpl[0][v_int1] !== undefined)) {
															v_bool2 = false;
															delete v_dictImpl[0][v_int1];
															delete v_dictImpl[1][v_int1];
															v_dictImpl[4] -= 1;
														}
														break;
													case 5:
														v_string1 = v_value2[1];
														if ((v_dictImpl[2][v_string1] !== undefined)) {
															v_bool2 = false;
															delete v_dictImpl[2][v_string1];
															delete v_dictImpl[3][v_string1];
															v_dictImpl[4] -= 1;
														}
														break;
													default:
														v_int1 = 0;
														break;
												}
											}
											if (v_bool2) {
												v_hasInterrupt = v_EX_KeyNotFound(v_ec, "dictionary does not contain the given key.");
											}
										}
										break;
									case 34:
										if ((v_argCount > 0)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("dictionary values method", 0, v_argCount));
										} else {
											if ((v_dictImpl[5] == 5)) {
												v_output = [6, C$common$dictionaryValues(v_dictImpl[3])];
											} else {
												v_output = [6, C$common$dictionaryValues(v_dictImpl[1])];
											}
										}
										break;
									default:
										v_output = null;
										break;
								}
								break;
							case 9:
								// ...on a function pointer;
								v_functionPointer1 = v_value[1];
								switch (v_functionId) {
									case 1:
										if ((v_argCount > 0)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("argCountMax method", 0, v_argCount));
										} else {
											v_functionId = v_functionPointer1[3];
											v_functionInfo = v_p[21][v_functionId];
											v_output = v_buildInteger(v_functionInfo[4]);
										}
										break;
									case 2:
										if ((v_argCount > 0)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("argCountMin method", 0, v_argCount));
										} else {
											v_functionId = v_functionPointer1[3];
											v_functionInfo = v_p[21][v_functionId];
											v_output = v_buildInteger(v_functionInfo[3]);
										}
										break;
									case 12:
										v_functionInfo = v_p[21][v_functionPointer1[3]];
										v_output = v_buildString(v_functionInfo[9]);
										break;
									case 15:
										if ((v_argCount == 1)) {
											v_funcArgs[1] = v_funcArgs[0];
										} else {
											if ((v_argCount == 0)) {
												v_funcArgs[1] = v_VALUE_NULL;
											} else {
												v_hasInterrupt = v_EX_InvalidArgument(v_ec, "invoke requires a list of arguments.");
											}
										}
										v_funcArgs[0] = v_value;
										v_argCount = 2;
										v_primitiveMethodToCoreLibraryFallback = true;
										v_functionId = v_p[26][3];
										v_output = null;
										break;
									default:
										v_output = null;
										break;
								}
								break;
							case 10:
								// ...on a class definition;
								v_classValue = v_value[1];
								switch (v_functionId) {
									case 12:
										v_classInfo = v_p[20][v_classValue[1]];
										v_output = v_buildString(v_classInfo[13]);
										break;
									case 16:
										if ((v_argCount != 1)) {
											v_hasInterrupt = v_EX_InvalidArgument(v_ec, v_primitiveMethodWrongArgCountError("class isA method", 1, v_argCount));
										} else {
											v_int1 = v_classValue[1];
											v_value = v_funcArgs[0];
											if ((v_value[0] != 10)) {
												v_hasInterrupt = v_EX_InvalidArgument(v_ec, "class isA method requires another class reference.");
											} else {
												v_classValue = v_value[1];
												v_int2 = v_classValue[1];
												v_output = v_VALUE_FALSE;
												if (v_isClassASubclassOf(v_int1, v_int2)) {
													v_output = v_VALUE_TRUE;
												}
											}
										}
										break;
									default:
										v_output = null;
										break;
								}
								break;
						}
						if (!v_hasInterrupt) {
							if ((v_output == null)) {
								if (v_primitiveMethodToCoreLibraryFallback) {
									v_type = 1;
									v_bool1 = true;
								} else {
									v_hasInterrupt = v_EX_InvalidInvocation(v_ec, "primitive method not found.");
								}
							} else {
								if (v_returnValueUsed) {
									if ((v_valueStackSize == v_valueStackCapacity)) {
										v_valueStack = v_valueStackIncreaseCapacity(v_ec);
										v_valueStackCapacity = v_valueStack.length;
									}
									v_valueStack[v_valueStackSize] = v_output;
									v_valueStackSize += 1;
								}
								v_bool1 = false;
							}
						}
					}
					if ((v_bool1 && !v_hasInterrupt)) {
						// push a new frame to the stack;
						v_stack[0] = v_pc;
						v_bool1 = false;
						switch (v_type) {
							case 1:
								// function;
								v_functionInfo = v_functionTable[v_functionId];
								v_pc = v_functionInfo[2];
								v_value = null;
								v_classId = 0;
								break;
							case 2:
								// static method;
								v_functionInfo = v_functionTable[v_functionId];
								v_pc = v_functionInfo[2];
								v_value = null;
								v_classId = 0;
								break;
							case 3:
								// non-static method;
								v_functionInfo = v_functionTable[v_functionId];
								v_pc = v_functionInfo[2];
								v_classId = 0;
								break;
							case 6:
								// constructor;
								v_p[18] += 1;
								v_classInfo = v_classTable[v_classId];
								v_valueArray1 = C$common$createNewArray(v_classInfo[7]);
								v_i = (v_valueArray1.length - 1);
								while ((v_i >= 0)) {
									switch (v_classInfo[9][v_i]) {
										case 0:
											v_valueArray1[v_i] = v_classInfo[10][v_i];
											break;
										case 1:
											v_valueArray1[v_i] = [6, []];
											break;
										case 2:
											v_valueArray1[v_i] = [7, [{}, {}, {}, {}, 0, 3]];
											break;
									}
									v_i -= 1;
								}
								v_objInstance1 = [v_classId, v_p[18], v_valueArray1, null, null];
								v_value = [8, v_objInstance1];
								v_functionId = v_classInfo[6];
								v_functionInfo = v_functionTable[v_functionId];
								v_pc = v_functionInfo[2];
								v_classId = 0;
								if (v_returnValueUsed) {
									v_returnValueUsed = false;
									if ((v_valueStackSize == v_valueStackCapacity)) {
										v_valueStack = v_valueStackIncreaseCapacity(v_ec);
										v_valueStackCapacity = v_valueStack.length;
									}
									v_valueStack[v_valueStackSize] = v_value;
									v_valueStackSize += 1;
								}
								break;
							case 7:
								// base constructor;
								v_value = v_stack[6];
								v_classInfo = v_classTable[v_classId];
								v_functionId = v_classInfo[6];
								v_functionInfo = v_functionTable[v_functionId];
								v_pc = v_functionInfo[2];
								v_classId = 0;
								break;
						}
						if (((v_argCount < v_functionInfo[3]) || (v_argCount > v_functionInfo[4]))) {
							v_pc = v_stack[0];
							v_hasInterrupt = v_EX_InvalidArgument(v_ec, "Incorrect number of args were passed to this function.");
						} else {
							v_int1 = v_functionInfo[7];
							v_int2 = v_stack[3];
							if ((v_localsStackCapacity <= (v_int2 + v_int1))) {
								v_increaseLocalsStackCapacity(v_ec, v_int1);
								v_localsStack = v_ec[5];
								v_localsStackSet = v_ec[6];
								v_localsStackCapacity = v_localsStack.length;
							}
							v_localsStackSetToken += 1;
							if ((v_localsStackSetToken > 2000000000)) {
								v_resetLocalsStackTokens(v_ec, v_stack);
								v_localsStackSetToken = 2;
							}
							v_localsStackOffset = v_int2;
							// invoke the function;
							v_stack = [v_pc, v_localsStackSetToken, v_localsStackOffset, (v_localsStackOffset + v_int1), v_stack, v_returnValueUsed, v_value, v_valueStackSize, 0, (v_stack[9] + 1), 0, null];
							v_i = 0;
							while ((v_i < v_argCount)) {
								v_int1 = (v_localsStackOffset + v_i);
								v_localsStack[v_int1] = v_funcArgs[v_i];
								v_localsStackSet[v_int1] = v_localsStackSetToken;
								v_i += 1;
							}
							if ((v_argCount != v_functionInfo[3])) {
								v_int1 = (v_argCount - v_functionInfo[3]);
								if ((v_int1 > 0)) {
									v_pc += v_functionInfo[8][v_int1];
									v_stack[0] = v_pc;
								}
							}
							if ((v_stack[9] > 1000)) {
								v_hasInterrupt = v_EX_Fatal(v_ec, "Stack overflow.");
							}
						}
					}
				}
				break;
			case 14:
				// CALL_LIB_FUNCTION_DYNAMIC;
				v_int1 = v_row[0];
				v_argCount = v_row[2];
				v_object1 = v_libFunctionPointers[v_pc];
				v_i = (v_argCount - 1);
				while ((v_i >= 0)) {
					v_valueStackSize -= 1;
					v_funcArgs[v_i] = v_valueStack[v_valueStackSize];
					v_i -= 1;
				}
				v_prepareToSuspend(v_ec, v_stack, v_valueStackSize, v_pc);
				v_value = v_object1(v_funcArgs);
				if (v_ec[11]) {
					v_ec[11] = false;
					if ((v_ec[12] == 1)) {
						return v_suspendInterpreter();
					}
				}
				if ((v_row[3] == 1)) {
					if ((v_valueStackSize == v_valueStackCapacity)) {
						v_valueStack = v_valueStackIncreaseCapacity(v_ec);
						v_valueStackCapacity = v_valueStack.length;
					}
					v_valueStack[v_valueStackSize] = v_value;
					v_valueStackSize += 1;
				}
				break;
			case 15:
				// CLASS_DEFINITION;
				v_initializeClass(v_pc, v_p, v_row, v_stringArgs[v_pc]);
				v_classTable = v_p[20];
				break;
			case 16:
				// COMMAND_LINE_ARGS;
				if ((v_valueStackSize == v_valueStackCapacity)) {
					v_valueStack = v_valueStackIncreaseCapacity(v_ec);
					v_valueStackCapacity = v_valueStack.length;
				}
				v_valueStack[v_valueStackSize] = v_buildStringList(C$common$commandLineArgs);
				v_valueStackSize += 1;
				break;
			case 17:
				// CONTINUE;
				if ((v_row[0] == 1)) {
					v_pc += v_row[1];
				} else {
					v_intArray1 = v_esfData[v_pc];
					v_pc = (v_intArray1[1] - 1);
					v_valueStackSize = (v_stack[7] + v_p[31][v_pc]);
					v_stack[10] = 2;
				}
				break;
			case 18:
				// CORE_FUNCTION;
				switch (v_row[0]) {
					case 1:
						// parseInt;
						v_arg1 = v_valueStack[--v_valueStackSize];
						v_output = v_VALUE_NULL;
						if ((v_arg1[0] == 5)) {
							v_string1 = (v_arg1[1]).trim();
							if (C$common$is_valid_integer(v_string1)) {
								v_output = v_buildInteger(parseInt(v_string1));
							}
						} else {
							v_hasInterrupt = v_EX_InvalidArgument(v_ec, "parseInt requires a string argument.");
						}
						break;
					case 2:
						// parseFloat;
						v_arg1 = v_valueStack[--v_valueStackSize];
						v_output = v_VALUE_NULL;
						if ((v_arg1[0] == 5)) {
							v_string1 = (v_arg1[1]).trim();
							C$common$floatParseHelper(v_floatList1, v_string1);
							if ((v_floatList1[0] >= 0)) {
								v_output = v_buildFloat(v_floatList1[1]);
							}
						} else {
							v_hasInterrupt = v_EX_InvalidArgument(v_ec, "parseFloat requires a string argument.");
						}
						break;
					case 3:
						// print;
						v_arg1 = v_valueStack[--v_valueStackSize];
						v_output = v_VALUE_NULL;
						C$common$print(v_valueToString(v_arg1));
						break;
					case 4:
						// typeof;
						v_arg1 = v_valueStack[--v_valueStackSize];
						v_output = v_buildInteger((v_arg1[0] - 1));
						break;
					case 5:
						// typeis;
						v_arg1 = v_valueStack[--v_valueStackSize];
						v_int1 = v_arg1[0];
						v_int2 = v_row[2];
						v_output = v_VALUE_FALSE;
						while ((v_int2 > 0)) {
							if ((v_row[(2 + v_int2)] == v_int1)) {
								v_output = v_VALUE_TRUE;
								v_int2 = 0;
							} else {
								v_int2 -= 1;
							}
						}
						break;
					case 6:
						// execId;
						v_output = v_buildInteger(v_ec[0]);
						break;
					case 7:
						// assert;
						v_valueStackSize -= 3;
						v_arg3 = v_valueStack[(v_valueStackSize + 2)];
						v_arg2 = v_valueStack[(v_valueStackSize + 1)];
						v_arg1 = v_valueStack[v_valueStackSize];
						if ((v_arg1[0] != 2)) {
							v_hasInterrupt = v_EX_InvalidArgument(v_ec, "Assertion expression must be a boolean.");
						} else {
							if (v_arg1[1]) {
								v_output = v_VALUE_NULL;
							} else {
								v_string1 = v_valueToString(v_arg2);
								if (v_arg3[1]) {
									v_string1 = "Assertion failed: " + v_string1;
								}
								v_hasInterrupt = v_EX_AssertionFailed(v_ec, v_string1);
							}
						}
						break;
					case 8:
						// chr;
						v_arg1 = v_valueStack[--v_valueStackSize];
						v_output = null;
						if ((v_arg1[0] == 3)) {
							v_int1 = v_arg1[1];
							if (((v_int1 >= 0) && (v_int1 < 256))) {
								v_output = v_buildCommonString(String.fromCharCode(v_int1));
							}
						}
						if ((v_output == null)) {
							v_hasInterrupt = v_EX_InvalidArgument(v_ec, "chr requires an integer between 0 and 255.");
						}
						break;
					case 9:
						// ord;
						v_arg1 = v_valueStack[--v_valueStackSize];
						v_output = null;
						if ((v_arg1[0] == 5)) {
							v_string1 = v_arg1[1];
							if ((v_string1.length == 1)) {
								v_output = v_buildInteger(v_string1.charCodeAt(0));
							}
						}
						if ((v_output == null)) {
							v_hasInterrupt = v_EX_InvalidArgument(v_ec, "ord requires a 1 character string.");
						}
						break;
					case 10:
						// currentTime;
						v_output = v_buildFloat(C$common$now());
						break;
					case 11:
						// sortList;
						v_valueStackSize -= 2;
						v_arg2 = v_valueStack[(v_valueStackSize + 1)];
						v_arg1 = v_valueStack[v_valueStackSize];
						v_output = v_VALUE_NULL;
						v_list1 = v_arg1[1];
						v_list2 = v_arg2[1];
						v_sortLists(v_list2, v_list1, C$common$intBuffer16);
						if ((C$common$intBuffer16[0] > 0)) {
							v_hasInterrupt = v_EX_InvalidArgument(v_ec, "Invalid sort keys. Keys must be all numbers or all strings, but not mixed.");
						}
						break;
					case 12:
						// abs;
						v_arg1 = v_valueStack[--v_valueStackSize];
						v_output = v_arg1;
						if ((v_arg1[0] == 3)) {
							if ((v_arg1[1] < 0)) {
								v_output = v_buildInteger(-v_arg1[1]);
							}
						} else {
							if ((v_arg1[0] == 4)) {
								if ((v_arg1[1] < 0)) {
									v_output = v_buildFloat(-v_arg1[1]);
								}
							} else {
								v_hasInterrupt = v_EX_InvalidArgument(v_ec, "abs requires a number as input.");
							}
						}
						break;
					case 13:
						// arcCos;
						v_arg1 = v_valueStack[--v_valueStackSize];
						if ((v_arg1[0] == 4)) {
							v_float1 = v_arg1[1];
						} else {
							if ((v_arg1[0] == 3)) {
								v_float1 = (0.0 + v_arg1[1]);
							} else {
								v_hasInterrupt = v_EX_InvalidArgument(v_ec, "arccos requires a number as input.");
							}
						}
						if (!v_hasInterrupt) {
							if (((v_float1 < -1) || (v_float1 > 1))) {
								v_hasInterrupt = v_EX_InvalidArgument(v_ec, "arccos requires a number in the range of -1 to 1.");
							} else {
								v_output = v_buildFloat(Math.acos(v_float1));
							}
						}
						break;
					case 14:
						// arcSin;
						v_arg1 = v_valueStack[--v_valueStackSize];
						if ((v_arg1[0] == 4)) {
							v_float1 = v_arg1[1];
						} else {
							if ((v_arg1[0] == 3)) {
								v_float1 = (0.0 + v_arg1[1]);
							} else {
								v_hasInterrupt = v_EX_InvalidArgument(v_ec, "arcsin requires a number as input.");
							}
						}
						if (!v_hasInterrupt) {
							if (((v_float1 < -1) || (v_float1 > 1))) {
								v_hasInterrupt = v_EX_InvalidArgument(v_ec, "arcsin requires a number in the range of -1 to 1.");
							} else {
								v_output = v_buildFloat(Math.asin(v_float1));
							}
						}
						break;
					case 15:
						// arcTan;
						v_valueStackSize -= 2;
						v_arg2 = v_valueStack[(v_valueStackSize + 1)];
						v_arg1 = v_valueStack[v_valueStackSize];
						v_bool1 = false;
						if ((v_arg1[0] == 4)) {
							v_float1 = v_arg1[1];
						} else {
							if ((v_arg1[0] == 3)) {
								v_float1 = (0.0 + v_arg1[1]);
							} else {
								v_bool1 = true;
							}
						}
						if ((v_arg2[0] == 4)) {
							v_float2 = v_arg2[1];
						} else {
							if ((v_arg2[0] == 3)) {
								v_float2 = (0.0 + v_arg2[1]);
							} else {
								v_bool1 = true;
							}
						}
						if (v_bool1) {
							v_hasInterrupt = v_EX_InvalidArgument(v_ec, "arctan requires numeric arguments.");
						} else {
							v_output = v_buildFloat(Math.atan2(v_float1, v_float2));
						}
						break;
					case 16:
						// cos;
						v_arg1 = v_valueStack[--v_valueStackSize];
						if ((v_arg1[0] == 4)) {
							v_float1 = v_arg1[1];
							v_output = v_buildFloat(Math.cos(v_float1));
						} else {
							if ((v_arg1[0] == 3)) {
								v_int1 = v_arg1[1];
								v_output = v_buildFloat(Math.cos(v_int1));
							} else {
								v_hasInterrupt = v_EX_InvalidArgument(v_ec, "cos requires a number argument.");
							}
						}
						break;
					case 17:
						// ensureRange;
						v_valueStackSize -= 3;
						v_arg3 = v_valueStack[(v_valueStackSize + 2)];
						v_arg2 = v_valueStack[(v_valueStackSize + 1)];
						v_arg1 = v_valueStack[v_valueStackSize];
						v_bool1 = false;
						if ((v_arg2[0] == 4)) {
							v_float2 = v_arg2[1];
						} else {
							if ((v_arg2[0] == 3)) {
								v_float2 = (0.0 + v_arg2[1]);
							} else {
								v_bool1 = true;
							}
						}
						if ((v_arg3[0] == 4)) {
							v_float3 = v_arg3[1];
						} else {
							if ((v_arg3[0] == 3)) {
								v_float3 = (0.0 + v_arg3[1]);
							} else {
								v_bool1 = true;
							}
						}
						if ((!v_bool1 && (v_float3 < v_float2))) {
							v_float1 = v_float3;
							v_float3 = v_float2;
							v_float2 = v_float1;
							v_value = v_arg2;
							v_arg2 = v_arg3;
							v_arg3 = v_value;
						}
						if ((v_arg1[0] == 4)) {
							v_float1 = v_arg1[1];
						} else {
							if ((v_arg1[0] == 3)) {
								v_float1 = (0.0 + v_arg1[1]);
							} else {
								v_bool1 = true;
							}
						}
						if (v_bool1) {
							v_hasInterrupt = v_EX_InvalidArgument(v_ec, "ensureRange requires numeric arguments.");
						} else {
							if ((v_float1 < v_float2)) {
								v_output = v_arg2;
							} else {
								if ((v_float1 > v_float3)) {
									v_output = v_arg3;
								} else {
									v_output = v_arg1;
								}
							}
						}
						break;
					case 18:
						// floor;
						v_arg1 = v_valueStack[--v_valueStackSize];
						if ((v_arg1[0] == 4)) {
							v_float1 = v_arg1[1];
							v_int1 = Math.floor(v_float1);
							if ((v_int1 < 2049)) {
								if ((v_int1 >= 0)) {
									v_output = v_INTEGER_POSITIVE_CACHE[v_int1];
								} else {
									if ((v_int1 > -257)) {
										v_output = v_INTEGER_NEGATIVE_CACHE[-v_int1];
									} else {
										v_output = [3, v_int1];
									}
								}
							} else {
								v_output = [3, v_int1];
							}
						} else {
							if ((v_arg1[0] == 3)) {
								v_output = v_arg1;
							} else {
								v_hasInterrupt = v_EX_InvalidArgument(v_ec, "floor expects a numeric argument.");
							}
						}
						break;
					case 19:
						// max;
						v_valueStackSize -= 2;
						v_arg2 = v_valueStack[(v_valueStackSize + 1)];
						v_arg1 = v_valueStack[v_valueStackSize];
						v_bool1 = false;
						if ((v_arg1[0] == 4)) {
							v_float1 = v_arg1[1];
						} else {
							if ((v_arg1[0] == 3)) {
								v_float1 = (0.0 + v_arg1[1]);
							} else {
								v_bool1 = true;
							}
						}
						if ((v_arg2[0] == 4)) {
							v_float2 = v_arg2[1];
						} else {
							if ((v_arg2[0] == 3)) {
								v_float2 = (0.0 + v_arg2[1]);
							} else {
								v_bool1 = true;
							}
						}
						if (v_bool1) {
							v_hasInterrupt = v_EX_InvalidArgument(v_ec, "max requires numeric arguments.");
						} else {
							if ((v_float1 >= v_float2)) {
								v_output = v_arg1;
							} else {
								v_output = v_arg2;
							}
						}
						break;
					case 20:
						// min;
						v_valueStackSize -= 2;
						v_arg2 = v_valueStack[(v_valueStackSize + 1)];
						v_arg1 = v_valueStack[v_valueStackSize];
						v_bool1 = false;
						if ((v_arg1[0] == 4)) {
							v_float1 = v_arg1[1];
						} else {
							if ((v_arg1[0] == 3)) {
								v_float1 = (0.0 + v_arg1[1]);
							} else {
								v_bool1 = true;
							}
						}
						if ((v_arg2[0] == 4)) {
							v_float2 = v_arg2[1];
						} else {
							if ((v_arg2[0] == 3)) {
								v_float2 = (0.0 + v_arg2[1]);
							} else {
								v_bool1 = true;
							}
						}
						if (v_bool1) {
							v_hasInterrupt = v_EX_InvalidArgument(v_ec, "min requires numeric arguments.");
						} else {
							if ((v_float1 <= v_float2)) {
								v_output = v_arg1;
							} else {
								v_output = v_arg2;
							}
						}
						break;
					case 21:
						// nativeInt;
						v_valueStackSize -= 2;
						v_arg2 = v_valueStack[(v_valueStackSize + 1)];
						v_arg1 = v_valueStack[v_valueStackSize];
						v_output = v_buildInteger((v_arg1[1])[3][v_arg2[1]]);
						break;
					case 22:
						// nativeString;
						v_valueStackSize -= 3;
						v_arg3 = v_valueStack[(v_valueStackSize + 2)];
						v_arg2 = v_valueStack[(v_valueStackSize + 1)];
						v_arg1 = v_valueStack[v_valueStackSize];
						v_string1 = (v_arg1[1])[3][v_arg2[1]];
						if (v_arg3[1]) {
							v_output = v_buildCommonString(v_string1);
						} else {
							v_output = v_buildString(v_string1);
						}
						break;
					case 23:
						// sign;
						v_arg1 = v_valueStack[--v_valueStackSize];
						if ((v_arg1[0] == 3)) {
							v_float1 = (0.0 + (v_arg1[1]));
						} else {
							if ((v_arg1[0] == 4)) {
								v_float1 = v_arg1[1];
							} else {
								v_hasInterrupt = v_EX_InvalidArgument(v_ec, "sign requires a number as input.");
							}
						}
						if ((v_float1 == 0)) {
							v_output = v_VALUE_INT_ZERO;
						} else {
							if ((v_float1 > 0)) {
								v_output = v_VALUE_INT_ONE;
							} else {
								v_output = v_VALUE_INT_NEG_ONE;
							}
						}
						break;
					case 24:
						// sin;
						v_arg1 = v_valueStack[--v_valueStackSize];
						if ((v_arg1[0] == 4)) {
							v_float1 = v_arg1[1];
						} else {
							if ((v_arg1[0] == 3)) {
								v_float1 = (0.0 + v_arg1[1]);
							} else {
								v_hasInterrupt = v_EX_InvalidArgument(v_ec, "sin requires a number argument.");
							}
						}
						v_output = v_buildFloat(Math.sin(v_float1));
						break;
					case 25:
						// tan;
						v_arg1 = v_valueStack[--v_valueStackSize];
						if ((v_arg1[0] == 4)) {
							v_float1 = v_arg1[1];
						} else {
							if ((v_arg1[0] == 3)) {
								v_float1 = (0.0 + v_arg1[1]);
							} else {
								v_hasInterrupt = v_EX_InvalidArgument(v_ec, "tan requires a number argument.");
							}
						}
						if (!v_hasInterrupt) {
							v_float2 = Math.cos(v_float1);
							if ((v_float2 < 0)) {
								v_float2 = -v_float2;
							}
							if ((v_float2 < 0.00000000015)) {
								v_hasInterrupt = v_EX_DivisionByZero(v_ec, "Tangent is undefined.");
							} else {
								v_output = v_buildFloat(Math.tan(v_float1));
							}
						}
						break;
					case 26:
						// log;
						v_valueStackSize -= 2;
						v_arg2 = v_valueStack[(v_valueStackSize + 1)];
						v_arg1 = v_valueStack[v_valueStackSize];
						if ((v_arg1[0] == 4)) {
							v_float1 = v_arg1[1];
						} else {
							if ((v_arg1[0] == 3)) {
								v_float1 = (0.0 + v_arg1[1]);
							} else {
								v_hasInterrupt = v_EX_InvalidArgument(v_ec, "logarithms require a number argument.");
							}
						}
						if (!v_hasInterrupt) {
							if ((v_float1 <= 0)) {
								v_hasInterrupt = v_EX_InvalidArgument(v_ec, "logarithms require positive inputs.");
							} else {
								v_output = v_buildFloat(v_fixFuzzyFloatPrecision((Math.log(v_float1) * v_arg2[1])));
							}
						}
						break;
					case 27:
						// intQueueClear;
						v_arg1 = v_valueStack[--v_valueStackSize];
						v_output = v_VALUE_NULL;
						v_objInstance1 = v_arg1[1];
						if ((v_objInstance1[3] != null)) {
							v_objInstance1[3][1] = 0;
						}
						break;
					case 28:
						// intQueueWrite16;
						v_output = v_VALUE_NULL;
						v_int1 = v_row[2];
						v_valueStackSize -= (v_int1 + 1);
						v_value = v_valueStack[v_valueStackSize];
						v_objArray1 = (v_value[1])[3];
						v_intArray1 = v_objArray1[0];
						v_len = v_objArray1[1];
						if ((v_len >= v_intArray1.length)) {
							v_intArray2 = C$common$createNewArray(((v_len * 2) + 16));
							v_j = 0;
							while ((v_j < v_len)) {
								v_intArray2[v_j] = v_intArray1[v_j];
								v_j += 1;
							}
							v_intArray1 = v_intArray2;
							v_objArray1[0] = v_intArray1;
						}
						v_objArray1[1] = (v_len + 16);
						v_i = (v_int1 - 1);
						while ((v_i >= 0)) {
							v_value = v_valueStack[((v_valueStackSize + 1) + v_i)];
							if ((v_value[0] == 3)) {
								v_intArray1[(v_len + v_i)] = v_value[1];
							} else {
								if ((v_value[0] == 4)) {
									v_float1 = (0.5 + v_value[1]);
									v_intArray1[(v_len + v_i)] = Math.floor(v_float1);
								} else {
									v_hasInterrupt = v_EX_InvalidArgument(v_ec, "Input must be integers.");
									v_i = -1;
								}
							}
							v_i -= 1;
						}
						break;
					case 29:
						// execCounter;
						v_output = v_buildInteger(v_ec[8]);
						break;
					case 30:
						// sleep;
						v_arg1 = v_valueStack[--v_valueStackSize];
						v_float1 = v_getFloat(v_arg1);
						if ((v_row[1] == 1)) {
							if ((v_valueStackSize == v_valueStackCapacity)) {
								v_valueStack = v_valueStackIncreaseCapacity(v_ec);
								v_valueStackCapacity = v_valueStack.length;
							}
							v_valueStack[v_valueStackSize] = v_VALUE_NULL;
							v_valueStackSize += 1;
						}
						v_prepareToSuspend(v_ec, v_stack, v_valueStackSize, v_pc);
						C$common$enqueueVmResume(v_float1, v_ec[0]);
						if ((v_ec[0] > -1)) {
							// If statement to circumvent unreachable code error in translator.;
							return v_suspendInterpreterWithLock();
						}
						break;
					case 31:
						// projectId;
						v_output = v_buildCommonString(v_p[28]);
						break;
					case 32:
						// isJavaScript;
						v_output = v_VALUE_TRUE;
						break;
					case 33:
						// isAndroid;
						v_output = v_VALUE_FALSE;
						break;
					case 34:
						// allocNativeData;
						v_valueStackSize -= 2;
						v_arg2 = v_valueStack[(v_valueStackSize + 1)];
						v_arg1 = v_valueStack[v_valueStackSize];
						v_objInstance1 = v_arg1[1];
						v_int1 = v_arg2[1];
						v_objArray1 = C$common$createNewArray(v_int1);
						v_objInstance1[3] = v_objArray1;
						break;
					case 35:
						// setNativeData;
						v_valueStackSize -= 3;
						v_arg3 = v_valueStack[(v_valueStackSize + 2)];
						v_arg2 = v_valueStack[(v_valueStackSize + 1)];
						v_arg1 = v_valueStack[v_valueStackSize];
						(v_arg1[1])[3][v_arg2[1]] = v_arg3[1];
						break;
					case 36:
						// getExceptionTrace;
						v_arg1 = v_valueStack[--v_valueStackSize];
						v_intList1 = v_getNativeDataItem(v_arg1, 1);
						v_list1 = [];
						v_output = [6, v_list1];
						if ((v_intList1 != null)) {
							v_stringList1 = v_tokenHelperConvertPcsToStackTraceStrings(v_intList1);
							v_i = 0;
							while ((v_i < v_stringList1.length)) {
								v_list1.push(v_buildString(v_stringList1[v_i]));
								v_i += 1;
							}
							v_list1.reverse();
						}
						break;
					case 37:
						// reflectAllClasses;
						v_output = v_Reflect_allClasses();
						break;
					case 38:
						// reflectGetMethods;
						v_arg1 = v_valueStack[--v_valueStackSize];
						v_output = v_Reflect_getMethods(v_ec, v_arg1);
						v_hasInterrupt = (v_ec[13] != null);
						break;
					case 39:
						// reflectGetClass;
						v_arg1 = v_valueStack[--v_valueStackSize];
						if ((v_arg1[0] != 8)) {
							v_hasInterrupt = v_EX_InvalidArgument(v_ec, "Cannot get class from non-instance types.");
						} else {
							v_objInstance1 = v_arg1[1];
							v_output = [10, [false, v_objInstance1[0]]];
						}
						break;
					case 40:
						// convertFloatArgsToInts;
						v_int1 = v_stack[3];
						v_i = v_localsStackOffset;
						while ((v_i < v_int1)) {
							v_value = v_localsStack[v_i];
							if ((v_localsStackSet[v_i] != v_localsStackSetToken)) {
								v_i += v_int1;
							} else {
								if ((v_value[0] == 4)) {
									v_float1 = v_value[1];
									v_int2 = Math.floor(v_float1);
									if (((v_int2 >= 0) && (v_int2 < 2049))) {
										v_localsStack[v_i] = v_INTEGER_POSITIVE_CACHE[v_int2];
									} else {
										v_localsStack[v_i] = v_buildInteger(v_int2);
									}
								}
							}
							v_i += 1;
						}
						break;
					case 41:
						// addShutdownHandler;
						v_arg1 = v_valueStack[--v_valueStackSize];
						v_p[39].push(v_arg1);
						break;
				}
				if ((v_row[1] == 1)) {
					if ((v_valueStackSize == v_valueStackCapacity)) {
						v_valueStack = v_valueStackIncreaseCapacity(v_ec);
						v_valueStackCapacity = v_valueStack.length;
					}
					v_valueStack[v_valueStackSize] = v_output;
					v_valueStackSize += 1;
				}
				break;
			case 20:
				// DEF_DICT;
				v_dictIntKeyLookup = {};
				v_dictIntValueLookup = {};
				v_dictStringKeyLookup = {};
				v_dictStringValueLookup = {};
				v_len = v_row[0];
				v_type = 3;
				v_first = true;
				v_i = v_len;
				while ((v_i > 0)) {
					v_valueStackSize -= 2;
					v_value = v_valueStack[(v_valueStackSize + 1)];
					v_value2 = v_valueStack[v_valueStackSize];
					if (v_first) {
						v_type = v_value2[0];
						v_first = false;
					} else {
						if ((v_type != v_value2[0])) {
							v_hasInterrupt = v_EX_InvalidKey(v_ec, "Cannot have multiple key types in one dictionary.");
						}
					}
					if (!v_hasInterrupt) {
						if ((v_type == 3)) {
							v_intKey = v_value2[1];
						} else {
							if ((v_type == 5)) {
								v_stringKey = v_value2[1];
							} else {
								if ((v_type == 8)) {
									v_objInstance1 = v_value2[1];
									v_intKey = v_objInstance1[1];
								} else {
									v_hasInterrupt = v_EX_InvalidKey(v_ec, "Only integers, strings, and objects can be used as dictionary keys.");
								}
							}
						}
					}
					if (!v_hasInterrupt) {
						if ((v_type == 5)) {
							v_dictStringKeyLookup[v_stringKey] = v_value2;
							v_dictStringValueLookup[v_stringKey] = v_value;
						} else {
							v_dictIntKeyLookup[v_intKey] = v_value2;
							v_dictIntValueLookup[v_intKey] = v_value;
						}
						v_i -= 1;
					}
				}
				if (!v_hasInterrupt) {
					if ((v_type == 5)) {
						if ((Object.keys(v_dictStringKeyLookup).length != v_len)) {
							v_hasInterrupt = v_EX_InvalidKey(v_ec, "Key collision");
						}
					} else {
						if ((Object.keys(v_dictIntKeyLookup).length != v_len)) {
							v_hasInterrupt = v_EX_InvalidKey(v_ec, "Key collision");
						}
					}
				}
				if (!v_hasInterrupt) {
					v_value = [7, [v_dictIntKeyLookup, v_dictIntValueLookup, v_dictStringKeyLookup, v_dictStringValueLookup, v_len, v_type]];
					if ((v_valueStackSize == v_valueStackCapacity)) {
						v_valueStack = v_valueStackIncreaseCapacity(v_ec);
						v_valueStackCapacity = v_valueStack.length;
					}
					v_valueStack[v_valueStackSize] = v_value;
					v_valueStackSize += 1;
				}
				break;
			case 21:
				// DEF_LIST;
				v_int1 = v_row[0];
				v_list1 = [];
				while ((v_int1 > 0)) {
					v_valueStackSize -= 1;
					v_list1.push(v_valueStack[v_valueStackSize]);
					v_int1 -= 1;
				}
				v_list1.reverse();
				v_value = [6, v_list1];
				if ((v_valueStackSize == v_valueStackCapacity)) {
					v_valueStack = v_valueStackIncreaseCapacity(v_ec);
					v_valueStackCapacity = v_valueStack.length;
				}
				v_valueStack[v_valueStackSize] = v_value;
				v_valueStackSize += 1;
				break;
			case 19:
				// DEF_ORIGINAL_CODE;
				v_defOriginalCodeImpl(v_row, v_p[4][v_pc]);
				break;
			case 22:
				// DEREF_DOT;
				v_value = v_valueStack[(v_valueStackSize - 1)];
				v_nameId = v_row[0];
				v_int2 = v_row[1];
				switch (v_value[0]) {
					case 8:
						v_objInstance1 = v_value[1];
						v_classInfo = v_classTable[v_objInstance1[0]];
						v_intIntDict1 = v_classInfo[12];
						if ((v_intIntDict1[v_int2] !== undefined)) {
							v_int1 = v_intIntDict1[v_int2];
							v_functionId = v_classInfo[8][v_int1];
							if ((v_functionId == -1)) {
								v_output = v_objInstance1[2][v_int1];
							} else {
								v_output = [9, [2, v_value, v_objInstance1[0], v_functionId]];
							}
						} else {
							v_output = null;
						}
						break;
					case 5:
						if ((v_p[25] == v_nameId)) {
							v_int2 = (v_value[1]).length;
							v_output = v_buildInteger(v_int2);
						} else {
							v_output = null;
						}
						break;
					case 6:
						if ((v_p[25] == v_nameId)) {
							v_int2 = (v_value[1]).length;
							v_output = v_buildInteger(v_int2);
						} else {
							v_output = null;
						}
						break;
					case 7:
						if ((v_p[25] == v_nameId)) {
							v_dictImpl = v_value[1];
							v_output = v_buildInteger(v_dictImpl[4]);
						} else {
							v_output = null;
						}
						break;
					default:
						if ((v_value[0] == 1)) {
							v_hasInterrupt = v_EX_NullReference(v_ec, "Derferenced a field from null.");
							v_output = v_VALUE_NULL;
						} else {
							v_output = null;
						}
						break;
				}
				if ((v_output == null)) {
					v_output = v_generatePrimitiveMethodReference(v_globalNameIdToPrimitiveMethodName, v_nameId, v_value);
					if ((v_output == null)) {
						if ((v_value[0] == 1)) {
							v_hasInterrupt = v_EX_NullReference(v_ec, "Tried to dereference a field on null.");
						} else {
							if ((v_value[0] == 8)) {
								v_objInstance1 = v_value[1];
								v_classId = v_objInstance1[0];
								v_classInfo = v_classTable[v_classId];
								v_string1 = v_classInfo[13] + " instance";
							} else {
								v_string1 = v_getTypeFromId(v_value[0]);
							}
							v_hasInterrupt = v_EX_UnknownField(v_ec, v_string1 + " does not have that field.");
						}
					}
				}
				v_valueStack[(v_valueStackSize - 1)] = v_output;
				break;
			case 23:
				// DEREF_INSTANCE_FIELD;
				v_value = v_stack[6];
				v_objInstance1 = v_value[1];
				v_value = v_objInstance1[2][v_row[0]];
				if ((v_valueStackSize == v_valueStackCapacity)) {
					v_valueStack = v_valueStackIncreaseCapacity(v_ec);
					v_valueStackCapacity = v_valueStack.length;
				}
				v_valueStack[v_valueStackSize++] = v_value;
				break;
			case 24:
				// DEREF_STATIC_FIELD;
				v_classInfo = v_classTable[v_row[0]];
				v_staticConstructorNotInvoked = true;
				if ((v_classInfo[3] < 2)) {
					v_stack[0] = v_pc;
					v_stackFrame2 = v_maybeInvokeStaticConstructor(v_p, v_ec, v_stack, v_classInfo, v_valueStackSize, C$common$intBuffer16);
					if ((C$common$intBuffer16[0] == 1)) {
						return v_generateException(v_stack, v_pc, v_valueStackSize, v_ec, 0, "Static initialization loop detected. The class this field is a member of is not done being initialized.");
					}
					if ((v_stackFrame2 != null)) {
						v_staticConstructorNotInvoked = false;
						v_stack = v_stackFrame2;
						v_pc = v_stack[0];
						v_localsStackSetToken = v_stack[1];
						v_localsStackOffset = v_stack[2];
					}
				}
				if (v_staticConstructorNotInvoked) {
					if ((v_valueStackSize == v_valueStackCapacity)) {
						v_valueStack = v_valueStackIncreaseCapacity(v_ec);
						v_valueStackCapacity = v_valueStack.length;
					}
					v_valueStack[v_valueStackSize++] = v_classInfo[4][v_row[1]];
				}
				break;
			case 25:
				// DUPLICATE_STACK_TOP;
				if ((v_row[0] == 1)) {
					v_value = v_valueStack[(v_valueStackSize - 1)];
					if ((v_valueStackSize == v_valueStackCapacity)) {
						v_valueStack = v_valueStackIncreaseCapacity(v_ec);
						v_valueStackCapacity = v_valueStack.length;
					}
					v_valueStack[v_valueStackSize++] = v_value;
				} else {
					if ((v_row[0] == 2)) {
						if (((v_valueStackSize + 1) > v_valueStackCapacity)) {
							v_valueStackIncreaseCapacity(v_ec);
							v_valueStack = v_ec[4];
							v_valueStackCapacity = v_valueStack.length;
						}
						v_valueStack[v_valueStackSize] = v_valueStack[(v_valueStackSize - 2)];
						v_valueStack[(v_valueStackSize + 1)] = v_valueStack[(v_valueStackSize - 1)];
						v_valueStackSize += 2;
					} else {
						v_hasInterrupt = v_EX_Fatal(v_ec, "?");
					}
				}
				break;
			case 26:
				// EQUALS;
				v_valueStackSize -= 2;
				v_rightValue = v_valueStack[(v_valueStackSize + 1)];
				v_leftValue = v_valueStack[v_valueStackSize];
				if ((v_leftValue[0] == v_rightValue[0])) {
					switch (v_leftValue[0]) {
						case 1:
							v_bool1 = true;
							break;
						case 2:
							v_bool1 = (v_leftValue[1] == v_rightValue[1]);
							break;
						case 3:
							v_bool1 = (v_leftValue[1] == v_rightValue[1]);
							break;
						case 5:
							v_bool1 = (v_leftValue[1] == v_rightValue[1]);
							break;
						default:
							v_bool1 = (v_doEqualityComparisonAndReturnCode(v_leftValue, v_rightValue) == 1);
							break;
					}
				} else {
					v_int1 = v_doEqualityComparisonAndReturnCode(v_leftValue, v_rightValue);
					if ((v_int1 == 0)) {
						v_bool1 = false;
					} else {
						if ((v_int1 == 1)) {
							v_bool1 = true;
						} else {
							v_hasInterrupt = v_EX_UnsupportedOperation(v_ec, "== and != not defined here.");
						}
					}
				}
				if ((v_valueStackSize == v_valueStackCapacity)) {
					v_valueStack = v_valueStackIncreaseCapacity(v_ec);
					v_valueStackCapacity = v_valueStack.length;
				}
				if ((v_bool1 != ((v_row[0] == 1)))) {
					v_valueStack[v_valueStackSize] = v_VALUE_TRUE;
				} else {
					v_valueStack[v_valueStackSize] = v_VALUE_FALSE;
				}
				v_valueStackSize += 1;
				break;
			case 27:
				// ESF_LOOKUP;
				v_esfData = v_generateEsfData(v_args.length, v_row);
				v_p[29] = v_esfData;
				break;
			case 28:
				// EXCEPTION_HANDLED_TOGGLE;
				v_ec[9] = (v_row[0] == 1);
				break;
			case 29:
				// FINALIZE_INITIALIZATION;
				v_finalizeInitializationImpl(v_p[4][v_pc], v_row[0]);
				v_libFunctionPointers = v_p[38];
				v_identifiers = v_p[5];
				v_literalTable = v_p[8];
				v_integerSwitches = v_p[14];
				v_stringSwitches = v_p[16];
				v_globalNameIdToPrimitiveMethodName = v_p[23];
				v_funcArgs = v_p[24];
				break;
			case 30:
				// FINALLY_END;
				v_value = v_ec[10];
				if (((v_value == null) || v_ec[9])) {
					switch (v_stack[10]) {
						case 0:
							v_ec[10] = null;
							break;
						case 1:
							v_ec[10] = null;
							v_int1 = v_row[0];
							if ((v_int1 == 1)) {
								v_pc += v_row[1];
							} else {
								if ((v_int1 == 2)) {
									v_intArray1 = v_esfData[v_pc];
									v_pc = v_intArray1[1];
								} else {
									v_hasInterrupt = v_EX_Fatal(v_ec, "break exists without a loop");
								}
							}
							break;
						case 2:
							v_ec[10] = null;
							v_int1 = v_row[2];
							if ((v_int1 == 1)) {
								v_pc += v_row[3];
							} else {
								if ((v_int1 == 2)) {
									v_intArray1 = v_esfData[v_pc];
									v_pc = v_intArray1[1];
								} else {
									v_hasInterrupt = v_EX_Fatal(v_ec, "continue exists without a loop");
								}
							}
							break;
						case 3:
							if ((v_stack[8] != 0)) {
								v_markClassAsInitialized(v_stack, v_stack[8]);
							}
							if (v_stack[5]) {
								v_valueStackSize = v_stack[7];
								v_value = v_stack[11];
								v_stack = v_stack[4];
								if ((v_valueStackSize == v_valueStackCapacity)) {
									v_valueStack = v_valueStackIncreaseCapacity(v_ec);
									v_valueStackCapacity = v_valueStack.length;
								}
								v_valueStack[v_valueStackSize] = v_value;
								v_valueStackSize += 1;
							} else {
								v_valueStackSize = v_stack[7];
								v_stack = v_stack[4];
							}
							v_pc = v_stack[0];
							v_localsStackOffset = v_stack[2];
							v_localsStackSetToken = v_stack[1];
							break;
					}
				} else {
					v_ec[9] = false;
					v_stack[0] = v_pc;
					v_intArray1 = v_esfData[v_pc];
					v_value = v_ec[10];
					v_objInstance1 = v_value[1];
					v_objArray1 = v_objInstance1[3];
					v_bool1 = v_objArray1[0];
					v_intList1 = v_objArray1[1];
					while (((v_stack != null) && ((v_intArray1 == null) || v_bool1))) {
						v_stack = v_stack[4];
						if ((v_stack != null)) {
							v_pc = v_stack[0];
							v_intList1.push(v_pc);
							v_intArray1 = v_esfData[v_pc];
						}
					}
					if ((v_stack == null)) {
						return v_uncaughtExceptionResult(v_value);
					}
					v_int1 = v_intArray1[0];
					if ((v_int1 < v_pc)) {
						v_int1 = v_intArray1[1];
					}
					v_pc = (v_int1 - 1);
					v_stack[0] = v_pc;
					v_localsStackOffset = v_stack[2];
					v_localsStackSetToken = v_stack[1];
					v_ec[1] = v_stack;
					v_stack[10] = 0;
					v_ec[2] = v_valueStackSize;
				}
				break;
			case 31:
				// FUNCTION_DEFINITION;
				v_pc += v_initializeFunction(v_p, v_row, v_pc, v_stringArgs[v_pc]);
				v_functionTable = v_p[21];
				break;
			case 32:
				// INDEX;
				v_value = v_valueStack[--v_valueStackSize];
				v_root = v_valueStack[(v_valueStackSize - 1)];
				if ((v_root[0] == 6)) {
					if ((v_value[0] != 3)) {
						v_hasInterrupt = v_EX_InvalidArgument(v_ec, "List index must be an integer.");
					} else {
						v_i = v_value[1];
						v_list1 = v_root[1];
						if ((v_i < 0)) {
							v_i += v_list1.length;
						}
						if (((v_i < 0) || (v_i >= v_list1.length))) {
							v_hasInterrupt = v_EX_IndexOutOfRange(v_ec, "List index is out of bounds");
						} else {
							v_valueStack[(v_valueStackSize - 1)] = v_list1[v_i];
						}
					}
				} else {
					if ((v_root[0] == 7)) {
						v_dictImpl = v_root[1];
						v_keyType = v_value[0];
						if ((v_keyType != v_dictImpl[5])) {
							if ((v_dictImpl[4] == 0)) {
								v_hasInterrupt = v_EX_KeyNotFound(v_ec, "Key not found. Dictionary is empty.");
							} else {
								v_hasInterrupt = v_EX_InvalidKey(v_ec, ["Incorrect key type. This dictionary contains ", v_getTypeFromId(v_dictImpl[5]), " keys. Provided key is a ", v_getTypeFromId(v_keyType), "."].join(''));
							}
						} else {
							if ((v_keyType == 3)) {
								v_intKey = v_value[1];
							} else {
								if ((v_keyType == 5)) {
									v_stringKey = v_value[1];
								} else {
									if ((v_keyType == 8)) {
										v_objInstance1 = v_value[1];
										v_intKey = v_objInstance1[1];
									} else {
										if ((v_dictImpl[4] == 0)) {
											v_hasInterrupt = v_EX_KeyNotFound(v_ec, "Key not found. Dictionary is empty.");
										} else {
											v_hasInterrupt = v_EX_KeyNotFound(v_ec, "Key not found.");
										}
									}
								}
							}
							if (!v_hasInterrupt) {
								if ((v_keyType == 5)) {
									v_dictStringValueLookup = v_dictImpl[3];
									if ((v_dictStringValueLookup[v_stringKey] !== undefined)) {
										v_output = v_dictStringValueLookup[v_stringKey];
									} else {
										v_hasInterrupt = v_EX_KeyNotFound(v_ec, ["Key not found: '", v_stringKey, "'"].join(''));
									}
								} else {
									v_dictIntValueLookup = v_dictImpl[1];
									if ((v_dictIntValueLookup[v_intKey] !== undefined)) {
										v_output = v_dictIntValueLookup[v_intKey];
									} else {
										v_hasInterrupt = v_EX_KeyNotFound(v_ec, "Key not found.");
									}
								}
								if (!v_hasInterrupt) {
									if ((v_output == null)) {
										v_hasInterrupt = v_EX_KeyNotFound(v_ec, "Key not found.");
									} else {
										v_valueStack[(v_valueStackSize - 1)] = v_output;
									}
								}
							}
						}
					} else {
						if ((v_root[0] == 5)) {
							v_string1 = v_root[1];
							if ((v_value[0] != 3)) {
								v_hasInterrupt = v_EX_InvalidArgument(v_ec, "String indices must be integers.");
							} else {
								v_int1 = v_value[1];
								if ((v_int1 < 0)) {
									v_int1 += v_string1.length;
								}
								if (((v_int1 < 0) || (v_int1 >= v_string1.length))) {
									v_hasInterrupt = v_EX_IndexOutOfRange(v_ec, "String index out of range.");
								} else {
									v_valueStack[(v_valueStackSize - 1)] = v_buildCommonString(v_string1.charAt(v_int1));
								}
							}
						} else {
							v_hasInterrupt = v_EX_InvalidArgument(v_ec, "Cannot index into this type: " + v_getTypeFromId(v_root[0]));
						}
					}
				}
				break;
			case 33:
				// IS_COMPARISON;
				v_value = v_valueStack[(v_valueStackSize - 1)];
				v_output = v_VALUE_FALSE;
				if ((v_value[0] == 8)) {
					v_objInstance1 = v_value[1];
					if (v_isClassASubclassOf(v_objInstance1[0], v_row[0])) {
						v_output = v_VALUE_TRUE;
					}
				}
				v_valueStack[(v_valueStackSize - 1)] = v_output;
				break;
			case 34:
				// ITERATION_STEP;
				v_value3 = v_valueStack[(v_valueStackSize - 3)];
				v_value2 = v_valueStack[(v_valueStackSize - 2)];
				v_value = v_valueStack[(v_valueStackSize - 1)];
				v_int1 = v_value3[1];
				v_int2 = v_value2[1];
				if ((v_value[0] == 6)) {
					v_list1 = v_value[1];
					v_len = v_list1.length;
					v_bool1 = true;
				} else {
					v_string2 = v_value[1];
					v_len = v_string2.length;
					v_bool1 = false;
				}
				if ((v_int1 < v_len)) {
					if (v_bool1) {
						v_value = v_list1[v_int1];
					} else {
						v_value = v_buildCommonString(v_string2.charAt(v_int1));
					}
					v_int3 = (v_localsStackOffset + v_int2);
					v_localsStackSet[v_int3] = v_localsStackSetToken;
					v_localsStack[v_int3] = v_value;
				} else {
					v_pc += v_row[0];
				}
				v_int1 += 1;
				if ((v_int1 < 2049)) {
					v_value = v_INTEGER_POSITIVE_CACHE[v_int1];
				} else {
					v_value = [3, v_int1];
				}
				v_valueStack[(v_valueStackSize - 3)] = v_value;
				break;
			case 35:
				// JUMP;
				v_pc += v_row[0];
				break;
			case 36:
				// JUMP_IF_EXCEPTION_OF_TYPE;
				v_value = v_ec[10];
				v_objInstance1 = v_value[1];
				v_int1 = v_objInstance1[0];
				v_i = (v_row.length - 1);
				while ((v_i >= 2)) {
					if (v_isClassASubclassOf(v_int1, v_row[v_i])) {
						v_i = 0;
						v_pc += v_row[0];
						v_int2 = v_row[1];
						if ((v_int2 > -1)) {
							v_int1 = (v_localsStackOffset + v_int2);
							v_localsStack[v_int1] = v_value;
							v_localsStackSet[v_int1] = v_localsStackSetToken;
						}
					}
					v_i -= 1;
				}
				break;
			case 37:
				// JUMP_IF_FALSE;
				v_value = v_valueStack[--v_valueStackSize];
				if ((v_value[0] != 2)) {
					v_hasInterrupt = v_EX_InvalidArgument(v_ec, "Boolean expected.");
				} else {
					if (!v_value[1]) {
						v_pc += v_row[0];
					}
				}
				break;
			case 38:
				// JUMP_IF_FALSE_NON_POP;
				v_value = v_valueStack[(v_valueStackSize - 1)];
				if ((v_value[0] != 2)) {
					v_hasInterrupt = v_EX_InvalidArgument(v_ec, "Boolean expected.");
				} else {
					if (v_value[1]) {
						v_valueStackSize -= 1;
					} else {
						v_pc += v_row[0];
					}
				}
				break;
			case 39:
				// JUMP_IF_TRUE;
				v_value = v_valueStack[--v_valueStackSize];
				if ((v_value[0] != 2)) {
					v_hasInterrupt = v_EX_InvalidArgument(v_ec, "Boolean expected.");
				} else {
					if (v_value[1]) {
						v_pc += v_row[0];
					}
				}
				break;
			case 40:
				// JUMP_IF_TRUE_NO_POP;
				v_value = v_valueStack[(v_valueStackSize - 1)];
				if ((v_value[0] != 2)) {
					v_hasInterrupt = v_EX_InvalidArgument(v_ec, "Boolean expected.");
				} else {
					if (v_value[1]) {
						v_pc += v_row[0];
					} else {
						v_valueStackSize -= 1;
					}
				}
				break;
			case 41:
				// LIB_DECLARATION;
				v_declareLibrary(v_row[0], v_stringArgs[v_pc]);
				break;
			case 42:
				// LIST_SLICE;
				v_ec[2] = v_valueStackSize;
				v_value = v_performListSlice(v_ec, v_row);
				v_valueStackSize = v_ec[2];
				v_valueStack[(v_valueStackSize - 1)] = v_value;
				v_hasInterrupt = (v_ec[13] != null);
				v_valueStack[(v_valueStackSize - 1)] = v_value;
				break;
			case 43:
				// LITERAL;
				if ((v_valueStackSize == v_valueStackCapacity)) {
					v_valueStack = v_valueStackIncreaseCapacity(v_ec);
					v_valueStackCapacity = v_valueStack.length;
				}
				v_valueStack[v_valueStackSize++] = v_literalTable[v_row[0]];
				break;
			case 44:
				// LITERAL_STREAM;
				v_int1 = v_row.length;
				if (((v_valueStackSize + v_int1) > v_valueStackCapacity)) {
					while (((v_valueStackSize + v_int1) > v_valueStackCapacity)) {
						v_valueStackIncreaseCapacity(v_ec);
						v_valueStack = v_ec[4];
						v_valueStackCapacity = v_valueStack.length;
					}
				}
				v_i = v_int1;
				while ((--v_i >= 0)) {
					v_valueStack[v_valueStackSize++] = v_literalTable[v_row[v_i]];
				}
				break;
			case 45:
				// LOCAL;
				v_int1 = (v_localsStackOffset + v_row[0]);
				if ((v_localsStackSet[v_int1] == v_localsStackSetToken)) {
					if ((v_valueStackSize == v_valueStackCapacity)) {
						v_valueStack = v_valueStackIncreaseCapacity(v_ec);
						v_valueStackCapacity = v_valueStack.length;
					}
					v_valueStack[v_valueStackSize++] = v_localsStack[v_int1];
				} else {
					v_hasInterrupt = v_EX_UnassignedVariable(v_ec, "Variable used before it was set.");
				}
				break;
			case 46:
				// LOC_TABLE;
				v_initLocTable(v_row);
				break;
			case 47:
				// NEGATIVE_SIGN;
				v_value = v_valueStack[(v_valueStackSize - 1)];
				v_type = v_value[0];
				if ((v_type == 3)) {
					v_valueStack[(v_valueStackSize - 1)] = v_buildInteger(-v_value[1]);
				} else {
					if ((v_type == 4)) {
						v_valueStack[(v_valueStackSize - 1)] = v_buildFloat(-v_value[1]);
					} else {
						v_hasInterrupt = v_EX_InvalidArgument(v_ec, ["Negative sign can only be applied to numbers. Found ", v_getTypeFromId(v_type), " instead."].join(''));
					}
				}
				break;
			case 48:
				// POP;
				v_valueStackSize -= 1;
				break;
			case 49:
				// POP_IF_NULL_OR_JUMP;
				v_value = v_valueStack[(v_valueStackSize - 1)];
				if ((v_value[0] == 1)) {
					v_valueStackSize -= 1;
				} else {
					v_pc += v_row[0];
				}
				break;
			case 50:
				// PUSH_FUNC_REF;
				v_value = null;
				switch (v_row[1]) {
					case 0:
						v_value = [9, [1, null, 0, v_row[0]]];
						break;
					case 1:
						v_value = [9, [2, v_stack[6], v_row[2], v_row[0]]];
						break;
					case 2:
						v_classId = v_row[2];
						v_classInfo = v_classTable[v_classId];
						v_staticConstructorNotInvoked = true;
						if ((v_classInfo[3] < 2)) {
							v_stack[0] = v_pc;
							v_stackFrame2 = v_maybeInvokeStaticConstructor(v_p, v_ec, v_stack, v_classInfo, v_valueStackSize, C$common$intBuffer16);
							if ((C$common$intBuffer16[0] == 1)) {
								return v_generateException(v_stack, v_pc, v_valueStackSize, v_ec, 0, "Static initialization loop detected. The class this field is a member of is not done being initialized.");
							}
							if ((v_stackFrame2 != null)) {
								v_staticConstructorNotInvoked = false;
								v_stack = v_stackFrame2;
								v_pc = v_stack[0];
								v_localsStackSetToken = v_stack[1];
								v_localsStackOffset = v_stack[2];
							}
						}
						if (v_staticConstructorNotInvoked) {
							v_value = [9, [3, null, v_classId, v_row[0]]];
						} else {
							v_value = null;
						}
						break;
				}
				if ((v_value != null)) {
					if ((v_valueStackSize == v_valueStackCapacity)) {
						v_valueStack = v_valueStackIncreaseCapacity(v_ec);
						v_valueStackCapacity = v_valueStack.length;
					}
					v_valueStack[v_valueStackSize] = v_value;
					v_valueStackSize += 1;
				}
				break;
			case 51:
				// RETURN;
				if ((v_esfData[v_pc] != null)) {
					v_intArray1 = v_esfData[v_pc];
					v_pc = (v_intArray1[1] - 1);
					if ((v_row[0] == 0)) {
						v_stack[11] = v_VALUE_NULL;
					} else {
						v_stack[11] = v_valueStack[(v_valueStackSize - 1)];
					}
					v_valueStackSize = (v_stack[7] + v_p[31][v_pc]);
					v_stack[10] = 3;
				} else {
					if ((v_stack[4] == null)) {
						return v_interpreterFinished(v_ec);
					}
					if ((v_stack[8] != 0)) {
						v_markClassAsInitialized(v_stack, v_stack[8]);
					}
					if (v_stack[5]) {
						if ((v_row[0] == 0)) {
							v_valueStackSize = v_stack[7];
							v_stack = v_stack[4];
							if ((v_valueStackSize == v_valueStackCapacity)) {
								v_valueStack = v_valueStackIncreaseCapacity(v_ec);
								v_valueStackCapacity = v_valueStack.length;
							}
							v_valueStack[v_valueStackSize] = v_VALUE_NULL;
						} else {
							v_value = v_valueStack[(v_valueStackSize - 1)];
							v_valueStackSize = v_stack[7];
							v_stack = v_stack[4];
							v_valueStack[v_valueStackSize] = v_value;
						}
						v_valueStackSize += 1;
					} else {
						v_valueStackSize = v_stack[7];
						v_stack = v_stack[4];
					}
					v_pc = v_stack[0];
					v_localsStackOffset = v_stack[2];
					v_localsStackSetToken = v_stack[1];
				}
				break;
			case 52:
				// STACK_INSERTION_FOR_INCREMENT;
				if ((v_valueStackSize == v_valueStackCapacity)) {
					v_valueStack = v_valueStackIncreaseCapacity(v_ec);
					v_valueStackCapacity = v_valueStack.length;
				}
				v_valueStack[v_valueStackSize] = v_valueStack[(v_valueStackSize - 1)];
				v_valueStack[(v_valueStackSize - 1)] = v_valueStack[(v_valueStackSize - 2)];
				v_valueStack[(v_valueStackSize - 2)] = v_valueStack[(v_valueStackSize - 3)];
				v_valueStack[(v_valueStackSize - 3)] = v_valueStack[v_valueStackSize];
				v_valueStackSize += 1;
				break;
			case 53:
				// STACK_SWAP_POP;
				v_valueStackSize -= 1;
				v_valueStack[(v_valueStackSize - 1)] = v_valueStack[v_valueStackSize];
				break;
			case 54:
				// SWITCH_INT;
				v_value = v_valueStack[--v_valueStackSize];
				if ((v_value[0] == 3)) {
					v_int1 = v_value[1];
					v_integerSwitch = v_integerSwitches[v_row[0]];
					if ((v_integerSwitch[v_int1] !== undefined)) {
						v_pc += v_integerSwitch[v_int1];
					} else {
						v_pc += v_row[1];
					}
				} else {
					v_hasInterrupt = v_EX_InvalidArgument(v_ec, "Switch statement expects an integer.");
				}
				break;
			case 55:
				// SWITCH_STRING;
				v_value = v_valueStack[--v_valueStackSize];
				if ((v_value[0] == 5)) {
					v_string1 = v_value[1];
					v_stringSwitch = v_stringSwitches[v_row[0]];
					if ((v_stringSwitch[v_string1] !== undefined)) {
						v_pc += v_stringSwitch[v_string1];
					} else {
						v_pc += v_row[1];
					}
				} else {
					v_hasInterrupt = v_EX_InvalidArgument(v_ec, "Switch statement expects a string.");
				}
				break;
			case 56:
				// THIS;
				if ((v_valueStackSize == v_valueStackCapacity)) {
					v_valueStack = v_valueStackIncreaseCapacity(v_ec);
					v_valueStackCapacity = v_valueStack.length;
				}
				v_valueStack[v_valueStackSize] = v_stack[6];
				v_valueStackSize += 1;
				break;
			case 57:
				// THROW;
				v_valueStackSize -= 1;
				v_value = v_valueStack[v_valueStackSize];
				v_bool2 = (v_value[0] == 8);
				if (v_bool2) {
					v_objInstance1 = v_value[1];
					if (!v_isClassASubclassOf(v_objInstance1[0], v_magicNumbers[0])) {
						v_bool2 = false;
					}
				}
				if (v_bool2) {
					v_objArray1 = v_objInstance1[3];
					v_intList1 = [];
					v_objArray1[1] = v_intList1;
					if (!v_isPcFromCore(v_pc)) {
						v_intList1.push(v_pc);
					}
					v_ec[10] = v_value;
					v_ec[9] = false;
					v_stack[0] = v_pc;
					v_intArray1 = v_esfData[v_pc];
					v_value = v_ec[10];
					v_objInstance1 = v_value[1];
					v_objArray1 = v_objInstance1[3];
					v_bool1 = v_objArray1[0];
					v_intList1 = v_objArray1[1];
					while (((v_stack != null) && ((v_intArray1 == null) || v_bool1))) {
						v_stack = v_stack[4];
						if ((v_stack != null)) {
							v_pc = v_stack[0];
							v_intList1.push(v_pc);
							v_intArray1 = v_esfData[v_pc];
						}
					}
					if ((v_stack == null)) {
						return v_uncaughtExceptionResult(v_value);
					}
					v_int1 = v_intArray1[0];
					if ((v_int1 < v_pc)) {
						v_int1 = v_intArray1[1];
					}
					v_pc = (v_int1 - 1);
					v_stack[0] = v_pc;
					v_localsStackOffset = v_stack[2];
					v_localsStackSetToken = v_stack[1];
					v_ec[1] = v_stack;
					v_stack[10] = 0;
					v_ec[2] = v_valueStackSize;
				} else {
					v_hasInterrupt = v_EX_InvalidArgument(v_ec, "Thrown value is not an exception.");
				}
				break;
			case 58:
				// TOKEN_DATA;
				v_tokenDataImpl(v_row);
				break;
			case 59:
				// USER_CODE_START;
				v_p[11] = v_row[0];
				break;
			case 60:
				// VALUE_STACK_DEPTH;
				v_valueStackDepthImpl(v_row);
				break;
			case 61:
				// VERIFY_TYPE_IS_ITERABLE;
				v_int1 = v_valueStack[(v_valueStackSize - 1)][0];
				if (((v_int1 != 6) && (v_int1 != 5))) {
					v_hasInterrupt = v_EX_InvalidArgument(v_ec, ["Expected an iterable type, such as a list or string. Found ", v_getTypeFromId(v_int1), " instead."].join(''));
				}
				break;
			default:
				// THIS SHOULD NEVER HAPPEN;
				return v_generateException(v_stack, v_pc, v_valueStackSize, v_ec, 0, "Bad op code: " + ('' + v_ops[v_pc]));
		}
		if (v_hasInterrupt) {
			var v_interrupt = v_ec[13];
			v_ec[13] = null;
			if ((v_interrupt[0] == 1)) {
				return v_generateException(v_stack, v_pc, v_valueStackSize, v_ec, v_interrupt[1], v_interrupt[2]);
			}
		}
		++v_pc;
	}
};

var v_isClassASubclassOf = function(v_subClassId, v_parentClassId) {
	if ((v_subClassId == v_parentClassId)) {
		return true;
	}
	var v_p = C$common$programData;
	var v_classTable = v_p[20];
	var v_classIdWalker = v_subClassId;
	while ((v_classIdWalker != -1)) {
		if ((v_classIdWalker == v_parentClassId)) {
			return true;
		}
		var v_classInfo = v_classTable[v_classIdWalker];
		v_classIdWalker = v_classInfo[2];
	}
	return false;
};

var v_isPcFromCore = function(v_pc) {
	var v_p = C$common$programData;
	var v_tokens = v_p[10][v_pc];
	if ((v_tokens == null)) {
		return false;
	}
	var v_token = v_tokens[0];
	var v_filename = v_tokenHelperGetFileLine(v_token[2], 0);
	return "[Core]" == v_filename;
};

var v_loadByteCode = function() {
	var v_raw = C$bytecode;
	var v_index = C$common$createNewArray(1);
	v_index[0] = 0;
	var v_length = v_raw.length;
	var v_header = v_read_till(v_index, v_raw, v_length, "@");
	if ((v_header != "CRAYON")) {
	}
	var v_alphaNums = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	var v_opCount = v_read_integer(v_index, v_raw, v_length, v_alphaNums);
	var v_ops = C$common$createNewArray(v_opCount);
	var v_iargs = C$common$createNewArray(v_opCount);
	var v_sargs = C$common$createNewArray(v_opCount);
	var v_c = " ";
	var v_argc = 0;
	var v_j = 0;
	var v_stringarg = null;
	var v_stringPresent = false;
	var v_iarg = 0;
	var v_iarglist = null;
	var v_i = 0;
	while ((v_i < v_opCount)) {
		v_c = v_raw.charAt(v_index[0]);
		v_index[0] = (v_index[0] + 1);
		v_argc = 0;
		v_stringPresent = true;
		if ((v_c == "!")) {
			v_argc = 1;
		} else {
			if ((v_c == "&")) {
				v_argc = 2;
			} else {
				if ((v_c == "*")) {
					v_argc = 3;
				} else {
					if ((v_c != "~")) {
						v_stringPresent = false;
						v_index[0] = (v_index[0] - 1);
					}
					v_argc = v_read_integer(v_index, v_raw, v_length, v_alphaNums);
				}
			}
		}
		v_iarglist = C$common$createNewArray((v_argc - 1));
		v_j = 0;
		while ((v_j < v_argc)) {
			v_iarg = v_read_integer(v_index, v_raw, v_length, v_alphaNums);
			if ((v_j == 0)) {
				v_ops[v_i] = v_iarg;
			} else {
				v_iarglist[(v_j - 1)] = v_iarg;
			}
			v_j += 1;
		}
		v_iargs[v_i] = v_iarglist;
		if (v_stringPresent) {
			v_stringarg = v_read_string(v_index, v_raw, v_length, v_alphaNums);
		} else {
			v_stringarg = null;
		}
		v_sargs[v_i] = v_stringarg;
		v_i += 1;
	}
	return [v_ops, v_iargs, v_sargs];
};

var v_main = function() {
	v_initialize_constant_values();
	var v_resources = v_resource_manager_initialize();
	var v_byteCode = v_loadByteCode();
	var v_ops = v_byteCode[0];
	var v_opsLength = v_ops.length;
	var v_opArgs = v_byteCode[1];
	var v_stringArgs = v_byteCode[2];
	var v_i = 0;
	var v_localsStack = C$common$createNewArray(10);
	var v_localsStackSet = C$common$createNewArray(10);
	v_i = (v_localsStack.length - 1);
	while ((v_i >= 0)) {
		v_localsStack[v_i] = null;
		v_localsStackSet[v_i] = 0;
		v_i -= 1;
	}
	var v_stack = [0, 1, 0, 0, null, false, null, 0, 0, 1, 0, null];
	var v_executionContext = [0, v_stack, 0, 100, C$common$createNewArray(100), v_localsStack, v_localsStackSet, 1, 0, false, null, false, 0, null];
	var v_executionContexts = {};
	v_executionContexts[0] = v_executionContext;
	C$common$programData = [v_executionContexts, v_executionContext[0], v_ops, v_opArgs, v_stringArgs, null, [], {}, null, [], C$common$createNewArray(v_ops.length), 0, null, [], null, [], null, [], 0, false, C$common$createNewArray(100), C$common$createNewArray(100), [], null, null, -1, C$common$createNewArray(10), v_resources, null, null, [0, 0, 0], null, {}, [], [], [], {}, -1, null, [], {}];
	v_runInterpreter(v_executionContext[0]);
	return 0;
};

var v_markClassAsInitialized = function(v_stack, v_classId) {
	var v_p = C$common$programData;
	var v_classInfo = v_p[20][v_stack[8]];
	v_classInfo[3] = 2;
	v_p[22].pop();
	return 0;
};

var v_maybeInvokeStaticConstructor = function(v_p, v_ec, v_stack, v_classInfo, v_valueStackSize, v_intOutParam) {
	C$common$intBuffer16[0] = 0;
	var v_classId = v_classInfo[0];
	if ((v_classInfo[3] == 1)) {
		var v_classIdsBeingInitialized = v_p[22];
		if ((v_classIdsBeingInitialized[(v_classIdsBeingInitialized.length - 1)] != v_classId)) {
			C$common$intBuffer16[0] = 1;
		}
		return null;
	}
	v_classInfo[3] = 1;
	v_p[22].push(v_classId);
	var v_functionInfo = v_p[21][v_classInfo[5]];
	v_stack[0] -= 1;
	var v_newFrameLocalsSize = v_functionInfo[7];
	var v_currentFrameLocalsEnd = v_stack[3];
	if ((v_ec[5].length <= (v_currentFrameLocalsEnd + v_newFrameLocalsSize))) {
		v_increaseLocalsStackCapacity(v_ec, v_newFrameLocalsSize);
	}
	if ((v_ec[7] > 2000000000)) {
		v_resetLocalsStackTokens(v_ec, v_stack);
	}
	v_ec[7] += 1;
	return [v_functionInfo[2], v_ec[7], v_currentFrameLocalsEnd, (v_currentFrameLocalsEnd + v_newFrameLocalsSize), v_stack, false, null, v_valueStackSize, v_classId, (v_stack[9] + 1), 0, null];
};

var v_multiplyString = function(v_strValue, v_str, v_n) {
	if ((v_n <= 2)) {
		if ((v_n == 1)) {
			return v_strValue;
		}
		if ((v_n == 2)) {
			return v_buildString(v_str + v_str);
		}
		return v_VALUE_EMPTY_STRING;
	}
	var v_builder = [];
	while ((v_n > 0)) {
		v_n -= 1;
		v_builder.push(v_str);
	}
	v_str = v_builder.join("");
	return v_buildString(v_str);
};

var v_nextPowerOf2 = function(v_value) {
	if ((((v_value - 1) & v_value) == 0)) {
		return v_value;
	}
	var v_output = 1;
	while ((v_output < v_value)) {
		v_output *= 2;
	}
	return v_output;
};

var v_noop = function() {
	return 0;
};

var v_performListSlice = function(v_ec, v_row) {
	var v_arg1 = null;
	var v_arg2 = null;
	var v_arg3 = null;
	var v_value = null;
	var v_int1 = 0;
	var v_int2 = 0;
	var v_int3 = 0;
	var v_int4 = 0;
	var v_int5 = 0;
	var v_i = 0;
	var v_bool1 = false;
	var v_bool2 = false;
	var v_string1 = "";
	var v_list1 = null;
	var v_list2 = null;
	var v_stringList1 = null;
	var v_valueStack = v_ec[4];
	var v_valueStackSize = v_ec[2];
	v_int5 = 0;
	if ((v_row[2] == 1)) {
		v_valueStackSize -= 1;
		v_arg3 = v_valueStack[v_valueStackSize];
		if ((v_arg3[0] == 3)) {
			v_int3 = v_arg3[1];
			if ((v_int3 == 0)) {
				v_int5 = 2;
			}
		} else {
			v_int5 = 3;
			v_int3 = 1;
		}
	} else {
		v_int3 = 1;
	}
	v_bool1 = (v_int3 > 0);
	if ((v_row[1] == 1)) {
		v_valueStackSize -= 1;
		v_arg2 = v_valueStack[v_valueStackSize];
		if ((v_arg2[0] == 3)) {
			v_int2 = v_arg2[1];
		} else {
			v_int5 = 3;
		}
	} else {
		v_arg2 = null;
	}
	if ((v_row[0] == 1)) {
		v_valueStackSize -= 1;
		v_arg1 = v_valueStack[v_valueStackSize];
		if ((v_arg1[0] == 3)) {
			v_int1 = v_arg1[1];
		} else {
			v_int5 = 3;
		}
	} else {
		v_arg1 = null;
	}
	v_value = v_valueStack[(v_valueStackSize - 1)];
	if ((v_value[0] == 5)) {
		v_bool2 = true;
		v_string1 = v_value[1];
		v_int4 = v_string1.length;
	} else {
		if ((v_value[0] == 6)) {
			v_bool2 = false;
			v_list1 = v_value[1];
			v_int4 = v_list1.length;
		} else {
			v_EX_InvalidArgument(v_ec, ["Cannot apply slicing to ", v_getTypeFromId(v_value[0]), ". Must be string or list."].join(''));
			return v_VALUE_NULL;
		}
	}
	if ((v_int5 >= 2)) {
		if (v_bool2) {
			v_string1 = "String";
		} else {
			v_string1 = "List";
		}
		if ((v_int5 == 3)) {
			v_string1 += "slice indexes must be integers. Found ";
			if (((v_arg1 != null) && (v_arg1[0] != 3))) {
				v_EX_InvalidArgument(v_ec, [v_string1, v_getTypeFromId(v_arg1[0]), " for begin index."].join(''));
				return v_VALUE_NULL;
			}
			if (((v_arg2 != null) && (v_arg2[0] != 3))) {
				v_EX_InvalidArgument(v_ec, [v_string1, v_getTypeFromId(v_arg2[0]), " for end index."].join(''));
				return v_VALUE_NULL;
			}
			if (((v_arg3 != null) && (v_arg3[0] != 3))) {
				v_EX_InvalidArgument(v_ec, [v_string1, v_getTypeFromId(v_arg3[0]), " for step amount."].join(''));
				return v_VALUE_NULL;
			}
			v_EX_InvalidArgument(v_ec, "Invalid slice arguments.");
			return v_VALUE_NULL;
		} else {
			v_EX_InvalidArgument(v_ec, v_string1 + " slice step cannot be 0.");
			return v_VALUE_NULL;
		}
	}
	v_int5 = v_canonicalizeListSliceArgs(C$common$intBuffer16, v_arg1, v_arg2, v_int1, v_int2, v_int3, v_int4, v_bool1);
	if ((v_int5 == 1)) {
		v_int1 = C$common$intBuffer16[0];
		v_int2 = C$common$intBuffer16[1];
		if (v_bool2) {
			v_stringList1 = [];
			if (v_bool1) {
				while ((v_int1 < v_int2)) {
					v_stringList1.push(v_string1.charAt(v_int1));
					v_int1 += v_int3;
				}
			} else {
				while ((v_int1 > v_int2)) {
					v_stringList1.push(v_string1.charAt(v_int1));
					v_int1 += v_int3;
				}
			}
			v_value = v_buildString(v_stringList1.join(""));
		} else {
			v_list2 = [];
			if (v_bool1) {
				while ((v_int1 < v_int2)) {
					v_list2.push(v_list1[v_int1]);
					v_int1 += v_int3;
				}
			} else {
				while ((v_int1 > v_int2)) {
					v_list2.push(v_list1[v_int1]);
					v_int1 += v_int3;
				}
			}
			v_value = [6, v_list2];
		}
	} else {
		if ((v_int5 == 0)) {
			if (v_bool2) {
				v_value = v_VALUE_EMPTY_STRING;
			} else {
				v_value = [6, []];
			}
		} else {
			if ((v_int5 == 2)) {
				if (!v_bool2) {
					v_list2 = [];
					v_i = 0;
					while ((v_i < v_int4)) {
						v_list2.push(v_list1[v_i]);
						v_i += 1;
					}
					v_value = [6, v_list2];
				}
			} else {
				if (v_bool2) {
					v_string1 = "String";
				} else {
					v_string1 = "List";
				}
				if ((v_int5 == 3)) {
					v_string1 += " slice begin index is out of range.";
				} else {
					if (v_bool1) {
						v_string1 += " slice begin index must occur before the end index when step is positive.";
					} else {
						v_string1 += " slice begin index must occur after the end index when the step is negative.";
					}
				}
				v_EX_IndexOutOfRange(v_ec, v_string1);
				return v_VALUE_NULL;
			}
		}
	}
	v_ec[2] = v_valueStackSize;
	return v_value;
};

var v_prepareToSuspend = function(v_ec, v_stack, v_valueStackSize, v_currentPc) {
	v_ec[1] = v_stack;
	v_ec[2] = v_valueStackSize;
	v_stack[0] = (v_currentPc + 1);
	return 0;
};

var v_primitiveMethodsInitializeLookup = function(v_nameLookups) {
	var v_length = Object.keys(v_nameLookups).length;
	var v_lookup = C$common$createNewArray(v_length);
	var v_i = 0;
	while ((v_i < v_length)) {
		v_lookup[v_i] = -1;
		v_i += 1;
	}
	if ((v_nameLookups["add"] !== undefined)) {
		v_lookup[v_nameLookups["add"]] = 0;
	}
	if ((v_nameLookups["argCountMax"] !== undefined)) {
		v_lookup[v_nameLookups["argCountMax"]] = 1;
	}
	if ((v_nameLookups["argCountMin"] !== undefined)) {
		v_lookup[v_nameLookups["argCountMin"]] = 2;
	}
	if ((v_nameLookups["choice"] !== undefined)) {
		v_lookup[v_nameLookups["choice"]] = 3;
	}
	if ((v_nameLookups["clear"] !== undefined)) {
		v_lookup[v_nameLookups["clear"]] = 4;
	}
	if ((v_nameLookups["clone"] !== undefined)) {
		v_lookup[v_nameLookups["clone"]] = 5;
	}
	if ((v_nameLookups["concat"] !== undefined)) {
		v_lookup[v_nameLookups["concat"]] = 6;
	}
	if ((v_nameLookups["contains"] !== undefined)) {
		v_lookup[v_nameLookups["contains"]] = 7;
	}
	if ((v_nameLookups["createInstance"] !== undefined)) {
		v_lookup[v_nameLookups["createInstance"]] = 8;
	}
	if ((v_nameLookups["endsWith"] !== undefined)) {
		v_lookup[v_nameLookups["endsWith"]] = 9;
	}
	if ((v_nameLookups["filter"] !== undefined)) {
		v_lookup[v_nameLookups["filter"]] = 10;
	}
	if ((v_nameLookups["get"] !== undefined)) {
		v_lookup[v_nameLookups["get"]] = 11;
	}
	if ((v_nameLookups["getName"] !== undefined)) {
		v_lookup[v_nameLookups["getName"]] = 12;
	}
	if ((v_nameLookups["indexOf"] !== undefined)) {
		v_lookup[v_nameLookups["indexOf"]] = 13;
	}
	if ((v_nameLookups["insert"] !== undefined)) {
		v_lookup[v_nameLookups["insert"]] = 14;
	}
	if ((v_nameLookups["invoke"] !== undefined)) {
		v_lookup[v_nameLookups["invoke"]] = 15;
	}
	if ((v_nameLookups["isA"] !== undefined)) {
		v_lookup[v_nameLookups["isA"]] = 16;
	}
	if ((v_nameLookups["join"] !== undefined)) {
		v_lookup[v_nameLookups["join"]] = 17;
	}
	if ((v_nameLookups["keys"] !== undefined)) {
		v_lookup[v_nameLookups["keys"]] = 18;
	}
	if ((v_nameLookups["lower"] !== undefined)) {
		v_lookup[v_nameLookups["lower"]] = 19;
	}
	if ((v_nameLookups["ltrim"] !== undefined)) {
		v_lookup[v_nameLookups["ltrim"]] = 20;
	}
	if ((v_nameLookups["map"] !== undefined)) {
		v_lookup[v_nameLookups["map"]] = 21;
	}
	if ((v_nameLookups["merge"] !== undefined)) {
		v_lookup[v_nameLookups["merge"]] = 22;
	}
	if ((v_nameLookups["pop"] !== undefined)) {
		v_lookup[v_nameLookups["pop"]] = 23;
	}
	if ((v_nameLookups["remove"] !== undefined)) {
		v_lookup[v_nameLookups["remove"]] = 24;
	}
	if ((v_nameLookups["replace"] !== undefined)) {
		v_lookup[v_nameLookups["replace"]] = 25;
	}
	if ((v_nameLookups["reverse"] !== undefined)) {
		v_lookup[v_nameLookups["reverse"]] = 26;
	}
	if ((v_nameLookups["rtrim"] !== undefined)) {
		v_lookup[v_nameLookups["rtrim"]] = 27;
	}
	if ((v_nameLookups["shuffle"] !== undefined)) {
		v_lookup[v_nameLookups["shuffle"]] = 28;
	}
	if ((v_nameLookups["sort"] !== undefined)) {
		v_lookup[v_nameLookups["sort"]] = 29;
	}
	if ((v_nameLookups["split"] !== undefined)) {
		v_lookup[v_nameLookups["split"]] = 30;
	}
	if ((v_nameLookups["startsWith"] !== undefined)) {
		v_lookup[v_nameLookups["startsWith"]] = 31;
	}
	if ((v_nameLookups["trim"] !== undefined)) {
		v_lookup[v_nameLookups["trim"]] = 32;
	}
	if ((v_nameLookups["upper"] !== undefined)) {
		v_lookup[v_nameLookups["upper"]] = 33;
	}
	if ((v_nameLookups["values"] !== undefined)) {
		v_lookup[v_nameLookups["values"]] = 34;
	}
	return v_lookup;
};

var v_primitiveMethodWrongArgCountError = function(v_name, v_expected, v_actual) {
	var v_output = "";
	if ((v_expected == 0)) {
		v_output = v_name + " does not accept any arguments.";
	} else {
		if ((v_expected == 1)) {
			v_output = v_name + " accepts exactly 1 argument.";
		} else {
			v_output = [v_name, " requires ", ('' + v_expected), " arguments."].join('');
		}
	}
	return [v_output, " Found: ", ('' + v_actual)].join('');
};

var v_qsortHelper = function(v_keyStringList, v_keyNumList, v_parallelList, v_isString, v_startIndex, v_endIndex) {
	if (((v_endIndex - v_startIndex) <= 0)) {
		return 0;
	}
	if (((v_endIndex - v_startIndex) == 1)) {
		if (v_sortHelperIsRevOrder(v_keyStringList, v_keyNumList, v_isString, v_startIndex, v_endIndex)) {
			v_sortHelperSwap(v_keyStringList, v_keyNumList, v_parallelList, v_isString, v_startIndex, v_endIndex);
		}
		return 0;
	}
	var v_mid = ((v_endIndex + v_startIndex) >> 1);
	v_sortHelperSwap(v_keyStringList, v_keyNumList, v_parallelList, v_isString, v_mid, v_startIndex);
	var v_upperPointer = (v_endIndex + 1);
	var v_lowerPointer = (v_startIndex + 1);
	while ((v_upperPointer > v_lowerPointer)) {
		if (v_sortHelperIsRevOrder(v_keyStringList, v_keyNumList, v_isString, v_startIndex, v_lowerPointer)) {
			v_lowerPointer += 1;
		} else {
			v_upperPointer -= 1;
			v_sortHelperSwap(v_keyStringList, v_keyNumList, v_parallelList, v_isString, v_lowerPointer, v_upperPointer);
		}
	}
	var v_midIndex = (v_lowerPointer - 1);
	v_sortHelperSwap(v_keyStringList, v_keyNumList, v_parallelList, v_isString, v_midIndex, v_startIndex);
	v_qsortHelper(v_keyStringList, v_keyNumList, v_parallelList, v_isString, v_startIndex, (v_midIndex - 1));
	v_qsortHelper(v_keyStringList, v_keyNumList, v_parallelList, v_isString, (v_midIndex + 1), v_endIndex);
	return 0;
};

var v_read_integer = function(v_pindex, v_raw, v_length, v_alphaNums) {
	var v_num = 0;
	var v_c = v_raw.charAt(v_pindex[0]);
	v_pindex[0] = (v_pindex[0] + 1);
	if ((v_c == "%")) {
		var v_value = v_read_till(v_pindex, v_raw, v_length, "%");
		v_num = parseInt(v_value);
	} else {
		if ((v_c == "@")) {
			v_num = v_read_integer(v_pindex, v_raw, v_length, v_alphaNums);
			v_num *= 62;
			v_num += v_read_integer(v_pindex, v_raw, v_length, v_alphaNums);
		} else {
			if ((v_c == "#")) {
				v_num = v_read_integer(v_pindex, v_raw, v_length, v_alphaNums);
				v_num *= 62;
				v_num += v_read_integer(v_pindex, v_raw, v_length, v_alphaNums);
				v_num *= 62;
				v_num += v_read_integer(v_pindex, v_raw, v_length, v_alphaNums);
			} else {
				if ((v_c == "^")) {
					v_num = (-1 * v_read_integer(v_pindex, v_raw, v_length, v_alphaNums));
				} else {
					// TODO: string.IndexOfChar(c);
					v_num = v_alphaNums.indexOf(v_c);
					if ((v_num == -1)) {
					}
				}
			}
		}
	}
	return v_num;
};

var v_read_string = function(v_pindex, v_raw, v_length, v_alphaNums) {
	var v_b64 = v_read_till(v_pindex, v_raw, v_length, "%");
	return C$common$base64ToString(v_b64);
};

var v_read_till = function(v_index, v_raw, v_length, v_end) {
	var v_output = [];
	var v_ctn = true;
	var v_c = " ";
	while (v_ctn) {
		v_c = v_raw.charAt(v_index[0]);
		if ((v_c == v_end)) {
			v_ctn = false;
		} else {
			v_output.push(v_c);
		}
		v_index[0] = (v_index[0] + 1);
	}
	return v_output.join('');
};

var v_reallocIntArray = function(v_original, v_requiredCapacity) {
	var v_oldSize = v_original.length;
	var v_size = v_oldSize;
	while ((v_size < v_requiredCapacity)) {
		v_size *= 2;
	}
	var v_output = C$common$createNewArray(v_size);
	var v_i = 0;
	while ((v_i < v_oldSize)) {
		v_output[v_i] = v_original[v_i];
		v_i += 1;
	}
	return v_output;
};

var v_Reflect_allClasses = function() {
	var v_p = C$common$programData;
	var v_valueList = [];
	var v_i = 1;
	while ((v_i < v_p[20].length)) {
		var v_classInfo = v_p[20][v_i];
		if ((v_classInfo == null)) {
			v_i = v_p[20].length;
		} else {
			v_valueList.push([10, [false, v_classInfo[0]]]);
		}
		v_i += 1;
	}
	return [6, v_valueList];
};

var v_Reflect_getMethods = function(v_ec, v_methodSource) {
	var v_p = C$common$programData;
	var v_methodList = [];
	if ((v_methodSource[0] == 8)) {
		var v_objInstance1 = v_methodSource[1];
		var v_classInfo = v_p[20][v_objInstance1[0]];
		var v_i = 0;
		while ((v_i < v_classInfo[8].length)) {
			var v_functionId = v_classInfo[8][v_i];
			if ((v_functionId != -1)) {
				v_methodList.push([9, [2, v_methodSource, v_objInstance1[0], v_functionId]]);
			}
			v_i += 1;
		}
	} else {
		var v_classValue = v_methodSource[1];
		var v_classInfo = v_p[20][v_classValue[1]];
		v_EX_UnsupportedOperation(v_ec, "static method reflection not implemented yet.");
	}
	return [6, v_methodList];
};

var v_registerLibraryFunction = function(v_functionPointer, v_libRegObjRaw, v_functionName, v_argCount) {
	var v_libRegObj = v_libRegObjRaw;
	var v_functionPointersById = v_libRegObj[0];
	var v_functionNamesById = v_libRegObj[1];
	var v_functionArgCountsById = v_libRegObj[2];
	var v_index = v_functionPointersById.length;
	v_functionPointersById.push(v_functionPointer);
	v_functionNamesById.push(v_functionName);
	v_functionArgCountsById.push(v_argCount);
	var v_p = C$common$programData;
	if ((v_p[36][v_functionName] !== undefined)) {
		var v_functionNameReferenceId = v_p[36][v_functionName];
		var v_lookupId = (v_p[37] + (4096 * v_functionNameReferenceId));
		v_p[32][v_lookupId] = v_index;
	}
	return 0;
};

var v_resetLocalsStackTokens = function(v_ec, v_stack) {
	var v_localsStack = v_ec[5];
	var v_localsStackSet = v_ec[6];
	var v_i = v_stack[3];
	while ((v_i < v_localsStackSet.length)) {
		v_localsStackSet[v_i] = 0;
		v_localsStack[v_i] = null;
		v_i += 1;
	}
	var v_stackWalker = v_stack;
	while ((v_stackWalker != null)) {
		var v_token = v_stackWalker[1];
		v_stackWalker[1] = 1;
		v_i = v_stackWalker[2];
		while ((v_i < v_stackWalker[3])) {
			if ((v_localsStackSet[v_i] == v_token)) {
				v_localsStackSet[v_i] = 1;
			} else {
				v_localsStackSet[v_i] = 0;
				v_localsStack[v_i] = null;
			}
			v_i += 1;
		}
		v_stackWalker = v_stackWalker[4];
	}
	v_ec[7] = 1;
	return -1;
};

var v_resolvePrimitiveMethodName2 = function(v_lookup, v_type, v_globalNameId) {
	var v_output = v_lookup[v_globalNameId];
	if ((v_output != -1)) {
		switch ((v_type + (11 * v_output))) {
			case 82:
				return v_output;
			case 104:
				return v_output;
			case 148:
				return v_output;
			case 214:
				return v_output;
			case 225:
				return v_output;
			case 280:
				return v_output;
			case 291:
				return v_output;
			case 302:
				return v_output;
			case 335:
				return v_output;
			case 346:
				return v_output;
			case 357:
				return v_output;
			case 368:
				return v_output;
			case 6:
				return v_output;
			case 39:
				return v_output;
			case 50:
				return v_output;
			case 61:
				return v_output;
			case 72:
				return v_output;
			case 83:
				return v_output;
			case 116:
				return v_output;
			case 160:
				return v_output;
			case 193:
				return v_output;
			case 237:
				return v_output;
			case 259:
				return v_output;
			case 270:
				return v_output;
			case 292:
				return v_output;
			case 314:
				return v_output;
			case 325:
				return v_output;
			case 51:
				return v_output;
			case 62:
				return v_output;
			case 84:
				return v_output;
			case 128:
				return v_output;
			case 205:
				return v_output;
			case 249:
				return v_output;
			case 271:
				return v_output;
			case 381:
				return v_output;
			case 20:
				return v_output;
			case 31:
				return v_output;
			case 141:
				return v_output;
			case 174:
				return v_output;
			case 98:
				return v_output;
			case 142:
				return v_output;
			case 186:
				return v_output;
			default:
				return -1;
		}
	}
	return -1;
};

var v_resource_manager_getResourceOfType = function(v_userPath, v_type) {
	var v_p = C$common$programData;
	var v_db = v_p[27];
	var v_lookup = v_db[1];
	if ((v_lookup[v_userPath] !== undefined)) {
		var v_output = [];
		var v_file = v_lookup[v_userPath];
		if (v_file[3] == v_type) {
			v_output.push(v_VALUE_TRUE);
			v_output.push(v_buildString(v_file[1]));
		} else {
			v_output.push(v_VALUE_FALSE);
		}
		return [6, v_output];
	}
	return v_VALUE_NULL;
};

var v_resource_manager_initialize = function() {
	var v_filesPerDirectoryBuilder = {};
	var v_fileInfo = {};
	var v_dataList = [];
	var v_manifest = C$common$resourceManifest;
	var v_items = v_manifest.split("\n");
	var v_resourceInfo = null;
	var v_type = "";
	var v_userPath = "";
	var v_internalPath = "";
	var v_argument = "";
	var v_isText = false;
	var v_intType = 0;
	var v_i = 0;
	while ((v_i < v_items.length)) {
		var v_itemData = v_items[v_i].split(",");
		if ((v_itemData.length >= 3)) {
			v_type = v_itemData[0];
			v_isText = "TXT" == v_type;
			if (v_isText) {
				v_intType = 1;
			} else {
				if (("IMGSH" == v_type || "IMG" == v_type)) {
					v_intType = 2;
				} else {
					if ("SND" == v_type) {
						v_intType = 3;
					} else {
						if ("TTF" == v_type) {
							v_intType = 4;
						} else {
							v_intType = 5;
						}
					}
				}
			}
			v_userPath = v_stringDecode(v_itemData[1]);
			v_internalPath = v_itemData[2];
			v_argument = "";
			if ((v_itemData.length > 3)) {
				v_argument = v_stringDecode(v_itemData[3]);
			}
			v_resourceInfo = [v_userPath, v_internalPath, v_isText, v_type, v_argument];
			v_fileInfo[v_userPath] = v_resourceInfo;
			v_resource_manager_populate_directory_lookup(v_filesPerDirectoryBuilder, v_userPath);
			v_dataList.push(v_buildString(v_userPath));
			v_dataList.push(v_buildInteger(v_intType));
			if ((v_internalPath != null)) {
				v_dataList.push(v_buildString(v_internalPath));
			} else {
				v_dataList.push(v_VALUE_NULL);
			}
		}
		v_i += 1;
	}
	var v_dirs = C$common$dictionaryKeys(v_filesPerDirectoryBuilder);
	var v_filesPerDirectorySorted = {};
	v_i = 0;
	while ((v_i < v_dirs.length)) {
		var v_dir = v_dirs[v_i];
		var v_unsortedDirs = v_filesPerDirectoryBuilder[v_dir];
		var v_dirsSorted = C$common$multiplyList(v_unsortedDirs, 1);
		v_dirsSorted = C$common$sortedCopyOfArray(v_dirsSorted);
		v_filesPerDirectorySorted[v_dir] = v_dirsSorted;
		v_i += 1;
	}
	return [v_filesPerDirectorySorted, v_fileInfo, v_dataList];
};

var v_resource_manager_populate_directory_lookup = function(v_dirs, v_path) {
	var v_parts = v_path.split("/");
	var v_pathBuilder = "";
	var v_file = "";
	var v_i = 0;
	while ((v_i < v_parts.length)) {
		v_file = v_parts[v_i];
		var v_files = null;
		if (!(v_dirs[v_pathBuilder] !== undefined)) {
			v_files = [];
			v_dirs[v_pathBuilder] = v_files;
		} else {
			v_files = v_dirs[v_pathBuilder];
		}
		v_files.push(v_file);
		if ((v_i > 0)) {
			v_pathBuilder = [v_pathBuilder, "/", v_file].join('');
		} else {
			v_pathBuilder = v_file;
		}
		v_i += 1;
	}
	return 0;
};

var v_runInterpreter = function(v_executionContextId) {
	var v_p = C$common$programData;
	var v_result = v_interpret(v_executionContextId);
	var v_status = v_result[0];
	var v_shutdown = false;
	if ((v_status == 1)) {
		if ((v_p[0][v_executionContextId] !== undefined)) {
			delete v_p[0][v_executionContextId];
		}
		v_runShutdownHandlers();
		v_shutdown = true;
	} else {
		if ((v_status == 3)) {
			C$common$print(v_result[1]);
			v_runShutdownHandlers();
			v_shutdown = true;
		}
	}
	if ((v_shutdown && (v_executionContextId == 0))) {
		;
	}
	return v_status;
};

var v_runInterpreterWithFunctionPointer = function(v_fpValue, v_args) {
	var v_p = C$common$programData;
	var v_newId = (v_p[1] + 1);
	v_p[1] = v_newId;
	var v_argList = [];
	var v_i = 0;
	while ((v_i < v_args.length)) {
		v_argList.push(v_args[v_i]);
		v_i += 1;
	}
	var v_locals = C$common$createNewArray(0);
	var v_localsSet = C$common$createNewArray(0);
	var v_valueStack = C$common$createNewArray(100);
	v_valueStack[0] = v_fpValue;
	v_valueStack[1] = [6, v_argList];
	var v_stack = [(v_p[2].length - 2), 1, 0, 0, null, false, null, 0, 0, 1, 0, null];
	var v_executionContext = [v_newId, v_stack, 2, 100, v_valueStack, v_locals, v_localsSet, 1, 0, false, null, false, 0, null];
	v_p[0][v_newId] = v_executionContext;
	return v_runInterpreter(v_newId);
};

var v_runShutdownHandlers = function() {
	var v_p = C$common$programData;
	while ((v_p[39].length > 0)) {
		var v_handler = v_p[39][0];
		v_p[39].splice(0, 1);
		v_runInterpreterWithFunctionPointer(v_handler, C$common$createNewArray(0));
	}
	return 0;
};

var v_sortHelperIsRevOrder = function(v_keyStringList, v_keyNumList, v_isString, v_indexLeft, v_indexRight) {
	if (v_isString) {
		return (v_keyStringList[v_indexLeft].localeCompare(v_keyStringList[v_indexRight]) > 0);
	}
	return (v_keyNumList[v_indexLeft] > v_keyNumList[v_indexRight]);
};

var v_sortHelperSwap = function(v_keyStringList, v_keyNumList, v_values, v_isString, v_index1, v_index2) {
	if ((v_index1 == v_index2)) {
		return 0;
	}
	if ((v_values != null)) {
		var v_t = v_values[v_index1];
		v_values[v_index1] = v_values[v_index2];
		v_values[v_index2] = v_t;
	}
	if (v_isString) {
		var v_s = v_keyStringList[v_index1];
		v_keyStringList[v_index1] = v_keyStringList[v_index2];
		v_keyStringList[v_index2] = v_s;
	} else {
		var v_n = v_keyNumList[v_index1];
		v_keyNumList[v_index1] = v_keyNumList[v_index2];
		v_keyNumList[v_index2] = v_n;
	}
	return 0;
};

var v_sortLists = function(v_keyList, v_parallelList, v_intOutParam) {
	C$common$intBuffer16[0] = 0;
	var v_length = v_keyList.length;
	if ((v_length < 2)) {
		return 0;
	}
	var v_i = 0;
	var v_item = v_keyList[0];
	var v_isString = (v_item[0] == 5);
	var v_stringKeys = null;
	var v_numKeys = null;
	if (v_isString) {
		v_stringKeys = C$common$createNewArray(v_length);
	} else {
		v_numKeys = C$common$createNewArray(v_length);
	}
	v_i = (v_keyList.length - 1);
	while ((v_i >= 0)) {
		v_item = v_keyList[v_i];
		switch (v_item[0]) {
			case 3:
				if (v_isString) {
					C$common$intBuffer16[0] = 1;
					return 0;
				}
				v_numKeys[v_i] = v_item[1];
				break;
			case 4:
				if (v_isString) {
					C$common$intBuffer16[0] = 1;
					return 0;
				}
				v_numKeys[v_i] = v_item[1];
				break;
			case 5:
				if (!v_isString) {
					C$common$intBuffer16[0] = 1;
					return 0;
				}
				v_stringKeys[v_i] = v_item[1];
				break;
			default:
				C$common$intBuffer16[0] = 1;
				return 0;
		}
		v_i -= 1;
	}
	v_qsortHelper(v_stringKeys, v_numKeys, v_parallelList, v_isString, 0, (v_length - 1));
	return 0;
};

var v_stackItemIsLibrary = function(v_stackInfo) {
	if ((v_stackInfo.charAt(0) != "[")) {
		return false;
	}
	var v_cIndex = v_stackInfo.indexOf(":");
	return ((v_cIndex > 0) && (v_cIndex < v_stackInfo.indexOf("]")));
};

var v_stringDecode = function(v_encoded) {
	if (!(v_encoded.indexOf("%") != -1)) {
		var v_length = v_encoded.length;
		var v_per = "%";
		var v_builder = [];
		var v_i = 0;
		while ((v_i < v_length)) {
			var v_c = v_encoded.charAt(v_i);
			if (((v_c == v_per) && ((v_i + 2) < v_length))) {
				v_builder.push(v_stringFromHex(["", v_encoded.charAt((v_i + 1)), v_encoded.charAt((v_i + 2))].join('')));
			} else {
				v_builder.push("" + v_c);
			}
			v_i += 1;
		}
		return v_builder.join("");
	}
	return v_encoded;
};

var v_stringFromHex = function(v_encoded) {
	v_encoded = v_encoded.toUpperCase();
	var v_hex = "0123456789ABCDEF";
	var v_output = [];
	var v_length = v_encoded.length;
	var v_a = 0;
	var v_b = 0;
	var v_c = null;
	var v_i = 0;
	while (((v_i + 1) < v_length)) {
		v_c = "" + v_encoded.charAt(v_i);
		v_a = v_hex.indexOf(v_c);
		if ((v_a == -1)) {
			return null;
		}
		v_c = "" + v_encoded.charAt((v_i + 1));
		v_b = v_hex.indexOf(v_c);
		if ((v_b == -1)) {
			return null;
		}
		v_a = ((v_a * 16) + v_b);
		v_output.push(String.fromCharCode(v_a));
		v_i += 2;
	}
	return v_output.join("");
};

var v_suspendInterpreter = function() {
	return [2, null];
};

var v_suspendInterpreterWithLock = function() {
	return [4, null];
};

var v_tokenDataImpl = function(v_row) {
	var v_p = C$common$programData;
	var v_tokensByPc = v_p[10];
	var v_pc = (v_row[0] + v_p[11]);
	var v_line = v_row[1];
	var v_col = v_row[2];
	var v_file = v_row[3];
	var v_tokens = v_tokensByPc[v_pc];
	if ((v_tokens == null)) {
		v_tokens = [];
		v_tokensByPc[v_pc] = v_tokens;
	}
	v_tokens.push([v_line, v_col, v_file]);
	return 0;
};

var v_tokenHelperConvertPcsToStackTraceStrings = function(v_pcs) {
	var v_p = C$common$programData;
	var v_tokens = v_generateTokenListFromPcs(v_pcs);
	var v_files = v_p[12];
	var v_output = [];
	var v_i = 0;
	while ((v_i < v_tokens.length)) {
		var v_token = v_tokens[v_i];
		if ((v_token == null)) {
			v_output.push("[No stack information]");
		} else {
			var v_line = v_token[0];
			var v_col = v_token[1];
			var v_fileData = v_files[v_token[2]];
			var v_lines = v_fileData.split("\n");
			var v_filename = v_lines[0];
			var v_linevalue = v_lines[(v_line + 1)];
			v_output.push([v_filename, ", Line: ", ('' + (v_line + 1)), ", Col: ", ('' + (v_col + 1))].join(''));
		}
		v_i += 1;
	}
	return v_output;
};

var v_tokenHelperGetFileLine = function(v_fileId, v_lineNum) {
	var v_p = C$common$programData;
	var v_sourceCode = v_p[12][v_fileId];
	if ((v_sourceCode == null)) {
		return null;
	}
	return v_sourceCode.split("\n")[v_lineNum];
};

var v_tokenHelperGetFormattedPointerToToken = function(v_token) {
	var v_line = v_tokenHelperGetFileLine(v_token[2], (v_token[0] + 1));
	if ((v_line == null)) {
		return null;
	}
	var v_columnIndex = v_token[1];
	var v_lineLength = v_line.length;
	v_line = C$common$stringTrimOneSide(v_line, true);
	v_line = v_line.split("\t").join(" ");
	var v_offset = (v_lineLength - v_line.length);
	v_columnIndex -= v_offset;
	var v_line2 = "";
	while ((v_columnIndex > 0)) {
		v_columnIndex -= 1;
		v_line2 = v_line2 + " ";
	}
	v_line2 = v_line2 + "^";
	return [v_line, "\n", v_line2].join('');
};

var v_tokenHelplerIsFilePathLibrary = function(v_fileId, v_allFiles) {
	var v_filename = v_tokenHelperGetFileLine(v_fileId, 0);
	return !C$common$stringEndsWith(v_filename.toLowerCase(), ".cry");
};

var v_uncaughtExceptionResult = function(v_exception) {
	return [3, v_unrollExceptionOutput(v_exception)];
};

var v_unrollExceptionOutput = function(v_exceptionInstance) {
	var v_objInstance = v_exceptionInstance[1];
	var v_p = C$common$programData;
	var v_classInfo = v_p[20][v_objInstance[0]];
	var v_pcs = v_objInstance[3][1];
	var v_codeFormattedPointer = "";
	var v_exceptionName = v_classInfo[13];
	var v_message = v_valueToString(v_objInstance[2][1]);
	var v_trace = v_tokenHelperConvertPcsToStackTraceStrings(v_pcs);
	v_trace.pop();
	v_trace.push("Stack Trace:");
	v_trace.reverse();
	v_pcs.reverse();
	if ((!false && !v_stackItemIsLibrary(v_trace[0]))) {
		while (v_stackItemIsLibrary(v_trace[(v_trace.length - 1)])) {
			v_trace.pop();
			v_pcs.pop();
		}
	}
	var v_tokensAtPc = v_p[10][v_pcs[(v_pcs.length - 1)]];
	if ((v_tokensAtPc != null)) {
		v_codeFormattedPointer = "\n\n" + v_tokenHelperGetFormattedPointerToToken(v_tokensAtPc[0]);
	}
	var v_stackTrace = v_trace.join("\n");
	return [v_stackTrace, v_codeFormattedPointer, "\n", v_exceptionName, ": ", v_message].join('');
};

var v_valueStackDepthImpl = function(v_row) {
	var v_p = C$common$programData;
	var v_totalPcCount = v_p[2].length;
	var v_valueStackDepthByPc = C$common$createNewArray(v_totalPcCount);
	var v_rowIndex = 0;
	var v_rowLength = v_row.length;
	var v_depth = 0;
	var v_pc = 0;
	while ((v_pc < v_totalPcCount)) {
		if (((v_rowIndex < v_rowLength) && (v_pc == v_row[v_rowIndex]))) {
			v_depth += v_row[(v_rowIndex + 1)];
			v_rowIndex += 2;
		}
		v_valueStackDepthByPc[v_pc] = v_depth;
		v_pc += 1;
	}
	v_p[31] = v_valueStackDepthByPc;
	return 0;
};

var v_valueStackIncreaseCapacity = function(v_ec) {
	var v_stack = v_ec[4];
	var v_oldCapacity = v_stack.length;
	var v_newCapacity = (v_oldCapacity * 2);
	var v_newStack = C$common$createNewArray(v_newCapacity);
	var v_i = (v_oldCapacity - 1);
	while ((v_i >= 0)) {
		v_newStack[v_i] = v_stack[v_i];
		v_i -= 1;
	}
	v_ec[4] = v_newStack;
	return v_newStack;
};

var v_valueToString = function(v_wrappedValue) {
	var v_type = v_wrappedValue[0];
	if ((v_type == 1)) {
		return "null";
	}
	if ((v_type == 2)) {
		if (v_wrappedValue[1]) {
			return "true";
		}
		return "false";
	}
	if ((v_type == 4)) {
		var v_floatStr = '' + v_wrappedValue[1];
		if (!(v_floatStr.indexOf(".") != -1)) {
			v_floatStr += ".0";
		}
		return v_floatStr;
	}
	if ((v_type == 3)) {
		return ('' + v_wrappedValue[1]);
	}
	if ((v_type == 5)) {
		return v_wrappedValue[1];
	}
	if ((v_type == 6)) {
		var v_internalList = v_wrappedValue[1];
		var v_output = "[";
		var v_i = 0;
		while ((v_i < v_internalList.length)) {
			if ((v_i > 0)) {
				v_output += ", ";
			}
			v_output += v_valueToString(v_internalList[v_i]);
			v_i += 1;
		}
		v_output += "]";
		return v_output;
	}
	if ((v_type == 8)) {
		var v_objInstance = v_wrappedValue[1];
		var v_classId = v_objInstance[0];
		var v_ptr = v_objInstance[1];
		var v_pd = C$common$programData;
		var v_classInfo = v_pd[20][v_classId];
		var v_nameId = v_classInfo[1];
		var v_className = v_pd[5][v_nameId];
		return ["Instance<", v_className, "#", ('' + v_ptr), ">"].join('');
	}
	if ((v_type == 7)) {
		var v_internalDict = v_wrappedValue[1];
		var v_size = v_internalDict[4];
		if ((v_size == 0)) {
			return "{}";
		}
		var v_output = "{";
		if ((v_internalDict[5] == 3)) {
			var v_intKeys = C$common$dictionaryKeys(v_internalDict[0]);
			var v_intKey = 0;
			var v_i = 0;
			while ((v_i < v_size)) {
				if ((v_i > 0)) {
					v_output += ", ";
				} else {
					v_output += " ";
				}
				v_intKey = v_intKeys[v_i];
				v_output += [('' + v_intKey), ": ", v_valueToString(v_internalDict[1][v_intKey])].join('');
				v_i += 1;
			}
		} else {
			var v_stringKeys = C$common$dictionaryKeys(v_internalDict[2]);
			var v_stringKey = "";
			var v_i = 0;
			while ((v_i < v_size)) {
				if ((v_i > 0)) {
					v_output += ", ";
				} else {
					v_output += " ";
				}
				v_stringKey = v_stringKeys[v_i];
				v_output += [v_stringKey, ": ", v_valueToString(v_internalDict[3][v_stringKey])].join('');
				v_i += 1;
			}
		}
		v_output += " }";
		return v_output;
	}
	return "<unknown>";
};

var v_vm_getCurrentExecutionContextId = function() {
	var v_p = C$common$programData;
	return v_p[1];
};

var v_vm_suspend = function(v_status) {
	return v_vm_suspend_for_context(v_getExecutionContext(-1), 1);
};

var v_vm_suspend_for_context = function(v_ec, v_status) {
	v_ec[11] = true;
	v_ec[12] = v_status;
	return 0;
};

var v_vm_suspend_with_status = function(v_status) {
	return v_vm_suspend_for_context(v_getExecutionContext(-1), v_status);
};