import Navbar from "../components/Navbar";

export default function NGOLayout({ children }) {

return (
<>
<Navbar />

<div className="pt-24">
{children}
</div>

</>
);

}