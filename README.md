# Hibachi Survey Spark

A web application for wallet verification and surveys.

## About

This project is a survey platform for Hibachi that includes wallet verification and rewards. It allows users to connect their wallets, verify they are on an approved list, complete a survey, and receive rewards.

## Technologies

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Web3Modal and ethers.js for wallet connectivity

## Getting Started

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd hibachi-survey-spark

# Step 3: Install the necessary dependencies
npm i

# Step 4: Start the development server
npm run dev
```

## Features

- Wallet connection using MetaMask and other providers
- Verification against an approved list of addresses
- Dynamic survey questions
- Reward distribution mechanism
- Hibachi branding integration

## Project Structure

- `/src/components` - React components
- `/src/lib` - Utility functions for wallet connection and verification
- `/public/assets` - Images and other static assets
