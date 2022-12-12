// Always execute in strict mode (less bug)
'use strict';

/* to1DF32Array(a2DArray)
 *
 * This function turns an array of 4-element arrays a2DArray into a packed
 * 1-dimensional array of 32-bit floating-point numbers.
 *
 * NOTE: This function should not be here. It should be in your library.
 */
function to1DF32Array(a2DArray)
{
    let size = a2DArray.length;

    if(size == 0)
    {
        console.log("[alib/to1DF32Array - DEBUG]: size is 0");
        return new Float32Array([]);
    }

    // Turn 2D array into 1D array
    
    let result = [];
    let index = 0;

    for(let i = 0; i < size; i++)
    {
        let anElement = a2DArray[i];
        
        if(anElement.length != 4)
            console.log("[laib/to1DF32Array - ERROR]: Not a 4-element vector");
        
        result[index] = anElement[0];
        result[index + 1] = anElement[1];
        result[index + 2] = anElement[2];
        result[index + 3] = anElement[3];
        index += 4;
    }

    return new Float32Array(result);
}
let gl = null;
let canvas = null;
let ctm_location;
let model_view_location;
let projection_location;
let light_location;
let flash_location;
let flash_switch_location;
let flash_at_location;

let shininess_location;
let attenuation_quadratic_location;
let attenuation_linear_location;
let attenuation_constant_location;

let flash_angle_location;

function initGL(canvas)
{
    gl = canvas.getContext("webgl");
    if(!gl)
    {
        alert("WebGL is not available...");
        return -1;
    }

    // Set the clear screen color to black (R, G, B, A)
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
    // Enable hidden surface removal
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    return 0;
}
// These variables must be global variables.
// Some callback functions may need to access them.

