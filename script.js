const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");

if (navToggle && nav) {
  // Keep mobile navigation lightweight and easy to dismiss after a tap.
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      const isMobile = window.matchMedia("(max-width: 920px)").matches;
      const dropdownParent = link.parentElement;
      const isDropdownTrigger = dropdownParent?.classList.contains("has-dropdown");

      // On mobile, first tap on "Услуги" should only toggle the submenu.
      if (isMobile && isDropdownTrigger) {
        event.preventDefault();
        dropdownParent.classList.toggle("is-open");
        return;
      }

      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (header) {
  // Keep header fixed in one visual state on all scroll positions.
  header.classList.remove("is-sticky");
}
