import { DocumentRenderer } from '@keystone-6/document-renderer';
import Image from 'next/image';

const Maharera = ({ item }: { item: any }) => {
    const hasRichText = item?.rera_details_rich?.document?.some((block: any) =>
        block?.children?.some((child: any) => child?.text?.trim())
    );

    if (!hasRichText && !item?.rera_details) return null;
    const hasValidDescription = item?.qrDescription?.document?.some(
        (block: any) =>
            block?.children?.some((child: any) => child?.text?.trim() !== '')
    );
    return (
        <section
            className='maharera-section py-[40px] md:py-[80px]'
            id='maharera'
        >
            <div className='maharera-container container mx-auto flex flex-col'>
                {hasRichText ? (
                    <span className='font-primary'>
                        <DocumentRenderer
                            document={item.rera_details_rich.document}
                        />
                    </span>
                ) : (
                    <span className='font-primary'>{item?.rera_details}</span>
                )}
            </div>

            {(item?.qrCodeImage?.length > 0 || hasValidDescription) && (
                <div className='container mx-auto mt-6 flex flex-col items-center'>
                    {item?.qrCodeImage && (
                        <div className='my-6 flex flex-wrap justify-center gap-4'>
                            {item?.qrCodeImage?.map((img: any) => (
                                <Image
                                    loading='lazy'
                                    src={img.qrCode.url}
                                    alt={img.propertyName}
                                    key={img.qrCode.id}
                                    height={200}
                                    width={200}
                                />
                            ))}
                        </div>
                    )}

                    {hasValidDescription && (
                        <span className='maharera-container mx-auto flex flex-col font-primary'>
                            <DocumentRenderer
                                document={item?.qrDescription?.document}
                            />
                        </span>
                    )}
                </div>
            )}
        </section>
    );
};

export default Maharera;
