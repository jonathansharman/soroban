var v_lib_game_manifest = function(v_libRegData) {
	C$common$registerLibraryFunction('game', v_libRegData, "clock_tick", 0);
	C$common$registerLibraryFunction('game', v_libRegData, "getScreenInfo", 1);
	C$common$registerLibraryFunction('game', v_libRegData, "getTouchState", 1);
	C$common$registerLibraryFunction('game', v_libRegData, "initialize", 1);
	C$common$registerLibraryFunction('game', v_libRegData, "initialize_screen", 4);
	C$common$registerLibraryFunction('game', v_libRegData, "pump_events", 1);
	C$common$registerLibraryFunction('game', v_libRegData, "set_title", 1);
	C$common$registerLibraryFunction('game', v_libRegData, "setInstance", 1);
};

var v_lib_game_function_clock_tick = function(v_args) {
	C$game$endFrame();
	v_vm_suspend(1);
	return v_VALUE_NULL;
};

var v_lib_game_function_getScreenInfo = function(v_args) {
	var v_outList = v_args[0];
	var v_o = C$common$intBuffer16;
	if (C$game$screenInfo(v_o)) {
		var v_output = v_outList[1];
		v_output[0] = v_buildBoolean((v_o[0] == 1));
		v_output[1] = v_buildInteger(v_o[1]);
		v_output[2] = v_buildInteger(v_o[2]);
	}
	return v_outList;
};

var v_lib_game_function_getTouchState = function(v_args) {
	var v_output = v_args[0][1];
	var v_data = C$common$createNewArray(31);
	v_data[0] = 0;
	C$game$getTouchState(v_data);
	var v_len = v_data[0];
	var v_end = ((v_len * 3) + 1);
	var v_i = 1;
	while ((v_i < v_end)) {
		v_output.push(v_buildInteger(v_data[v_i]));
		v_i += 1;
	}
	return v_VALUE_NULL;
};

var v_lib_game_function_initialize = function(v_args) {
	C$game$initializeGame(v_getFloat(v_args[0]));
	return v_VALUE_NULL;
};

var v_lib_game_function_initialize_screen = function(v_args) {
	var v_ec = v_getExecutionContext(v_vm_getCurrentExecutionContextId());
	C$game$initializeScreen(v_args[0][1], v_args[1][1], v_args[2][1], v_args[3][1], v_vm_getCurrentExecutionContextId());
	v_vm_suspend_for_context(v_ec, 1);
	return v_VALUE_NULL;
};

var v_lib_game_function_pump_events = function(v_args) {
	v_libGamePumpEvents(v_args[0][1]);
	return v_args[0];
};

var v_lib_game_function_set_title = function(v_args) {
	C$game$setTitle(v_args[0][1]);
	return v_VALUE_NULL;
};

var v_lib_game_function_setInstance = function(v_args) {
	var v_o = v_args[0][1];
	var v_nd = C$common$createNewArray(1);
	v_nd[0] = null;
	v_o[3] = v_nd;
	return v_VALUE_NULL;
};

var v_libGamePumpEvents = function(v_output) {
	var v_eventList = C$game$pumpEventObjects();
	C$common$clearList(v_output);
	var v_len = v_eventList.length;
	if ((v_len > 0)) {
		var v_i = 0;
		v_i = 0;
		while ((v_i < v_len)) {
			var v_ev = v_eventList[v_i];
			v_output.push(v_buildInteger(v_ev[0]));
			var v_t = v_ev[0];
			v_output.push(v_buildInteger(v_ev[1]));
			if ((v_t >= 32)) {
				v_output.push(v_buildInteger(v_ev[2]));
				if ((v_t == 37)) {
					v_output.push(v_buildFloat(v_ev[4]));
				} else {
					if (((v_t >= 64) && (v_t < 80))) {
						v_output.push(v_buildInteger(v_ev[3]));
					}
				}
			}
			v_i += 1;
		}
	}
	return 0;
};

C$common$scrapeLibFuncNames('game');

// Lookups for fast hex conversion
C$drawing = 1;
C$drawing$HEX = [];
C$drawing$HEXR = [];
C$drawing$events = [];
C$drawing$eventsLength = 0;
C$drawing$images = [];
C$drawing$textChars = [];

for (var i = 0; i < 256; ++i) {
    var t = i.toString(16);
    if (i < 16) t = '0' + t;
    C$drawing$HEX.push(t);
    C$drawing$HEXR.push('#' + t);
}

C$drawing$rendererSetData = function (events, eventsLength, images, textChars) {
    C$drawing$events = events;
    C$drawing$eventsLength = eventsLength;
    C$drawing$images = images;
    C$drawing$textChars = textChars;
    C$drawing$render();
};

