const Home = () => {
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold text-blue-600">Home Page</h1>
        <p className="mt-2 text-gray-700">Welcome to the home page!</p>

        
  <div className="flex h-full w-full items-center justify-center">
    <div className="grid h-full w-full gap-4 bg-gray-200 p-2 grid-cols-4 grid-rows-3 rounded-lg shadow-md">
    
      <div 
        className="col-span-1 row-span-3 bg-pink-200 rounded-lg shadow-md flex items-center justify-center"
      >
        <p>Salmon</p>
      </div>
    
      <div 
        className="col-span-2 row-span-2 bg-lime-200 rounded-lg shadow-md flex items-center justify-center"
      >
        <p>Broccoli</p>
      </div>
    
      <div 
        className="col-span-1 row-span-2 bg-yellow-200 rounded-lg shadow-md flex items-center justify-center"
      >
        <p>Tamago</p>
      </div>
    
      <div 
        className="col-span-1 row-span-2 bg-tan-200 rounded-lg shadow-md flex items-center justify-center"
      >
        <p>Pork</p>
      </div>
    
      <div 
        className="col-span-2 row-span-1 bg-green-200 rounded-lg shadow-md flex items-center justify-center"
      >
        <p>Edamame</p>
      </div>
    
      <div 
        className="col-span-1 row-span-2 bg-red-200 rounded-lg shadow-md flex items-center justify-center"
      >
        <p>Tomato</p>
      </div>
    
    </div>
  </div>
  

      </div>
    );
  };
  
  export default Home;
