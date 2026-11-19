import { LegalHeading } from "@/components/legal/LegalChrome";
import { CONTROLLER, LEGAL, POLICY_PATHS, PRIVACY_MINOR_VERSION } from "@/lib/legal";
import Link from "next/link";

const linkClass = "text-mint underline underline-offset-2";

export function MinoriDocument() {
  return (
    <article className="space-y-8 text-sm leading-7 text-white/85">
      <p>
        Informativa sul trattamento dei dati personali del minore e dei
        genitori — staff Leonessa Cup, ai sensi degli artt. 13 e 14 GDPR.
        Leonessa Cup, stagione 2026/2027 — versione {PRIVACY_MINOR_VERSION}. Le
        versioni precedenti restano consultabili:{" "}
        <Link href={POLICY_PATHS.minoriV11} className={linkClass}>
          informativa minori 1.1
        </Link>
        {" e "}
        <Link href={POLICY_PATHS.minoriArchive} className={linkClass}>
          informativa minori 1.0
        </Link>
        .
      </p>
      <p>
        Gentili genitori, i dati dei ragazzi minorenni meritano una protezione
        specifica (considerando 38 GDPR). Vi chiediamo di leggere questa
        informativa insieme a vostro/a figlio/a. Vale insieme all&apos;
        <Link href={POLICY_PATHS.privacy} className={linkClass}>
          informativa privacy
        </Link>
        , di cui riprende titolare, fornitori, trasferimenti e diritti.
      </p>

      <section>
        <LegalHeading>Per te che ti candidi</LegalHeading>
        <p className="mt-3">
          In parole semplici (art. 2-quinquies Codice privacy): per candidarti
          allo staff usiamo il tuo nome, la tua data di nascita, i tuoi contatti
          e il ruolo che preferisci. I tuoi genitori devono confermare la
          candidatura con un link che ricevono via email. Senza la loro conferma
          non puoi entrare nello staff. Le tue foto e i tuoi video si pubblicano
          solo se sono d&apos;accordo i tuoi genitori (entrambi, se ci sono
          tutti e due) e anche tu: lo confermi con una casella. Nelle didascalie
          scriviamo il tuo nome e l&apos;iniziale del cognome. Non usiamo i tuoi
          contatti per la pubblicità e non li diamo a nessuna azienda. Se una
          foto o un video non ti piace, puoi chiederci di toglierlo anche da
          solo/a, scrivendo a {CONTROLLER.privacyEmail}.
        </p>
      </section>

      <section>
        <LegalHeading>Come funziona</LegalHeading>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>
            Il minore compila il form: data di nascita, i dati del genitore o
            tutore di contatto (nome, cognome, rapporto, email, telefono) e la
            scelta G3, cioè se c&apos;è un altro genitore che esercita la
            responsabilità genitoriale oppure se il contatto è l&apos;unico
            esercente. Se c&apos;è un altro genitore, nome, cognome ed email
            sono obbligatori. Inserire questi dati non è un&apos;autorizzazione.
          </li>
          <li>
            Il genitore di contatto riceve via email un link personale monouso,
            valido 60 giorni. Da lì dichiara di essere genitore o tutore (G1),
            conferma la candidatura e accetta le condizioni, sceglie gli usi di
            foto e video e, se il ruolo è Foto, Interviste, Giornale o Social,
            accetta la cessione dei diritti sui contenuti.
          </li>
          <li>Il minore conferma con la casella G16 (accordo del minore) nel form.</li>
          <li>
            Se c&apos;è un altro genitore, riceve un&apos;email con il link di
            conferma (C1). Le autorizzazioni per foto e video, cognome completo
            e cessione dei diritti diventano attive solo dopo la sua conferma, o
            subito se il contatto è unico esercente. L&apos;affidamento esclusivo
            non basta, perché le decisioni di maggiore interesse restano di
            entrambi i genitori (art. 337-quater c.c.): l&apos;unico esercente
            deve dichiarare che l&apos;altro genitore è deceduto, decaduto,
            sospeso o non riconosce il figlio, o che c&apos;è un provvedimento
            che gli attribuisce in via esclusiva anche queste decisioni.
          </li>
          <li>
            Senza la conferma C1 la candidatura può essere accolta, ma il minore
            non è pubblicabile in modo riconoscibile e non può svolgere i ruoli
            che richiedono la cessione dei diritti. Per la sola candidatura basta
            la conferma del genitore di contatto. Per foto e video, cognome
            completo e cessione dei diritti serve anche la conferma
            dell&apos;altro genitore, salvo unico esercente.
          </li>
        </ol>
      </section>

      <section>
        <LegalHeading>Dati trattati</LegalHeading>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>
            Del minore: quelli indicati al punto 2 dell&apos;
            <Link href={POLICY_PATHS.privacy} className={linkClass}>
              informativa privacy
            </Link>
            .
          </li>
          <li>
            Del genitore di contatto: nome, cognome, rapporto (Genitore / Tutore
            / Affidatario), email, telefono, dichiarazioni G1 e G3.
          </li>
          <li>Dell&apos;altro genitore: nome, cognome ed email.</li>
          <li>
            Di tutti: data, ora, hash SHA-256 dell&apos;IP e user agent delle
            conferme, come prova.
          </li>
        </ul>
      </section>

      <section>
        <LegalHeading>Finalità e basi giuridiche</LegalHeading>
        <p className="mt-3">
          Sono quelle della tabella del punto 3 dell&apos;
          <Link href={POLICY_PATHS.privacy} className={linkClass}>
            informativa privacy
          </Link>
          , con queste differenze:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>A: per il minore, l&apos;accordo di volontariato è concluso con il consenso del genitore (artt. 316 e 320 c.c.).</li>
          <li>D (foto e video): richiede il consenso di entrambi i genitori, salvo unico esercente, più G16.</li>
          <li>D3 (cognome completo nelle didascalie): stesso consenso.</li>
          <li>D2 (cessione dei diritti sui contenuti): stesso consenso.</li>
          <li>E (comunicazioni promozionali): non è proposta ai minori.</li>
          <li>
            Contatti dei genitori: usati solo per le conferme e le comunicazioni
            di servizio (art. 6.1.b GDPR), per 24 mesi dalla fine della stagione.
          </li>
        </ul>
      </section>

      <section>
        <LegalHeading>Tutele per i minori nello staff</LegalHeading>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>
            Turni di <strong>massimo {LEGAL.volunteering.minorMaxShiftHours} ore</strong>,
            compatibili con l&apos;età e con gli impegni scolastici, sempre con un
            referente adulto di ESL.
          </li>
          <li>Niente ruoli Cassa e Sicurezza.</li>
          <li>Nelle didascalie: nome e iniziale del cognome, salvo consenso al cognome completo.</li>
          <li>
            Niente tag dei profili social del minore e nessuna pubblicazione di
            recapiti, residenza o dati che ne permettano la localizzazione.
          </li>
          <li>Il minore non è mai presentato come testimonial di prodotti o sponsor.</li>
          <li>Nessuna profilazione.</li>
        </ul>
      </section>

      <section>
        <LegalHeading>Diritti</LegalHeading>
        <p className="mt-3">
          Genitori e minore esercitano i diritti degli artt. 15–22 GDPR
          scrivendo a {CONTROLLER.privacyEmail} o alla PEC {CONTROLLER.pec}. La
          revoca di uno solo dei genitori basta a fermare gli usi facoltativi. A
          18 anni la revoca spetta al/alla partecipante. Il minore può chiedere
          da solo/a la rimozione di una foto o di un video. Reclamo al{" "}
          <a href={CONTROLLER.garanteUrl} className={linkClass} target="_blank" rel="noreferrer">
            Garante per la protezione dei dati personali
          </a>
          .
        </p>
      </section>
    </article>
  );
}
