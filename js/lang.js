// Youth Center Prague — Language switcher
// Default language: Czech (CS). English (EN) loaded from data-en attributes.
// Persists choice to localStorage.

(function () {

  function applyLang(lang) {
    // Swap text for all elements with [data-en]
    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (lang === 'en') {
        // Save original CS content on first switch
        if (el.dataset.cs === undefined) {
          el.dataset.cs = el.innerHTML;
        }
        el.innerHTML = el.dataset.en;
      } else {
        // Restore CS content
        if (el.dataset.cs !== undefined) {
          el.innerHTML = el.dataset.cs;
        }
      }
    });

    // Update <html lang="...">
    document.documentElement.lang = lang;

    // Update toggle button states
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Persist
    try { localStorage.setItem('ycp-lang', lang); } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Pre-save all original CS content before any switching
    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (el.dataset.cs === undefined) {
        el.dataset.cs = el.innerHTML;
      }
    });

    // Wire up toggle buttons
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLang(this.dataset.lang);
      });
    });

    // Apply saved language (default: cs)
    var saved;
    try { saved = localStorage.getItem('ycp-lang'); } catch (e) {}
    applyLang(saved === 'en' ? 'en' : 'cs');
  });

})();
