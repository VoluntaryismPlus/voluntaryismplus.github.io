document.addEventListener("DOMContentLoaded", function () {
  // --- SIDEBAR DROPDOWN FUNCTIONALITY ---
  const dropdownButtons =
    document.querySelectorAll(".dropdown-btn");

  dropdownButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const dropdown = this.nextElementSibling;

      // Close only sibling dropdowns at this level
      const parent = this.parentElement;
      Array.from(parent.children).forEach(function (child) {
        if (
          child !== btn &&
          child.classList &&
          child.classList.contains("dropdown-btn")
        ) {
          child.classList.remove("active");
          child.setAttribute("aria-expanded", "false");
          if (
            child.nextElementSibling &&
            child.nextElementSibling.classList.contains(
              "dropdown-container"
            )
          ) {
            child.nextElementSibling.classList.remove(
              "show"
            );
          }
        }
        // Also close other .dropdown-container at this level, if any are open
        if (
          child !== dropdown &&
          child.classList &&
          child.classList.contains("dropdown-container")
        ) {
          child.classList.remove("show");
        }
      });

      // Toggle this dropdown
      const isActive = this.classList.contains("active");
      if (isActive) {
        this.classList.remove("active");
        this.setAttribute("aria-expanded", "false");
        if (
          dropdown &&
          dropdown.classList.contains("dropdown-container")
        ) {
          dropdown.classList.remove("show");
        }
      } else {
        this.classList.add("active");
        this.setAttribute("aria-expanded", "true");
        if (
          dropdown &&
          dropdown.classList.contains("dropdown-container")
        ) {
          dropdown.classList.add("show");
        }
      }
    });
  });

  // --- HIGHLIGHT CURRENT PAGE AND OPEN RELEVANT DROPDOWNS ---
  var path = window.location.pathname.split("/").pop();

  function highlightNav(rootSelector) {
    document
      .querySelectorAll(
        rootSelector + " .dropdown-container a"
      )
      .forEach(function (link) {
        let linkHref = link.getAttribute("href")
          ? link.getAttribute("href").split(/[?#]/)[0]
          : "";
        if (linkHref === path) {
          // Highlight: add 'thispage' class to parent (div or li) if possible, else to <a>
          if (
            link.parentElement.classList.contains(
              "dropdown-container"
            )
          ) {
            link.classList.add("thispage");
          } else {
            link.parentElement.classList.add("thispage");
          }
          // Open dropdown
          const dropdownContainer = link.closest(
            ".dropdown-container"
          );
          if (dropdownContainer) {
            const dropdownBtn =
              dropdownContainer.previousElementSibling;
            if (
              dropdownBtn &&
              dropdownBtn.classList.contains("dropdown-btn")
            ) {
              dropdownBtn.classList.add("active");
              dropdownBtn.setAttribute(
                "aria-expanded",
                "true"
              );
              dropdownContainer.classList.add("show");
            }
          }
        }
      });
  }

  // Highlight in both sidebar and overlay if present
  highlightNav("#sideNav");
  highlightNav(".overlay-content");
});
