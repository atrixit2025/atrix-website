import React from 'react'
import HeroCommon from '../Components/HeroCommon'


const herodata = [
    {
        title: "Privacy Policy",
        desc: "",
    }
];

const PrivacyPolicy = () => {



    return (
        <div>
            <div className="container mx-auto w-[90%]">
                <HeroCommon heroData={herodata[0]} />
                <div className="md:px-36 py-14 ">
                    <div className="privacy-policy-container">
                        <section>
                            <h2 className=' text-2xl md:text-4xl font-bold'  >Introduction</h2>
                            <p className='mt-4' >Welcome to Atrix IT Solutions! We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website, <a href="https://atrixitsolutions.com/">https://atrixitsolutions.com/</a>. By using our website, you consent to the practices described in this policy. Please read it carefully to understand how we handle your information.</p>
                        </section>



                        <section>
                            <h2 className=' text-2xl md:text-4xl font-bold mt-12' >Types of Information Collected</h2>
                            <p className='mt-4' >We collect the following types of information:</p>
                            <ol>
                                <li><strong>Personal Information:</strong> This includes, but is not limited to, your name, email address, phone number, and any other information you provide when contacting us or using our services.</li>
                                <li><strong>Non-Personal Information:</strong> This includes data such as your IP address, browser type, operating system, and browsing behavior on our website.</li>
                            </ol>
                        </section>



                        <section>
                            <h2 className=' text-2xl md:text-4xl font-bold  mt-12' >Purpose of Information Collection</h2>
                            <p className="mt-4">We collect your information for the following purposes:</p>
                            <ol>
                                <li><strong>Service Delivery:</strong> To provide, maintain, and improve our services and website functionality.</li>
                                <li><strong>Communication:</strong> To respond to your inquiries, provide customer support, and send you updates or information related to our services.</li>
                                <li><strong>Personalization:</strong> To tailor our content and services to better suit your preferences.</li>
                                <li><strong>Marketing:</strong> To send you promotional materials and updates about our services, with your consent.</li>
                                <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes.</li>
                            </ol>
                        </section>



                        <section>
                            <h2 className=' text-2xl md:text-4xl font-bold  mt-12' >Opt-Out Instructions</h2>
                            <p className="mt-4">You have the right to opt-out of certain uses of your personal information. If you do not wish to receive marketing communications from us, you can opt-out by:</p>
                            <ol>
                                <li><strong>Email:</strong> Follow the unsubscribe instructions included in our marketing emails.</li>
                                <li><strong>Contact Form:</strong> Visit our website's contact page and send a request to opt-out of marketing communications.</li>
                            </ol>
                            <p>Please note that even if you opt-out of marketing communications, we may still need to send you non-promotional emails regarding your account or our ongoing business relationship.</p>
                        </section>



                        <section>
                            <h2 className=' text-2xl md:text-4xl font-bold  mt-12' >Data Protection and Security</h2>
                            <p className="mt-4">We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
                        </section>



                        <section>
                            <h2 className=' text-2xl md:text-4xl font-bold  mt-12' >Third-Party Disclosure</h2>
                            <p className="mt-4">We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent, except as described in this policy. We may share your information with trusted third parties who assist us in operating our website, conducting our business, or providing services to you, provided they agree to keep this information confidential.</p>
                        </section>



                        <section>
                            <h2 className=' text-2xl md:text-4xl font-bold  mt-12' >Changes to This Privacy Policy</h2>
                            <p className="mt-4">We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new policy on our website and updating the effective date at the top of this page. Your continued use of our website after such changes signifies your acceptance of the updated policy.</p>
                        </section>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PrivacyPolicy