// Script to manipulate the DOM

const employeeProfiles = document.querySelector('.employee-profiles');
const overlay = document.querySelector('.overlay');

// Empty array to store fetched employee data
const employeeData = [];

let currentModalIndex = 0;

// UTILITY FUNCTIONS

// CONCATENATES EMPLOYEE NAME
const concatEmployeeName = (data) => {
    const employeeName = Object.values(data.name).join(" ");
    return employeeName;
};

// CONCATENATES EMPLOYEE ADDRESS
const concatEmployeeAddress = (data) => {
    const location = data.location;
    const employeeAddress = `${location.street.number} ${location.street.name}, ${location.state} ${location.postcode}`;
    return employeeAddress;
}

// SORT EMPLOYEE DATA ALPHABETICALLY
const sortAlphabetically = (data) => {
    data.sort((a, b) => {
        if (a.name.last.toLowerCase() < b.name.last.toLowerCase()
        ) return -1;
        if (a.name.last.toLowerCase() > b.name.last.toLowerCase()
        ) return 1;
        return 0;
    });
    console.log(data);
};

// STORES FETCHED EMPLOYEE DATA AND PUSHES TO EMPTY ARRAY
const storeEmployeeData = (data) => {
    for (i = 0; i < data.length; i++) {
        employeeDataObject = data[i];
        employeeData.push(employeeDataObject);
        console.log(employeeData);
    };
};

// ISOLATES EMPLOYEE EMAIL FROM SELECTED CARD
const isolateEmail = (employeeCardHTML) => {

    // EXTRACTS EMAIL FROM HTML CONTENT AND STORES IT TO A VARIABLE
    const email = employeeCardHTML.split('<div class="employee-email">').pop().split('</div>')[0];
    return email;
}


// FIND INDEX IN EMPLOYEE DATASET ACCORDING TO EMAIL
const findEmployeeIndex = (email) => {
    const index = employeeData.findIndex(employee => employee.email === email);
    
    // RETURN THE INDEX AS AN INTEGER
    return index;
};


// ISOLATE EMPLOYEE FROM EMPLOYEE DATASET
const isolateEmployee = (clickTarget) => {

    // if (clickTarget.)
    const email = isolateEmail(clickTarget.innerHTML);
    // const employeeIndex = findEmployeeIndex(email);
    // const employee = employeeData[employeeIndex];
    // return employee;
    currentModalIndex = findEmployeeIndex(email);
};

// ADDS EVENT LISTENER TO CLOSE MODAL
const closeModal = () => {

    // SELECTS NEWLY CREATED CLOSE-MODAL ELEMENT
    const closeModal = document.querySelector('.close-modal');

    // ADDS ON-CLICK EVENT LISTENER
    closeModal.addEventListener("click", (e) => {

        // CLEARS THE OVERLAY AND MODAL CONTENT
        overlay.innerHTML = "";
    })

    document.addEventListener('click', (e) => {
        if (e.target.className === "employee-modal"){
            overlay.innerHTML = "";
        }
    })
}



// POPULATES SCREEN WITH EMPLOYEE DATA
const createEmployeeProfile = (data) => {
    
    // CLEARS THE DOM FOR IMPORTING EMPLOYEE DATA
    employeeProfiles.innerHTML = '';
    
    // ITERATES THROUGH EMPLOYEE ARRAY
    for (i = 0; i < data.length; i++) {

        // STORES OBJECT DATA FOR CURRENT EMPLOYEE
        const employee = data[i];

        // CREATES PERSONALISED EMPLOYEE CARD
        const employeeProfile = `
            <div class="employee-card">
                <img src="${employee.picture.large}" alt="Profile image of ${employee.name}" class="employee-image">
                <div class="employee-info">
                    <div class="employee-name">${concatEmployeeName(employee)}</div>
                    <div class="employee-email">${employee.email}</div>
                    <div class="employee-city">${employee.location.city}</div>
                </div>
            </div>
        `;

        // ADDS EMPLOYEE CARD TO THE DOM
        employeeProfiles.innerHTML += employeeProfile;

        // APPLIES EVENT LISTENERS TO EMPLOYEE CARDS
        modalListeners();
    };
};


