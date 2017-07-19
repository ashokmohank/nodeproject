'use strict'


function getUsers (req, res) {
//req.log("re")
    console.log('get req..');
res.json({ message: 'users!' });   
}

module.exports = getUsers
