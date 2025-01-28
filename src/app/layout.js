import "./globals.css";
// import "./style/global.scss";
import { SectorDataProvider } from "../context/apiContext";
import Header from "./_common/header/header";
import Footer from "./_common/footer/footer";
// import { Toaster } from 'sonner';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <Toaster position='top-right' /> */}
        <SectorDataProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </SectorDataProvider>
      </body>
    </html>
  );
}