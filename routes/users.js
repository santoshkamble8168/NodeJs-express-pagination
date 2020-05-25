const router = require('express').Router();
const UsersMoule = require('../models/Users');
const mongoose = require('mongoose');

//one time records added on Database
const db = mongoose.connection;
db.once('open', async() => {
    if(await UsersMoule.countDocuments().exec() > 0) return
    Promise.all([
        UsersMoule.create({name: "user no 1", email: "user1@test.com"}),
        UsersMoule.create({name: "user no 2", email: "user2@test.com"}),
        UsersMoule.create({name: "user no 3", email: "user3@test.com"}),
        UsersMoule.create({name: "user no 4", email: "user4@test.com"}),
        UsersMoule.create({name: "user no 5", email: "user5@test.com"}),
        UsersMoule.create({name: "user no 6", email: "user6@test.com"}),
        UsersMoule.create({name: "user no 7", email: "user7@test.com"}),
        UsersMoule.create({name: "user no 8", email: "user8@test.com"}),
        UsersMoule.create({name: "user no 9", email: "user9@test.com"}),
        UsersMoule.create({name: "user no 10", email: "user10@test.com"}),
        UsersMoule.create({name: "user no 11", email: "user11@test.com"}),
        UsersMoule.create({name: "user no 12", email: "user12@test.com"}),
        UsersMoule.create({name: "user no 13", email: "user13@test.com"}),
        UsersMoule.create({name: "user no 14", email: "user14@test.com"}),
        UsersMoule.create({name: "user no 15", email: "user15@test.com"}),
        UsersMoule.create({name: "user no 16", email: "user16@test.com"}),
        UsersMoule.create({name: "user no 17", email: "user17@test.com"}),
        UsersMoule.create({name: "user no 18", email: "user18@test.com"}),
        UsersMoule.create({name: "user no 19", email: "user19@test.com"}),
        UsersMoule.create({name: "user no 20", email: "user20@test.com"}),
    ]).then(() => console.log('Users added'))
})

router.get('/', pagination(UsersMoule) ,async (req, res) => {
    try {
        res.json(res.pagination);
    } catch (error) {
        res.status(400).send(error);
    }
})

//Create a middleware for pagination accept model as argument 
function pagination (model) {
    return async (req, res, next) => {
        //Query parameter - get page number and limit 
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        //start index and end index for pagination
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        //store result on result object
        const result = {};

        //Get total number of records
        const totalRecords = await model.countDocuments().exec();
        
        //Next page records
        if(endIndex < totalRecords){
            result.next = {
                page: page + 1,
                limit: limit,
                total_records: totalRecords
            }
        }

        //Previous page records
        if(startIndex > 0){
            result.previous = {
                page: page - 1,
                limit: limit,
                total_records: totalRecords
            }
        }

        //If there is no query string it retuen all records
        result.result = await model.find().limit(limit).skip(startIndex).exec();
        res.pagination = result;
        next()
    }
}

module.exports = router;