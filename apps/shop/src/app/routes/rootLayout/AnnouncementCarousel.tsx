import CarouselWrapper from '@/components/carousel/carouselWrapper/CarouselWrapper';
import { CarouselItem, H4, SmallText } from '@org/shared-ui';
import {
  BookSearch,
  ChartNoAxesCombined,
  DollarSign,
  Headset,
  ShieldHalf,
  ShieldUser,
  Zap,
} from 'lucide-react';

const AnnouncementCarousel = () => {
  const announcements = [
    {
      id: 1,
      title: 'User Earnings',
      message: 'Earn big with Reglams!',
      icon: <DollarSign size={36} />,
    },
    {
      id: 2,
      title: 'Quick Conversion',
      message: 'Properties converted in 24 hours!',
      icon: <Zap size={36} />,
    },
    {
      id: 3,
      title: 'Guaranteed Investment',
      message: 'Enjoy guaranteed returns on your investments!',
      icon: <ChartNoAxesCombined size={36} />,
    },
    {
      id: 4,
      title: '24/7 Support',
      message: 'Get support from our team 24/7!',
      icon: <Headset size={36} />,
    },
    {
      id: 5,
      title: 'Fraud Protection',
      message: 'You are safe with our fraud detection system!',
      icon: <ShieldUser size={36} />,
    },
    {
      id: 6,
      title: 'Secure Transactions',
      message: 'Your transactions are secure and safe!',
      icon: <ShieldHalf size={36} />,
    },
    {
      id: 7,
      title: 'Free Property Verification',
      message: 'We verify all properties to ensure authenticity!',
      icon: <BookSearch size={36} />,
    },
  ];
  return (
    <CarouselWrapper
      autoplay={true}
      autoplayDelay={2500}
      dragFree={false}
      showNavigation={false}
      loop={true}
      orientation="vertical"
      classes={{
        wrapper: 'h-full w-full',
        content: 'h-full items-center',
      }}
    >
      {announcements.map((announcement) => (
        <CarouselItem
          key={announcement.id}
          className="flex basis-full flex-col items-center justify-center text-center"
        >
          <div className="flex items-center gap-2">
            {announcement.icon}
            <div className="flex flex-col items-start">
              <H4>{announcement.title}</H4>
              <SmallText>{announcement.message}</SmallText>
            </div>
          </div>
        </CarouselItem>
      ))}
    </CarouselWrapper>
  );
};

export default AnnouncementCarousel;
