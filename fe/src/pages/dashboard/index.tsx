export default function Dashboard() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
                    Welcome to Your Dashboard
                </h2>
                <p className="text-center text-gray-600">
                    This is your personal dashboard. You can manage your tasks and settings here.
                </p>
            </div>
        </div>
    )
}