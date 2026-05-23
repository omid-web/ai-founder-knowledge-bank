import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(process.cwd());
const today = '2026-05-23';

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

const sourceList = [
  {
    id: 'shopify-ai-playground',
    slug: 'shopify-ai-playground',
    title: 'Serious results, unserious methods: Shopify AI playground',
    type: 'article',
    author: 'Shopify / Tobias Lutke memo excerpt',
    url: 'https://www.shopify.com/news/unserious-exploration',
    published: '2025-11',
    confidence: 'High',
    relatedPeople: ['tobias-lutke'],
    relatedTopics: ['ai-native-ceo-operating-system', 'agentic-engineering'],
    mentions: ['Shopify', 'AI usage baseline', 'prototyping'],
    summary: 'Shopify describes internal AI usage and references Tobi Lutke\'s April 2025 memo that made reflexive AI usage a baseline expectation.',
    takeaways: [
      'AI use should become a baseline operating assumption, not an optional side project.',
      'Leaders can make AI adoption concrete by attaching it to resource allocation and review rituals.',
      'The risk is performative usage: adoption has to be tied to working demos and measurable leverage.'
    ],
    claims: [
      'Use AI proof-of-work before asking for more people or more process.',
      'Treat AI leverage as a management expectation that still needs human judgment.'
    ]
  },
  {
    id: 'tobi-compass-metric',
    slug: 'tobi-compass-metric',
    title: 'Pick your compass metric',
    type: 'article',
    author: 'Tobias Lutke',
    url: 'https://tobi.lutke.com/blogs/news/11280913-pick-your-compass-metric',
    published: '2013',
    confidence: 'High',
    relatedPeople: ['tobias-lutke'],
    relatedTopics: ['ai-native-ceo-operating-system', 'solo-founder-product-distribution'],
    mentions: ['CMRR', 'weekly cadence', 'Bessemer metrics', 'focus'],
    summary: 'Lutke argues for choosing one compass metric and building a tight weekly operating cadence around learning and next actions.',
    takeaways: [
      'A founder dashboard should have a small number of decisive metrics.',
      'Weekly cadence matters: what happened, what was learned, what changes next week.',
      'A one-person AI company should measure leverage and market proof, not activity.'
    ],
    claims: ['Use a weekly compass metric to keep AI experimentation tied to business outcomes.']
  },
  {
    id: 'tobi-human-excellence',
    slug: 'tobi-human-excellence',
    title: 'The Future Role of Human Excellence',
    type: 'article',
    author: 'Tobias Lutke',
    url: 'https://tobi.lutke.com/blogs/news/the-future-role-of-human-excellence',
    published: '2024',
    confidence: 'High',
    relatedPeople: ['tobias-lutke'],
    relatedTopics: ['ai-native-ceo-operating-system', 'agentic-engineering'],
    mentions: ['human plus machine', 'Kasparov', 'Deep Blue', 'judgment'],
    summary: 'Lutke frames human-plus-machine systems as a better model than pure replacement narratives.',
    takeaways: [
      'The useful unit is human judgment plus machine capability.',
      'AI operating systems should amplify excellence rather than remove ownership.'
    ],
    claims: ['Treat agents as leverage for judgment, not replacements for judgment.']
  },
  {
    id: 'tobi-apprentice-programmer',
    slug: 'tobi-apprentice-programmer',
    title: 'The Apprentice Programmer',
    type: 'article',
    author: 'Tobias Lutke',
    url: 'https://tobi.lutke.com/blogs/news/11280301-the-apprentice-programmer',
    published: '2013',
    confidence: 'High',
    relatedPeople: ['tobias-lutke'],
    relatedTopics: ['engineering-taste-code-quality'],
    mentions: ['apprenticeship', 'code review', 'fast feedback'],
    summary: 'Lutke reflects on programmer apprenticeship and learning through direct feedback.',
    takeaways: [
      'AI delegation should not eliminate apprenticeship-style feedback.',
      'Fast code feedback is still central to skill formation.'
    ],
    claims: ['Keep learning loops close even when agents accelerate output.']
  },
  {
    id: 'levelsio-blog',
    slug: 'levelsio-blog',
    title: 'Pieter Levels personal site and project archive',
    type: 'site',
    author: 'Pieter Levels',
    url: 'https://levels.io/',
    published: 'ongoing',
    confidence: 'High',
    relatedPeople: ['pieter-levels'],
    relatedTopics: ['solo-founder-product-distribution', 'shipping-small-products'],
    mentions: ['Nomad List', 'Remote OK', 'build in public', '12 startups in 12 months'],
    summary: 'Pieter Levels documents projects, indie-company building, public launch stories, and operational constraints of tiny profitable internet businesses.',
    takeaways: [
      'Distribution and speed matter as much as implementation.',
      'Small products can become meaningful businesses when scope, audience, and monetization stay concrete.',
      'Public learning loops can compound when the builder keeps shipping.'
    ],
    claims: [
      'Prefer shipping small, revenue-aware products over vague platform dreams.',
      'Use public feedback and direct market signals as a forcing function.'
    ]
  },
  {
    id: 'levels-projects',
    slug: 'levels-projects',
    title: 'List of all my projects ever',
    type: 'article',
    author: 'Pieter Levels',
    url: 'https://levels.io/projects/',
    published: 'ongoing',
    confidence: 'High',
    relatedPeople: ['pieter-levels'],
    relatedTopics: ['solo-founder-product-distribution', 'shipping-small-products'],
    mentions: ['project ledger', 'failure rate', 'Nomad List', 'Remote OK', 'Photo AI'],
    summary: 'Levels maintains a public ledger of projects, outcomes, and failures.',
    takeaways: [
      'A public or private project ledger makes shipping and failure rates visible.',
      'Many attempts are expected; the system matters more than any single idea.'
    ],
    claims: ['Maintain a project ledger with launch dates, status, revenue signal, and lessons.']
  },
  {
    id: 'levels-mvp',
    slug: 'levels-mvp',
    title: 'How I build my minimum viable products',
    type: 'article',
    author: 'Pieter Levels',
    url: 'https://levels.io/how-i-build-my-minimum-viable-products/',
    published: '2014',
    confidence: 'High',
    relatedPeople: ['pieter-levels'],
    relatedTopics: ['solo-founder-product-distribution', 'shipping-small-products'],
    mentions: ['MVP', 'simple stack', 'raw JS', 'PHP', 'Nginx', 'Linode'],
    summary: 'Levels describes a deliberately simple MVP stack optimized for speed and direct control.',
    takeaways: [
      'The right solo-founder stack is often the one you can debug quickly.',
      'Avoid architecture that delays market contact.'
    ],
    claims: ['Use boring, familiar tools when the goal is fast validation.']
  },
  {
    id: 'levels-validation',
    slug: 'levels-validation',
    title: 'The only real validation is people paying',
    type: 'article',
    author: 'Pieter Levels',
    url: 'https://levels.io/idea-validation/',
    published: '2014',
    confidence: 'High',
    relatedPeople: ['pieter-levels'],
    relatedTopics: ['solo-founder-product-distribution'],
    mentions: ['paid validation', 'Stripe', 'preorders'],
    summary: 'Levels argues that payment behavior is stronger validation than compliments or stated intent.',
    takeaways: [
      'Push toward payment or a strong proxy for payment as early as feasible.',
      'For enterprise workflows, pilots can be a staged proxy when immediate self-serve payment is unrealistic.'
    ],
    claims: ['Treat willingness to pay as the strongest validation signal.']
  },
  {
    id: 'levels-diy',
    slug: 'levels-diy',
    title: 'Instead of hiring people, do things yourself',
    type: 'article',
    author: 'Pieter Levels',
    url: 'https://levels.io/diy/',
    published: '2019',
    confidence: 'High',
    relatedPeople: ['pieter-levels'],
    relatedTopics: ['solo-founder-product-distribution', 'ai-native-ceo-operating-system'],
    mentions: ['DIY', 'automation', 'John Carmack', 'support', 'operations'],
    summary: 'Levels argues for staying close to the work and using automation rather than premature hiring.',
    takeaways: [
      'Doing work yourself teaches the system well enough to automate it.',
      'Agents should preserve closeness to the work, not hide it.'
    ],
    claims: ['Automate after understanding the workflow by doing it manually.']
  },
  {
    id: 'andrew-ng-official',
    slug: 'andrew-ng-official',
    title: 'Andrew Ng official site',
    type: 'site',
    author: 'Andrew Ng',
    url: 'https://www.andrewng.org/',
    published: 'ongoing',
    confidence: 'High',
    relatedPeople: ['andrew-ng'],
    relatedTopics: ['ai-native-ceo-operating-system', 'evals-observability-feedback-loops'],
    mentions: ['DeepLearning.AI', 'AI Fund', 'LandingAI', 'Coursera'],
    summary: 'Andrew Ng\'s official site summarizes his work across AI education, AI company creation, enterprise AI, and applied AI strategy.',
    takeaways: [
      'AI leverage requires both education and application selection.',
      'Durable AI strategy starts from workflows and data, not from model hype.',
      'Founders should learn enough AI fundamentals to make better product and build/buy decisions.'
    ],
    claims: [
      'Learn AI fundamentals while staying application-first.',
      'Look for repeated workflows where AI can improve cycle time or quality.'
    ]
  },
  {
    id: 'deeplearning-ai-about',
    slug: 'deeplearning-ai-about',
    title: 'DeepLearning.AI about page',
    type: 'site',
    author: 'DeepLearning.AI',
    url: 'https://www.deeplearning.ai/about',
    published: 'ongoing',
    confidence: 'High',
    relatedPeople: ['andrew-ng'],
    relatedTopics: ['ai-native-ceo-operating-system'],
    mentions: ['AI education', 'courses', 'applied AI'],
    summary: 'DeepLearning.AI describes its mission around world-class AI education and practical skill development.',
    takeaways: [
      'Build a learning loop: concepts, exercises, project application, review.',
      'Treat education as operational leverage when the field is moving quickly.'
    ],
    claims: ['A one-person company needs a deliberate learning system, not random tool chasing.']
  },
  {
    id: 'andrew-ai-transformation-playbook',
    slug: 'andrew-ai-transformation-playbook',
    title: 'Introducing the AI Transformation Playbook',
    type: 'article',
    author: 'Andrew Ng',
    url: 'https://medium.com/@andrewng/introducing-the-ai-transformation-playbook-58ccad4393e9',
    published: '2018',
    confidence: 'High',
    relatedPeople: ['andrew-ng'],
    relatedTopics: ['ai-native-ceo-operating-system', 'evals-observability-feedback-loops'],
    mentions: ['AI transformation', 'pilot projects', 'training', 'strategy', 'communication'],
    summary: 'Ng describes a playbook for organizational AI transformation built around pilot projects, training, strategy, and communication.',
    takeaways: [
      'Start with feasible pilots that build momentum.',
      'AI transformation requires capability-building, not just tool access.',
      'A solo founder can compress the enterprise playbook into personal operating rituals.'
    ],
    claims: ['Use pilot projects and training loops to become AI-native deliberately.']
  },
  {
    id: 'deeplearning-agentic-ai',
    slug: 'deeplearning-agentic-ai',
    title: 'Agentic AI course',
    type: 'course',
    author: 'DeepLearning.AI',
    url: 'https://www.deeplearning.ai/courses/agentic-ai',
    published: 'ongoing',
    confidence: 'High',
    relatedPeople: ['andrew-ng'],
    relatedTopics: ['agentic-engineering', 'evals-observability-feedback-loops'],
    mentions: ['reflection', 'tool use', 'planning', 'multi-agent workflows', 'evals'],
    summary: 'DeepLearning.AI\'s Agentic AI course covers patterns such as reflection, tool use, planning, and multi-agent collaboration.',
    takeaways: [
      'Agent workflows have repeatable patterns that can be studied and evaluated.',
      'Multi-agent systems require design and evals, not only enthusiasm.'
    ],
    claims: ['Learn agent patterns as engineering primitives.']
  },
  {
    id: 'karpathy-software-2',
    slug: 'karpathy-software-2',
    title: 'Software 2.0',
    type: 'article',
    author: 'Andrej Karpathy',
    url: 'https://karpathy.medium.com/software-2-0-a64152b37c35',
    published: '2017-11-11',
    confidence: 'High',
    relatedPeople: ['andrej-karpathy'],
    relatedTopics: ['agentic-engineering', 'context-engineering'],
    mentions: ['neural networks', 'datasets', 'programming paradigms'],
    summary: 'Karpathy frames trained neural networks as a new kind of software where behavior is specified through data and optimization rather than hand-written code.',
    takeaways: [
      'Programming paradigms change the bottleneck: data, feedback, and evaluation become part of software design.',
      'AI-native builders need to understand both code and learned behavior.',
      'The useful question is not whether AI writes code, but what new interface to computation is emerging.'
    ],
    claims: ['Software practice shifts when behavior is specified through data, prompts, and examples.']
  },
  {
    id: 'karpathy-software-changing',
    slug: 'karpathy-software-changing-again',
    title: 'Software Is Changing Again',
    type: 'talk',
    author: 'Andrej Karpathy',
    url: 'https://www.youtube.com/watch?v=LCEmiRjPEtQ',
    published: '2025-06',
    confidence: 'Medium',
    relatedPeople: ['andrej-karpathy'],
    relatedTopics: ['agentic-engineering', 'prompt-to-product'],
    mentions: ['Software 3.0', 'LLMs', 'natural language programming', 'agents'],
    summary: 'Karpathy describes a new software era where LLMs act as programmable computers controlled through natural language and context.',
    takeaways: [
      'Prompts and context become programming interfaces.',
      'The developer role shifts toward specifying, supervising, testing, and integrating.',
      'Agent hype should be balanced with realistic expectations about reliability and human-in-the-loop work.'
    ],
    claims: ['The main bottleneck moves from typing code to specifying intent and verifying output.']
  },
  {
    id: 'karpathy-zero-to-hero',
    slug: 'karpathy-zero-to-hero',
    title: 'Neural Networks: Zero to Hero',
    type: 'course',
    author: 'Andrej Karpathy',
    url: 'https://karpathy.ai/zero-to-hero.html',
    published: 'ongoing',
    confidence: 'High',
    relatedPeople: ['andrej-karpathy'],
    relatedTopics: ['context-engineering', 'engineering-taste-code-quality'],
    mentions: ['neural networks', 'from scratch', 'micrograd', 'nanoGPT'],
    summary: 'Karpathy teaches neural networks from first principles through small, readable implementations.',
    takeaways: [
      'Rebuilding fundamentals improves model intuition.',
      'Small reference implementations can make complex systems legible.'
    ],
    claims: ['Use tiny teaching implementations for understanding, not as production templates.']
  },
  {
    id: 'karpathy-micrograd',
    slug: 'karpathy-micrograd',
    title: 'micrograd',
    type: 'repo',
    author: 'Andrej Karpathy',
    url: 'https://github.com/karpathy/micrograd',
    published: 'ongoing',
    confidence: 'High',
    relatedPeople: ['andrej-karpathy'],
    relatedTopics: ['engineering-taste-code-quality'],
    mentions: ['autograd', 'neural networks', 'small implementation'],
    summary: 'A tiny scalar-valued autograd engine used for teaching neural network fundamentals.',
    takeaways: [
      'Small, inspectable code is an educational superpower.',
      'Agents should be asked for understandable reference implementations when learning.'
    ],
    claims: ['Prefer small explanatory code when the goal is learning.']
  },
  {
    id: 'karpathy-nanogpt',
    slug: 'karpathy-nanogpt',
    title: 'nanoGPT',
    type: 'repo',
    author: 'Andrej Karpathy',
    url: 'https://github.com/karpathy/nanoGPT',
    published: 'ongoing',
    confidence: 'High',
    relatedPeople: ['andrej-karpathy'],
    relatedTopics: ['context-engineering'],
    mentions: ['GPT', 'training', 'PyTorch', 'TinyShakespeare'],
    summary: 'A compact GPT training repository designed for clarity and hackability.',
    takeaways: [
      'Understand model training and inference through compact, runnable systems.',
      'Clarity-focused repos make better learning material than large production stacks.'
    ],
    claims: ['Study compact systems before relying on abstractions.']
  },
  {
    id: 'karpathy-llm-c',
    slug: 'karpathy-llm-c',
    title: 'llm.c',
    type: 'repo',
    author: 'Andrej Karpathy',
    url: 'https://github.com/karpathy/llm.c',
    published: 'ongoing',
    confidence: 'High',
    relatedPeople: ['andrej-karpathy'],
    relatedTopics: ['engineering-taste-code-quality'],
    mentions: ['C', 'CUDA', 'LLM training', 'performance'],
    summary: 'A lower-level LLM training project for understanding implementation and performance details.',
    takeaways: [
      'AI systems still bottom out in systems engineering and performance tradeoffs.',
      'A solo founder does not need to master every layer, but should know enough to reason about cost and capability.'
    ],
    claims: ['Keep some low-level literacy even when using high-level AI tools.']
  },
  {
    id: 'simon-agentic-patterns',
    slug: 'simon-agentic-engineering-patterns',
    title: 'Agentic Engineering Patterns',
    type: 'guide',
    author: 'Simon Willison',
    url: 'https://simonwillison.net/guides/agentic-engineering-patterns/',
    published: '2026-02',
    confidence: 'High',
    relatedPeople: ['simon-willison'],
    relatedTopics: ['agentic-engineering', 'evals-observability-feedback-loops'],
    mentions: ['Claude Code', 'OpenAI Codex', 'Red/green TDD', 'subagents', 'manual testing'],
    summary: 'Willison is building a guide to engineering practices for coding agents such as Claude Code and Codex.',
    takeaways: [
      'Writing code is cheaper; verification and judgment become more important.',
      'Red/green TDD and manual testing are agent multipliers.',
      'Professional agentic engineering is distinct from ignoring the code.'
    ],
    claims: [
      'Use coding agents to amplify existing engineering skill.',
      'Require tests, review, and explainability before accepting generated code.'
    ]
  },
  {
    id: 'simon-vibe-coding',
    slug: 'simon-not-all-ai-assisted-programming-is-vibe-coding',
    title: 'Not all AI-assisted programming is vibe coding',
    type: 'article',
    author: 'Simon Willison',
    url: 'https://simonwillison.net/2025/Mar/19/vibe-coding/',
    published: '2025-03-19',
    confidence: 'High',
    relatedPeople: ['simon-willison', 'andrej-karpathy'],
    relatedTopics: ['agentic-engineering', 'engineering-taste-code-quality'],
    mentions: ['vibe coding', 'responsible AI-assisted programming', 'accountability'],
    summary: 'Willison argues that professional AI-assisted programming still requires reading, testing, understanding, and owning the code.',
    takeaways: [
      'Vibe coding is useful for experiments and personal tools, but production work requires accountability.',
      'Generated code should be explainable by the person shipping it.',
      'The boundary between prototype and production must be explicit.'
    ],
    claims: ['Never ship AI-generated code you cannot explain and support.']
  },
  {
    id: 'simon-llm-cli',
    slug: 'simon-llm-cli',
    title: 'LLM command-line tool and ecosystem',
    type: 'repo',
    author: 'Simon Willison',
    url: 'https://github.com/simonw/llm',
    published: 'ongoing',
    confidence: 'High',
    relatedPeople: ['simon-willison'],
    relatedTopics: ['llm-cli-tools', 'agentic-engineering'],
    mentions: ['LLM CLI', 'plugins', 'local models', 'model experimentation'],
    summary: 'Simon Willison\'s LLM CLI provides a practical command-line interface and plugin ecosystem for working with multiple language models.',
    takeaways: [
      'CLI-first AI workflows are scriptable, inspectable, and easy to compose.',
      'A model lab belongs in a developer workflow, not only in web chat tabs.'
    ],
    claims: ['Use CLI tools to make AI work repeatable and auditable.']
  },
  {
    id: 'simon-llm-docs',
    slug: 'simon-llm-docs',
    title: 'LLM CLI documentation',
    type: 'docs',
    author: 'Simon Willison',
    url: 'https://llm.datasette.io/',
    published: 'ongoing',
    confidence: 'High',
    relatedPeople: ['simon-willison'],
    relatedTopics: ['llm-cli-tools', 'evals-observability-feedback-loops'],
    mentions: ['LLM CLI', 'plugins', 'templates', 'models'],
    summary: 'Documentation for Simon Willison\'s LLM command-line tool and plugin system.',
    takeaways: [
      'AI workflows become more reliable when they are scriptable and logged.',
      'Model experimentation should be easy to reproduce.'
    ],
    claims: ['Use CLI workflows to turn AI experiments into repeatable tools.']
  },
  {
    id: 'simon-lethal-trifecta',
    slug: 'simon-lethal-trifecta',
    title: 'The lethal trifecta for AI agents',
    type: 'article',
    author: 'Simon Willison',
    url: 'https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/',
    published: '2025-06-16',
    confidence: 'High',
    relatedPeople: ['simon-willison'],
    relatedTopics: ['security-risk-ai-agents', 'agentic-engineering'],
    mentions: ['prompt injection', 'private data', 'untrusted content', 'external communication'],
    summary: 'Willison identifies a dangerous combination for agents: access to private data, exposure to untrusted content, and ability to communicate externally.',
    takeaways: [
      'Agent risk depends on the combination of data access, untrusted instructions, and output channels.',
      'Security design must be part of the workflow, not a later patch.'
    ],
    claims: ['Never grant broad tool access to agents that also consume untrusted content without controls.']
  },
  {
    id: 'mitchell-ai-adoption',
    slug: 'mitchell-my-ai-adoption-journey',
    title: 'My AI Adoption Journey',
    type: 'article',
    author: 'Mitchell Hashimoto',
    url: 'https://mitchellh.com/writing/my-ai-adoption-journey',
    published: '2026-02-05',
    confidence: 'High',
    relatedPeople: ['mitchell-hashimoto'],
    relatedTopics: ['agentic-engineering', 'evals-observability-feedback-loops'],
    mentions: ['Claude Code', 'Codex', 'end-of-day agents', 'harness', 'slam dunks'],
    summary: 'Hashimoto describes a staged path from skepticism to useful agentic workflows, including reproducing manual work, end-of-day agents, and engineering harnesses.',
    takeaways: [
      'Learn agents by forcing them to reproduce your own high-quality work.',
      'Use agents first on slam-dunk tasks while preserving your own deep-work skill formation.',
      'Build harnesses so agents can verify their own work.'
    ],
    claims: ['Agent adoption should be empirical: compare output against your own standard.']
  },
  {
    id: 'mitchell-large-projects',
    slug: 'mitchell-building-large-technical-projects',
    title: 'My Approach to Building Large Technical Projects',
    type: 'article',
    author: 'Mitchell Hashimoto',
    url: 'https://mitchellh.com/writing/building-large-technical-projects',
    published: '2023-06-01',
    confidence: 'High',
    relatedPeople: ['mitchell-hashimoto'],
    relatedTopics: ['engineering-taste-code-quality', 'shipping-small-products'],
    mentions: ['demos', 'tests', 'technical projects', 'Ghostty'],
    summary: 'Hashimoto advocates decomposing large technical work into visible, testable chunks that produce frequent demos.',
    takeaways: [
      'Pick slices that produce visible progress.',
      'Use tests as early feedback when the work is not yet graphical.',
      'Do enough to reach the next demo, then iterate.'
    ],
    claims: ['For agentic work, assign demo-shaped tasks with clear verification loops.']
  },
  {
    id: 'mitchell-non-trivial-vibing',
    slug: 'mitchell-non-trivial-vibing',
    title: 'Vibing a Non-Trivial Ghostty Feature',
    type: 'article',
    author: 'Mitchell Hashimoto',
    url: 'https://mitchellh.com/writing/non-trivial-vibing',
    published: '2025-10-11',
    confidence: 'High',
    relatedPeople: ['mitchell-hashimoto'],
    relatedTopics: ['agentic-engineering', 'engineering-taste-code-quality'],
    mentions: ['Ghostty', 'non-trivial feature', 'AI-assisted development'],
    summary: 'Hashimoto walks through using AI on a real, non-trivial Ghostty feature rather than a toy example.',
    takeaways: [
      'Use scoped, real features to evaluate AI workflows.',
      'The useful benchmark is integration into a serious codebase, not a toy demo.'
    ],
    claims: ['Agentic engineering has to be judged on shipped work in real systems.']
  },
  {
    id: 'steipete-just-talk',
    slug: 'steipete-just-talk-to-it',
    title: 'Just Talk To It - the no-bs Way of Agentic Engineering',
    type: 'article',
    author: 'Peter Steinberger',
    url: 'https://steipete.me/posts/just-talk-to-it',
    published: '2025-10-14',
    confidence: 'High',
    relatedPeople: ['peter-steinberger'],
    relatedTopics: ['agentic-engineering', 'parallel-agent-workflow'],
    mentions: ['Codex', 'Claude Code', 'tmux', 'MCP', 'parallel agents', 'blast radius'],
    summary: 'Steinberger gives a practical account of parallel Codex/Claude workflows, blast-radius thinking, CLI preference, and iterative agent supervision.',
    takeaways: [
      'Parallel agents work best when changes are small enough to review and isolate.',
      'Use blast radius as a gut-check for whether a task is agent-safe.',
      'Prefer simple, visible tools and strong feedback loops over elaborate agent theater.'
    ],
    claims: [
      'Run more agents only if you can still review and steer their work.',
      'CLIs often beat MCPs when they are cheaper in context and easier to inspect.'
    ]
  },
  {
    id: 'steipete-workflow',
    slug: 'steipete-current-ai-dev-workflow',
    title: 'My Current AI Dev Workflow',
    type: 'article',
    author: 'Peter Steinberger',
    url: 'https://steipete.me/posts/2025/optimal-ai-development-workflow',
    published: '2025-08-25',
    confidence: 'High',
    relatedPeople: ['peter-steinberger'],
    relatedTopics: ['agentic-engineering', 'claude-code-and-codex-workflows'],
    mentions: ['Ghostty', 'Claude Code', 'VS Code', 'agent workflows'],
    summary: 'Steinberger documents an AI development setup centered on terminal workflows and iterative experimentation.',
    takeaways: [
      'Keep the loop visible: terminal, browser, tests, and source control.',
      'Make the agent work in the same feedback environment you use.'
    ],
    claims: ['Workflow taste matters as much as model choice.']
  },
  {
    id: 'steipete-openclaw',
    slug: 'steipete-openclaw-openai',
    title: 'OpenClaw, OpenAI and the future',
    type: 'article',
    author: 'Peter Steinberger',
    url: 'https://steipete.me/posts/2026/openclaw',
    published: '2026-02-14',
    confidence: 'High',
    relatedPeople: ['peter-steinberger'],
    relatedTopics: ['mcp-and-agent-tools', 'agentic-engineering'],
    mentions: ['OpenAI', 'OpenClaw', 'agents'],
    summary: 'Steinberger describes joining OpenAI and moving OpenClaw to an independent foundation.',
    takeaways: [
      'Agent tooling is becoming infrastructure, not just personal setup.',
      'Open ecosystems matter when workflows depend on tool portability.'
    ],
    claims: ['Track agent tools as an ecosystem, but keep your own workflow simple.']
  },
  {
    id: 'steipete-agent-rules',
    slug: 'steipete-agent-rules',
    title: 'agent-rules',
    type: 'repo',
    author: 'Peter Steinberger',
    url: 'https://github.com/steipete/agent-rules',
    published: 'ongoing',
    confidence: 'High',
    relatedPeople: ['peter-steinberger'],
    relatedTopics: ['agentic-engineering', 'context-engineering'],
    mentions: ['agent rules', 'Claude Code', 'Codex', 'workflow docs'],
    summary: 'Steinberger\'s public repository of agent rules and workflow guidance.',
    takeaways: [
      'Durable agent instructions deserve versioned files.',
      'Rules should evolve from actual workflow pain.'
    ],
    claims: ['Codify repeated successful agent patterns into reusable rules.']
  },
  {
    id: 'matt-typescript-ai-era',
    slug: 'matt-typescript-ai-era',
    title: 'The Case for TypeScript In The AI Coding Era',
    type: 'article',
    author: 'Matt Pocock',
    url: 'https://www.totaltypescript.com/the-case-for-typescript-in-the-ai-coding-era',
    published: '2026',
    confidence: 'High',
    relatedPeople: ['matt-pocock'],
    relatedTopics: ['engineering-taste-code-quality', 'typescript-ai-stack'],
    mentions: ['TypeScript', 'AI coding', 'types', 'contracts'],
    summary: 'Pocock argues that TypeScript remains highly valuable in the AI coding era because types constrain and clarify generated code.',
    takeaways: [
      'Types become guardrails for agents.',
      'Strong contracts improve generated code review and refactoring safety.',
      'Type errors are feedback that agents can use.'
    ],
    claims: ['Use TypeScript as an executable communication layer between you, agents, and future maintainers.']
  },
  {
    id: 'matt-total-typescript',
    slug: 'matt-total-typescript',
    title: 'Total TypeScript',
    type: 'site',
    author: 'Matt Pocock',
    url: 'https://www.totaltypescript.com/',
    published: 'ongoing',
    confidence: 'High',
    relatedPeople: ['matt-pocock'],
    relatedTopics: ['typescript-ai-stack', 'engineering-taste-code-quality'],
    mentions: ['TypeScript education', 'exercises', 'patterns'],
    summary: 'Total TypeScript is Pocock\'s educational platform for TypeScript fundamentals, exercises, and patterns.',
    takeaways: [
      'Develop type-system fluency to supervise agents in TypeScript codebases.',
      'Exercises make abstract type patterns operational.'
    ],
    claims: ['A solo AI builder should strengthen TypeScript fundamentals instead of outsourcing all code understanding.']
  },
  {
    id: 'matt-github',
    slug: 'matt-github',
    title: 'Matt Pocock GitHub profile',
    type: 'repo',
    author: 'Matt Pocock',
    url: 'https://github.com/mattpocock',
    published: 'ongoing',
    confidence: 'High',
    relatedPeople: ['matt-pocock'],
    relatedTopics: ['typescript-ai-stack', 'engineering-taste-code-quality'],
    mentions: ['TypeScript', 'ts-reset', 'education', 'examples'],
    summary: 'Matt Pocock\'s GitHub profile links TypeScript education and utility projects.',
    takeaways: [
      'Public examples and small utilities are useful teaching surfaces.',
      'TypeScript practice improves with concrete exercises and repos.'
    ],
    claims: ['Use public TypeScript examples to build review taste for agent-generated code.']
  },
  {
    id: 'matt-ts-reset',
    slug: 'matt-ts-reset',
    title: 'ts-reset',
    type: 'repo',
    author: 'Matt Pocock',
    url: 'https://github.com/mattpocock/ts-reset',
    published: 'ongoing',
    confidence: 'High',
    relatedPeople: ['matt-pocock'],
    relatedTopics: ['typescript-ai-stack'],
    mentions: ['TypeScript', 'standard library types', 'type safety'],
    summary: 'A TypeScript utility project that improves some default typings.',
    takeaways: [
      'Default platform types can be sharpened to reduce ambiguity.',
      'Type-level guardrails can make agents safer when used judiciously.'
    ],
    claims: ['Improve type defaults where it reduces real bugs and review burden.']
  },
  {
    id: 'theo-site',
    slug: 'theo-t3-site',
    title: 'Theo Browne / t3.gg',
    type: 'site',
    author: 'Theo Browne',
    url: 'https://t3.gg/',
    published: 'ongoing',
    confidence: 'High',
    relatedPeople: ['theo-browne'],
    relatedTopics: ['typescript-ai-stack', 'solo-founder-product-distribution'],
    mentions: ['T3 Chat', 'T3 Code', 'create-t3-app', 'TypeScript'],
    summary: 'Theo\'s site links his products and ecosystem work around T3 Chat, T3 Code, create-t3-app, and content.',
    takeaways: [
      'Tooling, content, and product can reinforce each other.',
      'Modern full-stack defaults matter when building quickly.'
    ],
    claims: ['Use a small, known stack and avoid novelty unless it buys clear leverage.']
  },
  {
    id: 'theo-github',
    slug: 'theo-github',
    title: 'Theo Browne GitHub profile',
    type: 'repo',
    author: 'Theo Browne',
    url: 'https://github.com/t3dotgg',
    published: 'ongoing',
    confidence: 'High',
    relatedPeople: ['theo-browne'],
    relatedTopics: ['typescript-ai-stack', 'shipping-small-products'],
    mentions: ['create-t3-app', 'uploadthing', 'unduck', 'TypeScript'],
    summary: 'Theo\'s GitHub profile shows open-source projects around TypeScript, Next.js, file upload infrastructure, and small utilities.',
    takeaways: [
      'Open-source artifacts can act as distribution and proof of taste.',
      'Reusable building blocks can become product wedges.'
    ],
    claims: ['For a one-person company, public tools can double as marketing and infrastructure.']
  },
  {
    id: 'create-t3-app',
    slug: 'create-t3-app',
    title: 'create-t3-app',
    type: 'repo',
    author: 'T3 OSS',
    url: 'https://github.com/t3-oss/create-t3-app',
    published: 'ongoing',
    confidence: 'High',
    relatedPeople: ['theo-browne'],
    relatedTopics: ['typescript-ai-stack', 'shipping-small-products'],
    mentions: ['Next.js', 'TypeScript', 'tRPC', 'Prisma', 'Tailwind'],
    summary: 'A modular full-stack TypeScript starter associated with the T3 ecosystem.',
    takeaways: [
      'Opinionated starter paths can reduce setup drag.',
      'Optional modules are useful when different products need different stack choices.'
    ],
    claims: ['Use starter stacks when they reduce decisions without hiding core tradeoffs.']
  },
  {
    id: 'thariq-site',
    slug: 'thariq-site',
    title: 'Thariq Shihipar personal site',
    type: 'site',
    author: 'Thariq Shihipar',
    url: 'https://www.thariq.io/',
    published: 'ongoing',
    confidence: 'High',
    relatedPeople: ['thariq-shihipar'],
    relatedTopics: ['agentic-engineering'],
    mentions: ['research', 'design', 'AI systems'],
    summary: 'Thariq Shihipar\'s personal site, useful as a canonical identity/source anchor.',
    takeaways: [
      'Use primary identity pages to anchor social-source-heavy mentor profiles.'
    ],
    claims: ['Keep Thariq claims grounded in primary or official sources where possible.']
  },
  {
    id: 'thariq-agent-design',
    slug: 'thariq-agent-design-space',
    title: 'Think like an agent / Claude Code agent design notes',
    type: 'thread',
    author: 'Thariq Shihipar',
    url: 'https://x.com/trq212/article/2027463795355095314',
    published: '2026-02-28',
    confidence: 'Medium',
    relatedPeople: ['thariq-shihipar'],
    relatedTopics: ['agentic-engineering', 'mcp-and-agent-tools'],
    mentions: ['Claude Code', 'agent action space', 'tools', 'progressive discovery'],
    summary: 'Thariq discusses agent tool/action-space design lessons from Claude Code. The source is an X article and mirrors, so keep claims tied to the URL.',
    takeaways: [
      'Design an agent\'s action space based on what the model can actually use well.',
      'Observe model behavior and iterate; agent tooling is empirical.',
      'Progressive discovery can beat exposing too many tools up front.'
    ],
    claims: ['Agent tools should match model capability and feedback loops, not a theoretical taxonomy.']
  },
  {
    id: 'thariq-workshop-recap',
    slug: 'thariq-workshop-recap',
    title: 'How We Claude Code - Thariq workshop recap',
    type: 'workshop-recap',
    author: 'Thariq Shihipar / community recap',
    url: 'https://howborisusesclaudecode.com/recap',
    published: '2026-05',
    confidence: 'Medium',
    relatedPeople: ['thariq-shihipar'],
    relatedTopics: ['claude-code-and-codex-workflows', 'parallel-agent-workflow'],
    mentions: ['Claude Code', 'parallel sessions', 'Boris Cherny', 'context management'],
    summary: 'A recap of Thariq Shihipar\'s Claude Code workshop. Useful for workflow signals, but treat as secondary unless backed by primary links.',
    takeaways: [
      'Parallel agent sessions are a recurring workflow pattern among Claude Code power users.',
      'Session/context management is a practical skill, not a side issue.'
    ],
    claims: ['Keep Thariq-derived workflow claims marked medium confidence unless primary Anthropic sources support them.']
  },
  {
    id: 'thariq-code-with-claude',
    slug: 'thariq-code-with-claude',
    title: 'Code with Claude session: How we Claude Code',
    type: 'talk',
    author: 'Anthropic / Thariq Shihipar',
    url: 'https://claude.com/code-with-claude/session/sf-ext-how-we-claude-code',
    published: '2025',
    confidence: 'High',
    relatedPeople: ['thariq-shihipar'],
    relatedTopics: ['claude-code-and-codex-workflows', 'parallel-agent-workflow'],
    mentions: ['Claude Code', 'workflow', 'verification', 'context'],
    summary: 'Official Claude event session page associated with Thariq and Claude Code workflow practice.',
    takeaways: [
      'Use official event/session pages to validate community workflow recaps.',
      'Claude Code practice is best learned through concrete workflow examples.'
    ],
    claims: ['Prefer official Claude sources when encoding Claude Code workflow rules.']
  },
  {
    id: 'anthropic-teams-claude-code',
    slug: 'anthropic-teams-claude-code',
    title: 'How teams use Claude Code',
    type: 'pdf',
    author: 'Anthropic',
    url: 'https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf',
    published: '2025',
    confidence: 'High',
    relatedPeople: ['thariq-shihipar'],
    relatedTopics: ['claude-code-and-codex-workflows', 'parallel-agent-workflow'],
    mentions: ['Claude Code', 'team workflows', 'context', 'verification'],
    summary: 'Anthropic PDF describing team workflows around Claude Code.',
    takeaways: [
      'Team usage patterns can inform a solo agent-manager routine.',
      'Context, review, and workflow integration are recurring themes.'
    ],
    claims: ['Adapt team Claude Code practices into a lightweight solo operating cadence.']
  },
  {
    id: 'claude-code-docs',
    slug: 'anthropic-claude-code-overview',
    title: 'Claude Code overview',
    type: 'docs',
    author: 'Anthropic',
    url: 'https://docs.anthropic.com/en/docs/claude-code/overview',
    published: 'ongoing',
    confidence: 'High',
    relatedPeople: ['thariq-shihipar'],
    relatedTopics: ['claude-code-and-codex-workflows', 'mcp-and-agent-tools'],
    mentions: ['Claude Code', 'terminal', 'MCP', 'GitHub'],
    summary: 'Anthropic\'s official overview of Claude Code, including terminal-native coding assistance and tool integrations.',
    takeaways: [
      'Official docs are the authority for tool behavior.',
      'Treat community workflow advice as overlays on top of official capabilities.'
    ],
    claims: ['Use official docs to verify tool features before encoding workflow assumptions.']
  },
  {
    id: 'claude-subagents-docs',
    slug: 'anthropic-claude-subagents',
    title: 'Claude Code subagents',
    type: 'docs',
    author: 'Anthropic',
    url: 'https://docs.anthropic.com/en/docs/claude-code/sub-agents',
    published: 'ongoing',
    confidence: 'High',
    relatedPeople: ['thariq-shihipar'],
    relatedTopics: ['parallel-agent-workflow', 'mcp-and-agent-tools'],
    mentions: ['subagents', 'context management', 'specialized assistants'],
    summary: 'Anthropic explains custom subagents for task-specific workflows and context management in Claude Code.',
    takeaways: [
      'Use subagents for bounded side tasks that would otherwise clutter the main context.',
      'Reusable specialist agents deserve written definitions and narrow scope.'
    ],
    claims: ['Parallelization is useful only when task boundaries are clear.']
  },
  {
    id: 'anthropic-effective-agents',
    slug: 'anthropic-building-effective-agents',
    title: 'Building Effective Agents',
    type: 'article',
    author: 'Anthropic',
    url: 'https://www.anthropic.com/research/building-effective-agents/',
    published: '2024-12',
    confidence: 'High',
    relatedPeople: ['thariq-shihipar'],
    relatedTopics: ['agentic-engineering', 'mcp-and-agent-tools'],
    mentions: ['workflows', 'agents', 'tools', 'routing', 'evaluator-optimizer'],
    summary: 'Anthropic distinguishes workflows from agents and provides practical patterns for building agentic systems.',
    takeaways: [
      'Prefer simple workflows when they solve the problem.',
      'Add autonomy only where it buys flexibility and the risk is bounded.',
      'Tool design and evaluation are central to useful agent systems.'
    ],
    claims: ['Do not build agent swarms when a deterministic workflow is enough.']
  },
  {
    id: 'openai-codex',
    slug: 'openai-codex',
    title: 'Codex',
    type: 'product-page',
    author: 'OpenAI',
    url: 'https://openai.com/codex/',
    published: 'ongoing',
    confidence: 'High',
    relatedPeople: ['peter-steinberger'],
    relatedTopics: ['claude-code-and-codex-workflows', 'agentic-engineering'],
    mentions: ['Codex', 'coding agent', 'pull requests', 'refactors'],
    summary: 'OpenAI describes Codex as a coding agent for building, reviewing, refactoring, and shipping software.',
    takeaways: [
      'Treat Codex as an execution partner that still needs task design and review.',
      'Use Codex for end-to-end slices with testable acceptance criteria.'
    ],
    claims: ['The human role is task framing, supervision, and acceptance, not blind approval.']
  },
  {
    id: 'openai-codex-app',
    slug: 'openai-codex-app',
    title: 'Introducing the Codex app',
    type: 'article',
    author: 'OpenAI',
    url: 'https://openai.com/index/introducing-the-codex-app',
    published: '2026-02',
    confidence: 'High',
    relatedPeople: ['peter-steinberger'],
    relatedTopics: ['parallel-agent-workflow', 'claude-code-and-codex-workflows'],
    mentions: ['Codex app', 'coordinated teams of agents', 'skills', 'desktop'],
    summary: 'OpenAI positions the Codex app as a way to supervise one or many coding agents across the software lifecycle.',
    takeaways: [
      'Multi-agent supervision is becoming a first-class product interface.',
      'Skills and local environment setup are part of agent reliability.'
    ],
    claims: ['Agent management is becoming a developer role, not a novelty.']
  },
  {
    id: 'jiayuan-github',
    slug: 'jiayuan-github',
    title: 'Jiayuan Zhang GitHub profile',
    type: 'repo',
    author: 'Jiayuan Zhang',
    url: 'https://github.com/forrestchang',
    published: 'ongoing',
    confidence: 'High',
    relatedPeople: ['jiayuan-zhang'],
    relatedTopics: ['parallel-agent-workflow', 'agentic-engineering'],
    mentions: ['Multica', 'AI-native builder', 'human-agent engineering teams', 'Andrej Karpathy skills'],
    summary: 'Jiayuan\'s GitHub profile describes Multica and open-source work around managing AI coding agents as team members.',
    takeaways: [
      'Agent management can become product infrastructure.',
      'A one-person company may need lightweight team-management patterns even when teammates are agents.'
    ],
    claims: ['Track Jiayuan as a high-signal but still emerging source; verify claims through repos and primary writing.']
  },
  {
    id: 'multica-github',
    slug: 'multica-github',
    title: 'Multica GitHub repository',
    type: 'repo',
    author: 'Jiayuan Zhang / Multica',
    url: 'https://github.com/multica-ai/multica',
    published: 'ongoing',
    confidence: 'Medium',
    relatedPeople: ['jiayuan-zhang'],
    relatedTopics: ['parallel-agent-workflow', 'mcp-and-agent-tools'],
    mentions: ['managed agents', 'human-agent teams', 'coding agents'],
    summary: 'Multica is presented as an open-source platform for assigning work to coding agents and tracking progress.',
    takeaways: [
      'The agent-manager metaphor benefits from task assignment, progress reporting, and memory.',
      'Open-source agent orchestration tools are worth watching but should be evaluated through actual workflow fit.'
    ],
    claims: ['Do not adopt orchestration because it looks powerful; test whether it improves your own cycle time.']
  },
  {
    id: 'multica-docs',
    slug: 'multica-docs',
    title: 'Multica documentation',
    type: 'docs',
    author: 'Multica',
    url: 'https://multica.ai/docs',
    published: 'ongoing',
    confidence: 'Medium',
    relatedPeople: ['jiayuan-zhang'],
    relatedTopics: ['parallel-agent-workflow', 'mcp-and-agent-tools'],
    mentions: ['managed agents', 'tasks', 'status', 'human-agent engineering teams'],
    summary: 'Documentation for Multica, a tool for managing AI coding agents.',
    takeaways: [
      'Agent management benefits from explicit task state, comments, and progress reporting.',
      'Product-positioning claims still need real workflow evaluation.'
    ],
    claims: ['Use Multica as a signal for emerging agent-management patterns, not proof that any orchestration layer is required.']
  },
  {
    id: 'hamel-evals',
    slug: 'hamel-evals',
    title: 'Hamel Husain blog',
    type: 'site',
    author: 'Hamel Husain',
    url: 'https://hamel.dev/',
    published: 'ongoing',
    confidence: 'High',
    relatedPeople: [],
    relatedTopics: ['evals-observability-feedback-loops'],
    mentions: ['evals', 'AI product debugging', 'Shreya Shankar', 'Inspect AI'],
    summary: 'Hamel Husain writes extensively about LLM evals, AI product debugging, and applied AI engineering.',
    takeaways: [
      'Evals should come from product-specific failure analysis, not generic benchmark worship.',
      'Error analysis is the starting point for useful evals.'
    ],
    claims: ['Candidate for future promotion if evals become a dedicated learning branch.']
  },
  {
    id: 'shreya-hamel-evals',
    slug: 'shreya-hamel-evals-course',
    title: 'AI Evals for Engineers and PMs',
    type: 'course',
    author: 'Hamel Husain and Shreya Shankar',
    url: 'https://maven.com/parlance-labs/evals',
    published: 'ongoing',
    confidence: 'High',
    relatedPeople: [],
    relatedTopics: ['evals-observability-feedback-loops'],
    mentions: ['Shreya Shankar', 'Hamel Husain', 'product-specific evals'],
    summary: 'Course page for practical AI evals by Hamel Husain and Shreya Shankar.',
    takeaways: [
      'Evals are a product practice, not just a research artifact.',
      'PM and engineering perspectives both matter for deciding what to measure.'
    ],
    claims: ['Hamel and Shreya are strong candidates for the candidate queue, not automatic full mentor pages yet.']
  },
  {
    id: 'eugene-yan',
    slug: 'eugene-yan',
    title: 'Eugene Yan writing',
    type: 'site',
    author: 'Eugene Yan',
    url: 'https://eugeneyan.com/',
    published: 'ongoing',
    confidence: 'High',
    relatedPeople: [],
    relatedTopics: ['evals-observability-feedback-loops', 'ai-native-ceo-operating-system'],
    mentions: ['LLM evals', 'production AI', 'product evals', 'AI workflows'],
    summary: 'Eugene Yan writes production-shaped essays about ML, LLMs, evals, leadership, and engineering practice.',
    takeaways: [
      'Production AI needs process, evaluation, and product-fit thinking.',
      'LLM-as-judge does not replace product judgment.'
    ],
    claims: ['Candidate for future promotion if production LLM systems become a major branch.']
  },
  {
    id: 'chip-huyen-ai-engineering',
    slug: 'chip-huyen-ai-engineering',
    title: 'AI Engineering',
    type: 'book',
    author: 'Chip Huyen',
    url: 'https://www.oreilly.com/library/view/ai-engineering/9781098166298/',
    published: '2024-12',
    confidence: 'High',
    relatedPeople: [],
    relatedTopics: ['evals-observability-feedback-loops', 'mcp-and-agent-tools'],
    mentions: ['AI engineering', 'foundation models', 'evaluation', 'AI stack'],
    summary: 'Chip Huyen\'s book covers building applications with foundation models, including evaluation and the AI engineering stack.',
    takeaways: [
      'A solo founder using AI should understand the AI app stack, not just prompting.',
      'Evaluation and maintenance are first-class parts of AI applications.'
    ],
    claims: ['Candidate for future promotion if AI engineering fundamentals become a learning track.']
  }
];

