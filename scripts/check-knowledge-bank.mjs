import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const failures = [];

function fail(message) {
  failures.push(message);
}

function readJson(relPath) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, relPath), 'utf8'));
  } catch (error) {
    fail(`${relPath}: invalid JSON (${error.message})`);
    return null;
  }
}

function fileExists(relPath) {
  return fs.existsSync(path.join(root, relPath));
}

function listFiles(dir, matcher, results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    if (entry.isDirectory()) listFiles(fullPath, matcher, results);
    else if (matcher(fullPath)) results.push(fullPath);
  }
  return results;
}

for (const relPath of [
  '10_Agent_Data/candidates.json',
  '10_Agent_Data/dashboard-data.json',
  '10_Agent_Data/knowledge-graph.json',
  '10_Agent_Data/mention-graph.json',
  '10_Agent_Data/page-index.json',
  '10_Agent_Data/source-index.json'
]) {
  readJson(relPath);
}

const pageIndex = readJson('10_Agent_Data/page-index.json') || [];
for (const page of pageIndex) {
  if (!page.path) fail(`page-index entry ${page.slug || page.title}: missing path`);
  else if (!fileExists(page.path)) fail(`page-index entry ${page.slug || page.title}: missing ${page.path}`);

  if (page.human_path && !fileExists(page.human_path)) {
    fail(`page-index entry ${page.slug || page.title}: missing ${page.human_path}`);
  }
}

const sourceIndex = readJson('10_Agent_Data/source-index.json');
if (sourceIndex?.sources) {
  for (const source of sourceIndex.sources) {
    if (!source.id) fail(`source-index entry ${source.title || '<untitled>'}: missing id`);
    if (!source.slug) fail(`source-index entry ${source.title || source.id}: missing slug`);
    if (!source.title) fail(`source-index entry ${source.id || source.slug}: missing title`);
    if (!source.url) fail(`source-index entry ${source.id || source.slug}: missing url`);
    if (!source.confidence) fail(`source-index entry ${source.id || source.slug}: missing confidence`);
  }
}

const graph = readJson('10_Agent_Data/knowledge-graph.json');
if (graph?.nodes && graph?.edges) {
  const nodeIds = new Set(graph.nodes.map((node) => node.id));
  for (const edge of graph.edges) {
    if (!nodeIds.has(edge.from)) fail(`knowledge-graph edge ${edge.from} -> ${edge.to}: missing from node`);
    if (!nodeIds.has(edge.to)) fail(`knowledge-graph edge ${edge.from} -> ${edge.to}: missing to node`);
  }
}

const secretPatterns = [
  /sk-proj-[A-Za-z0-9_-]{20,}/,
  /sk-[A-Za-z0-9]{20,}/,
  /ghp_[A-Za-z0-9_]{20,}/,
  /github_pat_[A-Za-z0-9_]{20,}/,
  /AIza[0-9A-Za-z_-]{20,}/,
  /AKIA[0-9A-Z]{16}/,
  /BEGIN (RSA|OPENSSH|PRIVATE) KEY/,
  /\/Users\/omid/,
  new RegExp(['omid', '@'].join('')),
  /C:\\Users/
];

for (const fullPath of listFiles(root, (candidate) => /\.(md|html|json|mjs|js|css|txt|yml|yaml)$/.test(candidate))) {
  const relPath = path.relative(root, fullPath);
  if (relPath.startsWith('wiki/')) continue;
  const text = fs.readFileSync(fullPath, 'utf8');
  for (const pattern of secretPatterns) {
    if (pattern.test(text)) fail(`${relPath}: matched public-safety pattern ${pattern}`);
  }
}

for (const fullPath of listFiles(root, (candidate) => /\.(md|html)$/.test(candidate))) {
  const relPath = path.relative(root, fullPath);
  if (relPath.startsWith('wiki/')) continue;
  const text = fs.readFileSync(fullPath, 'utf8');
  const markdownLinks = [...text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((match) => match[1]);
  const htmlLinks = [...text.matchAll(/\bhref="([^"]+)"/g)].map((match) => match[1]);
  for (const rawHref of [...markdownLinks, ...htmlLinks]) {
    const href = rawHref.split('#')[0];
    if (!href || /^(https?:|mailto:|tel:|data:)/.test(href)) continue;
    const target = path.normalize(path.join(path.dirname(fullPath), href));
    if (!target.startsWith(root)) {
      fail(`${relPath}: local link escapes repository (${rawHref})`);
    } else if (!fs.existsSync(target)) {
      fail(`${relPath}: broken local link (${rawHref})`);
    }
  }
}

try {
  const statusBefore = execFileSync('git', ['status', '--short'], { cwd: root, encoding: 'utf8' });
  execFileSync('node', ['10_Agent_Data/generate-knowledge-bank.mjs'], { cwd: root, stdio: 'ignore' });
  const statusAfter = execFileSync('git', ['status', '--short'], { cwd: root, encoding: 'utf8' });
  if (statusAfter !== statusBefore) {
    fail(`generator is not idempotent:\nBefore:\n${statusBefore || '<clean>'}\nAfter:\n${statusAfter || '<clean>'}`);
  }
} catch (error) {
  fail(`generator failed: ${error.message}`);
}

if (failures.length) {
  console.error(`Knowledge bank check failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Knowledge bank check passed: ${pageIndex.length} indexed pages validated.`);
