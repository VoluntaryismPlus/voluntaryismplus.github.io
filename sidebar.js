document.addEventListener("DOMContentLoaded", function () {
  const dropdownButtons = document.querySelectorAll(".dropdown-btn");

  // Allow only one open at a time
  dropdownButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      // Allow keyboard and mouse activation
      e.preventDefault();
      const isActive = this.classList.contains("active");
      closeAllDropdowns();

      if (!isActive) {
        this.classList.add("active");
        this.setAttribute("aria-expanded", "true");
        const dropdown = this.nextElementSibling;
        if (dropdown && dropdown.classList.contains("dropdown-container")) {
          dropdown.classList.add("show");
        }
      }
    });
  });

  function closeAllDropdowns() {
    dropdownButtons.forEach(function (btn) {
      btn.classList.remove("active");
      btn.setAttribute("aria-expanded", "false");
      const dropdown = btn.nextElementSibling;
      if (dropdown && dropdown.classList.contains("dropdown-container")) {
        dropdown.classList.remove("show");
      }
    });
  }

  // Auto-open a specific dropdown on load if desired
  const autoOpen = document.getElementById("acti");
  if (autoOpen) {
    autoOpen.click();
  }
});