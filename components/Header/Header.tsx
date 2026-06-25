"use client";

import { useState } from "react";
import Link from "next/link";

import Icon from "../Icon/Icon";
import MobileMenu from "../MobileMenu/MobileMenu";
import css from "./Header.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={css.header}>
        <Link href="/" className={css.logo}>
          <Icon id="icon-leleka" className={css.logoIcon} />
          <span>Лелекa</span>
        </Link>

        <button className={css.burger} type="button" aria-label="Відкрити меню" onClick={openMenu}>
          <Icon id="icon-burger" className={css.burgerIcon} />
        </button>
      </header>

      {isMenuOpen && <MobileMenu onClose={closeMenu} />}
    </>
  );
};

export default Header;