C$drawing$render = function () {
    var ev = C$drawing$events;
    var images = C$drawing$images;
    var imagesIndex = 0;
    var canvas = null;
    var mask = 0;
    var x = 0;
    var y = 0;
    var w = 0;
    var h = 0;
    var r = 0;
    var g = 0;
    var b = 0;
    var a = 0;
    var tw = 0;
    var th = 0;
    var sx = 0;
    var sy = 0;
    var sw = 0;
    var sh = 0;
    var alpha = 0;
    var theta = 0;
    var radiusX = 0;
    var radiusY = 0;
    var path;
    var offset;
    var font;
    var text;
    var textIndex = 0;

    C$drawing$drawRect(0, 0, C$game$width, C$game$height, 0, 0, 0, 255);

    for (var i = 0; i < C$drawing$eventsLength; i += 16) {
        switch (ev[i]) {
            case 1:
                // rectangle
                x = ev[i | 1];
                y = ev[i | 2];
                w = ev[i | 3];
                h = ev[i | 4];
                r = ev[i | 5];
                g = ev[i | 6];
                b = ev[i | 7];
                a = ev[i | 8];

                C$game$ctx.fillStyle = C$drawing$HEXR[r] + C$drawing$HEX[g] + C$drawing$HEX[b];
                if (a != 255) {
                    C$game$ctx.globalAlpha = a / 255.0;
                    C$game$ctx.fillRect(x, y, w + .1, h + .1); // TODO: get to the bottom of this mysterious .1. Is it still necessary?
                    C$game$ctx.globalAlpha = 1;
                } else {
                    C$game$ctx.fillRect(x, y, w + .1, h + .1);
                }
                break;

            case 2:
                // ellipse
                w = ev[i | 3] / 2; // note that w and h are half width and half height
                h = ev[i | 4] / 2;
                x = ev[i | 1] + w;
                y = ev[i | 2] + h;
                r = ev[i | 5];
                g = ev[i | 6];
                b = ev[i | 7];
                a = ev[i | 8];

                w = w * 4 / 3; // no idea why this needs to exist to look correct...
                C$game$ctx.beginPath();
                C$game$ctx.moveTo(x, y - h);
                C$game$ctx.bezierCurveTo(
                    x + w, y - h,
                    x + w, y + h,
                    x, y + h);
                C$game$ctx.bezierCurveTo(
                    x - w, y + h,
                    x - w, y - h,
                    x, y - h);
                C$game$ctx.fillStyle = C$drawing$HEXR[r] + C$drawing$HEX[g] + C$drawing$HEX[b];
                if (a != 255) {
                    C$game$ctx.globalAlpha = a / 255.0;
                    C$game$ctx.fill();
                    C$game$ctx.closePath();
                    C$game$ctx.globalAlpha = 1;
                } else {
                    C$game$ctx.fill();
                    C$game$ctx.closePath();
                }
                break;

            case 3:
                // line
                ax = ev[i | 1];
                ay = ev[i | 2];
                bx = ev[i | 3];
                by = ev[i | 4];
                width = ev[i | 5];
                r = ev[i | 6];
                g = ev[i | 7];
                b = ev[i | 8];
                a = ev[i | 9];

                if (a > 0) {
                    offset = ((width % 2) == 0) ? 0 : .5;
                    C$game$ctx.beginPath();
                    C$game$ctx.moveTo(ax + offset, ay + offset);
                    C$game$ctx.lineTo(bx + offset, by + offset);
                    C$game$ctx.lineWidth = width;
                    if (a < 255) {
                        C$game$ctx.globalAlpha = a / 255;
                        C$game$ctx.strokeStyle = C$drawing$HEXR[r] + C$drawing$HEX[g] + C$drawing$HEX[b];
                        C$game$ctx.stroke();
                        C$game$ctx.closePath();
                        C$game$ctx.globalAlpha = 1;
                    } else {
                        C$game$ctx.strokeStyle = C$drawing$HEXR[r] + C$drawing$HEX[g] + C$drawing$HEX[b];
                        C$game$ctx.stroke();
                        C$game$ctx.closePath();
                    }
                }
                break;

            case 4: // triangle
            case 5: // quad
                ax = ev[i | 1];
                ay = ev[i | 2];
                bx = ev[i | 3];
                by = ev[i | 4];
                cx = ev[i | 5];
                cy = ev[i | 6];
                if (ev[i] == 4) {
                    // triangle
                    dx = null;
                    r = ev[i | 7];
                    g = ev[i | 8];
                    b = ev[i | 9];
                    a = ev[i | 10];
                } else {
                    // quad
                    dx = ev[i | 7];
                    dy = ev[i | 8]
                    r = ev[i | 9];
                    g = ev[i | 10];
                    b = ev[i | 11];
                    a = ev[i | 12];
                }

                if (a > 0) {
                    path = new Path2D();
                    path.moveTo(ax, ay);
                    path.lineTo(bx, by);
                    path.lineTo(cx, cy);
                    if (dx != null) {
                        path.lineTo(dx, dy);
                    }

                    C$game$ctx.fillStyle = C$drawing$HEXR[r] + C$drawing$HEX[g] + C$drawing$HEX[b];
                    if (a < 255) {
                        C$game$ctx.globalAlpha = a / 255;
                        C$game$ctx.fill(path);
                        C$game$ctx.globalAlpha = 1;
                    } else {
                        C$game$ctx.fill(path);
                    }
                }

                break;
            case 6:
                // images
                canvas = images[imagesIndex++][0][3];
                x = ev[i | 8];
                y = ev[i | 9];
                w = canvas.width;
                h = canvas.height;
                mask = ev[i | 1];
                if (mask == 0) {
                    // basic case
                    C$game$ctx.drawImage(canvas, 0, 0, w, h, x, y, w, h);
                } else if ((mask & 4) != 0) {
                    // rotation is involved
                    theta = ev[i | 10] / 1048576.0;
                    if ((mask & 3) == 0) {
                        C$game$ctx.save();
                        C$game$ctx.translate(x, y);
                        C$game$ctx.rotate(theta);

                        if ((mask & 8) == 0) {
                            C$game$ctx.drawImage(canvas, -w / 2, -h / 2);
                        } else {
                            C$game$ctx.globalAlpha = ev[i | 11] / 255;
                            C$game$ctx.drawImage(canvas, -w / 2, -h / 2);
                            C$game$ctx.globalAlpha = 1;
                        }
                        C$game$ctx.restore();
                    } else {
                        // TODO: slice and scale a picture and rotate it.
                    }
                } else {
                    // no rotation
                    if ((mask & 1) == 0) {
                        sx = 0;
                        sy = 0;
                        sw = w;
                        sh = h;
                    } else {
                        sx = ev[i | 2];
                        sy = ev[i | 3];
                        sw = ev[i | 4];
                        sh = ev[i | 5];
                    }
                    if ((mask & 2) == 0) {
                        tw = sw;
                        th = sh;
                    } else {
                        tw = ev[i | 6];
                        th = ev[i | 7];
                    }

                    if ((mask & 8) == 0) {
                        C$game$ctx.drawImage(canvas, sx, sy, sw, sh, x, y, tw, th);
                    } else {
                        C$game$ctx.globalAlpha = ev[i | 11] / 255;
                        C$game$ctx.drawImage(canvas, sx, sy, sw, sh, x, y, tw, th);
                        C$game$ctx.globalAlpha = 1;
                    }
                }
                break;

            case 7:
                // text

                x = ev[i | 1];
                y = ev[i | 2];
                font = C$drawing$fontsById[ev[i | 3]];
                height = ev[i | 4] / 1024.0;
                bold = ev[i | 5] == 1; 
                italic = ev[i | 6] == 1;
                r = ev[i | 7];
                g = ev[i | 8];
                b = ev[i | 9];
                a = ev[i | 10];
                // TODO: kerning ev[i | 11]
                // TODO: line height ev[i | 12]
                w = ev[i | 13];

                text = '';
                for (j = 0; j < w; ++j) {
                    text += String.fromCharCode(C$drawing$textChars[textIndex++]);
                }

                C$game$ctx.font = (italic ? 'italic ' : '') + (bold ? 'bold ' : '') + height + 'px ' + font;
                C$game$ctx.fillStyle = C$drawing$HEXR[r] + C$drawing$HEX[g] + C$drawing$HEX[b];
                if (a != 255) {
                    C$game$ctx.globalAlpha = a / 255;
                    C$game$ctx.fillText(text, x, y);
                    C$game$ctx.globalAlpha = 1;
                } else {
                    C$game$ctx.fillText(text, x, y);
                }
                break;
        }

    }
};