function init()
{
    const positions = generate_positions();
    const colors = generate_colors();
    const normals = generate_normals(positions);

    let shaderProgram = initShaders(gl, "vertex-shader", "fragment-shader");
    if(shaderProgram == -1)
	return -1;
    gl.useProgram(shaderProgram)

    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER,
        16 * (positions.length + colors.length + normals.length),
        gl.STATIC_DRAW);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, to1DF32Array(positions));
    gl.bufferSubData(gl.ARRAY_BUFFER, 16 * positions.length, to1DF32Array(colors));
    gl.bufferSubData(gl.ARRAY_BUFFER, 16 * (positions.length + colors.length),
    to1DF32Array(normals));
    let vPosition_location = gl.getAttribLocation(shaderProgram, "vPosition");
    if (vPosition_location == -1)
    {
    alert("Unable to locate vPosition");
    return -1;
    }
    gl.enableVertexAttribArray(vPosition_location);
    gl.vertexAttribPointer(vPosition_location, 4, gl.FLOAT, false, 0, 0);
    let vColor_location = gl.getAttribLocation(shaderProgram, "vColor");
    if (vColor_location == -1)
    {
    alert("Unable to locate vColor");
    return -1;
    }
    gl.enableVertexAttribArray(vColor_location);
    gl.vertexAttribPointer(vColor_location, 4, gl.FLOAT, false, 0,
    16 * positions.length);
    let vNormal_location = gl.getAttribLocation(shaderProgram, "vNormal");
    if (vNormal_location == -1)
    {
    alert("Unable to locate vNormal");
    return -1;
    }
    gl.enableVertexAttribArray(vNormal_location);
    gl.vertexAttribPointer(vNormal_location, 4, gl.FLOAT, false, 0,
    16 * (positions.length + colors.length));

    ctm_location = gl.getUniformLocation(shaderProgram, "ctm");
    if (ctm_location == null){
        alert("Unable to locate ctm");
        return -1;
    }
    model_view_location = gl.getUniformLocation(shaderProgram, "model_view");
    if (model_view_location == null){
        alert("Unable to locate model_view");
        return -1;
    }
    projection_location = gl.getUniformLocation(shaderProgram, "projection");
    if (projection_location == null){
        alert("Unable to locate projection");
        return -1;
    }
    light_location = gl.getUniformLocation(shaderProgram, "light_position");
    if (light_location == null){
        alert("Unable to locate light_position");
        return -1;
    }
    flash_location = gl.getUniformLocation(shaderProgram, "flash_position");
    if (flash_location == null){
        alert("Unable to locate flash_position");
        return -1;
    }
    shininess_location = gl.getUniformLocation(shaderProgram, "shininess");
    if (shininess_location == null){
        alert("Unable to locate shininess_location");
        return -1;
    }
    attenuation_quadratic_location = gl.getUniformLocation(shaderProgram, "attenuation_quadratic");
    if (attenuation_quadratic_location == null){
        alert("Unable to locate attenuation_quadratic_location");
        return -1;
    }
    attenuation_linear_location = gl.getUniformLocation(shaderProgram, "attenuation_linear");
    if (attenuation_linear_location == null){
        alert("Unable to locate attenuation_linear_location");
        return -1;
    }
    attenuation_constant_location = gl.getUniformLocation(shaderProgram, "attenuation_constant");
    if (attenuation_constant_location == null){
        alert("Unable to locate attenuation_constant_location");
        return -1;
    }
    flash_angle_location = gl.getUniformLocation(shaderProgram, "flash_angle");
    if (flash_angle_location == null){
        alert("Unable to locate flash_angle_location");
        return -1;
    }
    flash_at_location = gl.getUniformLocation(shaderProgram, "flash_at");
    if (flash_at_location == null){
        alert("Unable to locate flash_at_location");
        return -1;
    }
    flash_switch_location = gl.getUniformLocation(shaderProgram, "flash_switch");
    if (flash_switch_location == null){
        alert("Unable to locate flash_switch_location");
        return -1;
    }
    return 0;
}
const roundness = 72;
const generate_positions = () => {
    const positions = [];
    // plate model
    positions.push(...cylin_pos(roundness).map(x => m4_mult_v(m4_mult_m(
        m4_move(0, -0.1, 0), m4_sca(18, 0.2, 18)), x)));
    // base model
    positions.push(...cylin_pos(roundness).map(x => m4_mult_v(m4_mult_m(
        m4_move(0, 0.5, 0), m4_sca(1.25, 1, 1.25)), x)));
    // Arm0 model
    positions.push(...cylin_pos(roundness).map(x => m4_mult_v(m4_mult_m(
        m4_move(0, 1, 0), m4_sca(0.75, 2, 0.75)), x)));
    // joint model
    positions.push(...cylin_pos(roundness).map(x => m4_mult_v(m4_mult_m(
        m4_rotX(Math.PI/2), m4_sca(1, 2, 1)), x)));
    // Arm1 model
    positions.push(...cylin_pos(roundness).map(x => m4_mult_v(m4_mult_m(
        m4_move(0, 2, 0), m4_sca(0.75, 4, 0.75)), x)));
    // Arm2 model
    positions.push(...cylin_pos(roundness).map(x => m4_mult_v(m4_mult_m(
        m4_move(0, 2, 0), m4_sca(0.75, 4, 0.75)), x)));
    // Arm3 model
    positions.push(...cylin_pos(roundness).map(x => m4_mult_v(m4_mult_m(
        m4_move(0, 1, 0), m4_sca(0.75, 2, 0.75)), x)));
    // wrist model
    positions.push(...cylin_pos(roundness).map(x => m4_mult_v(m4_sca(1, 0.5, 1), x)));
    // palm model
    positions.push(...cube_pos().map(x => m4_mult_v(m4_mult_m(
        m4_move(0, 0.5, 0), m4_sca(0.5, 0.5, 2)), x)));
    // finger models
    positions.push(...cube_pos().map(x => m4_mult_v(m4_sca(0.4, 1, 0.4), x)));

    //sphere, torus, cone, cylinder
    positions.push(...sphere_pos(roundness).map(x => m4_mult_v(m4_mult_m(
        m4_move(15,1.5,0), m4_sca(3,3,3)), x)));
    positions.push(...cone_pos(roundness).map(x => m4_mult_v(m4_mult_m(
        m4_move(-15,0,0), m4_sca(3,3,3)), x)));
    positions.push(...torus_pos(roundness).map(x => m4_mult_v(m4_mult_m(m4_mult_m(
        m4_move(0,1.5,15), m4_rotX(Math.PI/2)), m4_sca(3,3,3)), x)));
    positions.push(...cube_pos(roundness).map(x => m4_mult_v(m4_mult_m(
        m4_move(0,1.5,-15), m4_sca(3,3,3)), x)));
    return positions;
}
const generate_colors = () => {
    const colors = [
        ...plate_colors(1, roundness),
        ...arm_cylin_colors(7, roundness), 
        ...arm_cube_colors(2), 
        ...sphere_colors(1, roundness),
        ...cone_colors(1, roundness),
        ...torus_colors(1, roundness),
        ...cube_colors(1),
    ];
    return colors;
}
const generate_normals = (positions) => {
    const normals = [];
    for(let i = 0; i < positions.length; i += 3) {
        let vec1 = v4_sub(positions[i+1], positions[i]);
        let vec2 = v4_sub(positions[i+2], positions[i]);
        let normal = v4_nor(v4_cro(vec1, vec2));
        normals.push(normal);
        normals.push(normal);
        normals.push(normal);
    }
    return normals;
}

