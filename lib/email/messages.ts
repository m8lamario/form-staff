import { MEDIA_KEYS, REVOKE_LABELS, type MediaKey } from "@/lib/consent-copy";
import { absoluteUrl, escapeHtml, eventSentence, policyLinks, renderEmail } from "@/lib/email/layout";
import { CONTROLLER, LEGAL, formatEventDates } from "@/lib/legal";

const MEDIA_SHORT: Record<MediaKey, string> = {
  media_channels: "Canali del torneo",
  media_promo: "Promozione ESL",
  media_sponsor: "Contenuti con sponsor",
  media_press: "Stampa",
  media_interviews: "Interviste",
};

function yesNo(value: boolean): string {
  return value ? "sì" : "no";
}

export function choiceLines(choices: Partial<Record<MediaKey | "fullSurname" | "rightsAssignment" | "comms_future", boolean>>): string {
  const lines = MEDIA_KEYS.map((key) => `${MEDIA_SHORT[key]}: ${yesNo(Boolean(choices[key]))}`);
  if (choices.fullSurname !== undefined) lines.push(`Cognome completo: ${yesNo(Boolean(choices.fullSurname))}`);
  if (choices.rightsAssignment !== undefined) lines.push(`Cessione dei diritti: ${yesNo(Boolean(choices.rightsAssignment))}`);
  if (choices.comms_future !== undefined) lines.push(`Comunicazioni future: ${yesNo(Boolean(choices.comms_future))}`);
  return lines.join("; ");
}

export function guardianInviteEmail(input: {
  guardianName: string;
  minorName: string;
  birthDate: string;
  roleLabel: string;
  token: string;
}) {
  const link = absoluteUrl(`/genitore/${input.token}`);
  const body = renderEmail({
    heading: "Conferma la candidatura allo staff",
    paragraphs: [
      `Gentile ${escapeHtml(input.guardianName)}, ${escapeHtml(input.minorName)} ha chiesto di entrare nello staff volontario della Leonessa Cup.`,
      `Riepilogo: nato/a il ${escapeHtml(input.birthDate)}, ruolo preferito ${escapeHtml(input.roleLabel)}. ${escapeHtml(eventSentence())}`,
      "La candidatura è valida solo dopo la sua conferma. Il link è personale, si usa una volta e scade dopo 60 giorni.",
      "Le autorizzazioni su foto, video, cognome completo e cessione dei diritti diventano attive dopo la conferma dell'altro genitore, salvo che lei sia l'unico esercente.",
    ],
    links: [{ href: link, label: "Apri la conferma" }, ...policyLinks()],
  });
  return { subject: `Conferma la candidatura di ${input.minorName}`, ...body };
}

export function secondGuardianEmail(input: {
  minorName: string;
  firstGuardianName: string;
  roleLabel: string;
  summary: string;
  token: string;
}) {
  const link = absoluteUrl(`/genitore/conferma/${input.token}`);
  const dates = formatEventDates(LEGAL.event, "sentence");
  const body = renderEmail({
    heading: "Conferma le scelte per la candidatura",
    paragraphs: [
      `Gentile genitore, ${escapeHtml(input.firstGuardianName)} ha autorizzato la candidatura di ${escapeHtml(input.minorName)} allo staff volontario della Leonessa Cup ${LEGAL.event.edition}, a ${LEGAL.event.city}, presso il ${LEGAL.event.venue}, ${dates}, nel ruolo di ${escapeHtml(input.roleLabel)}, e ha fatto queste scelte: ${escapeHtml(input.summary)}.`,
      "Può leggere l'informativa, l'informativa per minori, la liberatoria e le condizioni ai link seguenti.",
      `Informativa per lei (art. 14 GDPR): il titolare del trattamento è ${CONTROLLER.name}, ${CONTROLLER.address}, ${CONTROLLER.privacyEmail}. Il suo nome e la sua email ci sono stati forniti da ${escapeHtml(input.minorName)} / ${escapeHtml(input.firstGuardianName)}. Li usiamo solo per questa conferma e per comunicazioni di servizio sull'evento (art. 6.1.b GDPR): se conferma, per 24 mesi dalla fine della stagione, altrimenti li cancelliamo dopo 60 giorni. Può esercitare i diritti degli artt. 15–22 GDPR scrivendo a ${CONTROLLER.privacyEmail}.`,
      `Per rendere attive le autorizzazioni serve anche la sua conferma. Se non conferma, ${escapeHtml(input.minorName)} può comunque far parte dello staff, ma non verrà pubblicato/a in foto e video in modo riconoscibile e non potrà svolgere i ruoli Foto, Interviste, Giornale o Social.`,
    ],
    links: [
      { href: link, label: "Confermo le scelte sopra indicate" },
      { href: `mailto:${CONTROLLER.privacyEmail}`, label: "Non sono d'accordo con una o più scelte: scrivi alla privacy" },
      ...policyLinks(),
    ],
  });
  return { subject: `Conferma le scelte per la candidatura di ${input.minorName} allo staff della Leonessa Cup`, ...body };
}

