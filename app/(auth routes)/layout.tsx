"use client";

import Icon from "@/components/Icon/Icon";
import Link from "next/link";
import css from "./layout.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const PublicLayout = ({ children }: Props) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <div className={css.authLayout}>
      <Link href="/" className={css.logo}>
        <Icon id="icon-Logo-leleka"className={css.logoIcon} />
      </Link>
      {children}
    </div>
  );
};
export default PublicLayout;
