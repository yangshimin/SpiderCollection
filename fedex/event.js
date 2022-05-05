// x 表示鼠标的x坐标
// y 表示鼠标的y坐标
// MaxOffsetX 表示鼠标指针位置相对于触发事件的对象的 x 坐标的最大取值范围。
// MaxOffsetY 表示鼠标指针位置相对于触发事件的对象的 y 坐标的最大取值范围。

let RobotEvent = function(){
    this.refresh_page_time = new Date().getTime();
    this.browser_nav_top = 103;   // 浏览器导航栏部分的高度
    this.browser_page_offset = 100;  // pageY与Y的差值
};

// event template
let mousemove_event = {
    isTrusted: true,
    altKey: false,
    bubbles: true,
    button: 0,
    buttons: 0,
    cancelBubble: false,
    cancelable: true,
    clientX: "",   // 需要赋值
    clientY: "",   // 需要赋值
    composed: true,
    ctrlKey: false,
    currentTarget: null,
    defaultPrevented: false,
    detail: 0,
    eventPhase: 0,
    fromElement: null,
    layerX: "",   // 需要赋值
    layerY: "",   // 需要赋值
    metaKey: false,
    movementX: "",
    movementY: "",
    offsetX: "",   // 需要赋值
    offsetY: "",   // 需要赋值
    pageX: "",   // 需要赋值
    pageY: "",   // 需要赋值
    relatedTarget: null,
    returnValue: true,
    screenX: "",
    screenY: "",
    shiftKey: false,
    sourceCapabilities: "",
    srcElement: {},
    target: {},
    timeStamp: "",  // 需要赋值
    toElement: "",
    type: "mousemove",
    view: "",
    which: 0,
    x: "",  // 需要赋值
    y: "",  // 需要赋值
};
let mousedown_event = {
    isTrusted: true,
    altKey: false,
    bubbles: true,
    button: 0,
    buttons: 1,
    cancelBubble: false,
    cancelable: true,
    clientX: "",    // 需要赋值
    clientY: "",    // 需要赋值
    composed: true,
    ctrlKey: false,
    currentTarget: null,
    defaultPrevented: false,
    detail: 1,
    eventPhase: 0,
    fromElement: null,
    layerX: "",      // 需要赋值
    layerY: "",      // 需要赋值
    metaKey: false,
    movementX: "",    // 需要赋值
    movementY: "",   // 需要赋值
    offsetX: "",    // 需要赋值
    offsetY: "",   // 需要赋值
    pageX: "",    // 需要赋值
    pageY: "",   // 需要赋值
    path: {},
    relatedTarget: null,
    returnValue: true,
    screenX: 520,
    screenY: 514,
    shiftKey: false,
    sourceCapabilities: {},
    srcElement: {},
    target: {},
    timeStamp: "",   // 需要赋值
    toElement: {},
    type: "mousedown",
    view: {},
    which: 1,
    x: "",    // 需要赋值
    y: "",    // 需要赋值
};
let mouseup_event = {
    isTrusted: true,
    altKey: false,
    bubbles: true,
    button: 0,
    buttons: 0,
    cancelBubble: false,
    cancelable: true,
    clientX: "",    // 需要赋值
    clientY: "",    // 需要赋值
    composed: true,
    ctrlKey: false,
    currentTarget: null,
    defaultPrevented: false,
    detail: 1,
    eventPhase: 0,
    fromElement: null,
    layerX: "",   // 需要赋值
    layerY: "",   // 需要赋值
    metaKey: false,
    movementX: 0,
    movementY: 0,
    offsetX: "",    // 需要赋值
    offsetY: "",   // 需要赋值
    pageX: "",    // 需要赋值
    pageY: "",    // 需要赋值
    path: {},
    relatedTarget: null,
    returnValue: true,
    screenX: "",    // 需要赋值
    screenY: "",    // 需要赋值
    shiftKey: false,
    sourceCapabilities: {},
    srcElement: {},
    target: {},
    timeStamp: "",   // 需要赋值
    toElement: {},
    type: "mouseup",
    view: {},
    which: 1,
    x: "",   // 需要赋值
    y: "",   // 需要赋值
}
let pointerdown_event = {
    isTrusted: true,
    altKey: false,
    altitudeAngle: "",
    azimuthAngle: 0,
    bubbles: true,
    button: 0,
    buttons: 1,
    cancelBubble: false,
    cancelable: true,
    clientX: "",   // 需要赋值
    clientY: "",   // 需要赋值
    composed: true,
    ctrlKey: false,
    currentTarget: null,
    defaultPrevented: false,
    detail: 0,
    eventPhase: 0,
    fromElement: null,
    height: 1,
    isPrimary: true,
    layerX: "",    // 需要赋值
    layerY: "",    // 需要赋值
    metaKey: false,
    movementX: 0,
    movementY: 0,
    offsetX: "",   // 需要赋值
    offsetY: "",   // 需要赋值
    pageX: "",    // 需要赋值
    pageY: "",   // 需要赋值
    path: {},
    pointerId: 1,
    pointerType: "mouse",
    pressure: 0.5,
    relatedTarget: null,
    returnValue: true,
    screenX: "",   // 需要赋值
    screenY: "",   // 需要赋值
    shiftKey: false,
    sourceCapabilities: null,
    srcElement: {},
    tangentialPressure: 0,
    target: {},
    tiltX: 0,
    tiltY: 0,
    timeStamp: "",   // 需要赋值
    toElement: null,
    twist: 0,
    type: "pointerdown",
    view: {},
    which: 1,
    width: 1,
    x: "",   // 需要赋值
    y: "",   // 需要赋值
};
let pointerup_event = {
    isTrusted: true,
    altKey: false,
    altitudeAngle: 1.5707963267948966,
    azimuthAngle: 0,
    bubbles: true,
    button: 0,
    buttons: 0,
    cancelBubble: false,
    cancelable: true,
    clientX: "",    // 需要赋值
    clientY: "",    // 需要赋值
    composed: true,
    ctrlKey: false,
    currentTarget: null,
    defaultPrevented: false,
    detail: 0,
    eventPhase: 0,
    fromElement: null,
    height: 1,
    isPrimary: true,
    layerX: "",     // 需要赋值
    layerY: "",     // 需要赋值
    metaKey: false,
    movementX: 0,
    movementY: 0,
    offsetX: "",    // 需要赋值
    offsetY: "",   // 需要赋值
    pageX: "",    // 需要赋值
    pageY: "",    // 需要赋值
    path: {},
    pointerId: 1,
    pointerType: "mouse",
    pressure: 0,
    relatedTarget: null,
    returnValue: true,
    screenX: "",    // 需要赋值
    screenY: "",    // 需要赋值
    shiftKey: false,
    sourceCapabilities: null,
    srcElement: {},
    tangentialPressure: 0,
    target: {},
    tiltX: 0,    // 需要赋值
    tiltY: 0,    // 需要赋值
    timeStamp: "",
    toElement: null,
    twist: 0,
    type: "pointerup",
    view: {},
    which: 1,
    width: 1,
    x: "",    // 需要赋值
    y: "",    // 需要赋值
};
let click_event = {
    isTrusted: true,
    altKey: false,
    altitudeAngle: "",
    azimuthAngle: 0,
    bubbles: true,
    button: 0,
    buttons: 0,
    cancelBubble: false,
    cancelable: true,
    clientX: "",
    clientY: "",
    composed: true,
    ctrlKey: false,
    currentTarget: null,
    defaultPrevented: false,
    detail: 1,
    eventPhase: 0,
    fromElement: null,
    height: 1,
    isPrimary: false,
    layerX: "",
    layerY: "",
    metaKey: false,
    movementX: 0,
    movementY: 0,
    offsetX: "",
    offsetY: "",
    pageX: "",
    pageY: "",
    path: {},
    pointerId: 1,
    pointerType: "mouse",
    pressure: 0,
    relatedTarget: null,
    returnValue: true,
    screenX: "",
    screenY: "",
    shiftKey: false,
    sourceCapabilities: {},
    srcElement: {},
    tangentialPressure: 0,
    target: {},
    tiltX: 0,
    tiltY: 0,
    timeStamp: "",
    toElement: null,
    twist: 0,
    type: "click",
    view: {},
    which: 1,
    width: 1,
    x: "",
    y: "",
};
let keydown_event = {
    isTrusted: true,
    bubbles: true,
    cancelBubble: false,
    cancelable: false,
    composed: false,
    currentTarget: null,
    defaultPrevented: false,
    eventPhase: 0,
    path: {},
    returnValue: true,
    srcElement: {},
    target: {},
    timeStamp: "",   // 需要赋值
    type: "keydown",
};
let keyup_event = {
    isTrusted: true,
    bubbles: true,
    cancelBubble: false,
    cancelable: false,
    composed: false,
    currentTarget: null,
    defaultPrevented: false,
    eventPhase: 0,
    path: {},
    returnValue: true,
    srcElement: {},
    target: {},
    timeStamp: "",
    type: "keyup",    // 需要赋值
};
let devicemotion_event = {
    isTrusted: true,
    acceleration: {x: null, y: null, z: null},
    accelerationIncludingGravity: {x: null, y: null, z: null},
    bubbles: false,
    cancelBubble: false,
    cancelable: false,
    composed: false,
    currentTarget: {},
    defaultPrevented: false,
    eventPhase: 0,
    interval: 16,
    path: {},
    returnValue: true,
    rotationRate: {alpha: null, beta: null, gamma: null},
    srcElement: {},
    target: {},
    timeStamp: "",     // 需要赋值
    type: "devicemotion",
};
let deviceorientation_event = {
    isTrusted: true,
    absolute: false,
    alpha: null,
    beta: null,
    bubbles: false,
    cancelBubble: false,
    cancelable: false,
    composed: false,
    currentTarget: {},
    defaultPrevented: false,
    eventPhase: 0,
    gamma: null,
    path: {},
    returnValue: true,
    srcElement: {},
    target: {},
    timeStamp: "",   // 需要赋值
    type: "deviceorientation",
};
let focus_event = {
    isTrusted: true,
    bubbles: false,
    cancelBubble: false,
    cancelable: false,
    composed: false,
    currentTarget: {},
    defaultPrevented: false,
    eventPhase: 0,
    path: {},
    returnValue: true,
    srcElement: {},
    target: {},
    timeStamp: "", // 需要赋值
    type: "focus",
};
let onblur_event = {
    isTrusted: true,
    bubbles: false,
    cancelBubble: false,
    cancelable: false,
    composed: false,
    currentTarget: {},
    defaultPrevented: false,
    eventPhase: 0,
    path: {},
    returnValue: true,
    srcElement: {},
    target: {},
    timeStamp: "", // 需要赋值
    type: "blur"
};

