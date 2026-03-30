// Particles configurations
const particlesLightConfig = {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#8bc8ff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#5eb3ff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
};

const particlesDarkConfig = {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#8bc8ff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#5eb3ff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}

document.addEventListener("DOMContentLoaded", () => {
  const appShell = document.querySelector(".portfolio-shell");
  const particlesContainer = document.getElementById("particles-js");
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
    particlesContainer?.setAttribute("data-theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);

    if (themeToggle) {
      themeToggle.checked = nextTheme === "dark";
      themeToggle.setAttribute("aria-label", translations[currentLang].themeToggleLabel[nextTheme]);
    }

    updateLinkIcons(nextTheme);
    localStorage.setItem("theme", nextTheme);

    // Reload particles with new theme config
    initParticles(nextTheme);
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

  // Particles are initialized by applyTheme, no need for separate call
});

// Particles.js configuration
let particlesLoaded = false;

function loadParticlesConfig(theme) {
  return theme === 'dark' ? particlesDarkConfig : particlesLightConfig;
}

function initParticles(theme = 'light') {
  // Try different ways to access particles.js
  const pJS = window.particlesJS || window.pJSDom || window.tsParticles;

  if (pJS) {
    console.log('Loading/reloading particles.js config for theme:', theme);

    const config = loadParticlesConfig(theme);
    if (config) {
      const particlesContainer = document.getElementById('particles-js');

      if (particlesContainer) {
        // Clear existing particles by removing all child elements
        while (particlesContainer.firstChild) {
          particlesContainer.removeChild(particlesContainer.firstChild);
        }

        // Force remove any existing canvas or particles elements
        const existingCanvas = particlesContainer.querySelector('canvas');
        if (existingCanvas) {
          existingCanvas.remove();
        }

        // Clear any particles.js internal references
        if (window.pJSDom && window.pJSDom.length > 0) {
          window.pJSDom = [];
        }

        // Small delay to ensure cleanup is complete
        setTimeout(() => {
          try {
            pJS("particles-js", config);
            document.body.classList.add('has-particles');
            particlesLoaded = true;
            console.log('Particles.js initialized/reloaded successfully for theme:', theme);
          } catch (error) {
            console.warn('Error initializing particles:', error);
            // Try again with a longer delay
            setTimeout(() => {
              try {
                pJS("particles-js", config);
                document.body.classList.add('has-particles');
                particlesLoaded = true;
                console.log('Particles.js initialized on retry for theme:', theme);
              } catch (retryError) {
                console.warn('Error on retry:', retryError);
              }
            }, 200);
          }
        }, 100);
      } else {
        // First time initialization
        pJS("particles-js", config);
        document.body.classList.add('has-particles');
        particlesLoaded = true;
        console.log('Particles.js initialized successfully for theme:', theme);
      }
    } else {
      console.warn('Particles.js config not loaded for theme:', theme);
    }
  } else {
    console.warn('Particles.js library not found, available globals:', Object.keys(window).filter(key => key.toLowerCase().includes('particle')));
    setTimeout(() => initParticles(theme), 1000);
  }
}

// Particles are initialized through applyTheme, no duplicate initialization needed
