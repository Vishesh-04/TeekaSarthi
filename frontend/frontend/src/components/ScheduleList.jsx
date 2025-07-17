import { useEffect, useState } from "react";
import axios from "axios";

const ScheduleList = ({ beneficiaryId }) => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!beneficiaryId) return;

    const fetchSchedules = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/schedules/beneficiary/${beneficiaryId}`
        );
        setSchedules(response.data);
        setError(null);
      } catch {
        setError("Schedule fetch failed");
        setSchedules([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [beneficiaryId]);

  if (loading) return <p>Loading schedules...</p>;
  if (error) return <p>{error}</p>;
  if (schedules.length === 0) return <p>No schedules found.</p>;

  return (
    <div>
      <h3>Vaccination Schedule</h3>
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Dose Number</th>
            <th>Dose Date</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((s) => (
            <tr key={s.id}>
              <td>{s.doseNumber}</td>
              <td>{new Date(s.doseDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleList;
