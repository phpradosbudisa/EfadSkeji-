# Efad Skejić - Vodovodar Website

Profesionalna spletna stran za vodovodne storitve in prenovo kopalnic v Sloveniji.

## Pregled

Ta spletna stran je optimizirana za SEO, vključuje Google Analytics sledenje, funkcionalen kontaktni obrazec preko EmailJS in je popolnoma odzivna za vse naprave.

## Funkcionalnosti

- ✅ Popolna SEO optimizacija (meta tagi, strukturni podatki, sitemap)
- ✅ Google Analytics 4 integracija z dogodkovnim sledenjem
- ✅ Funkcionalen kontaktni obrazec z EmailJS
- ✅ Odzivna zasnova za vse naprave
- ✅ Dostopnost (WCAG 2.1 AA)
- ✅ Portfolio galerija z lightbox funkcionalnostjo
- ✅ FAQ sekcija z accordion funkcionalnostjo
- ✅ Moderna in profesionalna zasnova

## Nastavitve

### 1. Google Analytics

1. Ustvarite Google Analytics 4 račun na [Google Analytics](https://analytics.google.com/)
2. Ustvarite novo lastnost (property) za vašo spletno stran
3. Kopirajte vaš Measurement ID (oblike `G-XXXXXXXXXX`)
4. Odprite `index.html` in poiščite:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   ```
5. Zamenjajte `G-XXXXXXXXXX` z vašim dejanskim Measurement ID
6. Zamenjajte tudi v `gtag('config', 'G-XXXXXXXXXX');`

### 2. EmailJS Nastavitve

1. Ustvarite brezplačen račun na [EmailJS](https://www.emailjs.com/)
2. Ustvarite email storitev (Email Service):
   - Pojdite na "Email Services" → "Add New Service"
   - Izberite vašega email ponudnika (Gmail, Outlook, itd.)
   - Sledite navodilom za povezavo
3. Ustvarite email predlogo (Template):
   - Pojdite na "Email Templates" → "Create New Template"
   - Uporabite spodnjo predlogo:
   ```
   Od: {{from_name}}
   Email: {{from_email}}
   Telefon: {{phone}}
   Storitev: {{service}}
   
   Sporočilo:
   {{message}}
   ```
4. Kopirajte naslednje ID-je:
   - **Service ID** (iz Email Services)
   - **Template ID** (iz Email Templates)
   - **Public Key** (iz Account → General)
5. Odprite `script.js` in poiščite:
   ```javascript
   emailjs.init('YOUR_PUBLIC_KEY');
   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {...});
   ```
6. Zamenjajte vse tri vrednosti z vašimi dejanskimi ID-ji

### 3. Kontaktne Informacije

Posodobite kontaktne informacije v `index.html`:

1. **Telefonska številka**: Poiščite vse pojavitve `+386-XX-XXX-XXX` in zamenjajte z vašo številko
2. **Email naslov**: Zamenjajte `info@efadskejic.si` z vašim email naslovom
3. **Lokacija**: Posodobite lokacijo v strukturnih podatkih (JSON-LD) in kontaktni sekciji
4. **Socialne povezave**: Posodobite Facebook in Instagram povezave v footerju

### 4. Strukturni Podatki (JSON-LD)

V `index.html` posodobite strukturni podatek za LocalBusiness:

- `telephone`: Vaša telefonska številka
- `address`: Vaš naslov (če ga želite objaviti)
- `geo`: Vaše koordinate (latitude, longitude)
- `openingHoursSpecification`: Vaši delovni časi
- `sameAs`: Vaše socialne povezave

### 5. Slike

Zamenjajte placeholder slike z dejanskimi fotografijami:

- `images/efad-logo.png` - Vaš logo
- `images/service-*.png` - Slike storitev
- `images/portfolio-*.jpg` - Slike iz vaših projektov
- `assets/favicon.ico` - Favicon
- `assets/apple-touch-icon.png` - Apple touch icon

**Priporočila za optimizacijo slik:**
- Uporabite format WebP ali optimiziran JPG/PNG
- Velikost slik naj bo pod 500KB
- Uporabite orodja kot so [TinyPNG](https://tinypng.com/) ali [Squoosh](https://squoosh.app/)
- Za portfolio slike uporabite razmerje 16:9

### 6. Sitemap.xml

Posodobite `sitemap.xml`:
- Zamenjajte `https://www.efadskejic.si/` z vašo dejansko domeno
- Posodobite `lastmod` datume

### 7. robots.txt

Posodobite `robots.txt`:
- Zamenjajte `https://www.efadskejic.si/sitemap.xml` z vašo dejansko domeno

## Razvoj

### Lokalno Testiranje

1. Odprite `index.html` v brskalniku
2. Za testiranje EmailJS funkcionalnosti boste potrebovali lokalni strežnik:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (če imate http-server)
   npx http-server
   ```
3. Odprite `http://localhost:8000` v brskalniku

### Preverjanje SEO

- [Google Rich Results Test](https://search.google.com/test/rich-results) - Preverite strukturni podatki
- [Google PageSpeed Insights](https://pagespeed.web.dev/) - Preverite hitrost strani
- [Google Search Console](https://search.google.com/search-console) - Pošljite sitemap
- [Schema.org Validator](https://validator.schema.org/) - Preverite JSON-LD

## Razporeditev (Deployment)

### GitHub Pages

1. Naložite vse datoteke v GitHub repozitorij
2. Pojdite na Settings → Pages
3. Izberite branch in folder
4. Vaša stran bo na voljo na `https://username.github.io/repository-name`

### Tradicionalni Hosting

1. Naložite vse datoteke na vaš hosting preko FTP/SFTP
2. Prepričajte se, da je `index.html` v root mapi
3. Preverite, da so vse poti do slik in datotek pravilne

### Preverjanje po Razporeditvi

1. Preverite, da se Google Analytics naloži (uporabite Google Analytics Debugger)
2. Testirajte kontaktni obrazec
3. Preverite, da so vse slike vidne
4. Testirajte na različnih napravah
5. Pošljite sitemap v Google Search Console

## SEO Checklist

- [ ] Google Analytics je nastavljen in deluje
- [ ] EmailJS je nastavljen in kontaktni obrazec deluje
- [ ] Vse kontaktne informacije so posodobljene
- [ ] Strukturni podatki (JSON-LD) so posodobljeni
- [ ] Vse slike so optimizirane in zamenjane
- [ ] Sitemap.xml je posodobljen z vašo domeno
- [ ] robots.txt je posodobljen z vašo domeno
- [ ] Favicon je nastavljen
- [ ] Spletna stran je testirana na različnih napravah
- [ ] Sitemap je poslan v Google Search Console
- [ ] Google My Business profil je povezan (priporočeno)

## Varnost

- EmailJS uporablja javni ključ, ki je varen za uporabo v frontend kodi
- Honeypot polje v obrazcu pomaga preprečiti spam
- Vse validacije potekajo tako na strani odjemalca kot na strani strežnika (EmailJS)

## Podpora

Za vprašanja ali težave kontaktirajte razvijalca ali EmailJS/Google Analytics podporo.

## Licenca

© 2024 Efad Skejić - Vodovodar. Vse pravice pridržane.

## Posodobitve

### Verzija 1.0 (2024)
- Začetna verzija z vsemi osnovnimi funkcionalnostmi
- SEO optimizacija
- Google Analytics integracija
- EmailJS kontaktni obrazec
- Odzivna zasnova

---

**Opomba**: Ta spletna stran uporablja samo vanilla JavaScript, HTML in CSS - brez npm ali frameworkov. Vse zunanje storitve se naložijo preko CDN.

