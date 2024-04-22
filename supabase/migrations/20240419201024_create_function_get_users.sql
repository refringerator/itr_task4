BEGIN;

create
or replace function get_users () returns table (
  id uuid,
  email varchar(255),
  lastLogin varchar(255),
  status varchar(255)
) LANGUAGE plpgsql SECURITY DEFINER
set
  search_path = public as $$

begin
    PERFORM check_auth();

    return query 
        select users.id, users.email::varchar, 
            TO_CHAR(users.last_sign_in_at, 'DD.MM.YYYY')::varchar as lastLogin, 
            case when banned_until is not null then 'Blocked'::varchar else 'Active'::varchar end as status
        from auth.users as users
        order by created_at asc;
end;
$$;

REVOKE ALL ON FUNCTION get_users ()
FROM
  PUBLIC;

GRANT
EXECUTE ON FUNCTION get_users () TO authenticated;

GRANT USAGE ON SCHEMA public TO authenticated;

COMMIT;
