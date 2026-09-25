import {supabase} from './supabase-client.js';
async function user(){const {data:{user}}=await supabase.auth.getUser();if(!user)throw Error('Please sign in first.');return user}
export async function getNotifications(){const u=await user();const {data,error}=await supabase.from('notifications').select('*').eq('user_id',u.id).order('created_at',{ascending:false}).limit(100);if(error)throw error;return data||[]}
export async function markAllNotificationsRead(){const u=await user();const {error}=await supabase.from('notifications').update({read_at:new Date().toISOString()}).eq('user_id',u.id).is('read_at',null);if(error)throw error}
