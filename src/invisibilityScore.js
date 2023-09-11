

const invisibilityScore = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Invisibility Score",
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports = {
  handler: invisibilityScore,
}