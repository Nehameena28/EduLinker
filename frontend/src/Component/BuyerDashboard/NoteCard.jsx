 
 import React from "react";
 import { FaBook, FaDownload, FaFilePdf, FaSave } from "react-icons/fa";

 const NoteCard = ({
   title,
   description,
   price,
   category,
   fileName,
   previewUrl,
   onSave,
   onBuy,
    onUnsave,
     hideSave,
     onClick,
 }) => {
   return (
     <div className="w-full max-w-md bg-white shadow-lg hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300">
       {/* Header Section */}
       <div className="bg-gradient-to-r from-[rgba(31,91,120,0.9)] to-[rgba(31,91,120,1)] h-32 flex items-center px-6">
         <div className="flex items-center">
           <div className="bg-[rgb(221,167,123)] w-12 h-12 rounded-lg flex items-center justify-center mr-4">
             <FaBook className="text-white text-xl" />
           </div>
           <div>
             <h1 className="text-xl font-bold text-white">{title}</h1>
             <div className="flex items-center mt-1">
               <span className="bg-white/20 text-xs text-white px-2 py-1 rounded">
                 {category}
               </span>
             </div>
           </div>
         </div>
       </div>

       {/* Body */}
       <div className="p-5">
         <p className="text-sm text-gray-600 mb-4">{description}</p>

         <div className="h-0.5 bg-gradient-to-r from-transparent via-[rgb(221,167,123)] to-transparent my-4" />

         {/* PDF Preview */}
         <div className="mb-4">
           <h3 className="text-sm font-semibold text-[rgb(148,93,94)] mb-2">
             PDF PREVIEW
           </h3>
           {previewUrl ? (
             <div 
               className="block border-2 border-dashed border-[rgb(221,167,123)] rounded-lg h-24 bg-[rgba(221,167,123,0.05)] hover:bg-[rgba(221,167,123,0.15)] hover:border-[rgb(148,93,94)] transition-all duration-200 cursor-pointer no-underline group"
               onClick={() => {
                 console.log('PDF URL clicked:', previewUrl);
                 if (onClick) onClick();
                 else window.open(previewUrl, '_blank');
               }}
             >
               <div className="flex items-center justify-center h-full">
                 <div className="text-center">
                   <FaFilePdf className="text-2xl text-[rgb(148,93,94)] mb-1 mx-auto group-hover:text-[rgb(221,167,123)] transition-colors" />
                   <p className="text-xs font-medium text-gray-700 group-hover:text-[rgb(148,93,94)]">{fileName || 'Preview PDF'}</p>
                   <p className="text-xs text-blue-600 underline group-hover:text-blue-800">🔗 Click to preview</p>
                 </div>
               </div>
             </div>
           ) : (
             <div className="border-2 border-dashed border-gray-300 rounded-lg h-24 bg-gray-50 flex items-center justify-center">
               <div className="text-center">
                 <FaFilePdf className="text-2xl text-gray-400 mb-1 mx-auto" />
                 <p className="text-xs font-medium text-gray-500">No preview available</p>
               </div>
             </div>
           )}
         </div>

         {/* Bottom Actions */}
         <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-3 mt-4">
           {/* Price */}
           <div className="text-sm font-semibold text-[rgb(148,93,94)]">
             Price: ₹{price}
           </div>

           {/* Actions */}
           <div className="flex gap-2">
             {/* Save Button with Save Icon */}
 {/* 
 {!hideSave && (
             <button
               className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-3 rounded-lg text-sm transition"
               title="Save this note"
               onClick={onSave}
             >
               <FaSave className="mr-1" />
               Save
             </button>

             )} */}


             {onUnsave ? (
   <button
     className="bg-red-100 hover:bg-red-200 text-red-600 font-medium py-2 px-3 rounded-lg text-sm transition"
     onClick={onUnsave}
   >
      Unsave
   </button>
 ) : !hideSave && (
   <button
     className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-3 rounded-lg text-sm transition"
     title="Save this note"
     onClick={onSave}
   >
     💾 Save
   </button>
 )}


             {/* Buy Button */}
             <button
               onClick={onBuy}
               className="bg-[rgb(221,167,123)] hover:bg-[rgb(148,93,94)] text-white font-medium py-2 px-4 rounded-lg text-sm transition"
             >
               Buy
             </button>
           </div>
         </div>
       </div>
     </div>
   );
 };

 export default NoteCard;



