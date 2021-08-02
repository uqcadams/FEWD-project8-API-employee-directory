// SCRIPTS FOR ACCESSING EMPLOYEE DATA FROM API
const userData = [];
const getUserData = async () => {

    const base = "https://randomuser.me/api/";
    const userCount = 12;
    const query = `?results=${userCount}&inc=picture,name,email,location,cell,dob&nat=US`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data;
};

getUserData()
    // returns an array of the users with associated data
    .then(data => {
        return data.results;
    })
    .then(data => {
        // Sorts the returned employee data
        sortAlphabetically(data);
        // Stores the sorted user data into an array
        storeEmployeeData(data);
        // Creates the employee directory using the stored data
        createEmployeeProfile(employeeData);
    })
    .catch(error => console.log(`An error occured: ${error}`));


