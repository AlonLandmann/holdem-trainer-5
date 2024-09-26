export default function DashboardMain({ user }) {
  return (
    <div className='grow bg-neutral-900'>
      <h1>Dashboard</h1>
      <div>
        <label>ranges</label>
        <span>{user.nrRanges} / 40</span>
      </div>
      <div>
        <label>combos trained</label>
        <span>87904</span>
      </div>
      <div>
        <label>average range complexity</label>
        <span>0.76</span>
      </div>
      <div>
        <label>training score</label>
        <span>55003</span>
      </div>
      <div>
        <label>rank</label>
        <span>Diamond General</span>
        <div className='flex items-center'>
          <i className='bi bi-x-lg'></i>
          <i className='bi bi-suit-diamond-fill'></i>
          <i className='bi bi-suit-diamond-fill'></i>
        </div>
      </div>
      <div>
        <label>ladder</label>
        <span># 103 / 29'003</span>
      </div>
      <div>
        <label>Training History</label>
        <div>---</div>
      </div>
      <div>
        <label>Top 3 Ranges - Combos Trained</label>
        <div>
          <div>1. UTG open 54,320</div>
          <div>2. HJ open 27,400</div>
          <div>3. CO open 11,100</div>
        </div>
        <div>Avg: 8,504</div>
        <div>Total: 87,904</div>
      </div>
      <div>
        <label>Top 3 Ranges - Complexity</label>
        <div>
          <div>1. Flop Donk BB vs UTG 1 - 0.94</div>
          <div>1. Flop Donk BB vs UTG 1 - 0.94</div>
          <div>1. Flop Donk BB vs UTG 1 - 0.94</div>
        </div>
        <div>Avg: 0.65</div>
      </div>
      <div>
        <label>Top 3 Ranges - Training Score</label>
        <div>
          <div>1. UTG open 33,403</div>
          <div>2. HJ open 22,104</div>
          <div>3. CO open 11,155</div>
        </div>
        <div>Avg: 4,504</div>
        <div>Total: 55,003</div>
      </div>
    </div>
  )
}