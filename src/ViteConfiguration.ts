import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import type { UserConfig } from "vite";
import type { ViteConfigOptions } from "./type";
import path from "path/posix";

export function createViteConfig(
    env: string | null,
    { plugins = [], tsconfigPath, pathResolver = [], rootDirectory, useReact }: ViteConfigOptions,
) {
    const tsconfigPlugin = tsconfigPath
        ? [
              tsconfigPaths({
                  projects: [tsconfigPath],
              }),
          ]
        : [];
    const reactPlugin = useReact
        ? [
              react({
                  babel: {
                      plugins: [
                          ["@babel/plugin-proposal-decorators", { legacy: true }],
                          ["@babel/plugin-proposal-class-properties", { loose: true }],
                      ],
                  },
              }),
          ]
        : [];

    return defineConfig({
        root: path.join(rootDirectory, "src"),
        publicDir: path.join(rootDirectory, "static"),
        plugins: [...plugins, ...reactPlugin, ...tsconfigPlugin],
        resolve: {
            alias: pathResolver.map(({ pattern, resolver }) => ({
                find: pattern,
                replacement: resolver(env),
            })),
        },
    }) as UserConfig;
}
