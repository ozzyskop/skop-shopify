import { readFileSync } from 'node:fs';
import YAML from 'yaml';

const manifest = YAML.parse(readFileSync('config/shopify-custom-data.yml', 'utf8'));
const allowedTypes = new Set([
  'single_line_text_field',
  'multi_line_text_field',
  'list.single_line_text_field',
  'color',
  'boolean',
  'file_reference',
]);

if (manifest.namespace !== 'skop') {
  throw new Error('Custom data namespace must be skop');
}

const keys = manifest.product_metafields.map(({ key }) => key);
if (new Set(keys).size !== keys.length) {
  throw new Error('Duplicate product metafield key');
}

for (const field of manifest.product_metafields) {
  if (!allowedTypes.has(field.type)) {
    throw new Error(`Unsupported type: ${field.type}`);
  }
}

const handles = manifest.metaobjects.map(({ handle }) => handle);
if (new Set(handles).size !== handles.length) {
  throw new Error('Duplicate metaobject handle');
}

for (const object of manifest.metaobjects) {
  if (!object.handle || object.fields.length === 0) {
    throw new Error('Every metaobject requires a handle and fields');
  }

  for (const field of object.fields) {
    if (!allowedTypes.has(field.type)) {
      throw new Error(`Unsupported type: ${field.type}`);
    }
  }
}

console.log('Custom data manifest valid');
