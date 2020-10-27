require('dotenv').config()
const mongoose = require('mongoose')
const Schedule = require('./models/schedule')
const fs = require('fs');
const express = require('express');
const app = express();
const router = express.Router();
var bodyParser = require('body-parser');
const data = fs.readFileSync('Lab3-timetable-data.json');
const timetable = JSON.parse(data);
const props = Object.keys(timetable)
const course_info = props.map(function (prop) {
    return timetable[prop].course_info;
})
const result = props.map(function (prop) {
    return {
        id: prop,
        subjectCode: timetable[prop].subject,
        description: timetable[prop].course_info[0].descr
    };
});



app.use('/', express.static('front'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set up middleware to do logging
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
})

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
router.get('/result', function (req, res) {
    res.send(result)
})
router.post('/result2', function (req, res) {
    const subCode2 = req.body.subjectCode;
    let criteriaOne;
    criteriaOne = { "subject": subCode2 }
    const filterOne = timetable.filter(function (item) {
        for (var key in criteriaOne) {
            if (item[key] === undefined || item[key] != criteriaOne[key])
                return false;
        }
        return true;
    });
    if (filterOne) {
        res.send(filterOne);
    }
    else {
        res.status(404).send(`Course Code of ${subCode} was not found`)
    }
})

router.post('/result3', function (req, res) {
    const subCode3 = req.body.subjectCode;
    const courseCode = req.body.courseCode;
    const component = req.body.component;
    let criteriaTwo;
    var filterTwo;
    if (component === "") {
        criteriaTwo = { "subject": subCode3, "catalog_nbr": courseCode }
        filterTwo = timetable.filter(function (item) {
            for (var key in criteriaTwo) {
                if (item[key] === undefined || item[key] != criteriaTwo[key])
                    return false;
            }
            return true;
        });
    }
    else {
        criteriaTwo = { "subject": subCode3, "catalog_nbr": courseCode, "ssr_component": component }
        filterTwo = timetable.filter(function (item) {
            for (var prop in props) {
                if (criteriaTwo[prop] === undefined || criteriaTwo[prop] != item[prop]) {
                    return false
                }
            }
            return true;

        });
    }

    /*
    if (component.length == 0) {
        criteria = { "subject": subCode3, "catagory_nbr": courseCode }
    }
    else {
        criteria = { "subject": subCode3, "catagory_nbr": courseCode, "ssr_component": component }
    }
    
    function filterBy(list, c) {
        return list.filter(candidate =>
            Object.keys(c).every(key =>
                candidate[key] == c[key]
            )
        );
    }
    const result3 = filterBy(timetable, criteria);
    /*
    const result3 = timetable.find(t => {
        Object.keys(criteria).every(key => [
            t[key] === criteria[key]
        ])
    })
    */
    if (filterTwo) {
        res.send(filterTwo);
    }
    else {
        res.status(404).json({ error: 'Course Code or Subject Code does not exist' })
    }

})

router.post('/newSchedule', function (req, res) {
    const body = req.body;

    if (body.name === undefined) {
        return res.status(400).json({ error: 'content missing' })
    }
    const schedule = new Schedule({
        name: body.name
    })
    schedule.save().then(savedSchedule => {
        res.json(savedSchedule)
    })
})
router.put('/submitSchedule', function (req, res) {
    const body = req.body;
    const getName = req.body.name;
    const info = {
        name: body.name,
        subjectCode: body.subjectCode,
        courseCode: body.courseCode,
    }
    if (getName === undefined) {
        return res.status(400).json({ error: 'content missing' })
    }
    return Schedule.findOneAndReplace(getName, info)
        .then(replacedDocument => {
            if (replacedDocument) {
                res.json({ message: 'Successfully added' })
            }
            else {
                res.json({ message: 'No such schedule found' })

            }

        })
        .catch(err => console.log(err))


})
router.post('/getScheduleElement', function (req, res) {
    const getSearchName = req.body.name;
    Schedule.find({ name: getSearchName }).then(schedules =>
        res.json(schedules)
    );

})
router.post('/deleteSchedule', function (req, res) {
    const getDeleteName = req.body.name;
    Schedule.findOneAndDelete({ name: getDeleteName }, function (err, item) {
        if (err) {
            res.json({ error: 'Schedule does not exist' })
        }
        else {
            res.json({ message: 'Success deleted item' })
        }
    });
})
// to get all schedule 
router.get('/getAllSchedule', function (req, res) {
    Schedule.find({}).then(schedules => {
        res.json(schedules);
    })
})
//to delete all schedule
router.delete('/deleteAllSchedule', function (req, res) {
    Schedule.remove({}, function (err) {
        if (err) {
            res.json({ error: 'Delete was not performed' })
        }
        else {
            res.json({ message: 'Success deleted item' })
        }
    })
})



app.use('/api', router)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});









