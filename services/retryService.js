const BrokerService = require("../services/brokerService");

const Publish = require("../models/publish");
const { RETRY_ERROR, BROKER_SUCCESSFUL } = require("../utils/Constants");

exports.go = async (topic) => {
    try {
    
        //fetch unpublished records
        Publish.find().distinct('topic', (error, topics) => {
            if (error) return console.error(error)

            topics.forEach(topic => {
                BrokerService.process(topic)
                    .then(() => console.log(BROKER_SUCCESSFUL))
            });
        });
    } catch (e) {
        console.error(e);
        throw Error(RETRY_ERROR + e);
    }
};

