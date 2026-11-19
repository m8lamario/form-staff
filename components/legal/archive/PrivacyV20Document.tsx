import { PolicyTodo } from "@/components/PolicyTodo";
import { LegalHeading, PlaceholderNotice } from "@/components/legal/LegalChrome";
import { CONTROLLER, EVENT_PLACEHOLDERS, POLICY_PATHS } from "@/lib/legal";
import Link from "next/link";

const linkClass = "text-mint underline underline-offset-2";

export function PrivacyV20Document() {
  return (
    <article className="space-y-8 text-sm leading-7 text-white/85">
      <PlaceholderNotice always />
      <p>
        Informativa sul trattamento dei dati personali — candidatura staff
        Leonessa Cup, ai sensi degli artt. 13 e 14 del Regolamento UE 2016/679
        (GDPR) e del D.lgs. 196/2003 (Codice privacy). Leonessa Cup, stagione
        2026/2027 — versione 2.0.
      </p>
      <p>
        Se hai 16 o 17 anni, leggi anche, insieme ai tuoi genitori, l&apos;
        <Link href={POLICY_PATHS.minori} className={linkClass}>
          informativa per staff minorenni e genitori
        </Link>
        . Le riprese sono regolate dalla{" "}
        <Link href={POLICY_PATHS.social} className={linkClass}>
          liberatoria
        </Link>
        . Le regole del volontariato e i diritti sui contenuti sono nelle{" "}
        <Link href={POLICY_PATHS.termini} className={linkClass}>
          condizioni
        </Link>
        . Le versioni precedenti restano consultabili:{" "}
        <Link href={POLICY_PATHS.privacyArchive} className={linkClass}>
          privacy 1.1
        </Link>
        .
      </p>

      <section>
        <LegalHeading>1. Titolare del trattamento</LegalHeading>
        <p className="mt-3">
          {CONTROLLER.name}, sede legale in {CONTROLLER.address}, P.IVA{" "}
          {CONTROLLER.vat}, C.F. {CONTROLLER.taxCode}. È l&apos;organizzatrice
          dei tornei della Lega Calcio Studenti, tra cui la Leonessa Cup («
          {CONTROLLER.shortName}»). Contatti privacy: {CONTROLLER.privacyEmail},
          PEC {CONTROLLER.pec}. DPO: {CONTROLLER.dpo}.
        </p>
      </section>

      <section>
        <LegalHeading>2. Dati trattati e fonte</LegalHeading>
        <p className="mt-3">
          I dati sono raccolti con il form di candidatura staff su{" "}
          {CONTROLLER.formUrl}, per la Leonessa Cup{" "}
          <PolicyTodo>{EVENT_PLACEHOLDERS.edition}</PolicyTodo>, che si svolge a{" "}
          <PolicyTodo>{EVENT_PLACEHOLDERS.place}</PolicyTodo> dal{" "}
          <PolicyTodo>{EVENT_PLACEHOLDERS.start}</PolicyTodo> al{" "}
          <PolicyTodo>{EVENT_PLACEHOLDERS.end}</PolicyTodo>.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>
            Dati anagrafici: nome, cognome e data di nascita (serve a verificare
            l&apos;età minima di 16 anni e se si applica il percorso per
            minorenni).
          </li>
          <li>Dati di contatto: telefono ed email.</li>
          <li>
            Dati della candidatura: partecipazione allo staff nell&apos;edizione
            precedente e ruolo preferito.
          </li>
          <li>
            Solo per i candidati di 16–17 anni, dati del genitore o tutore
            indicato come contatto: nome, cognome, rapporto, email, telefono e
            dichiarazioni. Dell&apos;altro genitore, se c&apos;è: nome, cognome
            ed email, forniti dal minore o dal primo genitore (art. 14 GDPR:
            l&apos;email di conferma contiene la sua informativa).
          </li>
          <li>
            Dichiarazioni e scelte: fascia d&apos;età, presa visione delle
            informative, accettazione delle condizioni, cessione dei diritti sui
            contenuti (solo per i ruoli Foto, Interviste, Giornale e Social),
            scelte sulle riprese e sulle comunicazioni.
          </li>
          <li>
            Dati tecnici, come prova delle scelte: data e ora, versione dei
            testi, hash SHA-256 dell&apos;indirizzo IP e user agent. L&apos;IP
            non è conservato in chiaro.
          </li>
          <li>
            Se entri nello staff: turni, accrediti, ruolo assegnato, eventuali
            rimborsi spese, foto e video nei limiti della liberatoria, e i
            contenuti che produci nel tuo ruolo.
          </li>
        </ul>
        <p className="mt-3">
          Non chiediamo dati relativi alla salute né altri dati particolari
          (art. 9 GDPR) o giudiziari (art. 10 GDPR). Non inserirli nel form. Il
          certificato del casellario giudiziale non è richiesto.
        </p>
      </section>

      <section>
        <LegalHeading>3. Finalità e basi giuridiche</LegalHeading>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/20 text-mint">
                <th className="py-2 pr-3 font-medium">Finalità</th>
                <th className="py-2 pr-3 font-medium">Base giuridica</th>
                <th className="py-2 font-medium">Obbligatorietà</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10 align-top">
                <td className="py-2 pr-3">
                  A. Ricevere e valutare la candidatura, contattarti, organizzare
                  l&apos;attività di volontariato (ruoli, turni, accrediti),
                  inviarti comunicazioni di servizio. Per i minorenni, anche
                  contattare i genitori e raccoglierne le conferme.
                </td>
                <td className="py-2 pr-3">
                  Misure precontrattuali ed esecuzione dell&apos;accordo di
                  volontariato richiesto (art. 6.1.b GDPR). Per i minorenni,
                  l&apos;accordo è concluso con il consenso del genitore che ha
                  la responsabilità genitoriale (artt. 316 e 320 c.c.).
                </td>
                <td className="py-2">Necessaria per candidarsi</td>
              </tr>
              <tr className="border-b border-white/10 align-top">
                <td className="py-2 pr-3">
                  B. Adempimenti amministrativi e assicurativi (es. copertura dei
                  volontari, rimborsi spese).
                </td>
                <td className="py-2 pr-3">Obbligo di legge (art. 6.1.c GDPR)</td>
                <td className="py-2">Necessaria se entri nello staff</td>
              </tr>
              <tr className="border-b border-white/10 align-top">
                <td className="py-2 pr-3">
                  C. Sicurezza dell&apos;evento, tutela dei partecipanti (in
                  particolare dei minori) e difesa di un diritto in giudizio.
                </td>
                <td className="py-2 pr-3">
                  Legittimo interesse di ESL (art. 6.1.f GDPR)
                </td>
                <td className="py-2">—</td>
              </tr>
              <tr className="border-b border-white/10 align-top">
                <td className="py-2 pr-3">
                  D. Foto e video in cui sei il soggetto principale, per cronaca,
                  documentazione e promozione.
                </td>
                <td className="py-2 pr-3">
                  Consenso (art. 6.1.a GDPR; art. 10 c.c.; artt. 96–97 L.
                  633/1941). Per i minorenni, consenso di entrambi i genitori,
                  salvo unico esercente, più l&apos;accordo del minore.
                </td>
                <td className="py-2">
                  Facoltativa: vedi la{" "}
                  <Link href={POLICY_PATHS.social} className={linkClass}>
                    liberatoria
                  </Link>
                </td>
              </tr>
              <tr className="border-b border-white/10 align-top">
                <td className="py-2 pr-3">
                  D2. Utilizzo, da parte di ESL e dei suoi media partner, dei
                  contenuti che produci nei ruoli Foto, Interviste, Giornale e
                  Social, con il tuo nome come autore.
                </td>
                <td className="py-2 pr-3">
                  Esecuzione dell&apos;accordo di volontariato e della cessione
                  dei diritti (art. 6.1.b GDPR; L. 633/1941). Per i minorenni,
                  consenso di entrambi i genitori, salvo unico esercente.
                </td>
                <td className="py-2">Necessaria solo per quei ruoli</td>
              </tr>
              <tr className="border-b border-white/10 align-top">
                <td className="py-2 pr-3">
                  E. Email o messaggi su candidature staff, eventi e tornei ESL
                  delle edizioni successive.
                </td>
                <td className="py-2 pr-3">
                  Consenso (art. 6.1.a GDPR; art. 130 Codice privacy). Per i
                  minorenni, non è proposta.
                </td>
                <td className="py-2">Facoltativa (solo maggiorenni)</td>
              </tr>
              <tr className="align-top">
                <td className="py-2 pr-3">G. Prova delle scelte e dei consensi.</td>
                <td className="py-2 pr-3">
                  Obbligo di legge (art. 6.1.c GDPR, in relazione all&apos;art.
                  7.1) e legittimo interesse (art. 6.1.f GDPR).
                </td>
                <td className="py-2">—</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3">
          La presa visione dell&apos;informativa non è un consenso: la
          candidatura si basa sulla lettera A. Negare i consensi D ed E non
          pregiudica la candidatura. Le immagini d&apos;insieme dell&apos;evento
          pubblico sono regolate dal punto 6 della liberatoria.
        </p>
      </section>

      <section>
        <LegalHeading>4. Modalità del trattamento</LegalHeading>
        <p className="mt-3">
          Usiamo strumenti elettronici e, se serve, cartacei, con personale
          autorizzato e istruito e misure di sicurezza adeguate (art. 32 GDPR).
          Non facciamo profilazione né prendiamo decisioni basate unicamente su
          trattamenti automatizzati. Le candidature si consultano solo dal
          pannello admin, protetto da password e da un cookie di sessione
          httpOnly firmato. I link per i genitori sono monouso e il token è
          conservato solo come hash SHA-256.{" "}
          <PolicyTodo>
            DA VERIFICARE: non risulta una cifratura aggiuntiva del database o
            dei campi anagrafici.
          </PolicyTodo>
        </p>
      </section>

      <section>
        <LegalHeading>5. Destinatari</LegalHeading>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Staff organizzativo ESL autorizzato e organizzatori locali della Leonessa Cup.</li>
          <li>
            Fornitori nominati responsabili del trattamento (art. 28 GDPR):
            hosting Vercel Inc. <PolicyTodo>{EVENT_PLACEHOLDERS.vercelRegion}</PolicyTodo>,
            database {EVENT_PLACEHOLDERS.database},{" "}
            <PolicyTodo>{EVENT_PLACEHOLDERS.email}</PolicyTodo>. Nel repository
            non c&apos;è un servizio email configurato.{" "}
            <PolicyTodo>
              DA VERIFICARE: nomina a responsabile ex art. 28 GDPR e clausole
              di trasferimento per Vercel e Neon.
            </PolicyTodo>
          </li>
          <li>Compagnie assicurative, consulenti e autorità, quando la legge lo richiede.</li>
          <li>
            I media partner di ESL, che ricevono i contenuti prodotti dallo
            staff (D2) con il nome dell&apos;autore e le immagini dello staff,
            solo nei limiti delle autorizzazioni date.
          </li>
        </ul>
        <p className="mt-3">
          I dati della candidatura non sono diffusi e non sono comunicati a
          sponsor o partner per finalità promozionali.
        </p>
      </section>

      <section>
        <LegalHeading>6. Trasferimenti extra-UE</LegalHeading>
        <p className="mt-3">
          Vercel <PolicyTodo>e gli altri fornitori USA individuati</PolicyTodo>{" "}
          possono comportare trasferimenti verso gli Stati Uniti, con clausole
          contrattuali standard e/o EU-U.S. Data Privacy Framework.
        </p>
      </section>

      <section>
        <LegalHeading>7. Conservazione</LegalHeading>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/20 text-mint">
                <th className="py-2 pr-3 font-medium">Dati</th>
                <th className="py-2 font-medium">Durata</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10 align-top">
                <td className="py-2 pr-3">Candidature non accolte o non confermate dai genitori (A)</td>
                <td className="py-2">
                  <PolicyTodo>
                    12 mesi dalla fine dell&apos;edizione — DA VALIDARE LEGALMENTE
                  </PolicyTodo>
                </td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-3">Staff selezionato: ruoli, turni, accrediti (A)</td>
                <td className="py-2">24 mesi dal termine della stagione</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-3">Documenti amministrativi, assicurativi e rimborsi (B)</td>
                <td className="py-2">Per il tempo previsto dalla legge (fino a 10 anni, art. 2220 c.c.)</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-3">Foto e video (D)</td>
                <td className="py-2">
                  Fino alla revoca e comunque non oltre 10 anni dalla fine della
                  stagione; dopo la revoca, cancellazione anche dagli archivi
                  entro 30 giorni, salvo difesa di un diritto (G). Non si può
                  ritirare il materiale già stampato o consegnato a terzi prima
                  della revoca.
                </td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-3">Contenuti prodotti dallo staff e nome dell&apos;autore (D2)</td>
                <td className="py-2">Per la durata dei diritti ceduti a ESL (vedi le condizioni)</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-3">Dati dell&apos;altro genitore non confermati</td>
                <td className="py-2">Fino a 60 giorni dall&apos;invio del link, poi cancellati</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-3">Comunicazioni sulle edizioni successive (E)</td>
                <td className="py-2">24 mesi dal consenso o dall&apos;ultima interazione, salvo revoca</td>
              </tr>
              <tr>
                <td className="py-2 pr-3">Registro dei consensi (G)</td>
                <td className="py-2">10 anni dalla fine del trattamento o dalla revoca (art. 2946 c.c.)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <LegalHeading>8. I tuoi diritti</LegalHeading>
        <p className="mt-3">
          Puoi chiedere accesso, rettifica, cancellazione, limitazione e
          portabilità e opporti al trattamento (artt. 15–22 GDPR), scrivendo a{" "}
          {CONTROLLER.privacyEmail} o alla PEC {CONTROLLER.pec}. Puoi revocare
          ogni consenso in qualsiasi momento{" "}
          <PolicyTodo>
            anche dal link di revoca nell&apos;email di conferma: il link è
            predisposto, ma l&apos;invio email non è attivo
          </PolicyTodo>
          . La revoca non rende illecito il trattamento precedente (art. 7.3
          GDPR). Per i minorenni basta la revoca di uno solo dei genitori,
          oppure del minore stesso quando compie 18 anni. Rispondiamo entro un
          mese, prorogabile di due mesi nei casi complessi (art. 12.3 GDPR).
          Puoi proporre reclamo al{" "}
          <a href={CONTROLLER.garanteUrl} className={linkClass} target="_blank" rel="noreferrer">
            {CONTROLLER.garanteName}
          </a>{" "}
          o rivolgerti all&apos;autorità giudiziaria (art. 79 GDPR; art. 152
          Codice privacy).
        </p>
        <p className="mt-3 font-medium text-white">
          Diritto di opposizione (art. 21 GDPR). Puoi opporti in qualsiasi
          momento ai trattamenti basati sul legittimo interesse (C e immagini
          d&apos;insieme), per motivi legati alla tua situazione particolare.
        </p>
      </section>

      <section>
        <LegalHeading>9. Età</LegalHeading>
        <p className="mt-3">
          Possono candidarsi le persone che hanno compiuto 16 anni alla data
          della candidatura. Per chi ha 16 o 17 anni, la candidatura è valida
          solo dopo la conferma di un genitore o tutore, secondo l&apos;
          <Link href={POLICY_PATHS.minori} className={linkClass}>
            informativa per minori
          </Link>
          . I ruoli Cassa e Sicurezza sono riservati ai maggiorenni.
        </p>
      </section>

      <section>
        <LegalHeading>10. Aggiornamenti</LegalHeading>
        <p className="mt-3">
          La versione in vigore è sempre su /privacy e quelle precedenti restano
          consultabili. Se una modifica cambia ciò a cui hai acconsentito, ti
          chiederemo una nuova scelta.
        </p>
      </section>
    </article>
  );
}
