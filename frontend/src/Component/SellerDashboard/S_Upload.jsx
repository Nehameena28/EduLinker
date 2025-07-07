// import React, { useState } from "react";

// const S_Upload = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState("");
//   const [pdfFile, setPdfFile] = useState(null);
//   const [coverImage, setCoverImage] = useState(null);

//   const predefinedCategories = [
//     "Physics",
//     "Chemistry",
//     "Mathematics",
//     "Biology",
//     "Computer Science",
//     "English",
//     "History",
//     "Geography",
//     "Economics"
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!pdfFile || !coverImage || !title || !description || !category || !price) {
//       alert("Please fill all the fields and upload both files.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("category", category);
//     formData.append("price", price);
//     formData.append("pdf", pdfFile);
//     formData.append("cover", coverImage);

//     // Example: axios.post("/api/upload", formData)
//     console.log("Form submitted");

//     // Reset form
//     setTitle("");
//     setDescription("");
//     setCategory("");
//     setPrice("");
//     setPdfFile(null);
//     setCoverImage(null);
//     e.target.reset();
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
//       <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Upload Study Material</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block mb-2 font-medium text-gray-700">Title</label>
//           <input
//             type="text"
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
//             placeholder="Enter title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-2 font-medium text-gray-700">Description</label>
//           <textarea
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
//             placeholder="Enter description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-2 font-medium text-gray-700">Select Category</label>
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             required
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
//           >
//             <option value="">-- Select Category --</option>
//             {predefinedCategories.map((cat, index) => (
//               <option key={index} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block mb-2 font-medium text-gray-700">Price (in ₹)</label>
//           <input
//             type="number"
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
//             placeholder="Enter price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//             min="0"
//           />
//         </div>

//         <div>
//           <label className="block mb-2 font-medium text-gray-700">Upload PDF</label>
//           <input
//             type="file"
//             accept=".pdf"
//             onChange={(e) => setPdfFile(e.target.files[0])}
//             required
//             className="w-full"
//           />
//         </div>

//         <div>
//           <label className="block mb-2 font-medium text-gray-700">Upload Cover Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setCoverImage(e.target.files[0])}
//             required
//             className="w-full"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
//         >
//           Upload
//         </button>
//       </form>
//     </div>
//   );
// };

// export default S_Upload;



import React, { useState } from "react";
import axios from "axios";

const S_Upload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const predefinedCategories = [
    "Physics", "Chemistry", "Mathematics", "Biology",
    "Computer Science", "English", "History", "Geography", "Economics", "JavaScript"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdfFile || !coverImage || !title || !description || !category || !price) {
      alert("Please fill all the fields and upload both files.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("pdf", pdfFile);       // key must match multer name
    formData.append("cover", coverImage);  // key must match multer name

    try {
      const response = await axios.post("http://localhost:7000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, // if your backend sets cookies
      });

      alert("Upload successful!");
      console.log(response.data);

      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
      setPdfFile(null);
      setCoverImage(null);
      e.target.reset();

    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Check console for details.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Upload Study Material</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Select Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="">-- Select Category --</option>
            {predefinedCategories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Price (in ₹)</label>
          <input type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        {/* PDF Upload */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Upload PDF</label>
          <input type="file" accept=".pdf" onChange={(e) => setPdfFile(e.target.files[0])} required className="w-full" />
        </div>

        {/* Cover Image Upload */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Upload Cover Image</label>
          <input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])} required className="w-full" />
        </div>

        {/* Submit */}
        <button type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default S_Upload;
