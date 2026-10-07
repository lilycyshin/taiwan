-- Run once in the Supabase SQL Editor. Private backups belong to the signed-in user.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('trip-backups', 'trip-backups', false, 52428800, array['application/json'])
on conflict (id) do nothing;

create policy "trip backup read" on storage.objects for select to authenticated
using (bucket_id = 'trip-backups' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "trip backup insert" on storage.objects for insert to authenticated
with check (bucket_id = 'trip-backups' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "trip backup update" on storage.objects for update to authenticated
using (bucket_id = 'trip-backups' and (storage.foldername(name))[1] = auth.uid()::text)
with check (bucket_id = 'trip-backups' and (storage.foldername(name))[1] = auth.uid()::text);
