# Prompt per Cursor — Completamento del sito www.leonessacup.app (v2, con le risposte del titolare)

> Incolla tutto quello che segue (dalla riga «CONTESTO» in giù) in Cursor, nel repository del sito **www.leonessacup.app**.
> Questo prompt **non ripete** il lavoro già fatto con il prompt precedente (informative v2.0, liberatoria v2.0, condizioni, cookie, flusso genitori nel form): elenca solo ciò che dall'audit del sito pubblico (19 novembre 2026) risulta ancora mancante o da sistemare, con i dati forniti dal titolare.

---

## CONTESTO

Il sito www.leonessacup.app (Next.js su Vercel) contiene il form pubblico «Candidatura staff» della Leonessa Cup, organizzata da **ESL European Students League S.r.l.**, Corso Vinzaglio 24, 10121 Torino, P.IVA IT12974200011, C.F. 12974200011 (la stessa società della Lega Calcio Studenti). Contatti: privacy@legacalciostudenti.it, PEC europeanstudentsleague@legalmail.it, segreteria support@legacalciostudenti.it. Email della Leonessa Cup: **leonessacup@gmail.com**.

**Decisioni del titolare (definitive, da applicare):**
- Staff **volontario e totalmente gratuito**: **nessun rimborso spese**, in nessuna forma.
- Casellario giudiziale **non richiesto**.
- Ammessi i **16–17enni** con conferma dei genitori; per loro **turni di massimo 3 ore**; ruoli **Cassa e Sicurezza solo maggiorenni** (confermato).
- Diritti sui contenuti prodotti dallo staff: **cessione in esclusiva** a ESL, con sublicenza ai suoi eventuali media partner, **anche per i minori** (con il consenso dei genitori già previsto).
- Candidature non accolte o non confermate: conservate **12 mesi** dalla fine dell'edizione.
- Evento: **Leonessa Cup 2027**, **Brescia**, **Centro Sportivo Mario Rigamonti**. **Date non ancora definite** e **nessuna scadenza** per le candidature.
- Contatti privacy della **Lega Calcio Studenti**.

**Già online e funzionante (non rifarlo):**
- `/privacy` v2.0, `/privacy/minori` v1.0, `/social` v2.0 (Sezioni A e B, ancora `#minori`), `/termini` v1.0 (ancora `#diritti`), `/cookie` v1.0, `/liberatorie` → 308 a `/social`, archivi `/privacy/v/1.1` e `/social/v/1.0`.
- Rotte `/genitore/[token]`, `/genitore/conferma/[token]`, `/revoca/[token]` (con token non valido mostrano «Link non utilizzabile»), `/grazie`, `/admin/login`.
- Form: data di nascita + fascia d'età con controllo di coerenza, blocco sotto i 16 anni, Cassa/Sicurezza «Riservato ai maggiorenni», passo genitore (contatto, rapporto, G3, altro genitore obbligatorio se indicato, email del genitore diversa da quella del candidato), 6 passi su mobile per i minori; caselle maggiorenni (privacyRead, termsAccepted, cessione diritti solo per Foto/Interviste/Giornale/Social, 5 usi foto/video, comunicazioni) e minorenni (privacyRead, termsRead, G16); nessuna casella preselezionata.
- Footer legale su tutte le pagine; header con Privacy, Condizioni, Riprese.

Regole di lavoro:
- Non toccare grafica, deploy e domini oltre quanto richiesto qui. Modifica i testi legali **solo** nei punti indicati.
- Non inventare dati. I pochi dati ancora mancanti restano segnaposto evidenziati (elenco in fondo), letti da **un unico file di configurazione** (punto 2).
- Non cancellare né riscrivere candidature esistenti.
- Ogni testo legale modificato sale di versione minore (es. privacy 2.1, minori 1.1, social 2.1, termini 1.1): la versione precedente va archiviata in sola lettura su `/…/v/<versione>` come già fatto per privacy 1.1 e social 1.0, e le nuove righe di `staff_consents` usano la nuova `document_version`. Fai **un solo** salto di versione per documento, raccogliendo tutte le modifiche di questo prompt.
- Alla fine aggiorna `docs/LEGAL_OPEN_POINTS.md` (crealo se non esiste) e consegna il report richiesto al punto 13.

---

## PRIORITÀ 1 — LEGALE E CONFORMITÀ

