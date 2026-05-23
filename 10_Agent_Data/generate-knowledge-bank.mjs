import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const today = '2026-05-23';

function readSeed(file) {
  return JSON.parse(fsSync.readFileSync(path.join(root, '10_Agent_Data', 'seeds', file), 'utf8'));
}

const dirs = [
  '00_Home',
  '01_People',
  '02_Topics',
  '03_Playbooks',
  '04_Tooling',
  '05_Roadmaps',
  '06_Prompts',
  '07_Sources',
  '08_Templates',
  '09_Inbox',
  '10_Agent_Data',
  'wiki'
];

const sourceList = readSeed('sources.json');

const sourceById = Object.fromEntries(sourceList.map((source) => [source.id, source]));

const people = readSeed('people.json');

const topics = readSeed('topics.json');

const playbooks = readSeed('playbooks.json');

const toolPages = readSeed('tooling.json');

const candidates = readSeed('candidates.seed.json');

const promptFiles = readSeed('prompts.json');

function sourceLinks(ids) {
  return ids.map((id) => {
    const source = sourceById[id];
    return source ? `[${source.title}](../07_Sources/${source.slug}.md)` : id;
  }).join(', ');
}

function externalSourceLinks(ids) {
  return ids.map((id) => {
    const source = sourceById[id];
    return source ? `[${source.title}](${source.url})` : id;
  }).join(', ');
}

function frontmatter({ title, type, status = 'active', confidence = 'Medium', tags = [], related = [], sources = [] }) {
  return [
    '---',
    `title: ${title}`,
    `type: ${type}`,
    `status: ${status}`,
    `confidence: ${confidence}`,
    `last_updated: ${today}`,
    `tags: [${tags.join(', ')}]`,
    `related: [${related.join(', ')}]`,
    `sources: [${sources.join(', ')}]`,
    '---',
    ''
  ].join('\n');
}

function list(items) {
  return items.map((item) => `- ${item}`).join('\n');
}

function table(headers, rows) {
  return [
    `| ${headers.join(' | ')} |`,
    `| ${headers.map(() => '---').join(' | ')} |`,
    ...rows.map((row) => `| ${row.join(' | ')} |`)
  ].join('\n');
}

function personPage(person) {
  const related = [...new Set([
    ...person.topics.map(pagePathForSlug),
    ...person.playbooks.map(pagePathForSlug),
    ...person.tools.map(pagePathForSlug)
  ])];
  return [
    frontmatter({
      title: person.name,
      type: 'person',
      confidence: person.confidence,
      tags: person.tags,
      related,
      sources: person.sourceIds
    }),
    `# ${person.name}`,
    '',
    `**Handle:** ${person.handle}`,
    '',
    `**Mentor role:** ${person.role}`,
    '',
    '## Why This Was Added',
    '',
    person.whyAdded,
    '',
    '## Referred By / Mention Evidence',
    '',
    person.referredBy,
    '',
    '## Why This Person Matters',
    '',
    person.matters,
    '',
    '## Best Lessons For The Builder',
    '',
    list(person.lessons),
    '',
    '## Concrete Practices To Adopt',
    '',
    list(person.practices),
    '',
    '## What Not To Over-Copy',
    '',
    list(person.avoid),
    '',
    '## Tools, Repos, Articles, Talks To Study',
    '',
    sourceLinks(person.sourceIds),
    '',
    '## Related Topics',
    '',
    list(person.topics.map(linkForSlug)),
    '',
    '## Related Playbooks',
    '',
    list(person.playbooks.map(linkForSlug)),
    '',
    '## Related Tools',
    '',
    list(person.tools.map(linkForSlug)),
    '',
    '## Exercises',
    '',
    list(person.exercises),
    '',
    '## Prompts Inspired By This Person',
    '',
    list(person.prompts),
    '',
    '## Sources',
    '',
    externalSourceLinks(person.sourceIds),
    '',
    '## Confidence Notes',
    '',
    person.confidenceNotes,
    '',
    '## Related',
    '',
    list(related.map((rel) => `[${titleFromSlug(path.basename(rel, '.md'))}](${rel})`)),
    ''
  ].join('\n');
}

function topicTitle(slug) {
  return topics.find((topic) => topic.slug === slug)?.title || titleFromSlug(slug);
}

