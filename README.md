# Utslippslogg

### Bakgrunn

Bærekraft og luftkvalitet blir stadig viktigere i industri og samfunn. Bedrifter må dokumentere, overvåke og redusere sine utslipp for å møte regulatoriske krav og miljømål. Utslippslogg er en plattform som gjør dette enklere.

### Om prosjektet

Utslippslogg er en dataplattform for logging, lagring og analyse av luftutslippsmålinger. Systemet samler inn måledata, lagrer det sentralt, og presenterer det i et oversiktlig dashboard som gjør det enkelt å oppdage trender og mønstre. Plattformen støtter måling av ulike stoffer på flere målepunkter og rapportering som gir et helhetlig bilde av virksomhetens utslipp.

### Hovedfunksjoner

#### Sanntidsovervåkning

Se live målinger med varsler når verdier nærmer seg farenivåverdier.

#### Historisk analyse

Visualiser daglige, månedlige og årlige trender over tid.

#### Hendelseskorrelasjon

Koble utslippstopper til operasjonelle hendelser som vedlikehold, produksjonsendringer og værforhold.

#### Effektmåling

Mål om tiltak faktisk reduserer utslipp over tid.

#### Rapportering

Generer rapporter for internbruk eller innsending til myndigheter.

### Målgruppe

- Industrianlegg med utslippstillatelser
- Miljøavdelinger som trenger dokumentasjon
- Driftsansvarlige som vil optimalisere prosesser
- Konsulenter som utfører miljøanalyser

### Referanser

- https://www.miljodirektoratet.no/publikasjoner/2014/februar-2014/veiledning-til-egenkontrollrapportering/

## Krav

Hva er kjernekravene til programmet?

- Hvilke krav har brukerne?
  - Lagre data for målingene
  - Tid og dato for målingene
  - Kjemiske stoffer målt
  - Måleverdi ( Enhet mg/Nm³, kg/time, tonn/år )
  - Målepunkt (ID/navn)
  - Måleutstyr (Info om måleinstrumentet)
  - Temperatur (yr.no verdier)
  - Nedbørsverdi i området (yr.no verdier)
  - Vindmålinger (yr.no verdier)
  - Automatisk/manuell målinger
  - Presentere dataene på en oversiktlig måte - Lage rapporter

## Techstack being used

**Frontend**

- React 19 + TypeScript
- Vite (build tool)
- Tailwind CSS v4
- shadcn/ui (component library)
- TanStack Router (in progress)
- ESLint (linting)

**Backend**

- FastAPI + Python
- PostgreSQL

### Database struktur
Ferdig normalisert database is 4NF form
<img width="838" height="523" alt="Utslippslogg Database Structure" src="https://github.com/user-attachments/assets/703350bf-6862-47ca-b2e0-3d7d58b4288d" />
