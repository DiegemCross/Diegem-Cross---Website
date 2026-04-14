# DIEGEM CROSS — WEBSITE OPSTARTEN
## Stap-voor-stap handleiding voor het bestuur

---

## WAT ZIT ER IN DIT PAKKET?

```
diegemcross-cms/
├── index.html              ← De volledige website
├── netlify.toml            ← Hosting instellingen
├── admin/
│   ├── index.html          ← Het admin paneel (login scherm)
│   └── config.yml          ← Wat het bestuur kan aanpassen
└── content/
    ├── nieuws/             ← Alle nieuwsberichten
    ├── programma/          ← Wedstrijdtijden
    ├── sponsors/           ← Sponsor & partnerlogo's
    └── instellingen/       ← Foto's, datum, ticketlink, socials
```

---

## EENMALIGE SETUP (doet de IT specialist — 30 min)

### Stap 1 — GitHub account aanmaken
1. Ga naar github.com
2. Maak een gratis account aan op naam van Diegem Cross
3. Maak een nieuw "repository" aan: `diegemcross-website`
4. Upload alle bestanden uit dit pakket

### Stap 2 — Netlify account aanmaken
1. Ga naar netlify.com
2. Registreer gratis met het GitHub account
3. Klik "Add new site" → "Import from Git"
4. Kies het `diegemcross-website` repository
5. Klik "Deploy" — de site is live!

### Stap 3 — Eigen domein koppelen
1. In Netlify: ga naar "Domain settings"
2. Voeg `diegemcross.be` toe
3. Pas de DNS-instellingen aan bij jullie domeinprovider
   (dit is eenmalig, duurt max. 24 uur)

### Stap 4 — Admin paneel activeren
1. In Netlify: ga naar "Identity" → "Enable Identity"
2. Ga naar "Git Gateway" → "Enable Git Gateway"
3. Nodig bestuursleden uit via "Invite users":
   - peter@diegemcross.be (Voorzitter)
   - wender@diegemcross.be (Ondervoorzitter)
   - koen@diegemcross.be (Penningmeester)
   - ruben@diegemcross.be (Secretaris)
4. Elk bestuurslid ontvangt een e-mail om een wachtwoord in te stellen

---

## DAGELIJKS GEBRUIK (voor het bestuur)

### Inloggen op het admin paneel
→ Ga naar: **diegemcross.be/admin**
→ Log in met uw e-mailadres en wachtwoord

---

### NIEUWSBERICHT PLAATSEN

1. Klik op "Nieuws" in het menu
2. Klik "Nieuw nieuwsbericht"
3. Vul in:
   - **Titel** — de kop van het bericht
   - **Datum** — kies de datum uit de kalender
   - **Omslagfoto** — sleep een foto of klik "Upload"
   - **Korte samenvatting** — wordt op de homepage getoond
   - **Volledige tekst** — schrijf uw bericht (vet, cursief, links werken)
   - **Status** — kies "Gepubliceerd" of "Concept"
4. Klik **"Publiceer"** — het bericht staat meteen online!

💡 TIP: Sla op als "Concept" als u nog niet klaar bent.

---

### FOTO VERVANGEN (hero, sfeer, VIP)

1. Klik op "Instellingen" in het menu
2. Klik op "Algemene instellingen"
3. Bij "Hero foto" — klik op de huidige foto
4. Kies "Upload" en selecteer uw nieuwe foto
5. Klik **"Publiceer"**

---

### SPONSOR TOEVOEGEN OF WIJZIGEN

1. Klik op "Sponsors & Partners"
2. Klik op een bestaande sponsor om te wijzigen,
   of klik "Nieuwe sponsor" om er een toe te voegen
3. Upload het logo (PNG met transparante achtergrond = beste resultaat)
4. Kies de categorie: "Partners Diegem Cross" of "Sponsors Superprestige"
5. Klik **"Publiceer"**

---

### PROGRAMMATIJDEN AANPASSEN

1. Klik op "Programma"
2. Klik op de wedstrijd die u wilt aanpassen
3. Wijzig de starttijd of naam
4. Klik **"Publiceer"**

---

### TICKETLINK AANPASSEN

1. Klik op "Instellingen" → "Algemene instellingen"
2. Zoek het veld "Ticketlink"
3. Plak de nieuwe URL
4. Klik **"Publiceer"**

---

## BACKUP — VIA DE IT SPECIALIST

Als u liever iets via de IT specialist laat aanpassen:
stuur gewoon een bericht met wat er moet veranderen.

Voorbeelden:
- "Kan je de hero foto vervangen door deze nieuwe foto?"
- "Voeg deze nieuwe sponsor toe: [naam + logo]"
- "Pas de programmatijden aan naar..."
- "Verander de kleur van de ticketknop naar..."

Grotere aanpassingen (nieuwe secties, nieuwe pagina's, nieuw ontwerp):
→ altijd via de IT specialist, ter bespreking met het bestuur

---

## HANDIG OM TE WETEN

- Alle wijzigingen zijn **onmiddellijk live** na publicatie
- Er is altijd een **volledige geschiedenis** — vergissing gemaakt? Alles is herstelbaar
- De site werkt op **gsm, tablet en pc** (responsive)
- **Geen abonnement**, geen maandelijkse kosten
- De domeinnaam `diegemcross.be` blijft jaarlijks te vernieuwen zoals nu

---

*Opgemaakt door de IT specialist van Diegem Cross — April 2026*
