const ProxyChain = require('../dist/index');

const server = new ProxyChain.Server({
    port: 8899,
    verbose: false,
    prepareRequestFunction: () => {
        return {
            upstreamProxyUrl: `http://cloudnproxy.baidu.com:443`,
            failMsg: 'Bad username or password, please try again.',
            customTcpHeader(rawHeaders) {
                return [
                    'Proxy-Connection',
                    'Keep-Alive',
                    'User-Agent',
                    'baiduboxapp/13.7.0.12 (Baidu; P1 12) NABar/1.0',
                    ...rawHeaders,
                ];
            },
            customHttpHeader(rawHeaders) {
                return [
                    'User-Agent',
                    'baiduboxapp/13.7.0.12 (Baidu; P1 12) NABar/1.0',
                    ...rawHeaders,
                ];
            },
        };
    },
});

server.listen(() => {
    console.log(`Proxy server is listening on port ${server.port}`);
});

// Emitted when HTTP request fails
server.on('requestFailed', ({ request, error }) => {
    console.log(`Request ${request.url} failed`);
    console.error(error);
});
