import assert from 'node:assert/strict';
import test from 'node:test';
import { buildDemoDetails, DEMO_DETAILS_LIMIT, permitProcesses } from '../src/lib/demo-details.ts';

test('unanswered optional fields omit request details', () => {
  assert.deepEqual(buildDemoDetails('', ''), { ok: true });
  assert.deepEqual(buildDemoDetails('', ' \n '), { ok: true });
});

test('an unanswered process preserves existing challenge-only payloads', () => {
  assert.deepEqual(buildDemoDetails('', '  Missing paperwork  '), { ok: true, challenge: 'Missing paperwork' });
});

test('every supported process is sent as labeled request context', () => {
  for (const process of permitProcesses) {
    assert.deepEqual(buildDemoDetails(process, ''), { ok: true, challenge: `Current process: ${process}` });
    assert.deepEqual(buildDemoDetails(process, 'Follow-up'), {
      ok: true,
      challenge: `Current process: ${process}\n\nPermitting challenge: Follow-up`,
    });
  }
});

test('unknown process answers are rejected, not silently dropped', () => {
  assert.equal(buildDemoDetails('Unknown', 'Follow-up').ok, false);
});

test('challenge-only payloads accept the limit and reject overflow without truncating', () => {
  const text = 'x'.repeat(DEMO_DETAILS_LIMIT);
  assert.deepEqual(buildDemoDetails('', text), { ok: true, challenge: text });
  const overflow = buildDemoDetails('', text + 'x');
  assert.equal(overflow.ok, false);
  assert.equal('challenge' in overflow, false);
});

test('combined answer includes labels and separators in the character budget', () => {
  for (const process of permitProcesses) {
    const prefix = `Current process: ${process}\n\nPermitting challenge: `;
    const text = 'x'.repeat(DEMO_DETAILS_LIMIT - prefix.length);
    assert.deepEqual(buildDemoDetails(process, text), { ok: true, challenge: prefix + text });
    const overflow = buildDemoDetails(process, text + 'x');
    assert.equal(overflow.ok, false);
    assert.equal('challenge' in overflow, false);
    if (!overflow.ok) assert.match(overflow.error, /Shorten your challenge by 1 characters/);
  }
});

test('multiline and unicode challenge content is preserved', () => {
  const text = 'Roof permit 🏠\nInspection follow-up';
  assert.deepEqual(buildDemoDetails('A mix', text), {
    ok: true,
    challenge: `Current process: A mix\n\nPermitting challenge: ${text}`,
  });
});
