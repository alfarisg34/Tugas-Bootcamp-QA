import http from 'k6/http'
import { group, sleep } from 'k6'

import thresholds from './config/thresholds.js'
import smoke_test_scenario from './config/smoke_test_scenario.js'
import average_load_test_scenario from  './config/average_load_test_scenario.js'

import getAuthToken from './utils/getAuthToken.js'

import withLogin from './groups/withLogin.js'

const scenarioList = {
    smoke: smoke_test_scenario,
    average: average_load_test_scenario
}

export const options = {
    thresholds,
    scenarios: {
        current_scenario: scenarioList[__ENV.scenario] || smoke_test_scenario
    }
}

export function setup () {
    return getAuthToken()
}

export default function ( token ) {
    withLogin(token)

    sleep(1)
}