import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { Script } from 'node:vm';

const html=readFileSync('index.html','utf8');
const script=readFileSync('app.js','utf8');
const css=readFileSync('void.css','utf8');
const getIds=()=>[...html.matchAll(/\\bid="([^"]+)"/g)].map(x=>x[1]);

test('five sequential chapters, unique IDs and accessible landmarks',()=>{
  assert.deepEqual([...html.matchAll(/data-chapter="(\\d+)"/g)].map(x=>x[1]),['01','02','03','04','05']);
  const ids=getIds();assert.equal(new Set(ids).size,ids.length,'duplicate ID');
  for(const id of ['top','void','materialized','manifesto','drop','night','finale','three-stage','productGrid','filters','productDialog','checkoutDialog','bag','newsletterForm'])
    assert.ok(ids.includes(id),id+' is missing');
});

test('catalogue image assets exist and preserve shopping UI selectors',()=>{
  for(let n=1;n<=20;n++)assert.ok(existsSync('assets/look-'+String(n).padStart(2,'0')+'.webp'),'image '+n+' missing');
  for(const id of ['cartButton','bagCount','bagHeaderCount','bagItems','veil','closeBag','enquireButton','modalName','modalDesc','modalImage','sizeSelect','addBag','checkoutForm','checkoutSummary','checkoutStatus','checkoutCopyBuffer','copyEnquiry'])
    assert.ok(getIds().includes(id),id+' missing for commerce UI');
});

test('JavaScript source parses without syntax errors',()=>{
  for(const p of ['app.js','void.js','void-three.js'])assert.doesNotThrow(()=>new Script(readFileSync(p,'utf8'),{filename:p}));
});

test('Tailwind is precompiled and payment limitations are explicit',()=>{
  assert.match(html,/href="tailwind.css"/);
  assert.match(html,/no checkout or payment collection is enabled/i);
  assert.match(html,/IT DOES NOT PLACE AN ORDER OR SEND YOUR DETAILS/i);
  assert.match(css,/prefers-reduced-motion/);
});
