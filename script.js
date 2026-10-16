"use strict";

// Temporary, casual development gate ONLY. Password is visible to anyone
// inspecting this public JavaScript file. Not suitable for sensitive content.
const PASSWORD = "development"; // Replace with your existing temporary password.

document.addEventListener("DOMContentLoaded", () => {
    const login = document.getElementById("login");
    const site = document.getElementById("site");
    const form = document.getElementById("login-form");
    const error = document.getElementById("error");

    const unlock = () => { login.hidden = true; site.hidden = false; };
    if (sessionStorage.getItem("authenticated") === "true") unlock();

    form?.addEventListener("submit", (event) => {
        event.preventDefault();
        if (document.getElementById("password").value === PASSWORD) {
            sessionStorage.setItem("authenticated", "true");
            unlock();
        } else {
            error.textContent = "Incorrect password";
        }
    });
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
});
