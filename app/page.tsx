import { SiteShell } from "@/components/SiteShell";
import { Hero } from "@/components/Hero";
import { StudioIntro } from "@/components/home/StudioIntro";
import { SelectedWork } from "@/components/home/SelectedWork";
import { ServiceList } from "@/components/ServiceList";
import { WhyUs } from "@/components/home/WhyUs";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Stats } from "@/components/Stats";
import { Testimonial } from "@/components/Testimonial";
import { Gallery } from "@/components/Gallery";
import { FinalCTA } from "@/components/home/FinalCTA";
import { RecentUpdates } from "@/components/home/RecentUpdates";

export default function HomePage() {
  return (
    <SiteShell>
      <main id="main">
        <Hero />
        <StudioIntro />
        <SelectedWork />
        <ServiceList />
        <WhyUs />
        <ProcessTimeline />
        <Stats />
        <Testimonial />
        <RecentUpdates />
        <Gallery />
        <FinalCTA />
      </main>
    </SiteShell>
  );
}
