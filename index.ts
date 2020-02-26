import addMinutes from './addMinutes';


function test(label: string, time: string, minutes: number) {
    console.log(`
        [${label}] ${time} + ${minutes} minutes = ${addMinutes(time, minutes)}
    `);
}

test('ex1', '9:13 AM', 200);
test('ex2', '12:13 AM', 120);
test('ex3', '12:13 AM', 720);
test('ex4', '12:20 PM', 660);
test('ex5', '11:00 AM', 60);
test('ex6', '11:00 AM', 720);
test('ex7', '11:00 AM', 0);
test('ex8', '11:59 PM', 1);
test('ex9', '12:01 PM', 59);
test('ex9', '12:01 PM', 58);
test('ex10', '12:01 PM', 1500);
test('ex3', '12:13 AM', 1000000);


