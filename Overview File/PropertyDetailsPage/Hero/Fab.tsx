import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import 'react-datepicker/dist/react-datepicker.css';

import ScheduleVisit from '@/components/ScheduleVisit';

import Calendar from '~/svg/calendar.svg';
import Call from '~/svg/call.svg';
import FabIcon from '~/svg/home-page/hero-section/fab.svg';
import ContactUs from '~/svg/property-listing/contact-us.svg';
import EMICalculator from '~/svg/property-listing/emi-calculator.svg';
import Phone from '~/svg/property-listing/phone.svg';
import Share from '~/svg/share.svg';
import WhatsApp from '~/svg/whatsapp.svg';

interface Props {
    modalRef: any;
    setShareModal: any;
    property?: any;
    setEmiModal?: any;
}

const Fab = (props: Props) => {
    const { modalRef, setShareModal, property, setEmiModal } = props;
    const [active, setActive] = useState(false);

    const menuEl: any = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (e: any) => {
            if (menuEl.current) {
                if (!menuEl.current.contains(e.target)) {
                    if (
                        modalRef &&
                        modalRef.current &&
                        modalRef.current.contains(e.target)
                    ) {
                        return;
                    }
                    setActive(false);
                }
            }
        };
        let timeoutID: any = null;
        if (active) {
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
    }, [active, modalRef, setActive]);
    const [sideModal, setSideModal] = useState(false);

    return (
        <>
            <div
                className={`fab-container ${active ? 'active' : ''}`}
                onMouseLeave={() => setActive(false)}
            >
                <div className='shadow' />
                <div
                    className='fab'
                    onClick={() => {
                        setActive(!active);
                    }}
                    onMouseEnter={() => {
                        if (window.innerWidth > 1023) {
                            setActive(true);
                        }
                    }}
                >
                    <FabIcon />
                </div>
                <ul className='list icon-list flex flex-col' ref={menuEl}>
                    <li className='mobile-hide'>
                        <a className='pointer flex items-center justify-end font-primary'>
                            <span
                                className='text-right'
                                onClick={() => setShareModal(true)}
                            >
                                Share
                            </span>
                            <div className='share-icon ml-2'>
                                <Share />
                            </div>
                        </a>
                    </li>
                    <li className='mobile-hide'>
                        <a className='pointer flex items-center justify-end'>
                            <span
                                className='cursor-pointer text-right'
                                onClick={() => setSideModal(true)}
                            >
                                Schedule a Visit
                            </span>
                            <div className='icon ml-2'>
                                <Calendar />
                            </div>
                        </a>
                    </li>
                    {property?.whatsapp_url && (
                        <li>
                            <Link
                                prefetch={false}
                                href={property?.whatsapp_url}
                                target='_blank'
                                className='flex items-center justify-end'
                            >
                                <span className='text-right'>WhatsApp</span>
                                <div className='icon ml-2'>
                                    <WhatsApp />
                                </div>
                            </Link>
                        </li>
                    )}
                    {property?.phone_number && (
                        <li className='max-lg:hidden'>
                            <a
                                className='pointer flex items-center justify-end'
                                href={`tel:${property?.phone_number}`}
                            >
                                <span className='text-right'>Call Us</span>
                                <div className='icon ml-2'>
                                    <Call />
                                </div>
                            </a>
                        </li>
                    )}
                    <li className='mobile-active'>
                        <a className='pointer flex items-center justify-end'>
                            <span
                                className='text-right'
                                onClick={() => setSideModal(true)}
                            >
                                Contact Us
                            </span>
                            <div className='icon ml-2'>
                                <ContactUs />
                            </div>
                        </a>
                    </li>
                    <li className='mobile-active'>
                        <a
                            className='pointer flex items-center justify-end'
                            href={`tel:${property?.phone_number}`}
                        >
                            <span className='text-right'>Call Us</span>
                            <div className='icon ml-2'>
                                <Phone />
                            </div>
                        </a>
                    </li>
                    <li className='divider mobile-hide'>
                        <a className='pointer flex items-center justify-end'>
                            <span
                                className='text-right'
                                onClick={() => setEmiModal(true)}
                            >
                                EMI Calculator
                            </span>
                            <div className='icon ml-2'>
                                <EMICalculator />
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div
                className={`center-position fixed bottom-0 left-0 right-0 z-[9999] w-full p-0 ${
                    sideModal ? 'active' : ''
                }`}
            >
                {sideModal ? (
                    <ScheduleVisit
                        active={sideModal}
                        property={property}
                        onClose={(e: any) => {
                            e.stopPropagation();
                            setSideModal(false);
                        }}
                        hideAutoComplete={true}
                    />
                ) : null}
            </div>
        </>
    );
};

export default Fab;
