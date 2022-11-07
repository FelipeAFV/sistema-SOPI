const fs = require('fs');
const { saveDocument } = require('../domain/document-repository');
const uuid = require('uuid')

const addDocument = async ({file, purchaseId, userId}) => {

    const fileExt = file.originalname.split('.').slice(-1)[0];
    const fileName = uuid.v4()
    const filePath = process.env.STATIC_ROOT + `/${purchaseId}/${fileName}.${fileExt}`

    console.log(fileName)

    /* Create directory for files of purchase order*/
    fs.mkdir(process.env.STATIC_ROOT + '/' + purchaseId, {}, (err) => {console.log(err)});
    fs.writeFileSync(filePath, file.buffer);

    const docStored = await saveDocument({purchaseId, type: fileExt, name: fileName+ '.' + fileExt, path: filePath });

    return docStored;
}

exports.addDocument = addDocument;