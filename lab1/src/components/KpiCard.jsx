import './KpiCard.css';

function KpiCard({ title, value, change, isPositive }) {
  return (
    <article className="card kpi-card">
      <p className="kpi-title">{title}</p>
      <p className="kpi-value">{value}</p>
      <p className={`kpi-change ${isPositive ? 'positive' : 'negative'}`}>
        {change} <span>порівняно з минулим періодом</span>
      </p>
    </article>
  );
}

export default KpiCard;
