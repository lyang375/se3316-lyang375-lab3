

function dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}
document.getElementById("myDropdown").addEventListener('click', function (event) {
    event.stopPropagation();
});
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
document.getElementById('btnGetAll').addEventListener('click', getAll);
document.getElementById('btnSubject').addEventListener('click', getCode);
document.getElementById('btnGetTB').addEventListener('click', getTB);
document.getElementById('btnCreateSchedule').addEventListener('click', createScheduleName);
document.getElementById('btnSubmitSchedule').addEventListener('click', submitSchedule);
document.getElementById('btnSubmitScheduleForList').addEventListener('click', getScheduleElement);
document.getElementById('btnDeleteSchedule').addEventListener('click', deleteSchedule);
document.getElementById('btnGetAllSchedule').addEventListener('click', getAllSchedule);
document.getElementById('btnDeleteAllSchedule').addEventListener('click', deleteAllSchedule);

ul = document.getElementById('output');


function createNode(element) {
    return document.createElement(element)
}
function append(parent, element) {
    return parent.appendChild(element);
}

function getAll() {
    document.getElementById('output').innerHTML = '';
    fetch('http://localhost:3000/api/result')
        .then(res => res.json())
        .then(data => {
            return data.map(function (d) {
                let li = createNode('li');
                let span = createNode('span');
                span.innerHTML = `Subject: ${d.subjectCode} Description: ${d.description}`;
                append(li, span);
                append(ul, li);
            })
        })
        .catch((err) => console.log(err))
}

function getCode() {
    document.getElementById('output').innerHTML = '';
    var subCode = document.getElementById('inputSubject').value
    fetch('http://localhost:3000/api/result2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            subjectCode: subCode
        })
    }).then(res => {
        return res.json()
    })
        .then(data => {
            return data.map(function (d) {
                let li = createNode('li');
                let span = createNode('span');
                span.innerHTML = `Course Code ${d.catalog_nbr}`
                append(li, span);
                append(ul, li);
            })

        })
        .catch((err) => console.log(err))
    document.forms[0].reset();
}

function getTB() {
    document.getElementById('output').innerHTML = '';
    var subCode = document.getElementById('inputSubject2').value
    var courseCode = document.getElementById('inputCourseCode').value
    var component = document.getElementById('myDropdown').value;

    fetch('http://localhost:3000/api/result3', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            subjectCode: subCode,
            courseCode: courseCode,
            component: component,
        })
    }).then(res => {
        return res.json()
    })
        .then(data => {
            return data.map(function (d) {
                let li = createNode('li');
                let span = createNode('span');
                span.innerHTML = `Course Number: ${d.course_info[0].class_nbr} Start Time: ${d.course_info[0].start_time} Pre-requist: ${d.course_info[0].descrlong} 
                End Time: ${d.course_info[0].end_time} Campus: ${d.course_info[0].campus} Facility ID: ${d.course_info[0].facility_ID} Days: ${d.course_info[0].days} 
                Instructor: ${d.course_info[0].instructors} Class Section: ${d.course_info[0].class_section} Component: ${d.course_info[0].ssr_component} 
                Status: ${d.course_info[0].enrl_stat} Description: ${d.course_info[0].descr}`
                append(li, span);
                append(ul, li);
            })

        })
        .catch((err) => console.log(err))
    document.getElementById('getTBForm').reset();

}
function createScheduleName() {
    document.getElementById('output').innerHTML = '';
    var scheduleName = document.getElementById('scheduleName').value
    fetch('http://localhost:3000/api/newSchedule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: scheduleName
        })
    }).then(res => {
        return res.json()
    })
        .then(data => {
            let li = createNode('li');
            let span = createNode('span');
            span.innerHTML = `Success created schedule ${data.name}`;
            append(li, span);
            append(ul, li);

        })
        .catch((err) => console.log(err))
}
function submitSchedule() {
    document.getElementById('output').innerHTML = '';
    var getScheduleName = document.getElementById('saveScheduleName').value;
    var getSubjectCode = document.getElementById('saveSubjectCode').value;
    var getCourseCode = document.getElementById('saveCourseCode').value;
    fetch('http://localhost:3000/api/submitSchedule', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: getScheduleName,
            subjectCode: getSubjectCode,
            courseCode: getCourseCode
        })
    }).then(res => {
        return res.json()
    })
        .then(data => {
            let li = createNode('li');
            let span = createNode('span');
            span.innerHTML = `${data.message}`;
            append(li, span);
            append(ul, li);

        })
        .catch((err) => console.log(err))
}
function getScheduleElement() {
    document.getElementById('output').innerHTML = '';
    var getScheduleName = document.getElementById('getScheduleNameForList').value;
    fetch('http://localhost:3000/api/getScheduleElement', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: getScheduleName,
        })
    }).then(res => {
        return res.json()
    })
        .then(data => {
            let li = createNode('li');
            let span = createNode('span');
            span.innerHTML = `Subject Code: ${data[0].subjectCode} Course Code: ${data[0].courseCode}`;
            append(li, span);
            append(ul, li);

        })
        .catch((err) => console.log(err))


}
function deleteSchedule() {
    document.getElementById('output').innerHTML = '';
    var getScheduleName = document.getElementById('deleteScheduleName').value;
    fetch('http://localhost:3000/api/deleteSchedule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: getScheduleName,
        })
    }).then(res => {
        return res.json()
    })
        .then(data => {
            let li = createNode('li');
            let span = createNode('span');
            span.innerHTML = `${data.message}`;
            append(li, span);
            append(ul, li);

        })
        .catch((err) => console.log(err))

}
function getAllSchedule() {
    document.getElementById('output').innerHTML = '';
    fetch('http://localhost:3000/api/getAllSchedule')
        .then(res => {
            return res.json()
        })
        .then(data => {
            return data.map(function (d) {
                let li = createNode('li');
                let span = createNode('span');
                span.innerHTML = `Schedules: ${d.name} `
                append(li, span);
                append(ul, li);
            })

        })

}
function deleteAllSchedule() {
    document.getElementById('output').innerHTML = '';
    fetch('http://localhost:3000/api/deleteAllSchedule', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },

    }).then(res => {
        return res.json()
    })
        .then(data => {
            let li = createNode('li');
            let span = createNode('span');
            span.innerHTML = `${data.message} `
            append(li, span);
            append(ul, li);
        })

}
