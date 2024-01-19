# karvalet
 A small project that gives "live" statistics on Chalmers student unions council elections

## Project Setup

```sh
yarn
```

### Development

```sh
yarn dev
```

### Build
```sh
yarn build
```
the buit files can be found in /public and copied to relevant place for production use.

## Update for a new year
1. In `/src/views/HomeView.vue` update the students_by_division object to correct values of how many total students each division has
2. Update the `../getData.sh` file with a new `mecenat.id` and `ASP.NET_SessionId`. You can get these by logging in on your mecenat account -> opening devTools -> finding the correct cookies

4. build the project using `yarn build`
5. copy `/public` and `../getData.sh` to the correct place for hosting
6. Update the `../getData.sh` file with the location for the `data.json` file (last part of the script)
7. Setup something that makes the `../getData.sh` file periodically update. For example a cronjob or similar. Alternatively run the file manually whenever you want updated values from mecenat
   
   
