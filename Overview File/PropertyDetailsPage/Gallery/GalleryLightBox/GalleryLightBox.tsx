/* eslint-disable indent */
/* eslint-disable @next/next/no-img-element */
import { DocumentRenderer } from '@keystone-6/document-renderer';
import React, { useEffect } from 'react';

import Title from '@/components/Title';
import GalleryImage from '@/containers/PropertyDetailsPage/Gallery/GalleryLightBox/GalleryImage';
import GalleryVideo from '@/containers/PropertyDetailsPage/Gallery/GalleryLightBox/GalleryVideo';

import Back from '~/svg/lightbox-back.svg';

interface Props {
    onClose: any;
    propertyDetail: any;
}

const GalleryLightBox = (props: Props) => {
    const { onClose, propertyDetail } = props;
    const [tab, setTab] = React.useState(
        propertyDetail.gallery_video_uploads.length > 0 ? 'videos' : 'images'
    );

    useEffect(() => {
        const onKeyup = (e: any) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keyup', onKeyup);
        return () => window.removeEventListener('keyup', onKeyup);
    }, [onClose]);

    const renderTabs = () => {
        if (tab === 'videos') {
            return (
                <GalleryVideo items={propertyDetail.gallery_video_uploads} />
            );
        }
        if (tab === 'images') {
            return (
                <GalleryImage items={propertyDetail.gallery_image_uploads} />
            );
        }
    };

    return (
        <div className='gallery-lightbox'>
            <div className='gallery-lightbox-header flex items-center'>
                <div className='container mx-auto flex items-center'>
                    <div
                        className='icon icon-back'
                        onClick={() => {
                            onClose();
                        }}
                    >
                        <Back />
                    </div>
                    <h2 className='ml-6 capitalize'>{propertyDetail.name}</h2>
                </div>
            </div>
            <div className='gallery-lightbox-body py-24'>
                <div className='container mx-auto'>
                    <div className='intro'>
                        <Title>Gallery</Title>
                        <span className='lead mt-[20px] text-center md:mt-[28px]'>
                            {tab === 'videos' &&
                                propertyDetail?.gallery_video_description
                                    ?.document && (
                                    <DocumentRenderer
                                        document={
                                            propertyDetail
                                                ?.gallery_video_description
                                                ?.document
                                        }
                                    />
                                )}

                            {tab === 'images' &&
                                propertyDetail?.gallery_image_description
                                    ?.document && (
                                    <DocumentRenderer
                                        document={
                                            propertyDetail
                                                ?.gallery_image_description
                                                ?.document
                                        }
                                    />
                                )}
                        </span>
                    </div>
                    <div className='gallery-lightbox-tab mt-8 flex flex-col'>
                        <ul className='tab-list plans-tab-list tab-list-line flex items-center justify-center'>
                            {propertyDetail.gallery_video_uploads.length >
                                0 && (
                                <li
                                    className={`tab-list-item plans-tab-list-item mx-4 ${
                                        tab == 'videos' ? 'active' : ''
                                    }`}
                                    onClick={() => {
                                        setTab('videos');
                                    }}
                                >
                                    <span>Videos</span>
                                </li>
                            )}
                            <li
                                className={`tab-list-item plans-tab-list-item mx-4 ${
                                    tab == 'images' ? 'active' : ''
                                }`}
                                onClick={() => {
                                    setTab('images');
                                }}
                            >
                                <span>Images</span>
                            </li>
                        </ul>
                        {renderTabs()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryLightBox;
