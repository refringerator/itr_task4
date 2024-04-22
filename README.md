# User management

Web application that allows you to manage registered users

### Tech stack

1. Vite template React + TypeScript
2. Ant Design
3. Supabase

### Supabase local development

1. Start containers `npx supabase start`
2. Fill `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env` file
3. Run web app with `npm run dev`
4. Restart local db with `npx supabase db reset` to apply seed and migrations as needed

### Demo

![Demo](/demo.gif)
