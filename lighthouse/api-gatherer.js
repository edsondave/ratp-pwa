'use strict';

const Gatherer = require('lighthouse').Gatherer;

class TimeToApi extends Gatherer {
    afterPass(options) {
        const driver = options.driver;

        return driver.evaluateAsync('window.firstApiRequest')
            .then(apiLoadTime => {
                if (!apiLoadTime) {

                    throw new Error('Unable to find API load metrics in page');
                }
                return apiLoadTime;
            });
    }
}

module.exports = TimeToApi;