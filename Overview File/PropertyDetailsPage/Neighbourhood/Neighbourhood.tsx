/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable @next/next/no-img-element */
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { memo, useEffect, useMemo, useRef, useState } from 'react';

import { useLazyLoad } from '@/components/hook/useLazyLoad';
import useOutsideClick from '@/components/hook/useOutsideClick';
import OutlineButton from '@/components/OutlineButton';
import ReactImage from '@/components/ReactImage';
import Title from '@/components/Title';
import VideoModal from '@/components/VideoModal';

import cardVariants, { theObj } from '@/utils/cardVariants';

const NeighbourhoodMap = dynamic(
    () =>
        import(
            '@/containers/PropertyDetailsPage/Neighbourhood/NeighbourhoodMap'
        ),
    {
        ssr: false,
        loading: () => (
            <div
                aria-hidden='true'
                className='h-[320px] w-full animate-pulse rounded-md bg-gray-100'
            />
        ),
    }
);

const Neighbourhood = ({ item }: { item: any }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [nearby, setNearby] = useState(false);

    const modalRef = useRef<any>(null);

    useOutsideClick(modalRef, () => {
        setModalOpen(false);
    });

    useEffect(() => {
        if (modalOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [modalOpen]);
    const mapCenter = useMemo(
        () => ({
            lat: parseFloat(
                item?.neighbourhood?.geolocation_coordinates?.latitude
            ),
            lng: parseFloat(
                item?.neighbourhood?.geolocation_coordinates?.longitude
            ),
        }),
        [
            item?.neighbourhood?.geolocation_coordinates?.latitude,
            item?.neighbourhood?.geolocation_coordinates?.longitude,
        ]
    );
    const { targetRef: mapRef, isVisible: isMapVisible } = useLazyLoad({
        rootMargin: '1000px 0px',
    });

    return (
        <>
            <motion.section
                ref={modalRef}
                className='neighbourhood-section py-[40px] md:py-[80px]'
                id='neighbourhood'
                {...theObj}
                variants={cardVariants}
            >
                <div className='neighbourhood-container container mx-auto flex flex-col'>
                    <Title>Neighbourhood</Title>
                    {item?.neighbourhood?.description && (
                        <p className='lead mt-[20px] text-center md:mt-[28px]'>
                            {item?.neighbourhood?.description}
                        </p>
                    )}
                    <figure className='map mt-[20px] md:mt-[28px]'>
                        <div ref={mapRef}>
                            {isMapVisible ? (
                                <NeighbourhoodMap mapCenter={mapCenter} />
                            ) : (
                                <div
                                    aria-hidden='true'
                                    className='h-[320px] w-full rounded-md bg-gray-100'
                                />
                            )}
                        </div>
                        <div
                            className={`map-overlay py-t flex flex-col lg:pt-6 xl:pt-10 ${
                                nearby && 'nearby-modal'
                            }`}
                        >
                            <div className='map-address flex flex-col px-4 lg:px-6 xl:px-14'>
                                <div className='nearby-close'>
                                    <ReactImage
                                        src='/images/modal-close.png'
                                        onClick={() => setNearby(false)}
                                        alt='close'
                                        layout='fill'
                                    />
                                </div>
                                <address className='flex items-start justify-between pr-4 md:gap-2 md:pr-0'>
                                    <div className='grid gap-1 font-primary text-[12px] font-normal leading-[18px]'>
                                        <span>Address</span>
                                        {item?.neighbourhood?.address}
                                    </div>
                                    <a
                                        className='directions-div'
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${item?.neighbourhood?.geolocation_coordinates?.latitude},${item?.neighbourhood?.geolocation_coordinates?.longitude}`}
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        <ReactImage
                                            className='direction-img'
                                            src='/images/directions.png'
                                            layout='fill'
                                            alt='Directions'
                                        />
                                    </a>
                                </address>
                            </div>
                            <ul className='map-list flex flex-col px-4 lg:px-6 xl:px-14'>
                                {item?.neighbourhood?.nearByPlaces?.map(
                                    (item: any) => {
                                        return (
                                            <li
                                                className='map-list-item mt-4 flex items-center xl:mt-6'
                                                key={item.name}
                                            >
                                                <div className='icon mr-5'>
                                                    {item.icon?.icon?.url ? (
                                                        <ReactImage
                                                            src={
                                                                item.icon?.icon
                                                                    ?.url
                                                            }
                                                            alt={
                                                                item?.icon?.name
                                                            }
                                                            layout='fill'
                                                        />
                                                    ) : null}
                                                </div>
                                                <></>
                                                <div className='flex flex-col'>
                                                    <span className='font-primary text-[12px]'>
                                                        {item
                                                            ?.distance_from_property_rich_text
                                                            ?.document[0]
                                                            ?.children[0]
                                                            ?.text ? (
                                                            <DocumentRenderer
                                                                document={
                                                                    item
                                                                        .distance_from_property_rich_text
                                                                        .document
                                                                }
                                                            />
                                                        ) : (
                                                            item?.distance_from_property
                                                        )}
                                                    </span>
                                                    <span className='font-primary text-[12px]'>
                                                        {item?.name_rich_text
                                                            ?.document[0]
                                                            ?.children[0]
                                                            ?.text ? (
                                                            <DocumentRenderer
                                                                document={
                                                                    item
                                                                        .name_rich_text
                                                                        .document
                                                                }
                                                            />
                                                        ) : (
                                                            item?.name
                                                        )}
                                                    </span>
                                                </div>
                                            </li>
                                        );
                                    }
                                )}
                            </ul>
                            <span className='google_source absolute bottom-0 pb-2 pl-6'>
                                Source: *Google Maps
                            </span>
                        </div>
                        {item?.neighbourhood?.location_av ? (
                            <div className='flex justify-evenly'>
                                <div className='button-group nearby-btn inline flex items-center justify-center gap-4'>
                                    <OutlineButton
                                        onClick={() => setNearby(true)}
                                    >
                                        Nearby Places
                                    </OutlineButton>
                                </div>
                                <div className='button-group inline flex items-center justify-center gap-4'>
                                    <OutlineButton
                                        id={`${item?.name} Location AV`
                                            .toLowerCase()
                                            .replace(/ /g, '_')}
                                        onClick={() => setModalOpen(true)}
                                    >
                                        Location AV
                                    </OutlineButton>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                    </figure>
                </div>
            </motion.section>
            {modalOpen ? (
                <VideoModal
                    url={item.neighbourhood.location_av}
                    onClose={() => {
                        setModalOpen(false);
                    }}
                    description='Location AV'
                />
            ) : (
                <></>
            )}
        </>
    );
};

export default memo(Neighbourhood);