const sourceById = Object.fromEntries(sourceList.map((source) => [source.id, source]));

const people = [
  {
    slug: 'tobias-lutke',
    name: 'Tobias Lutke',
    handle: '@tobi',
    role: 'AI-native CEO and operating-system mentor',
    confidence: 'High',
    tags: ['ceo', 'ai-adoption', 'operations'],
    sourceIds: ['shopify-ai-playground', 'tobi-compass-metric', 'tobi-human-excellence', 'tobi-apprentice-programmer'],
    topics: ['ai-native-ceo-operating-system', 'agentic-engineering'],
    playbooks: ['weekly-founder-review', 'daily-agent-manager-routine'],
    tools: ['automation-stack'],
    whyAdded: 'Core mentor named by the builder. Useful for the CEO/operator expectation that AI leverage becomes normal work, not a side experiment.',
    referredBy: 'User-curated seed list.',
    matters: 'Tobi is a useful lens for company-level pressure: if AI changes the production function, leadership has to update expectations, hiring assumptions, and review rituals.',
    lessons: [
      'Make AI usage a baseline expectation, then inspect the actual work product.',
      'Resource requests should include evidence that an AI-first workflow was tried first.',
      'The CEO job is to change default behavior, not just endorse tools.'
    ],
    practices: [
      'Before asking for help or headcount, run an AI-assisted attempt and capture what failed.',
      'Add an AI leverage section to weekly reviews: tasks delegated, time saved, errors caught, workflows improved.',
      'Maintain a personal "AI can/cannot do this yet" ledger.'
    ],
    avoid: [
      'Do not turn AI adoption into theater; require demos and measured outcomes.',
      'Do not use AI as an excuse to skip mentoring, product judgment, or quality control.'
    ],
    exercises: [
      'Take one recurring business-workflow task and produce an AI-first attempt, failure notes, and a better reusable prompt.',
      'Write a one-page AI usage policy for yourself as a solo company.',
      'Create a weekly metric for agent leverage that measures accepted work, not generated tokens.'
    ],
    prompts: [
      'Act as my COO. Audit this week\'s work and identify where I failed to try an AI-first workflow before spending human time.',
      'Given this task list, rank items by AI-delegability, blast radius, expected review burden, and business value.',
      'Draft a resource request that proves what I tried with agents, what failed, and what human help is still needed.'
    ],
    confidenceNotes: 'Strong source for Shopify AI expectations; broader CEO lessons are inferred and should stay tied to operating rituals.'
  },
  {
    slug: 'pieter-levels',
    name: 'Pieter Levels',
    handle: '@levelsio',
    role: 'Solo product, distribution, and shipping mentor',
    confidence: 'High',
    tags: ['indie', 'shipping', 'distribution'],
    sourceIds: ['levelsio-blog', 'levels-projects', 'levels-mvp', 'levels-validation', 'levels-diy'],
    topics: ['solo-founder-product-distribution', 'shipping-small-products'],
    playbooks: ['shipping-small-products', 'build-in-public-system'],
    tools: ['automation-stack'],
    whyAdded: 'Core mentor named by the builder. Useful for the one-person company pattern: small scope, public learning, revenue, and direct distribution.',
    referredBy: 'User-curated seed list.',
    matters: 'Levels is a counterweight to over-engineering: the product has to reach customers and make money.',
    lessons: [
      'A small product with a clear buyer beats a polished platform with no distribution.',
      'Public momentum can be a distribution channel if the work is concrete.',
      'Use constraints: one person, few dependencies, fast shipping, direct revenue.'
    ],
    practices: [
      'Keep a shipped-products list with URL, customer, revenue hypothesis, and next experiment.',
      'Build one small product around a repeated pain you personally understand.',
      'Publish concise build notes when they teach something real.'
    ],
    avoid: [
      'Do not copy the lifestyle aesthetics without the distribution discipline.',
      'Do not confuse public posting with customer development.'
    ],
    exercises: [
      'List 10 business-workflow micro-products you could ship in one weekend.',
      'Pick one and write the landing copy before coding.',
      'Ask an agent to find the shortest path to a paid test, not the best architecture.'
    ],
    prompts: [
      'Act as a skeptical indie founder. Cut this idea to a weekend MVP with a specific buyer and distribution path.',
      'Turn this product idea into 5 small launch experiments I can run without a team.',
      'Review this feature list and remove anything that does not help me get a user, proof, or payment.'
    ],
    confidenceNotes: 'Good source for public project history; specific current tactics should be checked against recent posts before relying on them.'
  },
  {
    slug: 'andrew-ng',
    name: 'Andrew Ng',
    handle: '@AndrewYNg',
    role: 'Applied AI fundamentals and opportunity-selection mentor',
    confidence: 'High',
    tags: ['ai-fundamentals', 'education', 'applied-ai'],
    sourceIds: ['andrew-ng-official', 'deeplearning-ai-about', 'andrew-ai-transformation-playbook', 'deeplearning-agentic-ai'],
    topics: ['ai-native-ceo-operating-system', 'evals-observability-feedback-loops'],
    playbooks: ['customer-discovery-with-ai', 'weekly-founder-review'],
    tools: ['evals-and-test-harnesses'],
    whyAdded: 'Core mentor named by the builder. Useful for grounding AI ambition in fundamentals, education loops, and applied use cases.',
    referredBy: 'User-curated seed list.',
    matters: 'Andrew Ng is a lens for disciplined applied AI: learn the fundamentals, pick valuable workflows, and build around data and feedback.',
    lessons: [
      'AI value comes from applying capabilities to specific workflows.',
      'Education compounds when it is tied to practical projects.',
      'Strong AI builders understand enough of the stack to evaluate claims and failures.'
    ],
    practices: [
      'Maintain a fundamentals backlog: evals, retrieval, prompting, tool use, data quality, model limits.',
      'For each AI product idea, define the workflow, user, data, risk, and evaluation signal.',
      'Turn every AI concept into a small applied prototype.'
    ],
    avoid: [
      'Do not collect courses without shipping projects.',
      'Do not overfit to model hype instead of user workflow value.'
    ],
    exercises: [
      'Pick one business workflow and write the AI transformation map: input, output, user, failure cost, evaluation.',
      'Build a toy eval set for an AI assistant task you delegate often.',
      'Explain one AI concept in your own words and connect it to a product decision.'
    ],
    prompts: [
      'Act as an applied AI advisor. Identify which parts of this workflow are good AI candidates and which are not.',
      'Turn this AI idea into an evaluation plan with examples, failure modes, and acceptance criteria.',
      'Teach me the minimum AI concept I need to understand before building this feature.'
    ],
    confidenceNotes: 'Primary sources establish his institutions and applied AI focus; specific product advice should cite the exact article/course used.'
  },
  {
    slug: 'matt-pocock',
    name: 'Matt Pocock',
    handle: '@mattpocockuk',
    role: 'TypeScript clarity, contracts, and code-quality mentor',
    confidence: 'High',
    tags: ['typescript', 'code-quality', 'contracts'],
    sourceIds: ['matt-typescript-ai-era', 'matt-total-typescript', 'matt-github', 'matt-ts-reset'],
    topics: ['typescript-ai-stack', 'engineering-taste-code-quality'],
    playbooks: ['ai-code-review-checklist', 'refactoring-prompts'],
    tools: ['typescript-ai-stack'],
    whyAdded: 'Core mentor named by the builder and GitHub user requested. Useful for making TypeScript an agent guardrail.',
    referredBy: 'User-curated seed list.',
    matters: 'Matt is a practical mentor for making TypeScript readable, teachable, and strict enough to guide agents.',
    lessons: [
      'Types are executable specifications for agents and humans.',
      'Good TypeScript narrows ambiguity before the model writes code.',
      'Readable contracts reduce review burden.'
    ],
    practices: [
      'Require agents to preserve or improve type coverage when changing TS code.',
      'Use branded types, discriminated unions, and explicit interfaces where domain mistakes are expensive.',
      'Treat type errors as agent feedback, not busywork.'
    ],
    avoid: [
      'Do not write clever type puzzles that future agents and teammates cannot understand.',
      'Do not let agents silence TypeScript with broad casts.'
    ],
    exercises: [
      'Refactor one loose business-domain object into explicit TypeScript types.',
      'Ask an agent to explain every `any`, assertion, and broad cast in a file.',
      'Create a TS review checklist for AI-generated pull requests.'
    ],
    prompts: [
      'Review this TypeScript for places where stronger types would prevent AI-generated bugs.',
      'Refactor this API boundary into explicit types without adding cleverness.',
      'Explain the type-level intent of this file and flag casts that hide real uncertainty.'
    ],
    confidenceNotes: 'Strong primary source for TypeScript-in-AI-era claim; use article-specific claims rather than generalized TypeScript ideology.'
  },
  {
    slug: 'peter-steinberger',
    name: 'Peter Steinberger',
    handle: '@steipete',
    role: 'Agentic engineering workflow and high-throughput supervision mentor',
    confidence: 'High',
    tags: ['codex', 'claude-code', 'parallel-agents', 'workflow'],
    sourceIds: ['steipete-just-talk', 'steipete-workflow', 'steipete-openclaw', 'steipete-agent-rules'],
    topics: ['agentic-engineering', 'parallel-agent-workflow', 'mcp-and-agent-tools'],
    playbooks: ['parallel-agent-workflow', 'daily-agent-manager-routine', 'ai-code-review-checklist'],
    tools: ['claude-code-and-codex-workflows', 'mcp-and-agent-tools', 'llm-cli-tools'],
    whyAdded: 'Core mentor named by the builder and GitHub user requested. Useful for practical high-throughput AI coding workflows.',
    referredBy: 'User-curated seed list.',
    matters: 'Steipete is a high-signal field report for running many agents, keeping blast radius visible, and avoiding overbuilt harnesses.',
    lessons: [
      'Parallelism is valuable only when each task has a manageable blast radius.',
      'Visible terminals, CLIs, tests, and browser loops can beat opaque orchestration.',
      'Refactoring and maintenance are part of the agent workflow, not afterthoughts.'
    ],
    practices: [
      'Tag each delegated task with expected file count, risk, and verification command.',
      'Run refactor passes for duplication, dead code, large files, slow tests, and stale docs.',
      'Use screenshots and browser feedback when UI context matters.'
    ],
    avoid: [
      'Do not copy extreme parallelism before your review discipline can handle it.',
      'Do not let agent output volume become a substitute for product judgment.'
    ],
    exercises: [
      'Run two small agents on disjoint tasks and review whether parallelism helped or hurt.',
      'Create a blast-radius rubric for your current repo.',
      'Have an agent produce a refactor-only PR with tests and a tight file list.'
    ],
    prompts: [
      'Estimate the blast radius of this change before editing: files touched, risk, tests, rollback plan.',
      'Run a maintenance pass for duplication, dead code, oversized files, and missing tests. Propose edits before changing files.',
      'Give me three implementation options with different blast-radius profiles.'
    ],
    confidenceNotes: 'Primary blog posts are strong but opinionated. Treat tool preferences as time-sensitive snapshots.'
  },
  {
    slug: 'thariq-shihipar',
    name: 'Thariq Shihipar',
    handle: '@trq212',
    role: 'Claude Code and agent action-space mentor',
    confidence: 'Medium',
    tags: ['claude-code', 'agent-tools', 'context'],
    sourceIds: ['thariq-site', 'thariq-agent-design', 'thariq-workshop-recap', 'thariq-code-with-claude', 'anthropic-teams-claude-code', 'claude-code-docs', 'claude-subagents-docs'],
    topics: ['agentic-engineering', 'parallel-agent-workflow', 'mcp-and-agent-tools'],
    playbooks: ['parallel-agent-workflow', 'planning-before-coding'],
    tools: ['claude-code-and-codex-workflows', 'mcp-and-agent-tools'],
    whyAdded: 'Core mentor named by the builder. Useful for understanding Claude Code from someone associated with its design and public workflow guidance.',
    referredBy: 'User-curated seed list.',
    matters: 'Thariq is a mentor for thinking like an agent designer: action space, context, tools, and feedback loops.',
    lessons: [
      'Agent capability is shaped by the action space you expose.',
      'Tool design should be discovered empirically through model behavior.',
      'Context management is a real engineering discipline.'
    ],
    practices: [
      'When an agent fails, inspect whether the tool/action space was wrong before blaming the model.',
      'Prefer progressive discovery over dumping every tool and doc into context.',
      'Use subagents for bounded research or log-heavy side work.'
    ],
    avoid: [
      'Do not assume every X thread is stable documentation.',
      'Do not create too many tools before observing what the model needs.'
    ],
    exercises: [
      'Take one failed agent task and classify the failure: context, tool, instruction, model, or verification.',
      'Design a minimal tool/action set for a business support-agent workflow.',
      'Compare one subagent workflow against a single-context workflow.'
    ],
    prompts: [
      'Analyze this failed agent run as an action-space design problem.',
      'Given this task, what tools and context should the agent see initially, and what should be discovered later?',
      'Design a subagent for this bounded side task with narrow inputs and a compact report format.'
    ],
    confidenceNotes: 'Some sources are X/community recaps. Keep Thariq-specific claims medium confidence unless backed by official Anthropic docs.'
  },
  {
    slug: 'andrej-karpathy',
    name: 'Andrej Karpathy',
    handle: '@karpathy',
    role: 'Software paradigm and AI-native programming mentor',
    confidence: 'High',
    tags: ['software-2', 'software-3', 'llms', 'programming-models'],
    sourceIds: ['karpathy-software-2', 'karpathy-software-changing', 'karpathy-zero-to-hero', 'karpathy-micrograd', 'karpathy-nanogpt', 'karpathy-llm-c'],
    topics: ['agentic-engineering', 'context-engineering', 'prompt-to-product'],
    playbooks: ['planning-before-coding', 'eval-prompts'],
    tools: ['coding-agents', 'evals-and-test-harnesses'],
    whyAdded: 'Core mentor named by the builder. Useful for reframing what programming means when models, data, prompts, and agents become part of the system.',
    referredBy: 'User-curated seed list.',
    matters: 'Karpathy gives the highest-level mental model: AI changes the substrate and interface of software, not just the autocomplete tool.',
    lessons: [
      'Software is increasingly specified through data, prompts, examples, and context.',
      'Natural language is becoming an interface to computation, but verification remains hard.',
      'The builder role shifts toward intent, context, taste, and evaluation.'
    ],
    practices: [
      'Write task specs as executable context: examples, constraints, tests, and failure modes.',
      'Separate prototype vibe coding from production agentic engineering.',
      'Study model limitations through experiments, not only commentary.'
    ],
    avoid: [
      'Do not treat broad paradigm language as a substitute for concrete workflow design.',
      'Do not believe agent autonomy is solved just because demos are impressive.'
    ],
    exercises: [
      'Rewrite one coding task as Software 3.0 context: goal, examples, tests, constraints, review rubric.',
      'Build a throwaway prototype with AI, then write what would be required for production.',
      'Create a model-failure notebook for patterns you personally observe.'
    ],
    prompts: [
      'Turn this vague product idea into agent-readable context with examples, constraints, and tests.',
      'Analyze this workflow as Software 1.0, 2.0, and 3.0 components.',
      'List the human judgment bottlenecks that remain after agents write the code.'
    ],
    confidenceNotes: 'Software 2.0 source is primary. Software 3.0 talk source should be rechecked if relying on exact phrasing.'
  },
  {
    slug: 'jiayuan-zhang',
    name: 'Jiayuan Zhang',
    handle: '@jiayuan_jy',
    role: 'Human-agent team and agency mentor',
    confidence: 'Medium',
    tags: ['agent-management', 'human-agent-teams', 'agency'],
    sourceIds: ['jiayuan-github', 'multica-github', 'multica-docs'],
    topics: ['parallel-agent-workflow', 'agentic-engineering'],
    playbooks: ['parallel-agent-workflow', 'daily-agent-manager-routine'],
    tools: ['coding-agents', 'automation-stack'],
    whyAdded: 'Core mentor named by the builder. Useful for the emerging idea that agents can be managed like teammates with assignment, reporting, and compounding skills.',
    referredBy: 'User-curated seed list.',
    matters: 'Jiayuan is a lens for turning agent delegation into a durable management system rather than ad hoc prompting.',
    lessons: [
      'Agent work needs assignment, progress visibility, and review.',
      'Agency is a personal moat: the ability to turn intent into shipped artifacts quickly.',
      'Human-agent teams need operating rituals, not only chat windows.'
    ],
    practices: [
      'Maintain a queue of agent-ready tasks with owner, context, acceptance criteria, and review status.',
      'Track which agents/prompts compound over time.',
      'Use the candidate queue to separate promising tools from adopted tools.'
    ],
    avoid: [
      'Do not assume an orchestration platform improves output before measuring your own workflow.',
      'Do not let management abstractions hide code quality and product value.'
    ],
    exercises: [
      'Turn your current task list into an agent-team board with statuses.',
      'Run one task through assign, execute, report, review, and learn loops.',
      'Write a postmortem for an agent task that failed.'
    ],
    prompts: [
      'Act as my agent-team chief of staff. Convert this backlog into agent-ready tasks with acceptance criteria.',
      'Review these agent reports and identify which work is ready, risky, or needs human intervention.',
      'Create a reusable operating ritual for managing three coding agents without losing quality.'
    ],
    confidenceNotes: 'Primary GitHub profile and repo are strong for project claims; broader philosophy should be sourced from primary writing when available.'
  },
  {
    slug: 'mitchell-hashimoto',
    name: 'Mitchell Hashimoto',
    handle: '@mitchellh',
    role: 'Engineering craft, harness, and adoption-discipline mentor',
    confidence: 'High',
    tags: ['engineering-craft', 'harnesses', 'ghostty', 'agents'],
    sourceIds: ['mitchell-ai-adoption', 'mitchell-large-projects', 'mitchell-non-trivial-vibing'],
    topics: ['engineering-taste-code-quality', 'agentic-engineering', 'evals-observability-feedback-loops'],
    playbooks: ['planning-before-coding', 'ai-code-review-checklist', 'weekly-founder-review'],
    tools: ['evals-and-test-harnesses', 'coding-agents'],
    whyAdded: 'Core mentor named by the builder. Useful as the rigorous engineer who adopts AI through measured, real-codebase experiments.',
    referredBy: 'User-curated seed list.',
    matters: 'Mitchell is the antidote to sloppy AI adoption: reproduce your own standard, build harnesses, and keep demos/test feedback close.',
    lessons: [
      'Do the work manually, then force an agent to reproduce it to learn the workflow.',
      'Use end-of-day agents and slam-dunk tasks to build leverage without destroying focus.',
      'Large technical projects need visible progress and frequent demos.'
    ],
    practices: [
      'For each delegated task, define the harness that proves correctness.',
      'Turn off distracting agent notifications; check agents at natural breaks.',
      'Use tests and demos as motivation and verification.'
    ],
    avoid: [
      'Do not delegate tasks that would atrophy skills you still need to develop.',
      'Do not count generated code as progress until it passes a serious harness.'
    ],
    exercises: [
      'Reproduce one of your own recent commits with an agent and compare quality.',
      'Create an end-of-day agent task that gives you a warm start tomorrow.',
      'Design a tiny demo slice for a bigger product idea.'
    ],
    prompts: [
      'Recreate this manual change without seeing my solution. Match behavior and quality, then explain differences.',
      'Design a verification harness for this agent task before implementation.',
      'Break this large feature into demo-shaped slices with tests or visible proof for each slice.'
    ],
    confidenceNotes: 'Strong primary writing. His workflow is intentionally personal; adapt the principles, not every setup detail.'
  },
  {
    slug: 'theo-browne',
    name: 'Theo Browne',
    handle: '@theo',
    role: 'Modern full-stack, productized tooling, and developer-audience mentor',
    confidence: 'High',
    tags: ['typescript', 'full-stack', 'content', 'ai-products'],
    sourceIds: ['theo-site', 'theo-github', 'create-t3-app'],
    topics: ['typescript-ai-stack', 'solo-founder-product-distribution', 'shipping-small-products'],
    playbooks: ['shipping-small-products', 'build-in-public-system'],
    tools: ['typescript-ai-stack', 'coding-agents'],
    whyAdded: 'Core mentor named by the builder. Useful for combining web stack taste, open source, audience, and productized AI tooling.',
    referredBy: 'User-curated seed list.',
    matters: 'Theo is a lens for modern TypeScript defaults, fast product loops, and using public technical taste as distribution.',
    lessons: [
      'Pick a stack that lets you ship fast without fighting the platform.',
      'Open source and content can create trust before a product asks for money.',
      'AI products still need strong UX and engineering defaults.'
    ],
    practices: [
      'Default to a known TypeScript stack unless a different tool is clearly better.',
      'Make small utilities public when they demonstrate taste or solve repeated problems.',
      'Use content to explain decisions, not just announce launches.'
    ],
    avoid: [
      'Do not copy hot-take cadence or tool hype without your own evidence.',
      'Do not chase every full-stack trend while trying to build a business.'
    ],
    exercises: [
      'Create a one-page stack decision record for your next solo product.',
      'Turn one internal utility into a public GitHub repo with a clear README.',
      'Write a technical post explaining a product tradeoff you made.'
    ],
    prompts: [
      'Act as a pragmatic TypeScript founder. Choose the simplest stack for this product and justify every moving part.',
      'Review this open-source README for whether it builds trust and helps adoption.',
      'Find where my web app is over-engineered for a solo founder.'
    ],
    confidenceNotes: 'Primary site and GitHub are strong; claims about specific video opinions should be sourced separately.'
  },
  {
    slug: 'simon-willison',
    name: 'Simon Willison',
    handle: 'GitHub: simonw',
    role: 'LLM pragmatism, security, tools, and responsible agentic engineering mentor',
    confidence: 'High',
    tags: ['llms', 'agentic-engineering', 'security', 'cli'],
    sourceIds: ['simon-agentic-patterns', 'simon-vibe-coding', 'simon-llm-cli', 'simon-llm-docs', 'simon-lethal-trifecta'],
    topics: ['agentic-engineering', 'security-risk-ai-agents', 'llm-cli-tools', 'evals-observability-feedback-loops'],
    playbooks: ['ai-code-review-checklist', 'daily-agent-manager-routine'],
    tools: ['llm-cli-tools', 'evals-and-test-harnesses'],
    whyAdded: 'Core mentor named by the builder and GitHub user requested. Useful for sober LLM practice, prompt injection awareness, and practical tools.',
    referredBy: 'User-curated seed list.',
    matters: 'Simon is a mentor for practical skepticism: build tools, test claims, own generated code, and treat security seriously.',
    lessons: [
      'Agentic engineering is professional software engineering with agents, not abdication.',
      'Generated code must be reviewed, tested, understood, and explainable.',
      'CLI tools and small experiments make model behavior observable.'
    ],
    practices: [
      'Never commit AI code you cannot explain.',
      'Use red/green tests and manual browser checks to guide coding agents.',
      'Keep prompt injection and tool risk in scope for any LLM-connected workflow.'
    ],
    avoid: [
      'Do not call every AI-assisted workflow vibe coding.',
      'Do not let prototypes silently become production systems.'
    ],
    exercises: [
      'Write a code-review checklist specifically for AI-generated changes.',
      'Build one tiny LLM CLI experiment and write down what failed.',
      'Add a prompt-injection risk note to one AI feature idea.'
    ],
    prompts: [
      'Review this AI-generated code and tell me whether I can explain, test, and safely own it.',
      'Design red/green tests that will help a coding agent converge on this behavior.',
      'Audit this LLM feature for prompt injection, tool misuse, and data exposure risks.'
    ],
    confidenceNotes: 'Strong primary sources. Simon updates his views frequently, so current agentic-engineering guidance should be refreshed periodically.'
  }
];

