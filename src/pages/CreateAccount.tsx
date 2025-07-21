import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

export async function managerCreateInventorAccount(shared_password: string, inventor: any) {
  return axios.post('/api/accounts/create-account/', {
    shared_password,
    inventor,
  });
}

const initialInventor = {
  email: '',
  preferred_name: '',
  phone: '',
  orcid: '',
  affiliation: '',
  name_variant: [],
};

const validationSchema = Yup.object().shape({
  shared_password: Yup.string().required('Shared password is required'),
  inventor: Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    preferred_name: Yup.string().required('Preferred name is required'),
    phone: Yup.string(),
    orcid: Yup.string(),
    affiliation: Yup.string().required('Affiliation is required'),
    name_variant: Yup.array().of(Yup.string().required('Name variant cannot be empty')),
  }),
});

export default function CreateAccount() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<null | { email: string; password: string }>(null);
  const [affiliations, setAffiliations] = useState<{id: string, name: string, parent_id?: string}[]>([]);
  const [affiliationsLoading, setAffiliationsLoading] = useState(true);
  const navigate = useNavigate();
  const [sharedPasswordSaved, setSharedPasswordSaved] = useState<string | null>(null);
  const [newVariant, setNewVariant] = useState('');

  useEffect(() => {
    setAffiliationsLoading(true);
    axios.get('/api/inventors/affiliations/?page_size=100')
      .then(res => {
        setAffiliations(res.data.results || []);
      })
      .catch(() => setAffiliations([]))
      .finally(() => setAffiliationsLoading(false));
  }, []);

  useEffect(() => {
    const saved = Cookies.get('shared_password');
    if (saved) setSharedPasswordSaved(saved);
  }, []);

  const formik = useFormik({
    initialValues: {
      shared_password: sharedPasswordSaved || '',
      inventor: initialInventor,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      setError(null);
      setSuccess(null);
      try {
        const shared_password = sharedPasswordSaved || values.shared_password;
        const { inventor } = values;
        const response = await managerCreateInventorAccount(shared_password, inventor);
        setSuccess(response.data.credentials);
        if (!sharedPasswordSaved) {
          Cookies.set('shared_password', shared_password, { expires: 30 }); // 30 days
          setSharedPasswordSaved(shared_password);
        }
        resetForm();
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to create account.');
      } finally {
        setLoading(false);
      }
    },
  });

  // const handleNameVariantChange = (idx: number, value: string) => {
  //   const updated:string[] = [...formik.values.inventor.name_variant];
  //   updated[idx] = value;
  //   formik.setFieldValue(`inventor.name_variant`, updated);
  // };

  // const addNameVariant = () => {
  //   formik.setFieldValue('name_variant', [...formik.values.inventor.name_variant, '']);
  // };

  // const removeNameVariant = (idx: number) => {
  //   const updated = formik.values.inventor.name_variant.filter((_, i) => i !== idx);
  //   formik.setFieldValue('name_variant', updated.length ? updated : ['']);
  // };

  return (
    <>
      <Helmet>
        <title>Create Inventor Account | Inventor Portal</title>
        <meta property="og:title" content="Create Inventor Account | Inventor Portal" />
        <meta name="description" content="Managers can create inventor accounts and send credentials via email." />
        <meta property="og:description" content="Managers can create inventor accounts and send credentials via email." />
      </Helmet>
      <div className="bg-gradient-to-br from-[#332D56] to-[#4E6688] flex flex-col items-center justify-center py-20  overflow-auto">
        <div className="w-full max-w-md mx-auto p-0">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Create Inventor Account</h2>
          {error && <div className="text-red-400 text-sm mb-4 text-center">{error}</div>}
          {success && (
            <div className="mb-6 bg-green-100 border border-green-300 rounded p-4 text-green-800">
              <div className="font-semibold mb-2">Account Created!</div>
              <div>Email: <span className="font-mono">{success.email}</span></div>
              <div>Password: <span className="font-mono">{success.password}</span></div>
              <div className="text-xs text-gray-500 mt-2">Credentials have also been sent to the inventor's email.</div>
            </div>
          )}
          <form onSubmit={formik.handleSubmit} className="space-y-4 bg-transparent">
            {!sharedPasswordSaved && (
              <>
                <input
                  type="password"
                  name="shared_password"
                  value={formik.values.shared_password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Shared Manager Password"
                  required
                  className="w-full p-3 border border-[#3b82f6]/30 rounded-lg bg-[#1e3a8a]/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
                />
                {formik.touched.shared_password && formik.errors.shared_password && (
                  <div className="text-red-400 text-xs mb-1">{formik.errors.shared_password}</div>
                )}
              </>
            )}
            <input
              type="email"
              name="inventor.email"
              value={formik.values.inventor.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Inventor Email"
              required
              className="w-full p-3 border border-[#3b82f6]/30 rounded-lg bg-[#1e3a8a]/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
            />
            {formik.touched.inventor?.email && formik.errors.inventor?.email && (
              <div className="text-red-400 text-xs mb-1">{formik.errors.inventor?.email}</div>
            )}
            <input
              type="text"
              name="inventor.preferred_name"
              value={formik.values.inventor?.preferred_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Preferred Name"
              required
              className="w-full p-3 border border-[#3b82f6]/30 rounded-lg bg-[#1e3a8a]/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
            />
            {formik.touched.inventor?.preferred_name && formik.errors.inventor?.preferred_name && (
              <div className="text-red-400 text-xs mb-1">{formik.errors.inventor?.preferred_name}</div>
            )}
            <input
              type="text"
              name="inventor.phone"
              value={formik.values.inventor.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Phone"
              className="w-full p-3 border border-[#3b82f6]/30 rounded-lg bg-[#1e3a8a]/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
            />
            {formik.touched.inventor?.phone && formik.errors.inventor?.phone && (
              <div className="text-red-400 text-xs mb-1">{formik.errors.inventor?.phone}</div>
            )}
            <input
              type="text"
              name="inventor.orcid"
              value={formik.values.inventor?.orcid}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="ORCID"
              className="w-full p-3 border border-[#3b82f6]/30 rounded-lg bg-[#1e3a8a]/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
            />
            {formik.touched.inventor?.orcid && formik.errors.inventor?.orcid && (
              <div className="text-red-400 text-xs mb-1">{formik.errors.inventor?.orcid}</div>
            )}
            <div>
              <label className="block text-white font-semibold mb-1">Affiliation</label>
              {affiliationsLoading ? (
                <div className="text-gray-200 text-sm">Loading affiliations...</div>
              ) : (
                <select
                  name="inventor.affiliation"
                  value={formik.values.inventor?.affiliation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-3 border border-[#3b82f6]/30 rounded-lg bg-[#1e3a8a]/20 text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select affiliation</option>
                  {affiliations.map((aff) => (
                    <option key={aff.id} value={aff.id} className="text-black">{aff.name}</option>
                  ))}
                </select>
              )}
              {formik.touched.inventor?.affiliation && formik.errors.inventor?.affiliation && (
                <div className="text-red-400 text-xs mb-1">{formik.errors.inventor?.affiliation}</div>
              )}
            </div>
            <div>
              <label className="block text-white font-semibold mb-1">Name Variants</label>
              {/* List of already added variants */}
              {formik.values.inventor?.name_variant.length === 0 && (
                <div className="text-gray-400 italic mb-2">No variants added yet.</div>
              )}
              {formik.values.inventor?.name_variant.map((variant, idx) => (
                <div key={idx} className="flex gap-2 mb-2 items-center">
                  <input
                    type="text"
                    name={`inventor.name_variant[${idx}]`}
                    value={variant}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={`Variant ${idx + 1}`}
                    className="w-full h-12 p-3 border border-[#3b82f6]/30 rounded-lg bg-[#23234a] text-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = formik.values.inventor.name_variant.filter((_, i) => i !== idx);
                      formik.setFieldValue('inventor.name_variant', updated);
                    }}
                    className="w-[60px] h-12 flex items-center justify-center rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                    title="Remove"
                  >
                    <FiTrash2 size={24} />
                  </button>
                </div>
              ))}
              {/* Validation errors */}
              {formik.touched.inventor?.name_variant && typeof formik.errors.inventor?.name_variant === 'string' && (
                <div className="text-red-400 text-xs mb-1">{formik.errors.inventor?.name_variant}</div>
              )}
              {Array.isArray(formik.errors.inventor?.name_variant) && formik.errors.inventor?.name_variant.map((err, idx) =>
                Array.isArray(formik.touched.inventor?.name_variant) && formik.touched.inventor?.name_variant[idx] && err ? (
                  <div key={idx} className="text-red-400 text-xs mb-1">{err}</div>
                ) : null
              )}
              {/* Add new variant input and button */}
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={newVariant}
                  onChange={e => setNewVariant(e.target.value)}
                  placeholder="Add new variant"
                  className="w-full h-12 p-3 border border-[#3b82f6]/30 rounded-lg bg-[#1e3a8a]/20 text-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newVariant.trim()) {
                      formik.setFieldValue('inventor.name_variant', [...formik.values.inventor.name_variant, newVariant.trim()]);
                      setNewVariant('');
                    }
                  }}
                  className="w-[60px] h-12 flex items-center justify-center rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
                  disabled={!newVariant.trim()}
                  title="Add"
                >
                  <FiPlus size={24} />
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition-colors duration-300 font-semibold"
              disabled={loading || formik.isSubmitting}
            >
              {loading || formik.isSubmitting ? 'Creating...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
