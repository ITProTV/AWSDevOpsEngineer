const AWS = require('aws-sdk')
const path = require('path')

AWS.config.update({ region: 'us-east-1' })

const dynamo = new AWS.DynamoDB()
const polly = new AWS.Polly()
const s3 = new AWS.S3()
const { TABLE_NAME, BUCKET_NAME } = process.env

exports.handler = async (event, context) => {
  const { Records } = event
  const { Sns } = Records[0]
  const { Message } = Sns
  try {
    const data = JSON.parse(Message)
    const { bucket, key } = data
    const filename = path.basename(key)
    const textFile = await s3.getObject({ Bucket: BUCKET_NAME, Key: key }).promise()
    console.log("### Finished S3 Fetch ###")
    const { AudioStream } = await polly.synthesizeSpeech({
      OutputFormat: 'mp3',
      Text: textFile.Body.toString('utf-8'),
      VoiceId: 'Brian'
    }).promise()
    console.log("### Finished Polly Change ###")
    await dynamo.updateItem({ 
	    TableName: TABLE_NAME, 
	    Key: {filename:{S: key }},
	    ExpressionAttributeNames: {
	      "#C": "completed" 
	    },
	    ExpressionAttributeValues: {
	      ":c": { BOOL: true } 
	    },
	    UpdateExpression: "SET #C = :c"
	    
    }).promise()
    console.log("### Updated DyanmoDB Entry ###")
    await s3.putObject({ 
	    Bucket: BUCKET_NAME, 
	    Key: `report-audio/${filename}.mp3`, 
	    Body: AudioStream 
    }).promise()
    console.log("### Finished S3 Upload ###")
    return context.done(null, { message: 'success' })
  } catch(e) {
    context.done(e) 
  }
}

