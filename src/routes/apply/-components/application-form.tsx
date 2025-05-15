import { useForm } from '@tanstack/react-form';
import { z } from 'zod';

// Define the Zod schema for your form with email validation for contactScroll
const applicantSchema = z.object({
  applicantName: z.string().min(1, 'Applicant Name is required'),
  contactScroll: z
    .string()
    .email('A valid email address is required for Correspondence')
    .min(1, 'Contact Scroll is required'), // Added min(1) because email() allows empty string
  lineage: z.string().min(1, 'Lineage (Race) is required'),
  vocation: z.string().min(1, 'Vocation (Class/Profession) is required'),
  // desiredRole will now either be one of the options or the specified text
  desiredRole: z.string().min(1, 'Desired Role is required'),
  previousDeeds: z.string(), // Always a string, never undefined
  reasonForJoining: z.string(), // Always a string, never undefined
});

// Infer the form data type from the schema
type ApplicationFormData = z.infer<typeof applicantSchema>;

function ApplicationForm() {
  // Initialize the form with useForm
  const form = useForm({
    // Use the 'validator' option directly with the Zod schema
    // TanStack Form understands how to use a Zod schema here.
    validators: {
      onChange: applicantSchema,
    },
    defaultValues: {
      applicantName: '',
      contactScroll: '',
      lineage: '',
      vocation: '',
      desiredRole: '',
      previousDeeds: '',
      reasonForJoining: '',
    },
    onSubmit: async ({ value }) => {
      // Handle form submission
      console.log('Application submitted:', value);
      alert(
        'Your application has been received! The guild will review your request and send a response via scroll.'
      );
      // Reset the form after successful submission
      form.reset();
    },
  });

  return (
    <div className='bg-gray-900 py-16 min-h-screen'>
      <div className='container mx-auto px-6'>
        <h2 className='text-3xl font-bold text-cyan-200 mb-8 text-center'>
          Request to Join Our Guild
        </h2>
        <div className='bg-gray-800 rounded-lg shadow-xl p-8 md:p-12'>
          {/* Connect form's onSubmit to Tanstack Form's handleSubmit */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // TanStack Form's handleSubmit orchestrates validation and submission
              form.handleSubmit();
            }}
            className='space-y-4'
          >
            {/* Applicant Name Field */}
            <form.Field
              name='applicantName'
              // Validators are now handled by the form-level validator
              // No need for field-level validators unless adding *extra* validation
            >
              {(field) => (
                <div>
                  <label
                    htmlFor={field.name} // Use field.name for the ID
                    className='block text-gray-300 text-sm font-bold mb-2'
                  >
                    Your Name:
                  </label>
                  <input
                    id={field.name} // Use field.name for the ID
                    name={field.name} // Use field.name for the name attribute
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700'
                  />
                  {/* Access errors via field.state.meta.errors */}
                  {field.state.meta.isDirty &&
                    field.state.meta.errors.length > 0 && (
                      <em className='text-red-500 text-sm mt-1 block'>
                        {field.state.meta.errors
                          .map((error) => error?.message)
                          .join(', ')}
                      </em>
                    )}
                </div>
              )}
            </form.Field>

            {/* Contact Scroll Field */}
            <form.Field name='contactScroll'>
              {(field) => (
                <div>
                  <label
                    htmlFor={field.name}
                    className='block text-gray-300 text-sm font-bold mb-2'
                  >
                    Contact Scroll (For Correspondence):
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type='email' // Keep type="email" for better UX
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700'
                    placeholder='Your magical address for replies'
                  />
                  {field.state.meta.isDirty &&
                    field.state.meta.errors.length > 0 && (
                      <em className='text-red-500 text-sm mt-1 block'>
                        {field.state.meta.errors
                          .map((error) => error?.message)
                          .join(', ')}
                      </em>
                    )}
                </div>
              )}
            </form.Field>

            {/* Lineage Field */}
            <form.Field name='lineage'>
              {(field) => (
                <div>
                  <label
                    htmlFor={field.name}
                    className='block text-gray-300 text-sm font-bold mb-2'
                  >
                    Lineage (Race):
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700'
                  />
                  {field.state.meta.isDirty &&
                    field.state.meta.errors.length > 0 && (
                      <em className='text-red-500 text-sm mt-1 block'>
                        {field.state.meta.errors
                          .map((error) => error?.message)
                          .join(', ')}
                      </em>
                    )}
                </div>
              )}
            </form.Field>

            {/* Vocation Field */}
            <form.Field name='vocation'>
              {(field) => (
                <div>
                  <label
                    htmlFor={field.name}
                    className='block text-gray-300 text-sm font-bold mb-2'
                  >
                    Vocation (Class/Profession):
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700'
                  />
                  {field.state.meta.isDirty &&
                    field.state.meta.errors.length > 0 && (
                      <em className='text-red-500 text-sm mt-1 block'>
                        {field.state.meta.errors
                          .map((error) => error?.message)
                          .join(', ')}
                      </em>
                    )}
                </div>
              )}
            </form.Field>

            {/* Desired Role Field (Handles Select and Conditional Text Input) */}
            <form.Field name='desiredRole'>
              {(field) => (
                <div>
                  <label
                    htmlFor={field.name}
                    className='block text-gray-300 text-sm font-bold mb-2'
                  >
                    Desired Role in the Guild:
                  </label>
                  {/* Select input */}
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700'
                  >
                    <option value=''>-- Select a Role --</option>
                    <option value='Guardian'>Guardian</option>
                    <option value='Arcanist'>Arcanist</option>
                    <option value='Shadow Walker'>Shadow Walker</option>
                    <option value='Divine Hand'>Divine Hand</option>
                    <option value='Wild Tracker'>Wild Tracker</option>
                  </select>
                </div>
              )}
            </form.Field>

            {/* Previous Deeds Field (Optional) */}
            <form.Field name='previousDeeds'>
              {(field) => (
                <div>
                  <label
                    htmlFor={field.name}
                    className='block text-gray-300 text-sm font-bold mb-2'
                  >
                    Previous Deeds (Optional):
                  </label>
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700'
                    rows={3}
                    placeholder='Share any relevant history or accomplishments.'
                  />
                  {/* Optional fields don't typically show validation errors unless you add specific validation rules */}
                </div>
              )}
            </form.Field>

            {/* Reason for Joining Field (Optional) */}
            <form.Field name='reasonForJoining'>
              {(field) => (
                <div>
                  <label
                    htmlFor={field.name}
                    className='block text-gray-300 text-sm font-bold mb-2'
                  >
                    Reason for Joining Our Guild (Optional):
                  </label>
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700'
                    rows={4}
                    placeholder='Tell us why you seek our fellowship.'
                  />
                  {/* Optional fields don't typically show validation errors unless you add specific validation rules */}
                </div>
              )}
            </form.Field>

            {/* Submit Button */}
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]} // Subscribe to canSubmit and isSubmitting
            >
              {([canSubmit, isSubmitting]) => (
                <button
                  type='submit'
                  // Disable if not canSubmit (due to validation errors) or if submitting
                  disabled={!canSubmit || isSubmitting}
                  className={`bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-md text-lg transition duration-300 focus:outline-none focus:shadow-outline ${
                    !canSubmit || isSubmitting
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:from-cyan-500 hover:to-blue-800'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              )}
            </form.Subscribe>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ApplicationForm;
