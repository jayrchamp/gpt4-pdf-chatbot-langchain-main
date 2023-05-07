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

// let classObj = {
//   "class": "Document",
//   "description": "A class called document",
//   "vectorizer": "text2vec-openai",
//   "moduleConfig": {
//     "text2vec-openai": {
//       "model": "ada",
//       "modelVersion": "002",
//       "type": "text"
//     }
//   },
// }

// client
//   .schema
//   .classCreator()
//   .withClass(classObj)
//   .do()
//   .then(res => {
//     console.log(res)
//   })
//   .catch(err => {
//     console.error(err)
//   });


// client
//   .schema
//   .getter()
//   .do()
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.error(err)
//   });


const embeddings = new OpenAIEmbeddings();


export const run = async () => {
  try {

    // const res = await client.graphql
    // .aggregate()
    // .withClassName("Test")
    // .withFields('pageContent {} meta { count }')
    // // .withFields('meta')
    // .do()
    
    // console.log(JSON.stringify(res, null, 2))

    // const res = await client.graphql
    // .get()
    // .withClassName('Test')
    // // .withFields('text _additional { id vector distance }')
    // .withFields('text _additional { id distance }')
    // .do()
    
    // console.log(JSON.stringify(res, null, 2))




    // const deleteRes = await client.data
    // .deleter()
    // .withClassName('Test')
    // // .withClassName('id')
    // // .withId('36ddd591-2dee-4e7e-a3cc-eb86d30a4303')
    // // .withConsistencyLevel(weaviate.replication.ConsistencyLevel.QUORUM)
    // .withConsistencyLevel('QUORUM')
    // .do()

    // console.log('\n')
    // console.log( 
    //   deleteRes
    //  )
    // console.log('\n')



    // // Create a store for an existing index
    // const store = await WeaviateStore.fromExistingIndex(new OpenAIEmbeddings(), {
    //   client,
    //   indexName: "Test",
    //   // textKey: "text",
    //   metadataKeys: ["foo"],
    // });






    // // Search the index without any filters
    // const results = await store.similaritySearch(query, 1);
    // console.log(results);




    // Search the index with a filter, in this case, only return results where
    // the "foo" metadata key is equal to "baz", see the Weaviate docs for more
    // // https://weaviate.io/developers/weaviate/api/graphql/filters
    // const results2 = await store.similaritySearch(query, 1, {
    //   where: {
    //     operator: "Equal",
    //     path: ["foo"],
    //     valueText: "baz",
    //   },
    // });
    // console.log(results2);




  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};

(async () => {
  await run();
  console.log('ingestion complete');
})();