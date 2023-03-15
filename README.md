# Dev Configuration Routine

1. Open new terminal and run `git pull` if you are first time github user `git pull -u origin main`
2. One time login only on planetscale web browser.
    - If your pscale is not setup link is [here](https://planetscale.com/docs/concepts/planetscale-environment-setup)
    - Back to VSCODE and open terminal run `pscale auth login`  - ONETIME LOGIN
3. Open another terminal `pscale connect i-habilin dev --org ihabilindevs` it should not be close while you are developing.
4. Another terminal `npx prisma db push` and then close it after
5. `npm run dev`
   
