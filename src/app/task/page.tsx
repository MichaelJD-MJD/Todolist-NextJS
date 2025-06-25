import Navbar from "@/components/Navbar";
import TaskCard from "@/components/TaskCard";


export default function Task() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen items-center px-4 sm:px-6 py-10 bg-gray-50">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Hello Michael 👋
          </h1>
          <p className="text-gray-500 mt-2">
            Let's get started keeping your tasks organized
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-6 mb-10 border-b border-gray-300">
          {["All tasks", "Pending", "Completed"].map((tab, index) => (
            <button
              key={index}
              className={`pb-2 text-sm sm:text-base font-medium ${
                tab === "All tasks"
                  ? "text-yellow-500 border-b-2 border-yellow-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {[...Array(6)].map((_, i) => (
            <TaskCard key={i} />
          ))}
        </div>
      </main>
    </>
  );
}
