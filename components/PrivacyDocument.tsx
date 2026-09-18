import { PRIVACY_ORG, PRIVACY_POLICY_VERSION } from "@/lib/privacy";
import type { ReactNode } from "react";

function Todo({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded-sm bg-mint/20 px-1 font-medium text-mint not-italic">
      {children}
    </mark>
  );
}

export function PrivacyDocument() {
  const org = PRIVACY_ORG;

  return (
    <article className="space-y-8 text-sm leading-7 text-white/85">
      <p className="rounded-2xl border border-mint/40 bg-mint/10 px-4 py-3 text-white">
        Informativa modello redatta ai sensi degli artt. 13 e 14 del
        Regolamento (UE) 2016/679 (GDPR) e del D.lgs. 196/2003 (Codice
        Privacy), nonché degli artt. 10 c.c. e 96-97 della L. 633/1941 per
        il diritto all&apos;immagine. I testi evidenziati in verde vanno
        sostituiti con i dati reali del Titolare prima della pubblicazione.
        Prima di andare online, far revisionare il documento da un legale
        di fiducia: non sostituisce una consulenza professionale.
      </p>
      <p className="text-white/70">
        Ultimo aggiornamento: <Todo>{org.lastUpdated}</Todo> · versione{" "}
        {PRIVACY_POLICY_VERSION}
      </p>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          1. Titolare del trattamento
        </h2>
        <p className="mt-3">
          Titolare del trattamento è <Todo>{org.controllerName}</Todo>, in
          forma di <Todo>{org.legalForm}</Todo>, C.F.{" "}
          <Todo>{org.taxCode}</Todo>, P.IVA <Todo>{org.vatNumber}</Todo>, con
          sede legale in <Todo>{org.registeredOffice}</Todo>.
        </p>
        <p className="mt-2">
          Contatti per l&apos;esercizio dei diritti e per ogni questione
          privacy: email <Todo>{org.privacyEmail}</Todo>, PEC{" "}
          <Todo>{org.pec}</Todo>, telefono <Todo>{org.phone}</Todo>, sito{" "}
          <Todo>{org.website}</Todo>.
        </p>
        <p className="mt-2">
          {org.dpoAppointed ? (
            <>
              Il Responsabile della Protezione dei Dati (DPO) è{" "}
              <Todo>{org.dpoName}</Todo>, contattabile all&apos;indirizzo{" "}
              <Todo>{org.dpoEmail}</Todo>.
            </>
          ) : (
            <>
              Un DPO non risulta nominato. Se il Titolare è tenuto alla
              nomina ai sensi dell&apos;art. 37 GDPR, indicare qui nome e
              contatti; in caso contrario lasciare questa dicitura dopo aver
              verificato l&apos;assenza di obbligo.
            </>
          )}
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          2. Categorie di dati e fonte
        </h2>
        <p className="mt-3">
          I dati sono raccolti presso l&apos;interessato (art. 13 GDPR)
          tramite il form di candidatura staff per{" "}
          <Todo>{org.eventEdition}</Todo> ({org.eventName}), che si svolge a{" "}
          <Todo>{org.eventPlace}</Todo> dal <Todo>{org.eventDates}</Todo>,
          all&apos;indirizzo <Todo>{org.formUrl}</Todo>.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>dati anagrafici: nome e cognome;</li>
          <li>dati di contatto: numero di telefono e indirizzo email;</li>
          <li>
            dati relativi alla candidatura: partecipazione a edizioni
            precedenti e ruolo preferito nello staff;
          </li>
          <li>
            dati di consenso: presa visione dell&apos;informativa e scelta
            sull&apos;uso di immagini, video e audio;
          </li>
          <li>
            dati tecnici minimi di invio (data e ora della candidatura,
            versione dell&apos;informativa accettata).
          </li>
        </ul>
        <p className="mt-3">
          Non sono richiesti dati particolari di cui all&apos;art. 9 GDPR
          (salute, origine razziale o etnica, opinioni politiche,
          convinzioni religiose, dati biometrici o sulla vita sessuale). Si
          prega di non inserirli nei campi del form. Eventuali foto, video
          e registrazioni audio raccolti in occasione dell&apos;evento
          costituiscono dati personali relativi all&apos;immagine e alla
          voce.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          3. Finalità e basi giuridiche
        </h2>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/20 text-mint">
                <th className="py-2 pr-4 font-medium">Finalità</th>
                <th className="py-2 pr-4 font-medium">Base giuridica</th>
              </tr>
            </thead>
            <tbody className="align-top">
              <tr className="border-b border-white/10">
                <td className="py-3 pr-4">
                  Ricevere, valutare e gestire la candidatura per lo staff
                  dell&apos;evento; contattare l&apos;interessato;
                  organizzare turni, accrediti e ruoli.
                </td>
                <td className="py-3 pr-4">
                  Art. 6, par. 1, lett. b) GDPR: misure precontrattuali e
                  gestione del rapporto di collaborazione o volontariato
                  richiesto dall&apos;interessato. La presa visione di
                  questa informativa è condizione per l&apos;invio del form,
                  ma il trattamento della candidatura non si fonda sul
                  consenso.
                </td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 pr-4">
                  Adempiere a obblighi di legge (fiscali, assicurativi, di
                  sicurezza, richieste dell&apos;autorità).
                </td>
                <td className="py-3 pr-4">Art. 6, par. 1, lett. c) GDPR.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 pr-4">
                  Tutela in giudizio, prevenzione di illeciti e sicurezza
                  dell&apos;evento.
                </td>
                <td className="py-3 pr-4">
                  Art. 6, par. 1, lett. f) GDPR (legittimo interesse del
                  Titolare, bilanciato con i diritti dell&apos;interessato).
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4">
                  Riprese foto, video e audio durante l&apos;evento e
                  pubblicazione, anche con nome, sui canali{" "}
                  <Todo>{org.socialChannels}</Todo> e sul sito{" "}
                  <Todo>{org.website}</Todo> per documentazione e promozione
                  dell&apos;iniziativa.
                </td>
                <td className="py-3 pr-4">
                  Art. 6, par. 1, lett. a) GDPR: consenso specifico,
                  libero, informato e revocabile, raccolto con scelta
                  Sì/No distinta dalla candidatura. Per l&apos;immagine si
                  applicano anche gli artt. 10 c.c. e 96-97 L. 633/1941. Il
                  rifiuto non pregiudica la candidatura.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          4. Natura del conferimento e consensi distinti
        </h2>
        <p className="mt-3">
          Il conferimento di nome, cognome, telefono, email, informazione
          sulla partecipazione precedente e ruolo preferito è necessario
          per inoltrare la candidatura. In mancanza, non è possibile dare
          seguito alla richiesta.
        </p>
        <p className="mt-2">
          Nel form sono previsti due atti distinti, non raggruppati:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <strong className="text-white">Presa visione</strong> di questa
            informativa (obbligatoria per inviare la candidatura);
          </li>
          <li>
            <strong className="text-white">
              Consenso alle riprese e alla pubblicazione
            </strong>{" "}
            (facoltativo): foto, video, audio e eventuale indicazione del
            nome sui canali sopra elencati, per promuovere l&apos;evento e
            documentarne lo svolgimento. Non è un trasferimento di diritti
            di sfruttamento commerciale a terzi estranei all&apos;iniziativa
            e non prevede un compenso, salvo diverso accordo scritto.
          </li>
        </ul>
        <p className="mt-2">
          In caso di diniego alle riprese, l&apos;interessato può comunque
          candidarsi. Il Titolare si impegna, nei limiti del ragionevole e
          della ripresa di gruppo o di contesto, a non usare primi piani
          identificativi della persona sui canali indicati. Resta ferma la
          liceità di riprese di contorno in cui la persona non sia il
          soggetto principale, ai sensi dell&apos;art. 97 L. 633/1941, salvo
          opposizione.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          5. Modalità del trattamento
        </h2>
        <p className="mt-3">
          I dati sono trattati con strumenti elettronici e, se necessario,
          cartacei, da persone autorizzate e istruite, con misure tecniche e
          organizzative adeguate a ridurre i rischi di accesso abusivo,
          perdita o uso illecito. Non è adottato un processo decisionale
          automatizzato, né attività di profilazione di cui all&apos;art. 22
          GDPR.
        </p>
        <p className="mt-2">
          Il form non utilizza cookie di profilazione o marketing. Eventuali
          cookie strettamente tecnici, necessari al funzionamento (ad
          esempio sessione dell&apos;area admin), non richiedono consenso.
          Se in futuro si introducessero strumenti di misurazione o
          terze parti, questa informativa e, ove dovuto, il banner cookie
          saranno aggiornati.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          6. Destinatari e trasferimento
        </h2>
        <p className="mt-3">
          I dati possono essere comunicati a: componenti dello staff
          organizzativo autorizzati; fornitori che agiscono come
          responsabili del trattamento ex art. 28 GDPR, tra cui il
          fornitore di hosting <Todo>{org.hostingProvider}</Todo> e{" "}
          <Todo>{org.otherProcessors}</Todo>; assicuratori, consulenti e
          autorità, nei limiti di legge.
        </p>
        <p className="mt-2">
          Trasferimenti extra-SEE: <Todo>{org.transferCountries}</Todo>.
          Ove applicabile, il trasferimento avviene sulla base di decisioni
          di adeguatezza, clausole contrattuali tipo della Commissione
          europea o altre garanzie degli artt. 44 e ss. GDPR.
        </p>
        <p className="mt-2">
          I dati della candidatura non sono diffusi. Le immagini e i video
          per i quali sia stato prestato il consenso social potranno essere
          visibili pubblicamente sui canali indicati, anche da terzi e
          all&apos;estero, secondo le impostazioni di tali piattaforme, sulle
          quali il Titolare non ha pieno controllo una volta pubblicati.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          7. Conservazione
        </h2>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>
            candidature e dati di contatto:{" "}
            <Todo>{org.retentionApplications}</Todo>;
          </li>
          <li>
            materiali foto/video in caso di consenso:{" "}
            <Todo>{org.retentionMedia}</Todo>;
          </li>
          <li>
            dati necessari a obblighi di legge o a difesa in giudizio: per
            il tempo previsto dalla normativa o di prescrizione.
          </li>
        </ul>
        <p className="mt-2">
          Decorsi i termini, i dati sono cancellati o anonimizzati, salvo
          ulteriore base giuridica. La revoca del consenso social non
          obbliga alla rimozione di pubblicazioni già lecitamente diffuse
          ove permanga altra base (ad esempio archivio storico
          dell&apos;evento), nei limiti di legge e salvo opposizione
          fondata.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          8. Diritti dell&apos;interessato
        </h2>
        <p className="mt-3">
          L&apos;interessato può chiedere al Titolare, nei limiti degli artt.
          15-22 GDPR: accesso, rettifica, cancellazione, limitazione,
          portabilità, opposizione, revoca del consenso. La revoca non
          pregiudica la liceità del trattamento svolto prima. Per le
          pubblicazioni social già diffuse, la rimozione sarà richiesta
          anche alle piattaforme, nei limiti tecnici e di legge.
        </p>
        <p className="mt-2">
          Per revocare il consenso alle riprese o per qualsiasi altra
          richiesta: <Todo>{org.privacyEmail}</Todo> o PEC{" "}
          <Todo>{org.pec}</Todo>, indicando nome, cognome e, se possibile,
          riferimenti alla pubblicazione. L&apos;interessato ha diritto di
          proporre reclamo al {org.supervisoryAuthority} (
          <a
            className="text-mint underline underline-offset-2"
            href={org.supervisoryUrl}
            target="_blank"
            rel="noreferrer"
          >
            {org.supervisoryUrl}
          </a>
          ) o ricorso all&apos;autorità giudiziaria.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          9. Minori
        </h2>
        <p className="mt-3">
          Il form è destinato a chi ha compiuto 18 anni, salvo diversa
          decisione del Titolare. Se è ammessa la candidatura di minori, il
          consenso alle riprese è prestato da chi esercita la
          responsabilità genitoriale, ai sensi dell&apos;art. 8 GDPR e
          dell&apos;art. 2-quinquies del Codice Privacy. In tal caso va
          previsto un meccanismo di raccolta del consenso di chi esercita
          la responsabilità genitoriale e, se necessario, un campo età.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          10. Aggiornamenti
        </h2>
        <p className="mt-3">
          La presente informativa è in versione {PRIVACY_POLICY_VERSION}.
          Ogni modifica sostanziale sarà pubblicata su questa pagina e, se
          incide sui consensi, potrà essere richiesta una nuova
          manifestazione di volontà. Form candidature:{" "}
          <Todo>{org.formUrl}</Todo>.
        </p>
      </section>
    </article>
  );
}
