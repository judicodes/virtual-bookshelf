# Virtual Bookshelf Application

This is a small prototype of a Virtual Bookshelf Application where users can browse and add books they have read or want to read.

The goal is to demo how to quickly build a full-stack prototype/MVP.

## Tech Stack

- React
- TypeScript
- Vite
- yarn
- TailwindCSS

## Running the application locally

A local installation of Node.js is required, as well as yarn package manager.

If you don't have yarn: `npm i -g yarn`.

```
$ yarn
$ yarn dev
```

### To connect to the Supabase database:

- Create a copy of the file `.local.env`:
  ```
  $ cp .local.env .env
  ```
- Go to the Supabase Dashboard and copy the URL and anon key
- Paste the values into the `.env` file
- Restart the application if you already had it running

Open the application in the browser at the port displayed in the terminal.

## Linting and formatting

ESLint and Prettier are installed to fix linting and formatting issues.

Both tools will run in a git pre-commit hook on every commit.

```
$ yarn format:check  # check for formatting issues
$ yarn format:fix    # auto-fix formatting issues
$ yarn lint          # check for linting issues
```
