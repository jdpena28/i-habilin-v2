const Features = () => {
  return (
    <section>
      <div className="grid grid-flow-col grid-rows-3 gap-4">
        <img className="row-start-1" src="Card-container.jpg" alt="" />
        <img className="col-span-2" src="Card-container.jpg" alt="" />
        <img
          className="col-span-2 row-span-2"
          src="Card-container.jpg"
          alt=""
        />
      </div>
    </section>
  );
};

export default Features;
