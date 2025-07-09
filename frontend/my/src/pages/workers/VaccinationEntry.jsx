// VaccinationEntry.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function VaccinationEntry() {
  const navigate = useNavigate();
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [vaccineType, setVaccineType] = useState("");
  const [date, setDate] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("workerToken");
    if (!token) return navigate("/workerlogin");

    const fetchVerifiedBeneficiaries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/worker/verified-beneficiaries", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBeneficiaries(response.data);
      } catch (error) {
        console.error("Error fetching verified beneficiaries", error);
        setMessage("Error loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchVerifiedBeneficiaries();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("workerToken");
    if (!token) return navigate("/workerlogin");

    const formData = new FormData();
    formData.append("beneficiaryId", selectedId);
    formData.append("vaccineType", vaccineType);
    formData.append("dateGiven", date);
    if (photo) formData.append("photo", photo);

    try {
      await axios.post("http://localhost:5000/api/worker/vaccinate", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Vaccination entry submitted successfully");
      setSelectedId("");
      setVaccineType("");
      setDate("");
      setPhoto(null);
    } catch (err) {
      console.error(err);
      setMessage("Submission failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading beneficiaries...</p>;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Vaccination Entry</h2>
      {message && <p className="mb-4 text-center text-sm text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Select Beneficiary</label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select --</option>
            {beneficiaries.map((b) => (
              <option key={b._id} value={b._id}>
                {b.childName} (Guardian: {b.guardianName})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Vaccine Type</label>
          <input
            type="text"
            value={vaccineType}
            onChange={(e) => setVaccineType(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Date Given</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Upload Vaccination Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Submit Entry
        </button>
      </form>
    </div>
  );
}

export default VaccinationEntry;