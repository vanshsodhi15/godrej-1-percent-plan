/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import { gql, useQuery } from '@apollo/client';
import parse from 'html-react-parser';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Script from 'next/script';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { useLazyLoad } from '@/components/hook/useLazyLoad';

import { setThankYouData } from '@/store/slices/thankYouSlice';

import { EnquiryPopupProvider } from '@/context/EnquiryPopupContext';
import { generateApartmentSchema } from '@/utils/schema/apartmentSchema';
import { generateBrandSchema } from '@/utils/schema/brandSchema';
import { generateOverviewRealEstateListingSchema } from '@/utils/schema/overviewRealEstateListingSchema';

type LazyRenderProps = {
    children: React.ReactNode;
    rootMargin?: string;
};

function LazyRender({ children, rootMargin = '1000px 0px' }: LazyRenderProps) {
    const { targetRef, isVisible } = useLazyLoad({ rootMargin });
    return <div ref={targetRef}>{isVisible ? children : null}</div>;
}

const TimeDelayPopup = dynamic(
    () => import('@/components/EnquiryPopups/TimeDelayPopup'),
    { ssr: false }
);
const ExitIntentPopup = dynamic(
    () => import('@/components/EnquiryPopups/ExitIntentPopup'),
    { ssr: false }
);

const Compliances = dynamic(
    () =>
        import(
            /* webpackChunkName: "property-compliances" */ '@/containers/PropertyDetailsPage/Compliances'
        ),
    {
        ssr: false,
        loading: () => <SectionSkeleton />,
    }
);
const DisclaimerPropModal = dynamic(
    () => import('@/containers/HomePage/DisclaimerModal/DisclaimerPropModal'),
    { ssr: false }
);

const SectionSkeleton = () => (
    <div
        aria-hidden='true'
        className='my-6 h-32 w-full animate-pulse rounded-md bg-gray-100'
    />
);

const Brochure = dynamic(
    () =>
        import(
            /* webpackChunkName: "property-brochure" */ '@/components/Brochure'
        ),
    {
        ssr: false,
        loading: () => <SectionSkeleton />,
    }
);
import Layout from '@/components/layout/Layout';
import Neighbourhood from '@/containers/PropertyDetailsPage/Neighbourhood';
import Overview from '@/containers/PropertyDetailsPage/Overview';
const Amenities = dynamic(
    () =>
        import(
            /* webpackChunkName: "property-amenities" */ '@/containers/PropertyDetailsPage/Amenities'
        ),
    {
        ssr: false,
        loading: () => <SectionSkeleton />,
    }
);
const Gallery = dynamic(
    () =>
        import(
            /* webpackChunkName: "property-gallery" */ '@/containers/PropertyDetailsPage/Gallery'
        ),
    {
        ssr: false,
        loading: () => <SectionSkeleton />,
    }
);
const GetInTouch = dynamic(
    () => import('@/containers/PropertyDetailsPage/GetInTouch/GetInTouch'),
    {
        ssr: false,
        loading: () => <SectionSkeleton />,
    }
);
import Hero from '@/containers/PropertyDetailsPage/Hero';
const LeaseSection = dynamic(
    () => import('@/containers/PropertyDetailsPage/LeaseSection/LeaseSection'),
    {
        ssr: false,
        loading: () => <SectionSkeleton />,
    }
);
const Maharera = dynamic(
    () =>
        import(
            /* webpackChunkName: "property-maharera" */ '@/containers/PropertyDetailsPage/Maharera'
        ),
    {
        ssr: false,
        loading: () => <SectionSkeleton />,
    }
);
const PropertySnapshot = dynamic(
    () => import('@/containers/PropertyDetailsPage/Snapshot/PropertySnapshot'),
    {
        ssr: false,
        loading: () => <SectionSkeleton />,
    }
);
const YouMayLike = dynamic(
    () =>
        import(
            /* webpackChunkName: "property-you-may-like" */ '@/containers/PropertyDetailsPage/YouMayLike'
        ),
    {
        ssr: false,
        loading: () => <SectionSkeleton />,
    }
);
const Testimonials = dynamic(
    () =>
        import(
            /* webpackChunkName: "property-testimonials" */ '@/containers/PropertyDetailsPage/Testimonials'
        ),
    {
        ssr: false,
        loading: () => <SectionSkeleton />,
    }
);
const StickyFooter = dynamic(
    () => import('@/containers/PropertyDetailsPage/StickyFooter'),
    { ssr: false, loading: () => null }
);
const Price = dynamic(
    () =>
        import(
            /* webpackChunkName: "property-price" */ '@/containers/PropertyDetailsPage/Price'
        ),
    {
        ssr: false,
        loading: () => <SectionSkeleton />,
    }
);
const CityGrowthSection = dynamic(
    () =>
        import(
            /* webpackChunkName: "property-city-growth" */ '@/containers/PropertyDetailsPage/CityGrowthSection'
        ),
    {
        ssr: false,
        loading: () => <SectionSkeleton />,
    }
);
const FacilityTabs = dynamic(
    () =>
        import(
            /* webpackChunkName: "property-facility-tabs" */ '@/containers/PropertyDetailsPage/FacilityTabs'
        ),
    {
        ssr: false,
        loading: () => <SectionSkeleton />,
    }
);
const Plans = dynamic(
    () =>
        import(
            /* webpackChunkName: "property-plans" */ '@/containers/PropertyDetailsPage/Plans'
        ),
    {
        ssr: false,
        loading: () => <SectionSkeleton />,
    }
);

