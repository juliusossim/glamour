import { H4, SmallText } from '@org/shared-ui';
import { Kanban, Smartphone } from 'lucide-react';
import AnnouncementCarousel from './AnnouncementCarousel';
import DisplayWidth from './DisplayWidth';

function AnnouncementBar() {
  return (
    <div className="bg-emerald-gradient text-white text-center flex flex-col items-center justify-center text-sm sm:text-base">
      <DisplayWidth>
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex shrink-0 items-center gap-2">
            <Kanban size={36} />
            <div className="flex flex-col items-start">
              <H4>LuxMan live</H4>
              <SmallText>Premium property management services.</SmallText>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="h-11 w-full overflow-hidden">
              <AnnouncementCarousel />
            </div>
          </div>

          <div className="flex shrink-0 flex-col justify-center gap-2">
            <div className="flex items-center">
              <Smartphone size={36} />
              <H4>Get the GAL App</H4>
            </div>
          </div>
        </div>
      </DisplayWidth>
    </div>
  );
}

export default AnnouncementBar;
