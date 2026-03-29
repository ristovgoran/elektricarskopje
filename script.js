const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");

if (navToggle && nav) {
  const closeNav = () => {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    nav.querySelectorAll(".has-dropdown.is-open").forEach((item) => {
      item.classList.remove("is-open");
    });
  };

  const closeOtherDropdowns = (current) => {
    nav.querySelectorAll(".has-dropdown.is-open").forEach((item) => {
      if (item !== current) item.classList.remove("is-open");
    });
  };

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));

    if (!isOpen) {
      nav.querySelectorAll(".has-dropdown.is-open").forEach((item) => {
        item.classList.remove("is-open");
      });
    }
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      const isMobile = window.matchMedia("(max-width: 920px)").matches;
      const dropdownParent = link.closest(".has-dropdown");
      const isDropdownTrigger = dropdownParent?.querySelector(":scope > a") === link;

      // Mobile behavior: first tap opens dropdown, second tap navigates.
      if (isMobile && isDropdownTrigger) {
        const isOpen = dropdownParent.classList.contains("is-open");
        if (!isOpen) {
          event.preventDefault();
          closeOtherDropdowns(dropdownParent);
          dropdownParent.classList.add("is-open");
        }
        return;
      }

      closeNav();
    });
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && !navToggle.contains(event.target)) {
      closeNav();
    }
  });

  window.addEventListener("resize", () => {
    if (!window.matchMedia("(max-width: 920px)").matches) {
      nav.querySelectorAll(".has-dropdown.is-open").forEach((item) => {
        item.classList.remove("is-open");
      });
    }
  });
}

if (header) {
  // Keep header fixed in one visual state on all scroll positions.
  header.classList.remove("is-sticky");
}