RobotEvent.prototype.mousemove_to = function (x1, y1, x2, y2){
    // 暂时还未实现
}

RobotEvent.prototype.get_devicemotion = function(){
    return this.generate_devicemotion_deviceorientation_event("devicemotion")
}

RobotEvent.prototype.get_deviceorientation = function(){
    return this.generate_devicemotion_deviceorientation_event("deviceorientation")
}

RobotEvent.prototype.get_focus = function(){
    return this.generate_focus_blur_event("focus");
}

RobotEvent.prototype.get_onblur = function(){
    return this.generate_focus_blur_event("blur");
}



RobotEvent.prototype.get_click = function (x, y, max_offsetX, max_offsetY, targetEle){
    let click_event_temp = click_event;
    return this.set_event_value(click_event_temp, x, y, max_offsetX, max_offsetY, targetEle)
}

RobotEvent.prototype.get_pointerdown = function (x, y, max_offsetX, max_offsetY){
    return this.generate_pointer_event(x, y, max_offsetX, max_offsetY, "pointerdown");
}

RobotEvent.prototype.get_pointerup = function (x, y, max_offsetX, max_offsetY){
    return this.generate_pointer_event(x, y, max_offsetX, max_offsetY, "pointerup");
}

RobotEvent.prototype.get_keydown = function (){
    return this.generate_key_event('keydown');
}

