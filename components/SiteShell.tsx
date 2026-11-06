import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { MotionProvider } from "@/components/MotionProvider";
import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/PageTransition";
import { SmoothScroll } from "@/components/SmoothScroll";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <MotionProvider>
      <SmoothScroll />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-background focus:px-4 focus:py-2 focus:text-deep"
      >
        Skip to content
      </a>
      <div className="site-clip">
        <Navbar />
        <PageTransition>
          <div className="page-pad-mobile flex min-h-full flex-1 flex-col">
            {children}
            <Footer />
          </div>
        </PageTransition>
        <WhatsAppFloat />
        <MobileStickyBar />
      </div>
    </MotionProvider>
  );
}
