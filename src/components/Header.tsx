import { Session } from "@supabase/supabase-js";
import { Button } from "antd";

interface HeaderProps {
  session: Session | null;
  signout: () => void;
}

const Header = ({ session, signout }: HeaderProps) =>
  session && (
    <>
      <span>Hello, {session.user.email}!</span>
      <Button type="link" onClick={signout}>
        Sign out
      </Button>
    </>
  );

export default Header;
