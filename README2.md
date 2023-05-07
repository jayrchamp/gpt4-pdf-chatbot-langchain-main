```json
{
  class: 'Document',
  description: 'A class called document',
  invertedIndexConfig: {
    bm25: { b: 0.75, k1: 1.2 },
    cleanupIntervalSeconds: 60,
    stopwords: { additions: null, preset: 'en', removals: null }
  },
  moduleConfig: {
    'text2vec-openai': {
      model: 'ada',
      modelVersion: '002',
      type: 'text',
      vectorizeClassName: true
    }
  },
  properties: null,
  replicationConfig: { factor: 1 },
  shardingConfig: {
    virtualPerPhysical: 128,
    desiredCount: 1,
    actualCount: 1,
    desiredVirtualCount: 128,
    actualVirtualCount: 128,
    key: '_id',
    strategy: 'hash',
    function: 'murmur3'
  },
  vectorIndexConfig: {
    skip: false,
    cleanupIntervalSeconds: 300,
    maxConnections: 64,
    efConstruction: 128,
    ef: -1,
    dynamicEfMin: 100,
    dynamicEfMax: 500,
    dynamicEfFactor: 8,
    vectorCacheMaxObjects: 1000000000000,
    flatSearchCutoff: 40000,
    distance: 'cosine',
    pq: {
      enabled: false,
      bitCompression: false,
      segments: 0,
      centroids: 256,
      encoder: [Object]
    }
  },
  vectorIndexType: 'hnsw',
  vectorizer: 'text2vec-openai'
}

```