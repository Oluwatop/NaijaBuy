import { createClient } from '@supabase/supabase-js';
const supabase=createClient(import.meta.env.VITE_SUPABASE_URL,import.meta.env.VITE_SUPABASE_ANON_KEY);
export {supabase};
export async function signIn(email,password){const r=await supabase.auth.signInWithPassword({email,password});if(r.error)throw r.error;return r.data}
export async function signUp(email,password,fullName){const r=await supabase.auth.signUp({email,password,options:{data:{full_name:fullName}}});if(r.error)throw r.error;if(r.data.user){const p=await supabase.from('profiles').upsert({id:r.data.user.id,full_name:fullName});if(p.error)throw p.error}return r.data}
export async function signOut(){const r=await supabase.auth.signOut();if(r.error)throw r.error}
export async function browseListings(filters={}){let q=supabase.from('listings').select('*,listing_images(*)').eq('status','active').order('created_at',{ascending:false});if(filters.category)q=q.eq('category',filters.category);if(filters.state)q=q.eq('state',filters.state);if(filters.city)q=q.eq('city',filters.city);const r=await q;if(r.error)throw r.error;return r.data||[]}
export async function createListing(x){const u=await supabase.auth.getUser();if(!u.data.user)throw Error('Please log in first.');const r=await supabase.from('listings').insert({seller_id:u.data.user.id,title:x.title,description:x.description,category:x.category,condition:x.condition,price:Number(x.price),state:x.state,city:x.city,status:'pending'}).select().single();if(r.error)throw r.error;return r.data}
export async function myOrders(){const r=await supabase.from('orders').select('*').order('created_at',{ascending:false});if(r.error)throw r.error;return r.data||[]}
export async function confirmReceipt(orderId){const r=await supabase.rpc('confirm_order_received',{p_order_id:orderId});if(r.error)throw r.error;return r.data}
