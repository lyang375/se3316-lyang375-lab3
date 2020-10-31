

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
document.getElementById('btnAddCourse').addEventListener('click', addCourses);

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
                span.appendChild(document.createTextNode(`Subject: ${d.subjectCode} Class Name: ${d.className}`));
                append(li, span);
                append(ul, li);
            })
        })
        .catch((err) => console.log(err))
}

function getCode() {
    document.getElementById('output').innerHTML = '';
    var subCode = document.getElementById('inputSubject').value
    if (subCode == "") {
        alert("Please enter a subject code")
    }
    else {
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
                if (data.err) {
                    alert(data.err)
                }
                else {
                    return data.map(function (d) {
                        let li = createNode('li');
                        let span = createNode('span');
                        span.appendChild(document.createTextNode(`Course Code ${d.catalog_nbr}`));
                        append(li, span);
                        append(ul, li);
                    })
                }

            })
            .catch((err) => console.log(err))
        document.forms[0].reset();
    }

}

function getTB() {
    document.getElementById('output').innerHTML = '';
    var subCode = document.getElementById('inputSubject2').value
    var courseCode1 = document.getElementById('inputCourseCode1').value
    var component = document.getElementById('myDropdown').value;
    if (subCode == "" || courseCode1 == "") {
        alert("Please enter both subject code and course code")
    }
    else {
        fetch('http://localhost:3000/api/result3', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                subjectCode: subCode,
                courseCode: courseCode1,
                component: component,
            })
        }).then(res => {
            return res.json()
        })
            .then(data => {
                if (data.err) {
                    alert(data.err)
                }
                else {
                    return data.map(function (d) {
                        let li = createNode('li');
                        let span = createNode('span');
                        span.appendChild(document.createTextNode(`Course Number: ${d.course_info[0].class_nbr} Start Time: ${d.course_info[0].start_time} Pre-requist: ${d.course_info[0].descrlong} 
                    End Time: ${d.course_info[0].end_time} Campus: ${d.course_info[0].campus} Facility ID: ${d.course_info[0].facility_ID} Days: ${d.course_info[0].days} 
                    Instructor: ${d.course_info[0].instructors} Class Section: ${d.course_info[0].class_section} Component: ${d.course_info[0].ssr_component} 
                    Status: ${d.course_info[0].enrl_stat} Description: ${d.course_info[0].descr}`));
                        append(li, span);
                        append(ul, li);
                    })
                }
            })
            .catch((err) => console.log(err))
        document.getElementById('getTBForm').reset();
    }
}

function createScheduleName() {
    document.getElementById('output').innerHTML = '';
    var createScheduleName = document.getElementById('createScheduleName').value;
    if (createScheduleName == "") {
        alert("Please enter the schedule name you want to create")
    }
    else {
        fetch('http://localhost:3000/api/newSchedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: createScheduleName,
            })
        }).then(res => {
            return res.json()
        })
            .then(data => {
                if (data.err) {
                    alert(data.err)
                }
                else {
                    let li = createNode('li');
                    let span = createNode('span');
                    span.appendChild(document.createTextNode(`Success created schedule ${data.name}`));
                    append(li, span);
                    append(ul, li);
                }

            })
            .catch((err) => console.log(err))
        document.getElementById('createScheduleForm').reset();
    }

}
function addCourses() {
    document.getElementById('output').innerHTML = '';
    var ScheduleNameForAddPairs = document.getElementById('addPairsScheduleName').value;
    var subjectCode = document.getElementById('inputSubjectCode').value;
    var courseCode = document.getElementById('inputCourseCode2').value;
    if (ScheduleNameForAddPairs == "") {
        alert("Please enter the schedule name you want to add course")
    }
    else if (subjectCode == "" || courseCode == "") {
        alert("Please enter both the subject code and course code you want to add course")
    }
    else {
        fetch('http://localhost:3000/api/addCourse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: ScheduleNameForAddPairs,
                subject: subjectCode,
                catalog_nbr: courseCode
            })
        }).then(res => {
            return res.json()
        })
            .then(data => {
                if (data.err) {
                    alert(data.err)
                }
                else {
                    let li = createNode('li');
                    let span = createNode('span');
                    span.appendChild(document.createTextNode(`${data.message}`));
                    append(li, span);
                    append(ul, li);
                }

            })
            .catch((err) => console.log(err))
        document.getElementById('addCoursesForSchedule').reset();
    }

}
function submitSchedule() {
    document.getElementById('output').innerHTML = '';
    var getScheduleName = document.getElementById('saveScheduleName').value;
    var getSubjectCode = document.getElementById('saveSubjectCode').value;
    var getCourseCode = document.getElementById('saveCourseCode').value;
    if (getScheduleName == "") {
        alert("Please enter the schedule name you want to save course")
    }
    else if (getSubjectCode == "" || getCourseCode == "") {
        alert("Please enter both the subject code and course code you want to save the course")
    }
    else {
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
                if (data.err) {
                    alert(data.err)
                }
                else {
                    let li = createNode('li');
                    let span = createNode('span');
                    span.appendChild(document.createTextNode(`${data.message}`));
                    append(li, span);
                    append(ul, li);
                }
            })
            .catch((err) => console.log(err))
        document.getElementById('saveScheduleForm').reset();
    }

}
function getScheduleElement() {
    document.getElementById('output').innerHTML = '';
    var getScheduleName = document.getElementById('getScheduleNameForList').value;
    if (getScheduleName == "") {
        alert("Please enter the schedule name you want to know the courses inside")
    }
    else {
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
                if (data.err) {
                    alert(data.err)
                }
                else {
                    return data.map(function (d) {
                        for (var i = 0; i < d.course.length; i++) {
                            let li = createNode('li');
                            let span = createNode('span');
                            span.appendChild(document.createTextNode(`Subject: ${d.course[i].subjectCode} Course:${d.course[i].courseCode} `));
                            append(li, span);
                            append(ul, li);
                        }
                    })
                }


            })
            .catch((err) => console.log(err))
        document.getElementById('getListForm').reset();
    }
}
function deleteSchedule() {
    document.getElementById('output').innerHTML = '';
    var getScheduleName = document.getElementById('deleteScheduleName').value;
    if (getScheduleName == "") {
        alert("Please enter the schedule name you want to delete")
    }
    else {
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
                if (data.err) {
                    alert(data.err)
                }
                else {
                    let li = createNode('li');
                    let span = createNode('span');
                    span.appendChild(document.createTextNode(`${data.message}`));
                    append(li, span);
                    append(ul, li);
                }

            })
            .catch((err) => console.log(err))
        document.getElementById('deleteScheduleForm').reset();
    }

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
                span.appendChild(document.createTextNode(`Schedules: ${d.name} Number of Courses: ${d.course.length}`));
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
            span.appendChild(document.createTextNode(`${data.message} `));
            append(li, span);
            append(ul, li);
        })

}