C$drawing$blitRotated = function (canvas, x, y, theta) {
    C$game$ctx.save();
    C$game$ctx.translate(x, y);
    C$game$ctx.rotate(theta);
    C$game$ctx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
    C$game$ctx.restore();
};

C$drawing$blitPartial = function (canvas, tx, ty, tw, th, sx, sy, sw, sh) {
  if (tw == 0 || th == 0 || sw == 0 || sh == 0) return;

  C$game$ctx.drawImage(canvas, sx, sy, sw, sh, tx, ty, tw, th);
};

C$drawing$drawImageWithAlpha = function (canvas, x, y, a) {
  if (a == 0) return;
  if (a != 255) {
      C$game$ctx.globalAlpha = a / 255;
      C$game$ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, x, y, canvas.width, canvas.height);
      C$game$ctx.globalAlpha = 1;
  } else {
      C$game$ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, x, y, canvas.width, canvas.height);
  }
};

C$drawing$fillScreen = function (r, g, b) {
    C$game$ctx.fillStyle = C$drawing$HEXR[r] + C$drawing$HEX[g] + C$drawing$HEX[b];
    C$game$ctx.fillRect(0, 0, C$game$width, C$game$height);
};

C$drawing$drawRect = function (x, y, width, height, r, g, b, a) {
    C$game$ctx.fillStyle = C$drawing$HEXR[r] + C$drawing$HEX[g] + C$drawing$HEX[b];
  if (a != 255) {
      C$game$ctx.globalAlpha = a / 255;
      C$game$ctx.fillRect(x, y, width + .1, height + .1);
      C$game$ctx.globalAlpha = 1;
  } else {
      C$game$ctx.fillRect(x, y, width + .1, height + .1);
  }
};

