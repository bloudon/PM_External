import assert from 'node:assert/strict';
import test from 'node:test';
import { parseBt, parseIndustry, requestQuery, audienceQuery } from '../src/lib/audience.ts';

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

test('trade pages infer only known industries with contractor attribution', () => {
  for (const industry of ['roofing', 'windows-and-doors', 'hvac']) {
    assert.equal(audienceQuery(`/solutions/contractors/${industry}`), `?businessType=contractor&industry=${industry}`);
  }
  assert.equal(audienceQuery('/solutions/contractors/unknown'), '');
  assert.equal(audienceQuery('/solutions/contractors-malicious'), '');
});

test('short landing routes preserve their business and industry context', () => {
  assert.equal(audienceQuery('/Contractors'), '?businessType=contractor');
  for (const [path, industry] of [
    ['/roofing', 'roofing'], ['/HVAC', 'hvac'], ['/Windows-doors', 'windows-and-doors'],
  ]) {
    assert.equal(audienceQuery(path), `?businessType=contractor&industry=${industry}`);
    assert.equal(audienceQuery(path, '?industry=other&businessType=permit_expeditor'), `?businessType=contractor&industry=${industry}`);
  }
  assert.equal(audienceQuery('/roofing/unknown'), '');
  assert.equal(audienceQuery('/Contractors-malicious'), '');
});

test('form navigation carries editable allowlisted industry but not unrelated query data', () => {
  for (const page of ['/demo', '/signup']) {
    assert.equal(audienceQuery(page, '?businessType=contractor&industry=hvac&secret=abc'), '?businessType=contractor&industry=hvac');
    assert.equal(audienceQuery(page, '?industry=roofing'), '?industry=roofing');
    assert.equal(audienceQuery(page, '?businessType=permit_expeditor&industry=roofing'), '?businessType=permit_expeditor');
    assert.equal(audienceQuery(page, '?industry=invalid'), '');
  }
  assert.equal(requestQuery('contractor', ''), '?businessType=contractor');
  assert.equal(requestQuery('', ''), '');
  assert.equal(parseIndustry('?industry=windows-and-doors'), 'windows-and-doors');
  for (const query of ['', '?industry=HVAC', '?industry=electrical', '?industry=%3Cscript%3E']) {
    assert.equal(parseIndustry(query), '');
  }
});
