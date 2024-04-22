import { createClient } from "@supabase/supabase-js";

const fetchData: typeof fetch = (...args) => {
  return new Promise((resolve, reject) => {
    fetch(...args)
      .then((response) => {
        if (response.status === 401)
          supabase.auth.getSession().then(({ data: { session } }) => {
            session && supabase.auth.refreshSession();
          });

        return response;
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    global: {
      fetch: (...args) => fetchData(...args),
    },
  }
);

export default supabase;
