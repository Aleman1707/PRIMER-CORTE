const fileInput = document.getElementById('file-input');
const fileUploadMessage = document.getElementById('file-upload-message');
const studentListTable = document.getElementById('student-list-table').getElementsByTagName('tbody')[0];
const generateGroupsButton = document.getElementById('generate-groups-button');
const groupsContainer = document.getElementById('groups');
const groupSizeInput = document.getElementById('group-size');

let students = [];
let hasFemales = false;

fileInput.addEventListener('change', handleFileSelect);
generateGroupsButton.addEventListener('click', generateGroups);

function handleFileSelect(event) {
    const file = event.target.files[0];

    if (!file) {
        return;
    }

    if (file.size > 50 * 1024 * 1024) {
        fileUploadMessage.textContent = 'El archivo excede el tamaño máximo permitido (50MB).';
        fileUploadMessage.style.color = 'red';
        resetUI();
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        const data = e.target.result;
        try {
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            processData(jsonData);
        } catch (error) {
            fileUploadMessage.textContent = 'Archivo no compatible. Por favor, selecciona un archivo CSV o Excel válido.';
            fileUploadMessage.style.color = 'red';
            resetUI();
            return;
        }
    };

    reader.onerror = function(e) {
        fileUploadMessage.textContent = 'Error al leer el archivo.';
        fileUploadMessage.style.color = 'red';
        resetUI();
    }

    reader.readAsBinaryString(file);
}

function processData(data) {
    students = [];
    hasFemales = false;

    for (let i = 1; i < data.length; i++) {
        if (data[i] && data[i].length >= 2) {
            const name = data[i][0];
            const gender = data[i][1];

            if (name && gender) {
                students.push({ name: name.trim(), gender: gender.trim().toUpperCase() });
                if (gender.trim().toUpperCase() === 'F') {
                    hasFemales = true;
                }
            }
        }
    }

    if (students.length === 0) {
        fileUploadMessage.textContent = 'El archivo está vacío o no contiene datos válidos.';
        fileUploadMessage.style.color = 'red';
        resetUI();
        return;
    }

    students.sort((a, b) => a.name.localeCompare(b.name));

    populateStudentList();
    fileUploadMessage.textContent = 'Archivo cargado exitosamente.';
    fileUploadMessage.style.color = 'green';
    generateGroupsButton.disabled = false;
}

function populateStudentList() {
    studentListTable.innerHTML = '';
    students.forEach(student => {
        let row = studentListTable.insertRow();
        let nameCell = row.insertCell();
        let genderCell = row.insertCell();

        nameCell.textContent = student.name;
        genderCell.textContent = student.gender === 'F' ? 'Mujer' : 'Hombre';
    });
}

function generateGroups() {
    const groupSize = parseInt(groupSizeInput.value);

    if (isNaN(groupSize) || groupSize < 2) {
        alert('Por favor, ingresa un tamaño de grupo válido (mínimo 2).');
        return;
    }

    const females = students.filter(student => student.gender === 'F');
    const males = students.filter(student => student.gender === 'M');

    const shuffledFemales = shuffleArray(females);
    const shuffledMales = shuffleArray(males);

    const groups = [];
    let currentFemaleIndex = 0;

    while (currentFemaleIndex < shuffledFemales.length) {
        let group = [shuffledFemales[currentFemaleIndex]];
        currentFemaleIndex++;

        while (group.length < groupSize && shuffledMales.length > 0) {
            group.push(shuffledMales.shift());
        }

        while (group.length < groupSize && currentFemaleIndex < shuffledFemales.length) {
            group.push(shuffledFemales[currentFemaleIndex]);
            currentFemaleIndex++;
        }

        groups.push(group);
    }

    while (shuffledMales.length > 0) {
        let group = [];
        while (group.length < groupSize && shuffledMales.length > 0) {
            group.push(shuffledMales.shift());
        }
        groups.push(group);
    }
    displayGroups(groups);
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function displayGroups(groups) {
    groupsContainer.innerHTML = '';

    groups.forEach((group, index) => {
        const groupDiv = document.createElement('div');
        groupDiv.classList.add('group');
        groupDiv.innerHTML = `<h3>Grupo ${index + 1}</h3>`;
        group.forEach(student => {
            const studentSpan = document.createElement('span');
            studentSpan.classList.add('student-name');
            studentSpan.textContent = student.name;

            if (student.gender === 'F') {
                studentSpan.classList.add('female');
            } else {
                studentSpan.classList.add('male');
            }

            groupDiv.appendChild(studentSpan);
        });
        groupsContainer.appendChild(groupDiv);
    });
}

function resetUI() {
    studentListTable.innerHTML = '';
    generateGroupsButton.disabled = true;
    groupsContainer.innerHTML = '';
    students = [];
    hasFemales = false;
}