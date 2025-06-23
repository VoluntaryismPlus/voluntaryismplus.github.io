// --- SIDEBAR & OVERLAY LOADER FOR STATIC SITES, WITH HIGHLIGHT & EXPAND CURRENT PAGE SUPPORT ---
// Place <div id="sidebar-include"></div> where you want the sidebar/overlay loaded on each page.
// Place <script src="js/sidebar.js"></script> after that div or before </body>.

document.addEventListener("DOMContentLoaded", function () {
  var sidebarTarget = document.getElementById(
    "sidebar-include"
  );
  if (sidebarTarget) {
    fetch("sidebar.html")
      .then((response) => {
        if (!response.ok)
          throw new Error("Sidebar failed to load");
        return response.text();
      })
      .then((data) => {
        sidebarTarget.innerHTML = data;
        setupSidebarDropdowns();
        highlightNav("#sideNav");
        highlightNav(".overlay-content");
        setupOverlayEvents();
      })
      .catch((err) => {
        console.warn(err);
      });
  } else {
    // If no loader, still run logic for statically present sidebar/overlay HTML
    setupSidebarDropdowns();
    highlightNav("#sideNav");
    highlightNav(".overlay-content");
    setupOverlayEvents();
  }

  // --- DROPDOWN FUNCTIONALITY (for sidebar only) ---
  function setupSidebarDropdowns() {
    const dropdownButtons = document.querySelectorAll(
      "#sideNav .dropdown-btn"
    );
    dropdownButtons.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const dropdown = this.nextElementSibling;
        // Close only sibling dropdowns at this level
        const parent = this.parentElement;
        Array.from(parent.children).forEach(
          function (child) {
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
          }
        );

        // Toggle this dropdown
        const isActive = this.classList.contains("active");
        if (isActive) {
          this.classList.remove("active");
          this.setAttribute("aria-expanded", "false");
          if (
            dropdown &&
            dropdown.classList.contains(
              "dropdown-container"
            )
          ) {
            dropdown.classList.remove("show");
          }
        } else {
          this.classList.add("active");
          this.setAttribute("aria-expanded", "true");
          if (
            dropdown &&
            dropdown.classList.contains(
              "dropdown-container"
            )
          ) {
            dropdown.classList.add("show");
          }
        }
      });
    });
  }

  // --- HIGHLIGHT CURRENT PAGE AND OPEN RELEVANT DROPDOWNS ---
  function highlightNav(rootSelector) {
    var path = window.location.pathname.split("/").pop();
    if (!path || path === "") path = "index.html";
    document
      .querySelectorAll(
        rootSelector +
          " .dropdown-container a, " +
          rootSelector +
          " ul a"
      )
      .forEach(function (link) {
        let linkHref = link.getAttribute("href")
          ? link.getAttribute("href").split(/[?#]/)[0]
          : "";
        if (
          linkHref === path ||
          (path === "index.html" &&
            linkHref === "index.html")
        ) {
          // Highlight the current page
          link.classList.add("thispage");
          // Recursively open all parent dropdowns
          let currentElement = link;
          while (currentElement) {
            // Find the nearest dropdown-container
            const dropdownContainer =
              currentElement.closest(".dropdown-container");
            if (dropdownContainer) {
              // Find the previous sibling dropdown-btn
              const dropdownBtn =
                dropdownContainer.previousElementSibling;
              if (
                dropdownBtn &&
                dropdownBtn.classList.contains(
                  "dropdown-btn"
                )
              ) {
                dropdownBtn.classList.add("active");
                dropdownBtn.setAttribute(
                  "aria-expanded",
                  "true"
                );
                dropdownContainer.classList.add("show");
              }
              currentElement = dropdownBtn; // Keep bubbling up
            } else {
              break;
            }
          }
        }
      });
  }

  // --- OVERLAY (HAMBURGER) NAVIGATION ---
  function setupOverlayEvents() {
    var hamburger = document.getElementById("hamburger");
    var overlay = document.getElementById("myNav");
    var closeNav = document.getElementById("closeNav");

    if (hamburger && overlay) {
      hamburger.onclick = function () {
        overlay.style.width = "100%";
        document.body.classList.add("overlay-open");
      };
    }
    if (closeNav && overlay) {
      closeNav.onclick = function () {
        overlay.style.width = "0";
        document.body.classList.remove("overlay-open");
      };
    }
    // Optional: close overlay when a nav link is clicked (for mobile UX)
    if (overlay) {
      overlay
        .querySelectorAll("a")
        .forEach(function (link) {
          link.addEventListener("click", function () {
            overlay.style.width = "0";
            document.body.classList.remove("overlay-open");
          });
        });
    }
  }
});
// FAQ toggle logic
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll(".faq-question")
    .forEach(function (q) {
      q.addEventListener("click", function () {
        var item = this.parentElement;
        item.classList.toggle("open");
      });
    });
});
