let Subscribe = require('../models/subscribe')
const { DUPLICATE_SUBSCRIPTION, SUBSCRIBE_ERROR, INVALID_TOPIC } = require('../utils/Constants')
const { isTopicValid } = require('../utils/Validator')

exports.subscribe = async (topic, url) => {

    try {
        if (!isTopicValid(topic))
            throw Error(INVALID_TOPIC)

        // log subscription if unique
        let subscription = await Subscribe.find({ url, topic })
        console.log(subscription)
        if (typeof subscription !== 'undefined' && subscription.length > 0)
            throw Error(DUPLICATE_SUBSCRIPTION)

        const subscriber = new Subscribe({ url, topic })
        return await subscriber.save()

    } catch (e) {
        console.error(e)
        throw Error(SUBSCRIBE_ERROR + e)
    }
}