export function confirmationEmail(input: {
  recipientName: string;
  personName: string;
  summary: string;
  revokeToken: string;
  audience: "adult" | "guardian";
}) {
  const link = absoluteUrl(`/revoca/${input.revokeToken}`);
  const intro =
    input.audience === "adult"
      ? `Ciao ${escapeHtml(input.recipientName)}, abbiamo ricevuto la tua candidatura allo staff della Leonessa Cup.`
      : `Gentile ${escapeHtml(input.recipientName)}, la candidatura di ${escapeHtml(input.personName)} è attiva per le scelte confermate.`;
  const body = renderEmail({
    heading: "Candidatura staff confermata",
    paragraphs: [
      intro,
      `Scelte registrate: ${escapeHtml(input.summary)}. ${escapeHtml(eventSentence())}`,
      "Dal link qui sotto puoi revocare i consensi ancora attivi. La revoca della cessione dei diritti non ritira i contenuti già realizzati.",
    ],
    links: [{ href: link, label: "Revoca un consenso" }, ...policyLinks()],
  });
  return {
    subject: input.audience === "adult" ? "Candidatura staff Leonessa Cup" : `Candidatura di ${input.personName} allo staff`,
    ...body,
  };
}

export function reminderEmail(input: { recipientName: string; subjectName: string; link: string }) {
  const body = renderEmail({
    heading: "Promemoria: conferma in attesa",
    paragraphs: [
      `Gentile ${escapeHtml(input.recipientName)}, la conferma per ${escapeHtml(input.subjectName)} è ancora in attesa. Il link precedente resta valido fino alla scadenza di 60 giorni. Questo è l'unico promemoria.`,
    ],
    links: [{ href: input.link, label: "Apri il link" }, ...policyLinks()],
  });
  return { subject: `Promemoria: conferma per ${input.subjectName}`, ...body };
}

export function reinformEmail(input: { firstName: string; token: string }) {
  const link = absoluteUrl(`/rinnovo/${input.token}`);
  const body = renderEmail({
    heading: "Informativa aggiornata sulla candidatura staff",
    paragraphs: [
      `Ciao ${escapeHtml(input.firstName)}, la tua candidatura allo staff della Leonessa Cup è stata inviata con un'informativa che non riportava ancora i dati del titolare.`,
      `Il titolare è ${CONTROLLER.name}, ${CONTROLLER.address}, P.IVA ${CONTROLLER.vat}. Ti chiediamo di leggere l'informativa aggiornata, la liberatoria e le condizioni e, se vuoi, di rinnovare le scelte su foto e video. Se il ruolo è Foto, Interviste, Giornale o Social puoi anche accettare la cessione dei diritti. Il link è personale e scade dopo 60 giorni.`,
    ],
    links: [{ href: link, label: "Leggi e aggiorna le scelte" }, ...policyLinks()],
  });
  return { subject: "Informativa aggiornata — candidatura staff Leonessa Cup", ...body };
}

export function reminderLinkFromHtml(html: string): string | null {
  const match = html.match(/https:\/\/www\.leonessacup\.app\/(?:genitore(?:\/conferma)?|rinnovo)\/[A-Za-z0-9_-]+/);
  return match?.[0] ?? null;
}

export { REVOKE_LABELS };