const QUERY = gql`
    query Contacts {
        contactSections {
            contact_heading
            email
            phone
            image {
                url
            }
        }
    }
`;

const FOOTER = gql`
    query popularSearch {
        homes {
            popular_searches(orderBy: { order: asc }) {
                title
                url
            }
        }
    }
`;

export default function PropertyDetailsHomePage(props: any) {
    const { item, propertyType } = props;
    const isPlotted = propertyType === 'plotted';
    const shouldFetchContactInfo =
        item?.residentialType === 'Commercial' && !item?.allow_enquiries;
    const [hasMounted, setHasMounted] = React.useState(false);
    const [hasUserInteracted, setHasUserInteracted] = React.useState(false);
    const [popupDelayElapsed, setPopupDelayElapsed] = React.useState(false);
    const [shouldFetchDeferredData, setShouldFetchDeferredData] =
        React.useState(false);

    React.useEffect(() => {
        setHasMounted(true);
    }, []);

    React.useEffect(() => {
        const timerId = window.setTimeout(
            () => setPopupDelayElapsed(true),
            8000
        );
        const interactionEvents: Array<keyof WindowEventMap> = [
            'scroll',
            'pointerdown',
            'keydown',
            'touchstart',
        ];

        const onInteraction = () => setHasUserInteracted(true);
        interactionEvents.forEach((eventName) => {
            window.addEventListener(eventName, onInteraction, {
                once: true,
                passive: true,
            });
        });

        return () => {
            window.clearTimeout(timerId);
            interactionEvents.forEach((eventName) => {
                window.removeEventListener(eventName, onInteraction);
            });
        };
    }, []);
    const shouldLoadPopups = hasUserInteracted && popupDelayElapsed;

    React.useEffect(() => {
        if (!hasMounted) return;
        const win = window as Window & {
            requestIdleCallback?: (
                callback: () => void,
                options?: { timeout: number }
            ) => number;
            cancelIdleCallback?: (id: number) => void;
        };
        let idleId: number | null = null;
        let timeoutId: number | null = null;

        const startDeferredFetch = () => {
            setShouldFetchDeferredData(true);
        };

        if (typeof win.requestIdleCallback === 'function') {
            idleId = win.requestIdleCallback(startDeferredFetch, {
                timeout: 2000,
            });
        } else {
            timeoutId = window.setTimeout(startDeferredFetch, 1);
        }

        return () => {
            if (
                idleId !== null &&
                typeof win.cancelIdleCallback === 'function'
            ) {
                win.cancelIdleCallback(idleId);
            }
            if (timeoutId !== null) {
                window.clearTimeout(timeoutId);
            }
        };
    }, [hasMounted]);

    const { data: contactInfo } = useQuery(QUERY, {
        skip:
            !hasMounted || !shouldFetchDeferredData || !shouldFetchContactInfo,
        fetchPolicy: 'cache-first',
        nextFetchPolicy: 'cache-first',
        notifyOnNetworkStatusChange: false,
        returnPartialData: true,
    });
    const { data: popularData } = useQuery(FOOTER, {
        skip: !hasMounted || !shouldFetchDeferredData,
        fetchPolicy: 'cache-first',
        nextFetchPolicy: 'cache-first',
        notifyOnNetworkStatusChange: false,
        returnPartialData: true,
    });
    const [showModal, setShowModal] = React.useState(false);

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (item) {
            dispatch(
                setThankYouData({
                    bannerCarousel: item?.banner_carousel?.[0]?.image?.url,
                    mobilebBannerCarousel:
                        item?.mobile_banner_carousel?.[0]?.image?.url,
                    overviewImage: item?.overview_image?.url,
                    walkthroughLink: item?.walkthrough_link,
                    brochureUrl: item?.brochure?.url,
                })
            );
        }
    }, [item, dispatch]);

    React.useEffect(() => {
        const bodyElement = document.getElementsByTagName('body')[0];
        bodyElement.classList.add('padding-bottom');

        return () => {
            bodyElement.classList.remove('padding-bottom');
        };
    }, []);

    React.useEffect(() => {
        if (typeof window !== 'undefined' && item?.modalDescription) {
            const hasAcceptedPropDisclaimer = localStorage.getItem(
                `hasAccepted${item?.id}Disclaimer`
            );
            if (!hasAcceptedPropDisclaimer) {
                setShowModal(true);
            }
        }
    }, [item?.id, item?.modalDescription]);

    const handleCloseModal = React.useCallback(() => {
        localStorage.setItem(`hasAccepted${item?.id}Disclaimer`, 'true');
        setShowModal(false);
    }, [item?.id]);

    const parsedStartTag = React.useMemo(() => {
        if (item?.seo?.start_of_head) return parse(item.seo.start_of_head);
        return (
            <title>
                {item?.name} | {item?.location}
            </title>
        );
    }, [item?.location, item?.name, item?.seo?.start_of_head]);

    const parsedEndTag = React.useMemo(() => {
        if (item?.seo?.end_of_head) return parse(item.seo.end_of_head);
        return null;
    }, [item?.seo?.end_of_head]);

    const brandSchema = React.useMemo(() => generateBrandSchema(item), [item]);
    const realEstateSchema = React.useMemo(
        () => generateOverviewRealEstateListingSchema(item),
        [item]
    );
    const apartmentSchema = React.useMemo(
        () => generateApartmentSchema(item),
        [item]
    );
    const schemaScripts = React.useMemo(
        () => ({
            apartmentSchema: apartmentSchema
                ? JSON.stringify(apartmentSchema)
                : null,
            realEstateSchema: realEstateSchema
                ? JSON.stringify(realEstateSchema)
                : null,
            brandSchema: brandSchema ? JSON.stringify(brandSchema) : null,
        }),
        [apartmentSchema, brandSchema, realEstateSchema]
    );
    const heroPreloadImage = React.useMemo(
        () =>
            item?.mobile_banner_carousel?.[0]?.image?.url ||
            item?.banner_carousel?.[0]?.image?.url ||
            '',
        [item?.banner_carousel, item?.mobile_banner_carousel]
    );

    const shouldShowPlans =
        item?.plans?.master_plan_fullscreen ||
        item?.plans?.tower_plan?.length > 0 ||
        item?.plans?.floor_plans?.length > 0 ||
        isPlotted;
    const metaEventScript = React.useMemo(
        () => `
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: 'metaEvent',
              project_id: ${JSON.stringify(item?.id || '')},
              project_name: ${JSON.stringify(item?.name || '')},
              starting_price: ${JSON.stringify(
                  item?.starting_prices?.[0]?.minimum_price || ''
              )}
            });
          `,
        [item?.id, item?.name, item?.starting_prices]
    );

    return (
        <EnquiryPopupProvider projectId={item?.id || ''}>
            <Layout
                startOfBody={item?.seo?.start_of_body}
                endOfBody={item?.seo?.end_of_body}
                popularSearch={popularData?.homes?.[0]?.popular_searches}
            >
                <Head>
                    {/* {isPlotted && (
                        <meta name='robots' content='noindex, nofollow' />
                    )} */}

                    {parsedStartTag}
                    {parsedEndTag}

                    {heroPreloadImage && (
                        <link
                            rel='preload'
                            as='image'
                            href={heroPreloadImage}
                            key='hero-preload-image'
                        />
                    )}

                    {/* PRIMARY ENTITY */}
                    {schemaScripts.apartmentSchema && (
                        <script
                            id='property-apartment-schema'
                            key='property-apartment-schema'
                            type='application/ld+json'
                            dangerouslySetInnerHTML={{
                                __html: schemaScripts.apartmentSchema,
                            }}
                        />
                    )}

                    {/* LISTING */}
                    {schemaScripts.realEstateSchema && (
                        <script
                            id='property-listing-schema'
                            key='property-listing-schema'
                            type='application/ld+json'
                            dangerouslySetInnerHTML={{
                                __html: schemaScripts.realEstateSchema,
                            }}
                        />
                    )}

                    {/* BRAND */}
                    {schemaScripts.brandSchema && (
                        <script
                            id='property-brand-schema'
                            key='property-brand-schema'
                            type='application/ld+json'
                            dangerouslySetInnerHTML={{
                                __html: schemaScripts.brandSchema,
                            }}
                        />
                    )}
                </Head>
                <Script id='property-meta-event' strategy='lazyOnload'>
                    {metaEventScript}
                </Script>

                <Hero item={item} />
                <Overview item={item} propertyType={propertyType} />
                <Neighbourhood item={item} />
                <LazyRender>
                    {isPlotted && (
                        <CityGrowthSection
                            growth_title={item?.growth_title}
                            growth_description={item?.growth_description}
                            growth_image={item?.growth_image}
                            growth_image_alt_text={item?.growth_image_alt_text}
                            growth_highlights={item?.growth_highlights}
                        />
                    )}
                </LazyRender>

                <LazyRender>
                    {shouldShowPlans && (
                        <Plans item={item} isPlotted={isPlotted} />
                    )}
                </LazyRender>

                <LazyRender>
                    {item?.residentialType !== 'Commercial' && (
                        <Price item={item} />
                    )}
                </LazyRender>

                <LazyRender>
                    {item?.amenity_logo_card?.length > 0 && (
                        <Amenities item={item} />
                    )}
                </LazyRender>

                <LazyRender>
                    {isPlotted && (
                        <FacilityTabs
                            project_facilities={item?.project_facilities}
                            plot_facilities={item?.plot_facilities}
                            plot_facilities_title={item?.plot_facilities_title}
                            plot_facilities_description={
                                item?.plot_facilities_description
                            }
                        />
                    )}
                </LazyRender>

                <LazyRender>
                    {(item?.gallery_image_uploads?.length > 0 ||
                        item?.gallery_video_uploads?.length > 0) && (
                        <Gallery item={item} />
                    )}
                </LazyRender>

                <LazyRender>
                    {item?.brochure && (
                        <Brochure item={item} isClicked={false} />
                    )}
                </LazyRender>

                <LazyRender>
                    {contactInfo?.contactSections?.[0] &&
                        shouldFetchContactInfo && (
                            <LeaseSection
                                item={contactInfo.contactSections[0]}
                            />
                        )}
                </LazyRender>

                <LazyRender>
                    {item?.snapshot &&
                        item?.residentialType === 'Commercial' && (
                            <PropertySnapshot item={item} />
                        )}
                </LazyRender>

                <LazyRender>
                    {item?.testimonials?.length > 0 && (
                        <Testimonials item={item} />
                    )}
                </LazyRender>

                <LazyRender>
                    {item?.compliance?.length > 0 && (
                        <Compliances compliance={item?.compliance} />
                    )}
                </LazyRender>

                <LazyRender>
                    {(item?.rera_details ||
                        item?.rera_details_rich?.document) && (
                        <Maharera item={item} />
                    )}
                </LazyRender>

                <LazyRender>
                    {item?.you_may_also_like?.length > 0 &&
                        item?.residentialType !== 'Commercial' && (
                            <YouMayLike item={item} />
                        )}
                </LazyRender>

                <LazyRender>
                    {item?.allow_enquiries && (
                        <GetInTouch item={item} hideAutoComplete={true} />
                    )}
                </LazyRender>

                <StickyFooter property={item} />

                {showModal && item?.modalDescription && (
                    <>
                        <div className='disclaimer-overlay' />
                        <DisclaimerPropModal
                            desc={item?.modalDescription}
                            onClose={handleCloseModal}
                        />
                    </>
                )}

                {/* {shouldLoadPopups && ( */}
                <>
                    <TimeDelayPopup item={item} />
                    <ExitIntentPopup item={item} />
                </>
                {/* )} */}
            </Layout>
        </EnquiryPopupProvider>
    );
}
