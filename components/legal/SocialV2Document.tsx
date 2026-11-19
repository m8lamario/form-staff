import { PolicyTodo } from "@/components/PolicyTodo";
import { LegalHeading, PlaceholderNotice } from "@/components/legal/LegalChrome";
import { CONTROLLER, EVENT_PLACEHOLDERS, POLICY_PATHS, SOCIAL_VERSION } from "@/lib/legal";
import Link from "next/link";

const linkClass = "text-mint underline underline-offset-2";

export function SocialV2Document() {
  return (
    <article className="space-y-8 text-sm leading-7 text-white/85">
      <PlaceholderNotice />
      <p>
        Liberatoria foto, video e social — staff Leonessa Cup, versione{" "}
        {SOCIAL_VERSION}. La versione precedente resta consultabile:{" "}
        <Link href={POLICY_PATHS.socialArchive} className={linkClass}>
          liberatoria 1.0
        </Link>
        .
      </p>

      <section>
        <LegalHeading>Sezione A — Maggiorenni</LegalHeading>
        <p className="mt-3">
          Liberatoria per l&apos;utilizzo di immagini e riprese audio-video e
          per il trattamento dei relativi dati personali — staff Leonessa Cup,
          ai sensi dell&apos;art. 10 c.c., degli artt. 96 e 97 L. 633/1941 e
          degli artt. 6.1.a e 7 GDPR. Stagione 2026/2027.
        </p>
        <p className="mt-3">
          {CONTROLLER.name}, con sede in {CONTROLLER.address} («
          {CONTROLLER.shortName}»), organizza la Leonessa Cup della Lega Calcio
          Studenti, comprese le eventuali fasi finali tra le città. Durante
          partite, premiazioni, conferenze ed eventi collegati, ESL realizza
          foto, video, interviste e dirette streaming, direttamente o tramite
          fotografi, videomaker e media partner incaricati. In questi contenuti
          possono comparire anche i componenti dello staff («Immagini»). Con le
          caselle del form scegli, uso per uso, se autorizzarne la pubblicazione.
        </p>
        <p className="mt-3">
          Questa liberatoria riguarda la tua immagine. I diritti sui contenuti
          che produci tu come staff (foto, video, articoli, interviste) sono
          regolati dall&apos;
          <Link href={POLICY_PATHS.diritti} className={linkClass}>
            art. 8 delle condizioni
          </Link>
          .
        </p>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>
            <strong>Oggetto.</strong> Per ogni uso che spunti, autorizzi ESL a
            riprendere, registrare, pubblicare e diffondere le Immagini, la tua
            voce, il tuo nome e il tuo ruolo nello staff. Gli usi non spuntati
            non sono autorizzati.
          </li>
          <li>
            <strong>Modalità d&apos;uso.</strong> Le Immagini possono essere
            montate, tagliate e adattate ai formati dei diversi canali, senza
            alterarne il significato. Sono visibili senza limiti territoriali,
            perché i canali online sono accessibili da tutto il mondo. ESL non
            tagga profili social personali senza richiesta.
          </li>
          <li>
            <strong>Limiti.</strong> È vietato ogni uso che pregiudichi dignità,
            onore, reputazione o decoro della persona ritratta (art. 10 c.c.;
            art. 97, comma 2, L. 633/1941). Le Immagini non sono cedute a terzi
            per usi diversi da quelli autorizzati e non sono usate per
            presentarti come testimonial di prodotti senza un accordo specifico.
            Non sono usate per addestrare sistemi di intelligenza artificiale né
            per generare contenuti sintetici con la tua immagine.
          </li>
          <li>
            <strong>Gratuità.</strong> L&apos;autorizzazione è gratuita: per gli
            usi autorizzati non è dovuto alcun compenso.
          </li>
          <li>
            <strong>Durata e revoca.</strong> L&apos;autorizzazione vale fino a
            revoca e comunque per non oltre 10 anni dalla fine della stagione.
            Puoi revocarla in qualsiasi momento, anche per un solo uso, scrivendo
            a {CONTROLLER.privacyEmail}{" "}
            <PolicyTodo>o dal link di revoca, quando l&apos;email è attiva</PolicyTodo>
            . Dopo la revoca o la scadenza ESL non pubblica nuovi contenuti con
            le tue Immagini e rimuove entro 30 giorni, quando tecnicamente
            possibile, quelli sui propri canali. Non possono essere ritirati il
            materiale già stampato o consegnato a terzi prima della revoca, gli
            articoli delle testate giornalistiche e le condivisioni fatte da
            terzi. Dopo la revoca ESL cancella le Immagini anche dai propri
            archivi entro 30 giorni, salvo quanto serve per la difesa di un
            diritto.
          </li>
          <li>
            <strong>Immagini d&apos;insieme.</strong> Anche senza consenso, ESL
            può pubblicare immagini d&apos;insieme (tribune, panoramiche del
            campo, gruppi) in cui la persona non è il soggetto principale e non
            è facilmente riconoscibile. Su richiesta, ESL rende la persona non
            riconoscibile anche in queste immagini.
          </li>
          <li>
            <strong>Dati personali.</strong> Le Immagini sono dati personali
            trattati da ESL, titolare del trattamento, sulla base del tuo
            consenso (art. 6.1.a GDPR) e secondo l&apos;
            <Link href={POLICY_PATHS.privacy} className={linkClass}>
              informativa privacy
            </Link>
            . Puoi esercitare i diritti degli artt. 15–22 GDPR scrivendo a{" "}
            {CONTROLLER.privacyEmail} e proporre reclamo al Garante. Se qualcuno
            ripubblica abusivamente le tue Immagini, ESL, su tua richiesta, lo
            segnala alla piattaforma e ne chiede la rimozione.
          </li>
          <li>
            <strong>Facoltatività.</strong> Dare o negare questi consensi non
            incide sulla candidatura né sulla selezione.
          </li>
        </ol>
      </section>

      <section id="minori">
        <LegalHeading>Sezione B — Minorenni di 16–17 anni</LegalHeading>
        <p className="mt-3">
          Liberatoria per l&apos;utilizzo di immagini e riprese audio-video di
          minore e per il trattamento dei relativi dati personali — staff
          Leonessa Cup, ai sensi dell&apos;art. 10 c.c., degli artt. 96 e 97 L.
          633/1941, degli artt. 2, 316 e 320 c.c. e degli artt. 6.1.a e 7 GDPR —
          versione {SOCIAL_VERSION}. Stessa premessa della Sezione A.
        </p>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>
            <strong>Oggetto e consenso di entrambi i genitori.</strong> Per ogni
            uso spuntato, i genitori autorizzano ESL a riprendere, registrare,
            pubblicare e diffondere le Immagini, la voce, il nome e il ruolo del
            minore nello staff. Pubblicare online le immagini di un minore
            richiede il consenso di entrambi i genitori. L&apos;autorizzazione
            diventa attiva solo quando anche l&apos;altro genitore la conferma
            (C1), salvo che chi è indicato come contatto sia l&apos;unico
            esercente la responsabilità genitoriale. Serve anche l&apos;accordo
            del minore (casella G16). Finché manca la conferma, ESL non pubblica
            Immagini in cui il minore è riconoscibile. Senza conferma il minore
            può comunque far parte dello staff.
          </li>
          <li>
            <strong>Modalità d&apos;uso.</strong> Come la Sezione A. Nelle
            didascalie il minore compare con nome e iniziale del cognome, salvo
            consenso al cognome completo. ESL non tagga profili social del
            minore, non pubblica recapiti, residenza o altri dati che ne
            permettano la localizzazione e non usa le Immagini per profilazione.
          </li>
          <li>
            <strong>Tutela del minore.</strong> È vietato ogni uso che
            pregiudichi dignità, onore, reputazione o decoro del minore (art. 10
            c.c.; art. 97, comma 2, L. 633/1941) o che sia contrario al suo
            interesse. Non si pubblicano Immagini del minore in situazioni di
            disagio, dopo un infortunio, negli spogliatoi o in atteggiamenti che
            possano esporlo a derisione. Le Immagini non sono cedute a terzi per
            usi diversi da quelli autorizzati e il minore non è mai presentato
            come testimonial di prodotti. Se serve, il minore viene oscurato.
          </li>
          <li>
            <strong>Gratuità.</strong> Come la Sezione A.
          </li>
          <li>
            <strong>Durata e revoca.</strong> L&apos;autorizzazione vale fino a
            revoca e per non oltre 10 anni dalla fine della stagione. Basta la
            revoca di uno solo dei genitori o, dopo i 18 anni, del/della
            partecipante, scrivendo a {CONTROLLER.privacyEmail}{" "}
            <PolicyTodo>o dal link di revoca, quando l&apos;email è attiva</PolicyTodo>
            , anche per un solo uso. Per il resto vale quanto previsto al punto
            5 della Sezione A.
          </li>
          <li>
            <strong>Dati personali.</strong> Le Immagini sono trattate da ESL
            sulla base del consenso dei genitori, rappresentanti legali del
            minore (art. 6.1.a GDPR; artt. 2 e 320 c.c.), secondo l&apos;
            <Link href={POLICY_PATHS.minori} className={linkClass}>
              informativa per minori
            </Link>
            .
          </li>
          <li>
            <strong>Facoltatività.</strong> Dare o negare questi consensi non
            incide sulla candidatura.
          </li>
        </ol>
      </section>

      <section>
        <LegalHeading>Canali</LegalHeading>
        <p className="mt-3">
          Per entrambe le sezioni: Instagram{" "}
          <a href={CONTROLLER.instagramLeonessa} className={linkClass} target="_blank" rel="noreferrer">
            @leonessacup
          </a>{" "}
          e{" "}
          <a href={CONTROLLER.instagramLcs} className={linkClass} target="_blank" rel="noreferrer">
            @lcsrealemutua
          </a>
          ; TikTok{" "}
          <a href={CONTROLLER.tiktok} className={linkClass} target="_blank" rel="noreferrer">
            @leonessacup
          </a>
          ; sito {CONTROLLER.website};{" "}
          <PolicyTodo>{EVENT_PLACEHOLDERS.otherChannels}</PolicyTodo>. Accordo di
          contitolarità social: non previsto.
        </p>
      </section>
    </article>
  );
}