function titleFromSlug(slug) {
  return slug.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

function titleForSlug(slug) {
  return people.find((person) => person.slug === slug)?.name
    || topics.find((topic) => topic.slug === slug)?.title
    || playbooks.find((playbook) => playbook.slug === slug)?.title
    || toolPages.find((tool) => tool.slug === slug)?.title
    || promptFiles.find((file) => file.slug === slug)?.title
    || sourceList.find((source) => source.slug === slug || source.id === slug)?.title
    || titleFromSlug(slug);
}

function pagePathForSlug(slug) {
  if (people.some((person) => person.slug === slug)) return `../01_People/${slug}.md`;
  if (topics.some((topic) => topic.slug === slug)) return `../02_Topics/${slug}.md`;
  if (playbooks.some((playbook) => playbook.slug === slug)) return `../03_Playbooks/${slug}.md`;
  if (toolPages.some((tool) => tool.slug === slug)) return `../04_Tooling/${slug}.md`;
  if (promptFiles.some((file) => file.slug === slug)) return `../06_Prompts/${slug}.md`;
  const source = sourceList.find((item) => item.slug === slug || item.id === slug);
  if (source) return `../07_Sources/${source.slug}.md`;
  return '../09_Inbox/README.md';
}

function linkForSlug(slug) {
  return `[${titleForSlug(slug)}](${pagePathForSlug(slug)})`;
}

function topicPage(topic) {
  const related = [
    ...topic.people.map((slug) => `../01_People/${slug}.md`)
  ];
  return [
    frontmatter({
      title: topic.title,
      type: 'topic',
      confidence: topic.confidence,
      tags: topic.tags,
      related,
      sources: topic.sourceIds
    }),
    `# ${topic.title}`,
    '',
    '## Why This Topic Matters',
    '',
    topic.why,
    '',
    '## Key Principles',
    '',
    list(topic.principles),
    '',
    '## Mentor Perspectives',
    '',
    list(topic.people.map((slug) => `[${personName(slug)}](../01_People/${slug}.md)`)),
    '',
    '## Tools And Practices',
    '',
    list(topic.practices),
    '',
    '## Exercises',
    '',
    list([
      `Ask Codex to apply this topic to one current task and produce a concrete checklist.`,
      `Find one failure from this week that maps to this topic and turn it into a reusable rule.`,
      `Update one related playbook with a better verification step.`
    ]),
    '',
    '## Example Codex / Claude Prompts',
    '',
    list([
      `Apply the principles from ${topic.title} to this task. Identify risks, constraints, and verification before editing.`,
      `Review this workflow through the lens of ${topic.title}. What should I change this week?`,
      `Create one small exercise that helps me improve at ${topic.title}.`
    ]),
    '',
    '## Failure Modes',
    '',
    list(topic.failureModes),
    '',
    '## Sources',
    '',
    externalSourceLinks(topic.sourceIds),
    '',
    '## Related',
    '',
    list(related.map((rel) => `[${titleFromSlug(path.basename(rel, '.md'))}](${rel})`)),
    ''
  ].join('\n');
}

function personName(slug) {
  return people.find((person) => person.slug === slug)?.name || titleFromSlug(slug);
}

function playbookPage(playbook) {
  return [
    frontmatter({
      title: playbook.title,
      type: 'playbook',
      confidence: playbook.confidence,
      tags: playbook.tags,
      related: [],
      sources: playbook.sourceIds
    }),
    `# ${playbook.title}`,
    '',
    '## Purpose',
    '',
    `A repeatable workflow for ${playbook.title.toLowerCase()} in the AI Founder Knowledge Bank.`,
    '',
    '## Steps',
    '',
    playbook.steps.map((step, index) => `${index + 1}. ${step}`).join('\n'),
    '',
    '## Checklist',
    '',
    list(playbook.checklist.map((item) => `[ ] ${item}`)),
    '',
    '## How This Applies To The Builder',
    '',
    'Use this as an operating checklist before, during, or after delegating work to Codex/Claude. The goal is accepted output, not maximum agent activity.',
    '',
    '## Sources',
    '',
    externalSourceLinks(playbook.sourceIds),
    '',
    '## Related',
    '',
    '- [Weekly Dashboard](../00_Home/weekly-dashboard.md)',
    '- [Knowledge Bank Maintenance Prompts](../06_Prompts/knowledge-bank-maintenance-prompts.md)',
    ''
  ].join('\n');
}

function toolPage(tool) {
  return [
    frontmatter({
      title: tool.title,
      type: 'tooling',
      confidence: tool.confidence,
      tags: tool.tags,
      related: [],
      sources: tool.sourceIds
    }),
    `# ${tool.title}`,
    '',
    '## Why This Tooling Area Matters',
    '',
    `${tool.title} is part of the operating surface for an AI-native one-person company. Use it only when it improves speed, quality, observability, or distribution.`,
    '',
    '## Key Principles',
    '',
    list(tool.principles),
    '',
    '## Practices',
    '',
    list(tool.practices),
    '',
    '## How This Applies To The Builder',
    '',
    'Prefer tools that make agent work visible, reviewable, and repeatable. Avoid adding tool layers that hide what the model did or increase context cost without improving outcomes.',
    '',
    '## Sources',
    '',
    externalSourceLinks(tool.sourceIds),
    '',
    '## Related',
    '',
    '- [Agentic Engineering](../02_Topics/agentic-engineering.md)',
    '- [Daily Agent Manager Routine](../03_Playbooks/daily-agent-manager-routine.md)',
    ''
  ].join('\n');
}

function sourcePage(source) {
  return [
    frontmatter({
      title: source.title,
      type: 'source-note',
      confidence: source.confidence,
      tags: [source.type, ...source.relatedTopics],
      related: [
        ...source.relatedPeople.map((slug) => `../01_People/${slug}.md`),
        ...source.relatedTopics.map(pagePathForSlug)
      ],
      sources: [source.id]
    }),
    `# ${source.title}`,
    '',
    `**Source type:** ${source.type}`,
    '',
    `**Author/person:** ${source.author}`,
    '',
    `**URL:** [${source.url}](${source.url})`,
    '',
    `**Date published:** ${source.published}`,
    '',
    `**Date reviewed:** ${today}`,
    '',
    '## Summary',
    '',
    source.summary,
    '',
    '## Key Takeaways',
    '',
    list(source.takeaways),
    '',
    '## Claims Worth Importing',
    '',
    list(source.claims),
    '',
    '## People / Tools / Topics Mentioned',
    '',
    list(source.mentions),
    '',
    '## Related People',
    '',
    source.relatedPeople.length ? list(source.relatedPeople.map((slug) => `[${personName(slug)}](../01_People/${slug}.md)`)) : '- None promoted yet',
    '',
    '## Related Topics',
    '',
    list(source.relatedTopics.map(linkForSlug)),
    '',
    '## Confidence',
    '',
    source.confidence,
    '',
    '## Follow-Up Questions',
    '',
    list([
      'Does this source create repeated mention evidence for a candidate?',
      'Does this source update a practice, or only confirm an existing principle?',
      'Is the claim durable, or tied to a temporary tool snapshot?'
    ]),
    ''
  ].join('\n');
}

function templatePage(kind, body) {
  return [
    frontmatter({
      title: `${titleFromSlug(kind)} Template`,
      type: 'template',
      confidence: 'High',
      tags: ['template', 'maintenance'],
      related: [],
      sources: []
    }),
    `# ${titleFromSlug(kind)} Template`,
    '',
    body,
    ''
  ].join('\n');
}

function promptPage(file) {
  const promptHeading = (prompt) => prompt.slice(0, 48).trim().replace(/\.$/, '');
  return [
    frontmatter({
      title: file.title,
      type: 'prompts',
      confidence: 'High',
      tags: ['prompts', 'agent-workflow'],
      related: [],
      sources: []
    }),
    `# ${file.title}`,
    '',
    '## Prompts',
    '',
    file.prompts.map((prompt) => `### ${promptHeading(prompt)}\n\n\`\`\`text\n${prompt}\n\`\`\``).join('\n\n'),
    ''
  ].join('\n');
}

function mapPage() {
  return [
    frontmatter({
      title: 'Start Here',
      type: 'home',
      confidence: 'High',
      tags: ['home', 'wiki'],
      related: ['weekly-dashboard.md', 'glossary.md', 'open-questions.md'],
      sources: []
    }),
    '# Start Here',
    '',
    'This is a living, local-first AI Founder Knowledge Bank. The human-facing entry point is [index.html](../index.html). Markdown and JSON files are maintained for Codex/Claude and future automation.',
    '',
    '## Use It Weekly',
    '',
    '1. Open `index.html`.',
    '2. Review the "What should I do this week?" section.',
    '3. Pick one agent workflow improvement, one product/distribution move, and one engineering-quality move.',
    '4. Add new sources to `07_Sources` before promoting new people or topics.',
    '5. Keep candidate additions evidence-driven.',
    '',
    '## Main Thesis',
    '',
    'A one-person AI company is not just one person plus models. It requires product judgment, distribution, engineering taste, agent management, evals, security discipline, and operating cadence.',
    '',
    '## Core Entry Points',
    '',
    '- [Weekly Dashboard](weekly-dashboard.md)',
    '- [Open Questions](open-questions.md)',
    '- [Candidates To Review](candidates-to-review.md)',
    '- [90 Day Roadmap](../05_Roadmaps/90-day-roadmap.md)',
    '- [Knowledge Bank Maintenance Prompts](../06_Prompts/knowledge-bank-maintenance-prompts.md)',
    ''
  ].join('\n');
}

function weeklyDashboard() {
  return [
    frontmatter({
      title: 'Weekly Dashboard',
      type: 'dashboard',
      confidence: 'High',
      tags: ['weekly', 'operator'],
      related: ['../05_Roadmaps/90-day-roadmap.md'],
      sources: []
    }),
    '# Weekly Dashboard',
    '',
    '## What Should I Do This Week?',
    '',
    table(['Area', 'Default Action', 'Evidence'], [
      ['Agentic engineering', 'Delegate one bounded task with explicit verification', 'Diff, test, Browser check, or source-backed report'],
      ['Product/distribution', 'Run one customer or launch experiment', 'Conversation, signup, payment, reply, or usage'],
      ['Engineering taste', 'Improve one code-quality guardrail', 'Type, test, lint, doc, or refactor'],
      ['Knowledge bank', 'Ingest one source or promote one evidence-backed candidate', 'Source note and mention graph update']
    ]),
    '',
    '## Weekly Review Questions',
    '',
    list([
      'What shipped that a user could see or use?',
      'Where did agents create real leverage?',
      'Where did agents create cleanup work?',
      'What did customers, users, or coworkers teach me?',
      'Which workflow should become a reusable prompt, template, or automation?',
      'Which candidate person/tool/topic gained evidence?'
    ]),
    ''
  ].join('\n');
}

function glossary() {
  const terms = [
    ['Agentic engineering', 'Professional software engineering with coding agents that can edit, run, test, and iterate.'],
    ['Blast radius', 'The expected scope and risk of a change: files, systems, data, permissions, and rollback cost.'],
    ['Candidate', 'A person, tool, or topic with some signal but not enough evidence for a full page.'],
    ['Eval', 'A repeatable check that measures whether an AI or agent workflow behaves usefully for a specific task.'],
    ['Human-facing artifact', 'The local vanilla HTML dashboard that a human should actually browse.'],
    ['Machine-readable layer', 'JSON indexes that help Codex maintain pages, sources, and mention graphs.'],
    ['Promotion', 'Moving a candidate into a full page after repeated references or explicit direction.'],
    ['Source note', 'A structured summary of one article, repo, talk, video, thread, doc, paper, or tool.']
  ];
  return [
    frontmatter({ title: 'Glossary', type: 'glossary', confidence: 'High', tags: ['glossary'], related: [], sources: [] }),
    '# Glossary',
    '',
    table(['Term', 'Meaning'], terms),
    ''
  ].join('\n');
}

function openQuestions() {
  return [
    frontmatter({ title: 'Open Questions', type: 'home', confidence: 'Medium', tags: ['questions'], related: [], sources: [] }),
    '# Open Questions',
    '',
    list([
      'Which business-workflow workflows can the builder delegate safely without losing domain skill?',
      'What is the smallest paid solo product the builder can ship from business-domain knowledge?',
      'Which agent tasks repeatedly fail because of missing context vs weak tools vs weak verification?',
      'What evals would prove an AI support/sales assistant is useful enough to trust?',
      'Which candidate mentors become repeatedly referenced by the core mentor graph?'
    ]),
    ''
  ].join('\n');
}

function candidatesPage() {
  return [
    frontmatter({ title: 'Candidates To Review', type: 'candidate-queue', confidence: 'High', tags: ['candidates', 'promotion'], related: ['../03_Playbooks/candidate-promotion-workflow.md'], sources: [] }),
    '# Candidates To Review',
    '',
    'Candidates are not full mentors yet. Promote only when repeated source evidence, a clear gap, or explicit maintainer direction justifies it.',
    '',
    table(['Candidate', 'Type', 'Confidence', 'Reason', 'Evidence'], candidates.map((candidate) => [
      candidate.name,
      candidate.type,
      candidate.confidence,
      candidate.reason,
      candidate.evidence.map((id) => sourceById[id] ? `[${sourceById[id].title}](../07_Sources/${sourceById[id].slug}.md)` : id).join(', ') || 'Needs sources'
    ])),
    ''
  ].join('\n');
}

function roadmap() {
  const weeks = [
    ['1', 'Baseline agent manager', 'Write current workflow, set metrics, run one bounded agent task per day'],
    ['2', 'Verification harnesses', 'Create code review checklist, Browser QA habit, and first eval set'],
    ['3', 'TypeScript guardrails', 'Improve TS contracts in one real project area'],
    ['4', 'Source-backed learning loop', 'Ingest five high-quality sources and update mention graph'],
    ['5', 'business workflow map', 'Map 10 business workflows and rank AI product opportunities'],
    ['6', 'Prototype sprint', 'Build one narrow AI-assisted business workflow prototype'],
    ['7', 'Customer discovery', 'Run five conversations or async feedback asks'],
    ['8', 'Distribution experiment', 'Publish demo, landing page, and one build note'],
    ['9', 'Ops automation', 'Automate one support/sales/admin workflow with human approval'],
    ['10', 'Quality week', 'Refactor, test, docs, security review, failure log'],
    ['11', 'Paid test', 'Ask for payment, preorder, pilot, or explicit rejection'],
    ['12', 'Systematize', 'Turn repeated work into prompts, templates, and agent routines'],
    ['13', 'Founder review', 'Decide kill/iterate/double down and update the roadmap']
  ];
  return [
    frontmatter({ title: '90 Day Roadmap', type: 'roadmap', confidence: 'High', tags: ['roadmap', '90-day'], related: ['../00_Home/weekly-dashboard.md'], sources: [] }),
    '# 90 Day Roadmap',
    '',
    table(['Week', 'Theme', 'Measurable Outcome'], weeks),
    '',
    '## Operating Rule',
    '',
    'Every week needs one shipped artifact, one learning artifact, one verification improvement, and one distribution/customer signal.',
    ''
  ].join('\n');
}

function reviewTemplate(kind) {
  return [
    frontmatter({ title: `${titleFromSlug(kind)} Review Template`, type: 'template', confidence: 'High', tags: ['review'], related: [], sources: [] }),
    `# ${titleFromSlug(kind)} Review Template`,
    '',
    '## Shipped Work',
    '',
    '-',
    '',
    '## Agent Leverage',
    '',
    '- Accepted work:',
    '- Rejected work:',
    '- Lessons:',
    '',
    '## Product / Customer / Distribution',
    '',
    '-',
    '',
    '## Engineering Quality',
    '',
    '-',
    '',
    '## Knowledge Bank Updates',
    '',
    '- Sources added:',
    '- Candidates updated:',
    '- Pages changed:',
    '',
    '## Next Bet',
    '',
    '-',
    ''
  ].join('\n');
}

function sourceIndex() {
  return [
    frontmatter({ title: 'Source Index', type: 'source-index', confidence: 'High', tags: ['sources'], related: [], sources: [] }),
    '# Source Index',
    '',
    table(['Source', 'Type', 'Confidence', 'Related People', 'Related Topics'], sourceList.map((source) => [
      `[${source.title}](${source.slug}.md)`,
      source.type,
      source.confidence,
      source.relatedPeople.map(personName).join(', ') || 'Candidate / topic source',
      source.relatedTopics.map(titleForSlug).join(', ')
    ])),
    ''
  ].join('\n');
}

function sourcesToReview() {
  return [
    frontmatter({ title: 'Sources To Review', type: 'source-queue', confidence: 'Medium', tags: ['sources', 'queue'], related: [], sources: [] }),
    '# Sources To Review',
    '',
    table(['Priority', 'Source / Search', 'Why'], [
      ['High', 'Primary Thariq Shihipar long-form articles beyond X mirrors', 'Strengthen medium-confidence Claude Code design claims'],
      ['High', 'Primary Jiayuan Zhang writing or Multica docs', 'Strengthen mentor page beyond GitHub profile'],
      ['Medium', 'Recent Simon Willison Agentic Engineering chapters', 'Refresh evolving practice guidance'],
      ['Medium', 'Recent Codex and Claude Code official docs', 'Tooling changes quickly'],
      ['Medium', 'Founder/product sources cited by Levels/Theo/Tobi', 'Improve evidence-driven expansion graph']
    ]),
    ''
  ].join('\n');
}

function sourceRubric() {
  return [
    frontmatter({ title: 'Source Quality Rubric', type: 'rubric', confidence: 'High', tags: ['sources', 'quality'], related: [], sources: [] }),
    '# Source Quality Rubric',
    '',
    table(['Rating', 'Description', 'Use'], [
      ['High', 'Primary source: official blog, docs, repo, talk, paper, or direct writing', 'Can support page claims'],
      ['Medium', 'Secondary summary, transcript, community recap, or mirrored thread', 'Use with caveats and confidence notes'],
      ['Low', 'Unsourced social summary, rumor, engagement bait, or stale commentary', 'Candidate queue only unless verified']
    ]),
    '',
    '## Promotion Rule',
    '',
    'Do not promote a non-core person/tool/topic unless repeated high/medium quality evidence supports it or the builder explicitly asks for it.',
    ''
  ].join('\n');
}

function humanPathForMd(relPath) {
  if (!relPath.endsWith('.md')) return relPath;
  const slug = relPath
    .replace(/\.md$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `wiki/${slug}.html`;
}

function htmlEscape(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function convertMarkdownLinks(text, currentRelPath) {
  return htmlEscape(text).replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, href) => {
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
      return `<a href="${htmlEscape(href)}">${htmlEscape(label)}</a>`;
    }
    const [hrefPath, hash = ''] = href.split('#');
    const targetRel = path.normalize(path.join(path.dirname(currentRelPath), hrefPath));
    const targetHref = hrefPath.endsWith('.md')
      ? path.basename(humanPathForMd(targetRel))
      : `../${targetRel}`;
    return `<a href="${htmlEscape(targetHref + (hash ? `#${hash}` : ''))}">${htmlEscape(label)}</a>`;
  }).replace(/`([^`]+)`/g, '<code>$1</code>');
}

function markdownToHtml(markdown, currentRelPath) {
  const body = markdown.replace(/^---[\s\S]*?---\n/, '');
  const lines = body.split('\n');
  const blocks = [];
  let paragraph = [];
  let listItems = [];
  let orderedItems = [];
  let tableLines = [];
  let inCode = false;
  let codeLines = [];

  function flushParagraph() {
    if (paragraph.length) {
      blocks.push(`<p>${convertMarkdownLinks(paragraph.join(' '), currentRelPath)}</p>`);
      paragraph = [];
    }
  }
  function flushList() {
    if (listItems.length) {
      blocks.push(`<ul>${listItems.map((item) => `<li>${convertMarkdownLinks(item, currentRelPath)}</li>`).join('')}</ul>`);
      listItems = [];
    }
    if (orderedItems.length) {
      blocks.push(`<ol>${orderedItems.map((item) => `<li>${convertMarkdownLinks(item, currentRelPath)}</li>`).join('')}</ol>`);
      orderedItems = [];
    }
  }
  function flushTable() {
    if (tableLines.length) {
      const rows = tableLines.filter((line) => !/^\|\s*-/.test(line)).map((line) => line.split('|').slice(1, -1).map((cell) => cell.trim()));
      if (rows.length) {
        const [head, ...rest] = rows;
        blocks.push(`<div class="table-wrap"><table><thead><tr>${head.map((cell) => `<th>${convertMarkdownLinks(cell, currentRelPath)}</th>`).join('')}</tr></thead><tbody>${rest.map((row) => `<tr>${row.map((cell) => `<td>${convertMarkdownLinks(cell, currentRelPath)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      }
      tableLines = [];
    }
  }

  for (const line of lines) {
    if (line.startsWith('```')) {
      flushParagraph();
      flushList();
      flushTable();
      if (inCode) {
        blocks.push(`<pre><code>${htmlEscape(codeLines.join('\n'))}</code></pre>`);
        codeLines = [];
        inCode = false;
      } else {
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      codeLines.push(line);
      continue;
    }
    if (!line.trim()) {
      flushParagraph();
      flushList();
      flushTable();
      continue;
    }
    if (/^\|.+\|$/.test(line)) {
      flushParagraph();
      flushList();
      tableLines.push(line);
      continue;
    }
    flushTable();
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      blocks.push(`<h${level}>${convertMarkdownLinks(heading[2], currentRelPath)}</h${level}>`);
      continue;
    }
    const bullet = line.match(/^- (.+)$/);
    if (bullet) {
      flushParagraph();
      orderedItems = [];
      listItems.push(bullet[1]);
      continue;
    }
    const numbered = line.match(/^\d+\. (.+)$/);
    if (numbered) {
      flushParagraph();
      listItems = [];
      orderedItems.push(numbered[1]);
      continue;
    }
    paragraph.push(line);
  }
  flushParagraph();
  flushList();
  flushTable();
  return blocks.join('\n');
}

