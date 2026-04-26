/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { format } from 'date-fns';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import HeadRoom from 'react-headroom';
import { AnyObject } from 'yup/lib/types';

import EmbedModal from '@/components/EmbedModal';
import EMIModal from '@/components/EMIModal';
import ScheduleVisit from '@/components/ScheduleVisit';
import ShareModal from '@/components/ShareModal';
import Fab from '@/containers/PropertyDetailsPage/Hero/Fab';

import PageScroll from './PageScroll';

const BLUR_DATA_URL =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4=';

function numDifferentiation(val: any) {
    if (val >= 10000000) val = (val / 10000000).toFixed(2) + ' Cr.';
    else if (val >= 100000) val = (val / 100000).toFixed(2) + ' Lakh';
    else if (val >= 1000) val = (val / 1000).toFixed(2) + ' K';
    return val;
}

const Hero = ({
    item,
    yourHome,
    onePercentPlan,
}: {
    item: any;
    yourHome?: boolean;
    onePercentPlan?: boolean;
}) => {
    const modalRef: any = useRef(null);
    const [sideModal, setSideModal] = useState(false);
    const [shareModal, setShareModal] = useState(false);
    const [emiModal, setEmiModal] = useState(false);
    const [embedModal, setEmbedModal] = useState(false);

    const DesktopSlider = item?.banner_carousel;
    const MobileSlider = item?.mobile_banner_carousel;

    // Mobile Carousel Setup
    const autoplayMobile = useRef(
        Autoplay({
            delay: 3600,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
            rootNode: (emblaRoot) => emblaRoot.parentElement,
        })
    );

    const [emblaRefMobile, emblaApiMobile] = useEmblaCarousel(
        {
            loop: true,
            align: 'start',
            skipSnaps: false,
        },
        [autoplayMobile.current]
    );

    // Desktop Carousel Setup
    const autoplayDesktop = useRef(
        Autoplay({
            delay: 3600,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
            rootNode: (emblaRoot) => emblaRoot.parentElement,
        })
    );

    const [emblaRefDesktop, emblaApiDesktop] = useEmblaCarousel(
        {
            loop: true,
            align: 'start',
            skipSnaps: false,
        },
        [autoplayDesktop.current]
    );

    const [currentIndexMobile, setCurrentIndexMobile] = useState(0);
    const [snapListMobile, setSnapListMobile] = useState<number[]>([]);
    const [currentIndexDesktop, setCurrentIndexDesktop] = useState(0);

    const onSelectMobile = useCallback(() => {
        if (!emblaApiMobile) return;
        const index = emblaApiMobile.selectedScrollSnap();
        setCurrentIndexMobile(index);
    }, [emblaApiMobile]);

    const onSelectDesktop = useCallback(() => {
        if (!emblaApiDesktop) return;
        const index = emblaApiDesktop.selectedScrollSnap();
        setCurrentIndexDesktop(index);
    }, [emblaApiDesktop]);

    useEffect(() => {
        if (!emblaApiMobile) return;

        setSnapListMobile(emblaApiMobile.scrollSnapList());
        emblaApiMobile.on('select', onSelectMobile);
        emblaApiMobile.on('reInit', onSelectMobile);
        onSelectMobile();

        return () => {
            emblaApiMobile.off('select', onSelectMobile);
            emblaApiMobile.off('reInit', onSelectMobile);
        };
    }, [emblaApiMobile, onSelectMobile]);

    useEffect(() => {
        if (!emblaApiDesktop) return;

        emblaApiDesktop.on('select', onSelectDesktop);
        emblaApiDesktop.on('reInit', onSelectDesktop);
        onSelectDesktop();

        return () => {
            emblaApiDesktop.off('select', onSelectDesktop);
            emblaApiDesktop.off('reInit', onSelectDesktop);
        };
    }, [emblaApiDesktop, onSelectDesktop]);

    // Navigation functions for mobile
    const scrollPrevMobile = useCallback(() => {
        if (emblaApiMobile) emblaApiMobile.scrollPrev();
    }, [emblaApiMobile]);

    const scrollNextMobile = useCallback(() => {
        if (emblaApiMobile) emblaApiMobile.scrollNext();
    }, [emblaApiMobile]);

    const scrollToMobile = useCallback(
        (index: number) => {
            if (emblaApiMobile) emblaApiMobile.scrollTo(index);
        },
        [emblaApiMobile]
    );

    // Navigation functions for desktop
    const scrollPrevDesktop = useCallback(() => {
        if (emblaApiDesktop) emblaApiDesktop.scrollPrev();
    }, [emblaApiDesktop]);

    const scrollNextDesktop = useCallback(() => {
        if (emblaApiDesktop) emblaApiDesktop.scrollNext();
    }, [emblaApiDesktop]);

    const getTypesString = () => {
        const types = item?.starting_prices?.map((e: any) => e.name);
        const bhks = types?.filter((type: string) => type.includes('BHK'));
        const otherTypes = types?.filter(
            (type: string) => !type.includes('BHK')
        );
        const bhkString =
            bhks && bhks.join(',').replace(/ BHK/g, '').replace(/,/g, ', ');
        if (otherTypes && otherTypes.length > 0) {
            const otherTypesString = otherTypes && otherTypes.join(', ');
            const typesString = `${bhkString} ${
                bhkString ? 'BHK,' : ''
            } ${otherTypesString}`;
            const typesStringWithAnd = typesString.replace(
                /,([^,]*)$/,
                ' & $1'
            );
            return typesStringWithAnd;
        }
        const typesString =
            bhkString && bhkString.replace(/,([^,]*)$/, ' & $1');
        return `${typesString} BHK`;
    };

    useEffect(() => {
        if (shareModal || emiModal) {
            document.getElementsByTagName('body')[0].classList.add('no-scroll');
        } else {
            document
                .getElementsByTagName('body')[0]
                .classList.remove('no-scroll');
        }
    }, [shareModal, emiModal]);

    useEffect(() => {
        if (embedModal) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [embedModal]);

    const handleEmbedModal = () => {
        setEmbedModal(true);
    };

    function findLowestPrice(prices: Array<AnyObject>) {
        const validPrices = prices.filter(
            (item) => item.minimum_price !== null
        );

        if (validPrices.length === 0) return null;

        return validPrices.reduce((acc, item) => {
            return acc < item.minimum_price ? acc : item.minimum_price;
        }, Infinity);
    }

    const lowestPrice = findLowestPrice(item.starting_prices);

    return (
        <section
            className={`property-details-hero-section bg-gradient-top ${
                yourHome ? 'yourHome' : ''
            }`}
            id='top'
        >
            <HeadRoom>
                <div className='container relative mx-auto'>
                    <PageScroll
                        virtual={item?.virtual_tour}
                        virtualTourModalOpen={handleEmbedModal}
                        item={item}
                        onePercentPlan={onePercentPlan}
                    />
                </div>
            </HeadRoom>
            {embedModal && (
                <EmbedModal
                    url={item.virtual_tour}
                    onClose={() => setEmbedModal(false)}
                />
            )}
            <div className='relative w-full'>
                {/* Mobile Image/Carousel */}
                {MobileSlider?.length === 1 ? (
                    <div className='md:hidden'>
                        <figure className='react-image slider-inner relative h-64 w-full sm:h-80'>
                            <Image
                                fill
                                className='h-full w-full object-cover'
                                src={MobileSlider[0]?.image?.url}
                                alt={MobileSlider[0].name}
                                priority
                                sizes='100vw'
                                placeholder='blur'
                                blurDataURL={BLUR_DATA_URL}
                            />
                        </figure>
                    </div>
                ) : (
                    <>
                        <div
                            className='embla overflow-hidden md:hidden'
                            ref={emblaRefMobile}
                        >
                            <div className='embla__container flex'>
                                {MobileSlider?.map(
                                    (slide: any, index: number) => {
                                        const isFirstSlide = index === 0;
                                        return (
                                            <div
                                                key={slide.id}
                                                className='embla__slide relative mr-0 w-full flex-[0_0_100%]'
                                            >
                                                <figure className='react-image slider-inner relative h-64 w-full sm:h-80'>
                                                    <Image
                                                        fill
                                                        className='h-full w-full object-cover'
                                                        src={slide?.image?.url}
                                                        alt={slide.name}
                                                        priority={isFirstSlide}
                                                        sizes='100vw'
                                                        placeholder='blur'
                                                        blurDataURL={
                                                            BLUR_DATA_URL
                                                        }
                                                    />
                                                </figure>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>

                        {/* Dots Navigation for Mobile */}
                        {MobileSlider?.length > 1 && (
                            <div className='absolute -bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 md:hidden'>
                                {snapListMobile.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => scrollToMobile(i)}
                                        className={`rounded-full transition-all ${
                                            currentIndexMobile === i
                                                ? 'h-1 w-6 bg-black !px-[10px] !py-[0.5px]'
                                                : 'h-1 w-2 bg-gray-400 !px-[6px] !py-[0.5px]'
                                        }`}
                                        aria-label={`Go to slide ${i + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* Desktop Image/Carousel */}
                {DesktopSlider?.length === 1 ? (
                    <div className='hidden md:block'>
                        <figure className='react-image slider-inner relative h-96 w-full lg:h-[500px] xl:h-[600px]'>
                            <Image
                                fill
                                className='h-full w-full object-cover'
                                src={DesktopSlider[0]?.image?.url}
                                alt={DesktopSlider[0].name}
                                priority
                                sizes='(min-width: 1280px) 1280px, (min-width: 1024px) 1024px, 100vw'
                                placeholder='blur'
                                blurDataURL={BLUR_DATA_URL}
                            />
                        </figure>
                    </div>
                ) : (
                    <>
                        <div
                            className='embla hidden overflow-hidden md:block'
                            ref={emblaRefDesktop}
                        >
                            <div className='embla__container flex'>
                                {DesktopSlider?.map(
                                    (slide: any, index: number) => {
                                        const isFirstSlide = index === 0;
                                        return (
                                            <div
                                                key={slide.id}
                                                className='embla__slide relative mr-0 w-full flex-[0_0_100%]'
                                            >
                                                <figure className='react-image slider-inner relative h-96 w-full lg:h-[500px] xl:h-[600px]'>
                                                    <Image
                                                        fill
                                                        className='h-full w-full object-cover'
                                                        src={slide?.image?.url}
                                                        alt={slide.name}
                                                        priority={isFirstSlide}
                                                        sizes='(min-width: 1280px) 1280px, (min-width: 1024px) 1024px, 100vw'
                                                        placeholder='blur'
                                                        blurDataURL={
                                                            BLUR_DATA_URL
                                                        }
                                                    />
                                                </figure>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>

                        {/* Arrow Navigation for Desktop */}
                        {DesktopSlider?.length > 1 && (
                            <>
                                <Image
                                    className='group-slider-buttons-prev absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 cursor-pointer md:block lg:left-4'
                                    alt='previous slide'
                                    src='/svg/pagination-prev.svg'
                                    width={60}
                                    height={60}
                                    onClick={scrollPrevDesktop}
                                />
                                <Image
                                    className='group-slider-buttons-next absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 cursor-pointer md:block lg:right-4'
                                    alt='next slide'
                                    src='/svg/pagination-next.svg'
                                    width={60}
                                    height={60}
                                    onClick={scrollNextDesktop}
                                />
                            </>
                        )}
                    </>
                )}
            </div>

            <div className='container relative mx-auto'>
                <div
                    className={`property-details-info ${
                        yourHome ? 'your-home-grey' : ''
                    } flex flex-col`}
                >
                    <h1 className='font-display !font-medium'>{item?.name}</h1>
                    {item?.residentialType == 'Commercial' ? (
                        <span className='mt-1 '>
                            {item?.commercial_subtitle}
                        </span>
                    ) : (
                        ''
                    )}
                    <span className='mt-2 font-primary '>
                        {item?.location}, {item?.city?.name}
                    </span>
                    {item?.key_usp !== 'Sold Out' && (
                        <address className='flex flex-wrap items-center max-md:!gap-2'>
                            <div className='address-single mt-4'>
                                {lowestPrice ? (
                                    <span className=' font-primary'>
                                        <b>INR</b>
                                        {`${numDifferentiation(lowestPrice)} `}
                                        onwards
                                    </span>
                                ) : (
                                    <>
                                        <b>Price</b>
                                        <p className='ml-2 inline'>
                                            Available on Request
                                        </p>
                                    </>
                                )}
                            </div>{' '}
                            <div className='separator md:mt-2'>
                                <span>|</span>
                            </div>
                            {item?.possessionDate ? (
                                <>
                                    <div className='address-single mt-4'>
                                        <span>
                                            <b>Possession</b>
                                            {format(
                                                new Date(item.possessionDate),
                                                'MMMM yyyy'
                                            )}
                                        </span>
                                    </div>
                                    <div className='separator md:mt-2'>
                                        <span>|</span>
                                    </div>
                                </>
                            ) : null}
                            <input
                                type='hidden'
                                name='project_code'
                                value={item.proj_code}
                                id='project_code'
                            />
                            <div className='address-single mt-4'>
                                <span>{getTypesString()}</span>
                            </div>
                        </address>
                    )}
                </div>

                {item?.residentialType !== 'Commercial' ||
                item?.allow_enquiries ? (
                    <Fab
                        setShareModal={setShareModal}
                        setEmiModal={setEmiModal}
                        modalRef={modalRef}
                        property={item}
                    />
                ) : (
                    ''
                )}
            </div>

            {item?.residentialType !== 'Commercial' || item?.allow_enquiries ? (
                <div
                    className={`schedule-visit slide-from-right ${
                        sideModal ? 'active' : ''
                    }`}
                >
                    <div
                        className='click-me'
                        onClick={() => {
                            setSideModal(true);
                        }}
                    >
                        <span className='font-display text-[16px] font-medium'>
                            Schedule a visit
                        </span>
                    </div>
                    {sideModal ? (
                        <ScheduleVisit
                            idName={sideModal}
                            onClose={(e: any) => {
                                e.stopPropagation();
                                setSideModal(false);
                            }}
                            property={item}
                            active={sideModal}
                            from='rightScroll'
                            hideAutoComplete={true}
                        />
                    ) : null}
                </div>
            ) : (
                ''
            )}

            {shareModal ? (
                <ShareModal
                    ref={modalRef}
                    onClose={() => {
                        setShareModal(false);
                    }}
                    item={item}
                />
            ) : null}
            {emiModal ? (
                <EMIModal
                    ref={modalRef}
                    property={item}
                    onClose={() => {
                        setEmiModal(false);
                    }}
                    hideAutoComplete={true}
                />
            ) : null}
        </section>
    );
};

export default memo(Hero);
