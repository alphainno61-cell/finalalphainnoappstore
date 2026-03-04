import { StoreShell } from "@/components/store-shell";

export default function SettingsPage() {
  return (
    <StoreShell active="settings">
      <div className="max-w-4xl mx-auto px-8 py-10">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4">Account</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-sm">Email</span>
                <span className="text-sm text-gray-500">user@example.com</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm">Account type</span>
                <span className="text-sm text-gray-500">Free</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4">Preferences</h2>
            <div className="space-y-3">
              <label className="flex justify-between items-center py-2">
                <span className="text-sm">Auto-update apps</span>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </label>
              <label className="flex justify-between items-center py-2">
                <span className="text-sm">Download on Wi-Fi only</span>
                <input type="checkbox" className="w-4 h-4" />
              </label>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4">About</h2>
            <p className="text-sm text-gray-500">OmniStore v1.0.0</p>
          </div>
        </div>
      </div>
    </StoreShell>
  );
}
