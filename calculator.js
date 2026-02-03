const servicesDB={
  listings:[
    {name:"CG Listing (Fast Track)",price:845,original:650},
    {name:"CMC Listing (Fast Track)",price:7020,original:5400},
    {name:"Listings Package",price:4420,original:3400},
    {name:"CG Verification Supply",price:780,original:600},
    {name:"CMC Verification",price:4160,original:3200},
    {name:"CMC/CG Supply Verify (3-5 days)",price:3900,original:3000},
    {name:"CMC/CG Supply Verify (24h)",price:5460,original:4200},
    {name:"CMC Tags",price:455,original:350},
    {name:"CMC Community Blue Tick",price:455,original:350},
    {name:"All Voting Websites (20+)",price:650,original:500},
    {name:"Dextools & Dexscreener Votes",price:455,original:350},
    {name:"CompareMarketcap vs Project",price:520,original:400},
    {name:"Web3 Wallet Package (Full)",price:5850,original:4500},
    {name:"Web3 Wallet Package (Alt)",price:3575,original:2750},
    {name:"Trust Wallet Swap + Logo",price:4550,original:3500},
    {name:"Metamask Updates",price:3445,original:2650}
  ],
  trending:[
    {name:"24h Trending Package",price::4420,original:3400},
    {name:"OKX Dex Trending (1 day)",price:845,original:650},
    {name:"BitGet Dex Trending (1 day)",price:845,original:650},
    {name:"Dexscreener Trending (SOL)",price:5200,original:4000},
    {name:"Crypto.com Trending (1 week)",price:1625,original:1250},
    {name:"GeckoTerminal Trending (1 week)",price:2730,original:2100},
    {name:"Birdeye Trending (1 week)",price:2730,original:2100},
    {name:"CoinGecko Trending (1 week)",price:2925,original:2250},
    {name:"Twitter/X Trending (1 hour)",price:975,original:750}
  ],
  community:[
    {name:"Shillers Standard (1 week)",price:1300,original:1000},
    {name:"Shillers Premium (1 week)",price:1950,original:1500},
    {name:"Chatters 24/7 (1 week)",price:780,original:600},
    {name:"CMC Community Creation",price:286,original:220}
  ],
  marketing:[
    {name:"Press Release (500 sites)",price:975,original:750},
    {name:"4chan Ads (1 week)",price:2275,original:1750},
    {name:"Banner Ads (15 sites, 1 week)",price:3575,original:2750},
    {name:"CMC Ads (1 day)",price:2080,original:1600},
    {name:"Etherscan Ads (1 week)",price:4290,original:3300},
    {name:"Telegram Ads (50 bots, 1 week)",price:7150,original:5500},
    {name:"Las Vegas Billboard (1 week)",price:2080,original:1600},
    {name:"Vegas & SpaceX Billboard",price:3250,original:2500},
    {name:"12 USA YouTubers",price:11050,original:8500},
    {name:"30 Brazilian YouTubers",price:9750,original:7500},
    {name:"TikTokers Package",price:11050,original:8500},
    {name:"WeChat & RedNote",price:5200,original:4000},
    {name:"Reddit Campaign (1 week)",price:3705,original:2850},
    {name:"CompareMarketcap Exposure",price:520,original:400}
  ]
};

const packages={
  listings:{name:"Listings Package",price:4420,original:3400},
  trending:{name:"24h Trending Package",price:4420,original:3400},
  wallet:{name:"Web3 Wallet Package",price:5850,original:4500}
};

let quoteItems=[];
let quoteTotal=0;

