exports.isTopicValid = (topic) => {
    //topic validation can happen here
    return true;
}

exports.isEmptyObject = (value) => {
    return Object.keys(value).length === 0 && value.constructor === Object;
}