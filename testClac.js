fetch = require('node-fetch');

async function test(){
    // create 3 users and print their unique strings => should print 0,1,2
    let user0 = await createUser();
    console.log(user0);
    let user1 = await createUser();
    console.log(user1);
    let user2 = await createUser();
    console.log(user2 + "\n");

    // current M's     0 0 0         =>     after response    100 -10 1
    console.log(await calcUser('post', user0, 'add', 100) + " ,Test: M should be 100");
    console.log(await calcUser('post', user1, 'sub', 10) + " ,Test: M should be -10");
    console.log(await calcUser('post', user2, 'sub', -1) + " ,Test: M should be 1\n");

    // current M's     100 -10 1     =>    after response    50 -15 10
    console.log(await calcUser('post', user0, 'sub', 50) + " ,Test: M should be 50");
    console.log(await calcUser('post', user1, 'sub', 5)+ " ,Test: M should be -15");
    console.log(await calcUser('post', user2, 'add', 9)+ " ,Test: M should be 10\n");

    // current M's   50 -15 10       =>   after response     50 15 100
    console.log(await calcUser('put', user0, 'multiply', 1)+ " ,Test: M should be 50");
    console.log(await calcUser('put', user1, 'multiply', -1)+ " ,Test: M should be 15");
    console.log(await calcUser('put', user2, 'multiply', 10)+ " ,Test: M should be 100\n");

    //  current M's  50 15 100       =>    after response    -50 7.5 100 error(can not divide by zero)
    console.log(await calcUser('put', user0, 'divide', -1)+ " ,Test: M should be -50");
    console.log(await calcUser('put', user1, 'divide', 2)+ " ,Test: M should be 7.5");
    console.log(await calcUser('put', user2, 'divide', 0)+ " ,Test: Should be an error\n");

    //  current M's  -50 7.5 100       =>    after response    -50 0  (deleted)  (user does not excises)
    console.log(await testUser('get', user0, 'M')+ " ,Test: M should be -50");
    console.log(await testUser('post', user1, 'reset')+ " ,Test: M should be 0");
    console.log(await testUser('delete', user2, 'del')+ " ,Test: user should be deleted");
    console.log(await testUser('get', user2, 'M')+ " ,Test: No user with the given ID\n");

}

async function createUser() {
    return await (fetch('http://localhost:5000/start').then(res => res.text()));
}

async function calcUser(method, user, opperation, num) {
    let ans = await fetch(`http://localhost:5000/calc/${user}/${opperation}/${num}`, {
        method: method,
    });
    return await ans.text();
}

async function testUser(method, user, request) {
    let ans = await fetch(`http://localhost:5000/calc/${user}/${request}`, {
        method: method,
    });
    return await ans.text();
}


test();