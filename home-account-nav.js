import {createClient} from 'https://esm.sh/@supabase/supabase-js@2.57.0';
const db=createClient('https://stkhsfxtmeeiepxnzgym.supabase.co','sb_publishable_FKxLA2wuSeEauCYWFx3vJA_mjJ7Az6X');
const account=document.getElementById('customerAccountLink');
const admin=document.getElementById('privateAdminLink');
let check=0;
async function refreshNavigation(){
 const seq=++check;admin.hidden=true;account.textContent='Returning Customer? Sign In Here';account.href='/account.html?return=home';
 try{
  const {data:{session},error}=await db.auth.getSession();
  if(error||!session||seq!==check)return;
  const {data:{user},error:userError}=await db.auth.getUser();
  if(userError||!user||seq!==check)return;
  account.textContent='My Account';account.href='/account.html';
  const res=await fetch('https://stkhsfxtmeeiepxnzgym.supabase.co/functions/v1/offbeat-admin-requests',{
   method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+session.access_token,'apikey':'sb_publishable_FKxLA2wuSeEauCYWFx3vJA_mjJ7Az6X'},body:JSON.stringify({action:'list'})
  });
  if(seq===check&&res.ok)admin.hidden=false;
 }catch{admin.hidden=true;}
}
db.auth.onAuthStateChange(()=>{setTimeout(refreshNavigation,0)});
refreshNavigation();
