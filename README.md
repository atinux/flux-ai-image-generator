# Generate images with AI using Flux-1 Schnell on Cloudflare

Deploy this application on your Cloudflare account and generate images with AI using Flux-1 Schell. Each image is generated with a prompt and number of steps and save in your Cloudflare R2 bucket.

https://github.com/user-attachments/assets/3d69ea0a-36e7-4698-a736-aa6bce551161

## Features

- Basic auth with username and password
- Generate images with Flux-1 Schell
- Save images to your Cloudflare R2 bucket
- AI Image gallery in development & production with [NuxtHub Blob](https://hub.nuxt.com/docs/features/blob)
- One click deploy on 275+ locations for free

[![Deploy to NuxtHub](https://hub.nuxt.com/button.svg)](https://hub.nuxt.com/new?template=flux-image-generator)

## Setup

Make sure to install the dependencies with [pnpm](https://pnpm.io/installation#using-corepack):

```bash
pnpm install
```

Link your project to [NuxtHub](https://hub.nuxt.com) after linking your Cloudflare account:

```bash
npx nuxthub link
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

## Deploy


Deploy the application on the Edge with [NuxtHub](https://hub.nuxt.com) on your Cloudflare account:

```bash
npx nuxthub deploy
```

Then checkout your server logs, analaytics and more in the [NuxtHub Admin](https://admin.hub.nuxt.com).

You can also deploy using [Cloudflare Pages CI](https://hub.nuxt.com/docs/getting-started/deploy#cloudflare-pages-ci).

