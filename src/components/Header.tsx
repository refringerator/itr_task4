import { Session } from "@supabase/supabase-js";
import { Button } from "antd";
import { useContext } from "react";
import { SupabaseContext } from "../Context";

interface HeaderProps {
  session: Session | null;
}

const Header = ({ session }: HeaderProps) => {
  const supabase = useContext(SupabaseContext);

  return (
    session && (
      <>
        <span>Hello, {session.user.email}!</span>
        <Button type="link" onClick={() => supabase?.auth.signOut()}>
          Sign out
        </Button>
      </>
    )
  );
};
export default Header;
