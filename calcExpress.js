const express = require('express');
const path = require('path');

const app = express();
let user_array = [];
let uid = 0;

// init a user and add his id and M to the user array
app.get('/start', (req, res)=> {
    let obj = {'id' : uid, 'M' : 0};
    user_array.push(obj);
    uid++;
    res.send(obj.id.toString());
});

//post request to add number
app.post('/calc/:id/add/:num', (req, res)=> {
    let uniqueStr = parseInt(req.params.id);
    let n = parseInt(req.params.num);

    // index in array with the given id
    let index = user_array.findIndex(index => index.id == uniqueStr);

    // if no such id send error messege
    if(index == -1){
        res.status(404).send(`No user with the given unique string`);
    } else {
        //else update M of this user and send the response
        user_array[index].M += n;
        res.send("The following user: " + uniqueStr + " added:  " + n + " now M = " + user_array[index].M);
    }
});

//post request to subtract a number
app.post('/calc/:id/sub/:num', (req, res)=> {
    let uniqueStr = parseInt(req.params.id);
    let n = parseInt(req.params.num);

    // index in array with the given id
    let index = user_array.findIndex(index => index.id == uniqueStr);

    // if no such id send error messege
    if(index == -1){
        res.status(404).send(`No user with the given unique string`);
    } else {
        //else update M of this user and send the response
        user_array[index].M -= n;
        res.send("The following user: " + uniqueStr + "  subtracted: " + n + " now M = " + user_array[index].M);

    }
});

//put request to multiply a number
app.put('/calc/:id/multiply/:num', (req, res)=> {
    let uniqueStr = parseInt(req.params.id);
    let n = parseInt(req.params.num);

    // index in array with the given id
    let index = user_array.findIndex(index => index.id == uniqueStr);

    // if no such id send error messege
    if(index == -1){
        res.status(404).send(`No user with the given unique string`);
    } else {
        //else update M of this user and send the response
        user_array[index].M *= n;
        res.send("The following user: " + uniqueStr + "  multiplied by: " + n + " now M = " + user_array[index].M);
    }
});

//put request to divide a number
app.put('/calc/:id/divide/:num', (req, res)=> {
    let uniqueStr = parseInt(req.params.id);
    let n = parseInt(req.params.num);

    if(n == 0) {
        res.status(500).send(`You are not allowed to divide by zero`);
        n = 1
    }
    // index in array with the given id
    let index = user_array.findIndex(index => index.id == uniqueStr);

    // if no such id send error messege
    if(index == -1){
        res.status(404).send(`No user with the given unique string`);
    } else {
        //else update M of this user and send the response
        user_array[index].M /= n;
        res.send("The following user: " + uniqueStr + "  divided by: " + n + " now M = " + user_array[index].M);
    }
});

// get an M of a user
app.get('/calc/:id/M', (req, res)=> {
    let uniqueStr = parseInt(req.params.id);

    // index in array with the given id
    let index = user_array.findIndex(index => index.id == uniqueStr);

    // if no such id send error messege
    if(index == -1){
        res.status(404).send(`No user with the given unique string`);
    } else {
        //else update M of this user and send the response
        res.send("For this user: " + uniqueStr + " M = " + user_array[index].M);
    }
});

//post request to reset M to 0
app.post('/calc/:id/reset', (req, res)=> {
    let uniqueStr = parseInt(req.params.id);

    // index in array with the given id
    let index = user_array.findIndex(index => index.id == uniqueStr);

    // if no such id send error messege
    if(index == -1){
        res.status(404).send(`No user with the given unique string`);
    } else {
        //else update M of this user and send the response
        user_array[index].M = 0;
        res.send("The following user: " + uniqueStr + "  reset M = " + user_array[index].M);
    }
});

//delete request to reset M to 0
app.delete('/calc/:id/del', (req, res)=> {
    let uniqueStr = parseInt(req.params.id);

    // index in array with the given id
    let index = user_array.findIndex(index => index.id == uniqueStr);

    // if no such id send error messege
    if(index == -1){
        res.status(404).send(`No user with the given unique string`);
    } else {
        //else update M of this user and send the response
        user_array.splice(index, 1);
        res.send("The following user: " + uniqueStr + "  deleted his account, now there are " + user_array.length +" users");
    }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Guy's Server started on port: ${PORT}`));