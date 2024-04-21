import { useState, useEffect } from "react";
import "./App.css";

import { Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Users from "./components/Users";
import AntConfigProvider from "./components/AntConfigProvider";

import supabase from "./supabase";

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

  return (
    <>
      {!session && (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
        />
      )}
      {session && (
        <>
          <div>Logged in!</div>
          <button onClick={() => supabase.auth.signOut()}>Sign out</button>
        </>
      )}
      <AntConfigProvider>
        <Users />
      </AntConfigProvider>
    </>
  );
}

export default App;
