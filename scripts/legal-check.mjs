import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const roots = ["components/legal", "lib/email"];
const patterns = [
  { name: "segnaposto", re: /\[[^\]\n]*(?:DA |polizza|canali|regione|edizione|comune)[^\]\n]*\]/g },
  { name: "DA VALIDARE", re: /DA VALIDARE/g },
  { name: "DA DECIDERE", re: /DA DECIDERE/g },
  { name: "DA VERIFICARE", re: /DA VERIFICARE/g },
  { name: "DA COMPLETARE", re: /DA COMPLETARE/g },
];

function filesIn(dir) {
  const abs = path.resolve(dir);
  if (abs.includes(`${path.sep}archive`)) return [];
  const found = [];
  for (const entry of readdirSync(abs)) {
    const full = path.join(abs, entry);
    if (statSync(full).isDirectory()) found.push(...filesIn(full));
    else if (/\.(tsx|ts)$/.test(entry)) found.push(full);
  }
  return found;
}

const hits = [];
for (const root of roots) {
  for (const file of filesIn(root)) {
    const lines = readFileSync(file, "utf8").split(/\r?\n/);
    lines.forEach((line, index) => {
      for (const pattern of patterns) {
        pattern.re.lastIndex = 0;
        if (pattern.re.test(line)) {
          hits.push(`${path.relative(process.cwd(), file)}:${index + 1} [${pattern.name}] ${line.trim()}`);
        }
      }
    });
  }
}

if (hits.length === 0) {
  console.log("legal:check: nessun segnaposto aperto.");
} else {
  console.warn(`legal:check: ${hits.length} punti ancora aperti (non blocca il deploy).`);
  for (const hit of hits) console.warn(hit);
}
process.exit(0);
