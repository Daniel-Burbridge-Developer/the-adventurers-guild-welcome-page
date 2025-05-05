import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/apply/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <JoinUsPage />
    </div>
  );
}

interface ApplicationFormData {
  applicantName: string;
  contactScroll: string; // For Correspondence
  lineage: string; // Race
  vocation: string; // Class/Profession
  desiredRole: string;
  previousDeeds?: string; // Accomplishments
  reasonForJoining?: string;
}

function JoinUsPage() {
  const [formData, setFormData] = useState<ApplicationFormData>({
    applicantName: '',
    contactScroll: '',
    lineage: '',
    vocation: '',
    desiredRole: '',
    previousDeeds: '',
    reasonForJoining: '',
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Send application data to the guild's records
    console.log('Application submitted:', formData);
    alert(
      'Your application has been received! The guild will review your request and send a response via scroll.'
    );
    // Clear the form
    setFormData({
      applicantName: '',
      contactScroll: '',
      lineage: '',
      vocation: '',
      desiredRole: '',
      previousDeeds: '',
      reasonForJoining: '',
    });
  };

  return (
    <div className='bg-gray-900 py-16 min-h-screen'>
      <div className='container mx-auto px-6'>
        <h2 className='text-3xl font-bold text-cyan-200 mb-8 text-center'>
          Request to Join Our Guild
        </h2>
        <div className='bg-gray-800 rounded-lg shadow-xl p-8 md:p-12'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label
                htmlFor='applicantName'
                className='block text-gray-300 text-sm font-bold mb-2'
              >
                Your Name:
              </label>
              <input
                type='text'
                id='applicantName'
                name='applicantName'
                value={formData.applicantName}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700'
                required
              />
            </div>
            <div>
              <label
                htmlFor='contactScroll'
                className='block text-gray-300 text-sm font-bold mb-2'
              >
                Contact Scroll (For Correspondence):
              </label>
              <input
                type='email'
                id='contactScroll'
                name='contactScroll'
                value={formData.contactScroll}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700'
                required
                placeholder='Your magical address for replies'
              />
            </div>
            <div>
              <label
                htmlFor='lineage'
                className='block text-gray-300 text-sm font-bold mb-2'
              >
                Lineage (Race):
              </label>
              <input
                type='text'
                id='lineage'
                name='lineage'
                value={formData.lineage}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700'
                required
              />
            </div>
            <div>
              <label
                htmlFor='vocation'
                className='block text-gray-300 text-sm font-bold mb-2'
              >
                Vocation (Class/Profession):
              </label>
              <input
                type='text'
                id='vocation'
                name='vocation'
                value={formData.vocation}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700'
                required
              />
            </div>
            <div>
              <label
                htmlFor='desiredRole'
                className='block text-gray-300 text-sm font-bold mb-2'
              >
                Desired Role in the Guild:
              </label>
              <select
                id='desiredRole'
                name='desiredRole'
                value={formData.desiredRole}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700'
                required
              >
                <option value=''>-- Select a Role --</option>
                <option value='Guardian'>Guardian</option>
                <option value='Arcanist'>Arcanist</option>
                <option value='Shadow Walker'>Shadow Walker</option>
                <option value='Divine Hand'>Divine Hand</option>
                <option value='Wild Tracker'>Wild Tracker</option>
                {/* Add more guild roles as needed */}
                <option value='Other'>Other</option>
              </select>
              {formData.desiredRole === 'Other' && (
                <input
                  type='text'
                  name='desiredRole'
                  value={formData.desiredRole}
                  onChange={handleChange}
                  placeholder='Specify other role'
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 mt-2'
                  required
                />
              )}
            </div>
            <div>
              <label
                htmlFor='previousDeeds'
                className='block text-gray-300 text-sm font-bold mb-2'
              >
                Previous Deeds (Optional):
              </label>
              <textarea
                id='previousDeeds'
                name='previousDeeds'
                value={formData.previousDeeds}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700'
                rows={3}
                placeholder='Share any relevant history or accomplishments.'
              />
            </div>
            <div>
              <label
                htmlFor='reasonForJoining'
                className='block text-gray-300 text-sm font-bold mb-2'
              >
                Reason for Joining Our Guild (Optional):
              </label>
              <textarea
                id='reasonForJoining'
                name='reasonForJoining'
                value={formData.reasonForJoining}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700'
                rows={4}
                placeholder='Tell us why you seek our fellowship.'
              />
            </div>
            <button
              type='submit'
              className='bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full shadow-md text-lg transition duration-300 focus:outline-none focus:shadow-outline'
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
