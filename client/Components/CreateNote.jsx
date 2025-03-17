import React, { useState } from "react";
import { generateNoteContent } from "../lib/gemini";
import { Loader2 } from "lucide-react";

export function CreateNote({ promptCount, setPromptCount }) {
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !prompt) return;

    if (promptCount >= 10) {
      setError("You have reached the prompt limit. Please pay to continue.");
      return;
    }

    setLoading(true);
    setError(""); 
    setContent(""); 

    try {
      const generatedContent = await generateNoteContent(prompt);
      setContent(generatedContent);

      const newPromptCount = promptCount + 1;
      setPromptCount(newPromptCount);
      localStorage.setItem("promptCount", newPromptCount);
    } catch (error) {
      console.error("Error creating note:", error);
      setError(error.message || "Error generating note. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          AI Notes Generator
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg space-y-4"
        >
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Note Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="Enter note title"
              required
            />
          </div>

          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              AI Prompt
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="Enter your prompt for AI"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || promptCount >= 10}
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Generating...
              </>
            ) : (
              "Generate Note"
            )}
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        {content && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
            <p className="mt-2 text-gray-800 dark:text-gray-300">{content}</p>
          </div>
        )}
      </div>
    </div>
  );
}
