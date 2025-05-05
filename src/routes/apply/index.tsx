import { createFileRoute } from '@tanstack/react-router';
import {
  mergeForm,
  useForm,
  useStore,
  useTransform,
  formOptions, // Ensure formOptions is imported
} from '@tanstack/react-form';
import {
  createServerValidate,
  ServerValidateError,
  getFormData, // Ensure getFormData is imported
} from '@tanstack/react-form/start';
import { createServerFn } from '@tanstack/react-start';
import { setResponseStatus } from '@tanstack/react-start/server';

// Define formOptions *before* serverValidate
export const formOpts = formOptions({
  defaultValues: {
    firstName: '',
    age: 0,
  },
});

const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: ({ value }) => {
    if (value.age < 12) {
      return 'Server validation: You must be at least 12 to sign up';
    }
  },
});

export const handleForm = createServerFn({
  method: 'POST',
})
  .validator((data: unknown) => {
    if (!(data instanceof FormData)) {
      throw new Error('Invalid form data');
    }
    return data;
  })
  .handler(async (ctx) => {
    try {
      const validatedData = await serverValidate(ctx.data);
      console.log('validatedData', validatedData);
      // Persist the form data to the database
      // await sql`
      //   INSERT INTO users (name, email, password)
      //   VALUES (${validatedData.name}, ${validatedData.email}, ${validatedData.password})
      // `
    } catch (e) {
      if (e instanceof ServerValidateError) {
        // Log form errors or do any other logic here
        return e.message; // Or e.response depending on your error handling
      }

      // Some other error occurred when parsing the form
      console.error(e);
      setResponseStatus(500);
      return 'There was an internal error';
    }

    return 'Form has validated successfully';
  });

export const getFormDataFromServer = createServerFn({ method: 'GET' }).handler(
  async () => {
    return getFormData();
  }
);

export const Route = createFileRoute('/apply/')({
  component: Home,
  loader: async () => ({
    state: await getFormDataFromServer(),
  }),
});

function Home() {
  const { state } = Route.useLoaderData();
  const form = useForm({
    ...formOpts,
    transform: useTransform((baseForm) => mergeForm(baseForm, state), [state]),
  });

  const formErrors = useStore(form.store, (formState) => formState.errors);

  return (
    <form action={handleForm.url} method='post' encType={'multipart/form-data'}>
      {formErrors.map((error) => (
        <p key={error as unknown as string}>{error}</p>
      ))}

      <form.Field
        name='age'
        validators={{
          onChange: ({ value }) =>
            value < 8 ? 'Client validation: You must be at least 8' : undefined,
        }}
      >
        {(field) => {
          return (
            <div>
              <input
                name='age'
                type='number'
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              />
              {field.state.meta.errors.map((error) => (
                <p key={error as string}>{error}</p>
              ))}
            </div>
          );
        }}
      </form.Field>
      <form.Subscribe
        selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <button type='submit' disabled={!canSubmit}>
            {isSubmitting ? '...' : 'Submit'}
          </button>
        )}
      </form.Subscribe>
    </form>
  );
}
