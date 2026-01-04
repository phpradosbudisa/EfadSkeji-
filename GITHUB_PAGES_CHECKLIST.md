# GitHub Pages Deployment Checklist

## Pred Razporeditvijo

- [x] Vse datoteke so v root mapi
- [x] `.nojekyll` datoteka je ustvarjena
- [x] `.gitignore` datoteka je ustvarjena
- [x] Vse poti do datotek so relativne (styles.css, script.js)
- [x] README.md vsebuje navodila
- [x] DEPLOYMENT.md vsebuje podrobna navodila

## Po Razporeditvi

- [ ] Posodobite URL-je v `sitemap.xml` z vašim GitHub Pages URL-jem
- [ ] Posodobite URL-je v `robots.txt` z vašim GitHub Pages URL-jem
- [ ] Posodobite meta tagi v `index.html`:
  - `og:url` → vaš GitHub Pages URL
  - `twitter:url` → vaš GitHub Pages URL
  - JSON-LD `url` → vaš GitHub Pages URL
- [ ] Preverite, da se stran naloži pravilno
- [ ] Testirajte kontaktni obrazec
- [ ] Preverite Google Analytics (če je nastavljen)
- [ ] Preverite, da so vse slike vidne
- [ ] Testirajte na mobilnih napravah
- [ ] Pošljite sitemap v Google Search Console

## Struktura Datotek

```
EfadSkejić/
├── .nojekyll              # Onemogoči Jekyll
├── .gitignore            # Git ignore datoteke
├── index.html            # Glavna HTML datoteka
├── styles.css            # CSS stilizacija
├── script.js             # JavaScript funkcionalnost
├── sitemap.xml           # SEO sitemap
├── robots.txt            # SEO robots
├── README.md             # Glavna dokumentacija
├── DEPLOYMENT.md         # Navodila za razporeditev
└── GITHUB_PAGES_CHECKLIST.md  # Ta datoteka
```

## Hitri Ukazi

```bash
# Inicializacija Git (če še ni)
git init
git add .
git commit -m "Initial commit"

# Povezava z GitHub
git remote add origin https://github.com/VAS-USERNAME/efadskejic.git
git branch -M main
git push -u origin main

# Posodobitve
git add .
git commit -m "Opis sprememb"
git push
```

## Povezave

- Vaš GitHub Pages URL: `https://VAS-USERNAME.github.io/efadskejic/`
- GitHub Repozitorij: `https://github.com/VAS-USERNAME/efadskejic`
- GitHub Pages Settings: `https://github.com/VAS-USERNAME/efadskejic/settings/pages`

---

**Opomba**: Zamenjajte `VAS-USERNAME` z vašim dejanskim GitHub uporabniškim imenom!

