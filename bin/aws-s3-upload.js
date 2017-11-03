'use strict'
const mongoose = require('../app/middleware/mongoose')

const s3Upload = require('../lib/aws-s3-upload')
const Upload = require('../app/models/upload')

const file = {
  path: process.argv[2],
  name: process.argv[3]
}

s3Upload(file)
  .then((s3Response) => {
    console.log('s3 response is ?', s3Response.Location)
    return Upload.create({
      description: 'does this work?',
      url: 'what is the url?'
    })
  })
  .then(console.log)
  .catch(console.error)
  .then(() => {
    mongoose.connection.close()
  })
