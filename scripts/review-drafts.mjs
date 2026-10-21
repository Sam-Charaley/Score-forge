// Writes one HTML page per subject listing everything still waiting for
// review (reviewed: false): each question with its source, choices, marked
// key and explanation, and each FRQ with its sources, sample answers and
// rubric. Open it on a laptop or phone, then set reviewed: true in the files.
//
// Usage: npm run review:drafts -- <subject> [--all]
//   --all  include reviewed items too (to re-check a whole bank)
// Output: ../review/<subject>.html, next to the repo, not in it.
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { loadQuestions, loadTopicNames, loadFrqSet, REVIEW_DIR as OUTPUT_DIR } from './lib/content.mjs';

const CHOICE_LETTERS = ['A', 'B', 'C', 'D'];
const DIFFICULTY_NAMES = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };

const escapeHtml = value => String(value ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function sourceHtml({ label, text, citation }) {
  return `<blockquote class="source">${label ? `<b>${escapeHtml(label)}</b><br>` : ''}${escapeHtml(text)}<cite>${escapeHtml(citation)}</cite></blockquote>`;
}

// Tables are reviewed as tables; graphs and force diagrams by their alt text,
// which has to describe them in full anyway.
function figureHtml(figure) {
  if (!figure) return '';
  if (figure.type === 'table') {
    const head = figure.columns.map(c => `<th>${escapeHtml(c)}</th>`).join('');
    const body = figure.rows.map(row => `<tr>${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('');
    return `<table>${figure.caption ? `<caption>${escapeHtml(figure.caption)}</caption>` : ''}<tr>${head}</tr>${body}</table>`;
  }
  return `<p class="figure">Figure (${escapeHtml(figure.type)}): ${escapeHtml(figure.alt)}</p>`;
}

const codeHtml = code => (code ? `<pre>${escapeHtml(code)}</pre>` : '');

function questionHtml(q) {
  const choices = q.choices.map((choice, i) => `<li class="${i === q.answer ? 'key' : ''}">${CHOICE_LETTERS[i]}. ${escapeHtml(choice)}${i === q.answer ? ' <b>(key)</b>' : ''}</li>`).join('');
  const checks = q.verify ? `<span class="tag">key checked by code: ${escapeHtml(q.verify)}</span>` : '<span class="tag warn">key not checked by code</span>';
  return `<article>
<h3>${escapeHtml(q.id)} <span class="tag">${DIFFICULTY_NAMES[q.difficulty] ?? q.difficulty}</span> ${checks}${q.reviewed ? ' <span class="tag">reviewed</span>' : ''}</h3>
${q.stimulus ? sourceHtml(q.stimulus) : ''}
<p>${escapeHtml(q.prompt)}</p>
${figureHtml(q.figure)}${codeHtml(q.setup)}${codeHtml(q.code)}
<ol class="choices">${choices}</ol>
<p class="explanation"><b>Explanation:</b> ${escapeHtml(q.explanation)}</p>
<p class="file">${escapeHtml(q.file)}</p>
</article>`;
}

function frqHtml(frq, typeName) {
  const parts = frq.parts.map(part => `<section>
<h4>Part (${escapeHtml(part.id)})</h4>
<p>${escapeHtml(part.prompt)}</p>
${figureHtml(part.figure)}${part.header ? codeHtml(part.header) : ''}
<p><b>Sample answer:</b></p>${frq.setup ? codeHtml(part.solution) : `<p class="sample">${escapeHtml(part.solution)}</p>`}
<p><b>Rubric (${part.points.length} points):</b></p>
<ul>${part.points.map(pt => `<li>${escapeHtml(pt.id)}: ${escapeHtml(pt.text)}</li>`).join('')}</ul>
</section>`).join('');
  return `<article>
<h3>${escapeHtml(frq.id)} <span class="tag">${escapeHtml(typeName ?? frq.type)}</span>${frq.reviewed ? ' <span class="tag">reviewed</span>' : ''}</h3>
<p><b>${escapeHtml(frq.title)}</b></p>
<p>${escapeHtml(frq.intro)}</p>
${(frq.sources ?? []).map(sourceHtml).join('')}${figureHtml(frq.figure)}${codeHtml(frq.setup)}
${parts}
</article>`;
}

const PAGE_STYLE = `
:root { color-scheme: light dark; --ink: #1f2328; --muted: #59636e; --line: #d1d9e0; --key: #dafbe1; --warn: #fff1c2; --bg: #ffffff; }
@media (prefers-color-scheme: dark) { :root { --ink: #e6edf3; --muted: #9198a1; --line: #3d444d; --key: #12361d; --warn: #3b2e0a; --bg: #0d1117; } }
body { margin: 0 auto; max-width: 52rem; padding: 16px; font: 16px/1.55 system-ui, sans-serif; color: var(--ink); background: var(--bg); }
article { border-top: 1px solid var(--line); padding: 16px 0; }
h2 { margin-top: 32px; }
h3 { font-size: 1rem; }
pre { overflow-x: auto; padding: 10px; border: 1px solid var(--line); border-radius: 6px; }
blockquote.source { margin: 8px 0; padding: 8px 12px; border-left: 3px solid var(--line); white-space: pre-wrap; }
cite { display: block; margin-top: 6px; color: var(--muted); font-size: .875rem; }
.choices li.key { background: var(--key); }
.tag { font-size: .75rem; font-weight: 500; padding: 1px 6px; border: 1px solid var(--line); border-radius: 999px; }
.tag.warn { background: var(--warn); }
.file, .figure { color: var(--muted); font-size: .875rem; }
.sample { white-space: pre-wrap; }
table { border-collapse: collapse; margin: 8px 0; }
td, th { border: 1px solid var(--line); padding: 4px 8px; text-align: left; }
`;

async function main() {
  const [subjectId, ...flags] = process.argv.slice(2);
  if (!subjectId) {
    console.error('Usage: npm run review:drafts -- <subject> [--all]');
    process.exit(1);
  }
  const includeReviewed = flags.includes('--all');
  const keep = item => includeReviewed || item.reviewed !== true;

  const [questions, topicNames, { frqs, types }] = await Promise.all([loadQuestions(subjectId), loadTopicNames(subjectId), loadFrqSet(subjectId)]);
  if (questions.length === 0 && frqs.length === 0) {
    console.error(`No questions or FRQs found for "${subjectId}".`);
    process.exit(1);
  }
  const shownQuestions = questions.filter(keep);
  const shownFrqs = frqs.filter(keep);

  const byTopic = new Map();
  for (const q of shownQuestions) byTopic.set(q.topic, [...(byTopic.get(q.topic) ?? []), q]);
  const topicSections = [...byTopic].map(([topic, items]) =>
    `<h2>${escapeHtml(topicNames.get(topic) ?? topic)} (${items.length})</h2>${items.map(questionHtml).join('')}`).join('');
  const frqSection = shownFrqs.length ? `<h2>Free response (${shownFrqs.length})</h2>${shownFrqs.map(f => frqHtml(f, types[f.type])).join('')}` : '';

  const title = `${subjectId} ${includeReviewed ? 'all items' : 'drafts'} for review`;
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(title)}</title><style>${PAGE_STYLE}</style></head><body>
<h1>${escapeHtml(title)}</h1>
<p>${shownQuestions.length} questions and ${shownFrqs.length} FRQs. Generated ${new Date().toISOString().slice(0, 10)}. Set <code>reviewed: true</code> in the file listed under each item once it's right.</p>
${topicSections}${frqSection}
</body></html>`;

  mkdirSync(OUTPUT_DIR, { recursive: true });
  const outFile = path.join(OUTPUT_DIR, `${subjectId}.html`);
  writeFileSync(outFile, html);
  console.log(`Wrote ${outFile}: ${shownQuestions.length} questions, ${shownFrqs.length} FRQs.`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
