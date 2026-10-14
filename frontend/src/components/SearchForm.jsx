import { useState } from "react";
import { FiSearch, FiLoader } from "react-icons/fi";

import { fetchGithubProfiles } from "../services/githubApi.js";
import { calculateComparison } from "../utils/scoring.js";

import ProfileCard from "./ProfileCard.jsx";
import ComparisonTable from "./ComparisonTable.jsx";
import WinnerCard from "./WinnerCard.jsx";

function Input({ label, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-semibold uppercase tracking-wider text-black/70">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-lg border-2 border-black/25 bg-white px-2.5 py-2 text-xs text-[#0A0A0A] outline-none transition-colors placeholder-black/30 focus:border-black/60"
      />
    </div>
  );
}

const SearchForm = () => {
  const [user1Url, setUser1Url] = useState("");
  const [user2Url, setUser2Url] = useState("");

  const [profiles, setProfiles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCompare = async () => {
    if (loading) return;

    setError("");

    if (!user1Url.trim() || !user2Url.trim()) {
      setError("Please enter both GitHub profile URLs.");
      return;
    }

    setLoading(true);
    setProfiles(null);

    try {
      const [user1, user2] = await fetchGithubProfiles(user1Url, user2Url);

      setProfiles({ user1, user2 });
    } catch (err) {
      setError(err.message || "Failed to fetch GitHub profiles.");
    } finally {
      setLoading(false);
    }
  };

  const comparison = profiles
    ? calculateComparison(profiles.user1, profiles.user2)
    : null;

  return (
    <div className="flex flex-col gap-4">
      {/* Search form */}
      <div className="relative overflow-hidden rounded-xl border-2 border-black/15 bg-[#F8F9FA] p-3 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col gap-3">
          <Input
            label="User 1"
            value={user1Url}
            onChange={setUser1Url}
            placeholder="Enter GitHub profile URL or username"
          />

          <Input
            label="User 2"
            value={user2Url}
            onChange={setUser2Url}
            placeholder="Enter GitHub profile URL or username"
          />
        </div>

        <button
          type="button"
          onClick={handleCompare}
          disabled={loading}
          className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-black/20 py-2.5 text-xs text-black/60 transition-all hover:border-black/40 hover:text-[#0A0A0A] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" size={13} />
              Fetching profiles...
            </>
          ) : (
            <>
              <FiSearch size={13} />
              Compare
            </>
          )}
        </button>

        {error && (
          <p
            role="alert"
            className="mt-3 rounded-lg bg-red-50 p-3 text-xs text-red-700"
          >
            {error}
          </p>
        )}
      </div>

      {/* Comparison results */}
      {profiles && comparison && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <ProfileCard user={profiles.user1} title="Developer 1" />

            <ProfileCard user={profiles.user2} title="Developer 2" />
          </div>

          <ComparisonTable
            comparison={comparison}
            user1={profiles.user1}
            user2={profiles.user2}
          />

          <WinnerCard
            comparison={comparison}
            user1={profiles.user1}
            user2={profiles.user2}
          />
        </div>
      )}
    </div>
  );
};

export default SearchForm;
