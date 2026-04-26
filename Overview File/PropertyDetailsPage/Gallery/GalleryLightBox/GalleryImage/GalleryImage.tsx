/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React, { useState } from 'react';

import GalleryImageLightbox from '@/containers/PropertyDetailsPage/Gallery/GalleryLightBox/GalleryImage/GalleryImageLightbox';

interface Props {
    items: any;
}

const GalleryImage = (props: Props) => {
    const { items } = props;
    const [modalOpen, setModalOpen]: any = useState(null);
    const newArr = new Array(Math.ceil(items.length / 9)).fill(1);

    const renderTextWithSuperscriptHash = (text: string) => {
        const sanitizedText = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        const updatedText = sanitizedText.replace(/#/g, '<sup>#</sup>');

        return { __html: updatedText };
    };

    return (
        <>
            {newArr.map((item, index) => {
                const images: any = items.slice(index * 10, index * 10 + 10);

                return (
                    <div className='parent-div' key={index}>
                        {images.map((item: any, index: number) => (
                            <>
                                <div
                                    className={`children-dev div-${
                                        index < 10 ? index + 1 : index - 9
                                    }`}
                                    key={item?.img_upload?.url}
                                >
                                    {item?.img_upload?.url ? (
                                        <Image
                                            src={item.img_upload.url}
                                            alt={
                                                item?.image_alt_text ||
                                                item?.title ||
                                                'Gallery image'
                                            }
                                            width={1200}
                                            height={700}
                                            quality={70}
                                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                            onClick={() => {
                                                setModalOpen({
                                                    item,
                                                    index,
                                                    items,
                                                });
                                            }}
                                        />
                                    ) : null}
                                    <div className='image-caption flex items-center justify-center text-center'>
                                        {/* We are not using DOM sanitization here because `renderTextWithSuperscriptHash` already performs basic sanitization. */}
                                        <span
                                            dangerouslySetInnerHTML={renderTextWithSuperscriptHash(
                                                item?.title
                                            )}
                                        ></span>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                );
            })}
            {modalOpen ? (
                <GalleryImageLightbox
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

export default GalleryImage;
