/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React, { forwardRef, useEffect, useState } from 'react';
import { TransformWrapper } from 'react-zoom-pan-pinch';

import LightboxItem from '@/containers/PropertyDetailsPage/Plans/LightboxItem';

import ZoomIn from '~/svg/property-details/zoom-in.svg';
import ZoomOut from '~/svg/property-details/zoom-out.svg';

interface Props {
    onClose: any;
    active: boolean;
    item: any;
    zIndex: number;
}
const FloorPlanSingleLightbox = forwardRef((props: Props, ref: any) => {
    const { onClose, active, item, zIndex } = props;
    const [tab, setTab] = useState('View2D');
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

    return (
        <TransformWrapper initialScale={1} centerOnInit={true}>
            {({ zoomIn, zoomOut }: any) => (
                <div
                    className={`lightbox ${active ? 'active' : ''}`}
                    style={{
                        zIndex,
                    }}
                    ref={ref}
                >
                    <div className='ligbox-header flex items-center justify-end px-10'>
                        <div className='plan-name'>{item.name} </div>
                        <ul className='tab-list plans-tab-list flex items-center justify-center py-4'>
                            <li
                                className='tab-list-item plans-tab-list-item mx-4 flex items-center'
                                onClick={() => {
                                    setTab('View2D');
                                }}
                            >
                                <span className='uppercase'>Unit Plan</span>
                            </li>
                            {item.floor_plan_3D?.url ? (
                                <li
                                    className='tab-list-item plans-tab-list-item mx-4 flex items-center'
                                    onClick={() => {
                                        setTab('View3D');
                                    }}
                                >
                                    <span className='uppercase'>Unit Plan</span>
                                </li>
                            ) : null}
                        </ul>
                        <div
                            className='zoom zoom-out ml-5'
                            onClick={() => {
                                zoomOut();
                            }}
                        >
                            <ZoomOut />
                        </div>
                        <div
                            className='zoom zoom-in ml-5'
                            onClick={() => {
                                zoomIn();
                            }}
                        >
                            <ZoomIn />
                        </div>
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
                    <div className='lightbox-main floorplan-lightbox'>
                        <div className='!py-[40px] md:!py-[80px]'>
                            <div className='container mx-auto flex items-center justify-center'>
                                <LightboxItem item={item} tab={tab} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </TransformWrapper>
    );
});

export default FloorPlanSingleLightbox;
