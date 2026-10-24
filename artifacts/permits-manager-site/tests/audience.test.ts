import assert from 'node:assert/strict';
import test from 'node:test';
import { parseBt, audienceQuery } from '../src/lib/audience.ts';

test('direct visits and invalid audience values remain neutral', () => {
  for (const query of ['', '?businessType=unknown', '?businessType=', '?businessType=CONTRACTOR', '?other=contractor']) {
    assert.equal(parseBt(query), '');
  }
});

test('both audience values parse with or without a question mark', () => {
  assert.equal(parseBt('?businessType=contractor'), 'contractor');
  assert.equal(parseBt('businessType=permit_expeditor'), 'permit_expeditor');
  assert.equal(parseBt('?other=1&businessType=permit_expeditor'), 'permit_expeditor');
});

test('solution-page links use the correct audience for both forms', () => {
  assert.equal(audienceQuery('/solutions/contractors'), '?businessType=contractor');
  assert.equal(audienceQuery('/solutions/permit-expediters'), '?businessType=permit_expeditor');
});

test('form-page links retain valid audience context without forwarding unrelated parameters', () => {
  for (const page of ['/signup', '/demo']) {
    assert.equal(audienceQuery(page, '?businessType=permit_expeditor&other=secret'), '?businessType=permit_expeditor');
    assert.equal(audienceQuery(page, '?businessType=contractor'), '?businessType=contractor');
    assert.equal(audienceQuery(page, '?businessType=invalid'), '');
  }
  assert.equal(audienceQuery('/features', '?businessType=contractor'), '');
});
