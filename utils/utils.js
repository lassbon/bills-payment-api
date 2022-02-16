"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.to = void 0;
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
module.exports = {
    doSomeAsyncMagik,
    isEmpty
}