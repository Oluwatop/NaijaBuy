import {supabase} from './supabase-client.js';
export async function getPropertyById(id){
 const {data,error}=await supabase.from('listings').select('*, listing_images(*), seller_profiles(display_name,city,state,verification_status)').eq('id',id).eq('category','Real Estate & Properties').eq('status','approved').single();
 if(error && error.code!=='PGRST116')throw error;if(!data)return null;
 const sp=data.seller_profiles||{};
 return {...data,seller_name:sp.display_name,seller_city:sp.city||sp.state,seller_verified:sp.verification_status==='verified'};
}
