import ScheduleConfirmationCard from "../components/ScheduleConfirmationCard";

export default function SchedulePage() {
  const dummyData = {
    childName: 'Ravi Kumar',
    dob: '2022-08-15',
    guardian: 'Sunita Devi',
    vaccine: 'Pentavalent-1',
    dose: '1st',
    dueDate: '2025-06-01',
    status: 'PENDING',
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Vaccination Schedule Confirmation</h1>
      <ScheduleConfirmationCard data={dummyData} />
    </div>
  );
}