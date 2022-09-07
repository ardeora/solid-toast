import withSolid from "rollup-preset-solid";
import { terser } from "rollup-plugin-terser";

export default withSolid({
  targets: ["esm", "cjs"],
  input: 'src/index.tsx'
});
