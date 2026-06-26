"use client";

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
//I NEED TO ADD LOGO HERE - REMINDER
  return <>{children}</>;
};
export default PublicLayout;
