import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";

import supabase from "./supabase";
import { SupabaseContext } from "./Context";
import { AntConfigProvider, Users, Layout, Header, Auth } from "./components";

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      // if (session) supabase.auth.refreshSession();
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <SupabaseContext.Provider value={supabase}>
      <AntConfigProvider>
        <Layout header={<Header session={session} />}>
          {!session && <Auth />}
          {session && <Users />}
        </Layout>
      </AntConfigProvider>
    </SupabaseContext.Provider>
  );
}

export default App;
