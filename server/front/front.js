

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
tbody = document.getElementById('outputBody');



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
    subCode = subCode.toUpperCase();
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
    document.getElementById('outputBody').innerHTML = '';
    var subCode = document.getElementById('inputSubject2').value
    var courseCode1 = document.getElementById('inputCourseCode1').value
    var component = document.getElementById('myDropdown').value;
    subCode = subCode.toUpperCase();
    courseCode1 = courseCode1.toUpperCase();
    component = component.toUpperCase();
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
                    if (component == "") {
                        return data.map(function (d) {
                            let tr = createNode('tr');
                            let td1 = createNode('th');
                            let td2 = createNode('th');
                            let td3 = createNode('th');
                            let td4 = createNode('th');
                            let td5 = createNode('th');
                            let td6 = createNode('th');
                            let td7 = createNode('th');
                            let td8 = createNode('th');
                            let td9 = createNode('th');
                            let td10 = createNode('th');
                            let td11 = createNode('th');
                            td1.appendChild(document.createTextNode(`${d.course_info[0].class_nbr}`));
                            td2.appendChild(document.createTextNode(`${d.course_info[0].start_time}`));
                            td3.appendChild(document.createTextNode(`${d.course_info[0].descrlong}`));
                            td4.appendChild(document.createTextNode(`${d.course_info[0].end_time}`));
                            td5.appendChild(document.createTextNode(`${d.course_info[0].facility_ID}`));
                            td6.appendChild(document.createTextNode(`${d.course_info[0].days}`));
                            td7.appendChild(document.createTextNode(`${d.course_info[0].instructors}`));
                            td8.appendChild(document.createTextNode(`${d.course_info[0].class_section}`));
                            td9.appendChild(document.createTextNode(`${d.course_info[0].ssr_component}`));
                            td10.appendChild(document.createTextNode(`${d.course_info[0].enrl_stat}`));
                            td11.appendChild(document.createTextNode(`${d.course_info[0].descr}`));
                            append(tr, td1)
                            append(tr, td2)
                            append(tr, td3)
                            append(tr, td4)
                            append(tr, td5)
                            append(tr, td6)
                            append(tr, td7)
                            append(tr, td8)
                            append(tr, td9)
                            append(tr, td10)
                            append(tr, td11)
                            append(tbody, tr);
                        })
                    }
                    else {
                        if (data.length > 1) {
                            return data.map(function (d) {
                                let tr = createNode('tr');
                                let td1 = createNode('th');
                                let td2 = createNode('th');
                                let td3 = createNode('th');
                                let td4 = createNode('th');
                                let td5 = createNode('th');
                                let td6 = createNode('th');
                                let td7 = createNode('th');
                                let td8 = createNode('th');
                                let td9 = createNode('th');
                                let td10 = createNode('th');
                                let td11 = createNode('th');
                                td1.appendChild(document.createTextNode(`${d.course_info[0].class_nbr}`));
                                td2.appendChild(document.createTextNode(`${d.course_info[0].start_time}`));
                                td3.appendChild(document.createTextNode(`${d.course_info[0].descrlong}`));
                                td4.appendChild(document.createTextNode(`${d.course_info[0].end_time}`));
                                td5.appendChild(document.createTextNode(`${d.course_info[0].facility_ID}`));
                                td6.appendChild(document.createTextNode(`${d.course_info[0].days}`));
                                td7.appendChild(document.createTextNode(`${d.course_info[0].instructors}`));
                                td8.appendChild(document.createTextNode(`${d.course_info[0].class_section}`));
                                td9.appendChild(document.createTextNode(`${d.course_info[0].ssr_component}`));
                                td10.appendChild(document.createTextNode(`${d.course_info[0].enrl_stat}`));
                                td11.appendChild(document.createTextNode(`${d.course_info[0].descr}`));
                                append(tr, td1)
                                append(tr, td2)
                                append(tr, td3)
                                append(tr, td4)
                                append(tr, td5)
                                append(tr, td6)
                                append(tr, td7)
                                append(tr, td8)
                                append(tr, td9)
                                append(tr, td10)
                                append(tr, td11)
                                append(tbody, tr);
                            })
                        }
                        else {
                            return data.course_info.map(function (d) {
                                let tr = createNode('tr');
                                let td1 = createNode('th');
                                let td2 = createNode('th');
                                let td3 = createNode('th');
                                let td4 = createNode('th');
                                let td5 = createNode('th');
                                let td6 = createNode('th');
                                let td7 = createNode('th');
                                let td8 = createNode('th');
                                let td9 = createNode('th');
                                let td10 = createNode('th');
                                let td11 = createNode('th');
                                td1.appendChild(document.createTextNode(`${d.class_nbr}`));
                                td2.appendChild(document.createTextNode(`${d.start_time}`));
                                td3.appendChild(document.createTextNode(`${d.descrlong}`));
                                td4.appendChild(document.createTextNode(`${d.end_time}`));
                                td5.appendChild(document.createTextNode(`${d.facility_ID}`));
                                td6.appendChild(document.createTextNode(`${d.days}`));
                                td7.appendChild(document.createTextNode(`${d.instructors}`));
                                td8.appendChild(document.createTextNode(`${d.class_section}`));
                                td9.appendChild(document.createTextNode(`${d.ssr_component}`));
                                td10.appendChild(document.createTextNode(`${d.enrl_stat}`));
                                td11.appendChild(document.createTextNode(`${d.descr}`));
                                append(tr, td1)
                                append(tr, td2)
                                append(tr, td3)
                                append(tr, td4)
                                append(tr, td5)
                                append(tr, td6)
                                append(tr, td7)
                                append(tr, td8)
                                append(tr, td9)
                                append(tr, td10)
                                append(tr, td11)
                                append(tbody, tr);
                            })
                        }
                    }


                }
            })
            .catch((err) => console.log(err))
        document.getElementById('getTBForm').reset();
    }
}

function createScheduleName() {
    document.getElementById('output').innerHTML = '';
    var createScheduleName = document.getElementById('createScheduleName').value;
    createScheduleName = createScheduleName.toUpperCase();
    if (createScheduleName == "") {
        alert("Please enter the schedule name you want to create")
    }
    else {
        fetch('http://localhost:3000/api/newSchedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': ''
            },
            body:
                JSON.stringify({
                    name: createScheduleName,
                }),



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
    var scheduleNameForAddPairs = document.getElementById('addPairsScheduleName').value;
    var subjectCode = document.getElementById('inputSubjectCode').value;
    var courseCode = document.getElementById('inputCourseCode2').value;
    scheduleNameForAddPairs = scheduleNameForAddPairs.toUpperCase();
    subjectCode = subjectCode.toUpperCase();
    courseCode = courseCode.toUpperCase();
    if (scheduleNameForAddPairs == "") {
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
                name: scheduleNameForAddPairs,
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
    getScheduleName = getScheduleName.toUpperCase();
    getSubjectCode = getSubjectCode.toUpperCase();
    getCourseCode = getCourseCode.toUpperCase();

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
    getScheduleName = getScheduleName.toUpperCase();
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
    getScheduleName = getScheduleName.toUpperCase();
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
            if (data.err) {
                alert(data.err)
            }
            else {
                return data.map(function (d) {
                    let li = createNode('li');
                    let span = createNode('span');
                    span.appendChild(document.createTextNode(`Schedules: ${d.name} Number of Courses: ${d.course.length}`));
                    append(li, span);
                    append(ul, li);
                })
            }
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
