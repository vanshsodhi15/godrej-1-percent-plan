import React, { useState } from 'react';

import OutlineButton from '@/components/OutlineButton';
import ScheduleVisit from '@/components/ScheduleVisit';

const Connect = ({ property }: any) => {
    const [sideModal, setSideModal] = useState(false);
    return (
        <>
            <section
                className='connect-section bg-light-grayish-orange-gradient relative pb-16 pt-12'
                id='connect'
            >
                <div className='container mx-auto flex flex-wrap items-center justify-center'>
                    <div className='button-schedule-visit'>
                        <button
                            onClick={() => setSideModal(true)}
                            className='btn btn-outline text-center '
                        >
                            Schedule a visit
                        </button>
                        <div
                            className={`schedule-visit ${
                                sideModal ? 'active' : ''
                            }`}
                        >
                            {sideModal ? (
                                <ScheduleVisit
                                    active={sideModal}
                                    property={property}
                                    onClose={() => {
                                        setSideModal(false);
                                    }}
                                />
                            ) : null}
                        </div>
                    </div>
                    <OutlineButton>Book online</OutlineButton>
                </div>
            </section>
        </>
    );
};

export default Connect;
