import { RangeButtons } from '../styles';

const TimeRangeButtons = ({ activeRange, setActiveRange }) => {
  return (
    <RangeButtons>
      <li>
        <button
          className={activeRange === 'short' ? 'active' : ''}
          onClick={() => setActiveRange('short')}>
            This Month
        </button>
      </li>
      <li>
        <button
          className={activeRange === 'medium' ? 'active' : ''}
          onClick={() => setActiveRange('medium')}>
            Last 6 Months
        </button>
      </li>
      <li>
        <button
          className={activeRange === 'long' ? 'active' : ''}
          onClick={() => setActiveRange('long')}>
            All Time
        </button>
      </li>
    </RangeButtons>
  )
}

export default TimeRangeButtons
