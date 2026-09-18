# Form staff Leonessa Cup

Form di candidatura per lo staff della Leonessa Cup, con pannello admin per leggere le risposte e vedere i grafici di distribuzione sui ruoli.

## Avvio locale

```bash
cp .env.example .env
npm install
npx prisma migrate dev
npm run db:seed
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) per il form pubblico.

## Pagine

- `/` form staff: nome, cognome, telefono, email, partecipazione dell'anno scorso e ruolo preferito
- `/grazie` conferma dopo l'invio
- `/admin` totale risposte, elenco candidature e grafici sui ruoli
- `/admin/login` accesso admin

Password admin di default: `leonessa-cup` (modifica `ADMIN_PASSWORD` nel file `.env`).

Su desktop il form usa l'immagine verticale `public/hero.png`: sostituiscila con il file definitivo mantenendo lo stesso nome.

## Stack

- Next.js 15 e Tailwind
- Prisma + SQLite
- Recharts per i grafici admin