let model_view, projection, light, flash_switch;

let joint_ctms = [
    [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],
    [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],
    m4_move(0, 2.0, 0),
    m4_move(0, 4.0, 0),
    m4_move(0, 4.0, 0),
    m4_move(0, 2.25, 0),
];
let finger_ctms = [
    m4_move(0, 1.25, 0.2),
    m4_move(0, 1.25,-0.2),
];

function display()
{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const cube = 36;
    const cylin = roundness*4*3;
    const sphere = roundness*(roundness-2)*3;
    const cone = roundness*6;
    const torus = roundness*roundness*6;
    gl.uniform1f(shininess_location, 20.0);
    gl.uniform1f(attenuation_quadratic_location, 0.002);
    gl.uniform1f(attenuation_linear_location, 0.002);
    gl.uniform1f(attenuation_constant_location, 0.002);
    gl.uniformMatrix4fv(model_view_location, false, to1DF32Array(model_view));
    gl.uniformMatrix4fv(projection_location, false, to1DF32Array(projection));
    gl.uniform4fv(light_location, new Float32Array(light));

    const hierarchy_ctms = [];
    hierarchy_ctms.push(joint_ctms[0]);
    for (let i = 0; i<joint_ctms.length-1; i++) {
        hierarchy_ctms.push(m4_mult_m(hierarchy_ctms[i], joint_ctms[i+1]));
    }

    const flash = m4_mult_v(m4_mult_m(
        hierarchy_ctms[4], m4_move(0,2.75,0)), [0,0,0,1]);
    gl.uniform4fv(flash_location, new Float32Array(flash));
    const flash_at = m4_mult_v(m4_mult_m(
        hierarchy_ctms[4], m4_move(0,2.75,0)), [0,1,0,0]);
    // console.log(flash_at);
    gl.uniform4fv(flash_location, new Float32Array(flash));
    gl.uniform4fv(flash_at_location, new Float32Array(flash_at));
    gl.uniform1f(flash_angle_location, 1);// theta 57 deg
    gl.uniform1f(flash_switch_location, flash_switch);


    gl.uniformMatrix4fv(ctm_location, false, to1DF32Array(hierarchy_ctms[0]));
    gl.drawArrays(gl.TRIANGLES, 0, cylin*3);
    // joints
    for (let i = 2; i < hierarchy_ctms.length-1; i++) {
        gl.uniformMatrix4fv(ctm_location, false, to1DF32Array(hierarchy_ctms[i]));
        gl.drawArrays(gl.TRIANGLES, cylin*3, cylin);
        gl.uniformMatrix4fv(ctm_location, false, to1DF32Array(hierarchy_ctms[i]));
        gl.drawArrays(gl.TRIANGLES, cylin*(3+i-1), cylin);
    }
    // wrist, palm
    gl.uniformMatrix4fv(ctm_location, false, to1DF32Array(hierarchy_ctms[5]));
    gl.drawArrays(gl.TRIANGLES, cylin*7, cylin+cube);
    // fingers 
    gl.uniformMatrix4fv(ctm_location, false, to1DF32Array(
        m4_mult_m(hierarchy_ctms[5], finger_ctms[0])));
    gl.drawArrays(gl.TRIANGLES, cylin*8+cube, cube);
    gl.uniformMatrix4fv(ctm_location, false, to1DF32Array(
        m4_mult_m(hierarchy_ctms[5], finger_ctms[1])));
    gl.drawArrays(gl.TRIANGLES, cylin*8+cube, cube);
    // side sphere
    gl.uniformMatrix4fv(ctm_location, false, to1DF32Array(hierarchy_ctms[0]));
    gl.drawArrays(gl.TRIANGLES, cylin*8+cube*2, sphere);
    // side cone
    gl.uniformMatrix4fv(ctm_location, false, to1DF32Array(hierarchy_ctms[0]));
    gl.drawArrays(gl.TRIANGLES, cylin*8+cube*2+sphere, cone);
    // side torus
    gl.uniformMatrix4fv(ctm_location, false, to1DF32Array(hierarchy_ctms[0]));
    gl.drawArrays(gl.TRIANGLES, cylin*8+cube*2+sphere+cone, torus);
    // side cube
    gl.uniformMatrix4fv(ctm_location, false, to1DF32Array(hierarchy_ctms[0]));
    gl.drawArrays(gl.TRIANGLES, cylin*8+cube*2+sphere+cone+torus, cube);
}

