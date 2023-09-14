
// Would wrap this in a try/catch to handle any errors and return a 500 with a message (400 for body validation)
const invisibilityScore = async (event) => {

  // Started this code passing in the final details to the function to create an E2E shell of serverless framework & file being created
  const {uuid, invisibilityScore, status} =  JSON.parse(event.body);
  
  // Would create a bodyValidation.js script to validate the body of the request and return a 400 if it fails with a message

  const AWS = require('aws-sdk');
  const { parse } = require('json2csv')

  // Would have a UUID for user presumably and would hit API or DB to get gender and age
  const userInfo = request('https://randomuser.me/api/').results[0]

  // This would be the calculation for invisibility score, for now just returning the score passed in
  const data = {
    uuid,
    invisibilityScore,
    status
  }


  const csv = parse(data);
  
  // Save to S3 
  const s3 = new AWS.S3();
  const res = await s3.putObject({ Bucket: "invisibility-score-bucket", Key: data.uuid + '.csv', Body: csv }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: data,
      },
      null,
      2
    ),
  };
};

module.exports = {
  handler : invisibilityScore
}