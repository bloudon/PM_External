import assert from 'node:assert/strict';
import test from 'node:test';
import { contractorPath, tradePaths, legacyLandingPaths, landingRedirectTarget } from '../src/lib/landing-routes.ts';

test('landing paths use the owner-requested spelling and capitalization', () => {
  assert.equal(contractorPath, '/Contractors');
  assert.deepEqual(tradePaths, {
    roofing: '/roofing',
    'windows-and-doors': '/Windows-doors',
    hvac: '/HVAC',
  });
});

test('all four legacy routes forward once without losing encoded query or fragment', () => {
  assert.equal(Object.keys(legacyLandingPaths).length, 4);
  for (const [path, target] of Object.entries(legacyLandingPaths)) {
    assert.equal(landingRedirectTarget(path), target);
    assert.equal(landingRedirectTarget(path, '?utm_source=test%20campaign&x=1&x=2', '#section%20two'),
      `${target}?utm_source=test%20campaign&x=1&x=2#section%20two`);
    assert.equal(landingRedirectTarget(path, '', '#faq'), `${target}#faq`);
    assert.equal(landingRedirectTarget(target), undefined, 'canonical paths cannot redirect into a loop');
  }
});

test('unrelated pages and unrecognized paths never become compatibility redirects', () => {
  for (const path of ['/solutions/permit-expediters', '/demo', '/signup', '/', '/solutions/contractors/unknown', '/solutions/contractors-malicious', 'toString', '__proto__']) {
    assert.equal(landingRedirectTarget(path, '?keep=1', '#keep'), undefined);
  }
});
