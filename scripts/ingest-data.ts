import { RecursiveCharacterTextSplitter, CharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { WeaviateStore } from 'langchain/vectorstores/weaviate';
import { pinecone } from '@/utils/pinecone-client';
import { CustomPDFLoader } from '@/utils/customPDFLoader';
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from '@/config/pinecone';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';

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
//       "type": "text",
//       "model": "ada",
//       "modelVersion": "002"
//     }
//   },
// }



// let classObj = {
//   "class": "TextDavinci003",
//   "description": "A class called document",
//   "vectorizer": "text2vec-openai",
//   "moduleConfig": {
//     "text2vec-openai": {
//       "type": "text",
//       "model": "davinci",
//       "modelVersion": "003"
//     }
//   },
// }

/**
 * Create a class
 */
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

/**
 * List classes
 */
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

/**
 * Delete a class
 * @source https://weaviate.io/developers/weaviate/api/rest/schema#example-request-for-deleting-a-class
 */
// client.schema
//   .classDeleter()
//   .withClassName("Document")
//   .do()
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.error(err)
//   });



export const run = async () => {
  try {





    // /**
    //  * 
    //  */
    // const text = `Hi.\n\nI'm Harrison.\n\nHow? Are? You?\nOkay then f f f f.
    // This is a weird text to write, but gotta test the splittingggg some how.\n\n
    // Bye!\n\n-H.`;

    // /**
    //  * @source https://js.langchain.com/docs/modules/indexes/text_splitters/examples/recursive_character
    //  */
    // const splitter = new RecursiveCharacterTextSplitter({
    //   chunkSize: 10,
    //   chunkOverlap: 1,
    // });

    // const documents = await splitter.createDocuments([text]);

    // // const documents = await splitter.splitDocuments([
    // //   new Document({ 
    // //     pageContent: text 
    // //   }),
    // // ]);

    // console.log('\n')
    // console.log( 
    //   documents
    //  )
    // console.log('\n')






    // const embeddings = new OpenAIEmbeddings();

    // const res = await embeddings.embedQuery("Hello world");
    // console.log(res);

    /* Embed documents */
    // const documentRes = await embeddings.embedDocuments(output);
    // console.log({ documentRes });


  


    // /**
    //  * Create a store and fill it with some texts + metadata
    //  * 
    //  * @source https://js.langchain.com/docs/modules/indexes/vector_stores/integrations/weaviate#usage-insert-documents
    //  */
    // await WeaviateStore.fromDocuments(
    //   documents,
    //   new OpenAIEmbeddings(),
    //   {
    //     client,
    //     indexName: "TextDavinci003",
    //     textKey: "text",
    //     metadataKeys: ["foo"],
    //   }
    // );






  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};

(async () => {
  await run();
  console.log('ingestion complete');
})();