

fetch('http://localhost:3000/api/result')
document.getElementById('btnGetAll').addEventListener('click', getAll);

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
