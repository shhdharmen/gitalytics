# Gitalytics

> A simple overview of your github activities <https://gitalytics.shhdharmen.me>

<p align="center">
<img src="./gitalytics.png" alt="Gitalytics">
</p>

## Instructions to Deploy to App Platform

### Environment Variables

A sample is provided a `.env.sample` file.

| Variable        | Description                                  | Dev Value                        | Prod Value                       | Needed for           |
| --------------- | -------------------------------------------- | -------------------------------- | -------------------------------- | -------------------- |
| PAT             | GitHub Person Access Token                   | `TOKEN`                          | `TOKEN`                          | Backend              |
| API_URL         | GitHub GraphQL API Endpoint                  | `https://api.github.com/graphql` | `https://api.github.com/graphql` | Backend              |
| PORT            | Where you want to run your nestjs app        | `3000`                           | `8080`                           | Backend              |
| WHITELIST_URL   | Comma separated URLs to allow access to APIs | `http://localhost:4200`          | `FRONT_END_APP_URL`              | Backend              |
| NODE_ENV        | Environment where app is running             | `development`                    | `production`                     | Backend and Frontend |
| BACKEND_API_URL | URL where api is running                     | `/api`                           | `BACK_END_APP_URL`               | Frontend             |

### Important Notes on Deployment

- Make sure you have all your environment variables in place
- You will need to add frontend app urls separated by comma to `WHITELIST_URL` in environment variables
- You will need to add backend api url in `BACKEND_API_URL` in environment variables

You can use the Deploy to DigitalOcean buttons to deploy this repo directly to App Platform.

### Backend

[![Deploy to DO](https://mp-assets1.sfo2.digitaloceanspaces.com/deploy-to-do/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/shhdharmen/gitalytics/tree/deploy-backend&refcode=33d8c03500a4)

### Frontend

[![Deploy to DO](https://mp-assets1.sfo2.digitaloceanspaces.com/deploy-to-do/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/shhdharmen/gitalytics/tree/main&refcode=33d8c03500a4)
