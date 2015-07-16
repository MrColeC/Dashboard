// Date functions
var validDates = [];
function getYear() {
  var d = new Date();
  return d.getFullYear();
}

function getQuarter() {
  var d = new Date();
  var m = d.getMonth();
  if (( m >= 0) && (m <= 3)) {
    return 1;
  } else if (( m >= 4) && (m <= 6)) {
    return 2;
  } else if (( m >= 7) && (m <= 9)) {
    return 3;
  } else {
    return 4;
  }
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
