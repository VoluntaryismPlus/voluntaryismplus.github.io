document.addEventListener("DOMContentLoaded", () => {
    const footerContainer = document.getElementById("footer-include");
    
    if (footerContainer) {
        fetch("footer.html")
            .then(response => {
                if (!response.ok) throw new Error("Footer file not found");
                return response.text();
            })
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(error => console.error("Error loading footer:", error));
    }
});