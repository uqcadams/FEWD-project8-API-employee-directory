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
                <img src="${employee.picture.medium}" alt="Profile image of ${employee.name}" class="user-image">
                <div class="employee-name">${concatEmployeeName(employee)}</div>
                <div class="employee-email">${employee.email}</div>
                <div class="employee-city">${employee.location.city}</div>
            </div>
        `;

        // ADDS EMPLOYEE CARD TO THE DOM
        employeeProfiles.innerHTML += employeeProfile;

        // APPLIES EVENT LISTENERS TO EMPLOYEE CARDS
        modalListeners();
    };
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
}

// CREATES THE EMPLOYEE MODAL 
const employeeModal = (employeeIndex) => {
    
    // STORES OBJECT DATA FOR CURRENT EMPLOYEE
    const employee = employeeData[employeeIndex];

    // CLEARS MODAL DOM
    overlay.innerHTML = '';

    // CREATES PERSONALISED MODAL
    const employeeModal = `
        <div class="employee-modal">
            <div class="modal-card">
                <div class="modal-nav">
                    <div class="modal-previous">&lt;</div>
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
                    <div class="employee-birthday">${employee.dob.date}</div>
                </div>
                <div class="modal-nav">
                    <div class="modal-next">&gt;</div>
                </div>
            </div>
        </div>
    `;

    // ADDS MODAL TO THE DOM
    overlay.innerHTML += employeeModal;

    // UPDATE CURRENT MODAL IDENTIFIER
    // currentModalIndex = findEmployeeIndex(employee.email);

    // APPLIES CLOSE MODAL EVENT LISTENER
    modalNavListeners();
    closeModal();

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
const isolateEmployee = (dataSet) => {
    const email = isolateEmail(dataSet.innerHTML);
    // const employeeIndex = findEmployeeIndex(email);
    // const employee = employeeData[employeeIndex];
    // return employee;
    currentModalIndex = findEmployeeIndex(email);
};


// APPLIES EVENT LISTENERS TO CREATE MODALS
const modalListeners = () => {

    // CREATES A NODELIST OF EMPLOYEE CARDS
    const employeeCards = document.querySelectorAll('div.employee-card');
    
    // ITERATES THROUGH NODELIST TO APPLY EVENT LISTENERS
    employeeCards.forEach(item => {
        item.addEventListener('click', (e) => {

            // DEFINES THE CHOSEN EMPLOYEE AS THE CLICK TARGET
            // const employee = isolateEmployee(e.target);
            isolateEmployee(e.target);
            console.log(currentModalIndex);

            // CREATES A MODAL FOR THE CHOSEN EMPLOYEE
            // employeeModal(employee);
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

    
// SEARCH