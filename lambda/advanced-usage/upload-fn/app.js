let response;

exports.handler = async (event, context) => {
    try {
        return { 
	    'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world',
                location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
