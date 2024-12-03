"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { AlertCircle, Calendar, Globe, Users, Mail } from 'lucide-react';
import { createProject } from '@/redux/productReducer';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { title } from 'process';

interface Project {
  title: string;
  description: string;
  categoryId: string;
  organizationName: string;
  location: string;
  requiredSkills: string[];
  contactEmail: string;
  volunteerCount: number;
}

interface MaterialInputProps {
  label: string;
  name: keyof Project;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

const MaterialInput: React.FC<MaterialInputProps> = ({
  label, 
  name, 
  value, 
  onChange, 
  type = 'text', 
  placeholder = '', 
  error = '',
  icon: Icon,
  className = '',
}) => {
  return (
    <div className="relative mb-4">
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full px-4 ${Icon ? 'pl-10' : ''} py-3 
            border rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition duration-200
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${className}
          `}
        />
      </div>
      {error && (
        <div className="flex items-center text-red-500 text-sm mt-1">
          <AlertCircle className="mr-2 w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
};

interface MaterialSelectProps {
  label: string;
  name: keyof Project;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  error?: string;
  className?: string;
}

const MaterialSelect: React.FC<MaterialSelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  error = '',
  className = '',
}) => {
  return (
    <div className="relative mb-4">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`
          w-full px-4 py-3 
          border rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition duration-200
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <div className="flex items-center text-red-500 text-sm mt-1">
          <AlertCircle className="mr-2 w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
};

const ProjectPostingForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: categories, isLoading, error } = useAppSelector((state) => {
    console.log('🔍 Full Redux State:', state);
    return state.category;
  });
  
  const transformedCategories = categories.map((category: { id: string; title: string; }) => ({
    value: category.id,
    label: category.title
  }));
 
  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    categoryId: '',
    organizationName: '',
    location: '',
    requiredSkills: [],
    contactEmail: '',
    volunteerCount: 0,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Project, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    setFormData(prev => {
      if (name === 'requiredSkills') {
        return {
          ...prev,
          [name]: (value as string).split(',').map(skill => skill.trim()),
        };
      }
      
      return {
        ...prev,
        [name]: type === 'number' ? Number(value) : value,
      };
    });

    if (errors[name as keyof Project]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Project, string>> = {};

    if (!formData.title.trim()) newErrors.title = 'Project title is required';
    if (!formData.description.trim()) newErrors.description = 'Project description is required';
    if (!formData.organizationName.trim()) newErrors.organizationName = 'Organization name is required';
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) newErrors.contactEmail = 'Invalid email format';
    if (formData.volunteerCount <= 0) newErrors.volunteerCount = 'Volunteer count must be positive';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await dispatch(createProject(formData));
        console.log('Project Creation Response:', response);
      } catch (dispatchError) {
        console.error('Project creation failed:', dispatchError);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 space-y-6"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Post a Volunteer Project</h1>
          <p className="text-gray-600">Share your project and find passionate volunteers</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <MaterialInput
            label="Project Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter project title"
            error={errors.title}
            icon={Users}
          />

          <MaterialSelect
            label="Category"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            options={transformedCategories}
            error={errors.categoryId}
          />
        </div>

        <MaterialInput
          label="Project Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your project in detail..."
          error={errors.description}
          className="h-32"
          type="textarea"
        />

        <div className="grid md:grid-cols-2 gap-6">
          <MaterialInput
            label="Organization Name"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            placeholder="Your organization or team name"
            error={errors.organizationName}
            icon={Globe}
          />

          <MaterialInput
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City or Remote"
            error={errors.location}
            icon={Calendar}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <MaterialInput
            label="Contact Email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            type="email"
            placeholder="contact@example.com"
            error={errors.contactEmail}
            icon={Mail}
          />

          <MaterialInput
            label="Volunteer Count"
            name="volunteerCount"
            value={formData.volunteerCount}
            onChange={handleChange}
            type="number"
            placeholder="Number of volunteers needed"
            error={errors.volunteerCount}
          />
        </div>

        <MaterialInput
          label="Required Skills"
          name="requiredSkills"
          value={formData.requiredSkills.join(', ')}
          onChange={handleChange}
          placeholder="Enter skills separated by commas"
          error={errors.requiredSkills}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full py-3 rounded-lg 
            bg-blue-600 text-white 
            hover:bg-blue-700 
            transition duration-300
            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {isSubmitting ? 'Submitting...' : 'Post Project'}
        </button>
      </form>
    </div>
  );
};

export default ProjectPostingForm;