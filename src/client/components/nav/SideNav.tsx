const SideNav = () => {
  return (
    <section>
      <div
        className="sidebar absolute inset-y-0  left-0 min-h-screen w-64 -translate-x-full transform space-y-6 bg-primary py-7 
          px-2 transition duration-200 ease-in-out md:relative md:translate-x-0 ">
        <div className="m-10">logo</div>
        <nav>
          <div className="block rounded py-2.5 px-4 transition duration-200 hover:bg-secondary hover:text-white">
            List Item
          </div>
          <div className="block rounded py-2.5 px-4 transition duration-200 hover:bg-secondary hover:text-white">
            List Item
          </div>
          <div className="block rounded py-2.5 px-4 transition duration-200 hover:bg-secondary hover:text-white">
            List Item
          </div>
          <div className="block rounded py-2.5 px-4 transition duration-200 hover:bg-secondary hover:text-white">
            List Item
          </div>
        </nav>
      </div>
    </section>
  );
};

export default SideNav;