const topics = [
  {
    slug: 'agentic-engineering',
    title: 'Agentic Engineering',
    confidence: 'High',
    tags: ['agents', 'coding', 'workflow'],
    sourceIds: ['simon-agentic-patterns', 'steipete-just-talk', 'mitchell-ai-adoption', 'anthropic-effective-agents'],
    people: ['simon-willison', 'peter-steinberger', 'mitchell-hashimoto', 'andrej-karpathy', 'thariq-shihipar'],
    why: 'This is the core practice of using coding agents as professional engineering amplifiers.',
    principles: [
      'Give agents bounded tasks with explicit acceptance criteria.',
      'Design feedback loops before implementation: tests, browser checks, screenshots, logs, or golden examples.',
      'Review generated work as if it came from a fast junior teammate with uneven judgment.',
      'Keep the distinction between prototypes and production explicit.'
    ],
    practices: [
      'Use red/green TDD when behavior is objective.',
      'Use Browser/manual QA for UI and human-facing workflows.',
      'Track blast radius: files touched, permissions, data exposure, rollback path.',
      'Record lessons from every failed agent run.'
    ],
    failureModes: [
      'Generated code volume hides bad architecture.',
      'The agent solves the wrong problem because context was underspecified.',
      'The human accepts output without being able to explain it.',
      'A prototype becomes production without security, tests, or ownership.'
    ]
  },
  {
    slug: 'ai-native-ceo-operating-system',
    title: 'AI-Native CEO Operating System',
    confidence: 'High',
    tags: ['ceo', 'operations', 'leverage'],
    sourceIds: ['shopify-ai-playground', 'andrew-ng-official', 'deeplearning-ai-about'],
    people: ['tobias-lutke', 'andrew-ng'],
    why: 'A one-person company needs operating rituals that convert AI capability into better decisions and faster execution.',
    principles: [
      'Default to AI-assisted attempts before asking for more time, help, or process.',
      'Measure accepted outcomes, not generated artifacts.',
      'Keep a management dashboard for leverage, bottlenecks, risk, and customer learning.',
      'Use AI to increase judgment surface area, not to outsource judgment.'
    ],
    practices: [
      'Weekly CEO review: product, distribution, engineering, cash, learning, agent leverage.',
      'Maintain a decision log for major product and tooling calls.',
      'Ask agents to prepare options and evidence; humans make the call.'
    ],
    failureModes: [
      'AI theater: lots of prompts, no shipped value.',
      'Delegating ambiguous strategy to a model instead of doing founder thinking.',
      'Ignoring morale and skill formation because AI appears faster.'
    ]
  },
  {
    slug: 'solo-founder-product-distribution',
    title: 'Solo Founder Product And Distribution',
    confidence: 'High',
    tags: ['founder', 'distribution', 'customers'],
    sourceIds: ['levelsio-blog', 'theo-site', 'theo-github'],
    people: ['pieter-levels', 'theo-browne'],
    why: 'The one-person company fails if it only gets good at building. Distribution and customer proof must be part of the work.',
    principles: [
      'Pick small products with visible buyers and direct feedback.',
      'Ship before the architecture feels complete.',
      'Use public artifacts as proof of taste, not empty content marketing.',
      'Revenue, retention, and repeated user pain beat vanity metrics.'
    ],
    practices: [
      'Write landing copy before building.',
      'Run a weekly distribution experiment.',
      'Build in public around useful lessons, not vague hype.',
      'Keep a customer-question bank and turn answers into product changes.'
    ],
    failureModes: [
      'Building infrastructure for an audience that does not exist.',
      'Confusing social engagement with demand.',
      'Letting agents make it too easy to add non-essential features.'
    ]
  },
  {
    slug: 'engineering-taste-code-quality',
    title: 'Engineering Taste And Code Quality',
    confidence: 'High',
    tags: ['quality', 'taste', 'maintenance'],
    sourceIds: ['matt-typescript-ai-era', 'mitchell-large-projects', 'simon-vibe-coding'],
    people: ['matt-pocock', 'mitchell-hashimoto', 'simon-willison'],
    why: 'When code is cheap, taste, maintainability, and ownership become stronger differentiators.',
    principles: [
      'The person shipping code owns it, even if an agent wrote it.',
      'Types, tests, and small modules are communication tools for future agents and humans.',
      'Frequent demos and reviewable changes beat massive hidden rewrites.',
      'Refactoring is a normal part of the agent loop.'
    ],
    practices: [
      'Ask agents to explain changed code before acceptance.',
      'Run typed, linted, tested checks where available.',
      'Schedule maintenance passes for duplication, dead code, and oversized files.',
      'Use comments only for tricky intent, not obvious narration.'
    ],
    failureModes: [
      'Agents pile abstractions on top of unclear requirements.',
      'Type casts hide real uncertainty.',
      'Review time grows faster than generation speed.'
    ]
  },
  {
    slug: 'evals-observability-feedback-loops',
    title: 'Evals, Observability, And Feedback Loops',
    confidence: 'High',
    tags: ['evals', 'observability', 'testing'],
    sourceIds: ['hamel-evals', 'shreya-hamel-evals', 'eugene-yan', 'mitchell-ai-adoption', 'simon-agentic-patterns'],
    people: ['andrew-ng', 'mitchell-hashimoto', 'simon-willison'],
    why: 'AI-native products and agent workflows need proof loops. Without evals, you are managing vibes.',
    principles: [
      'Start evals with observed failures and user value.',
      'Use small golden sets before complex dashboards.',
      'Evaluate every meaningful change in model, prompt, retrieval, or tool access.',
      'Prefer task-specific acceptance criteria over generic benchmark scores.'
    ],
    practices: [
      'Keep a failure log with input, expected behavior, actual behavior, and fix.',
      'Turn repeated failures into eval cases.',
      'Use LLM-as-judge only with calibration and spot checks.',
      'Run browser/manual QA for human-facing behavior.'
    ],
    failureModes: [
      'Using generic evals that do not map to user value.',
      'Measuring judge agreement instead of product usefulness.',
      'Skipping observability until users report silent failures.'
    ]
  },
  {
    slug: 'security-risk-ai-agents',
    title: 'Security And Risk For AI Agents',
    confidence: 'High',
    tags: ['security', 'prompt-injection', 'risk'],
    sourceIds: ['simon-vibe-coding', 'simon-agentic-patterns', 'anthropic-effective-agents'],
    people: ['simon-willison'],
    why: 'Agents can read, write, browse, call tools, and manipulate data. The blast radius has to be designed deliberately.',
    principles: [
      'Instructions and untrusted data can collide in LLM contexts.',
      'Tool permissions should match task risk.',
      'Use least privilege for files, secrets, network, and external systems.',
      'Review generated changes before they touch customers or data.'
    ],
    practices: [
      'Mark untrusted input in prompts and never let it override system/task instructions.',
      'Keep secrets out of source notes and screenshots.',
      'Run agents in scoped folders when possible.',
      'Require human approval for destructive or external side effects.'
    ],
    failureModes: [
      'Prompt injection through web pages, docs, tickets, or emails.',
      'Agents exfiltrate secrets through logs or generated files.',
      'Over-broad filesystem or API permissions turn a small mistake into a large incident.'
    ]
  },
  {
    slug: 'context-engineering',
    title: 'Context Engineering',
    confidence: 'Medium',
    tags: ['context', 'prompts', 'files'],
    sourceIds: ['karpathy-software-changing', 'thariq-agent-design', 'simon-agentic-patterns'],
    people: ['andrej-karpathy', 'thariq-shihipar', 'simon-willison'],
    why: 'The agent\'s output quality is shaped by the context it can see, the examples it receives, and the constraints it must satisfy.',
    principles: [
      'Context should include goals, constraints, examples, acceptance criteria, and relevant files.',
      'More context is not always better; progressive discovery reduces noise.',
      'Use markdown and JSON indexes to make a folder legible to agents.'
    ],
    practices: [
      'Use AGENTS.md for durable operating rules.',
      'Use source notes to preserve citations and confidence.',
      'Keep raw uncertain material in Inbox until promoted.'
    ],
    failureModes: [
      'Context poisoning from irrelevant or low-quality instructions.',
      'Agents miss important constraints because they are buried in long prose.',
      'Stale docs mislead future sessions.'
    ]
  },
  {
    slug: 'prompt-to-product',
    title: 'Prompt To Product',
    confidence: 'Medium',
    tags: ['product', 'prototyping', 'agents'],
    sourceIds: ['karpathy-software-changing', 'levelsio-blog', 'openai-codex-app'],
    people: ['andrej-karpathy', 'pieter-levels', 'theo-browne'],
    why: 'AI makes prototypes cheap, so the founder bottleneck becomes choosing, validating, finishing, and distributing the right thing.',
    principles: [
      'Use AI to compress prototype time, then spend saved time on customer proof.',
      'Prompts are not products; products require distribution, support, reliability, and payment.',
      'The best prompt-to-product loop includes demo, feedback, eval, and launch.'
    ],
    practices: [
      'Create a one-day prototype and a one-day customer test.',
      'Ask agents to generate multiple implementation paths before choosing.',
      'Use Browser QA to verify human-facing output.'
    ],
    failureModes: [
      'Infinite prototypes with no customer exposure.',
      'Shipping generated UX that is not actually usable.',
      'Ignoring support and ops because the build felt easy.'
    ]
  }
];

