# Dev Configuration Routine

1. Open new terminal and run `git pull origin dev`
2. If you have seen in the terminal that the "package.json" has been changed, run `npm install` to install the new dependencies.
3. One time login only on planetscale web browser.
   - If your pscale is not setup link is [here](https://planetscale.com/docs/concepts/planetscale-environment-setup)
   - Back to VSCODE and open terminal run `pscale auth login` - ONETIME LOGIN
4. Open another terminal `pscale connect i-habilin dev --org ihabilindevs` it should not be close while you are developing.
5. Another terminal `npx prisma db push` and then close it after
6. `npm run dev`


## How to Commit a file
1. Refer to the issue referencing number: 
For Example:
![image](https://user-images.githubusercontent.com/79455416/228550629-095ecd38-6ba9-443b-b68b-a3fb04f4ca55.png)

2. As reference above image here is an commit mesage copy the title issue and the number reference\
`git commit -m "ISSUE #18: Page responsive & Currency Formatter"`
