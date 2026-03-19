import { ROUTE_PATHS } from '@org/shared-data';
import { NavigationMenuProps, NavListItem } from '@org/shared-ui';
import {
  Trophy,
  TrendingUp,
  Tv,
  MessagesSquare,
  Headset,
  MessageCircle,
  ShieldHalf,
  Lock,
  HatGlasses,
  HeartHandshake,
} from 'lucide-react';

export const leftMenuItems: NavigationMenuProps = {
  items: [
    {
      id: 'feedsNavMenuItem',
      name: 'Feeds',
      href: ROUTE_PATHS.HOME,
      icon: <Trophy size={16} />,
    },
    {
      id: 'trendingNavMenuItem',
      name: 'Trending',
      icon: <TrendingUp size={16} />,
      children: (
        <ul className="w-96">
          <NavListItem title="Best Sellers" href={ROUTE_PATHS.HOME}>
            Check out our best-selling products that customers love!
          </NavListItem>
          <NavListItem title="New Arrivals" href={ROUTE_PATHS.HOME}>
            Discover the latest additions to our collection and stay ahead of
            the trends!
          </NavListItem>
          <NavListItem title="Top Rated" href={ROUTE_PATHS.HOME}>
            Explore our top-rated products that have received rave reviews from
            our customers!
          </NavListItem>
        </ul>
      ),
    },
    {
      id: 'liveNowNavMenuItem',
      name: 'Live Now',
      icon: <Tv size={16} />,
      children: (
        <ul className="w-96">
          <NavListItem title="Property Tour" href={ROUTE_PATHS.HOME}>
            Join live property inspections and get an exclusive look at our
            latest offerings!
          </NavListItem>
          <NavListItem title="House Warming" href={ROUTE_PATHS.HOME}>
            Join our live housewarming events and celebrate new beginnings with
            us!
          </NavListItem>
          <NavListItem title="Live Sales" href={ROUTE_PATHS.HOME}>
            Strike the best deals and get exclusive access to our top-selling
            products!
          </NavListItem>
        </ul>
      ),
    },
    {
      id: 'categoriesNavMenuItem',
      name: 'Categories',
      children: (
        <ul className="w-96">
          <NavListItem title="Property Tour" href={ROUTE_PATHS.HOME}>
            Join live property inspections and get an exclusive look at our
            latest offerings!
          </NavListItem>
          <NavListItem title="House Warming" href={ROUTE_PATHS.HOME}>
            Join our live housewarming events and celebrate new beginnings with
            us!
          </NavListItem>
          <NavListItem title="Live Sales" href={ROUTE_PATHS.HOME}>
            Strike the best deals and get exclusive access to our top-selling
            products!
          </NavListItem>
        </ul>
      ),
    },
  ],
};

export const rightMenuItems: NavigationMenuProps = {
  items: [
    {
      id: 'supportNavMenuItem',
      name: 'Support',
      icon: <MessagesSquare size={16} />,
      children: (
        <ul className="w-50">
          <NavListItem
            title="Help Center"
            href={ROUTE_PATHS.HOME}
            icon={<Headset size={20} />}
          />

          <NavListItem
            title="Safety Center"
            href={ROUTE_PATHS.HOME}
            icon={<ShieldHalf size={20} />}
          />
          <NavListItem
            title="Chat With Us"
            href={ROUTE_PATHS.HOME}
            icon={<MessageCircle size={20} />}
          />
          <NavListItem
            title="Our Purchase Protection"
            href={ROUTE_PATHS.HOME}
            icon={<Lock size={20} />}
          />
          <NavListItem
            title="Privacy Policy"
            href={ROUTE_PATHS.HOME}
            icon={<HatGlasses size={20} />}
          />
          <NavListItem
            title="Terms of Service"
            href={ROUTE_PATHS.HOME}
            icon={<HeartHandshake size={20} />}
          />
        </ul>
      ),
    },
  ],
};
