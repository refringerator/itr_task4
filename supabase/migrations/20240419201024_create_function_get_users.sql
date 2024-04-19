create or replace function get_users() 
returns setof auth.users LANGUAGE plpgsql SECURITY DEFINER 
as $$
declare 
  userId uuid;

begin
    userId = auth.uid();
    if userId IS NULL then
        return query select * from auth.users where false;
        return;
    end if;   

    return query 
        select * 
        from auth.users 
        order by created_at asc;
end;
$$;

