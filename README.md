# 🧬 Protein Explorer

Protein Explorer is a full-stack web application that allows users to search, explore, and save information about proteins using the UniProt REST API.

The application combines biological data exploration with user authentication, personal favorites, user profiles, and a community forum.
## Screenshots
- Homepage
  
  <img width="930" height="726" alt="image" src="https://github.com/user-attachments/assets/a6ca0bd8-5f85-4bf4-b318-b74ffd320169" />

- Search
  
<img width="935" height="901" alt="image" src="https://github.com/user-attachments/assets/2d0112bc-0237-4bf1-93f4-a468bffb3b7e" />

- Protein Details
  
  <img width="936" height="905" alt="image" src="https://github.com/user-attachments/assets/a0bb09a9-69ae-4dbd-9c8f-acccd6c5a7fe" />
  
  - Amino acid sequence
    
<img width="935" height="902" alt="image" src="https://github.com/user-attachments/assets/48a4365d-986f-4ee9-b7c6-a6efc86e6a35" />

- Forum
  
  <img width="927" height="901" alt="image" src="https://github.com/user-attachments/assets/87242022-2ba0-449d-9fc8-727ee3db1a75" />



## Features

- **Protein Search:** Search for proteins using the UniProt REST API.
- **Protein Details:** Explore protein information and amino acid sequences.
- **User Authentication:** Register, log in, and manage user sessions using Supabase Authentication.
- **Favorites:** Save proteins to a personal favorites collection.
- **User Profiles:** View profiles and upload profile pictures.
- **Community Forum:** Create posts, write comments, and interact with other users.
- **Real-Time Features:** Supabase Realtime integration for forum interactions.
- **User Roles:** User and administrator roles supported by the database.

## Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | Full-stack web framework |
| React | Frontend development |
| TypeScript | Type-safe programming |
| Tailwind CSS | Styling and responsive layout |
| Supabase | Authentication, PostgreSQL database, storage, and realtime |
| UniProt REST API | Protein information and sequences |

## Getting Started

### Prerequisites

- Node.js and npm
- A Supabase project

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/annemievdc/protein-explorer.git
   ```

2. Open the project directory:

   ```bash
   cd protein-explorer
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the project root and add your Supabase configuration:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

**Note:** Running the complete application requires a configured Supabase backend, including database tables, authentication, storage, and appropriate Row Level Security policies.

## Project Status

Protein Explorer is a portfolio project under active development.

Future improvements include editable user profiles, enhanced administrator functionality, and improvements to protein search.

## Author

Developed by [annemievdc](https://github.com/annemievdc) as part of a software development portfolio.
