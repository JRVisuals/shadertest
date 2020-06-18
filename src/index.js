import { createShaderProgram } from './shaderCore';
import { vertexShaderExample, fragmentShaderExample } from './shaders';
import { resizeCanvasToDisplay } from './canvasUtil';

const main = () => {
    // Create a canvas element and attach it to our HTML
    const canvas = document.createElement('canvas');
    document.body.append(canvas);
    canvas.id = 'glCanvas2';
    canvas.width = 640; //window.innerWidth;
    canvas.height = 640; //window.innerHeight;
    canvas.style.backgroundColor = '#555';

    // Initialize the GL context -----
    const gl = canvas.getContext('webgl');

    // Only continue if WebGL is available and working
    if (gl === null) {
        console.errors('Unable to initialize WebGL. Your browser or machine may not support it.');
        return;
    }

    // Initialize the shader
    const shaderProgram = createShaderProgram(gl, vertexShaderExample, fragmentShaderExample);

    // identify attribute location
    const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'a_position');
    // set up a buffer - buffers are how we pass data into the gl program
    const positionBuffer = gl.createBuffer();
    // bind it to our program
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // and for colors
    const colorAttribLocation = gl.getAttribLocation(shaderProgram, 'a_vertColor');
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    // postitions array holds 3 sets of X/Y values and 3 color values RGB in series
    // prettier-ignore
    var positions = [
      // X,Y     R, G, B  
      -0.5, 0,   1, 0, 0, 
       0, 0.75,  0, 1, 0, 
       0.5, 0,   0, 0, 1];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Prep gl Canvas -------

    // Make sure our canvas is filling the screen
    resizeCanvasToDisplay(gl.canvas);

    // Map gl clip space to screen space
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // Set the canvas clear color
    gl.clearColor(0, 0, 0, 0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Use our shader program
    gl.useProgram(shaderProgram);

    // set the resolution
    // gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2; // 2 components per iteration
    var type = gl.FLOAT; // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 5 * Float32Array.BYTES_PER_ELEMENT; // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
    // Use the position pointer as a vertext array
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 3; // 3 components per iteration
    var type = gl.FLOAT; // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 5 * Float32Array.BYTES_PER_ELEMENT; // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 2 * Float32Array.BYTES_PER_ELEMENT; // start at the beginning of the buffer
    gl.vertexAttribPointer(colorAttribLocation, size, type, normalize, stride, offset);
    gl.enableVertexAttribArray(colorAttribLocation);

    // draw
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 3;
    gl.drawArrays(primitiveType, offset, count);

    // window resize
    const windowResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Map gl clip space to screen space
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        resizeCanvasToDisplay(gl.canvas);

        // Set the canvas clear color
        gl.clearColor(0, 0, 0, 0);
        // Clear the color buffer with specified clear color
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        // draw
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 3;
        gl.drawArrays(primitiveType, offset, count);
    };

    window.onresize = () => {
        windowResize();
    };
};

window.onload = main;
