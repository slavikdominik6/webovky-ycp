/* Youth Center Prague — main.js v2 */
document.addEventListener('DOMContentLoaded', function () {

  var page = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(function (link) {
    var href = (link.getAttribute('href') || '').toLowerCase();
    if (href === page || (page === '' && href === 'index.html')) link.classList.add('active');
  });

  var ham = document.querySelector('.hamburger');
  var mob = document.querySelector('.mobile-nav');
  if (ham && mob) {
    var closeNav = function () {
      mob.classList.remove('open'); ham.classList.remove('open');
      ham.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    ham.addEventListener('click', function () {
      var open = mob.classList.toggle('open');
      ham.classList.toggle('open', open);
      ham.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mob.querySelectorAll('a').forEach(function (l) { l.addEventListener('click', closeNav); });
    document.addEventListener('click', function (e) {
      if (mob.classList.contains('open') && !mob.contains(e.target) && !ham.contains(e.target)) closeNav();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mob.classList.contains('open')) closeNav();
    });
  }

  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 12); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var animate = function (el) {
      var target = parseFloat(el.dataset.count);
      var start = performance.now(), isInt = Number.isInteger(target);
      var tick = function (now) {
        var t = Math.min(1, (now - start) / 1400);
        var eased = 1 - Math.pow(1 - t, 3);
        var val = target * eased;
        el.textContent = isInt ? Math.round(val).toString() : val.toFixed(1);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = isInt ? target.toString() : target.toFixed(1);
      };
      requestAnimationFrame(tick);
    };
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animate(entry.target); cio.unobserve(entry.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var hh = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 72;
        var top = target.getBoundingClientRect().top + window.pageYOffset - hh - 12;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  var blobs = document.querySelectorAll('.hero-blob');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (blobs.length && !reduce) {
    var raf;
    window.addEventListener('mousemove', function (e) {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        var x = (e.clientX / window.innerWidth - 0.5) * 30;
        var y = (e.clientY / window.innerHeight - 0.5) * 30;
        blobs.forEach(function (b, i) {
          var f = (i + 1) * 0.6;
          b.style.transform = 'translate(' + (x * f) + 'px,' + (y * f) + 'px)';
        });
      });
    });
  }

  var stack = document.querySelector('.hero-card-stack');
  if (stack && !reduce) {
    stack.addEventListener('mousemove', function (e) {
      var r = stack.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      stack.style.transform = 'rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 6) + 'deg)';
    });
    stack.addEventListener('mouseleave', function () { stack.style.transform = ''; });
  }
});
