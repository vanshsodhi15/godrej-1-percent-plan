import Link from 'next/link';
import { useState } from 'react';

import ScheduleVisit from '@/components/ScheduleVisit';

import ContactUs from '~/svg/property-listing/contact-us.svg';
import Phone from '~/svg/property-listing/phone.svg';
import WhatsApp from '~/svg/whatsapp.svg';

const StickyFooter = ({ property }: any) => {
    const [sideModal, setSideModal] = useState(false);
    return (
        <section className='sticky-footer' id='stickFooter'>
            <div className='container mx-auto flex'>
                <div className='flex w-full flex-col items-center justify-center'>
                    <ul className='list flex w-full justify-between font-primary'>
                        <li id='footer-whatsapp'>
                            <Link
                                prefetch={false}
                                href={property.whatsapp_url}
                                target='_blank'
                                className='flex cursor-pointer flex-col items-center justify-end p-4'
                            >
                                <div className='icon'>
                                    <WhatsApp />
                                </div>
                                <span className='text-right'>WhatsApp</span>
                            </Link>
                        </li>
                        <li id='footer-contactus'>
                            <div
                                onClick={() => setSideModal(true)}
                                className='flex cursor-pointer flex-col items-center justify-end p-4'
                            >
                                <div className='icon'>
                                    <ContactUs />
                                </div>
                                <span className='text-right '>Contact Us</span>
                            </div>
                        </li>
                        <li id='footer-callus'>
                            <a
                                href={`tel:${property.phone_number}`}
                                className='flex cursor-pointer flex-col items-center justify-end p-4'
                            >
                                <div className='icon'>
                                    <Phone />
                                </div>
                                <span className='text-right'>Call Us</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`schedule-visit ${sideModal ? 'active' : ''}`}>
                {sideModal ? (
                    <ScheduleVisit
                        onClose={() => {
                            setSideModal(false);
                        }}
                        property={property}
                        active={sideModal}
                    />
                ) : null}
            </div>
        </section>
    );
};

export default StickyFooter;
