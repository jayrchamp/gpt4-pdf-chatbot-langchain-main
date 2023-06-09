import { RecursiveCharacterTextSplitter, CharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { WeaviateStore } from 'langchain/vectorstores/weaviate';
import { pinecone } from '@/utils/pinecone-client';
import { CustomPDFLoader } from '@/utils/customPDFLoader';
import { Document } from 'langchain/document';
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from '@/config/pinecone';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';

import util from 'util'
import weaviate from 'weaviate-ts-client'

const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:4444',
  headers: {'X-OpenAI-Api-Key': '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'},
});


export const run = async () => {
  try {

    const query = `
- Doit avoir 50 ans et plus
    `


    
    const indexName = 'Document'
    const textKey = 'text'
    const k = 1

    const filter = <any>{
      where: {
        // operator: "Equal",
        // path: ["id"],
        // valueText: "1e63f2aa-aae4-43f3-9594-7b6d7909940f",

        // path: ["criteria"],
        // operator: "Like",
        // valueText: "(Doit avoir la diarrhée)?",

        operator: "And",
        operands: [
          {
            path: ["criteria"],
            operator: "Like",
            valueString: "Doit avoir la diarrhée"
          }, 
          {
            path: ["criteria"],
            operator: "Like",
            valueString: "Doit être enceinte",
          }
        ]
      },
      // certainty: 1
    }

    let builder = await client.graphql
    .get()
    .withClassName(indexName)
    // .withFields(`${this.queryAttrs.join(" ")} _additional { distance }`)
    .withFields(`text criteria endingId _additional { id distance }`)
    .withNearVector({
      vector: await (new OpenAIEmbeddings()).embedQuery(query),
      // certainty: filter?.certainty
    })
    // .withLimit(k)
    .withWhere(filter?.where);



    const result = await builder.do();

    console.log('\n')
    console.log(util.inspect(
      result
    , false, null, true))
    console.log('\n')

    const documents = [];
    for (const data of result.data.Get[indexName]) {
      // console.log('\n')
      // console.log( data )
      // console.log('\n')
      const { 
        [textKey]: text, 
        _additional, ...rest 
      } = data;

      const { distance, ..._additionalRest } = _additional

      documents.push([
        new Document({
          pageContent: text,
          metadata: {
            ...rest,
            ..._additionalRest
          },
        }),
        distance,
      ]);
    }

    // console.log('\n')
    // console.log(util.inspect(
    //   documents
    // , false, null, true))
    // console.log('\n')










  } catch (error) {
    // console.log('error', error);
    console.log('error', error?.response?.errors);
    throw new Error('Failed to ingest your data');
  }
};

(async () => {
  await run();
  console.log('ingestion complete');
})();