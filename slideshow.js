
"use strict";

// Homepage slideshow: automatic crossfades, no visitor controls.
document.addEventListener("DOMContentLoaded", async () => {
    const site = document.getElementById("site");
    const slides = Array.from(document.querySelectorAll(".slideshow .slide"));
    if (!site || slides.length !== 2) return;

    let images;
    try {
        const response = await fetch("/slideshow.json", { cache: "no-cache" });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const manifest = await response.json();
        images = manifest.images;
        if (!Array.isArray(images) || !images.length ||
            !images.every(path => typeof path === "string")) {
            throw new Error("Invalid slideshow manifest");
        }
    } catch (error) {
        console.error("Unable to load slideshow:", error);
        return;
    }

    // Wait until the existing password gate reveals the homepage.
    if (site.hidden) {
        await new Promise(resolve => {
            const observer = new MutationObserver(() => {
                if (!site.hidden) {
                    observer.disconnect();
                    resolve();
                }
            });
            observer.observe(site, {
                attributes: true,
                attributeFilter: ["hidden"]
            });
        });
    }

    const load = path => new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`Could not load ${path}`));
        img.src = path;
    });

    let active = 0;
    let next = 0;

    try {
        await load(images[0]);
    } catch (error) {
        console.error(error);
        return;
    }

    slides[0].src = images[0];
    slides[0].classList.add("is-visible");

    if (images.length === 1) return;

    const advance = async () => {
        next = (next + 1) % images.length;
        const incoming = 1 - active;

        try {
            await load(images[next]);
            slides[incoming].src = images[next];
            slides[incoming].classList.add("is-visible");
            slides[active].classList.remove("is-visible");
            active = incoming;
        } catch (error) {
            console.error(error);
        }
    };

    // Each photograph is shown for five seconds before the next crossfade.
    setInterval(advance, 5000);
});

