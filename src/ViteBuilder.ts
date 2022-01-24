import yargs from 'yargs';
import { build } from 'vite';
import { createViteConfig } from './ViteConfiguration';
import type { UserConfig } from 'vite';
import type { ViteBuilderOptions } from './type';

export class ViteBuilder {
    private readonly env = (yargs.argv as any).env || null;
    private readonly config: UserConfig;

    constructor(private readonly options: ViteBuilderOptions) {
        this.config = createViteConfig(this.env, options);
    }

    async build() {
        const { outDirectory } = this.options;
        await build({
            ...this.config,
            build: {
                outDir: outDirectory,
                emptyOutDir: true,
            },
        });
    }
}
