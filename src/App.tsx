import { AppSidebar } from "./components/app-sidebar";

import MainLayout from "./components/layout/MainLayout";

import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import Header from "./pages/header/Header";

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* header  */}
        <Header />
        {/* main content */}
        <div>
          <MainLayout />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;
