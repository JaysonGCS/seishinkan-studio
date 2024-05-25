# Seishinkan Studio 2.0

## About

This is the source code for the Seishinkan Studio 2.0 [website](https://www.seishinkansg.com/).

## Status

### General/UIUX

- ![Progress](https://progress-bar.dev/100/?title=progress) Navigation (Desktop)
- ![Progress](https://progress-bar.dev/50/?title=progress) Navigation (Mobile)

### Page Development

- ![Progress](https://progress-bar.dev/0/?title=progress) Home Page
- ![Progress](https://progress-bar.dev/0/?title=progress) About Page
- ![Progress](https://progress-bar.dev/0/?title=progress) News & Articles Page
- ![Progress](https://progress-bar.dev/0/?title=progress) Kendo Page
- ![Progress](https://progress-bar.dev/0/?title=progress) Studio Rental Page
- ![Stable](https://progress-bar.dev/100/?title=stable) Contact Page
- ![Stable](https://progress-bar.dev/100/?title=stable) Login and Signup
- ![Progress](https://progress-bar.dev/0/?title=progress) Internal Profile Page
- ![Progress](https://progress-bar.dev/0/?title=progress) Internal Member Page

### Core Functionalities

- ![Stable](https://progress-bar.dev/100/?title=stable) Captcha Mechanism and Strategy
- ![Stable](https://progress-bar.dev/100/?title=stable) Auth Mechanism
- ![Progress](https://progress-bar.dev/0/?title=stable) Media Upload and Page Integration

### Others

- ![Progress](https://progress-bar.dev/0/?title=stable) Analytics Integration
- ![Progress](https://progress-bar.dev/0/?title=stable) Ads Integration
- ![Progress](https://progress-bar.dev/0/?title=stable) CMS - Integrate Preview
- ![Progress](https://progress-bar.dev/0/?title=stable) CMS - Object Storage for Media
- ![Progress](https://progress-bar.dev/0/?title=stable) Devops - Deployment/Hosting Integration
- ![Stable](https://progress-bar.dev/100/?title=stable) Devops - Custom PayloadCMS + Next.js 14 Build Workflow

## Development

### Tech Stack

- Front-end:
  - [Next.js](https://nextjs.org/)
  - [Shadcn UI](https://ui.shadcn.com/)
  - [Jotai](https://jotai.org/)
- CMS:
  - [PayloadCMS](https://payloadcms.com/)

### Quick Start

```Shell
# Generate TypeScript types based on the current PayloadCMS configuration
npm run generate:types

# Run the full application locally (PayloadCMS and Next App)
npm run dev-express

# Build everything
npm run build:all

# Serve production build
npm run serve

```
