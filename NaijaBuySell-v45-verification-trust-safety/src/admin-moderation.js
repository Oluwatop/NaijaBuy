import {supabase} from './supabase-client.js';

async function admin(){
 const {data:{user}}=await supabase.auth.getUser(); if(!user) throw new Error('Admin login required.');
 const {data,error}=await supabase.from('admin_roles').select('role').eq('user_id',user.id).maybeSingle();
 if(error||!data) throw new Error('Admin access denied.'); return user;
}
export async function getPendingListings(){
 await admin();
 const {data,error}=await supabase.from('listings').select('*').eq('status','pending').order('created_at',{ascending:true});
 if(error) throw error; return data||[];
}
export async function moderateListing(id,status){
 if(!['approved','rejected'].includes(status)) throw new Error('Invalid moderation status.');
 await admin();
 const {data,error}=await supabase.from('listings').update({status,updated_at:new Date().toISOString()}).eq('id',id).select().single();
 if(error) throw error; return data;
}
