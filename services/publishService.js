var Publish = require('../models/publish')
const { DUPLICATE_SUBSCRIPTION } = require('../utils/Constants')
const { isTopicValid } = require('../utils/Validator')

exports.publish = async (topic, data) => {

    try {
        if (!isTopicValid())
            throw Error('Invalid topic')

        const publishedTopic = new Publish({ topic, data })
        return await publishedTopic.save()

    } catch (e) {
        // Log Errors
        console.error(e)
        throw Error('Error while subscribing to topic, Reason: ' + e)
    }
}