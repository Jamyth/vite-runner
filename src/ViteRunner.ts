import yargs from 'yargs';
import { createServer } from 'vite';
import { createViteConfig } from './ViteConfiguration';
import type { UserConfig, ProxyOptions } from 'vite';
import type { ViteRunnerOptions } from './type';

export class ViteRunner {
    private readonly env = (yargs.argv as any).env || null;
    private readonly config: UserConfig;

    constructor(private readonly options: ViteRunnerOptions) {
        this.config = createViteConfig(this.env, options);
    }

    async startServer() {
        const { port = 8080, apiProxy = [], https = false } = this.options;

        const proxy: Record<string, ProxyOptions> = {};

        apiProxy.forEach(({ target, context, rewrite = (_) => _ }) => {
            const proxies = context.map(
                (ctx): Record<string, ProxyOptions> => ({
                    [ctx]: {
                        target,
                        changeOrigin: true,
                        rewrite,
                    },
                }),
            );

            proxies.forEach((_) => Object.assign(proxy, _));
        });

        const server = await createServer({
            ...this.config,
            server: {
                port,
                https,
                host: '0.0.0.0',
                proxy,
            },
        });

        await server.listen();

        server.printUrls();
    }
}
