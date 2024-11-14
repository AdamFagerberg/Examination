import { useEffect, useState } from "react";
import { fetchMenu } from "../../utils/api/menu";
import Menu from "../../components/Menu/Menu";
import "./HomePage.css";
import Cart from "../../components/Cart/Cart";
import CartButton from "../../components/CartButton/CartButton";

function HomePage() {
  const [menuData, setMenuData] = useState<MenuData>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const data = await fetchMenu();
      setMenuData(data);
    };

    fetchData();
  }, []);

  return (
    <main className="homepage-main">
      <header>
        <nav className="homepage-nav">
          <CartButton
            onClick={() => setIsCartOpen(true)}
            aria-label="Open shopping cart"
            aria-expanded={isCartOpen}
          ></CartButton>
        </nav>

        <h1 className="menu-title">MENY</h1>
      </header>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <Menu MenuData={menuData} />
    </main>
  );
}

export default HomePage;