const playbooks = [
  {
    slug: 'daily-agent-manager-routine',
    title: 'Daily Agent Manager Routine',
    confidence: 'High',
    tags: ['daily', 'agents', 'management'],
    sourceIds: ['mitchell-ai-adoption', 'steipete-just-talk', 'simon-agentic-patterns'],
    steps: [
      'Pick one human deep-work task and one to three agent-safe tasks.',
      'For each agent task, write goal, context, acceptance criteria, files, risks, and verification.',
      'Start agents only when their work does not block your immediate next step.',
      'Check agents at planned breaks, not every notification.',
      'Accept, revise, or reject work based on evidence: diff, tests, browser, source links, or demo.',
      'End the day by creating one warm-start agent task for tomorrow.'
    ],
    checklist: [
      'Task has an owner: human or agent.',
      'Blast radius is known.',
      'Verification command or manual check is defined.',
      'Result is logged in weekly dashboard.'
    ]
  },
  {
    slug: 'weekly-founder-review',
    title: 'Weekly Founder Review',
    confidence: 'High',
    tags: ['weekly', 'ceo', 'review'],
    sourceIds: ['shopify-ai-playground', 'levelsio-blog', 'andrew-ng-official'],
    steps: [
      'Review shipped artifacts, not intentions.',
      'Measure agent leverage: accepted changes, rejected changes, lessons learned, time saved.',
      'Review customer/distribution work: conversations, launches, posts, revenue signals.',
      'Review engineering quality: tests, refactors, incidents, slow points.',
      'Pick next week\'s one product bet, one learning bet, and one system improvement.'
    ],
    checklist: [
      'What shipped?',
      'What did customers or users do?',
      'Where did agents help?',
      'Where did agents create cleanup work?',
      'What gets cut next week?'
    ]
  },
  {
    slug: 'planning-before-coding',
    title: 'Planning Before Coding',
    confidence: 'High',
    tags: ['planning', 'scope', 'agents'],
    sourceIds: ['mitchell-large-projects', 'simon-agentic-patterns', 'steipete-just-talk'],
    steps: [
      'Describe the outcome in user-visible terms.',
      'Define constraints and non-goals.',
      'Break work into demo-shaped slices.',
      'Ask for options when the blast radius is unclear.',
      'Choose verification before implementation.',
      'Only then start coding or delegation.'
    ],
    checklist: [
      'Outcome is concrete.',
      'Dependencies are known.',
      'Files likely touched are listed.',
      'Tests or Browser checks are defined.',
      'Rollback path exists.'
    ]
  },
  {
    slug: 'parallel-agent-workflow',
    title: 'Parallel Agent Workflow',
    confidence: 'High',
    tags: ['parallel', 'agents', 'delegation'],
    sourceIds: ['steipete-just-talk', 'claude-subagents-docs', 'openai-codex-app', 'jiayuan-github'],
    steps: [
      'Split work by disjoint files or independent research questions.',
      'Give each agent a narrow scope and explicit output format.',
      'Avoid delegating the immediate blocking task.',
      'Keep a visible board of active, waiting, review, and done.',
      'Integrate one result at a time.',
      'Record collisions and improve future scoping.'
    ],
    checklist: [
      'No overlapping write sets unless intentional.',
      'Each task has verification.',
      'Agent reports are short and source-backed.',
      'Human reviews all external effects.'
    ]
  },
  {
    slug: 'ai-code-review-checklist',
    title: 'AI Code Review Checklist',
    confidence: 'High',
    tags: ['review', 'quality', 'agents'],
    sourceIds: ['simon-vibe-coding', 'matt-typescript-ai-era', 'mitchell-ai-adoption'],
    steps: [
      'Read the diff before trusting the summary.',
      'Confirm the change matches the original goal.',
      'Run relevant tests and type checks.',
      'Look for broad casts, deleted tests, skipped errors, and hidden TODOs.',
      'Check security, data exposure, permissions, and user-visible regressions.',
      'Ask the agent to explain tricky code; reject what you cannot explain.'
    ],
    checklist: [
      'Can I explain this?',
      'Did tests prove the requested behavior?',
      'Did the agent remove constraints?',
      'Is the blast radius acceptable?',
      'Does the user-facing workflow still work?'
    ]
  },
  {
    slug: 'shipping-small-products',
    title: 'Shipping Small Products',
    confidence: 'High',
    tags: ['shipping', 'product', 'solo'],
    sourceIds: ['levelsio-blog', 'mitchell-large-projects', 'theo-github'],
    steps: [
      'Pick a narrow pain with a reachable buyer.',
      'Write the landing page and distribution plan before coding.',
      'Build the smallest demo that proves the promise.',
      'Use agents to create variants, tests, and polish.',
      'Launch to a specific channel.',
      'Record user response and decide: kill, iterate, or double down.'
    ],
    checklist: [
      'Buyer is named.',
      'Problem is specific.',
      'Demo is usable.',
      'Distribution channel is chosen.',
      'Success metric is defined.'
    ]
  },
  {
    slug: 'customer-discovery-with-ai',
    title: 'Customer Discovery With AI',
    confidence: 'Medium',
    tags: ['customers', 'research', 'crm'],
    sourceIds: ['andrew-ng-official', 'levelsio-blog', 'eugene-yan'],
    steps: [
      'Write the target customer and workflow.',
      'Use AI to draft interview questions, but do real conversations.',
      'Summarize calls into pains, current workaround, frequency, and willingness to pay.',
      'Extract repeated language into landing copy.',
      'Turn objections into product experiments.'
    ],
    checklist: [
      'Did they describe a recent real event?',
      'What do they do today?',
      'What does the problem cost?',
      'Did they ask for a follow-up?'
    ]
  },
  {
    slug: 'build-in-public-system',
    title: 'Build In Public System',
    confidence: 'Medium',
    tags: ['distribution', 'content', 'public'],
    sourceIds: ['levelsio-blog', 'theo-site'],
    steps: [
      'Post specific artifacts: demos, numbers, lessons, mistakes.',
      'Avoid vague inspiration or tool hype.',
      'Link public posts to product pages, repos, or waitlists.',
      'Reuse one build note into short post, long note, and docs improvement.',
      'Measure replies, signups, sales, and useful criticism.'
    ],
    checklist: [
      'Artifact shown?',
      'Lesson concrete?',
      'Audience clear?',
      'Next action linked?'
    ]
  },
  {
    slug: 'support-sales-ops-agents',
    title: 'Support, Sales, And Ops Agents',
    confidence: 'Medium',
    tags: ['ops', 'support', 'sales'],
    sourceIds: ['andrew-ng-official', 'anthropic-effective-agents'],
    steps: [
      'Map the workflow and failure cost.',
      'Start with draft assistance before autonomous action.',
      'Log inputs, outputs, edits, and customer impact.',
      'Create eval cases from real support/sales failures.',
      'Add tool access only after the draft loop is reliable.'
    ],
    checklist: [
      'Human approval where needed.',
      'PII and secrets handled.',
      'Escalation path exists.',
      'Customer-facing tone reviewed.'
    ]
  },
  {
    slug: 'candidate-promotion-workflow',
    title: 'Candidate Promotion Workflow',
    confidence: 'High',
    tags: ['knowledge-bank', 'candidates', 'sources'],
    sourceIds: ['simon-agentic-patterns'],
    steps: [
      'Track every notable mention in mention-graph.json.',
      'If a person/tool/topic appears in at least two high-quality sources, consider promotion.',
      'If the evidence is thin, keep it in candidates-to-review.',
      'Promoted pages must include "Why this was added" and mention evidence.',
      'Update index.html so the promoted node is visible to a human.'
    ],
    checklist: [
      'Mention evidence exists.',
      'Sources are linked.',
      'Confidence is marked.',
      'Dashboard updated.',
      'Browser verification passed.'
    ]
  }
];

