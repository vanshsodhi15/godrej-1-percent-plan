/* eslint-disable @next/next/no-img-element */
import { EmblaOptionsType } from 'embla-carousel-react';
import Image from 'next/image';
import React, { useEffect } from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import EmblaCarousel from '@/components/Embla/Embla';

import Back from '~/svg/back-black.svg';
interface Props {
    onClose: any;
    active: boolean;
    item: any;
}
const Lightbox = (props: Props) => {
    const { onClose, active, item: propertyDetail } = props;

    const OPTIONS: EmblaOptionsType = {
        containScroll: 'trimSnaps',
        active: true,
    };

    useEffect(() => {
        const onKeyup = (e: any) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keyup', onKeyup);
        return () => window.removeEventListener('keyup', onKeyup);
    }, [onClose]);

    const renderFeatures = () => {
        return (propertyDetail?.amenity_features || []).map((feature: any) => {
            return (
                <div
                    className='col-span-1 flex flex-col'
                    key={`feature-${feature.title}`}
                >
                    <h5 className='capitalize'>{feature.title}</h5>
                    <ul className='mt-2'>
                        {feature.features.map((r: any) => {
                            return (
                                <li className='lead mt-2' key={r.name}>
                                    {r.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        });
    };
    return (
        <div className={`lightbox ${active ? 'active' : ''}`}>
            <div className='ligbox-header'>
                <div className='container mx-auto flex items-center'>
                    <div
                        className='back'
                        onClick={() => {
                            onClose();
                        }}
                    >
                        <Back />
                    </div>
                    <h2 className='capitalize'>{propertyDetail?.name}</h2>
                </div>
            </div>
            <div className='lightbox-main amenities-lightbox'>
                <div className='ligbox-body !py-[30px] md:!py-[60px]'>
                    <div className='container mx-auto'>
                        <div className='custom-container mx-auto px-4 lg:px-24'>
                            <h3>Amenities</h3>
                            <EmblaCarousel
                                options={OPTIONS}
                                slides={propertyDetail?.amenities}
                                className='lightbox-gallery'
                                arrows={true}
                                dots={false}
                                active={active}
                            >
                                {propertyDetail?.amenities?.map((item: any) => {
                                    return (
                                        <div
                                            className='embla__slide embla__class-names ligbox-slider-inner flex flex-col'
                                            key={item.id}
                                        >
                                            <div className='img-lightbox'>
                                                {item.image?.url ? (
                                                    <Image
                                                        className='slider-image'
                                                        src={item.image.url}
                                                        alt={
                                                            item?.image_alt_text ||
                                                            item.title
                                                        }
                                                        width={1200}
                                                        height={700}
                                                        quality={70}
                                                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                                    />
                                                ) : null}
                                            </div>
                                            <div className='info'>
                                                <h4 className='mt-[20px] font-display text-[18px] !font-medium capitalize leading-[30px] md:mt-[28px] md:text-[22px]'>
                                                    {item.title}
                                                </h4>
                                                <p className='lead mb-6 mt-2'>
                                                    {
                                                        item.description
                                                            ?.document?.[0]
                                                            ?.children?.[0]
                                                            ?.text
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </EmblaCarousel>
                        </div>
                    </div>
                </div>
                {propertyDetail?.amenity_features?.length > 0 && (
                    <div className='ligbox-footer py-[40px] md:py-[80px]'>
                        <div className='container mx-auto px-4 lg:px-24'>
                            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                                {renderFeatures()}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Lightbox;
