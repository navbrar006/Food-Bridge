"use client";

import { useState,useEffect } from "react";

export default function VolunteerPage(){

const API_BASE="http://localhost:5000/api";

/* Demo NGO delivery location */
const NGO_LAT=30.7400;
const NGO_LNG=76.7800;

const [tasks,setTasks]=useState([]);

useEffect(()=>{

fetch(`${API_BASE}/donations`)
.then(res=>res.json())
.then(data=>{

const filtered=data.filter(
d=>
d.status==="accepted" ||
d.status==="picked_up"
);

setTasks(filtered);

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

setTasks(prev=>
prev.map(t=>
t._id===id
? {...t,status}
: t
)
);

};



return(

<div className="min-h-screen bg-black text-white p-8">

<h1 className="text-3xl font-bold mb-6">
🚴 Volunteer Dashboard
</h1>


{tasks.length===0 ? (

<p>No pickup tasks available</p>

):(

tasks.map(task=>(

<div
key={task._id}
className="bg-white/10 p-6 rounded mb-6"
>

<p>
Food:
{task.food_type}
</p>

<p>
Quantity:
{task.quantity}
</p>

<p>
Risk:
{task.risk_level}
</p>

<p>
Pickup:
{task.location?.lat},
{task.location?.lng}
</p>

<p>
Delivery:
NGO Center
({NGO_LAT},{NGO_LNG})
</p>

<p>
Status:
{task.status}
</p>


<a
href={`https://www.google.com/maps/dir/${task.location?.lat},${task.location?.lng}/${NGO_LAT},${NGO_LNG}`}
target="_blank"
rel="noopener noreferrer"
className="bg-purple-500 px-4 py-2 rounded inline-block mt-4"
>
Open Pickup → Delivery Route 🗺
</a>


<div className="mt-4 flex gap-3">

<button
onClick={()=>
updateStatus(
task._id,
"picked_up"
)
}
className="bg-green-500 px-4 py-2 rounded"
>
Picked Up ✅
</button>


<button
onClick={()=>
updateStatus(
task._id,
"delivered"
)
}
className="bg-blue-500 px-4 py-2 rounded"
>
Delivered ✅
</button>

</div>

</div>

))

)}

</div>

);

}