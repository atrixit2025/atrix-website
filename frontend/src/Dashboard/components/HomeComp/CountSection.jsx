import React, { useContext, useEffect, useState } from "react";
import { FaBloggerB } from "react-icons/fa6";
import { BlogCategoryContext } from "../../ContextApi/BlogCategoryContextApi";
import { PortfolioCategoryContext } from "../../ContextApi/PortfolioCategoryContextApi";

export default function CountSectionMetrics() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { 
    totalBlogCount, 
    fetchCounts: fetchBlogCounts 
  } = useContext(BlogCategoryContext);
  
  const { 
    totalPortfolioCount, 
    fetchCounts: fetchPortfolioCounts 
  } = useContext(PortfolioCategoryContext);

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        await Promise.all([
          fetchBlogCounts(),
          fetchPortfolioCounts()
        ]);
        
        if (isMounted) {
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error loading counts:", err);
          setError("Failed to load counts");
          setIsLoading(false);
        }
      } 
    };
    
    loadData();
    
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array if fetch functions are stable

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* Blog Count Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <FaBloggerB className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Blog
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {isLoading ? 'Loading...' : totalBlogCount}
            </h4>
          </div>
        </div>
      </div>

      {/* Portfolio Count Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <FaBloggerB className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Portfolio
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {isLoading ? 'Loading...' : totalPortfolioCount}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}





// import React, { useContext, useEffect } from "react";
// import { FaBloggerB } from "react-icons/fa6";
// import { BlogCategoryContext } from "../../ContextApi/BlogCategoryContextApi";
// import { PortfolioCategoryContext } from "../../ContextApi/PortfolioCategoryContextApi";

// export default function CountSectionMetrics() {
//   // Destructure with different variable names
//   const { 
//     totalBlogCount, 
//     fetchCounts: fetchBlogCounts 
//   } = useContext(BlogCategoryContext);
  
//   const { 
//     totalPortfolioCount, 
//     fetchCounts: fetchPortfolioCounts 
//   } = useContext(PortfolioCategoryContext);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         // Call both fetch functions
//         await Promise.all([
//           fetchBlogCounts(),
//           fetchPortfolioCounts()
//         ]);
//       } catch (error) {
//         console.error("Error loading counts:", error);
//       } 
//     };
    
//     loadData();
//   }, [fetchBlogCounts, fetchPortfolioCounts]); // Add both to dependencies

//   return (
//     <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
//       {/* Blog Count Card */}
//       <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
//         <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
//           <FaBloggerB className="text-gray-800 size-6 dark:text-white/90" />
//         </div>
//             <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
//               {totalBlogCount !== undefined ? totalBlogCount : 'Loading...'}
//             </h4>
//           </div>
//         </div>
//       </div>

//       {/* Portfolio Count Card */}
//       <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
//         <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
//           {/* Use a different icon for portfolio */}
//           <FaBloggerB className="text-gray-800 size-6 dark:text-white/90" />
//         </div>
//         <div className="flex items-end justify-between mt-5">
//           <div>
//             <span className="text-sm text-gray-500 dark:text-gray-400">
//               Portfolio
//             </span>
//             <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
//               {totalPortfolioCount !== undefined ? totalPortfolioCount : 'Loading...'}
//             </h4>
//           </div>
//         </div>
//       </div>



//       <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
//         <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
//           {/* Use a different icon for portfolio */}
//           <FaBloggerB className="text-gray-800 size-6 dark:text-white/90" />
//         </div>
//         <div className="flex items-end justify-between mt-5">
//           <div>
//             <span className="text-sm text-gray-500 dark:text-gray-400">
//               Portfolio
//             </span>
//             <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
//               {totalPortfolioCount !== undefined ? totalPortfolioCount : 'Loading...'}
//             </h4>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }      <div className="flex items-end justify-between mt-5">
//           <div>
//             <span className="text-sm text-gray-500 dark:text-gray-400">
//               Blog
//             </span>
  