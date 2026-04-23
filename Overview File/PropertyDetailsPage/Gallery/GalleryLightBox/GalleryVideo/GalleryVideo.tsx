/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React, { useState } from 'react';

import GallerVideoLightbox from '@/containers/PropertyDetailsPage/Gallery/GalleryLightBox/GalleryVideo/GallerVideoLightbox';

interface Props {
    items: any;
}

const GalleryVideo = (props: Props) => {
    const { items } = props;
    const [modalOpen, setModalOpen]: any = useState(null);

    return (
        <>
            <div className='parent-div'>
                {items.map((item: any, index: number) => (
                    <div
                        className={`children-dev div-${index + 1}`}
                        key={item?.thumbnail?.url}
                    >
                        <Image
                            src={
                                item?.thumbnail?.url ||
                                '/images/property-details/youtube_logo_dark.webp'
                            }
                            alt={item?.thumbnail_alt_text || item?.title}
                            width={1200}
                            height={700}
                            quality={70}
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                            onClick={() => {
                                setModalOpen({
                                    item,
                                    items,
                                    index,
                                });
                            }}
                        />
                        <div className='image-caption flex items-center justify-center text-center'>
                            <span>{item?.title}</span>
                        </div>
                    </div>
                ))}
            </div>
            {modalOpen ? (
                <GallerVideoLightbox
                    item={modalOpen}
                    onClose={() => {
                        setModalOpen(null);
                    }}
                />
            ) : (
                <></>
            )}
        </>
    );
};

export default GalleryVideo;
