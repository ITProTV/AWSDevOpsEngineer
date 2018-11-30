const AWS = require('aws-sdk')
const codepipeline = new AWS.CodePipeline()

exports.handler = async (event, context) => {
  const jobId = event['CodePipeline.job'].id
  try {
  
  } catch (e) {}
}

function jobSuccess({ message, jobId, done, fail }) {
  const parameters = {
    jobId
  }
  return codepipeline
	.putJobSuccessfulResult(parameters)
	.promise()
	.then(done)
	.catch(fail)
} 
async function jobFail({ message, jobId, done, fail }) {
  const parameters = {
    jobId,
    details: {
      message,
      type: 'JobFailed',
      executionId: context.invokeid
    }
  }
  return codepipeline
	  .putJobFailureResult(parameters)
	  .promise()
	  .then(done)
	  .catch(fail)
}
