import Link from "next/link";

export default function VolunteerLayout({
children
}){

return(

<div className="min-h-screen bg-black text-white">

<div className="p-4 border-b border-white/10 flex justify-between">

<h1 className="text-purple-400 font-bold text-xl">
Volunteer Panel
</h1>

<Link
href="/"
className="text-sm text-gray-400 hover:text-white"
>
Logout
</Link>

</div>


<div className="p-6">

{children}

</div>

</div>

);

}