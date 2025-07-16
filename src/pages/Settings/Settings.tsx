import "./Settings.css"
import { Card, CardContent } from '@shadcn/card';
import { Button } from '@shadcn/button';
import { Avatar, AvatarFallback, AvatarImage } from '@shadcn/avatar';
import { MdEdit, MdSettings } from "react-icons/md";
import { useState, useRef, useEffect } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useAuth } from '@/context/UserContext';

const affiliationOptions = [
  { value: "CIE", label: "CIE" },
  { value: "UIR", label: "UIR" },
];

const languages = [
  { code: 'es', name: 'Español', flag: 'https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/es.svg' },
  { code: 'en', name: 'English', flag: 'https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/gb.svg' },
  { code: 'fr', name: 'Français', flag: 'https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/fr.svg' },
];

const validationSchema = yup.object({
  preferred_name: yup.string().min(1).max(150).required('Full name is required'),
  email: yup.string().email('Invalid email').max(254),
  phone_number: yup.string().max(11, 'Max 11 digits'),
  affiliation: yup.string().nullable(),
  orcid: yup.string().max(19, 'Max 19 characters').nullable(),
  name_variants: yup.array().of(yup.string().max(30)),
});

const passwordSchema = yup.object({
  old_password: yup.string().required('Current password is required'),
  new_password: yup.string().min(8, 'Password must be at least 8 characters').required('New password is required'),
  confirm_password: yup.string()
    .oneOf([yup.ref('new_password')], 'Passwords must match')
    .required('Please confirm your new password'),
});

