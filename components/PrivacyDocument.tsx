import { PolicyTodo } from "@/components/PolicyTodo";
import {
  MEDIA_POLICY_VERSION,
  POLICY_PATHS,
  PRIVACY_ORG,
  PRIVACY_POLICY_VERSION,
  STAFF_MIN_AGE,
} from "@/lib/privacy";
import Link from "next/link";

export function PrivacyDocument() {
  const org = PRIVACY_ORG;

  return (
    <article className="space-y-8 text-sm leading-7 text-white/85">
      <p className="rounded-2xl border border-mint/40 bg-mint/10 px-4 py-3 text-white">
        Informativa modello redatta ai sensi degli artt. 13 e 14 del
        Regolamento (UE) 2016/679 (GDPR) e del D.lgs. 196/2003 (Codice
        Privacy). Il trattamento delle immagini per i canali social è descritto
        anche nella{" "}
        <Link
          href={POLICY_PATHS.social}
          className="text-mint underline underline-offset-2"
        >
          liberatoria riprese
        </Link>
        . I testi evidenziati in verde vanno sostituiti con i dati reali del
        Titolare prima della pubblicazione. Prima di andare online, far
        revisionare il documento da un legale di fiducia: non sostituisce una
        consulenza professionale.
      </p>
      <p className="text-white/70">
        Ultimo aggiornamento: <PolicyTodo>{org.lastUpdated}</PolicyTodo> ·
        versione {PRIVACY_POLICY_VERSION}
      </p>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          1. Titolare del trattamento
        </h2>
        <p className="mt-3">
          Titolare del trattamento è <PolicyTodo>{org.controllerName}</PolicyTodo>
          , in forma di <PolicyTodo>{org.legalForm}</PolicyTodo>, C.F.{" "}
          <PolicyTodo>{org.taxCode}</PolicyTodo>, P.IVA{" "}
          <PolicyTodo>{org.vatNumber}</PolicyTodo>, con sede legale in{" "}
          <PolicyTodo>{org.registeredOffice}</PolicyTodo>.
        </p>
        <p className="mt-2">
          Contatti per l&apos;esercizio dei diritti e per ogni questione
          privacy: email <PolicyTodo>{org.privacyEmail}</PolicyTodo>, PEC{" "}
          <PolicyTodo>{org.pec}</PolicyTodo>, telefono{" "}
          <PolicyTodo>{org.phone}</PolicyTodo>, sito{" "}
          <PolicyTodo>{org.website}</PolicyTodo>.
        </p>
        <p className="mt-2">
          {org.dpoAppointed ? (
            <>
              Il Responsabile della Protezione dei Dati (DPO) è{" "}
              <PolicyTodo>{org.dpoName}</PolicyTodo>, contattabile
              all&apos;indirizzo <PolicyTodo>{org.dpoEmail}</PolicyTodo>.
            </>
          ) : (
            <>
              Un DPO non risulta nominato. Se il Titolare è tenuto alla nomina
              ai sensi dell&apos;art. 37 GDPR, indicare qui nome e contatti; in
              caso contrario lasciare questa dicitura dopo aver verificato
              l&apos;assenza di obbligo.
            </>
          )}
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          2. Categorie di dati e fonte
        </h2>
        <p className="mt-3">
          I dati sono raccolti presso l&apos;interessato (art. 13 GDPR) tramite
          il form di candidatura staff per{" "}
          <PolicyTodo>{org.eventEdition}</PolicyTodo> ({org.eventName}), che si
          svolge a <PolicyTodo>{org.eventPlace}</PolicyTodo> dal{" "}
          <PolicyTodo>{org.eventDates}</PolicyTodo>, all&apos;indirizzo{" "}
          <PolicyTodo>{org.formUrl}</PolicyTodo>.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>dati anagrafici: nome e cognome;</li>
          <li>dati di contatto: numero di telefono e indirizzo email;</li>
          <li>
            dati relativi alla candidatura: partecipazione a edizioni precedenti
            e ruolo preferito nello staff;
          </li>
          <li>
            dati di presa visione e di consenso: conferma di lettura di questa
            informativa, lettura della liberatoria riprese e scelta Sì/No
            sull&apos;uso di immagini, video e audio;
          </li>
          <li>
            dati tecnici minimi di invio (data e ora della candidatura, versioni
            dei documenti accettati o visualizzati).
          </li>
        </ul>
        <p className="mt-3">
          Non sono richiesti dati particolari di cui all&apos;art. 9 GDPR
          (salute, origine razziale o etnica, opinioni politiche, convinzioni
          religiose, dati biometrici o sulla vita sessuale). Si prega di non
          inserirli nei campi del form. Eventuali foto, video e registrazioni
          audio raccolti in occasione dell&apos;evento costituiscono dati
          personali relativi all&apos;immagine e alla voce.
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
                  dell&apos;evento; contattare l&apos;interessato; organizzare
                  turni, accrediti e ruoli.
                </td>
                <td className="py-3 pr-4">
                  Art. 6, par. 1, lett. b) GDPR: misure precontrattuali e
                  gestione del rapporto di collaborazione o volontariato
                  richiesto dall&apos;interessato. La presa visione di questa
                  informativa è condizione per l&apos;invio del form, ma il
                  trattamento della candidatura non si fonda sul consenso.
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
                  Riprese foto, video e audio e pubblicazione, anche con nome,
                  sui canali <PolicyTodo>{org.socialChannels}</PolicyTodo> e sul
                  sito <PolicyTodo>{org.website}</PolicyTodo> per documentazione
                  e promozione dell&apos;iniziativa, nei limiti della{" "}
                  <Link
                    href={POLICY_PATHS.social}
                    className="text-mint underline underline-offset-2"
                  >
                    liberatoria riprese
                  </Link>{" "}
                  (versione {MEDIA_POLICY_VERSION}).
                </td>
                <td className="py-3 pr-4">
                  Per primi piani, interviste e usi promozionali sui social:
                  art. 6, par. 1, lett. a) GDPR (consenso specifico, libero,
                  informato e revocabile) e artt. 10 c.c. e 96 L. 633/1941. Il
                  rifiuto non pregiudica la candidatura. Per sole riprese di
                  contesto di un evento sportivo pubblico, ove la persona non
                  sia il soggetto principale, possono operare l&apos;art. 97 L.
                  633/1941 e il legittimo interesse, salvo opposizione.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          4. Natura del conferimento e atti distinti
        </h2>
        <p className="mt-3">
          Il conferimento di nome, cognome, telefono, email, informazione sulla
          partecipazione precedente e ruolo preferito è necessario per
          inoltrare la candidatura. In mancanza, non è possibile dare seguito
          alla richiesta.
        </p>
        <p className="mt-2">
          Nel form sono previsti atti distinti, non raggruppati in un unico
          consenso:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <strong className="text-white">Presa visione</strong> di questa
            informativa (obbligatoria per inviare la candidatura, non è un
            consenso al trattamento);
          </li>
          <li>
            <strong className="text-white">
              Consenso alle riprese e alla pubblicazione
            </strong>{" "}
            (facoltativo), regolato dalla{" "}
            <Link
              href={POLICY_PATHS.social}
              className="text-mint underline underline-offset-2"
            >
              liberatoria riprese
            </Link>
            : foto, video, audio e eventuale indicazione del nome sui canali
            elencati. Non è un trasferimento di diritti di sfruttamento
            commerciale a terzi estranei all&apos;iniziativa e non prevede un
            compenso, salvo diverso accordo scritto.
          </li>
        </ul>
        <p className="mt-2">
          In caso di diniego alle riprese, l&apos;interessato può comunque
          candidarsi. Il Titolare si impegna, nei limiti del ragionevole, a non
          usare primi piani identificativi sui canali indicati. Resta ferma la
          possibilità di riprese di contorno di un evento pubblico in cui la
          persona non sia il soggetto principale, salvo opposizione.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          5. Modalità del trattamento
        </h2>
        <p className="mt-3">
          I dati sono trattati con strumenti elettronici e, se necessario,
          cartacei, da persone autorizzate e istruite, con misure tecniche e
          organizzative adeguate a ridurre i rischi di accesso abusivo, perdita
          o uso illecito. Non è adottato un processo decisionale automatizzato,
          né attività di profilazione di cui all&apos;art. 22 GDPR.
        </p>
        <p className="mt-2">
          Il form non utilizza cookie di profilazione o marketing. Eventuali
          cookie strettamente tecnici, necessari al funzionamento (ad esempio
          sessione dell&apos;area admin), non richiedono consenso. Se in futuro
          si introducessero strumenti di misurazione o terze parti, questa
          informativa e, ove dovuto, il banner cookie saranno aggiornati.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          6. Destinatari e trasferimento
        </h2>
        <p className="mt-3">
          I dati possono essere comunicati a: componenti dello staff
          organizzativo autorizzati; fornitori che agiscono come responsabili
          del trattamento ex art. 28 GDPR, tra cui il fornitore di hosting{" "}
          <PolicyTodo>{org.hostingProvider}</PolicyTodo> e{" "}
          <PolicyTodo>{org.otherProcessors}</PolicyTodo>; assicuratori,
          consulenti e autorità, nei limiti di legge.
        </p>
        <p className="mt-2">
          Trasferimenti extra-SEE: <PolicyTodo>{org.transferCountries}</PolicyTodo>
          . Ove applicabile, il trasferimento avviene sulla base di decisioni di
          adeguatezza, clausole contrattuali tipo della Commissione europea o
          altre garanzie degli artt. 44 e ss. GDPR.
        </p>
        <p className="mt-2">
          I dati della candidatura non sono diffusi. Le immagini e i video per i
          quali sia stato prestato il consenso social potranno essere visibili
          pubblicamente sui canali indicati, anche da terzi e all&apos;estero,
          secondo le impostazioni di tali piattaforme.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          7. Conservazione
        </h2>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>
            candidature e dati di contatto:{" "}
            <PolicyTodo>{org.retentionApplications}</PolicyTodo>;
          </li>
          <li>
            materiali foto/video in caso di consenso:{" "}
            <PolicyTodo>{org.retentionMedia}</PolicyTodo>;
          </li>
          <li>
            dati necessari a obblighi di legge o a difesa in giudizio: per il
            tempo previsto dalla normativa o di prescrizione.
          </li>
        </ul>
        <p className="mt-2">
          Decorsi i termini, i dati sono cancellati o anonimizzati, salvo
          ulteriore base giuridica. La revoca del consenso social ferma i nuovi
          utilizzi. I contenuti già lecitamente pubblicati restano coperti fino
          alla rimozione ragionevolmente possibile; un eventuale archivio
          storico dell&apos;evento, se mantenuto, sarà valutato su altra base e
          nei limiti di legge, salvo opposizione fondata.
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
          pubblicazioni social già diffuse, la rimozione sarà richiesta anche
          alle piattaforme, nei limiti tecnici e di legge.
        </p>
        <p className="mt-2">
          Per revocare il consenso alle riprese o per qualsiasi altra richiesta:{" "}
          <PolicyTodo>{org.privacyEmail}</PolicyTodo> o PEC{" "}
          <PolicyTodo>{org.pec}</PolicyTodo>, indicando nome, cognome e, se
          possibile, riferimenti alla pubblicazione. L&apos;interessato ha
          diritto di proporre reclamo al {org.supervisoryAuthority} (
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
          Il form è destinato a chi ha compiuto {STAFF_MIN_AGE} anni. Non è
          ammessa la candidatura di minori. Se in futuro il Titolare decidesse
          di ammetterli, il consenso alle riprese dovrebbe essere prestato da
          chi esercita la responsabilità genitoriale, ai sensi dell&apos;art. 8
          GDPR e dell&apos;art. 2-quinquies del Codice Privacy, con un
          meccanismo dedicato.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          10. Aggiornamenti
        </h2>
        <p className="mt-3">
          La presente informativa è in versione {PRIVACY_POLICY_VERSION}. Ogni
          modifica sostanziale sarà pubblicata su questa pagina e, se incide sui
          consensi, potrà essere richiesta una nuova manifestazione di volontà.
          Form candidature: <PolicyTodo>{org.formUrl}</PolicyTodo>. Liberatoria
          riprese: versione {MEDIA_POLICY_VERSION}, disponibile su{" "}
          <Link
            href={POLICY_PATHS.social}
            className="text-mint underline underline-offset-2"
          >
            {POLICY_PATHS.social}
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
