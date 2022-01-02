/* Your Code Here */
function createEmployeeRecord(array) {
    let record = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
   return record
}

function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord)
 }

 function dateStampObj(type, dateStamp) {
    return {type: type, date: dateStamp.slice(0,10), hour: parseInt(dateStamp.slice(-4))}
} 

function createTimeInEvent(date_stamp) {
    this.timeInEvents.push(dateStampObj("TimeIn", date_stamp))
    return this
}

function createTimeOutEvent(date_stamp) {
    this.timeOutEvents.push(dateStampObj("TimeOut", date_stamp))
    return this
}

function hoursWorkedOnDate(form_date) { 
    const timeIn = this.timeInEvents.find((e) => e.date === form_date).hour
    const timeOut = this.timeOutEvents.find((e) => e.date === form_date).hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(form_date) {
    const payOwed = hoursWorkedOnDate.call(this, form_date) * this.payPerHour
    return payOwed
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find((record) => record.firstName === firstName)
}

function calculatePayroll(array) {
    const allPayOwed = (array.map((em) => { return allWagesFor.call(em)}))
    return allPayOwed.reduce((accum, curVal) => accum + curVal)
}