"use client"


export function InfoPage({ data } : any) {
    // console.log(data)
    return (
        <>
        <div>
            <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <a href="/" className="hover:underline hover:text-gray-600">Home</a>
                <span>
                  <svg className="h-5 w-5 leading-none text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
                <a className="hover:underline hover:text-gray-600">{data.name}</a>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
              <div className="flex flex-col md:flex-row -mx-2">
                <div className="md:flex-1 px-4">
                  <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                    <img alt={data.name} src={data.image} className="focus:outline-none w-full h-full" />
                  </div>
                </div>
                  <div className="md:flex-1 px-4">
                    <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{data.name}</h2>
                    <p className="text-gray-500 text-sm">Published Date: {new Date(data.CreateAt).toLocaleDateString()}</p>
                    <p className="text-gray-500">{data.description}</p>
                    <div className="flex items-center space-x-4 my-4">
                      <div>
                        <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                          <span className="text-indigo-400 mr-1 mt-1">฿</span>
                          <span className="font-bold text-indigo-600 text-3xl">{data.price}</span>
                        </div>
                      </div>
                    </div>
                    {data.Inventory.length === 0 ? (
                            <button type="button" className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white">
                            Buy now
                            </button>
                    ) : (
                        <button className="h-14 px-6 py-2 font-semibold rounded-xl bg-gray-300 cursor-not-allowed text-white" disabled>
                        Owned
                        </button>
                    )}
                    
                    </div>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}