const toolPages = [
  {
    slug: 'coding-agents',
    title: 'Coding Agents',
    confidence: 'High',
    tags: ['codex', 'claude-code', 'agents'],
    sourceIds: ['openai-codex', 'claude-code-docs', 'simon-agentic-patterns'],
    principles: [
      'Coding agents are execution partners, not autonomous owners.',
      'Best results come from task design, context, verification, and review.',
      'Use agents for bounded slices, research, refactors, tests, and prototypes.'
    ],
    practices: [
      'Always define acceptance criteria.',
      'Keep an agent-ready backlog.',
      'Track rejected agent work and why.'
    ]
  },
  {
    slug: 'claude-code-and-codex-workflows',
    title: 'Claude Code And Codex Workflows',
    confidence: 'High',
    tags: ['claude-code', 'codex', 'workflow'],
    sourceIds: ['claude-code-docs', 'openai-codex', 'openai-codex-app', 'steipete-just-talk'],
    principles: [
      'Use official docs for capabilities and community reports for workflow experiments.',
      'Keep agent tasks scoped and reviewable.',
      'Use Browser checks for UI output and tests for logic.'
    ],
    practices: [
      'Use subagents for noisy side research.',
      'Use Codex/Claude for implementation with verification gates.',
      'Record which model/tool performs well for which task.'
    ]
  },
  {
    slug: 'mcp-and-agent-tools',
    title: 'MCP And Agent Tools',
    confidence: 'Medium',
    tags: ['mcp', 'tools', 'cli'],
    sourceIds: ['anthropic-effective-agents', 'steipete-just-talk', 'claude-code-docs'],
    principles: [
      'Tools expand agent capability and risk.',
      'Prefer simple CLIs when they provide the same capability with less context overhead.',
      'Expose only the tools required for the task.'
    ],
    practices: [
      'Compare CLI vs MCP context cost.',
      'Use least privilege.',
      'Document tool assumptions in AGENTS.md.'
    ]
  },
  {
    slug: 'typescript-ai-stack',
    title: 'TypeScript AI Stack',
    confidence: 'High',
    tags: ['typescript', 'nextjs', 'contracts'],
    sourceIds: ['matt-typescript-ai-era', 'matt-total-typescript', 'theo-github'],
    principles: [
      'TypeScript gives agents contracts and fast feedback.',
      'Use types to encode domain intent at boundaries.',
      'Prefer boring, well-known stack defaults for solo products.'
    ],
    practices: [
      'Keep strict type checks on.',
      'Avoid broad casts.',
      'Use schema validation at external boundaries.'
    ]
  },
  {
    slug: 'llm-cli-tools',
    title: 'LLM CLI Tools',
    confidence: 'High',
    tags: ['cli', 'llm', 'automation'],
    sourceIds: ['simon-llm-cli', 'steipete-just-talk'],
    principles: [
      'CLI workflows are composable and inspectable.',
      'Agents can use command help and shell output as feedback.',
      'Small CLIs can beat large integrations for repeatability.'
    ],
    practices: [
      'Keep scripts idempotent.',
      'Prefer commands with clear dry-run and help output.',
      'Capture outputs in source notes when they inform decisions.'
    ]
  },
  {
    slug: 'evals-and-test-harnesses',
    title: 'Evals And Test Harnesses',
    confidence: 'High',
    tags: ['evals', 'tests', 'harness'],
    sourceIds: ['hamel-evals', 'shreya-hamel-evals', 'mitchell-ai-adoption', 'simon-agentic-patterns'],
    principles: [
      'A harness is what lets agents iterate without guessing.',
      'Evals should be built from real failures and product goals.',
      'Tests, Browser checks, golden examples, and manual reviews all count when matched to the requirement.'
    ],
    practices: [
      'Start with 10 to 20 high-value examples.',
      'Record expected behavior explicitly.',
      'Run evals before and after model/prompt/tool changes.'
    ]
  },
  {
    slug: 'automation-stack',
    title: 'Automation Stack',
    confidence: 'Medium',
    tags: ['automation', 'ops', 'solo-company'],
    sourceIds: ['shopify-ai-playground', 'anthropic-effective-agents'],
    principles: [
      'Automate repeatable work after you understand the workflow.',
      'Keep human approval for high-risk side effects.',
      'Use logs and review queues to prevent silent failures.'
    ],
    practices: [
      'Start with draft, then approval, then partial autonomy.',
      'Automate source ingestion and weekly review prep.',
      'Keep secrets local and out of notes.'
    ]
  },
  {
    slug: 'browser-qa-workflow',
    title: 'Browser QA Workflow',
    confidence: 'High',
    tags: ['browser', 'qa', 'dashboard'],
    sourceIds: ['simon-agentic-patterns'],
    principles: [
      'Human-facing artifacts need human-facing verification.',
      'A static dashboard is not done until it is readable in a browser.',
      'Desktop and mobile checks catch layout failures agents often miss.'
    ],
    practices: [
      'Open index.html with Browser.',
      'Verify search, links, text wrapping, and useful next actions.',
      'Fix and re-run Browser checks before claiming done.'
    ]
  }
];