RobotEvent.prototype.get_keyup = function (){
    return this.generate_key_event('keyup');
}

RobotEvent.prototype.get_mousedown = function (x, y, max_offsetX, max_offsetY, targetEle){
    return this.generate_mouse_down_up_event(x, y, max_offsetX, max_offsetY, "mousedown", targetEle);
}

RobotEvent.prototype.get_mouseup = function (x, y, max_offsetX, max_offsetY, targetEle){
    return this.generate_mouse_down_up_event(x, y, max_offsetX, max_offsetY, "mouseup", targetEle);
}

RobotEvent.prototype.generate_mouse_down_up_event = function (x, y, max_offsetX, max_offsetY, mouse_type, targetEle){
    let mouse_event_temp = {};
    if (mouse_type === "mousedown"){
        mouse_event_temp = mousedown_event;
    }else if (mouse_type === "mouseup"){
        mouse_event_temp = mouseup_event;
    }

    return this.set_event_value(mouse_event_temp, x, y, max_offsetX, max_offsetY, targetEle);
}

RobotEvent.prototype.generate_pointer_event = function (x, y, max_offsetX, max_offsetY, pointer_type){
    let pointer_event_temp = {};
    if (pointer_type === "pointerdown"){
        pointer_event_temp = pointerdown_event;
    }else if (pointer_type === "pointerup"){
        pointer_event_temp = pointerup_event;
    }

    return this.set_event_value(pointer_event_temp, x, y, max_offsetX, max_offsetY);
}

