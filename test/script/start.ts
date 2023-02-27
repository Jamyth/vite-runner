import { ViteRunner } from "../../src/ViteRunner";
import path from "path";

new ViteRunner({
    rootDirectory: path.join(__dirname, "../"),
    tsconfigPath: path.join(__dirname, "../config/tsconfig.src.json"),
    port: 8080,
    https: true,
    useReact: false,
}).startServer();
