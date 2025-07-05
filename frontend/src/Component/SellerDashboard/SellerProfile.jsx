import { Upload, FileText } from "lucide-react";

const SellerProfile = () => {
  const username = "Neha"; // Replace dynamically as needed

  return (
    <div className="min-h-screen bg-white text-custom-blue px-6 py-10">
      {/* Header with greeting and upload */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h2 className="text-3xl md:text-4xl font-bold">
          Hello, {username}!
        </h2>
        <button className="bg-custom-i-berry text-white hover:opacity-90 px-6 py-3 rounded-lg text-lg flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Upload New Note
        </button>
      </div>

      {/* Uploaded Notes and Earnings Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Uploaded Notes */}
        <div className="col-span-2 bg-white border shadow-md rounded-xl p-6">
          <h3 className="text-2xl font-semibold mb-4">Uploaded Notes</h3>
          <div className="space-y-4">
            <div className="flex justify-between p-3 border rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <FileText className="text-custom-blue" />
                <span className="font-medium">React Notes</span>
              </div>
              <span className="text-custom-brown font-semibold">₹149</span>
            </div>
            <div className="flex justify-between p-3 border rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <FileText className="text-custom-blue" />
                <span className="font-medium">MongoDB Guide</span>
              </div>
              <span className="text-custom-brown font-semibold">₹199</span>
            </div>
          </div>
        </div>

        {/* Earnings Summary */}
        <div className="bg-white border shadow-md rounded-xl p-6">
          <h3 className="text-2xl font-semibold mb-4">Earnings Summary</h3>
          <div className="space-y-4 text-lg">
            <div className="flex justify-between">
              <span>Total Earnings</span>
              <span className="font-bold text-custom-brown">₹348</span>
            </div>
            <div className="flex justify-between">
              <span>Total Notes Sold</span>
              <span className="font-semibold text-custom-blue">2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Purchased Notes Info */}
      <div className="bg-white border shadow-md rounded-xl p-6 mb-10">
        <h3 className="text-2xl font-semibold mb-4">Purchased Notes Info</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-custom-blue text-white text-left">
                <th className="p-3">Note Title</th>
                <th className="p-3">Price</th>
                <th className="p-3">Buyer</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">React Notes</td>
                <td className="p-3 text-custom-brown font-semibold">₹149</td>
                <td className="p-3">Neha Meena</td>
                <td className="p-3 text-sm text-gray-500">2025-07-03</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">MongoDB Guide</td>
                <td className="p-3 text-custom-brown font-semibold">₹199</td>
                <td className="p-3">Ram Jivan</td>
                <td className="p-3 text-sm text-gray-500">2025-07-04</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
