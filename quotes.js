"use strict";
// One quote per UTC day; stable across reloads and without daily builds.
(async () => {
    const targets = document.querySelectorAll("[data-daily-quote]");
    if (!targets.length) return;
    try {
        const response = await fetch("/data/quotes-cache.json");
        if (!response.ok) return;
        const quotes = await response.json();
        if (!Array.isArray(quotes) || !quotes.length) return;
        const day = Math.floor(Date.now() / 86400000);
        const quote = quotes[day % quotes.length];
        for (const target of targets) {
            const text = document.createElement("p");
            text.textContent = `“${quote.text}”`;
            const author = document.createElement("cite");
            author.textContent = `— ${quote.author}`;
            target.replaceChildren(text, author);
        }
    } catch (error) {
        console.warn("Daily quote unavailable:", error);
    }
})();
