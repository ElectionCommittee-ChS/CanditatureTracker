# Tracker for FuM Candidature

Display live stats of registered candidates for FuM.

## How to update?

1. Update `spreadsheetId` in `backend/getData.js` with the correct spreadsheet id.
2. Push to github

### How to change account

1. Create a `credentials.json`
2. Update `backend/secret/credentials.json` with the correct data on the server.

## Deploy

Easiest with docker-compose:

```yml
version: "3"

services:
  fum-election-canditature:
    image: ghcr.io/electioncommittee-chs/canditaturetracker:main
    container_name: fum-election-canditature
    restart: unless-stopped
    volumes:
      - canditature-secrets:/usr/src/app/backend/secret

volumes:
  canditature-secrets:
```

## Development

This could be made smoother but this works for now:

### Frontend

```sh
# in backend/
npm install
npm start

# another terminal in frontend/
npm install
npm run dev
```

### Backend

```sh
# in frontend/
npm install
npm run build

# another terminal in backend/
npm install
npm run dev
```

### Test docker-compose

```sh
docker-compose up --build --force-recreate
```
