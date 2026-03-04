"use client";

import { FormEvent, useState } from "react";
import { StoreShell } from "@/components/store-shell";

export default function DeveloperUploadPage() {
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("Draft submitted successfully. Next step: connect backend API for real uploads.");
  };

  return (
    <StoreShell active="developer">
      <div className="max-w-4xl mx-auto px-8 py-10">
        <h1 className="text-3xl font-bold">Developer Upload Portal</h1>
        <p className="text-gray-600 mt-2">Publish apps across Windows, macOS, Android, Linux, and iOS from one place.</p>

        <form onSubmit={handleSubmit} className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <label className="space-y-2">
              <span className="text-sm font-medium">App Name</span>
              <input required className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Example: OmniMail" />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium">Category</span>
              <select required className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white">
                <option value="">Select category</option>
                <option>Productivity</option>
                <option>Developer Tools</option>
                <option>Games</option>
                <option>Business</option>
              </select>
            </label>
          </div>

          <label className="space-y-2 block">
            <span className="text-sm font-medium">Supported Platforms</span>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
              {[
                "Windows",
                "macOS",
                "Android",
                "Linux",
                "iOS",
              ].map((platform) => (
                <label key={platform} className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
                  <input type="checkbox" />
                  {platform}
                </label>
              ))}
            </div>
          </label>

          <label className="space-y-2 block">
            <span className="text-sm font-medium">Description</span>
            <textarea
              required
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Describe your app, key features, and target users"
            />
          </label>

          <label className="space-y-2 block">
            <span className="text-sm font-medium">App Package (placeholder)</span>
            <input type="file" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </label>

          <div className="flex items-center gap-4">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700">
              Submit Draft
            </button>
            <button type="button" className="border border-gray-300 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-50">
              Save for later
            </button>
          </div>

          {message ? <p className="text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">{message}</p> : null}
        </form>
      </div>
    </StoreShell>
  );
}
