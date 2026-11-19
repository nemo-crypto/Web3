import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const types = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.mjs', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
]);
const port = Number(process.env.PORT || 4173);

createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }

  let file;
  try {
    const path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    file = resolve(dist, `.${path.endsWith('/') ? `${path}index.html` : path}`);
    const parent = resolve(dist);
    if (!file.startsWith(parent + sep) || !(await stat(file)).isFile()) {
      response.writeHead(404).end('页面不存在');
      return;
    }
  } catch {
    response.writeHead(404).end('页面不存在');
    return;
  }

  response.writeHead(200, { 'Content-Type': types.get(extname(file)) || 'application/octet-stream' });
  if (request.method === 'HEAD') response.end();
  else createReadStream(file).on('error', () => response.destroy()).pipe(response);
}).listen(port, '127.0.0.1', () => console.log(`Web3 实战课程 http://localhost:${port}`));