function main()
{
    canvas = document.getElementById("gl-canvas");
    if(initGL(canvas) == -1)
	return -1;
    if(init() == -1)
	return -1;
    model_view = camera(0,0,0);
    projection = frustum(-2.0, 2.0, -2.0, 2.0, -4.0, -100.0);
    //projection = ortho(-15.0, 15.0, -15.0, 15.0, 60.0, -60.0);
    flash_switch = 0;
    display();
    document.onkeydown = keyDownCallback;
}


const keyDownCallback =  (
    () => {
    let finger_far = 0.2;
    let rot = 0;
    let arm1 = 0;
    let arm2 = 0;
    let arm3 = 0;
    let wrist = 0;
    return (event) => {
        // space, flash_switch
        if (event.keyCode === 32) {
            flash_switch = (flash_switch + 1) % 2;
        }
        // camera
        // left
        if (event.keyCode === 37) {
            model_view = camera(0,-0.1, 0);
        }
        // right
        if (event.keyCode === 39) {
            model_view = camera(0, 0.1, 0);
        }
        // up
        if (event.keyCode === 38) {
            model_view = camera(0.1, 0, 0);
        }
        // down
        if (event.keyCode === 40) {
            model_view = camera(-0.1,0, 0);
        }
        // PageUp
        if (event.keyCode === 33) {
            model_view = camera(0, 0, 1);
        }
        // PageDown
        if (event.keyCode === 34) {
            model_view = camera(0, 0,-1);
        }

        // Z
        if (event.keyCode === 90) {
            rot -= 0.03;
            joint_ctms[1] = m4_rotY(rot);
        }
        // X
        if (event.keyCode === 88) {
            rot += 0.03;
            joint_ctms[1] = m4_rotY(rot);
        }
        // Q
        if (event.keyCode === 81) {
            arm1 += 0.03;
            joint_ctms[2] = m4_mult_m(
                m4_move(0,2,0), m4_rotZ(arm1));
        }
        // A
        if (event.keyCode === 65) {
            arm1 -= 0.03;
            joint_ctms[2] = m4_mult_m(
                m4_move(0,2,0),m4_rotZ(arm1));
        }
        // W
        if (event.keyCode === 87) {
            arm2 += 0.03;
            joint_ctms[3] = m4_mult_m(
                m4_move(0,4,0), m4_rotZ(arm2));
        }
        // S
        if (event.keyCode === 83) {
            arm2 -= 0.03;
            joint_ctms[3] = m4_mult_m(m4_move(0,4,0),m4_rotZ(arm2));
        }
        // E
        if (event.keyCode === 69) {
            arm3 += 0.03;
            joint_ctms[4] = m4_mult_m(m4_move(0,4,0),m4_rotZ(arm3));
        }
        // D
        if (event.keyCode === 68) {
            arm3 -= 0.03;
            joint_ctms[4] = m4_mult_m(m4_move(0,4,0),m4_rotZ(arm3));
        }
        // wrist
        // R
        if (event.keyCode === 82) {
            wrist += 0.03;
            joint_ctms[5] = m4_mult_m(m4_move(0,2.25,0),m4_rotY(wrist));
        }
        // F
        if (event.keyCode === 70) {
            wrist -= 0.03;
            joint_ctms[5] = m4_mult_m(m4_move(0,2.25,0),m4_rotY(wrist));
        }
        // fingers
        // T
        if (event.keyCode === 84) {
            finger_far += 0.02;
            finger_ctms[0] = m4_move(0,1.25, finger_far);
            finger_ctms[1] = m4_move(0,1.25,-finger_far);
        }
        // G
        if (event.keyCode === 71) {
            finger_far -= 0.02;
            finger_ctms[0] = m4_move(0,1.25, finger_far);
            finger_ctms[1] = m4_move(0,1.25,-finger_far);
        }
        display();
    }
})();

