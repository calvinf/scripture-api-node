// rollup.config.js
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import builtins from "builtin-modules";
import path from "path";
import cleaner from "rollup-plugin-cleaner";
import tsPlugin from "rollup-plugin-typescript2";
import ttypescript from "ttypescript";

const build = path.resolve(__dirname, "lib");

export default {
  input: "src/index.ts",
  external: builtins,
  plugins: [
    cleaner({
      targets: [build],
    }),

    // resolve modules, allow commonjs and json imports
    resolve(),
    commonjs(),

    // typescript plugin
    tsPlugin({
      typescript: ttypescript,
    }),
  ],
  output: [
    {
      file: path.join(build, "index.js"),
      format: "cjs",
      sourcemap: true,
    },
    {
      file: path.join(build, "index.esm.js"),
      format: "es",
      sourcemap: true,
    },
  ],
};
