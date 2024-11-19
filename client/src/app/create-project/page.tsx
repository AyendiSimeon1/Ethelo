"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { AlertCircle, Calendar, Globe, Users, Mail } from 'lucide-react';

const ProjectPostingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    organizationType: 'individual',
    organizationName: '',
    projectType: 'technical',
    location: '',
    startDate: '',
    duration: '',
    requiredSkills: '',
    volunteerCount: '',
    contactEmail: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.organizationName.trim()) newErrors.organizationName = 'Organization/Individual name is required';
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) newErrors.contactEmail = 'Invalid email format';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl bg-white rounded-lg p-4 shadow-lg">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-4 text-center">
          <h1 className="text-2xl font-bold">Post a Volunteer Project</h1>
          <p className="text-blue-200">Connect with talented volunteers for your project</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter project title"
            />
            {errors.title && <p className="text-red-600 mt-1 text-sm">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Project Type</label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
            >
              <option value="technical">Technical</option>
              <option value="design">Design</option>
              <option value="content">Content Creation</option>
              <option value="research">Research</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Project Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the project and its impact..."
          />
          {errors.description && <p className="text-red-600 mt-1 text-sm">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Remote, New York, NY"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
            placeholder="contact@example.com"
          />
          {errors.contactEmail && <p className="text-red-600 mt-1 text-sm">{errors.contactEmail}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 text-white py-3 rounded-lg focus:ring-2 focus:ring-blue-500 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Posting...' : 'Post Project'}
        </button>
      </form>
    </div>
  );
};

export default ProjectPostingForm;