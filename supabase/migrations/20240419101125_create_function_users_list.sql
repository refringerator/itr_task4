BEGIN;

CREATE TYPE user_type AS (
  id uuid,
  email varchar,
  lastLogin varchar,
  status varchar
);

create
or replace function users_list () returns setof user_type 
LANGUAGE plpgsql SECURITY DEFINER
set
  search_path = public as $$

begin
    return query 
        select users.id, users.email::varchar, 
            TO_CHAR(users.last_sign_in_at, 'DD.MM.YYYY')::varchar as lastLogin, 
            case when banned_until is not null then 'Blocked'::varchar else 'Active'::varchar end as status
        from auth.users as users
        order by created_at asc;
end;
$$;

ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;
REVOKE ALL PRIVILEGES ON FUNCTION users_list () FROM PUBLIC;
GRANT EXECUTE ON FUNCTION users_list () TO authenticated;

COMMIT;
