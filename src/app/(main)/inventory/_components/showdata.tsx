"use client"

import Link from "next/link"


export function ShowData({data} : any) {
    // console.log("data",data)
    // data.map((item: { product: any; }) => {
    //     console.log(item.product); // Log the 'product' object of each item
    // });

    return (
        <>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Product
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Price
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Bought Date
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item : any, index : any) => (
            <>
              <tr key={index}>
              {/* <Link href={`/product/${item.product.id}`}> */}
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10">
                      <img
                        className="w-full h-full"
                        src={item.product.image}
                        alt={item.product.name}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {item.product.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm overflow-hidden">
                  <p className="text-gray-900">{item.product.description}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{item.product.price}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {new Date(item.boughtDate).toLocaleDateString()}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span
                                className="relative inline-block px-3 py-1 font-semibold text-white leading-tight">
                                <span aria-hidden
                                    className="absolute inset-0 bg-blue-500 rounded-full"></span>
                                <Link href={`/product/${item.product.id}`}><span className="relative">ไปหน้า product</span></Link>
                            </span>
                        </td>
              </tr>
            </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
        </>
        
    )
}