import { RecursiveCharacterTextSplitter, CharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { WeaviateStore } from 'langchain/vectorstores/weaviate';
import { pinecone } from '@/utils/pinecone-client';
import { CustomPDFLoader } from '@/utils/customPDFLoader';
import { Document } from 'langchain/document';
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from '@/config/pinecone';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';

import weaviate from 'weaviate-ts-client'

const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:4444',
  headers: {'X-OpenAI-Api-Key': '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'},
});


let classObj = {
  "class": "Document",
  "description": "A class called document",
  "vectorizer": "text2vec-openai",
  "moduleConfig": {
    "text2vec-openai": {
      "type": "text",
      "model": "ada",
      "modelVersion": "002"
    }
  },
}


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
//   .withClassName("TextDavinci003")
//   .do()
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.error(err)
//   });



export const run = async () => {
  try {

    await client.schema
    .classDeleter()
    .withClassName("Document")
    .do()
  
    await client
    .schema
    .classCreator()
    .withClass(classObj)
    .do()



    // const endings = [
    //   `
    //     == Ending#1 ==
    //     Description:
    //     - Traumatisme à la tête avec possible commotion cérébrale
    //     Critères:
    //     - Doit être âgé de 52 ans et plus
    //     - Doit être enceinte
    //     - Doit présenter des symptômes tels vertiges.
        // - Doit présenter des maux de tête intenses.
    //   `,
    //   `
    //     == Ending#2 ==
    //     Description: 
    //     - Traumatisme à la tête avec possible commotion cérébrale
    //     Critères:
    //     - Doit être âgé de 30 ans et moins
        // - Doit être enceinte
        // - Doit présenter des symptômes tels que des nausées ou vomissements.
        // - Doit présenter des troubles de la vue (vision brouillée, vision double, sensibilité à la lumière, etc.)
    //   `,
    //   `
    //     == Ending#3 ==
    //     Description:
    //     - Trouble de l'attention avec ou sans hyperactivité (TDAH)
    //     Critères:
    //     - Doit présenter des symptômes persistants d'inattention, d'hyperactivité et/ou d'impulsivité qui interfèrent avec la vie quotidienne
    //     - Doit présenter ces symptômes depuis l'enfance ou depuis au moins 6 mois
    //     - Doit présenter ces symptômes dans plusieurs environnements différents (par exemple, à la maison, à l'école, au travail)
    //     - Les symptômes ne doivent pas être causé par un autre trouble mental ou neurologique
    //     - Les symptômes doivent causer une détresse significative ou une altération du fonctionnement social, scolaire ou professionnel
    //   `,
    //   `
    //     == Ending#4 ==
    //     Description:
    //     - Céphalée (mal de tête)
    //     Critères:
    //     - Doit être un mal de tête sévère ou pire que d'habitude
    //     - Doit être soudain et d'apparition rapide
    //     - Doit être associé à une raideur de la nuque et/ou à une photophobie (sensibilité à la lumière)
    //     - Doit être associé à une confusion mentale ou à une diminution de la vigilance
    //     - Doit être accompagné de nausées et/ou de vomissements.
    //   `
    // ]

    // let documents = endings.map(o => {
    //   return new Document({ 
    //     pageContent: o
    //   })
    // })



    const endings = [
      {
        endingId: 1,
        criteria: [
          'Doit avoir 50 ans et plus',
          'Doit être enceinte',
          'Doit avoir la diarrhée'
        ]
      },
      {
        endingId: 2,
        criteria: [
          'Doit avoir 50 ans et moins',
          'Doit être enceinte'
        ]
      },
      {
        endingId: 3,
        criteria: [
          'Doit avoir 50 ans et moins'
        ]
      },
      {
        endingId: 4,
        criteria: [
          'Doit avoir 50 ans et plus'
        ]
      },
      {
        endingId: 5,
        criteria: [
          'Doit être âgé de 30 ans et moins'
        ]
      },
      {
        endingId: 6,
        criteria: [
          'Doit présenter des symptômes tels vertiges'
        ]
      }
    ]

    let documents = endings.map(o => {
      let pageContent = ''
      o.criteria.forEach(l => {
        pageContent += `- ${l}\n`
      })
      
      return new Document({ 
        pageContent,
        metadata: {
          endingId: o.endingId,
          criteria: o.criteria
        }
      })
    })


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

    // const documents = await splitter.splitDocuments([
    //   new Document({ 
    //     pageContent: text 
    //   }),
    // ]);



    console.log('\n')
    console.log( 
      documents
     )
    console.log('\n')






    // const embeddings = new OpenAIEmbeddings();

    // const res = await embeddings.embedQuery("Hello world");
    // console.log(res);

    /* Embed documents */
    // const documentRes = await embeddings.embedDocuments(output);
    // console.log({ documentRes });


  


    /**
     * Create a store and fill it with some texts + metadata
     * 
     * @source https://js.langchain.com/docs/modules/indexes/vector_stores/integrations/weaviate#usage-insert-documents
     */


    await WeaviateStore.fromDocuments(
      documents,
      new OpenAIEmbeddings(),
      {
        client,
        indexName: "Document",
        textKey: "text",
        metadataKeys: ["criteria", "endingId"],
      }
    );






  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};

(async () => {
  await run();
  console.log('ingestion complete');
})();