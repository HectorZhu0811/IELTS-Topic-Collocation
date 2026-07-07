const http = require("http");

const modelName = "Basic";

const css = String.raw`
.card {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: #f6f2ea;
  color: #202124;
  font-family: Inter, "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, "Noto Sans SC", "Microsoft YaHei", sans-serif;
  text-align: left;
}
.tc-shell {
  --topic: #2563eb;
  --accent: #38bdf8;
  box-sizing: border-box;
  height: 100vh;
  min-height: 0;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 10px;
  padding: clamp(10px, 1.5vw, 18px) clamp(14px, 3vw, 34px) clamp(12px, 1.8vw, 20px);
  overflow: hidden;
  color: #202124;
  background: linear-gradient(120deg, color-mix(in srgb, var(--topic), transparent 93%), transparent 32%), linear-gradient(240deg, color-mix(in srgb, var(--accent), transparent 92%), transparent 34%), #f6f2ea;
}
.tc-page-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: min(96vw, 1380px);
  justify-self: center;
}
.tc-topic-kicker {
  color: var(--topic);
  font-size: 11px;
  font-weight: 950;
  line-height: 1.15;
  text-transform: uppercase;
}
.tc-topic-name {
  margin-top: 2px;
  color: #202124;
  font-size: clamp(24px, 2.35vw, 34px);
  line-height: 0.98;
  font-weight: 950;
}
.tc-topic-subtle {
  color: #69645b;
  font-size: 12px;
  font-weight: 850;
  margin-top: 4px;
}
.tc-frame {
  width: min(96vw, 1380px);
  min-height: 0;
  height: 100%;
  display: grid;
  gap: clamp(12px, 1.8vw, 22px);
  justify-self: center;
  align-self: stretch;
}
.tc-single {
  min-height: 0;
  height: 100%;
}
.tc-two {
  grid-template-columns: minmax(0, 1.28fr) minmax(340px, 0.92fr);
  align-items: stretch;
  min-height: 0;
  height: 100%;
}
.tc-card {
  box-sizing: border-box;
  min-height: 0;
  border: 1.5px solid color-mix(in srgb, var(--topic), #ffffff 34%);
  border-radius: 8px;
  background: #fffdf8;
  box-shadow: 0 16px 38px rgba(37, 31, 22, 0.10);
}
.tc-study-card {
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: 10px;
  padding: clamp(18px, 3vw, 42px);
  overflow: hidden;
}
.tc-card-kicker {
  color: var(--topic);
  font-size: 11px;
  line-height: 1.2;
  font-weight: 950;
  text-transform: uppercase;
}
.tc-main {
  align-self: center;
  display: block;
  color: var(--topic);
  font-size: clamp(42px, 5.3vw, 78px);
  line-height: 1.05;
  font-weight: 900;
  letter-spacing: 0;
  overflow-wrap: anywhere;
}
.tc-main * {
  font-size: inherit !important;
  line-height: inherit !important;
  font-weight: inherit !important;
  color: inherit !important;
}
.tc-answer-main {
  font-size: clamp(36px, 4.55vw, 64px);
  color: #202124;
}
.tc-hint {
  color: #69645b;
  font-size: 12px;
  font-weight: 850;
}
.tc-syn-panel {
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-rows: auto auto auto minmax(0, 1fr);
  gap: 8px;
  padding: clamp(14px, 1.8vw, 22px);
  overflow: hidden;
  border: 1.5px solid color-mix(in srgb, var(--topic), #ffffff 34%);
  border-radius: 8px;
  background: rgba(255,255,255,0.9);
  box-shadow: 0 16px 38px rgba(37, 31, 22, 0.08);
}
.tc-panel-kicker {
  color: var(--topic);
  font-size: 11px;
  line-height: 1.15;
  font-weight: 950;
  text-transform: uppercase;
}
.tc-syn-panel h2 {
  margin: 0;
  color: #111827;
  font-size: clamp(23px, 2vw, 31px);
  line-height: 1.02;
  font-weight: 950;
}
.tc-answer-facts {
  display: grid;
  grid-auto-rows: max-content;
  align-content: start;
  gap: 4px;
  margin: 0;
  padding: 0 0 8px;
  border-bottom: 1px solid #e3dbce;
  color: #202124;
  font-size: clamp(14px, 1.05vw, 17px);
  line-height: 1.32;
}
.tc-answer-facts b {
  font-weight: 950;
}
.tc-syn-list {
  min-height: 0;
  display: grid;
  gap: 8px;
  align-content: start;
  overflow: auto;
  padding-right: 4px;
}
.tc-syn-item {
  display: grid;
  gap: 4px;
  padding: 10px 12px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 8px 16px rgba(37, 31, 22, 0.07);
}
.tc-syn-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}
.tc-syn-phrase {
  color: #111827;
  font-size: clamp(15px, 1.1vw, 18px);
  line-height: 1.18;
  font-weight: 950;
}
.tc-stance {
  flex: 0 0 auto;
  padding: 3px 7px;
  border-radius: 999px;
  background: #e5e7eb;
  color: #374151;
  font-size: 9px;
  line-height: 1;
  font-weight: 950;
  text-transform: uppercase;
}
.tc-syn-zh,
.tc-syn-example {
  margin: 0;
  color: #514c45;
  font-size: clamp(13px, 0.95vw, 15.5px);
  line-height: 1.28;
}
.tc-empty-panel {
  color: #69645b;
  font-size: 15px;
  line-height: 1.35;
  font-weight: 750;
}
.nightMode .card,
.nightMode .tc-shell {
  background: #181715;
  color: #f6f2ea;
}
.nightMode .tc-card,
.nightMode .tc-syn-panel {
  background: #22201d;
  color: #f6f2ea;
  border-color: color-mix(in srgb, var(--topic), #22201d 32%);
}
.nightMode .tc-topic-name,
.nightMode .tc-answer-main,
.nightMode .tc-syn-panel h2,
.nightMode .tc-answer-facts,
.nightMode .tc-syn-phrase {
  color: #f6f2ea;
}
.nightMode .tc-syn-item {
  background: #2b2925;
}
.nightMode .tc-syn-zh,
.nightMode .tc-syn-example,
.nightMode .tc-topic-subtle {
  color: #c9c2b8;
}
@media (max-width: 980px) {
  .tc-shell {
    height: auto;
    min-height: 100vh;
    overflow: auto;
    padding: 12px;
  }
  .tc-page-top,
  .tc-frame {
    width: calc(100vw - 24px);
  }
  .tc-two {
    grid-template-columns: 1fr;
    height: auto;
  }
  .tc-study-card {
    min-height: 38vh;
    height: auto;
    padding: 18px;
  }
  .tc-syn-panel {
    min-height: 0;
    height: auto;
    max-height: none;
    padding: 14px;
  }
  .tc-main {
    font-size: clamp(34px, 9vw, 58px);
  }
  .tc-answer-main {
    font-size: clamp(30px, 7.5vw, 50px);
  }
}
`.trim();

function request(action, params = {}) {
  const payload = JSON.stringify({ action, version: 6, params });
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: "127.0.0.1",
        port: 8765,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload)
        },
        timeout: 30000
      },
      (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          try {
            const parsed = JSON.parse(body);
            if (parsed.error) {
              reject(new Error(parsed.error));
            } else {
              resolve(parsed.result);
            }
          } catch (error) {
            reject(error);
          }
        });
      }
    );
    req.on("timeout", () => req.destroy(new Error("Timed out connecting to AnkiConnect")));
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

async function main() {
  await request("updateModelStyling", {
    model: {
      name: modelName,
      css
    }
  });
  const styling = await request("modelStyling", { modelName });
  const ok = styling.css.includes("grid-template-rows: auto auto auto minmax(0, 1fr)") && styling.css.includes("height: 100vh");
  console.log(JSON.stringify({ modelName, cssLength: styling.css.length, compactLayoutApplied: ok }, null, 2));
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
