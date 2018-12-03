const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' })

const sns = new AWS.SNS()
const dynamo = new AWS.DynamoDB()
const { TABLE_NAME, TOPIC_ARN } = process.env

exports.handler = (event, context) => {
   const { Records } = event
   const objects = Records.map(r => ({ 
     bucket: r.s3.bucket.name, 
     key: r.s3.object.key 
   })) 
   return Promise.all(objects.map(async object => {
     const item = { TableName: TABLE_NAME, Item: createDBItem(object) }
     await dynamo.putItem(item).promise()
     const message = JSON.stringify(item)	
     await sns.publish({ Message: message, TopicArn: TOPIC_ARN }).promise()
     return message
   })).then(messages => context.done(null, messages))
      .catch(err => context.done(err))
   
}

function createDBItem(object) {
	return {
	   filename: {S: object.key },
	   bucket: {S: object.bucket },
	   completed: {S: 'new' }
	}
}


