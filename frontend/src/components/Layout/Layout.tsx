import Footer from '@components/Layout/Footer';
import Header from '@components/Layout/Header';
import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import { FC, memo, ReactNode } from 'react';
interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = memo(({ children }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Header />
      <Container
        component="main"
        style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      >
        {children}
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </Container>
  );
});

Layout.displayName = 'Layout';
Layout.propTypes = {
  children: PropTypes.node,
};
export default Layout;
