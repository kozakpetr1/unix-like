/* Unix-like operační systémy — společný skript pro přehled i kapitoly.
   - KAPITOLY: pořadí kapitol; podle něj se plní navigační lišta, stránkování a klávesové zkratky.
   - Stránka určuje svou kapitolu atributem <body data-chapter="N"> (0 = přehled).
   Nová kapitola: přidat soubor do kapitoly/, záznam sem a dlaždici do index.html. */
var KAPITOLY = [
  { soubor: "01-unix-like-os.html", nazev: "Unix-like operační systémy" },
  { soubor: "02-distribuce-a-gui.html", nazev: "Distribuce, jejich užití a GUI" },
  { soubor: "03-instalace-a-konfigurace.html", nazev: "Instalace a konfigurace" },
  { soubor: "04-bash-a-souborovy-system.html", nazev: "bash a souborový systém" },
  { soubor: "05-editory-nano-a-vim.html", nazev: "Editory nano a vim" },
  { soubor: "06-presmerovani-a-roury.html", nazev: "Přesměrování a roury" },
  { soubor: "07-regularni-vyrazy.html", nazev: "Regulární výrazy" },
  { soubor: "08-procesy-a-sluzby.html", nazev: "Procesy a služby" },
  { soubor: "09-prikazy-spravce.html", nazev: "Příkazy správce" },
  { soubor: "10-uzivatele-a-skupiny.html", nazev: "Správa uživatelů a skupin" },
  { soubor: "11-opravneni.html", nazev: "Přidělování a odebírání oprávnění" },
  { soubor: "12-balicky.html", nazev: "Instalace a aktualizace balíčků" },
  { soubor: "13-skriptovani.html", nazev: "Skriptování v bashi" },
  { soubor: "14-cron.html", nazev: "Plánování úloh: cron" }
];

(function () {
  var cislo = parseInt(document.body.dataset.chapter || "0", 10); // 0 = přehled
  var naPrehledu = cislo === 0;
  var koren = naPrehledu ? "" : "../";
  var prehled = koren + "index.html";
  function odkaz(i) { return (naPrehledu ? "kapitoly/" : "") + KAPITOLY[i - 1].soubor; } // i = 1..n

  // --- zvýraznění řádků v ukázkách kódu ($ výzva, # komentáře, root výzva)
  document.querySelectorAll("pre").forEach(function (pre) {
    pre.innerHTML = pre.innerHTML.split("\n").map(function (l) {
      if (/^\s*#(?!\s*(apt|usermod|exit)\b)/.test(l) && l.indexOf("class=") === -1) return '<span class="cm">' + l + "</span>";
      if (/^\$ /.test(l)) return '<span class="pr">$</span>' + l.slice(1);
      if (/^# (apt|usermod|exit)\b/.test(l)) return '<span class="pr">#</span>' + l.slice(1);
      return l;
    }).join("\n");
  });

  // --- staré odkazy index.html#k5 → kapitoly/05-….html
  function staryOdkaz() {
    var m = /^#k(\d+)$/.exec(location.hash);
    if (m && KAPITOLY[m[1] - 1]) { location.replace(odkaz(+m[1])); return true; }
    return false;
  }
  if (naPrehledu) {
    if (staryOdkaz()) return;
    window.addEventListener("hashchange", staryOdkaz);
    var pocet = document.getElementById("pocetKapitol");
    if (pocet) pocet.textContent = KAPITOLY.length;
  }

  // --- navigační lišta a stránkování
  var predchozi = naPrehledu ? null : (cislo > 1 ? odkaz(cislo - 1) : prehled);
  var dalsi = cislo < KAPITOLY.length ? odkaz(cislo + 1) : prehled;
  var barPrev = document.getElementById("barPrev");
  var barNext = document.getElementById("barNext");
  if (predchozi) barPrev.href = predchozi; else barPrev.setAttribute("aria-disabled", "true");
  barNext.href = dalsi;

  if (!naPrehledu) {
    document.getElementById("barTitle").textContent =
      cislo + " / " + KAPITOLY.length + " · " + KAPITOLY[cislo - 1].nazev;
    var pager = document.getElementById("pager");
    if (pager) {
      pager.innerHTML =
        (cislo > 1
          ? '<a class="btn" href="' + predchozi + '"><span>← <small>Kapitola ' + (cislo - 1) + "</small>" + KAPITOLY[cislo - 2].nazev + "</span></a>"
          : '<a class="btn" href="' + prehled + '"><span>← <small>Zpět</small>Přehled kapitol</span></a>') +
        (cislo < KAPITOLY.length
          ? '<a class="btn next" href="' + dalsi + '"><span><small>Kapitola ' + (cislo + 1) + "</small>" + KAPITOLY[cislo].nazev + " →</span></a>"
          : '<a class="btn next" href="' + prehled + '"><span><small>Konec</small>Přehled kapitol →</span></a>');
    }
  }

  // --- klávesy: ← → mezi kapitolami, Esc na přehled
  document.addEventListener("keydown", function (e) {
    if (e.target.closest("input,textarea,select") || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === "ArrowRight") location.href = dalsi;
    else if (e.key === "ArrowLeft" && predchozi) location.href = predchozi;
    else if (e.key === "Escape" && !naPrehledu) location.href = prehled;
  });
})();
