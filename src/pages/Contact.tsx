import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { contactApi } from '../services/api';
import { ContactMessage } from '../types';
import { Send, Mail, MapPin, Phone, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';

export default function Contact() {
  const { profile } = useProfile();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactMessage>();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: ContactMessage) => {
    setSubmitting(true);
    setError(null);
    try {
      await contactApi.submit(data);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setError('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary-400 font-mono text-sm">{'// Contact'}</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-4 mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? I'd love to hear from you.
            Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-light rounded-2xl p-6 card-hover">
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-white font-semibold mb-1">Email</h3>
              <p className="text-dark-400 text-sm">{profile.email}</p>
            </div>

            <div className="glass-light rounded-2xl p-6 card-hover">
              <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-accent-400" />
              </div>
              <h3 className="text-white font-semibold mb-1">Location</h3>
              <p className="text-dark-400 text-sm">{profile.location}</p>
              <p className="text-dark-400 text-sm">Available for remote work worldwide</p>
            </div>

            <div className="glass-light rounded-2xl p-6 card-hover">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold mb-1">Phone</h3>
              <p className="text-dark-400 text-sm">{profile.phone}</p>
              <p className="text-dark-400 text-sm">Available for contact anytime</p>
            </div>

            {/* Response Time */}
            <div className="glass-light rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-2">Response Time</h3>
              <p className="text-dark-400 text-sm">
                I typically respond within <span className="text-primary-400 font-medium">24 hours</span>.
                For urgent inquiries, feel free to call or reach out via social media.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="glass-light rounded-2xl p-8">
              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent-400 flex-shrink-0" />
                  <p className="text-accent-300 text-sm">Message sent successfully! I'll get back to you soon.</p>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-dark-300 text-sm font-medium mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      placeholder="John Doe"
                      className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-dark-300 text-sm font-medium mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                      })}
                      type="email"
                      placeholder="john@example.com"
                      className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-dark-300 text-sm font-medium mb-2">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    {...register('subject', { required: 'Subject is required' })}
                    type="text"
                    placeholder="Project inquiry, collaboration, etc."
                    className={`form-input ${errors.subject ? 'border-red-500' : ''}`}
                  />
                  {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                  <label className="block text-dark-300 text-sm font-medium mb-2">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'At least 10 characters' } })}
                    rows={6}
                    placeholder="Tell me about your project, timeline, and budget..."
                    className={`form-input resize-none ${errors.message ? 'border-red-500' : ''}`}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span className="flex items-center gap-2">
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {submitting ? 'Sending...' : 'Send Message'}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
