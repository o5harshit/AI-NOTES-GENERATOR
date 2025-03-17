import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Auth } from "../Components/Auth";
import { LogOut } from "lucide-react";
import { CreateNote } from "../Components/CreateNote";
import PayPalButton from "../Components/PayPalButton"; // Import PayPal button

function App() {
  const [session, setSession] = useState(null);
  const [promptCount, setPromptCount] = useState(0);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    // Retrieve prompt count from localStorage
    const storedPromptCount = localStorage.getItem("promptCount");
    const paymentStatus = localStorage.getItem("isPaid");

    if (storedPromptCount) {
      setPromptCount(parseInt(storedPromptCount, 10));
    }
    if (paymentStatus === "true") {
      setIsPaid(true);
    }

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

  if (!session) {
    return <Auth />;
  }

  // Handle payment success
  const handlePaymentSuccess = () => {
    setIsPaid(true);
    setPromptCount(0); // Reset prompt count
    localStorage.setItem("isPaid", "true");
    localStorage.setItem("promptCount", "0");
  };


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
          {promptCount >= 10 && !isPaid ? (
            <>
              <p className="text-red-500 text-center">
                You've reached the limit of 10 prompts. Please pay to continue.
              </p>
              <PayPalButton onSuccess={handlePaymentSuccess} />
            </>
          ) : (
            <CreateNote promptCount={promptCount} setPromptCount={setPromptCount} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
