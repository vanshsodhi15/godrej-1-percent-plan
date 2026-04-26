/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Plus from '~/svg/header/plus.svg';

interface Props {
    onClose: any;
    item: any;
}

const GalleryImageLightbox = (props: Props) => {
    const { onClose, item } = props;
    const [index, setIndex] = useState(item.index + 1);

    useEffect(() => {
        const onKeyup = (e: any) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
                onClose();
            }
        };
        window.addEventListener('keyup', onKeyup, true);
        return () => window.removeEventListener('keyup', onKeyup, true);
    }, [onClose]);

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows: true,
        responsive: [
            {
                breakpoint: 1279,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                },
            },
        ],
    };

    const renderTextWithSuperscriptHash = (text: string) => {
        const sanitizedText = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        const updatedText = sanitizedText.replace(/#/g, '<sup>#</sup>');

        return { __html: updatedText };
    };

    return (
        <div className='modal modal-pagination flex items-center justify-center'>
            <div className='close' onClick={onClose}>
                <Plus />
            </div>
            <div className='container px-4 lg:px-24'>
                <div className='counter flex items-center justify-center text-center'>
                    <span>
                        {index} / {item.items.length}
                    </span>
                </div>
                <Slider
                    initialSlide={item.index}
                    className='lightbox-slider'
                    {...settings}
                    afterChange={(current) => setIndex(current + 1)}
                >
                    {item.items.map((item: any, index: number) => {
                        return (
                            <div
                                className='slider-inner flex flex-col items-center justify-center text-center'
                                key={`sliders-${item.title}-${index}`}
                            >
                                <figure className='flex flex-col items-center justify-center'>
                                    {item?.img_upload?.url ? (
                                        <Image
                                            src={item.img_upload.url}
                                            alt={item?.title || 'Gallery image'}
                                            width={1400}
                                            height={900}
                                            quality={70}
                                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                        />
                                    ) : null}
                                    {/* We are not using DOM sanitization here because `renderTextWithSuperscriptHash` already performs basic sanitization. */}
                                    <figcaption
                                        className='text-center'
                                        dangerouslySetInnerHTML={renderTextWithSuperscriptHash(
                                            item?.title
                                        )}
                                    ></figcaption>
                                </figure>
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </div>
    );
};

export default GalleryImageLightbox;
