import { FC } from 'react';
import ReactCountryFlag from 'react-country-flag';

interface CountryData {
  name: string;
  code: string;
}

const countries: CountryData[] = [
  { name: 'Nigeria', code: 'NG' },
  { name: 'UK', code: 'GB' },
  { name: 'USA', code: 'US' },
  { name: 'Qatar', code: 'QA' },
  { name: 'Ghana', code: 'GH' },
  { name: 'UAE', code: 'AE' },
  { name: 'Morocco', code: 'MA' },
  { name: 'Rwanda', code: 'RW' },
  { name: 'Sierra Leone', code: 'SL' },
  { name: 'Spain', code: 'ES' },
  { name: 'France', code: 'FR' },
  { name: 'Kenya', code: 'KE' },
  { name: 'Canada', code: 'CA' },
  { name: 'Germany', code: 'DE' },
  { name: 'Cameroon', code: 'CM' },
  { name: 'Australia', code: 'AU' },
  { name: 'Italy', code: 'IT' },
];

const CountryFlag: FC<{ country: CountryData }> = ({ country }) => {
  return (
    <div className="flex flex-col items-center mx-2 sm:mx-3 md:mx-5 my-4 sm:my-6 w-[70px] sm:w-[80px] md:w-[90px]">
      <div className="mb-2 sm:mb-3 rounded overflow-hidden w-[42px] h-[28px] sm:w-[48px] sm:h-[32px] md:w-[54px] md:h-[36px] shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
        <ReactCountryFlag
          countryCode={country.code}
          svg
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      <span className="text-xs sm:text-sm text-center font-medium text-gray-700">
        {country.name}
      </span>
    </div>
  );
};

const CountriesSection: FC = () => {
  return (
    <section className="relative py-20 md:py-28 lg:py-32 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-800">
          Our Growing Global Community
        </h2>
        <p className="text-center text-sm sm:text-base mb-8 sm:mb-10 md:mb-12 max-w-xl mx-auto text-gray-600">
          Join our diverse community of global change makers spanning across {countries.length}{' '}
          countries and we&apos;re expanding every day!
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center">
            {countries.map((country, index) => (
              <CountryFlag key={index} country={country} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountriesSection;