C$drawing$drawTriangle = function (ax, ay, bx, by, cx, cy, r, g, b, a) {
  if (a == 0) return;

  var tpath = new Path2D();
  tpath.moveTo(ax, ay);
  tpath.lineTo(bx, by);
  tpath.lineTo(cx, cy);

  C$game$ctx.fillStyle = C$drawing$HEXR[r] + C$drawing$HEX[g] + C$drawing$HEX[b];
  if (a != 255) {
      C$game$ctx.globalAlpha = a / 255;
      C$game$ctx.fill(tpath);
      C$game$ctx.globalAlpha = 1;
  } else {
      C$game$ctx.fill(tpath);
  }
};

C$drawing$drawEllipse = function (left, top, width, height, r, g, b, alpha) {
  var radiusX = width / 2;
  var radiusY = height / 2;
  var centerX = left + radiusX;
  var centerY = top + radiusY;

  radiusX = radiusX * 4 / 3; // no idea...
  C$game$ctx.beginPath();
  C$game$ctx.moveTo(centerX, centerY - radiusY);
  C$game$ctx.bezierCurveTo(
    centerX + radiusX, centerY - radiusY,
    centerX + radiusX, centerY + radiusY,
    centerX, centerY + radiusY);
  C$game$ctx.bezierCurveTo(
    centerX - radiusX, centerY + radiusY,
    centerX - radiusX, centerY - radiusY,
    centerX, centerY - radiusY);
  C$game$ctx.fillStyle = C$drawing$HEXR[r] + C$drawing$HEX[g] + C$drawing$HEX[b];
  if (alpha != 255) {
      C$game$ctx.globalAlpha = alpha / 255;
      C$game$ctx.fill();
      C$game$ctx.closePath();
      C$game$ctx.globalAlpha = 1;
  } else {
      C$game$ctx.fill();
      C$game$ctx.closePath();
  }
};

C$drawing$drawLine = function (startX, startY, endX, endY, width, r, g, b, a) {
  var offset = ((width % 2) == 0) ? 0 : .5;
  C$game$ctx.beginPath();
  C$game$ctx.moveTo(startX + offset, startY + offset);
  C$game$ctx.lineTo(endX + offset, endY + offset);
  C$game$ctx.lineWidth = width;
  if (a != 255) {
      C$game$ctx.globalAlpha = a / 255;
      C$game$ctx.strokeStyle = C$drawing$HEXR[r] + C$drawing$HEX[g] + C$drawing$HEX[b];
      C$game$ctx.stroke();
      C$game$ctx.closePath();
      C$game$ctx.globalAlpha = 1;
  } else {
      C$game$ctx.strokeStyle = C$drawing$HEXR[r] + C$drawing$HEX[g] + C$drawing$HEX[b];
      C$game$ctx.stroke();
      C$game$ctx.closePath();
  }
};

C$drawing$flipImage = function (canvas, flipX, flipY) {
  var output = document.createElement('canvas');

  output.width = canvas.width;
  output.height = canvas.height;

  var ctx = output.getContext('2d');

  if (flipX) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
  }
  if (flipY) {
      ctx.translate(0, canvas.height);
      ctx.scale(1, -1);
  }

  ctx.drawImage(canvas, 0, 0);

  if (flipX) {
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
  }
  if (flipY) {
      ctx.scale(1, -1);
      ctx.translate(0, -canvas.height);
  }

  return output;
};

C$drawing$scaleImage = function (originalCanvas, width, height) {
  var output = document.createElement('canvas');
  var ctx = output.getContext('2d');
  output.width = width;
  output.height = height;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    originalCanvas,
    0, 0, originalCanvas.width, originalCanvas.height,
    0, 0, width, height);
  return output;
};

