import {supabase} from './supabase-client.js';
export async function loadSellerProfile(userId){
 if(!userId) throw new Error('Seller profile not specified.');
 const {data:profile,error}=await supabase.from('seller_profiles').select('*').eq('user_id',userId).maybeSingle();
 if(error) throw error;
 const {data:listings}=await supabase.from('listings').select('id').eq('seller_id',userId).eq('status','approved');
 return {...(profile||{}),active_listings:listings?.length||0};
}
