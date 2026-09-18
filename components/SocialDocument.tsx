import { PolicyTodo } from "@/components/PolicyTodo";
import {
  MEDIA_POLICY_VERSION,
  POLICY_PATHS,
  PRIVACY_ORG,
  STAFF_MIN_AGE,
} from "@/lib/privacy";
import Link from "next/link";

export function SocialDocument() {
  const org = PRIVACY_ORG;

  return (
    <article className="space-y-8 text-sm leading-7 text-white/85">
      <p className="rounded-2xl border border-mint/40 bg-mint/10 px-4 py-3 text-white">
        Liberatoria per l&apos;uso dell&apos;immagine e consenso alle riprese
        social, distinta dall&apos;
        <Link
          href={POLICY_PATHS.privacy}
          className="text-mint underline underline-offset-2"
        >
          informativa privacy
        </Link>
        . Redatta ai sensi degli artt. 10 c.c. e 96-97 della L. 633/1941, degli
        artt. 6, 7 e 13 del Regolamento (UE) 2016/679 e del D.lgs. 196/2003. I
        testi evidenziati in verde vanno sostituiti con i dati reali del
        Titolare prima della pubblicazione. Prima di andare online, far
        revisionare il documento da un legale di fiducia: non sostituisce una
        consulenza professionale.
      </p>
      <p className="text-white/70">
        Ultimo aggiornamento: <PolicyTodo>{org.lastUpdated}</PolicyTodo> ·
        versione {MEDIA_POLICY_VERSION}
      </p>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          1. Natura del documento
        </h2>
        <p className="mt-3">
          Questo testo è la liberatoria con cui chi si candida allo staff può
          autorizzare, in modo specifico e revocabile, riprese foto, video e
          audio in cui sia riconoscibile e la loro pubblicazione sui canali
          ufficiali dell&apos;evento. Non sostituisce l&apos;informativa privacy
          e non è il consenso al trattamento dei dati della candidatura.
        </p>
        <p className="mt-2">
          La lettura è necessaria per rendere il consenso informato. La
          prestazione del consenso è facoltativa: il rifiuto non pregiudica
          l&apos;invio né la valutazione della candidatura.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          2. Chi autorizza e chi è autorizzato
        </h2>
        <p className="mt-3">
          Chi compila il form (nome, cognome e recapiti ivi indicati) autorizza,
          se sceglie &quot;Sì&quot;, il Titolare <PolicyTodo>{org.controllerName}</PolicyTodo>
          , in forma di <PolicyTodo>{org.legalForm}</PolicyTodo>, C.F.{" "}
          <PolicyTodo>{org.taxCode}</PolicyTodo>, con sede in{" "}
          <PolicyTodo>{org.registeredOffice}</PolicyTodo>, a effettuare e
          utilizzare le riprese nei limiti di questo documento.
        </p>
        <p className="mt-2">
          Contatti per revoca e diritti: email{" "}
          <PolicyTodo>{org.privacyEmail}</PolicyTodo>, PEC{" "}
          <PolicyTodo>{org.pec}</PolicyTodo>, telefono{" "}
          <PolicyTodo>{org.phone}</PolicyTodo>.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          3. Oggetto dell&apos;autorizzazione
        </h2>
        <p className="mt-3">
          Con il &quot;Sì&quot; si autorizza, a titolo gratuito e senza
          corrispettivo, la ripresa, registrazione, conservazione, adattamento
          tecnico (taglio, montaggio, ridimensionamento, sottotitoli, grafica
          dell&apos;evento) e pubblicazione di materiale fotografico, video e
          audio in cui la persona appaia, anche riconoscibile, durante{" "}
          <PolicyTodo>{org.eventEdition}</PolicyTodo> ({org.eventName}), a{" "}
          <PolicyTodo>{org.eventPlace}</PolicyTodo> dal{" "}
          <PolicyTodo>{org.eventDates}</PolicyTodo>, nello svolgimento
          dell&apos;attività di staff.
        </p>
        <p className="mt-2">
          L&apos;autorizzazione copre anche l&apos;eventuale indicazione di
          nome e ruolo (es. tag, credit, didascalia) sui canali elencati.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          4. Finalità e canali
        </h2>
        <p className="mt-3">Le riprese sono usate solo per:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            documentare lo svolgimento dell&apos;evento e l&apos;attività dello
            staff;
          </li>
          <li>
            promuovere la Leonessa Cup e le edizioni successive sui canali
            ufficiali del Titolare.
          </li>
        </ul>
        <p className="mt-2">
          Canali di pubblicazione: <PolicyTodo>{org.socialChannels}</PolicyTodo>{" "}
          e sito <PolicyTodo>{org.website}</PolicyTodo>. La diffusione sui
          social può rendere i contenuti visibili anche fuori dall&apos;Italia e
          replicabili da terzi secondo le regole delle piattaforme, sulle quali
          il Titolare non ha pieno controllo dopo la pubblicazione.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          5. Durata, territorio e gratuità
        </h2>
        <p className="mt-3">
          L&apos;autorizzazione vale per il periodo di conservazione indicato
          nell&apos;informativa privacy:{" "}
          <PolicyTodo>{org.retentionMedia}</PolicyTodo>. Il territorio è
          l&apos;Italia e, per effetto della rete, qualunque Paese in cui i
          canali siano accessibili.
        </p>
        <p className="mt-2">
          Nessun compenso è dovuto, salvo diverso accordo scritto. Non si
          trasferiscono diritti di sfruttamento commerciale a terzi estranei
          all&apos;iniziativa.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          6. Usi esclusi
        </h2>
        <p className="mt-3">Il &quot;Sì&quot; non autorizza:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            usi pubblicitari o di sponsorizzazione per conto di terzi, campagne
            a pagamento o cessione onerosa delle immagini;
          </li>
          <li>
            addestramento di modelli di intelligenza artificiale o
            generazione di contenuti sintetici con l&apos;immagine della
            persona;
          </li>
          <li>
            pubblicazioni lesive dell&apos;onore, della reputazione o del
            decoro (art. 10 c.c. e art. 97, secondo periodo, L. 633/1941);
          </li>
          <li>
            trattamenti ulteriori rispetto a quelli descritti, senza nuova
            informativa e, ove dovuto, nuovo consenso.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          7. Se scegli No
        </h2>
        <p className="mt-3">
          Puoi candidarti lo stesso. Il Titolare si impegna, nei limiti del
          ragionevole, a non pubblicare primi piani, interviste dedicate, storie
          o tag che ti abbiano come soggetto principale.
        </p>
        <p className="mt-2">
          Restano possibili riprese di contesto dell&apos;evento sportivo
          pubblico (gruppi, campo, pubblico) in cui non sei il soggetto
          principale, ai sensi dell&apos;art. 97 L. 633/1941 e, per il GDPR,
          del legittimo interesse alla documentazione dell&apos;evento. Puoi
          opporti anche a questi usi contattando il Titolare.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          8. Revoca
        </h2>
        <p className="mt-3">
          Il consenso è revocabile in qualsiasi momento, con la stessa facilità
          con cui è stato prestato, scrivendo a{" "}
          <PolicyTodo>{org.privacyEmail}</PolicyTodo> o PEC{" "}
          <PolicyTodo>{org.pec}</PolicyTodo>, con nome, cognome e, se possibile,
          riferimento al contenuto. La revoca non rende illecito quanto già
          lecitamente pubblicato prima, ma ferma i nuovi utilizzi. Per i
          contenuti già online il Titolare ne chiederà la rimozione o la
          modifica nei limiti tecnici delle piattaforme.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          9. Dati personali e rinvio all&apos;informativa
        </h2>
        <p className="mt-3">
          Immagine e voce sono dati personali. Base giuridica del trattamento
          per primi piani, interviste e pubblicazione promozionale sui canali
          indicati: consenso, art. 6, par. 1, lett. a) GDPR, raccolto con scelta
          Sì/No distinta dalla candidatura. Il Titolare deve poter dimostrare il
          consenso (art. 7 GDPR): nel form restano registrati scelta, data e
          versione di questa liberatoria.
        </p>
        <p className="mt-2">
          Destinatari, trasferimenti extra-SEE, tempi di conservazione, misure
          di sicurezza e diritti (accesso, rettifica, cancellazione,
          limitazione, portabilità, opposizione, reclamo al{" "}
          {org.supervisoryAuthority}) sono descritti nell&apos;
          <Link
            href={POLICY_PATHS.privacy}
            className="text-mint underline underline-offset-2"
          >
            informativa privacy
          </Link>
          , che va letta insieme a questo documento.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          10. Età
        </h2>
        <p className="mt-3">
          Il form è riservato a chi ha compiuto {STAFF_MIN_AGE} anni. Non è
          prevista la candidatura di minori né un consenso di chi esercita la
          responsabilità genitoriale. Se in futuro fossero ammessi minori, la
          pubblicazione dell&apos;immagine richiederebbe il consenso di chi
          esercita la responsabilità genitoriale, secondo art. 8 GDPR, art.
          2-quinquies del Codice Privacy e, per i social, le cautele sul
          consenso di entrambi i genitori.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-widest text-white uppercase">
          11. Aggiornamenti
        </h2>
        <p className="mt-3">
          Liberatoria in versione {MEDIA_POLICY_VERSION}. Modifiche sostanziali
          saranno pubblicate su questa pagina e, se cambiano ciò a cui si
          acconsente, potrà essere chiesta una nuova scelta. Form candidature:{" "}
          <PolicyTodo>{org.formUrl}</PolicyTodo>.
        </p>
      </section>
    </article>
  );
}
