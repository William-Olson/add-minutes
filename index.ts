import addMinutes from './addMinutes';

// test case input params
const testCases: Array<[ string, string, number, string ]> = [
    [ 'original example',                          '09:13 AM', 200,  '12:33 PM' ],
    [ 'same AM (less than 12 hours) example',      '05:00 AM', 120,  '07:00 AM' ],
    [ 'same PM (less than 12 hours) example',      '05:00 PM', 5,    '05:05 PM' ],
    [ 'same AM (24 hours) example',                '08:15 AM', 1440, '08:15 AM' ],
    [ 'same PM (24 hours) example',                '08:15 PM', 1440, '08:15 PM' ],
    [ 'max minutes example',                       '08:15 PM', Number.MAX_VALUE, '08:08 PM' ],
    [ 'min minutes example',                       '08:15 PM', Number.MIN_VALUE, '08:15 PM' ],
    [ 'time input validation example',             '23:45 AM', 2, 'Bad time format' ],
    [ 'minutes input validation example',          '10:45 AM', -2, 'Bad minutes param' ],
    [ 'flipping AM to PM (small minutes) example', '11:55 AM', 10,   '12:05 PM' ],
    [ 'flipping PM to AM (small minutes) example', '11:55 PM', 30,   '12:25 AM' ],
    [ 'flipping AM to PM (with 8 hours) example',  '10:00 AM', 480,  '06:00 PM' ],
    [ 'flipping PM to AM (with 10 hours) example', '07:30 PM', 600,  '05:30 AM' ],
    [ 'starting on 12 AM (no-flip) example',       '12:30 AM', 240,  '04:30 AM' ],
    [ 'starting on 12 PM (no-flip) example',       '12:00 PM', 180,  '03:00 PM' ],
    [ 'starting on 12 AM (flip) example',          '12:10 AM', 840,  '02:10 PM' ],
    [ 'starting on 12 PM (flip) example',          '12:45 PM', 1080, '06:45 AM' ]
];

let total = 0, pass = 0, fail = 0;

/*

    Helper function for logging test case results

*/
function test(label: string, time: string, minutes: number, expected: string) {
    total++;
    let result;

    try {
        result = addMinutes(time, minutes);
    }
    catch(e) {
        // expected error
        if (e && e.message && e.message === expected) {
            console.log(`\n√ [${label}] error caught: ${expected}\n`);
            pass++;
            return;
        }
        // unexpected error
        result = `Error: ${e.message}`;
    }

    if (result !== expected) {
        fail++;
        console.error('\n' +
            `X *(Error)* [${label}] ${time} + ${minutes} minutes Failed!\n` +
            `expected: ${expected}, but actual was: ${result}\n`
        );
        return;
    }

    pass++;
    console.log(`\n√ [${label}] ${time} + ${minutes} minutes = ${result}\n`);
}

/*

    run all test cases available

*/
for (const args of testCases) {
    test(...args);
}

// log test results summary
console.info(`
    Summary:

        Failed: ${fail}, Passed: ${pass}, Total: ${total}
`);
