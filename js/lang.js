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

    // Inject missing translations for known pages (minimal and page-scoped)
    // This keeps HTML untouched and adds data-en attributes at runtime when possible.
    try {
      var page = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
      var translationsByPage = {
        'projekty.html': {
          'Domů': 'Home',
          'Volné projekty': 'Open projects',
          'Erasmus+ příležitosti': 'Erasmus+ opportunities',
          'Volné projekty.': 'Open projects.',
          'O projektu': 'About the project',
          'Co tě čeká': 'What to expect',
          'Financování': 'Funding',
          'Pro koho je projekt': 'Who is this for',
          'Celý brief projektu': 'Full project brief',
          'Jak proces funguje?': 'How the process works?',
          'Přihlas se na projekt': 'Apply for the project',
          "Přes náš krátký výběrový formulář. Ozveme se do 5 pracovních dnů.": "Through our short application form. We'll get back to you within 5 working days.",
          'Program': 'Programme',
          'Věk': 'Age',
          'Jazyk': 'Language',
          'Destinace': 'Destination',
          'Typ': 'Type',
          'Tvoje cena': 'Your cost',
          'Vyplnit přihlášku': 'Fill in the application form',
          'Máš otázky? Napiš nám na youthcenterprague@gmail.com': "Have questions? Email us at youthcenterprague@gmail.com",
          'Brzy přibydou další projekty': 'More projects coming soon',
          'Sledovat na IG': 'Follow on IG',
          'Navrhnout téma / zemi': 'Suggest a topic / country',
          'Výměna mládeže': 'Youth exchange',
          'Polsko': 'Poland',
          '18–30 let': '18–30 years',
          'Erasmus+ financováno': 'Funded by Erasmus+'
        },
        'index.html': {
          'Proč se přihlásit': 'Why join',
          'Jak se přihlásit': 'How to apply',
          'Volné projekty': 'Open projects',
          'Uplynulé projekty': 'Past projects',
          'Partnerství': 'Partners',
          'O nás': 'About us',
          'Přihlásit se →': 'Apply now →',
          'Cestuj.': 'Travel.',
          'Uč se.': 'Learn.',
          'Propoj se': 'Connect',
          '— v Evropě.': '— in Europe.',
          'Pomáháme mladým Čechům (18–30) dostat se na mezinárodní výměny mládeže a vzdělávací kurzy přes Erasmus+. Cestu i ubytování platí EU — tvůj jediný úkol je růst.': 'We help young people (18–30) from Czechia access youth exchanges and training courses across Europe through Erasmus+. Travel and accommodation are covered by the EU — your task is to grow.',
          'Volné projekty': 'See open projects',
          'Jak to funguje?': 'How it works?',
          '100% financováno EU': '100% funded by the EU',
          'Projekty po celé Evropě': 'Projects across Europe',
          'Věk 18–30': 'Age 18–30',
          'Youth Exchange': 'Youth Exchange',
          'Training Course': 'Training Course',
          'Připravujeme další projekt': 'More projects coming soon',
          'Sleduj IG, ať ti nic neunikne': 'Follow us on IG so you don\'t miss out',
          'poplatek<br>za účast*': 'participation fee*',
          'Scrollovat dolů': 'Scroll down',
          'Evropských zemí, kam můžeš s Erasmus+ vycestovat': 'European countries you can travel to with Erasmus+',
          'Cesta, ubytování a strava pokryté z EU dotace': 'Travel, accommodation and meals covered by EU grants',
          'Dní obvykle trvá výměna mládeže': 'Typical duration of a youth exchange',
          'Věkové rozmezí — výměny a kurzy': 'Age range — exchanges and courses',
          'Proč se přihlásit': 'Why join',
          'Erasmus+ není výlet.\nJe to zlomový moment.': "Erasmus+ is not a trip. It's a life-changing moment.",
          'Workshopy, reálné výzvy, kamarádi z celé Evropy a týden, který spousta lidí popisuje jako moment, kdy si ujasnili, kdo chtějí být.': 'Workshops, real challenges, friends from across Europe and a week many describe as the moment they figured out who they want to be.',
          'Objevuj': 'Discover',
          'Cestuj po Evropě': 'Travel across Europe',
          'Navštiv místa, která bys nikdy nedal na bucket list. Vzbuď se u polských jezer, ve španělských kopcích nebo italském slunci — a vracej se s příběhy, které stojí za vyprávění.': "Visit places you wouldn't have put on your bucket list. Wake up by Polish lakes, in Spanish hills or Italian sun — and return with stories worth telling.",
          'Spojuj': 'Connect',
          'Kamarádi z 5–10 zemí': 'Friends from 5–10 countries',
          'Každý projekt spojuje mladé lidi z 5–10 různých zemí. Kamarádství, která tu vznikají, vydrží roky — a otevírají dveře, které sis nedokázal naplánovat.': 'Each project brings together young people from 5–10 countries. Friendships formed here last for years and open doors you couldn\'t plan.',
          'Růst': 'Grow',
          'Skilly, které ve škole nezískáš': "Skills you won't get at school",
          'Komunikace, leadership, kreativita, práce v multikulturním týmu. Nečteš to v učebnici — žiješ to. A recruiteři ten rozdíl vidí v životopise i u pohovoru.': "Communication, leadership, creativity, working in multicultural teams. You don't read it in a textbook — you live it. Recruiters notice the difference.",
          'Zdarma': 'Free',
          'Financováno z EU': 'Funded by the EU',
          'Erasmus+ platí cestu, ubytování i stravu. Obvykle hradíš jen malý účastnický poplatek (€20–60) — někdy nic. Nepotřebuješ být <em>ze zámožné rodiny</em>, abys vyrazil ven.': "Erasmus+ covers travel, accommodation and meals. You usually only pay a small participation fee (€20–60) — sometimes nothing. You don't need to come from a wealthy family to go.",
          'Jak to funguje': 'How it works',
          'Od přihlášky po Evropu — \nve 4 krocích.': 'From application to Europe — in 4 steps.',
          'Vyber si projekt': 'Choose a project',
          'Vyplň přihlášku': 'Fill in the application',
          'Dostaneš brief': 'Receive a pre-departure brief',
          'Sbal se a vyraž': 'Pack and go',
          'Projdi si volné výměny a kurzy. Filtruj podle země, tématu nebo termínu.': 'Browse open exchanges and courses. Filter by country, topic or dates.',
          'Krátký motivační formulář. Ozveme se ti do 5 pracovních dnů.': "A short motivation form. We'll get back to you within 5 working days.",
          'Pre-departure call: logistika, jízdenky, co si zabalit, co očekávat.': 'Pre-departure call: logistics, tickets, packing list, what to expect.',
          'Detailní průvodce krok za krokem': 'Detailed step-by-step guide',
          'Aktuálně přijímáme přihlášky': 'Currently accepting applications',
          'Týdenní výměna mládeže zaměřená na digitální advokacii a práva mladých lidí online. Naučíš se, jak využívat digitální nástroje k prosazování změn, a potkáš mladé lidi z celé Evropy.': 'A week-long youth exchange focused on digital advocacy and young people\'s rights online. You\'ll learn how to use digital tools to promote change and meet young people from across Europe.',
          'Detail projektu': 'Project details',
          'Přihlásit': 'Apply',
          'Brzy přibydou další': 'More projects coming soon',
          'Projekty přibývají průběžně — sleduj nás a dáme ti vědět.': 'Projects are added regularly — follow us and we\'ll let you know.',
          'Všechny projekty →': 'All projects →',
          'Kam můžeš vyrazit': 'Where you can go',
          '33 zemí. Jeden program.': '33 countries. One programme.',
          '...a dalších 9 partnerských zemí.': '...and 9 more partner countries.',
          'Youth Center Prague jsme založili, protože spousta šikovných českých mladých lidí přichází o Evropu — <em>ne proto, že by na to neměli, ale protože je nikdo neprovedl tím prvním krokem.</em>': 'We founded Youth Center Prague because many talented Czech young people miss out on Europe — not because they can\'t, but because no one guided them through the first step.',
          'Studentské družstvo · Praha': 'Student cooperative · Prague',
          'O nás': 'About us',
          'Poznej nás →': 'Meet us →',
          'Typ organizace': 'Type of organisation',
          'Studentské družstvo': 'Student cooperative',
          'Sídlo': 'Headquarters',
          'Praha, Česká republika': 'Prague, Czechia',
          'Zaměření': 'Focus',
          'Erasmus+ výměny & kurzy': 'Erasmus+ exchanges & courses',
          'Založeno': 'Founded',
          'Časté otázky': 'Frequently asked questions',
          'Upřímné odpovědi na to, co tě nejvíc zajímá.': 'Straight answers to what you care about most.',
          'Pořád si nejsi jistý? Napiš nám — odpovídáme do pár pracovních dnů.': 'Still not sure? Email us — we reply within a few working days.',
          'Napsat nám': 'Email us',
          'Kolik to opravdu stojí?': 'How much does it really cost?',
          'Jaký je věkový limit?': 'What is the age limit?',
          'Musím umět perfektně anglicky?': 'Do I need perfect English?',
          'Co když jsem ještě nikdy sám/sama necestoval/a?': 'What if I have never travelled alone before?',
          'Jaký je rozdíl mezi výměnou a kurzem?': 'What\'s the difference between an exchange and a course?',
          'Jak dlouho předem se mám hlásit?': 'How far in advance should I apply?',
          'Připraven?': 'Ready?',
          'Evropa čeká.': 'Europe is waiting.',
          'Volné projekty': 'Open projects',
          'Sledovat na IG': 'Follow on IG',
          'Máš otázku? Napiš nám.': 'Have a question? Email us.'
        }
      };

      var map = translationsByPage[page];
      if (map) {
        Object.keys(map).forEach(function (cs) {
          // find elements where textContent trimmed equals the Czech string
          document.querySelectorAll('body *').forEach(function (el) {
            if (el.dataset && el.dataset.en) return; // already has translation
            try {
              var txt = (el.textContent || '').trim();
              if (!txt) return;
              if (txt === cs) {
                el.dataset.en = map[cs];
                if (el.dataset.cs === undefined) el.dataset.cs = el.innerHTML;
              }
            } catch (e) { /* ignore */ }
          });
        });
        // also handle title and meta tags for index.html
        if (page === 'index.html') {
          var t = map[document.title.trim()];
          if (t) document.title = t;
          var md = document.querySelector('meta[name="description"]');
          if (md && md.content && map[md.content]) md.content = map[md.content];
          var ogt = document.querySelector('meta[property="og:title"]');
          if (ogt && ogt.content && map[ogt.content]) ogt.content = map[ogt.content];
          var ogd = document.querySelector('meta[property="og:description"]');
          if (ogd && ogd.content && map[ogd.content]) ogd.content = map[ogd.content];
        }
      }
    } catch (e) { /* safe fallback */ }

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
