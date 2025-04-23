import Image from 'next/image';
import Link from 'next/link';
import FooterImage from '../../../../public/assets/images/webp/footer-image.webp';
import { InstagramIcon, LinkedInIcon } from './FooterIcons';
import SocialLink from './SocialLink';
import CtaSection from './ctaSection';

const Footer = () => {
  return (
    <div className="relative">
      <CtaSection />
      <footer id="contact-us" className="bg-white relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-[4.938rem] pb-[7rem]">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full md:w-6/12 lg:w-5/12 xl:w-6/12">
              <div>
                <h3 className="text-3xl font-bold text-primary mb-4">The Velocity</h3>
                <p className="text-base mb-6 text-black">
                  This is where Africa’s fast-rising stars connect, collaborate, and create the
                  future—together.
                </p>
                <div className="mb-12">
                  <span className="block">
                    Reach out to us:{' '}
                    <Link href="mailto:e@thevelocity.org " className="text-primary hover:underline">
                      e@thevelocity.org
                    </Link>{' '}
                    or{' '}
                    <Link
                      href="tel:+447365341566"
                      className="text-primary font-semibold hover:underline"
                    >
                      +447365341566
                    </Link>
                  </span>
                </div>

                <div className="flex mb-6">
                  <SocialLink
                    href="https://www.instagram.com/thevelocity.hq"
                    icon={<InstagramIcon />}
                    ariaLabel="Follow us on Instagram"
                  />
                  <SocialLink
                    href="https://www.linkedin.com/company/velocityorg/"
                    icon={<LinkedInIcon />}
                    ariaLabel="Follow us on LinkedIn"
                  />
                  {/* <SocialLink
                    href="https://facebook.com/fidni"
                    icon={<FacebookIcon />}
                    ariaLabel="Follow us on Facebook"
                  />
                  <SocialLink
                    href="https://twitter.com/fidni"
                    icon={<TwitterIcon />}
                    ariaLabel="Follow us on Twitter"
                  /> */}
                </div>
                <p className="text-sm text-black font-semibold">
                  A product of Great Minds Collective
                </p>
                <p className="text-sm text-black font-semibold">
                  © The Velocity {new Date().getFullYear()}. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="hidden md:block absolute w-4/12 right-0 bottom-0 z-10">
        <div className="bg-primary h-[65rem] rounded-tl-4xl w-full ">
          <Image
            src={FooterImage}
            alt="Footer Image"
            className="w-full h-full object-cover rounded-tl-4xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
