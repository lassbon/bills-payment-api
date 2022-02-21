"use strict";
Object.defineProperty(exports, "__esModule", { value: true })
 const to = void 0

/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
const doSomeAsyncMagik = (promise, errorExt) => {

            return promise
                .then(function (data) { return [null, data]; })
                .catch(function (err) {
                if (errorExt) {
                    var parsedError = Object.assign({}, err, errorExt);
                    return [parsedError, undefined];
                }
                return [err, undefined];
            })
}

const isEmpty = (val) => {
    return (val === undefined || val == null || val.length <= 0)
        ? true : false
}

const makePhoneNumberInternational = (phoneNumber) =>
{
    if (phoneNumber.substr(0, 1) == '0')
    {
        let internationalPrefix = "+234"
        let num10Digits = phoneNumber.substr(1)
        return internationalPrefix + num10Digits
    } else if (phoneNumber.substr(1, 3) == '234') {
        return phoneNumber
    } else {
        return phoneNumber;
    }
}
module.exports  = {
    doSomeAsyncMagik,
    isEmpty,
    makePhoneNumberInternational
}

