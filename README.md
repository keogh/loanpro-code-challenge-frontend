# LoanPro Challenge Frontend

This is a Single Page Application (SPA) that connects to an API in Django
which provides endpoints to create and manage arithmetic operations

## Installation

You need node v20 installed. You could use something like [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm).

Clone repo
```bash
git clone git@github.com:keogh/loanpro-code-challenge-frontend.git
cd loanpro-code-challenge-frontend
```

Install dependencies

```bash
npm install
```

Start server
```bash
npm start
```

Remember the Backend Server should be up and running as well in `http://127.0.0.1:8000`.

If you are running the backend server in a different host or port.
Please specify it in `src/domain/Api/routes.ts` file, look for the 
variable `BASE_URL` and set it to your correct host and port.

### Sign-in

In order to use this app you need to sign-in, there are two sample users:
- `testuser/123qweasd`, user with over 1k records
- `tesuser2/123qweasd`, user with balance equals to 1

## Roadmap (aka as TODO)

At some point I had to stop in order to deliver. However some features
and ideas are in TODO:

- [ ] Show User balance
- [ ] Tests for React
- [ ] Fix CI/CD for Backend repository
- [ ] Empty States
- [ ] Breadcrumb
- [ ] Record Details
- [ ] Animations for Flash messages
- [ ] Flash Variants styles
- [ ] Pagination: Better PerPage dropdown options based on total results 

