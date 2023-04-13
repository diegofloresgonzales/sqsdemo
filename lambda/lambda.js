
exports.handler = async (event) => {
    // TODO implement
    console.log(JSON.stringify(event))
    
    const fallas = []
    for(let obj of event.Records) {
        try {
            console.log('Cola body:', JSON.parse(obj.body))
        } catch(err) {
            fallas.push({"itemIdentifier": obj.messageId})
        }
    }
    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    
    response.batchItemFailures = fallas
    
    return response;
};
