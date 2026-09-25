import {supabase} from './supabase-client.js';
const $=id=>document.getElementById(id);
async function run(){
 const {data:{user}}=await supabase.auth.getUser();
 if(!user){$('status').textContent='Access denied. Please sign in as an administrator.';return;}
 const {data:role,error}=await supabase.from('admin_roles').select('role').eq('user_id',user.id).maybeSingle();
 if(error) throw error;
 if(!role){$('status').textContent='Access denied. Your account is not assigned an administrator role.';return;}
 $('gate').hidden=true;$('app').hidden=false;$('role').textContent=`Signed in as ${role.role}.`;
 const q=[
  supabase.from('profiles').select('id',{count:'exact',head:true}),
  supabase.from('listings').select('id',{count:'exact',head:true}).is('deleted_at',null),
  supabase.from('listings').select('id',{count:'exact',head:true}).eq('category','Real Estate & Properties').is('deleted_at',null),
  supabase.from('orders').select('id',{count:'exact',head:true}),
  supabase.from('orders').select('id',{count:'exact',head:true}).eq('protection_status','paid_protected'),
  supabase.from('orders').select('id',{count:'exact',head:true}).eq('protection_status','disputed')
 ];
 const r=await Promise.allSettled(q);['users','listings','properties','orders','protected','disputed'].forEach((k,i)=>$(k).textContent=r[i].status==='fulfilled'?(r[i].value.count??0):'—');
}
run().catch(e=>{$('status').textContent=e.message||'Unable to verify administrator access.';});
