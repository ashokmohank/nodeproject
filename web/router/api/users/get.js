'use strict'


function getUsers (req, res) {
    console.log('get req..');
res.json({ message: 'users!' });   
}

module.exports = getUsers
