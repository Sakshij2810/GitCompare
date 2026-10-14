function WinnerCard({ comparison, user1, user2 }) {
  const isTie = comparison.winner === "tie";

  const winner = comparison.winner === "user1" ? user1 : user2;

  const winnerScore =
    comparison.winner === "user1" ? comparison.score1 : comparison.score2;

  const loserScore =
    comparison.winner === "user1" ? comparison.score2 : comparison.score1;

  const winnerPercentage =
    comparison.winner === "user1"
      ? comparison.percentage1
      : comparison.percentage2;

  return (
    <div className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-black/45">
          Final result
        </p>

        <div className="my-3 text-3xl">{isTie ? "🤝" : "🏆"}</div>

        <h2 className="text-xl font-bold text-[#0A0A0A]">
          {isTie ? "It's a tie!" : `${winner.login} wins!`}
        </h2>

        <p className="mt-2 text-sm text-black/55">
          {isTie
            ? "Both profiles earned the same weighted score."
            : `${winner.name || winner.login} leads in the overall comparison.`}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-[#F8F9FA] p-3 text-center">
          <p className="truncate text-xs text-black/50">{user1.login}</p>
          <p className="mt-1 text-2xl font-bold">{comparison.score1}</p>
          <p className="text-[10px] text-black/45">Weighted points</p>
        </div>

        <div className="rounded-lg bg-[#F8F9FA] p-3 text-center">
          <p className="truncate text-xs text-black/50">{user2.login}</p>
          <p className="mt-1 text-2xl font-bold">{comparison.score2}</p>
          <p className="text-[10px] text-black/45">Weighted points</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex justify-between text-xs text-black/55">
          <span>{user1.login}</span>
          <span>{user2.login}</span>
        </div>

        <div className="flex h-3 overflow-hidden rounded-full bg-black/5">
          <div
            className="bg-green-500 transition-all"
            style={{ width: `${comparison.percentage1}%` }}
          />

          <div
            className="bg-blue-500 transition-all"
            style={{ width: `${comparison.percentage2}%` }}
          />
        </div>

        <div className="mt-2 flex justify-between text-xs font-medium">
          <span>{comparison.percentage1.toFixed(1)}%</span>
          <span>{comparison.percentage2.toFixed(1)}%</span>
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] text-black/45">
        This result reflects the configured GitHub metrics and their weights,
        not overall programming ability.
      </p>
    </div>
  );
}

export default WinnerCard;
