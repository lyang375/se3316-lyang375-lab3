const fs = require('fs');
const express = require('express');
const app = express();
const router = express.Router();

const data = fs.readFileSync('Lab3-timetable-data.json');
const timetable = JSON.parse(data);
const props = Object.keys(timetable)
const result = props.map(function (prop) {
    return {
        id: prop,
        subjectCode: timetable[prop].subject,
        description: timetable[prop].course_info[0].descr
    };
});


app.use('/', express.static('front'));

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




app.use('/api', router)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});









