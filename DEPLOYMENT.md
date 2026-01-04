# Navodila za Razporeditev na GitHub Pages

## Hitri Začetek

### 1. Priprava Git Repozitorija

Če še nimate Git repozitorija, ga ustvarite:

```bash
# V mapi projekta
git init
git add .
git commit -m "Initial commit - Efad Skejić website"
```

### 2. Ustvarite GitHub Repozitorij

1. Pojdite na [GitHub](https://github.com/new)
2. Ime repozitorija: `efadskejic` ali `efad-skejic-website`
3. **POMEMBNO**: Repozitorij mora biti **Public** (javen) za brezplačno GitHub Pages
4. **NE** označite "Add a README file" (že imamo README.md)
5. Kliknite "Create repository"

### 3. Naložite Kodo na GitHub

```bash
# Povežite lokalni repozitorij z GitHub
git remote add origin https://github.com/VAS-USERNAME/efadskejic.git
git branch -M main
git push -u origin main
```

**Zamenjajte `VAS-USERNAME` z vašim GitHub uporabniškim imenom!**

### 4. Omogočite GitHub Pages

1. Pojdite na vaš repozitorij na GitHub
2. Kliknite na **Settings** (Nastavitve) v zgornjem meniju
3. V levem meniju poiščite **Pages**
4. Pod **Source**:
   - **Branch**: Izberite `main` (ali `master`)
   - **Folder**: Izberite `/ (root)`
5. Kliknite **Save**

### 5. Počakajte na Aktivacijo

- GitHub Pages se aktivira v 1-2 minutah
- Vaša stran bo na voljo na: `https://VAS-USERNAME.github.io/efadskejic/`

### 6. Posodobite URL-je

Po aktivaciji posodobite URL-je v naslednjih datotekah:

#### sitemap.xml
Zamenjajte vse pojavitve:
```xml
https://www.efadskejic.si/
```
z:
```xml
https://VAS-USERNAME.github.io/efadskejic/
```

#### robots.txt
Zamenjajte:
```
Sitemap: https://www.efadskejic.si/sitemap.xml
```
z:
```
Sitemap: https://VAS-USERNAME.github.io/efadskejic/sitemap.xml
```

#### index.html
Posodobite meta tagi (Open Graph in Twitter Cards):
```html
<meta property="og:url" content="https://VAS-USERNAME.github.io/efadskejic/">
<meta property="twitter:url" content="https://VAS-USERNAME.github.io/efadskejic/">
```

In strukturni podatki (JSON-LD):
```json
"url": "https://VAS-USERNAME.github.io/efadskejic"
```

### 7. Posodobite in Ponovno Naložite

```bash
git add .
git commit -m "Update URLs for GitHub Pages"
git push
```

## Uporaba Lastne Domene (Opcijsko)

Če imate lastno domeno (npr. `efadskejic.si`):

1. V GitHub repozitoriju → Settings → Pages
2. V "Custom domain" vnesite vašo domeno
3. Dodajte CNAME datoteko v root repozitorija:
   ```
   efadskejic.si
   ```
4. Posodobite DNS zapise pri vašem ponudniku domene:
   - Tip: `CNAME`
   - Ime: `@` ali `www`
   - Vrednost: `VAS-USERNAME.github.io`

## Posodobitve

Ko naredite spremembe:

```bash
git add .
git commit -m "Opis sprememb"
git push
```

Spremembe bodo vidne na GitHub Pages v 1-2 minutah.

## Preverjanje

Po razporeditvi preverite:

- [ ] Stran se naloži pravilno
- [ ] Vse slike so vidne
- [ ] Kontaktni obrazec deluje
- [ ] Google Analytics deluje
- [ ] Vse povezave delujejo
- [ ] Stran je odzivna na mobilnih napravah

## Podpora

Za pomoč pri GitHub Pages:
- [GitHub Pages Dokumentacija](https://docs.github.com/en/pages)
- [GitHub Community Forum](https://github.community/)

---

**Opomba**: `.nojekyll` datoteka je že vključena, kar pomeni, da GitHub Pages ne bo uporabljal Jekyll za obdelavo strani. To je pravilno za statične HTML strani.