function markdownMirrorHtml(title, relPath, markdown) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${htmlEscape(title)} - AI Founder Knowledge Bank</title>
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%231f6f5b'/%3E%3Cpath d='M8 21h16M8 16h16M8 11h16' stroke='white' stroke-width='2.5' stroke-linecap='round'/%3E%3C/svg%3E">
  <style>
    :root { --bg:#f7f8f5; --panel:#fff; --ink:#18211c; --muted:#667169; --line:#d8ded7; --accent:#1f6f5b; --radius:8px; --sans:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; --mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace; }
    * { box-sizing:border-box; }
    body { margin:0; background:var(--bg); color:var(--ink); font-family:var(--sans); line-height:1.55; }
    main { max-width:980px; margin:0 auto; padding:28px 18px 56px; }
    .top { display:flex; justify-content:space-between; gap:14px; align-items:center; margin-bottom:20px; border-bottom:1px solid var(--line); padding-bottom:14px; }
    .top a { font-weight:700; }
    .path { color:var(--muted); font:12px var(--mono); overflow-wrap:anywhere; }
    h1 { font-size:34px; line-height:1.1; letter-spacing:0; margin:18px 0; }
    h2 { font-size:22px; margin:28px 0 10px; border-top:1px solid var(--line); padding-top:18px; }
    h3 { font-size:16px; margin:20px 0 8px; }
    p, li, td, th { font-size:15px; }
    a { color:var(--accent); text-decoration:none; }
    a:hover { text-decoration:underline; }
    code { font-family:var(--mono); font-size:.9em; background:#eef3ef; padding:1px 4px; border-radius:4px; }
    pre { overflow:auto; background:#18211c; color:#f7f8f5; border-radius:var(--radius); padding:14px; }
    ul, ol { padding-left:22px; }
    li { margin:5px 0; }
    .table-wrap { overflow:auto; border:1px solid var(--line); border-radius:var(--radius); margin:12px 0; }
    table { width:100%; border-collapse:collapse; min-width:620px; background:var(--panel); }
    th, td { border-bottom:1px solid var(--line); padding:9px 10px; text-align:left; vertical-align:top; }
    th { background:#eef3ef; }
    @media (max-width:640px) { main { padding:18px 12px 40px; } h1 { font-size:28px; } .top { align-items:flex-start; flex-direction:column; } table { min-width:560px; } }
  </style>
</head>
<body>
  <main>
    <div class="top">
      <a href="../index.html">AI Founder Knowledge Bank</a>
      <div class="path">${htmlEscape(relPath)}</div>
    </div>
    ${markdownToHtml(markdown, relPath)}
  </main>
</body>
</html>`;
}

function agentsMd() {
  return [
    '# AGENTS.md',
    '',
    'Instructions for future Codex/Claude sessions working inside this knowledge bank.',
    '',
    '## Safety',
    '',
    '- Never delete existing notes unless the maintainer explicitly asks.',
    '- Prefer appending, cross-linking, or moving uncertain material to `09_Inbox`.',
    '- Do not write secrets, API keys, private records, or credentials into this folder.',
    '- Keep the iCloud boundary intact; this folder is local-first under `local workspace`.',
    '',
    '## Canonical Layers',
    '',
    '- `index.html` is the human-facing dashboard. It must remain vanilla HTML, embedded CSS, and plain JavaScript with no build step.',
    '- Markdown files are the canonical knowledge/source layer.',
    '- `10_Agent_Data/*.json` files are machine-readable mirrors for agents and automation.',
    '- Do not make the reader read raw JSON to use the knowledge bank.',
    '',
    '## Update Rules',
    '',
    '- Every new person/topic/source/playbook/tool should use the relevant template in `08_Templates`.',
    '- Every significant claim should have a source link or be marked as `Hypothesis`.',
    '- Maintain `CHANGELOG.md`.',
    '- Maintain `10_Agent_Data/page-index.json`, `knowledge-graph.json`, `source-index.json`, `dashboard-data.json`, `mention-graph.json`, and `candidates.json` when adding major pages or changing links.',
    '- Update related links and backlinks when adding new content.',
    '- Update `index.html` when adding major pages or promoted candidates.',
    '',
    '## Evidence-Driven Expansion',
    '',
    '- Do not promote adjacent people just because they are famous or plausibly relevant.',
    '- Prefer repeated references from the curated mentor/source graph.',
    '- Keep weak candidates in `00_Home/candidates-to-review.md` and `10_Agent_Data/candidates.json`.',
    '- When promoting a candidate into a full page, include `Why This Was Added` and `Referred By / Mention Evidence`.',
    '',
    '## Browser Gate',
    '',
    '- After changing `index.html`, use Browser to verify the dashboard is readable, navigable, human-friendly, search/filter works, no raw JSON is exposed, and desktop/mobile layouts do not overlap.',
    '- Do not claim the knowledge bank update is done until Browser verification passes or the inability to use Browser is explicitly stated.',
    '',
    '## Style',
    '',
    '- Keep writing practical, dense, and non-fluffy.',
    '- Separate durable principles from tool-specific snapshots.',
    '- Mark confidence levels: High, Medium, Low.',
    '- Prefer tables, checklists, source notes, and playbooks over long essays.',
    ''
  ].join('\n');
}

function readme() {
  return [
    '# AI Founder Knowledge Bank',
    '',
    'A living, local-first personal wiki for becoming a stronger AI-native software developer, agentic manager, and eventual one-person company founder/operator.',
    '',
    'Open [index.html](index.html) for the human-facing dashboard. Markdown and JSON files support future Codex/Claude maintenance.',
    '',
    '## What This Is',
    '',
    '- A mentor map from the builder\'s curated list.',
    '- Source-backed lessons, playbooks, prompts, and tooling notes.',
    '- A candidate queue for people/tools/topics that repeatedly appear in the source graph.',
    '- A local dashboard that can be browsed without a dev server.',
    '',
    '## Weekly Use',
    '',
    '1. Open `index.html`.',
    '2. Review the weekly actions.',
    '3. Pick one product/distribution task, one agent workflow task, one engineering-quality task.',
    '4. Add sources before adding claims.',
    '5. Promote candidates only when evidence supports it.',
    '',
    '## Maintenance',
    '',
    'Future Codex sessions should read [AGENTS.md](AGENTS.md) before editing this folder.',
    ''
  ].join('\n');
}

function changelog() {
  return [
    '# CHANGELOG',
    '',
    `## ${today}`,
    '',
    '- Created initial AI Founder Knowledge Bank structure.',
    '- Added core mentor pages, topic pages, playbooks, tooling notes, source notes, templates, prompts, and JSON indexes.',
    '- Added vanilla `index.html` dashboard as the human-facing entry point.',
    '- Added evidence-driven candidate queue and mention graph.',
    '- Added GitHub Pages publishing support with `.nojekyll` and a conservative `.gitignore`.',
    ''
  ].join('\n');
}

function pageIndexEntries() {
  const entries = [
    { slug: 'readme', title: 'README', type: 'root', path: 'README.md', tags: ['home'] },
    { slug: 'index', title: 'HTML Dashboard', type: 'dashboard', path: 'index.html', tags: ['dashboard'] },
    { slug: 'roadmap', title: 'Ambitious Roadmap', type: 'roadmap', path: 'roadmap.md', tags: ['roadmap', 'ambitious'] },
    { slug: 'agents', title: 'AGENTS', type: 'instructions', path: 'AGENTS.md', tags: ['agents'] },
    { slug: 'changelog', title: 'CHANGELOG', type: 'log', path: 'CHANGELOG.md', tags: ['changelog'] },
    { slug: 'start-here', title: 'Start Here', type: 'home', path: '00_Home/start-here.md', tags: ['home'] },
    { slug: 'weekly-dashboard', title: 'Weekly Dashboard', type: 'dashboard', path: '00_Home/weekly-dashboard.md', tags: ['weekly'] },
    { slug: 'glossary', title: 'Glossary', type: 'glossary', path: '00_Home/glossary.md', tags: ['glossary'] },
    { slug: 'open-questions', title: 'Open Questions', type: 'questions', path: '00_Home/open-questions.md', tags: ['questions'] },
    { slug: 'candidates-to-review', title: 'Candidates To Review', type: 'candidate-queue', path: '00_Home/candidates-to-review.md', tags: ['candidates'] },
    ...people.map((person) => ({ slug: person.slug, title: person.name, type: 'person', path: `01_People/${person.slug}.md`, tags: person.tags, confidence: person.confidence })),
    ...topics.map((topic) => ({ slug: topic.slug, title: topic.title, type: 'topic', path: `02_Topics/${topic.slug}.md`, tags: topic.tags, confidence: topic.confidence })),
    ...playbooks.map((playbook) => ({ slug: playbook.slug, title: playbook.title, type: 'playbook', path: `03_Playbooks/${playbook.slug}.md`, tags: playbook.tags, confidence: playbook.confidence })),
    ...toolPages.map((tool) => ({ slug: tool.slug, title: tool.title, type: 'tooling', path: `04_Tooling/${tool.slug}.md`, tags: tool.tags, confidence: tool.confidence })),
    { slug: '90-day-roadmap', title: '90 Day Roadmap', type: 'roadmap', path: '05_Roadmaps/90-day-roadmap.md', tags: ['roadmap'] },
    { slug: 'weekly-review-template', title: 'Weekly Review Template', type: 'template', path: '05_Roadmaps/weekly-review-template.md', tags: ['review'] },
    { slug: 'monthly-review-template', title: 'Monthly Review Template', type: 'template', path: '05_Roadmaps/monthly-review-template.md', tags: ['review'] },
    ...promptFiles.map((file) => ({ slug: file.slug, title: file.title, type: 'prompts', path: `06_Prompts/${file.slug}.md`, tags: ['prompts'] })),
    { slug: 'source-index', title: 'Source Index', type: 'source-index', path: '07_Sources/source-index.md', tags: ['sources'] },
    { slug: 'sources-to-review', title: 'Sources To Review', type: 'source-queue', path: '07_Sources/sources-to-review.md', tags: ['sources'] },
    { slug: 'source-quality-rubric', title: 'Source Quality Rubric', type: 'rubric', path: '07_Sources/source-quality-rubric.md', tags: ['sources'] },
    ...sourceList.map((source) => ({ slug: source.slug, title: source.title, type: 'source-note', path: `07_Sources/${source.slug}.md`, tags: [source.type, ...source.relatedTopics], confidence: source.confidence })),
    ...['person-template', 'topic-template', 'playbook-template', 'tool-template', 'source-note-template', 'codex-update-template'].map((slug) => ({ slug, title: titleFromSlug(slug), type: 'template', path: `08_Templates/${slug}.md`, tags: ['template'] })),
    { slug: 'inbox-readme', title: 'Inbox README', type: 'inbox', path: '09_Inbox/README.md', tags: ['inbox'] }
  ];
  return entries.map((entry) => ({
    ...entry,
    human_path: humanPathForMd(entry.path),
    last_updated: today
  }));
}

function knowledgeGraph() {
  const nodes = [
    ...people.map((person) => ({ id: person.slug, label: person.name, type: 'person', confidence: person.confidence })),
    ...topics.map((topic) => ({ id: topic.slug, label: topic.title, type: 'topic', confidence: topic.confidence })),
    ...playbooks.map((playbook) => ({ id: playbook.slug, label: playbook.title, type: 'playbook', confidence: playbook.confidence })),
    ...toolPages.map((tool) => ({ id: tool.slug, label: tool.title, type: 'tooling', confidence: tool.confidence })),
    ...promptFiles.map((file) => ({ id: file.slug, label: file.title, type: 'prompts', confidence: 'High' })),
    ...sourceList.map((source) => ({ id: source.id, label: source.title, type: 'source', confidence: source.confidence })),
    ...candidates.map((candidate) => ({ id: candidate.slug, label: candidate.name, type: 'candidate', confidence: candidate.confidence }))
  ];
  const edges = [
    ...people.flatMap((person) => [
      ...person.topics.map((topic) => ({ from: person.slug, to: topic, relation: 'teaches' })),
      ...person.playbooks.map((playbook) => ({ from: person.slug, to: playbook, relation: 'informs-playbook' })),
      ...person.tools.map((tool) => ({ from: person.slug, to: tool, relation: 'informs-tooling' })),
      ...person.sourceIds.map((source) => ({ from: person.slug, to: source, relation: 'supported-by' }))
    ]),
    ...topics.flatMap((topic) => topic.sourceIds.map((source) => ({ from: topic.slug, to: source, relation: 'supported-by' }))),
    ...candidates.flatMap((candidate) => candidate.evidence.map((source) => ({ from: candidate.slug, to: source, relation: 'candidate-evidence' })))
  ];
  return { generated_at: today, nodes, edges };
}

function mentionGraph() {
  const mentions = {};
  for (const source of sourceList) {
    for (const mention of source.mentions) {
      const slug = mention.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      if (!mentions[slug]) {
        mentions[slug] = {
          slug,
          label: mention,
          mentioned_by_sources: [],
          mention_count: 0,
          confidence: 'Medium',
          promotion_status: 'tracked'
        };
      }
      mentions[slug].mentioned_by_sources.push(source.id);
      mentions[slug].mention_count += 1;
    }
  }
  for (const candidate of candidates) {
    mentions[candidate.slug] = {
      slug: candidate.slug,
      label: candidate.name,
      mentioned_by_sources: candidate.evidence,
      mention_count: candidate.evidence.length,
      confidence: candidate.confidence,
      promotion_status: 'candidate',
      reason: candidate.reason
    };
  }
  return { generated_at: today, mentions: Object.values(mentions).sort((a, b) => b.mention_count - a.mention_count || a.label.localeCompare(b.label)) };
}

function dashboardData() {
  return {
    generated_at: today,
    people: people.map((person) => ({
      slug: person.slug,
      name: person.name,
      handle: person.handle,
      role: person.role,
      confidence: person.confidence,
      tags: person.tags,
      path: humanPathForMd(`01_People/${person.slug}.md`),
      agent_path: `01_People/${person.slug}.md`,
      topics: person.topics,
      sourceIds: person.sourceIds
    })),
    topics: topics.map((topic) => ({
      slug: topic.slug,
      title: topic.title,
      confidence: topic.confidence,
      tags: topic.tags,
      path: humanPathForMd(`02_Topics/${topic.slug}.md`),
      agent_path: `02_Topics/${topic.slug}.md`,
      people: topic.people,
      sourceIds: topic.sourceIds
    })),
    playbooks: playbooks.map((playbook) => ({
      slug: playbook.slug,
      title: playbook.title,
      confidence: playbook.confidence,
      tags: playbook.tags,
      path: humanPathForMd(`03_Playbooks/${playbook.slug}.md`),
      agent_path: `03_Playbooks/${playbook.slug}.md`
    })),
    tools: toolPages.map((tool) => ({
      slug: tool.slug,
      title: tool.title,
      confidence: tool.confidence,
      tags: tool.tags,
      path: humanPathForMd(`04_Tooling/${tool.slug}.md`),
      agent_path: `04_Tooling/${tool.slug}.md`
    })),
    candidates,
    sources: sourceList.map((source) => ({
      id: source.id,
      slug: source.slug,
      title: source.title,
      type: source.type,
      author: source.author,
      url: source.url,
      confidence: source.confidence,
      path: humanPathForMd(`07_Sources/${source.slug}.md`),
      agent_path: `07_Sources/${source.slug}.md`,
      relatedPeople: source.relatedPeople,
      relatedTopics: source.relatedTopics
    }))
  };
}

function htmlDashboard() {
  const data = dashboardData();
  const allPages = pageIndexEntries();
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>AI Founder Knowledge Bank</title>
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%231f6f5b'/%3E%3Cpath d='M8 21h16M8 16h16M8 11h16' stroke='white' stroke-width='2.5' stroke-linecap='round'/%3E%3C/svg%3E">
  <style>
    :root {
      --bg: #f7f8f5;
      --panel: #ffffff;
      --panel-2: #eef3ef;
      --ink: #18211c;
      --muted: #667169;
      --line: #d8ded7;
      --accent: #1f6f5b;
      --accent-2: #7a4b1f;
      --warn: #9a5b13;
      --blue: #245c8c;
      --shadow: 0 12px 30px rgba(24, 33, 28, 0.08);
      --radius: 8px;
      --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      --sans: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: var(--sans);
      background: var(--bg);
      color: var(--ink);
      line-height: 1.45;
    }
    a { color: var(--accent); text-decoration: none; }
    a:hover { text-decoration: underline; }
    .shell {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 280px minmax(0, 1fr);
    }
    aside {
      position: sticky;
      top: 0;
      align-self: start;
      height: 100vh;
      padding: 22px 18px;
      border-right: 1px solid var(--line);
      background: #fbfcfa;
      overflow: auto;
    }
    .brand {
      font-size: 20px;
      font-weight: 760;
      letter-spacing: 0;
      margin-bottom: 8px;
    }
    .subtitle {
      color: var(--muted);
      font-size: 13px;
      margin-bottom: 18px;
    }
    .search {
      width: 100%;
      border: 1px solid var(--line);
      border-radius: var(--radius);
      padding: 10px 11px;
      font: 14px var(--sans);
      background: var(--panel);
      color: var(--ink);
      outline: none;
    }
    .search:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(31, 111, 91, 0.14);
    }
    nav {
      display: grid;
      gap: 5px;
      margin: 18px 0;
    }
    nav a {
      display: block;
      padding: 8px 10px;
      border-radius: 7px;
      color: var(--ink);
      font-size: 14px;
    }
    nav a:hover {
      background: var(--panel-2);
      text-decoration: none;
    }
    .side-meta {
      border-top: 1px solid var(--line);
      padding-top: 14px;
      color: var(--muted);
      font-size: 12px;
    }
    main {
      padding: 28px;
      max-width: 1380px;
      width: 100%;
    }
    .topbar {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 24px;
    }
    h1 {
      font-size: clamp(28px, 4vw, 46px);
      line-height: 1.05;
      letter-spacing: 0;
      margin: 0 0 10px;
    }
    h2 {
      font-size: 20px;
      margin: 0 0 14px;
      letter-spacing: 0;
    }
    h3 {
      font-size: 15px;
      margin: 0 0 8px;
      letter-spacing: 0;
    }
    p { margin: 0 0 10px; }
    .lead {
      max-width: 820px;
      color: var(--muted);
      font-size: 16px;
    }
    .quick-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: flex-end;
      min-width: 260px;
    }
    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 36px;
      padding: 8px 11px;
      border: 1px solid var(--line);
      border-radius: 7px;
      background: var(--panel);
      color: var(--ink);
      font-size: 13px;
      font-weight: 650;
    }
    .button.primary {
      border-color: var(--accent);
      background: var(--accent);
      color: white;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      gap: 16px;
      margin-bottom: 16px;
    }
    .panel {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: 16px;
    }
    .span-12 { grid-column: span 12; }
    .span-8 { grid-column: span 8; }
    .span-7 { grid-column: span 7; }
    .span-6 { grid-column: span 6; }
    .span-5 { grid-column: span 5; }
    .span-4 { grid-column: span 4; }
    .stat-row {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 10px;
    }
    .stat {
      border: 1px solid var(--line);
      border-radius: 7px;
      padding: 12px;
      background: #fbfcfa;
    }
    .stat strong {
      display: block;
      font-size: 24px;
      line-height: 1;
      margin-bottom: 4px;
    }
    .stat span {
      color: var(--muted);
      font-size: 12px;
    }
    .table-wrap {
      overflow-x: auto;
      border: 1px solid var(--line);
      border-radius: 7px;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      min-width: 720px;
      background: var(--panel);
    }
    th, td {
      border-bottom: 1px solid var(--line);
      padding: 10px 11px;
      vertical-align: top;
      text-align: left;
      font-size: 13px;
    }
    th {
      background: #f1f4f0;
      color: #344139;
      font-weight: 760;
      position: sticky;
      top: 0;
      z-index: 1;
    }
    tr:last-child td { border-bottom: 0; }
    #weekly table {
      min-width: 0;
      table-layout: auto;
    }
    #weekly th,
    #weekly td {
      white-space: normal;
      overflow-wrap: anywhere;
    }
    #weekly th:first-child,
    #weekly td:first-child {
      white-space: nowrap;
      overflow-wrap: normal;
      width: 62px;
    }
    .tag-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }
    .tag {
      display: inline-flex;
      align-items: center;
      min-height: 24px;
      padding: 3px 7px;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: #f7faf7;
      color: #39443d;
      font-size: 12px;
      white-space: nowrap;
    }
    .tag.high { border-color: rgba(31,111,91,.28); color: var(--accent); background: rgba(31,111,91,.08); }
    .tag.medium { border-color: rgba(154,91,19,.28); color: var(--warn); background: rgba(154,91,19,.08); }
    .list {
      display: grid;
      gap: 9px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .list li {
      border-left: 3px solid var(--accent);
      padding: 8px 10px;
      background: #fbfcfa;
      border-radius: 0 7px 7px 0;
      color: #344139;
      font-size: 14px;
    }
    .diagram {
      display: grid;
      grid-template-columns: repeat(4, minmax(160px, 1fr));
      gap: 10px;
      align-items: stretch;
    }
    .node {
      border: 1px solid var(--line);
      border-radius: var(--radius);
      background: #fbfcfa;
      padding: 12px;
      min-height: 118px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .node .label {
      font-weight: 760;
      margin-bottom: 6px;
    }
    .node .small {
      color: var(--muted);
      font-size: 12px;
    }
    .node.accent { border-color: rgba(31, 111, 91, .35); background: rgba(31, 111, 91, .07); }
    .node.blue { border-color: rgba(36, 92, 140, .35); background: rgba(36, 92, 140, .07); }
    .node.warn { border-color: rgba(154, 91, 19, .35); background: rgba(154, 91, 19, .07); }
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 10px;
    }
    .card {
      border: 1px solid var(--line);
      border-radius: var(--radius);
      padding: 12px;
      background: #fbfcfa;
      min-height: 130px;
    }
    .card-title {
      font-weight: 760;
      margin-bottom: 5px;
    }
    .card-meta {
      color: var(--muted);
      font-size: 12px;
      margin-bottom: 8px;
    }
    .page-results {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 10px;
    }
    .empty-state {
      border: 1px dashed var(--line);
      border-radius: var(--radius);
      background: #fbfcfa;
      color: var(--muted);
      padding: 16px;
      margin: 18px 0;
    }
    .hidden { display: none !important; }
    .mono {
      font-family: var(--mono);
      font-size: 12px;
      color: #39443d;
    }
    .footer {
      color: var(--muted);
      font-size: 12px;
      margin: 28px 0 10px;
    }
    @media (max-width: 980px) {
      .shell { grid-template-columns: 1fr; }
      aside {
        position: static;
        height: auto;
        border-right: 0;
        border-bottom: 1px solid var(--line);
      }
      nav {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      }
      main { padding: 18px; }
      .topbar { flex-direction: column; }
      .quick-actions { justify-content: flex-start; min-width: 0; }
      .span-8, .span-7, .span-6, .span-5, .span-4 { grid-column: span 12; }
      .stat-row { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .diagram { grid-template-columns: 1fr; }
    }
    @media (max-width: 560px) {
      aside { padding: 16px; }
      main { padding: 14px; }
      .panel { padding: 13px; }
      .stat-row { grid-template-columns: 1fr; }
      table { min-width: 620px; }
      h1 { font-size: 30px; }
    }
  </style>
</head>
<body>
  <div class="shell">
    <aside>
      <div class="brand">AI Founder Knowledge Bank</div>
      <div class="subtitle">Local wiki for agentic engineering, product judgment, and one-person company practice.</div>
      <input id="searchInput" class="search" type="search" placeholder="Search people, topics, sources..." aria-label="Search the knowledge bank">
      <nav aria-label="Dashboard sections">
        <a href="#weekly">Weekly actions</a>
        <a href="#mentor-map">Mentor map</a>
        <a href="#topic-map">Topic map</a>
        <a href="#playbooks">Playbooks</a>
        <a href="#sources">Sources</a>
        <a href="#candidates">Candidates</a>
        <a href="#maintenance">Maintenance</a>
      </nav>
      <div class="side-meta">
        <p><strong>Human-facing:</strong> this page.</p>
        <p><strong>Agent-facing:</strong> markdown and JSON indexes.</p>
        <p class="mono">Last updated: ${today}</p>
      </div>
    </aside>
    <main>
      <div class="topbar">
        <div>
          <h1>One-person AI company operating wiki</h1>
          <p class="lead">A source-backed mentor map, weekly operating dashboard, playbook library, and candidate graph for becoming a stronger AI-native builder and CEO. Browse this page; let agents maintain the markdown and JSON below it.</p>
        </div>
        <div class="quick-actions">
          <a class="button primary" href="${humanPathForMd('00_Home/weekly-dashboard.md')}">Weekly dashboard</a>
          <a class="button" href="${humanPathForMd('roadmap.md')}">Ambitious roadmap</a>
          <a class="button" href="${humanPathForMd('05_Roadmaps/90-day-roadmap.md')}">90-day roadmap</a>
          <a class="button" href="${humanPathForMd('06_Prompts/knowledge-bank-maintenance-prompts.md')}">Maintenance prompts</a>
        </div>
      </div>

      <section class="grid" aria-label="Stats">
        <div class="panel span-12">
          <div class="stat-row">
            <div class="stat"><strong>${data.people.length}</strong><span>core mentor pages</span></div>
            <div class="stat"><strong>${data.topics.length}</strong><span>topic maps</span></div>
            <div class="stat"><strong>${data.playbooks.length}</strong><span>operating playbooks</span></div>
            <div class="stat"><strong>${data.sources.length}</strong><span>source notes</span></div>
          </div>
        </div>
      </section>

      <section id="weekly" class="grid section-block" data-search-text="weekly actions what should i do this week operating rhythm">
        <div class="panel span-7">
          <h2>What Should I Do This Week?</h2>
          <ul class="list">
            <li>Delegate one bounded engineering task with explicit verification and record what happened.</li>
            <li>Run one product or distribution experiment that creates external evidence.</li>
            <li>Improve one code-quality guardrail: type, test, lint, doc, or refactor.</li>
            <li>Ingest one high-quality source and update the mention graph or candidate queue.</li>
          </ul>
        </div>
        <div class="panel span-5">
          <h2>Weekly Operating Rhythm</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Cadence</th><th>Action</th><th>Proof</th></tr></thead>
              <tbody>
                <tr><td>Daily</td><td>Run agent-ready tasks at natural breaks</td><td>Accepted diff or report</td></tr>
                <tr><td>Weekly</td><td>Founder review</td><td>Shipped artifact and next bet</td></tr>
                <tr><td>Monthly</td><td>Roadmap reset</td><td>Kill, iterate, or double down</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section class="grid section-block" data-search-text="diagram workflow source graph promotion markdown json browser">
        <div class="panel span-12">
          <h2>How The Knowledge Bank Works</h2>
          <div class="diagram" role="list" aria-label="Knowledge bank flow diagram">
            <div class="node accent" role="listitem">
              <div><div class="label">Curated mentors</div><div class="small">the builder's seed list anchors the worldview.</div></div>
              <a href="#mentor-map">Browse mentors</a>
            </div>
            <div class="node blue" role="listitem">
              <div><div class="label">Source notes</div><div class="small">Primary sources preserve claims, dates, and confidence.</div></div>
              <a href="#sources">Review sources</a>
            </div>
            <div class="node warn" role="listitem">
              <div><div class="label">Mention graph</div><div class="small">Repeated references become candidate evidence.</div></div>
              <a href="#candidates">See candidates</a>
            </div>
            <div class="node accent" role="listitem">
              <div><div class="label">Promoted pages</div><div class="small">Strong repeated signals become wiki nodes.</div></div>
              <a href="${humanPathForMd('03_Playbooks/candidate-promotion-workflow.md')}">Promotion workflow</a>
            </div>
          </div>
        </div>
      </section>

      <section id="mentor-map" class="grid section-block" data-search-text="mentor map people">
        <div class="panel span-12">
          <h2>Mentor Map</h2>
          <div class="table-wrap">
            <table id="mentorTable">
              <thead><tr><th>Person</th><th>Mentor role</th><th>Learn</th><th>Sources</th></tr></thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="topic-map" class="grid section-block" data-search-text="topic map principles">
        <div class="panel span-8">
          <h2>Topic Map</h2>
          <div class="cards" id="topicCards"></div>
        </div>
        <div class="panel span-4">
          <h2>High-Signal Practices</h2>
          <ul class="list">
            <li>Ask for options before high-blast-radius edits.</li>
            <li>Require Browser checks for human-facing UI.</li>
            <li>Turn repeated agent failures into prompts, tests, or evals.</li>
            <li>Keep adjacent mentors in candidates until evidence supports promotion.</li>
          </ul>
        </div>
      </section>

      <section id="playbooks" class="grid section-block" data-search-text="playbooks workflows prompts tools">
        <div class="panel span-6">
          <h2>Playbooks</h2>
          <div class="cards" id="playbookCards"></div>
        </div>
        <div class="panel span-6">
          <h2>Tooling Notes</h2>
          <div class="cards" id="toolCards"></div>
        </div>
      </section>

      <section id="sources" class="grid section-block" data-search-text="source index research source queue citations">
        <div class="panel span-12">
          <h2>Source Index</h2>
          <div class="table-wrap">
            <table id="sourceTable">
              <thead><tr><th>Source</th><th>Type</th><th>Confidence</th><th>Related</th><th>External</th></tr></thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="candidates" class="grid section-block" data-search-text="candidates review promote mention graph">
        <div class="panel span-7">
          <h2>Candidate Queue</h2>
          <div class="table-wrap">
            <table id="candidateTable">
              <thead><tr><th>Candidate</th><th>Confidence</th><th>Why not full page yet?</th><th>Evidence</th></tr></thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
        <div class="panel span-5">
          <h2>Promotion Rule</h2>
          <ul class="list">
            <li>Promote when at least two high-quality sources or core mentors independently point to the same person/topic/tool.</li>
            <li>Promote when one core mentor repeatedly references a person across multiple sources and the gap is important.</li>
            <li>Keep thin evidence in the candidate queue. Do not guess.</li>
          </ul>
        </div>
      </section>

      <section id="maintenance" class="grid section-block" data-search-text="maintenance add person add reference codex agents browser verify">
        <div class="panel span-6">
          <h2>Add A New Person</h2>
          <ul class="list">
            <li>Use <a href="${humanPathForMd('08_Templates/person-template.md')}">person-template.md</a>.</li>
            <li>Create source notes first when possible.</li>
            <li>Update mention graph, candidates, source index, related pages, changelog, and this dashboard.</li>
            <li>Use Browser to verify this page remains human-friendly.</li>
          </ul>
        </div>
        <div class="panel span-6">
          <h2>Add A New Reference</h2>
          <ul class="list">
            <li>Use <a href="${humanPathForMd('08_Templates/source-note-template.md')}">source-note-template.md</a>.</li>
            <li>Extract durable lessons, not every detail.</li>
            <li>Track mentioned people/tools/topics before promoting them.</li>
            <li>Use Browser to verify search, links, and layout after major updates.</li>
          </ul>
        </div>
      </section>

      <section class="grid section-block" data-search-text="all pages search results links">
        <div class="panel span-12">
          <h2>All Pages</h2>
          <div class="page-results" id="pageResults"></div>
        </div>
      </section>

      <div id="emptySearchState" class="empty-state hidden" role="status" aria-live="polite">
        No matching pages, people, sources, or playbooks. Try a broader term.
      </div>

      <div class="footer">
        Built as a local-first vanilla HTML dashboard. Markdown and JSON are maintained for agents; this page is for humans.
      </div>
    </main>
  </div>

  <script>
    const data = ${JSON.stringify(data)};
    const allPages = ${JSON.stringify(allPages)};
    const bySlug = Object.fromEntries([...data.people, ...data.topics, ...data.playbooks, ...data.tools].map(item => [item.slug, item]));

    function el(tag, attrs = {}, children = []) {
      const node = document.createElement(tag);
      for (const [key, value] of Object.entries(attrs)) {
        if (key === 'class') node.className = value;
        else if (key === 'text') node.textContent = value;
        else node.setAttribute(key, value);
      }
      for (const child of children) node.append(child);
      return node;
    }
    function link(path, text, className) {
      return el('a', { href: path, text, class: className || '' });
    }
    function tags(items) {
      const row = el('div', { class: 'tag-row' });
      for (const item of items.slice(0, 5)) row.append(el('span', { class: 'tag', text: item }));
      return row;
    }
    function confidenceTag(confidence) {
      return el('span', { class: 'tag ' + String(confidence).toLowerCase(), text: confidence });
    }
    function renderMentors() {
      const body = document.querySelector('#mentorTable tbody');
      body.innerHTML = '';
      for (const person of data.people) {
        const tr = el('tr', { 'data-search-text': [person.name, person.handle, person.role, person.tags.join(' ')].join(' ').toLowerCase() });
        const sourceLinks = person.sourceIds.map(id => data.sources.find(s => s.id === id)).filter(Boolean).slice(0, 3).map(s => link(s.path, s.title));
        tr.append(
          el('td', {}, [link(person.path, person.name), el('div', { class: 'card-meta', text: person.handle }), confidenceTag(person.confidence)]),
          el('td', { text: person.role }),
          el('td', {}, [tags(person.tags)]),
          el('td', {}, sourceLinks.flatMap((sourceLink, index) => index ? [document.createTextNode(', '), sourceLink] : [sourceLink]))
        );
        body.append(tr);
      }
    }
    function renderCards(targetId, items) {
      const target = document.getElementById(targetId);
      target.innerHTML = '';
      for (const item of items) {
        const card = el('article', { class: 'card', 'data-search-text': [item.title || item.name, item.tags?.join(' ') || '', item.confidence || ''].join(' ').toLowerCase() });
        card.append(
          el('div', { class: 'card-title' }, [link(item.path, item.title || item.name)]),
          el('div', { class: 'card-meta', text: (item.confidence || 'Medium') + ' confidence' }),
          tags(item.tags || [])
        );
        target.append(card);
      }
    }
    function renderSources() {
      const body = document.querySelector('#sourceTable tbody');
      body.innerHTML = '';
      for (const source of data.sources) {
        const related = [...source.relatedPeople.map(slug => bySlug[slug]?.name || slug), ...source.relatedTopics.map(slug => bySlug[slug]?.title || slug)].join(', ');
        const tr = el('tr', { 'data-search-text': [source.title, source.type, source.author, related].join(' ').toLowerCase() });
        tr.append(
          el('td', {}, [link(source.path, source.title), el('div', { class: 'card-meta', text: source.author })]),
          el('td', { text: source.type }),
          el('td', {}, [confidenceTag(source.confidence)]),
          el('td', { text: related || 'Candidate / topic source' }),
          el('td', {}, [link(source.url, 'Open source')])
        );
        body.append(tr);
      }
    }
    function renderCandidates() {
      const body = document.querySelector('#candidateTable tbody');
      body.innerHTML = '';
      for (const candidate of data.candidates) {
        const evidence = candidate.evidence.map(id => data.sources.find(s => s.id === id)).filter(Boolean).map(s => link(s.path, s.title));
        const tr = el('tr', { 'data-search-text': [candidate.name, candidate.reason, candidate.relatedTopics.join(' ')].join(' ').toLowerCase() });
        tr.append(
          el('td', { text: candidate.name }),
          el('td', {}, [confidenceTag(candidate.confidence)]),
          el('td', { text: candidate.reason }),
          el('td', {}, evidence.length ? evidence.flatMap((item, index) => index ? [document.createTextNode(', '), item] : [item]) : [document.createTextNode('Needs sources')])
        );
        body.append(tr);
      }
    }
    function renderPages() {
      const target = document.getElementById('pageResults');
      target.innerHTML = '';
      for (const page of allPages) {
        const card = el('article', { class: 'card', 'data-search-text': [page.title, page.type, (page.tags || []).join(' ')].join(' ').toLowerCase() });
        card.append(
          el('div', { class: 'card-title' }, [link(page.human_path || page.path, page.title)]),
          el('div', { class: 'card-meta', text: page.type }),
          tags(page.tags || [])
        );
        target.append(card);
      }
    }
    function applySearch() {
      const q = document.getElementById('searchInput').value.trim().toLowerCase();
      const searchable = document.querySelectorAll('[data-search-text]');
      let visibleCount = 0;
      for (const node of searchable) {
        const hit = !q || node.getAttribute('data-search-text').includes(q) || node.textContent.toLowerCase().includes(q);
        node.classList.toggle('hidden', !hit);
        if (hit) visibleCount += 1;
      }
      document.getElementById('emptySearchState').classList.toggle('hidden', !q || visibleCount > 0);
    }
    renderMentors();
    renderCards('topicCards', data.topics);
    renderCards('playbookCards', data.playbooks);
    renderCards('toolCards', data.tools);
    renderSources();
    renderCandidates();
    renderPages();
    document.getElementById('searchInput').addEventListener('input', applySearch);
  </script>
</body>
</html>`;
}

async function writeFile(rel, content) {
  const full = path.join(root, rel);
  await fs.mkdir(path.dirname(full), { recursive: true });
  await fs.writeFile(full, content.endsWith('\n') ? content : `${content}\n`, 'utf8');
}

async function writeHtmlMirrors() {
  for (const entry of pageIndexEntries()) {
    if (!entry.path.endsWith('.md')) continue;
    const markdown = await fs.readFile(path.join(root, entry.path), 'utf8');
    await writeFile(entry.human_path, markdownMirrorHtml(entry.title, entry.path, markdown));
  }
}

async function main() {
  for (const dir of dirs) await fs.mkdir(path.join(root, dir), { recursive: true });

  await writeFile('README.md', readme());
  await writeFile('AGENTS.md', agentsMd());
  await writeFile('CHANGELOG.md', changelog());
  await writeFile('index.html', htmlDashboard());

  await writeFile('00_Home/start-here.md', mapPage());
  await writeFile('00_Home/weekly-dashboard.md', weeklyDashboard());
  await writeFile('00_Home/glossary.md', glossary());
  await writeFile('00_Home/open-questions.md', openQuestions());
  await writeFile('00_Home/candidates-to-review.md', candidatesPage());

  for (const person of people) await writeFile(`01_People/${person.slug}.md`, personPage(person));
  for (const topic of topics) await writeFile(`02_Topics/${topic.slug}.md`, topicPage(topic));
  for (const playbook of playbooks) await writeFile(`03_Playbooks/${playbook.slug}.md`, playbookPage(playbook));
  for (const tool of toolPages) await writeFile(`04_Tooling/${tool.slug}.md`, toolPage(tool));

  await writeFile('05_Roadmaps/90-day-roadmap.md', roadmap());
  await writeFile('05_Roadmaps/weekly-review-template.md', reviewTemplate('weekly'));
  await writeFile('05_Roadmaps/monthly-review-template.md', reviewTemplate('monthly'));

  for (const file of promptFiles) await writeFile(`06_Prompts/${file.slug}.md`, promptPage(file));

  await writeFile('07_Sources/source-index.md', sourceIndex());
  await writeFile('07_Sources/sources-to-review.md', sourcesToReview());
  await writeFile('07_Sources/source-quality-rubric.md', sourceRubric());
  for (const source of sourceList) await writeFile(`07_Sources/${source.slug}.md`, sourcePage(source));

  const templateBodies = {
    'person-template': [
      '## Why This Was Added',
      '',
      'Core mentor, promoted candidate, or explicit the builder request. Include evidence.',
      '',
      '## Referred By / Mention Evidence',
      '',
      '-',
      '',
      '## Mentor Role',
      '',
      '## Why This Person Matters',
      '',
      '## Best Lessons For The Builder',
      '',
      '## Concrete Practices To Adopt',
      '',
      '## What Not To Over-Copy',
      '',
      '## Tools / Repos / Articles / Talks To Study',
      '',
      '## Related Topics',
      '',
      '## Related Playbooks',
      '',
      '## Related Tools',
      '',
      '## Exercises',
      '',
      '## Prompts Inspired By This Person',
      '',
      '## Sources',
      '',
      '## Confidence Notes',
      '',
      '## Related'
    ].join('\n'),
    'topic-template': [
      '## Why This Topic Matters',
      '',
      '## Key Principles',
      '',
      '## Mentor Perspectives',
      '',
      '## Tools And Practices',
      '',
      '## Exercises',
      '',
      '## Example Codex / Claude Prompts',
      '',
      '## Failure Modes',
      '',
      '## Sources',
      '',
      '## Related'
    ].join('\n'),
    'playbook-template': [
      '## Purpose',
      '',
      '## Steps',
      '',
      '## Checklist',
      '',
      '## How This Applies To The Builder',
      '',
      '## Sources',
      '',
      '## Related'
    ].join('\n'),
    'tool-template': [
      '## Why This Tooling Area Matters',
      '',
      '## Key Principles',
      '',
      '## Practices',
      '',
      '## How This Applies To The Builder',
      '',
      '## Sources',
      '',
      '## Related'
    ].join('\n'),
    'source-note-template': [
      '## Source Title',
      '',
      '## Source Type',
      '',
      'article, talk, repo, video, interview, thread, doc, paper, or tool',
      '',
      '## Author / Person',
      '',
      '## URL',
      '',
      '## Date Published',
      '',
      '## Date Reviewed',
      '',
      '## Summary',
      '',
      '## Key Takeaways',
      '',
      '## Claims Worth Importing',
      '',
      '## People / Tools / Topics Mentioned',
      '',
      '## Related People',
      '',
      '## Related Topics',
      '',
      '## Related Playbooks',
      '',
      '## Confidence',
      '',
      '## Follow-Up Questions'
    ].join('\n'),
    'codex-update-template': [
      '## Task',
      '',
      '## Files To Update',
      '',
      '## Source Evidence',
      '',
      '## Candidate / Mention Graph Updates',
      '',
      '## Dashboard Updates',
      '',
      '## Browser Verification',
      '',
      '## Changelog Entry'
    ].join('\n')
  };
  for (const [slug, body] of Object.entries(templateBodies)) await writeFile(`08_Templates/${slug}.md`, templatePage(slug, body));

  await writeFile('09_Inbox/README.md', [
    frontmatter({ title: 'Inbox', type: 'inbox', confidence: 'High', tags: ['inbox'], related: [], sources: [] }),
    '# Inbox',
    '',
    'Put raw notes, uncertain claims, pasted references, and unprocessed source material here. Do not promote material from the inbox until it has a source note, confidence, and related links.',
    ''
  ].join('\n'));

  await writeHtmlMirrors();

  await writeFile('10_Agent_Data/page-index.json', JSON.stringify(pageIndexEntries(), null, 2));
  await writeFile('10_Agent_Data/knowledge-graph.json', JSON.stringify(knowledgeGraph(), null, 2));
  await writeFile('10_Agent_Data/mention-graph.json', JSON.stringify(mentionGraph(), null, 2));
  await writeFile('10_Agent_Data/candidates.json', JSON.stringify({ generated_at: today, candidates }, null, 2));
  await writeFile('10_Agent_Data/source-index.json', JSON.stringify({ generated_at: today, sources: sourceList }, null, 2));
  await writeFile('10_Agent_Data/dashboard-data.json', JSON.stringify(dashboardData(), null, 2));
}

await main();
