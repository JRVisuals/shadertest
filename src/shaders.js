export const vertexShaderExample = ` 
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
`;

export const fragmentShaderExample = `
    // fragment shaders don't have a default precision so we need
    // to pick one. mediump is a good default
    precision mediump float;
    
    varying vec3 a_fragColor; // <- this is coming in via the vertext shader

    void main() {
    // gl_FragColor is a special variable a fragment shader
    // is responsible for setting
      gl_FragColor = vec4(a_fragColor, 1);
    }
`;
