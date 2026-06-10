const fs = require("fs");
const path = require("path");

const dir = __dirname;
const safeScript = (value) => value.replace(/<\/script/gi, "<\\/script");

const index = fs.readFileSync(path.join(dir, "index.html"), "utf8");
const styles = fs.readFileSync(path.join(dir, "styles.css"), "utf8");
const sentences = fs.readFileSync(path.join(dir, "sentences.js"), "utf8");
const data = fs.readFileSync(path.join(dir, "data.js"), "utf8");
const script = fs.readFileSync(path.join(dir, "script.js"), "utf8");

const html = index
  .replace(
    '<link rel="stylesheet" href="styles.css">',
    () => `<style>\n${styles}\n</style>`
  )
  .replace(
    '<script src="sentences.js"></script>',
    () => `<script>\n${safeScript(sentences)}\n</script>`
  )
  .replace(
    '<script src="data.js"></script>',
    () => `<script>\n${safeScript(data)}\n</script>`
  )
  .replace(
    '<script src="script.js"></script>',
    () => `<script>\n${safeScript(script)}\n</script>`
  )
  .replace(
    "Task 2 Collocation Flashcards Advanced",
    () => "Task 2 Collocation Flashcards Advanced - Standalone"
  );

const output = path.join(dir, "task2-collocation-flashcards-advanced-standalone.html");
fs.writeFileSync(output, html, "utf8");
console.log(output);
