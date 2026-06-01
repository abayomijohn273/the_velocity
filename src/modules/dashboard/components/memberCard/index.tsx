'use client';

import Avatar from '@/components/ui/avatar';
import { getCountryName, getIndustryLabel, getRoleLabel, isCountryCode } from '@/lib/format/labels';
import type { Member } from '@/types/member';
import { Envelope, LinkedinLogo } from '@phosphor-icons/react';
import Link from 'next/link';
import ReactCountryFlag from 'react-country-flag';

const MemberCard = ({ member }: { member: Member }) => {
  const fullName = `${member.firstName ?? ''} ${member.lastName ?? ''}`.trim() || 'Member';
  const role = getRoleLabel(member.currentRole);
  const industry = getIndustryLabel(member.industry);
  const showFlag = isCountryCode(member.countryOfResidence);

  return (
    <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition hover:shadow-md">
      <div className="relative">
        <Avatar
          src={member.avatar}
          firstName={member.firstName}
          lastName={member.lastName}
          size={92}
          className="ring-4 ring-secondary/30"
        />
        {showFlag && (
          <span
            className="absolute -bottom-0.5 -right-0.5 flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white"
            title={getCountryName(member.countryOfResidence)}
          >
            <ReactCountryFlag
              countryCode={member.countryOfResidence as string}
              svg
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              aria-label={getCountryName(member.countryOfResidence)}
            />
          </span>
        )}
      </div>

      <h3 className="mt-4 text-lg font-bold text-black">{fullName}</h3>
      {role && <p className="mt-0.5 text-sm text-gray-500">{role}</p>}
      {industry && (
        <span className="mt-3 inline-block rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
          {industry}
        </span>
      )}

      <div className="mt-5 flex items-center gap-3">
        <Link
          href={`mailto:${member.email}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Email ${fullName}`}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-600 transition hover:bg-primary hover:text-white"
        >
          <Envelope size={18} />
        </Link>
        {member.linkedinUrl && (
          <Link
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${fullName} on LinkedIn`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-600 transition hover:bg-[#0A66C2] hover:text-white"
          >
            <LinkedinLogo size={18} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default MemberCard;
