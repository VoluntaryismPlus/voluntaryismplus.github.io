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

// Example JS to open the overlay and hide topnav
function openNav() {
  document.getElementById("myNav").style.width = "100vw";
  document.body.classList.add("overlay-open");
}
function closeNav() {
  document.getElementById("myNav").style.width = "0";
  document.body.classList.remove("overlay-open");
}

//const thisPageDiv = document.querySelector(".thispage");
//if (thisPageDiv) {
//  // Find the .dropdown-container that contains this .thispage div
//  const dropdownContainer = thisPageDiv.closest(
//    ".dropdown-container"
//  );
//  if (dropdownContainer) {
//    // Find the corresponding dropdown button (it is the previousElementSibling)
//    const dropdownBtn =
//      dropdownContainer.previousElementSibling;
//    if (
//      dropdownBtn &&
//      dropdownBtn.classList.contains("dropdown-btn")
//    ) {
//      // Open this dropdown
//      dropdownBtn.classList.add("active");
//      dropdownBtn.setAttribute("aria-expanded", "true");
//      dropdownContainer.classList.add("show");
//    }
//  }
//}

//document.addEventListener("DOMContentLoaded", function () {
//  // Get the current page filename
//  var path = window.location.pathname.split("/").pop();
//  // For sidebar: find all links inside #sideNav
//  document
//    .querySelectorAll("#sideNav .dropdown-container a")
//    .forEach(function (link) {
//      if (link.getAttribute("href") === path) {
//        // For <a> directly in .dropdown-container
//        // If parent is a div.thispage or li.thispage, add class there
//        if (
//          link.parentElement.classList.contains(
//            "dropdown-container"
//          )
//        ) {
//          // Option 1: wrap in a div.thispage (optional, if you use <a> directly)
//          link.classList.add("thispage");
//        } else {
//          // Option 2: parent is already special (<div> or <li>)
//          link.parentElement.classList.add("thispage");
//        }
//        // Ensure dropdown is open:
//        const dropdownContainer = link.closest(
//          ".dropdown-container"
//        );
//        if (dropdownContainer) {
//          const dropdownBtn =
//            dropdownContainer.previousElementSibling;
//          if (
//            dropdownBtn &&
//            dropdownBtn.classList.contains("dropdown-btn")
//          ) {
//            dropdownBtn.classList.add("active");
//            dropdownBtn.setAttribute(
//              "aria-expanded",
//              "true"
//            );
//            dropdownContainer.classList.add("show");
//          }
//        }
//      }
//    });
//});

document.addEventListener("DOMContentLoaded", function () {
  // Get the current page filename (no query string)
  var path = window.location.pathname.split("/").pop();

  // Helper: highlight and open dropdown for a given root selector (overlay or sidebar)
  function highlightNav(rootSelector) {
    document
      .querySelectorAll(
        rootSelector + " .dropdown-container a"
      )
      .forEach(function (link) {
        // Compare only href without query/hash
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

  // Highlight in both sidebar and overlay
  highlightNav("#sideNav");
  highlightNav(".overlay-content");
});

document.addEventListener("DOMContentLoaded", function () {
  var path = window.location.pathname.split("/").pop();
  document
    .querySelectorAll(".overlay-content a")
    .forEach(function (link) {
      if (link.getAttribute("href") === path) {
        // For <li><a>...</a></li>
        if (
          link.parentElement.tagName.toLowerCase() === "li"
        ) {
          link.parentElement.classList.add("thispage");
        } else {
          // For <a> directly in <ul>
          link.classList.add("thispage");
        }
      }
    });
});

//// Optional: attach events if not inline in HTML
//document.addEventListener("DOMContentLoaded", function () {
//  var openBtn = document.getElementById("hamburger");
//  var closeBtn = document.getElementById("closeNav");
//  if (openBtn) openBtn.onclick = openNav;
//  if (closeBtn) closeBtn.onclick = closeNav;
//});
