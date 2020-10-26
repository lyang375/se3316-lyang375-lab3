

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

ul = document.getElementById('output');


function createNode(element) {
    return document.createElement(element)
}
function append(parent, element) {
    return parent.appendChild(element);
}

function getAll() {
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
            component: component
        })
    }).then(res => {
        return res.json()
    })
        .then(data => {
            return data.course_info.map(function (d) {
                let li = createNode('li');
                let span = createNode('span');
                span.innerHTML = `Course Number: ${d.class_nbr} Start Time: ${d.start_time} Pre-requist: ${d.descrlong} 
                End Time: ${d.end_time} Campus: ${d.campus} Facility ID: ${d.facility_ID} Days: ${d.days} 
                Instructor: ${d.instructors} Class Section: ${d.class_section} Component: ${d.ssr_component} 
                Status: ${d.enrl_stat} Description: ${d.descr}`
                append(li, span);
                append(ul, li);
            })

        })
        .catch((err) => console.log(err))

}