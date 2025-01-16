export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen bg-neutral-900 flex justify-center items-center">
            {children}
        </div>
    );
};