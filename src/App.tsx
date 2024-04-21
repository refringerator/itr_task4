import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import supabase from "./supabase";
import { AntConfigProvider, Users, Layout, Header } from "./components";

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.rpc("get_users").then(({ data, error }) => {
      console.log({ data, error });
    });
  }, []);

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

  const header = session && (
    <>
      <span>Hello, {session.user.email}!</span>
      <button onClick={() => supabase.auth.signOut()}>Sign out</button>
    </>
  );

  return (
    <AntConfigProvider>
      <Layout
        header={
          <Header session={session} signout={() => supabase.auth.signOut()} />
        }
      >
        {!session && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={[]}
            />
          </div>
        )}
        {session && <Users />}
      </Layout>
    </AntConfigProvider>
  );
}

export default App;
