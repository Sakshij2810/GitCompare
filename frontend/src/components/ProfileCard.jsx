function ProfileCard({ user, title }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-4 shadow-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-black/50">
        {title}
      </p>

      <div className="flex items-center gap-3">
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className="h-16 w-16 rounded-full border border-black/10 object-cover"
        />

        <div className="min-w-0">
          <h3 className="truncate text-base font-bold text-[#0A0A0A]">
            {user.name || user.login}
          </h3>

          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            @{user.login}
          </a>
        </div>
      </div>

      <p className="mt-3 min-h-10 text-sm text-black/60">
        {user.bio || "No bio available."}
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-lg bg-[#F8F9FA] p-2 text-center">
          <p className="text-lg font-bold">{user.public_repos}</p>
          <p className="text-[10px] text-black/50">Repositories</p>
        </div>

        <div className="rounded-lg bg-[#F8F9FA] p-2 text-center">
          <p className="text-lg font-bold">{user.followers.toLocaleString()}</p>
          <p className="text-[10px] text-black/50">Followers</p>
        </div>

        <div className="rounded-lg bg-[#F8F9FA] p-2 text-center">
          <p className="text-lg font-bold">{user.following.toLocaleString()}</p>
          <p className="text-[10px] text-black/50">Following</p>
        </div>
      </div>

      <a
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
        className="mt-4 block rounded-lg border border-black/15 py-2 text-center text-xs font-medium hover:bg-black/5"
      >
        View GitHub Profile ↗
      </a>
    </div>
  );
}

export default ProfileCard;