const candidates = [
  {
    slug: 'hamel-husain',
    name: 'Hamel Husain',
    type: 'person',
    status: 'candidate',
    confidence: 'High',
    reason: 'Strong gap-fill candidate for evals and AI product debugging. Mentioned in eval sources, but not yet repeatedly referenced by core mentors in this first pass.',
    evidence: ['hamel-evals', 'shreya-hamel-evals'],
    relatedTopics: ['evals-observability-feedback-loops']
  },
  {
    slug: 'shreya-shankar',
    name: 'Shreya Shankar',
    type: 'person',
    status: 'candidate',
    confidence: 'High',
    reason: 'Strong candidate for evals, data quality, and production ML/AI observability. Needs a dedicated promotion review before full mentor page.',
    evidence: ['shreya-hamel-evals'],
    relatedTopics: ['evals-observability-feedback-loops']
  },
  {
    slug: 'eugene-yan',
    name: 'Eugene Yan',
    type: 'person',
    status: 'candidate',
    confidence: 'High',
    reason: 'Strong production AI/evals candidate. Useful gap-fill if production LLM systems become a major branch.',
    evidence: ['eugene-yan'],
    relatedTopics: ['evals-observability-feedback-loops', 'ai-native-ceo-operating-system']
  },
  {
    slug: 'chip-huyen',
    name: 'Chip Huyen',
    type: 'person',
    status: 'candidate',
    confidence: 'High',
    reason: 'Strong AI engineering fundamentals candidate. Keep as candidate until the knowledge bank adds a dedicated AI engineering learning track.',
    evidence: ['chip-huyen-ai-engineering'],
    relatedTopics: ['evals-observability-feedback-loops']
  },
  {
    slug: 'boris-cherny',
    name: 'Boris Cherny',
    type: 'person',
    status: 'candidate',
    confidence: 'Medium',
    reason: 'Appears in Claude Code workflow ecosystem and Thariq-related recaps. Needs primary-source review before promotion.',
    evidence: ['thariq-workshop-recap'],
    relatedTopics: ['claude-code-and-codex-workflows', 'parallel-agent-workflow']
  },
  {
    slug: 'addy-osmani',
    name: 'Addy Osmani',
    type: 'person',
    status: 'candidate',
    confidence: 'Medium',
    reason: 'Potential gap-fill for frontend/product quality and AI-assisted engineering. Not enough evidence from core mentor graph in this pass.',
    evidence: [],
    relatedTopics: ['engineering-taste-code-quality']
  },
  {
    slug: 'lenny-rachitsky',
    name: 'Lenny Rachitsky',
    type: 'person',
    status: 'candidate',
    confidence: 'Medium',
    reason: 'Potential gap-fill for product and growth. Not enough evidence from core mentor graph in this pass.',
    evidence: [],
    relatedTopics: ['solo-founder-product-distribution']
  }
];

