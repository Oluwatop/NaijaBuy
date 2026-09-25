import {supabase} from './supabase-client.js';
const MAX_FILES=8,MAX_BYTES=5*1024*1024;
export async function uploadListingImages(listingId,files){
 if(!listingId)throw new Error('Listing ID is required.'); if(files.length>MAX_FILES)throw new Error('Maximum 8 images allowed.');
 const {data:{user}}=await supabase.auth.getUser(); if(!user)throw new Error('Please sign in first.');
 const out=[];
 for(let i=0;i<files.length;i++){const f=files[i];
  if(!['image/jpeg','image/png','image/webp'].includes(f.type))throw new Error('Only JPG, PNG and WebP images are allowed.');
  if(f.size>MAX_BYTES)throw new Error(`${f.name} is larger than 5MB.`);
  const safe=f.name.replace(/[^a-zA-Z0-9._-]/g,'-'),path=`${user.id}/${listingId}/${crypto.randomUUID()}-${safe}`;
  const {error}=await supabase.storage.from('listing-images').upload(path,f,{upsert:false,contentType:f.type});if(error)throw error;
  const {data,rowError}=await supabase.from('listing_images').insert({listing_id:listingId,storage_path:path,sort_order:i}).select().single();if(rowError)throw rowError;out.push(data);
 } return out;
}