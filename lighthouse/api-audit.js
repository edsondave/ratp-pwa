'use strict';

const Audit = require('lighthouse').Audit;

const MAX_API_TIME = 3000;

class ApiLoadAudit extends Audit {
    static get meta() {
        return {
            id: 'api-audit',
            title: 'API audit',
            category: 'MyPerformance',
            name: 'api-audit',
            description: 'Schedule card initialized and ready',
            failureDescription: 'Schedule API slow to initialize',
            helpText: 'Used to measure time from navigationStart to when the schedule' +
                ' card is shown.',
            requiredArtifacts: ['TimeToApi']
        };
    }

    static audit(artifacts) {
        const loadedTime = artifacts.TimeToApi;

        const belowThreshold = loadedTime <= MAX_API_TIME;

        return {
            displayValue: loadedTime,
            score: Number(belowThreshold)
        };
    }
}

module.exports = ApiLoadAudit;