

const fs = require("fs"); // Import the 'fs' module for file system operations
// Import the 'path' module for handling file paths
const path = require("path"); // Class to hold data for students and courses
class Data {
  constructor(students, courses) {
    this.students = students; // Array of student objects
    this.courses = courses; // Array of course objects
  }
}

let dataCollection = null; // Variable to store the loaded data

// Function to initialize data by reading JSON files
function initialize() {
  return new Promise((resolve, reject) => {
    // Read the students.json file
    fs.readFile(
      path.join(__dirname, "..", "data", "students.json"),
      "utf8",
      (err, studentDataFromFile) => {
        if (err) {
          // Reject the promise if there is an error reading the file
          reject("unable to read students.json");
          return;
        }

        let studentData;
        try {
          // Parse the student data from JSON
          studentData = JSON.parse(studentDataFromFile);
        } catch (err) {
          // Reject the promise if the JSON is invalid
          reject("students.json is not a valid JSON file");
          return;
        }

        // Read the courses.json file
        fs.readFile(
          path.join(__dirname, "..", "data", "courses.json"),
          "utf8",
          (err, courseDataFromFile) => {
            if (err) {
              // Reject the promise if there is an error reading the file
              reject("unable to read courses.json");
              return;
            }

            let courseData;
            try {
              // Parse the course data from JSON
              courseData = JSON.parse(courseDataFromFile);
            } catch (err) {
              // Reject the promise if the JSON is invalid
              reject("courses.json is not a valid JSON file");
              return;
            }

            // Initialize the dataCollection with parsed student and course data
            dataCollection = new Data(studentData, courseData);
            // Resolve the promise indicating successful initialization
            resolve();
          }
        );
      }
    );
  });
}

// Function to get all students
function getAllStudents() {
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.students.length > 0) {
      // Resolve with the list of students if data is available
      resolve(dataCollection.students);
    } else {
      // Reject if no students are found
      reject("no results returned");
    }
  });
}

// Function to get all TAs (Teaching Assistants)
function getTAs() {
  return new Promise((resolve, reject) => {
    if (dataCollection) {
      // Filter students to find TAs
      const TAs = dataCollection.students.filter(
        (student) => student.TA === true
      );
      if (TAs.length > 0) {
        // Resolve with the list of TAs if found
        resolve(TAs);
      } else {
        // Reject if no TAs are found
        reject("no results returned");
      }
    } else {
      // Reject if data is not initialized
      reject("no results returned");
    }
  });
}

// Function to get all courses
function getCourses() {
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.courses.length > 0) {
      // Resolve with the list of courses if data is available
      resolve(dataCollection.courses);
    } else {
      // Reject if no courses are found
      reject("no results returned");
    }
  });
}

// Export the functions for external use
module.exports = { initialize, getAllStudents, getTAs, getCourses };
