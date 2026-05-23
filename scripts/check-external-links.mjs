import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const strict = process.argv.includes('--strict');
const failures = [];
const warnings = [];
const urls = new Set();

function addUrl(value) {
  if (typeof value === 'string' && /^https?:\/\//.test(value)) urls.add(value);
}

function listFiles(dir, matcher, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === 'wiki') continue;
    if (entry.isDirectory()) listFiles(fullPath, matcher, results);
    else if (matcher(fullPath)) results.push(fullPath);
  }
  return results;
}

const sourceIndex = JSON.parse(fs.readFileSync(path.join(root, '10_Agent_Data/source-index.json'), 'utf8'));
for (const source of sourceIndex.sources || []) addUrl(source.url);

for (const fullPath of listFiles(root, (candidate) => /\.(md|html|json)$/.test(candidate))) {
  const text = fs.readFileSync(fullPath, 'utf8');
  for (const match of text.matchAll(/\[[^\]]+\]\((https?:\/\/[^)]+)\)/g)) addUrl(match[1]);
  for (const match of text.matchAll(/\bhref="(https?:\/\/[^"]+)"/g)) addUrl(match[1]);
}

async function checkUrl(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    let response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': 'AI-Founder-Knowledge-Bank link checker' }
    });
    if (response.status === 405 || response.status === 403) {
      response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'user-agent': 'AI-Founder-Knowledge-Bank link checker' }
      });
    }
    if (response.status === 403 || response.status === 429) warnings.push(`${response.status} ${url}`);
    else if (response.status >= 400) failures.push(`${response.status} ${url}`);
  } catch (error) {
    const message = `${url} (${error.name === 'AbortError' ? 'timeout' : error.message})`;
    if (strict) failures.push(message);
    else warnings.push(message);
  } finally {
    clearTimeout(timeout);
  }
}

const queue = [...urls].sort();
const concurrency = 8;
let nextIndex = 0;

await Promise.all(Array.from({ length: concurrency }, async () => {
  while (nextIndex < queue.length) {
    const url = queue[nextIndex++];
    await checkUrl(url);
  }
}));

if (failures.length) {
  console.error(`External link check failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

if (warnings.length) {
  console.warn(`External link check warnings (${warnings.length}):`);
  for (const warning of warnings) console.warn(`- ${warning}`);
}

console.log(`External link check passed: ${queue.length} URLs checked.`);
