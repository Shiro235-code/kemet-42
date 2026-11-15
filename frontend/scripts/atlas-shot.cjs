// Capture de l'écran des sites avec des tuiles factices servies à la place de trek.nasa.gov (réseau bloqué ici).
const { chromium } = require("playwright"); const path = require("path"); const out = process.argv[2], dest = process.argv[3] || "mars", W = +process.argv[4] || 1280, H = +process.argv[5] || 720;
(async () => {
  const b = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  const page = await (await b.newContext({ viewport: { width: W, height: H }, serviceWorkers: "block", locale: "fr-FR" })).newPage();
  const svg = (t) => `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><rect width="256" height="256" fill="#8a5a3c" stroke="#fff3" /><text x="8" y="20" fill="#fff" font-size="14">${t}</text></svg>`;
  await page.route("https://trek.nasa.gov/**", (r) => r.fulfill({ status: 200, contentType: "image/svg+xml", body: svg(r.request().url().split("/").slice(-3).join("/")) }));
  await page.goto("file://" + path.resolve("dist/index.html")); await page.waitForTimeout(1500);
  await page.evaluate(() => { const c = window.__ctrl; c.store.set({ user: { name: "t", token: "t" } }); });
  await page.evaluate((d) => { const c = window.__ctrl; c.store.set({ dest: d, env: d, phase: "site" }); }, dest); await page.waitForTimeout(1500);
  await page.screenshot({ path: `${out}/atlas_${dest}_${W}.png` }); await b.close();
})().catch((e) => { console.error(e.message.split("\n")[0]); process.exit(1); });
