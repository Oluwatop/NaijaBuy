import {supabase} from './supabase-client.js';

export async function getCurrentUser(){
  const {data:{user}}=await supabase.auth.getUser(); return user;
}

export async function getMyListings(){
  const user=await getCurrentUser(); if(!user) throw new Error('Please sign in.');
  const {data,error}=await supabase.from('listings').select('*').eq('seller_id',user.id).order('created_at',{ascending:false});
  if(error) throw error; return data||[];
}

async function own(id){
  const user=await getCurrentUser(); if(!user) throw new Error('Please sign in.');
  return user;
}

export async function updateListing(id,fields){
  await own(id);
  const allowed=['title','price','category','condition','state','city','description'];
  const clean={}; for(const k of allowed) if(fields[k]!==undefined) clean[k]=fields[k];
  const {data,error}=await supabase.from('listings').update({...clean,status:'pending',updated_at:new Date().toISOString()}).eq('id',id).select().single();
  if(error) throw error; return data;
}

export async function deleteListing(id){
  await own(id);
  const {error}=await supabase.from('listings').update({status:'deleted',updated_at:new Date().toISOString()}).eq('id',id);
  if(error) throw error;
  return true;
}
