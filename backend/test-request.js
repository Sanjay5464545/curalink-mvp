// test-request.js — run: node test-request.js
const fetch = (...args) => import('node-fetch').then(({ default: f }) => f(...args));

(async () => {
  try {
    const res = await fetch('http://127.0.0.1:4000/api/ai/parse-condition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'I have brain cancer and frequent seizures.' })
    });
    const json = await res.json();
    console.log('--- SUCCESS RESPONSE ---');
    console.log(JSON.stringify(json, null, 2));
  } catch (err) {
    console.error('--- NODE TEST ERROR ---');
    console.error(err && err.message ? err.message : err);
  }
})();
