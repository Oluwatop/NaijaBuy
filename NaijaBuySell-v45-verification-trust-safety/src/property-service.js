import {supabase} from './supabase-client.js';
export async function createPropertyListing(v){
 const {data:{user}}=await supabase.auth.getUser(); if(!user) throw new Error('Please sign in first.');
 const listing={seller_id:user.id,title:v.title,price:Number(v.price),category:'Real Estate & Properties',condition:'See description',state:v.state,city:v.city,description:v.description,status:'pending',property_type:v.property_type,listing_purpose:v.listing_purpose,bedrooms:v.bedrooms?Number(v.bedrooms):null,bathrooms:v.bathrooms?Number(v.bathrooms):null,land_size:v.land_size||null,property_address:v.property_address,furnished:v.furnished==='true',amenities:v.amenities||null};
 const {data,error}=await supabase.from('listings').insert(listing).select().single(); if(error) throw error; return data;
}
export async function searchProperties(filters={}){
 let q=supabase.from('listings').select('*').eq('category','Real Estate & Properties').eq('status','approved');
 if(filters.property_type)q=q.eq('property_type',filters.property_type);
 if(filters.listing_purpose)q=q.eq('listing_purpose',filters.listing_purpose);
 if(filters.state)q=q.ilike('state',`%${filters.state}%`);
 if(filters.city)q=q.ilike('city',`%${filters.city}%`);
 if(filters.min_price)q=q.gte('price',Number(filters.min_price));
 if(filters.max_price)q=q.lte('price',Number(filters.max_price));if(filters.min_bedrooms)q=q.gte('bedrooms',Number(filters.min_bedrooms));if(filters.furnished!=='')q=q.eq('furnished',filters.furnished==='true');
 const {data,error}=await q.order('created_at',{ascending:false});if(error)throw error;return data||[];
}
