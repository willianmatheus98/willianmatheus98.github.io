document.addEventListener("DOMContentLoaded", () => {
  const appShell = document.querySelector(".portfolio-shell");
  const themeToggle = document.getElementById("theme-toggle");
  const langToggle = document.getElementById("lang-toggle");
  const yearNode = document.getElementById("current-year");
  const themeIcon = themeToggle?.querySelector(".theme-toggle__icon");
  const themeText = themeToggle?.querySelector(".theme-toggle__text");
  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const savedTheme = localStorage.getItem("theme") || preferredTheme;
  const savedLang = localStorage.getItem("lang") || "en";

  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  function applyTheme(theme) {
    const nextTheme = theme === "dark" ? "dark" : "light";
    appShell?.setAttribute("data-theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);

    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(nextTheme === "dark"));
      themeToggle.setAttribute("aria-label", translations[currentLang].themeToggleLabel[nextTheme]);
    }

    if (themeText) {
      themeText.textContent = translations[currentLang].themeToggle[nextTheme === "dark" ? "light" : "dark"];
    }

    if (themeIcon) {
      themeIcon.textContent = nextTheme === "dark" ? "☾" : "☀";
    }

    localStorage.setItem("theme", nextTheme);
  }

  function applyLanguage(lang) {
    const nextLang = translations[lang] ? lang : "en";

    document.documentElement.lang = nextLang;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const value = translations[nextLang][key];
      if (typeof value === "string") {
        element.textContent = value;
      }
    });

    if (langToggle) {
      langToggle.textContent = nextLang === "en" ? "PT" : "EN";
    }

    currentLang = nextLang;
    applyTheme(appShell?.getAttribute("data-theme") || savedTheme);
    localStorage.setItem("lang", nextLang);
  }

  let currentLang = savedLang;

  themeToggle?.addEventListener("click", () => {
    const currentTheme = appShell?.getAttribute("data-theme") || "light";
    applyTheme(currentTheme === "light" ? "dark" : "light");
  });

  langToggle?.addEventListener("click", () => {
    applyLanguage(currentLang === "en" ? "pt" : "en");
  });

  applyTheme(savedTheme);
  applyLanguage(savedLang);
});
