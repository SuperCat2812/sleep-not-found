import '@blossom-carousel/react/style.css';
import './globals.css';

import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <TanStackProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <main>{children}</main>
    </TanStackProvider>
  );
};

export default Layout;
