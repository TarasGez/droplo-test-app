This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Droplo Test App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`<span>create</span><span>-next</span><span>-app</span>`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Overview

This project is designed to provide a flexible and interactive menu management system with features such as adding, editing, and deleting menu items. It allows users to manage a hierarchical menu structure, including nested submenus. The project also leverages modern web technologies and practices to ensure high performance and a seamless user experience.

## Main Functionality

- **Menu Creation** : Easily create new menu items and add them to the main menu or as submenus.
- **Menu Editing** : Modify existing menu items, including their labels and links.
- **Menu Deletion** : Remove menu items as needed.
- **Drag-and-Drop Support** : Rearrange menu items and submenus using drag-and-drop functionality.
- **Form Validation** : Ensures that menu labels are unique and do not contain dangerous characters for security (XSS prevention).
- **Responsive Design** : The UI is optimized for both desktop and mobile views.
- **Automatic Font Optimization** : Utilizes Next.js's font optimization to load the Geist font efficiently.

## Getting Started

To start developing, run the following command:

<pre class="!overflow-visible"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary dark:bg-gray-950"><div class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary select-none">bash</div><div class="sticky top-9 md:top-[5.75rem]"><div class="absolute bottom-0 right-2 flex h-9 items-center"><div class="flex items-center rounded bg-token-sidebar-surface-primary px-2 font-sans text-xs text-token-text-secondary dark:bg-token-main-surface-secondary"><span class="" data-state="closed"><button class="flex gap-1 items-center select-none py-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Копіювати код</button></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-bash">npm run dev
<span class="hljs-comment"># or</span>
yarn dev
<span class="hljs-comment"># or</span>
pnpm dev
<span class="hljs-comment"># or</span>
bun dev
</code></div></div></pre>

Once the development server is running, open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

You can start editing the page by modifying `app/page.tsx`. The page will automatically update as you make changes to the file.

### Font Optimization

This project uses [`<span>next</span><span>/font</span>`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to optimize and load fonts automatically. It includes the [Geist](https://vercel.com/font) font family by Vercel.

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

To deepen your understanding of Next.js, refer to these resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about the features and API of Next.js.
- [Learn Next.js](https://nextjs.org/learn) - An interactive tutorial to help you get started.

Feel free to explore [the Next.js GitHub repository](https://github.com/vercel/next.js) and contribute or provide feedback!

## Deployment on Vercel

Deploying your Next.js app is easy with the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), created by the team behind Next.js.

For more deployment details, check out [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
