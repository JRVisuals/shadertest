// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default
precision mediump float;

varying vec3 a_fragColor; // <- this is coming in via the vertext shader

void main() {
// gl_FragColor is a special variable a fragment shader
// is responsible for setting
    gl_FragColor = vec4(a_fragColor, 1);
}