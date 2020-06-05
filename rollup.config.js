import html2 from "rollup-plugin-html2";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";

export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "iife",
  },
  plugins: [
    html2({
      template: "src/index.html",
    }),
    serve("dist"),
    livereload(),
  ],
};
