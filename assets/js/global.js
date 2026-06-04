async function loadComponent(elementId, file) {
    const container = document.getElementById(elementId);

    if (!container) return;

    try {
        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(
                `Failed to load ${file}`
            );
        }

        const html = await response.text();

        container.innerHTML = html;
    }
    catch(error) {
        console.error(error);
    }
}

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await Promise.all([
            loadComponent(
                "header-container",
                "http://pheowiki.github.io/assets/html/header.html"
            ),
            loadComponent(
                "sidebar-container",
                "https://pheowiki.github.io/assets/html/sidebar.html"
            )
        ]);

        initializeSearch();
        initializeTOC();
    }
);

function initializeSearch() {

    const form =
        document.querySelector(".search-form");

    if (!form) return;

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const query =
                document
                .getElementById("wiki-search")
                .value
                .trim();

            if (!query) return;

            window.location.href =
                `/search.html?q=${encodeURIComponent(query)}`;
        }
    );
}

function initializeTOC() {

    document
        .querySelectorAll(".toc a")
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    const target =
                        document.querySelector(
                            link.getAttribute("href")
                        );

                    if (target) {

                        target.scrollIntoView({
                            behavior: "smooth"
                        });
                    }
                }
            );
        });
}
