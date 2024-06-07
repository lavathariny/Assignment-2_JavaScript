


const collegeData = require('./modules/collegeData');

// Initialize the data
collegeData.initialize()
    .then(() => {
        console.log('Initialization successful');

        // Test getAllStudents function
        return collegeData.getAllStudents();
    })
    .then(students => {
        console.log(`Successfully retrieved ${students.length} students`);

        // Test getCourses function
        return collegeData.getCourses();
    })
    .then(courses => {
        console.log(`Successfully retrieved ${courses.length} courses`);

        // Test getTAs function
        return collegeData.getTAs();
    })
    .then(TAs => {
        console.log(`Successfully retrieved ${TAs.length} TAs`);
    })
    .catch(err => {
        console.error('Error:', err);
    });