// CREATES THE EMPLOYEE MODAL 
const employeeModal = (employeeIndex) => {
    
    // STORES OBJECT DATA FOR CURRENT EMPLOYEE
    const employee = employeeData[employeeIndex];

    let employeeBirthdate = new Date(employee.dob.date);

    // CLEARS MODAL DOM
    overlay.innerHTML = '';

    // CREATES PERSONALISED MODAL
    const employeeModal = `
        <div class="employee-modal">
            <div class="modal-card">
                <div class="modal-nav">
                    <div class="modal-previous"><span>&lt;</span></div>
                </div>
                <div class="modal-content">
                    <div class="close-modal">X</div>
                    <img src="${employee.picture.large}" alt="Profile image of ${concatEmployeeName(employee)}" class="employee-image">
                    <div class="employee-name">${concatEmployeeName(employee)}</div>
                    <div class="employee-email">${employee.email}</div>
                    <div class="employee-city">${employee.location.city}</div>
                    <hr>
                    <div class="employee-cell">${employee.cell}</div>
                    <div class="employee-address">${concatEmployeeAddress(employee)}</div>
                    <div class="employee-birthday">${employeeBirthdate.getMonth()}/${employeeBirthdate.getDate()}/${employeeBirthdate.getFullYear()}</div>
                </div>
                <div class="modal-nav">
                    <div class="modal-next">&gt;</div>
                </div>
            </div>
        </div>
    `;

    // ADDS MODAL TO THE DOM
    overlay.innerHTML += employeeModal;

    // APPLIES CLOSE MODAL EVENT LISTENER
    modalNavListeners();
    closeModal();

};


// APPLIES EVENT LISTENERS TO CREATE MODALS
const modalListeners = () => {

    // CREATES A NODELIST OF EMPLOYEE CARDS
    const employeeCards = document.querySelectorAll('div.employee-card');
    
    // ITERATES THROUGH NODELIST TO APPLY EVENT LISTENERS
    employeeCards.forEach(item => {
        item.addEventListener('click', (e) => {
            // DEFINES THE CHOSEN EMPLOYEE AS THE CLICK TARGET
            isolateEmployee(item);
            // CREATES A MODAL FOR THE CHOSEN EMPLOYEE
            employeeModal(currentModalIndex);
        })
    })
}

// CREATE CYCLE NEXT FUNCTION

const modalNavListeners = () => {
    const nextModal = document.querySelector('.modal-next');
    const previousModal = document.querySelector('.modal-previous');

    nextModal.addEventListener('click', () => {
        if (currentModalIndex <= 10) {
            currentModalIndex += 1;
        } else if (currentModalIndex === 11) {
            currentModalIndex = 0;
        }
        employeeModal(currentModalIndex);
        console.log(currentModalIndex);
    });
    
    previousModal.addEventListener('click', () => {
        if (currentModalIndex === 0) {
            currentModalIndex = 11;
        } else if (currentModalIndex <= 11) {
            currentModalIndex -= 1;
        }
        employeeModal(currentModalIndex);
        console.log(currentModalIndex);
    });
}

    
// SEARCH FUNCTION

const searchBar = document.getElementById('search-directory');

document.addEventListener('keyup', (e) => {
    // e.target.style.display = "none";
    searchEmployees();
})

const searchEmployees = () => {
    let input = document.getElementById('search-directory').value;
    input = input.toLowerCase();
    
    // CREATE AN HTMLCOLLECTION OF EMPLOYEE NAMES
    let employeeNames = document.getElementsByClassName('employee-name');

    //ITERATE THROUGH THE LIST OF NAMES TO FIND MATCHES
    for (i = 0; i < employeeNames.length; i++) {
        if (employeeNames[i].textContent.toLowerCase().includes(input)) {
            employeeNames[i].parentElement.parentElement.style.display = "flex";
        }
        else {
            employeeNames[i].parentElement.parentElement.style.display = "none";
        }
    }
};