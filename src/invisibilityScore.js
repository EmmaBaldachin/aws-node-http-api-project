
const invisibilityScore = async (event) => {
  console.log(event)
  const {uuid, invisibilityScore, status} = event;
  const AWS = require('aws-sdk');
  const { parse } = require('json2csv')
  const s3 = new AWS.S3();
  const data = {
    uuid,
    invisibilityScore,
    status
  }
  const csv = parse(data);
  const res = await s3.putObject({ Bucket: "invisibility-score-bucket", Key: data.uuid + '.csv', Body: csv }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'THIS IS THE RESPONSE: ' + res,
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports = {
  handler : invisibilityScore
}