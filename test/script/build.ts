import { ViteBuilder } from "../../src/ViteBuilder";
import path from "path";

new ViteBuilder({
    rootDirectory: path.join(__dirname, "../"),
    outDirectory: path.join(__dirname, "../build"),
    tsconfigPath: path.join(__dirname, "../config/tsconfig.src.json"),
}).build();