const Settings = () => {
  const { user, setUser, refreshUser } = useAuth();
  const [selectedLang, setSelectedLang] = useState('en');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  // Prefill form with user data
  const inventor = user?.inventor;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      preferred_name: inventor?.preferred_name || '',
      email: inventor?.email || user?.email || '',
      phone_number: inventor?.phone || '',
      affiliation: inventor?.affiliation || '',
      orcid: inventor?.orcid || '',
      name_variants: inventor?.name_variant || [],
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setSuccess(false);
      setError(null);
      try {
        const payload = {
          preferred_name: values.preferred_name,
          email: values.email,
          phone_number: values.phone_number,
          affiliation: values.affiliation,
          orcid: values.orcid,
          name_variants: values.name_variants,
        };
         await axios.put('/api/accounts/me/', payload);
        setSuccess(true);
        if (refreshUser) refreshUser();
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Failed to update settings.');
      } finally {
        setLoading(false);
      }
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      old_password: '',
      new_password: '',
      confirm_password: '',
    },
    validationSchema: passwordSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      setSuccess(false);
      setError(null);
      try {
        await axios.post('/api/accounts/change-password/', {
          old_password: values.old_password,
          new_password: values.new_password,
        });
        setSuccess(true);
        resetForm();
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Failed to change password.');
      } finally {
        setLoading(false);
      }
    },
  });

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
      <Helmet>
        <title>Settings | Inventor Portal</title>
        <meta property="og:title" content="Settings | Inventor Portal" />
        <meta name="description" content="Manage your inventor portal settings, preferences, and account details." />
        <meta property="og:description" content="Manage your inventor portal settings, preferences, and account details." />
      </Helmet>
      <div className="flex flex-col w-full max-w-4xl mx-auto justify-center gap-6 mt-8 pb-8">
        {/* Profile Settings Section */}
        <Card className="bg-[#b7c7d8] rounded-2xl shadow-lg overflow-hidden">
          <CardContent className="flex flex-col gap-8 p-6">
            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-[#073567]/10">
              <div className="relative group">
                <Avatar className="h-28 w-28 border-2 rounded-2xl border-[#D1D600]">
                  <AvatarImage src={inventor?.image || "https://github.com/shadcn.png"} />
                  <AvatarFallback className="rounded text-xl">{(inventor?.preferred_name || 'CN').slice(0,2).toUpperCase()}</AvatarFallback>
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
            <form onSubmit={formik.handleSubmit} className="grid gap-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[#073567] font-semibold">Full Name</label>
                  <input
                    type="text"
                    name="preferred_name"
                    value={formik.values.preferred_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#073567] bg-white/50 hover:bg-white transition-colors"
                    placeholder="Enter your full name"
                  />
                  {formik.touched.preferred_name && formik.errors.preferred_name && (
                    <div className="text-red-600 text-sm">{formik.errors.preferred_name}</div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#073567] font-semibold">Phone Number</label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formik.values.phone_number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#073567] bg-white/50 hover:bg-white transition-colors"
                    placeholder="Enter your phone number"
                  />
                  {formik.touched.phone_number && formik.errors.phone_number && (
                    <div className="text-red-600 text-sm">{formik.errors.phone_number}</div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#073567] font-semibold">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#073567] bg-white/50 hover:bg-white transition-colors"
                  placeholder="your@email.com"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-600 text-sm">{formik.errors.email}</div>
                )}
                <p className="text-sm text-gray-600 mt-1">This email will be used for notifications and communications</p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#073567] font-semibold">Affiliation</label>
                <select
                  name="affiliation"
                  value={formik.values.affiliation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#073567] bg-white/50 hover:bg-white transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select your affiliation</option>
                  {affiliationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {formik.touched.affiliation && formik.errors.affiliation && (
                  <div className="text-red-600 text-sm">{formik.errors.affiliation}</div>
                )}
                <p className="text-sm text-gray-600 mt-1">Choose the type of organization you're affiliated with</p>
              </div>

              {/* Optional: ORCID and Name Variants */}
              <div className="flex flex-col gap-2">
                <label className="text-[#073567] font-semibold">ORCID</label>
                <input
                  type="text"
                  name="orcid"
                  value={formik.values.orcid}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#073567] bg-white/50 hover:bg-white transition-colors"
                  placeholder="Enter your ORCID (optional)"
                />
                {formik.touched.orcid && formik.errors.orcid && (
                  <div className="text-red-600 text-sm">{formik.errors.orcid}</div>
                )}
              </div>
              {/* Name Variants as comma-separated input */}
              <div className="flex flex-col gap-2">
                <label className="text-[#073567] font-semibold">Name Variants</label>
                <input
                  type="text"
                  name="name_variants"
                  value={formik.values.name_variants.join(', ')}
                  onChange={e => formik.setFieldValue('name_variants', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                  onBlur={formik.handleBlur}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#073567] bg-white/50 hover:bg-white transition-colors"
                  placeholder="Enter name variants, separated by commas"
                />
                {formik.touched.name_variants && formik.errors.name_variants && (
                  <div className="text-red-600 text-sm">{typeof formik.errors.name_variants === 'string' ? formik.errors.name_variants : ''}</div>
                )}
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-4">
                <Button type="submit" className="bg-[#073567] text-white font-bold rounded-lg px-6 py-2.5 hover:bg-[#05294a] min-w-[120px]" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
              {success && <div className="text-green-600 text-sm text-right">Profile updated successfully!</div>}
              {error && <div className="text-red-600 text-sm text-right">{error}</div>}
            </form>
          </CardContent>
        </Card>

        {/* Genral Settings */}
        <Card className="bg-[#b7c7d8] rounded-2xl p-6 shadow-lg">
          <CardContent className="flex flex-col gap-6 p-0">
            <div className="flex items-center gap-4">
              <MdSettings className="text-[#073567] w-6 h-6" />
              <h3 className="text-[#073567] text-xl font-bold">General</h3>
            </div>
            {/* Password Change Form */}
            <form onSubmit={passwordFormik.handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[#073567] font-semibold">Current Password</label>
                <input
                  type="password"
                  name="old_password"
                  value={passwordFormik.values.old_password}
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#073567]"
                  placeholder="••••••••"
                />
                {passwordFormik.touched.old_password && passwordFormik.errors.old_password && (
                  <div className="text-red-600 text-sm">{passwordFormik.errors.old_password}</div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#073567] font-semibold">New Password</label>
                <input
                  type="password"
                  name="new_password"
                  value={passwordFormik.values.new_password}
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#073567]"
                  placeholder="••••••••"
                />
                {passwordFormik.touched.new_password && passwordFormik.errors.new_password && (
                  <div className="text-red-600 text-sm">{passwordFormik.errors.new_password}</div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#073567] font-semibold">Confirm New Password</label>
                <input
                  type="password"
                  name="confirm_password"
                  value={passwordFormik.values.confirm_password}
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#073567]"
                  placeholder="••••••••"
                />
                {passwordFormik.touched.confirm_password && passwordFormik.errors.confirm_password && (
                  <div className="text-red-600 text-sm">{passwordFormik.errors.confirm_password}</div>
                )}
              </div>
              <Button type="submit" className="bg-[#073567] text-white font-bold rounded-lg px-4 py-2 mt-2 w-fit hover:bg-[#05294a]" disabled={loading}>
                {loading ? 'Updating...' : 'Update Password'}
              </Button>
              {success && <div className="text-green-600 text-sm text-right">Password changed successfully!</div>}
              {error && <div className="text-red-600 text-sm text-right">{error}</div>}
            </form>
            {/* End Password Change Form */}
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
        <div className="flex justify-end">
          <Button className="bg-[#073567] text-white font-bold rounded-lg px-6 py-3 text-lg hover:bg-[#05294a]">
            Save All Changes
          </Button>
        </div>
      </div>
    </>
  );
}

export default Settings;