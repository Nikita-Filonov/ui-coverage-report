import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const stateFile = path.join(root, '../state/state.json');
const indexFile = path.join(root, '../index.html');

const state = fs.readFileSync(stateFile, 'utf-8').replace(/</g, '\\u003c');

let html = fs.readFileSync(indexFile, 'utf-8');
html = html.replace(
  /<script id="state" type="application\/json">[\s\S]*?<\/script>/,
  () => `<script id="state" type="application/json">${state}</script>`
);

fs.writeFileSync(indexFile, html, 'utf-8');

console.log('Embedded JSON data into HTML');
