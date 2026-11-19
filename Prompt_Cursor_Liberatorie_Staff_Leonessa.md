# Prompt per Cursor — Informative e liberatorie del form «Candidatura staff» Leonessa Cup (v2)

> Incolla tutto quello che segue (dalla riga «CONTESTO» in giù) in Cursor, nel repository del sito **www.leonessacup.app**.
> Decisioni del titolare già prese: staff **volontario**; casellario **non richiesto**; ammessi i **16–17enni** con consenso dei genitori; diritti sui contenuti prodotti dallo staff a **ESL e ai suoi media partner**; contatti privacy **Lega Calcio Studenti**.

---

## CONTESTO

Il sito www.leonessacup.app (Next.js su Vercel) contiene il form pubblico «Candidatura staff» della Leonessa Cup. Il form ha 5 passi: Chi sei, Recapiti, Esperienza, Ruolo, Privacy. Invia a `POST /api/staff` questi campi: `firstName`, `lastName`, `phone`, `email`, `participatedLastYear`, `role` (Cassa, Interviste, Giornale, Foto, Social, Sicurezza), `privacyConsent` (checkbox obbligatoria) e `mediaConsent` (Sì/No facoltativo). Esistono già:
- `/privacy`: «Informativa privacy» v1.1 del 18 settembre 2026, modello con i dati del titolare a `[DA COMPILARE: …]` e candidatura riservata ai maggiorenni;
- `/social`: «Liberatoria riprese social» v1.0 del 18 settembre 2026, con lo stesso problema;
- `/admin/login`: pannello admin con password.
Non esistono `/termini` né `/cookie` (404) e manca un footer con i link legali.

Il titolare è la stessa società che gestisce la Lega Calcio Studenti (LCS). LCS ha testi legali completi su https://registration.legacalciostudenti.com:
- Modulo 1, informativa privacy (`/privacy`);
- Modulo 2, informativa per minori (`/privacy/minori`);
- Moduli 3 e 4, liberatorie per maggiorenni e minorenni, con email al secondo genitore (`/liberatorie`);
- Condizioni (`/termini`);
- Cookie (`/cookie`).
Sono in versione 1.0 del 5 ottobre 2026, il cookie in v1.1 dell'11 ottobre 2026. La Leonessa Cup è uno dei tornei LCS. Devi **sostituire i segnaposto con i dati reali**, **allineare i testi a quelli LCS** e adattarli alla candidatura staff. I candidati sono volontari dai 16 anni. Non ci sono account per i candidati, né certificato medico, né pagamento.

Dati del titolare, da usare ovunque:
- **ESL European Students League S.r.l.** («ESL»), sede legale Corso Vinzaglio 24, 10121 Torino, P.IVA IT12974200011, C.F. 12974200011
- Privacy: **privacy@legacalciostudenti.it**. PEC: **europeanstudentsleague@legalmail.it**. Segreteria: **support@legacalciostudenti.it**
- DPO: **non nominato**
- Canali: Instagram https://www.instagram.com/leonessacup/ e https://www.instagram.com/lcsrealemutua/, TikTok https://www.tiktok.com/@leonessacup, sito https://www.leonessacup.app
- Garante: https://www.garanteprivacy.it

Regole di scrittura:
- Lascia tra parentesi quadre `[ … ]` ogni dato che non è qui e non trovi nel repo, in particolare **sede e date dell'evento**. Non inventarlo.
- I passaggi marcati **DA VALIDARE LEGALMENTE** vanno mostrati evidenziati, con lo stesso stile dei segnaposto.
- Togli la frase «I testi evidenziati in verde vanno sostituiti…» solo se non resta nessun segnaposto `[DA COMPILARE]`.

---

## 1) PRIMA DI MODIFICARE: verifica nel repo e annota

1. Dove sono i sorgenti di `/privacy` e `/social` e le costanti di versione.
2. Dove `/api/staff` salva le candidature: DB o servizio, schema, campi, e se registra già timestamp, IP e user agent.
3. La regione delle funzioni Vercel (`vercel.json` → `regions` o impostazioni del progetto) e i fornitori usati: DB, **servizio email** (serve per i link ai genitori), storage, analytics.
4. I cookie e lo storage: sessione admin, eventuale `localStorage` del form, font o script esterni.

Se un dato manca, scrivi `[DA VERIFICARE: …]` nel testo e segnalalo nel report. **Se il sito non ha un servizio di invio email**, aggiungine uno solo se è già previsto nelle dipendenze o nelle env (es. Resend, come su LCS). Altrimenti implementa tutto il resto, lascia i link ai genitori dietro un flag `GUARDIAN_EMAIL_ENABLED=false` e segnalalo: **senza email ai genitori le candidature dei minori non possono essere confermate**.

---

## 2) PAGINE DA CREARE O AGGIORNARE

| Rotta | Azione | Titolo | Versione |
|---|---|---|---|
| `/privacy` | riscrivi | Informativa privacy — Candidatura staff | **2.0** |
| `/privacy/minori` | nuova | Informativa per staff minorenni e genitori | **1.0** |
| `/social` | riscrivi, con due sezioni (maggiorenni / minorenni) | Liberatoria foto, video e social — Staff | **2.0** |
| `/liberatorie` | nuova: redirect 308 a `/social` | — | — |
| `/termini` | nuova | Condizioni della candidatura staff volontario, regole di condotta e diritti sui contenuti | **1.0** |
| `/cookie` | nuova | Informativa cookie | **1.0** |
| `/genitore/[token]` | nuova | Conferma del genitore (primo contatto) | — |
| `/genitore/conferma/[token]` | nuova | Conferma dell'altro genitore (C1) | — |
| `/revoca/[token]` | nuova (se c'è l'email) | Revoca autorizzazioni | — |

Tutte le versioni hanno la data di pubblicazione, in una costante unica `LEGAL_EFFECTIVE_DATE` (formato «[18 novembre 2026]»). Le versioni precedenti (privacy 1.1, social 1.0) restano in sola lettura su `/privacy/v/1.1` e `/social/v/1.0`. Ancore richieste: `id="diritti"` sull'art. 8 di `/termini` e `id="minori"` sulla Sezione B di `/social`. In cima a ogni pagina mettono titolo, riferimenti normativi, «versione X del [data]», il link «Torna al form» e i link alle altre pagine legali.

### 2.1 `/privacy` — testo completo (v2.0)

**INFORMATIVA SUL TRATTAMENTO DEI DATI PERSONALI — CANDIDATURA STAFF LEONESSA CUP**
ai sensi degli artt. 13 e 14 del Regolamento UE 2016/679 (GDPR) e del D.lgs. 196/2003 (Codice privacy) — Leonessa Cup, stagione 2026/2027 — versione 2.0 del [LEGAL_EFFECTIVE_DATE].

Se hai 16 o 17 anni, leggi anche, insieme ai tuoi genitori, l'[informativa per staff minorenni e genitori](/privacy/minori). Le riprese sono regolate dalla [liberatoria](/social). Le regole del volontariato e i diritti sui contenuti sono nelle [condizioni](/termini).

