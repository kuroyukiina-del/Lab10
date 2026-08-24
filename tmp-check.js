const http = require('http');
const https = require('https');

function fetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https:') ? https : http;
    const req = mod.request(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, text: data }));
    });
    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

(async () => {
  const loginRes = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@tsu.ac.th', password: '1234' })
  });
  console.log('LOGIN', loginRes.status);
  console.log(loginRes.text);

  const cookie = loginRes.headers['set-cookie']?.[0]?.split(';')[0] || '';
  console.log('COOKIE', cookie);

  const contactRes = await fetch('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookie },
    body: JSON.stringify({ name: 'Test', email: 'test@example.com', message: 'hello from test' })
  });
  console.log('CONTACT', contactRes.status);
  console.log(contactRes.text);

  const dashRes = await fetch('http://localhost:3000/dashboard', {
    headers: { Cookie: cookie }
  });
  console.log('DASHBOARD', dashRes.status);
  console.log(dashRes.text);
})();
