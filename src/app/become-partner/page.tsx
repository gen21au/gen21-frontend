'use client';

import { useState } from 'react';
import { useSubmitPartnerRequestMutation } from '@/store/apiSlice';

interface PartnerFormData {
  country_id: number;
  partner_type: 'company' | 'individual' | 'freelancer';
  title: string;
  image: File | null;
  mobile: string;
  email: string;
  location: string;
  govt_issued_photo_id_front: File | null;
  govt_issued_photo_id_back: File | null;
  govt_trade_license: File | null;
  note: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function BecomePartnerPage() {
  const [formData, setFormData] = useState<PartnerFormData>({
    country_id: 2,
    partner_type: 'individual',
    title: '',
    image: null,
    mobile: '',
    email: '',
    location: '',
    govt_issued_photo_id_front: null,
    govt_issued_photo_id_back: null,
    govt_trade_license: null,
    note: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [submitPartnerRequest, { isLoading: isSubmitting }] = useSubmitPartnerRequestMutation();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid mobile number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.image) {
      newErrors.image = 'Profile image is required';
    }

    if (!formData.govt_issued_photo_id_front) {
      newErrors.govt_issued_photo_id_front = 'Government ID front is required';
    }

    if (!formData.govt_issued_photo_id_back) {
      newErrors.govt_issued_photo_id_back = 'Government ID back is required';
    }

    if (formData.partner_type === 'company' && !formData.govt_trade_license) {
      newErrors.govt_trade_license = 'Trade license is required for companies';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  const handlePartnerTypeChange = (type: 'company' | 'individual' | 'freelancer') => {
    setFormData(prev => ({ ...prev, partner_type: type }));
    if (errors.govt_trade_license && type !== 'company') {
      setErrors(prev => ({ ...prev, govt_trade_license: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const submitData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== '') {
          submitData.append(key, value);
        }
      });

      await submitPartnerRequest(submitData).unwrap();

      setSubmitSuccess(true);
      // Reset form
      setFormData({
        country_id: 2,
        partner_type: 'individual',
        title: '',
        image: null,
        mobile: '',
        email: '',
        location: '',
        govt_issued_photo_id_front: null,
        govt_issued_photo_id_back: null,
        govt_trade_license: null,
        note: ''
      });
      setErrors({});
    } catch (error: unknown) {
      console.error('Error submitting form:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit application. Please try again.';
      setErrors({ submit: errorMessage });
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in becoming a partner. We will review your application and get back to you soon.
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Become a Partner</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our network of trusted partners and grow your business with us.
            Fill out the form below to get started.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Partner Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Partner Type *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {([
                  { value: 'individual' as const, label: 'Individual' },
                  { value: 'freelancer' as const, label: 'Freelancer' },
                  { value: 'company' as const, label: 'Company' }
                ] as const).map((type) => (
                  <label key={type.value} className="relative">
                    <input
                      type="radio"
                      name="partner_type"
                      value={type.value}
                      checked={formData.partner_type === type.value}
                      onChange={() => handlePartnerTypeChange(type.value)}
                      className="sr-only peer"
                    />
                    <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-indigo-500 peer-checked:bg-indigo-50 hover:border-gray-300 transition-colors">
                      <div className="text-center">
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full mx-auto mb-2 peer-checked:border-indigo-500 peer-checked:bg-indigo-500 relative">
                          <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 peer-checked:bg-indigo-500"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{type.label}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your title or business name"
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>

              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.mobile ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+1 234 567 8900"
                />
                {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="City, State, Country"
                />
                {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
              </div>
            </div>

            {/* File Uploads */}
            <div className="space-y-6">
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Image *
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.image ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                <p className="mt-1 text-sm text-gray-500">Upload a professional photo or logo</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="govt_issued_photo_id_front" className="block text-sm font-medium text-gray-700 mb-1">
                    Government ID Front *
                  </label>
                  <input
                    type="file"
                    id="govt_issued_photo_id_front"
                    name="govt_issued_photo_id_front"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.govt_issued_photo_id_front ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.govt_issued_photo_id_front && <p className="mt-1 text-sm text-red-600">{errors.govt_issued_photo_id_front}</p>}
                  <p className="mt-1 text-sm text-gray-500">Upload NID/Driving License/Birth Certificate (Front Page)</p>
                </div>

                <div>
                  <label htmlFor="govt_issued_photo_id_back" className="block text-sm font-medium text-gray-700 mb-1">
                    Government ID Back *
                  </label>
                  <input
                    type="file"
                    id="govt_issued_photo_id_back"
                    name="govt_issued_photo_id_back"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.govt_issued_photo_id_back ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.govt_issued_photo_id_back && <p className="mt-1 text-sm text-red-600">{errors.govt_issued_photo_id_back}</p>}
                  <p className="mt-1 text-sm text-gray-500">Upload NID/Driving License/Birth Certificate (Back Page)</p>
                </div>
              </div>

              {formData.partner_type === 'company' && (
                <div>
                  <label htmlFor="govt_trade_license" className="block text-sm font-medium text-gray-700 mb-1">
                    Trade License *
                  </label>
                  <input
                    type="file"
                    id="govt_trade_license"
                    name="govt_trade_license"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.govt_trade_license ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.govt_trade_license && <p className="mt-1 text-sm text-red-600">{errors.govt_trade_license}</p>}
                  <p className="mt-1 text-sm text-gray-500">Required for company partnerships</p>
                </div>
              )}

              <div>
                <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  id="note"
                  name="note"
                  rows={4}
                  value={formData.note}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Any additional information you'd like to share..."
                />
              </div>
            </div>

            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium cursor-pointer"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
