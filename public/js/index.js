// Always start page from top on reload
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", () => {

    /* ======================
       AOS INIT
    ====================== */
    AOS.init({
        duration: 900,
        easing: "ease-in-out",
        once: true,
        offset: 80,
    });

    /* ======================
       NAV ACTIVE LINK
    ====================== */
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    function updateActiveLink() {
        let current = "";
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${current}`
            );
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();

    /* ======================
       HAMBURGER MENU
    ====================== */
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });

        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
            });
        });
    }

    /* ======================
       GSAP SKILLS
    ====================== */
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".skill-card").forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 40,
            duration: 1,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
            }
        });
    });

    /* ======================
       💎 DIAMOND PARALLAX
    ====================== */

    const card = document.querySelector(".glass-card-visual");
    const gem = document.querySelector(".animated-gem");
    const shadow = document.querySelector(".gem-shadow");

    // Safety checks
    if (!card || !gem || !shadow) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const rotateX = (-y / rect.height) * 18;
        const rotateY = (x / rect.width) * 18;

        gem.style.transform = `
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.18)
    `;

        shadow.style.transform = `
        translate(${x * -0.05}px, ${y * -0.05}px)
    `;
        shadow.style.opacity = "0.85";
    });

    card.addEventListener("mouseleave", () => {
        gem.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
        shadow.style.transform = "translate(0,0)";
        shadow.style.opacity = "0.5";
    });




});
