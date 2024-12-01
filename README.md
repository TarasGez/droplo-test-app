# Droplo Test App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
You can view the live application at [droplo-test-app.vercel.app](https://droplo-test-app.vercel.app).

## Project Overview

This project is designed to provide a flexible and interactive menu management system with features such as adding, editing, and deleting menu items. It allows users to manage a hierarchical menu structure, including nested submenus. The project also leverages modern web technologies and practices to ensure high performance and a seamless user experience.

## Main Functionality

- **Menu Creation**: Easily create new menu items and add them to the main menu or as submenus.
- **Menu Editing**: Modify existing menu items, including their labels and links.
- **Menu Deletion**: Remove menu items as needed.
- **Drag-and-Drop Support**: Rearrange menu items and submenus using drag-and-drop functionality provided by [Dnd Kit](https://dndkit.com/).
- **Form Validation**: Ensures that menu labels are unique and do not contain dangerous characters for security (XSS prevention).
- **Responsive Design**: The UI is optimized for both desktop and mobile views.
- **Automatic Font Optimization**: Utilizes Next.js's font optimization to load the Geist font efficiently.

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Eslint & Prettier

Use linter to format the code:

```bash
yarn lint
yarn fix

yarn prettier
yarn format
```

## Tests

Check tests and coverage:

```bash
yarn test
yarn test:cov
```

### Font Optimization

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Key Features and Functions

### 1. **Menu Management**

- Add new menu items to the main menu or as submenus.
- Edit existing menu items, changing their labels and links.
- Delete unwanted menu items.

### 2. **Drag-and-Drop Functionality**

- Rearrange menu items and submenus easily with drag-and-drop support.
- Intuitive interface for organizing menu structure.

### 3. **Form Validation**

- Input validation for menu item labels to ensure they only contain allowed characters.
- Uniqueness check for labels to prevent duplicate entries.
- XSS prevention by checking for potentially dangerous characters in labels.

### 4. **Responsive User Interface**

- Designed to be fully responsive, providing a seamless experience on both desktop and mobile devices.
- Optimized for usability and performance.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
