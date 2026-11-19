# Punti aperti — informative e liberatorie staff Leonessa Cup

Aggiornato il 19 novembre 2026. I testi pubblicati restano da validare legalmente (`LEGAL_REVIEW_DONE` non è `true`).

## Decisioni già prese dal titolare

- Staff volontario e totalmente gratuito: nessun rimborso spese, né forfettario né a piè di lista.
- Casellario giudiziale non richiesto. Restano le regole di condotta sulla tutela dei minori (art. 7 delle condizioni).
- Ammessi i 16–17enni, con conferma dei genitori. Turni di massimo 3 ore. Valutare se fissare anche un orario serale di fine turno.
- Ruoli Cassa e Sicurezza solo maggiorenni, confermato.
- Cessione in esclusiva a ESL, con sublicenza ai media partner, a titolo gratuito, anche per i minori, con il consenso dei genitori già previsto (G1, C1, G16). I diritti morali restano salvi.
- Candidature non accolte o non confermate: 12 mesi dalla fine dell'edizione.
- Evento: Leonessa Cup 2027, Brescia, Centro Sportivo Mario Rigamonti. Date non ancora definite. Nessuna scadenza per le candidature.
- Contatti privacy: quelli della Lega Calcio Studenti.
- Email di servizio: Gmail SMTP, mittente Leonessa Cup &lt;leonessacup@gmail.com&gt;.

## Punti ancora aperti

1. Polizza RC e infortuni dei volontari: non ancora indicata (`volunteering.insurance`). Raccomandazione: stipularla prima dell'evento. ESL è una S.r.l. e non beneficia delle coperture previste per gli enti del Terzo settore. I testi non promettono coperture finché la polizza non c'è.
2. Cessione in esclusiva e gratuita dei diritti dei minori: verificare con un legale se rientra nell'ordinaria amministrazione o richiede l'autorizzazione del giudice tutelare (art. 320 c.c.).
3. Turni dei minori: confermato il massimo di 3 ore per turno; valutare con il titolare se fissare anche un orario serale di fine turno.
4. Compiti effettivi del ruolo Sicurezza (`volunteering.securityRoleDuties`).
5. Altri canali social ufficiali oltre Instagram e TikTok (`channels.extra`).
6. Accordi art. 28 GDPR.
   - Con un account Gmail gratuito Google non offre un accordo di trattamento dati per il servizio email. Per formalizzarlo serve Google Workspace (Cloud Data Processing Addendum) oppure il passaggio a un provider con dominio verificato e DPA.
   - Non risulta una nomina formale a responsabile del trattamento per Vercel e Neon.
   - `vercel.json` imposta solo il cron delle email, non la regione delle funzioni: la regione Vercel resta da verificare sul progetto. Il database collegato è PostgreSQL Neon, AWS eu-central-1. Neon cifra i dati a riposo e le connessioni usano TLS. Non c'è una cifratura aggiuntiva dei singoli campi.
7. Volontariato presso una S.r.l.: verificare con il consulente del lavoro che benefit, turni e direttive non portino a riqualificare l'attività come lavoro.
8. Date dell'evento: da inserire in `lib/legal.ts` (`event.startDate` e `event.endDate`) quando decise. Non richiedono una nuova versione dei testi.
9. Revisione legale di tutti i testi: impostare `LEGAL_REVIEW_DONE=true` solo dopo.

## Email

- Il modulo di invio è `sendEmail()` (Nodemailer, Gmail SMTP). Un passaggio futuro a un provider con dominio verificato richiede solo il cambio delle variabili d'ambiente.
- Senza `SMTP_PASS` e senza `GUARDIAN_EMAIL_ENABLED=true` le email restano in coda con errore e l'avvio scrive un warning. In questo ambiente la password per le app non è configurata, quindi l'invio reale e il controllo SPF/DKIM/DMARC non sono stati eseguiti.
- La coda `email_outbox` riprova con backoff. Il testo dell'email, compreso il link, resta in coda per i tentativi e per il promemoria a 14 giorni.
- Promemoria e cancellazione dei dati dell'altro genitore dopo 60 giorni: `GET /api/cron/email` (Vercel Cron ogni 15 minuti, header `Authorization: Bearer CRON_SECRET` in produzione).
