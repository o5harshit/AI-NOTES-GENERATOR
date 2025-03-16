import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Auth } from "../Components/Auth";
import { LogOut } from "lucide-react";
import { CreateNote } from "../Components/CreateNote";


function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  console.log(session);

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">AI Notes Generator</h1>
          <button
            onClick={() => supabase.auth.signOut()}
            className="flex items-center cursor-pointer px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-10 px-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <CreateNote />
        </div>
      </main>
    </div>
  );
}

export default App;
