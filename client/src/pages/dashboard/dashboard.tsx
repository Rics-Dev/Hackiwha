import {useState} from "react";
import UserForm from "@/components/dashboard/UserForm.tsx";
import UserList from "@/components/dashboard/UserList.tsx";

export default function DashboardPage() {

    const [refreshKey, setRefreshKey] = useState(0);

    const handleUserCreated = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };



    return (
        <div className="py-10">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <p>Your dashboard overview and statistics.</p>
            <div className="flex flex-col gap-8">
                     <UserForm onUserCreated={handleUserCreated} />
                     <UserList key={refreshKey} />
            </div>
        </div>
    )
}