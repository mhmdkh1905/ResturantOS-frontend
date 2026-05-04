import styles from "./WeeklyRevenueChart.module.css";

export default function WeeklyRevenueChart({ data }) {
  const max = Math.max(...data.map((d) => d.revenue), 4);
  const steps = [0, 1, 2, 3, 4].map((s) => (max / 4) * s).reverse();

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Weekly Revenue</h2>

      <div className={styles.chart}>
        {/* Y axis */}
        <div className={styles.yAxis}>
          {steps.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>

        {/* Grid + bars */}
        <div className={styles.chartBody}>
          {/* Horizontal grid lines */}
          <div className={styles.gridLines}>
            {steps.map((_, i) => (
              <div key={i} className={styles.gridLine} />
            ))}
          </div>

          {/* Bars */}
          <div className={styles.bars}>
            {data.map((d) => {
              const pct = max === 0 ? 0 : (d.revenue / max) * 100;
              return (
                <div key={d.day} className={styles.barCol}>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.bar}
                      style={{ height: `${pct}%` }}
                      title={`$${d.revenue}`}
                    />
                  </div>
                  <span className={styles.dayLabel}>{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
