const baseUrl = 'https://8080-marcoweb-restbiblioteca-h6tjppj8uu3.ws-us116.gitpod.io';

function urlTo(path) {
    return baseUrl + '/' + path;
}

function getTableRow(item, modelName) {
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    tdId.appendChild(document.createTextNode(item['id']));
    let tdNome = document.createElement('td');
    tdNome.appendChild(document.createTextNode(item['nome']));
    let tdControls = document.createElement('td');
    let updateControl = document.createElement('button');
    updateControl.classList.add('btn');
    updateControl.classList.add('btn-outline-secondary');
    updateControl.setAttribute('onclick', 'select' + modelName  + '(' + item['id'] + ')');
    updateControl.appendChild(document.createTextNode('Editar'))
    let deleteControl = document.createElement('button');
    deleteControl.setAttribute('onclick', 'delete' + modelName  + '(' + item['id'] + ')');
    deleteControl.appendChild(document.createTextNode('Remover'))
    deleteControl.classList.add('btn');
    deleteControl.classList.add('btn-outline-danger');
    tdControls.appendChild(updateControl);
    tdControls.appendChild(document.createTextNode(' '));
    tdControls.appendChild(deleteControl);
    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdControls);
    return tr;
}

function drawTable(rowContainer, items, modelName) {
    rowContainer.innerHTML = '';
    items.forEach(item => {
        rowContainer.appendChild(getTableRow(item, modelName));
    });
}