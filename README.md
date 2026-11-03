# unix-like

Výuková prezentace **Unix-like operační systémy** (předmět OSY). Otevírá se souborem `index.html` přímo v prohlížeči, nepotřebuje server ani sestavení.

## Struktura

```
index.html            přehled kapitol (dashboard)
css/style.css         společné styly pro přehled i kapitoly
js/app.js             seznam kapitol, navigační lišta, stránkování, klávesy, zvýraznění kódu
kapitoly/
  01-unix-like-os.html
  …
  14-cron.html
test/                 testy k jednotlivým kapitolám (PDF)
```

## Ovládání

- `←` `→` předchozí / další kapitola
- `Esc` návrat na přehled
- Staré odkazy ve tvaru `index.html#k7` se automaticky přesměrují na příslušnou kapitolu.

## Přidání nové kapitoly

1. Zkopírujte libovolný soubor z `kapitoly/` a pojmenujte ho `NN-nazev.html`.
2. Upravte `<title>`, atribut `<body data-chapter="NN">`, text v liště `#barTitle` a obsah v `<main>`.
3. Do pole `KAPITOLY` v `js/app.js` přidejte `{ soubor: "NN-nazev.html", nazev: "Název" }`.
4. Do `index.html` přidejte dlaždici do příslušného bloku (`.part`).

Pořadí kapitol, šipky v liště, stránkování dole i počet kapitol na přehledu se řídí polem `KAPITOLY`.

## Ukázky kódu

V `<pre>` se automaticky zvýrazní řádky začínající `$ ` (výzva), `# ` (komentář) a `# apt|usermod|exit` (výzva roota).
Výstup příkazu se píše do `<span class="out">…</span>`. Pro skripty a terminál jsou varianty `<pre class="script" data-file="nazev.sh">` a `<pre class="run">`.
