import addMinutes from './addMinutes';


function test(label: string, time: string, minutes: number) {
    console.log(`
        [${label}] ${time} + ${minutes} minutes = ${addMinutes(time, minutes)}
    `);
}

test('ex1', '9:13 AM', 200);
test('ex2', '12:13 AM', 120);
test('ex3', '12:13 AM', 720);
test('ex4', '12:20 AM', 660);
test('ex5', '11:00 AM', 60);


