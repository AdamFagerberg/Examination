import "./Menu.css";
import ItemLabel from "../ItemLabel/ItemLabel";
import { useCart } from "../../context/CartContext";

type MenuProps = {
  MenuData: MenuData;
};

export default function Menu({ MenuData }: MenuProps) {
  const { addToCart } = useCart();

  const wontons: Wonton[] = MenuData.filter(
    (item): item is Wonton => item.type === "wonton"
  );

  const dips: Dip[] = MenuData.filter(
    (item): item is Dip => item.type === "dip"
  );

  const drinks: Drink[] = MenuData.filter(
    (item): item is Drink => item.type === "drink"
  );

  return (
    <section className="menu-container">
      <article className="menu-section wontons">
        <ul className="menu-list">
          {wontons.map((wonton) => (
            <li
              key={wonton.id}
              className="menu-item"
              onClick={() => addToCart(wonton)}
            >
              <div className="item-header">
                <h2 className="item-name">{wonton.name}</h2>
                <span className="dotted-line"></span>
                <p className="item-price">{wonton.price} SEK</p>
              </div>
              <p className="item-text">{wonton.ingredients.join(", ")}</p>
            </li>
          ))}
        </ul>
      </article>

      <article className="menu-section dips">
        <div className="item-header">
          <h2 className="item-name">Dipsås</h2>
          <span className="dotted-line"></span>
          <p className="item-price">19 SEK</p>
        </div>
        <ul className="label-container">
          {dips.map((dip) => (
            <li key={dip.id} className="menu-item">
              <ItemLabel title={dip.name} onClick={() => addToCart(dip)} />
            </li>
          ))}
        </ul>
      </article>

      <article className="menu-section drinks">
        <div className="item-header">
          <h2 className="item-name">Dricka</h2>
          <span className="dotted-line"></span>
          <p className="item-price">19 SEK</p>
        </div>
        <ul className="label-container">
          {drinks.map((drink) => (
            <li key={drink.id} className="menu-item">
              <ItemLabel title={drink.name} onClick={() => addToCart(drink)} />
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