C$drawing$fontsById = [];

C$drawing$loadFont = function (isSystem, name, id) {
    while (C$drawing$fontsById.length <= id) C$drawing$fontsById.push(null);

    if (isSystem) {
        // TODO: assume it's available. 
        // There's a horrificly hacky hack that's pretty simple to check if a font is availble that involves
        // checking the width of a div element with some text such as "IO" with the following styles applied to it:
        // font-family: "(the font)", sans-serif
        // font-family: "(the font)", monospace
        // If the sizes are the same, then it's available.
        // But for now, assume it's always available.

        C$drawing$fontsById[id] = name;
        return true;
    } else {
        // TODO: this
    }
    return false;
};

C$drawing$pushCodePoints = function (list, string) {
    var byteLength = string.length;
    var logicalLength = 0;
    var c;
    for (var i = 0; i < byteLength; ++i) {
        c = string.charCodeAt(i);
        if (c < 128) {
            list.push(c);
        } else {
            // TODO: decode UTF-8 and update i accordingly
            list.push(c);
        }
        ++logicalLength;
    }

    return logicalLength;
};



C$game = 1;

C$game$width = 0;
C$game$height = 0;
C$game$pwidth = 0;
C$game$pheight = 0;
C$game$fps = 60;
C$game$real_canvas = null;
C$game$virtual_canvas = null;
C$game$scaled_mode = false;
C$game$ctx = null;
C$game$last_frame_began = C$common$now();
C$game$execId = -1;

C$game$beginFrame = function () {
    C$game$last_frame_began = C$common$now();
};

C$game$knownSize = null;

C$game$platformSpecificEnforceFullScreen = function(jsCanvas, canvasCtx, windowSize, gameSize) {
    // TODO: make this a no-op and then move this to iOS
    jsCanvas.width = windowSize[0];
    jsCanvas.height = windowSize[1];
    canvasCtx.scale(screen[0] / gameSize[0], screen[1] / gameSize[1]);
};

C$game$getScreenDimensionsForFullScreen = function() {
  return [window.innerWidth, window.innerHeight];
};

C$game$enforceFullScreen = function() {
	var screen = C$game$getScreenDimensionsForFullScreen();
	if (C$game$knownSize === null ||
		C$game$knownSize[0] != screen[0] ||
		C$game$knownSize[1] != screen[1]) {
		
		var phsCanvas = C$game$real_canvas;
		C$game$knownSize = screen;
		C$game$platformSpecificEnforceFullScreen(phsCanvas, C$game$ctx, screen, [C$game$width, C$game$height]);
	}
};

C$game$endFrame = function() {
    if (C$game$scaled_mode) {
        C$game$real_canvas.getContext('2d').drawImage(C$game$virtual_canvas, 0, 0);
    }
    if (!!C$common$globalOptions['fullscreen']) {
		C$game$enforceFullScreen();
    }
    
    C$game$everyFrame();
    window.setTimeout(C$game$runFrame, C$game$computeDelayMillis());
};

C$game$runFrame = function () {
    C$game$beginFrame();
    v_runInterpreter(C$game$execId); // clockTick will induce endFrame()
};

C$game$computeDelayMillis = function () {
    var ideal = 1.0 / C$game$fps;
    var diff = C$common$now() - C$game$last_frame_began;
    var delay = Math.floor((ideal - diff) * 1000);
    if (delay < 1) delay = 1;
    return delay;
};

C$game$initializeGame = function (fps) {
    C$game$fps = fps;
};

C$game$pumpEventObjects = function () {
  var newEvents = [];
  var output = C$input$eventRelays;
  C$input$eventRelays = newEvents;
  return output;
};

C$game$everyFrame = function() {
// override in other platforms
};

C$game$wrapCanvasHtml = function(canvasHtml) {
    return canvasHtml;
};

