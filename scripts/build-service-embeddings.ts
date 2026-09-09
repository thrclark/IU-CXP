/**
 * Precomputes sentence embeddings for every service in the catalog so the
 * app can do semantic search entirely client-side (see
 * SemanticSearchService). Run this whenever campus-service.ts or
 * service-directory.ts changes:
 *
 *   npm run build:embeddings
 *
 * Uses the same vendored, local copy of the model as the browser runtime
 * (public/models/ — see scripts/vendor-model.mjs) rather than downloading
 * from Hugging Face, so this works offline and behind restrictive network
 * policies.
 *
 * Output: public/service-embeddings.json, served as a static asset.
 */
import { env, pipeline } from '@xenova/transformers';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { ALL_SERVICES } from '../src/app/campus-services/service-directory';

const MODEL = 'Xenova/all-MiniLM-L6-v2';
const OUTPUT_PATH = fileURLToPath(new URL('../public/service-embeddings.json', import.meta.url));

// Load the model from public/models/ instead of huggingface.co — see
// scripts/vendor-model.mjs for provenance and how to regenerate it.
env.allowRemoteModels = false;
env.allowLocalModels = true;
env.localModelPath = fileURLToPath(new URL('../public/models/', import.meta.url));

interface ServiceVectorRecord {
  slug: string;
  vector: number[];
}

async function main(): Promise<void> {
  console.log(`Loading ${MODEL} from ${env.localModelPath}...`);
  const embedder = await pipeline('feature-extraction', MODEL, { quantized: false });

  // ALL_SERVICES = [...CAMPUS_SERVICES, ...DIRECTORY_SERVICES]; dedupe by
  // slug (first occurrence wins) to mirror findServiceBySlug's lookup order.
  const seen = new Set<string>();
  const services = ALL_SERVICES.filter(service => {
    if (seen.has(service.slug)) return false;
    seen.add(service.slug);
    return true;
  });

  console.log(`Embedding ${services.length} services...`);
  const records: ServiceVectorRecord[] = [];

  for (const [i, service] of services.entries()) {
    const text = `${service.title}. ${service.category}. ${service.description}`;
    const output = await embedder(text, { pooling: 'mean', normalize: true });
    const vector = Array.from(output.data as Float32Array).map(v => Math.round(v * 1e6) / 1e6);
    records.push({ slug: service.slug, vector });

    if ((i + 1) % 100 === 0 || i === services.length - 1) {
      console.log(`  embedded ${i + 1}/${services.length}`);
    }
  }

  writeFileSync(
    OUTPUT_PATH,
    JSON.stringify({ model: MODEL, generatedAt: new Date().toISOString(), records }),
  );
  console.log(`Wrote ${records.length} vectors to ${OUTPUT_PATH}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
