import { useEffect, useState } from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import LoadingButton from "@/components/ui/LoadinButton/LoadingButton";
import type { Inventor } from "@/types";

type InventorFormValues = {
  shared_password: string;
  inventor: {
    email: string;
    preferred_name: string;
    phone: string;
    orcid: string;
    affiliation: string;
    name_variant: string[];
  };
};


export async function managerCreateInventorAccount(
  shared_password: string,
  inventor: any,
  selectedInventor: Inventor | null
) {
	const data = (selectedInventor !== null)
		? {
			shared_password,
			selected_inventor: selectedInventor.id,
		}
		: {
			shared_password,
			inventor,
		}
  return axios.post("/api/accounts/create-account/",data);
}

const initialInventor = {
  email: "",
  preferred_name: "",
  phone: "",
  orcid: "",
  affiliation: "",
  name_variant: [],
};

export default function CreateAccount() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<null | {
    email: string;
    password: string;
  }>(null);
  const [affiliations, setAffiliations] = useState<
    { id: string; name: string; parent_id?: string }[]
  >([]);
  const [affiliationsLoading, setAffiliationsLoading] = useState(true);
  const [sharedPasswordSaved, setSharedPasswordSaved] = useState<string | null>(
    null
  );
  const [newVariant, setNewVariant] = useState("");
  const [inventorSearch, setInventorSearch] = useState("");
  const [selectedInventor, setSelectedInventor] = useState<null | Inventor>(
    null
  );
  const [searchResults, setSearchResults] = useState<Inventor[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    setAffiliationsLoading(true);
    axios
      .get("/api/inventors/affiliations/?page_size=100")
      .then((res) => {
        setAffiliations(res.data.results || []);
      })
      .catch(() => setAffiliations([]))
      .finally(() => setAffiliationsLoading(false));
  }, []);

  useEffect(() => {
    const saved = Cookies.get("shared_password");
    if (saved) setSharedPasswordSaved(saved);
  }, []);