function initCalculator(){
  const catSelect=document.getElementById('calc-category');
  const servSelect=document.getElementById('calc-service');
  
  if(catSelect){
    catSelect.addEventListener('change',function(){
      const category=this.value;
      if(!category){
        servSelect.disabled=true;
        servSelect.innerHTML='<option value="">Select Category First...</option>';
        return;
      }
      servSelect.disabled=false;
      servSelect.innerHTML='<option value="">Choose Service...</option>';
      servicesDB[category].forEach(service=>{
        const option=document.createElement('option');
        option.value=service.price;
        option.setAttribute('data-original',service.original);
        option.setAttribute('data-name',service.name);
        option.textContent=`${service.name} - $${service.price.toLocaleString()}`;
        servSelect.appendChild(option);
      });
      document.getElementById('calc-result').style.display='none';
    });
  }
  
  if(servSelect){
    servSelect.addEventListener('change',function(){
      const selectedOption=this.options[this.selectedIndex];
      const price=selectedOption.value;
      const original=selectedOption.getAttribute('data-original');
      if(price){
        document.getElementById('calc-new-price').textContent='$'+parseInt(price).toLocaleString();
        document.getElementById('calc-original').textContent='Original: $'+parseInt(original).toLocaleString();
        document.getElementById('calc-result').style.display='block';
      }
    });
  }
}

function addToQuote(){
  const servSelect=document.getElementById('calc-service');
  const selectedOption=servSelect.options[servSelect.selectedIndex];
  const name=selectedOption.getAttribute('data-name');
  const price=parseInt(selectedOption.value);
  if(!name||!price)return;
  quoteItems.push({name:name,price:price});
  quoteTotal+=price;
  updateQuoteDisplay();
}

function addPackageToQuote(packageType){
  const pkg=packages[packageType];
  if(!pkg)return;
  quoteItems.push({name:pkg.name,price:pkg.price});
  quoteTotal+=pkg.price;
  updateQuoteDisplay();
  document.getElementById('calculator').scrollIntoView({behavior:'smooth'});
}

function updateQuoteDisplay(){
  const summary=document.getElementById('quote-summary');
  const itemsList=document.getElementById('quote-items');
  const totalDisplay=document.getElementById('quote-total');
  if(quoteItems.length===0){
    summary.style.display='none';
    return;
  }
  summary.style.display='block';
  itemsList.innerHTML=quoteItems.map((item,index)=>`
    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:rgba(255,255,255,0.05);border-radius:8px;margin-bottom:8px;">
      <span style="font-size:0.9rem;">${item.name}</span>
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="color:#00f3ff;font-weight:bold;">$${item.price.toLocaleString()}</span>
        <button onclick="removeQuoteItem(${index})" style="background:none;border:none;color:#ff006e;cursor:pointer;font-size:1.2rem;">×</button>
      </div>
    </div>
  `).join('');
  totalDisplay.textContent='$'+quoteTotal.toLocaleString();
}

function removeQuoteItem(index){
  quoteTotal-=quoteItems[index].price;
  quoteItems.splice(index,1);
  updateQuoteDisplay();
}

function submitQuote(){
  if(quoteItems.length===0)return;
  const message=`Hi! I'm interested in the following MNM Services:\n\n${quoteItems.map(item=>`• ${item.name}: $${item.price.toLocaleString()}`).join('\n')}\n\nTotal: $${quoteTotal.toLocaleString()}\n\nPlease contact me with next steps.`;
  window.open(`https://t.me/yourusername?text=${encodeURIComponent(message)}`,'_blank');
}

function toggleAccordion(contentId,arrowId){
  const content=document.getElementById(contentId);
  const arrow=document.getElementById(arrowId);
  if(content.style.maxHeight&&content.style.maxHeight!=='0px'){
    content.style.maxHeight='0px';
    content.style.opacity='0';
    if(arrow)arrow.style.transform='rotate(0deg)';
  }else{
    content.style.maxHeight=content.scrollHeight+'px';
    content.style.opacity='1';
    if(arrow)arrow.style.transform='rotate(180deg)';
  }
}

document.addEventListener('DOMContentLoaded',initCalculator);
console.log('MNM Services Loaded - 30% markup applied');
