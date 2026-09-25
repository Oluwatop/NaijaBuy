const products=[
{id:1,title:"Samsung Galaxy A55",price:285000,location:"Lagos",category:"Electronics",condition:"Used - Good",seller:"Chinedu Store",emoji:"📱",description:"A clean Galaxy A55 listing with clear condition information and seller-managed delivery."},
{id:2,title:"HP Laptop",price:420000,location:"Ibadan",category:"Electronics",condition:"Used - Good",seller:"Ibadan Tech Hub",emoji:"💻",description:"HP laptop suitable for work, study and everyday use."},
{id:3,title:"Modern 3-Seater Sofa",price:180000,location:"Abuja",category:"Home",condition:"New",seller:"Home Comfort NG",emoji:"🛋️",description:"Modern three-seater sofa with seller-managed delivery arrangements."},
{id:4,title:"Toyota Corolla",price:5200000,location:"Lagos",category:"Vehicles",condition:"Used",seller:"Lagos Auto Seller",emoji:"🚗",description:"Toyota Corolla listing with seller and location information for buyer enquiries."},
{id:5,title:"Mountain Bicycle",price:95000,location:"Port Harcourt",category:"Vehicles",condition:"Used - Good",seller:"PH Sports Store",emoji:"🚲",description:"Mountain bicycle suitable for recreation and everyday cycling."},
{id:6,title:"Refrigerator",price:260000,location:"Lagos",category:"Appliances",condition:"Used - Good",seller:"Cool Home Appliances",emoji:"🧊",description:"Home refrigerator listing with clear condition and location details."},
{id:7,title:"Dining Table Set",price:150000,location:"Kano",category:"Home",condition:"New",seller:"Kano Furniture",emoji:"🍽️",description:"New dining table set for home use."},
{id:8,title:"Designer Fashion Set",price:75000,location:"Lagos",category:"Fashion",condition:"New",seller:"Naija Fashion Seller",emoji:"👗",description:"New fashion set from a Nigerian seller."}
];
const categories=[["Electronics","📱","Phones, laptops, gadgets"],["Vehicles","🚗","Cars, bikes and more"],["Home","🏠","Furniture and home items"],["Appliances","🧊","Useful household appliances"],["Fashion","👗","Clothing and accessories"]];
const locations=["Lagos","Abuja","Ibadan","Port Harcourt","Kano"];
function money(n){return "₦"+n.toLocaleString("en-NG")}
function card(p){return `<a class="card" href="product.html?id=${p.id}"><div class="photo">${p.emoji}</div><div class="cardbody"><span class="small">${p.category} · ${p.condition}</span><h3>${p.title}</h3><strong>${money(p.price)}</strong><p>📍 ${p.location}</p><small>Seller: ${p.seller}</small></div></a>`}
