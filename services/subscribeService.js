let Subscribe = require('../models/subscribe')
const { DUPLICATE_SUBSCRIPTION } = require('../utils/Constants')
const { isTopicValid } = require('../utils/Validator')

exports.subscribe = async (topic, url) => {

    try {
        if (!isTopicValid(topic))
            throw Error('Invalid topic')

        // log subscription if unique
        let subscription = await Subscribe.find({ url, topic })
        console.log(subscription)
        if (typeof subscription !== 'undefined' && subscription.length > 0)
            throw Error(DUPLICATE_SUBSCRIPTION)

        const subscriber = new Subscribe({ url, topic })
        return await subscriber.save()

    } catch (e) {
        // Log Errors
        console.error(e)
        throw Error('Error while subscribing to topic, Reason: ' + e)
    }
}