# Punti aperti — informative e liberatorie staff Leonessa Cup

Aggiornato il 19 novembre 2026. I testi pubblici (privacy 2.2, minori 1.2, liberatoria 2.2, condizioni 1.2, cookie 1.0) non mostrano più segnaposto né note interne. `LEGAL_REVIEW_DONE` resta non impostato: la revisione legale non è ancora registrata.

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
- Regione Vercel delle funzioni: Francoforte (`fra1` in `vercel.json`), accanto al database Neon in AWS eu-central-1. La rete CDN resta globale.

## Note interne (non mostrate al pubblico)

1. **Revisione legale complessiva.** I testi sono pubblicati senza bozza. Restano da far revisionare da un legale: unico esercente e art. 337-quater c.c.; candidatura dei minori con il solo genitore di contatto. Impostare `LEGAL_REVIEW_DONE=true` solo dopo quella revisione.
2. **Cessione gratuita in esclusiva dei diritti dei minori.** Verificare se rientra nell'ordinaria amministrazione o richiede l'autorizzazione del giudice tutelare (art. 320 c.c.).
3. **Polizza RC e infortuni dei volontari.** Non ancora indicata (`volunteering.insurance`). Raccomandazione: stipularla prima dell'evento. ESL è una S.r.l. e non beneficia delle coperture previste per gli enti del Terzo settore. L'art. 5 delle condizioni non promette coperture; quando c'è la polizza, aggiornare l'articolo.
4. **Compiti del ruolo Sicurezza.** Il testo pubblico descrive esempi (accrediti, indicazioni al pubblico, presidio delle aree). Confermare con il titolare i compiti effettivi (`volunteering.securityRoleDuties`).
5. **Altri canali social.** Oltre Instagram @leonessacup, Instagram @lcsrealemutua, TikTok @leonessacup e il sito, eventuali nuovi canali si aggiungono solo con una nuova versione della liberatoria (`channels.extra`).
6. **Accordi art. 28 GDPR.**
   - Il testo pubblico dice che i fornitori trattano i dati come responsabili sulla base dei rispettivi DPA.
   - Vercel e Neon: accordi standard del fornitore, da confermare nell'account.
   - **Google Gmail gratuito non offre un DPA ex art. 28.** Per formalizzarlo serve Google Workspace (Cloud Data Processing Addendum) oppure un provider email con dominio verificato e DPA.
7. **Volontariato presso una S.r.l.** Verificare con il consulente del lavoro che benefit, turni e direttive non portino a riqualificare l'attività come lavoro.
8. **Date dell'evento.** Da inserire in `lib/legal.ts` (`event.startDate` e `event.endDate`) quando decise. Non richiedono una nuova versione dei testi.
9. **Candidature pre-v2.0.** L'azione admin «Invia informativa aggiornata» esiste ma, al 19 novembre 2026, non risulta ancora lanciata dal titolare. Gli archivi 1.1 / 1.0 usano «vengono reinformate».

## Email

- Il modulo di invio è `sendEmail()` (Nodemailer, Gmail SMTP). Un passaggio futuro a un provider con dominio verificato richiede solo il cambio delle variabili d'ambiente.
- Senza `SMTP_PASS` e senza `GUARDIAN_EMAIL_ENABLED=true` le email restano in coda con errore e l'avvio scrive un warning. In questo ambiente la password per le app non è configurata, quindi l'invio reale e il controllo SPF/DKIM/DMARC non sono stati eseguiti.
- La coda `email_outbox` riprova con backoff. Il testo dell'email, compreso il link, resta in coda per i tentativi e per il promemoria a 14 giorni.
- Promemoria e cancellazione dei dati dell'altro genitore dopo 60 giorni: `GET /api/cron/email` (Vercel Cron ogni 15 minuti, header `Authorization: Bearer CRON_SECRET` in produzione).
