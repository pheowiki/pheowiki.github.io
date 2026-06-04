document.addEventListener("DOMContentLoaded", () => {

    // Smooth scrolling for table of contents
    document.querySelectorAll('.toc a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();

            const target = document.querySelector(
                link.getAttribute('href')
            );

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight current section
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const top = section.offsetTop - 120;

            if (window.scrollY >= top) {
                current = section.id;
            }
        });

        document.querySelectorAll(".toc a").forEach(link => {
            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });

    console.log("Wiki template loaded");
});
