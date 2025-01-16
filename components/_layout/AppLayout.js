import AppNavbar from "@/components/_layout/AppNavbar";

export default function AppLayout({ children }) {
    return (
        <div className="h-screen bg-neutral-900 flex">
            <AppNavbar />
            {children}
        </div>
    );
};