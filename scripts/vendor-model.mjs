/**
 * Vendors the all-MiniLM-L6-v2 embedding model (ONNX + tokenizer) into
 * public/models/ so the app never depends on Hugging Face's CDN — not for
 * this precompute step, and not for end users' browsers at runtime either.
 *
 * The weights come from @xcidos/genesis-memory-model, a third-party npm
 * package that re-publishes the official sentence-transformers/all-MiniLM-L6-v2
 * ONNX export + tokenizer (pinned revision c9745ed1d9f207416be6d2e6f8de32d1f16199bf,
 * Apache-2.0) so it can be installed from the npm registry instead of fetched
 * from huggingface.co directly. That package ships only tokenizer.json and
 * onnx/model.onnx — config.json and tokenizer_config.json below are
 * reconstructed by hand from the model's well-documented public config
 * (a standard 6-layer/384-hidden BERT architecture, bert-base-uncased
 * tokenizer settings). Verified after vendoring by spot-checking that
 * cosine similarity ranks semantically related service/query pairs above
 * unrelated ones (see scripts/build-service-embeddings.ts).
 *
 * Re-run with: npm run vendor:model
 */
import { existsSync, mkdirSync, copyFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

const SOURCE_PKG_DIR = dirname(require.resolve('@xcidos/genesis-memory-model/package.json'));
const DEST_DIR = join(__dirname, '../public/models/Xenova/all-MiniLM-L6-v2');

mkdirSync(join(DEST_DIR, 'onnx'), { recursive: true });

copyFileSync(join(SOURCE_PKG_DIR, 'tokenizer.json'), join(DEST_DIR, 'tokenizer.json'));
copyFileSync(join(SOURCE_PKG_DIR, 'onnx/model.onnx'), join(DEST_DIR, 'onnx/model.onnx'));

const CONFIG = {
  architectures: ['BertModel'],
  attention_probs_dropout_prob: 0.1,
  hidden_act: 'gelu',
  hidden_dropout_prob: 0.1,
  hidden_size: 384,
  initializer_range: 0.02,
  intermediate_size: 1536,
  layer_norm_eps: 1e-12,
  max_position_embeddings: 512,
  model_type: 'bert',
  num_attention_heads: 12,
  num_hidden_layers: 6,
  pad_token_id: 0,
  position_embedding_type: 'absolute',
  type_vocab_size: 2,
  use_cache: true,
  vocab_size: 30522,
};

const TOKENIZER_CONFIG = {
  do_lower_case: true,
  unk_token: '[UNK]',
  sep_token: '[SEP]',
  pad_token: '[PAD]',
  cls_token: '[CLS]',
  mask_token: '[MASK]',
  tokenize_chinese_chars: true,
  strip_accents: null,
  model_max_length: 512,
  tokenizer_class: 'BertTokenizer',
};

writeFileSync(join(DEST_DIR, 'config.json'), JSON.stringify(CONFIG, null, 2) + '\n');
writeFileSync(join(DEST_DIR, 'tokenizer_config.json'), JSON.stringify(TOKENIZER_CONFIG, null, 2) + '\n');

console.log(`Vendored model into ${DEST_DIR}`);
