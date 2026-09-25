import {supabase} from './supabase-client.js';
const $=id=>document.getElementById(id);
async function run(){
 const {data:{user}}=await supabase.auth.getUser();
 if(!user){$('welcome').textContent='Please sign in to view your dashboard.';return;}
 $('welcome').textContent=`Welcome back${user.email?' — '+user.email:''}. Manage buying, selling and property activity in one place.`;
 const results=await Promise.allSettled([
  supabase.from('orders').select('id',{count:'exact',head:true}).or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`),
  supabase.from('listings').select('id',{count:'exact',head:true}).eq('seller_id',user.id).is('deleted_at',null),
  supabase.from('favorites').select('id',{count:'exact',head:true}).eq('user_id',user.id),
  supabase.from('notifications').select('id',{count:'exact',head:true}).eq('user_id',user.id).is('read_at',null)
 ]);
 ['orders','listings','favorites','alerts'].forEach((k,i)=>{$(k).textContent=results[i].status==='fulfilled'?(results[i].value.count??0):'—';});
}
run().catch(e=>{$('welcome').textContent=e.message||'Unable to load dashboard.';});
