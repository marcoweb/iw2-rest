let generos = [];
let selectedGenero = null;

function selectGenero(id) {
    selectedGenero = generos[id];
    document.querySelector('#txtGenero').value = selectedGenero['nome'];
}

function deleteGenero(id) {
    fetch(urlTo('generos/' + id), {
        method: 'DELETE'
    }).then(response => {
        loadGeneros();
    });
    selectedGenero = null;
}

function loadGeneros() {
    fetch(urlTo('generos'), {
        method: 'GET'
    }).then(response => {
        response.json().then(data => {
            generos = [];
            data.forEach(item => {
                generos[item['id']] = item;
            })
            let tableBody = document.querySelector('#tblGeneros').querySelector('tbody');
            drawTable(tableBody, generos, 'Genero');
        });
    });
}

function saveGenero(item) { 
    fetch((item['id'] == null) ? urlTo('generos') : urlTo('generos/' + item['id']), {
        method: (item['id'] == null) ? 'POST' : 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(item)
    }).then(response => {
        loadGeneros();
    });
}

document.querySelector('#btnSalvar').addEventListener('click', function(){
    if(selectedGenero == null) {
        const item = {
            'id' : null,
            'nome': document.querySelector('#txtGenero').value
        }
        saveGenero(item);
    } else {
        selectedGenero['nome'] = document.querySelector('#txtGenero').value;
        saveGenero(selectedGenero);
    }
    document.querySelector('#txtGenero').value = '';
    selectedGenero = null;
});

document.querySelector('#btnLimpar').addEventListener('click', function() {
    document.querySelector('#txtGenero').value = '';
    selectedGenero = null;
});

loadGeneros();