Implement Next.js 14 with Lucia auth

<br />
build and run docker db container

```
docker compose up -d
```

<br />
.env

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres

GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GOOGLE_REDIRECT_URI=""

# Gmail app password
# https://myaccount.google.com/apppasswords
SMTP_PASSWORD=""
SMTP_EMAIL=""
```
