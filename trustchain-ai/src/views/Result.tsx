
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function Result() {
  const location = useLocation();
  const report = location.state?.data;

  if (!report) {
    return (
      <div className="p-10">
        <h1>No verification result found.</h1>
      </div>
    );
  }

  const handlePayment = async () => {
    try {
      const payData = new FormData();

      payData.append('email', 'customer@example.com');
      payData.append('amount', '12500');
      payData.append('verification_id', report.id);

      const response = await axios.post(
        'http://localhost:8000/api/v1/payments/initiate',
        payData
      );

      if (
        response.data.status === 200 &&
        response.data.data.checkout_url
      ) {
        window.location.href = response.data.data.checkout_url;
      } else {
        alert("Payment initialization failed");
      }

    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-6">
        Verification Result
      </h1>

      <div className="bg-white rounded-2xl p-8 shadow">
        <p><strong>Verification ID:</strong> {report.id}</p>

        <p className="mt-4">
          <strong>Verdict:</strong>{" "}
          {report.analysis.verdict}
        </p>

        <p className="mt-2">
          <strong>Risk Level:</strong>{" "}
          {report.analysis.level}
        </p>

        <p className="mt-2">
          <strong>Trust Score:</strong>{" "}
          {report.analysis.score}
        </p>

        <div className="mt-6">
          <h2 className="font-bold mb-2">Flags</h2>

          <ul className="list-disc ml-6">
            {report.analysis.flags.map(
              (flag: string, idx: number) => (
                <li key={idx}>{flag}</li>
              )
            )}
          </ul>
        </div>

        <button
          onClick={handlePayment}
          className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
