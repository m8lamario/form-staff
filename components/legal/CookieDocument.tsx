import { LegalHeading, PlaceholderNotice } from "@/components/legal/LegalChrome";
import { CONTROLLER, COOKIE_VERSION } from "@/lib/legal";

export function CookieDocument() {
  return (
    <article className="space-y-8 text-sm leading-7 text-white/85">
      <PlaceholderNotice />
      <p>
        Informativa cookie — leonessacup.app, versione {COOKIE_VERSION}.
        Titolare: {CONTROLLER.name}, {CONTROLLER.address}, P.IVA/C.F.{" "}
        {CONTROLLER.vat} / {CONTROLLER.taxCode}, {CONTROLLER.privacyEmail}.
      </p>
      <p>Non usiamo cookie di statistica, profilazione o pubblicità.</p>

      <section>
        <LegalHeading>1. Cookie e storage usati</LegalHeading>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/20 text-mint">
                <th className="py-2 pr-3 font-medium">Nome</th>
                <th className="py-2 pr-3 font-medium">Dove</th>
                <th className="py-2 pr-3 font-medium">Finalità</th>
                <th className="py-2 pr-3 font-medium">Durata</th>
                <th className="py-2 pr-3 font-medium">Parte</th>
                <th className="py-2 font-medium">Qualificazione</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10 align-top">
                <td className="py-2 pr-3">leonessa_admin</td>
                <td className="py-2 pr-3">Cookie, solo dopo il login su /admin</td>
                <td className="py-2 pr-3">Sessione del pannello admin</td>
                <td className="py-2 pr-3">7 giorni</td>
                <td className="py-2 pr-3">Prima parte</td>
                <td className="py-2">Tecnico</td>
              </tr>
              <tr className="align-top">
                <td className="py-2 pr-3">leonessa_staff_notice</td>
                <td className="py-2 pr-3">sessionStorage del browser, dopo l&apos;invio del form</td>
                <td className="py-2 pr-3">
                  Mostrare l&apos;esito dell&apos;invio sulla pagina di
                  ringraziamento, poi viene cancellato
                </td>
                <td className="py-2 pr-3">Fino alla lettura della pagina, entro la sessione del browser</td>
                <td className="py-2 pr-3">Prima parte</td>
                <td className="py-2">Tecnico</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3">
          Il form non salva una bozza. Non ci sono altri cookie o chiavi di
          storage applicative.
        </p>
      </section>

      <section>
        <LegalHeading>2. Risorse esterne</LegalHeading>
        <p className="mt-3">
          I font Outfit e Barlow Condensed sono inclusi nel sito in fase di build
          tramite next/font e serviti dallo stesso dominio. Nel browser non
          risultano script di terze parti, pixel o servizi di statistica.
        </p>
      </section>

      <section>
        <LegalHeading>3. Base giuridica</LegalHeading>
        <p className="mt-3">
          I cookie e lo storage tecnici non richiedono consenso (art. 122, comma
          1, Codice privacy; Linee guida cookie del Garante, 10 giugno 2021).
        </p>
      </section>

      <section>
        <LegalHeading>4. Gestione</LegalHeading>
        <p className="mt-3">
          Il cookie di sessione si cancella con il logout dall&apos;area admin.
          Il resto si gestisce dalle impostazioni del browser.
        </p>
      </section>
    </article>
  );
}