// TODO: also apply keydown and mousedown handlers
// TODO: (here and python as well) throw an error if you attempt to call this twice.
C$game$initializeScreen = function (width, height, pwidth, pheight, execId) {
  var scaledMode;
  var canvasWidth;
  var canvasHeight;
  var virtualCanvas = null;
  var screenSize = C$game$enforcedScreenSize(pwidth, pheight);
  pwidth = screenSize[0];
  pheight = screenSize[1];
  if (pwidth === null || pheight === null) {
    scaledMode = false;
    canvasWidth = width;
    canvasHeight = height;
  } else {
    scaledMode = true;
    canvasWidth = pwidth;
    canvasHeight = pheight;
    virtualCanvas = document.createElement('canvas');
    virtualCanvas.width = width;
    virtualCanvas.height = height;
  }
  
  var innerHost = C$game$getCrayonHostInner();
  
  // make sure the font loader exists first so that it can hide behind the screen.
  C$game$getFontLoader();
  innerHost.innerHTML +=
	C$game$wrapCanvasHtml('<canvas id="crayon_screen" width="' + canvasWidth + '" height="' + canvasHeight + '"></canvas>') +
	'<div style="display:none;">' +
		'<img id="crayon_image_loader" crossOrigin="anonymous" />' +
		'<div id="crayon_image_loader_queue"></div>' +
		'<div id="crayon_image_store"></div>' +
		'<div id="crayon_temp_image"></div>' +
		'<div id="crayon_font_loader"></div>' +
	'</div>';
  var canvas = C$common$getElement('crayon_screen');

  C$game$scaled_mode = scaledMode;
  C$game$real_canvas = canvas;
  C$game$virtual_canvas = scaledMode ? virtualCanvas : canvas;
  C$game$ctx = canvas.getContext('2d');
  C$game$width = width;
  C$game$height = height;
  C$game$execId = execId;

  C$images$image_loader = C$common$getElement('crayon_image_loader');
  C$images$image_store = C$common$getElement('crayon_image_store');
  C$images$temp_image = C$common$getElement('crayon_temp_image');

  document.onkeydown = C$input$keydown;
  document.onkeyup = C$input$keyup;

  canvas.addEventListener('mousedown', C$input$mousedown);
  canvas.addEventListener('mouseup', C$input$mouseup);
  canvas.addEventListener('mousemove', C$input$mousemove);

  if (C$game$isMobile()) {
	canvas.ontouchstart = C$game$onTouchUpdate;
	canvas.ontouchmove = C$game$onTouchUpdate;
	canvas.ontouchcancel = C$game$onTouchUpdate;
	canvas.ontouchend = C$game$onTouchUpdate;
  }

  C$game$ctx.imageSmoothingEnabled = false;
  C$game$ctx.mozImageSmoothingEnabled = false;
  C$game$ctx.msImageSmoothingEnabled = false;
  C$game$ctx.webkitImageSmoothingEnabled = false;

  if (scaledMode) {
      C$game$ctx.scale(pwidth / width, pheight / height);
  }

  C$game$runFrame();
};

C$game$getCrayonHostInner = function() {
  var d = C$common$getElement('crayon_host_inner');
  if (!d) {
	C$common$getElement('crayon_host').innerHTML = '<div style="position:relative;" id="crayon_host_inner"></div>';
	d = C$common$getElement('crayon_host_inner');
  }
  return d;
};

C$game$getFontLoader = function() {
  var host = C$game$getCrayonHostInner();
  var id = 'crayon_font_loader_host';
  var fl = C$common$getElement(id);
  if (!fl) {
    host.innerHTML += 
      '<div style="position:absolute;left:0px;top:0px;font-size:8px" id="' + id + '">' + 
	    '<span id="crayon_font_loader_1"></span>' +
	    '<span id="crayon_font_loader_2"></span>' +
	  '</div>';
	fl = C$common$getElement(id);
  }
  return fl;
};

C$game$setTitle = function (title) {
  window.document.title = title;
};

C$game$enforcedScreenSize = function(width, height) { return [width, height]; };

C$game$screenInfo = function(o) { return false; };