const formik = useFormik<InventorFormValues>({
  enableReinitialize: true,
  initialValues: {
    shared_password: sharedPasswordSaved || "",
    inventor: initialInventor,
  },
  validationSchema: Yup.object().shape({
  shared_password: Yup.string().required("Shared password is required"),
  inventor: selectedInventor === null
    ? Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Email is required"),
        preferred_name: Yup.string().required("Preferred name is required"),
        phone: Yup.string(),
        orcid: Yup.string(),
        affiliation: Yup.string().required("Affiliation is required"),
        name_variant: Yup.array().of(Yup.string().required("Name variant cannot be empty")),
      })
    : Yup.object().nullable(),
}),
  onSubmit: async (values, { resetForm }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const shared_password = sharedPasswordSaved || values.shared_password;
      const response = await managerCreateInventorAccount(
        shared_password,
        values.inventor,
        selectedInventor
      );
      setSuccess(response.data.credentials);
      if (!sharedPasswordSaved) {
        Cookies.set("shared_password", shared_password, { expires: 30 });
        setSharedPasswordSaved(shared_password);
      }
    } catch (err: any) {
			setError(err.response?.data?.error || "Failed to create account.");
    } finally {
      setLoading(false);
      resetForm();
      setSearchResults([]);
			setInventorSearch("");
      setSearchLoading(false);
      setSelectedInventor(null);
    }
  },
} );


  const handleRemoveSelectedInventor = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setLoading(false);
		setSearchResults([]);
		setInventorSearch("");
		setSearchLoading(false);
		setSelectedInventor(null);
	}
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInventorSearch(query);
    if (query.trim().length > 1) {
      setSearchLoading(true);
      try {
        const res = await axios.post(`/api/inventors/inventors/search/`, {
          name: query.trim(),
        });
        setSearchResults(res.data?.results || []);
      } catch {
        setSearchResults([]);
      }
      setSearchLoading(false);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Inventor Account | Inventor Portal</title>
        <meta
          property="og:title"
          content="Create Inventor Account | Inventor Portal"
        />
        <meta
          name="description"
          content="Managers can create inventor accounts and send credentials via email."
        />
        <meta
          property="og:description"
          content="Managers can create inventor accounts and send credentials via email."
        />
      </Helmet>
      <div className="h-screen bg-gradient-to-br from-[#332D56] to-[#4E6688] flex flex-col justify-center py-20  overflow-auto">
        <div className="w-full max-w-md mx-auto p-0">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Create Inventor Account
          </h2>
          {error && (
            <div className="text-red-400 text-sm mb-4 text-center">{error}</div>
          )}
          {success && (
            <div className="mb-6 bg-green-100 border border-green-300 rounded p-4 text-green-800">
              <div className="font-semibold mb-2">Account Created!</div>
              <div>
                Email: <span className="font-mono">{success.email}</span>
              </div>
              <div>
                Password: <span className="font-mono">{success.password}</span>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Credentials have also been sent to the inventor's email.
              </div>
            </div>
          )}
          <form
            onSubmit={formik.handleSubmit}
            className="space-y-4 bg-transparent"
          >
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
                {formik.touched.shared_password &&
                  formik.errors.shared_password && (
                    <div className="text-red-400 text-xs mb-1">
                      {formik.errors.shared_password}
                    </div>
                  )}
              </>
            )}

            {selectedInventor ? (
              <>
                <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl p-6 text-white shadow-lg space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {selectedInventor.preferred_name}
                      </h3>
                      <p className="text-sm text-gray-300">
                        {selectedInventor.affiliation}
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveSelectedInventor}
                      type="button"
                      className="text-sm px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md"
                    >
                      Change
                    </button>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="font-medium text-gray-300">Email:</span>{" "}
                      {selectedInventor.email}
                    </div>
                    <div>
                      <span className="font-medium text-gray-300">Phone:</span>{" "}
                      {selectedInventor.phone || "—"}
                    </div>
                    <div>
                      <span className="font-medium text-gray-300">ORCID:</span>{" "}
                      {selectedInventor.orcid || "—"}
                    </div>
                    <div>
                      <span className="font-medium text-gray-300">
                        Name Variants:
                      </span>{" "}
                      {selectedInventor.name_variant &&
                      selectedInventor.name_variant.length > 0
                        ? selectedInventor.name_variant.join(", ")
                        : "—"}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="relative">
                  <input
                    type="text"
                    name="inventor_search"
                    value={inventorSearch}
                    onChange={handleSearchChange}
                    placeholder="Search Inventor"
                    className="w-full p-3 border border-[#3b82f6]/30 rounded-lg bg-[#1e3a8a]/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
                  />
                  {/* Search Results Dropdown */}
                  {(searchResults.length > 0 || searchLoading) && (
                    <ul className="absolute z-10 bg-white text-black rounded shadow w-full max-h-60 overflow-y-auto">
                      {searchResults.map((inv) => (
                        <li
                          key={inv.id}
                          className="p-2 hover:bg-blue-100 cursor-pointer"
                          onClick={() => {
                            setSelectedInventor(inv);
                            setSearchResults([]);
                            setInventorSearch("");
                          }}
                        >
                          <div className="font-semibold">
                            {inv.preferred_name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {inv.affiliation} | {inv.email}
                          </div>
                        </li>
                      ))}
                      {searchLoading && (
                        <li className="p-2 text-center text-gray-500">
                          Searching...
                        </li>
                      )}
                    </ul>
                  )}
                </div>
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
                {formik.touched.inventor?.email &&
                  formik.errors.inventor?.email && (
                    <div className="text-red-400 text-xs mb-1">
                      {formik.errors.inventor?.email}
                    </div>
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
                {formik.touched.inventor?.preferred_name &&
                  formik.errors.inventor?.preferred_name && (
                    <div className="text-red-400 text-xs mb-1">
                      {formik.errors.inventor?.preferred_name}
                    </div>
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
                {formik.touched.inventor?.phone &&
                  formik.errors.inventor?.phone && (
                    <div className="text-red-400 text-xs mb-1">
                      {formik.errors.inventor?.phone}
                    </div>
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
                {formik.touched.inventor?.orcid &&
                  formik.errors.inventor?.orcid && (
                    <div className="text-red-400 text-xs mb-1">
                      {formik.errors.inventor?.orcid}
                    </div>
                  )}
                <div>
                  <label className="block text-white font-semibold mb-1">
                    Affiliation
                  </label>
                  {affiliationsLoading ? (
                    <div className="text-gray-200 text-sm">
                      Loading affiliations...
                    </div>
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
                        <option
                          key={aff.id}
                          value={aff.id}
                          className="text-black"
                        >
                          {aff.name}
                        </option>
                      ))}
                    </select>
                  )}
                  {formik.touched.inventor?.affiliation &&
                    formik.errors.inventor?.affiliation && (
                      <div className="text-red-400 text-xs mb-1">
                        {formik.errors.inventor?.affiliation}
                      </div>
                    )}
                </div>
                <div>
                  <label className="block text-white font-semibold mb-1">
                    Name Variants
                  </label>
                  {/* List of already added variants */}
                  {formik.values.inventor?.name_variant.length === 0 && (
                    <div className="text-gray-400 italic mb-2">
                      No variants added yet.
                    </div>
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
                          const updated =
                            formik.values.inventor.name_variant.filter(
                              (_, i) => i !== idx
                            );
                          formik.setFieldValue(
                            "inventor.name_variant",
                            updated
                          );
                        }}
                        className="w-[60px] h-12 flex items-center justify-center rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                        title="Remove"
                      >
                        <FiTrash2 size={24} />
                      </button>
                    </div>
                  ))}
                  {/* Validation errors */}
                  {formik.touched.inventor?.name_variant &&
                    typeof formik.errors.inventor?.name_variant ===
                      "string" && (
                      <div className="text-red-400 text-xs mb-1">
                        {formik.errors.inventor?.name_variant}
                      </div>
                    )}
                  {Array.isArray(formik.errors.inventor?.name_variant) &&
                    formik.errors.inventor?.name_variant.map((err, idx) =>
                      Array.isArray(formik.touched.inventor?.name_variant) &&
                      formik.touched.inventor?.name_variant[idx] &&
                      err ? (
                        <div key={idx} className="text-red-400 text-xs mb-1">
                          {err}
                        </div>
                      ) : null
                    )}
                  {/* Add new variant input and button */}
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={newVariant}
                      onChange={(e) => setNewVariant(e.target.value)}
                      placeholder="Add new variant"
                      className="w-full h-12 p-3 border border-[#3b82f6]/30 rounded-lg bg-[#1e3a8a]/20 text-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newVariant.trim()) {
                          formik.setFieldValue("inventor.name_variant", [
                            ...formik.values.inventor.name_variant,
                            newVariant.trim(),
                          ]);
                          setNewVariant("");
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
              </>
            )}
            <LoadingButton
              type="submit"
              className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition-colors duration-300 font-semibold"
              loading={loading || formik.isSubmitting}
              loadingText="Creating..."
              disabled={loading || formik.isSubmitting}
            >
              Create Account
            </LoadingButton>
          </form>
        </div>
      </div>
    </>
  );
}