RobotEvent.prototype.generate_key_event = function (key_event_type){
    let key_event_temp = {};
    if (key_event_type === "keydown"){
        key_event_temp = keydown_event;
    }else if (key_event_type === "keyup"){
        key_event_temp = keyup_event;
    }

    let local_time =  new Date().getTime();
    key_event_temp['timeStamp'] = local_time - this.refresh_page_time;
    return key_event_temp;
}

RobotEvent.prototype.generate_devicemotion_deviceorientation_event = function (emotion_event){
    let emotion_event_temp = {};
    if (emotion_event === "devicemotion"){
        emotion_event_temp = devicemotion_event;
    }else if (emotion_event === "deviceorientation"){
        emotion_event_temp = deviceorientation_event;
    }

    let local_time =  new Date().getTime();
    emotion_event_temp['timeStamp'] = local_time - this.refresh_page_time;
    return emotion_event_temp;
}

RobotEvent.prototype.generate_focus_blur_event = function (focus_blur_event){
    let focus_blur_event_temp = {};
    if (focus_blur_event === "focus"){
        focus_blur_event_temp = focus_event;
    }else if (focus_blur_event === "blur"){
        focus_blur_event_temp = onblur_event;
    }

    let local_time =  new Date().getTime();
    focus_blur_event_temp['timeStamp'] = local_time - this.refresh_page_time;
    return focus_blur_event_temp;
}

RobotEvent.prototype.set_browser_property = function (browser_nav_top, browser_page_offset){
    this.browser_nav_top = browser_nav_top;   // 浏览器导航栏部分的高度
    this.browser_page_offset = browser_page_offset;  // pageY与Y的差值
}

RobotEvent.prototype.set_event_value = function (obj, x, y, max_offsetX, max_offsetY, targetEle){
    obj['x'] = x;
    obj['y'] = y;
    obj['clientX'] = x;
    obj['clientY'] = y;
    obj['screenX'] = x;
    obj['screenY'] = y + this.browser_nav_top;
    obj['pageX'] = x;
    obj['pageY'] = y + this.browser_page_offset;
    obj['offsetX'] = getRndInteger(1, max_offsetX);
    obj['offsetY'] = getRndInteger(1, max_offsetY);
    let local_time =  new Date().getTime();
    obj['timeStamp'] = local_time - this.refresh_page_time;
    if (targetEle !== undefined) {
        obj['toElement'] = targetEle;
        obj['target'] = targetEle;
    }
    return obj;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min + 1;
}


module.exports = {
    RobotEvent
}