### 1. Attivare l'invio email (oggi il flusso dei minori è bloccato)
**Cosa si vede online.** L'informativa privacy (§5 e §8) dice: «Nel repository non c'è un servizio email configurato» e «il link è predisposto, ma l'invio email non è attivo». La liberatoria ripete «dal link di revoca, quando l'email è attiva». Nel bundle del form, dopo l'invio di un minore, se `emailSent` è falso compare: «L'invio email non è attivo: senza email al genitore la candidatura di un minore non può essere confermata.»
**Conseguenza.** Nessun genitore riceve il link `/genitore/[token]`, nessun secondo genitore riceve il C1, non partono promemoria né link di revoca: **nessun candidato di 16–17 anni può essere confermato** e nessuna autorizzazione foto/video/cessione dei minori può diventare attiva.

**Come inviare: mittente leonessacup@gmail.com.**
Un indirizzo `@gmail.com` **non può** essere usato come mittente («From») tramite un provider transazionale (Resend, SendGrid, Postmark…): il dominio gmail.com non è verificabile e i messaggi fallirebbero SPF/DKIM/DMARC (rifiutati o in spam). Scelta da implementare:
- **Soluzione adottata ora: Gmail SMTP con password per le app.** Usa Nodemailer con `smtp.gmail.com:465` (SSL), utente `leonessacup@gmail.com` e una **password per le app** (richiede la verifica in due passaggi sull'account Google). Variabili: `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, `SMTP_USER=leonessacup@gmail.com`, `SMTP_PASS` (password per le app, mai nel repo), `EMAIL_FROM="Leonessa Cup <leonessacup@gmail.com>"`, `EMAIL_REPLY_TO=leonessacup@gmail.com`, `GUARDIAN_EMAIL_ENABLED=true`. Limite di Gmail: circa **500 destinatari al giorno** (account gratuito), più che sufficiente per le candidature staff. Metti in coda gli invii (tabella `email_outbox` con stato e tentativi, ritrasmissione con backoff) così un errore temporaneo o il raggiungimento del limite non perde email.
- **In futuro, se servono volumi maggiori o maggiore deliverability:** provider transazionale con un **dominio verificato** (es. `noreply@leonessacup.app` con SPF/DKIM/DMARC) e `leonessacup@gmail.com` come **Reply-To**. Scrivi il modulo di invio dietro un'interfaccia (`sendEmail()`) così il passaggio richiede solo di cambiare le variabili d'ambiente.

**Email da inviare** (testi in italiano, HTML + testo semplice, footer con dati ESL e privacy@legacalciostudenti.it):
- **Genitore di contatto**: link monouso `/genitore/[token]` (60 giorni), riepilogo candidatura, link a privacy, informativa minori, liberatoria, condizioni.
- **Altro genitore (C1)**: solo se G3 = «c'è un altro genitore», dopo la conferma del primo; contiene l'informativa art. 14 GDPR già prevista nel prompt precedente (titolare, fonte dei dati, finalità, conservazione 60 giorni se non conferma, diritti). Per l'evento usa «Leonessa Cup 2027, Brescia, Centro Sportivo Mario Rigamonti» e, per le date, la stessa riga del punto 4 (oggi «date in via di definizione»): **nessuna data scritta a mano**.
- **Promemoria**: uno solo dopo 14 giorni senza risposta, per ciascun token (Vercel Cron o equivalente; registra `reminder_sent_at`).
- **Conferma al maggiorenne** e **conferma ai genitori** dopo l'attivazione, con il riepilogo delle scelte e il link `/revoca/[token]`.
- **Cancellazione automatica** a 60 giorni dei dati dell'altro genitore se il C1 non arriva (job pianificato).

Nel pannello admin: pulsante «Reinvia email al genitore» (rigenera il token, invalida il precedente) e stato dell'ultimo invio (in coda / inviata / errore).

**Testi da aggiornare quando l'email è attiva** (senza cambiare altro):
- `/privacy` §5 (destinatari): sostituisci `[email: DA VERIFICARE]` e «Nel repository non c'è un servizio email configurato» con: «servizio email **Google (Gmail)**, fornito da Google Ireland Limited, usato per inviare le email di servizio (conferme dei genitori, promemoria, revoche) dall'indirizzo leonessacup@gmail.com». Se in futuro si passa a un provider transazionale, aggiorna il nome qui.
- `/privacy` §6 (trasferimenti): aggiungi Google tra i fornitori che possono comportare trasferimenti verso gli Stati Uniti (Google LLC), con EU-U.S. Data Privacy Framework e/o clausole contrattuali standard.
- `/privacy` §8: togli «il link è predisposto, ma l'invio email non è attivo».
- `/social` Sezioni A e B: togli «, quando l'email è attiva».
- Messaggio dopo l'invio del minore: resta solo «Abbiamo inviato un'email a […]. La candidatura sarà valida dopo la sua conferma.»
- In `docs/LEGAL_OPEN_POINTS.md` annota: con un account Gmail gratuito Google non offre un accordo di trattamento dati (art. 28 GDPR) per il servizio email; per formalizzarlo serve Google Workspace (Cloud Data Processing Addendum) oppure il passaggio a un provider con dominio verificato e DPA.

**Criteri di accettazione.**
- In locale/preview, una candidatura minorenne con due genitori genera: email 1 → conferma G1 → email C1 → conferma C1 → flag di pubblicazione attivi; prima del C1 i flag restano inattivi.
- Con «unico esercente» i flag si attivano dopo G1, senza C1.
- Le email arrivano da `Leonessa Cup <leonessacup@gmail.com>` e superano SPF/DKIM/DMARC (controlla le intestazioni «Authentication-Results» su una casella di prova).
- Il link usato una seconda volta mostra «Link non utilizzabile»; il link scaduto (oltre 60 giorni) idem.
- Nessuna pagina pubblica contiene più le frasi «l'invio email non è attivo» o «quando l'email è attiva».
- Se `GUARDIAN_EMAIL_ENABLED` non è `true` o mancano le variabili SMTP in produzione, l'avvio scrive un warning evidente nei log.

### 2. File di configurazione unico, segnaposto e note di bozza
**Cosa si vede online.** Su `/privacy`, `/privacy/minori`, `/social`, `/termini`, `/cookie` compare in cima la nota «I testi evidenziati in verde vanno sostituiti con i dati reali del Titolare prima della pubblicazione. Questa è una bozza…» e nel testo restano segnaposto e diciture «DA VALIDARE / DA DECIDERE / DA VERIFICARE / DA COMPLETARE».

**2.1 Crea `src/config/legal.ts`** (o il percorso equivalente del progetto), unica fonte per pagine legali, form ed email:

```ts
export const LEGAL = {
  event: {
    edition: '2027',
    city: 'Brescia',
    venue: 'Centro Sportivo Mario Rigamonti',
    startDate: null as string | null,           // ISO 'YYYY-MM-DD', da aggiungere quando decise
    endDate: null as string | null,
    applicationsCloseAt: null as string | null, // nessuna scadenza finché è null
  },
  email: {
    provider: 'gmail_smtp',                     // 'gmail_smtp' | 'transactional'
    from: 'Leonessa Cup <leonessacup@gmail.com>',
    replyTo: 'leonessacup@gmail.com',
  },
  volunteering: {
    expenseReimbursement: false,                // nessun rimborso spese
    insurance: null as string | null,           // APERTO: compagnia e n. polizza RC/infortuni
    minorMaxShiftHours: 3,
    adultsOnlyRoles: ['Cassa', 'Sicurezza'],
    securityRoleDuties: null as string | null,  // APERTO: compiti del ruolo Sicurezza
  },
  rights: {
    transfer: 'exclusive',                      // cessione in esclusiva, anche per i minori
  },
  retention: {
    rejectedApplicationsMonths: 12,
  },
  channels: {
    extra: null as string[] | null,             // APERTO: altri canali ufficiali oltre IG/TikTok/sito
  },
  ogImage: null as string | null,               // APERTO, facoltativo
  showEventSection: false,                      // APERTO, facoltativo (punto 12)
};
```

Ogni pagina legale e ogni email legge da qui. Se un valore è `null`, la pagina mostra il segnaposto evidenziato come oggi (tranne le date: vedi punto 4).

**2.2 Modifiche ai testi legali con i dati del titolare** (un solo salto di versione per documento):

- **`/privacy` §2 (Dati trattati e fonte)**: sostituisci «per la Leonessa Cup [edizione/anno], che si svolge a [comune e impianto] dal [data inizio] al [data fine]» con «per la Leonessa Cup 2027, che si svolge a Brescia, presso il Centro Sportivo Mario Rigamonti, {riga date}», dove {riga date} è la frase del punto 4 (oggi «in date in via di definizione»). Nella voce «Se entri nello staff» togli «eventuali rimborsi spese».
- **`/privacy` §3, finalità B**: diventa «Adempimenti amministrativi e assicurativi relativi all'attività dei volontari.» (togli «rimborsi spese»).
- **`/privacy` §4**: sostituisci «DA VERIFICARE: non risulta una cifratura aggiuntiva…» con quello che c'è davvero (verificalo nel progetto: es. cifratura a riposo del database Neon, connessioni TLS).
- **`/privacy` §5**: regione Vercel verificata nel progetto (`vercel.json` → `regions` o impostazioni), email come al punto 1; sulla nomina ex art. 28 riporta la situazione reale e sposta il resto in `LEGAL_OPEN_POINTS.md`.
- **`/privacy` §7**: «Candidature non accolte o non confermate dai genitori: **12 mesi** dalla fine dell'edizione» (togli «DA VALIDARE LEGALMENTE»). Riga «Documenti amministrativi, assicurativi e rimborsi»: diventa «Documenti amministrativi e assicurativi».
- **`/privacy/minori`, «Tutele per i minori nello staff»**: sostituisci «Turni compatibili con l'età e con gli impegni scolastici, sempre con un referente adulto di ESL. DA DECIDERE: orario massimo…» con «Turni di **massimo 3 ore**, compatibili con l'età e con gli impegni scolastici, sempre con un referente adulto di ESL.» La riga «Niente ruoli Cassa e Sicurezza» resta.
- **`/termini` art. 4 (Volontariato gratuito)**: sostituisci la frase «Rimborso spese: DA DECIDERE…» e «Non sono ammessi rimborsi forfettari.» con: «**Non è previsto alcun rimborso spese**, né forfettario né a piè di lista: le spese sostenute per partecipare (ad esempio viaggio e vitto) restano a carico del volontario.» Mantieni la frase sui materiali dello staff (maglietta, accredito, pasto durante i turni) che non costituiscono compenso.
- **`/termini` art. 5 (Assicurazione)**: finché `insurance` è `null`, **non promettere alcuna copertura**. Sostituisci tutto l'articolo con: «ESL comunica ai volontari selezionati, prima dell'inizio dell'attività, le eventuali coperture assicurative attive per lo staff.» e mostra accanto, evidenziato, il segnaposto «[polizza RC e infortuni volontari: DA COMPLETARE]». Togli «La partecipazione è subordinata all'attivazione della copertura prevista». Quando `insurance` viene compilato, il testo diventa: «ESL assicura i volontari selezionati per responsabilità civile verso terzi e infortuni durante l'attività, con polizza {insurance}; le condizioni sono disponibili su richiesta.»
- **`/termini` art. 3 e art. 11**: Cassa e Sicurezza riservati ai maggiorenni è confermato: lascia il testo. In art. 11 resta «DA VERIFICARE con ESL i compiti previsti» finché `securityRoleDuties` è `null`.
- **`/termini` art. 7 (Tutela dei minori)**: «Gli staff minorenni svolgono turni di massimo 3 ore, compatibili con l'età, sempre con un referente adulto di ESL.»
- **`/termini` art. 8.2 (Cessione)**: la cessione in esclusiva è confermata. Togli «DA VALIDARE LEGALMENTE: esclusiva e durata; in alternativa, licenza esclusiva di [N] anni.»
- **`/termini` art. 8.6 (Minori)**: la cessione in esclusiva vale anche per i minori, con il consenso dei genitori già previsto (G1, C1, G16). Togli dal testo pubblico «DA VALIDARE LEGALMENTE: se la cessione gratuita… In alternativa, licenza non esclusiva gratuita limitata agli usi dell'evento.» e sposta l'avvertenza in `LEGAL_OPEN_POINTS.md` (vedi 2.4).
- **Form**: nelle caselle di cessione dei diritti (maggiorenni e genitore) il testo resta «Cedo a ESL, a titolo gratuito, …» con l'indicazione «in esclusiva» se non c'è già.

**2.3 Note di bozza e controllo automatico.**
1. Script `npm run legal:check` che elenca segnaposto `[ … ]` e diciture «DA VALIDARE / DA DECIDERE / DA VERIFICARE / DA COMPLETARE» ancora presenti in pagine ed email, con file e riga. In CI, sul ramo di produzione, stampa un warning (non blocca il deploy).
2. La nota «I testi evidenziati in verde…» resta visibile finché `legal:check` trova almeno un segnaposto; sparisce da sola quando non ne resta nessuno.
3. Le diciture «DA VALIDARE LEGALMENTE» rimaste spariscono solo con `LEGAL_REVIEW_DONE=true`, da impostare dopo la revisione del legale.
4. La riga sulle date del punto 4 **non** è un segnaposto: non deve far comparire la nota di bozza.

**2.4 `docs/LEGAL_OPEN_POINTS.md`**: aggiorna con le decisioni sopra (nessun rimborso, turni minori 3 ore, Cassa/Sicurezza solo maggiorenni, cessione in esclusiva anche per i minori, conservazione 12 mesi, evento Brescia 2027 senza date) e lascia aperti solo:
- **Polizza RC e infortuni dei volontari**: non ancora indicata. Raccomandazione: stipularla prima dell'evento (ESL è una S.r.l. e non beneficia delle coperture previste per gli enti del Terzo settore); i testi non promettono coperture finché non c'è.
- **Cessione in esclusiva e gratuita dei diritti dei minori**: verificare con un legale se rientra nell'ordinaria amministrazione o richiede l'autorizzazione del giudice tutelare (art. 320 c.c.).
- **Turni dei minori**: confermato il massimo di 3 ore per turno; valutare con il titolare se fissare anche un orario serale di fine turno.
- Compiti effettivi del ruolo Sicurezza.
- Altri canali social ufficiali.
- Accordo art. 28 GDPR con Google per Gmail (punto 1) e con Vercel/Neon.
- Volontariato presso una S.r.l.: verifica con il consulente del lavoro (già annotata).
- Date dell'evento (da inserire in `legal.ts` quando decise).
- Revisione legale di tutti i testi → `LEGAL_REVIEW_DONE=true`.

**Criteri di accettazione.**
- Nessuna pagina pubblica contiene più: `[edizione/anno]`, `[comune e impianto]`, `[data inizio]`, `[data fine]`, «DA DECIDERE», riferimenti a rimborsi spese (salvo la frase «Non è previsto alcun rimborso spese»), la formula «La partecipazione è subordinata all'attivazione della copertura», le alternative alla cessione in esclusiva.
- `npm run legal:check` elenca solo i punti ancora aperti (polizza, compiti Sicurezza, altri canali, diciture «DA VALIDARE LEGALMENTE» generali).
- Archivi delle versioni precedenti consultabili e link «versioni precedenti» aggiornati.


### 3. Candidature inviate prima della v2.0 (archivi con segnaposto)
**Cosa si vede online.** `/privacy/v/1.1` e `/social/v/1.0`, cioè i testi «in vigore per le candidature inviate prima della versione 2.0», contengono ancora `[DA COMPILARE: denominazione del Titolare]`, `[DA COMPILARE: Codice Fiscale]`, `[DA COMPILARE: email per richieste privacy]`, ecc. Chi si è candidato prima del 18 novembre 2026 ha quindi ricevuto un'informativa **senza l'identità del titolare né i contatti** (art. 13.1.a GDPR). Inoltre l'intestazione mostra «Versione del 18 novembre 2026» mentre il testo dice «Ultimo aggiornamento: 18 settembre 2026».

**Cosa fare.**
1. Non modificare il testo archiviato (è la prova di cosa è stato mostrato). Correggi solo l'intestazione: «Versione del» deve indicare la data originale (18 settembre 2026) e aggiungi sotto il titolo una nota: «Questo testo conteneva segnaposto non compilati. Il titolare del trattamento è ESL European Students League S.r.l., Corso Vinzaglio 24, 10121 Torino, P.IVA IT12974200011, privacy@legacalciostudenti.it. Le candidature inviate con questa versione sono state reinformate con l'informativa 2.0.»
2. Nel pannello admin aggiungi il filtro «Candidature pre-v2.0» e l'azione massiva **«Invia informativa aggiornata»** (richiede il punto 1): email con il link a `/privacy` v2.0, `/social` v2.0 e `/termini`, e un link monouso per: (a) prendere visione della nuova informativa, (b) rinnovare le scelte foto/video per i singoli usi, (c) per chi ha un ruolo media, accettare la cessione dei diritti. Registra le nuove scelte in `staff_consents` con la versione 2.x. **Non inviarla automaticamente**: l'invio lo lancia il titolare dal pannello.
3. Fino al rinnovo, il vecchio `mediaConsent = true` vale solo come «consenso v1.0 (solo canali ufficiali)», come già previsto.

**Criteri di accettazione.** Gli archivi mostrano la data originale e la nota; l'admin vede quante candidature pre-v2.0 esistono, quante sono state reinformate e quante hanno rinnovato le scelte.


### 4. Dati dell'evento: Brescia 2027, date in via di definizione
**Cosa si vede online.** In nessuna pagina compaiono edizione, luogo e date della Leonessa Cup: l'informativa §2 ha i segnaposto e il form non dice dove si svolge l'attività richiesta ai volontari.

**Cosa fare.**
1. Sotto il titolo del form mostra: «**Leonessa Cup 2027 · Brescia · Centro Sportivo Mario Rigamonti** · Date in via di definizione», con i valori presi da `LEGAL.event`.
2. Helper unico `formatEventDates(event)` usato da form, informativa ed email:
   - `startDate` e `endDate` `null` → «Date in via di definizione» (nel testo legale: «in date in via di definizione»);
   - solo `startDate` → «dal {data}»; entrambe → «dal {data} al {data}» (formato italiano, es. «12 aprile 2027»).
   I testi non devono contenere date scritte a mano: quando il titolare inserirà le date in `legal.ts` compariranno ovunque senza altre modifiche (e senza nuova versione dei testi legali, perché la data dell'evento non cambia ciò a cui si è acconsentito).
3. **Nessuna logica di chiusura delle candidature** finché `applicationsCloseAt` è `null`: il form resta aperto e `POST /api/staff` accetta gli invii. Solo se in futuro `applicationsCloseAt` viene valorizzato, dopo quella data il form mostra «Candidature chiuse» e l'API risponde 409. Non usare `endDate` per chiudere il form.

**Criteri di accettazione.**
- Con le date `null`: form, informativa §2 ed email C1 mostrano Brescia, Centro Sportivo Mario Rigamonti, 2027 e «date in via di definizione»; il form accetta invii.
- Impostando `startDate`/`endDate` di prova in locale, le date compaiono in tutti e tre i punti; impostando `applicationsCloseAt` nel passato il form si chiude; riportandolo a `null` si riapre.


### 5. Sicurezza (art. 32 GDPR)
**Cosa si vede online.** La risposta HTTP delle pagine non ha intestazioni di sicurezza (`Content-Security-Policy`, `X-Frame-Options`/`frame-ancestors`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`); c'è solo HSTS. Il link «Admin» è nell'header pubblico del form (desktop). Le pagine con token (`/genitore/...`, `/revoca/...`) rispondono 200 anche con token non valido e non hanno `noindex`.

**Cosa fare.**
1. In `next.config` (headers) o middleware aggiungi: CSP restrittiva compatibile con Next (self + font locali, nessun dominio terzo), `frame-ancestors 'none'`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` (e `no-referrer` sulle pagine con token, per non far trapelare il token), `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
2. Togli il link «Admin» dall'header pubblico (resta raggiungibile digitando `/admin`).
3. Pagine con token: `<meta name="robots" content="noindex,nofollow">`, `Cache-Control: no-store`; con token non valido o scaduto rispondi con stato 404 (o 410 se scaduto), mantenendo la pagina «Link non utilizzabile».
4. Verifica che `/admin/login` e `POST /api/staff` abbiano un limite di tentativi per IP (es. 5 login/15 min, 10 invii/ora); se manca, aggiungilo. Valuta un controllo anti-bot non invasivo sul form (honeypot + tempo minimo di compilazione), senza servizi terzi che richiedano consenso.
5. Per il testo del §4 dell'informativa privacy vedi il punto 2.2.

**Criteri di accettazione.** `curl -I https://www.leonessacup.app/privacy` mostra le cinque intestazioni; l'header pubblico non contiene «Admin»; `curl -I /genitore/abc` restituisce 404 con `noindex`; l'undicesimo invio in un'ora dallo stesso IP riceve 429.

---


## PRIORITÀ 2 — FUNZIONALITÀ

### 6. Pagina 404 in inglese
**Cosa si vede online.** Ogni rotta inesistente (es. `/contatti`, `/staff`, `/regolamento`) mostra la pagina predefinita di Next «404: This page could not be found.», in inglese e senza header né footer legale.
**Cosa fare.** Crea `app/not-found.tsx` in italiano, con lo stesso layout del sito, il testo «Pagina non trovata», il pulsante «Torna al form» e il footer legale.
**Criteri.** `/contatti` restituisce 404 con la pagina italiana e il footer.

### 7. Pagina di ringraziamento
**Cosa si vede online.** `/grazie` aperta direttamente mostra sempre «Candidatura inviata», anche senza invio.
**Cosa fare.** Se non c'è la notifica in `sessionStorage`, reindirizza al form; per i minori con email attiva mostra il testo del punto 1; aggiungi `noindex`.
**Criteri.** Aprendo `/grazie` senza aver inviato si torna al form.

### 8. Etichette e accessibilità del form
**Cosa si vede online.**
- Header: la voce si chiama «Riprese», mentre footer, box del form e titolo pagina dicono «Liberatoria»; manca «Informativa minori» e «Cookie» nell'header.
- La domanda «Hai partecipato allo staff l'anno scorso?» viene letta due volte dagli screen reader (titolo del gruppo + etichetta).
- Fascia d'età, Sì/No e Ruolo sono pulsanti con `aria-pressed`: per una scelta singola servono `role="radiogroup"` / `role="radio"` con `aria-checked` e navigazione da tastiera con le frecce (oppure veri `<input type="radio">` in un `<fieldset>`).
- Gli errori sono marcati con `aria-invalid`, ma il messaggio «Controlla i campi evidenziati.» non sposta il focus sul primo campo errato.
**Cosa fare.** Rinomina «Riprese» in «Liberatoria»; lascia nell'header le voci principali e metti le altre nel footer (già presenti). Togli il testo duplicato; usa la semantica radio; collega i messaggi d'errore con `aria-describedby`; al submit con errori porta il focus sul primo campo non valido e annuncia il riepilogo con `role="alert"`.
**Criteri.** Navigazione completa da tastiera; lettura con VoiceOver/NVDA senza duplicati; Lighthouse Accessibility ≥ 95 su `/`.

---

## PRIORITÀ 3 — CONTENUTI, SEO E RIFINITURE

### 9. robots.txt e sitemap.xml
**Cosa si vede online.** `/robots.txt` e `/sitemap.xml` danno 404.
**Cosa fare.** `app/robots.ts`: consenti `/`, blocca `/admin`, `/api`, `/genitore`, `/revoca`, `/grazie`; indica la sitemap. `app/sitemap.ts`: `/`, `/privacy`, `/privacy/minori`, `/social`, `/termini`, `/cookie`.
**Criteri.** Entrambe le URL rispondono 200 con contenuto corretto.

### 10. Anteprime social, icone e metadati
**Cosa si vede online.** Nessun tag Open Graph o Twitter (condividendo il link su WhatsApp/Instagram non c'è anteprima); niente `link rel="canonical"`; `/favicon.ico`, `/apple-touch-icon.png` e `/manifest.json` danno 404 (esistono solo `favicon-light.png` e `favicon-dark.png`).
**Cosa fare.** In `layout.tsx` imposta `metadataBase: new URL('https://www.leonessacup.app')`, `alternates.canonical` per pagina, `openGraph` (title, description, `locale: 'it_IT'`, `siteName: 'Leonessa Cup'`, immagine) e `twitter: { card: 'summary_large_image' }`. Crea `app/opengraph-image.tsx` (1200×630, logo + «Candidatura staff · Leonessa Cup 2027 · Brescia») oppure usa `LEGAL.ogImage` se valorizzata. Aggiungi `app/icon.png`/`favicon.ico`, `app/apple-icon.png` (180×180) e `app/manifest.ts` (nome, colori del tema attuale).
**Criteri.** Il debugger di condivisione (es. opengraph.xyz) mostra titolo, descrizione e immagine; `/favicon.ico` e `/apple-touch-icon.png` rispondono 200.

### 11. Footer e contatti
**Cosa si vede online.** Il footer riporta ragione sociale, P.IVA e l'email privacy, ma non la sede legale, la PEC né un contatto per domande sulla candidatura (la segreteria compare solo in fondo a `/termini`); non ci sono link ai profili social ufficiali (citati solo nella liberatoria).
**Cosa fare.** Footer: «ESL European Students League S.r.l. · Corso Vinzaglio 24, 10121 Torino · P.IVA IT12974200011 · PEC europeanstudentsleague@legalmail.it · Info: support@legacalciostudenti.it · Privacy: privacy@legacalciostudenti.it», più le icone Instagram @leonessacup, Instagram @lcsrealemutua, TikTok @leonessacup (link `rel="noopener"`, nessun embed o script esterno). Mantieni i link alle pagine legali.
**Criteri.** Footer completo su tutte le pagine, anche 404 e pagine con token.

### 12. Pagina informativa sull'evento (facoltativa, solo se il titolare la conferma)
Il sito oggi è solo il form staff: non spiega cos'è la Leonessa Cup. Se `LEGAL.showEventSection` è `true`, aggiungi sopra il form un breve blocco «Cos'è la Leonessa Cup» con una descrizione fornita dal titolare (campo `eventDescription` da aggiungere in `legal.ts`), edizione e sede (da `legal.ts`), la riga sulle date del punto 4 e cosa fa ciascun ruolo (campo `roleDescriptions`). Altrimenti salta questo punto.

---

## 13. REPORT FINALE ATTESO
1. File creati o modificati, migrazioni e nuove variabili d'ambiente (senza valori segreti).
2. Configurazione email: conferma dell'invio via Gmail SMTP, esito del test SPF/DKIM/DMARC, comportamento della coda in caso di errore.
3. Dati tecnici trovati: regione Vercel, regione Neon, cifratura, rate limiting già presente o aggiunto.
4. Nuove versioni dei testi legali e relativi archivi.
5. Output di `npm run legal:check` (punti rimasti, pagina per pagina).
6. Quante candidature pre-v2.0 esistono (senza dati personali nel report).
7. Test eseguiti in locale/preview:
   - maggiorenne con sole caselle obbligatorie → email di conferma con link di revoca;
   - maggiorenne ruolo Foto con cessione in esclusiva;
   - minorenne unico esercente → G1 → flag attivi;
   - minorenne con due genitori → G1 → C1 → flag attivi; prima del C1 inattivi;
   - promemoria a 14 giorni e cancellazione a 60 giorni (simulati);
   - token riusato/scaduto → 404/410;
   - date `null` → «Date in via di definizione», form aperto; date e scadenza di prova → comportamento del punto 4;
   - `/contatti` → 404 italiana; `/robots.txt`, `/sitemap.xml`, `/favicon.ico` → 200;
   - intestazioni di sicurezza presenti.
8. Cosa non hai potuto fare e perché.
9. `docs/LEGAL_OPEN_POINTS.md` aggiornato.

---

## PUNTI ANCORA APERTI (da compilare in `legal.ts` o nelle env quando disponibili)

| Voce | Cosa serve | Dove compare | Comportamento finché manca |
|---|---|---|---|
| `event.startDate` / `event.endDate` | date dell'evento | form, `/privacy` §2, email C1 | «Date in via di definizione» |
| `event.applicationsCloseAt` | eventuale scadenza candidature | form, API | nessuna chiusura |
| `volunteering.insurance` | compagnia e n. polizza RC e infortuni volontari (raccomandata) | `/termini` art. 5 | testo neutro, nessuna copertura promessa, segnaposto evidenziato |
| `volunteering.securityRoleDuties` | compiti effettivi del ruolo Sicurezza | `/termini` art. 11 | «DA VERIFICARE» evidenziato |
| `channels.extra` | altri canali ufficiali (Facebook, YouTube…) o «nessuno» | `/social` | segnaposto evidenziato |
| `ogImage` | immagine per le anteprime social (facoltativa) | metadati | immagine generata da `opengraph-image.tsx` |
| `showEventSection` + descrizioni | se mostrare il blocco «Cos'è la Leonessa Cup» (facoltativo) | form (punto 12) | blocco non mostrato |
| `SMTP_PASS` | password per le app dell'account leonessacup@gmail.com (con verifica in due passaggi) | env Vercel | email non inviate, warning nei log |
| `LEGAL_REVIEW_DONE` | `true` solo dopo la revisione del legale | tutte le pagine legali | diciture «DA VALIDARE LEGALMENTE» visibili |
