import { LegalHeading } from "@/components/legal/LegalChrome";
import { CONTROLLER, LEGAL, POLICY_PATHS, TERMS_VERSION } from "@/lib/legal";
import Link from "next/link";

const linkClass = "text-mint underline underline-offset-2";

export function TerminiDocument() {
  return (
    <article className="space-y-8 text-sm leading-7 text-white/85">
      <p>
        Condizioni della candidatura staff volontario, regole di condotta e
        diritti sui contenuti — Leonessa Cup. Stagione 2026/2027 — versione{" "}
        {TERMS_VERSION}. Le versioni precedenti restano consultabili:{" "}
        <Link href={POLICY_PATHS.terminiV11} className={linkClass}>
          condizioni 1.1
        </Link>
        {" e "}
        <Link href={POLICY_PATHS.terminiArchive} className={linkClass}>
          condizioni 1.0
        </Link>
        .
      </p>

      <section>
        <LegalHeading>1. Organizzazione</LegalHeading>
        <p className="mt-3">
          {CONTROLLER.name}, {CONTROLLER.address}, P.IVA {CONTROLLER.vat}, C.F.{" "}
          {CONTROLLER.taxCode}.
        </p>
      </section>
      <section>
        <LegalHeading>2. Che cosa regola</LegalHeading>
        <p className="mt-3">
          Regola la candidatura allo staff volontario della Leonessa Cup e, se
          vieni selezionato/a, l&apos;attività durante l&apos;evento, le regole
          di condotta e i diritti sui contenuti prodotti. Privacy e immagini
          sono regolate dall&apos;
          <Link href={POLICY_PATHS.privacy} className={linkClass}>
            informativa privacy
          </Link>
          , dall&apos;
          <Link href={POLICY_PATHS.minori} className={linkClass}>
            informativa per minori
          </Link>{" "}
          e dalla{" "}
          <Link href={POLICY_PATHS.social} className={linkClass}>
            liberatoria
          </Link>
          .
        </p>
      </section>
      <section>
        <LegalHeading>3. Candidatura e requisiti</LegalHeading>
        <p className="mt-3">
          Puoi candidarti se hai compiuto 16 anni e fornisci dati veri. Se hai
          16 o 17 anni, la candidatura e l&apos;accettazione di queste condizioni
          richiedono la conferma di un genitore o tutore tramite il link che
          riceve via email. Il ruolo indicato è una preferenza: ESL assegna
          ruoli e turni secondo le esigenze dell&apos;evento e comunica
          l&apos;esito via email o telefono. La candidatura non dà diritto a
          essere selezionati. I ruoli Cassa e Sicurezza sono riservati ai
          maggiorenni.
        </p>
      </section>
      <section>
        <LegalHeading>4. Volontariato gratuito</LegalHeading>
        <p className="mt-3">
          L&apos;attività nello staff è prestata in modo personale, spontaneo e
          gratuito, senza fine di lucro, anche indiretto. Non è dovuto alcun
          compenso, in nessuna forma. Queste condizioni non costituiscono un
          contratto di lavoro subordinato o autonomo né una collaborazione
          retribuita. <strong>Non è previsto alcun rimborso spese</strong>, né
          forfettario né a piè di lista: le spese sostenute per partecipare (ad
          esempio viaggio e vitto) restano a carico del volontario. ESL può
          fornire materiali dello staff (es. maglietta, accredito, pasto durante
          i turni) per lo svolgimento dell&apos;attività, senza che costituiscano
          compenso.
        </p>
      </section>
      <section>
        <LegalHeading>5. Assicurazione</LegalHeading>
        <p className="mt-3">
          {LEGAL.volunteering.insurance ? (
            <>
              ESL assicura i volontari selezionati per responsabilità civile
              verso terzi e infortuni durante l&apos;attività, con polizza{" "}
              {LEGAL.volunteering.insurance}; le condizioni sono disponibili su
              richiesta.
            </>
          ) : (
            <>
              ESL comunica ai volontari selezionati, prima dell&apos;inizio
              dell&apos;attività, le eventuali coperture assicurative attive per
              lo staff e le relative condizioni. Il volontario può chiedere
              informazioni scrivendo a {CONTROLLER.secretariatEmail}.
            </>
          )}
        </p>
      </section>
      <section>
        <LegalHeading>6. Condotta</LegalHeading>
        <p className="mt-3">
          Chi fa parte dello staff segue le indicazioni dei responsabili ESL, il
          regolamento del torneo e la normativa applicabile. Si comporta in modo
          corretto e rispettoso verso partecipanti, pubblico, arbitri e altri
          componenti dello staff, e tiene un comportamento adeguato alla presenza
          di studenti minorenni. Non svolge l&apos;attività sotto l&apos;effetto
          di alcol o sostanze.
        </p>
      </section>
      <section>
        <LegalHeading>7. Tutela dei minori</LegalHeading>
        <p className="mt-3">
          Ai tornei partecipano studenti dai 14 anni e nello staff possono
          esserci ragazzi dai 16 anni. Chi fa parte dello staff:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            non contatta in privato partecipanti o colleghi minorenni (messaggi
            diretti, social personali), se non per esigenze organizzative e
            tramite i canali indicati da ESL;
          </li>
          <li>non resta da solo/a con un minore in spogliatoi o spazi chiusi;</li>
          <li>segnala subito a ESL comportamenti inappropriati.</li>
        </ul>
        <p className="mt-2">
          Gli staff minorenni svolgono turni di massimo {LEGAL.volunteering.minorMaxShiftHours} ore,
          compatibili con l&apos;età, sempre con un referente adulto di ESL. Il
          certificato del casellario
          giudiziale non è richiesto.
        </p>
      </section>
      <section id="diritti">
        <LegalHeading>8. Diritti sui contenuti prodotti dallo staff</LegalHeading>
        <p className="mt-3">
          Ruoli Foto, Interviste, Giornale, Social.
        </p>
        <p className="mt-2">
          <strong>8.1 Oggetto.</strong> Questo articolo si applica a foto, video,
          audio, testi, articoli, interviste, grafiche e ogni altro contenuto
          realizzato nel ruolo di staff durante la Leonessa Cup o su incarico di
          ESL («Contenuti»).
        </p>
        <p className="mt-2">
          <strong>8.2 Cessione.</strong> Con l&apos;accettazione di queste
          condizioni, e per i minori con il consenso dei genitori (punto 8.6),
          il componente dello staff cede a ESL a titolo gratuito, in coerenza
          con la natura volontaria dell&apos;attività, tutti i diritti di
          utilizzazione economica sui Contenuti (artt. 12 e ss., 78-bis, 87 e
          ss. L. 633/1941). La cessione è in esclusiva, senza limiti di
          territorio, per tutta la durata dei diritti e per qualsiasi mezzo e
          formato, oggi noto o futuro: pubblicazione, riproduzione, comunicazione
          al pubblico anche in diretta, elaborazione, montaggio, traduzione,
          archiviazione.
        </p>
        <p className="mt-2">
          <strong>8.3 Media partner.</strong> ESL può concedere in sublicenza o
          comunicare i Contenuti, in tutto o in parte, ai propri media partner,
          anche per la pubblicazione sui loro canali, senza ulteriore consenso
          dell&apos;autore e senza compenso.
        </p>
        <p className="mt-2">
          <strong>8.4 Limiti delle liberatorie.</strong> ESL e i media partner
          usano i Contenuti in cui compaiono partecipanti, pubblico o altri
          componenti dello staff solo nei limiti delle liberatorie date da quelle
          persone, comprese quelle LCS
          (https://registration.legacalciostudenti.com/liberatorie) e la Sezione
          B della{" "}
          <Link href={POLICY_PATHS.socialMinori} className={linkClass}>
            liberatoria
          </Link>{" "}
          per i minori. Un minore senza autorizzazione attiva non viene
          pubblicato in modo riconoscibile e se serve viene oscurato. La cessione
          dei diritti d&apos;autore non sostituisce il consenso delle persone
          ritratte.
        </p>
        <p className="mt-2">
          <strong>8.5 Diritti morali.</strong> Restano salvi i diritti morali
          dell&apos;autore (artt. 20 e ss. L. 633/1941), che sono inalienabili.
          ESL indica il nome dell&apos;autore quando è ragionevolmente possibile
          (es. «Foto: Nome C.»; per i minori, nome e iniziale del cognome) e non
          usa i Contenuti in modo lesivo del suo onore o della sua reputazione.
          Restano consentiti gli adattamenti tecnici ai formati dei canali.
        </p>
        <p className="mt-2">
          <strong>8.6 Minori.</strong> Per i componenti dello staff di 16–17 anni
          la cessione richiede il consenso dei genitori, cioè di entrambi salvo
          unico esercente, con le stesse conferme della liberatoria (G1 e C1), e
          l&apos;accordo del minore. Finché la cessione non è attiva ESL non usa
          i Contenuti del minore e il minore non può essere assegnato ai ruoli
          Foto, Interviste, Giornale o Social. La cessione è in esclusiva anche
          per i minori, con il consenso dei genitori già previsto (G1, C1 e G16).
        </p>
        <p className="mt-2">
          <strong>8.7 Garanzie e uso personale.</strong> L&apos;autore garantisce
          che i Contenuti sono originali e non violano diritti di terzi, per
          esempio musica o immagini altrui. Senza autorizzazione scritta di ESL
          non pubblica i Contenuti né altre foto o video dei partecipanti sui
          propri profili personali. Con l&apos;autorizzazione può usarli nel
          proprio portfolio, senza fini commerciali e nel rispetto delle
          liberatorie.
        </p>
      </section>
      <section>
        <LegalHeading>9. Foto e video: regole operative</LegalHeading>
        <p className="mt-3">
          Prima di pubblicare o consegnare un Contenuto, chi fa parte dello
          staff verifica con ESL le autorizzazioni dei soggetti ritratti. Non fa
          riprese negli spogliatoi, dopo infortuni o in situazioni di disagio, e
          segue le indicazioni di ESL sulle dirette.
        </p>
      </section>
      <section>
        <LegalHeading>10. Riservatezza e dati personali</LegalHeading>
        <p className="mt-3">
          Chi fa parte dello staff tratta i dati di partecipanti, pubblico e
          incassi solo per il proprio ruolo e mantiene riservate le informazioni
          conosciute durante l&apos;evento. Se il ruolo lo richiede, ESL lo/la
          autorizza per iscritto al trattamento con istruzioni specifiche (art.
          29 GDPR; art. 2-quaterdecies Codice privacy).
        </p>
      </section>
      <section>
        <LegalHeading>11. Ruoli Cassa e Sicurezza</LegalHeading>
        <p className="mt-3">
          Solo maggiorenni. Chi ha il ruolo Cassa segue le procedure di ESL per
          incassi e rendiconto. Chi ha il ruolo Sicurezza svolge solo supporto
          organizzativo e non sostituisce il personale abilitato (steward,
          addetti antincendio o primo soccorso) quando la legge lo richiede.{" "}
          {LEGAL.volunteering.securityRoleDuties ??
            "I compiti specifici del ruolo Sicurezza (ad esempio controllo degli accrediti agli ingressi, indicazioni al pubblico e presidio delle aree assegnate) sono comunicati dai responsabili ESL prima dell'evento."}
        </p>
      </section>
      <section>
        <LegalHeading>12. Recesso e violazioni</LegalHeading>
        <p className="mt-3">
          Il volontario può ritirarsi in qualsiasi momento, avvisando ESL appena
          possibile. In caso di violazione, ESL può revocare il ruolo o
          l&apos;accredito, anche durante l&apos;evento. La cessione dei diritti
          sui Contenuti già realizzati resta valida anche dopo il ritiro.
        </p>
      </section>
      <section>
        <LegalHeading>13. Legge e foro</LegalHeading>
        <p className="mt-3">
          Legge italiana. Foro competente: Torino, salvo il foro inderogabile del
          consumatore, se applicabile.
        </p>
      </section>
      <section>
        <LegalHeading>14. Contatti</LegalHeading>
        <p className="mt-3">
          Segreteria: {CONTROLLER.secretariatEmail}. Privacy:{" "}
          {CONTROLLER.privacyEmail}. PEC: {CONTROLLER.pec}.
        </p>
      </section>
    </article>
  );
}
