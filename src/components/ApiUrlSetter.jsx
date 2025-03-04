import React, { useState, useEffect } from "react";
import NavbarDrawer from "./NavbarDrawer";

const ApiUrlSetter = () => {
  const [apiUrl, setApiUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  // Hard-coded password (change as needed)
  const correctPassword = "secret123";

  // On mount, load the stored API URL and API key if they exist.
  useEffect(() => {
    const storedUrl = localStorage.getItem("VITE_API_URL_OVERRIDE");
    const storedKey = localStorage.getItem("VITE_OPENAI_API_KEY_OVERRIDE");
    if (storedUrl) setApiUrl(storedUrl);
    if (storedKey) setApiKey(storedKey);
  }, []);

  // Handle login form submission.
  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === correctPassword) {
      setAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  // Handle API URL and Key submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("VITE_API_URL_OVERRIDE", apiUrl);
    localStorage.setItem("VITE_OPENAI_API_KEY_OVERRIDE", apiKey);
    setSaved(true);
    // You can remove the alert and instead display a notification if desired.
    // alert("API URL and API Key saved! Please reload the page to see changes.");
  };

  // If not authenticated, show the password prompt.
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <NavbarDrawer />
        <div className="max-w-md mx-auto my-8 p-6 border border-gray-700 rounded-lg shadow-lg bg-gray-800">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Restricted Access
          </h2>
          <form onSubmit={handleLogin}>
            <label htmlFor="password" className="block text-gray-300 mb-2">
              Enter Password:
            </label>
            <input
              type="password"
              id="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            />
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 rounded hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Once authenticated, show the API URL and API Key setter.
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <NavbarDrawer />
      <div className="max-w-md mx-auto my-8 p-6 border border-gray-700 rounded-lg shadow-lg bg-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center">Set API Configuration</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="apiUrl" className="block text-gray-300 mb-2">
            Enter new API URL:
          </label>
          <input
            type="text"
            id="apiUrl"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            placeholder="https://your-api.com"
            className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
          />
          <label htmlFor="apiKey" className="block text-gray-300 mb-2">
            Enter new API Key:
          </label>
          <input
            type="text"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-xxxxxxxxxxxx"
            className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
          />
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 rounded hover:bg-indigo-700 transition"
          >
            Save Configuration
          </button>
        </form>
        {saved && (
          <p className="mt-4 text-green-400 text-center">
            Configuration saved! Please reload the page to see changes.
          </p>
        )}
      </div>
    </div>
  );
};

export default ApiUrlSetter;
