import { useForm } from '@tanstack/react-form';
import { drizzle } from 'drizzle-orm/libsql';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { members } from '~/db/schema';

// Define the Zod schema for your form with email validation for contactScroll
const applicantSchema = z.object({
  applicantName: z
    .string()
    .min(1, 'Applicant Name is required')
    .regex(/^[A-Za-z]+(?: [A-Za-z]+)$/, 'First and Last Name Only'),
  contactScroll: z
    .string()
    .email('A valid email address is required for Correspondence')
    .min(1, 'Contact Scroll is required'),
  lineage: z.string().min(1, 'Lineage (Race) is required'),
  vocation: z.string().min(1, 'Vocation (Class/Profession) is required'),
});

// Infer the form data type from the schema
type ApplicationFormData = z.infer<typeof applicantSchema>;

// Use a validator so the handler receives { data }
export const submitApplication = createServerFn()
  .validator((data: ApplicationFormData) => applicantSchema.parse(data))
  .handler(async ({ data }) => {
    // Connect to your DB (adjust as needed for your setup)
    const db = drizzle({
      connection: {
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN!,
      },
    });

    // Split applicantName into firstName and lastName
    const [firstName, ...rest] = data.applicantName.trim().split(' ');
    const lastName = rest.join(' ') || '';

    try {
      await db.insert(members).values({
        firstName,
        lastName,
        inviteStatus: 'requested',
        contactScroll: data.contactScroll,
        race: data.lineage,
        class: data.vocation,
        pronouns: '[]',
      });
      return { success: true };
    } catch (e) {
      return { error: 'Failed to submit application.' };
    }
  });

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
    },

    //   onSubmit: async ({ value }) => {
    //     // Handle form submission
    //     console.log('Application submitted:', value);
    //     alert(
    //       'Your application has been received! The guild will review your request and send a response via scroll.'
    //     );

    //     // Reset the form after successful submission
    //     form.reset();
    //   },
    // });

    onSubmit: async ({ value }) => {
      const result = await submitApplication({ data: value });
      if (result?.success) {
        alert(
          'Your application has been received! The guild will review your request and send a response via scroll.'
        );
        form.reset();
      } else {
        alert(result?.error || 'Submission failed.');
      }
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
            <form.Field name='applicantName'>
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
