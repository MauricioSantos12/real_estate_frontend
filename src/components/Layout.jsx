import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main className="flex-grow p-4">{children}</main>
            <Footer />
        </>
    );
}

export default Layout;
