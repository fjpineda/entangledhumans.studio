"use strict";

const PASSWORD = "development";  // Change this

document.addEventListener("DOMContentLoaded", () => {
    const login = document.getElementById("login");
    const site = document.getElementById("site");
    const form = document.getElementById("login-form");
    const error = document.getElementById("error");

    function unlock() {
        login.hidden = true;
        site.hidden = false;
    }

    if (sessionStorage.getItem("authenticated") === "true") {
        unlock();
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const entered = document.getElementById("password").value;

        if (entered === PASSWORD) {
            sessionStorage.setItem("authenticated", "true");
            unlock();
        } else {
            error.textContent = "Incorrect password";
        }
    });

    document.getElementById("year").textContent =
        new Date().getFullYear();
});
