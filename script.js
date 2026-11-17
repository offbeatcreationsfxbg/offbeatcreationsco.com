document.getElementById('year').textContent=new Date().getFullYear();
const menu=document.getElementById('menu'),nav=document.getElementById('nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
document.getElementById('quoteForm').addEventListener('submit',async e=>{
 e.preventDefault();const form=e.currentTarget,button=form.querySelector('button[type="submit"]'),result=document.getElementById('formResult');
 const data=new FormData(form),kind=String(data.get('product')||'');
 const categories={'Drinkware':'drinkware','Apparel':'apparel','Decals & Vinyl':'vinyl','Stickers':'vinyl','Something else':'other'};
 data.set('category',categories[kind]||'other');data.set('kind',kind);
 button.disabled=true;result.hidden=false;result.textContent='Sending your request…';
 try{
 const response=await fetch('https://stkhsfxtmeeiepxnzgym.supabase.co/functions/v1/offbeat-custom-request',{method:'POST',body:data});
 const body=await response.json();if(!response.ok||!body.request_id)throw new Error(body.error||'Request could not be submitted.');
 form.reset();result.textContent='Thank you! Your request has been received. We’ll be in touch by email to discuss your idea. Reference: '+body.request_id.slice(0,8);
 }catch(error){result.textContent='Unable to confirm submission. '+(error.message||'Please try again.');}
 finally{button.disabled=false;result.scrollIntoView({behavior:'smooth',block:'nearest'});}
});
