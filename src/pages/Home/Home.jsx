import React, { useState, lazy, Suspense } from "react";
import { ThemeProvider, useMediaQuery } from "@mui/material";
import { CssBaseline, Container, CircularProgress } from "@mui/material";
import theme from "../../theme";
import DesktopAppBar from "../../components/AppBar";
import BottomNav from "../../components/BottomNav";
import QuoteForm from "../../components/QuoteForm";

const HomeTab = lazy(() => import("../../components/HomeTab"));
const PortfolioTab = lazy(() => import("../../components/PortfolioTab"));
const FAQTab = lazy(() => import("../../components/FAQTab"));

const Home = () => {
  const [value, setValue] = useState("home");
  const [isQuoteFormVisible, setQuoteFormVisible] = useState(false); // Add this line
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const renderTabContent = () => {
    switch (value) {
      case "home":
        return <HomeTab onOpenQuoteForm={() => setQuoteFormVisible(true)} />; // Modify this line
      case "portfolio":
        return <PortfolioTab />;
      case "faq":
        return <FAQTab />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ pb: isMobile ? 7 : 0 }}>
        <Suspense fallback={<CircularProgress />}>
          {renderTabContent()}
        </Suspense>
      </Container>
      <QuoteForm isVisible={isQuoteFormVisible} onClose={() => setQuoteFormVisible(false)} /> {/* Add this line */}
      {isMobile ? (
        <BottomNav value={value} onChange={(event, newValue) => setValue(newValue)} />
      ) : (
        <DesktopAppBar value={value} onChange={(event, newValue) => setValue(newValue)} />
      )}
    </ThemeProvider>
  );
};

export default Home;
