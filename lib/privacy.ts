export const PRIVACY_POLICY_VERSION = "1.0";

/** Replace every DA-COMPILARE value before going live. */
export const PRIVACY_ORG = {
  controllerName: "[DA COMPILARE: denominazione del Titolare]",
  legalForm: "[DA COMPILARE: ASD / SSD / APS / Associazione / Società]",
  taxCode: "[DA COMPILARE: Codice Fiscale]",
  vatNumber: "[DA COMPILARE: Partita IVA, se presente, altrimenti 'non assegnata']",
  registeredOffice: "[DA COMPILARE: indirizzo completo della sede legale]",
  privacyEmail: "[DA COMPILARE: email per richieste privacy]",
  pec: "[DA COMPILARE: PEC del Titolare]",
  phone: "[DA COMPILARE: recapito telefonico del Titolare]",
  dpoAppointed: false,
  dpoName: "[DA COMPILARE: nome e cognome del DPO, se nominato]",
  dpoEmail: "[DA COMPILARE: email del DPO, se nominato]",
  eventName: "Leonessa Cup",
  eventEdition: "[DA COMPILARE: edizione e anno, es. Leonessa Cup 2026]",
  eventPlace: "[DA COMPILARE: comune e impianto/sede dell'evento]",
  eventDates: "[DA COMPILARE: date di inizio e fine evento]",
  website: "[DA COMPILARE: URL del sito ufficiale]",
  formUrl: "[DA COMPILARE: URL di questo form]",
  socialChannels:
    "[DA COMPILARE: elenco canali, es. Instagram @..., Facebook, TikTok, YouTube, sito]",
  hostingProvider:
    "[DA COMPILARE: fornitore di hosting e sede, es. Vercel Inc. / altro, con Paese]",
  otherProcessors:
    "[DA COMPILARE: altri responsabili, es. email provider, cloud storage, fotografo]",
  retentionApplications:
    "[DA COMPILARE: es. 24 mesi dalla conclusione dell'edizione]",
  retentionMedia:
    "[DA COMPILARE: es. 36 mesi dalla pubblicazione o fino a revoca del consenso]",
  lastUpdated: "[DA COMPILARE: data di ultimo aggiornamento, es. 18 settembre 2026]",
  transferCountries:
    "[DA COMPILARE: Paesi extra-SEE, se presenti, e garanzie, es. USA / Data Privacy Framework o SCC]",
  supervisoryAuthority: "Garante per la protezione dei dati personali",
  supervisoryUrl: "https://www.gpdp.it",
} as const;
