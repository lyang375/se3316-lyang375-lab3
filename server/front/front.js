


document.getElementById('btnGetAll').addEventListener('click', getAll);
document.getElementById('btnSubject').addEventListener('click', getCode);
document.getElementById('btnGetThree').addEventListener('click', getTB);

ul = document.getElementById('output');

function dropdown(){
    document.getElementById("myDropdown").classList.toggle("show");
}
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
    fetch('http://localhost:3000/api/result3')
}