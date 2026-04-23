"use client";

import { useEffect, useState } from "react";
// const API_BASE = "http://localhost:5000/api";
const API_BASE = process.env.NEXT_PUBLIC_API_URL;
export default function NGOPage() {

const [donations,setDonations]=useState([]);

const [stats,setStats]=useState({
pending:0,
accepted:0,
delivered:0
});

const foodMap={
1:"Rice",
2:"Bread",
3:"Cooked Food",
4:"Vegetables"
};


useEffect(()=>{

const NGO_ID="67f2abc12345";

fetch(`${API_BASE}/donations`)
.then(res=>res.json())
.then(data=>{

setDonations(data);

setStats({
pending:data.filter(
x=>(x.status || "pending").toLowerCase()==="pending"
).length,

accepted:data.filter(
x=>(x.status || "").toLowerCase()==="accepted"
).length,

delivered:data.filter(
x=>(x.status || "").toLowerCase()==="delivered"
).length
});

})
.catch(err=>console.error(err));

},[]);



const updateStatus=async(id,status)=>{

await fetch(
`${API_BASE}/donations/${id}/status`,
{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({status})
}
);

setDonations(prev=>
prev.map(d=>
d._id===id
? {...d,status}
: d
)
);

};



return (

<div className="min-h-screen bg-black text-white p-10">

<h1 className="text-3xl font-bold mb-8">
NGO Dashboard
</h1>


<div className="grid grid-cols-3 gap-4 mb-10">

<div className="p-4 bg-white/10 rounded">
Pending: {stats.pending}
</div>

<div className="p-4 bg-white/10 rounded">
Accepted: {stats.accepted}
</div>

<div className="p-4 bg-white/10 rounded">
Delivered: {stats.delivered}
</div>

</div>



{[...donations]
.sort((a,b)=>
a.risk_level==="High"
? -1
: 1
)
.map(d=>(

<div
key={d._id}
className="p-6 rounded-xl bg-white/10 border border-white/20 mb-6"
>

<h2 className="text-xl font-semibold">
{foodMap[d.food_type] || d.food_type}
</h2>

<p>Quantity: {d.quantity}</p>

<p>Shelf Life: {d.predicted_shelf_life}</p>

<p>Risk: {d.risk_level}</p>

<p>Status: {d.status}</p>


<div className="flex flex-wrap gap-3 mt-5">

<button
onClick={()=>updateStatus(d._id,"accepted")}
className="px-4 py-2 bg-green-500 rounded"
>
Accept
</button>


<button
onClick={()=>updateStatus(d._id,"rejected")}
className="px-4 py-2 bg-red-500 rounded"
>
Reject
</button>


<button
onClick={()=>updateStatus(d._id,"picked_up")}
className="px-4 py-2 bg-yellow-500 rounded"
>
Picked Up
</button>


<button
onClick={()=>updateStatus(d._id,"delivered")}
className="px-4 py-2 bg-blue-500 rounded"
>
Delivered
</button>

</div>

</div>

))}

</div>

);

}