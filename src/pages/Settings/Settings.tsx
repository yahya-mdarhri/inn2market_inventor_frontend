import "./Settings.css"
import { Card, CardContent } from '@shadcn/card';
import { Button } from '@shadcn/button';
import { Avatar, AvatarFallback, AvatarImage } from '@shadcn/avatar';
import { MdLanguage, MdNotifications, MdSecurity, MdPerson, MdEdit } from "react-icons/md";
import { useState, useRef, useEffect } from 'react';

const affiliationOptions = [
  { value: "CIE", label: "CIE" },
  { value: "UIR", label: "UIR" },
];

const languages = [
  { code: 'es', name: 'Español', flag: 'https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/es.svg' },
  { code: 'en', name: 'English', flag: 'https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/gb.svg' },
  { code: 'fr', name: 'Français', flag: 'https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/fr.svg' },
];

const Settings = () => {
  const [selectedLang, setSelectedLang] = useState('en');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !(dropdownRef.current as HTMLUListElement).contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className="flex flex-col w-full max-w-4xl mx-auto justify-center gap-6 mt-8 pb-8">
        {/* Profile Settings Section */}
        <Card className="bg-[#b7c7d8] rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          {/* <div className="bg-[#073567] p-6">
            <div className="flex items-center gap-4">
              <MdPerson className="text-white w-7 h-7" />
              <div>
                <h3 className="text-white text-2xl font-bold">Profile Information</h3>
                <p className="text-[#D1D600] text-sm font-medium mt-1">Manage your personal information and preferences</p>
              </div>
            </div>
          </div> */}

          <CardContent className="flex flex-col gap-8 p-6">
            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-[#073567]/10">
              <div className="relative group">
                <Avatar className="h-28 w-28 border-2 rounded-2xl border-[#D1D600]">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="rounded text-xl">CN</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-2 right-2 bg-[#073567] text-white p-2 rounded-full shadow-lg opacity-90 hover:opacity-100 transition-opacity">
                  <MdEdit className="w-4 h-4" />
                </button>
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-[#073567] text-lg font-bold mb-1">Profile Photo</h4>
                <p className="text-gray-600 text-sm mb-3">Upload a professional photo for your profile</p>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <Button className="bg-[#073567] text-white text-sm font-bold rounded-lg px-4 py-2 hover:bg-[#05294a]">
                    Upload New
                  </Button>
                  <Button className="bg-transparent text-[#073567] text-sm font-bold rounded-lg px-4 py-2 border-2 border-[#073567] hover:bg-[#073567] hover:text-white transition-colors">
                    Remove
                  </Button>
                </div>
              </div>
            </div>

            {/* Personal Information Form */}
            <div className="grid gap-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[#073567] font-semibold">Full Name</label>
                  <input
                    type="text"
                    className="rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#073567] bg-white/50 hover:bg-white transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#073567] font-semibold">Phone Number</label>
                  <input
                    type="tel"
                    className="rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#073567] bg-white/50 hover:bg-white transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#073567] font-semibold">Email Address</label>
                <input
                  type="email"
                  className="rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#073567] bg-white/50 hover:bg-white transition-colors"
                  placeholder="your@email.com"
                />
                <p className="text-sm text-gray-600 mt-1">This email will be used for notifications and communications</p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#073567] font-semibold">Affiliation</label>
                <select 
                  className="rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#073567] bg-white/50 hover:bg-white transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select your affiliation</option>
                  {affiliationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-600 mt-1">Choose the type of organization you're affiliated with</p>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <Button className="bg-[#073567] text-white font-bold rounded-lg px-6 py-2.5 hover:bg-[#05294a] min-w-[120px]">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Genral Settings */}
        <Card className="bg-[#b7c7d8] rounded-2xl p-6 shadow-lg">
          <CardContent className="flex flex-col gap-6 p-0">
            <div className="flex items-center gap-4">
              <MdSecurity className="text-[#073567] w-6 h-6" />
              <h3 className="text-[#073567] text-xl font-bold">General</h3>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[#073567] font-semibold">Current Password</label>
                <input
                  type="password"
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#073567]"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#073567] font-semibold">New Password</label>
                <input
                  type="password"
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#073567]"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#073567] font-semibold">Confirm New Password</label>
                <input
                  type="password"
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#073567]"
                  placeholder="••••••••"
                />
              </div>
              <Button className="bg-[#073567] text-white font-bold rounded-lg px-4 py-2 mt-2 w-fit hover:bg-[#05294a]">
                Update Password
              </Button>
            </div>
            <div className="pt-6 mt-4">
              <label className="text-[#073567] font-semibold mb-2 block">Language</label>
              <div className="relative w-full">
                <button
                  type="button"
                  className="flex items-center justify-between w-full rounded-lg border border-gray-300 px-4 py-2 bg-white text-[#073567] font-medium focus:outline-none focus:ring-2 focus:ring-[#073567] transition min-h-[44px]"
                  onClick={() => setDropdownOpen((open) => !open)}
                  aria-haspopup="listbox"
                  aria-expanded={dropdownOpen}
                >
                  <span className="flex items-center gap-2">
                    <img src={languages.find(l => l.code === selectedLang)?.flag} alt={languages.find(l => l.code === selectedLang)?.name} className="w-6 h-6 rounded" />
                    {languages.find(l => l.code === selectedLang)?.name} <span className="text-xs opacity-70">({selectedLang})</span>
                  </span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {dropdownOpen && (
                  <ul
                    ref={dropdownRef}
                    className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none"
                    tabIndex={-1}
                    role="listbox"
                  >
                    {languages.map((lang) => (
                      <li
                        key={lang.code}
                        className={`flex items-center gap-2 px-4 py-2 cursor-pointer transition-colors duration-100
                          ${selectedLang === lang.code ? 'bg-[#073567] text-white' : 'hover:bg-[#e6ecf3] text-[#073567]'}`}
                        role="option"
                        aria-selected={selectedLang === lang.code}
                        onClick={() => { setSelectedLang(lang.code); setDropdownOpen(false); }}
                      >
                        <img src={lang.flag} alt={lang.name} className="w-6 h-6 rounded" />
                        <span className="font-medium">{lang.name} <span className="text-xs opacity-70">({lang.code})</span></span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save All Changes Button */}
        {/* <div className="flex justify-end">
          <Button className="bg-[#073567] text-white font-bold rounded-lg px-6 py-3 text-lg hover:bg-[#05294a]">
            Save All Changes
          </Button>
        </div> */}
      </div>
    </>
  );
}

export default Settings;