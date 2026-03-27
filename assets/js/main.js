document.addEventListener("DOMContentLoaded", () => {
  const appShell = document.querySelector(".portfolio-shell");
  const siteHeader = document.getElementById("site-header");
  const themeToggle = document.getElementById("theme-toggle");
  const langToggle = document.getElementById("lang-toggle");
  const yearNode = document.getElementById("current-year");
  const linkIcons = document.querySelectorAll("[data-icon]");
  const linkIconSources = {
    github: {
      light: "assets/images/link-icons/github-black-icon.png",
      dark: "assets/images/link-icons/github-white-icon.png"
    },
    linkedin: {
      light: "assets/images/link-icons/linkedin-app-black-icon.png",
      dark: "assets/images/link-icons/linkedin-app-white-icon.png"
    },
    trailhead: {
      light: "assets/images/link-icons/trailhead-black-icon.svg",
      dark: "assets/images/link-icons/trailhead-white-icon.png"
    }
  };
  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const savedTheme = localStorage.getItem("theme") || preferredTheme;
  const savedLang = localStorage.getItem("lang") || "en";

  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  function updateHeaderOffset() {
    if (!appShell || !siteHeader) {
      return;
    }

    appShell.style.setProperty("--header-offset", `${siteHeader.offsetHeight + 16}px`);
  }

  function updateScrollHeader() {
    if (!appShell || !siteHeader) {
      return;
    }

    const shouldFix = window.scrollY > 32;
    appShell.classList.toggle("has-fixed-header", shouldFix);
    siteHeader.classList.toggle("is-fixed", shouldFix);

    if (shouldFix) {
      updateHeaderOffset();
    }
  }

  function updateLinkIcons(theme) {
    linkIcons.forEach((iconNode) => {
      const iconName = iconNode.getAttribute("data-icon");
      const iconSources = iconName ? linkIconSources[iconName] : null;
      if (!iconSources) {
        return;
      }

      iconNode.setAttribute("src", iconSources[theme]);
    });
  }

  function applyTheme(theme) {
    const nextTheme = theme === "dark" ? "dark" : "light";
    appShell?.setAttribute("data-theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);

    if (themeToggle) {
      themeToggle.checked = nextTheme === "dark";
      themeToggle.setAttribute("aria-label", translations[currentLang].themeToggleLabel[nextTheme]);
    }

    updateLinkIcons(nextTheme);
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
      langToggle.checked = nextLang === "pt";
      langToggle.setAttribute("aria-label", nextLang === "pt" ? "Idioma" : "Language");
    }

    currentLang = nextLang;
    applyTheme(appShell?.getAttribute("data-theme") || savedTheme);
    localStorage.setItem("lang", nextLang);
  }

  let currentLang = savedLang;

  themeToggle?.addEventListener("change", (event) => {
    applyTheme(event.currentTarget.checked ? "dark" : "light");
  });

  langToggle?.addEventListener("change", (event) => {
    applyLanguage(event.currentTarget.checked ? "pt" : "en");
  });

  window.addEventListener("scroll", updateScrollHeader, { passive: true });
  window.addEventListener("resize", updateHeaderOffset);

  updateHeaderOffset();
  updateScrollHeader();
  applyTheme(savedTheme);
  applyLanguage(savedLang);
});
