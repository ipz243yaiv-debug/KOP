import {
  Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from 'recharts';

const colors = ['#ed654c', '#4d9fce', '#77a85b', '#a779c7', '#d59f45', '#d36d8a', '#6c9c9a', '#7b83c1'];

function PokemonChart({ data, type }) {
  if (data.length === 0) return <p>Немає даних для графіка.</p>;

  return (
    <div className="chart-area">
      <ResponsiveContainer width="100%" height={320}>
        {type === 'pie' ? (
          <PieChart>
            <Pie data={data} dataKey="count" nameKey="type" outerRadius="80%">
              {data.map((item, index) => <Cell key={item.type} fill={colors[index % colors.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        ) : (
          <BarChart data={data} margin={{ top: 10, right: 10, bottom: 30, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" angle={-35} textAnchor="end" interval={0} height={65} tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" name="Покемонів" fill="#ed654c" />
          </BarChart>
        )}
      </ResponsiveContainer>
      {type === 'pie' && (
        <ul className="chart-legend">
          {data.map((item, index) => (
            <li key={item.type}><span style={{ backgroundColor: colors[index % colors.length] }} />{item.type}: {item.count}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PokemonChart;
