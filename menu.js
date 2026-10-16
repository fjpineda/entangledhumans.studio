
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const button = header.querySelector(".menu-toggle");
    const nav = header.querySelector("nav");

    if (!button || !nav) return;

    nav.id = "site-nav";

    function setMenuOpen(open) {
        nav.classList.toggle("is-open", open);
        button.setAttribute("aria-expanded", String(open));
        button.setAttribute(
            "aria-label",
            open ? "Close navigation menu" : "Open navigation menu"
        );
    }

    button.addEventListener("click", () => {
        const open = button.getAttribute("aria-expanded") === "true";
        setMenuOpen(!open);
    });

    // Close the menu after selecting a link.
    nav.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            setMenuOpen(false);
        }
    });

    // Close when Escape is pressed.
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" &&
            button.getAttribute("aria-expanded") === "true") {
            setMenuOpen(false);
            button.focus();
        }
    });

    // Reset mobile menu state when returning to desktop.
    const desktop = window.matchMedia("(min-width: 701px)");
    desktop.addEventListener("change", (event) => {
        if (event.matches) setMenuOpen(false);
    });
});

