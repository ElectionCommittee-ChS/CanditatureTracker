# Tracker for FuM Candidature
Display live stats of registered candidates for FuM.

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