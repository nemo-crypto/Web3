import { DurableObject } from 'cloudflare:workers';

const courseOrigin = 'https://nemo-crypto.github.io';
const visitorHeader = 'X-Course-Visit';
const visitorPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

export class CourseVisitCounter extends DurableObject {
  record(visitorId) {
    const storage = this.ctx.storage;
    return storage.transactionSync(() => {
      const totals = storage.kv.get('totals') ?? { visitors: 0, pageViews: 0 };
      const browserKey = `visitor:${visitorId}`;
      if (!storage.kv.get(browserKey)) {
        storage.kv.put(browserKey, true);
        totals.visitors++;
      }
      totals.pageViews++;
      storage.kv.put('totals', totals);
      return totals;
    });
  }
}

export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname !== '/visit') return new Response(null, { status: 404 });
    if (request.headers.get('Origin') !== courseOrigin) return new Response(null, { status: 403 });
    const headers = {
      'Access-Control-Allow-Origin': courseOrigin,
      'Cache-Control': 'no-store',
      'Vary': 'Origin',
    };
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: { ...headers, 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': visitorHeader },
      });
    }
    if (request.method !== 'POST') return new Response(null, { status: 405, headers });
    const visitorId = request.headers.get(visitorHeader) ?? '';
    if (!visitorPattern.test(visitorId)) return new Response(null, { status: 400, headers });
    const totals = await env.COURSE_VISITS.getByName('web3').record(visitorId);
    return Response.json(totals, { headers });
  },
};
