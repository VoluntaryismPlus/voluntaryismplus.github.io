document.addEventListener("DOMContentLoaded", function () {
  // --- DROPDOWN FUNCTIONALITY ---
  const dropdownButtons =
    document.querySelectorAll(".dropdown-btn");

  dropdownButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const isActive = this.classList.contains("active");
      closeAllDropdowns();

      if (!isActive) {
        this.classList.add("active");
        this.setAttribute("aria-expanded", "true");
        const dropdown = this.nextElementSibling;
        if (
          dropdown &&
          dropdown.classList.contains("dropdown-container")
        ) {
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
      if (
        dropdown &&
        dropdown.classList.contains("dropdown-container")
      ) {
        dropdown.classList.remove("show");
      }
    });
  }

  // Auto-open a specific dropdown on load if desired
  const autoOpen = document.getElementById("acti");
  if (autoOpen) {
    autoOpen.click();
  }

  // --- OVERLAY FUNCTIONALITY ---
  const overlay = document.getElementById("myNav");
  const hamburger = document.getElementById("hamburger");
  const closeBtn = document.getElementById("closeNav");

  if (hamburger && overlay) {
    hamburger.addEventListener("click", function () {
      overlay.style.width = "100%";
    });
  }

  if (closeBtn && overlay) {
    closeBtn.addEventListener("click", function () {
      overlay.style.width = "0%";
    });
  }

  // Optional: close overlay when clicking outside sidebar
  if (overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        overlay.style.width = "0%";
      }
    });
  }
});
