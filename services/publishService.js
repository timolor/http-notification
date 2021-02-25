var Publish = require('../models/publish')
const { PUBLISH_ERROR, INVALID_TOPIC } = require('../utils/Constants')
const { isTopicValid } = require('../utils/Validator')

exports.publish = async (topic, data) => {

    try {
        if (!isTopicValid())
            throw Error(INVALID_TOPIC)

        const publishedTopic = new Publish({ topic, data })
        return await publishedTopic.save()

    } catch (e) {
        console.error(e)
        throw Error(PUBLISH_ERROR + e)
    }
}