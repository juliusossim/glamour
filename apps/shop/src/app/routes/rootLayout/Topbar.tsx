import { ROUTE_PATHS } from '@org/shared-data';
import { NavMenuWrapper, SmallText } from '@org/shared-ui';
import { ShoppingCart, UserRound } from 'lucide-react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import DisplayWidth from './DisplayWidth';
import { leftMenuItems, rightMenuItems } from './MenuItems';
import SearchBox from './SearchBox';

const Topbar: FC = () => {
  return (
    <div className=" flex flex-col min-h-12 items-center justify-center border-b bg-gold-gradient">
      <DisplayWidth>
        <div className="flex items-center justify-between gap-2 w-full py-3">
          <NavMenuWrapper {...leftMenuItems} />
          <SearchBox />
          <Link
            to={ROUTE_PATHS.LOGIN}
            className="flex shrink-0 items-center gap-2"
          >
            <UserRound size={18} />
            <div className="flex flex-col items-start">
              <SmallText className="font-thin">Sign in / Register</SmallText>
              <SmallText className="font-bold">Account & Orders</SmallText>
            </div>
          </Link>
          <NavMenuWrapper {...rightMenuItems} />

          <Link
            to={ROUTE_PATHS.LOGIN}
            className="flex shrink-0 items-center gap-2 font-bold"
          >
            <ShoppingCart size={18} />
          </Link>
        </div>
      </DisplayWidth>
    </div>
  );
};

export default Topbar;
