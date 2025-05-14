// import React from 'react';
// import { Skeleton } from '@/components/ui/skeleton';

// const DynamicChartLoader = ({ type }) => {
//   const renderLoader = () => {
//     switch (type) {
//       case 'pie':
//         return (
//           <div className='flex items-center justify-center h-64'>
//             <div className='relative w-32 h-32'>
//               <Skeleton className='absolute inset-0 rounded-full bg-gray-200 animate-pulse' />
//             </div>
//           </div>
//         );
//       case 'bar':
//         return (
//           <div className='flex flex-col space-y-2 p-4 h-64'>
//             {[...Array(5)].map((_, index) => (
//               <Skeleton key={index} className='h-6 bg-gray-200 animate-pulse w-full rounded-md' />
//             ))}
//           </div>
//         );
//       case 'treemap':
//         return (
//           <div className='grid grid-cols-3 gap-2 p-4 h-64'>
//             {[...Array(9)].map((_, index) => (
//               <Skeleton key={index} className='h-20 bg-gray-200 animate-pulse rounded-md' />
//             ))}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return <div>{renderLoader()}</div>;
// };

// export default DynamicChartLoader;

import React from "react";
import "./DynamicChartLoader.scss";

const DynamicChartLoader = ({ type }) => {
  const renderLoader = () => {
    switch (type) {
      case "pie":
        return (
          <div className="flex items-center justify-center h-64">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        );
      case "bar":
        return (
          <div className="flex items-end justify-around p-4 h-64">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-6 bg-gray-200 animate-pulse rounded-md"
                  style={{ height: `${Math.random() * 80 + 20}%` }}
                ></div>
                <div className="mt-2 text-xs text-gray-500">
                  Legend {index + 1}
                </div>
              </div>
            ))}
          </div>
        );
      case "treemap":
        return (
          <div className="grid grid-cols-3 gap-2 p-4 h-64">
            {[...Array(9)].map((_, index) => (
              <div
                key={index}
                className="h-20 bg-gray-200 animate-pulse rounded-md"
              ></div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return <div>{renderLoader()}</div>;
};

export default DynamicChartLoader;
