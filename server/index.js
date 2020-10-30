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
        className: timetable[prop].className,
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
    if (filterOne && filterOne.length > 0) {
        res.send(filterOne);
    }
    else {
        res.status(404).send({ err: `Subject Code: ${subCode2} does not exist` })
    }
})


router.post('/result3', function (req, res) {
    const subCode3 = req.body.subjectCode;
    const courseCode = req.body.courseCode;
    const component = req.body.component;
    let criteriaTwo;
    let filterTwo;
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
        criteriaTwo = { "subject": subCode3, "catalog_nbr": courseCode }
        filterTwo = timetable.filter(function (item) {
            for (var key in criteriaTwo) {
                if ((item[key] == criteriaTwo[key]
                    && item.course_info["ssr_component"] == component)
                ) {
                    return false;
                }
            }
            return true;
        });

    }
    if (filterTwo) {
        res.send(filterTwo);
    }
    else {
        res.status(404).send({ err: `Subject Code or Course Code does not exist` })
    }

})

router.post('/newSchedule', function (req, res) {
    const newName = req.body.name;
    const course = new Array();
    Schedule.find({ name: newName }, function (err, item) {
        if (item.length === 0) {
            const schedule = new Schedule({
                name: newName,
                course: course,
            })
            schedule.save().then(savedSchedule => {
                res.json(savedSchedule.toJSON())
            })
        }
        else {
            res.json({ err: 'Name already exists' })
        }
    })
})

router.post('/addCourse', function (req, res) {
    const scheduleName = req.body.name;
    const newSubject = req.body.subject;
    const newCourse = req.body.catalog_nbr;
    const course = {
        subjectCode: newSubject,
        courseCode: newCourse
    }
    Schedule.find({ name: scheduleName }, function (err, item) {
        if (item.length === 0) {
            res.json({ err: 'Schedule Name not found' })
        }
    })
    var criteriaForAdd = { "subject": newSubject, "catalog_nbr": newCourse }
    var filterForAdd = timetable.filter(function (item) {
        for (var key in criteriaForAdd) {
            if (item[key] === undefined || item[key] != criteriaForAdd[key])
                return false;
        }
        return true;
    });
    if (filterForAdd && filterForAdd.length > 0) {
        Schedule.update({ name: scheduleName }, { $push: { course: course } }).then(add => {
            if (add) {
                res.json({ message: `Successfully added course ${newSubject} ${newCourse}` })
            }
            else {
                res.json({ err: 'Fail' })
            }
        })
    }
    else {
        res.status(404).send({ err: `Subject Code or Course Code does not exist` })
    }


})
router.put('/submitSchedule', function (req, res) {
    const getName = req.body.name;
    const getSubject = req.body.subjectCode;
    const getCourse = req.body.courseCode;
    Schedule.find({ name: getName }, function (err, item) {
        if (item.length === 0) {
            res.json({ err: 'Schedule Name not found' })
        }
    })
    var criteriaForSave = { "subject": getSubject, "catalog_nbr": getCourse };
    var filterForSave = timetable.filter(function (item) {
        for (var key in criteriaForSave) {
            if (item[key] === undefined || item[key] != criteriaForSave[key])
                return false;
        }
        return true;
    });
    const course = {
        subjectCode: getSubject,
        courseCode: getCourse
    }
    const info = {
        name: getName,
        course: course
    }
    if (filterForSave && filterForSave.length > 0) {
        return Schedule.findOneAndReplace(getName, info)
            .then(replacedDocument => {
                if (replacedDocument) {
                    res.json({ message: 'Successfully added' })
                }
                else {
                    res.json({ err: 'Failed' })
                }

            })
            .catch(err => console.log(err))
    }
    else {
        res.status(404).send({ err: `Subject Code or Course Code does not exist` })
    }

})
router.post('/getScheduleElement', function (req, res) {
    const getSearchName = req.body.name;
    Schedule.find({ name: getSearchName }, function (err, item) {
        if (item.length === 0 || err) {
            res.json({ err: 'No such schedule name found' })
        }
        else {
            res.json(item)
        }
    })
})
router.post('/deleteSchedule', function (req, res) {
    const getDeleteName = req.body.name;
    Schedule.find({ name: getDeleteName }, function (err, item) {
        if (item.length === 0 || err) {
            res.json({ err: 'No such schedule name found' })
        }
        else {
            Schedule.findOneAndDelete({ name: getDeleteName }, function (err, item) {
                if (err) {
                    res.json({ err: 'Delete was not performed' })
                }
                else {
                    res.json({ message: 'Success deleted item' })
                }

            });
        }
    })

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









