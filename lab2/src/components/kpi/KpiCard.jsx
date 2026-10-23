import './KpiCard.css';

function KpiCard({ title, value, description }) {
  return (
    <article className="card kpi-card">
      <p className="kpi-title">{title}</p>
      <p className="kpi-value">{value}</p>
      <p className="kpi-description">{description}</p>
    </article>
  );
}

export default KpiCard;
