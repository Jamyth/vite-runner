import type { PluginOption } from 'vite';

export interface ViteConfigOptions {
    projectDirectory: string;
    tsconfigPath?: string;
    plugins?: (PluginOption | PluginOption[])[];
    pathResolver?: PathResolver[];
    useReact?: boolean;
}

export type PathResolver = {
    pattern: string;
    resolver: (env: string | null) => string;
};

export interface ViteRunnerOptions extends ViteConfigOptions {
    port?: number;
    https?: boolean;
    apiProxy?: APIProxy[];
}

export interface ViteBuilderOptions extends ViteConfigOptions {
    outDirectory: string;
}

export type APIProxy = {
    target: string;
    context: string[];
};
