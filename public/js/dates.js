// Date functions
var validDates = [];
function getYear() {
  var date = new Date();
  return date.getFullYear();
}

function getQuarter() {
  var date = new Date();
  var m = date.getMonth();
  if (( m >= 0) && (m <= 2)) {
    return 1;
  } else if (( m >= 3) && (m <= 5)) {
    return 2;
  } else if (( m >= 6) && (m <= 8)) {
    return 3;
  } else {
    return 4;
  }
}

// Mode: pass 'total' to get total number of days in the quater; days remaining is returned
function getTimeRemaining(mode) {
  var date = new Date();
  var m = date.getMonth();
  var d = date.getDate();
  var y = date.getFullYear();

  // Javascript month objets go from 0 to 11
  // Make the quarter start in January, April, July & October
  // Make the quarter end 3 months later
  var qs = 0;
  var qe = 3
  if (( m >= 3) && (m <= 5)) {
    qs = 3;
    qe = 5;
  } else if (( m >= 6) && (m <= 8)) {
    qs = 6;
    qe = 8;
  } else if (m >= 9){
    qs = 9;
    qe = 11;
  }

  // After we calulate what range we are in, we need to add one to the month
  // So it can accurately depict the month we are in
  m++;

  var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  var start = new Date(y,qs,1);
  var current = new Date(y,m,d);
  var end = new Date(y,qe,31);

  // Check if variable exists
  if (mode) {
    // Return total number of days in the quarter
    if (mode == 'total') {
      var days = Math.round(Math.abs((end.getTime() - start.getTime())/(oneDay)));
      console.log("It is " + y + "/" + m + "/" + d + " and the quarter started in " + qs + "/1 and will end on " + qe + "/31");
      console.log("There are a total of " + days + " days in this quarter.");
      return days;
    }
  }

  // Return the number of days until the end of the quarter
  var days = Math.round(Math.abs((end.getTime() - current.getTime())/(oneDay)));
  console.log(days + " days remain in this quarter.");
  return days;
}

function getDueDateOptions() {
  var year = getYear();
  var currentQ = getQuarter();
  var quarters = [];
  var howMuch = 12;
  var at = 1;
  while (at <= howMuch) {
    if (currentQ > 4) {
      currentQ = 1;
      year++;
    }
    quarters.push(year + " Q" + currentQ);
    currentQ++;
    at++;
  }
  return quarters;
}

function setDateOptions() {
  validDates = getDueDateOptions();
  validDates.forEach(function(item) {
    $('.populate-with-dates').append("<option>" + item + "</option>");
    // console.log("Added date option: " + item);
  });
}
