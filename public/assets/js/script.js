// public/assets/js/navbar.js
window.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch("/api/users/current");
        const user = await res.json();

        const loginLink = document.getElementById("loginLink");
        const signupLink = document.getElementById("signupLink");
        const logoutLink = document.getElementById("logoutLink");
        const adminLink = document.getElementById("adminLink");

        if (user && user.Role) {
            if (loginLink) loginLink.style.display = "none";
            if (signupLink) signupLink.style.display = "none";
            if (logoutLink) logoutLink.style.display = "block";
            if (adminLink) adminLink.style.display = (user.Role === 'admin') ? "block" : "none";
        }
    } catch (error) {
        document.getElementById("logoutLink")?.style?.setProperty("display", "none");
        document.getElementById("adminLink")?.style?.setProperty("display", "none");
        document.getElementById("loginLink")?.style?.setProperty("display", "flex");
        document.getElementById("signupLink")?.style?.setProperty("display", "block");
    }
});
