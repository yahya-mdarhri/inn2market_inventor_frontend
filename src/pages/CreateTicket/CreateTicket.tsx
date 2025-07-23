import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/shadcn/card";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { useFormik, FieldArray, FormikProvider } from "formik";
import * as yup from "yup";
import { Plus, Minus, FileText, Info, Users, FileImage, BadgeCheck } from "lucide-react";
import { Helmet } from '@dr.pogodin/react-helmet';
import axios from "axios";
import LoadingButton from '@/components/ui/LoadinButton/LoadingButton';
import { type Inventor } from "@/types/user";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/shadcn/avatar";

// Use a textarea component or fallback to <textarea>
const Textarea = (props: any) => (
  <textarea {...props} className={`bg-[#e6ecf3] rounded-lg p-2 w-full border border-gray-255 focus:outline-none focus:ring-2 focus:ring-[#073567] ${props.className || ""}`} />
);

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  summary: yup.string().required("Summary is required"),
  context: yup.string().required("Context is required"),
  problem_identification: yup.string().required("Problem identification is required"),
  drawings: yup.mixed().notRequired(),
  inventors: yup.array().of(yup.string()),
  co_applications: yup.array().of(yup.string()),
});

export default function CreateTicket() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [drawingPreview, setDrawingPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null); // Add error state
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [inventorSearch, setInventorSearch] = useState("");
  const [inventorSuggestions, setInventorSuggestions] = useState<Inventor[]>([]);
  const [inventorLoading, setInventorLoading] = useState(false);
  const [inventorPage, setInventorPage] = useState(1);
  const [inventorHasMore, setInventorHasMore] = useState(false);
  const [selectedInventors, setSelectedInventors] = useState<Inventor[]>([]);

  const formik = useFormik({
    initialValues: {
      title: "",
      summary: "",
      context: "",
      problem_identification: "",
      drawings: null as File | null,
      inventors: [] as string[], // store only UUIDs
      co_applications: [""],
      is_draft: false,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setSubmitting(true);
      setSuccess(false);
      setError(null);

      try {
        // Prepare FormData for backend
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("summary", values.summary);
        formData.append("context", values.context);
        formData.append("problem_identification", values.problem_identification);
        formData.append("is_draft", values.is_draft ? "true" : "false");
        selectedInventors.forEach((inv) => formData.append("inventors", inv.id));

        // Append co_applications
        values.co_applications
          .filter((co) => co.trim() !== "")
          .forEach((co) => formData.append("co_applications", co));

        // Append drawings if present
        if (values.drawings) {
          formData.append("drawings", values.drawings);
        }

        // Send POST request with multipart/form-data
        await axios.post("/api/inventors/ticket/create/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setSubmitting(false);
        setSuccess(true);
        resetForm();
        setDrawingPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } catch (err: any) {
        setSubmitting(false);
        setError(
          err.response?.data?.error ||
          "An error occurred while submitting the ticket."
        );
      }
    },
  });

  // Drawing preview handler
  const handleDrawingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    formik.setFieldValue("drawings", file || null);
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => setDrawingPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setDrawingPreview(null);
    }
  };

  const fetchInventorSuggestions = async (query: string, page = 1, pageSize = 10) => {
    setInventorLoading(true);
    try {
      const res = await axios.post(
        `/api/inventors/inventors/search/?page=${page}&page_size=${pageSize}`,
        { name: query }
      );
      // The response is paginated: { count, page, page_size, results: [...] }
      const results = Array.isArray(res.data.results) ? res.data.results : [];
      setInventorSuggestions(page === 1 ? results : prev => [...prev, ...results]);
      setInventorHasMore(results.length === pageSize); // If we got a full page, there may be more
      setInventorPage(page);
    } catch (e) {
      setInventorSuggestions([]);
      setInventorHasMore(false);
    }
    setInventorLoading(false);
  };

  const handleAddInventor = (user: Inventor, push: (uuid: string) => void) => {
    if (!formik.values.inventors.includes(user.id)) {
      push(user.id);
      setSelectedInventors((prev) => [...prev, user]);
    }
    setInventorSearch("");
    setInventorSuggestions([]);
    setInventorHasMore(false);
  };
  const handleRemoveInventor = (idx: number) => {
    const uuid = formik.values.inventors[idx];
    setSelectedInventors((prev) => prev.filter((inv) => inv.id !== uuid));
  };

  return (
    <>
      <Helmet>
        <title>Create Ticket | Inventor Portal</title>
        <meta property="og:title" content="Create Ticket | Inventor Portal" />
        <meta name="description" content="Submit a new patent ticket for your invention. Provide details and track your submission." />
        <meta property="og:description" content="Submit a new patent ticket for your invention. Provide details and track your submission." />
      </Helmet>
      <Card className="w-full max-w-7xl mx-auto bg-[#b7c7d8] rounded-2xl shadow-lg p-8">
        <CardContent className="p-0">
          <FormikProvider value={formik}>
            <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit} noValidate>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-5 h-5 text-[#073567]" />
                  <label className="block text-[#073567] font-semibold" htmlFor="title">
                    Title <span className="text-red-500">*</span>
                  </label>
                </div>
                <Input
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter invention title"
                  required
                  className="bg-[#e6ecf3]"
                  maxLength={100}
                />
                <div className="flex justify-between">
                  {formik.touched.title && formik.errors.title && (
                    <div className="text-red-600 text-sm">{formik.errors.title}</div>
                  )}
                  <span className="text-xs text-gray-500 ml-auto">{formik.values.title.length}/100</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Info className="w-5 h-5 text-[#073567]" />
                  <label className="block text-[#073567] font-semibold" htmlFor="summary">
                    Summary <span className="text-red-500">*</span>
                  </label>
                </div>
                <Textarea
                  id="summary"
                  name="summary"
                  value={formik.values.summary}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Brief summary of the invention"
                  required
                  rows={3}
                  maxLength={255}
                />
                <div className="flex justify-between">
                  {formik.touched.summary && formik.errors.summary && (
                    <div className="text-red-600 text-sm">{formik.errors.summary}</div>
                  )}
                  <span className="text-xs text-gray-500 ml-auto">{formik.values.summary.length}/255</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <BadgeCheck className="w-5 h-5 text-[#073567]" />
                  <label className="block text-[#073567] font-semibold" htmlFor="context">
                    Context <span className="text-red-500">*</span>
                  </label>
                </div>
                <Textarea
                  id="context"
                  name="context"
                  value={formik.values.context}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Background and context"
                  required
                  rows={3}
                  maxLength={255}
                />
                <div className="flex justify-between">
                  {formik.touched.context && formik.errors.context && (
                    <div className="text-red-600 text-sm">{formik.errors.context}</div>
                  )}
                  <span className="text-xs text-gray-500 ml-auto">{formik.values.context.length}/255</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Info className="w-5 h-5 text-[#073567]" />
                  <label className="block text-[#073567] font-semibold" htmlFor="problem_identification">
                    Problem Identification <span className="text-red-500">*</span>
                  </label>
                </div>
                <Textarea
                  id="problem_identification"
                  name="problem_identification"
                  value={formik.values.problem_identification}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="What problem does this invention solve?"
                  required
                  rows={3}
                  maxLength={255}
                />
                <div className="flex justify-between">
                  {formik.touched.problem_identification && formik.errors.problem_identification && (
                    <div className="text-red-600 text-sm">{formik.errors.problem_identification}</div>
                  )}
                  <span className="text-xs text-gray-500 ml-auto">{formik.values.problem_identification.length}/255</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FileImage className="w-5 h-5 text-[#073567]" />
                  <label className="block text-[#073567] font-semibold" htmlFor="drawings">
                    Drawings <span className="text-red-500">*</span>
                  </label>
                </div>
                <Input
                  id="drawings"
                  name="drawings"
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleDrawingChange}
                  className="bg-[#e6ecf3]"
                  ref={fileInputRef}
                />
                {drawingPreview && (
                  <div className="mt-2">
                    <img src={drawingPreview} alt="Drawing preview" className="max-h-40 rounded-lg border" />
                  </div>
                )}
                {formik.touched.drawings && formik.errors.drawings && (
                  <div className="text-red-600 text-sm">{formik.errors.drawings as string}</div>
                )}
              </div>
              <FieldArray name="inventors">
                {({ push, remove }) => (
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-5 h-5 text-[#073567]" />
                      <label className="block text-[#073567] font-semibold">
                        Inventors
                      </label>
                    </div>
                    {/* Render added inventors on top */}
                    {formik.values.inventors.length > 0 && (
                      <ul className="mb-2">
                        {formik.values.inventors.map((uuid, idx) => {
                          const inventor = selectedInventors.find((u) => u.id === uuid);
                          if (!inventor) return null;
                          return (
                            <li key={uuid} className="flex items-center gap-2 p-2 bg-white border rounded shadow mb-1">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={inventor.image} alt={inventor.preferred_name} />
                                <AvatarFallback>{inventor.preferred_name?.[0] || '?'}</AvatarFallback>
                              </Avatar>
                              <span>{inventor.preferred_name}</span>
                              {inventor.email && <span className="text-gray-500 text-xs ml-2">({inventor.email})</span>}
                              <button
                                type="button"
                                onClick={() => {
                                  remove(idx);
                                  handleRemoveInventor(idx);
                                }}
                                className="ml-auto flex items-center justify-center w-8 h-8 rounded-full bg-white border border-red-200 text-red-600 hover:bg-red-100 hover:text-red-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                                title="Remove inventor"
                                aria-label="Remove inventor"
                              >
                                <Minus size={18} />
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                    {/* Search input at the bottom */}
                    <div className="mb-2 relative">
                      <Input
                        value={inventorSearch}
                        onChange={e => {
                          setInventorSearch(e.target.value);
                          if (e.target.value.length > 1) {
                            fetchInventorSuggestions(e.target.value, 1);
                          } else {
                            setInventorSuggestions([]);
                            setInventorHasMore(false);
                          }
                        }}
                        placeholder="Search inventor by name"
                        className="bg-[#e6ecf3] flex-1"
                      />
                      {inventorLoading && <div>Loading...</div>}
                      {(inventorSuggestions.length > 0 || inventorHasMore) && (
                        <ul className="bg-white border rounded shadow mt-1 max-h-60 overflow-y-auto absolute z-10 w-full">
                          {inventorSuggestions.map((user, _idx) => (
                            <li
                              key={user.id}
                              className="flex items-center gap-2 p-2 hover:bg-blue-100 cursor-pointer"
                              onClick={() => handleAddInventor(user, push)}
                            >
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={user.image} alt={user.preferred_name} />
                                <AvatarFallback>{user.preferred_name?.[0] || '?'}</AvatarFallback>
                              </Avatar>
                              <span>{user.preferred_name}</span>
                              {user.email && <span className="text-gray-500 text-xs ml-2">({user.email})</span>}
                            </li>
                          ))}
                          {inventorHasMore && (
                            <li
                              className="p-2 text-center text-blue-600 cursor-pointer hover:bg-blue-50"
                              onClick={() => fetchInventorSuggestions(inventorSearch, inventorPage + 1)}
                            >
                              Load more...
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </FieldArray>
              <FieldArray name="co_applications">
                {({ push, remove }) => (
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-5 h-5 text-[#073567]" />
                      <label className="block text-[#073567] font-semibold">Co-Applications (optional)</label>
                    </div>
                    {formik.values.co_applications.map((co, idx) => (
                      <div key={idx} className="flex gap-2 mb-1 items-center">
                        <Input
                          name={`co_applications[${idx}]`}
                          value={co}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Co-applicant name or email"
                          className="bg-[#e6ecf3] flex-1"
                        />
                        {idx === formik.values.co_applications.length - 1 && co.trim() !== "" && (
                          <button
                            type="button"
                            onClick={() => push("")}
                            className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-blue-200 text-[#073567] hover:bg-blue-100 hover:text-blue-900 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                            title="Add co-applicant"
                            aria-label="Add co-applicant"
                          >
                            <Plus size={18} />
                          </button>
                        )}
                        {idx !== formik.values.co_applications.length - 1 && co.trim() !== ""  && (
                          <button
                            type="button"
                            onClick={() => remove(idx)}
                            className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-red-200 text-red-600 hover:bg-red-100 hover:text-red-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                            title="Remove co-applicant"
                            aria-label="Remove co-applicant"
                          >
                            <Minus size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>
              <div className="flex gap-4 mt-4">
                <LoadingButton
                  type="submit"
                  className="bg-[var(--primary)] text-white font-bold rounded-lg px-6 py-2 hover:bg-[#bdbd00]"
                  loading={submitting}
                  loadingText="Submitting..."
                  disabled={!formik.isValid || !formik.dirty}
                >
                  Submit Ticket
                </LoadingButton>
                <Button
                  type="button"
                  variant="outline"
                  className="border border-[#073567] text-[#073567] font-bold rounded-lg px-6 py-2"
                  onClick={() => {
                    formik.resetForm();
                    setDrawingPreview(null);
                    fileInputRef.current?.value && (fileInputRef.current.value = "");
                  }}
                  disabled={submitting}
                >
                  Clear
                </Button>
              </div>
              {success && <div className="text-green-600 mt-2">Ticket submitted successfully!</div>}
              {error && <div className="text-red-600 mt-2">{error}</div>}
            </form>
          </FormikProvider>
        </CardContent>
      </Card>
    </>
  );
}
