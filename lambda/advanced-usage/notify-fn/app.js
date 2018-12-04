const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

const sns = new AWS.SNS()
const { TOPIC_ARN } = process.env

exports.handler = async (event, context) => {
  return await Promise.all(event.Records.map(async record => {
    const Keys = record.dynamodb.Keys
    const filename = Keys.filename.S
    const params = {
      Message: `Filename: ${filename} has been transcribed`,
      Subject: `${new Date().toString()} Transcription`,
      TopicArn: TOPIC_ARN
    } 
    await sns.publish(params).promise()
    console.log("#### Message Sent ####") 
  }))
}