window.addEventListener('keydown', function(e) {
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);

C$game$touches = {}; // { ID -> [x, y] }

C$game$onTouchUpdate= function(ev) {
  ev.preventDefault();
  C$game$touches = {};
  var w = C$game$width;
  var h = C$game$height;
  for (var i = 0; i < ev.touches.length; ++i) {
	var t = ev.touches[i];
	var c = t.target;
	var x = Math.floor(w * (t.clientX - c.clientLeft) / c.clientWidth);
	var y = Math.floor(h * (t.clientY - c.clientTop) / c.clientHeight);
	x = Math.max(0, Math.min(w - 1, x));
	y = Math.max(0, Math.min(h - 1, y));
	C$game$touches[t.identifier] = [x, y];
  }
};

C$game$getTouchState = function(data) {
	var n = 0;
	for (var key in C$game$touches) {
		var p = C$game$touches[key];
		var i = n * 3 + 1;
		data[i] = key;
		data[i + 1] = p[0];
		data[i + 2] = p[1];
		n++;
		if (n > 9) break;
	}
	data[0] = n;
};

C$game$isMobile = function() {
	return navigator.userAgent.indexOf('Mobile') !== -1;
};



C$gamepad = 1;

// devices connected but not yet flushed to the universe.
C$gamepad$queue = [];

// devices made known to the user.
C$gamepad$devices = [];

C$gamepad$support = !!navigator.getGamepads;

C$gamepad$isSupported = function () {
	return C$gamepad$support;
};

C$gamepad$refresh = function () {
	for (i = 0; i < C$gamepad$queue.length; ++i) {
		C$gamepad$devices.push(C$gamepad$queue[i]);
	}
	
	if (C$gamepad$support) {
		var gps = navigator.getGamepads();
		for (var i = 0; i < gps.length; ++i) {
			var gp = gps[i];
			if (!!gp) {
				var known = false;
				for (var j = 0; j < C$gamepad$devices.length; ++j) {
					if (gp == C$gamepad$devices[j]) {
						known = true;
						break;
					}
				}
				if (!known) {
					C$gamepad$devices.push(gp);
				}
			}
		}
	}
	
	C$gamepad$queue = [];
};

C$gamepad$getDeviceCount = function () {
    return C$gamepad$devices.length;
};

C$gamepad$getDevice = function (i) {
    return C$gamepad$devices[i];
};

C$gamepad$getName = function (device) {
  return device.id;
};

C$gamepad$getButtonCount = function (device) {
  return device.buttons.length;
};

C$gamepad$getAxisCount = function (device) {
  return device.axes.length;
};

C$gamepad$getButtonState = function (device, index) {
  return device.buttons[index].pressed;
};

C$gamepad$getAxisState = function (device, index) {
  return device.axes[index];
};

window.addEventListener("gamepadconnected", function (e) {
    C$gamepad$queue.push(e.gamepad);
});

window.addEventListener("gamepaddisconnected", function (e) {
  // ignore for now.
});



C$input = 1;
C$input$eventRelays = [];
C$input$pressedKeys = {};

C$input$mousedown = function (ev) {
    C$input$mousething(ev, true, true);
};

C$input$mouseup = function (ev) {
    C$input$mousething(ev, true, false);
};

C$input$mousemove = function (ev) {
    C$input$mousething(ev, false, 'ignored');
};

C$input$mousething = function (ev, click, down) {
    var pos = C$input$getMousePos(ev);
  var x = pos[0];
  var y = pos[1];
  var rwidth = C$game$real_canvas.width;
  var rheight = C$game$real_canvas.height;
  var vwidth = C$game$virtual_canvas.width;
  var vheight = C$game$virtual_canvas.height;

  x = Math.floor(x * vwidth / rwidth);
  y = Math.floor(y * vheight / rheight);

  if (click) {
    var rightclick = false;
    if (!ev) ev = window.event;
    if (ev.which) rightclick = (ev.which == 3);
    else if (ev.button) rightclick = (ev.button == 2);
    var button = rightclick ? 'right' : 'left';
    C$input$eventRelays.push(v_buildRelayObj(33 + (rightclick ? 2 : 0) + (down ? 0 : 1), x, y, 0, 0, ''));
  } else {
      C$input$eventRelays.push(v_buildRelayObj(32, x, y, 0, 0, ''));
  }
};

C$input$getMousePos = function (ev) {
    var obj = C$game$real_canvas;
  var obj_left = 0;
  var obj_top = 0;
  var xpos;
  var ypos;
  while (obj.offsetParent) {
    obj_left += obj.offsetLeft;
    obj_top += obj.offsetTop;
    obj = obj.offsetParent;
  }
  if (ev) {
    // Most browsers
    xpos = ev.pageX;
    ypos = ev.pageY;
  } else {
    // Legacy IE
    xpos = window.event.x + document.body.scrollLeft - 2;
    ypos = window.event.y + document.body.scrollTop - 2;
  }
  xpos -= obj_left;
  ypos -= obj_top;
  return [xpos, ypos];
};

C$input$keydown = function (ev) {
    C$input$keydownup(ev, true);
};

C$input$keyup = function (ev) {
    C$input$keydownup(ev, false);
};

C$input$keydownup = function (ev, down) {
  var keycode = ev.which ? ev.which : ev.keyCode;
  if (!!keycode) {
    if (keycode == 59) keycode = 186; // semicolon oddities different across browsers
    if (keycode == 92) keycode--; // left-windows key and right-windows key is just one enum value.
    if (keycode == 173) keycode = 189; // hyphen

    if (down && C$input$pressedKeys[keycode]) {
      // do not allow key repeats.
      return;
    }
    C$input$pressedKeys[keycode] = down;
    C$input$eventRelays.push(v_buildRelayObj(down ? 16 : 17, keycode, 0, 0, 0, ''));
  }
};



/*
A music native object is a struct-like list of 3 items.
music[0] -> audio object
music[1] -> user-given filepath
music[2] -> URL
music[3] -> is looping

*/

C$audio = 1;
C$audio$dummyAudio = new Audio();
C$audio$musicCurrent = null;
C$audio$soundObjectIndexByFilename = {};
C$audio$soundObjectsByIndex = [];

C$audio$isAudioSupported = function () {
    return C$audio$isAudioEnabled(C$audio$dummyAudio);
};

C$audio$isAudioEnabled = function (audioObj) {
    return !!C$audio$dummyAudio.canPlayType('audio/ogg');
};

C$audio$musicSetVolume = function (r) {
    if (C$audio$musicCurrent != null)
        C$audio$musicCurrent[0].volume = r;
};

C$audio$musicPlay = function (music, loop) {
    if (C$audio$musicIsPlaying()) C$audio$musicCurrent[0].pause();

    if (C$audio$isAudioEnabled(music[0])) {
    if (music[0].readyState == 2) {
      music[0].currentTime = 0;
    }
    music[3] = loop;
    C$audio$musicCurrent = music;
    music[0].play();
  }
};

C$audio$musicStop = function () {
    if (C$audio$musicIsPlaying()) C$audio$musicCurrent[0].pause();
};

C$audio$musicIsPlaying = function () {
    return C$audio$musicCurrent != null && !C$audio$musicCurrent.paused;
};

C$audio$musicLoad = function (filepath) {
    var audioObject = new Audio(C$common$jsFilePrefix + 'resources/audio/' + filepath);
  var m = [
    audioObject,
    filepath,
    filepath,
    false
  ];

  audioObject.addEventListener('ended', function () {
    if (m[3]) { // isLooping.
      this.currentTime = 0;
      this.play();
    }
  }, false);

  return m;
};

/*
  At the core of the sound mixer is a giant list of sound "structs" which are individually treated
  as the "native sound object" to the rest of the translated code.
  Each sound struct is a list composed of 3 items:
  - soundStruct[0] -> a list of JS Audio objects.
  - soundStruct[1] -> the original file name that should be used as the input to new Audio objects.
  - soundStruct[2] -> the index of this object in the overall list of sound structs.

  There is also a reverse lookup of filepaths to the index of where they are in this list.
  When a sound is being loaded, the index is looked up in the reverse lookup. If none is
  found, then a new sound struct is created with exactly 1 Audio object in it with that filename.

  When a sound struct is going to be played, the first Audio object that is not currently playing has
  its .play() method invoked. If there are no available objects, a new one is created and pushed to the
  end of the list. Servers/browsers should be smart enough to start playing this instantly with a 304.

  A channel instance is the following list-struct
  - channelStruct[0] -> soundStruct index
  - channelStruct[1] -> the current audio element that's playing
  - channelStruct[2] -> currentTime value if paused, or null if playing
  - channelStruct[3] -> current state: 0 -> playing, 1 -> paused, 2 -> stopped
*/

C$audio$prepSoundForLoading = function (filepath) {
    var index = C$audio$soundObjectIndexByFilename[filepath];
  if (index === undefined) {
      index = C$audio$soundObjectsByIndex.length;
      var data = [[new Audio(C$common$jsFilePrefix + 'resources/audio/' + filepath)], filepath, index];
    C$audio$soundObjectIndexByFilename[filepath] = index;
    C$audio$soundObjectsByIndex.push(data);
  }

  return C$audio$soundObjectsByIndex[index];
};

C$audio$stopSound = function (channel, isPause) {
  if (channel[3] == 0) {
      var s = C$audio$soundObjectsByIndex[channel[0]];
    var audio = s[0][channel[1]];
    if (!audio.ended) {
      channel[2] = audio.currentTime;
      audio.pause();
      channle[3] = isPause ? 1 : 2;
    }
  }
};

C$audio$resumeSound = function (channel) {
  if (channel[3] == 1) {
      var s = C$audio$soundObjectsByIndex[channel[0]];
      newChannel = C$audio$playSound(s[1], channel[2]); // just discard the new channel object and apply the info to the currently existing reference.
    channel[1] = newChannel[1];
    channel[3] = 0;
  }
};

C$audio$playSound = function (sound, startFrom) {
  var audioList = sound[0];
  var audio = null;
  var audioIndex = 0;
  for (var i = 0; i < audioList.length; ++i) {
    if (!audioList[i].playing) {
      audio = audioList[i];
      audioIndex = i;
      break;
    }
  }
  if (audio == null) {
    audioIndex = audioList.length;
    audio = new Audio(C$common$jsFilePrefix + sound[1]);
    audioList.push(audio);
  }
  if (C$audio$isAudioEnabled(audio)) {
    if (audio.readyState == 2) {
      audio.currentTime = startFrom;
    }
    audio.play();

    // See channel struct comment above.
    return [sound[2], audioIndex, null, 0];
  }
  return [sound[2], audioIndex, null, 2];
};


