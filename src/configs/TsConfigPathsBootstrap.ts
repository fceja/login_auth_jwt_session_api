import * as tsConfig from "../../tsconfig.json";
import * as tsCongigPaths from "tsconfig-paths";

tsCongigPaths.register({
  baseUrl: tsConfig.compilerOptions.baseUrl,
  paths: tsConfig.compilerOptions.paths,
});
