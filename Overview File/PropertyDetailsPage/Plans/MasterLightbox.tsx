/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import ImageMapper from 'react-image-mapper';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ReactImage from '@/components/ReactImage';
import FloorPlanSingleLightbox from '@/containers/PropertyDetailsPage/Plans/FloorPlanSingleLightbox';

interface Props {
    onClose: any;
    active: boolean;
    item: any;
    videoUrl?: any;
}
const MasterLightbox = (props: Props) => {
    const { onClose, active, item, videoUrl } = props;
    const image = item?.master_image?.url;
    const [videoModal, setVideoModal] = useState(true);
    const [imgWidth, setImgWidth] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const imgRef: any = useRef(null);
    const lightBoxRef: any = useRef(null);
    const containerRef: any = useRef(null);
    const [modal, setModal]: any = useState(null);
    const modalEl: any = useRef(null);
    const [lightBox, setLightBox]: any = useState(null);
    useEffect(() => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current?.clientWidth);
        }
    }, []);

    useEffect(() => {
        const onKeyup = (e: any) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keyup', onKeyup);
        return () => window.removeEventListener('keyup', onKeyup);
    }, [onClose]);

    const [mapAreas] = useState({
        name: 'my-map',
        areas: (item?.towers || []).map((e: any) => ({
            id: e.id,
            shape: 'poly',
            coords: e.coordinates,
            title: e.title,
            individualFloorPlan: e.individualFloorPlan,
        })),
    });
    const handleOutsideClick = (e: any) => {
        if (modalEl.current) {
            if (!modalEl.current.contains(e.target)) {
                if (
                    lightBoxRef.current &&
                    lightBoxRef.current.contains(e.target)
                ) {
                    return;
                }
                setModal(null);
            }
        }
    };

    useEffect(() => {
        let timeoutID: any = null;
        if (modal) {
            timeoutID = setTimeout(() => {
                document.addEventListener('click', handleOutsideClick);
            }, 0);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('click', handleOutsideClick);
            if (timeoutID !== null) {
                clearTimeout(timeoutID);
            }
        };
    }, [modal]);

    return (
        <>
            <div className={`lightbox ${active ? 'active' : ''}`}>
                <div className='ligbox-header flex items-center justify-end px-10'>
                    <ul className='tab-list plans-tab-list center flex items-center justify-center py-4'>
                        <li className='tab-list-item plans-tab-list-item mx-4 flex items-center'>
                            <span className='uppercase'>Master Plan</span>
                        </li>
                    </ul>
                    <div
                        className='close ml-5 flex items-center justify-center'
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onClose();
                        }}
                    >
                        <Image
                            src='/images/modal-close.png'
                            alt='close'
                            width={24}
                            height={24}
                            quality={60}
                            sizes='24px'
                        />
                    </div>
                </div>
                {/* {videoModal && videoUrl && (
                    <div className='modal overlay-video flex items-center justify-center'>
                        <div className='modal-content master-video-content relative'>
                            <div className='modal-header flex items-center justify-between py-5 px-6'>
                                <div
                                    className='close'
                                    onClick={() => setVideoModal(false)}
                                >
                                    <Image
                                        src='/images/modal-close.png'
                                        alt='close'
                                        width={24}
                                        height={24}
                                        quality={60}
                                        sizes='24px'
                                    />
                                </div>
                            </div>
                            <div className='modal-body master-video-body mx-auto flex flex-col p-6'>
                                <ReactPlayer
                                    url={videoUrl.url}
                                    playing
                                    controls={true}
                                />
                            </div>
                        </div>
                    </div>
                )} */}
                <div className='lightbox-main master-lightbox'>
                    <div className='ligbox-body vh pb-14 pt-9'>
                        <div
                            className='view-2d image-mapper flex w-full items-center justify-center'
                            ref={containerRef}
                        >
                            <ImageMapper
                                ref={imgRef}
                                src={image}
                                map={mapAreas}
                                onLoad={() => {
                                    if (imgRef.current?.img.naturalWidth) {
                                        setImgWidth(
                                            imgRef.current?.img.naturalWidth
                                        );
                                    }
                                }}
                                width={containerWidth}
                                imgWidth={imgWidth}
                                fillColor='rgb(187 17 96 / 30%)'
                                onClick={(val: any) => {
                                    setModal(val);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {modal ? (
                <div className='modal overlay-image-2d flex items-center justify-center'>
                    <div
                        className='modal-content image-2d-content relative'
                        ref={modalEl}
                    >
                        <div className='modal-header flex items-center justify-between px-6 py-5'>
                            <h6>{modal.title}</h6>
                            <div
                                className='close'
                                onClick={() => {
                                    setModal(null);
                                }}
                            >
                                <ReactImage
                                    src='/images/modal-close.png'
                                    alt='close'
                                    layout='fill'
                                />
                            </div>
                        </div>
                        <div className='modal-body image-2d-body mx-auto flex flex-col p-6'>
                            <ul>
                                {(modal?.individualFloorPlan || []).map(
                                    (e: any) => (
                                        <li
                                            onClick={() => {
                                                setLightBox(e);
                                            }}
                                            key={e.id}
                                        >
                                            {e.name}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            ) : null}
            {lightBox && (
                <FloorPlanSingleLightbox
                    onClose={() => {
                        setLightBox(null);
                    }}
                    zIndex={4}
                    item={lightBox}
                    active={lightBox}
                    ref={lightBoxRef}
                />
            )}
        </>
    );
};

export default MasterLightbox;
