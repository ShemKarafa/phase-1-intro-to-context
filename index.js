// Your code here
function createEmployeeRecord(employeeInfo) {
    let employeeRecord = {};
    employeeRecord.firstName = employeeInfo[0];
    employeeRecord.familyName = employeeInfo[1];
    employeeRecord.title = employeeInfo[2];
    employeeRecord.payPerHour = employeeInfo[3];
    employeeRecord.timeInEvents = [];
    employeeRecord.timeOutEvents = [];
    return employeeRecord;
}
  
// Function to create employee records
function createEmployeeRecords(rows) {
    return rows.map(row => createEmployeeRecord(row));
}
  
// Function to create a time-in event
function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    employeeRecord.timeInEvents.push({type: "TimeIn", date: date, hour: parseInt(hour)});
    return employeeRecord;
}
  
// Function to create a time-out event
function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(" ");
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      date,
      hour: parseInt(hour, 10),
    });
    return employeeRecord;
}
  
// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find((event) => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find((event) => event.date === date);
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked;
}
  
// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const wagesEarned = hoursWorked * employeeRecord.payPerHour;
    return wagesEarned;
}
  
// Function to calculate all wages for an employee
function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => {
      return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
    return totalWages;
}
  
// Function to calculate payroll for all employees
function calculatePayroll(employeeRecords) {
    let wages = employeeRecords.map(record => allWagesFor(record));
    return wages.reduce((total, wage) => total + wage, 0);
}
  
// Function to find an employee by first name
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
}

// Testing codes
let dataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300],
    ["Byron", "Poodle", "Mascot", 3],
    ["Julius", "Caesar", "General", 27],
    ["Rafiki", "", "Aide", 10],
    ["Simba", "", "King", 100]
]

 // Create employee records
const employees = createEmployeeRecords(dataEmployees);

// Add time-in and time-out events for employees
createTimeInEvent(employees[0], "2018-01-01 0800");
createTimeOutEvent(employees[0], "2018-01-01 1600");

createTimeInEvent(employees[1], "2018-01-01 0700");
createTimeOutEvent(employees[1], "2018-01-01 1700");

// Calculate hours worked on a specific date
console.log(hoursWorkedOnDate(employees[0], "2018-01-01")); 
console.log(hoursWorkedOnDate(employees[1], "2018-01-01")); 

// Calculate wages earned on a specific date
console.log(wagesEarnedOnDate(employees[0], "2018-01-01"));
console.log(wagesEarnedOnDate(employees[1], "2018-01-01")); 

// Calculate all wages for an employee
console.log(allWagesFor(employees[0])); 
console.log(allWagesFor(employees[1])); 

// Calculate payroll for all employees
console.log(calculatePayroll(employees)); 