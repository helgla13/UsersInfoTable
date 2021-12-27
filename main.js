$(document).ready(function () {

    class human {

        avrgRelated = '';

        constructor(firstname, lastname, email, age) {
            this.firstname = firstname;
            this.lastname = lastname;
            this.email = email;
            this.age = age;
        }

        averageRelated(averageAge) {
            if (averageAge && this.age) {
                if (this.age < averageAge)
                    this.avrgRelated = "Below average";
                else if (this.age > averageAge)
                    this.avrgRelated = "Above average";
                else
                    this.avrgRelated = "Equal to average";
            }
        }
    }

    var persons = [];
    for (var i = 0; i <= 9; i++) {
        var personInfo = getPersonInfo();
        if (personInfo) {
            var personFirstname = personInfo.name.first;
            var personLastname = personInfo.name.last;
            var personEmail = personInfo.email;
            var personAge = personInfo.dob.age;
            var person = new human(personFirstname, personLastname, personEmail, personAge);
            persons.push(person);
        }
    }
    var averageAge = getAverageAge(persons);
    for (var i = 0; i < persons.length; i++) {
        persons[i].averageRelated(averageAge);
    }
    showPersonsInfo(persons, averageAge);

});

function getPersonInfo() {
    var result = "";
    $.ajax({
        url: 'https://randomuser.me/api/',
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        async: false,
        dataType: 'json',
        type: 'get',
    }).done(function (data) {
        result = data.results[0];
    }).fail(function () {
        alert("Sorry. Server unavailable.");
    });
    return result;
};

function getAverageAge(persons) {
    if (persons) {
        var sumAge = 0;
        var countPersonsWithAge = 0;
        for (var i = 0; i < persons.length; i++) {
            if (persons[i].age) {
                countPersonsWithAge++;
                sumAge = sumAge + +persons[i].age;
            }
        }
        var averageAge = Math.round(sumAge / countPersonsWithAge);
        return averageAge;
    }
}

function showPersonsInfo(personsInfo, age) {
    var div = document.getElementById('personstable');
    var arr = [1, 2, 3];
    if (personsInfo) {
        var html = '<h3>Average age - ' + age + '</h3>' +
            '<table class="table" id="mytable"><thead><tr><th scope="col" onclick="sortTable(0)">First Name</th><th scope="col">Last Name</th>' +
            '<th scope="col">Email</th><th scope="col" onclick="sortTable(3)">Age</th><th scope="col">Average Age</th></tr></thead><tbody>';
        for (var i = 0; i < personsInfo.length; i++) {
            html += '<tr><td>' + personsInfo[i].firstname + '</td>' +
                '<td>' + personsInfo[i].lastname + '</td>' +
                '<td>' + personsInfo[i].email + '</td>' +
                '<td>' + personsInfo[i].age + '</td>' +
                '<td>' + personsInfo[i].avrgRelated + '</td></tr>';
        }
        html += '</tbody></table>';
        div.innerHTML = html;
    }
}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("mytable");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}