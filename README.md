# projekt
### Construct folders and needable packages from scratch
project
    |--- node_modules
    |--- src
          |--- configs(store config variables)
          |--- controllers
          |--- dbs
          |--- helpers
          |--- models
          |--- services
          |--- ultils
          |--- app.js
    |--- server.js
    |--- env (store environment variables, sensitive information)
    |--- .gitignore (hide sensitive files when uploading on gitHub)
    |--- package-lock.json
    |--- package.json
### Connect mongoDB to Node.js
1. No recommended for lv0 database connecting method
2. Apply singleton for connecting database
3. Check current number active connections
4. check if number of connections are overloading (use 'os' and 'process' packages)
5. Should we disconnect to db when connections overload ---> no need. 
6. poolSize
### Setup .env and config files