const fs = require('fs');
const express = require('express');
const app = express();



const data = fs.readFileSync('Lab3-timetable-data.json');
const timetable = JSON.parse(data);
const props = Object.keys(timetable)

const result = props.map(function (prop) {
    return {
        id: prop,
        subjectCode: timetable[prop].subject,
        description: timetable[prop].catalog_description
    };
});



app.get('/', (req, res) => {
    res.send(result)
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});









