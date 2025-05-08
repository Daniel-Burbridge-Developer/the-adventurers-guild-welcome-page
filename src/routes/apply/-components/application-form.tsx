const ApplicationForm = () => {
  return (
    <div>
      <h1>Application Form</h1>
      <form>
        <label>
          Name:
          <input type='text' name='name' />
        </label>
        <br />
        <label>
          Email:
          <input type='email' name='email' />
        </label>
        <br />
        <label>
          Resume:
          <input type='file' name='resume' />
        </label>
        <br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};
export default ApplicationForm;
