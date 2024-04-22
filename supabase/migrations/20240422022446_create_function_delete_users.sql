BEGIN;

create 
or replace function delete_users (user_ids uuid[]) 
returns setof user_type language plpgsql security definer 
set 
  search_path = public as $$ 
begin 
    PERFORM check_auth();
    
    delete from 
        auth.users 
    where 
        id = any(user_ids);

    return query select * from users_list ();
end;
$$;

REVOKE ALL ON FUNCTION delete_users (user_ids uuid[]) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION delete_users (user_ids uuid[]) TO authenticated;

COMMIT;
