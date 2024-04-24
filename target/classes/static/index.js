// Loads tickets
window.onload = () => {
    getTickets()
}
// Get tickets from server function
function getTickets() {
    $.get("/getTickets", function (data) {
        showTickets(data);
    });
}

// Save ticket function
function saveTicket(ticket) {
    $.post("/saveTicket", ticket, function () {
        getTickets();
    });
}

// Delete ticket function
function removeTicket(id) {
    $.get("/removeTicket?id=" + id, function () {
        getTickets();
    });
}

// Delete all tickets function
function slett() {
    $.get("/slett", function () {
        getTickets();
    });
}

// Save ticket verifier function
function kjøpBillett() {
    // Ticket object
    const billetten = {
        id: 0,
        film: $("#film :selected").val(),
        antall: $("#antall").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        tlfnr: $("#tlfnr").val(),
        email: $("#email").val()
    };

    // Error counter
    let error = false;

    // Validation

    // Nested verifier function
    function verifier(value, errorStatus, empty) {
        const output = ["film", "antall", "fornavnet", "etternavnet", "telefonnr", "epost"];
        if (errorStatus) {
            if (empty) {
                $(`#${value.replace(/_/, '-')}-error`).html(
                    "Mangler " + output[Object.keys(billetten).indexOf(value)]
                );
            } else {
                $(`#${value.replace(/_/, '-')}-error`).html(
                    "Ugyldig " + output[Object.keys(billetten).indexOf(value)]
                );
            }
            $("#" + value.replace(/_/, '-')).removeClass("is-valid").addClass("is-invalid");
            error = true;
        } else {
            $(`#${value.replace(/_/, '-')}-error`).html("");
            $("#" + value.replace(/_/, '-')).removeClass("is-invalid").addClass("is-valid");
        }
    }

    // Checks if movie is selected
    if (billetten.film === "#0") {
        verifier("film", true, true);
    } else {
        verifier("film", false);
    }

    // Checks if the fields are empty
    for (const value in billetten) {
        if (value === "film") continue;
        if (billetten[value] === "") {
            verifier(value, true, true);
        } else {
            verifier(value, false);
        }
    }

    // Checks if the number of tickets is a number and is greater than 0
    if (billetten.antall <= 0 && $("#antall").hasClass('is-valid')) {
        verifier("antall", true, false);
    }



    // Checks if the phone number is 8 digits long and is a number
    if ((billetten.tlfnr.length !== 8) || isNaN(Number(billetten.tlfnr)) && $("#tlfnr").hasClass('is-valid')) {
        verifier("tlfnr", true, false);
    }

    // Checks if the email is valid
    if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,20}$/.test(billetten.email) && $("#email").hasClass('is-valid')) {
        verifier("email", true, false);
    }

    // If no errors, add ticket to array and clear input fields
    if (!error) {
        saveTicket(billetten);
        for (const value in billetten) {
            $("#" + value.replace(/_/, '-')).removeClass("is-valid");
        }
        $("#film").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#tlfnr").val("");
        $("#email").val("");
    }
}

// Display tickets function
function    showTickets(tickets) {
    let ut = "<tr class='w-100 p-3'>" +
        "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th><th></th>" +
        "</tr>"
    let i = "<table class='table table-striped'>"
    for (let ticket of tickets) {
        ut +=
            "<tr>" +
            "<td>" + ticket.film + "</td>" +
            "<td>" + ticket.antall + "</td>" +
            "<td>" + ticket.fornavn + "</td>" +
            "<td>" + ticket.etternavn + "</td>" +
            "<td>" + ticket.tlfnr + "</td>" +
            "<td>" + ticket.email + "</td>" +
            "<td><button onclick='removeTicket(" + ticket.id + ")' class='btn-close' aria-label='Close'></button></td>" +
            "</tr>"
        i++;
    }
    ut += "</table>"
    $("#tickets").html(ut);
}