// an attribute will receive data from a buffer
// basically a variable we can set from outside the shader program
attribute vec2 a_position;

attribute vec3 a_vertColor; // <- attributes are inputs to the vertex shader
varying vec3 a_fragColor; // <- varyings are outputs from the vertext shader to the fragment shader

//uniform vec2 u_resolution;

void main() {
    a_fragColor = a_vertColor; // <- sets this on the fragment shader
    gl_Position = vec4(a_position, 0 ,1);
}