**1. Titolare del trattamento**
ESL European Students League S.r.l., sede legale in Corso Vinzaglio 24, 10121 Torino, P.IVA IT12974200011, C.F. 12974200011. È l'organizzatrice dei tornei della Lega Calcio Studenti, tra cui la Leonessa Cup («ESL»). Contatti privacy: privacy@legacalciostudenti.it, PEC europeanstudentsleague@legalmail.it. DPO: non nominato.

**2. Dati trattati e fonte**
I dati sono raccolti con il form di candidatura staff su https://www.leonessacup.app, per la Leonessa Cup [edizione/anno], che si svolge a [comune e impianto] dal [data inizio] al [data fine].
- Dati anagrafici: nome, cognome e data di nascita (serve a verificare l'età minima di 16 anni e se si applica il percorso per minorenni).
- Dati di contatto: telefono ed email.
- Dati della candidatura: partecipazione allo staff nell'edizione precedente e ruolo preferito.
- Solo per i candidati di 16–17 anni, dati del genitore o tutore indicato come contatto: nome, cognome, rapporto, email, telefono e dichiarazioni. Dell'altro genitore, se c'è: nome, cognome ed email, forniti dal minore o dal primo genitore (art. 14 GDPR: l'email di conferma contiene la sua informativa).
- Dichiarazioni e scelte: fascia d'età, presa visione delle informative, accettazione delle condizioni, cessione dei diritti sui contenuti (solo per i ruoli Foto, Interviste, Giornale e Social), scelte sulle riprese e sulle comunicazioni.
- Dati tecnici, come prova delle scelte: data e ora, versione dei testi, [indirizzo IP e user agent, solo se il sito li registra].
- Se entri nello staff: turni, accrediti, ruolo assegnato, eventuali rimborsi spese, foto e video nei limiti della liberatoria, e i contenuti che produci nel tuo ruolo.

Non chiediamo dati relativi alla salute né altri dati particolari (art. 9 GDPR) o giudiziari (art. 10 GDPR). Non inserirli nel form. Il certificato del casellario giudiziale non è richiesto.

**3. Finalità e basi giuridiche**

| Finalità | Base giuridica | Obbligatorietà |
|---|---|---|
| A. Ricevere e valutare la candidatura, contattarti, organizzare l'attività di volontariato (ruoli, turni, accrediti), inviarti comunicazioni di servizio. Per i minorenni, anche contattare i genitori e raccoglierne le conferme | Misure precontrattuali ed esecuzione dell'accordo di volontariato richiesto (art. 6.1.b GDPR). Per i minorenni, l'accordo è concluso con il consenso del genitore che ha la responsabilità genitoriale (artt. 316 e 320 c.c.) | Necessaria per candidarsi |
| B. Adempimenti amministrativi e assicurativi (es. copertura dei volontari, rimborsi spese) | Obbligo di legge (art. 6.1.c GDPR) | Necessaria se entri nello staff |
| C. Sicurezza dell'evento, tutela dei partecipanti (in particolare dei minori) e difesa di un diritto in giudizio | Legittimo interesse di ESL (art. 6.1.f GDPR) | — |
| D. Foto e video in cui sei il soggetto principale (primi piani, interviste, contenuti dedicati), per cronaca, documentazione e promozione | Consenso (art. 6.1.a GDPR; art. 10 c.c.; artt. 96–97 L. 633/1941). Per i minorenni, consenso di entrambi i genitori, salvo unico esercente, più l'accordo del minore | Facoltativa: vedi [liberatoria](/social) |
| D2. Utilizzo, da parte di ESL e dei suoi media partner, dei contenuti che produci nei ruoli Foto, Interviste, Giornale e Social, con il tuo nome come autore | Esecuzione dell'accordo di volontariato e della cessione dei diritti (art. 6.1.b GDPR; L. 633/1941). Per i minorenni, consenso di entrambi i genitori, salvo unico esercente | Necessaria solo per quei ruoli |
| E. Email o messaggi su candidature staff, eventi e tornei ESL delle edizioni successive | Consenso (art. 6.1.a GDPR; art. 130 Codice privacy). Per i minorenni, non è proposta | Facoltativa (solo maggiorenni) |
| G. Prova delle scelte e dei consensi | Obbligo di legge (art. 6.1.c GDPR, in relazione all'art. 7.1) e legittimo interesse (art. 6.1.f GDPR) | — |

La presa visione dell'informativa non è un consenso: la candidatura si basa sulla lettera A. Negare i consensi D ed E non pregiudica la candidatura. Le immagini d'insieme dell'evento pubblico sono regolate dal punto 6 della liberatoria.

**4. Modalità del trattamento**
Usiamo strumenti elettronici e, se serve, cartacei, con personale autorizzato e istruito e misure di sicurezza adeguate (art. 32 GDPR). Non facciamo profilazione né prendiamo decisioni basate unicamente su trattamenti automatizzati. Le candidature si consultano solo dal pannello admin protetto. I link inviati ai genitori sono monouso e conservati in forma cifrata (hash). [DA VERIFICARE: protezione admin e cifratura in base al codice.]

**5. Destinatari**
- Staff organizzativo ESL autorizzato e organizzatori locali della Leonessa Cup.
- Fornitori nominati responsabili del trattamento (art. 28 GDPR): hosting Vercel Inc. [regione: DA VERIFICARE], [database: DA VERIFICARE], [email: DA VERIFICARE].
- Compagnie assicurative, consulenti e autorità, quando la legge lo richiede.
- I media partner di ESL, che ricevono i contenuti prodotti dallo staff (D2) con il nome dell'autore e le immagini dello staff, solo nei limiti delle autorizzazioni date.

I dati della candidatura non sono diffusi e non sono comunicati a sponsor o partner per finalità promozionali.

**6. Trasferimenti extra-UE**
Vercel [e gli altri fornitori USA individuati] possono comportare trasferimenti verso gli Stati Uniti, con clausole contrattuali standard e/o EU-U.S. Data Privacy Framework.

**7. Conservazione**

| Dati | Durata |
|---|---|
| Candidature non accolte o non confermate dai genitori (A) | [12 mesi] dalla fine dell'edizione — DA VALIDARE LEGALMENTE |
| Staff selezionato: ruoli, turni, accrediti (A) | 24 mesi dal termine della stagione |
| Documenti amministrativi, assicurativi e rimborsi (B) | Per il tempo previsto dalla legge (fino a 10 anni, art. 2220 c.c.) |
| Foto e video (D) | Fino alla revoca e comunque non oltre 10 anni dalla fine della stagione; dopo la revoca, cancellazione anche dagli archivi entro 30 giorni, salvo difesa di un diritto (G). Non si può ritirare il materiale già stampato o consegnato a terzi prima della revoca |
| Contenuti prodotti dallo staff e nome dell'autore (D2) | Per la durata dei diritti ceduti a ESL (vedi le condizioni) |
| Dati dell'altro genitore non confermati | Fino a 60 giorni dall'invio del link, poi cancellati |
| Comunicazioni sulle edizioni successive (E) | 24 mesi dal consenso o dall'ultima interazione, salvo revoca |
| Registro dei consensi (G) | 10 anni dalla fine del trattamento o dalla revoca (art. 2946 c.c.) |

**8. I tuoi diritti**
Puoi chiedere accesso, rettifica, cancellazione, limitazione e portabilità e opporti al trattamento (artt. 15–22 GDPR), scrivendo a privacy@legacalciostudenti.it o alla PEC europeanstudentsleague@legalmail.it. Puoi revocare ogni consenso in qualsiasi momento [anche dal link di revoca nell'email di conferma]. La revoca non rende illecito il trattamento precedente (art. 7.3 GDPR). Per i minorenni basta la revoca di uno solo dei genitori, oppure del minore stesso quando compie 18 anni. Rispondiamo entro un mese, prorogabile di due mesi nei casi complessi (art. 12.3 GDPR). Puoi proporre reclamo al [Garante per la protezione dei dati personali](https://www.garanteprivacy.it) o rivolgerti all'autorità giudiziaria (art. 79 GDPR; art. 152 Codice privacy).
**DIRITTO DI OPPOSIZIONE (art. 21 GDPR).** Puoi opporti in qualsiasi momento ai trattamenti basati sul legittimo interesse (C e immagini d'insieme), per motivi legati alla tua situazione particolare.

**9. Età**
Possono candidarsi le persone che hanno compiuto **16 anni** alla data della candidatura. Per chi ha 16 o 17 anni, la candidatura è valida solo dopo la conferma di un genitore o tutore, secondo l'[informativa per minori](/privacy/minori). I ruoli Cassa e Sicurezza sono riservati ai maggiorenni.

**10. Aggiornamenti**
La versione in vigore è sempre su /privacy e quelle precedenti restano consultabili. Se una modifica cambia ciò a cui hai acconsentito, ti chiederemo una nuova scelta.

### 2.2 `/privacy/minori` — testo completo (v1.0), adattato dal Modulo 2 LCS

**INFORMATIVA SUL TRATTAMENTO DEI DATI PERSONALI DEL MINORE E DEI GENITORI — STAFF LEONESSA CUP**
ai sensi degli artt. 13 e 14 GDPR — Leonessa Cup, stagione 2026/2027 — versione 1.0 del [LEGAL_EFFECTIVE_DATE]. **DA VALIDARE LEGALMENTE.**

Gentili genitori, i dati dei ragazzi minorenni meritano una protezione specifica (considerando 38 GDPR). Vi chiediamo di leggere questa informativa insieme a vostro/a figlio/a. Vale insieme all'[informativa privacy](/privacy), di cui riprende titolare, fornitori, trasferimenti e diritti.

**Per te che ti candidi (in parole semplici, art. 2-quinquies Codice privacy)**
Per candidarti allo staff usiamo il tuo nome, la tua data di nascita, i tuoi contatti e il ruolo che preferisci. I tuoi genitori devono confermare la candidatura con un link che ricevono via email. Senza la loro conferma non puoi entrare nello staff. Le tue foto e i tuoi video si pubblicano solo se sono d'accordo i tuoi genitori (entrambi, se ci sono tutti e due) e anche tu: lo confermi con una casella. Nelle didascalie scriviamo il tuo nome e l'iniziale del cognome. Non usiamo i tuoi contatti per la pubblicità e non li diamo a nessuna azienda. Se una foto o un video non ti piace, puoi chiederci di toglierlo anche da solo/a, scrivendo a privacy@legacalciostudenti.it.

**Come funziona**
1. Il minore compila il form: data di nascita, i dati del genitore o tutore di contatto (nome, cognome, rapporto, email, telefono) e la scelta **G3**, cioè se c'è un altro genitore che esercita la responsabilità genitoriale oppure se il contatto è l'**unico esercente**. Se c'è un altro genitore, nome, cognome ed email sono obbligatori. Inserire questi dati **non** è un'autorizzazione.
2. Il genitore di contatto riceve un link monouso (`/genitore/[token]`, valido 60 giorni). Da lì dichiara di essere genitore o tutore (**G1**), conferma la candidatura e accetta le condizioni, sceglie gli usi di foto e video e, se il ruolo è Foto, Interviste, Giornale o Social, accetta la cessione dei diritti sui contenuti.
3. Il minore conferma con la casella **G16** (accordo del minore) nel form.
4. Se c'è un altro genitore, riceve un'email con il link di conferma (**C1**). Le autorizzazioni per foto e video, cognome completo e cessione dei diritti diventano attive solo dopo la sua conferma, o subito se il contatto è unico esercente. L'affidamento esclusivo non basta, perché le decisioni di maggiore interesse restano di entrambi i genitori (art. 337-quater c.c.): l'unico esercente deve dichiarare che l'altro genitore è deceduto, decaduto, sospeso o non riconosce il figlio, o che c'è un provvedimento che gli attribuisce in via esclusiva anche queste decisioni. [DA VALIDARE LEGALMENTE]
5. Senza la conferma C1 la candidatura può essere accolta, ma il minore **non è pubblicabile** in modo riconoscibile e non può svolgere i ruoli che richiedono la cessione dei diritti. [DA VALIDARE LEGALMENTE: se anche la candidatura richieda entrambi i genitori. Oggi, come su LCS, basta il genitore di contatto.]

**Dati trattati**
- Del minore: quelli indicati al punto 2 dell'[informativa privacy](/privacy).
- Del genitore di contatto: nome, cognome, rapporto (Genitore / Tutore / Affidatario), email, telefono, dichiarazioni G1 e G3.
- Dell'altro genitore: nome, cognome ed email.
- Di tutti: data, ora [e IP e user agent] delle conferme, come prova.

**Finalità e basi giuridiche**
Sono quelle della tabella del punto 3 dell'[informativa privacy](/privacy), con queste differenze:
- **A**: per il minore, l'accordo di volontariato è concluso con il consenso del genitore (artt. 316 e 320 c.c.).
- **D** (foto e video): richiede il consenso di entrambi i genitori, salvo unico esercente, più G16.
- **D3** (cognome completo nelle didascalie): stesso consenso.
- **D2** (cessione dei diritti sui contenuti): stesso consenso.
- **E** (comunicazioni promozionali): non è proposta ai minori.
- Contatti dei genitori: usati solo per le conferme e le comunicazioni di servizio (art. 6.1.b GDPR), per 24 mesi dalla fine della stagione.

**Tutele per i minori nello staff**
- Turni compatibili con l'età e con gli impegni scolastici, sempre con un referente adulto di ESL. [DA DECIDERE: orario massimo, es. non oltre le 22:00.]
- Niente ruoli Cassa e Sicurezza.
- Nelle didascalie: nome e iniziale del cognome, salvo consenso al cognome completo.
- Niente tag dei profili social del minore e nessuna pubblicazione di recapiti, residenza o dati che ne permettano la localizzazione.
- Il minore non è mai presentato come testimonial di prodotti o sponsor.
- Nessuna profilazione.

**Diritti**
Genitori e minore esercitano i diritti degli artt. 15–22 GDPR scrivendo a privacy@legacalciostudenti.it o alla PEC europeanstudentsleague@legalmail.it. La revoca di uno solo dei genitori basta a fermare gli usi facoltativi. A 18 anni la revoca spetta al/alla partecipante. Il minore può chiedere da solo/a la rimozione di una foto o di un video. Reclamo al Garante per la protezione dei dati personali.

### 2.3 `/social` — testo completo (v2.0), con due sezioni

#### Sezione A — Maggiorenni (adattata dal Modulo 3 LCS)

**LIBERATORIA PER L'UTILIZZO DI IMMAGINI E RIPRESE AUDIO-VIDEO E PER IL TRATTAMENTO DEI RELATIVI DATI PERSONALI — STAFF LEONESSA CUP**
ai sensi dell'art. 10 c.c., degli artt. 96 e 97 L. 633/1941 e degli artt. 6.1.a e 7 GDPR — Leonessa Cup, stagione 2026/2027 — versione 2.0 del [LEGAL_EFFECTIVE_DATE].

ESL European Students League S.r.l., con sede in Corso Vinzaglio 24, 10121 Torino («ESL»), organizza la Leonessa Cup della Lega Calcio Studenti, comprese le eventuali fasi finali tra le città. Durante partite, premiazioni, conferenze ed eventi collegati, ESL realizza foto, video, interviste e dirette streaming, direttamente o tramite fotografi, videomaker e media partner incaricati. In questi contenuti possono comparire anche i componenti dello staff («Immagini»). Con le caselle del form scegli, uso per uso, se autorizzarne la pubblicazione.

Questa liberatoria riguarda **la tua immagine**. I diritti sui contenuti che **produci tu** come staff (foto, video, articoli, interviste) sono regolati dall'art. 8 delle [condizioni](/termini).

1. **Oggetto.** Per ogni uso che spunti, autorizzi ESL a riprendere, registrare, pubblicare e diffondere le Immagini, la tua voce, il tuo nome e il tuo ruolo nello staff. Gli usi non spuntati non sono autorizzati.
2. **Modalità d'uso.** Le Immagini possono essere montate, tagliate e adattate ai formati dei diversi canali, senza alterarne il significato. Sono visibili senza limiti territoriali, perché i canali online sono accessibili da tutto il mondo. ESL non tagga profili social personali senza richiesta.
3. **Limiti.** È vietato ogni uso che pregiudichi dignità, onore, reputazione o decoro della persona ritratta (art. 10 c.c.; art. 97, comma 2, L. 633/1941). Le Immagini non sono cedute a terzi per usi diversi da quelli autorizzati e non sono usate per presentarti come testimonial di prodotti senza un accordo specifico. Non sono usate per addestrare sistemi di intelligenza artificiale né per generare contenuti sintetici con la tua immagine.
4. **Gratuità.** L'autorizzazione è gratuita: per gli usi autorizzati non è dovuto alcun compenso.
5. **Durata e revoca.** L'autorizzazione vale fino a revoca e comunque per non oltre 10 anni dalla fine della stagione. Puoi revocarla in qualsiasi momento, anche per un solo uso, scrivendo a privacy@legacalciostudenti.it [o dal link di revoca]. Dopo la revoca o la scadenza ESL non pubblica nuovi contenuti con le tue Immagini e rimuove entro 30 giorni, quando tecnicamente possibile, quelli sui propri canali. Non possono essere ritirati il materiale già stampato o consegnato a terzi prima della revoca, gli articoli delle testate giornalistiche e le condivisioni fatte da terzi. Dopo la revoca ESL cancella le Immagini anche dai propri archivi entro 30 giorni, salvo quanto serve per la difesa di un diritto.
6. **Immagini d'insieme.** Anche senza consenso, ESL può pubblicare immagini d'insieme (tribune, panoramiche del campo, gruppi) in cui la persona non è il soggetto principale e non è facilmente riconoscibile. Su richiesta, ESL rende la persona non riconoscibile anche in queste immagini.
7. **Dati personali.** Le Immagini sono dati personali trattati da ESL, titolare del trattamento, sulla base del tuo consenso (art. 6.1.a GDPR) e secondo l'[informativa privacy](/privacy). Puoi esercitare i diritti degli artt. 15–22 GDPR scrivendo a privacy@legacalciostudenti.it e proporre reclamo al Garante. Se qualcuno ripubblica abusivamente le tue Immagini, ESL, su tua richiesta, lo segnala alla piattaforma e ne chiede la rimozione.
8. **Facoltatività.** Dare o negare questi consensi non incide sulla candidatura né sulla selezione.

#### Sezione B — Minorenni di 16–17 anni (adattata dal Modulo 4 LCS)

**LIBERATORIA PER L'UTILIZZO DI IMMAGINI E RIPRESE AUDIO-VIDEO DI MINORE E PER IL TRATTAMENTO DEI RELATIVI DATI PERSONALI — STAFF LEONESSA CUP**
ai sensi dell'art. 10 c.c., degli artt. 96 e 97 L. 633/1941, degli artt. 2, 316 e 320 c.c. e degli artt. 6.1.a e 7 GDPR — versione 2.0 del [LEGAL_EFFECTIVE_DATE]. Stessa premessa della Sezione A.

1. **Oggetto e consenso di entrambi i genitori.** Per ogni uso spuntato, i genitori autorizzano ESL a riprendere, registrare, pubblicare e diffondere le Immagini, la voce, il nome e il ruolo del minore nello staff. Pubblicare online le immagini di un minore richiede il consenso di entrambi i genitori. L'autorizzazione diventa attiva solo quando anche l'altro genitore la conferma (C1), salvo che chi è indicato come contatto sia l'unico esercente la responsabilità genitoriale. Serve anche l'accordo del minore (casella G16). Finché manca la conferma, ESL non pubblica Immagini in cui il minore è riconoscibile. Senza conferma il minore può comunque far parte dello staff.
2. **Modalità d'uso.** Come la Sezione A. Nelle didascalie il minore compare con nome e iniziale del cognome, salvo consenso al cognome completo. ESL non tagga profili social del minore, non pubblica recapiti, residenza o altri dati che ne permettano la localizzazione e non usa le Immagini per profilazione.
3. **Tutela del minore.** È vietato ogni uso che pregiudichi dignità, onore, reputazione o decoro del minore (art. 10 c.c.; art. 97, comma 2, L. 633/1941) o che sia contrario al suo interesse. Non si pubblicano Immagini del minore in situazioni di disagio, dopo un infortunio, negli spogliatoi o in atteggiamenti che possano esporlo a derisione. Le Immagini non sono cedute a terzi per usi diversi da quelli autorizzati e il minore non è mai presentato come testimonial di prodotti. Se serve, il minore viene oscurato.
4. **Gratuità.** Come la Sezione A.
5. **Durata e revoca.** L'autorizzazione vale fino a revoca e per non oltre 10 anni dalla fine della stagione. Basta la revoca di uno solo dei genitori o, dopo i 18 anni, del/della partecipante, scrivendo a privacy@legacalciostudenti.it [o dal link di revoca], anche per un solo uso. Per il resto vale quanto previsto al punto 5 della Sezione A.
6. **Dati personali.** Le Immagini sono trattate da ESL sulla base del consenso dei genitori, rappresentanti legali del minore (art. 6.1.a GDPR; artt. 2 e 320 c.c.), secondo l'[informativa per minori](/privacy/minori).
7. **Facoltatività.** Dare o negare questi consensi non incide sulla candidatura.

**Canali (per entrambe le sezioni):** Instagram [@leonessacup](https://www.instagram.com/leonessacup/) e [@lcsrealemutua](https://www.instagram.com/lcsrealemutua/); TikTok [@leonessacup](https://www.tiktok.com/@leonessacup); sito https://www.leonessacup.app; [altri canali ufficiali: DA COMPLETARE]. Accordo di contitolarità social: non previsto.

### 2.4 `/termini` — testo completo (v1.0)

**CONDIZIONI DELLA CANDIDATURA STAFF VOLONTARIO, REGOLE DI CONDOTTA E DIRITTI SUI CONTENUTI — LEONESSA CUP**
Stagione 2026/2027 — versione 1.0 del [LEGAL_EFFECTIVE_DATE]. **DA VALIDARE LEGALMENTE.**

1. **Organizzazione.** ESL European Students League S.r.l., Corso Vinzaglio 24, 10121 Torino, P.IVA IT12974200011, C.F. 12974200011.
2. **Che cosa regola.** Regola la candidatura allo staff volontario della Leonessa Cup e, se vieni selezionato/a, l'attività durante l'evento, le regole di condotta e i diritti sui contenuti prodotti. Privacy e immagini sono regolate dall'[informativa privacy](/privacy), dall'[informativa per minori](/privacy/minori) e dalla [liberatoria](/social).
3. **Candidatura e requisiti.** Puoi candidarti se hai compiuto 16 anni e fornisci dati veri. Se hai 16 o 17 anni, la candidatura e l'accettazione di queste condizioni richiedono la conferma di un genitore o tutore tramite il link che riceve via email. Il ruolo indicato è una preferenza: ESL assegna ruoli e turni secondo le esigenze dell'evento e comunica l'esito via email o telefono. La candidatura non dà diritto a essere selezionati. **I ruoli Cassa e Sicurezza sono riservati ai maggiorenni.**
4. **Volontariato gratuito.** L'attività nello staff è prestata in modo personale, spontaneo e gratuito, senza fine di lucro, anche indiretto. Non è dovuto alcun compenso, in nessuna forma. Queste condizioni non costituiscono un contratto di lavoro subordinato o autonomo né una collaborazione retribuita. Rimborso spese: [DA DECIDERE: «non previsto» oppure «sono rimborsate solo le spese effettivamente sostenute e documentate, preventivamente autorizzate da ESL, entro [importo] e secondo [modalità]»]. Non sono ammessi rimborsi forfettari. ESL può fornire materiali dello staff (es. maglietta, accredito, pasto durante i turni) per lo svolgimento dell'attività, senza che costituiscano compenso.
5. **Assicurazione.** [DA DECIDERE: «ESL assicura i volontari selezionati per responsabilità civile verso terzi e infortuni durante l'attività, con polizza [compagnia / n. polizza]; le condizioni sono disponibili su richiesta» oppure altra soluzione.] La partecipazione è subordinata all'attivazione della copertura prevista.
6. **Condotta.** Chi fa parte dello staff segue le indicazioni dei responsabili ESL, il regolamento del torneo e la normativa applicabile. Si comporta in modo corretto e rispettoso verso partecipanti, pubblico, arbitri e altri componenti dello staff, e tiene un comportamento adeguato alla presenza di studenti minorenni. Non svolge l'attività sotto l'effetto di alcol o sostanze.
7. **Tutela dei minori.** Ai tornei partecipano studenti dai 14 anni e nello staff possono esserci ragazzi dai 16 anni. Chi fa parte dello staff:
   - non contatta in privato partecipanti o colleghi minorenni (messaggi diretti, social personali), se non per esigenze organizzative e tramite i canali indicati da ESL;
   - non resta da solo/a con un minore in spogliatoi o spazi chiusi;
   - segnala subito a ESL comportamenti inappropriati.
   Gli staff minorenni svolgono turni compatibili con l'età, sempre con un referente adulto di ESL. Il certificato del casellario giudiziale non è richiesto.
8. **Diritti sui contenuti prodotti dallo staff (ruoli Foto, Interviste, Giornale, Social).**
   8.1 *Oggetto.* Questo articolo si applica a foto, video, audio, testi, articoli, interviste, grafiche e ogni altro contenuto realizzato nel ruolo di staff durante la Leonessa Cup o su incarico di ESL («Contenuti»).
   8.2 *Cessione.* Con l'accettazione di queste condizioni, e per i minori con il consenso dei genitori (punto 8.6), il componente dello staff cede a ESL **a titolo gratuito**, in coerenza con la natura volontaria dell'attività, tutti i diritti di utilizzazione economica sui Contenuti (artt. 12 e ss., 78-bis, 87 e ss. L. 633/1941). La cessione è **in esclusiva**, senza limiti di territorio, per tutta la durata dei diritti e per qualsiasi mezzo e formato, oggi noto o futuro: pubblicazione, riproduzione, comunicazione al pubblico anche in diretta, elaborazione, montaggio, traduzione, archiviazione. [DA VALIDARE LEGALMENTE: esclusiva e durata; in alternativa, licenza esclusiva di [N] anni.]
   8.3 *Media partner.* ESL può concedere in sublicenza o comunicare i Contenuti, in tutto o in parte, ai propri media partner, anche per la pubblicazione sui loro canali, senza ulteriore consenso dell'autore e senza compenso.
   8.4 *Limiti delle liberatorie.* ESL e i media partner usano i Contenuti in cui compaiono partecipanti, pubblico o altri componenti dello staff **solo nei limiti delle liberatorie** date da quelle persone, comprese quelle LCS (https://registration.legacalciostudenti.com/liberatorie) e la Sezione B della [liberatoria](/social) per i minori. Un minore senza autorizzazione attiva non viene pubblicato in modo riconoscibile e se serve viene oscurato. La cessione dei diritti d'autore non sostituisce il consenso delle persone ritratte.
   8.5 *Diritti morali.* Restano salvi i diritti morali dell'autore (artt. 20 e ss. L. 633/1941), che sono inalienabili. ESL indica il nome dell'autore quando è ragionevolmente possibile (es. «Foto: Nome C.»; per i minori, nome e iniziale del cognome) e non usa i Contenuti in modo lesivo del suo onore o della sua reputazione. Restano consentiti gli adattamenti tecnici ai formati dei canali.
   8.6 *Minori.* Per i componenti dello staff di 16–17 anni la cessione richiede il consenso dei genitori, cioè di entrambi salvo unico esercente, con le stesse conferme della liberatoria (G1 e C1), e l'accordo del minore. Finché la cessione non è attiva ESL non usa i Contenuti del minore e il minore non può essere assegnato ai ruoli Foto, Interviste, Giornale o Social. [DA VALIDARE LEGALMENTE: se la cessione gratuita di diritti patrimoniali del minore rientri nell'ordinaria amministrazione o richieda l'autorizzazione del giudice tutelare (art. 320 c.c.). In alternativa, licenza non esclusiva gratuita limitata agli usi dell'evento.]
   8.7 *Garanzie e uso personale.* L'autore garantisce che i Contenuti sono originali e non violano diritti di terzi, per esempio musica o immagini altrui. Senza autorizzazione scritta di ESL non pubblica i Contenuti né altre foto o video dei partecipanti sui propri profili personali. Con l'autorizzazione può usarli nel proprio portfolio, senza fini commerciali e nel rispetto delle liberatorie.
9. **Foto e video: regole operative.** Prima di pubblicare o consegnare un Contenuto, chi fa parte dello staff verifica con ESL le autorizzazioni dei soggetti ritratti. Non fa riprese negli spogliatoi, dopo infortuni o in situazioni di disagio, e segue le indicazioni di ESL sulle dirette.
10. **Riservatezza e dati personali.** Chi fa parte dello staff tratta i dati di partecipanti, pubblico e incassi solo per il proprio ruolo e mantiene riservate le informazioni conosciute durante l'evento. Se il ruolo lo richiede, ESL lo/la autorizza per iscritto al trattamento con istruzioni specifiche (art. 29 GDPR; art. 2-quaterdecies Codice privacy).
11. **Ruoli Cassa e Sicurezza (solo maggiorenni).** Chi ha il ruolo Cassa segue le procedure di ESL per incassi e rendiconto. Chi ha il ruolo Sicurezza svolge solo supporto organizzativo e non sostituisce il personale abilitato (steward, addetti antincendio o primo soccorso) quando la legge lo richiede. [DA VERIFICARE con ESL i compiti previsti.]
12. **Recesso e violazioni.** Il volontario può ritirarsi in qualsiasi momento, avvisando ESL appena possibile. In caso di violazione, ESL può revocare il ruolo o l'accredito, anche durante l'evento. La cessione dei diritti sui Contenuti già realizzati resta valida anche dopo il ritiro.
13. **Legge e foro.** Legge italiana. Foro competente: Torino, salvo il foro inderogabile del consumatore, se applicabile.
14. **Contatti.** Segreteria: support@legacalciostudenti.it. Privacy: privacy@legacalciostudenti.it. PEC: europeanstudentsleague@legalmail.it.

### 2.5 `/cookie` — testo (v1.0), da completare con quanto trovi al punto 1.4

**INFORMATIVA COOKIE — leonessacup.app**, versione 1.0 del [LEGAL_EFFECTIVE_DATE]. Titolare: ESL European Students League S.r.l., Corso Vinzaglio 24, 10121 Torino, P.IVA/C.F. IT12974200011 / 12974200011, privacy@legacalciostudenti.it.

1. **Cookie e storage usati.** Inserisci una tabella con le colonne: Nome, Dove, Finalità, Durata, Prima o terza parte, Qualificazione. Mettici solo cosa trovi davvero nel codice (es. sessione admin, bozza del form in localStorage).
2. **Risorse esterne.** Se ci sono: fornitore, dominio, informativa del fornitore.
3. **Base giuridica.** I cookie tecnici non richiedono consenso (art. 122, comma 1, Codice privacy; Linee guida cookie del Garante, 10 giugno 2021).
4. **Gestione.** Logout dall'area admin; impostazioni del browser.

Se trovi statistiche, marketing o pixel, **non** attivarli senza consenso. Aggiungi un banner Accetta / Rifiuta / Preferenze, con Rifiuta in prima schermata e nessuno script prima della scelta, come su LCS, e segnalalo. Se non ce ne sono, scrivi nella pagina: «Non usiamo cookie di statistica, profilazione o pubblicità».

---

## 3) FORM, CASELLE E FLUSSO GENITORI

Regole generali: nessuna casella pre-selezionata, una casella per ogni scopo, nessun consenso raggruppato. Ogni testo linka al documento, che si apre in una nuova scheda.

### 3.1 Nuovi campi nei passi 1–4
- Passo «Chi sei»: aggiungi `birthDate` (obbligatoria). Calcola `ageBand` sul server alla data della candidatura:
  - `adult` se ha 18 anni o più;
  - `minor16_17` se ha 16 o 17 anni;
  - sotto i 16 anni blocca l'invio con il messaggio «Per candidarti allo staff devi aver compiuto 16 anni».
  Aggiungi anche la dichiarazione obbligatoria `ageDeclaration` (radio, nessuna opzione preselezionata): «Ho compiuto 18 anni» / «Ho 16 o 17 anni». Deve essere coerente con `birthDate`, altrimenti mostra un errore.
- Passo «Ruolo»: se `ageBand = minor16_17`, Cassa e Sicurezza sono disabilitati, con la nota «Riservato ai maggiorenni». Il server rifiuta comunque la combinazione.
- **Nuovo passo «Genitore»**, solo se `minor16_17`, tra «Ruolo» e «Privacy»:
  - genitore o tutore di contatto: `guardianFirstName`, `guardianLastName`, `guardianRelation` (Genitore / Tutore / Affidatario), `guardianEmail` (diversa da quella del minore), `guardianPhone`;
  - `G3` (radio obbligatoria): «C'è un altro genitore che esercita la responsabilità genitoriale» / «Il genitore indicato è l'unico esercente la responsabilità genitoriale»;
  - se c'è un altro genitore: `secondGuardianFirstName`, `secondGuardianLastName`, `secondGuardianEmail`, tutti obbligatori;
  - nota sotto il passo: «Inserire questi dati non è un'autorizzazione: il genitore riceverà un'email per confermare.»

### 3.2 Passo «Privacy» — maggiorenni (`adult`)
**Obbligatorie**
- `privacyRead`: «Ho letto l'[informativa privacy](/privacy) (versione 2.0) e ne ho compreso i contenuti.» È una **presa visione**, non un consenso, e sostituisce `privacyConsent`.
- `termsAccepted`: «Accetto le [condizioni della candidatura staff volontario e le regole di condotta](/termini) (versione 1.0).»
- `rightsAssignment`, **solo se il ruolo è Foto, Interviste, Giornale o Social**: «Cedo a ESL, a titolo gratuito, i diritti di utilizzazione economica sui contenuti che realizzerò come staff, con facoltà di sublicenza ai media partner di ESL, nei termini dell'[art. 8 delle condizioni](/termini#diritti). I miei diritti morali di autore restano salvi.»

**Facoltative: foto e video.** Titolo del blocco: «Autorizzo ESL a pubblicare foto e video in cui compaio, con il mio nome e il mio ruolo nello staff, per:»
- `media_channels`: «**Canali del torneo**: sito, app e profili social ufficiali della Leonessa Cup e della Lega (es. Instagram, TikTok, Facebook, YouTube), comprese dirette streaming e highlights.»
- `media_promo`: «**Promozione ESL**: locandine, brochure, video promozionali e campagne pubblicitarie di ESL, anche sponsorizzate online.»
- `media_sponsor`: «**Contenuti con sponsor**: contenuti sul torneo realizzati insieme agli sponsor e ai partner (es. post co-firmati, premiazioni).»
- `media_press`: «**Stampa**: invio a giornali, TV e siti di informazione per la cronaca del torneo.»
- `media_interviews`: «**Interviste**: interviste audio e video in cui compaio.»
Sotto il blocco: «Spuntando una casella confermi di aver letto la [liberatoria completa](/social) (versione 2.0). Le caselle sono facoltative: puoi candidarti anche senza spuntarne nessuna. Puoi revocare ogni autorizzazione in qualsiasi momento scrivendo a privacy@legacalciostudenti.it.»

**Facoltativa: comunicazioni**
- `comms_future`: «Acconsento a ricevere da ESL, via email e messaggi, comunicazioni su candidature staff, eventi e tornei delle edizioni successive.»

### 3.3 Passo «Privacy» — minorenni (`minor16_17`), nel form compilato dal minore
- `privacyRead` (obbligatoria): «Ho letto, insieme ai miei genitori, l'[informativa privacy](/privacy) e l'[informativa per minori](/privacy/minori).»
- `termsRead` (obbligatoria): «Ho letto le [condizioni](/termini) e mi impegno a rispettare le regole di condotta. So che la candidatura vale solo dopo la conferma di un genitore.»
- `G16` (facoltativa, ma necessaria per attivare foto, video e cessione dei diritti): «**Accordo del minore**: ho letto la [liberatoria](/social#minori), so come verranno usate le mie foto, i miei video e i contenuti che realizzerò, e sono d'accordo. Senza questa casella le autorizzazioni non si attivano.»
- Niente caselle foto/video, cessione o comunicazioni: le sceglie il genitore dal link.
- Messaggio finale dopo l'invio: «Abbiamo inviato un'email a [email genitore]. La candidatura sarà valida dopo la sua conferma.»

### 3.4 Pagina del genitore di contatto `/genitore/[token]`
Il link è monouso: il token è salvato in hash e vale 60 giorni. Dopo 14 giorni senza risposta parte **un solo** promemoria. La pagina mostra il riepilogo della candidatura (nome, data di nascita, ruolo) e i link a privacy, informativa minori, liberatoria e condizioni. Caselle, tutte non preselezionate:
- `G1` (obbligatoria): «Dichiaro di essere genitore o tutore di [nome del minore] e di esercitare la responsabilità genitoriale.»
- `G3_confirm` (obbligatoria): conferma o correzione della scelta G3 fatta dal minore. Se si dichiara unico esercente, compare la dichiarazione obbligatoria: «Dichiaro di essere l'unico esercente la responsabilità genitoriale (l'altro genitore è deceduto, decaduto o sospeso dalla responsabilità, non ha riconosciuto il figlio, oppure un provvedimento del giudice mi attribuisce in via esclusiva anche le decisioni di maggiore interesse). So che il solo affidamento esclusivo non basta.»
- `guardianPrivacyRead` (obbligatoria): «Ho letto l'informativa privacy e l'informativa per minori.»
- `guardianTermsAccepted` (obbligatoria): «Autorizzo la candidatura di mio/a figlio/a allo staff volontario della Leonessa Cup e accetto per suo conto le condizioni (versione 1.0).»
- I cinque usi foto e video `media_*`, facoltativi, con i testi della Sezione B: «Autorizzo ESL a pubblicare foto e video in cui compare il/la partecipante, con il suo nome e l'iniziale del cognome, per: …».
- `fullSurname` (facoltativa): «Autorizzo l'indicazione del cognome completo nelle didascalie.»
- `rightsAssignment`, obbligatoria solo per i ruoli Foto, Interviste, Giornale e Social: «Per conto di mio/a figlio/a cedo a ESL, a titolo gratuito, i diritti di utilizzazione economica sui contenuti che realizzerà come staff, con facoltà di sublicenza ai media partner di ESL, nei termini dell'art. 8 delle condizioni. I diritti morali restano salvi.» Se il genitore non la spunta, il ruolo va cambiato dall'admin.
- Sotto: «Le autorizzazioni su foto, video, cognome completo e cessione dei diritti diventano attive dopo la conferma dell'altro genitore, salvo che lei sia l'unico esercente. Può revocarle in qualsiasi momento.»

### 3.5 Email e pagina dell'altro genitore (C1) `/genitore/conferma/[token]`
Si inviano solo se G3 = «c'è un altro genitore», dopo la conferma del primo. Token monouso, valido 60 giorni, un solo promemoria a 14 giorni.

**Oggetto:** Conferma le scelte per la candidatura di [nome del minore] allo staff della Leonessa Cup
**Testo:** «Gentile genitore, [nome e cognome del primo genitore] ha autorizzato la candidatura di [nome del minore] allo staff volontario della Leonessa Cup [edizione], a [luogo], dal [data] al [data], nel ruolo di [ruolo], e ha fatto queste scelte: [riepilogo: ogni uso foto/video sì/no, cognome completo sì/no, cessione dei diritti sui contenuti sì/no]. Può leggere l'informativa, l'informativa per minori, la liberatoria e le condizioni ai link seguenti. Informativa per lei (art. 14 GDPR): il titolare del trattamento è ESL European Students League S.r.l., Corso Vinzaglio 24, 10121 Torino, privacy@legacalciostudenti.it. Il suo nome e la sua email ci sono stati forniti da [nome del minore / primo genitore]. Li usiamo solo per questa conferma e per comunicazioni di servizio sull'evento (art. 6.1.b GDPR): se conferma, per 24 mesi dalla fine della stagione, altrimenti li cancelliamo dopo 60 giorni. Può esercitare i diritti degli artt. 15–22 GDPR scrivendo a privacy@legacalciostudenti.it. Per rendere attive le autorizzazioni serve anche la sua conferma. Se non conferma, [nome del minore] può comunque far parte dello staff, ma non verrà pubblicato/a in foto e video in modo riconoscibile e non potrà svolgere i ruoli Foto, Interviste, Giornale o Social.»
Pulsante: **Confermo le scelte sopra indicate** (registra `C1 = true`). Link secondario: «Non sono d'accordo con una o più scelte», che non conferma e invita a scrivere a privacy@legacalciostudenti.it.

### 3.6 Stato derivato (calcolato sul server, mai spuntato a mano)
- `applicationStatus`:
  - `pending_guardian` per un minore senza G1;
  - `submitted` per un maggiorenne, o per un minore con G1;
  - poi `accepted` o `rejected`, decisi dall'admin.
- `publicationFlags`: per ogni uso `media_*`, `fullSurname` e `rightsAssignment`, il flag è **attivo** se:
  - maggiorenne: la casella è `true` e non revocata;
  - minore: la casella del genitore è `true`, `G16 = true`, `G1 = true`, c'è `C1 = true` oppure unico esercente, e nessuna revoca.
- Il pannello admin mostra per ogni candidato:
  - i chip «In attesa del genitore» e «In attesa dell'altro genitore», come su LCS;
  - lo stato dei flag («Canali», «Promo», «Sponsor», «Stampa», «Interviste», «Cognome», «Diritti»);
  - un blocco che impedisce di accettare un minore nei ruoli Cassa o Sicurezza, o nei ruoli media senza `rightsAssignment` attivo.

Aggiorna la validazione client e server di `/api/staff` e il riepilogo del passo «Privacy». Togli il controllo «`mediaConsent !== null`».

---

## 4) DATABASE

Usa una migrazione, se il progetto ne usa una.

**Candidature** (tabella esistente). Aggiungi: `birthDate`, `ageBand`, `ageDeclaration`, `applicationStatus`, `guardianFirstName`, `guardianLastName`, `guardianRelation`, `guardianEmail`, `guardianPhone`, `g3` (`other_parent` | `sole_holder`), `secondGuardianFirstName`, `secondGuardianLastName`, `secondGuardianEmail`. I dati del secondo genitore vanno cancellati a 60 giorni se C1 non arriva.

**`staff_consents`** (nuova). Ogni casella mostrata produce una riga, anche se non è stata spuntata:
- `application_id`, `key` (es. `privacyRead`, `media_press`, `G1`, `G16`, `C1`, `rightsAssignment`), `value`;
- `actor`: `candidate` | `guardian1` | `guardian2` | `admin`;
- `document` (`privacy` | `privacy_minori` | `social` | `termini`) e `document_version`;
- `text_hash`: SHA-256 del testo esatto della casella;
- `created_at` (UTC);
- `ip` e `user_agent`, **solo se il progetto li registra già** o li ricevi dagli header Vercel. Usa l'IP in hash o troncato se il resto del codice non lo usa in chiaro;
- `revoked_at`, `revoked_by` (`candidate` | `guardian1` | `guardian2` | `admin`), `revocation_note`.

**`staff_tokens`** (nuova): `application_id`, `purpose` (`guardian1` | `guardian2` | `revoke`), `token_hash`, `expires_at` (+60 giorni), `used_at`, `reminder_sent_at`.

**Revoca**:
- nel pannello admin, l'azione «Registra revoca» per ogni consenso facoltativo, con `revoked_by` e una nota;
- se c'è il servizio email, l'email di conferma (al maggiorenne o ai genitori) contiene il link `/revoca/[token]` per revocare i singoli usi. Per i minori basta la revoca di uno solo dei genitori.
La revoca compila `revoked_at` e non cancella la riga. La cessione dei diritti (`rightsAssignment`) non è revocabile per i contenuti già realizzati: nella pagina di revoca va spiegato.

**Candidature già inviate**: non vanno modificate. Restano legate a privacy v1.1 e social v1.0. Il vecchio `mediaConsent = true` vale solo come `media_channels` e va mostrato nell'admin come «consenso v1.0 (solo canali ufficiali)». Queste candidature non hanno `rightsAssignment`: se la persona ha un ruolo media, va chiesto con una nuova accettazione.

---

## 5) LINK E FOOTER

- Su tutte le pagine (form, legali, genitore, revoca) aggiungi un footer: «ESL European Students League S.r.l. · P.IVA IT12974200011 · Privacy · Informativa minori · Liberatoria · Condizioni · Cookie · privacy@legacalciostudenti.it».
- Nell'header del form aggiungi «Condizioni» accanto a «Privacy» e «Riprese».
- Nel passo «Privacy», i box «Leggi prima di inviare» diventano: Informativa privacy (obbligatoria), Informativa minori (solo minorenni), Condizioni (obbligatoria) e Liberatoria foto e video (facoltativa).

---

## 6) VINCOLI

- Non modificare grafica, autenticazione admin, deploy e domini oltre quanto richiesto.
- Non attivare analytics, pixel o servizi nuovi, salvo l'eventuale servizio email già previsto (punto 1).
- Non cancellare né riscrivere candidature esistenti.
- Non inventare dati: usa segnaposto `[ ]`, `[DA VERIFICARE]` o `[DA DECIDERE]`.
- Tutti i testi sono bozze. In ambiente non di produzione mostra in cima a ogni pagina legale la nota «Bozza DA VALIDARE LEGALMENTE».
- Crea `docs/LEGAL_OPEN_POINTS.md` (sezione 7).

---

## 7) `docs/LEGAL_OPEN_POINTS.md`

**Decisioni già prese dal titolare** (da riportare così):
- Staff volontario e gratuito.
- Casellario giudiziale non richiesto. Restano le regole di condotta sulla tutela dei minori (art. 7 delle condizioni).
- Ammessi i 16–17enni, con conferma dei genitori e regole LCS (entrambi i genitori per immagini, cognome e cessione dei diritti, salvo unico esercente).
- I diritti sui contenuti prodotti dallo staff vanno a ESL, con sublicenza ai media partner, a titolo gratuito e con i diritti morali salvi.
- Contatti privacy: quelli della Lega Calcio Studenti.

**Punti aperti**
1. Rimborso spese: se è previsto, con quale massimale e quali modalità.
2. Assicurazione RC e infortuni dei volontari: polizza e compagnia.
3. Volontariato presso una S.r.l. (non è un ente del Terzo settore, D.lgs. 117/2017): verificare con il consulente del lavoro che benefit, turni e direttive non portino a riqualificare l'attività come lavoro.
4. Minori nello staff: se la candidatura debba richiedere entrambi i genitori (oggi basta il contatto); orario massimo dei turni; se la cessione gratuita dei diritti del minore richieda l'autorizzazione del giudice tutelare (art. 320 c.c.) o vada ridotta a una licenza non esclusiva.
5. Ruoli Cassa e Sicurezza riservati ai maggiorenni: scelta proposta, da confermare.
6. Cessione dei diritti: esclusiva e durata piena, oppure licenza a tempo.
7. Conservazione delle candidature non accolte: proposta 12 mesi.
8. Regione Vercel, fornitori (DB, email), DPA art. 28 e trasferimenti USA.
9. Compiti effettivi del ruolo Sicurezza.
10. Sede e date dell'evento (segnaposto).
11. Validazione legale di tutti i testi.

---

## 8) REPORT FINALE ATTESO

1. I file creati o modificati e la migrazione.
2. Cosa hai trovato al punto 1: storage, IP e user agent, regione Vercel, fornitori, servizio email, cookie.
3. I segnaposto rimasti in ogni pagina.
4. Come hai gestito le candidature già inviate.
5. Cosa non hai potuto fare (es. email ai genitori) e perché.
6. Come verificarlo in locale:
   - maggiorenne con le sole caselle obbligatorie;
   - maggiorenne con ruolo Foto e cessione;
   - minorenne con un solo genitore, unico esercente;
   - minorenne con due genitori: prima del C1 non è pubblicabile, dopo il C1 sì;
   - minorenne che prova Cassa: bloccato;
   - candidato di 15 anni: bloccato;
   - revoca da admin e dal link.
