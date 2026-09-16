import { Injectable } from '@angular/core';

import { CampusService } from './campus-service';
import { findServiceBySlug } from './service-directory';

/** One precomputed embedding vector for a service, keyed by slug. */
interface ServiceVectorRecord {
  slug: string;
  vector: number[];
}

interface ServiceEmbeddingsFile {
  model: string;
  generatedAt: string;
  records: ServiceVectorRecord[];
}

/** Below this cosine similarity, a result is considered noise and dropped. */
const SIMILARITY_THRESHOLD = 0.35;

/**
 * Client-side semantic search over the service catalog. Runs a small
 * sentence-embedding model (all-MiniLM-L6-v2) entirely in the browser via
 * @xenova/transformers, so it works without a backend and without sending
 * search queries to any external service.
 *
 * The model and the catalog's precomputed vectors are both loaded lazily —
 * nothing is fetched until the first call to search() — and both are vendored
 * locally under public/models/ and public/service-embeddings.json rather than
 * fetched from Hugging Face at runtime (see scripts/vendor-model.mjs and
 * scripts/build-service-embeddings.ts). Regenerate the embeddings file with
 * `npm run build:embeddings` whenever the service catalog changes.
 */
@Injectable({ providedIn: 'root' })
export class SemanticSearchService {
  private embedderPromise: Promise<any> | null = null;
  private vectorsPromise: Promise<ServiceVectorRecord[]> | null = null;

  private async getEmbedder(): Promise<any> {
    this.embedderPromise ??= (async () => {
      const { env, pipeline } = await import('@xenova/transformers');
      env.allowRemoteModels = false;
      env.allowLocalModels = true;
      env.localModelPath = '/models/';
      return pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', { quantized: false });
    })();
    return this.embedderPromise;
  }

  private async getVectors(): Promise<ServiceVectorRecord[]> {
    this.vectorsPromise ??= fetch('/service-embeddings.json')
      .then(response => response.json())
      .then((file: ServiceEmbeddingsFile) => file.records);
    return this.vectorsPromise;
  }

  /**
   * Ranks the catalog against a free-text query and returns the best
   * semantic matches (e.g. "I need to drop a class" -> eDrop/eAdd Classes,
   * even though none of those words appear in that record). Falls back to
   * an empty array if the model or vectors fail to load, so callers can
   * treat this purely as an enhancement over exact/substring search.
   */
  async search(query: string, limit = 10): Promise<CampusService[]> {
    const trimmed = query.trim();
    if (!trimmed) {
      return [];
    }

    try {
      const [embedder, vectors] = await Promise.all([this.getEmbedder(), this.getVectors()]);
      const output = await embedder(trimmed, { pooling: 'mean', normalize: true });
      const queryVector = Array.from(output.data as Float32Array);

      return vectors
        .map(record => ({ slug: record.slug, score: dot(queryVector, record.vector) }))
        .sort((a, b) => b.score - a.score)
        .filter(result => result.score > SIMILARITY_THRESHOLD)
        .slice(0, limit)
        .map(result => findServiceBySlug(result.slug))
        .filter((service): service is CampusService => !!service);
    } catch (error) {
      console.error('Semantic search unavailable:', error);
      return [];
    }
  }
}

/** Vectors are pre-normalized, so a plain dot product is cosine similarity. */
function dot(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i];
  }
  return sum;
}
