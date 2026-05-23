import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const failures = [];

const trackedAndUntracked = execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], { encoding: 'utf8' })
  .split('\0')
  .filter(Boolean)
  .filter((file) => !file.startsWith('.git/'))
  .filter((file) => !file.startsWith('node_modules/'));

const binaryExtensions = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.pdf', '.zip', '.gz', '.tar', '.woff', '.woff2'
]);

const patterns = [
  ['OpenAI API key', /sk-proj-[A-Za-z0-9_-]{20,}|sk-[A-Za-z0-9]{20,}/],
  ['GitHub token', /ghp_[A-Za-z0-9_]{20,}|github_pat_[A-Za-z0-9_]{20,}/],
  ['Google API key', /AIza[0-9A-Za-z_-]{20,}/],
  ['AWS access key', /AKIA[0-9A-Z]{16}/],
  ['private key block', /BEGIN (RSA|OPENSSH|PRIVATE) KEY/],
  ['private env assignment', /(?:password|passwd|secret|token|api[_-]?key)\s*[:=]\s*['"]?[A-Za-z0-9_./+=:-]{8,}/i],
  ['absolute personal macOS path', /\/Users\/omid\b/],
  ['absolute Windows user path', /C:\\Users\\/i],
  ['non-noreply email', /\b[A-Z0-9._%+-]+@(?!users\.noreply\.github\.com\b)[A-Z0-9.-]+\.[A-Z]{2,}\b/i],
  ['local URL', new RegExp(`\\b(?:${['local', 'host'].join('')}|127\\.0\\.0\\.1|file:\\/\\/)`, 'i')]
];

function extensionOf(file) {
  const match = file.match(/\.[^.]+$/);
  return match ? match[0].toLowerCase() : '';
}

for (const file of trackedAndUntracked) {
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) continue;
  if (binaryExtensions.has(extensionOf(file))) continue;

  const text = fs.readFileSync(file, 'utf8');
  for (const [label, pattern] of patterns) {
    if (pattern.test(text)) failures.push(`${file}: ${label}`);
  }
}

if (failures.length) {
  console.error(`Focused redaction scan failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Focused redaction scan passed: ${trackedAndUntracked.length} files checked.`);