const camera = (
    () => {
    const theta_max = 1.5 // around 86 deg
    let camera_rad = 40;
    let theta = 0.5;
    let phi = Math.PI/4;
    // default view
    let eye= [-24.82,-19.18,-24.82, 1.0];
    let at = [ 24.82, 19.18, 24.82, 0.0];
    let up = [0.0, 1.0, 0.0, 0.0];
    light = [-eye[0], -eye[1], -eye[2], 1.0];
    // // front view
    // let eye = [0.0, 0.0, -40.0, 1.0];
    // let at  = [0.0, 0.0, 1.0, 0.0];
    // let up  = [0.0, 1.0, 0.0, 0.0];
    // // top view
    // let eye = [0.0, -40.0, 0.0, 1.0];
    // let at  = [0.0, 1.0, 0.0, 0.0];
    // let up  = [0.0, 0.0, -1.0, 0.0];
    return (d_theta, d_phi, d_rad) => {
        if (camera_rad+d_rad > 7 && camera_rad+d_rad < 60) {
            camera_rad += d_rad;
        }
        
        if (Math.abs(theta + d_theta) <= theta_max) {
            phi += d_phi;
            theta += d_theta;
            eye = [
                camera_rad 
                    * Math.sin(Math.PI/2 - theta)
                    * Math.sin(phi + Math.PI),
                -camera_rad
                    * Math.cos(Math.PI/2-theta),
                camera_rad
                    * Math.sin(Math.PI/2-theta)
                    * Math.cos(phi+Math.PI),
                1.0,
            ]
            at = [-eye[0], -eye[1], -eye[2], 0.0];
        }
        light = [-eye[0], -eye[1], -eye[2], 1.0];
        return look_at(eye, at, up);
    }
})();