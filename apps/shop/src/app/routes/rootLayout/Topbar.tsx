import { ROUTE_PATHS } from '@org/shared-data';
import { H4, SmallText } from '@org/shared-ui';
import { TrendingUp, Trophy, Tv } from 'lucide-react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import DisplayWidth from './DisplayWidth';
import SearchBox from './SearchBox';

const Topbar: FC = () => {
  return (
    <div className=" flex flex-col min-h-12 items-center justify-center border-b bg-gold-gradient">
      <DisplayWidth>
        <div className="flex w-full items-center justify-between gap-4">
          <H4>Glamour And Large</H4>
          <Link to={ROUTE_PATHS.HOME}>
            <SmallText className="flex items-center gap-1">
              <TrendingUp size={16} />
              Trending
            </SmallText>
          </Link>
          <Link to={ROUTE_PATHS.HOME}>
            <SmallText className="flex items-center gap-1">
              <Tv size={16} />
              Live Now
            </SmallText>
          </Link>
          <Link to={ROUTE_PATHS.HOME}>
            <SmallText className="flex items-center gap-1">
              <Trophy size={16} />
              Champs
            </SmallText>
          </Link>
          <SearchBox />
        </div>
      </DisplayWidth>
    </div>
  );
};

export default Topbar;