const promptFiles = [
  {
    slug: 'research-prompts',
    title: 'Research Prompts',
    prompts: [
      'Research [person/topic] using primary sources first. Return durable lessons, source links, confidence, candidate mentions, and what not to over-copy.',
      'Find where [mentor] references other people, tools, repos, books, or papers. Update the mention graph and candidate queue without promoting weak evidence.',
      'Compare these three sources and extract only claims that are supported by at least two of them.'
    ]
  },
  {
    slug: 'planning-prompts',
    title: 'Planning Prompts',
    prompts: [
      'Before coding, turn this request into goal, constraints, non-goals, likely files, risks, acceptance criteria, and verification.',
      'Give me three implementation options with different blast-radius profiles and recommend one.',
      'Break this feature into demo-shaped slices that can each be verified.'
    ]
  },
  {
    slug: 'code-review-prompts',
    title: 'Code Review Prompts',
    prompts: [
      'Review this diff for correctness, scope creep, security risk, missing tests, and places where the code is harder to explain than necessary.',
      'Pretend this code was written by an AI agent. What would you verify before accepting it?',
      'Find hidden broad casts, swallowed errors, deleted constraints, and test weakening.'
    ]
  },
  {
    slug: 'product-strategy-prompts',
    title: 'Product Strategy Prompts',
    prompts: [
      'Cut this idea to a one-person MVP with one buyer, one painful workflow, one distribution channel, and one success metric.',
      'List the riskiest assumptions in this product and design the fastest evidence-gathering experiments.',
      'Write landing copy for this product before implementation; make the promise concrete and testable.'
    ]
  },
  {
    slug: 'eval-prompts',
    title: 'Eval Prompts',
    prompts: [
      'Build a small eval set for this AI workflow from observed failures and expected outputs.',
      'Turn these bug reports into regression evals with input, expected behavior, actual failure, and scoring rubric.',
      'Design a human review rubric for this LLM output that maps to user value, not generic quality.'
    ]
  },
  {
    slug: 'debugging-prompts',
    title: 'Debugging Prompts',
    prompts: [
      'Investigate this bug systematically. Produce hypotheses, evidence, experiments, and the smallest fix.',
      'Do not edit yet. Read the relevant files and tell me what must be true for this failure to happen.',
      'Create a reproduction path and verification command before fixing.'
    ]
  },
  {
    slug: 'refactoring-prompts',
    title: 'Refactoring Prompts',
    prompts: [
      'Run a refactor pass for duplication, dead code, oversized files, unclear names, and missing tests. Propose changes before editing.',
      'Split this file only where it reduces real complexity. Preserve behavior and add verification.',
      'Make this TypeScript safer without cleverness: improve types, remove casts, and keep API behavior stable.'
    ]
  },
  {
    slug: 'weekly-review-prompts',
    title: 'Weekly Review Prompts',
    prompts: [
      'Act as my AI-native CEO coach. Review this week across shipped work, customer proof, agent leverage, code quality, and next bets.',
      'Find the highest-leverage workflow I should turn into a reusable agent prompt next week.',
      'Review my rejected agent work and identify patterns in bad delegation.'
    ]
  },
  {
    slug: 'knowledge-bank-maintenance-prompts',
    title: 'Knowledge Bank Maintenance Prompts',
    prompts: [
      'In AI-Founder-Knowledge-Bank, add a new person page for [PERSON]. Follow AGENTS.md and 08_Templates/person-template.md. Research primary sources where possible. Update source notes, source-index.md, mention-graph.json, candidates-to-review.md if needed, related pages, index.html, and CHANGELOG.md. Use Browser to verify index.html remains human-friendly.',
      'In AI-Founder-Knowledge-Bank, ingest this reference: [URL or pasted text]. Create a source note, extract durable lessons into relevant pages, update mention graph/candidates/source index/index.html/changelog, and use Browser to verify the dashboard.',
      'In AI-Founder-Knowledge-Bank, review candidate [PERSON/TOPIC/TOOL] for promotion. Promote only if repeated references, a clear gap, or explicit maintainer direction justify it. Include why it was added and mention evidence.'
    ]
  }
];

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
    file.prompts.map((prompt) => `### ${prompt.slice(0, 48).replace(/\.$/, '')}\n\n\`\`\`text\n${prompt}\n\`\`\``).join('\n\n'),
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
    '- ',
    '',
    '## Agent Leverage',
    '',
    '- Accepted work:',
    '- Rejected work:',
    '- Lessons:',
    '',
    '## Product / Customer / Distribution',
    '',
    '- ',
    '',
    '## Engineering Quality',
    '',
    '- ',
    '',
    '## Knowledge Bank Updates',
    '',
    '- Sources added:',
    '- Candidates updated:',
    '- Pages changed:',
    '',
    '## Next Bet',
    '',
    '- ',
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
    ''
  ].join('\n');
}

function pageIndexEntries() {
  const entries = [
    { slug: 'readme', title: 'README', type: 'root', path: 'README.md', tags: ['home'] },
    { slug: 'index', title: 'HTML Dashboard', type: 'dashboard', path: 'index.html', tags: ['dashboard'] },
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
      for (const node of searchable) {
        const hit = !q || node.getAttribute('data-search-text').includes(q) || node.textContent.toLowerCase().includes(q);
        node.classList.toggle('hidden', !hit);
      }
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
      '- ',
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
