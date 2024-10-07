import { useState } from "react";
import "./Offers.css";

function Panel({ title, children, isActive, onShow }) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? <p>{children}</p> : <button onClick={onShow}>Show</button>}
    </section>
  );
}

const Offers = () => {
  // closest common parent
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <h2 className="head_section">Offers Section of your app</h2>
      <h3 className="head_section">Coming Soon</h3>
      <label>Name: </label>
      <input type="text" placeholder="enter name" />
      <label>Address: </label>
      <input type="text" placeholder="enter address" />
      <Panel
        title="About"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        With a population of about 2 million, Almaty is Kazakhstan's largest
        city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel
        title="Etymology"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for
        "apple" and is often translated as "full of apples". In fact, the region
        surrounding Almaty is thought to be the ancestral home of the apple, and
        the wild <i lang="la">Malus sieversii</i> is considered a likely
        candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
};

export default Offers;
