# Punti aperti — informative e liberatorie staff Leonessa Cup

Bozza del 18 novembre 2026. I testi pubblicati nel sito restano da validare legalmente.

## Decisioni già prese dal titolare

- Staff volontario e gratuito.
- Casellario giudiziale non richiesto. Restano le regole di condotta sulla tutela dei minori (art. 7 delle condizioni).
- Ammessi i 16–17enni, con conferma dei genitori e regole LCS (entrambi i genitori per immagini, cognome e cessione dei diritti, salvo unico esercente).
- I diritti sui contenuti prodotti dallo staff vanno a ESL, con sublicenza ai media partner, a titolo gratuito e con i diritti morali salvi.
- Contatti privacy: quelli della Lega Calcio Studenti.

## Punti aperti

1. Rimborso spese: se è previsto, con quale massimale e quali modalità.
2. Assicurazione RC e infortuni dei volontari: polizza e compagnia.
3. Volontariato presso una S.r.l. (non è un ente del Terzo settore, D.lgs. 117/2017): verificare con il consulente del lavoro che benefit, turni e direttive non portino a riqualificare l'attività come lavoro.
4. Minori nello staff: se la candidatura debba richiedere entrambi i genitori (oggi basta il contatto); orario massimo dei turni; se la cessione gratuita dei diritti del minore richieda l'autorizzazione del giudice tutelare (art. 320 c.c.) o vada ridotta a una licenza non esclusiva.
5. Ruoli Cassa e Sicurezza riservati ai maggiorenni: scelta proposta, da confermare.
6. Cessione dei diritti: esclusiva e durata piena, oppure licenza a tempo.
7. Conservazione delle candidature non accolte: proposta 12 mesi.
8. Regione Vercel, fornitori (DB, email), DPA art. 28 e trasferimenti USA.
   - Nel repository non c'è `vercel.json` e la regione delle funzioni non è indicata.
   - Il database collegato in questo ambiente è PostgreSQL Neon, regione AWS eu-central-1. La regione delle funzioni Vercel resta da confermare sul progetto.
   - Non c'è un servizio email nelle dipendenze né nelle variabili d'ambiente. `GUARDIAN_EMAIL_ENABLED` resta `false`.
   - Le nuove scelte registrano l'IP solo come hash SHA-256, più lo user agent. Prima il sito non registrava né IP né user agent.
   - Il pannello admin è protetto da password e da un cookie di sessione httpOnly firmato. I token dei link sono hash SHA-256. Non risulta una cifratura del database.
9. Compiti effettivi del ruolo Sicurezza.
10. Sede e date dell'evento. Nel testo restano i segnaposto `[edizione/anno]`, `[comune e impianto]`, `[data inizio]`, `[data fine]`.
11. Validazione legale di tutti i testi.

## Cosa non è attivo

- Email al primo genitore, all'altro genitore e il promemoria a 14 giorni: senza un servizio email le candidature dei minori non possono essere confermate.
- Il link di revoca è pronto, ma non viene inviato.
- In ambiente di sviluppo i link di conferma e revoca compaiono solo sulla pagina di ringraziamento e dopo la conferma del primo genitore, per poter provare il flusso.
