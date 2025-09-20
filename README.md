# LavaLab Interview Project

I deployed the website using Vercel - https://parker-gurney-lava.vercel.app/

I made the Add Product button functional through creating a form where the user fills out product information and can upload an image, which I used **blob storage** to store. The product is added to the PostgreSQL database using **Prisma** as the **ORM**. The products are stored and retrieved using **Next.js' API routes**. Changing the stock numbers patches the product in the database.

On the frontend, I also built features for searching, filtering, and sorting the products. The UI is built in **React** with **Tailwind** for styling.