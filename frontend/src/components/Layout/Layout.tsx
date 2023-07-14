import Footer from '@components/Layout/Footer';
import Header from '@components/Layout/Header';
import { Container, Grid } from '@mui/material';
import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }): JSX.Element => {
  return (
    <Container maxWidth="lg">
      <Header title="Posts" />
      <main>{children}</main>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
      ;
    </Container>
  );
};

export default Layout;
